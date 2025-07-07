import { defineEventHandler, readMultipartFormData, getRequestHeaders } from 'h3'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import User from '~/server/models/User'
import connectDB from '~/server/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Get the multipart form data
    const files = await readMultipartFormData(event)
    if (!files || files.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'ไม่พบไฟล์รูปภาพ'
      })
    }

    const file = files[0]
    const userId = files.find(f => f.name === 'userId')?.data.toString()

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'ไม่พบข้อมูลผู้ใช้'
      })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!file.type || !allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        message: 'รองรับเฉพาะไฟล์รูปภาพ (JPEG, PNG, GIF)'
      })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        message: 'ขนาดไฟล์ต้องไม่เกิน 5MB'
      })
    }

    // Generate unique filename
    if (!file.filename) {
      throw createError({
        statusCode: 400,
        message: 'ชื่อไฟล์ไม่ถูกต้อง'
      })
    }
    const fileExtension = file.filename.split('.').pop()
    const newFilename = `${uuidv4()}.${fileExtension}`

    // Save file to public directory
    const publicDir = join(process.cwd(), 'public', 'uploads', 'profile')
    const filePath = join(publicDir, newFilename)
    await writeFile(filePath, file.data)

    // Update user profile in database
    const user = await User.findById(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'ไม่พบข้อมูลผู้ใช้'
      })
    }

    // Update avatar URL
    const avatarUrl = `/uploads/profile/${newFilename}`
    user.avatar = avatarUrl
    await user.save()

    return {
      success: true,
      avatar: avatarUrl
    }
  } catch (error: any) {
    console.error('Profile image upload error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ'
    })
  }
}) 