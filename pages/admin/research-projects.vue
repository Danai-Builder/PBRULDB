<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <SidebarNavigation current-page="research-projects" />
    <div class="flex-1 flex flex-col min-h-screen">
      <Topbar>
        <template #title>โครงการวิจัย</template>
      </Topbar>

      <!-- Main Content -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 mt-2 lg:mt-0">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">โครงการวิจัย</h1>

        <!-- Add New Project Button -->
        <button
          @click="showAddModal = true"
          class="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          เพิ่มโครงการวิจัย
        </button>

        <!-- Projects Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">รหัสโครงการ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ชื่อโครงการ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">หัวหน้าโครงการ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">งบประมาณ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">สถานะ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">จัดการ</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="project in projects" :key="project.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{{ project.code }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{{ project.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{{ project.leader }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{{ project.budget }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]">
                    {{ project.status === 'active' ? 'ดำเนินการ' : 'เสร็จสิ้น' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <button @click="editProject(project)" class="text-blue-600 hover:text-blue-900 mr-3">แก้ไข</button>
                  <button @click="deleteProject(project.id)" class="text-red-600 hover:text-red-900">ลบ</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <!-- Add/Edit Project Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {{ editingProject ? 'แก้ไขโครงการวิจัย' : 'เพิ่มโครงการวิจัย' }}
          </h3>
          <form @submit.prevent="saveProject" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">รหัสโครงการ</label>
              <input v-model="projectForm.code" type="text" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ชื่อโครงการ</label>
              <input v-model="projectForm.name" type="text" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">หัวหน้าโครงการ</label>
              <input v-model="projectForm.leader" type="text" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">งบประมาณ</label>
              <input v-model="projectForm.budget" type="number" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">สถานะ</label>
              <select v-model="projectForm.status" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="active">ดำเนินการ</option>
                <option value="completed">เสร็จสิ้น</option>
              </select>
            </div>
            <div class="flex justify-end space-x-3">
              <button type="button" @click="showAddModal = false"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200">
                ยกเลิก
              </button>
              <button type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  id: string
  code: string
  name: string
  leader: string
  budget: number
  status: 'active' | 'completed'
}

const projects = ref<Project[]>([])
const showAddModal = ref(false)
const editingProject = ref<Project | null>(null)

const projectForm = ref<Omit<Project, 'id'>>({
  code: '',
  name: '',
  leader: '',
  budget: 0,
  status: 'active'
})

const editProject = (project: Project) => {
  editingProject.value = project
  projectForm.value = { ...project }
  showAddModal.value = true
}

const saveProject = async () => {
  try {
    if (editingProject.value) {
      // Update existing project
      const index = projects.value.findIndex(p => p.id === editingProject.value?.id)
      if (index !== -1) {
        projects.value[index] = { ...editingProject.value, ...projectForm.value }
      }
    } else {
      // Add new project
      const newProject: Project = {
        id: Date.now().toString(), // Temporary ID generation
        ...projectForm.value
      }
      projects.value.push(newProject)
    }
    showAddModal.value = false
    resetForm()
  } catch (error) {
    console.error('Error saving project:', error)
  }
}

const deleteProject = async (id: string) => {
  if (confirm('คุณต้องการลบโครงการวิจัยนี้ใช่หรือไม่?')) {
    projects.value = projects.value.filter(p => p.id !== id)
  }
}

const resetForm = () => {
  projectForm.value = {
    code: '',
    name: '',
    leader: '',
    budget: 0,
    status: 'active'
  }
  editingProject.value = null
}
</script> 