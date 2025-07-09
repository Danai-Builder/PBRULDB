import { defineEventHandler, readBody } from 'h3'
import User from '~/server/models/User'

interface RegisterBody {
  name: string
  email: string
  password: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RegisterBody>(event)
    const { name, email, password } = body

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Name, email and password are required'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already registered'
      })
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    })

    await user.save()

    return {
      message: 'User registered successfully',
      user: {
        name: user.name,
        email: user.email
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
}) 