<script setup lang="ts">
import { useDarkModeStore, useAuthStore } from '~/stores'
import { ref, computed } from 'vue'

const darkModeStore = useDarkModeStore()
const authStore = useAuthStore()
const router = useRouter()
const searchText = ref('')
const isProfileMenuOpen = ref(false)

const userName = computed(() => {
  return authStore.user?.name || localStorage.getItem('userName') || ''
})

const userRole = computed(() => {
  return authStore.user?.role || localStorage.getItem('userRole') || 'user'
})

const profileImage = computed(() => {
  return authStore.user?.avatar || 'https://ui-avatars.com/api/?name='
})

const toggleDarkMode = () => {
  darkModeStore.toggleDarkMode()
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}

// Function to handle search
const handleSearch = () => {
  // Implement search functionality here
  console.log('Searching for:', searchText.value)
}
</script>

<template>
  <!-- Mobile Header -->
  <div class="lg:hidden">
    <div class="bg-white dark:bg-gray-800 shadow-sm p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <button class="text-gray-500 dark:text-gray-300">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
            <slot name="title"></slot>
          </h1>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">

          </div>
          <button @click="toggleDarkMode" class="text-gray-500 dark:text-gray-300">
            <svg v-if="darkModeStore.isDark"  class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else  class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <div class="relative">
            <div class="flex items-center space-x-3">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ userRole === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน' }}</p>
              </div>
              <button @click="toggleProfileMenu" class="focus:outline-none">
                <img :src="profileImage" class="h-8 w-8 rounded-full object-cover" alt="Profile" />
              </button>
            </div>
            <!-- Profile Dropdown Menu -->
            <div 
              v-if="isProfileMenuOpen" 
              class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 transform transition-all duration-200 ease-out"
              :class="[
                isProfileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                'origin-top-right'
              ]"
            >
              <!-- Profile Info -->
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center space-x-3">
                  <img :src="profileImage" class="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500 dark:ring-indigo-400" alt="Profile" />
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ authStore.user?.email || '' }}</p>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <div class="py-1">
                <NuxtLink 
                  to="/admin/profile" 
                  class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  ข้อมูลส่วนตัว
                </NuxtLink>

                <NuxtLink 
                  to="/admin/settings" 
                  class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  ตั้งค่า
                </NuxtLink>

                <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                <button 
                  @click="logout" 
                  class="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Header -->
  <header class="bg-white dark:bg-gray-800 shadow-sm p-4 hidden lg:block">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
          <slot name="title"></slot>
        </h1>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative">

        </div>
        <button @click="toggleDarkMode" class="text-gray-500 dark:text-gray-300">
          <svg v-if="darkModeStore.isDark" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <div class="relative">
          <div class="flex items-center space-x-3">
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ userRole === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน' }}</p>
            </div>
            <button @click="toggleProfileMenu" class="focus:outline-none">
              <img :src="profileImage" class="h-8 w-8 rounded-full object-cover" alt="Profile" />
            </button>
          </div>
          <!-- Profile Dropdown Menu -->
          <div 
            v-if="isProfileMenuOpen" 
            class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 transform transition-all duration-200 ease-out"
            :class="[
              isProfileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
              'origin-top-right'
            ]"
          >
            <!-- Profile Info -->
            <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-3">
                <img :src="profileImage" class="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500 dark:ring-indigo-400" alt="Profile" />
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ authStore.user?.email || '' }}</p>
                </div>
              </div>
            </div>

            <!-- Menu Items -->
            <div class="py-1">
              <NuxtLink 
                to="/admin/profile" 
                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                ข้อมูลส่วนตัว
              </NuxtLink>

              <NuxtLink 
                to="/admin/settings" 
                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ตั้งค่า
              </NuxtLink>

              <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              <button 
                @click="logout" 
                class="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </header>

  <!-- Click outside to close dropdown -->
  <div 
    v-if="isProfileMenuOpen" 
    class="fixed inset-0 z-40 bg-black/10 transition-opacity duration-200"
    @click="closeProfileMenu"
  ></div>
</template> 