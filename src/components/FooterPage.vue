<template>
  <footer class="footer-shell font-poppins antialiased">

    <!-- Main footer content -->
    <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 xl:px-4">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <span class="text-xl font-bold text-gray-800">{{ footerState.brand.name }}</span>
          </div>
          <p class="text-sm leading-relaxed text-gray-500 max-w-xs">
            {{ footerState.brand.description }}
          </p>
          <div class="mt-5 flex gap-3">
            <a
              v-for="social in footerState.socials"
              :key="social.icon"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social-btn flex h-9 w-9 items-center justify-center rounded-lg"
            >
              <i :class="social.icon" class="text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-5 text-sm font-semibold text-gray-800">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="link in footerState.links" :key="link.path">
              <router-link
                :to="link.path"
                class="text-sm text-gray-500 transition-colors duration-200 hover:text-[#752918]"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Us -->
        <div>
          <h3 class="mb-5 text-sm font-semibold text-gray-800">Contact Us</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3 text-sm text-gray-500">
              <i class="fas fa-phone mt-0.5 text-[#752918] shrink-0"></i>
              <span>{{ footerState.contact.phone }}</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-500">
              <i class="fas fa-envelope mt-0.5 text-[#752918] shrink-0"></i>
              <span>{{ footerState.contact.email }}</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-500">
              <i class="fas fa-map-marker-alt mt-0.5 text-[#752918] shrink-0"></i>
              <span>{{ footerState.contact.address }}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="mx-auto max-w-7xl px-6 py-4 md:px-10 xl:px-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p class="text-xs text-gray-500">
          © {{ currentYear }} {{ footerState.brand.name }}. All Rights Reserved.
        </p>
        <p class="text-xs text-gray-500">
          {{ footerState.brand.operationalHours }}
        </p>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const FOOTER_PAGE = 'Footer';
const FOOTER_STORAGE_KEY = `customPageData:${FOOTER_PAGE}`;

/* global defineProps */
const props = defineProps({
  pageData: { type: Object, default: () => ({}) },
});

const currentYear = computed(() => new Date().getFullYear());

const baseSection = {
  brand: {
    name: 'PHISOFT',
    description: 'PT Pasifik Hoki Indonesia — A member of PSG Group',
    operationalHours: 'Operational Hours: Monday - Friday (09:00 - 16:00)',
  },
  contact: {
    phone: '(081) 11623222',
    email: 'halo@phisoft.co.id',
    address: 'Gold Coast Office, Liberty Tower OTB 20B Pantai Indah Kapuk, Kota Jakarta Utara, DKI Jakarta, 14470 - Indonesia',
  },
  socials: [
    { icon: 'fab fa-linkedin', link: '#' },
    { icon: 'fab fa-instagram', link: '#' },
  ],
  links: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
};

const footerState = ref({
  brand: { ...baseSection.brand },
  contact: { ...baseSection.contact },
  socials: [...baseSection.socials],
  links: [...baseSection.links],
});

const getCachedData = () => {
  if (typeof window === 'undefined') return null;
  try { const raw = localStorage.getItem(FOOTER_STORAGE_KEY); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
};

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') { try { return JSON.parse(data); } catch { return null; } }
  return data;
};

const getItemByTag = (tag, allData) => {
  const section = allData?.[tag];
  if (!section) return [];
  const parseItem = (item) => parse(item) || {};
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)];
};

const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');

const applyContent = () => {
  const cached = getCachedData();
  const source = (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) || cached || {};

  const brandObj   = getItemByTag('footer_brand30',   source)[0] || {};
  const contactObj = getItemByTag('footer_contact30', source)[0] || {};
  const socialObjs = getItemByTag('footer_social30',  source);
  const linkObjs   = getItemByTag('footer_link30',    source);

  footerState.value = {
    brand: {
      name:             getField(brandObj, 'name', 'title')             || baseSection.brand.name,
      description:      getField(brandObj, 'description', 'content')    || baseSection.brand.description,
      operationalHours: getField(brandObj, 'operationalHours', 'hours') || baseSection.brand.operationalHours,
    },
    contact: {
      phone:   getField(contactObj, 'phone',   'tel')     || baseSection.contact.phone,
      email:   getField(contactObj, 'email',   'mail')    || baseSection.contact.email,
      address: getField(contactObj, 'address', 'location')|| baseSection.contact.address,
    },
    socials: socialObjs.length > 0
      ? socialObjs.map(s => ({ icon: getField(s, 'icon', 'class') || '#', link: getField(s, 'link', 'url') || '#' }))
      : baseSection.socials,
    links: linkObjs.length > 0
      ? linkObjs.map(l => ({ label: getField(l, 'label', 'title'), path: getField(l, 'path', 'url') || '/' }))
      : baseSection.links,
  };
};

watch(() => props.pageData, () => applyContent(), { deep: true, immediate: true });
onMounted(() => { applyContent(); });
</script>

<style scoped>
.footer-shell {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
}
.footer-bottom {
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}
.footer-social-btn {
  border: 1px solid #e5e7eb;
  color: #6b7280;
  transition: all 0.2s;
}
.footer-social-btn:hover {
  border-color: #752918;
  color: #752918;
  background: rgba(117, 41, 24, 0.06);
}
</style>
