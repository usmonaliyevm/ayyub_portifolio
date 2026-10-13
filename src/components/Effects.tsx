"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./Effects.module.css";

const FINE = "(hover: hover) and (pointer: fine)";
const REDUCE = "(prefers-reduced-motion: reduce)";

/* Maxsus kursor faqat sichqonchali va harakatga ruxsat bergan qurilmalarda */
function subscribeCursor(fn: () => void) {
  const a = window.matchMedia(FINE);
  const b = window.matchMedia(REDUCE);
  a.addEventListener("change", fn);
  b.addEventListener("change", fn);
  return () => {
    a.removeEventListener("change", fn);
    b.removeEventListener("change", fn);
  };
}
const cursorEnabled = () => window.matchMedia(FINE).matches && !window.matchMedia(REDUCE).matches;
const cursorDisabled = () => false;

/**
 * Sahifa darajasidagi effektlar:
 * 1) scroll reveal — [data-reveal] elementlar ko'ringanda .is-in oladi
 * 2) maxsus kursor — playhead nuqta, hoverda matn (data-cursor)
 */
export function Effects() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const enabled = useSyncExternalStore(subscribeCursor, cursorEnabled, cursorDisabled);

  // 1) Reveal
  useEffect(() => {
    const reduce = window.matchMedia(REDUCE).matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    // Keyin qo'shilgan elementlar (oyna ochilganda) uchun
    const mo = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // 2) Kursor. html.has-cursor klassi CSS'da tizim kursorini yashiradi.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    let tx = -100, ty = -100, rx = -100, ry = -100;
    let raf = 0;
    const place = () => {
      if (dot.current) dot.current.style.transform = `translate(${tx}px, ${ty}px)`;
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
      place();
    };
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      tx = -100;
      ty = -100;
      setLabel("");
      place();
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} className={styles.dot} aria-hidden="true" />
      <div ref={ring} className={`${styles.ring} ${label ? styles.ringLabel : ""}`} aria-hidden="true">
        <span>{label}</span>
      </div>
    </>
  );
}
