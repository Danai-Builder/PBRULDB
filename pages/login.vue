<template>
  <div class="min-h-screen flex flex-col justify-center px-4 py-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-blue-100 via-blue-200 to-green-100">
    <div class="relative z-10">
      <div class="mx-auto w-full max-w-[340px] sm:max-w-md md:max-w-lg">
        <div class="flex justify-center">
          <img src="/pbru-logo.png" alt="PBRU Logo" class="h-32 w-32 sm:h-28 object-contain" />
        </div>
        <h2 class="mt-4 text-center text-xl sm:text-2xl font-bold text-gray-900">
          กรุณาเข้าสู่ระบบ
        </h2>
      </div>

      <div class="mt-6 mx-auto w-full max-w-[340px] sm:max-w-md md:max-w-lg">
        <div class="bg-white/90 backdrop-blur-md py-8 px-6 shadow-lg rounded-2xl">
          <form class="space-y-6" @submit.prevent="handleLogin">
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

            <div>
              <label for="password" class="block text-base font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  :class="[
                    'appearance-none block w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-offset-0',
                    passwordError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  ]"
                  @input="validatePassword"
                />
                <p v-if="passwordError" class="mt-1 text-xs text-red-600">{{ passwordError }}</p>
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
                  กำลังเข้าสู่ระบบ...
                </span>
                <span v-else>เข้าสู่ระบบ</span>
              </button>
            </div>

            <div class="text-center">
              <NuxtLink
                to="/forgot-password"
                class="text-sm text-indigo-600 hover:text-indigo-500"
              >
                ลืมรหัสผ่าน?
              </NuxtLink>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="px-2 bg-white text-gray-500">
                  หรือ
                </span>
              </div>
            </div>

            <div class="mt-6">
              <NuxtLink
                to="/register"
                class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                สร้างบัญชีใหม่
              </NuxtLink>
            </div>
            
            <!-- Back Button -->
            <div class="mt-6">
              <NuxtLink 
                to="/" 
                class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                กลับสู่หน้าหลัก
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const emailError = ref('')
const passwordError = ref('')
const authStore = useAuthStore()

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

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'กรุณากรอกรหัสผ่าน'
  } else if (password.value.length < 6) {
    passwordError.value = 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร'
  } else {
    passwordError.value = ''
  }
}

const isFormValid = computed(() => {
  return !emailError.value && !passwordError.value && email.value && password.value
})

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    validateEmail()
    validatePassword()
    if (!isFormValid.value) return

    await authStore.login(email.value, password.value)
    // authStore.user จะมีข้อมูล user พร้อม role แล้ว
    if (authStore.user?.role === 'admin') {
      await navigateTo('/admin/dashboard')
    } else {
      // ระบบปัจจุบันรองรับเฉพาะผู้ดูแลระบบเท่านั้น
      throw new Error('ระบบปัจจุบันรองรับเฉพาะผู้ดูแลระบบเท่านั้น')
    }
  } catch (err: any) {
    error.value = err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
  } finally {
    loading.value = false
  }
}
</script>