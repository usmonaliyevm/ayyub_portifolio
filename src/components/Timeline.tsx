"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { toTimecode } from "./timecode";
import styles from "./Timeline.module.css";

export type Clip = {
  id: string;
  label: string;
  track: "v" | "c";
  /** O'lchanadigan element; berilmasa id ishlatiladi */
  el?: string;
  /** Element balandligining qaysi qismi (0..1) shu klipga tegishli */
  from?: number;
  to?: number;
  onClick?: () => void;
};

/** Butun sahifa "davomiyligi" soniyalarda. Faqat timecode ko'rinishi uchun. */
const TOTAL = 150;

type Seg = Clip & { start: number; end: number };

export function Timeline({ clips }: { clips: Clip[] }) {
  const { t } = useLang();
  const [segs, setSegs] = useState<Seg[]>([]);
  const [progress, setProgress] = useState(0);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const raf = useRef<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  // Sudrash va oddiy bosishni ajratish: 4px dan ko'p siljisa bu scrub
  const press = useRef<{ x: number; moved: boolean } | null>(null);

  // Har bir bo'limning sahifadagi haqiqiy ulushini o'lchaymiz
  useEffect(() => {
    const measure = () => {
      const docH = document.documentElement.scrollHeight;
      const next = clips
        .map((c) => {
          const el = document.getElementById(c.el ?? c.id);
          if (!el) return null;
          const top = el.offsetTop + el.offsetHeight * (c.from ?? 0);
          const bottom = el.offsetTop + el.offsetHeight * (c.to ?? 1);
          return { ...c, start: top / docH, end: bottom / docH };
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
  const head = Math.min(1, Math.max(0, progress));
  const pos = first + head * span;
  const active =
    segs.find((s) => pos >= s.start && pos < s.end) ??
    (segs.length && pos >= segs[segs.length - 1].start ? segs[segs.length - 1] : undefined);

  // Scrub: trekning istalgan nuqtasiga bosish yoki sudrash sahifani o'sha joyga olib boradi
  const scrubTo = (clientX: number) => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: x * max, behavior: "instant" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    press.current = { x: e.clientX, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    // Bo'sh joyga bosilsa darhol o'sha joyga o'tamiz; klip ustida esa sudrashni kutamiz
    if (!(e.target as HTMLElement).closest("a")) {
      setDragging(true);
      scrubTo(e.clientX);
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const r = track.current?.getBoundingClientRect();
    if (r) setHoverX(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    const p = press.current;
    if (!p) return;
    if (!p.moved && Math.abs(e.clientX - p.x) > 4) {
      p.moved = true;
      setDragging(true);
    }
    if (p.moved) scrubTo(e.clientX);
  };
  const onPointerUp = () => {
    setDragging(false);
    // moved bayrog'i click hodisasigacha saqlanib turadi
    setTimeout(() => (press.current = null), 0);
  };

  return (
    <nav className={styles.bar} aria-label="Page timeline">
      <div className={styles.tc}>
        <span className={styles.rec} aria-hidden="true" />
        <span className={styles.tcText}>{toTimecode(head * TOTAL)}</span>
      </div>
      <div
        ref={track}
        className={`${styles.track} ${dragging ? styles.dragging : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => {
          setHoverX(null);
          setDragging(false);
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {segs.map((s, i) => {
          const left = ((s.start - first) / span) * 100;
          const width = ((s.end - s.start) / span) * 100;
          const isActive = active?.id === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.el ?? s.id}`}
              onClick={(e) => {
                if (press.current?.moved) {
                  e.preventDefault();
                  return;
                }
                if (!s.onClick) return;
                e.preventDefault();
                s.onClick();
              }}
              className={`${styles.clip} ${s.track === "c" ? styles.clipCode : styles.clipVideo} ${isActive ? styles.active : ""}`}
              style={{ left: `${left}%`, width: `calc(${width}% - 3px)`, "--i": i } as React.CSSProperties}
              aria-current={isActive ? "location" : undefined}
              draggable={false}
            >
              <span className={styles.clipLabel}>{s.label}</span>
            </a>
          );
        })}
        {hoverX !== null && !dragging && (
          <span className={styles.ghost} style={{ left: `${hoverX * 100}%` }} aria-hidden="true">
            <i>{toTimecode(hoverX * TOTAL)}</i>
          </span>
        )}
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
