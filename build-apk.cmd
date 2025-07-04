@echo off
echo 🚀 Building PBRU LDB APK...
echo.

echo 📱 Step 1: Building web assets...
call npm run mobile:build
if %errorlevel% neq 0 (
    echo ❌ Web build failed!
    pause
    exit /b 1
)

echo.
echo 🔄 Step 2: Syncing with Capacitor...
call npx cap sync
if %errorlevel% neq 0 (
    echo ❌ Capacitor sync failed!
    pause
    exit /b 1
)

echo.
echo 🏗️ Step 3: Building Android APK...
cd android
call gradlew assembleDebug
if %errorlevel% neq 0 (
    echo ❌ Android build failed!
    echo Make sure you have Android SDK and Java JDK installed
    pause
    cd ..
    exit /b 1
)

cd ..
echo.
echo ✅ APK built successfully!
echo 📱 APK location: android\app\build\outputs\apk\debug\app-debug.apk
echo.

echo 🎉 You can install the APK on your Android device now!
pause 