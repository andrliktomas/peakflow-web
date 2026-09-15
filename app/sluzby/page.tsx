import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Tři pilíře PeakFlow: datová analytika a reporting, AI automatizace procesů a obchodní procesy s CRM. Napojíme se na to, co máte, data vyčistíme a dodáme business výstup.",
};

const JUMP_LINKS = [
  { href: "#analytika", num: "I.", label: "Datová analytika a reporting" },
  { href: "#automatizace", num: "II.", label: "AI automatizace procesů" },
  { href: "#crm", num: "III.", label: "Obchodní procesy a CRM" },
];

const ANALYTICS_STEPS = [
  {
    title: "Audit datových zdrojů",
    body: "Zmapujeme, kde všude data žijí — databáze, ERP, e‑shop, Excel, cloud, on‑premise.",
    outcome: "Mapa datových zdrojů a priorit",
  },
  {
    title: "Napojení na zdroje",
    body: "Legacy databáze, ERP, e‑shop platformy a další systémy — i bez moderního API.",
    outcome: "Funkční datové konektory",
  },
  {
    title: "Vlastní datová pipeline",
    body: "Bezpečné spojení (server, linka) bez závislosti na infrastruktuře klienta.",
    outcome: "Spolehlivý, monitorovaný přenos",
  },
  {
    title: "Sanitace a transformace",
    body: "Čištění, normalizace a validace — aby výsledkům šlo důvěřovat.",
    outcome: "Čistá, konzistentní datová sada",
  },
  {
    title: "Datový sklad (BigQuery)",
    body: "Škálovatelně, bezpečně a s plnou kontrolou nad náklady.",
    outcome: "Centralizovaný datový sklad",
  },
  {
    title: "Reporting (Looker Studio)",
    body: "Přehledné, akční dashboardy zaměřené na klíčové business otázky.",
    outcome: "Dashboardy a reporty",
  },
];

const ANALYTICS_TAGS = [
  "Prodejní analytika",
  "RFM segmentace",
  "ABC analýza",
  "ROAS a atribuce",
  "Provozní reporting",
  "Finanční konsolidace",
];

const AUTOMATION_CARDS = [
  ["Napojení na interní systémy", "ERP (Point, Raynet, Asana), e‑shop, SharePoint, FTP."],
  [
    "Interní slovník / překlady",
    "Firemní terminologie (CS/EN/DE/…), kterou AI používá pro konzistentní překlady.",
  ],
  [
    "Generování marketingových materiálů",
    "Kampaně, bannery z Figma šablon, texty a A/B varianty.",
  ],
  [
    "Vendor‑agnostický přístup",
    "Optimální model pro daný úkol — OpenAI, Anthropic, Google a další.",
  ],
  ["Automatizace workflow", "Python, Make a n8n pro pravidelné úlohy bez ručního zásahu."],
  ["Monitoring a logování", "Přehled o tom, co automatizace dělá a kdy selhala."],
];

const AUTOMATION_TAGS = [
  "Automatické překlady",
  "Generování bannerů",
  "Kategorizace produktů",
  "Extrakce z PDF a faktur",
  "Drafty odpovědí podpory",
];

const CRM_FLOW = [
  ["1 · Obchodník komunikuje", "e‑mail, telefon, chat, schůzka"],
  ["2 · AI rozpozná údaje", "případ, kontakt, fáze, hodnota"],
  ["3 · Make namapuje data", "scénář zpracuje a odešle"],
  ["4 · Raynet se vyplní", "obchodník jen zkontroluje a potvrdí"],
];

const CRM_CARDS = [
  ["Napojení Raynet ↔ kanály", "E‑mail, telefon, chat, kalendář."],
  ["AI asistent pro obchodní tým", "Osobní chat, který rozumí kontextu případu."],
  ["Mapování polí a validace", "AI navrhne, obchodník potvrdí — human‑in‑the‑loop."],
  ["Přepis a sumarizace hovorů", "Z telefonátu rovnou strukturovaný záznam."],
];

const STACK = [
  ["Zdroje dat", "Legacy DB, ERP (Point, Raynet), e‑shop platformy, SharePoint, FTP, API"],
  ["Zpracování", "Python (pandas, SQLAlchemy), ETL/ELT, vlastní přenosová linka"],
  ["Sklad a reporting", "Google BigQuery, Looker Studio, GA4"],
  ["AI modely", "Multi‑model — OpenAI, Anthropic, Google a další dle úkolu"],
  ["Orchestrace", "Make, n8n, cron, Python schedulery"],
  ["Backend / hosting", "Supabase, Vercel, Figma plugin, REST API, webhooky"],
];

export default function SluzbyPage() {
  return (
    <>
      <SiteHeader active="sluzby" />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className="eyebrow eyebrowLight">Služby</p>
            <h1 className={styles.h1}>Tři pilíře, které se v praxi kombinují.</h1>
            <p className={styles.heroLead}>
              Napojit se na to, co klient má → vyčistit a sjednotit → dodat business
              výstup. Tento vzorec platí pro každý projekt.
            </p>
          </div>
          <nav className={styles.jump} aria-label="Přehled pilířů">
            {JUMP_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.jumpLink}>
                <span>
                  <strong style={{ fontWeight: 600 }}>{link.num}</strong> {link.label}
                </span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ===== PILLAR I ===== */}
      <section id="analytika" className={styles.pillar}>
        <div>
          <span className={styles.numeral}>I</span>
          <h2 className={styles.pillarTitle}>Datová analytika a reporting</h2>
          <p className={styles.pillarBody}>
            Pomáháme firmám vidět, co se skutečně děje v jejich byznysu — na základě
            dat, ne odhadů.
          </p>
          <p className={styles.audience}>
            <strong>Pro koho:</strong> B2B e‑shopy, distributoři, firmy s více zdroji
            dat, které potřebují jednotný pohled na výkonnost.
          </p>
        </div>
        <div className={styles.steps}>
          {ANALYTICS_STEPS.map((step, i) => (
            <div key={step.title} className={styles.stepRow}>
              <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong className={styles.stepTitle}>{step.title}</strong>
                <span className={styles.stepBody}>{step.body}</span>
              </div>
              <span className={styles.stepOutcome}>→ {step.outcome}</span>
            </div>
          ))}
          <div className={`${styles.tags} ${styles.tagsTight}`}>
            {ANALYTICS_TAGS.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PILLAR II ===== */}
      <section id="automatizace" className="surfaceWhite">
        <div className={styles.pillar}>
          <div>
            <span className={styles.numeral}>II</span>
            <h2 className={styles.pillarTitle}>AI automatizace procesů</h2>
            <p className={styles.pillarBody}>
              Automatizujeme repetitivní marketingové a provozní procesy pomocí Pythonu
              a AI — s ohledem na specifika klienta.
            </p>
            <p className={styles.audience}>
              <strong>Pro koho:</strong> e‑shopy s rozsáhlým katalogem, firmy s více
              jazykovými mutacemi a opakujícími se marketingovými úkoly.
            </p>
          </div>
          <div>
            <div className={styles.cards}>
              {AUTOMATION_CARDS.map(([title, body]) => (
                <div key={title} className={styles.card}>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
              ))}
            </div>
            <div className={styles.tags}>
              {AUTOMATION_TAGS.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PILLAR III ===== */}
      <section id="crm" className={styles.pillar}>
        <div>
          <span className={styles.numeral}>III</span>
          <h2 className={styles.pillarTitle}>Obchodní procesy a CRM</h2>
          <p className={styles.pillarBody}>
            Data z obchodní komunikace se dostanou do CRM sama, správně a bez ručního
            přepisování.
          </p>
          <p className={styles.audience}>
            <strong>Pro koho:</strong> obchodní týmy v Raynetu nebo podobném CRM, které
            tráví hodiny přepisováním komunikace.
          </p>
        </div>
        <div>
          <div className={styles.flowPanel}>
            <p className={styles.flowLabel}>Jak to funguje</p>
            <div className={styles.flowGrid}>
              {CRM_FLOW.map(([title, body], i) => (
                <div
                  key={title}
                  className={`${styles.flowStep} ${
                    i === CRM_FLOW.length - 1 ? styles.flowStepFinal : ""
                  }`}
                >
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.cards} ${styles.crmCards}`}>
            {CRM_CARDS.map(([title, body]) => (
              <div key={title} className={`${styles.card} ${styles.cardOutlined}`}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap wrapTight">
          <div className={styles.stackHead}>
            <p className="eyebrow">Technologický stack</p>
            <h2 className={styles.stackTitle}>
              Python jako páteř. Cloud‑first, ne cloud‑only.
            </h2>
          </div>
          <div className={styles.stack}>
            {STACK.map(([label, body]) => (
              <div key={label} className={styles.stackCard}>
                <span>{label}</span>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="wrap wrapTight" style={{ paddingBottom: 96 }}>
        <div className="ctaBand" style={{ padding: "56px 48px" }}>
          <div>
            <h2 className="ctaTitle">Nevíte, kterým pilířem začít?</h2>
            <p className="ctaBody">
              Doporučujeme PoC nebo menší produkt — rychle uvidíte, jak spolupracujeme
              a jaký máme přínos.
            </p>
          </div>
          <Link href="/kontakt/" className="btn btnDark">
            Domluvit discovery call →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
