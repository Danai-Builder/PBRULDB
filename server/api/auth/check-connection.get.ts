import { defineEventHandler } from 'h3'
import { defineMongooseModel } from '#nuxt/mongoose'

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