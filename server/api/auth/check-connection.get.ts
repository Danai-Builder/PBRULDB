import { defineEventHandler } from 'h3'
import connectDB from '~/server/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    return { status: 'connected' }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้'
    })
  }
}) 