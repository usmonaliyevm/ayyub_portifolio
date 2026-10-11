"use client";

import { Timeline } from "./Timeline";
import { useLang } from "./LangProvider";
import { useMode } from "./ModeProvider";

/**
 * Timeline kliplari. "Ikki oyna" bo'limi ikkiga bo'linadi: ochiq oyna
 * butun bo'limni egallaydi, yopig'i chetda kichik yorliq bo'lib qoladi.
 */
export function TimelineHost() {
  const { t } = useLang();
  const { mode, open } = useMode();

  // Yopiq oyna ham timeline'da kichik yorliq bo'lib qoladi (10%)
  const montaj = mode === "montaj" ? [0, 0.9] : mode === "coding" ? [0, 0.1] : [0, 0.5];
  const coding = mode === "coding" ? [0.1, 1] : mode === "montaj" ? [0.9, 1] : [0.5, 1];

  return (
    <Timeline
      clips={[
        { id: "intro", label: t("clipIntro"), track: "v" },
        { id: "montaj", el: "work", from: montaj[0], to: montaj[1], label: t("cuts"), track: "v", onClick: () => open("montaj") },
        { id: "coding", el: "work", from: coding[0], to: coding[1], label: t("work"), track: "c", onClick: () => open("coding") },
        { id: "about", label: t("about"), track: "v" },
        { id: "contact", label: t("contact"), track: "v" },
      ]}
    />
  );
}
