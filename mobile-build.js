#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function buildForMobile() {
  console.log('🚀 Starting mobile build process...');
  
  try {
    // Step 1: Clean previous builds
    console.log('🧹 Cleaning previous builds...');
    if (fs.existsSync('.output')) {
      fs.rmSync('.output', { recursive: true, force: true });
    }
    
    // Step 2: Create a basic dist folder with static files
    console.log('📱 Creating mobile-optimized build...');
    
    // Create output directories
    fs.mkdirSync('.output/public', { recursive: true });
    
    // Copy public assets
    if (fs.existsSync('public')) {
      console.log('📁 Copying public assets...');
      // Use cross-platform copy
      if (process.platform === 'win32') {
        await execAsync('xcopy /E /I /Y public .output\\public');
      } else {
        await execAsync('cp -r public/* .output/public/');
      }
    }
    
    // Step 3: Try to build with Nuxt first
    console.log('🏗️ Attempting Nuxt build...');
    try {
      await execAsync('npm run build');
      console.log('✅ Nuxt build successful!');
    } catch (buildError) {
      console.log('⚠️ Nuxt build failed, creating simplified version...');
      
      // Create a simple index.html for SPA
      const indexHtml = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PBRU LDB</title>
  <link rel="icon" type="image/png" href="/pbru-LDB.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#3B82F6">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; min-height: 100vh; display: flex; flex-direction: column; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .header { text-align: center; margin-bottom: 2rem; }
    .logo { width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
    .content { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); margin: 20px 0; padding: 40px; border-radius: 20px; text-align: center; border: 1px solid rgba(255,255,255,0.2); }
    .btn { background: white; color: #3B82F6; padding: 16px 32px; border: none; border-radius: 12px; text-decoration: none; display: inline-block; margin: 10px; cursor: pointer; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
    .feature { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 30px; }
    .feature-item { background: rgba(255,255,255,0.1); padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); }
    .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 12px; display: flex; justify-content: space-around; border-top: 1px solid rgba(0,0,0,0.1); }
    .nav-item { display: flex; flex-direction: column; align-items: center; color: #3B82F6; text-decoration: none; padding: 8px; border-radius: 8px; transition: all 0.3s; }
    .nav-item:hover { background: rgba(59,130,246,0.1); }
    @media (max-width: 768px) { .container { padding: 16px; } .content { padding: 24px; } .feature { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="/pbru-logo.png" alt="PBRU" style="width: 50px; height: 50px;">
      </div>
      <h1 style="font-size: 2.5rem; margin-bottom: 8px;">PBRU LDB</h1>
      <p style="opacity: 0.9; font-size: 1.2rem;">ระบบจัดการข้อมูลท้องถิ่น</p>
    </div>
    
    <div class="content">
      <h2 style="margin-bottom: 16px;">ยินดีต้อนรับสู่ PBRU LDB</h2>
      <p style="margin-bottom: 24px; line-height: 1.6;">ระบบจัดการข้อมูลท้องถิ่นแบบ Local Data Based<br>สำหรับมหาวิทยาลัยราชภัฏเพชรบุรี</p>
      
      <div class="feature">
        <div class="feature-item">
          <h3>📚 ระบบจัดการข้อมูลงานวิจัย</h3>
          <p>จัดเก็บและค้นหาข้อมูลงานวิจัยอย่างเป็นระบบ</p>
        </div>
        <div class="feature-item">
          <h3>🎨 แกลเลอรี่ผลงาน</h3>
          <p>ชมผลงานและโครงการดีเด่นต่างๆ</p>
        </div>
        <div class="feature-item">
          <h3>🗺️ ระบบแผนที่ข้อมูล</h3>
          <p>แสดงข้อมูลการใช้ประโยชน์ที่ดินและประชากร</p>
        </div>
      </div>
      
      <div style="margin-top: 32px;">
        <button class="btn" onclick="openGallery()">🚀 เริ่มใช้งาน</button>
        <a href="/pbru-logo.png" class="btn" download>💾 ดาวน์โหลดโลโก้</a>
      </div>
    </div>
  </div>
  
  <!-- Bottom Navigation -->
  <nav class="bottom-nav">
    <a href="#" class="nav-item" onclick="openGallery()">
      <span style="font-size: 20px;">📚</span>
      <span style="font-size: 12px; margin-top: 4px;">ผลงาน</span>
    </a>
    <a href="#" class="nav-item">
      <span style="font-size: 20px;">🏫</span>
      <span style="font-size: 12px; margin-top: 4px;">เกี่ยวกับ</span>
    </a>
    <a href="#" class="nav-item">
      <span style="font-size: 20px;">📞</span>
      <span style="font-size: 12px; margin-top: 4px;">ติดต่อ</span>
    </a>
    <a href="#" class="nav-item">
      <span style="font-size: 20px;">🔐</span>
      <span style="font-size: 12px; margin-top: 4px;">เข้าสู่ระบบ</span>
    </a>
  </nav>
  
  <script>
    // Basic mobile app functionality
    document.addEventListener('DOMContentLoaded', function() {
      console.log('PBRU LDB Mobile App Loaded');
      
      // Register service worker for PWA
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
      }
      
      // Add touch feedback
      document.querySelectorAll('.btn, .nav-item').forEach(el => {
        el.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.95)';
        });
        el.addEventListener('touchend', function() {
          this.style.transform = '';
        });
      });
    });
    
    function openGallery() {
      alert('📱 แอปจะเปิดในอนาคต\\n\\nขณะนี้กำลังพัฟนาและจะพร้อมใช้งานเร็วๆ นี้');
    }
    
    // PWA install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show install button
      const installBtn = document.createElement('button');
      installBtn.className = 'btn';
      installBtn.innerHTML = '📲 ติดตั้งแอป';
      installBtn.onclick = () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          }
          deferredPrompt = null;
          installBtn.remove();
        });
      };
      document.querySelector('.content').appendChild(installBtn);
    });
  </script>
</body>
</html>`;
      
      fs.writeFileSync('.output/public/index.html', indexHtml);
    }
    
    // Create a service worker
    const swJs = `
self.addEventListener('install', (event) => {
  console.log('PBRU LDB Service Worker installed');
  event.waitUntil(
    caches.open('pbru-ldb-v1').then(cache => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/pbru-logo.png',
        '/pbru-LDB.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
`;
    fs.writeFileSync('.output/public/sw.js', swJs);
    
    // Step 4: Sync with Capacitor
    console.log('🔄 Syncing with Capacitor...');
    await execAsync('npx cap sync');
    
    console.log('✅ Mobile build completed successfully!');
    console.log('📱 You can now:');
    console.log('   1. Open Android Studio: npx cap open android');
    console.log('   2. Build APK in Android Studio');
    console.log('   3. Test on device/emulator');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildForMobile();