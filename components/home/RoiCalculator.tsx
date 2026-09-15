"use client";

import Link from "next/link";
import { useId, useState } from "react";
import styles from "./RoiCalculator.module.css";

const WEEKS_PER_MONTH = 4.33;
/** Průměrný měsíční fond pracovní doby (hodin). */
const HOURS_PER_FTE_MONTH = 168;

/**
 * Czech thousands grouping, done by hand rather than via toLocaleString:
 * Node and browsers disagree on which space character cs-CZ uses, which
 * would desync the pre-rendered HTML from the first client render.
 */
function fmt(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function RoiCalculator() {
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(600);
  const [share, setShare] = useState(70);
  const id = useId();

  const monthlySaved = (hours * WEEKS_PER_MONTH * share) / 100;
  const yearlyValue = monthlySaved * 12 * rate;
  const fte = (monthlySaved / HOURS_PER_FTE_MONTH).toFixed(1).replace(".", ",");

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <div>
          <strong className={styles.introTitle}>
            Spočítejte si, co ruční práce stojí
          </strong>
          <span className={styles.introBody}>
            Reporty, překlady, přepisování do CRM — posuňte hodnoty podle sebe.
          </span>
        </div>

        <label className={styles.field} htmlFor={`${id}-hours`}>
          <span className={styles.fieldHead}>
            <span>Hodin ruční práce týdně</span>
            <strong className={styles.fieldValue}>{hours} h</strong>
          </span>
          <input
            id={`${id}-hours`}
            className={styles.slider}
            type="range"
            min={2}
            max={60}
            step={1}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
        </label>

        <label className={styles.field} htmlFor={`${id}-rate`}>
          <span className={styles.fieldHead}>
            <span>Náklad na hodinu</span>
            <strong className={styles.fieldValue}>{fmt(rate)} Kč</strong>
          </span>
          <input
            id={`${id}-rate`}
            className={styles.slider}
            type="range"
            min={300}
            max={2000}
            step={50}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </label>

        <label className={styles.field} htmlFor={`${id}-share`}>
          <span className={styles.fieldHead}>
            <span>Podíl, který lze automatizovat</span>
            <strong className={styles.fieldValue}>{share} %</strong>
          </span>
          <input
            id={`${id}-share`}
            className={styles.slider}
            type="range"
            min={30}
            max={95}
            step={5}
            value={share}
            onChange={(e) => setShare(Number(e.target.value))}
          />
        </label>
      </div>

      <div className={styles.result}>
        <div>
          <span className={styles.resultLabel}>Ušetřených hodin měsíčně</span>
          <strong className={styles.resultBig} aria-live="polite">
            {fmt(monthlySaved)} h
          </strong>
        </div>
        <div>
          <span className={styles.resultLabel}>Hodnota ročně</span>
          <strong className={styles.resultMid} aria-live="polite">
            {fmt(yearlyValue)} Kč
          </strong>
        </div>
        <div className={styles.fte}>
          To odpovídá <strong>{fte}</strong> úvazku, který tým může věnovat prodeji
          a zákazníkům.
        </div>
        <Link href="/kontakt/" className={styles.cta}>
          Ověřit odhad na discovery callu →
        </Link>
      </div>
    </div>
  );
}
