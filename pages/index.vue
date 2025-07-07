<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <img src="/pbru-logo.png" alt="PBRU" class="h-10 w-10" />
            <h1 class="text-2xl font-bold text-blue-600">PBRU LDB</h1>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="text-blue-600 font-medium">
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
        <div v-show="showMobileMenu" class="md:hidden pb-4">
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/" class="text-blue-600 font-medium py-2">
              หน้าหลัก
            </NuxtLink>
            <NuxtLink to="/gallery" class="text-gray-700 hover:text-blue-600 font-medium py-2">
              ผลงาน
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium py-2">
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
            ระบบฐานข้อมูลท้องถิ่น
          </h1>
          <h2 class="text-2xl md:text-3xl font-semibold mb-6">
            มหาวิทยาลัยราชภัฏเพชรบุรี
          </h2>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            ศูนย์รวมข้อมูล ผลงาน และองค์ความรู้ เพื่อการพัฒนาท้องถิ่นอย่างยั่งยืน
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/gallery" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              ดูผลงาน
            </NuxtLink>
            <NuxtLink to="/about" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              เรียนรู้เพิ่มเติม
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">ข้อมูลสรุป</h2>
          <p class="text-xl text-gray-600">ตัวเลขที่สะท้อนถึงความก้าวหน้าและการพัฒนา</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.468-.94-6.005-2.467M12 15l3-3m-3 3l-3-3m3 3v6"/>
              </svg>
            </div>
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ stats.projects }}+</div>
            <div class="text-gray-600">โครงการ</div>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div class="text-3xl font-bold text-green-600 mb-2">{{ stats.research }}+</div>
            <div class="text-gray-600">งานวิจัย</div>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ stats.communities }}+</div>
            <div class="text-gray-600">ชุมชนเครือข่าย</div>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div class="text-3xl font-bold text-orange-600 mb-2">{{ stats.innovations }}+</div>
            <div class="text-gray-600">นวัตกรรม</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">บริการของเรา</h2>
          <p class="text-xl text-gray-600">สำรวจข้อมูลและความรู้ที่หลากหลาย</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.title" class="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <div :class="['w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6', service.bgColor]">
              <svg class="w-8 h-8" :class="service.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ service.title }}</h3>
            <p class="text-gray-600 mb-6">{{ service.description }}</p>
            <NuxtLink :to="service.link" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              ดูรายละเอียด
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Updates Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">อัปเดตล่าสุด</h2>
          <p class="text-xl text-gray-600">ติดตามข่าวสารและผลงานใหม่ๆ</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="update in latestUpdates" :key="update.id" class="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {{ update.category }}
                </span>
                <span class="text-sm text-gray-500">{{ formatDate(update.date) }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ update.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ update.description }}</p>
              <NuxtLink to="/gallery" class="text-blue-600 hover:text-blue-700 font-medium text-sm">
                อ่านเพิ่มเติม →
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/gallery" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            ดูผลงานทั้งหมด
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">ร่วมเป็นส่วนหนึ่งของการพัฒนา</h2>
        <p class="text-xl text-white opacity-90 mb-8">
          สำหรับผู้ดูแลระบบที่ต้องการจัดการข้อมูลและเนื้อหา
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/login" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            เข้าสู่ระบบผู้ดูแล
          </NuxtLink>
          <NuxtLink to="/contact" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            ติดต่อเรา
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-2">
            <div class="flex items-center mb-4">
              <img src="/pbru-logo.png" alt="PBRU" class="h-8 w-8 mr-3" />
              <span class="text-xl font-bold">PBRU LDB</span>
            </div>
            <p class="text-gray-400 mb-4">
              ระบบฐานข้อมูลท้องถิ่น มหาวิทยาลัยราชภัฏเพชรบุรี 
              เพื่อการจัดเก็บและเผยแพร่ข้อมูลเพื่อการพัฒนาท้องถิ่นอย่างยั่งยืน
            </p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">เมนูหลัก</h4>
            <div class="space-y-2">
              <NuxtLink to="/" class="block text-gray-400 hover:text-white transition">หน้าหลัก</NuxtLink>
              <NuxtLink to="/gallery" class="block text-gray-400 hover:text-white transition">ผลงาน</NuxtLink>
              <NuxtLink to="/about" class="block text-gray-400 hover:text-white transition">เกี่ยวกับเรา</NuxtLink>
              <NuxtLink to="/contact" class="block text-gray-400 hover:text-white transition">ติดต่อ</NuxtLink>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">ติดต่อ</h4>
            <div class="space-y-2 text-gray-400">
              <p class="font-medium text-white">มหาวิทยาลัยราชภัฏเพชรบุรี</p>
              <p>83 หมู่ 11 ตำบลท่ายาง</p>
              <p>อำเภอท่ายาง จังหวัดเพชรบุรี 76130</p>
              <div class="mt-3 space-y-1">
                <p>📞 โทร: 032-218-200</p>
                <p>📠 แฟกซ์: 032-218-201</p>
                <p>🌐 www.pbru.ac.th</p>
                <p>📧 info@pbru.ac.th</p>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 มหาวิทยาลัยราชภัฏเพชรบุรี สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Define head meta for SEO
definePageMeta({
  layout: false
})

useHead({
  title: 'ระบบฐานข้อมูลท้องถิ่น - มหาวิทยาลัยราชภัฏเพชรบุรี',
  meta: [
    { name: 'description', content: 'ศูนย์รวมข้อมูล ผลงาน และองค์ความรู้ เพื่อการพัฒนาท้องถิ่นอย่างยั่งยืน มหาวิทยาลัยราชภัฏเพชรบุรี' },
    { name: 'keywords', content: 'PBRU, ฐานข้อมูลท้องถิ่น, มหาวิทยาลัยราชภัฏเพชรบุรี, วิจัย, พัฒนาท้องถิ่น' }
  ]
})

const showMobileMenu = ref(false)

// Statistics data
const stats = {
  projects: 150,
  research: 85,
  communities: 45,
  innovations: 60
}

// Services data
const services = [
  {
    title: 'ผลงานและโครงการ',
    description: 'สำรวจผลงานวิจัย โครงการพัฒนา และนวัตกรรมต่างๆ ที่เกิดขึ้นในมหาวิทยาลัย',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    link: '/gallery'
  },
  {
    title: 'ข้อมูลมหาวิทยาลัย',
    description: 'เรียนรู้เกี่ยวกับประวัติ วิสัยทัศน์ พันธกิจ และคณะต่างๆ ของมหาวิทยาลัย',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    link: '/about'
  },
  {
    title: 'ติดต่อและสอบถาม',
    description: 'ช่องทางการติดต่อ ข้อมูลการเดินทาง และแบบฟอร์มสำหรับส่งข้อความ',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    link: '/contact'
  }
]

// Latest updates data
const latestUpdates = [
  {
    id: 1,
    title: 'ระบบจัดการข้อมูลท้องถิ่นอัจฉริยะ',
    description: 'ระบบใหม่ที่ช่วยในการจัดการและวิเคราะห์ข้อมูลท้องถิ่นอย่างมีประสิทธิภาพ',
    category: 'เทคโนโลยี',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: 'โครงการอนุรักษ์ธรรมชาติชุมชน',
    description: 'การร่วมมือกับชุมชนในการอนุรักษ์สิ่งแวดล้อมและระบบนิเวศน์',
    category: 'สิ่งแวดล้อม',
    date: '2024-03-10'
  },
  {
    id: 3,
    title: 'นวัตกรรมการเรียนการสอน',
    description: 'แนวทางใหม่ในการพัฒนาการศึกษาสำหรับศตวรรษที่ 21',
    category: 'การศึกษา',
    date: '2024-03-05'
  }
]

// Methods
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('th-TH', options)
}
</script>

<style scoped>
/* Custom styles if needed */
</style>