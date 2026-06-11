<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="page-header py-16 text-center text-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <span class="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">Pusat Bantuan</span>
        <h1 class="mt-4 text-4xl font-bold md:text-5xl">Bantuan & Dukungan</h1>
        <p class="mx-auto mt-4 max-w-xl text-[#E8D08A]">Temukan jawaban untuk pertanyaan Anda atau hubungi tim dukungan kami</p>
      </div>
    </div>

    <div class="section-container">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="topic in helpTopics" :key="topic.title" class="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-[#7B1F3A]/30 hover:shadow-md">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF0F3] text-[#7B1F3A]">
            <i :class="topic.icon" class="text-lg"></i>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-800">{{ topic.title }}</h3>
          <p class="text-sm text-gray-500">{{ topic.description }}</p>
        </div>
      </div>

      <div class="mt-16 rounded-2xl p-10 text-center text-white cta-band">
        <h2 class="text-3xl font-bold">Masih butuh bantuan?</h2>
        <p class="mx-auto mt-3 max-w-md text-[#E8D08A]">Tim kami siap membantu Anda. Hubungi kami melalui email atau telepon.</p>
        <router-link to="/contact" class="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#7B1F3A] shadow-lg transition hover:shadow-xl hover:scale-105">
          Hubungi Tim Dukungan <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const helpTopics = [
  { icon: 'fas fa-rocket', title: 'Memulai', description: 'Panduan lengkap untuk memulai kerja sama dengan tim kami dari awal.' },
  { icon: 'fas fa-cogs', title: 'Konfigurasi Layanan', description: 'Cara mengatur dan menyesuaikan layanan dengan kebutuhan spesifik Anda.' },
  { icon: 'fas fa-credit-card', title: 'Pembayaran & Invoice', description: 'Informasi tentang metode pembayaran, invoice, dan penagihan.' },
  { icon: 'fas fa-shield-alt', title: 'Keamanan Data', description: 'Kebijakan keamanan dan perlindungan data bisnis Anda bersama kami.' },
  { icon: 'fas fa-chart-bar', title: 'Laporan & Analitik', description: 'Cara membaca dan memahami laporan kinerja dari layanan kami.' },
  { icon: 'fas fa-life-ring', title: 'Dukungan Teknis', description: 'Panduan troubleshooting dan cara menghubungi tim teknis kami.' },
];
</script>

<style scoped>
.page-header { background: linear-gradient(135deg, #7B1F3A, #4A1020); }
.cta-band { background: linear-gradient(135deg, #7B1F3A, #C9A84C); }
</style>
