<template>
  <!-- Mobile Menu Button -->
  <button 
    @click="toggleSidebar" 
   class="lg:hidden fixed top-4 left-4 z-50 p-4 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
>


  </button>

  <!-- Mobile Overlay -->
  <div 
    v-if="isSidebarOpen" 
    class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
    @click="closeSidebar"
  ></div>

  <!-- Sidebar -->
  <aside 
    :class="[
      'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img src="/pbru-logo.png" alt="PBRU" class="h-8 w-8" />
          <span class="ml-3 text-xl font-semibold text-gray-900 dark:text-white">{{ currentPage }}</span>
        </div>
      </div>
    </div>

    <!-- Sidebar Navigation -->
    <nav class="mt-4">
      <div class="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Menu</div>
      <div class="mt-2">
        <NuxtLink 
          to="/admin/dashboard" 
          class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group" 
          :class="{ 'bg-gray-100 dark:bg-gray-700': currentPage === 'Dashboard' }"
          @click="closeSidebar"
        >
          <svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="ml-3">หน้าหลัก</span>
        </NuxtLink>

      <!-- Segments Menu -->
      <div>
          <button
            @click="toggleBasicInfo"
            class="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
            :class="{ 'bg-gray-100 dark:bg-gray-700': currentPage === 'Segments' }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span>ข้อมูลทรัพยากรในจังหวัด
            </span>
            <svg
              class="w-4 h-4 ml-auto transition-transform duration-200"
              :class="{ 'rotate-90': isBasicInfoOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div v-if="isBasicInfoOpen" class="ml-8">
            <NuxtLink
              to="/admin/area"
              class="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              :class="{ 'bg-gray-100 dark:bg-gray-700': currentRoute === '/admin/area' }"
              @click="closeSidebar"
            >พื้นที่ในจังหวัด</NuxtLink>
            
            <!-- Map Toggle Button (only show when on area page) -->
        
            <div class="px-4 py-0">
            </div>
            <NuxtLink
              to="/admin/population"
              class="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              @click="closeSidebar"
            >ประชากร</NuxtLink>
            <NuxtLink
              to="/admin/landuse"
              class="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              @click="closeSidebar"
            >การใช้ประโยชน์</NuxtLink>
          </div>
        </div>
            <!-- Segments Menu -->
      <div>
          <button
            @click="toggleResearch"
            class="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
            :class="{ 'bg-gray-100 dark:bg-gray-700': currentPage === 'Segments' }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0c-3.866 0-7-1.343-7-3m7 3c3.866 0 7-1.343 7-3" />
            </svg>
            <span>งานวิจัยและบริการ</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform duration-200"
              :class="{ 'rotate-90': isResearchOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div v-if="isResearchOpen" class="ml-8">
            <NuxtLink
              to="/admin/abstract"
              class="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              :class="{ 'bg-gray-100 dark:bg-gray-700': currentRoute === '/admin/abstract' }"
              @click="closeSidebar"
            >จัดการ Abstract</NuxtLink>
            <NuxtLink
              to="/admin/research-topics"
              class="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              @click="closeSidebar"
            >บทคัดย่อ</NuxtLink>
            <NuxtLink
              to="/admin/research-projects"
              class="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              @click="closeSidebar"
            >โครงการวิจัย</NuxtLink>
            <NuxtLink
              to="/admin/academic-services"
              class="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              @click="closeSidebar"
            >บริการวิชาการ</NuxtLink>
          </div>
        </div>

        <NuxtLink 
          to="/admin/profile" 
          class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group" 
          :class="{ 'bg-gray-100 dark:bg-gray-700': currentPage === 'Profile' }"
          @click="closeSidebar"
        >
          <svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="ml-3">ข้อมูลส่วนตัว</span>
        </NuxtLink>

        <NuxtLink 
          to="/admin/settings" 
          class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group" 
          :class="{ 'bg-gray-100 dark:bg-gray-700': currentPage === 'Settings' }"
          @click="closeSidebar"
        >
          <svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="ml-3">ตั้งค่าระบบ</span>
        </NuxtLink>

        <NuxtLink 
          to="/admin/about" 
          class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group" 
          :class="{ 'bg-gray-100 dark:bg-gray-700': currentPage === 'About' }"
          @click="closeSidebar"
        >
          <svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="ml-3">เกี่ยวกับระบบ</span>
        </NuxtLink>

  

      </div>
    </nav>
    <!--เส้นคั่น-->
    <aside class=" w-64 h-screen border-t border-gray-200 dark:border-gray-700 p-4">
   
  <!-- Logout Button -->
  <div class="fixed bottom-4 left-4">
    <button
      @click="handleLogout"
      class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>ออกจากระบบ</span>
    </button>
  </div>

    </aside>

  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  currentPage: string
}>()

const authStore = useAuthStore()
const isSidebarOpen = ref(false)
const isBasicInfoOpen = ref(false)
const isResearchOpen = ref(false)

// Handle logout
const handleLogout = () => {
  authStore.logout()
  navigateTo('/login', { replace: true })
}

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Close sidebar
const closeSidebar = () => {
  isSidebarOpen.value = false
}

// Toggle segments
const toggleBasicInfo = () => {
  isBasicInfoOpen.value = !isBasicInfoOpen.value
}
const toggleResearch = () => {
  isResearchOpen.value = !isResearchOpen.value
}

// Handle window resize
const handleResize = () => {
  if (window.innerWidth >= 1024) { // lg breakpoint
    isSidebarOpen.value = false
  }
}

// Add event listeners
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// Remove event listeners
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// เพิ่มการตรวจสอบ route ปัจจุบัน
const route = useRoute()
const router = useRouter()
const currentRoute = computed(() => route.path)

// Map visibility toggle
const isMapHidden = computed(() => route.query.hideMap === 'true')

const toggleMapVisibility = () => {
  const newQuery = { ...route.query }
  
  if (isMapHidden.value) {
    // Remove hideMap from query to show map
    delete newQuery.hideMap
  } else {
    // Add hideMap to query to hide map
    newQuery.hideMap = 'true'
  }
  
  router.push({
    path: route.path,
    query: newQuery
  })
}
</script> 