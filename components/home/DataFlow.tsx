"use client";

import { useEffect, useState } from "react";
import styles from "./DataFlow.module.css";

const STEPS = [
  {
    eyebrow: "Vstup",
    title: "Vaše systémy",
    body: "Legacy DB, ERP, e‑shop, Excel.",
    caption: "Připojíme se přímo na to, co máte — i bez API.",
    tone: "",
  },
  {
    eyebrow: "Integrační vrstva",
    title: "Vlastní linka + Python",
    body: "Přenos, sanitace, validace.",
    caption: "Data projdou vlastní linkou, sanitací a validací.",
    tone: styles.cardDark,
  },
  {
    eyebrow: "Datová vrstva",
    title: "BigQuery + AI modely",
    body: "Sklad a AI bez vendor lock‑inu.",
    caption: "Uloží se do BigQuery, AI modely jsou vyměnitelné.",
    tone: "",
  },
  {
    eyebrow: "Výstup",
    title: "Dashboardy a automatizace",
    body: "Looker Studio, překlady, CRM.",
    caption: "Výstup: dashboardy, překlady, vyplněné CRM.",
    tone: styles.cardOutput,
  },
] as const;

const INTERVAL_MS = 2600;

export function DataFlow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % STEPS.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.grid}>
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className={[styles.card, step.tone, i === active ? styles.cardActive : ""]
              .filter(Boolean)
              .join(" ")}
            onMouseEnter={() => setActive(i)}
          >
            <span className={styles.eyebrow}>{step.eyebrow}</span>
            <strong className={styles.title}>{step.title}</strong>
            <p className={styles.body}>{step.body}</p>
          </div>
        ))}
      </div>
      <div className={styles.track}>
        <div
          className={styles.bar}
          style={{ width: `${((active + 1) * 100) / STEPS.length}%` }}
        />
      </div>
      <p className={styles.caption} aria-live="polite">
        {STEPS[active].caption}
      </p>
    </div>
  );
}
