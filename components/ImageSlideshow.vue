<template>
  <div class="slideshow-container relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
    <div 
      class="slideshow-wrapper flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="slide flex-shrink-0 w-full h-full"
      >
        <img 
          :src="image.src" 
          :alt="image.alt"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
    </div>
    
    <!-- Navigation dots -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in images"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-colors duration-300"
        :class="index === currentIndex ? 'bg-white' : 'bg-white/50'"
      />
    </div>
    
    <!-- Navigation arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface SlideImage {
  src: string
  alt: string
}

const images: SlideImage[] = [
  {
    src: '/images/expo.jpg',
    alt: 'PBRU Exhibition'
  },
  {
    src: '/images/pm.jpg',
    alt: 'PM 2.5 Monitoring System'
  },
  {
    src: '/images/robot.jpg',
    alt: 'PBRU Robot Research'
  }
]

const currentIndex = ref(0)
let slideInterval: NodeJS.Timeout | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? images.length - 1 : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
  resetInterval()
}

const startSlideshow = () => {
  slideInterval = setInterval(nextSlide, 5000) // 5 seconds
}

const resetInterval = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  startSlideshow()
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  console.warn(`Failed to load image: ${target.src}`)
  // You can set a fallback image here if needed
  // target.src = '/images/fallback.jpg'
}

onMounted(() => {
  startSlideshow()
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})
</script>

<style scoped>
.slideshow-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.slide {
  background-color: #f3f4f6;
}

.slide img {
  transition: transform 0.3s ease;
}

.slide:hover img {
  transform: scale(1.05);
}
</style> 