import { H3Event, getCookie } from 'h3'
import jwt from 'jsonwebtoken'
import { useRuntimeConfig } from '#imports'

export function getUserFromCookie(event: H3Event) {
  const token = getCookie(event, 'auth_token')
  if (!token) return null
  
  try {
    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.jwtSecret)
    return decoded
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}
 
