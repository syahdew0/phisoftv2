<template>
  <div class="min-h-screen">
    <div v-if="isLoading" class="flex min-h-[60vh] items-center justify-center">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-maroon-500 border-t-transparent"></div>
    </div>

    <div v-else-if="listing" class="section-container">
      <!-- Back -->
      <router-link to="/listing" class="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-maroon-700">
        <i class="fas fa-arrow-left"></i> Kembali ke Daftar
      </router-link>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
        <!-- Main Content -->
        <div>
          <div class="overflow-hidden rounded-2xl">
            <img
              :src="listing.post?.thumbnail_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'"
              :alt="listing.post?.title"
              class="h-80 w-full object-cover md:h-96"
            />
          </div>

          <div class="mt-8">
            <h1 class="text-3xl font-bold text-slate-900 md:text-4xl" style="font-family:'Outfit',sans-serif;">
              {{ listing.post?.title }}
            </h1>
            <div v-if="listing.post?.content" class="prose prose-slate mt-6 max-w-none" v-html="listing.post.content"></div>
            <p v-else class="mt-6 text-slate-600 leading-relaxed">{{ listing.post?.excerpt }}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:sticky lg:top-28 lg:h-fit space-y-5">
          <div class="rounded-2xl border border-maroon-200/50 bg-gradient-to-br from-maroon-50 to-white p-6">
            <div class="text-3xl font-bold text-maroon-700">{{ formatPrice(listing.price) }}</div>
            <div class="mt-4 space-y-3 text-sm text-slate-600">
              <div class="flex items-center gap-2"><i class="fas fa-map-marker-alt w-5 text-maroon-600"></i> {{ listing.kabupaten }}, {{ listing.provinsi }}</div>
            </div>
            <router-link to="/contact" class="btn-primary mt-6 w-full justify-center">
              Hubungi Kami <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>

          <div v-if="listing.post?.categories?.length" class="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 class="mb-3 font-semibold text-slate-800">Kategori</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="cat in listing.post.categories" :key="cat.id" class="rounded-full bg-maroon-50 px-3 py-1 text-xs font-semibold text-maroon-700">
                {{ cat.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex min-h-[60vh] flex-col items-center justify-center text-slate-400">
      <i class="fas fa-exclamation-circle mb-4 text-5xl"></i>
      <p class="text-lg">Data tidak ditemukan.</p>
      <router-link to="/listing" class="btn-primary mt-6">Kembali ke Daftar</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const route = useRoute();
const listing = ref(null);
const isLoading = ref(true);

const formatPrice = (price) => {
  if (!price) return 'Hubungi Kami';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
};

const fetchListing = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(API_ENDPOINTS.listingDetail(route.params.id));
    listing.value = response.data?.data || response.data || null;
  } catch (error) {
    console.warn('Failed to fetch listing detail', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => { fetchListing(); });
</script>
