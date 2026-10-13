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
          <div data-reveal>
            <span className="track-label mono">{t("contact")}</span>
            <h2 className="section-title">{t("contact")}</h2>
          </div>
          <p className="section-lede" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {t("contactLede")}
          </p>
        </div>

        <div className={styles.actions} data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          <a href={site.telegram} target="_blank" rel="noreferrer" className={styles.primary} data-cursor="TG">
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
          © {site.year} {site.name} · {t("footer")}
        </p>
      </div>
    </section>
  );
}
