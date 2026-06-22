import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

function VolumeHistoryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="8" width="14" height="12" rx="1" fill="#1E56C8" opacity="0.3" stroke="#1E56C8" strokeWidth="1" />
      <path d="M3 8 L8 3 L22 3 L22 15 L17 20 L3 20" stroke="#1E56C8" strokeWidth="1" fill="none" strokeLinejoin="round" />
      <path d="M17 8 L22 3" stroke="#1E56C8" strokeWidth="1" />
      <path d="M17 8 L17 20" stroke="#1E56C8" strokeWidth="1" />
      <path d="M3 8 L17 8" stroke="#1E56C8" strokeWidth="1" />
    </svg>
  );
}

function MixHistoryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5" y="7" width="9" height="14" rx="2" fill="#27AE60" opacity="0.3" stroke="#27AE60" strokeWidth="1" />
      <path d="M6 10 L13 10" stroke="#27AE60" strokeWidth="1" strokeLinecap="round" />
      <path d="M6 13 L11 13" stroke="#27AE60" strokeWidth="1" strokeLinecap="round" />
      <circle cx="20" cy="13" r="2" fill="#27AE60" opacity="0.6" />
      <circle cx="22" cy="17" r="1.5" fill="#27AE60" opacity="0.5" />
    </svg>
  );
}

export default function History() {
  const [, navigate] = useLocation();
  const { history, clearHistory } = useApp();

  function handleClear() {
    if (window.confirm("ต้องการลบประวัติทั้งหมดหรือไม่?")) {
      clearHistory();
      toast.success("ลบประวัติแล้ว");
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-[#F5F7FA]">
      {/* Header */}
      <div className="app-header">
        <button onClick={() => navigate("/")} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-white font-bold text-base flex-1 text-center" style={{ fontFamily: "'Sarabun', sans-serif" }}>
          ประวัติการคำนวณ
        </h1>
        {history.length > 0 ? (
          <button onClick={handleClear} className="text-white text-xs opacity-80" style={{ fontFamily: "'Sarabun', sans-serif" }}>
            ลบทั้งหมด
          </button>
        ) : (
          <div className="w-14" />
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" fill="#E5E7EB" />
              <path d="M32 20V32L40 40" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-gray-400 font-medium" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              ยังไม่มีประวัติการคำนวณ
            </p>
            <p className="text-gray-300 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              เริ่มคำนวณเพื่อบันทึกประวัติ
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {history.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: item.type === "volume" ? "#EEF3FC" : "#E8F8EF" }}
                  >
                    {item.type === "volume" ? <VolumeHistoryIcon /> : <MixHistoryIcon />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                        {item.title}
                      </p>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-400" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                          {item.type === "volume" ? "ปริมาตร" : "กำลังอัด"}
                        </p>
                        <p className="font-bold text-[#1E56C8] text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                          {item.result} {item.unit}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                      {item.date}
                    </p>

                    {/* Details */}
                    {item.type === "volume" && item.details.dimensions && (
                      <div className="mt-2 bg-gray-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                          ขนาด: {String(item.details.dimensions)}
                        </p>
                        {item.details.wastage !== undefined && (
                          <p className="text-xs text-gray-500" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                            เผื่อสูญเสีย: {String(item.details.wastage)}%
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "mix" && item.details.ratio && (
                      <div className="mt-2 bg-gray-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                          อัตราส่วน: {String(item.details.ratio)}
                        </p>
                        <p className="text-xs text-gray-500" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                          ปูนซีเมนต์ {String(item.details.cement)} กก. | ทราย {String(item.details.sand)} กก. | หิน {String(item.details.gravel)} กก.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
