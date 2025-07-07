<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <SidebarNavigation current-page="landuse" />
  
      <div class="flex-1 flex flex-col min-h-screen lg:ml-0 relative z-0">
        <Topbar>
          <template #title>ประโยชน์การใช้งานพื้นที่</template>
        </Topbar>

        <div class="flex flex-col items-center mt-8 px-4 w-full overflow-x-hidden">
          
          <!-- Search Box -->
          <div class="mb-6 w-full max-w-5xl px-2">
            <label for="landuse-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ค้นหาพื้นที่</label>
            <div class="relative">
              <input
                id="landuse-search"
                v-model="searchQuery"
                type="text"
                placeholder="ค้นหาจังหวัด อำเภอ หรือตำบล..."
                class="w-full border rounded-lg pl-10 pr-4 py-2 sm:py-3 text-base sm:text-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Selector Controls -->
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-6 w-full max-w-5xl px-2">
            <!-- Province Selector -->
            <div class="sm:col-span-2 xl:col-span-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">เลือกจังหวัด</label>
              <select
                v-model="selectedProvince"
                @change="onProvinceChange"
                class="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="province in provinces" :key="province.name" :value="province">
                  {{ province.name }}
                </option>
              </select>
            </div>

            <!-- District Selector -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">เลือกอำเภอ</label>
              <select
                v-model="selectedAmphoe"
                @change="onAmphoeChange"
                class="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                :disabled="!selectedProvince || availableAmphoes.length === 0"
              >
                <option :value="null">-- เลือกอำเภอ --</option>
                <option v-for="amphoe in availableAmphoes" :key="amphoe.name" :value="amphoe">
                  {{ amphoe.name }}
                </option>
              </select>
            </div>

            <!-- Subdistrict Selector -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">เลือกตำบล</label>
              <select
                v-model="selectedTambon"
                @change="onTambonChange"
                class="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                :disabled="!selectedAmphoe || availableTambons.length === 0"
              >
                <option :value="null">-- เลือกตำบล --</option>
                <option v-for="tambon in availableTambons" :key="tambon.name" :value="tambon">
                  {{ tambon.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Current Selection Display -->
          <div class="mb-4 sm:mb-6 text-center px-4">
            <div class="text-blue-700 dark:text-blue-400 font-semibold text-base sm:text-lg">
              พื้นที่ที่เลือก: {{ selectedProvince.name }}
              <span v-if="selectedAmphoe"> > {{ selectedAmphoe.name }}</span>
              <span v-if="selectedTambon"> > {{ selectedTambon.name }}</span>
            </div>
          </div>

          <!-- Land Use Charts -->
          <div class="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6 mx-2 mb-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              การใช้งานพื้นที่ {{ selectedTambon ? selectedTambon.name : selectedAmphoe ? selectedAmphoe.name : selectedProvince.name }}
            </h3>
            
            <!-- Chart Container -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <!-- Pie Chart -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">สัดส่วนการใช้งานพื้นที่</h4>
                <div class="h-64 flex items-center justify-center">
                  <canvas ref="pieChart" width="300" height="300"></canvas>
                </div>
              </div>

              <!-- Bar Chart -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">พื้นที่ตามประเภทการใช้งาน</h4>
                <div class="h-64 flex items-center justify-center">
                  <canvas ref="barChart" width="400" height="300"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Land Use Details Table -->
          <div class="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6 mx-2 mb-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">รายละเอียดการใช้งานพื้นที่</h3>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ประเภทการใช้งาน</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">พื้นที่ (ไร่)</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">เปอร์เซ็นต์</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                  <tr v-for="(landuse, index) in currentLandUseData" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-4 h-4 rounded mr-3" :style="{ backgroundColor: landuse.color }"></div>
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ landuse.type }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {{ landuse.area.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {{ landuse.percentage.toFixed(1) }}%
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {{ landuse.note }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Summary Statistics -->
          <div class="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6 mx-2 mb-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">สรุปข้อมูลการใช้งานพื้นที่</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-green-600">{{ totalArea.toLocaleString() }}</div>
                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">พื้นที่รวม (ไร่)</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-blue-600">{{ agriculturalArea.toLocaleString() }}</div>
                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">พื้นที่เกษตรกรรม (ไร่)</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-orange-600">{{ residentialArea.toLocaleString() }}</div>
                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">พื้นที่อยู่อาศัย (ไร่)</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-purple-600">{{ forestArea.toLocaleString() }}</div>
                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">พื้นที่ป่าไม้ (ไร่)</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, nextTick } from 'vue'
  import { useAuthStore } from '../../stores/auth'
  import { useDarkModeStore } from '~/stores/darkMode'
  
  const authStore = useAuthStore()
  const isSidebarOpen = ref(false)
  const darkModeStore = useDarkModeStore()
  
     // Sample data structure
   const provinces = ref([
     {
       name: 'จังหวัดเพชรบุรี',
       amphoes: [
         {
           name: 'อ.เมืองเพชรบุรี',
           tambons: [
             {
               name: 'ตำบลท่าราบ',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 1250, percentage: 45.5, color: '#10B981', note: 'ส่วนใหญ่เป็นนาข้าว' },
                 { type: 'พื้นที่อยู่อาศัย', area: 680, percentage: 24.7, color: '#F59E0B', note: 'ชุมชนหนาแน่น' },
                 { type: 'พื้นที่ป่าไม้', area: 420, percentage: 15.3, color: '#059669', note: 'ป่าชุมชน' },
                 { type: 'พื้นที่อุตสาหกรรม', area: 180, percentage: 6.5, color: '#DC2626', note: 'โรงงานขนาดเล็ก' },
                 { type: 'พื้นที่น้ำ', area: 120, percentage: 4.4, color: '#3B82F6', note: 'คลองและบ่อน้ำ' },
                 { type: 'อื่นๆ', area: 100, percentage: 3.6, color: '#6B7280', note: 'ถนนและสาธารณูปโภค' }
               ]
             },
             {
               name: 'ตำบลคลองกระแชง',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 890, percentage: 38.2, color: '#10B981', note: 'สวนผลไม้และนาข้าว' },
                 { type: 'พื้นที่อยู่อาศัย', area: 780, percentage: 33.5, color: '#F59E0B', note: 'ย่านการค้า' },
                 { type: 'พื้นที่ป่าไม้', area: 320, percentage: 13.7, color: '#059669', note: 'ป่าชายเลน' },
                 { type: 'พื้นที่อุตสาหกรรม', area: 210, percentage: 9.0, color: '#DC2626', note: 'โรงงานแปรรูป' },
                 { type: 'พื้นที่น้ำ', area: 80, percentage: 3.4, color: '#3B82F6', note: 'แม่น้ำเพชรบุรี' },
                 { type: 'อื่นๆ', area: 50, percentage: 2.1, color: '#6B7280', note: 'สถานที่ราชการ' }
               ]
             },
             {
               name: 'ตำบลบางจาน',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 920, percentage: 52.3, color: '#10B981', note: 'นาข้าวและสวนมะพร้าว' },
                 { type: 'พื้นที่อยู่อาศัย', area: 380, percentage: 21.6, color: '#F59E0B', note: 'ชุมชนเกษตรกรรม' },
                 { type: 'พื้นที่ป่าไม้', area: 250, percentage: 14.2, color: '#059669', note: 'ป่าชุมชน' },
                 { type: 'พื้นที่น้ำ', area: 150, percentage: 8.5, color: '#3B82F6', note: 'คลองชลประทาน' },
                 { type: 'อื่นๆ', area: 60, percentage: 3.4, color: '#6B7280', note: 'ถนนและวัด' }
               ]
             },
             {
               name: 'ตำบลนาวุ้ง',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 1180, percentage: 58.1, color: '#10B981', note: 'นาข้าวและไร่อ้อย' },
                 { type: 'พื้นที่อยู่อาศัย', area: 320, percentage: 15.8, color: '#F59E0B', note: 'หมู่บ้านเกษตรกร' },
                 { type: 'พื้นที่ป่าไม้', area: 280, percentage: 13.8, color: '#059669', note: 'ป่าไผ่และไม้ยืนต้น' },
                 { type: 'พื้นที่น้ำ', area: 180, percentage: 8.9, color: '#3B82F6', note: 'บึงและคลอง' },
                 { type: 'อื่นๆ', area: 70, percentage: 3.4, color: '#6B7280', note: 'โรงเรียนและวัด' }
               ]
             },
             {
               name: 'ตำบลช่องสะแก',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 850, percentage: 46.7, color: '#10B981', note: 'นาข้าวและสวนผลไม้' },
                 { type: 'พื้นที่อยู่อาศัย', area: 420, percentage: 23.1, color: '#F59E0B', note: 'ชุมชนชนบท' },
                 { type: 'พื้นที่ป่าไม้', area: 310, percentage: 17.0, color: '#059669', note: 'ป่าโกงกาง' },
                 { type: 'พื้นที่น้ำ', area: 140, percentage: 7.7, color: '#3B82F6', note: 'คลองและลำรัง' },
                 { type: 'อื่นๆ', area: 100, percentage: 5.5, color: '#6B7280', note: 'ถนนและสถานที่ราชการ' }
               ]
             }
           ]
         },
         {
           name: 'อ.เขาย้อย',
           tambons: [
             {
               name: 'ตำบลเขาย้อย',
               landUse: [
                 { type: 'พื้นที่ป่าไม้', area: 1580, percentage: 52.1, color: '#059669', note: 'ป่าธรรมชาติ' },
                 { type: 'พื้นที่เกษตรกรรม', area: 890, percentage: 29.3, color: '#10B981', note: 'ไร่มันสำปะหลัง' },
                 { type: 'พื้นที่อยู่อาศัย', area: 320, percentage: 10.5, color: '#F59E0B', note: 'หมู่บ้านกระจาย' },
                 { type: 'พื้นที่น้ำ', area: 150, percentage: 4.9, color: '#3B82F6', note: 'ลำธาร' },
                 { type: 'พื้นที่ท่องเที่ยว', area: 80, percentage: 2.6, color: '#8B5CF6', note: 'ถ้ำและน้ำตก' },
                 { type: 'อื่นๆ', area: 20, percentage: 0.7, color: '#6B7280', note: 'ถนนเข้าป่า' }
               ]
             },
             {
               name: 'ตำบลสระพัง',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 1240, percentage: 62.0, color: '#10B981', note: 'ไร่มันสำปะหลังและข้าวโพด' },
                 { type: 'พื้นที่ป่าไม้', area: 420, percentage: 21.0, color: '#059669', note: 'ป่าไผ่' },
                 { type: 'พื้นที่อยู่อาศัย', area: 180, percentage: 9.0, color: '#F59E0B', note: 'หมู่บ้านเกษตรกรรม' },
                 { type: 'พื้นที่น้ำ', area: 120, percentage: 6.0, color: '#3B82F6', note: 'สระเก็บน้ำ' },
                 { type: 'อื่นๆ', area: 40, percentage: 2.0, color: '#6B7280', note: 'ถนนลูกรัง' }
               ]
             },
             {
               name: 'ตำบลบางเค็ม',
               landUse: [
                 { type: 'พื้นที่น้ำ', area: 680, percentage: 34.0, color: '#3B82F6', note: 'ชายฝั่งทะเลและคลอง' },
                 { type: 'พื้นที่เกษตรกรรม', area: 620, percentage: 31.0, color: '#10B981', note: 'นาเกลือและบ่อกุ้ง' },
                 { type: 'พื้นที่อยู่อาศัย', area: 380, percentage: 19.0, color: '#F59E0B', note: 'ชุมชนประมง' },
                 { type: 'พื้นที่ป่าไม้', area: 240, percentage: 12.0, color: '#059669', note: 'ป่าชายเลน' },
                 { type: 'อื่นๆ', area: 80, percentage: 4.0, color: '#6B7280', note: 'ท่าเรือและถนน' }
               ]
             }
           ]
         },
         {
           name: 'อ.หนองหญ้าปล้อง',
           tambons: [
             {
               name: 'ตำบลหนองหญ้าปล้อง',
               landUse: [
                 { type: 'พื้นที่ป่าไม้', area: 2100, percentage: 70.0, color: '#059669', note: 'ป่าเขาและป่าดิบ' },
                 { type: 'พื้นที่เกษตรกรรม', area: 450, percentage: 15.0, color: '#10B981', note: 'ไร่ข้าวโพดและมันสำปะหลัง' },
                 { type: 'พื้นที่อยู่อาศัย', area: 240, percentage: 8.0, color: '#F59E0B', note: 'หมู่บ้านในป่า' },
                 { type: 'พื้นที่น้ำ', area: 150, percentage: 5.0, color: '#3B82F6', note: 'ลำธารและน้ำตก' },
                 { type: 'อื่นๆ', area: 60, percentage: 2.0, color: '#6B7280', note: 'ถนนเข้าป่า' }
               ]
             },
             {
               name: 'ตำบลยางน้ำกลัดเหนือ',
               landUse: [
                 { type: 'พื้นที่ป่าไม้', area: 1680, percentage: 84.0, color: '#059669', note: 'ป่าดิบเขา' },
                 { type: 'พื้นที่เกษตรกรรม', area: 160, percentage: 8.0, color: '#10B981', note: 'ไร่หลังบ้าน' },
                 { type: 'พื้นที่อยู่อาศัย', area: 80, percentage: 4.0, color: '#F59E0B', note: 'หมู่บ้านเล็ก' },
                 { type: 'พื้นที่น้ำ', area: 60, percentage: 3.0, color: '#3B82F6', note: 'ลำธาร' },
                 { type: 'อื่นๆ', area: 20, percentage: 1.0, color: '#6B7280', note: 'ทางเดิน' }
               ]
             }
           ]
         },
         {
           name: 'อ.ชะอำ',
           tambons: [
             {
               name: 'ตำบลชะอำ',
               landUse: [
                 { type: 'พื้นที่อยู่อาศัย', area: 1200, percentage: 40.0, color: '#F59E0B', note: 'เมืองท่องเที่ยว' },
                 { type: 'พื้นที่ท่องเที่ยว', area: 750, percentage: 25.0, color: '#8B5CF6', note: 'โรงแรมและรีสอร์ท' },
                 { type: 'พื้นที่เกษตรกรรม', area: 450, percentage: 15.0, color: '#10B981', note: 'สวนมะพร้าว' },
                 { type: 'พื้นที่น้ำ', area: 360, percentage: 12.0, color: '#3B82F6', note: 'ชายหาดและทะเล' },
                 { type: 'อื่นๆ', area: 240, percentage: 8.0, color: '#6B7280', note: 'ถนนและสาธารณูปโภค' }
               ]
             },
             {
               name: 'ตำบลบางเก่า',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 980, percentage: 49.0, color: '#10B981', note: 'นาข้าวและสวนผลไม้' },
                 { type: 'พื้นที่อยู่อาศัย', area: 420, percentage: 21.0, color: '#F59E0B', note: 'ชุมชนเกษตรกรรม' },
                 { type: 'พื้นที่น้ำ', area: 300, percentage: 15.0, color: '#3B82F6', note: 'คลองและบึง' },
                 { type: 'พื้นที่ป่าไม้', area: 200, percentage: 10.0, color: '#059669', note: 'ป่าชุมชน' },
                 { type: 'อื่นๆ', area: 100, percentage: 5.0, color: '#6B7280', note: 'ถนนและวัด' }
               ]
             }
           ]
         },
         {
           name: 'อ.ท่ายาง',
           tambons: [
             {
               name: 'ตำบลท่ายาง',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 1350, percentage: 54.0, color: '#10B981', note: 'นาข้าวและไร่อ้อย' },
                 { type: 'พื้นที่อยู่อาศัย', area: 500, percentage: 20.0, color: '#F59E0B', note: 'ชุมชนตลาด' },
                 { type: 'พื้นที่อุตสาหกรรม', area: 300, percentage: 12.0, color: '#DC2626', note: 'โรงงานแปรรูปอาหาร' },
                 { type: 'พื้นที่น้ำ', area: 250, percentage: 10.0, color: '#3B82F6', note: 'แม่น้ำเพชรบุรี' },
                 { type: 'อื่นๆ', area: 100, percentage: 4.0, color: '#6B7280', note: 'ถนนและสถานที่ราชการ' }
               ]
             },
             {
               name: 'ตำบลท่าคอย',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 1180, percentage: 59.0, color: '#10B981', note: 'นาข้าวและสวนผลไม้' },
                 { type: 'พื้นที่อยู่อาศัย', area: 360, percentage: 18.0, color: '#F59E0B', note: 'ชุมชนริมน้ำ' },
                 { type: 'พื้นที่น้ำ', area: 280, percentage: 14.0, color: '#3B82F6', note: 'แม่น้ำและคลอง' },
                 { type: 'พื้นที่ป่าไม้', area: 120, percentage: 6.0, color: '#059669', note: 'ป่าริมน้ำ' },
                 { type: 'อื่นๆ', area: 60, percentage: 3.0, color: '#6B7280', note: 'วัดและโรงเรียน' }
               ]
             }
           ]
         },
         {
           name: 'อ.บ้านลาด',
           tambons: [
             {
               name: 'ตำบลบ้านลาด',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 1420, percentage: 71.0, color: '#10B981', note: 'นาข้าวและไร่มันสำปะหลัง' },
                 { type: 'พื้นที่อยู่อาศัย', area: 280, percentage: 14.0, color: '#F59E0B', note: 'หมู่บ้านเกษตรกรรม' },
                 { type: 'พื้นที่ป่าไม้', area: 180, percentage: 9.0, color: '#059669', note: 'ป่าไผ่' },
                 { type: 'พื้นที่น้ำ', area: 80, percentage: 4.0, color: '#3B82F6', note: 'คลองชลประทาน' },
                 { type: 'อื่นๆ', area: 40, percentage: 2.0, color: '#6B7280', note: 'ถนนและวัด' }
               ]
             },
             {
               name: 'ตำบลบ้านหาด',
               landUse: [
                 { type: 'พื้นที่เกษตรกรรม', area: 1150, percentage: 57.5, color: '#10B981', note: 'นาข้าวและสวนมะพร้าว' },
                 { type: 'พื้นที่อยู่อาศัย', area: 420, percentage: 21.0, color: '#F59E0B', note: 'ชุมชนริมแม่น้ำ' },
                 { type: 'พื้นที่น้ำ', area: 280, percentage: 14.0, color: '#3B82F6', note: 'แม่น้ำเพชรบุรี' },
                 { type: 'พื้นที่ป่าไม้', area: 120, percentage: 6.0, color: '#059669', note: 'ป่าชายฝั่ง' },
                 { type: 'อื่นๆ', area: 30, percentage: 1.5, color: '#6B7280', note: 'วัดและโรงเรียน' }
               ]
             }
           ]
         },
         {
           name: 'อ.บ้านแหลม',
           tambons: [
             {
               name: 'ตำบลบ้านแหลม',
               landUse: [
                 { type: 'พื้นที่น้ำ', area: 1200, percentage: 40.0, color: '#3B82F6', note: 'ทะเลและท่าเรือประมง' },
                 { type: 'พื้นที่เกษตรกรรม', area: 900, percentage: 30.0, color: '#10B981', note: 'นาเกลือและบ่อกุ้ง' },
                 { type: 'พื้นที่อยู่อาศัย', area: 540, percentage: 18.0, color: '#F59E0B', note: 'ชุมชนประมง' },
                 { type: 'พื้นที่ป่าไม้', area: 240, percentage: 8.0, color: '#059669', note: 'ป่าชายเลน' },
                 { type: 'อื่นๆ', area: 120, percentage: 4.0, color: '#6B7280', note: 'ท่าเรือและถนน' }
               ]
             },
             {
               name: 'ตำบลปากทะเล',
               landUse: [
                 { type: 'พื้นที่น้ำ', area: 1680, percentage: 56.0, color: '#3B82F6', note: 'ปากแม่น้ำและชายหาด' },
                 { type: 'พื้นที่ป่าไม้', area: 600, percentage: 20.0, color: '#059669', note: 'ป่าชายเลนและป่าพรุ' },
                 { type: 'พื้นที่เกษตรกรรม', area: 360, percentage: 12.0, color: '#10B981', note: 'นาเกลือ' },
                 { type: 'พื้นที่อยู่อาศัย', area: 240, percentage: 8.0, color: '#F59E0B', note: 'หมู่บ้านประมง' },
                 { type: 'อื่นๆ', area: 120, percentage: 4.0, color: '#6B7280', note: 'ศูนย์วิจัยและถนน' }
               ]
             }
           ]
         },
         {
           name: 'อ.แก่งกระจาน',
           tambons: [
             {
               name: 'ตำบลแก่งกระจาน',
               landUse: [
                 { type: 'พื้นที่ป่าไม้', area: 3200, percentage: 64.0, color: '#059669', note: 'อุทยานแห่งชาติ' },
                 { type: 'พื้นที่น้ำ', area: 800, percentage: 16.0, color: '#3B82F6', note: 'เขื่อนและอ่างเก็บน้ำ' },
                 { type: 'พื้นที่เกษตรกรรม', area: 600, percentage: 12.0, color: '#10B981', note: 'ไร่มันสำปะหลัง' },
                 { type: 'พื้นที่อยู่อาศัย', area: 280, percentage: 5.6, color: '#F59E0B', note: 'หมู่บ้านใกล้เขื่อน' },
                 { type: 'อื่นๆ', area: 120, percentage: 2.4, color: '#6B7280', note: 'ถนนและสถานีไฟฟ้า' }
               ]
             },
             {
               name: 'ตำบลสองพี่น้อง',
               landUse: [
                 { type: 'พื้นที่ป่าไม้', area: 2880, percentage: 72.0, color: '#059669', note: 'ป่าดิบเขาและป่าผลัด' },
                 { type: 'พื้นที่เกษตรกรรม', area: 640, percentage: 16.0, color: '#10B981', note: 'ไร่ข้าวโพดและมันสำปะหลัง' },
                 { type: 'พื้นที่อยู่อาศัย', area: 240, percentage: 6.0, color: '#F59E0B', note: 'หมู่บ้านในป่า' },
                 { type: 'พื้นที่น้ำ', area: 160, percentage: 4.0, color: '#3B82F6', note: 'ลำธารและน้ำตก' },
                 { type: 'อื่นๆ', area: 80, percentage: 2.0, color: '#6B7280', note: 'ถนนเข้าป่า' }
               ]
             }
           ]
         }
       ]
     }
   ])

  const selectedProvince = ref(provinces.value[0])
  const selectedAmphoe = ref(null as any)
  const selectedTambon = ref(null as any)
  const searchQuery = ref('')

  // Chart references
  const pieChart = ref(null)
  const barChart = ref(null)

  // Computed properties
  const availableAmphoes = computed(() => {
    return selectedProvince.value?.amphoes || []
  })

  const availableTambons = computed(() => {
    return selectedAmphoe.value?.tambons || []
  })

  const currentLandUseData = computed(() => {
    if (selectedTambon.value) {
      return selectedTambon.value.landUse || []
    } else if (selectedAmphoe.value) {
      // Aggregate data from all tambons in amphoe
      const allLandUse = selectedAmphoe.value.tambons?.flatMap((t: any) => t.landUse || []) || []
      return aggregateLandUseData(allLandUse)
    } else {
      // Aggregate data from all amphoes in province
      const allLandUse = selectedProvince.value.amphoes?.flatMap((a: any) => 
        a.tambons?.flatMap((t: any) => t.landUse || []) || []
      ) || []
      return aggregateLandUseData(allLandUse)
    }
  })

  const totalArea = computed(() => {
    return currentLandUseData.value.reduce((sum: number, item: any) => sum + item.area, 0)
  })

  const agriculturalArea = computed(() => {
    return currentLandUseData.value.find((item: any) => item.type === 'พื้นที่เกษตรกรรม')?.area || 0
  })

  const residentialArea = computed(() => {
    return currentLandUseData.value.find((item: any) => item.type === 'พื้นที่อยู่อาศัย')?.area || 0
  })

  const forestArea = computed(() => {
    return currentLandUseData.value.find((item: any) => item.type === 'พื้นที่ป่าไม้')?.area || 0
  })

  // Methods
  const onProvinceChange = () => {
    selectedAmphoe.value = null
    selectedTambon.value = null
    nextTick(() => {
      updateCharts()
    })
  }

  const onAmphoeChange = () => {
    selectedTambon.value = null
    nextTick(() => {
      updateCharts()
    })
  }

  const onTambonChange = () => {
    nextTick(() => {
      updateCharts()
    })
  }

  const aggregateLandUseData = (landUseArray: any[]) => {
    const aggregated: { [key: string]: any } = {}
    
    landUseArray.forEach(item => {
      if (aggregated[item.type]) {
        aggregated[item.type].area += item.area
      } else {
        aggregated[item.type] = { ...item }
      }
    })
    
    const result = Object.values(aggregated)
    const total = result.reduce((sum: number, item: any) => sum + item.area, 0)
    
    return result.map((item: any) => ({
      ...item,
      percentage: (item.area / total) * 100
    }))
  }

  const updateCharts = () => {
    drawPieChart()
    drawBarChart()
  }

  const drawPieChart = () => {
    const canvas = pieChart.value as HTMLCanvasElement | null
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const data = currentLandUseData.value
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    let currentAngle = 0
    data.forEach((item: any) => {
      const sliceAngle = (item.percentage / 100) * 2 * Math.PI
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = item.color
      ctx.fill()
      
      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)
      
      ctx.fillStyle = '#000'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`${item.percentage.toFixed(1)}%`, labelX, labelY)
      
      currentAngle += sliceAngle
    })
  }

  const drawBarChart = () => {
    const canvas = barChart.value as HTMLCanvasElement | null
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const data = currentLandUseData.value
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const maxArea = Math.max(...data.map((item: any) => item.area))
    const barWidth = chartWidth / data.length * 0.8
    const barSpacing = chartWidth / data.length * 0.2
    
    data.forEach((item: any, index: number) => {
      const barHeight = (item.area / maxArea) * chartHeight
      const x = padding + index * (barWidth + barSpacing)
      const y = canvas.height - padding - barHeight
      
      ctx.fillStyle = item.color
      ctx.fillRect(x, y, barWidth, barHeight)
      
      // Draw value label
      ctx.fillStyle = '#000'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(item.area.toLocaleString(), x + barWidth / 2, y - 5)
      
      // Draw category label
      ctx.save()
      ctx.translate(x + barWidth / 2, canvas.height - 10)
      ctx.rotate(-Math.PI / 4)
      ctx.textAlign = 'right'
      ctx.fillText(item.type, 0, 0)
      ctx.restore()
    })
  }

  onMounted(() => {
    darkModeStore.initializeDarkMode()
    nextTick(() => {
      updateCharts()
    })
  })
  </script> 