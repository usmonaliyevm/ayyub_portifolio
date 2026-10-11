"use client";

import { Timeline } from "./Timeline";
import { useLang } from "./LangProvider";

export function TimelineHost() {
  const { t } = useLang();
  return (
    <Timeline
      clips={[
        { id: "intro", label: t("clipIntro"), track: "v" },
        { id: "work", label: t("work"), track: "c" },
        { id: "cuts", label: t("cuts"), track: "v" },
        { id: "about", label: t("about"), track: "v" },
        { id: "contact", label: t("contact"), track: "v" },
      ]}
    />
  );
}
