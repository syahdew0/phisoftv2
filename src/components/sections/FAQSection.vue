<template>
  <section class="section-container">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-[0.88fr_1.12fr]">
      <div class="lg:sticky lg:top-28 lg:h-fit">
        <span class="section-kicker">{{ sectionState.badge }}</span>
        <h2 class="section-title text-left">{{ sectionState.title }}</h2>
        <p class="mt-4 max-w-md text-slate-700">Temukan jawaban cepat untuk pertanyaan paling umum sebelum memulai kerja sama.</p>
      </div>
      <div class="space-y-3">
        <div v-for="(faq, index) in sectionState.items" :key="index" class="faq-item overflow-hidden">
          <button @click="toggleFaq(index)" class="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[#f5ece8]/40">
            <h3 class="pr-4 text-base font-semibold text-gray-800">{{ faq.question }}</h3>
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300"
              :class="openFaq === index ? 'border-[#752918] bg-[#752918] text-white' : 'border-gray-300 text-gray-500'">
              <i :class="['fas text-xs', openFaq === index ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            </span>
          </button>
          <div v-show="openFaq === index" class="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{{ faq.answer }}</div>
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
const props = defineProps({ pageData: { type: Object, default: () => ({}) } });

const baseSection = {
  badge: 'FAQ',
  title: 'Pertanyaan yang Sering Diajukan',
  items: [
    { question: 'Layanan apa yang paling cocok untuk perusahaan saya?', answer: 'Tim kami akan melakukan asesmen singkat untuk memahami kebutuhan Anda, lalu merekomendasikan paket layanan yang paling relevan.' },
    { question: 'Apakah bisa menyesuaikan layanan dengan kebutuhan internal?', answer: 'Ya. Setiap engagement bersifat fleksibel dan dapat disesuaikan dengan target, proses, dan kapasitas tim internal Anda.' },
    { question: 'Berapa lama proses implementasi berjalan?', answer: 'Durasi bergantung pada ruang lingkup proyek. Secara umum, fase awal analisis hingga rencana aksi memakan waktu 2-6 minggu.' },
    { question: 'Apakah ada pendampingan setelah proyek selesai?', answer: 'Ada. Kami menyediakan support pasca implementasi untuk monitoring, evaluasi, dan optimasi lanjutan.' },
    { question: 'Bagaimana cara memulai kerja sama?', answer: 'Anda bisa menghubungi kami melalui form kontak. Tim kami akan mengatur sesi konsultasi awal untuk menyusun langkah berikutnya.' },
  ],
};

const sectionState = ref({ ...baseSection });
const openFaq = ref(0);
const toggleFaq = (index) => { openFaq.value = openFaq.value === index ? null : index; };

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
  const titleObj = getItemByTag('faq_title30', source)[0] || {};
  const itemObjs = getItemByTag('faq_item30', source);
  sectionState.value = {
    badge: getField(titleObj, 'title', 'badge') || baseSection.badge,
    title: getField(titleObj, 'content', 'heading') || baseSection.title,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({ question: getField(item, 'title', 'question'), answer: getField(item, 'content', 'answer') }))
      : baseSection.items,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: #ffffff;
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.faq-item:hover {
  box-shadow: 0 4px 16px rgba(123, 31, 58, 0.08);
}
</style>
