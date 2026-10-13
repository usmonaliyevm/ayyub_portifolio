"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { useMode } from "./ModeProvider";
import { useTheme } from "./ThemeProvider";
import { langs, site } from "@/content/site";
import { FPS, toTimecode } from "./timecode";
import styles from "./Hero.module.css";

export function Hero() {
  const { lang, setLang, t } = useLang();
  const { open } = useMode();
  const { theme, toggle } = useTheme();
  const [hovering, setHovering] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const rec = useRef<HTMLSpanElement>(null);

  // REC hisoblagich: sahifa ochilganidan beri. State emas, to'g'ridan-to'g'ri DOM,
  // shunda butun Hero har kadrda qayta render bo'lmaydi.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      if (document.hidden || !rec.current) return;
      rec.current.textContent = toTimecode((performance.now() - start) / 1000);
    }, 1000 / FPS);
    return () => window.clearInterval(id);
  }, []);

  // A/B wipe: kursor x o'rni ismni ikki rangga bo'ladi (chap: kod, o'ng: montaj)
  const onMove = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    el.style.setProperty("--wipe", `${(x * 100).toFixed(2)}%`);
  };

  return (
    <header id="intro" className={styles.hero}>
      <div className={`wrap ${styles.top}`}>
        <span className={`mono ${styles.handle}`}>{site.handle}</span>
        <span className={`mono ${styles.elapsed}`}>
          <i className={styles.recDot} />
          REC <span ref={rec}>{toTimecode(0)}</span>
        </span>
        <button type="button" className={styles.theme} onClick={toggle} aria-label={t("theme")} title={t("theme")} data-cursor={theme === "dark" ? "LIGHT" : "DARK"}>
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
        <div className={styles.lang} role="group" aria-label={t("language")}>
          {langs.map((l) => (
            <button key={l} type="button" onClick={() => setLang(l)} className={lang === l ? styles.langOn : ""} aria-pressed={lang === l}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stage}
        className={`wrap ${styles.body} ${hovering ? styles.live : ""}`}
        onPointerMove={onMove}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        {/* Ism ikki qatlamda: pastki krem, ustki (chap tomon) kulrang-yashil, wipe bilan kesiladi */}
        <h1 className={styles.name}>
          <span className={styles.layerBase}>
            <span className={styles.first}>Muhammadayyub</span>
            <span className={styles.last}>Usmonaliyev</span>
          </span>
          <span className={styles.layerCode} aria-hidden="true">
            <span className={styles.first}>Muhammadayyub</span>
            <span className={styles.last}>Usmonaliyev</span>
          </span>
          <span className={styles.wipeLine} aria-hidden="true">
            <b>C1</b>
            <b>V1</b>
          </span>
        </h1>

        <div className={styles.ruler} aria-hidden="true">
          <span className={styles.rulerTicks} />
        </div>

        <div className={styles.roles}>
          <button type="button" className={styles.roleCode} onClick={() => open("coding")} data-cursor="C1">
            <i />
            {t("role1")}
          </button>
          <button type="button" className={styles.roleCut} onClick={() => open("montaj")} data-cursor="V1">
            <i />
            {t("role2")}
          </button>
        </div>

        <p className={styles.tagline}>{t("tagline")}</p>
        <p className={styles.lede}>{t("lede")}</p>

        <a href="#work" className={`mono ${styles.scroll}`}>
          {t("scroll")} ↓
        </a>
      </div>
    </header>
  );
}
