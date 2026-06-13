<template>
  <section class="section-container font-poppins antialiased">
    <div class="contact-shell overflow-hidden rounded-2xl">
      <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        <!-- Left: CTA -->
        <div class="contact-left p-8 md:p-12">
          <span class="section-kicker">{{ sectionState.badge }}</span>
          <h2 class="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">{{ sectionState.title }}</h2>
          <p class="mt-4 max-w-md text-base leading-relaxed text-[#E8D08A]">{{ sectionState.subtitle }}</p>
          <router-link to="/contact" class="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-6 py-2.5 text-sm font-medium text-[#752918] shadow-lg transition-all duration-300 hover:bg-[#752918] hover:text-white hover:scale-105">
            Hubungi Sekarang <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
        </div>

        <!-- Right: Contact Info Cards -->
        <div class="contact-right grid content-center gap-4 p-6 md:p-8">
          <div v-for="(info, index) in sectionState.contactInfo" :key="index" class="contact-info-card p-4">
            <div class="flex items-center gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#752918] text-white">
                <i :class="info.icon || 'fas fa-info'" class="text-sm"></i>
              </div>
              <div class="min-w-0">
                <p class="text-xs font-semibold uppercase tracking-wider text-[#752918]">{{ info.title }}</p>
                <a v-if="info.link || info.Link" :href="info.link || info.Link" class="mt-0.5 block text-sm font-medium text-gray-800 break-all hover:text-[#752918] transition-colors">{{ info.link || info.Link }}</a>
                <p v-else class="mt-0.5 text-sm font-medium text-gray-800">{{ info.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({ pageData: { type: Object, default: () => ({}) } });

const baseSection = {
  badge: 'Hubungi Kami',
  title: 'Mari Diskusikan Kebutuhan Bisnis Anda',
  subtitle: 'Hubungi kami untuk konsultasi awal dan temukan solusi paling tepat untuk perusahaan Anda',
  contactInfo: [
    { icon: 'fas fa-phone', title: 'Telepon', link: 'tel:+6281234567890' },
    { icon: 'fas fa-envelope', title: 'Email', link: 'mailto:hello@companyprofile.com' },
    { icon: 'fas fa-map-marker-alt', title: 'Alamat', content: 'Jakarta, Indonesia' },
  ],
};

const sectionState = ref({ ...baseSection });

const getCachedHomeData = () => {
  if (typeof window === 'undefined') return null;
  try { const raw = localStorage.getItem(HOME_STORAGE_KEY); return raw ? JSON.parse(raw) : null; }
  catch (error) { return null; }
};

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') { try { return JSON.parse(data); } catch (err) { return null; } }
  return data;
};

const getItemByTag = (tag, allData) => {
  const section = allData?.[tag];
  if (!section) return [];
  const parseItem = (item) => parse(item) || {};
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)];
};

const applyContentFromProps = () => {
  const cached = getCachedHomeData();
  const source = (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) || cached || {};
  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');
  const badgeObj = getItemByTag('contact_home_badge30', source)[0] || {};
  const mainObj = getItemByTag('contact_home_main30', source)[0] || {};
  const infoObjs = getItemByTag('contact_home_info30', source);
  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    contactInfo: infoObjs.length > 0
      ? infoObjs.map(info => ({ icon: getField(info, 'icon', 'iconClass'), title: getField(info, 'title', 'name'), link: getField(info, 'link', 'Link'), content: getField(info, 'content', 'description') }))
      : baseSection.contactInfo,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.contact-shell {
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 32px rgba(123, 31, 58, 0.10);
}
.contact-left {
  background: linear-gradient(135deg, #752918, #C9A84C);
}
.contact-left .section-kicker {
  background: rgba(255,255,255,0.15);
  color: #ffffff;
}
.contact-right {
  background: #f9fafb;
}
.contact-info-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
</style>
