import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import BottomNav from "@/components/BottomNav";

function ConcreteMixerIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Drum */}
      <ellipse cx="42" cy="38" rx="22" ry="18" fill="#F59E0B" />
      <ellipse cx="42" cy="38" rx="18" ry="14" fill="#FBBF24" />
      <ellipse cx="42" cy="38" rx="14" ry="10" fill="#F59E0B" opacity="0.6" />
      {/* Stripes */}
      <path d="M28 30 Q42 22 56 30" stroke="#D97706" strokeWidth="2" fill="none" />
      <path d="M26 38 Q42 30 58 38" stroke="#D97706" strokeWidth="2" fill="none" />
      <path d="M28 46 Q42 38 56 46" stroke="#D97706" strokeWidth="2" fill="none" />
      {/* Frame */}
      <rect x="10" y="50" width="30" height="8" rx="2" fill="#6B7280" />
      <rect x="14" y="58" width="6" height="14" rx="2" fill="#4B5563" />
      <rect x="30" y="58" width="6" height="14" rx="2" fill="#4B5563" />
      {/* Wheels */}
      <circle cx="17" cy="72" r="5" fill="#374151" />
      <circle cx="17" cy="72" r="2.5" fill="#9CA3AF" />
      <circle cx="33" cy="72" r="5" fill="#374151" />
      <circle cx="33" cy="72" r="2.5" fill="#9CA3AF" />
      {/* Chute */}
      <path d="M56 50 L70 60 L72 58 L58 48 Z" fill="#9CA3AF" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="16" width="24" height="20" rx="2" fill="white" opacity="0.3" stroke="white" strokeWidth="1.5" />
      <path d="M8 16 L16 8 L40 8 L40 28 L32 36 L8 36" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M32 16 L40 8" stroke="white" strokeWidth="1.5" />
      <path d="M32 16 L32 36" stroke="white" strokeWidth="1.5" />
      <path d="M8 16 L32 16" stroke="white" strokeWidth="1.5" />
      {/* Dimension arrows */}
      <path d="M12 38 L28 38" stroke="white" strokeWidth="1" opacity="0.7" />
      <path d="M4 20 L4 32" stroke="white" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

function MixIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Cement bag */}
      <rect x="10" y="14" width="16" height="22" rx="3" fill="white" opacity="0.9" />
      <path d="M12 18 L24 18" stroke="#27AE60" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 22 L24 22" stroke="#27AE60" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 26 L20 26" stroke="#27AE60" strokeWidth="1.5" strokeLinecap="round" />
      {/* Sand/gravel */}
      <circle cx="32" cy="22" r="3" fill="white" opacity="0.7" />
      <circle cx="36" cy="26" r="2.5" fill="white" opacity="0.6" />
      <circle cx="30" cy="28" r="2" fill="white" opacity="0.8" />
      <circle cx="34" cy="30" r="3" fill="white" opacity="0.5" />
      {/* Water drops */}
      <path d="M38 14 Q40 11 42 14 Q42 17 40 17 Q38 17 38 14Z" fill="white" opacity="0.9" />
    </svg>
  );
}

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

export default function Home() {
  const [, navigate] = useLocation();
  const { history } = useApp();

  const recentHistory = history.slice(0, 3);

  return (
    <div className="flex flex-col min-h-dvh bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-[#F5F7FA] px-4 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              คำนวณคอนกรีต
            </h1>
            <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              คำนวณปริมาณคอนกรีต
              <br />
              และอัตราส่วนผสมได้อย่างแม่นยำ
            </p>
          </div>
          <div className="ml-2 mt-1">
            <ConcreteMixerIcon />
          </div>
        </div>
      </div>

      {/* Main menu cards */}
      <div className="px-4 space-y-3 animate-slide-up">
        {/* Volume Calculator Card */}
        <button
          onClick={() => navigate("/volume")}
          className="w-full bg-[#1E56C8] rounded-2xl p-4 flex items-center gap-4 text-left shadow-md active:scale-[0.98] transition-transform duration-150"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <VolumeIcon />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-base" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              คำนวณปริมาณคอนกรีต
            </h2>
            <p className="text-blue-200 text-sm mt-0.5" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              คำนวณปริมาตรคอนกรีต
              <br />
              จากขนาดโครงสร้าง
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Mix Calculator Card */}
        <button
          onClick={() => navigate("/mix")}
          className="w-full bg-[#27AE60] rounded-2xl p-4 flex items-center gap-4 text-left shadow-md active:scale-[0.98] transition-transform duration-150"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <MixIcon />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-base" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              หาอัตราส่วนผสมคอนกรีต
            </h2>
            <p className="text-green-200 text-sm mt-0.5" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              คำนวณอัตราส่วนวัสดุ
              <br />
              ตามกำลังอัดที่ต้องการ
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* History section */}
      <div className="px-4 mt-5 pb-24 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-base" style={{ fontFamily: "'Sarabun', sans-serif" }}>
            ประวัติการคำนวณ
          </h3>
          <button
            onClick={() => navigate("/history")}
            className="text-[#1E56C8] text-sm font-medium"
            style={{ fontFamily: "'Sarabun', sans-serif" }}
          >
            ดูทั้งหมด &gt;
          </button>
        </div>

        {recentHistory.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              ยังไม่มีประวัติการคำนวณ
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3.5 flex items-center gap-3 shadow-sm"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.type === "volume" ? "#EEF3FC" : "#E8F8EF" }}
                >
                  {item.type === "volume" ? <VolumeHistoryIcon /> : <MixHistoryIcon />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {item.date}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {item.type === "volume" ? "ปริมาตร" : "กำลังอัด"}
                  </p>
                  <p className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    {item.result} {item.unit}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 ml-1">
                  <path d="M9 18L15 12L9 6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
