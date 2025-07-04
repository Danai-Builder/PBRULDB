# การสร้าง APK สำหรับ PBRU LDB

## ความต้องการเบื้องต้น

1. **Node.js** (v18 หรือสูงกว่า)
2. **Android Studio** (สำหรับ build APK)
3. **Java JDK** (v11 หรือสูงกว่า)
4. **Android SDK** (API Level 21 หรือสูงกว่า)

## วิธีการติดตั้งและสร้าง APK

### 🚀 วิธีรวดเร็ว (One-Click Build)

```bash
# รัน script อัตโนมัติ (Windows)
build-apk.cmd

# หรือแยกเป็นขั้นตอน
npm run build:apk
```

### 📋 วิธีแบบละเอียด

### ขั้นตอนที่ 1: ติดตั้ง Dependencies

```bash
npm install
```

### ขั้นตอนที่ 2: เตรียม Capacitor Project

```bash
# สร้าง Capacitor project (ครั้งแรกเท่านั้น)
npm run mobile:init

# เพิ่ม Android platform (ครั้งแรกเท่านั้น)
npm run mobile:add-android
```

### ขั้นตอนที่ 3: Build Web App และ Sync กับ Android

```bash
# วิธีที่ 1: ใช้ simplified build (แนะนำ)
npm run mobile:build

# วิธีที่ 2: ใช้ full Nuxt build (หากไม่มีปัญหา SSR)
npm run mobile:build-full
```

### ขั้นตอนที่ 4: เปิด Android Studio และ Build APK

```bash
# เปิด Android Studio
npm run mobile:open
```

หรือ

```bash
# Build และเปิด Android Studio ในคำสั่งเดียว
npm run build:apk
```

### ขั้นตอนที่ 5: Build APK ใน Android Studio

1. เมื่อ Android Studio เปิดขึ้น ให้เลือก **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. รอให้ build เสร็จ
3. APK จะอยู่ในโฟลเดอร์ `android/app/build/outputs/apk/debug/`

## คำสั่งอื่นๆ ที่มีประโยชน์

```bash
# รัน app บน Android device/emulator
npm run mobile:run

# Sync เฉพาะ (หลังจากแก้ไข web code)
npx cap sync

# ดู log จาก device
npx cap run android --target <device-id>
```

## การตั้งค่าเพิ่มเติม

### เปลี่ยน App Icon
1. แทนที่ไฟล์ในโฟลเดอร์ `android/app/src/main/res/mipmap-*/`
2. หรือใช้ Image Asset Studio ใน Android Studio

### เปลี่ยน App Name
แก้ไขไฟล์ `android/app/src/main/res/values/strings.xml`

### เปลี่ยน Package Name
แก้ไขไฟล์ `capacitor.config.ts` และ rebuild project

## การ Debug

### ดู Logs
```bash
npx cap run android --livereload --external
```

### Inspect Element (Chrome DevTools)
1. เปิด Chrome
2. ไปที่ `chrome://inspect`
3. เลือก device ที่เชื่อมต่อ

## Build สำหรับ Production

### สร้าง Signed APK
1. ใน Android Studio: **Build > Generate Signed Bundle / APK**
2. เลือก APK
3. สร้าง keystore ใหม่หรือใช้ที่มีอยู่
4. ทำตาม wizard เพื่อสร้าง signed APK

### ปรับแต่งสำหรับ Production
```bash
# Build สำหรับ production
NUXT_SSR=false npm run build
npm run mobile:build
```

## การแก้ปัญหา

### ปัญหาที่พบบ่อย

1. **Gradle Build Failed**
   - ตรวจสอบ Java JDK version
   - ลบโฟลเดอร์ `android/.gradle` และ build ใหม่

2. **Capacitor Plugin Error**
   ```bash
   npx cap doctor
   ```

3. **Permission Denied**
   - ตรวจสอบ permissions ในไฟล์ `android/app/src/main/AndroidManifest.xml`

4. **Network Request Failed**
   - ตรวจสอบ network security config
   - เพิ่ม `android:usesCleartextTraffic="true"` ใน AndroidManifest.xml (สำหรับ development)

## ข้อมูลเพิ่มเติม

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [Nuxt.js Mobile Guide](https://nuxt.com/docs/guide/deploy/static-hosting) 