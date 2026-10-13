"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { aboutFacts, basePath, clients } from "@/content/site";
import styles from "./About.module.css";

export function About() {
  const { lang, t } = useLang();
  return (
    <section id="about" className="section" style={{ "--accent": "var(--muted)" } as React.CSSProperties}>
      <div className="wrap">
        <div className="section-head">
          <div data-reveal>
            <span className="track-label mono">{t("about")}</span>
            <h2 className="section-title">{t("about")}</h2>
          </div>
          <p className={`section-lede ${styles.body}`} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {t("aboutBody")}
          </p>
        </div>

        {/* Raqamlar: montaj dasturidagi klip kartalari kabi */}
        <ul className={styles.facts}>
          {aboutFacts.map((f, i) => (
            <li key={f.value} className={styles.fact} data-reveal style={{ "--i": i + 2 } as React.CSSProperties}>
              <strong>{f.value}</strong>
              <span>{f.label[lang]}</span>
            </li>
          ))}
        </ul>

        {clients.length > 0 && (
          <div className={styles.clients} data-reveal style={{ "--i": 5 } as React.CSSProperties}>
            <span className="track-label mono">{t("clients")}</span>
            <ul className={styles.logos}>
              {clients.map((c) => {
                const logo = (file: string, cls?: string) => (
                  <Image src={`${basePath}/logos/${file}`} alt={c.name} title={c.name} width={160} height={48} className={cls} />
                );
                // Juftlik bo'lsa ikkalasi ham chiziladi, CSS rejimga qarab bittasini ko'rsatadi
                const img =
                  typeof c.logo === "string" ? (
                    logo(c.logo)
                  ) : (
                    <>
                      {logo(c.logo.dark, styles.forDark)}
                      {logo(c.logo.light, styles.forLight)}
                    </>
                  );
                return (
                  <li key={c.name}>
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noreferrer">
                        {img}
                      </a>
                    ) : (
                      img
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
