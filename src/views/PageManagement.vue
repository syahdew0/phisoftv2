<template>
  <div>
    <HeroSection :pageData="pageData" />
    <WhyUsSection :pageData="pageData" />
    
    <ServicesSection :pageData="pageData" />
    <ProductsSection :pageData="pageData" />
    <ClientsSection :pageData="pageData" />
    <AboutSection :pageData="pageData" />
    <WorkflowSection :pageData="pageData" />
    <!-- <companyListSection :pageData="pageData" /> -->
    <!-- <TestimonialsSection :pageData="pageData" />
    <FAQSection :pageData="pageData" />
    <ContactSection :pageData="pageData" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import HeroSection from '@/components/sections/HeroSection.vue';
import WhyUsSection from '@/components/sections/WhyUsSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import WorkflowSection from '@/components/sections/WorkflowSection.vue';
import ServicesSection from '@/components/sections/ServicesSection.vue';
import ProductsSection from '@/components/sections/ProductsSection.vue';
import ClientsSection from '@/components/sections/ClientsSection.vue';
// import companyListSection from '@/components/sections/companyListSection.vue';
// import TestimonialsSection from '@/components/sections/TestimonialsSection.vue';
// import FAQSection from '@/components/sections/FAQSection.vue';
// import ContactSection from '@/components/sections/ContactSection.vue';
import API_ENDPOINTS from '@/config/api';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;
const pageData = ref({});

const fetchPageData = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.customPages, {
      params: { page: HOME_PAGE }
    });
    const data = response.data?.data || response.data || {};
    pageData.value = data;
    try {
      localStorage.setItem(HOME_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
  } catch (error) {
    console.warn('Failed to fetch page data, using cached or defaults', error);
    try {
      const raw = localStorage.getItem(HOME_STORAGE_KEY);
      if (raw) pageData.value = JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to read localStorage', e);
    }
  }
};

onMounted(() => {
  fetchPageData();
});
</script>
