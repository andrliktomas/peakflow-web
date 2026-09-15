import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

type Page = "home" | "sluzby" | "kontakt";

/**
 * The prototype carried two different navs (Home was trimmed to 4 links + CTA
 * in the last design pass, the sub-pages still had the older 5-link version).
 * We ship the trimmed one everywhere — it was the more recent decision.
 */
export function SiteHeader({ active = "home" }: { active?: Page }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            P
          </span>
          <span className={styles.wordmark}>{site.name}</span>
        </Link>
        <nav className={styles.nav} aria-label="Hlavní navigace">
          <Link
            href="/sluzby/"
            className={active === "sluzby" ? styles.linkActive : styles.link}
            aria-current={active === "sluzby" ? "page" : undefined}
          >
            Služby
          </Link>
          <Link href="/#reference" className={styles.link}>
            Reference
          </Link>
          <Link href="/#postup" className={styles.link}>
            Postup
          </Link>
          <Link
            href="/kontakt/"
            className={active === "kontakt" ? styles.linkActive : styles.link}
            aria-current={active === "kontakt" ? "page" : undefined}
          >
            Kontakt
          </Link>
          {/* On the contact page the CTA would just link to itself. */}
          {active !== "kontakt" && (
            <Link href="/kontakt/" className={styles.cta}>
              Discovery call
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
