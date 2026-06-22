import { useLocation } from "wouter";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        fill={active ? "#1E56C8" : "none"}
        stroke={active ? "#1E56C8" : "#9CA3AF"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HistoryIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={active ? "#1E56C8" : "#9CA3AF"} strokeWidth="2" />
      <path d="M12 7V12L15 15" stroke={active ? "#1E56C8" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KnowledgeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20"
        stroke={active ? "#1E56C8" : "#9CA3AF"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z"
        stroke={active ? "#1E56C8" : "#9CA3AF"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? "#EEF3FC" : "none"}
      />
      <path d="M9 7H15M9 11H13" stroke={active ? "#1E56C8" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function BottomNav() {
  const [location, navigate] = useLocation();

  const tabs = [
    {
      path: "/",
      label: "หน้าหลัก",
      active: location === "/",
      icon: <HomeIcon active={location === "/"} />,
    },
    {
      path: "/history",
      label: "ประวัติ",
      active: location === "/history",
      icon: <HistoryIcon active={location === "/history"} />,
    },
    {
      path: "/knowledge",
      label: "ความรู้",
      active: location === "/knowledge",
      icon: <KnowledgeIcon active={location === "/knowledge"} />,
    },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all duration-150"
          style={{ color: tab.active ? "#1E56C8" : "#9CA3AF" }}
        >
          {tab.icon}
          <span
            className="text-xs font-medium"
            style={{ fontFamily: "'Sarabun', sans-serif" }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
