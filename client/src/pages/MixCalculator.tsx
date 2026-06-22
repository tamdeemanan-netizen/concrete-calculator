import { useState } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";

function StepIndicator({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center justify-center gap-0 py-4">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              style={{
                background: i <= current ? "#1E56C8" : "#E5E7EB",
                color: i <= current ? "white" : "#9CA3AF",
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {i < current ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className="text-xs"
              style={{
                color: i <= current ? "#1E56C8" : "#9CA3AF",
                fontFamily: "'Sarabun', sans-serif",
                fontWeight: i === current ? 600 : 400,
              }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                height: 2,
                width: 44,
                background: i < current ? "#1E56C8" : "#E5E7EB",
                marginBottom: 18,
                marginLeft: 4,
                marginRight: 4,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const STRENGTHS = [180, 210, 240, 280, 320, 360, 400, 450, 500];

const USAGE_TYPES = [
  { value: "general", label: "คอนกรีตทั่วไป" },
  { value: "pump", label: "คอนกรีตปั๊ม" },
  { value: "special", label: "คอนกรีตพิเศษ" },
  { value: "precast", label: "คอนกรีตพรีคาสต์" },
];

// Mix ratios by strength (cement:sand:gravel, water per m3)
const MIX_DATA: Record<number, { cement: number; sand: number; gravel: number; water: number; ratio: string }> = {
  180: { cement: 270, sand: 720, gravel: 1080, water: 190, ratio: "1 : 2.67 : 4.00" },
  210: { cement: 300, sand: 680, gravel: 1020, water: 185, ratio: "1 : 2.27 : 3.40" },
  240: { cement: 350, sand: 630, gravel: 945, water: 175, ratio: "1 : 1.80 : 2.70" },
  280: { cement: 390, sand: 585, gravel: 878, water: 170, ratio: "1 : 1.50 : 2.25" },
  320: { cement: 430, sand: 540, gravel: 810, water: 165, ratio: "1 : 1.26 : 1.88" },
  360: { cement: 470, sand: 495, gravel: 742, water: 160, ratio: "1 : 1.05 : 1.58" },
  400: { cement: 510, sand: 450, gravel: 675, water: 155, ratio: "1 : 0.88 : 1.32" },
  450: { cement: 560, sand: 405, gravel: 608, water: 150, ratio: "1 : 0.72 : 1.09" },
  500: { cement: 600, sand: 360, gravel: 540, water: 145, ratio: "1 : 0.60 : 0.90" },
};

function getStrengthNote(ksc: number): string {
  if (ksc <= 210) return `กำลังอัด ${ksc} ksc เหมาะสำหรับงานทั่วไปที่ไม่รับน้ำหนักมาก`;
  if (ksc <= 240) return `กำลังอัด ${ksc} ksc เหมาะสำหรับงานโครงสร้างทั่วไป เช่น พื้น พื้น คาน เสา`;
  if (ksc <= 320) return `กำลังอัด ${ksc} ksc เหมาะสำหรับงานโครงสร้างที่รับน้ำหนักมาก`;
  return `กำลังอัด ${ksc} ksc เหมาะสำหรับงานโครงสร้างพิเศษที่ต้องการความแข็งแรงสูง`;
}

export default function MixCalculator() {
  const [, navigate] = useLocation();
  const { addHistory } = useApp();
  const [step, setStep] = useState(0);
  const [selectedStrength, setSelectedStrength] = useState(240);
  const [selectedUsage, setSelectedUsage] = useState("general");
  const [saved, setSaved] = useState(false);

  const mix = MIX_DATA[selectedStrength];
  const admixture = (mix.cement * 0.01).toFixed(1);

  const usageLabel = USAGE_TYPES.find((u) => u.value === selectedUsage)?.label || "";

  function handleSave() {
    addHistory({
      type: "mix",
      title: `คอนกรีตกำลังอัด ${selectedStrength} ksc`,
      subtitle: usageLabel,
      result: String(selectedStrength),
      unit: "ksc",
      details: {
        strength: selectedStrength,
        usage: usageLabel,
        cement: mix.cement,
        sand: mix.sand,
        gravel: mix.gravel,
        water: mix.water,
        ratio: mix.ratio,
      },
    });
    setSaved(true);
    toast.success("บันทึกแล้ว!", { description: "ผลการคำนวณถูกบันทึกในประวัติแล้ว" });
  }

  function handleShare() {
    const text = `อัตราส่วนผสมคอนกรีต ${selectedStrength} ksc\nอัตราส่วน: ${mix.ratio}\nปูนซีเมนต์: ${mix.cement} กก.\nทราย: ${mix.sand} กก.\nหิน: ${mix.gravel} กก.\nน้ำ: ${mix.water} ลิตร`;
    if (navigator.share) {
      navigator.share({ title: "อัตราส่วนผสมคอนกรีต", text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("คัดลอกแล้ว!", { description: "คัดลอกข้อมูลไปยังคลิปบอร์ดแล้ว" });
    }
  }

  const steps = ["กำลังอัด", "เลือกวัสดุ", "ผลลัพธ์"];

  return (
    <div className="flex flex-col min-h-dvh bg-[#F5F7FA]">
      {/* Header */}
      <div style={{ background: "#27AE60" }} className="app-header">
        <button onClick={() => (step === 0 ? navigate("/") : setStep(step - 1))} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-white font-bold text-base flex-1 text-center" style={{ fontFamily: "'Sarabun', sans-serif" }}>
          หาอัตราส่วนผสมคอนกรีต
        </h1>
        <div className="w-8" />
      </div>

      {/* Step indicator */}
      <div className="bg-white px-4 shadow-sm">
        <StepIndicator current={step} steps={steps} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Step 0: Select strength */}
        {step === 0 && (
          <div className="p-4 animate-slide-up">
            <h2 className="font-bold text-gray-800 text-base mb-3" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              เลือกกำลังอัดคอนกรีตที่ต้องการ (f'c)
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {STRENGTHS.map((ksc) => (
                <button
                  key={ksc}
                  onClick={() => setSelectedStrength(ksc)}
                  className="strength-btn"
                  style={{
                    borderColor: selectedStrength === ksc ? "#1E56C8" : "#E5E7EB",
                    background: selectedStrength === ksc ? "#1E56C8" : "white",
                    color: selectedStrength === ksc ? "white" : "#374151",
                  }}
                >
                  {ksc} ksc
                </button>
              ))}
            </div>

            {/* Usage type */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 text-sm mb-2" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                ลักษณะการใช้งาน
              </h3>
              <div className="relative">
                <select
                  value={selectedUsage}
                  onChange={(e) => setSelectedUsage(e.target.value)}
                  className="calc-input appearance-none pr-10"
                  style={{ fontFamily: "'Sarabun', sans-serif" }}
                >
                  {USAGE_TYPES.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-3 bg-[#FFFBEB] rounded-xl p-3 flex gap-2">
              <span className="text-base flex-shrink-0">💡</span>
              <p className="text-xs text-amber-700" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                <strong>แนะนำ:</strong> {getStrengthNote(selectedStrength)}
              </p>
            </div>

            <div className="mt-5">
              <button className="btn-primary" style={{ background: "#27AE60" }} onClick={() => setStep(1)}>
                ถัดไป
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Material selection (info) */}
        {step === 1 && (
          <div className="p-4 animate-slide-up">
            <h2 className="font-bold text-gray-800 text-base mb-4" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              วัสดุสำหรับคอนกรีต {selectedStrength} ksc
            </h2>

            {/* Ratio display */}
            <div className="bg-[#27AE60] rounded-2xl p-4 mb-4 text-center">
              <p className="text-green-100 text-sm mb-1" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                อัตราส่วนผสมโดยน้ำหนัก
              </p>
              <p className="text-white font-bold text-2xl" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                {mix.ratio}
              </p>
              <p className="text-green-200 text-xs mt-1" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                ปูนซีเมนต์ : ทราย : หิน
              </p>
            </div>

            {/* Material details per m3 */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                ปริมาณวัสดุต่อคอนกรีต 1 ม³
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "🏗️", label: "ปูนซีเมนต์", value: `${mix.cement} กก.`, color: "#F3F4F6" },
                  { icon: "🟡", label: "ทราย", value: `${mix.sand} กก.`, color: "#FFFBEB" },
                  { icon: "⬛", label: "หิน", value: `${mix.gravel} กก.`, color: "#F3F4F6" },
                  { icon: "💧", label: "น้ำ", value: `${mix.water} ลิตร`, color: "#EFF6FF" },
                  { icon: "🧪", label: "น้ำยาผสมคอนกรีต (ถ้ามี)", value: `${admixture} กก.`, color: "#F0FDF4" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-3 rounded-xl p-2.5" style={{ background: m.color }}>
                    <span className="text-xl flex-shrink-0">{m.icon}</span>
                    <span className="flex-1 text-sm text-gray-700" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                      {m.label}
                    </span>
                    <span className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                * ปริมาณน้ำอาจปรับได้ตามชนิดวัสดุและความต้องการในการทำงาน
              </p>
            </div>

            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => setStep(0)}>
                ย้อนกลับ
              </button>
              <button
                className="btn-primary flex-1"
                style={{ background: "#27AE60" }}
                onClick={() => setStep(2)}
              >
                ถัดไป
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Result */}
        {step === 2 && (
          <div className="p-4 animate-slide-up pb-8">
            {/* Result highlight */}
            <div className="rounded-2xl p-4 mb-4" style={{ background: "#27AE60" }}>
              <p className="text-green-100 text-sm mb-1" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                อัตราส่วนผสมโดยน้ำหนัก
              </p>
              <p className="text-white font-bold text-2xl" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                {mix.ratio}
              </p>
              <p className="text-green-200 text-xs mt-0.5" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                ปูนซีเมนต์ : ทราย : หิน
              </p>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>กำลังอัดที่เลือก</span>
                <span className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                  {selectedStrength} ksc
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>ประเภทคอนกรีต</span>
                <span className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                  {usageLabel}
                </span>
              </div>
            </div>

            {/* Material per m3 */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                ปริมาณวัสดุต่อคอนกรีต 1 ม³
              </h3>
              <div className="space-y-2.5">
                {[
                  { icon: "🏗️", label: "ปูนซีเมนต์", value: `${mix.cement} กก.` },
                  { icon: "🟡", label: "ทราย", value: `${mix.sand} กก.` },
                  { icon: "⬛", label: "หิน", value: `${mix.gravel} กก.` },
                  { icon: "💧", label: "น้ำ", value: `${mix.water} ลิตร` },
                  { icon: "🧪", label: "น้ำยาผสมคอนกรีต (ถ้ามี)", value: `${admixture} กก.` },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-2">
                    <span className="text-base flex-shrink-0">{m.icon}</span>
                    <span className="flex-1 text-sm text-gray-600" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                      {m.label}
                    </span>
                    <span className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                <strong>หมายเหตุ:</strong> ปริมาณน้ำอาจปรับได้ตามชนิดวัสดุและความต้องการในการทำงาน
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
                onClick={handleSave}
                disabled={saved}
                style={{ opacity: saved ? 0.6 : 1 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16L21 8V19C21 20.1046 20.1046 21 19 21Z" stroke="#1E56C8" strokeWidth="2" />
                  <path d="M17 21V13H7V21" stroke="#1E56C8" strokeWidth="2" />
                  <path d="M7 3V8H15" stroke="#1E56C8" strokeWidth="2" />
                </svg>
                {saved ? "บันทึกแล้ว" : "บันทึก"}
              </button>
              <button
                className="btn-green flex-1 flex items-center justify-center gap-2"
                onClick={handleShare}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="18" cy="5" r="3" stroke="white" strokeWidth="2" />
                  <circle cx="6" cy="12" r="3" stroke="white" strokeWidth="2" />
                  <circle cx="18" cy="19" r="3" stroke="white" strokeWidth="2" />
                  <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                แชร์ผลลัพธ์
              </button>
            </div>

            <button className="btn-secondary mt-3" onClick={() => setStep(1)}>
              ย้อนกลับ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
