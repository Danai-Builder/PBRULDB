<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <SidebarNavigation current-page="settings" />
    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Topbar -->
      <Topbar>
        <template #title>ตั้งค่าระบบ</template>
      </Topbar>

      <!-- Settings Content -->
      <div class="p-6">
        <div class="max-w-4xl mx-auto">
          <!-- Profile Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">ข้อมูลโปรไฟล์</h2>
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ชื่อ-นามสกุล</label>
                  <input
                    v-model="profileForm.name"
                    type="text"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">อีเมล</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ตำแหน่ง</label>
                  <input
                    v-model="profileForm.position"
                    type="text"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">หน่วยงาน</label>
                  <input
                    v-model="profileForm.department"
                    type="text"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ประวัติการศึกษา</label>
                <textarea
                  v-model="profileForm.education"
                  rows="3"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ผลงานวิจัย</label>
                <textarea
                  v-model="profileForm.researchWorks"
                  rows="3"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                ></textarea>
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>

          <!-- System Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">ตั้งค่าระบบ</h2>
            <div class="space-y-4">
              <!-- Dark Mode Toggle -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">โหมดกลางคืน</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">เปิดใช้งานธีมมืดสำหรับการใช้งานในเวลากลางคืน</p>
                </div>
                <button
                  @click="toggleDarkMode"
                  class="relative inline-flex h-6 w-11 items-center rounded-full"
                  :class="darkModeStore.isDark ? 'bg-blue-600' : 'bg-gray-200'"
                >
                  <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                    :class="darkModeStore.isDark ? 'translate-x-6' : 'translate-x-1'"
                  />
                </button>
              </div>

              <!-- Notification Settings -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">การแจ้งเตือน</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">เปิดใช้งานการแจ้งเตือนสำหรับการอัปเดตระบบ</p>
                </div>
                <button
                  @click="toggleNotifications"
                  class="relative inline-flex h-6 w-11 items-center rounded-full"
                  :class="notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'"
                >
                  <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                    :class="notificationsEnabled ? 'translate-x-6' : 'translate-x-1'"
                  />
                </button>
              </div>

              <!-- Language Settings -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">ภาษา</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">เลือกภาษาที่ต้องการใช้งาน</p>
                </div>
                <select
                  v-model="selectedLanguage"
                  @change="changeLanguage"
                  class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useDarkModeStore } from '~/stores'
import { useRouter, useRoute } from '#imports'
import SidebarNavigation from '~/components/SidebarNavigation.vue'

const authStore = useAuthStore()
const darkModeStore = useDarkModeStore()
const router = useRouter()
const route = useRoute()

// Profile form data
const profileForm = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  position: authStore.user?.position || '',
  department: authStore.user?.department || '',
  education: authStore.user?.education || '',
  researchWorks: authStore.user?.researchWorks || ''
})

// System settings
const notificationsEnabled = ref(false)
const selectedLanguage = ref('th')

// Methods
const updateProfile = async () => {
  try {
    await authStore.updateProfile(profileForm.value)
    alert('บันทึกข้อมูลสำเร็จ')
  } catch (error: any) {
    alert(error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

const toggleDarkMode = () => {
  darkModeStore.toggleDarkMode()
}

const toggleNotifications = () => {
  notificationsEnabled.value = !notificationsEnabled.value
  // TODO: Implement notification settings
}

const changeLanguage = () => {
  router.push({ path: route.path, query: { ...route.query, lang: selectedLanguage.value } })
  localStorage.setItem('language', selectedLanguage.value)
}

onMounted(() => {
  darkModeStore.initializeDarkMode()
  // Initialize language from localStorage if available
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    selectedLanguage.value = savedLanguage
  }
})
</script>
