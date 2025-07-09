import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  position?: string
  department?: string
  education?: string
  researchWorks?: string
}

interface LoginResponse {
  token: string
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  

  // โหลดข้อมูลจาก localStorage เมื่อเริ่มต้น
  if (import.meta.client) {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken) {
      token.value = savedToken
    }
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // ตรวจสอบว่าเป็น POJO
        if (parsedUser && typeof parsedUser === 'object') {
          user.value = parsedUser
          if (user.value) {
            localStorage.setItem('userName', user.value.name)
            localStorage.setItem('userRole', user.value.role)
          }
        }
      } catch (e) {
        console.error('Error parsing saved user:', e)
        user.value = null
      }
    }
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    if (import.meta.client) {
      localStorage.setItem('token', newToken)
    }
  }

  const setUser = (userData: User) => {
    // สร้าง POJO จาก userData
    const plainUser = {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      role: userData.role,
      position: userData.position,
      department: userData.department,
      education: userData.education,
      researchWorks: userData.researchWorks
    }
    
    user.value = plainUser
    if (import.meta.client) {
      localStorage.setItem('user', JSON.stringify(plainUser))
      localStorage.setItem('userName', plainUser.name)
      localStorage.setItem('userRole', plainUser.role)
    }
  }

  const updateProfile = async (profileData: Partial<User>): Promise<void> => {
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(profileData)
      })

      if (!response.ok) {
        let errorMessage = 'Failed to update profile'
        try {
          const error = await response.json()
          errorMessage = error.message || errorMessage
        } catch (parseError) {
          // If response is not JSON (e.g., HTML error page)
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setUser(data.user)
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  const validateToken = (token: string): boolean => {
    if (!token) return false
    
    const parts = token.split('.')
    if (parts.length !== 3) return false
    
    try {
      const payload = JSON.parse(atob(parts[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp > currentTime
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        let errorMessage = 'Login failed'
        try {
          const error = await response.json()
          errorMessage = error.message || errorMessage
        } catch (parseError) {
          // If response is not JSON (e.g., HTML error page)
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data: LoginResponse = await response.json()
      setToken(data.token)
      setUser(data.user)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userName')
      localStorage.removeItem('userRole')
    }
  }

  const isAuthenticated = (): boolean => {
    if (!token.value) return false
    return validateToken(token.value)
  }

  const authUser = computed(() => user.value)

  return {
    token,
    user,
    setToken,
    setUser,
    updateProfile,
    login,
    logout,
    isAuthenticated,
    authUser
  }
})