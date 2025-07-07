<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <SidebarNavigation current-page="abstract" />

    <div class="flex-1 flex flex-col min-h-screen">
      <Topbar>
        <template #title>จัดการงานวิจัย Abstract</template>
      </Topbar>

      <div class="flex-1 p-6">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">งานวิจัยทั้งหมด</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ abstracts.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">อัปโหลดวันนี้</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ todayUploads }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">หมวดหมู่</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ categories.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">ล่าสุด</p>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ lastUpdated }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Upload Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              อัปโหลดงานวิจัย Abstract
            </h2>
            <button
              @click="showUploadForm = !showUploadForm"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              {{ showUploadForm ? 'ซ่อนฟอร์ม' : 'เพิ่มงานวิจัย' }}
            </button>
          </div>

          <!-- Upload Form -->
          <div v-if="showUploadForm" class="border-t pt-6">
            <form @submit.prevent="uploadAbstract" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ชื่อเรื่องงานวิจัย *
                  </label>
                  <input
                    v-model="newAbstract.title"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="กรอกชื่อเรื่องงานวิจัย"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    หมวดหมู่ *
                  </label>
                  <select
                    v-model="newAbstract.category"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">เลือกหมวดหมู่</option>
                    <option v-for="category in categories" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ผู้วิจัย *
                  </label>
                  <input
                    v-model="newAbstract.author"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="ชื่อผู้วิจัย"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ปีที่ทำการวิจัย *
                  </label>
                  <input
                    v-model="newAbstract.year"
                    type="number"
                    min="2000"
                    max="2030"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="2024"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  บทคัดย่อ
                </label>
                <textarea
                  v-model="newAbstract.abstract"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="กรอกบทคัดย่อของงานวิจัย"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ตำแหน่ง (ถ้ามี)
                </label>
                <div class="flex items-center gap-4">
                  <input
                    :value="newAbstract.latitude ? newAbstract.latitude.toFixed(6) : ''"
                    type="text"
                    readonly
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 cursor-not-allowed"
                    placeholder="ละติจูด"
                  >
                  <input
                    :value="newAbstract.longitude ? newAbstract.longitude.toFixed(6) : ''"
                    type="text"
                    readonly
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 cursor-not-allowed"
                    placeholder="ลองจิจูด"
                  >
                  <button
                    @click="openMapModal"
                    type="button"
                    class="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition whitespace-nowrap flex items-center"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    ระบุตำแหน่ง
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ไฟล์ Abstract (PDF) *
                </label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-blue-500 transition">
                  <div class="space-y-1 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600 dark:text-gray-400">
                      <label class="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>เลือกไฟล์</span>
                        <input
                          ref="fileInput"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          class="sr-only"
                          @change="handleFileSelect"
                          required
                        >
                      </label>
                      <p class="pl-1">หรือลากวางไฟล์</p>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      PDF, DOC, DOCX ขนาดไม่เกิน 10MB
                    </p>
                  </div>
                </div>
                <div v-if="selectedFile" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  ไฟล์ที่เลือก: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
                </div>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  :disabled="uploading"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <svg v-if="uploading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ uploading ? 'กำลังอัปโหลด...' : 'อัปโหลด' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ค้นหา</label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="ค้นหาชื่อเรื่อง, ผู้วิจัย, หรือบทคัดย่อ..."
                >
                <svg class="absolute left-3 top-3 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <div class="w-full md:w-64">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">หมวดหมู่</label>
              <select
                v-model="filterCategory"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">ทั้งหมด</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div class="w-full md:w-48">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ปี</label>
              <select
                v-model="filterYear"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">ทั้งหมด</option>
                <option v-for="year in availableYears" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Abstracts List -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              รายการงานวิจัย ({{ filteredAbstracts.length }})
            </h2>
          </div>

          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="abstract in paginatedAbstracts"
              :key="abstract.id"
              class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      {{ abstract.title }}
                    </h3>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {{ abstract.category }}
                    </span>
                  </div>

                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span class="font-medium">ผู้วิจัย:</span> {{ abstract.author }} |
                    <span class="font-medium">ปี:</span> {{ abstract.year }} |
                    <span class="font-medium">อัปโหลด:</span> {{ formatDate(abstract.uploadDate) }}
                  </div>

                  <p v-if="abstract.abstract" class="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                    {{ abstract.abstract }}
                  </p>

                  <div class="flex items-center space-x-4 text-sm flex-wrap gap-y-2">
                    <button
                      @click="viewAbstract(abstract)"
                      class="text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      ดูไฟล์
                    </button>

                    <button
                      @click="downloadAbstract(abstract)"
                      class="text-green-600 hover:text-green-700 flex items-center"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8"></path>
                      </svg>
                      ดาวน์โหลด
                    </button>

                    <button
                      @click="editAbstract(abstract)"
                      class="text-yellow-600 hover:text-yellow-700 flex items-center"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      แก้ไข
                    </button>

                    <button
                      @click="deleteAbstract(abstract)"
                      class="text-red-600 hover:text-red-700 flex items-center"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      ลบ
                    </button>

                    <button
                      v-if="abstract.latitude && abstract.longitude"
                      @click="viewLocation(abstract)"
                      class="text-indigo-600 hover:text-indigo-700 flex items-center"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      ดูตำแหน่ง
                    </button>
                  </div>
                </div>

                <div class="ml-4 flex-shrink-0">
                  <div class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="filteredAbstracts.length > itemsPerPage" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700 dark:text-gray-400">
                แสดง {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredAbstracts.length) }} 
                จาก {{ filteredAbstracts.length }} รายการ
              </div>
              <div class="flex space-x-2">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ก่อนหน้า
                </button>
                <span class="px-3 py-1 text-gray-700 dark:text-gray-300">
                  หน้า {{ currentPage }} จาก {{ totalPages }}
                </span>
                <button
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredAbstracts.length === 0" class="p-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">ไม่พบงานวิจัย</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">เริ่มต้นโดยการอัปโหลดงานวิจัย Abstract แรกของคุณ</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Modal -->
    <div v-if="showMapModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ isMapViewOnly ? 'ตำแหน่งงานวิจัย' : 'ระบุตำแหน่งบนแผนที่' }}
          </h3>
          <p v-if="!isMapViewOnly" class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            คลิกบนแผนที่เพื่อปักหมุดตำแหน่งที่ต้องการ
          </p>
          <div class="h-96 w-full relative rounded-lg overflow-hidden border dark:border-gray-600">
            <ClientOnly>
              <LMap
                :zoom="mapZoom"
                :center="mapCenter"
                @click="handleMapClick"
                :use-global-leaflet="false"
                class="h-full w-full"
              >
                <LTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                <LMarker v-if="markerLatLng" :lat-lng="markerLatLng" />
              </LMap>
            </ClientOnly>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end gap-4 rounded-b-lg">
          <button @click="cancelLocation" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
            {{ isMapViewOnly ? 'ปิด' : 'ยกเลิก' }}
          </button>
          <button v-if="!isMapViewOnly" @click="confirmLocation" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ยืนยันตำแหน่ง
          </button>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" class="fixed top-4 right-4 z-50">
      <div :class="[
        'px-6 py-4 rounded-lg shadow-lg',
        message.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 'bg-red-100 text-red-800 border-l-4 border-red-500'
      ]">
        <div class="flex items-center">
          <svg v-if="message.type === 'success'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          {{ message.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const LMap = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LMap))
const LTileLayer = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LTileLayer))
const LMarker = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LMarker))

interface Abstract {
  id: number;
  title: string;
  category: string;
  author: string;
  year: number;
  abstract: string;
  uploadDate: Date;
  fileUrl: string;
  fileName: string;
  latitude: number | null;
  longitude: number | null;
}

// State
const showUploadForm = ref(false)
const uploading = ref(false)
const message = ref(null as any)
const selectedFile = ref(null as File | null)
const searchQuery = ref('')
const filterCategory = ref('')
const filterYear = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Map State
const showMapModal = ref(false)
const isMapViewOnly = ref(false)
const mapCenter = ref([13.1119, 99.9447] as [number, number])
const mapZoom = ref(10)
const markerLatLng = ref(null as [number, number] | null)

// Form data
const newAbstract = ref({
  title: '',
  category: '',
  author: '',
  year: new Date().getFullYear(),
  abstract: '',
  latitude: null as number | null,
  longitude: null as number | null,
})

// Categories
const categories = ref([
  'วิจัยพื้นฐาน',
  'วิจัยประยุกต์'
])

// Sample data
const abstracts = ref<Abstract[]>([
  {
    id: 1,
    title: 'การพัฒนาระบบจัดการข้อมูลนักศึกษาด้วยเทคโนโลยี AI',
    category: 'เทคโนโลยีและนวัตกรรม',
    author: 'ดร.สมชาย วิทยากร',
    year: 2024,
    abstract: 'งานวิจัยนี้นำเสนอการพัฒนาระบบจัดการข้อมูลนักศึกษาที่ใช้เทคโนโลยีปัญญาประดิษฐ์ในการวิเคราะห์และจัดการข้อมูล เพื่อเพิ่มประสิทธิภาพในการบริหารจัดการสถานศึกษา',
    uploadDate: new Date('2024-01-15'),
    fileUrl: 'https://drive.google.com/file/d/example1',
    fileName: 'AI_Student_Management_System.pdf',
    latitude: 12.919,
    longitude: 99.8824,
  },
  {
    id: 2,
    title: 'ผลกระทบของการเปลี่ยนแปลงสภาพภูมิอากาศต่อการเกษตรในภาคกลาง',
    category: 'สิ่งแวดล้อม',
    author: 'ผศ.ดร.วิรัตน์ สิ่งแวดล้อม',
    year: 2024,
    abstract: 'การศึกษาผลกระทบของการเปลี่ยนแปลงสภาพภูมิอากาศที่มีต่อภาคการเกษตรในภาคกลางของประเทศไทย พร้อมเสนอแนะแนวทางการปรับตัวที่เหมาะสม',
    uploadDate: new Date('2024-01-10'),
    fileUrl: 'https://drive.google.com/file/d/example2',
    fileName: 'Climate_Change_Agriculture.pdf',
    latitude: 13.1751,
    longitude: 99.991,
  },
  {
    id: 3,
    title: 'การยกระดับคุณภาพการศึกษาด้วยการจัดการเรียนรู้แบบผสมผสาน',
    category: 'ศึกษาศาสตร์',
    author: 'อาจารย์สุมาลี การศึกษา',
    year: 2023,
    abstract: 'งานวิจัยเกี่ยวกับการพัฒนารูปแบบการจัดการเรียนรู้แบบผสมผสานที่เหมาะสมกับบริบทของการศึกษาไทย เพื่อยกระดับคุณภาพการศึกษา',
    uploadDate: new Date('2023-12-20'),
    fileUrl: 'https://drive.google.com/file/d/example3',
    fileName: 'Blended_Learning_Quality.pdf',
    latitude: null,
    longitude: null,
  }
])

// Computed properties
const filteredAbstracts = computed(() => {
  let filtered = abstracts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(abstract =>
      abstract.title.toLowerCase().includes(query) ||
      abstract.author.toLowerCase().includes(query) ||
      abstract.abstract.toLowerCase().includes(query)
    )
  }

  if (filterCategory.value) {
    filtered = filtered.filter(abstract => abstract.category === filterCategory.value)
  }

  if (filterYear.value) {
    filtered = filtered.filter(abstract => abstract.year.toString() === filterYear.value)
  }

  return filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
})

const paginatedAbstracts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredAbstracts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredAbstracts.value.length / itemsPerPage.value)
})

const availableYears = computed(() => {
  const years = [...new Set(abstracts.value.map(a => a.year))].sort((a, b) => b - a)
  return years
})

const todayUploads = computed(() => {
  const today = new Date().toDateString()
  return abstracts.value.filter(a => new Date(a.uploadDate).toDateString() === today).length
})

const lastUpdated = computed(() => {
  if (abstracts.value.length === 0) return 'ไม่มีข้อมูล'
  const latest = abstracts.value.reduce((latest, current) => 
    new Date(current.uploadDate) > new Date(latest.uploadDate) ? current : latest
  )
  return formatDate(latest.uploadDate)
})

// Methods
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

const openMapModal = () => {
  isMapViewOnly.value = false
  if (newAbstract.value.latitude && newAbstract.value.longitude) {
    const lat = Number(newAbstract.value.latitude)
    const lng = Number(newAbstract.value.longitude)
    markerLatLng.value = [lat, lng]
    mapCenter.value = [lat, lng]
    mapZoom.value = 14
  } else {
    markerLatLng.value = null
    mapCenter.value = [13.1119, 99.9447] // Phetchaburi
    mapZoom.value = 10
  }
  showMapModal.value = true
}

const handleMapClick = (event: any) => {
  if (isMapViewOnly.value) return
  if (event.latlng) {
    markerLatLng.value = [event.latlng.lat, event.latlng.lng]
  }
}

const confirmLocation = () => {
  if (markerLatLng.value) {
    newAbstract.value.latitude = markerLatLng.value[0]
    newAbstract.value.longitude = markerLatLng.value[1]
  }
  showMapModal.value = false
}

const cancelLocation = () => {
  showMapModal.value = false
}

const uploadAbstract = async () => {
  if (!selectedFile.value) {
    showMessage('กรุณาเลือกไฟล์', 'error')
    return
  }

  uploading.value = true

  try {
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    formData.append('title', newAbstract.value.title)
    formData.append('category', newAbstract.value.category)
    formData.append('author', newAbstract.value.author)
    formData.append('year', newAbstract.value.year.toString())
    formData.append('abstract', newAbstract.value.abstract)
    formData.append('latitude', newAbstract.value.latitude?.toString() ?? '')
    formData.append('longitude', newAbstract.value.longitude?.toString() ?? '')

    // Upload to Google Drive
    const response = await $fetch('/api/abstract/upload', {
      method: 'POST',
      body: formData
    })

    const responseData = response.data as any;

    if (response.success && responseData) {
      // Add to local list
      const newId = abstracts.value.length > 0 ? Math.max(...abstracts.value.map(a => a.id)) + 1 : 1
      abstracts.value.unshift({
        id: newId,
        title: responseData.title,
        category: responseData.category,
        author: responseData.author,
        year: responseData.year,
        abstract: responseData.abstract,
        latitude: responseData.latitude ? Number(responseData.latitude) : null,
        longitude: responseData.longitude ? Number(responseData.longitude) : null,
        uploadDate: new Date(responseData.uploadDate),
        fileUrl: responseData.webViewLink,
        fileName: responseData.fileName
      })

      showMessage(response.message || 'อัปโหลดงานวิจัยสำเร็จ', 'success')
      resetForm()
    } else {
      throw new Error('อัปโหลดไม่สำเร็จ')
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    showMessage(error.message || 'เกิดข้อผิดพลาดในการอัปโหลด', 'error')
  }

  uploading.value = false
}

const viewAbstract = (abstract: any) => {
  if (abstract.fileUrl) {
    window.open(abstract.fileUrl, '_blank')
  }
}

const viewLocation = (abstract: any) => {
  if (abstract.latitude && abstract.longitude) {
    isMapViewOnly.value = true
    markerLatLng.value = [abstract.latitude, abstract.longitude]
    mapCenter.value = [abstract.latitude, abstract.longitude]
    mapZoom.value = 14
    showMapModal.value = true
  }
}

const downloadAbstract = async (abstract: any) => {
  try {
    // Create download link
    const link = document.createElement('a')
    link.href = abstract.fileUrl
    link.download = abstract.fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    showMessage('เริ่มดาวน์โหลดไฟล์', 'success')
  } catch (error) {
    showMessage('ไม่สามารถดาวน์โหลดไฟล์ได้', 'error')
  }
}

const editAbstract = (abstract: any) => {
  // Implementation for editing
  newAbstract.value = { ...abstract }
  showUploadForm.value = true
  showMessage('โหลดข้อมูลสำหรับแก้ไข', 'success')
}

const deleteAbstract = (abstract: any) => {
  if (confirm(`คุณต้องการลบงานวิจัย "${abstract.title}" หรือไม่?`)) {
    const index = abstracts.value.findIndex(a => a.id === abstract.id)
    if (index > -1) {
      abstracts.value.splice(index, 1)
      showMessage('ลบงานวิจัยสำเร็จ', 'success')
    }
  }
}

const resetForm = () => {
  newAbstract.value = {
    title: '',
    category: '',
    author: '',
    year: new Date().getFullYear(),
    abstract: '',
    latitude: null,
    longitude: null,
  }
  selectedFile.value = null
  showUploadForm.value = false
  
  // Reset file input
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
  if (fileInput) {
    fileInput.value = ''
  }
}

const showMessage = (text: string, type: 'success' | 'error') => {
  message.value = { text, type }
  setTimeout(() => {
    message.value = null
  }, 5000)
}

onMounted(() => {
  const route = useRoute()
  const search = route.query.search
  if (search) {
    searchQuery.value = Array.isArray(search) ? (search[0] || '') : search
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dark .leaflet-container {
  background: #374151; /* gray-700 */
}
</style> 