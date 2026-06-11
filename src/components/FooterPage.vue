<template>
  <footer class="footer-shell font-poppins antialiased">

    <!-- Main footer content -->
    <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 xl:px-4">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <!-- <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7B1F3A] text-white">
              <i class="fas fa-building text-sm"></i>
            </div> -->
            <span class="text-xl font-bold text-gray-800">
              {{ siteInfo.name || 'PHISOFT' }}
            </span>
          </div>
          <p class="text-sm leading-relaxed text-gray-500 max-w-xs">
            {{ siteInfo.description || 'PT Pasifik Hoki Indonesia A member of PSG Group' }}
          </p>
          <div class="mt-5 flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.icon"
              :href="social.link"
              target="_blank"
              rel="noopener"
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
            <li v-for="link in quickLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="text-sm text-gray-500 transition-colors duration-200 hover:text-[#7B1F3A]"
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
              <i class="fas fa-phone mt-0.5 text-[#7B1F3A] shrink-0"></i>
              <span>{{ siteInfo.phone || '(081) 11623222' }}</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-500">
              <i class="fas fa-envelope mt-0.5 text-[#7B1F3A] shrink-0"></i>
              <span>{{ siteInfo.email || 'halo@phisoft.co.id' }}</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-500">
              <i class="fas fa-map-marker-alt mt-0.5 text-[#7B1F3A] shrink-0"></i>
              <span>{{ siteInfo.address || 'Gold Coast Office, Liberty Tower OTB 20B Pantai Indah Kapuk, Kota Jakarta Utara, DKI Jakarta, 14470 - Indonesia' }}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="mx-auto max-w-7xl px-6 py-4 md:px-10 xl:px-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p class="text-xs text-gray-500">
          © {{ currentYear }} {{ siteInfo.name || 'PT Pasifik Hoki Indonesia (PHISOFT)' }}. All Rights Reserved.
        </p>
        <p class="text-xs text-gray-500">
          Operational Hours: Monday - Friday (09:00 - 16:00)
        </p>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { computed } from 'vue';

/* global defineProps */
const props = defineProps({
  siteInfo: { type: Object, default: () => ({}) },
  footerMenu: { type: Array, default: () => [] },
});

const currentYear = computed(() => new Date().getFullYear());

const socialLinks = [
  { icon: 'fab fa-linkedin', link: '#' },
  { icon: 'fab fa-instagram', link: '#' },
];

const quickLinks = computed(() => {
  if (props.footerMenu && props.footerMenu.length > 0) {
    return props.footerMenu.map(item => ({
      label: item.title || item.name,
      path: item.url || item.link || '/',
    }));
  }
  return [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];
});
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
  border-color: #7B1F3A;
  color: #7B1F3A;
  background: rgba(123, 31, 58, 0.06);
}
</style>
