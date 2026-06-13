<template>
  <div id="app" class="min-h-screen flex flex-col">
    <NavbarApp />
    <main class="flex-1">
      <router-view />
    </main>
    <FooterPage :pageData="footerPageData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavbarApp from '@/components/NavbarApp.vue';
import FooterPage from '@/components/FooterPage.vue';
import API_ENDPOINTS from '@/config/api';

const FOOTER_STORAGE_KEY = 'customPageData:Footer';
const footerPageData = ref({});

const fetchFooterData = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.customPages, {
      params: { page: 'Footer' }
    });
    const data = response.data?.data || response.data || {};
    footerPageData.value = data;
    try { localStorage.setItem(FOOTER_STORAGE_KEY, JSON.stringify(data)); } catch (e) { console.warn('localStorage write failed', e); }
  } catch (error) {
    console.warn('Failed to fetch footer data, using cached or defaults', error);
    try {
      const raw = localStorage.getItem(FOOTER_STORAGE_KEY);
      if (raw) footerPageData.value = JSON.parse(raw);
    } catch (e) { console.warn('Failed to read localStorage', e); }
  }
};

onMounted(() => { fetchFooterData(); });
</script>

<style>
#app {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>