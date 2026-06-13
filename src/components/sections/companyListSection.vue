<template>
  <section class="section-container">
    <div class="section-head">
      <span class="section-kicker">{{ sectionState.badge }}</span>
      <h2 class="section-title">{{ sectionState.title }}</h2>
      <p class="section-subtitle">{{ sectionState.subtitle }}</p>
    </div>

    <div class="mb-10 flex flex-wrap justify-center gap-3">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectedCategory = category.id"
        :class="[
          'category-pill rounded-full border-2 px-5 py-2 text-sm font-medium transition-all duration-300',
          selectedCategory === category.id ? 'category-pill-active' : 'category-pill-idle'
        ]"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="listing in filteredListings.slice(0, 6)"
        :key="listing.post_id"
        class="group listing-card cursor-pointer overflow-hidden"
        @click="$router.push(`/listing/${listing.post_id}`)"
      >
        <div class="relative h-56 overflow-hidden">
          <img
            :src="listing.post?.thumbnail_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80'"
            :alt="listing.post?.title"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#752918]">
            Solution
          </div>
          <div class="absolute right-3 top-3 rounded-full bg-[#752918] px-3 py-0.5 text-xs font-semibold text-white shadow-md">
            {{ formatPrice(listing.price) }}
          </div>
        </div>
        <div class="p-5">
          <h3 class="mb-2 text-lg font-semibold text-gray-800 line-clamp-2">
            {{ listing.post?.title }}
          </h3>
          <p class="mb-4 text-sm text-gray-500 line-clamp-2">
            {{ listing.post?.excerpt }}
          </p>
          <div class="flex items-center justify-between text-sm text-gray-400">
            <div class="flex items-center gap-1">
              <i class="fas fa-map-marker-alt text-[#752918]"></i>
              <span>{{ listing.kabupaten }}, {{ listing.provinsi }}</span>
            </div>
            <span class="font-semibold text-[#752918] group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
              Detail <i class="fas fa-arrow-right text-xs"></i>
            </span>
          </div>
        </div>
      </article>
    </div>

    <div class="mt-12 text-center">
      <router-link :to="sectionState.buttonLink" class="btn-primary">
        {{ sectionState.buttonText }}
        <i class="fas fa-arrow-right"></i>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({
  pageData: { type: Object, default: () => ({}) },
});

const baseSection = {
  badge: 'Portofolio Layanan',
  title: 'Jelajahi Solusi Kami',
  subtitle: 'Eksplorasi berbagai layanan dan studi kasus yang kami kerjakan untuk klien',
  buttonText: 'Lihat Semua Solusi',
  buttonLink: '/listing',
};

const sectionState = ref({ ...baseSection });
const listings = ref([]);
const categories = ref([{ id: null, name: 'Semua' }]);
const selectedCategory = ref(null);

const LISTING_TYPE = window.LISTING_TYPE || 1;
const LISTING_DISPLAY_IN = window.LISTING_DISPLAY_IN || 8;

const filteredListings = computed(() => {
  if (!selectedCategory.value) return listings.value;
  return listings.value.filter(listing =>
    listing.post?.categories?.some(cat => cat.id === selectedCategory.value)
  );
});

const formatPrice = (price) => {
  if (!price) return 'Hubungi Kami';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
};

const fetchListings = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.listings, { params: { listing_type: LISTING_TYPE } });
    const data = response?.data?.data || response?.data || [];
    listings.value = data.filter(listing => listing.listing_type === LISTING_TYPE);

    const categoriesMap = {};
    listings.value.forEach(listing => {
      (listing.post?.categories || []).forEach(cat => {
        if (cat.display_in === LISTING_DISPLAY_IN) {
          categoriesMap[cat.id] = { id: cat.id, name: cat.name, slug: cat.slug };
        }
      });
    });
    categories.value = [{ id: null, name: 'Semua' }, ...Object.values(categoriesMap)];
  } catch (error) {
    console.warn('Failed to fetch listings', error);
  }
};

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
  const badgeObj = getItemByTag('propertyList_badge30', source)[0] || {};
  const mainObj = getItemByTag('propertyList_main30', source)[0] || {};
  const buttonObj = getItemByTag('propertyList_button30', source)[0] || {};
  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    buttonText: getField(buttonObj, 'title', 'text') || baseSection.buttonText,
    buttonLink: getField(buttonObj, 'link', 'url') || baseSection.buttonLink,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); fetchListings(); });
</script>

<style scoped>
.category-pill-active { border-color: #752918; background: #752918; color: #fff; box-shadow: 0 8px 20px -10px rgba(123, 31, 58, 0.6); }
.category-pill-idle { border-color: #d1d5db; background: #ffffff; color: #374151; }
.category-pill-idle:hover { border-color: #752918; color: #752918; }
.listing-card {
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}
.listing-card:hover {
  box-shadow: 0 10px 28px rgba(24,106,133,0.12);
  transform: translateY(-2px);
}
</style>
