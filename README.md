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
lib/site.ts            ⚠️ kontakty a endpoint formuláře — viz níže
design-source/         původní handoff z Claude Design (reference)
```

## ⚠️ Co je potřeba doplnit před spuštěním

### 1. Kontakty — `lib/site.ts`

```ts
export const contact = {
  email: null,       // → "jiri@peakflow.cz"
  phone: null,       // → "+420 …"
  bookingUrl: null,  // → Calendly / Cal.com odkaz
};
```

Dokud jsou `null`, web je prostě nezobrazuje (žádné prázdné řádky ani mrtvé
odkazy). Po vyplnění se e-mail a telefon objeví v patičce i na stránce Kontakt,
`bookingUrl` přidá tlačítko „Rezervovat termín v kalendáři“.

### 2. Odesílání formuláře — proměnná `NEXT_PUBLIC_FORM_ENDPOINT`

Formulář posílá `FormData` na endpoint z této proměnné. Funguje s Formspree,
Web3Forms i vlastním API.

```bash
# lokálně: .env.local
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

V produkci: **Workers & Pages → peakflow-web → Settings → Variables and
Secrets** → přidat `NEXT_PUBLIC_FORM_ENDPOINT` a spustit nový deploy.

> Dokud proměnná není nastavená, formulář zvaliduje vstupy a zobrazí potvrzení,
> ale **nic neodešle** — jen zaloguje varování do konzole prohlížeče.

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

*Workers & Pages → peakflow-web → Settings → Variables and Secrets* → přidat
`NEXT_PUBLIC_FORM_ENDPOINT` a spustit nový deploy. Protože jde o
`NEXT_PUBLIC_*` proměnnou, zapeče se do buildu — po změně je vždy potřeba
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
- **Plovoucí štítek „Datová základna“** v hero je umístěný pod kartou
  dashboardu. V prototypu byl absolutně pozicovaný přes celý sloupec a
  překrýval statistiku „20–40 h“ — zadání dvakrát žádalo, aby nic nepřekrýval.
- **Trust strip** uvádí „Looker Studio“. V prototypu tam byl omylem text
  „Přehled prodeje · září 2026“ — zbytek po hromadném přejmenování.
- **Responzivita**: prototyp byl kreslený pro desktop. Dvousloupcové mřížky se
  pod 900 px skládají do jednoho sloupce, navigace se zalamuje.
- **Přístupnost**: záložky pilířů mají `role="tab"`, dekorativní prvky
  `aria-hidden`, formulář má `autoComplete` a honeypot proti botům,
  `prefers-reduced-motion` vypíná animace.
