"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ui, type Lang } from "@/content/site";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let initial: Lang = "en";
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "uz" || saved === "en") initial = saved;
      else if (/^(uz|ru)/i.test(navigator.language)) initial = "uz";
    } catch {}
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  const t = (k: string) => ui[lang][k] ?? k;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
