<template>
  <div class="font-poppins antialiased">

    <!-- ─── HERO ─────────────────────────────────────────────────────────── -->
    <section class="contact-hero relative w-full overflow-hidden">
      <!-- Background image with overlay (mobile/tablet) -->
      <div
        class="hero-bg-overlay absolute inset-0 xl:hidden"
        :style="{ backgroundImage: `url('${heroImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
      >
        <div class="absolute inset-0 bg-[#7B1F3A]/70"></div>
      </div>

      <div class="relative mx-auto flex max-w-7xl flex-col-reverse items-start justify-between px-6 py-20 md:px-10 xl:flex-row xl:px-4 xl:py-28">
        <!-- Left: Text Content -->
        <div class="z-10 w-full xl:w-1/2 xl:py-10">
          <h1 class="mt-5 text-3xl font-semibold leading-tight text-white xl:text-gray-800 sm:text-4xl md:text-4xl relative inline-block">
            Contact Information
            <span class="absolute -bottom-1 left-0 w-full h-2 bg-[#C9A84C] opacity-30 rounded"></span>
          </h1>
          <p class="mt-6 text-sm font-light leading-relaxed text-white/90 xl:text-gray-600 md:text-base max-w-lg">
            Got questions, ideas, or feedback? Reach out to us — we're here to listen, collaborate, and make things happen together!
          </p>
          <a
            href="https://wa.me/628111623222?text=Halo,%20saya%20tertarik%20dengan%20produk%20Phisoft.%20Saya%20ingin%20mencari%20tahu%20lebih%20lanjut%20tentang%20produk%20ini!"
            target="_blank" rel="noopener noreferrer"
            class="mt-8 inline-flex items-center gap-2 rounded-full bg-[#7B1F3A] px-6 py-2.5 text-sm font-medium text-white border-2 border-[#7B1F3A] shadow-lg transition-all duration-300 hover:bg-white hover:text-[#7B1F3A] hover:scale-105 xl:bg-white xl:text-[#7B1F3A] xl:hover:bg-[#7B1F3A] xl:hover:text-white"
          >
            Chat with Us
            <i class="fas fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1"></i>
          </a>
        </div>

        <!-- Right: Image (xl only) -->
        <div class="z-10 hidden w-full xl:flex xl:w-1/2 xl:pl-6 items-center justify-center relative">
          <img
            :src="heroImage"
            alt="Contact"
            class="absolute -right-10 -top-10 w-[480px] h-[480px] rounded-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- ─── CONTACT INFO ───────────────────────────────────────────────────── -->
    <section class="section-container">
      <div class="flex flex-col xl:flex-row items-center gap-12 xl:gap-16">

        <!-- Left: Illustration placeholder -->
        <div class="flex w-full xl:w-1/2 items-center justify-center">
          <div class="contact-illustration flex items-center justify-center w-full max-w-sm h-64 xl:h-80">
            <img src="https://apicompro.phisoft.co.id/uploads/1781254287039-Sent%20Message-bro.png" alt="Contact Illustration" class="w-full h-full object-contain" />
          </div>
        </div>

        <!-- Right: Contact details -->
        <div class="w-full xl:w-1/2">
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-4">
              <span class="phi-vbar"></span>
              <span class="text-sm font-medium tracking-wider text-[#7B1F3A]">Contact Us</span>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800 md:text-3xl">Let's Connect</h2>
            <div class="mt-3 mb-4 h-0.5 w-16 bg-[#7B1F3A] opacity-50 rounded"></div>
            <p class="text-gray-500 text-sm md:text-base leading-relaxed">
              Feel free to contact us anytime. We will get back to you as soon as we can.
            </p>
          </div>

          <div class="space-y-5">
            <!-- Hours -->
            <div class="contact-detail-row group flex items-start gap-5">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md group-hover:bg-[#7B1F3A] transition-all duration-300">
                <i class="fas fa-clock text-[#7B1F3A] group-hover:text-white transition-colors duration-300"></i>
              </div>
              <div>
                <p class="text-sm font-semibold text-[#7B1F3A]">Operational Hours</p>
                <p class="text-sm text-gray-700">Monday - Friday</p>
                <p class="text-sm font-medium text-gray-800">09:00 - 16:00 WIB</p>
              </div>
            </div>

            <!-- Support -->
            <div class="contact-detail-row group flex items-start gap-5">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md group-hover:bg-[#7B1F3A] transition-all duration-300">
                <i class="fas fa-headset text-[#7B1F3A] group-hover:text-white transition-colors duration-300"></i>
              </div>
              <div>
                <p class="text-sm font-semibold text-[#7B1F3A]">Support</p>
                <p class="text-sm text-gray-700">halo@phisoft.co.id</p>
                <p class="text-sm font-medium text-gray-800">(081) 11623222</p>
              </div>
            </div>

            <!-- Address -->
            <div class="contact-detail-row group flex items-start gap-5">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md group-hover:bg-[#7B1F3A] transition-all duration-300">
                <i class="fas fa-map-marker-alt text-[#7B1F3A] group-hover:text-white transition-colors duration-300"></i>
              </div>
              <div>
                <p class="text-sm font-semibold text-[#7B1F3A]">Address</p>
                <p class="text-sm text-gray-700 max-w-sm leading-relaxed">
                  Gold Coast Office, Liberty Tower OTB 20B Pantai Indah Kapuk, Kota Jakarta Utara, DKI Jakarta, 14470 - Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FORM ───────────────────────────────────────────────────────────── -->
    <section class="section-container bg-gray-50/60">
      <div class="flex flex-col-reverse xl:flex-row items-center gap-12 xl:gap-16">

        <!-- Left: Form -->
        <div class="w-full xl:w-1/2">
          <div class="flex items-center gap-2 mb-4">
            <span class="phi-vbar"></span>
            <span class="text-sm font-medium tracking-wider text-[#7B1F3A]">Get In Touch</span>
          </div>
          <h2 class="text-2xl font-semibold text-[#7B1F3A] md:text-3xl">Say Hi to the team</h2>
          <div class="mt-2 mb-5 h-1 w-14 bg-[#C9A84C] rounded"></div>
          <p class="text-gray-500 text-sm md:text-base mb-6 leading-relaxed max-w-md">
            Whether you have questions, ideas, or feedback, we're here to listen and collaborate. Simply fill out the form below, and we'll get back to you promptly.
          </p>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="relative">
              <span class="absolute left-4 top-4 text-[#7B1F3A]"><i class="fas fa-user"></i></span>
              <input v-model="form.name" type="text" required placeholder="Your Name"
                class="contact-input" />
            </div>
            <div class="relative">
              <span class="absolute left-4 top-4 text-[#7B1F3A]"><i class="fas fa-envelope"></i></span>
              <input v-model="form.email" type="email" required placeholder="Email Address"
                class="contact-input" />
            </div>
            <div class="relative">
              <span class="absolute left-4 top-4 text-[#7B1F3A]"><i class="fas fa-comment-alt"></i></span>
              <textarea v-model="form.message" rows="5" required placeholder="Message"
                class="contact-input pl-11 resize-none"></textarea>
            </div>
            <button type="submit" :disabled="isSubmitting"
              class="rounded-full bg-[#7B1F3A] px-7 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#5c1729] disabled:opacity-60">
              <span v-if="isSubmitting"><i class="fas fa-spinner fa-spin mr-2"></i>Sending...</span>
              <span v-else>send message</span>
            </button>

            <div v-if="submitStatus === 'success'" class="rounded-xl bg-[#7B1F3A]/5 border border-[#7B1F3A]/20 p-4 text-sm text-[#7B1F3A]">
              <i class="fas fa-check-circle mr-2"></i> Message Delivered! We will get back to you soon.
            </div>
            <div v-if="submitStatus === 'error'" class="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              <i class="fas fa-exclamation-circle mr-2"></i> Failed to send message. Please try again.
            </div>
          </form>
        </div>

        <!-- Right: Illustration -->
        <div class="flex w-full xl:w-1/2 items-center justify-center">
          <div class="flex items-center justify-center w-full max-w-sm h-64 xl:h-80">
            <img src="https://apicompro.phisoft.co.id/uploads/1781254293678-Server-amico.png" alt="Contact Form Illustration" class="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── MAP ────────────────────────────────────────────────────────────── -->
    <section class="section-container">
      <div class="mb-10 text-center">
        <span class="inline-block rounded-full bg-[#7B1F3A]/8 px-4 py-1.5 text-xs font-semibold text-[#7B1F3A] uppercase tracking-widest mb-4">Lokasi Kami</span>
        <h2 class="text-2xl font-semibold text-gray-800 md:text-3xl relative inline-block">
          Kunjungi Kantor Kami
          <span class="absolute -bottom-1 left-0 w-full h-1 bg-[#C9A84C] opacity-40 rounded"></span>
        </h2>
        <p class="mt-5 text-sm text-gray-500 md:text-base max-w-xl mx-auto leading-relaxed">
          Temukan lokasi kami yang strategis di Jakarta Utara. Kami siap menyambut Anda!
        </p>
      </div>
      <div class="overflow-hidden rounded-2xl shadow-lg h-[420px] md:h-[500px]">
        <iframe
          class="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.208682575002!2d106.7401227!3d-6.102575700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d241e007f0d%3A0x7bf18422ba371c19!2sGold%20Coast%20Office!5e0!3m2!1sid!2sid!4v1744441165320!5m2!1sid!2sid"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const HOME_STORAGE_KEY = 'customPageData:Home';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80';

const heroImage = ref(DEFAULT_IMAGE);

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') { try { return JSON.parse(data); } catch { return null; } }
  return data;
};

const loadHeroImage = () => {
  try {
    const raw = localStorage.getItem(HOME_STORAGE_KEY);
    const source = raw ? JSON.parse(raw) : null;
    if (!source) return;
    const section = source['home_image_title30'];
    if (!section) return;
    const items = (Array.isArray(section) ? section : [section]).map(i => parse(i) || {});
    const found = items.slice().reverse().find(obj => {
      const url = obj?.image || obj?.url || '';
      return url && !url.includes('localhost');
    }) || items[0];
    const url = found?.image || found?.url || '';
    if (url) heroImage.value = url;
  } catch { /* keep default */ }
};

onMounted(() => { loadHeroImage(); });

const form = ref({ name: '', email: '', message: '' });
const isSubmitting = ref(false);
const submitStatus = ref(null);

const submitForm = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;
  try {
    await axios.post(`${API_ENDPOINTS.createComment}`, {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    });
    submitStatus.value = 'success';
    form.value = { name: '', email: '', message: '' };
  } catch {
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-hero {
  background: linear-gradient(135deg, #7B1F3A 0%, #4A1020 100%);
}
@media (min-width: 1280px) {
  .contact-hero {
    background: #ffffff;
  }
}
.contact-input {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background: #ffffff;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  font-size: 0.875rem;
  color: #1f2937;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.contact-input::placeholder { color: #9ca3af; }
.contact-input:focus {
  border-color: #7B1F3A;
  box-shadow: 0 0 0 2px rgba(123, 31, 58, 0.15);
}
.contact-detail-row {
  transition: transform 0.3s ease;
}
.contact-detail-row:hover {
  transform: translateX(6px);
}
</style>
