"use client";

import { useLang } from "./LangProvider";
import { site } from "@/content/site";
import styles from "./Contact.module.css";

export function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="section" style={{ "--accent": "var(--amber)" } as React.CSSProperties}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="track-label mono">{t("contact")}</span>
            <h2 className="section-title">{t("contact")}</h2>
          </div>
          <p className="section-lede">{t("contactLede")}</p>
        </div>

        <div className={styles.actions}>
          <a href={site.telegram} target="_blank" rel="noreferrer" className={styles.primary}>
            {t("writeTelegram")} ↗
          </a>
          <a href={`mailto:${site.email}`} className={styles.secondary}>
            {t("sendEmail")}
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className={styles.secondary}>
            GitHub ↗
          </a>
        </div>

        <p className={`mono ${styles.footer}`}>
          © 2026 {site.name} · {t("footer")}
        </p>
      </div>
    </section>
  );
}
