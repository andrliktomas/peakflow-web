# PeakFlow.cz

Web PeakFlow s.r.o. — datová analytika a AI automatizace pro B2B.
Tři stránky: **Home**, **Služby**, **Kontakt**.

Implementace návrhů z Claude Design (zdroj v `design-source/`).

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) + React 19, TypeScript |
| Styly | CSS Modules + design tokeny v `app/globals.css` |
| Fonty | Outfit + DM Sans, self-hostované přes `next/font` |
| Build | statický export (`output: "export"`) → složka `out/` |
| Hosting | Cloudflare Workers (static assets) |

Žádný runtime server — celý web jsou předgenerované HTML soubory.

## Lokální vývoj

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statický export do out/
npm run typecheck
```

## Struktura

```
app/
  layout.tsx           fonty, metadata, <html lang="cs">
  page.tsx             Home
  sluzby/page.tsx      Služby
  kontakt/page.tsx     Kontakt
  globals.css          design tokeny (barvy, spacing, radiusy)
  ui.css               sdílené primitivy (.wrap, .h2, .btn…)
components/
  SiteHeader / SiteFooter / ScrollReveal / ContactForm
  home/DataFlow        automaticky se střídající tok dat
  home/PillarTabs      záložky pilířů + simulovaný běh pipeline
  home/RoiCalculator   tři posuvníky → ušetřené hodiny a roční hodnota
lib/site.ts            kontakty + Web3Forms klíč — viz níže
design-source/         původní handoff z Claude Design (reference)
```

## ⚠️ Co je potřeba doplnit před spuštěním

### 1. Kontaktní formulář (Web3Forms) — zapojeno, ale ověřte doručování

Formulář odesílá přes [Web3Forms](https://web3forms.com) na **info@peakflow.cz**.
Access key je v `lib/site.ts`; jde přebít proměnnou `NEXT_PUBLIC_WEB3FORMS_KEY`
bez zásahu do kódu.

Klíč je *publishable* — je vidět ve zdrojovém kódu nasazené stránky, tak to má
Web3Forms navržené. Kdyby na něj někdo poslal spam, zneplatněte ho na
web3forms.com a vygenerujte nový.

Po prvním nasazení **pošlete přes formulář zkušební zprávu** a ověřte, že
dorazila — mrkněte i do spamu. Web3Forms u nové adresy někdy vyžaduje
potvrzení e-mailu.

Co odchází na Web3Forms:

| Pole | Hodnota |
|---|---|
| `subject` | `Nová poptávka z PeakFlow.cz — <jméno>` |
| `replyto` | e-mail odesílatele (odpověď jde rovnou leadovi) |
| `name`, `company`, `email`, `phone`, `topic`, `message` | z formuláře |
| `botcheck` | honeypot — skrytý checkbox, boti na něj sedají |

Nevyplněná nepovinná pole se posílají jako `—`, ať v e-mailu nechybí řádek.
Když klíč chybí, formulář **neodešle nic a zobrazí chybu** — nikdy nepředstírá
úspěch.

### 2. Rezervační odkaz — `lib/site.ts`

```ts
bookingUrl: null,  // → Calendly / Cal.com odkaz
```

Dokud je `null`, tlačítko „Rezervovat termín v kalendáři“ se nezobrazuje.
Kontaktní e-mail a telefon už doplněné jsou (`info@peakflow.cz`,
`+420 732 854 316`) a zobrazují se na Kontaktu i v patičce.

### 3. Obsahové placeholdery

Čísla v case studies (`4`, `30+ h`, `−80 %`…) a tři citace v sekci Reference
jsou **návrhové placeholdery** z designu. Před spuštěním je nahraďte reálnými
hodnotami — jsou pohromadě v polích `CASES` a `QUOTES` v `app/page.tsx`.

## Nasazení na Cloudflare

Projekt běží jako **Cloudflare Worker se statickými assety** (Workers & Pages →
projekt `peakflow-web`), napojený na tento GitHub repozitář. Každý push na
`main` spustí build a deploy automaticky.

Build nastavení v dashboardu:

| Pole | Hodnota |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

Co se nahrává, určuje `wrangler.jsonc` v kořeni repozitáře:

```jsonc
{
  "name": "peakflow-web",
  "assets": {
    "directory": "./out",
    "not_found_handling": "404-page"
  }
}
```

Žádný serverový kód — jen předgenerované HTML z `out/`. Bezpečnostní hlavičky
a cache pravidla jsou v `public/_headers` (kopíruje se do `out/` při buildu).

### Proměnné prostředí

Web funguje i bez nich — Web3Forms klíč má výchozí hodnotu v `lib/site.ts`.
Pokud ho chcete přebít, přidejte `NEXT_PUBLIC_WEB3FORMS_KEY` v
*Workers & Pages → peakflow-web → Settings → Variables and Secrets*. Protože
jde o `NEXT_PUBLIC_*` proměnnou, zapeče se do buildu — po změně je vždy potřeba
nový deploy, nestačí restart.

### Vlastní doména

*peakflow-web → Domains → Add* → `peakflow.cz` (+ `www.peakflow.cz`).
Pokud je doména v Cloudflare, DNS se nastaví samo; jinak přidejte `CNAME`
na `peakflow-web.<váš-subdoména>.workers.dev`.

### Deploy z příkazové řádky

```bash
npm run build
npx wrangler deploy      # vyžaduje `npx wrangler login`
```

`.github/workflows/ci.yml` ověřuje typy a build na každém PR.

## Poznámky k implementaci

Odchylky od prototypu v `design-source/` — všechny vědomé:

- **Navigace** je jednotná na všech stránkách (4 odkazy + CTA). Prototyp měl na
  Home zkrácenou verzi a na podstránkách starší pětiodkazovou; zkrácená byla
  novější rozhodnutí. Na stránce Kontakt se CTA tlačítko nezobrazuje.
- **Plovoucí štítek „Datová základna“** je v levém horním rohu karty
  dashboardu, posazený nad titulkovou lištu (`top: -55px`, hodnota naměřená
  v prohlížeči), takže nepřekrývá popisek „Přehled prodeje“.
- **Pořadí pilířů**: AI automatizace je první (I), pak datová analytika (II)
  a obchod/CRM (III) — na Home i na Služby, včetně římských číslic a
  kotevních odkazů.
- **Hero statistiky** („20–40 h“, „2–8 týdnů“) jsou odstraněné na přání.
- **Trust strip** uvádí „Looker Studio“. V prototypu tam byl omylem text
  „Přehled prodeje · září 2026“ — zbytek po hromadném přejmenování.
- **Responzivita**: prototyp byl kreslený pro desktop. Dvousloupcové mřížky se
  pod 900 px skládají do jednoho sloupce, navigace se zalamuje.
- **Přístupnost**: záložky pilířů mají `role="tab"`, dekorativní prvky
  `aria-hidden`, formulář má `autoComplete` a honeypot proti botům,
  `prefers-reduced-motion` vypíná animace.

Ověřeno v prohlížeči (Chromium): všechny interaktivní prvky, výpočty
kalkulačky, tvar payloadu na Web3Forms i chybové stavy formuláře (neplatný
klíč, HTTP 200 se `success:false`, chybějící klíč), nulový horizontální
přetok na 390 px.
