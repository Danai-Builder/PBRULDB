<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <SidebarNavigation current-page="Dashboard" />
    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <Topbar>
        <template #title>หน้าหลัก</template>
      </Topbar>
      <main class="flex-1 p-4 sm:p-6 lg:p-8 mt-0">
        <div class="container mx-auto px-4 py-8">
          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ areaSummary.districts }}</span>
              <span class="text-gray-700 dark:text-gray-300 mt-2">อำเภอ</span>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
              <span class="text-2xl font-bold text-green-600 dark:text-green-400">{{ areaSummary.subdistricts }}</span>
              <span class="text-gray-700 dark:text-gray-300 mt-2">ตำบล</span>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
              <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ areaSummary.population.toLocaleString() }}</span>
              <span class="text-gray-700 dark:text-gray-300 mt-2">ประชากรรวม</span>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
              <span class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ areaSummary.area.toFixed(1) }}</span>
              <span class="text-gray-700 dark:text-gray-300 mt-2">พื้นที่ (ตร.กม.)</span>
            </div>
          </div>

          <!-- Research Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ researchSummary.total }}</span>
              <span class="text-gray-700 dark:text-gray-300 mt-2">งานวิจัยทั้งหมด</span>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
              <span class="text-2xl font-bold text-green-600 dark:text-green-400">{{ researchSummary.basic }}</span>
              <span class="text-gray-700 dark:text-gray-300 mt-2">วิจัยพื้นฐาน</span>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
              <span class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ researchSummary.applied }}</span>
              <span class="text-gray-700 dark:text-gray-300 mt-2">วิจัยประยุกต์</span>
            </div>
          </div>

          <!-- Research Category Chart -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">สัดส่วนงานวิจัยแต่ละหมวดหมู่</h3>
            <div class="h-96">
              <DoughnutChart :data="researchCategoryChartData" :options="chartOptions" />
            </div>
          </div>

          <!-- Recent Abstracts -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">รายการที่อัปโหลดล่าสุด</h3>
              <NuxtLink to="/admin/abstract" class="text-sm text-blue-600 hover:underline">
                ดูทั้งหมด
              </NuxtLink>
            </div>
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="abstract in recentAbstracts" :key="abstract.id" class="py-3 px-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer" @click="viewAbstract(abstract)">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ abstract.title }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ abstract.author }}</p>
                  </div>
                  <div class="text-right ml-4">
                    <p class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ formatDate(abstract.uploadDate) }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Button to Area Page -->
          <div class="flex justify-end">
            <NuxtLink to="/admin/area">
              <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                ดูข้อมูลพื้นที่
              </button>
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { Doughnut as DoughnutChart } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { useRouter } from 'vue-router';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const authStore = useAuthStore();
const router = useRouter();

const areaSummary = ref({
  districts: 8,
  subdistricts: 75,
  population: 474192,
  area: 2500.5
});

const researchSummary = ref({
  total: 120,
  basic: 70,
  applied: 50
});

// Mock data for recent abstracts
const recentAbstracts = ref([
  {
    id: 1,
    title: 'การพัฒนาระบบจัดการข้อมูลนักศึกษาด้วยเทคโนโลยี AI',
    author: 'ดร.สมชาย วิทยากร',
    uploadDate: new Date('2024-07-21'),
  },
  {
    id: 2,
    title: 'ผลกระทบของการเปลี่ยนแปลงสภาพภูมิอากาศต่อการเกษตร',
    author: 'ผศ.ดร.วิรัตน์ สิ่งแวดล้อม',
    uploadDate: new Date('2024-07-20'),
  },
  {
    id: 3,
    title: 'การยกระดับคุณภาพการศึกษาด้วยการจัดการเรียนรู้',
    author: 'อาจารย์สุมาลี การศึกษา',
    uploadDate: new Date('2024-07-19'),
  },
]);

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const viewAbstract = (abstract: { title: string; }) => {
  router.push({ path: '/admin/abstract', query: { search: abstract.title } });
};

const researchCategoryChartData = computed<ChartData<'doughnut'>>(() => ({
  labels: ['วิจัยพื้นฐาน', 'วิจัยประยุกต์'],
  datasets: [
    {
      data: [researchSummary.value.basic, researchSummary.value.applied],
      backgroundColor: ['#3B82F6', '#F59E0B'],
      borderWidth: 0
    }
  ]
}));

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#6B7280',
        font: { size: 12 }
      }
    }
  }
};

onMounted(async () => {
  try {
    if (!authStore.isAuthenticated) {
      navigateTo('/login');
      return;
    }
  } catch (error) {
    console.error('Error loading dashboard:', error);
    navigateTo('/login');
  }
});
</script>