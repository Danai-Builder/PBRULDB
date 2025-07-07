<template>
  <div class="flex items-center space-x-4">
    <!-- Profile Picture Preview -->
    <div class="relative">
      <img 
        :src="previewUrl || currentImage" 
        alt="Profile" 
        class="h-16 w-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
      />
      <div v-if="isUploading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
        <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <!-- Upload Button -->
    <div class="flex flex-col space-y-2">
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />
      <button 
        @click="triggerFileInput"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isUploading"
      >
        {{ isUploading ? 'กำลังอัปโหลด...' : 'เปลี่ยนรูปโปรไฟล์' }}
      </button>
      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  currentImage: string
}>()

const emit = defineEmits<{
  (e: 'update:image', file: File): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isUploading = ref(false)
const error = ref<string | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'กรุณาเลือกไฟล์รูปภาพเท่านั้น'
    return
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'ขนาดไฟล์ต้องไม่เกิน 5MB'
    return
  }

  // Create preview URL
  previewUrl.value = URL.createObjectURL(file)
  error.value = null

  // Emit the file for parent component
  emit('update:image', file)
}
</script> 