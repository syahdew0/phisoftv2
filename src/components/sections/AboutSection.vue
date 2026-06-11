<template>
  <section class="section-container font-poppins antialiased bg-[#6b1a33]">
    <div class="relative w-full flex flex-col-reverse xl:flex-row lg:flex-row items-start justify-between gap-10">

      <!-- Left: Text + Features -->
      <div class="w-full xl:w-1/2 px-2 md:px-4 xl:px-0">
        <span class="section-kicker !text-[#C9A84C] !bg-white/10">{{ sectionState.badge }}</span>
        <h2 class="mt-3 text-2xl font-semibold text-white sm:text-4xl md:text-4xl xl:text-4xl max-w-xl leading-tight">
          {{ sectionState.title }}
        </h2>
        <div class="about-title-line mt-3 mb-6"></div>
        <p class="text-base font-light leading-relaxed text-white/80 md:text-lg max-w-lg">
          {{ sectionState.content }}
        </p>

        <!-- <div class="mt-8 space-y-4">
          <div
            v-for="(attr, index) in sectionState.attributes"
            :key="index"
            class="about-feature-row flex items-start gap-3 py-4"
          >
            <div class="feature-icon-wrap flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDF0F3] text-[#7B1F3A] transition-all duration-300">
              <i class="fas fa-check text-sm"></i>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">{{ attr.title }}</h4>
              <p class="mt-0.5 text-sm text-gray-500">{{ attr.content }}</p>
            </div>
          </div>
        </div> -->

        <div class="mt-8">
          <router-link to="/contact"
            class="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-6 py-2.5 text-sm font-medium text-[#7B1F3A] transition-all duration-300 hover:bg-transparent hover:text-white">
            Read More<i class="fas fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1"></i>
          </router-link>
        </div>
      </div>

      <!-- Right: Image -->
      <div class="w-full xl:w-1/2">
        <div class="about-image-card relative overflow-hidden rounded-3xl shadow-xl">
          <img
            :src="sectionState.image"
            :alt="sectionState.title"
            class="h-[320px] w-full object-cover md:h-[460px] hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#7B1F3A]/60 via-transparent to-transparent"></div>
        
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
const props = defineProps({
  pageData: { type: Object, default: () => ({}) },
});

const baseSection = {
  badge: 'About Us',
  title: 'Welcome to PHISOFT',
  content: 'PHISOFT is a tech company not only a software house. We focus on manufacturing and development of the technology and provide technology as a service.',
  image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80',
  attributes: [
    { title: 'Integritas', content: 'Komitmen pada standar kerja yang etis' },
    { title: 'Inovasi', content: 'Strategi adaptif untuk tantangan modern' },
    { title: 'Kolaboratif', content: 'Bekerja sebagai perpanjangan tim Anda' },
    { title: 'Berorientasi Hasil', content: 'Fokus pada dampak bisnis yang nyata' },
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
  const badgeObj = getItemByTag('about_badge30', source)[0] || {};
  const mainObj = getItemByTag('about_main30', source)[0] || {};
  const atributObjs = getItemByTag('about_atribut30', source);
  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    content: getField(mainObj, 'content', 'subtitle') || baseSection.content,
    image: getField(mainObj, 'image', 'url') || baseSection.image,
    attributes: atributObjs.length > 0
      ? atributObjs.map(attr => ({
          title: getField(attr, 'title', 'name'),
          content: getField(attr, 'content', 'description'),
        }))
      : baseSection.attributes,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.about-title-line {
  width: 40px;
  height: 2px;
  background: #C9A84C;
  border-radius: 2px;
}
.about-feature-row {
  border-bottom: 1px solid #f3f4f6;
}
.about-feature-row:last-child {
  border-bottom: none;
}
.about-image-card {
  border: 1px solid rgba(123, 31, 58, 0.15);
}
</style>
