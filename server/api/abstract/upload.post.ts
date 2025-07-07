import { google } from 'googleapis'
import formidable from 'formidable'
import fs from 'fs'

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
      allowEmptyFiles: false,
    })

    const [fields, files] = await form.parse(event.node.req)
    
    if (!files.file || !files.file[0]) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ไม่พบไฟล์ที่อัปโหลด'
      })
    }

    const file = files.file[0]
    const title = fields.title?.[0] || 'ไม่ระบุชื่อเรื่อง'
    const category = fields.category?.[0] || 'ไม่ระบุหมวดหมู่'
    const author = fields.author?.[0] || 'ไม่ระบุผู้แต่ง'
    const year = fields.year?.[0] || new Date().getFullYear().toString()
    const abstract = fields.abstract?.[0] || ''

    // สร้างชื่อไฟล์ที่มี metadata
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
    const sanitizedTitle = title.replace(/[^a-zA-Zก-๙0-9\s]/g, '').substring(0, 50)
    const fileName = `${timestamp}_${sanitizedTitle}_${author}.${file.originalFilename?.split('.').pop() || 'pdf'}`

    // สร้าง description ที่มีข้อมูลครบถ้วน
    const description = `งานวิจัย Abstract
ชื่อเรื่อง: ${title}
หมวดหมู่: ${category}
ผู้วิจัย: ${author}
ปี: ${year}
บทคัดย่อ: ${abstract.substring(0, 200)}${abstract.length > 200 ? '...' : ''}
อัปโหลดเมื่อ: ${new Date().toLocaleString('th-TH')}`

    // ตรวจสอบประเภทไฟล์
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.mimetype || '')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ประเภทไฟล์ไม่รองรับ กรุณาอัปโหลดไฟล์ PDF, DOC หรือ DOCX เท่านั้น'
      })
    }

    // สร้าง readable stream จากไฟล์
    const fileStream = fs.createReadStream(file.filepath)

    // อัปโหลดไฟล์ไปยัง Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        description: description,
        parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : undefined,
        // เพิ่ม properties สำหรับ metadata
        properties: {
          type: 'abstract',
          title: title,
          category: category,
          author: author,
          year: year,
          uploadDate: new Date().toISOString()
        }
      },
      media: {
        mimeType: file.mimetype || 'application/pdf',
        body: fileStream
      }
    })

    // ตั้งค่าสิทธิ์การเข้าถึงไฟล์
    if (response.data.id) {
      // ให้สิทธิ์ reader สำหรับทุกคน (หากต้องการ)
      if (process.env.GOOGLE_DRIVE_MAKE_PUBLIC === 'true') {
        await drive.permissions.create({
          fileId: response.data.id,
          requestBody: {
            role: 'reader',
            type: 'anyone'
          }
        })
      }

      // สร้าง direct download link
      const directDownloadLink = `https://drive.google.com/uc?export=download&id=${response.data.id}`
      const webViewLink = `https://drive.google.com/file/d/${response.data.id}/view`

      return {
        success: true,
        data: {
          fileId: response.data.id,
          fileName: fileName,
          originalFileName: file.originalFilename,
          title: title,
          category: category,
          author: author,
          year: parseInt(year),
          abstract: abstract,
          fileSize: file.size,
          mimeType: file.mimetype,
          webViewLink: webViewLink,
          directDownloadLink: directDownloadLink,
          uploadDate: new Date().toISOString()
        },
        message: `อัปโหลดงานวิจัย "${title}" เรียบร้อยแล้ว`
      }
    } else {
      throw new Error('ไม่สามารถรับ file ID จาก Google Drive ได้')
    }

  } catch (error: any) {
    console.error('Abstract upload error:', error)
    
    // ลบไฟล์ชั่วคราวหากมี error
    const form = formidable()
    try {
      const [, files] = await form.parse(event.node.req)
      if (files.file?.[0]?.filepath) {
        fs.unlinkSync(files.file[0].filepath)
      }
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError)
    }

    throw createError({
      statusCode: 500,
      statusMessage: `การอัปโหลดล้มเหลว: ${error?.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'}`
    })
  }
}) 