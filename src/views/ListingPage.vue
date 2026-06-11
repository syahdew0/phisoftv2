<template>
  <div class="min-h-screen">
    <!-- Page Header -->
    <div class="page-header py-16 text-center text-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <span class="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">Portofolio</span>
        <h1 class="mt-4 text-4xl font-bold md:text-5xl">Semua Solusi & Layanan</h1>
        <p class="mx-auto mt-4 max-w-xl text-[#E8D08A]">Temukan layanan dan studi kasus terbaik yang kami tawarkan</p>
      </div>
    </div>

    <div class="section-container">
      <!-- Filter -->
      <div class="mb-8 flex flex-wrap gap-3 justify-center">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'rounded-full border px-5 py-2.5 text-sm font-semibold transition-all',
            selectedCategory === category.id
              ? 'border-maroon-700/80 bg-gradient-to-r from-maroon-700 to-maroon-500 text-white shadow-lg shadow-maroon-900/20'
              : 'border-slate-200 bg-white text-slate-700 hover:border-maroon-500/50 hover:text-maroon-700'
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-maroon-500 border-t-transparent"></div>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="listing in filteredListings"
          :key="listing.post_id"
          class="group card cursor-pointer overflow-hidden"
          @click="$router.push(`/listing/${listing.post_id}`)"
        >
          <div class="relative h-56 overflow-hidden">
            <img
              :src="listing.post?.thumbnail_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80'"
              :alt="listing.post?.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"></div>
            <div class="absolute right-3 top-3 rounded-full bg-gradient-to-r from-maroon-700 to-maroon-500 px-3 py-1 text-xs font-bold text-white">
              {{ formatPrice(listing.price) }}
            </div>
          </div>
          <div class="p-5">
            <h3 class="mb-2 text-lg font-bold text-slate-900 line-clamp-2">{{ listing.post?.title }}</h3>
            <p class="mb-4 text-sm text-slate-500 line-clamp-2">{{ listing.post?.excerpt }}</p>
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span class="flex items-center gap-1"><i class="fas fa-map-marker-alt text-maroon-600"></i> {{ listing.kabupaten }}</span>
              <span class="font-semibold text-maroon-700">Lihat Detail →</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty -->
      <div v-if="!isLoading && filteredListings.length === 0" class="py-20 text-center text-slate-400">
        <i class="fas fa-inbox mb-4 text-5xl"></i>
        <p class="text-lg">Tidak ada data yang ditemukan.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const listings = ref([]);
const categories = ref([{ id: null, name: 'Semua' }]);
const selectedCategory = ref(null);
const isLoading = ref(true);

const LISTING_TYPE = window.LISTING_TYPE || 1;
const LISTING_DISPLAY_IN = window.LISTING_DISPLAY_IN || 8;

const filteredListings = computed(() => {
  if (!selectedCategory.value) return listings.value;
  return listings.value.filter(l => l.post?.categories?.some(c => c.id === selectedCategory.value));
});

const formatPrice = (price) => {
  if (!price) return 'Hubungi Kami';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
};

const fetchListings = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(API_ENDPOINTS.listings, { params: { listing_type: LISTING_TYPE } });
    const data = response?.data?.data || response?.data || [];
    listings.value = data.filter(l => l.listing_type === LISTING_TYPE);

    const categoriesMap = {};
    listings.value.forEach(l => {
      (l.post?.categories || []).forEach(cat => {
        if (cat.display_in === LISTING_DISPLAY_IN) {
          categoriesMap[cat.id] = { id: cat.id, name: cat.name };
        }
      });
    });
    categories.value = [{ id: null, name: 'Semua' }, ...Object.values(categoriesMap)];
  } catch (error) {
    console.warn('Failed to fetch listings', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => { fetchListings(); });
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #7B1F3A, #4A1020);
}
</style>
