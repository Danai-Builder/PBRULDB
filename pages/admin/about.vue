<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <SidebarNavigation current-page="about" />
    <div class="flex-1 flex flex-col min-h-screen">
      <Topbar>
        <template #title>About</template>
      </Topbar>

      <!-- About Content -->
      <main class="flex-1 p-4 sm:p-6 lg:p- mt-4 lg:mt-0">
        <!-- About Header -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center space-x-4">
              <img src="/pbru-logo.png" alt="PBRU Logo" class="h-16 w-16" />
              <div>
                <h1 class="text-3xl font-bold text-gray-900">ระบบจัดการงานวิจัย</h1>
                <p class="text-gray-500">มหาวิทยาลัยราชภัฏเพชรบุรี</p>
              </div>
            </div>
          </div>
        </div>

        <!-- System Overview -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">ภาพรวมระบบ</h2>
            <p class="text-gray-600 mb-4">
              ระบบจัดการงานวิจัยเป็นแพลตฟอร์มที่พัฒนาขึ้นเพื่ออำนวยความสะดวกในการบริหารจัดการงานวิจัยของมหาวิทยาลัยราชภัฏเพชรบุรี 
              โดยมีวัตถุประสงค์หลักในการเพิ่มประสิทธิภาพการทำงานและลดความซ้ำซ้อนของกระบวนการจัดการงานวิจัย
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-2">การจัดการงานวิจัย</h3>
                <p class="text-sm text-gray-600">บริหารจัดการโครงการวิจัยตั้งแต่การเสนอโครงการจนถึงการรายงานผล</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-2">การติดตามความคืบหน้า</h3>
                <p class="text-sm text-gray-600">ติดตามสถานะและความคืบหน้าของโครงการวิจัยแบบเรียลไทม์</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-2">การจัดการงบประมาณ</h3>
                <p class="text-sm text-gray-600">ติดตามและจัดการงบประมาณโครงการวิจัยอย่างมีประสิทธิภาพ</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Information Section -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">ข้อมูลที่เกี่ยวข้องกับงานนี้</h2>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <span class="font-medium">วัตถุประสงค์:</span>
                เพื่อพัฒนาระบบที่ช่วยให้การบริหารจัดการงานวิจัยในมหาวิทยาลัยมีประสิทธิภาพมากขึ้น
              </li>
              <li>
                <span class="font-medium">กลุ่มเป้าหมาย:</span>
                อาจารย์ นักวิจัย เจ้าหน้าที่ และผู้บริหารของมหาวิทยาลัยราชภัฏเพชรบุรี
              </li>
              <li>
                <span class="font-medium">ประโยชน์ที่ได้รับ:</span>
                ลดความซ้ำซ้อนของข้อมูล เพิ่มความรวดเร็วในการดำเนินงาน และสามารถติดตามความคืบหน้าของโครงการได้อย่างมีประสิทธิภาพ
              </li>
              <li>
                <span class="font-medium">เทคโนโลยีที่ใช้:</span>
                Vue.js, Nuxt, Tailwind CSS, MongoDB ฯลฯ
              </li>
              <li>
                <span class="font-medium">ทีมพัฒนา:</span>
                สำนักวิจัยและพัฒนา มหาวิทยาลัยราชภัฏเพชรบุรี
              </li>
            </ul>
          </div>
        </div>

        <!-- Features -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">ฟีเจอร์หลัก</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">การจัดการโครงการ</h3>
                  <p class="text-sm text-gray-600">สร้างและจัดการโครงการวิจัย พร้อมระบบติดตามความคืบหน้า</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">ระบบรายงาน</h3>
                  <p class="text-sm text-gray-600">สร้างและจัดการรายงานความคืบหน้าอัตโนมัติ</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">การจัดการงบประมาณ</h3>
                  <p class="text-sm text-gray-600">ติดตามและจัดการงบประมาณโครงการอย่างมีประสิทธิภาพ</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">ระบบแจ้งเตือน</h3>
                  <p class="text-sm text-gray-600">แจ้งเตือนเกี่ยวกับกำหนดการและกิจกรรมสำคัญ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- User Manual Section -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">คู่มือการใช้งาน</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">              <!-- Full Manual Card -->
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <svg class="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">คู่มือการใช้งานระบบ</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">คู่มือการใช้งานระบบจัดการงานวิจัยฉบับเต็ม พร้อมคำอธิบายการใช้งานอย่างละเอียด</p>
                    <button @click="downloadManual('full')" 
                      class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      ดาวน์โหลด PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Contact Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">ติดต่อเรา</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-medium text-gray-900 mb-2">ที่อยู่</h3>
                <p class="text-gray-600">มหาวิทยาลัยราชภัฏเพชรบุรี<br> 38 หมู่ที่ 8 ถนน หาดเจ้าสำราญ ตำบล นาวุ้ง <br>อำเภอเมืองเพชรบุรี จังหวัดเพชรบุรี 76000</p>
              </div>
              <div>
                <h3 class="font-medium text-gray-900 mb-2">การติดต่อ</h3>
                <p class="text-gray-600">โทรศัพท์: 032 708 605<br>อีเมล: research@pbru.ac.th</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useDarkModeStore } from '~/stores/darkMode'

const authStore = useAuthStore()
const isSidebarOpen = ref(false)
const darkModeStore = useDarkModeStore()

const downloadManual = (type: 'full'): void => {
  const manualUrls = {
    full: '/manuals/full-manual.pdf'
  }
  
  const link = document.createElement('a')
  link.href = manualUrls[type]
  link.download = 'คู่มือการใช้งานระบบ.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  darkModeStore.initializeDarkMode()
})
</script> 