"use client";

import { useState } from "react";
import { formEndpoint } from "@/lib/site";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";

const TOPICS = [
  "Datová analytika a reporting",
  "AI automatizace procesů",
  "Obchodní procesy a CRM (Raynet)",
  "Kombinace / nevím, poradíte",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill every field they find, humans never see this one.
    if (data.get("website")) {
      setStatus("sent");
      form.reset();
      return;
    }

    if (!formEndpoint) {
      console.warn(
        "[PeakFlow] NEXT_PUBLIC_FORM_ENDPOINT není nastavený — formulář nic neodeslal. " +
          "Nastavte ho v Cloudflare Pages → Settings → Environment variables.",
      );
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("[PeakFlow] Odeslání formuláře selhalo:", error);
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {status === "sent" && (
        <div className={styles.notice} role="status">
          Děkujeme. Ozveme se do 2 pracovních dnů s návrhem termínu.
        </div>
      )}
      {status === "error" && (
        <div className={styles.error} role="alert">
          Odeslání se nepodařilo. Zkuste to prosím znovu, nebo nám napište přímo.
        </div>
      )}

      <div className={styles.pair}>
        <label className={styles.field}>
          Jméno a příjmení
          <input
            className={styles.input}
            name="name"
            required
            autoComplete="name"
            placeholder="Jan Novák"
          />
        </label>
        <label className={styles.field}>
          Firma
          <input
            className={styles.input}
            name="company"
            autoComplete="organization"
            placeholder="Firma s.r.o."
          />
        </label>
      </div>

      <div className={styles.pair}>
        <label className={styles.field}>
          E‑mail
          <input
            className={styles.input}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jan@firma.cz"
          />
        </label>
        <label className={styles.field}>
          Telefon
          <input
            className={styles.input}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+420"
          />
        </label>
      </div>

      <label className={styles.field}>
        Co vás zajímá
        <select className={styles.select} name="topic" defaultValue={TOPICS[0]}>
          {TOPICS.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Jaké systémy používáte a co vás trápí
        <textarea
          className={styles.textarea}
          name="message"
          rows={5}
          placeholder="ERP, e‑shop, CRM… a co byste rádi vyřešili"
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="srOnly"
      />

      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? "Odesílám…" : "Odeslat a domluvit termín →"}
      </button>
      <p className={styles.legal}>
        Odesláním souhlasíte se zpracováním údajů za účelem kontaktu. Ceny sdělujeme
        až po poptání.
      </p>
    </form>
  );
}
