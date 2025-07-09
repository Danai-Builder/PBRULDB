import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    return { status: 'connected' }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้'
    })
  }
}) 