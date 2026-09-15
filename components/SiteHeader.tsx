import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

type Page = "home" | "sluzby" | "kontakt";

const LINKS = [
  { href: "/sluzby/", label: "Služby", page: "sluzby" as Page },
  { href: "/#reference", label: "Reference", page: null },
  { href: "/#postup", label: "Postup", page: null },
  { href: "/kontakt/", label: "Kontakt", page: "kontakt" as Page },
];

/**
 * The prototype carried two different navs (Home was trimmed to 4 links + CTA
 * in the last design pass, the sub-pages still had the older 5-link version).
 * We ship the trimmed one everywhere — it was the more recent decision.
 *
 * Below 760px the inline row is replaced by a <details> dropdown: four Czech
 * labels plus a CTA wrap onto three lines otherwise. No JS needed.
 */
export function SiteHeader({ active = "home" }: { active?: Page }) {
  const links = LINKS.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={link.page && link.page === active ? styles.linkActive : styles.link}
      aria-current={link.page && link.page === active ? "page" : undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            P
          </span>
          <span className={styles.wordmark}>{site.name}</span>
        </Link>

        <nav className={styles.navDesktop} aria-label="Hlavní navigace">
          {links}
          {/* On the contact page the CTA would just link to itself. */}
          {active !== "kontakt" && (
            <Link href="/kontakt/" className={styles.cta}>
              Discovery call
            </Link>
          )}
        </nav>

        <details className={styles.mobileNav}>
          <summary className={styles.burger} aria-label="Otevřít menu">
            <span className={styles.burgerBars} aria-hidden="true" />
          </summary>
          <nav className={styles.mobilePanel} aria-label="Hlavní navigace">
            {links}
            {active !== "kontakt" && (
              <Link href="/kontakt/" className={styles.cta}>
                Discovery call
              </Link>
            )}
          </nav>
        </details>
      </div>
    </header>
  );
}
