<template>
  <section id="services" class="section-container font-poppins antialiased">
    <div class="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">

      <!-- Left: header + service list -->
      <div class="w-full lg:w-1/2">
        <div class="mb-8">
          <span class="section-kicker">{{ sectionState.badge }}</span>
          <h2 class="mt-3 text-2xl font-semibold text-gray-800 sm:text-3xl md:text-4xl leading-tight">
            {{ sectionState.title }}
          </h2>
          <p class="mt-3 text-sm text-gray-500 md:text-base max-w-lg leading-relaxed">
            {{ sectionState.subtitle }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <div
            v-for="(item, index) in sectionState.items"
            :key="index"
            class="service-row group relative cursor-default rounded-xl border border-gray-200 bg-white px-5 py-4"
          >
            <h3 class="text-base font-semibold text-[#752918] group-hover:text-[#752918] transition-colors duration-300">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 leading-relaxed">{{ item.content }}</p>
          </div>
        </div>
      </div>

      <!-- Right: featured image -->
      <div class="w-full lg:w-1/2 lg:sticky lg:top-24">
        <img
          :src="sectionState.image"
          :alt="sectionState.title"
          class="w-full h-[360px] md:h-[500px] object-cover rounded-2xl shadow-lg"
        />
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
  badge: 'Our Services',
  title: 'Comprehensive IT Solutions for Your Business',
  subtitle: 'We provide tailored technology services to help your business thrive.',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
  items: [
    { title: 'Custom Software Development', content: 'Tailored software for your business need.' },
    { title: 'IT Consulting & Systems Integration', content: 'End-to-end strategy & implementation.' },
    { title: 'Cloud-Based Solutions', content: 'Secure and scalable cloud service.' },
    { title: 'Mobile and Web App Development', content: 'Build user-friendly applications.' },
    { title: 'Business Automation', content: 'AI, machine learning, and digital transformation.' },
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

  const badgeObj = getItemByTag('service_badge30', source)[0] || {};
  const mainObj  = getItemByTag('service_main30', source)[0] || {};
  const itemObjs = getItemByTag('service_item30', source);

  sectionState.value = {
    badge:    getField(badgeObj, 'title', 'content') || baseSection.badge,
    title:    getField(mainObj, 'title', 'heading')  || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    image:    getField(mainObj, 'image', 'url')      || baseSection.image,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({
          title:   getField(item, 'title', 'name'),
          content: getField(item, 'content', 'description'),
        }))
      : baseSection.items,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.service-row {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.service-row:hover {
  transform: translateX(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
  border-color: transparent;
  z-index: 10;
}
</style>
