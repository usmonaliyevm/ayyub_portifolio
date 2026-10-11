"use client";

import { useLang } from "./LangProvider";
import { projects, site } from "@/content/site";
import styles from "./Work.module.css";

export function Work() {
  const { lang, t } = useLang();
  return (
    <section id="work" className="section" style={{ "--accent": "var(--blue)" } as React.CSSProperties}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="track-label mono">C1 · {t("work")}</span>
            <h2 className="section-title">{t("work")}</h2>
          </div>
          <p className="section-lede">{t("workLede")}</p>
        </div>

        <ul className={styles.list}>
          {projects.map((p) => (
            <li key={p.id} className={styles.item}>
              <div className={styles.meta}>
                <span className="mono">{p.year}</span>
              </div>
              <div className={styles.main}>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.summary}>{p.summary[lang]}</p>
                <ul className={styles.stack} aria-label="Stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.action}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noreferrer" className={styles.link}>
                    {t("viewCode")} ↗
                  </a>
                ) : (
                  <span className={`mono ${styles.private}`}>{t("privateRepo")}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <a href={site.github} target="_blank" rel="noreferrer" className={`mono ${styles.more}`}>
          github.com/{site.handle} ↗
        </a>
      </div>
    </section>
  );
}
