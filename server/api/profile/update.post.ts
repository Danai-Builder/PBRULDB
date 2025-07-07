import { defineEventHandler, readBody, getRequestHeader } from 'h3'
import User from '~/server/models/User'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'

interface IUser {
  _id: string
  name: string
  email: string
  role: string
  position?: string
  department?: string
  education?: string
  researchWorks?: string
}

interface CustomJwtPayload extends JwtPayload {
  userId: string
}

export default defineEventHandler(async (event) => {
  try {
    // ตรวจสอบ token
    const token = getRequestHeader(event, 'Authorization')?.replace('Bearer ', '')
    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'ไม่พบ token'
      })
    }

    // ตรวจสอบความถูกต้องของ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as CustomJwtPayload
    if (!decoded || !decoded.userId) {
      throw createError({
        statusCode: 401,
        message: 'token ไม่ถูกต้อง'
      })
    }

    // อ่านข้อมูลที่ส่งมา
    const body = await readBody(event)
    const { name, email, position, department, education, researchWorks } = body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !email) {
      throw createError({
        statusCode: 400,
        message: 'กรุณากรอกชื่อและอีเมล'
      })
    }

    // อัปเดตข้อมูลในฐานข้อมูล
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      {
        name,
        email,
        position,
        department,
        education,
        researchWorks
      },
      { new: true }
    ) as IUser

    if (!updatedUser) {
      throw createError({
        statusCode: 404,
        message: 'ไม่พบผู้ใช้'
      })
    }

    // ส่งข้อมูลกลับ
    return {
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        position: updatedUser.position,
        department: updatedUser.department,
        education: updatedUser.education,
        researchWorks: updatedUser.researchWorks
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล'
    })
  }
}) 