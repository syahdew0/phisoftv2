<template>
  <section class="section-container font-poppins antialiased bg-[#752918]">
    <div class="flex flex-col lg:flex-row items-center gap-14 xl:gap-20">

      <!-- Left: Illustration -->
      <div class="w-full lg:w-1/2 flex items-center justify-center">
        <div class="relative w-full max-w-md">
          <!-- Main illustration card -->
          <div class="rounded-3xl bg-white/10 border border-white/15 p-10 flex flex-col items-center justify-center gap-6 min-h-[360px]">
            <!-- Numbered steps visual -->
            <div class="relative w-full max-w-xs">
              <div class="flex flex-col gap-4">
                <div v-for="(step, i) in sectionState.items" :key="i"
                  class="flex items-center gap-4 bg-white/10 rounded-2xl px-5 py-3 border border-white/10">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40">
                    <span class="text-[#C9A84C] text-sm font-bold">{{ String(i + 1).padStart(2, '0') }}</span>
                  </div>
                  <div>
                    <p class="text-white text-sm font-medium">{{ step.title }}</p>
                  </div>
                  <i :class="step.icon" class="text-white/40 ml-auto text-lg"></i>
                </div>
              </div>
              <!-- Connecting dashed line -->
              <div class="absolute left-[28px] top-10 bottom-10 w-px border-l-2 border-dashed border-white/20 -z-0 pointer-events-none"></div>
            </div>
          </div>
          <!-- Floating badge -->
          <div class="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-[#752918]/10 flex items-center justify-center">
              <i class="fas fa-check-double text-[#752918] text-sm"></i>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-800">Proven Process</p>
              <p class="text-xs text-gray-400">Structured & Flexible</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Text + Steps -->
      <div class="w-full lg:w-1/2">
        <div class="flex items-center gap-2 mb-4">
          <span class="phi-vbar !bg-[#C9A84C]"></span>
          <span class="text-sm font-medium tracking-wider text-[#C9A84C]">{{ sectionState.badge }}</span>
        </div>
        <h2 class="text-2xl font-semibold text-white sm:text-3xl xl:text-4xl leading-tight">
          {{ sectionState.title }}
        </h2>
        <div class="mt-3 mb-6 h-0.5 w-12 bg-[#C9A84C] rounded"></div>
        <p class="text-white/75 text-sm md:text-base leading-relaxed mb-10">
          {{ sectionState.subtitle }}
        </p>

        <div class="flex flex-col gap-5">
          <div
            v-for="(step, index) in sectionState.items"
            :key="index"
            class="workflow-step-row group flex items-start gap-5"
          >
            <!-- Icon circle -->
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 group-hover:bg-[#C9A84C]/20 group-hover:border-[#C9A84C]/40 transition-all duration-300">
              <i :class="step.icon" class="text-white/70 group-hover:text-[#C9A84C] text-xl transition-colors duration-300"></i>
            </div>
            <div class="pt-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[#C9A84C] text-xs font-bold tracking-widest">{{ String(index + 1).padStart(2, '0') }}</span>
                <h3 class="text-white font-semibold text-base">{{ step.title }}</h3>
              </div>
              <p class="text-white/60 text-sm leading-relaxed">{{ step.content }}</p>
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
const props = defineProps({ pageData: { type: Object, default: () => ({}) } });

const baseSection = {
  badge: 'Work Flow',
  title: 'Our Working Process',
  subtitle: 'We ensure optimal results through a structured yet flexible workflow that keeps your project on track from start to finish.',
  items: [
    { title: 'Planning',              content: 'We analyze your needs and define a clear roadmap with measurable goals.',          icon: 'fas fa-clipboard-list' },
    { title: 'Execution',             content: 'Our team builds and delivers with precision, keeping you informed at every step.',  icon: 'fas fa-cogs' },
    { title: 'Review',                content: 'We test rigorously and gather feedback to ensure the solution meets expectations.',  icon: 'fas fa-search' },
    { title: 'Continuous Improvement',content: 'Post-launch, we monitor performance and iterate to keep your system evolving.',     icon: 'fas fa-chart-line' },
  ],
};

const sectionState = ref({ ...baseSection });

const getCachedHomeData = () => {
  if (typeof window === 'undefined') return null;
  try { const raw = localStorage.getItem(HOME_STORAGE_KEY); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
};

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') { try { return JSON.parse(data); } catch { return null; } }
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
  const getField = (obj, k1, k2) => (obj ? obj[k1] || obj[k2] || '' : '');

  const badgeObj = getItemByTag('workflow_badge30', source)[0] || {};
  const mainObj  = getItemByTag('workflow_main30',  source)[0] || {};
  const itemObjs = getItemByTag('workflow_item30',  source);

  sectionState.value = {
    badge:    getField(badgeObj, 'title', 'content')    || baseSection.badge,
    title:    getField(mainObj,  'title', 'heading')    || baseSection.title,
    subtitle: getField(mainObj,  'content', 'subtitle') || baseSection.subtitle,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({
          title:   getField(item, 'title', 'name'),
          content: getField(item, 'content', 'description'),
          icon:    getField(item, 'icon', 'class') || 'fas fa-circle',
        }))
      : baseSection.items,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.workflow-step-row {
  transition: transform 0.25s ease;
}
.workflow-step-row:hover {
  transform: translateX(6px);
}
</style>
