<template>
  <section class="section-container font-poppins antialiased">
    <!-- Header -->
    <div class="mb-12 text-center">
      <h2 class="text-3xl font-bold text-gray-800 md:text-4xl">{{ sectionState.title }}</h2>
      <p class="mt-3 text-sm text-gray-500 md:text-base">{{ sectionState.subtitle }}</p>
    </div>

    <!-- Logos -->
    <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12">
      <div
        v-for="(client, index) in sectionState.items"
        :key="index"
        class="client-logo-wrap"
      >
        <component
          :is="client.link ? 'a' : 'span'"
          :href="client.link || undefined"
          :target="client.link ? '_blank' : undefined"
          rel="noopener"
        >
          <img
            :src="client.image"
            :alt="client.alt"
            class="h-10 w-auto object-contain opacity-80 transition-opacity duration-200 hover:opacity-100 md:h-12"
          />
        </component>
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
  title: 'Our Clients',
  subtitle: 'Trusted by leading companies around the world',
  items: [
    { alt: 'BCA Finance',                image: 'https://logo.clearbit.com/bcafinance.co.id',         link: '' },
    { alt: 'Suzuya',                      image: 'https://logo.clearbit.com/suzuya.co.id',              link: '' },
    { alt: 'The Coffee Crowd',            image: 'https://logo.clearbit.com/thecoffeecrowd.com',        link: '' },
    { alt: 'Hana Bank',                   image: 'https://logo.clearbit.com/hanabank.co.id',            link: '' },
    { alt: 'Hartech',                     image: 'https://logo.clearbit.com/hartech.co.id',             link: '' },
    { alt: 'Inter Pan',                   image: 'https://logo.clearbit.com/interpan.co.id',            link: '' },
    { alt: 'Shihlin',                     image: 'https://logo.clearbit.com/shihlin.com',               link: '' },
    { alt: 'Yumeida',                     image: 'https://logo.clearbit.com/yumeida.co.id',             link: '' },
    { alt: 'ABC',                         image: 'https://logo.clearbit.com/abc.co.id',                 link: '' },
    { alt: 'Pupuk Indonesia Logistik',    image: 'https://logo.clearbit.com/pupuk-indonesia.com',       link: '' },
    { alt: 'PT Solusi Inti Multiteknik',  image: 'https://logo.clearbit.com/sim.co.id',                 link: '' },
    { alt: 'GVS Distribution',           image: 'https://logo.clearbit.com/gvsdistribution.com',       link: '' },
    { alt: 'Rossy',                       image: 'https://logo.clearbit.com/rossy.co.id',               link: '' },
    { alt: 'Tea Garden',                  image: 'https://logo.clearbit.com/teagarden.co.id',           link: '' },
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

  const mainObj  = getItemByTag('clients_main30', source)[0] || {};
  const itemObjs = getItemByTag('clients_item30', source);

  sectionState.value = {
    title:    getField(mainObj, 'title', 'heading')    || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({
          alt:   getField(item, 'title', 'alt'),
          image: getField(item, 'image', 'url'),
          link:  getField(item, 'link', 'url'),
        }))
      : baseSection.items,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.client-logo-wrap img {
  filter: grayscale(20%);
  transition: filter 0.2s ease, opacity 0.2s ease;
}
.client-logo-wrap:hover img {
  filter: grayscale(0%);
}
</style>
