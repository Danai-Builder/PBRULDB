import mongoose from 'mongoose'
import type { ConnectOptions } from 'mongoose'
import { useRuntimeConfig } from '#imports'

let isConnected = false

export default async function connectDB() {
  try {
    if (isConnected) {
      console.log('MongoDB is already connected')
      return
    }

    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://test:QuZ2dTZ9ZSIvq7YH@pbru-research.wspcl21.mongodb.net/?retryWrites=true&w=majority&appName=PBRU-research'
    
    console.log('Attempting to connect to MongoDB...')
    
    await mongoose.connect(mongoUri as string, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    } as any)

    isConnected = true
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    isConnected = false
    throw new Error('ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้ กรุณาลองใหม่อีกครั้ง')
  }
}

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
  isConnected = false
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
  isConnected = false
})

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB connection closed through app termination')
    process.exit(0)
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err)
    process.exit(1)
  }
})