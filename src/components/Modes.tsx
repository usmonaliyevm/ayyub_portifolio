"use client";

import { useLang } from "./LangProvider";
import { useMode } from "./ModeProvider";
import { cuts, packages, projects, tools } from "@/content/site";
import { WorkList } from "./Work";
import { CutsGrid } from "./Cuts";
import styles from "./Modes.module.css";

/** Ikki oyna: Montaj (V1) va Coding (C1). Bosilgani ochiladi. */
export function Modes() {
  const { t } = useLang();
  const { mode, setMode, open } = useMode();

  const windows = [
    {
      id: "montaj" as const,
      track: "V1",
      title: t("cuts"),
      lede: t("cutsLede"),
      teaser: `${cuts.length} ${t("montajTeaser")}`,
      accent: "var(--red-bright)",
      fill: "var(--red)",
    },
    {
      id: "coding" as const,
      track: "C1",
      title: t("work"),
      lede: t("workLede"),
      teaser: `${projects.length + packages.length} ${t("codingTeaser")}`,
      accent: "var(--sage-bright)",
      fill: "var(--sage)",
    },
  ];

  return (
    <section id="work" className={`section ${styles.section}`}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="track-label mono" style={{ "--accent": "var(--text)" } as React.CSSProperties}>
              V1 + C1 · {t("choose")}
            </span>
            <h2 className="section-title">{t("choose")}</h2>
          </div>
          <p className="section-lede">{t("chooseLede")}</p>
        </div>

        <div className={styles.windows} data-mode={mode ?? "none"}>
          {windows.map((w) => {
            const isOpen = mode === w.id;
            return (
              <button
                key={w.id}
                type="button"
                id={`win-${w.id}`}
                className={`${styles.window} ${isOpen ? styles.open : ""}`}
                style={{ "--accent": w.accent, "--fill": w.fill } as React.CSSProperties}
                onClick={() => (isOpen ? setMode(null) : open(w.id))}
                aria-expanded={isOpen}
                aria-controls={`panel-${w.id}`}
              >
                <span className={styles.titlebar}>
                  <span className={styles.dots} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mono">{w.track}</span>
                </span>
                <span className={styles.windowBody}>
                  <span className={styles.windowTitle}>{w.title}</span>
                  <span className={styles.windowLede}>{w.lede}</span>
                </span>
                <span className={styles.windowFoot}>
                  <span className="mono">{w.teaser}</span>
                  <span className={styles.cta}>{isOpen ? t("closeWindow") : t("openWindow")} {isOpen ? "✕" : "→"}</span>
                </span>
              </button>
            );
          })}
        </div>

        {mode === "montaj" && (
          <div id="panel-montaj" className={styles.panel} style={{ "--accent": "var(--red-bright)" } as React.CSSProperties}>
            <CutsGrid />
            <ToolRow label={`V1 · ${t("tools")}`} items={tools.cut} />
          </div>
        )}

        {mode === "coding" && (
          <div id="panel-coding" className={styles.panel} style={{ "--accent": "var(--sage-bright)" } as React.CSSProperties}>
            <WorkList />
            <ToolRow label={`C1 · ${t("tools")}`} items={tools.code} />
          </div>
        )}
      </div>
    </section>
  );
}

function ToolRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className={styles.tools}>
      <span className="track-label mono">{label}</span>
      <ul>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}
