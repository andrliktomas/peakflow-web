import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DataFlow } from "@/components/home/DataFlow";
import { PillarTabs } from "@/components/home/PillarTabs";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import styles from "./page.module.css";

const TOOLS = [
  "Google BigQuery",
  "Looker Studio",
  "Python",
  "Raynet",
  "Make",
  "n8n",
  "Supabase",
];

const PAINS = [
  "„Máme Pohodu, Shoptet a Raynet — a nic spolu nemluví.“",
  "„Měsíční report skládáme tři dny ručně v Excelu.“",
  "„Překlady katalogu do tří jazyků brzdí každou kampaň.“",
  "„Obchodníci přepisují e‑maily do CRM místo prodeje.“",
];

/** Sloupce v hero mocku — výška v % a barevný odstín. */
const CHART_BARS: Array<{ h: number; tone: "Pale" | "Mid" | "Bright" }> = [
  { h: 38, tone: "Pale" },
  { h: 52, tone: "Pale" },
  { h: 46, tone: "Pale" },
  { h: 64, tone: "Mid" },
  { h: 58, tone: "Mid" },
  { h: 72, tone: "Mid" },
  { h: 66, tone: "Mid" },
  { h: 84, tone: "Bright" },
  { h: 78, tone: "Bright" },
  { h: 92, tone: "Bright" },
];

const CATEGORY_ROWS = [
  { name: "Nářadí", revenue: "1,92 M", margin: "34 %" },
  { name: "Spojovací mat.", revenue: "1,15 M", margin: "29 %" },
  { name: "Ochranné pom.", revenue: "0,88 M", margin: "36 %" },
];

const CASES = [
  {
    tag: "Případ 1 · B2B e‑shop",
    title: "Jednotný zdroj pravdy z legacy databází",
    body: "Čtyři legacy databáze bez API → jeden BigQuery sklad a živé dashboardy.",
    metrics: [
      { value: "4", label: "legacy systémy v jednom skladu" },
      { value: "0 h", label: "ručního reportingu měsíčně" },
    ],
  },
  {
    tag: "Případ 2 · Marketing",
    title: "Desítky hodin měsíčně ušetřených na překladech",
    body: "Interní slovník + AI překlady + bannery z Figmy přes Make/n8n.",
    metrics: [
      { value: "30+ h", label: "měsíčně ušetřené ruční práce" },
      { value: "3 jazyky", label: "s jednotnou terminologií" },
    ],
  },
  {
    tag: "Případ 3 · Obchod / CRM",
    title: "Konec přepisování komunikace do Raynetu",
    body: "AI čte e‑maily a hovory, Make je zapíše do Raynetu, obchodník potvrdí.",
    metrics: [
      { value: "−80 %", label: "času na zápis do CRM" },
      { value: "100 %", label: "komunikace uložené u případu" },
    ],
  },
];

const QUOTES = [
  {
    text: "„Poprvé vidíme marži po kategoriích, aniž by ji někdo ručně skládal.“",
    role: "Jednatel",
    org: "B2B distributor, obrat 200+ mil. Kč",
  },
  {
    text: "„Kampaň, která čekala týden na překlady, jde ven za den.“",
    role: "Marketing manager",
    org: "B2B e‑shop, 3 jazykové mutace",
  },
  {
    text: "„Kdyby PeakFlow zítra zmizel, řešení nám běží dál. Máme dokumentaci i přístupy.“",
    role: "Vedoucí IT",
    org: "Obchodní firma s Raynet CRM",
  },
];

const STEPS = [
  { title: "Discovery call", time: "30–60 min", body: "Vaše systémy a co vás trápí." },
  { title: "Analýza a návrh", time: "1–2 týdny", body: "Architektura, čas, cena." },
  { title: "Implementace", time: "2–8 týdnů", body: "Napojení, data, výstupy v testu." },
  { title: "Předání a provoz", time: "1 týden", body: "Dokumentace a vlastnictví." },
  {
    title: "Měříme přínos",
    time: "po 30 a 90 dnech",
    body: "Ušetřené hodiny a chybovost. Když se nevrací, upravíme.",
  },
];

const BENEFITS = [
  ["Méně ruční práce", "Reporty, překlady a CRM zápisy běží samy."],
  ["Rozhodnutí z čísel", "Marže a obrátkovost v jednom pohledu, denně."],
  ["Růst bez náboru", "Více kampaní a případů se stejným týmem."],
  ["Propojené systémy", "ERP, e‑shop a CRM si data předávají samy."],
  ["Data, kterým jde věřit", "Sanitace a validace jsou standard."],
  ["Řešení, které vlastníte", "Dokumentace, přístupy, žádný lock‑in."],
];

const WHY = [
  ["Legacy bez API", "Stavíme vlastní spojení. Vy nic neměníte."],
  ["Žádný lock‑in", "Modely od více dodavatelů, kdykoli vyměnitelné."],
  ["Jedna střecha", "Od dat po automatizaci. Tři dodavatele nekoordinujete."],
];

const FAQS = [
  {
    q: "Umíte se napojit na náš starý systém bez API?",
    a: "Ano. Připojíme se přímo na databázi a postavíme vlastní přenosovou linku.",
  },
  {
    q: "Budeme závislí na jednom AI dodavateli?",
    a: "Ne. Používáme modely od více poskytovatelů a kdykoli je vyměníme.",
  },
  {
    q: "Kde budou naše data?",
    a: "Typicky v Google BigQuery, případně on‑premise či hybridně. Šifrované přístupy, minimální oprávnění, logování.",
  },
  {
    q: "Jak dlouho trvá, než uvidíme výsledky?",
    a: "Do 2–8 týdnů. PoC za 2–4 týdny.",
  },
];

export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <SiteHeader active="home" />

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              Data &amp; AI automatizace pro B2B
            </span>
            <h1 className={styles.h1}>Přestaňte řídit firmu podle odhadů a Excelu.</h1>
            <p className={styles.heroLead}>
              Propojíme ERP, e‑shop a staré databáze, data vyčistíme a dodáme
              dashboardy i AI automatizace. Vy rozhodujete z čísel, tým nepřepisuje.
            </p>
            <div className={styles.heroActions}>
              <Link href="/kontakt/" className="btn btnAccent">
                Domluvit discovery call →
              </Link>
              <Link href="/sluzby/" className="btn btnOnDark">
                Jak PeakFlow funguje
              </Link>
            </div>
            <div className={styles.heroChecks}>
              <span className={styles.heroCheck}>
                <span aria-hidden="true">✓</span>Napojení bez moderního API
              </span>
              <span className={styles.heroCheck}>
                <span aria-hidden="true">✓</span>Žádný vendor lock‑in
              </span>
              <span className={styles.heroCheck}>
                <span aria-hidden="true">✓</span>Výsledky za 2–8 týdnů
              </span>
            </div>
          </div>

          {/* Illustrative mock of the delivered dashboard — not real data. */}
          <div className={styles.heroVisual}>
            <div className={styles.browser} aria-hidden="true">
              <div className={styles.browserBar}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.browserTitle}>Přehled prodeje · září 2026</span>
              </div>
              <div className={styles.dash}>
                <div className={styles.dashCard}>
                  <div className={styles.dashCardHead}>
                    <span className={styles.dashCardLabel}>Tržby po týdnech</span>
                    <span className={styles.dashCardDelta}>+18 %</span>
                  </div>
                  <strong className={styles.dashCardValue}>4,82 mil. Kč</strong>
                  <div className={styles.bars}>
                    {CHART_BARS.map((bar, i) => (
                      <div
                        key={i}
                        className={`${styles.bar} ${styles[`bar${bar.tone}`]}`}
                        style={{ height: `${bar.h}%` }}
                      />
                    ))}
                  </div>
                  <div className={styles.axis}>
                    <span>T27</span>
                    <span>T31</span>
                    <span>T36</span>
                  </div>
                </div>
                <div className={styles.dashSide}>
                  <div className={styles.kpis}>
                    <div className={styles.kpi}>
                      <span>Marže</span>
                      <strong>31,4 %</strong>
                    </div>
                    <div className={styles.kpi}>
                      <span>Objedn.</span>
                      <strong>1 286</strong>
                    </div>
                  </div>
                  <div className={styles.table}>
                    <div className={styles.tableHead}>
                      <span>Kategorie</span>
                      <span className={styles.cellRight}>Tržby</span>
                      <span className={styles.cellRight}>Marže</span>
                    </div>
                    {CATEGORY_ROWS.map((row) => (
                      <div key={row.name} className={styles.tableRow}>
                        <span className={styles.cellName}>{row.name}</span>
                        <span className={`${styles.cellRevenue} ${styles.cellRight}`}>
                          {row.revenue}
                        </span>
                        <span className={`${styles.cellMargin} ${styles.cellRight}`}>
                          {row.margin}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.floatLabel}>
              <span>Datová základna</span>
              <strong>Legacy DB · ERP · e‑shop</strong>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <strong>20–40 h</strong>
                <span>měsíčně ušetřené ruční práce</span>
              </div>
              <div className={styles.heroStat}>
                <strong>2–8 týdnů</strong>
                <span>do prvního dashboardu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className={styles.trust}>
        <div className={styles.trustInner}>
          <span className={styles.trustLabel}>Stavíme na ověřených nástrojích</span>
          <ul className={styles.trustList}>
            {TOOLS.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== PAIN POINTS + DATA FLOW ===== */}
      <section className="wrap" style={{ paddingBottom: 40 }}>
        <div className="sectionHead">
          <p className="eyebrow">Znáte to?</p>
          <h2 className="h2">Jedna cesta dat. Jeden partner na celou trasu.</h2>
        </div>
        <div className={styles.pains}>
          {PAINS.map((pain) => (
            <p key={pain} className={styles.pain}>
              {pain}
            </p>
          ))}
        </div>
        <DataFlow />
      </section>

      {/* ===== SERVICES ===== */}
      <section data-reveal id="sluzby" className="wrap wrapTight">
        <div className="sectionHead">
          <p className="eyebrow">Co pro vás uděláme</p>
          <h2 className="h2">Roztroušená data proměníme v rozhodnutí.</h2>
        </div>
        <PillarTabs />
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link href="/sluzby/" style={{ fontWeight: 600, fontSize: 16 }}>
            Detail všech služeb →
          </Link>
        </div>
      </section>

      {/* ===== CASE STUDIES + TESTIMONIALS ===== */}
      <section data-reveal id="reference" className="surfaceWhite">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">Reference</p>
            <h2 className="h2">Řešení, která fungují v praxi.</h2>
            <p className="lead">Tři typy projektů, anonymně.</p>
          </div>
          <div className={styles.cases}>
            {CASES.map((item) => (
              <article key={item.title} className={styles.case}>
                <span className={styles.caseTag}>{item.tag}</span>
                <h3 className={styles.caseTitle}>{item.title}</h3>
                <p className={styles.caseBody}>{item.body}</p>
                <div className={styles.caseMetrics}>
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.quotes}>
            {QUOTES.map((quote) => (
              <blockquote key={quote.role} className={styles.quote}>
                <span className={styles.stars} aria-label="Hodnocení 5 z 5">
                  ★★★★★
                </span>
                <p>{quote.text}</p>
                <footer>
                  <strong>{quote.role}</strong>
                  {quote.org}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section data-reveal id="postup" className="wrap">
        <div className="sectionHead">
          <p className="eyebrow">Jak pracujeme</p>
          <h2 className="h2">
            Od první hodiny k měřitelnému přínosu v pěti krocích.
          </h2>
        </div>
        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`${styles.step} ${i === STEPS.length - 1 ? styles.stepFinal : ""}`}
            >
              <span className={styles.stepNum}>{i + 1}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <span className={styles.stepTime}>{step.time}</span>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== BENEFITS + ROI ===== */}
      <section
        data-reveal
        id="prinosy"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
      >
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">Přínosy</p>
            <h2 className="h2">Co se u vás změní</h2>
          </div>
          <RoiCalculator />
          <div className={styles.benefits}>
            {BENEFITS.map(([title, body]) => (
              <div key={title} className={styles.benefit}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY PEAKFLOW ===== */}
      <section data-reveal className="surfaceDark">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow eyebrowLight">Proč PeakFlow</p>
            <h2 className="h2">
              Umíme to, co jiní ne. Neuzamkneme vás. Dodáme celou cestu.
            </h2>
          </div>
          <div className={styles.whyGrid}>
            {WHY.map(([title, body]) => (
              <div key={title} className={styles.why}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING MODEL (no numbers, by design) ===== */}
      <section data-reveal id="cena" className="wrap">
        <div className="sectionHead">
          <p className="eyebrow">Transparentní model</p>
          <h2 className="h2">Dvě složky. Žádné skryté hodiny.</h2>
          <p className="lead">Cenu sdělujeme po poptání podle rozsahu.</p>
        </div>
        <div className={styles.pricing}>
          <div className={`${styles.plan} ${styles.planFeatured}`}>
            <span className={styles.planBadge}>Jednorázově</span>
            <h3 className={styles.planTitle}>Cena za produkt</h3>
            <ul className={styles.planList}>
              <li><span aria-hidden="true">✓</span>Návrh, vývoj, napojení, nasazení</li>
              <li><span aria-hidden="true">✓</span>Kompletní dokumentace</li>
              <li><span aria-hidden="true">✓</span>Přístupy a vlastnictví</li>
            </ul>
            <Link href="/kontakt/" className={`btn btnPrimary ${styles.planCta}`}>
              Poptat nabídku
            </Link>
          </div>
          <div className={styles.plan}>
            <span className={styles.planBadge}>Po nasazení</span>
            <h3 className={styles.planTitle}>Fixní měsíční fee</h3>
            <ul className={styles.planList}>
              <li><span aria-hidden="true">✓</span>Monitoring a provozní dohled</li>
              <li><span aria-hidden="true">✓</span>Údržba a opravy</li>
              <li><span aria-hidden="true">✓</span>Drobný rozvoj a podpora</li>
            </ul>
            <Link href="/kontakt/" className="btn btnOutlineDark">
              Začít s PoC
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        data-reveal
        id="faq"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
      >
        <div className={styles.faqWrap}>
          <div className={styles.faqHead}>
            <p className="eyebrow">FAQ</p>
            <h2 className="h2">Časté otázky</h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((item) => (
              <details key={item.q} className={styles.faq}>
                <summary className={styles.faqSummary}>
                  {item.q}
                  <span className={styles.faqChevron} aria-hidden="true">⌄</span>
                </summary>
                <p className={styles.faqBody}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section data-reveal className="wrap" style={{ paddingBottom: 96 }}>
        <div className="ctaBand">
          <div>
            <h2 className="ctaTitle">Začněme hodinovým discovery callem.</h2>
            <p className="ctaBody">
              Do 3 dnů návrh řešení, do týdne nabídka. Bez závazku.
            </p>
          </div>
          <div className="ctaActions">
            <Link href="/kontakt/" className="btn btnDark">
              Domluvit discovery call →
            </Link>
            <Link href="/sluzby/" className="btn btnOnDark">
              Prohlédnout služby
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter variant="full" />
    </>
  );
}
