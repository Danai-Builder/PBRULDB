import { google } from 'googleapis'
import { Readable } from 'stream'
import formidable from 'formidable'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    // ตั้งค่า Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/drive.file']
    })

    const drive = google.drive({ version: 'v3', auth })

    // อ่านข้อมูลจาก form
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
    })

    const [fields, files] = await form.parse(event.node.req)
    
    if (!files.file || !files.file[0]) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    const file = files.file[0]
    const fileName = fields.fileName?.[0] || file.originalFilename || 'database-export'
    const description = fields.description?.[0] || 'Database export from PBRU Local Data'

    // สร้าง readable stream จากไฟล์
    const fileStream = require('fs').createReadStream(file.filepath)

    // อัปโหลดไฟล์ไปยัง Google Drive
    const response = await drive.files.create(
      {
        requestBody: {
          name: fileName,
          description: description,
          parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : undefined
        },
        media: {
          mimeType: file.mimetype || 'application/octet-stream',
          body: fileStream
        }
      }
    )

    // ทำให้ไฟล์สามารถเข้าถึงได้ (optional)
    if (process.env.GOOGLE_DRIVE_MAKE_PUBLIC === 'true' && response.data.id) {
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      })
    }

    return {
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      webViewLink: `https://drive.google.com/file/d/${response.data.id}/view`,
      message: 'ไฟล์ถูกอัปโหลดไปยัง Google Drive เรียบร้อยแล้ว'
    }

  } catch (error: any) {
    console.error('Google Drive upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `การอัปโหลดล้มเหลว: ${error?.message || 'Unknown error'}`
    })
  }
}) 