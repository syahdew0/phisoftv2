<template>
  <section class="whyus-shell font-poppins antialiased bg-white">
    <div class="relative overflow-hidden">
      <!-- Circuit board decoration (right side, very subtle) -->
      <!-- <div
        class="absolute right-0 top-0 h-full w-1/2 pointer-events-none opacity-[0.05]"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80'); background-size: cover; background-position: center;"
      ></div> -->

      <div class="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 xl:px-4">
        <!-- Section header -->
        <div class="mb-12 text-center">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="phi-vbar"></span>
            <span class="text-sm font-medium tracking-wider text-[#7B1F3A]">{{ sectionState.badge }}</span>
          </div>
          <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl leading-tight">
            {{ sectionState.title }}
          </h2>
          <p class="mt-4 text-sm text-gray-500 md:text-base max-w-xl mx-auto leading-relaxed">
            {{ sectionState.subtitle }}
          </p>
        </div>

        <!-- Service cards: 5 columns on xl, 3 on lg, 2 on sm -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div
            v-for="(item, index) in sectionState.items"
            :key="index"
            class="whyus-card group relative overflow-hidden rounded-2xl bg-gray-100 p-6 min-h-[220px]"
          >
            <!-- Hover background image + overlay -->
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              :style="item.image
                ? { backgroundImage: `url('${item.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : { backgroundColor: '#1f2937' }"
            >
              <div v-if="item.image" class="absolute inset-0 bg-gray-900/75"></div>
            </div>

            <!-- Card content -->
            <div class="relative z-10 flex flex-col">
              <div class="mb-5 text-[#7B1F3A] group-hover:text-white transition-colors duration-300">
                <i :class="[item.icon, 'text-4xl']"></i>
              </div>
              <h3 class="text-base font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 leading-snug">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm text-gray-500 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                {{ item.content }}
              </p>
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
const props = defineProps({
  pageData: { type: Object, default: () => ({}) },
});

const baseSection = {
  badge: 'Why choose us',
  title: 'Finding the right fit, every time',
  subtitle: 'We are more than a software house — we are your technology partner.',
  items: [
    {
      icon: 'fas fa-laptop-code',
      title: 'Custom Software Development',
      content: 'Tailored software for your business need.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
    },
    {
      icon: 'fas fa-project-diagram',
      title: 'IT Consulting & Systems Integration',
      content: 'End-to-end strategy & implementation.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    },
    {
      icon: 'fas fa-cloud',
      title: 'Cloud-Based Solutions',
      content: 'Secure and scalable cloud service.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile and Web App Development',
      content: 'Build user-friendly applications.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    },
    {
      icon: 'fas fa-robot',
      title: 'Business Automation',
      content: 'AI, machine learning, and digital transformation.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    },
  ],
};

const sectionState = ref({ ...baseSection });

const getCachedHomeData = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(HOME_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') {
    try { return JSON.parse(data); } catch (err) { return null; }
  }
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

  const badgeObj = getItemByTag('whyus_badge30', source)[0] || {};
  const mainObj = getItemByTag('whyus_main30', source)[0] || {};
  const itemObjs = getItemByTag('whyus_item30', source);

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({
          icon: getField(item, 'icon', 'class') || 'fas fa-star',
          title: getField(item, 'title', 'name'),
          content: getField(item, 'content', 'description'),
          image: getField(item, 'image', 'url'),
        }))
      : baseSection.items,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.whyus-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.whyus-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}
</style>
