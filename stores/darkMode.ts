import { defineStore } from 'pinia'
import { ref, computed, watch, readonly } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

interface DarkModeState {
  mode: ThemeMode
  isDark: boolean
}

export const useDarkModeStore = defineStore('darkMode', () => {
  // State
  const mode = ref<ThemeMode>('auto')
  const systemPrefersDark = ref(false)
  
  // Computed
  const isDark = computed(() => {
    switch (mode.value) {
      case 'dark':
        return true
      case 'light':
        return false
      case 'auto':
        return systemPrefersDark.value
      default:
        return false
    }
  })

  // Actions
  const initializeDarkMode = () => {
    try {
      // Check if running in browser
      if (typeof window === 'undefined') return

      // Get saved preference
      const savedMode = localStorage.getItem('darkMode') as ThemeMode
      if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
        mode.value = savedMode
      }

      // Setup system preference detection
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        systemPrefersDark.value = mediaQuery.matches
        
        // Listen for system preference changes
        mediaQuery.addEventListener('change', (e) => {
          systemPrefersDark.value = e.matches
        })
      }

      // Apply theme immediately
      updateTheme()
    } catch (error) {
      console.warn('Failed to initialize dark mode:', error)
    }
  }

  const setMode = (newMode: ThemeMode) => {
    mode.value = newMode
    try {
      localStorage.setItem('darkMode', newMode)
    } catch (error) {
      console.warn('Failed to save dark mode preference:', error)
    }
  }

  const toggleDarkMode = () => {
    switch (mode.value) {
      case 'light':
        setMode('dark')
        break
      case 'dark':
        setMode('light')
        break
      case 'auto':
        // Toggle based on current system preference
        setMode(systemPrefersDark.value ? 'light' : 'dark')
        break
    }
  }

  const setLight = () => setMode('light')
  const setDark = () => setMode('dark')
  const setAuto = () => setMode('auto')

  const updateTheme = () => {
    try {
      if (typeof document === 'undefined') return

      const html = document.documentElement
      const isDarkTheme = isDark.value

      // Update class
      if (isDarkTheme) {
        html.classList.add('dark')
        html.classList.remove('light')
      } else {
        html.classList.add('light')
        html.classList.remove('dark')
      }

      // Update color-scheme meta tag
      const colorScheme = isDarkTheme ? 'dark' : 'light'
      html.style.colorScheme = colorScheme
      
      // Update meta theme-color for mobile browsers
      let metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.setAttribute('name', 'theme-color')
        document.head.appendChild(metaThemeColor)
      }
      
      // Set appropriate theme color
      const themeColor = isDarkTheme ? '#1f2937' : '#ffffff' // gray-800 : white
      metaThemeColor.setAttribute('content', themeColor)
      
    } catch (error) {
      console.warn('Failed to update theme:', error)
    }
  }

  // Watch for changes and update theme
  watch(isDark, updateTheme, { immediate: false })

  // Getters
  const isLight = computed(() => !isDark.value)
  const isAuto = computed(() => mode.value === 'auto')
  const currentTheme = computed(() => isDark.value ? 'dark' : 'light')
  
  return {
    // State
    mode: readonly(mode),
    isDark: readonly(isDark),
    isLight: readonly(isLight),
    isAuto: readonly(isAuto),
    currentTheme: readonly(currentTheme),
    systemPrefersDark: readonly(systemPrefersDark),
    
    // Actions
    initializeDarkMode,
    toggleDarkMode,
    setMode,
    setLight,
    setDark,
    setAuto,
    updateTheme
  }
}) 