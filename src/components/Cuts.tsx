"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { cuts, type Cut } from "@/content/site";
import { toTimecode } from "./timecode";
import styles from "./Cuts.module.css";

function Tile({ cut, index, onOpen }: { cut: Cut; index: number; onOpen: (c: Cut) => void }) {
  const { lang, t } = useLang();
  const [missing, setMissing] = useState(false);
  const [tc, setTc] = useState("00:00:00:00");
  const ref = useRef<HTMLVideoElement>(null);
  const src = `/videos/${cut.file}`;

  // Fayl bormi? Server 404 yoki HTML qaytarsa, placeholder ko'rsatamiz.
  // (video onError hydration'dan oldin otilib ketishi mumkin, shuning uchun HEAD)
  useEffect(() => {
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (alive && (!r.ok || !type.startsWith("video"))) setMissing(true);
      })
      .catch(() => alive && setMissing(true));
    return () => {
      alive = false;
    };
  }, [src]);

  const play = () => {
    const v = ref.current;
    if (!v || missing) return;
    v.play().catch(() => {});
  };
  const pause = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setTc("00:00:00:00");
  };
  const onTime = () => {
    const v = ref.current;
    if (!v) return;
    setTc(toTimecode(v.currentTime));
  };

  return (
    <li className={styles.tile} data-aspect={cut.aspect} data-reveal style={{ "--i": index } as React.CSSProperties}>
      {missing ? (
        <div className={styles.missing} style={{ aspectRatio: cut.aspect }}>
          <span className="mono">{cut.file}</span>
          <strong>{t("missingVideo")}</strong>
          <span className={styles.hint}>{t("missingHint")}</span>
        </div>
      ) : (
        <button
          type="button"
          className={styles.btn}
          style={{ aspectRatio: cut.aspect }}
          onMouseEnter={play}
          onMouseLeave={pause}
          onFocus={play}
          onBlur={pause}
          onClick={() => onOpen(cut)}
          aria-label={`${t("play")}: ${cut.title[lang]}`}
          data-cursor={t("play").toUpperCase()}
        >
          <video
            ref={ref}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setMissing(true)}
            onTimeUpdate={onTime}
          />
          <span className={`mono ${styles.tc}`} aria-hidden="true">
            {tc}
          </span>
          <span className={styles.frame} aria-hidden="true" />
          <span className={styles.playIcon} aria-hidden="true">
            ▶
          </span>
        </button>
      )}
      <div className={styles.caption}>
        <strong>{cut.title[lang]}</strong>
        <span className="mono">
          {cut.kind[lang]} · {cut.tools.join(", ")}
        </span>
      </div>
    </li>
  );
}

/** Montaj oynasi tarkibi: video kartalar va lightbox */
export function CutsGrid() {
  const { lang, t } = useLang();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Cut | null>(null);

  const show = (c: Cut) => {
    setOpen(c);
    dialog.current?.showModal();
  };
  const hide = () => {
    dialog.current?.close();
    setOpen(null);
  };

  return (
    <div>
      <ul className={styles.grid}>
        {cuts.map((c, i) => (
          <Tile key={c.id} cut={c} index={i} onOpen={show} />
        ))}
      </ul>

      <dialog ref={dialog} className={styles.dialog} onClose={() => setOpen(null)}>
        {open && (
          <div className={styles.dialogBody}>
            <div className={styles.dialogHead}>
              <strong>{open.title[lang]}</strong>
              <button type="button" onClick={hide} className={styles.close}>
                {t("close")} ✕
              </button>
            </div>
            <video
              src={`/videos/${open.file}`}
              controls
              autoPlay
              playsInline
              style={{ aspectRatio: open.aspect }}
            />
          </div>
        )}
      </dialog>
    </div>
  );
}
