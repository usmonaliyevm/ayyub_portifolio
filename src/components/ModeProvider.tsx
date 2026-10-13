"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Mode = "montaj" | "coding" | null;

type Ctx = { mode: Mode; setMode: (m: Mode) => void; open: (m: Exclude<Mode, null>) => void };

const ModeContext = createContext<Ctx>({ mode: null, setMode: () => {}, open: () => {} });

/** Qaysi oyna ochiq: montaj, coding yoki hech biri. URL hash bilan sinxron. */
export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h !== "montaj" && h !== "coding") return;
      setModeState(h);
      // Brauzer #montaj id'li element topolmaydi, shuning uchun oynaga o'zimiz boramiz
      requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "instant", block: "start" });
      });
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    const url = m ? `#${m}` : window.location.pathname + window.location.search;
    window.history.replaceState(null, "", url);
  }, []);

  /** Oynani ochib, unga scroll qiladi */
  const open = useCallback(
    (m: Exclude<Mode, null>) => {
      setMode(m);
      requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [setMode],
  );

  return <ModeContext.Provider value={{ mode, setMode, open }}>{children}</ModeContext.Provider>;
}

export const useMode = () => useContext(ModeContext);
