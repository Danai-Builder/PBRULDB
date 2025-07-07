<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <SidebarNavigation current-page="academic-services" />
  
      <div class="flex-1 flex flex-col min-h-screen">
        <Topbar>
          <template #title>บริการวิชาการ</template>
        </Topbar>

        <main class="flex-1 p-6">
          <!-- บทสรุป -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">บทสรุป</h2>
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-gray-600 dark:text-gray-300">
                บริการวิชาการของมหาวิทยาลัยราชภัฏเพชรบุรี มุ่งเน้นการให้บริการทางวิชาการแก่ชุมชนและสังคมในจังหวัดเพชรบุรีและจังหวัดใกล้เคียง 
                โดยมีการดำเนินงานในรูปแบบต่างๆ ดังนี้:
              </p>
              <ul class="list-disc pl-6 mt-4 text-gray-600 dark:text-gray-300">
                <li>การให้บริการวิชาการแก่ชุมชนและสังคม</li>
                <li>การถ่ายทอดความรู้และเทคโนโลยี</li>
                <li>การวิจัยเพื่อพัฒนาชุมชนและท้องถิ่น</li>
                <li>การพัฒนาองค์ความรู้ใหม่</li>
                <li>การให้คำปรึกษาและบริการวิชาการ</li>
              </ul>
            </div>
          </div>

          <!-- รายงานเอกสารงานวิจัย -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">รายงานเอกสารงานวิจัย</h2>
              <div class="flex space-x-2">
                <input 
                  v-model="searchQuery"
                  type="text"
                  placeholder="ค้นหาเอกสาร..."
                  class="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                <select 
                  v-model="statusFilter"
                  class="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">ทั้งหมด</option>
                  <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                  <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                </select>
              </div>
            </div>
            
            <!-- ตารางแสดงรายการเอกสาร -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ชื่อเอกสาร</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">วันที่</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">สถานะ</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">การจัดการ</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="doc in filteredDocuments" :key="doc.file">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      <div class="flex items-center">
                        <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {{ doc.name }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ doc.date }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                        doc.status === 'เสร็จสิ้น' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      ]">
                        {{ doc.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div class="flex space-x-2">
                        <button 
                          @click="viewDocument(doc)"
                          class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          ดูรายละเอียด
                        </button>
                        <button 
                          @click="downloadDocument(doc)"
                          class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          ดาวน์โหลด
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Modal สำหรับดูรายละเอียดเอกสาร -->
          <div v-if="selectedDocument" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedDocument.name }}</h3>
                <button @click="selectedDocument = null" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">วันที่: {{ selectedDocument.date }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">สถานะ: {{ selectedDocument.status }}</p>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">รายละเอียด</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    {{ selectedDocument.description || 'ไม่มีรายละเอียดเพิ่มเติม' }}
                  </p>
                </div>
                <div class="flex justify-end space-x-2">
                  <button 
                    @click="downloadDocument(selectedDocument)"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    ดาวน์โหลด
                  </button>
                  <button 
                    @click="selectedDocument = null"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- อัปโหลดไฟล์ -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">อัปโหลดเอกสาร</h2>
            
            <form @submit.prevent="handleUpload" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ชื่อเอกสาร</label>
                <input 
                  v-model="uploadForm.name"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">รายละเอียด</label>
                <textarea 
                  v-model="uploadForm.description"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ไฟล์เอกสาร</label>
                <input 
                  type="file"
                  @change="handleFileChange"
                  class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    dark:file:bg-indigo-900 dark:file:text-indigo-300
                    hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800"
                  required
                >
              </div>

              <div class="flex justify-end">
                <button 
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  อัปโหลด
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useAuthStore } from '../../stores/auth'
  import { useDarkModeStore } from '~/stores/darkMode'
  
  const authStore = useAuthStore()
  const darkModeStore = useDarkModeStore()
  
  interface Document {
    name: string
    date: string
    status: string
    file: string
    description: string
  }
  
  // ข้อมูลตัวอย่าง
  const documents = ref<Document[]>([
    {
      name: 'รายงานวิจัยประจำปี 2566',
      date: '01/01/2566',
      status: 'เสร็จสิ้น',
      file: 'research-report-2566.pdf',
      description: 'รายงานวิจัยประจำปี 2566 ของมหาวิทยาลัยราชภัฏเพชรบุรี ครอบคลุมผลงานวิจัยทั้งหมดในปีการศึกษา 2565'
    },
    {
      name: 'บทความวิชาการ',
      date: '15/02/2566',
      status: 'กำลังดำเนินการ',
      file: 'academic-article.pdf',
      description: 'บทความวิชาการเกี่ยวกับการพัฒนาชุมชนท้องถิ่นในจังหวัดเพชรบุรี'
    },
    {
      name: 'โครงการบริการวิชาการชุมชน',
      date: '01/03/2566',
      status: 'เสร็จสิ้น',
      file: 'community-service.pdf',
      description: 'รายงานผลการดำเนินโครงการบริการวิชาการแก่ชุมชนในจังหวัดเพชรบุรี'
    },
    {
      name: 'รายงานการวิจัยท้องถิ่น',
      date: '15/03/2566',
      status: 'กำลังดำเนินการ',
      file: 'local-research.pdf',
      description: 'รายงานการวิจัยเกี่ยวกับวัฒนธรรมและประเพณีท้องถิ่นในจังหวัดเพชรบุรี'
    }
  ])
  
  // ฟอร์มอัปโหลด
  const uploadForm = ref({
    name: '',
    description: '',
    file: null as File | null
  })
  
  // ตัวแปรสำหรับการค้นหาและกรอง
  const searchQuery = ref('')
  const statusFilter = ref('')
  const selectedDocument = ref<Document | null>(null)
  
  // คำนวณเอกสารที่กรองแล้ว
  const filteredDocuments = computed(() => {
    return documents.value.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesStatus = !statusFilter.value || doc.status === statusFilter.value
      return matchesSearch && matchesStatus
    })
  })
  
  // จัดการการเลือกไฟล์
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      uploadForm.value.file = target.files[0]
    }
  }
  
  // จัดการการอัปโหลด
  const handleUpload = async () => {
    try {
      // สร้าง FormData
      const formData = new FormData()
      formData.append('name', uploadForm.value.name)
      formData.append('description', uploadForm.value.description)
      if (uploadForm.value.file) {
        formData.append('file', uploadForm.value.file)
      }
      
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        // รีเซ็ตฟอร์ม
        uploadForm.value = {
          name: '',
          description: '',
          file: null
        }
        alert('อัปโหลดสำเร็จ')
      } else {
        throw new Error('อัปโหลดไม่สำเร็จ')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('เกิดข้อผิดพลาดในการอัปโหลด')
    }
  }
  
  // ดาวน์โหลดเอกสาร
  const downloadDocument = (doc: Document) => {
    // จำลองการดาวน์โหลด
    window.open(`/api/documents/download/${doc.file}`, '_blank')
  }
  
  // ดูรายละเอียดเอกสาร
  const viewDocument = (doc: Document) => {
    selectedDocument.value = doc
  }
  
  onMounted(() => {
    darkModeStore.initializeDarkMode()
  })
  
  </script> 