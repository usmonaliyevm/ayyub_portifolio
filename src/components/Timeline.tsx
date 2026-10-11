"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { toTimecode } from "./timecode";
import styles from "./Timeline.module.css";

export type Clip = { id: string; label: string; track: "v" | "c" };

/** Butun sahifa "davomiyligi" soniyalarda. Faqat timecode ko'rinishi uchun. */
const TOTAL = 150;

type Seg = Clip & { start: number; end: number };

export function Timeline({ clips }: { clips: Clip[] }) {
  const { t } = useLang();
  const [segs, setSegs] = useState<Seg[]>([]);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  // Har bir bo'limning sahifadagi haqiqiy ulushini o'lchaymiz
  useEffect(() => {
    const measure = () => {
      const docH = document.documentElement.scrollHeight;
      const next = clips
        .map((c) => {
          const el = document.getElementById(c.id);
          if (!el) return null;
          const top = el.offsetTop;
          return { ...c, start: top / docH, end: (top + el.offsetHeight) / docH };
        })
        .filter(Boolean) as Seg[];
      setSegs(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [clips]);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const first = segs[0]?.start ?? 0;
  const last = segs[segs.length - 1]?.end ?? 1;
  const span = Math.max(0.0001, last - first);
  const head = Math.min(1, Math.max(0, (progress * (1 - first) + first - first) / span));
  const pos = first + head * span;
  const active =
    segs.find((s) => pos >= s.start && pos < s.end) ??
    (segs.length && pos >= segs[segs.length - 1].start ? segs[segs.length - 1] : undefined);

  return (
    <nav className={styles.bar} aria-label="Page timeline">
      <div className={styles.tc}>
        <span className={styles.rec} aria-hidden="true" />
        <span className={styles.tcText}>{toTimecode(head * TOTAL)}</span>
      </div>
      <div className={styles.track}>
        {segs.map((s) => {
          const left = ((s.start - first) / span) * 100;
          const width = ((s.end - s.start) / span) * 100;
          const isActive = active?.id === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`${styles.clip} ${s.track === "c" ? styles.clipCode : styles.clipVideo} ${isActive ? styles.active : ""}`}
              style={{ left: `${left}%`, width: `calc(${width}% - 3px)` }}
              aria-current={isActive ? "location" : undefined}
            >
              <span className={styles.clipLabel}>{s.label}</span>
            </a>
          );
        })}
        <div className={styles.playhead} style={{ left: `${head * 100}%` }} aria-hidden="true">
          <span className={styles.playheadCap} />
        </div>
      </div>
      <div className={styles.end}>
        <span className={styles.tcText}>{toTimecode(TOTAL)}</span>
        <span className={styles.srOnly}>{t("footer")}</span>
      </div>
    </nav>
  );
}
