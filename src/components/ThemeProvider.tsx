"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";
type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const ThemeContext = createContext<Ctx>({ theme: "dark", setTheme: () => {}, toggle: () => {} });

/* Store: localStorage("theme") yoki tizim sozlamasi. Serverda doim "dark" (brend rangi). */
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  mq.addEventListener("change", fn);
  return () => {
    listeners.delete(fn);
    mq.removeEventListener("change", fn);
  };
};
function readTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  } catch {}
  return "dark";
}
function writeTheme(t: Theme) {
  try {
    localStorage.setItem("theme", t);
  } catch {}
  listeners.forEach((fn) => fn());
}
const serverTheme = (): Theme => "dark";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((t: Theme) => writeTheme(t), []);
  const toggle = useCallback(() => writeTheme(theme === "dark" ? "light" : "dark"), [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
