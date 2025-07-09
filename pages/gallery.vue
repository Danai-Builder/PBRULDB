<template>
  <div class="bg-gray-50">
    <!-- Header Navigation -->
    <nav class="bg-white shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-3">
          <div class="flex items-center space-x-3">
            <img src="/pbru-logo.png" alt="PBRU Logo" class="h-10 w-10 object-contain">
            <h1 class="text-xl md:text-2xl font-bold text-blue-600">PBRU LDB</h1>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium">
              หน้าหลัก
            </NuxtLink>
            <NuxtLink to="/gallery" class="text-gray-700 hover:text-blue-600 font-medium">
              ผลงาน
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium">
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
        <div v-show="showMobileMenu" class="md:hidden pb-4 bg-gray-50 rounded-lg mt-2">
          <div class="flex flex-col space-y-1 p-4">
            <NuxtLink to="/gallery" class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition">
              📚 ผลงาน
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition">
              🏫 เกี่ยวกับเรา
            </NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition">
              📞 ติดต่อ
            </NuxtLink>
            <NuxtLink to="/login" class="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition text-center font-medium mt-2">
              🔐 เข้าสู่ระบบ
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div class="text-center">
          <div class="flex justify-center mb-6">
            <div class="bg-white/10 backdrop-blur-sm rounded-full p-4 shadow-xl border border-white/20">
              <img src="/pbru-logo.png" alt="PBRU Logo" class="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain">
            </div>
          </div>
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            แกลเลอรี่ผลงาน<br class="sm:hidden"> PBRU
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            ชมผลงานและโครงการดีเด่น<br class="sm:hidden">จากมหาวิทยาลัยราชภัฏเพชรบุรี
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <button @click="scrollToGallery" class="bg-white text-blue-600 px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 touch-manipulation">
              📚 ดูผลงาน
            </button>
            <NuxtLink to="/login" class="border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 touch-manipulation">
              🔐 เข้าสู่ระบบ
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Slideshow Section -->
    <section class="py-8 md:py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">🖼️ ภาพกิจกรรมโดดเด่น</h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ชมภาพกิจกรรมและผลงานเด่นจากมหาวิทยาลัยราชภัฏเพชรบุรี
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <ImageSlideshow />
        </div>
      </div>
    </section>

    <!-- News Section -->
    <section class="py-8 md:py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">📰 ข่าวสารและกิจกรรม</h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ติดตามข่าวสารใหม่ๆ และกิจกรรม<br class="sm:hidden">จากมหาวิทยาลัยราชภัฏเพชรบุรี
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div 
            v-for="news in newsItems" 
            :key="news.id"
            class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            @click="openNewsModal(news)"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="news.image" 
                :alt="news.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute top-4 left-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {{ news.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 mb-2">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {{ formatDate(news.date) }}
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{{ news.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-3 mb-4">{{ news.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-blue-600 text-sm font-medium">อ่านเพิ่มเติม</span>
                <svg class="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            ดูข่าวสารทั้งหมด
          </button>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-6 md:py-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">🎨 ผลงานทั้งหมด</h2>
          
          <!-- Category Filter -->
          <div class="w-full md:w-auto">
            <div class="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <button 
                v-for="category in categories" 
                :key="category"
                @click="selectedCategory = category"
                :class="[
                  'px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation',
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400'
                ]"
              >
                {{ category }}
              </button>
            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="relative mb-6 md:mb-8">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="🔍 ค้นหาผลงาน..."
            class="w-full px-4 py-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm transition-all duration-200"
          >
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section ref="gallerySection" class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">กำลังโหลดผลงาน...</p>
        </div>

        <div v-else-if="filteredWorks.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.468-.94-6.005-2.467M12 15l3-3m-3 3l-3-3m3 3v6" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่พบผลงาน</h3>
          <p class="mt-1 text-sm text-gray-500">ลองเปลี่ยนหมวดหมู่หรือคำค้นหา</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div 
            v-for="work in filteredWorks" 
            :key="work.id"
            class="bg-white rounded-xl shadow-md hover:shadow-xl active:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 active:scale-95 touch-manipulation"
            @click="openModal(work)"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img 
                :src="work.image || '/placeholder-image.jpg'" 
                :alt="work.title"
                class="w-full h-48 object-cover"
                @error="handleImageError"
              >
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {{ work.category }}
                </span>
                <span class="text-sm text-gray-500">{{ formatDate(work.date) }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ work.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-3">{{ work.description }}</p>
              <div class="mt-4 flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">{{ work.author.charAt(0) }}</span>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">{{ work.author }}</p>
                  <p class="text-xs text-gray-500">{{ work.department }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div v-if="selectedWork" class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-end md:items-center justify-center p-0 md:p-4" @click="closeModal">
      <div class="bg-white rounded-t-2xl md:rounded-xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto animate-slide-up md:animate-none" @click.stop>
        <div class="relative">
          <!-- Mobile handle -->
          <div class="flex justify-center pt-3 pb-1 md:hidden">
            <div class="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          <button @click="closeModal" class="absolute top-4 right-4 z-10 bg-black/10 backdrop-blur-sm rounded-full p-3 hover:bg-black/20 transition-all touch-manipulation">
            <svg class="w-5 h-5 text-white md:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <img 
            :src="selectedWork.image || '/placeholder-image.jpg'" 
            :alt="selectedWork.title"
            class="w-full h-64 md:h-80 object-cover rounded-t-xl"
          >
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {{ selectedWork.category }}
              </span>
              <span class="text-sm text-gray-500">{{ formatDate(selectedWork.date) }}</span>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedWork.title }}</h2>
            <p class="text-gray-600 mb-6">{{ selectedWork.description }}</p>
            
            <div class="flex items-center mb-6">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-medium">{{ selectedWork.author.charAt(0) }}</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="font-medium text-gray-900">{{ selectedWork.author }}</p>
                <p class="text-sm text-gray-500">{{ selectedWork.department }}</p>
              </div>
            </div>
            
            <div v-if="selectedWork.tags" class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tag in selectedWork.tags" 
                :key="tag"
                class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                #{{ tag }}
              </span>
            </div>
            
            <div v-if="selectedWork.link" class="flex gap-4">
              <a 
                :href="selectedWork.link" 
                target="_blank"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                ดูผลงาน
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News Modal -->
    <div v-if="selectedNews" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" @click="closeNewsModal">
      <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="relative">
          <button @click="closeNewsModal" class="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <img 
            :src="selectedNews.image" 
            :alt="selectedNews.title"
            class="w-full h-64 md:h-80 object-cover rounded-t-xl"
          >
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ selectedNews.category }}
              </span>
              <span class="text-sm text-gray-500">{{ formatDate(selectedNews.date) }}</span>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedNews.title }}</h2>
            <p class="text-gray-600 mb-6 whitespace-pre-line">{{ selectedNews.content }}</p>
            
            <div v-if="selectedNews.author" class="flex items-center mb-6">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-medium">{{ selectedNews.author.charAt(0) }}</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="font-medium text-gray-900">{{ selectedNews.author }}</p>
                <p class="text-sm text-gray-500">ผู้เขียน</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation (Mobile Only) -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-30">
      <div class="flex justify-around items-center py-2">
        <NuxtLink to="/gallery" class="flex flex-col items-center py-2 px-3 text-blue-600">
          <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
            <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"/>
          </svg>
          <span class="text-xs font-medium">ผลงาน</span>
        </NuxtLink>
        
        <NuxtLink to="/about" class="flex flex-col items-center py-2 px-3 text-gray-500">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          <span class="text-xs font-medium">เกี่ยวกับ</span>
        </NuxtLink>
        
        <NuxtLink to="/contact" class="flex flex-col items-center py-2 px-3 text-gray-500">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span class="text-xs font-medium">ติดต่อ</span>
        </NuxtLink>
        
        <NuxtLink to="/login" class="flex flex-col items-center py-2 px-3 text-gray-500">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span class="text-xs font-medium">เข้าสู่ระบบ</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Spacer for bottom navigation -->
    <div class="h-16 md:hidden"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Define head meta for SEO
definePageMeta({
  layout: false // ไม่ใช้ layout เริ่มต้น
})

useHead({
  title: 'แกลเลอรี่ผลงาน - PBRU',
  meta: [
    { name: 'description', content: 'ชมผลงานและโครงการดีเด่นจากมหาวิทยาลัยราชภัฏเพชรบุรี' },
    { name: 'keywords', content: 'PBRU, ผลงาน, โครงการ, มหาวิทยาลัยราชภัฏเพชรบุรี' }
  ]
})

// Types
interface Work {
  id: number
  title: string
  description: string
  category: string
  author: string
  department: string
  date: string
  image: string
  tags?: string[]
  link?: string
}

interface News {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  image: string
  author?: string
}

// Reactive data
const showMobileMenu = ref(false)
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('ทั้งหมด')
const selectedWork = ref<Work | null>(null)
const selectedNews = ref<News | null>(null)
const gallerySection = ref<HTMLElement | null>(null)

// Categories
const categories = ['ทั้งหมด', 'วิจัย', 'โครงการนักศึกษา', 'นวัตกรรม', 'ศิลปะ', 'เทคโนโลยี', 'สิ่งแวดล้อม']

// Sample news data (ในการใช้งานจริงควรดึงจาก API)
const newsItems = ref([
  {
    id: 1,
    title: 'มหาวิทยาลัยราชภัฏเพชรบุรีเปิดหลักสูตรใหม่ปี 2567',
    excerpt: 'เปิดหลักสูตรใหม่ในสาขาวิทยาการข้อมูลและปัญญาประดิษฐ์ เพื่อรองรับความต้องการของตลาดแรงงานในยุคดิจิทัล',
    content: 'มหาวิทยาลัยราชภัฏเพชรบุรีได้ประกาศเปิดหลักสูตรใหม่ในสาขาวิทยาการข้อมูลและปัญญาประดิษฐ์ โดยเริ่มรับนักศึกษาในปีการศึกษา 2567 หลักสูตรนี้ถูกออกแบบมาเพื่อผลิตบุคลากรที่มีความเชี่ยวชาญทั้งในด้านเทคนิคและการประยุกต์ใช้เทคโนโลยี AI ในการแก้ปัญหาของชุมชนและภาคอุตสาหกรรม',
    category: 'การศึกษา',
    date: '2024-03-20',
    image: 'https://via.placeholder.com/400x300?text=AI+Course',
    author: 'ฝ่ายประชาสัมพันธ์'
  },
  {
    id: 2,
    title: 'โครงการพัฒนาชุมชนต้นแบบแห่งความยั่งยืน',
    excerpt: 'ความร่วมมือระหว่างมหาวิทยาลัยกับชุมชนท้องถิ่นในการพัฒนาแหล่งท่องเที่ยวเชิงนิเวศน์',
    content: 'มหาวิทยาลัยราชภัฏเพชรบุรีร่วมกับชุมชนบ้านไร่ขิง จังหวัดเพชรบุรี ได้เริ่มโครงการพัฒนาชุมชนต้นแบบแห่งความยั่งยืน โดยมุ่งเน้นการสร้างรายได้จากการท่องเที่ยวเชิงนิเวศน์ การอนุรักษ์ทรัพยากรธรรมชาติ และการพัฒนาผลิตภัณฑ์ชุมชน',
    category: 'ชุมชน',
    date: '2024-03-15',
    image: 'https://via.placeholder.com/400x300?text=Community+Project',
    author: 'คณะวิทยาศาสตร์และเทคโนโลยี'
  },
  {
    id: 3,
    title: 'นักศึกษา PBRU คว้ารางวัลชนะเลิศการแข่งขันหุ่นยนต์',
    excerpt: 'ทีมนักศึกษาจากคณะวิศวกรรมศาสตร์คว้ารางวัลชนะเลิศการแข่งขันหุ่นยนต์ระดับประเทศ',
    content: 'ทีมนักศึกษาจากคณะวิศวกรรมศาสตร์ มหาวิทยาลัยราชภัฏเพชรบุรี ได้คว้ารางวัลชนะเลิศในการแข่งขันหุ่นยนต์ประเภทการต่อสู้ ในงาน Thailand Robot Championship 2024 ที่จัดขึ้นที่กรุงเทพมหานคร',
    category: 'รางวัล',
    date: '2024-03-10',
    image: 'https://via.placeholder.com/400x300?text=Robot+Competition',
    author: 'คณะวิศวกรรมศาสตร์'
  }
])

// Sample works data (ในการใช้งานจริงควรดึงจาก API)
const works = ref([
  {
    id: 1,
    title: 'ระบบจัดการข้อมูลท้องถิ่นอัจฉริยะ',
    description: 'ระบบจัดการข้อมูลสำหรับองค์กรปกครองส่วนท้องถิ่น ที่ช่วยในการตัดสินใจและวางแผนการพัฒนา',
    category: 'เทคโนโลยี',
    author: 'อ.สมชาย ใจดี',
    department: 'คณะวิทยาการคอมพิวเตอร์',
    date: '2024-03-15',
    image: 'https://via.placeholder.com/400x300',
    tags: ['ระบบจัดการ', 'ท้องถิ่น', 'Big Data'],
    link: '#'
  },
  {
    id: 2,
    title: 'โครงการอนุรักษ์ธรรมชาติชุมชน',
    description: 'โครงการร่วมมือกับชุมชนในการอนุรักษ์ป่าชายเลนและระบบนิเวศน์ชายฝั่ง',
    category: 'สิ่งแวดล้อม',
    author: 'อ.สมหญิง รักธรรมชาติ',
    department: 'คณะวิทยาศาสตร์และเทคโนโลยี',
    date: '2024-02-20',
    image: 'https://via.placeholder.com/400x300',
    tags: ['อนุรักษ์', 'ชุมชน', 'ป่าชายเลน'],
    link: '#'
  },
  {
    id: 3,
    title: 'แอปพลิเคชันการเรียนรู้ภาษาไทย',
    description: 'แอปพลิเคชันสำหรับต่างชาติที่ต้องการเรียนภาษาไทย พร้อมระบบ AI ช่วยในการฝึกออกเสียง',
    category: 'นวัตกรรม',
    author: 'นักศึกษาชั้นปีที่ 4',
    department: 'คณะมนุษยศาสตร์และสังคมศาสตร์',
    date: '2024-01-10',
    image: 'https://via.placeholder.com/400x300',
    tags: ['แอปพลิเคชัน', 'ภาษาไทย', 'AI'],
    link: '#'
  },
  {
    id: 4,
    title: 'การศึกษาพฤติกรรมผู้บริโภคยุคดิจิทัล',
    description: 'งานวิจัยเกี่ยวกับการเปลี่ยนแปลงพฤติกรรมการซื้อสินค้าออนไลน์ในช่วงหลังโควิด-19',
    category: 'วิจัย',
    author: 'อ.ดร.สมปอง นักวิจัย',
    department: 'คณะบริหารธุรกิจ',
    date: '2023-12-05',
    image: 'https://via.placeholder.com/400x300',
    tags: ['วิจัย', 'พฤติกรรม', 'ดิจิทัล'],
    link: '#'
  },
  {
    id: 5,
    title: 'นิทรรศการศิลปะร่วมสมัย',
    description: 'ผลงานศิลปะจากนักศึกษาและอาจารย์ที่สะท้อนวัฒนธรรมท้องถิ่นผสมผสานกับความทันสมัย',
    category: 'ศิลปะ',
    author: 'คณะศิลปกรรมและการออกแบบ',
    department: 'คณะศิลปกรรมและการออกแบบ',
    date: '2023-11-18',
    image: 'https://via.placeholder.com/400x300',
    tags: ['ศิลปะ', 'ร่วมสมัย', 'วัฒนธรรม'],
    link: '#'
  },
  {
    id: 6,
    title: 'โครงการพัฒนาผู้ประกอบการรุ่นใหม่',
    description: 'โครงการส่งเสริมให้นักศึกษาและบุคคลทั่วไปพัฒนาทักษะการเป็นผู้ประกอบการ',
    category: 'โครงการนักศึกษา',
    author: 'ชมรมผู้ประกอบการ',
    department: 'คณะบริหารธุรกิจ',
    date: '2023-10-22',
    image: 'https://via.placeholder.com/400x300',
    tags: ['ผู้ประกอบการ', 'สตาร์ทอัพ', 'ธุรกิจ'],
    link: '#'
  }
])

// Computed properties
const filteredWorks = computed(() => {
  let filtered = works.value

  // Filter by category
  if (selectedCategory.value !== 'ทั้งหมด') {
    filtered = filtered.filter(work => work.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(work => 
      work.title.toLowerCase().includes(query) ||
      work.description.toLowerCase().includes(query) ||
      work.author.toLowerCase().includes(query) ||
      (work.tags && work.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }

  return filtered
})

// Methods
const openModal = (work: Work) => {
  selectedWork.value = work
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedWork.value = null
  document.body.style.overflow = 'auto'
}

const openNewsModal = (news: News) => {
  selectedNews.value = news
  document.body.style.overflow = 'hidden'
}

const closeNewsModal = () => {
  selectedNews.value = null
  document.body.style.overflow = 'auto'
}

const scrollToGallery = () => {
  gallerySection.value?.scrollIntoView({ behavior: 'smooth' })
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('th-TH', options)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x300?text=No+Image'
}

// Lifecycle
onMounted(async () => {
  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.aspect-h-9 img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Mobile animations */
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

/* Touch feedback */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Better focus states for mobile */
button:focus,
input:focus,
a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Hide scrollbar but keep functionality */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Mobile responsive improvements */
@media (max-width: 768px) {
  .container-mobile {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  /* Larger touch targets */
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Better spacing for mobile */
  .mobile-spacing {
    padding: 1rem;
  }
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Safe area padding for devices with notches */
@supports (padding: max(0px)) {
  .safe-area-top {
    padding-top: max(1rem, env(safe-area-inset-top));
  }
  
  .safe-area-bottom {
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }
}
</style> 