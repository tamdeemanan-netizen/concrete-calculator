import React, { createContext, useContext, useState, useEffect } from "react";

export interface HistoryItem {
  id: string;
  type: "volume" | "mix";
  title: string;
  subtitle: string;
  date: string;
  result: string;
  unit: string;
  details: Record<string, string | number>;
}

interface AppContextType {
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, "id" | "date">) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType>({
  history: [],
  addHistory: () => {},
  clearHistory: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem("concrete_history");
      return saved ? JSON.parse(saved) : getDefaultHistory();
    } catch {
      return getDefaultHistory();
    }
  });

  useEffect(() => {
    localStorage.setItem("concrete_history", JSON.stringify(history));
  }, [history]);

  const addHistory = (item: Omit<HistoryItem, "id" | "date">) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 50));
  };

  const clearHistory = () => setHistory([]);

  return (
    <AppContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

function getDefaultHistory(): HistoryItem[] {
  return [
    {
      id: "1",
      type: "volume",
      title: "พื้นคอนกรีตโรงจอดรถ",
      subtitle: "กรงสี่เหลี่ยม",
      date: "20/05/2567 14.30",
      result: "2.40",
      unit: "ม³",
      details: { length: 4, width: 3, height: 0.2 },
    },
    {
      id: "2",
      type: "mix",
      title: "คอนกรีตกำลังอัด 240 ksc",
      subtitle: "คอนกรีตทั่วไป",
      date: "20/05/2567 10.15",
      result: "240",
      unit: "ksc",
      details: { strength: 240, usage: "คอนกรีตทั่วไป" },
    },
    {
      id: "3",
      type: "volume",
      title: "เสาคอนกรีต",
      subtitle: "กรงกระบอก",
      date: "19/05/2567 16.45",
      result: "0.68",
      unit: "ม³",
      details: { diameter: 0.6, height: 2.4 },
    },
  ];
}
