# คู่มือการสร้าง APK ด้วย Android Studio

## ขั้นตอนที่ 1: ติดตั้ง Android Studio

1. ดาวน์โหลด Android Studio จาก [https://developer.android.com/studio](https://developer.android.com/studio)
2. ติดตั้ง Android Studio ตามขั้นตอนของ installer
3. เมื่อเปิด Android Studio ครั้งแรก ให้ติดตั้ง Android SDK:
   - ไปที่ **Tools → SDK Manager**
   - ติดตั้ง:
     - **Android SDK Platform 34** (หรือสูงกว่า)
     - **Android SDK Build-Tools 34.0.0** (หรือสูงกว่า)
     - **Android Emulator** (ถ้าต้องการทดสอบ)

## ขั้นตอนที่ 2: เตรียมโปรเจกต์

1. **คัดลอกโฟลเดอร์ Android** ไปยังคอมพิวเตอร์ของคุณ
   - โฟลเดอร์ที่ต้องคัดลอก: `/home/ubuntu/concrete-calculator/android`

2. **เปิดโปรเจกต์ใน Android Studio**
   - เปิด Android Studio
   - ไปที่ **File → Open**
   - เลือกโฟลเดอร์ `android` ที่คัดลอกมา
   - รอให้ Gradle sync เสร็จ (อาจใช้เวลา 5-10 นาที)

## ขั้นตอนที่ 3: สร้าง Release APK

### วิธีที่ 1: ผ่าน Android Studio UI (ง่ายที่สุด)

1. ไปที่เมนู **Build → Generate Signed Bundle / APK**
2. เลือก **APK** แล้วคลิก **Next**
3. **สร้าง Keystore ใหม่** (ครั้งแรกเท่านั้น):
   - คลิก **Create new**
   - กรอกข้อมูล:
     - **Key store path**: เลือกตำแหน่งบันทึก (เช่น `~/concrete-calculator.jks`)
     - **Password**: ตั้งรหัสผ่าน (จำไว้!)
     - **Key alias**: `concrete-calculator`
     - **Key password**: ตั้งรหัสผ่าน (จำไว้!)
     - **Validity (years)**: `25`
     - **Certificate**: กรอกข้อมูล (ชื่อ, องค์กร, เมือง, ประเทศ)
   - คลิก **OK**

4. **เลือก Build Variant**:
   - เลือก **release** แล้วคลิก **Next**

5. **เลือก Signing Config**:
   - เลือก keystore ที่สร้างไว้
   - กรอกรหัสผ่าน
   - คลิก **Next**

6. **เลือก Destination Folder**:
   - เลือกตำแหน่งบันทึก APK (เช่น Desktop)
   - คลิก **Finish**

7. **รอให้สร้างเสร็จ** (อาจใช้เวลา 5-15 นาที)
   - จะเห็นข้อความ "APK(s) generated successfully"

### วิธีที่ 2: ผ่าน Command Line (สำหรับ Advanced Users)

```bash
cd android

# สร้าง Keystore (ครั้งแรกเท่านั้น)
keytool -genkey -v -keystore concrete-calculator.jks \
  -keyalg RSA -keysize 2048 -validity 9125 \
  -alias concrete-calculator

# สร้าง Release APK
./gradlew assembleRelease

# APK จะอยู่ที่: app/build/outputs/apk/release/app-release.apk
```

## ขั้นตอนที่ 4: ทดสอบ APK

### ทดสอบบนอุปกรณ์จริง:
1. เชื่อมต่ออุปกรณ์ Android ด้วย USB
2. เปิด **Developer Mode** บนอุปกรณ์ (กด Build Number 7 ครั้ง)
3. อนุญาต USB Debugging
4. ใน Android Studio ไปที่ **Run → Run 'app'**
5. เลือกอุปกรณ์ของคุณ

### ทดสอบบน Emulator:
1. ใน Android Studio ไปที่ **Tools → AVD Manager**
2. สร้าง Virtual Device
3. ไปที่ **Run → Run 'app'**
4. เลือก Emulator

## ขั้นตอนที่ 5: ดาวน์โหลด APK

APK ที่สร้างเสร็จแล้วจะอยู่ที่:
```
android/app/build/outputs/apk/release/app-release.apk
```

**ขนาด**: ประมาณ 20-30 MB

## การแจกจ่าย APK

### วิธีที่ 1: Google Play Store
1. สร้างบัญชี Google Play Developer ($25 ครั้งเดียว)
2. ไปที่ Google Play Console
3. สร้าง App ใหม่
4. อัปโหลด APK
5. กรอกข้อมูล App (รูป, คำอธิบาย, ฯลฯ)
6. เผยแพร่

### วิธีที่ 2: แจกจ่ายโดยตรง
- ส่ง APK ไปให้ผู้ใช้
- ผู้ใช้ติดตั้งด้วย:
  ```
  adb install app-release.apk
  ```
  หรือ
  - ถ้าเปิด Unknown Sources ก็ดับเบิลคลิก APK ได้

### วิธีที่ 3: ใช้ Firebase App Distribution
1. ตั้งค่า Firebase Project
2. อัปโหลด APK ไปยัง Firebase
3. ส่งลิงก์ให้ผู้ใช้ทดสอบ

## Troubleshooting

### ปัญหา: "Build failed"
- ตรวจสอบว่าติดตั้ง Android SDK Platform 34 แล้ว
- ลบโฟลเดอร์ `.gradle` และ `build` แล้วสร้างใหม่
- ใน Android Studio ไปที่ **File → Invalidate Caches / Restart**

### ปัญหา: "Keystore not found"
- ตรวจสอบเส้นทาง Keystore ว่าถูกต้อง
- สร้าง Keystore ใหม่

### ปัญหา: APK ขนาดใหญ่เกินไป
- ใช้ App Bundle แทน APK (ลดขนาด 20-30%)
- ใน Android Studio ไปที่ **Build → Generate Signed Bundle / APK** แล้วเลือก **Bundle**

## ข้อมูลแอป

- **Package Name**: `com.example.concretecalculator`
- **App Name**: `Concrete Calculator`
- **Version**: `1.0`
- **Min SDK**: API 24 (Android 7.0)
- **Target SDK**: API 34 (Android 14)

## ติดต่อ Support

หากมีปัญหา ให้ติดต่อ:
- [Android Developer Documentation](https://developer.android.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
