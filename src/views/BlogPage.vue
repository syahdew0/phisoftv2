<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="page-header py-16 text-center text-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <span class="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">Blog</span>
        <h1 class="mt-4 text-4xl font-bold md:text-5xl">Artikel & Insight</h1>
        <p class="mx-auto mt-4 max-w-xl text-[#E8D08A]">Temukan tips, tren, dan wawasan bisnis terkini dari tim kami</p>
      </div>
    </div>

    <div class="section-container">
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-maroon-500 border-t-transparent"></div>
      </div>

      <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in posts"
          :key="post.id || post.slug"
          class="group card cursor-pointer overflow-hidden"
          @click="$router.push(`/blog/${post.slug}`)"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="post.thumbnail_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80'"
              :alt="post.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
          </div>
          <div class="p-5">
            <div class="mb-2 flex flex-wrap gap-1">
              <span v-for="cat in (post.categories || []).slice(0,2)" :key="cat.id" class="rounded-full bg-maroon-50 px-2.5 py-0.5 text-xs font-semibold text-maroon-700">
                {{ cat.name }}
              </span>
            </div>
            <h3 class="mb-2 text-lg font-bold text-slate-900 line-clamp-2">{{ post.title }}</h3>
            <p class="mb-4 text-sm text-slate-500 line-clamp-2">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>{{ formatDate(post.created_at || post.date) }}</span>
              <span class="font-semibold text-maroon-700">Baca →</span>
            </div>
          </div>
        </article>
      </div>

      <div v-if="!isLoading && posts.length === 0" class="py-20 text-center text-slate-400">
        <i class="fas fa-newspaper mb-4 text-5xl"></i>
        <p class="text-lg">Belum ada artikel tersedia.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const posts = ref([]);
const isLoading = ref(true);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const fetchPosts = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(API_ENDPOINTS.posts);
    posts.value = response?.data?.data || response?.data || [];
  } catch (error) {
    console.warn('Failed to fetch posts', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => { fetchPosts(); });
</script>

<style scoped>
.page-header { background: linear-gradient(135deg, #752918, #4A1020); }
</style>
