<template>
  <nav class="navbar-shell">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3">
        <img
          v-if="siteInfo.logo"
          :src="siteInfo.logo"
          :alt="siteInfo.name"
          class="h-20 w-auto object-contain scale-125"
        />
        <div v-else class="flex h-16 w-16 items-center justify-center rounded-xl bg-[#7B1F3A] text-white">
          <i class="fas fa-building text-sm"></i>
        </div>
        <!-- <span class="text-lg font-bold text-slate-900">{{ siteInfo.name || 'CompanyProfile' }}</span> -->
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden items-center gap-1 md:flex">
        <template v-for="item in menuItems" :key="item.path">
          <a
            v-if="item.external"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-[#FDF0F3] hover:text-[#7B1F3A]"
          >{{ item.label }}</a>
          <router-link
            v-else
            :to="item.path"
            class="nav-link rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-[#FDF0F3] hover:text-[#7B1F3A]"
            :class="{ 'nav-link-active': isActive(item.path) }"
          >{{ item.label }}</router-link>
        </template>
        <router-link to="/contact" class="btn-primary ml-3 !px-5 !py-2.5 !text-xs">
          Contact
        </router-link>
      </div>

      <!-- Mobile Hamburger -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
      >
        <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div v-if="mobileMenuOpen" class="mobile-menu border-t border-maroon-100 md:hidden">
        <div class="space-y-1 px-4 py-4">
          <template v-for="item in menuItems" :key="'m-' + item.path">
            <a
              v-if="item.external"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              @click="mobileMenuOpen = false"
              class="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#FDF0F3] hover:text-[#7B1F3A]"
            >{{ item.label }}</a>
            <router-link
              v-else
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#FDF0F3] hover:text-[#7B1F3A]"
              :class="{ 'bg-[#FDF0F3] text-[#7B1F3A]': isActive(item.path) }"
            >{{ item.label }}</router-link>
          </template>
          <router-link
            to="/contact"
            @click="mobileMenuOpen = false"
            class="btn-primary mt-3 block w-full text-center !text-xs"
          >
            Contact
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const route = useRoute();
const mobileMenuOpen = ref(false);

const siteInfo = ref({ name: '', logo: '' });

const HOME_STORAGE_KEY = 'customPageData:Home';

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') { try { return JSON.parse(data); } catch { return null; } }
  return data;
};

const loadLogoFromCache = () => {
  try {
    const raw = localStorage.getItem(HOME_STORAGE_KEY);
    const source = raw ? JSON.parse(raw) : null;
    if (!source) return;
    const section = source['logo_phisoft30'];
    if (!section) return;
    const items = (Array.isArray(section) ? section : [section]).map(i => parse(i) || {});
    const found = items.slice().reverse().find(obj => {
      const url = obj?.image || obj?.url || '';
      return url && !url.includes('localhost');
    }) || items[0];
    const url = found?.image || found?.url || '';
    if (url) siteInfo.value = { ...siteInfo.value, logo: url };
  } catch { /* keep existing */ }
};

const defaultMenuItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Blog', path: '/blog', href: 'https://phisoft.co.id/blog/', external: true },
];

const menuItems = ref([...defaultMenuItems]);

const isActive = (path) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path.replace('/#', ''));
};

const fetchSiteInfo = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.siteInfo());
    const data = response.data?.data || response.data;
    if (data) {
      siteInfo.value = {
        name: data.name || data.site_name || '',
        logo: data.logo_url || data.logo || data.logo_path || data.site_logo || '',
      };
    }
  } catch (error) {
    console.warn('Failed to fetch site info', error);
  } finally {
    loadLogoFromCache();
  }
};

const fetchMenu = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.menuListByGroup('header'));
    const data = response.data?.data || response.data || [];
    if (Array.isArray(data) && data.length > 0) {
      menuItems.value = data.map(item => ({
        label: item.title || item.name,
        path: item.url || item.link || '/',
      }));
    }
  } catch (error) {
    console.warn('Using default menu items', error);
  }
};

onMounted(() => {
  loadLogoFromCache();
  fetchSiteInfo();
  fetchMenu();
});
</script>

<style scoped>
.navbar-shell {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(123, 31, 58, 0.1);
  box-shadow: 0 1px 3px rgba(123, 31, 58, 0.06);
}

.mobile-menu {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(12px);
}

.nav-link-active {
  color: #7B1F3A !important;
  background: rgba(123, 31, 58, 0.08);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
