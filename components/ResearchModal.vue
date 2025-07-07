<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-lg relative">
      <button class="absolute top-2 right-2 text-gray-500" @click="$emit('close')">✕</button>
      <h2 class="text-xl font-bold mb-2">รายละเอียดงานวิจัยใน {{ areaName }}</h2>
      <div class="mb-3">
        <div>จำนวนโครงการ: <b>{{ research.projects.length }}</b></div>
        <div>บทความที่ตีพิมพ์: <b>{{ research.publications }}</b></div>
        <div>งานวิจัยที่กำลังดำเนินการ: <b>{{ research.ongoingStudies }}</b></div>
      </div>
      <div>
        <h3 class="font-semibold mb-1">โครงการล่าสุด:</h3>
        <ul>
          <li v-for="p in research.projects" :key="p.title" class="mb-2">
            <div class="font-medium">{{ p.title }}</div>
            <div class="text-xs text-gray-500">{{ p.researcher }} ({{ p.year }}) - {{ p.status }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ research: any, areaName: string }>()
</script>
