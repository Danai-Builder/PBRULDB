import { navigateTo } from '#app'
import { useAuthStore } from '../stores'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/area') {
    return
  }

  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated()

  if (!isAuthenticated && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }

  if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/dashboard')
  }
}) 