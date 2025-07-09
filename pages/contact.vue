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
            <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium">
              เกี่ยวกับเรา
            </NuxtLink>
            <NuxtLink to="/contact" class="text-blue-600 font-medium">
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
            <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium py-2">
              เกี่ยวกับเรา
            </NuxtLink>
            <NuxtLink to="/contact" class="text-blue-600 font-medium py-2">
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
            ติดต่อเรา
          </h1>
          <p class="text-xl md:text-2xl opacity-90">
            ยินดีให้บริการและตอบคำถามทุกข้อสงสัย
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <!-- Contact Information -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">ข้อมูลการติดต่อ</h2>
              
              <div class="space-y-6">
                <!-- Address -->
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">ที่อยู่</h3>
                    <p class="text-gray-600 text-sm leading-relaxed">
                      มหาวิทยาลัยราชภัฏเพชรบุรี<br>
                      38 หมู่ที่ 8 ถนน หาดเจ้าสำราญ ตำบล นาวุ้ง <br>
                      อำเภอเมืองเพชรบุรี จังหวัดเพชรบุรี 76000
                    </p>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">โทรศัพท์</h3>
                    <p class="text-gray-600 text-sm">032-218-011</p>
                    <p class="text-gray-600 text-sm">032-218-012</p>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">อีเมล</h3>
                    <p class="text-gray-600 text-sm">info@pbru.ac.th</p>
                    <p class="text-gray-600 text-sm">gallery@pbru.ac.th</p>
                  </div>
                </div>

                <!-- Website -->
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">เว็บไซต์</h3>
                    <a href="https://www.pbru.ac.th" target="_blank" class="text-blue-600 text-sm hover:underline">www.pbru.ac.th</a>
                  </div>
                </div>

                <!-- Social Media -->
                <div class="pt-6 border-t">
                  <h3 class="font-semibold text-gray-900 mb-4">ติดตามเรา</h3>
                  <div class="flex space-x-4">
                    <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition">
                      <span class="text-sm font-bold">f</span>
                    </a>
                    <a href="#" class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition">
                      <span class="text-sm font-bold">yt</span>
                    </a>
                    <a href="#" class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition">
                      <span class="text-sm font-bold">line</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">ส่งข้อความถึงเรา</h2>
              
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">ชื่อ *</label>
                    <input 
                      v-model="form.firstName"
                      type="text" 
                      id="firstName" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรุณากรอกชื่อ"
                    >
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">นามสกุล *</label>
                    <input 
                      v-model="form.lastName"
                      type="text" 
                      id="lastName" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรุณากรอกนามสกุล"
                    >
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">อีเมล *</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    id="email" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example@email.com"
                  >
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    id="phone"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0XX-XXX-XXXX"
                  >
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">หัวข้อ *</label>
                  <select 
                    v-model="form.subject"
                    id="subject" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">เลือกหัวข้อ</option>
                    <option value="สอบถามข้อมูลทั่วไป">สอบถามข้อมูลทั่วไป</option>
                    <option value="สอบถามเกี่ยวกับผลงาน">สอบถามเกี่ยวกับผลงาน</option>
                    <option value="ข้อเสนอแนะ">ข้อเสนอแนะ</option>
                    <option value="รายงานปัญหา">รายงานปัญหา</option>
                    <option value="ความร่วมมือ">ความร่วมมือ</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">ข้อความ *</label>
                  <textarea 
                    v-model="form.message"
                    id="message" 
                    rows="5"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="กรุณาใส่ข้อความที่ต้องการสอบถาม..."
                  ></textarea>
                </div>

                <div class="flex items-center">
                  <input 
                    v-model="form.newsletter"
                    type="checkbox" 
                    id="newsletter"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  >
                  <label for="newsletter" class="ml-2 text-sm text-gray-700">
                    ต้องการรับข่าวสารและอัปเดตจากเรา
                  </label>
                </div>

                <div class="flex flex-col sm:flex-row gap-4">
                  <button 
                    type="submit" 
                    :disabled="loading"
                    class="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="loading">กำลังส่ง...</span>
                    <span v-else>ส่งข้อความ</span>
                  </button>
                  <button 
                    type="button" 
                    @click="resetForm"
                    class="flex-1 sm:flex-none border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    ล้างข้อมูล
                  </button>
                </div>
              </form>

              <!-- Success Message -->
              <div v-if="showSuccess" class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  ข้อความของคุณถูกส่งเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="mt-16">
          <div class="bg-white rounded-xl shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">แผนที่และการเดินทาง</h2>
            <div class="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div class="text-center text-gray-600">
                <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <p>แผนที่จะแสดงที่นี่</p>
                <p class="text-sm mt-2">Google Maps Integration</p>
              </div>
            </div>
            <div class="mt-6 text-center">
              <p class="text-gray-600 mb-4">การเดินทาง: ใช้ทางหลวงหมายเลข 35 (เพชรบุรี-หัวหิน) กม.ที่ 20</p>
              <a 
                href="https://maps.google.com/?q=มหาวิทยาลัยราชภัฏเพชรบุรี" 
                target="_blank"
                class="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                เปิดใน Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Define head meta for SEO
definePageMeta({
  layout: false
})

useHead({
  title: 'ติดต่อเรา - PBRU Gallery',
  meta: [
    { name: 'description', content: 'ติดต่อมหาวิทยาลัยราชภัฏเพชรบุรี สอบถามข้อมูล หรือส่งข้อความถึงเรา' },
    { name: 'keywords', content: 'ติดต่อ, PBRU, มหาวิทยาลัยราชภัฏเพชรบุรี, สอบถาม' }
  ]
})

const showMobileMenu = ref(false)
const loading = ref(false)
const showSuccess = ref(false)

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

// Methods
const submitForm = async () => {
  loading.value = true
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    showSuccess.value = true
    resetForm()
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Form submission error:', error)
    // Handle error here
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    const formKey = key as keyof typeof form
    if (typeof form[formKey] === 'boolean') {
      (form[formKey] as boolean) = false
    } else {
      (form[formKey] as string) = ''
    }
  })
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style> 