<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <SidebarNavigation current-page="profile" />

    <div class="flex-1 flex flex-col min-h-screen">
      <Topbar>
        <template #title>Profile</template>
      </Topbar>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore, useDarkModeStore } from '~/stores'

const authStore = useAuthStore()
const isSidebarOpen = ref(false)
const darkModeStore = useDarkModeStore()

onMounted(() => {
  darkModeStore.initializeDarkMode()
})


</script> 