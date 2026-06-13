<template>
  <section class="section-container">
    <div class="section-head">
      <span class="section-kicker">{{ sectionState.badge }}</span>
      <h2 class="section-title">{{ sectionState.title }}</h2>
      <p class="section-subtitle">{{ sectionState.subtitle }}</p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <article v-for="testimonial in testimonials" :key="testimonial.id || testimonial.name" class="testimonial-card relative p-7">
        <div class="mb-4 text-[#752918] opacity-20"><i class="fas fa-quote-left text-4xl"></i></div>
        <div class="mb-3 flex items-center gap-0.5">
          <i v-for="star in 5" :key="star" class="fas fa-star text-yellow-400 text-sm"></i>
        </div>
        <p class="mb-6 text-gray-600 text-sm leading-relaxed italic">{{ testimonial.content }}</p>
        <div class="flex items-center gap-3 border-t border-gray-100 pt-5">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#752918] text-xs font-bold text-white">
            <img v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.name" class="h-full w-full object-cover" />
            <span v-else>{{ getInitials(testimonial.name) }}</span>
          </div>
          <div>
            <h4 class="font-semibold text-gray-800 text-sm">{{ testimonial.name }}</h4>
            <p class="text-xs text-gray-500 mt-0.5">{{ testimonial.role }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

/* global defineProps */
const props = defineProps({ pageData: { type: Object, default: () => ({}) } });

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

const baseSection = {
  badge: 'Testimoni',
  title: 'Apa Kata Mereka?',
  subtitle: 'Kepuasan klien adalah prioritas utama kami. Berikut pengalaman mereka bersama kami.',
};

const sectionState = ref({ ...baseSection });
const testimonials = ref([]);

const fallbackTestimonials = [
  { id: 1, name: 'Budi Santoso', role: 'Direktur Operasional', avatar: null, content: '"Pendekatan tim sangat terstruktur. Dalam beberapa bulan, proses internal kami jadi lebih efisien dan terukur."' },
  { id: 2, name: 'Siti Nurhaliza', role: 'Head of Business Development', avatar: null, content: '"Kami terbantu dalam menyusun strategi ekspansi yang realistis. Insight-nya tajam dan mudah dieksekusi."' },
  { id: 3, name: 'Ahmad Wijaya', role: 'CEO Startup Teknologi', avatar: null, content: '"Kolaborasinya cepat, komunikatif, dan fokus ke hasil. Dampaknya langsung terasa pada performa tim kami."' },
];

const getInitials = (name) => {
  if (!name) return '?';
  const parts = String(name).trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return String(name).slice(0, 2).toUpperCase();
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

const stripHtml = (html) => {
  if (!html) return '';
  if (typeof DOMParser === 'undefined') return String(html);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const applyContentFromProps = () => {
  const cached = getCachedHomeData();
  const source = (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) || cached || {};
  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');
  const badgeObj = getItemByTag('testimoni_badge30', source)[0] || {};
  const titleObj = getItemByTag('testimoni_title30', source)[0] || {};
  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(titleObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(titleObj, 'content', 'subtitle') || baseSection.subtitle,
  };
};

const fetchTestimonials = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.testimonials);
    const data = response?.data?.data || response?.data || [];
    testimonials.value = (Array.isArray(data) ? data : []).map(item => ({
      id: item.id,
      name: item.author_name || item.title || 'Anonim',
      role: item.author_position || item.excerpt || '',
      avatar: item.thumbnail_url || null,
      content: `"${stripHtml(item.content || '').trim()}"`,
    }));
    if (!testimonials.value.length) testimonials.value = fallbackTestimonials;
  } catch (error) {
    testimonials.value = fallbackTestimonials;
  }
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); fetchTestimonials(); });
</script>

<style scoped>
.testimonial-card {
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.testimonial-card:hover {
  box-shadow: 0 8px 24px rgba(123, 31, 58, 0.10);
  transform: translateY(-2px);
}
</style>
