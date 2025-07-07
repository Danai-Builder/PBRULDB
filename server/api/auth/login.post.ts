import { defineEventHandler, readBody, getRequestHeaders } from 'h3'
import jwt from 'jsonwebtoken'
import User from '~/server/models/User'
import connectDB from '~/server/utils/mongodb'

interface LoginBody {
  email: string
  password: string
}

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const body = await readBody<LoginBody>(event)
    const { email, password } = body

    console.log('Login attempt for email:', email)

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      })
    }

    // Get request information for login history
    const headers = getRequestHeaders(event)
    const ip = headers['x-forwarded-for'] || headers['x-real-ip'] || 'unknown'
    const userAgent = headers['user-agent'] || 'unknown'

    // Find user by email
    const user = await User.findOne({ email })
    console.log('User found:', user ? 'Yes' : 'No')
    
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    console.log('User role:', user.role)

    // Compare password
    const isMatch = await user.comparePassword(password)
    console.log('Password match:', isMatch)

    if (!isMatch) {
      // Record failed login attempt
      user.loginHistory.push({
        ip,
        userAgent,
        success: false,
        timestamp: new Date()
      })
      await user.save()

      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    // Record successful login
    user.loginHistory.push({
      ip,
      userAgent,
      success: true,
      timestamp: new Date()
    })
    await user.save()

    // Generate JWT token
    const config = useRuntimeConfig()
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role 
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    )

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      redirect: user.role === 'admin' ? '/admin/dashboard' : '/dashboard'
    }
  } catch (error: any) {
    console.error('Login error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
}) 