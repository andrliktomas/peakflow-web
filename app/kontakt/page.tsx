import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { contact, site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Domluvte si nezávazný discovery call s PeakFlow. 30–60 minut o vašich systémech, datech a tom, co vás trápí.",
};

const TIMELINE = [
  ["Do 3 dnů", "Shrnutí meetingu a hrubý návrh řešení."],
  ["Do 1 týdne", "Upřesnění rozsahu a cenová nabídka."],
  ["Do 2 týdnů", "Případný start PoC."],
  ["Do 4 týdnů", "První viditelné výsledky."],
];

export default function KontaktPage() {
  return (
    <div className={styles.page}>
      <SiteHeader active="kontakt" />

      <section className={styles.main}>
        <div>
          <p className="eyebrow">Kontakt</p>
          <h1 className={styles.h1}>Domluvme si discovery call.</h1>
          <p className={styles.lead}>
            30–60 minut. Pochopíme vaše systémy, data a to, co vás trápí. Bez závazku
            a bez prezentace na hodinu.
          </p>

          <ol className={styles.timeline}>
            {TIMELINE.map(([title, body], i) => (
              <li key={title} className={styles.timelineItem}>
                <span
                  className={`${styles.timelineNum} ${
                    i === TIMELINE.length - 1 ? styles.timelineNumFinal : ""
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <strong className={styles.timelineTitle}>{title}</strong>
                  <span className={styles.timelineBody}>{body}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.vcard}>
            <strong>{site.legalName}</strong>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
            <a href={site.url}>PeakFlow.cz</a>
            {contact.bookingUrl && (
              <a
                href={contact.bookingUrl}
                className={`btn btnPrimary ${styles.booking}`}
                target="_blank"
                rel="noreferrer"
              >
                Rezervovat termín v kalendáři →
              </a>
            )}
          </div>
        </div>

        <ContactForm />
      </section>

      <SiteFooter />
    </div>
  );
}
