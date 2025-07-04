<script setup lang="ts">
import { onMounted } from 'vue'
import { useDarkModeStore } from '~/stores/darkMode.ts'

const darkModeStore = useDarkModeStore()

onMounted(() => {
  darkModeStore.initializeDarkMode()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Markup shared across all pages, ex: NavBar -->
    <NuxtPage />
  </div>
</template>
  