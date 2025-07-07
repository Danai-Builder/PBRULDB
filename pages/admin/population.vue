<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <SidebarNavigation current-page="population" />
    
    <div class="flex-1 flex flex-col min-h-screen lg:ml-0 relative z-0">
      <Topbar>
        <template #title>ข้อมูลประชากร</template>
      </Topbar>

      <div class="flex flex-col items-center mt-8 px-4 w-full overflow-x-hidden">
        
        <!-- Search Box -->
        <div class="mb-6 w-full max-w-5xl px-2">
          <label for="population-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ค้นหาพื้นที่</label>
          <div class="relative">
            <input
              id="population-search"
              v-model="searchQuery"
              type="text"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="ค้นหาอำเภอ หรือตำบล..."
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Selection Controls -->
        <div class="mb-8 w-full max-w-5xl px-2">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">เลือกพื้นที่</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Province Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">จังหวัด</label>
                <select 
                  v-model="selectedProvince" 
                  @change="onProvinceChange"
                  class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="">เลือกจังหวัด</option>
                  <option v-for="province in provinces" :key="province.name" :value="province.name">
                    {{ province.name }}
                  </option>
                </select>
              </div>

              <!-- Amphoe Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">อำเภอ</label>
                <select 
                  v-model="selectedAmphoe" 
                  @change="onAmphoeChange"
                  :disabled="!selectedProvince"
                  class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
                >
                  <option value="">เลือกอำเภอ</option>
                  <option v-for="amphoe in availableAmphoes" :key="amphoe.name" :value="amphoe.name">
                    {{ amphoe.name }}
                  </option>
                </select>
              </div>

              <!-- Tambon Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ตำบล</label>
                <select 
                  v-model="selectedTambon" 
                  :disabled="!selectedAmphoe"
                  class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
                >
                  <option value="">เลือกตำบล</option>
                  <option v-for="tambon in availableTambons" :key="tambon.name" :value="tambon.name">
                    {{ tambon.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Current Selection Display -->
            <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                <span class="font-medium">พื้นที่ที่เลือก:</span>
                {{ currentSelectionText }}
              </p>
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="mb-8 w-full max-w-5xl px-2">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">ประชากรรวม</h3>
              <p class="text-2xl font-bold text-green-600">{{ totalPopulation.toLocaleString() }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">คน</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">ชาย</h3>
              <p class="text-2xl font-bold text-blue-600">{{ malePopulation.toLocaleString() }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">คน ({{ malePercentage }}%)</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-pink-500">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">หญิง</h3>
              <p class="text-2xl font-bold text-pink-600">{{ femalePopulation.toLocaleString() }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">คน ({{ femalePercentage }}%)</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">ครัวเรือน</h3>
              <p class="text-2xl font-bold text-purple-600">{{ totalHouseholds.toLocaleString() }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">หลังคาเรือน</p>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="mb-8 w-full max-w-5xl px-2">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Population by Age Group Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">ประชากรตามกลุ่มอายุ</h3>
              <div class="h-64">
                <canvas ref="ageChartCanvas"></canvas>
              </div>
            </div>

            <!-- Population by Gender Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">สัดส่วนประชากรตามเพศ</h3>
              <div class="h-64">
                <canvas ref="genderChartCanvas"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Population Table -->
        <div class="mb-8 w-full max-w-5xl px-2">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">รายละเอียดประชากร</h3>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {{ selectedTambon ? 'หมู่บ้าน' : selectedAmphoe ? 'ตำบล' : 'อำเภอ' }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ประชากรรวม</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ชาย</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">หญิง</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ครัวเรือน</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ความหนาแน่น</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="item in currentPopulationData" :key="item.name" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8">
                          <div class="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                               :style="{ backgroundColor: item.color }">
                            {{ item.name.charAt(item.name.length - 1) }}
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.name }}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.description }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ item.totalPopulation.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ item.malePopulation.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ item.femalePopulation.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ item.households.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ item.density }} คน/ตร.กม.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'

// Reactive data
const searchQuery = ref('')
const selectedProvince = ref('')
const selectedAmphoe = ref('')
const selectedTambon = ref('')

// Chart refs
const ageChartCanvas = ref<HTMLCanvasElement>()
const genderChartCanvas = ref<HTMLCanvasElement>()

// Sample data structure with complete Phetchaburi data
const provinces = ref([
  {
    name: 'จังหวัดเพชรบุรี',
    amphoes: [
      {
        name: 'อ.เมืองเพชรบุรี',
        totalPopulation: 158420,
        malePopulation: 77850,
        femalePopulation: 80570,
        households: 63368,
        density: 312.5,
        color: '#3B82F6',
        description: 'ศูนย์กลางจังหวัด',
        tambons: [
          { name: 'ตำบลท่าราบ', totalPopulation: 20452, malePopulation: 10126, femalePopulation: 10326, households: 8181, density: 850.2, color: '#10B981', description: 'ที่ตั้งศาลากลางจังหวัด' },
          { name: 'ตำบลคลองกระแชง', totalPopulation: 10459, malePopulation: 5189, femalePopulation: 5270, households: 4184, density: 720.8, color: '#F59E0B', description: 'ย่านการค้าใจกลางเมือง' },
          { name: 'ตำบลบางจาน', totalPopulation: 15680, malePopulation: 7745, femalePopulation: 7935, households: 6272, density: 425.3, color: '#EF4444', description: 'เกษตรกรรมริมแม่น้ำเพชรบุรี' },
          { name: 'ตำบลนาวุ้ง', totalPopulation: 12850, malePopulation: 6358, femalePopulation: 6492, households: 5140, density: 380.7, color: '#8B5CF6', description: 'พื้นที่นาข้าวและไร่อ้อย' },
          { name: 'ตำบลช่องสะแก', totalPopulation: 8950, malePopulation: 4425, femalePopulation: 4525, households: 3580, density: 295.4, color: '#06B6D4', description: 'ชุมชนและป่าโกงกาง' }
        ]
      },
      {
        name: 'อ.เขาย้อย',
        totalPopulation: 89750,
        malePopulation: 44320,
        femalePopulation: 45430,
        households: 35900,
        density: 185.2,
        color: '#10B981',
        description: 'อำเภอภูเขาและถ้ำ',
        tambons: [
          { name: 'ตำบลเขาย้อย', totalPopulation: 45680, malePopulation: 22540, femalePopulation: 23140, households: 18272, density: 220.5, color: '#059669', description: 'ป่าธรรมชาติและถ้ำ' },
          { name: 'ตำบลสระพัง', totalPopulation: 28450, malePopulation: 14025, femalePopulation: 14425, households: 11380, density: 165.8, color: '#0D9488', description: 'ไร่มันสำปะหลังและสวนผลไม้' },
          { name: 'ตำบลบางเค็ม', totalPopulation: 15620, malePopulation: 7755, femalePopulation: 7865, households: 6248, density: 125.7, color: '#0891B2', description: 'ชายฝั่งและนาเกลือ' }
        ]
      },
      {
        name: 'อ.หนองหญ้าปล้อง',
        totalPopulation: 28950,
        malePopulation: 14320,
        femalePopulation: 14630,
        households: 11580,
        density: 45.8,
        color: '#059669',
        description: 'อุทยานแห่งชาติแก่งกระจาน',
        tambons: [
          { name: 'ตำบลหนองหญ้าปล้อง', totalPopulation: 18650, malePopulation: 9225, femalePopulation: 9425, households: 7460, density: 52.3, color: '#047857', description: 'ป่าเขาและลำธาร' },
          { name: 'ตำบลยางน้ำกลัดเหนือ', totalPopulation: 10300, malePopulation: 5095, femalePopulation: 5205, households: 4120, density: 38.2, color: '#065F46', description: 'ป่าดิบเขาและน้ำตก' }
        ]
      },
      {
        name: 'อ.ชะอำ',
        totalPopulation: 125680,
        malePopulation: 61540,
        femalePopulation: 64140,
        households: 50272,
        density: 425.8,
        color: '#F59E0B',
        description: 'เมืองท่องเที่ยวชายทะเล',
        tambons: [
          { name: 'ตำบลชะอำ', totalPopulation: 85420, malePopulation: 41856, femalePopulation: 43564, households: 34168, density: 680.5, color: '#D97706', description: 'ศูนย์ท่องเที่ยวหาดชะอำ' },
          { name: 'ตำบลบางเก่า', totalPopulation: 40260, malePopulation: 19684, femalePopulation: 20576, households: 16104, density: 285.4, color: '#B45309', description: 'เกษตรกรรมและชุมชน' }
        ]
      },
      {
        name: 'อ.ท่ายาง',
        totalPopulation: 78950,
        malePopulation: 38760,
        femalePopulation: 40190,
        households: 31580,
        density: 285.7,
        color: '#EF4444',
        description: 'ชุมชนตลาดและโรงงาน',
        tambons: [
          { name: 'ตำบลท่ายาง', totalPopulation: 52680, malePopulation: 25814, femalePopulation: 26866, households: 21072, density: 420.8, color: '#DC2626', description: 'ตลาดและอุตสาหกรรม' },
          { name: 'ตำบลมะรุ่ม', totalPopulation: 26270, malePopulation: 12946, femalePopulation: 13324, households: 10508, density: 185.2, color: '#B91C1C', description: 'เกษตรกรรมและประมง' }
        ]
      },
      {
        name: 'อ.บ้านลาด',
        totalPopulation: 65420,
        malePopulation: 32150,
        femalePopulation: 33270,
        households: 26168,
        density: 195.8,
        color: '#8B5CF6',
        description: 'ชุมชนเกษตรกรรม',
        tambons: [
          { name: 'ตำบลบ้านลาด', totalPopulation: 35680, malePopulation: 17540, femalePopulation: 18140, households: 14272, density: 285.4, color: '#7C3AED', description: 'ศูนย์กลางอำเภอ' },
          { name: 'ตำบลหนองจอก', totalPopulation: 29740, malePopulation: 14610, femalePopulation: 15130, households: 11896, density: 165.2, color: '#6D28D9', description: 'เกษตรกรรมและปศุสัตว์' }
        ]
      },
      {
        name: 'อ.บ้านแหลม',
        totalPopulation: 48950,
        malePopulation: 24180,
        femalePopulation: 24770,
        households: 19580,
        density: 165.4,
        color: '#06B6D4',
        description: 'ชายฝั่งและประมง',
        tambons: [
          { name: 'ตำบลบ้านแหลม', totalPopulation: 28650, malePopulation: 14125, femalePopulation: 14525, households: 11460, density: 245.8, color: '#0891B2', description: 'ชุมชนประมงชายฝั่ง' },
          { name: 'ตำบลปากทะเล', totalPopulation: 20300, malePopulation: 10055, femalePopulation: 10245, households: 8120, density: 125.6, color: '#0E7490', description: 'ปากแม่น้ำและประมง' }
        ]
      },
      {
        name: 'อ.แก่งกระจาน',
        totalPopulation: 32850,
        malePopulation: 16280,
        femalePopulation: 16570,
        households: 13140,
        density: 18.5,
        color: '#84CC16',
        description: 'อุทยานแห่งชาติ',
        tambons: [
          { name: 'ตำบลแก่งกระจาน', totalPopulation: 18950, malePopulation: 9385, femalePopulation: 9565, households: 7580, density: 25.8, color: '#65A30D', description: 'ป่าใหญ่และน้ำตก' },
          { name: 'ตำบลห้วยแม่ไผ่', totalPopulation: 13900, malePopulation: 6895, femalePopulation: 7005, households: 5560, density: 15.2, color: '#4D7C0F', description: 'ป่าดิบและลำธาร' }
        ]
      }
    ]
  }
])

// Computed properties for dropdowns
const availableAmphoes = computed(() => {
  const province = provinces.value.find(p => p.name === selectedProvince.value)
  return province ? province.amphoes : []
})

const availableTambons = computed(() => {
  const amphoe = availableAmphoes.value.find(a => a.name === selectedAmphoe.value)
  return amphoe ? amphoe.tambons : []
})

// Current selection text
const currentSelectionText = computed(() => {
  if (selectedTambon.value) {
    return `${selectedTambon.value}, ${selectedAmphoe.value}, ${selectedProvince.value}`
  } else if (selectedAmphoe.value) {
    return `${selectedAmphoe.value}, ${selectedProvince.value}`
  } else if (selectedProvince.value) {
    return selectedProvince.value
  }
  return 'ยังไม่ได้เลือกพื้นที่'
})

// Current population data for display
const currentPopulationData = computed(() => {
  if (selectedTambon.value) {
    // Show villages in selected tambon (mock data)
    const tambon = availableTambons.value.find(t => t.name === selectedTambon.value)
    if (tambon) {
      // Generate mock village data
      const villages = []
      const villageCount = Math.floor(tambon.totalPopulation / 500) + 1
      for (let i = 1; i <= Math.min(villageCount, 12); i++) {
        const population = Math.floor(tambon.totalPopulation / villageCount * (0.8 + Math.random() * 0.4))
        villages.push({
          name: `หมู่ที่ ${i}`,
          totalPopulation: population,
          malePopulation: Math.floor(population * 0.49),
          femalePopulation: Math.floor(population * 0.51),
          households: Math.floor(population / 2.5),
          density: Math.floor(population / 2),
          color: `hsl(${i * 30}, 70%, 60%)`,
          description: `หมู่บ้านในเขต${tambon.name}`
        })
      }
      return villages
    }
    return []
  } else if (selectedAmphoe.value) {
    // Show tambons in selected amphoe
    return availableTambons.value
  } else if (selectedProvince.value) {
    // Show amphoes in selected province
    return availableAmphoes.value
  }
  // Show all provinces (or amphoes in Phetchaburi)
  return availableAmphoes.value
})

// Statistics computations
const totalPopulation = computed(() => {
  return currentPopulationData.value.reduce((sum: number, item: any) => sum + item.totalPopulation, 0)
})

const malePopulation = computed(() => {
  return currentPopulationData.value.reduce((sum: number, item: any) => sum + item.malePopulation, 0)
})

const femalePopulation = computed(() => {
  return currentPopulationData.value.reduce((sum: number, item: any) => sum + item.femalePopulation, 0)
})

const totalHouseholds = computed(() => {
  return currentPopulationData.value.reduce((sum: number, item: any) => sum + item.households, 0)
})

const malePercentage = computed(() => {
  return totalPopulation.value > 0 ? Math.round((malePopulation.value / totalPopulation.value) * 100) : 0
})

const femalePercentage = computed(() => {
  return totalPopulation.value > 0 ? Math.round((femalePopulation.value / totalPopulation.value) * 100) : 0
})

// Event handlers
const onProvinceChange = () => {
  selectedAmphoe.value = ''
  selectedTambon.value = ''
}

const onAmphoeChange = () => {
  selectedTambon.value = ''
}

// Chart functions (mock implementation)
const createCharts = async () => {
  await nextTick()
  
  // Age group chart (mock data)
  if (ageChartCanvas.value) {
    const ctx = ageChartCanvas.value.getContext('2d')
    if (ctx) {
      // Simple bar chart representation
      ctx.clearRect(0, 0, ageChartCanvas.value.width, ageChartCanvas.value.height)
      ctx.fillStyle = '#3B82F6'
      ctx.fillRect(50, 150, 40, 100)
      ctx.fillStyle = '#10B981'
      ctx.fillRect(110, 120, 40, 130)
      ctx.fillStyle = '#F59E0B'
      ctx.fillRect(170, 100, 40, 150)
      ctx.fillStyle = '#EF4444'
      ctx.fillRect(230, 140, 40, 110)
      
      ctx.fillStyle = '#374151'
      ctx.font = '12px Arial'
      ctx.fillText('0-14', 55, 270)
      ctx.fillText('15-34', 110, 270)
      ctx.fillText('35-59', 170, 270)
      ctx.fillText('60+', 235, 270)
    }
  }
  
  // Gender chart (mock pie chart)
  if (genderChartCanvas.value) {
    const ctx = genderChartCanvas.value.getContext('2d')
    if (ctx) {
      const centerX = genderChartCanvas.value.width / 2
      const centerY = genderChartCanvas.value.height / 2
      const radius = 80
      
      ctx.clearRect(0, 0, genderChartCanvas.value.width, genderChartCanvas.value.height)
      
      // Male (blue)
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 0.98)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = '#3B82F6'
      ctx.fill()
      
      // Female (pink)
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, Math.PI * 0.98, Math.PI * 2)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = '#EC4899'
      ctx.fill()
    }
  }
}

// Initialize
onMounted(() => {
  selectedProvince.value = 'จังหวัดเพชรบุรี'
  createCharts()
})

// Watch for data changes to update charts
watch([selectedProvince, selectedAmphoe, selectedTambon], () => {
  createCharts()
})
</script>