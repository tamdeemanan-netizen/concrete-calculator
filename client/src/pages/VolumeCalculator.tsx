import { useState } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";

// Step indicator component
function StepIndicator({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center justify-center gap-0 py-4">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className="step-dot"
              style={{
                background: i < current ? "#1E56C8" : i === current ? "#1E56C8" : "#E5E7EB",
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

// Structure types
const STRUCTURES = [
  { id: "slab", label: "กรงสี่เหลี่ยม", icon: SlabIcon },
  { id: "cylinder", label: "กรงกระบอก", icon: CylinderIcon },
  { id: "pile", label: "เสาเข็ม/ฐานราก", icon: PileIcon },
  { id: "beam", label: "คาน", icon: BeamIcon },
  { id: "column", label: "เสา", icon: ColumnIcon },
  { id: "floor", label: "พื้น/แผ่น", icon: FloorIcon },
  { id: "wall", label: "กำแพง", icon: WallIcon },
  { id: "custom", label: "รูปทรงอิสระ", icon: CustomIcon },
];

function SlabIcon({ selected }: { selected: boolean }) {
  const c = selected ? "#1E56C8" : "#9CA3AF";
  const d = selected ? "#1644A8" : "#6B7280";
  return (
    <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
      <path d="M4 28 L24 14 L44 28 L44 36 L4 36 Z" fill={c} opacity="0.25" />
      <path d="M4 28 L4 36 L44 36 L44 28 L24 14 Z" stroke={d} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M4 28 L24 14 L44 28" stroke={d} strokeWidth="1.5" fill="none" />
      {/* dimension lines */}
      <path d="M8 38 L40 38" stroke={d} strokeWidth="1" opacity="0.5" />
      <path d="M2 30 L2 34" stroke={d} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function CylinderIcon({ selected }: { selected: boolean }) {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
      <ellipse cx="18" cy="8" rx="14" ry="5" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.8" />
      <rect x="4" y="8" width="28" height="28" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.5" />
      <ellipse cx="18" cy="36" rx="14" ry="5" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.8" />
      <path d="M4 8 L4 36" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1" />
      <path d="M32 8 L32 36" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1" />
    </svg>
  );
}

function PileIcon({ selected }: { selected: boolean }) {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
      <rect x="10" y="4" width="16" height="32" rx="2" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.7" />
      <path d="M10 36 L18 42 L26 36" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.9" />
      <rect x="4" y="4" width="28" height="6" rx="2" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.9" />
    </svg>
  );
}

function BeamIcon({ selected }: { selected: boolean }) {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
      <rect x="2" y="8" width="44" height="14" rx="2" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.7" />
      <path d="M2 8 L8 2 L46 2 L46 8" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1.5" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.5" />
    </svg>
  );
}

function ColumnIcon({ selected }: { selected: boolean }) {
  return (
    <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
      <rect x="8" y="6" width="12" height="36" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.7" />
      <rect x="4" y="2" width="20" height="6" rx="1" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.9" />
      <rect x="4" y="40" width="20" height="6" rx="1" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.9" />
    </svg>
  );
}

function FloorIcon({ selected }: { selected: boolean }) {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
      <path d="M2 20 L24 8 L46 20 L46 24 L2 24 Z" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.7" />
      <path d="M2 20 L24 8 L46 20" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1.5" fill="none" />
      <path d="M2 24 L46 24" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1" />
    </svg>
  );
}

function WallIcon({ selected }: { selected: boolean }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="4" y="4" width="36" height="36" rx="2" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.3" stroke={selected ? "#1E56C8" : "#9CA3AF"} strokeWidth="1.5" />
      <path d="M4 16 L40 16" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1" />
      <path d="M4 28 L40 28" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1" />
      <path d="M16 4 L16 40" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1" />
      <path d="M28 4 L28 40" stroke={selected ? "#1644A8" : "#6B7280"} strokeWidth="1" />
    </svg>
  );
}

function CustomIcon({ selected }: { selected: boolean }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M8 36 L8 12 L20 4 L36 8 L36 32 L24 40 Z" fill={selected ? "#1E56C8" : "#9CA3AF"} opacity="0.5" stroke={selected ? "#1E56C8" : "#9CA3AF"} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// Dimension diagram for slab
function SlabDiagram() {
  return (
    <div className="flex justify-center my-4">
      <svg width="240" height="140" viewBox="0 0 240 140" fill="none">
        {/* 3D slab */}
        <path d="M30 90 L110 50 L210 50 L210 90 L130 130 Z" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M30 90 L110 50 L110 90 L30 130 Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M30 90 L30 130 L130 130 L210 90" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
        <path d="M110 90 L130 130" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M110 50 L110 90" stroke="#9CA3AF" strokeWidth="1.5" />

        {/* Labels */}
        <text x="155" y="45" fill="#374151" fontSize="12" fontFamily="Sarabun" textAnchor="middle">ยาว (L)</text>
        <path d="M110 42 L210 42" stroke="#374151" strokeWidth="1" markerEnd="url(#arrow)" />
        <path d="M110 42 L110 48" stroke="#374151" strokeWidth="1" />
        <path d="M210 42 L210 48" stroke="#374151" strokeWidth="1" />

        <text x="60" y="72" fill="#374151" fontSize="11" fontFamily="Sarabun">กว้าง</text>
        <text x="55" y="83" fill="#374151" fontSize="11" fontFamily="Sarabun">(W)</text>

        <text x="215" y="72" fill="#374151" fontSize="11" fontFamily="Sarabun">สูง (H)</text>
        <path d="M212 52 L212 88" stroke="#374151" strokeWidth="1" />
        <path d="M210 52 L214 52" stroke="#374151" strokeWidth="1" />
        <path d="M210 88 L214 88" stroke="#374151" strokeWidth="1" />
      </svg>
    </div>
  );
}

function CylinderDiagram() {
  return (
    <div className="flex justify-center my-4">
      <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
        <ellipse cx="100" cy="30" rx="50" ry="15" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1.5" />
        <rect x="50" y="30" width="100" height="90" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />
        <ellipse cx="100" cy="120" rx="50" ry="15" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M50 30 L50 120" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M150 30 L150 120" stroke="#9CA3AF" strokeWidth="1.5" />

        {/* Diameter arrow */}
        <path d="M50 145 L150 145" stroke="#374151" strokeWidth="1" />
        <path d="M50 142 L50 148" stroke="#374151" strokeWidth="1" />
        <path d="M150 142 L150 148" stroke="#374151" strokeWidth="1" />
        <text x="100" y="143" fill="#374151" fontSize="12" fontFamily="Sarabun" textAnchor="middle">เส้นผ่าศูนย์กลาง (D)</text>

        {/* Height arrow */}
        <path d="M160 30 L160 120" stroke="#374151" strokeWidth="1" />
        <path d="M157 30 L163 30" stroke="#374151" strokeWidth="1" />
        <path d="M157 120 L163 120" stroke="#374151" strokeWidth="1" />
        <text x="165" y="80" fill="#374151" fontSize="12" fontFamily="Sarabun">สูง (H)</text>
      </svg>
    </div>
  );
}

// Units
const UNITS = [
  { value: "m3", label: "ลูกบาศก์เมตร (ม³)" },
  { value: "cm3", label: "ลูกบาศก์เซนติเมตร (ซม³)" },
  { value: "ft3", label: "ลูกบาศก์ฟุต (ฟุต³)" },
];

interface DimensionInputs {
  length: string;
  width: string;
  height: string;
  diameter: string;
}

export default function VolumeCalculator() {
  const [, navigate] = useLocation();
  const { addHistory } = useApp();
  const [step, setStep] = useState(0);
  const [selectedStructure, setSelectedStructure] = useState("slab");
  const [selectedUnit, setSelectedUnit] = useState("m3");
  const [dims, setDims] = useState<DimensionInputs>({
    length: "4.00",
    width: "2.50",
    height: "0.15",
    diameter: "0.60",
  });
  const [wastage, setWastage] = useState("10");
  const [saved, setSaved] = useState(false);

  const isCylinder = selectedStructure === "cylinder";

  function calcVolume(): number {
    if (isCylinder) {
      const r = parseFloat(dims.diameter) / 2;
      const h = parseFloat(dims.height);
      if (isNaN(r) || isNaN(h)) return 0;
      return Math.PI * r * r * h;
    } else {
      const l = parseFloat(dims.length);
      const w = parseFloat(dims.width);
      const h = parseFloat(dims.height);
      if (isNaN(l) || isNaN(w) || isNaN(h)) return 0;
      return l * w * h;
    }
  }

  const volume = calcVolume();
  const wastagePercent = parseFloat(wastage) || 0;
  const totalVolume = volume * (1 + wastagePercent / 100);

  function getUnitLabel() {
    if (selectedUnit === "m3") return "ม³";
    if (selectedUnit === "cm3") return "ซม³";
    return "ฟุต³";
  }

  function convertVolume(v: number) {
    if (selectedUnit === "cm3") return v * 1_000_000;
    if (selectedUnit === "ft3") return v * 35.3147;
    return v;
  }

  const displayVolume = convertVolume(volume).toFixed(2);
  const displayTotal = convertVolume(totalVolume).toFixed(2);

  function getStructureLabel() {
    return STRUCTURES.find((s) => s.id === selectedStructure)?.label || "";
  }

  function getDimLabel() {
    if (isCylinder) {
      return `เส้นผ่าศูนย์กลาง ${dims.diameter} × สูง ${dims.height} ม.`;
    }
    return `${dims.length} × ${dims.width} × ${dims.height} ม.`;
  }

  function handleSave() {
    addHistory({
      type: "volume",
      title: `${getStructureLabel()}`,
      subtitle: getStructureLabel(),
      result: displayTotal,
      unit: getUnitLabel(),
      details: {
        structure: getStructureLabel(),
        dimensions: getDimLabel(),
        volume: displayVolume,
        wastage: wastagePercent,
        total: displayTotal,
      },
    });
    setSaved(true);
    toast.success("บันทึกแล้ว!", { description: "ผลการคำนวณถูกบันทึกในประวัติแล้ว" });
  }

  const steps = ["รูปแบบ", "กรอกขนาด", "ผลลัพธ์"];

  // Cement per 1 m3 (approx)
  const cementBags = Math.ceil(totalVolume * 7); // ~7 bags per m3
  const sand = (totalVolume * 0.48).toFixed(2);
  const gravel = (totalVolume * 0.64).toFixed(2);
  const water = Math.round(totalVolume * 175);

  return (
    <div className="flex flex-col min-h-dvh bg-[#F5F7FA]">
      {/* Header */}
      <div className="app-header">
        <button onClick={() => (step === 0 ? navigate("/") : setStep(step - 1))} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-white font-bold text-base flex-1 text-center" style={{ fontFamily: "'Sarabun', sans-serif" }}>
          คำนวณปริมาณคอนกรีต
        </h1>
        <div className="w-8" />
      </div>

      {/* Step indicator */}
      <div className="bg-white px-4 shadow-sm">
        <StepIndicator current={step} steps={steps} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Step 0: Select structure */}
        {step === 0 && (
          <div className="p-4 animate-slide-up">
            <h2 className="font-bold text-gray-800 text-base mb-3" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              เลือกประเภทโครงสร้าง
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {STRUCTURES.map((s) => {
                const Icon = s.icon;
                const sel = selectedStructure === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStructure(s.id)}
                    className="structure-card"
                    style={{
                      borderColor: sel ? "#1E56C8" : "#E5E7EB",
                      background: sel ? "#EEF3FC" : "white",
                    }}
                  >
                    <Icon selected={sel} />
                    <span
                      className="text-xs text-center leading-tight"
                      style={{
                        color: sel ? "#1E56C8" : "#374151",
                        fontFamily: "'Sarabun', sans-serif",
                        fontWeight: sel ? 600 : 400,
                      }}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Unit selector */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 text-sm mb-2" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                หน่วยการแสดงผล
              </h3>
              <div className="relative">
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="calc-input appearance-none pr-10"
                  style={{ fontFamily: "'Sarabun', sans-serif" }}
                >
                  {UNITS.map((u) => (
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

            <div className="mt-5">
              <button className="btn-primary" onClick={() => setStep(1)}>
                ถัดไป
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Enter dimensions */}
        {step === 1 && (
          <div className="p-4 animate-slide-up">
            <h2 className="font-bold text-gray-800 text-base mb-1" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              {getStructureLabel()}
            </h2>

            {isCylinder ? <CylinderDiagram /> : <SlabDiagram />}

            <div className="space-y-3 mt-2">
              {!isCylinder && (
                <>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-700 w-28 flex-shrink-0" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                      ยาว (L)
                    </label>
                    <input
                      type="number"
                      value={dims.length}
                      onChange={(e) => setDims({ ...dims, length: e.target.value })}
                      className="calc-input flex-1"
                      inputMode="decimal"
                    />
                    <span className="text-sm text-gray-500 w-6" style={{ fontFamily: "'Sarabun', sans-serif" }}>ม.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-700 w-28 flex-shrink-0" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                      กว้าง (W)
                    </label>
                    <input
                      type="number"
                      value={dims.width}
                      onChange={(e) => setDims({ ...dims, width: e.target.value })}
                      className="calc-input flex-1"
                      inputMode="decimal"
                    />
                    <span className="text-sm text-gray-500 w-6" style={{ fontFamily: "'Sarabun', sans-serif" }}>ม.</span>
                  </div>
                </>
              )}
              {isCylinder && (
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-700 w-28 flex-shrink-0" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    เส้นผ่าศูนย์กลาง (D)
                  </label>
                  <input
                    type="number"
                    value={dims.diameter}
                    onChange={(e) => setDims({ ...dims, diameter: e.target.value })}
                    className="calc-input flex-1"
                    inputMode="decimal"
                  />
                  <span className="text-sm text-gray-500 w-6" style={{ fontFamily: "'Sarabun', sans-serif" }}>ม.</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-700 w-28 flex-shrink-0" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                  {isCylinder ? "สูง (H)" : "สูง/หนา (H)"}
                </label>
                <input
                  type="number"
                  value={dims.height}
                  onChange={(e) => setDims({ ...dims, height: e.target.value })}
                  className="calc-input flex-1"
                  inputMode="decimal"
                />
                <span className="text-sm text-gray-500 w-6" style={{ fontFamily: "'Sarabun', sans-serif" }}>ม.</span>
              </div>
            </div>

            {/* Running total */}
            <div className="mt-4 bg-white rounded-xl p-3.5 flex items-center justify-between">
              <span className="text-gray-600 font-medium" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                รวมปริมาตร
              </span>
              <span className="font-bold text-[#1E56C8] text-lg" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                {displayVolume} {getUnitLabel()}
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => setStep(0)}>
                ย้อนกลับ
              </button>
              <button
                className="btn-primary flex-1"
                onClick={() => setStep(2)}
                disabled={volume <= 0}
                style={{ opacity: volume <= 0 ? 0.5 : 1 }}
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
            <div className="result-highlight mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    ปริมาตรคอนกรีตที่ต้องใช้
                  </p>
                  <p className="text-white font-bold text-3xl mt-1" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {displayVolume} <span className="text-xl">{getUnitLabel()}</span>
                  </p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M2 22 L14 10 L26 22 L26 28 L2 28 Z" fill="white" opacity="0.7" />
                    <path d="M2 22 L14 10 L26 22" stroke="white" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-3" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                รายละเอียด
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>รูปแบบ</span>
                  <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {getStructureLabel()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>ขนาด</span>
                  <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {getDimLabel()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>ปริมาตร</span>
                  <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {displayVolume} {getUnitLabel()}
                  </span>
                </div>
              </div>

              {/* Wastage */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    เผื่อสูญเสีย
                  </span>
                  <div className="relative">
                    <select
                      value={wastage}
                      onChange={(e) => setWastage(e.target.value)}
                      className="text-sm font-semibold text-[#1E56C8] bg-[#EEF3FC] rounded-lg px-3 py-1 pr-7 appearance-none border-none outline-none"
                      style={{ fontFamily: "'Sarabun', sans-serif" }}
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                    </select>
                    <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="#1E56C8" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    ปริมาตรรวม (เผื่อสูญเสีย {wastage}%)
                  </span>
                  <span className="font-bold text-[#27AE60] text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {displayTotal} {getUnitLabel()}
                  </span>
                </div>
              </div>
            </div>

            {/* Material estimate */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-1" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                อ้างอิงปริมาณคอนกรีต
              </h3>
              <p className="text-gray-400 text-xs mb-3" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                คอนกรีต 1 ม³ จะได้ประมาณ
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "ปูนซีเมนต์", value: `${cementBags} ถุง`, icon: "🏗️", color: "#F3F4F6" },
                  { label: "ทราย", value: `${sand} ม³`, icon: "🟡", color: "#FFFBEB" },
                  { label: "หิน", value: `${gravel} ม³`, icon: "⬛", color: "#F3F4F6" },
                  { label: "น้ำ", value: `${water} ลิตร`, icon: "💧", color: "#EFF6FF" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl p-2 text-center"
                    style={{ background: m.color }}
                  >
                    <div className="text-xl mb-1">{m.icon}</div>
                    <p className="text-xs text-gray-500" style={{ fontFamily: "'Sarabun', sans-serif" }}>{m.label}</p>
                    <p className="text-xs font-bold text-gray-700" style={{ fontFamily: "'Sarabun', sans-serif" }}>{m.value}</p>
                  </div>
                ))}
              </div>
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
                className="btn-primary flex-1 flex items-center justify-center gap-2"
                onClick={() => navigate("/mix")}
              >
                คำนวณอัตราส่วนผสม
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
