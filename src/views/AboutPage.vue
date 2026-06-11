<template>
  <div class="font-poppins antialiased">

    <!-- ─── HERO ──────────────────────────────────────────────────────────────── -->
    <section class="about-hero relative w-full overflow-hidden">
      <!-- Mobile overlay -->
      <div class="absolute inset-0 xl:hidden bg-[#7B1F3A]/90"></div>
      <!-- Desktop decorative right side -->
      <div class="absolute inset-y-0 right-0 hidden xl:block w-1/2 bg-gradient-to-bl from-[#7B1F3A]/8 to-transparent pointer-events-none"></div>
      <!-- Decorative circles -->
      <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#C9A84C]/10 pointer-events-none hidden xl:block"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7B1F3A]/5 pointer-events-none hidden xl:block"></div>

      <div class="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 xl:px-4 xl:py-32">
        <div class="max-w-xl">
          <span class="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white xl:text-[#7B1F3A] xl:bg-[#7B1F3A]/10">
            About Us
          </span>
          <h1 class="mt-5 text-3xl font-semibold leading-tight text-white xl:text-gray-800 sm:text-4xl md:text-5xl">
            <span class="relative inline-block">
              Welcome to PHISOFT
              <span class="absolute -bottom-1 left-0 w-full h-2 bg-[#C9A84C] opacity-30 rounded"></span>
            </span>
          </h1>
          <p class="mt-4 text-sm font-light text-white/80 xl:text-gray-500 md:text-base">by PSG Group</p>
          <p class="mt-5 text-sm font-light leading-relaxed text-white/90 xl:text-gray-600 md:text-base max-w-lg">
            PT Pasifik Hoki Indonesia (PHISOFT) was founded with the goal of developing a superior system to support the growth of all businesses. We have faced considerable competition and overcame numerous challenges in our pursuit to demonstrate that our technology is the best.
          </p>
        </div>
      </div>
    </section>

    <!-- ─── OUR FIRST STEP ───────────────────────────────────────────────────── -->
    <section class="section-container bg-white relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#7B1F3A]/3 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div class="flex flex-col xl:flex-row lg:flex-row items-center gap-14 xl:gap-20 relative z-10">

        <!-- Left: Decorative illustration -->
        <div class="w-full xl:w-1/2 lg:w-1/2 flex items-center justify-center">
          <div class="relative w-full max-w-md">
            <!-- Main card -->
            <div class="rounded-3xl bg-gradient-to-br from-[#7B1F3A]/8 to-[#C9A84C]/8 p-10 flex flex-col items-center gap-6 border border-[#7B1F3A]/10">
              <i class="fas fa-building text-[#7B1F3A]/30" style="font-size: 6rem;"></i>
              <div class="text-center">
                <p class="text-4xl font-bold text-[#7B1F3A]">2008</p>
                <p class="text-sm text-gray-500 mt-1">Founded</p>
              </div>
              <!-- Milestone badges -->
              <div class="flex flex-wrap justify-center gap-3 mt-2">
                <span class="rounded-full bg-[#7B1F3A]/10 px-3 py-1 text-xs font-medium text-[#7B1F3A]">Software House</span>
                <span class="rounded-full bg-[#C9A84C]/15 px-3 py-1 text-xs font-medium text-[#C9A84C]">Tech Company</span>
                <span class="rounded-full bg-[#1a6e80]/10 px-3 py-1 text-xs font-medium text-[#1a6e80]">IT Consulting</span>
                <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Cloud Services</span>
              </div>
            </div>
            <!-- Floating badge -->
            <div class="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#7B1F3A]/10 flex items-center justify-center">
                <i class="fas fa-award text-[#7B1F3A] text-sm"></i>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-800">Est. 2015</p>
                <p class="text-xs text-gray-400">PT Pasifik Hoki Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Text content -->
        <div class="w-full xl:w-1/2 lg:w-1/2">
          <div class="flex items-center gap-2 mb-4">
            <span class="phi-vbar"></span>
            <span class="text-sm font-medium tracking-wider text-[#7B1F3A]">How We Start</span>
          </div>
          <h2 class="text-2xl font-semibold text-gray-800 md:text-3xl xl:text-4xl leading-tight">Our First Step</h2>
          <div class="mt-3 mb-6 h-0.5 w-16 bg-[#7B1F3A] opacity-50 rounded"></div>
          <p class="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
            We start our business from a small team in 2008. Established as PT Pasifik Hoki Indonesia (PHISOFT) on 27th May 2015. PHISOFT is a tech company, not only a software house. We focus on manufacturing and development of the technology and provide technology as a service. Our team consists of System Analyst, Certified IT Consultant/ Advisor/ Coach, HRIS/ HCMS Consultant, ERP Functional Consultant, Project Manager, Desktop Platform Engineer, Web Platform Engineer, Mobile App Engineer (Android & iOS), Web Designer, Graphic & Multimedia Designer, IT Support, Helpdesk & Customer Service, Business Development Team, Marketing & Public Relation Team to serve our valued customers.
          </p>

          <!-- Key highlights -->
          <div class="mt-8 grid grid-cols-2 gap-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-[#7B1F3A]/10 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-check text-[#7B1F3A] text-xs"></i>
              </div>
              <p class="text-sm text-gray-600">Custom Software Development</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-[#7B1F3A]/10 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-check text-[#7B1F3A] text-xs"></i>
              </div>
              <p class="text-sm text-gray-600">IT Consulting & Integration</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-[#7B1F3A]/10 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-check text-[#7B1F3A] text-xs"></i>
              </div>
              <p class="text-sm text-gray-600">Cloud-Based Solutions</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-[#7B1F3A]/10 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-check text-[#7B1F3A] text-xs"></i>
              </div>
              <p class="text-sm text-gray-600">Mobile & Web Development</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── STATS ─────────────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-[#7B1F3A]">
      <!-- Subtle pattern -->
      <div class="absolute inset-0 opacity-5"
        style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 28px 28px;"></div>

      <div class="relative z-10 mx-auto max-w-5xl px-6 py-16 md:px-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="stat-item flex flex-col items-center gap-3">
            <div class="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
              <i class="fas fa-history text-white text-xl"></i>
            </div>
            <p class="text-5xl font-bold text-white">9</p>
            <p class="text-white/75 text-sm">Years of Experience</p>
          </div>
          <div class="stat-item flex flex-col items-center gap-3">
            <div class="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
              <i class="fas fa-rocket text-white text-xl"></i>
            </div>
            <p class="text-5xl font-bold text-white">9</p>
            <p class="text-white/75 text-sm">Products Launched</p>
          </div>
          <div class="stat-item flex flex-col items-center gap-3">
            <div class="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
              <i class="fas fa-smile text-white text-xl"></i>
            </div>
            <p class="text-5xl font-bold text-white">17</p>
            <p class="text-white/75 text-sm">Happy Clients</p>
          </div>
          <div class="stat-item flex flex-col items-center gap-3">
            <div class="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
              <i class="fas fa-users text-white text-xl"></i>
            </div>
            <p class="text-5xl font-bold text-white">50+</p>
            <p class="text-white/75 text-sm">Team Members</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── VISION & MISSION ──────────────────────────────────────────────────── -->
    <section class="section-container bg-gray-50/60">
      <div class="text-center mb-12">
        <div class="flex items-center justify-center gap-2 mb-4">
          <span class="phi-vbar"></span>
          <span class="text-sm font-medium tracking-wider text-[#7B1F3A]">Our Direction</span>
        </div>
        <h2 class="text-2xl font-semibold text-gray-800 md:text-3xl xl:text-4xl">Vision and Mission</h2>
        <div class="mt-3 mx-auto h-0.5 w-16 bg-[#7B1F3A] opacity-50 rounded"></div>
      </div>

      <div class="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">

        <!-- Vision card -->
        <div class="vision-card rounded-2xl bg-white border border-gray-200 p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-xl bg-[#7B1F3A]/10 flex items-center justify-center shrink-0">
              <i class="fas fa-eye text-[#7B1F3A] text-xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800">Our Vision</h3>
              <div class="mt-1 h-0.5 w-10 bg-[#C9A84C] rounded"></div>
            </div>
          </div>
          <p class="text-gray-600 text-sm md:text-base leading-relaxed">
            To become a leading national scale public company, known as a reliable partner that can provide the best information technology solutions generally for the people of Indonesia and especially for partner companies.
          </p>
        </div>

        <!-- Mission card -->
        <div class="vision-card rounded-2xl bg-white border border-gray-200 p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-xl bg-[#7B1F3A]/10 flex items-center justify-center shrink-0">
              <i class="fas fa-bullseye text-[#7B1F3A] text-xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800">Our Mission</h3>
              <div class="mt-1 h-0.5 w-10 bg-[#C9A84C] rounded"></div>
            </div>
          </div>
          <ul class="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle text-[#7B1F3A] mt-1 shrink-0"></i>
              <span>Prioritize the professionalism and competence of the team to produce the integrated system between apps that can help reduce problems and increase the profit growth of our partner companies.</span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle text-[#7B1F3A] mt-1 shrink-0"></i>
              <span>Turning information technology challenges into beneficial opportunities and perfect solutions generally for society and especially for partner companies.</span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle text-[#7B1F3A] mt-1 shrink-0"></i>
              <span>Establish cooperation with business partners in distributing superior products and information technology solutions.</span>
            </li>
          </ul>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
</script>

<style scoped>
.about-hero {
  background: linear-gradient(135deg, #7B1F3A 0%, #4A1020 100%);
}
@media (min-width: 1280px) {
  .about-hero {
    background: #ffffff;
  }
}

.vision-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.vision-card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09);
  transform: translateY(-2px);
}

.stat-item {
  transition: transform 0.3s ease;
}
.stat-item:hover {
  transform: translateY(-4px);
}
</style>
