"use client";

import { useLang } from "./LangProvider";

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section" style={{ "--accent": "var(--muted)" } as React.CSSProperties}>
      <div className="wrap">
        <div className="section-head">
          <div data-reveal>
            <span className="track-label mono">{t("about")}</span>
            <h2 className="section-title">{t("about")}</h2>
          </div>
          <p className="section-lede" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {t("aboutBody")}
          </p>
        </div>
      </div>
    </section>
  );
}
