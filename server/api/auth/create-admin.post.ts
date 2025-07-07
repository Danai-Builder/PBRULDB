import { defineEventHandler, readBody } from 'h3'
import User from '~/server/models/User'
import bcrypt from 'bcryptjs'
import connectDB from '~/server/utils/mongodb'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    // Ensure MongoDB connection
    await connectDB()

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'Localdatabase@pbru.th' })
    if (existingAdmin) {
      return {
        message: 'Admin user already exists',
        user: {
          email: existingAdmin.email,
          role: existingAdmin.role
        },
        redirect: '/admin/dashboard'
      }
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash('123456789', 10)
    const adminUser = new User({
      name: 'Admin',
      email: 'Localdatabase@pbru.th',
      password: hashedPassword,
      role: 'admin'
    })

    await adminUser.save()

    // Generate JWT token for immediate login
    const config = useRuntimeConfig()
    const token = jwt.sign(
      { 
        userId: adminUser._id, 
        email: adminUser.email,
        role: adminUser.role 
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    )

    return {
      message: 'Admin user created successfully',
      token,
      user: {
        email: adminUser.email,
        role: adminUser.role
      },
      redirect: '/admin/dashboard'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
}) 