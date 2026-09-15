"use client";

import { useState } from "react";
import { WEB3FORMS_ENDPOINT, contact, web3formsKey } from "@/lib/site";
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

    // Honeypot. `botcheck` is Web3Forms' own field name, so a bot that fills it
    // gets rejected server-side too, not just here.
    if (data.get("botcheck")) {
      setStatus("sent");
      form.reset();
      return;
    }

    if (!web3formsKey) {
      console.error(
        "[PeakFlow] Chybí NEXT_PUBLIC_WEB3FORMS_KEY — formulář nemá kam odeslat. " +
          "Nastavte ji v Workers & Pages → peakflow-web → Settings → Variables and Secrets " +
          "a spusťte nový deploy.",
      );
      setStatus("error");
      return;
    }

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");

    setStatus("sending");
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Nová poptávka z PeakFlow.cz — ${name}`,
          from_name: "PeakFlow.cz",
          // Reply in the mail client goes straight to the lead.
          replyto: email,
          name,
          email,
          company: data.get("company") || "—",
          phone: data.get("phone") || "—",
          topic: data.get("topic"),
          message: data.get("message") || "—",
        }),
      });

      // Web3Forms can answer 200 with success:false (e.g. a rejected key),
      // so the body decides, not the status code alone.
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message ?? `HTTP ${response.status}`);
      }

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
          Odeslání se nepodařilo. Zkuste to prosím znovu, nebo nám napište přímo na{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
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
        type="checkbox"
        name="botcheck"
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
