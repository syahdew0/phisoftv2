<template>
  <div id="app" class="min-h-screen flex flex-col">
    <NavbarApp />
    <main class="flex-1">
      <router-view />
    </main>
    <FooterPage />
  </div>
</template>

<script setup>
import NavbarApp from '@/components/NavbarApp.vue';
import FooterPage from '@/components/FooterPage.vue';
</script>

<style>
#app {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>