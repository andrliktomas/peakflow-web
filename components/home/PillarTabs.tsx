"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./PillarTabs.module.css";

type Row = { label: string; value: string; status: string };

type Pillar = {
  num: string;
  title: string;
  eyebrow: string;
  headline: string;
  body: string;
  tags: string[];
  demoTitle: string;
  rows: Row[];
};

const PILLARS: Pillar[] = [
  {
    num: "I",
    title: "Datová analytika",
    eyebrow: "Pilíř I",
    headline: "Datová analytika a reporting",
    body: "Napojení na legacy i moderní systémy, sanitace, BigQuery a Looker Studio dashboardy.",
    tags: ["prodejní analytika", "RFM segmentace", "ABC analýza"],
    demoTitle: "Pipeline · noční běh",
    rows: [
      { label: "Legacy DB (MSSQL)", value: "12 480 řádků načteno", status: "OK" },
      { label: "Sanitace", value: "duplicity: 312 odstraněno", status: "OK" },
      { label: "BigQuery", value: "tabulka sales_daily aktualizována", status: "OK" },
      { label: "Looker Studio", value: "dashboard obnoven 06:02", status: "LIVE" },
    ],
  },
  {
    num: "II",
    title: "AI automatizace",
    eyebrow: "Pilíř II",
    headline: "AI automatizace procesů",
    body: "Překlady, bannery, kampaně a kategorizace produktů — Python, Make a n8n, modely od více dodavatelů.",
    tags: ["překlady", "bannery z Figmy", "extrakce z PDF"],
    demoTitle: "Nový produkt · překlad",
    rows: [
      { label: "Produkt", value: "Vrtačka aku 18V — CS", status: "vstup" },
      { label: "Slovník", value: "„aku“ → „Akku“ (DE), „cordless“ (EN)", status: "OK" },
      { label: "Překlad DE", value: "Akku‑Bohrschrauber 18V", status: "OK" },
      { label: "Banner", value: "Figma šablona → 3 formáty", status: "OK" },
    ],
  },
  {
    num: "III",
    title: "Obchod a CRM",
    eyebrow: "Pilíř III",
    headline: "Obchodní procesy a CRM",
    body: "AI čte e‑maily a hovory, Make zapíše údaje do Raynetu, obchodník jen potvrdí.",
    tags: ["Raynet", "Make scénáře", "human‑in‑the‑loop"],
    demoTitle: "Raynet · nový obchodní případ",
    rows: [
      { label: "Zdroj", value: "hovor 14:32, 11 min — přepis", status: "OK" },
      { label: "Kontakt", value: "Ing. Novák, Alfa s.r.o.", status: "OK" },
      { label: "Hodnota", value: "180 000 Kč · fáze: nabídka", status: "OK" },
      { label: "Obchodník", value: "čeká na potvrzení", status: "1 KLIK" },
    ],
  },
];

const STEP_MS = 700;

export function PillarTabs() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const active = PILLARS[index];

  // One row lights up per beat; stops once every row is done.
  useEffect(() => {
    if (tick > active.rows.length) return;
    const id = window.setTimeout(() => setTick((t) => t + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [tick, active.rows.length]);

  const select = (i: number) => {
    setIndex(i);
    setTick(0);
  };

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Pilíře služeb">
        {PILLARS.map((pillar, i) => (
          <button
            key={pillar.num}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls="pillar-panel"
            className={`${styles.tab} ${i === index ? styles.tabActive : ""}`}
            onClick={() => select(i)}
          >
            <span className={styles.tabNum}>{pillar.num}</span>
            {pillar.title}
          </button>
        ))}
      </div>

      <div className={styles.panel} id="pillar-panel" role="tabpanel">
        <div>
          <p className={styles.eyebrow}>{active.eyebrow}</p>
          <h3 className={styles.headline}>{active.headline}</h3>
          <p className={styles.body}>{active.body}</p>
          <div className={styles.tags}>
            {active.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <Link href="/sluzby/" className={styles.detailLink}>
            Detail služby →
          </Link>
        </div>

        <div className={styles.demo}>
          <div className={styles.demoHead}>
            <span>{active.demoTitle}</span>
            <span className={styles.live}>
              <span className={styles.liveDot} aria-hidden="true" />
              live
            </span>
          </div>
          <div className={styles.rows}>
            {active.rows.map((row, i) => {
              const done = tick > i;
              const isFinal = i === active.rows.length - 1;
              return (
                <div
                  key={row.label}
                  className={[
                    styles.row,
                    done ? styles.rowDone : "",
                    isFinal ? styles.rowFinal : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={styles.rowLabel}>{row.label}</span>
                  <span className={styles.rowValue}>{done ? row.value : "…"}</span>
                  <span className={styles.rowStatus}>
                    {done ? row.status : "zpracovávám"}
                  </span>
                </div>
              );
            })}
          </div>
          <button type="button" className={styles.replay} onClick={() => setTick(0)}>
            ↻ Přehrát znovu
          </button>
        </div>
      </div>
    </>
  );
}
