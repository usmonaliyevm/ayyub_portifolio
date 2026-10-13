"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { ui, type Lang } from "@/content/site";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

/* Kichik tashqi store: localStorage + brauzer tili. Serverda doim "en". */
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const isLang = (v: unknown): v is Lang => v === "uz" || v === "en";

function readLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (isLang(saved)) return saved;
    if (/^(uz|ru)/i.test(navigator.language)) return "uz";
  } catch {}
  return "en";
}

function writeLang(l: Lang) {
  try {
    localStorage.setItem("lang", l);
  } catch {}
  listeners.forEach((fn) => fn());
}

const serverLang = (): Lang => "en";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, serverLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => writeLang(l), []);
  const t = useCallback((k: string) => ui[lang][k] ?? k, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
