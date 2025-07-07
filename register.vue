<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center px-4 py-6 sm:px-6 lg:px-8 relative">
    <!-- พื้นหลังโปร่งแสงและเบลอ -->
    <div class="absolute inset-0 bg-[url('/research.jpg')] bg-cover bg-center opacity-40 backdrop-blur-sm"></div>
    <div class="relative z-10">
      <div class="mx-auto w-full max-w-[340px] sm:max-w-md md:max-w-lg">
        <div class="flex justify-center mb-2">
          <img src="/pbru-logo.png" alt="PBRU Logo" class="h-20 w-20 object-contain" />
        </div>
        <h2 class="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          สร้างบัญชีผู้ใช้ใหม่
        </h2>
        <p class="text-center text-gray-500 text-sm mb-4">กรุณากรอกข้อมูลให้ครบถ้วน</p>
      </div>

      <div class="mx-auto w-full max-w-[340px] sm:max-w-md md:max-w-lg">
        <div class="bg-white/90 backdrop-blur-md py-8 px-6 shadow-lg rounded-2xl">
          <form class="space-y-5" @submit.prevent="handleRegister">
            <div>
              <label for="name" class="block text-base font-medium text-gray-700">
                ชื่อ-นามสกุล
              </label>
              <div class="mt-1 flex items-center">
           
                <input
                  id="name"
                  v-model="name"
                  name="name"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  placeholder="ชื่อ-นามสกุล"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-base font-medium text-gray-700">
                อีเมล
              </label>
              <div class="mt-1 flex items-center">
             
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-base font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <div class="mt-1 flex items-center">
                
                <input
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  placeholder="รหัสผ่าน"
                />
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-base font-medium text-gray-700">
                ยืนยันรหัสผ่าน
              </label>
              <div class="mt-1 flex items-center">
               
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  placeholder="ยืนยันรหัสผ่าน"
                />
              </div>
            </div>

            <div v-if="error" class="text-red-500 text-sm text-center">
              {{ error }}
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-95" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังสมัครสมาชิก...
                </span>
                <span v-else>สมัครสมาชิก</span>
              </button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  มีบัญชีอยู่แล้ว?
                </span>
              </div>
            </div>

            <div class="mt-6">
              <NuxtLink
                to="/login"
                class="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                เข้าสู่ระบบ
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const authStore = useAuthStore()
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      error.value = 'รหัสผ่านไม่ตรงกัน'
      return
    }

    loading.value = true
    error.value = ''

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    // Registration successful, redirect to login
    await navigateTo('/login')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดระหว่างการสมัครสมาชิก'
    console.error('Registration error:', err)
  } finally {
    loading.value = false
  }
}
</script> 