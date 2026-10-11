"use client";

import { useLang } from "./LangProvider";
import { tools } from "@/content/site";
import styles from "./About.module.css";

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section" style={{ "--accent": "var(--muted)" } as React.CSSProperties}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="track-label mono">{t("about")}</span>
            <h2 className="section-title">{t("about")}</h2>
          </div>
          <p className="section-lede">{t("aboutBody")}</p>
        </div>

        <div className={styles.tools}>
          <div className={styles.col} style={{ "--accent": "var(--blue)" } as React.CSSProperties}>
            <span className="track-label mono">C1 · {t("tools")}</span>
            <ul>
              {tools.code.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className={styles.col} style={{ "--accent": "var(--amber)" } as React.CSSProperties}>
            <span className="track-label mono">V1 · {t("tools")}</span>
            <ul>
              {tools.cut.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
