"use client";

import { useLang } from "./LangProvider";
import { packages, projects, site } from "@/content/site";
import styles from "./Work.module.css";

/** Coding oynasi tarkibi: loyihalar va pub.dev paketlari */
export function WorkList() {
  const { lang, t } = useLang();
  return (
    <div>
      <span className="track-label mono">{t("projects")}</span>
      <ul className={styles.list}>
        {projects.map((p, i) => (
          <li key={p.id} className={styles.item} data-reveal style={{ "--i": i } as React.CSSProperties}>
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
                <a href={p.url} target="_blank" rel="noreferrer" className={styles.link} data-cursor="GITHUB">
                  {t("viewCode")} ↗
                </a>
              ) : (
                <span className={`mono ${styles.private}`}>{t("privateRepo")}</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <span className={`track-label mono ${styles.packagesLabel}`}>{t("packages")}</span>
      <ul className={styles.list}>
        {packages.map((p, i) => (
          <li key={p.name} className={styles.item} data-reveal style={{ "--i": i } as React.CSSProperties}>
            <div className={styles.meta}>
              <span className="mono">v{p.version}</span>
            </div>
            <div className={styles.main}>
              <h3 className={`${styles.name} ${styles.pkgName}`}>{p.name}</h3>
              <p className={styles.summary}>{p.summary[lang]}</p>
              <ul className={styles.stack} aria-label="Meta">
                <li>{p.score} {t("pubScore")}</li>
                <li>Flutter</li>
              </ul>
            </div>
            <div className={`${styles.action} ${styles.actionCol}`}>
              <a href={p.url} target="_blank" rel="noreferrer" className={styles.link}>
                {t("viewPackage")} ↗
              </a>
              <a href={p.repo} target="_blank" rel="noreferrer" className={`mono ${styles.repo}`}>
                GitHub ↗
              </a>
            </div>
          </li>
        ))}
      </ul>

      <a href={site.github} target="_blank" rel="noreferrer" className={`mono ${styles.more}`}>
        github.com/{site.handle} ↗
      </a>
    </div>
  );
}
