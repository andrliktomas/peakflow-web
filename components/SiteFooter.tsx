import Link from "next/link";
import { contact, site } from "@/lib/site";
import styles from "./SiteFooter.module.css";

const year = 2026;

/** Home uses the three-column footer; sub-pages use the single-row one. */
export function SiteFooter({ variant = "compact" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <footer className={styles.footer}>
        <div className={styles.compact}>
          <span>© {year} {site.legalName}</span>
          <div className={styles.compactLinks}>
            <Link href="/">Domů</Link>
            <Link href="/sluzby/">Služby</Link>
            <Link href="/kontakt/">Kontakt</Link>
            <a href={site.url}>PeakFlow.cz</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brandRow}>
            <span className={styles.mark} aria-hidden="true">P</span>
            <span className={styles.wordmark}>{site.legalName}</span>
          </div>
          <p className={styles.blurb}>{site.description.split(".")[0]}.</p>
        </div>
        <div className={styles.col}>
          <strong className={styles.colTitle}>Navigace</strong>
          <Link href="/sluzby/">Služby</Link>
          <Link href="/#reference">Reference</Link>
          <Link href="/#postup">Jak pracujeme</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/kontakt/">Kontakt</Link>
        </div>
        <div className={styles.col}>
          <strong className={styles.colTitle}>Kontakt</strong>
          <span>{site.founder}</span>
          {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
          {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>}
          <a href={site.url}>PeakFlow.cz</a>
        </div>
      </div>
      <div className={styles.copyright}>© {year} {site.legalName}</div>
    </footer>
  );
}
