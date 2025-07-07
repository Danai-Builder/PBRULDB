import { defineEventHandler } from 'h3'
import User from '~/server/models/User'
import bcrypt from 'bcryptjs'
import connectDB from '~/server/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Delete existing admin if exists
    await User.deleteOne({ email: 'Localdatabase@pbru.th' })

    // Create new admin
    const hashedPassword = await bcrypt.hash('123456789', 10)
    const adminUser = new User({
      name: 'Admin',
      email: 'Localdatabase@pbru.th',
      password: hashedPassword,
      role: 'admin'
    })

    await adminUser.save()

    return {
      success: true,
      message: 'Admin account initialized successfully',
      email: 'Localdatabase@pbru.th',
      password: '123456789'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to initialize admin account'
    })
  }
}) 