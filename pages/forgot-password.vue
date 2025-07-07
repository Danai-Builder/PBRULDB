<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center px-4 py-4 sm:px-6 lg:px-8 relative">
    <div class="absolute inset-0 bg-[url('/research.jpg')] bg-cover bg-center opacity-40 backdrop-blur-sm"></div>
    <div class="relative z-10">
      <div class="mx-auto w-full max-w-[340px] sm:max-w-md md:max-w-lg">
        <div class="flex justify-center">
          <img src="/pbru-logo.png" alt="PBRU Logo" class="h-32 w-32 sm:h-28 object-contain" />
        </div>
        <h2 class="mt-4 text-center text-xl sm:text-2xl font-bold text-gray-900">
          ลืมรหัสผ่าน
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          กรอกอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
        </p>
      </div>

      <div class="mt-6 mx-auto w-full max-w-[340px] sm:max-w-md md:max-w-lg">
        <div class="bg-white/90 backdrop-blur-md py-8 px-6 shadow-lg rounded-2xl">
          <form v-if="!isSuccess" class="space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label for="email" class="block text-base font-medium text-gray-700">
                อีเมล
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  :class="[
                    'appearance-none block w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-offset-0',
                    emailError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  ]"
                  @input="validateEmail"
                />
                <p v-if="emailError" class="mt-1 text-xs text-red-600">{{ emailError }}</p>
              </div>
            </div>

            <div v-if="error" class="text-red-500 text-xs text-center">
              {{ error }}
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading || !isFormValid"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-95" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังส่ง...
                </span>
                <span v-else>ส่งลิงก์รีเซ็ตรหัสผ่าน</span>
              </button>
            </div>
          </form>

          <div v-else class="text-center space-y-4">
            <div class="text-green-600">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">ส่งอีเมลแล้ว</h3>
            <p class="text-sm text-gray-600">
              เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว<br>
              กรุณาตรวจสอบอีเมลและทำตามขั้นตอนที่ระบุ
            </p>
          </div>

          <div class="mt-6 text-center">
            <NuxtLink
              to="/login"
              class="text-sm text-indigo-600 hover:text-indigo-500"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const error = ref('')
const loading = ref(false)
const emailError = ref('')
const isSuccess = ref(false)

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'กรุณากรอกอีเมล'
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'รูปแบบอีเมลไม่ถูกต้อง'
  } else {
    emailError.value = ''
  }
}

const isFormValid = computed(() => {
  return !emailError.value && email.value
})

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    validateEmail()
    if (!isFormValid.value) return

    // TODO: เรียก API ส่งอีเมลรีเซ็ตรหัสผ่าน
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    isSuccess.value = true
  } catch (err: any) {
    error.value = err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
  } finally {
    loading.value = false
  }
}
</script> 