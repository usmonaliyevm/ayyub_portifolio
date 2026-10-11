"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import { site } from "@/content/site";
import { toTimecode } from "./timecode";
import styles from "./Hero.module.css";

export function Hero() {
  const { lang, setLang, t } = useLang();
  const [elapsed, setElapsed] = useState(0);

  // Sahifa ochilganidan beri o'tgan vaqt, montaj dasturidagi kabi
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const start = performance.now();
    let id = 0;
    const tick = () => {
      setElapsed((performance.now() - start) / 1000);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header id="intro" className={styles.hero}>
      <div className={`wrap ${styles.top}`}>
        <span className={`mono ${styles.handle}`}>{site.handle}</span>
        <span className={`mono ${styles.elapsed}`}>REC {toTimecode(elapsed)}</span>
        <div className={styles.lang} role="group" aria-label="Language">
          <button
            type="button"
            onClick={() => setLang("uz")}
            className={lang === "uz" ? styles.langOn : ""}
            aria-pressed={lang === "uz"}
          >
            UZ
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={lang === "en" ? styles.langOn : ""}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>
      </div>

      <div className={`wrap ${styles.body}`}>
        <h1 className={styles.name}>
          <span className={styles.first}>Ayyub</span>
          <span className={styles.last}>Usmonaliyev</span>
        </h1>

        {/* Ikki hunar bitta chizg'ichda: chapda kod (ko'k), o'ngda montaj (amber) */}
        <div className={styles.ruler} aria-hidden="true">
          <span className={styles.rulerTicks} />
        </div>

        <div className={styles.roles}>
          <span className={styles.roleCode}>
            <i />
            {t("role1")}
          </span>
          <span className={styles.roleCut}>
            <i />
            {t("role2")}
          </span>
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
