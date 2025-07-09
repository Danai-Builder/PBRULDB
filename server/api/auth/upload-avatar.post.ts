import { defineEventHandler, readMultipartFormData } from 'h3'
import User from '~/server/models/User'
import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const file = form?.find(f => f.name === 'avatar')
  const userId = form?.find(f => f.name === 'userId')?.data?.toString()

  if (!file || !userId) throw createError({ statusCode: 400, message: 'Missing file or userId' })

  const uploadDir = path.resolve('public/uploads')
  await fs.mkdir(uploadDir, { recursive: true })
  const filename = `${userId}_${Date.now()}.jpg`
  const filepath = path.join(uploadDir, filename)
  await fs.writeFile(filepath, file.data)

  // อัปเดต avatar ใน user
  const avatarUrl = `/uploads/${filename}`
  await User.findByIdAndUpdate(userId, { avatar: avatarUrl })

  return { avatar: avatarUrl }
})
