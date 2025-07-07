import { defineEventHandler, getRequestHeaders } from 'h3'
import jwt from 'jsonwebtoken'
import User from '~/server/models/User'
import connectDB from '~/server/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    // Ensure MongoDB connection
    await connectDB()
    // Get the authorization header
    const headers = getRequestHeaders(event)
    const authHeader = headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: 'กรุณาเข้าสู่ระบบก่อน'
      })
    }

    // Extract and verify the token
    const token = authHeader.split(' ')[1]
    const config = useRuntimeConfig()
    
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string, role: string }
      
      // Find the user and select only needed fields
      const userDoc = await User.findById(decoded.userId).select('name email role loginHistory')
      if (!userDoc) {
        throw createError({
          statusCode: 404,
          message: 'ไม่พบข้อมูลผู้ใช้'
        })
      }

      // Convert to plain object
      const user = userDoc.toObject()

      // Log admin access attempt
      console.log(`Admin access attempt - User: ${user.email}, Role: ${user.role}`)

      // Safely extract the last login timestamp as a plain string
      let lastLogin = null;
      if (Array.isArray(user.loginHistory) && user.loginHistory.length > 0) {
        const lastEntry = user.loginHistory[user.loginHistory.length - 1];
        // Defensive: ensure timestamp is a string or number
        lastLogin = lastEntry && lastEntry.timestamp
          ? new Date(lastEntry.timestamp).toISOString()
          : null;
      }

      // Return only necessary fields (no arrays or objects from Mongoose)
      return {
        role: user.role,
        isAdmin: user.role === 'admin',
        user: {
          name: user.name,
          email: user.email,
          role: user.role
        },
        lastLogin
      }
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError)
      throw createError({
        statusCode: 401,
        message: 'โทเค็นไม่ถูกต้องหรือหมดอายุ'
      })
    }
  } catch (error: any) {
    console.error('Role check error:', error)
    throw createError({
      statusCode: 500,
      message: 'เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์'
    })
  }
}) 