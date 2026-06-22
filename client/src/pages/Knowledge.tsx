import { useState } from "react";
import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";

const ARTICLES = [
  {
    id: 1,
    category: "พื้นฐาน",
    title: "คอนกรีตคืออะไร?",
    summary: "คอนกรีตเป็นวัสดุก่อสร้างที่ประกอบด้วยปูนซีเมนต์ ทราย หิน และน้ำ ผสมในอัตราส่วนที่เหมาะสม",
    content: `คอนกรีตเป็นวัสดุก่อสร้างที่ใช้กันอย่างแพร่หลายที่สุดในโลก ประกอบด้วยส่วนผสมหลัก 4 อย่าง:

1. **ปูนซีเมนต์** — ทำหน้าที่เป็นตัวประสาน เมื่อผสมกับน้ำจะเกิดปฏิกิริยาไฮเดรชัน ทำให้คอนกรีตแข็งตัว
2. **ทราย (มวลรวมละเอียด)** — เติมเต็มช่องว่างระหว่างหิน ช่วยให้คอนกรีตมีความหนาแน่น
3. **หิน (มวลรวมหยาบ)** — ให้ความแข็งแรงและลดปริมาณปูนซีเมนต์ที่ใช้
4. **น้ำ** — ทำให้เกิดปฏิกิริยาไฮเดรชันและช่วยให้คอนกรีตไหลตัวได้

คุณสมบัติของคอนกรีตขึ้นอยู่กับอัตราส่วนน้ำต่อปูนซีเมนต์ (w/c ratio) ยิ่งน้อยยิ่งแข็งแรง`,
    icon: "🏗️",
    color: "#EEF3FC",
    iconColor: "#1E56C8",
  },
  {
    id: 2,
    category: "กำลังอัด",
    title: "กำลังอัดคอนกรีต (f'c) คืออะไร?",
    summary: "กำลังอัดคอนกรีตคือความสามารถในการรับแรงอัดต่อหน่วยพื้นที่ วัดเป็น ksc หรือ MPa",
    content: `กำลังอัดคอนกรีต (Compressive Strength) คือค่าความสามารถในการรับแรงอัดของคอนกรีต

**หน่วยที่ใช้:**
- ksc (กิโลกรัมต่อตารางเซนติเมตร) — ใช้ในประเทศไทย
- MPa (เมกะปาสคาล) — ใช้ในมาตรฐานสากล
- psi (ปอนด์ต่อตารางนิ้ว) — ใช้ในสหรัฐอเมริกา

**การแปลงหน่วย:**
- 1 MPa ≈ 10.2 ksc
- 1 ksc ≈ 14.22 psi

**ระดับกำลังอัดที่ใช้งาน:**
| กำลังอัด | การใช้งาน |
|---------|-----------|
| 180 ksc | งานทั่วไปไม่รับน้ำหนักมาก |
| 210-240 ksc | งานโครงสร้างทั่วไป |
| 280-320 ksc | งานโครงสร้างรับน้ำหนักมาก |
| 360+ ksc | งานพิเศษ สะพาน อาคารสูง |`,
    icon: "💪",
    color: "#FFF7ED",
    iconColor: "#EA580C",
  },
  {
    id: 3,
    category: "การผสม",
    title: "อัตราส่วนผสมคอนกรีตมาตรฐาน",
    summary: "อัตราส่วนผสมคอนกรีตที่เหมาะสมจะให้กำลังอัดตามต้องการและประหยัดวัสดุ",
    content: `อัตราส่วนผสมคอนกรีตมาตรฐานตามมาตรฐาน ACI และ มอก.

**อัตราส่วนโดยน้ำหนัก (ปูนซีเมนต์ : ทราย : หิน):**

| กำลังอัด | อัตราส่วน | ปูนซีเมนต์/ม³ |
|---------|----------|--------------|
| 180 ksc | 1:2.67:4.00 | 270 กก. |
| 210 ksc | 1:2.27:3.40 | 300 กก. |
| 240 ksc | 1:1.80:2.70 | 350 กก. |
| 280 ksc | 1:1.50:2.25 | 390 กก. |
| 320 ksc | 1:1.26:1.88 | 430 กก. |

**หมายเหตุ:** ปริมาณน้ำควรน้อยที่สุดเท่าที่จำเป็น เพื่อให้ได้กำลังอัดสูงสุด`,
    icon: "⚗️",
    color: "#F0FDF4",
    iconColor: "#16A34A",
  },
  {
    id: 4,
    category: "การบ่ม",
    title: "การบ่มคอนกรีต (Curing)",
    summary: "การบ่มคอนกรีตที่ถูกต้องช่วยเพิ่มกำลังอัดและลดการแตกร้าว",
    content: `การบ่มคอนกรีต (Curing) คือการรักษาความชื้นและอุณหภูมิของคอนกรีตหลังจากการเทเพื่อให้ปฏิกิริยาไฮเดรชันดำเนินต่อไปได้อย่างสมบูรณ์

**วิธีการบ่มคอนกรีต:**
1. **การราดน้ำ** — ราดน้ำบนผิวคอนกรีตทุก 4-6 ชั่วโมง
2. **การคลุมด้วยกระสอบเปียก** — ใช้กระสอบชุบน้ำคลุมผิวคอนกรีต
3. **การใช้แผ่นพลาสติก** — คลุมผิวเพื่อป้องกันการระเหยของน้ำ
4. **การใช้น้ำยาบ่ม (Curing Compound)** — ฉีดพ่นบนผิวคอนกรีต

**ระยะเวลาการบ่ม:**
- ขั้นต่ำ 7 วัน สำหรับงานทั่วไป
- 14-28 วัน สำหรับงานที่ต้องการกำลังอัดสูง

คอนกรีตที่บ่มครบ 28 วัน จะได้กำลังอัดตามที่ออกแบบไว้`,
    icon: "💧",
    color: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    id: 5,
    category: "ข้อควรระวัง",
    title: "ข้อควรระวังในการเทคอนกรีต",
    summary: "ปัจจัยที่ส่งผลต่อคุณภาพคอนกรีตและข้อควรระวังในการทำงาน",
    content: `ปัจจัยสำคัญที่ส่งผลต่อคุณภาพคอนกรีต:

**1. อัตราส่วนน้ำต่อปูนซีเมนต์ (w/c ratio)**
- ยิ่งน้อยยิ่งแข็งแรง แต่ต้องไม่น้อยเกินไปจนทำงานยาก
- ค่าที่แนะนำ: 0.4-0.6

**2. การผสม**
- ผสมให้เข้ากันสม่ำเสมอ
- ไม่ควรเติมน้ำเพิ่มหลังผสมแล้ว

**3. การเทคอนกรีต**
- เทในชั้นไม่เกิน 30-45 ซม.
- ใช้เครื่องสั่นคอนกรีต (Vibrator) ทุก 45 ซม.

**4. สภาพอากาศ**
- อุณหภูมิสูงเกิน 35°C ควรเทในช่วงเช้าหรือเย็น
- หลีกเลี่ยงการเทในช่วงฝนตกหนัก

**5. แบบหล่อ**
- ตรวจสอบความแข็งแรงและความแน่นของแบบหล่อ
- ทาน้ำมันแบบก่อนเทคอนกรีต`,
    icon: "⚠️",
    color: "#FFF7ED",
    iconColor: "#D97706",
  },
  {
    id: 6,
    category: "การคำนวณ",
    title: "สูตรคำนวณปริมาณคอนกรีต",
    summary: "สูตรและวิธีการคำนวณปริมาณคอนกรีตสำหรับงานก่อสร้างประเภทต่างๆ",
    content: `สูตรคำนวณปริมาณคอนกรีตสำหรับโครงสร้างต่างๆ:

**1. กรงสี่เหลี่ยม (Rectangular)**
V = ยาว × กว้าง × สูง

**2. กรงกระบอก (Cylinder)**
V = π × r² × h
(r = รัศมี = เส้นผ่าศูนย์กลาง/2)

**3. คาน (Beam)**
V = ยาว × กว้าง × สูง

**4. เสา (Column)**
V = พื้นที่หน้าตัด × ความสูง

**5. พื้น (Slab)**
V = พื้นที่ × ความหนา

**การเผื่อสูญเสีย:**
ควรเพิ่มปริมาณ 5-15% เพื่อชดเชยการสูญเสียระหว่างการผสมและเท

**ตัวอย่าง:**
พื้นขนาด 4×3 เมตร หนา 0.15 เมตร
V = 4 × 3 × 0.15 = 1.80 ม³
เผื่อสูญเสีย 10% = 1.80 × 1.10 = 1.98 ม³`,
    icon: "📐",
    color: "#F5F3FF",
    iconColor: "#7C3AED",
  },
];

export default function Knowledge() {
  const [, navigate] = useLocation();
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);

  if (selectedArticle) {
    return (
      <div className="flex flex-col min-h-dvh bg-[#F5F7FA]">
        <div className="app-header">
          <button onClick={() => setSelectedArticle(null)} className="p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-white font-bold text-base flex-1 text-center" style={{ fontFamily: "'Sarabun', sans-serif" }}>
            ความรู้
          </h1>
          <div className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          <div className="mb-4">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: selectedArticle.color,
                color: selectedArticle.iconColor,
                fontFamily: "'Sarabun', sans-serif",
              }}
            >
              {selectedArticle.category}
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Sarabun', sans-serif" }}>
            {selectedArticle.title}
          </h1>
          <div className="bg-white rounded-xl p-4">
            {selectedArticle.content.split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={i} className="font-bold text-gray-800 mt-3 mb-1" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (line.startsWith("| ")) {
                return (
                  <p key={i} className="text-sm text-gray-600 font-mono py-0.5" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {line}
                  </p>
                );
              }
              if (line.startsWith("- ") || line.match(/^\d+\./)) {
                return (
                  <p key={i} className="text-sm text-gray-700 py-0.5 pl-2" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (line.trim() === "") return <div key={i} className="h-2" />;
              return (
                <p key={i} className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                  {line.replace(/\*\*/g, "")}
                </p>
              );
            })}
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-[#F5F7FA]">
      <div className="app-header">
        <button onClick={() => navigate("/")} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-white font-bold text-base flex-1 text-center" style={{ fontFamily: "'Sarabun', sans-serif" }}>
          ความรู้
        </h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <p className="text-gray-500 text-sm mb-4" style={{ fontFamily: "'Sarabun', sans-serif" }}>
          บทความและข้อมูลเกี่ยวกับคอนกรีต
        </p>
        <div className="space-y-3">
          {ARTICLES.map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="w-full bg-white rounded-xl p-4 flex items-start gap-3 text-left shadow-sm active:scale-[0.98] transition-transform duration-150"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ background: article.color }}
              >
                {article.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: article.color,
                      color: article.iconColor,
                      fontFamily: "'Sarabun', sans-serif",
                    }}
                  >
                    {article.category}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                  {article.title}
                </p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                  {article.summary}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-1">
                <path d="M9 18L15 12L9 6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
