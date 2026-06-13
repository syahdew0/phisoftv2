<template>
  <section class="hero-shell font-poppins antialiased">
    <!-- Main hero: two-column on desktop -->
    <div class="relative w-full overflow-hidden">
      <!-- Background image (visible on mobile/tablet) -->
      <div
        class="hero-bg-overlay absolute inset-0 xl:hidden"
        :style="{ backgroundImage: `url('${sectionState.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
      >
        <div class="absolute inset-0 bg-[#752918]/70"></div>
      </div>

      <div class="relative mx-auto flex max-w-7xl flex-col-reverse items-start justify-between px-6 py-10 xl:flex-row xl:py-20 md:px-10 lg:px-10 xl:px-4">
        <!-- Left: Text Content -->
        <div class="z-10 w-full xl:w-1/2 xl:py-10">
          <!-- Badge -->
          <div class="flex items-center gap-2 mb-4">
            <span class="phi-vbar"></span>
            <span class="text-sm font-medium tracking-wider text-white xl:text-[#752918]">
              {{ sectionState.badge }}
            </span>
          </div>

          <h1 class="text-3xl font-semibold leading-tight text-white xl:text-gray-700 sm:text-4xl md:text-4xl xl:text-4xl max-w-xl">
            {{ sectionState.title }}
            <span class="title-highlight relative inline-block">
              {{ sectionState.highlight }}
              <span class="title-underline absolute -bottom-1 left-0 h-2 w-full bg-[#C9A84C] opacity-30 rounded"></span>
            </span>
          </h1>

          <p class="mt-6 text-sm font-light leading-relaxed text-white xl:text-gray-700 md:text-base max-w-lg">
            {{ sectionState.subtitle }}
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <router-link :to="sectionState.primaryButton.link" class="btn-primary">
              {{ sectionState.primaryButton.text }}
              <i class="fas fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1"></i>
            </router-link>
            <!-- <router-link :to="sectionState.secondaryButton.link" class="btn-hero-secondary">
              {{ sectionState.secondaryButton.text }}
            </router-link> -->
          </div>

        </div>

        <!-- Right: Image Mosaic (xl only) -->
        <div class="z-10 hidden w-full xl:flex xl:w-1/2 xl:pl-6 items-center justify-center relative">
          <!-- Decorative circle image from home_image_title30 -->
          <img
            :src="sectionState.image"
            :alt="sectionState.imageTitle"
            class="absolute -right-10 -top-10 w-[480px] h-[480px] rounded-full object-cover"
          />
          <!-- 2×2 staggered mosaic -->
          <div class="relative z-10 flex gap-3 w-full max-w-[440px]">
            <div class="flex flex-col gap-3 w-[55%]">
              <img :src="sectionState.attributes[0]?.image" :alt="sectionState.attributes[0]?.alt"
                   class="rounded-2xl object-cover w-full h-52 shadow-lg" />
              <img :src="sectionState.attributes[2]?.image" :alt="sectionState.attributes[2]?.alt"
                   class="rounded-2xl object-cover w-full h-44 shadow-lg" />
            </div>
            <div class="flex flex-col gap-3 w-[45%] mt-12">
              <img :src="sectionState.attributes[1]?.image" :alt="sectionState.attributes[1]?.alt"
                   class="rounded-2xl object-cover w-full h-44 shadow-lg" />
              <img :src="sectionState.attributes[3]?.image" :alt="sectionState.attributes[3]?.alt"
                   class="rounded-2xl object-cover w-full h-36 shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Band -->
    <div class="stats-band relative overflow-hidden">
      <div
        class="absolute inset-0"
        :style="{ backgroundImage: `url('${sectionState.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
      >
        <div class="absolute inset-0 bg-[#752918]/70"></div>
      </div>
      <!-- <div class="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-10 xl:px-10">
        <div class="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          <div v-for="(attr, index) in sectionState.attributes" :key="'stat-' + index">
            <div class="text-5xl font-bold text-white md:text-6xl">{{ attr.value }}</div>
            <div class="mt-2 text-sm font-medium text-[#E8D08A] tracking-wide uppercase">{{ attr.label }}</div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({}),
  },
});

const baseSection = {
  badge: 'Technology Solutions',
  title: 'Empower Your Business with',
  highlight: 'Cutting-Edge Technology',
  subtitle: 'From software development to IT consulting, we provide total technology solutions tailored to your needs. Let\'s innovate and grow together.',
  primaryButton: { text: 'Chat with Us', link: '/contact' },
  secondaryButton: { text: 'Lihat Layanan', link: '/#services' },
  image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80',
  imageTitle: 'Kolaborasi Tim Profesional',
  attributes: [
    { image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', alt: 'Team Collaboration' },
    { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', alt: 'Office Space' },
    { image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80', alt: 'Team at Work' },
    { image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80', alt: 'Modern Office' },
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
  const source =
    (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) ||
    cached ||
    {};

  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');

  const badgeObj = getItemByTag('home_badge30', source)[0] || {};
  const mainObj = getItemByTag('home_main30', source)[0] || {};
  const primaryBtnObj = getItemByTag('home_buttonDaftar30', source)[0] || {};
  const secondaryBtnObj = getItemByTag('home_buttonKonsul30', source)[0] || {};
  const imageTitleItems = getItemByTag('home_image_title30', source);
  const imageTitleObj = imageTitleItems.slice().reverse().find(obj => {
    const url = obj?.image || obj?.url || '';
    return url && !url.includes('localhost');
  }) || imageTitleItems[0] || {};
  const atributObjs = getItemByTag('home_atribut30', source);

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    highlight: getField(mainObj, 'highlight', 'subtitle') || baseSection.highlight,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    primaryButton: {
      text: getField(primaryBtnObj, 'title', 'text') || baseSection.primaryButton.text,
      link: getField(primaryBtnObj, 'link', 'url') || baseSection.primaryButton.link,
    },
    secondaryButton: {
      text: getField(secondaryBtnObj, 'title', 'text') || baseSection.secondaryButton.text,
      link: getField(secondaryBtnObj, 'link', 'url') || baseSection.secondaryButton.link,
    },
    image: getField(imageTitleObj, 'image', 'url') || baseSection.image,
    imageTitle: getField(imageTitleObj, 'title', 'text') || baseSection.imageTitle,
    attributes: atributObjs.length > 0
      ? atributObjs.map(attr => ({
          image: getField(attr, 'image', 'url'),
          alt: getField(attr, 'title', 'alt'),
        }))
      : baseSection.attributes,
  };
};

watch(
  () => props.pageData,
  () => applyContentFromProps(),
  { deep: true, immediate: true }
);

onMounted(() => {
  applyContentFromProps();
});
</script>

<style scoped>
.hero-shell {
  background: #ffffff;
}
.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 2px solid #ffffff;
  background: transparent;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  transition: all 0.3s;
}
.btn-hero-secondary:hover {
  background: #ffffff;
  color: #752918;
  transform: scale(1.05);
}
@media (min-width: 1280px) {
  .btn-hero-secondary {
    border-color: #752918;
    color: #752918;
    background: transparent;
  }
  .btn-hero-secondary:hover {
    background: #752918;
    color: #ffffff;
  }
}
</style>
