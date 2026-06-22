# ตั้งค่า GitHub Actions เพื่อสร้าง APK

## ขั้นตอนที่ 1: สร้างบัญชี GitHub (ถ้ายังไม่มี)

1. ไปที่ https://github.com/signup
2. สร้างบัญชีใหม่ (ฟรี)
3. ยืนยันอีเมล

## ขั้นตอนที่ 2: สร้าง Repository ใหม่

1. ไปที่ https://github.com/new
2. กรอกข้อมูล:
   - **Repository name**: `concrete-calculator` (หรือชื่ออื่นตามต้องการ)
   - **Description**: `Concrete Calculator App`
   - **Visibility**: Public (ฟรี) หรือ Private (ต้องมีการตั้งค่าเพิ่มเติม)
   - **Initialize this repository with**: ไม่ต้องเลือก
3. คลิก **Create repository**

## ขั้นตอนที่ 3: Push โค้ดไปยัง GitHub

### ใน Terminal/Command Prompt:

```bash
cd /path/to/concrete-calculator

# ลบ git เก่า (ถ้ามี)
rm -rf .git

# เริ่มต้น git ใหม่
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Initial commit: Concrete Calculator"

# เพิ่ม remote (แทนที่ USERNAME และ REPO_NAME)
git remote add origin https://github.com/USERNAME/concrete-calculator.git

# Push ไปยัง GitHub
git branch -M main
git push -u origin main
```

**หมายเหตุ:** แทนที่ `USERNAME` ด้วยชื่อ GitHub ของคุณ

## ขั้นตอนที่ 4: ตรวจสอบ GitHub Actions

1. ไปที่ Repository ของคุณ
2. คลิกแท็บ **Actions**
3. จะเห็น workflow "Build Android APK" กำลังทำงาน
4. รอให้เสร็จ (ประมาณ 10-15 นาที)

## ขั้นตอนที่ 5: ดาวน์โหลด APK

### วิธีที่ 1: จาก Artifacts (ง่ายที่สุด)

1. ไปที่ **Actions** → **Build Android APK** (workflow ล่าสุด)
2. ลงไปที่ด้านล่าง ส่วน **Artifacts**
3. คลิก **concrete-calculator-apk** เพื่อดาวน์โหลด

### วิธีที่ 2: จาก Release (ถ้ามี tag)

1. สร้าง Release ใหม่:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
2. GitHub Actions จะสร้าง Release โดยอัตโนมัติ
3. ไปที่ **Releases** ในหน้า Repository
4. ดาวน์โหลด APK จากที่นั่น

## ขั้นตอนที่ 6: ติดตั้ง APK บนอุปกรณ์ Android

### วิธีที่ 1: ผ่าน USB

```bash
adb install app-release.apk
```

### วิธีที่ 2: ส่งไฟล์โดยตรง

1. ส่ง APK ไปยังอุปกรณ์ (Email, WhatsApp, Telegram, ฯลฯ)
2. เปิดไฟล์ APK บนอุปกรณ์
3. ยอมรับการติดตั้ง

### วิธีที่ 3: ใช้ Google Play Console

1. สร้างบัญชี Google Play Developer ($25 ครั้งเดียว)
2. ไปที่ Google Play Console
3. สร้าง App ใหม่
4. อัปโหลด APK
5. เผยแพร่

## Troubleshooting

### ปัญหา: "Build failed"

1. ไปที่ **Actions** → workflow ล่าสุด
2. คลิก **Build Android APK** job
3. ดูข้อความ error
4. แก้ไขโค้ดและ push ใหม่

### ปัญหา: "Permission denied"

ถ้าเห็นข้อความ "Permission denied" ให้ทำ:

```bash
chmod +x android/gradlew
git add android/gradlew
git commit -m "Fix: Make gradlew executable"
git push
```

### ปัญหา: APK ไม่ปรากฏใน Artifacts

1. ตรวจสอบว่า build สำเร็จ (ดูสีเขียว ✓)
2. ตรวจสอบ log ของ build
3. ลองรัน workflow ใหม่ โดยไปที่ **Actions** → **Build Android APK** → **Run workflow**

## การอัปเดตแอป

ทุกครั้งที่คุณ push โค้ดใหม่ไปยัง GitHub:

```bash
git add .
git commit -m "Update: เพิ่มฟีเจอร์ใหม่"
git push
```

GitHub Actions จะสร้าง APK ใหม่โดยอัตโนมัติ

## ข้อมูลเพิ่มเติม

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Android Gradle Build](https://developer.android.com/build)
- [Capacitor Documentation](https://capacitorjs.com/docs)

---

**หมายเหตุ:** GitHub Actions ให้ 2,000 นาทีฟรีต่อเดือน ซึ่งเพียงพอสำหรับการสร้าง APK หลายครั้ง
