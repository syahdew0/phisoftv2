<template>
  <section class="section-container font-poppins antialiased">
    <!-- Section header -->
    <div class="section-head text-center">
      <span class="section-kicker">{{ sectionState.badge }}</span>
      <h2 class="section-title">{{ sectionState.title }}</h2>
      <p class="section-subtitle">{{ sectionState.subtitle }}</p>
    </div>

    <!-- Products: alternating rows -->
    <div class="mt-16 flex flex-col gap-16">
      <div
        v-for="(product, index) in sectionState.items"
        :key="index"
        class="flex flex-col items-center gap-10 lg:flex-row"
        :class="{ 'lg:flex-row-reverse': index % 2 === 1 }"
      >
        <!-- Image side -->
        <div class="flex w-full items-center justify-center lg:w-1/2">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full max-w-lg object-contain drop-shadow-md"
          />
        </div>

        <!-- Text card -->
        <div class="w-full lg:w-1/2">
          <div class="product-card rounded-2xl border border-gray-200 bg-white p-8">
            <h3 class="text-xl font-semibold text-gray-800">{{ product.title }}</h3>
            <div class="mt-2 h-0.5 w-full bg-[#1a6e80] rounded"></div>
            <p class="mt-5 text-sm leading-relaxed text-gray-600 md:text-base">{{ product.content }}</p>
            <component
              :is="product.link && product.link.startsWith('/') ? 'router-link' : 'a'"
              :to="product.link && product.link.startsWith('/') ? product.link : undefined"
              :href="product.link && !product.link.startsWith('/') ? product.link : undefined"
              class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#7B1F3A]"
            >
              <i class="fas fa-chevron-right text-xs"></i>
              Learn More
            </component>
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
  badge: 'Our Products',
  title: 'Technology of the Future',
  subtitle: 'We are proud to introduce to you our best software solutions.',
  items: [
    {
      title: 'Ontime Payroll (OTP)',
      content: 'OnTime Payroll is a Software as a Service (SaaS) application that has many tools to help manage your Employee Attendance and Payroll. Starting from Employee management, work schedules, Permissions, Sickness & Leave, Attendance Process, Payroll Process and many other features.',
      link: 'https://www.programgaji.com/',
      image: 'https://apicompro.phisoft.co.id/uploads/1781172200122-OTP.2d0d1f1f.png',
    },
    {
      title: 'BIS Accounting',
      content: 'BIS Accounting is a Software as a Service (SaaS) application that has many tools to help manage your business. Starting from inventory, transactions, reports, customers, suppliers and many other features.',
      link: 'https://www.bisaccounting.com/',
      image: 'https://apicompro.phisoft.co.id/uploads/1781172210390-BIS.be554b87.png',
    },
    {
      title: 'Phipos',
      content: 'PhiPOS is a point-of-sale system that aim to help all merchant in growing their businesses. All feature of PhiPOS are run on a real time basis using cloud which means you can monitor all data from the dashboard from the comfort of your home.',
      link: 'https://pos.phisoft.co.id/',
      image: 'https://apicompro.phisoft.co.id/uploads/1781172204796-phipos.faea41a1.png',
    },
    {
      title: 'Cloud Homes',
      content: 'Cloud Homes is a modern property management platform that helps real estate agents, landlords, and tenants manage properties, contracts, and payments seamlessly through the cloud.',
      link: 'https://cloudhomes.id/',
      image: 'https://apicompro.phisoft.co.id/uploads/1781172217488-cloudhomes.26f4afaa.png',
    },
    {
      title: 'Ficus',
      content: 'Ficus is an enterprise resource planning (ERP) solution designed to streamline business operations including procurement, inventory, finance, and human resources in a single integrated platform.',
      link: 'https://ficus.phisoft.co.id/',
      image: 'https://apicompro.phisoft.co.id/uploads/1781181995892-Screenshot%202026-06-11%20at%2019.41.34.png',
    },
    {
      title: 'AI CV Screening',
      content: 'AI CV Screening automates the recruitment process by using artificial intelligence to analyze, rank, and shortlist candidates based on job requirements, saving HR teams significant time and effort.',
      link: 'https://aicv.psggroup.id/',
      image: 'https://apicompro.phisoft.co.id/uploads/1781181986298-Screenshot%202026-06-11%20at%2019.43.19.png',
    },
    {
      title: 'Kerja AI',
      content: 'Kerja AI is an intelligent workforce management tool that leverages AI to optimize scheduling, task assignment, and performance tracking for teams across various industries.',
      link: 'https://kerja.ai',
      image: 'https://apicompro.phisoft.co.id/uploads/1781181948535-Screenshot%202026-06-11%20at%2019.43.45.png',
    },
    {
      title: 'Relasi AI',
      content: 'Relasi AI is a smart CRM powered by artificial intelligence that helps businesses build stronger customer relationships through automated follow-ups, sentiment analysis, and personalized engagement.',
      link: 'https://relasi.ai/',
      image: 'https://apicompro.phisoft.co.id/uploads/1781181964273-Screenshot%202026-06-11%20at%2019.43.30.png',
    },
    {
      title: 'Melody V2',
      content: 'Comiing soon',
      link: '/products/melody-v2',
      image: 'https://apicompro.phisoft.co.id/uploads/1781182028235-Screenshot%202026-06-11%20at%2019.44.51.png',
    },
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

  const badgeObj = getItemByTag('products_badge30', source)[0] || {};
  const mainObj  = getItemByTag('products_main30', source)[0] || {};
  const itemObjs = getItemByTag('products_item30', source);

  sectionState.value = {
    badge:    getField(badgeObj, 'title', 'content') || baseSection.badge,
    title:    getField(mainObj, 'title', 'heading')  || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({
          title:   getField(item, 'title', 'name'),
          content: getField(item, 'content', 'description'),
          link:    getField(item, 'link', 'url') || '#',
          image:   getField(item, 'image', 'url'),
        }))
      : baseSection.items,
  };
};

watch(() => props.pageData, () => applyContentFromProps(), { deep: true, immediate: true });
onMounted(() => { applyContentFromProps(); });
</script>

<style scoped>
.product-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}
.product-card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.10);
}
</style>
