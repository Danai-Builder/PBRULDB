<template>
  <div class="bg-gray-50">
    <!-- Header Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/gallery" class="text-2xl font-bold text-blue-600">PBRU Gallery</NuxtLink>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium">
              หน้าหลัก
            </NuxtLink>
            <NuxtLink to="/gallery" class="text-gray-700 hover:text-blue-600 font-medium">
              ผลงาน
            </NuxtLink>
            <NuxtLink to="/about" class="text-blue-600 font-medium">
              เกี่ยวกับเรา
            </NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-600 font-medium">
              ติดต่อ
            </NuxtLink>
            <NuxtLink to="/login" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              เข้าสู่ระบบ
            </NuxtLink>
          </div>
          <!-- Mobile menu button -->
          <button @click="showMobileMenu = !showMobileMenu" class="md:hidden p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile menu -->
        <div v-show="showMobileMenu" class="md:hidden pb-4">
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/gallery" class="text-gray-700 hover:text-blue-600 font-medium py-2">
              ผลงาน
            </NuxtLink>
            <NuxtLink to="/about" class="text-blue-600 font-medium py-2">
              เกี่ยวกับเรา
            </NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-600 font-medium py-2">
              ติดต่อ
            </NuxtLink>
            <NuxtLink to="/login" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-block text-center">
              เข้าสู่ระบบ
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            เกี่ยวกับเรา
          </h1>
          <p class="text-xl md:text-2xl opacity-90">
            มหาวิทยาลัยราชภัฏเพชรบุรี
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Vision & Mission -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div class="bg-white rounded-xl shadow-md p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900">วิสัยทัศน์</h2>
            </div>
            <p class="text-gray-700 leading-relaxed">
              เป็นมหาวิทยาลัยชั้นนำที่ผลิตบัณฑิตคุณภาพ สร้างนวัตกรรมและงานวิจัย 
              เพื่อพัฒนาท้องถิ่นและสังคมอย่างยั่งยืน บนพื้นฐานของภูมิปัญญาท้องถิ่น
              และเทคโนโลยีสมัยใหม่
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-md p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900">พันธกิจ</h2>
            </div>
            <ul class="text-gray-700 space-y-3">
              <li class="flex items-start">
                <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                ผลิตบัณฑิตที่มีคุณภาพและคุณธรรม
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                ส่งเสริมการวิจัยและนวัตกรรม
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                พัฒนาและอนุรักษ์ศิลปวัฒนธรรม
              </li>
              <li class="flex items-start">
                <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                บริการวิชาการแก่สังคม
              </li>
            </ul>
          </div>
        </div>

        <!-- Statistics -->
        <div class="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">ตัวเลขที่น่าภาคภูมิใจ</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div class="text-gray-600">คณะวิชา</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-green-600 mb-2">8,000+</div>
              <div class="text-gray-600">นักศึกษา</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-purple-600 mb-2">300+</div>
              <div class="text-gray-600">คณาจารย์</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div class="text-gray-600">ปีก่อตั้ง</div>
            </div>
          </div>
        </div>

        <!-- Faculties -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">คณะและสาขาวิชา</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="faculty in faculties" :key="faculty.name" class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center mb-4">
                <div :class="['w-12 h-12 rounded-lg flex items-center justify-center mr-4', faculty.bgColor]">
                  <svg class="w-6 h-6" :class="faculty.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="faculty.icon"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900">{{ faculty.name }}</h3>
              </div>
              <p class="text-gray-600 text-sm">{{ faculty.description }}</p>
            </div>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8 text-center">
          <h2 class="text-3xl font-bold mb-4">สนใจเรียนรู้เพิ่มเติม?</h2>
          <p class="text-xl mb-8 opacity-90">ติดต่อเราหรือชมผลงานของเราได้</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/contact" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              ติดต่อเรา
            </NuxtLink>
            <NuxtLink to="/gallery" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              ดูผลงาน
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Define head meta for SEO
definePageMeta({
  layout: false
})

useHead({
  title: 'เกี่ยวกับเรา - PBRU Gallery',
  meta: [
    { name: 'description', content: 'ศึกษาเกี่ยวกับมหาวิทยาลัยราชภัฏเพชรบุรี วิสัยทัศน์ พันธกิจ และคณะต่างๆ' },
    { name: 'keywords', content: 'PBRU, มหาวิทยาลัยราชภัฏเพชรบุรี, เกี่ยวกับเรา, คณะ' }
  ]
})

const showMobileMenu = ref(false)

const faculties = ref([
  {
    name: 'คณะครุศาสตร์',
    description: 'ผลิตครูและบุคลากรทางการศึกษาที่มีคุณภาพ',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
  },
  {
    name: 'คณะมนุษยศาสตร์และสังคมศาสตร์',
    description: 'พัฒนาความรู้ด้านภาษา วรรณกรรม และสังคมศาสตร์',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    name: 'คณะวิทยาศาสตร์และเทคโนโลยี',
    description: 'วิจัยและพัฒนาเทคโนโลยีเพื่อการพัฒนาที่ยั่งยืน',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    name: 'คณะบริหารธุรกิจ',
    description: 'พัฒนาผู้ประกอบการและผู้นำธุรกิจยุคใหม่',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    name: 'คณะวิทยาการคอมพิวเตอร์',
    description: 'นำหน้าด้านเทคโนโลยีสารสนเทศและคอมพิวเตอร์',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
  },
  {
    name: 'คณะศิลปกรรมและการออกแบบ',
    description: 'สร้างสรรค์งานศิลปะและการออกแบบสมัยใหม่',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z'
  }
])
</script>

<style scoped>
/* Additional custom styles if needed */
</style> 