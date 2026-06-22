# แนวคิดการออกแบบแอปคำนวณคอนกรีต

## อ้างอิงจากภาพที่ผู้ใช้ให้มา
ภาพอ้างอิงเป็น ground-truth spec — ต้องทำตามให้ใกล้เคียงที่สุด

## โครงสร้างแอป
- **หน้าหลัก (Home):** แสดงเมนูหลัก 2 ฟีเจอร์ + ประวัติการคำนวณ + bottom navigation
- **คำนวณปริมาณคอนกรีต:** 3 ขั้นตอน (เลือกรูปแบบ → กรอกขนาด → ผลลัพธ์)
- **หาอัตราส่วนผสมคอนกรีต:** 3 ขั้นตอน (กำลังอัด → เลือกวัสดุ → ผลลัพธ์)
- **ประวัติ:** รายการประวัติการคำนวณ
- **ความรู้:** บทความและข้อมูลเกี่ยวกับคอนกรีต

## Design Philosophy
- **Theme:** Mobile-first, Clean Professional Blue
- **Primary Color:** #1E56C8 (Royal Blue) — สีหลักของแอป
- **Secondary Color:** #2ECC71 (Green) — สำหรับปุ่มแชร์/บันทึก
- **Background:** #F5F7FA (Light Gray)
- **Font:** Sarabun (Thai) + Inter (EN)
- **Style:** Clean, functional, construction-industry feel
- **Layout:** Mobile phone frame (max-width 430px), bottom navigation

## ฟีเจอร์หลัก

### ประเภทโครงสร้าง (คำนวณปริมาณ)
1. กรงสี่เหลี่ยม (Rectangular Slab)
2. กรงกระบอก (Cylinder)
3. เสาเข็ม/ฐานราก (Pile/Foundation)
4. คาน (Beam)
5. เสา (Column)
6. พื้น/แผ่น (Floor/Slab)
7. กำแพง (Wall)
8. รูปทรงอิสระ (Custom)

### กำลังอัดคอนกรีต (อัตราส่วนผสม)
180, 210, 240, 280, 320, 360, 400, 450, 500 ksc

### ลักษณะการใช้งาน
- คอนกรีตทั่วไป
- คอนกรีตพิเศษ
- คอนกรีตปั๊ม
