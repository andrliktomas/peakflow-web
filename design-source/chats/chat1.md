# Website project requirements

_Started 2026-09-15 19:01 UTC_

---

## User

I need website for this project:

## Assistant



## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: ask_user]_

Waiting on your answers about goal, structure, sections, pricing visibility, language, CTA and any brand assets — then I'll build the site.

## User

Answered — purpose: Get leads — book a discovery call, Credibility — support the entrance meeting; scope: Home + services + contact; sections: Hero, Three pillars, Case studies, How we work / process, Why Trueflow comparison, Pricing model (no numbers), FAQ, Contact / CTA; pricing: No, model only; language: Czech; tone: Formal B2B; variations: 2 hero/layout options

## Assistant

_[tool: read_skill_prompt]_

_[tool: update_todos]_

_[tool: dc_write]_

## User

okopíruj vizuál https://pricing-fox.cz/, jen chci ale jiné barvy a fonty

## Assistant

_[tool: copy_starter_component]_

_[tool: web_fetch]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: delete_file]_

_[tool: set_project_title]_

_[tool: ready_for_verification]_

Web ve struktuře pricing-fox.cz (tmavý hero se screenshotem + statistikami, karta toku dat, mřížka služeb, reference, proces, srovnávací tabulka, dva cenové bloky bez čísel, FAQ, CTA, footer) — v nových barvách (navy + teal) a fontech (Outfit + DM Sans).

Stránky: **Home.dc.html**, **Sluzby.dc.html**, **Kontakt.dc.html** (formulář s potvrzením).

Na co dát pozor:
- Do hero pole přetáhněte screenshot dashboardu.
- Formulář nikam neodesílá — doplním e‑mail/endpoint, až ho pošlete.
- Chybí kontaktní e‑mail a telefon; zatím je jen web analyticsflow.cz.

## User

měníme na PeakFlow, PeakFlow.cz

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Přejmenováno na PeakFlow / PeakFlow.cz na všech třech stránkách (název, logo „P“, odkazy na web, footer).

## User

https://www.abanalyticsgroup.com/

Co to je naše konkurence?

Potřeboval bych identifikovat marketingové nebo obchodní strategie, které komunikují oni a my ne.

Co bys na základě jejich stránky doporučil přidat na naši webovou stránku?

## Assistant

_[tool: web_fetch]_

**Kdo to je:** AB Analytics (Glendale, CA) — AI automatizace, voice agenti a business analytika pro menší servisní firmy v USA (pekárna, pokrývači, stavebnictví). Přímý konkurent jen částečně: překryv v AI automatizaci a analytice, ale míří na jiný trh (lokální SMB, ne B2B e‑shopy s legacy systémy). Spíš vzor pro komunikaci než hrozba.

**Co komunikují oni a my ne**

1. **Outcome-first headline.** „Running a business shouldn't take all your time“ — problém majitele, ne technologie. My říkáme *co* děláme (data, legacy, cloud), oni *co z toho má klient* (čas, klid, lepší rozhodnutí).
2. **Kvantifikované výsledky.** Každá case study má 4 čísla (20 % růst tržeb, 30 % méně odpadu…). My máme jen „desítky hodin měsíčně“ a jinak slova.
3. **Social proof v číslech i tvářích.** „48+ businesses trust us“, 4 testimonialy s jménem a rolí. My nemáme ani jednu citaci ani počet klientů.
4. **Sekce „Benefits“** — 6 obchodních přínosů (méně ruční práce, nižší náklady, vyšší kapacita bez náboru…). My máme srovnávací tabulku, ale ne přímé „co se u vás změní“.
5. **Krok „Measure & Improve“** — měření, zda systém opravdu šetří čas/peníze. My končíme „předání a provoz“; měření přínosu (které máme ve filozofii) na webu není.
6. **Okamžitá rezervace** — Calendly „Book a call“ v hlavičce i na konci; bez formuláře. My máme formulář, který někdo musí zpracovat.
7. **Newsletter + blog + About** — kanál pro nurturing a lidský rozměr (kdo za tím stojí).
8. **Nízký „bus factor“** jako argument v testimonialu — přesně naše „předáváme vlastnictví“, jen u nich to říká klient.

**Co doporučuji přidat na PeakFlow.cz** (podle dopadu)

1. **Přepsat hero na přínos**: např. „Přestaňte řídit firmu podle odhadů a Excelu“ + podtitul s tím, co získají (čistá data, hodiny zpět, rozhodnutí bez čekání na report). Technologie až do druhé věty.
2. **Čísla do case studies**: každý případ 3–4 metriky (hodiny/měsíc, % rychlejší kampaně, počet napojených systémů, dny do prvního dashboardu). I odhadované/rozsahové („20–40 h měsíčně“) fungují lépe než nic.
3. **Testimonialy**: 2–3 citace se jménem, rolí a odvětvím (klidně anonymizovaná firma: „CFO, B2B distributor, 300 M Kč obrat“). Bez toho je sekce Reference nejslabší místo webu.
4. **Sekce „Co se u vás změní“** (6 přínosů) — nahradit nebo doplnit srovnávací tabulku „Trueflow vs. dodavatel“, která mluví o nás, ne o klientovi.
5. **5. krok procesu „Měříme přínos“** — návratnost v týdnech/měsících máme v principech, dejme to do procesu s konkrétní metrikou.
6. **Kalendář přímo v CTA** (Calendly/Cal.com/Google rezervace) vedle formuláře — v hlavičce, hero, patičce.
7. **Trust strip** pod hero: počet projektů/napojených systémů/let, loga technologií (BigQuery, Looker, Raynet, Make, n8n).
8. **O nás** (Jiří Brtník, foto, proč vznikl PeakFlow) — u firmy jednoho zakladatele je to důvěra, ne detail.
9. **Odvětvová konkrétnost**: oni říkají „service businesses“, my „B2B e‑shopy a distributoři“ — dobré, ale přidal bych 3–4 typické situace („máte Pohodu/Point a Shoptet a nic spolu nemluví“).

Chcete, abych body 1, 2, 4, 5 a 7 rovnou zapracoval do Home (s placeholdery pro čísla a citace, které doplníte)?

## User

okay, dle svého nejlepšího uvážení to zapracuj do našeho webu

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Zapracováno do Home:

- **Hero** přepsán na přínos („Přestaňte řídit firmu podle odhadů a Excelu“) + statistiky výsledků.
- **Trust strip** s technologiemi a blok **„Znáte to?“** — 4 typické situace klientů.
- **Case studies** mají každá 4 metriky.
- **3 testimonialy** (anonymizované) + nová sekce **„Co se u vás změní“** (6 přínosů).
- Proces rozšířen o **5. krok „Měříme přínos“** (30/90 dní).
- Blok **„Kdo za PeakFlow stojí“** s místem na foto.

Důležité: čísla v case studies a citace jsou **návrhové placeholdery** — před spuštěním je nahraďte reálnými hodnotami, nebo mi je pošlete. Kalendář (Calendly/Cal.com) doplním, až budete mít odkaz.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Opraveno — plovoucí štítek v hero přesunut do pravého horního rohu karty, aby nepřekrýval popisek screenshotu.

## User

its too text-heavy

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Text na Home zkrácen zhruba o 40 %: hero na jednu větu, odstraněny podnadpisy sekcí, doplňkové služby a řádek statistik, srovnávací tabulka nahrazena třemi kartami, case studies mají 2 metriky místo 4, FAQ 6 → 4, všechny popisky zkráceny na jednu větu.

Pokud je to stále moc, další krok je vypustit celou sekci Přínosy nebo testimonialy — řekněte, kterou.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Opraveno: štítek v hero přesunut pod kartu (bez překryvu), popisek karty zkrácen, hero pill nezalamuje, navigace zkrácena na 4 odkazy + CTA, aby držela v jednom řádku.

## User

make it more interactive please

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: grep]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Přidáno na Home:

- **Tok dat** — karty se automaticky střídají (zvýraznění + progress bar + popisek), hover zastaví na vybrané.
- **Služby jako záložky** — tři pilíře přepínají panel s „živou“ simulací (pipeline běh, překlad produktu, zápis do Raynetu), s tlačítkem Přehrát znovu.
- **ROI kalkulačka** v sekci Přínosy — tři posuvníky (hodiny, sazba, podíl automatizace) → ušetřené hodiny, roční hodnota, přepočet na úvazky, CTA.
- **Scroll-reveal** sekcí při rolování.

_[tool: run_script]_

_[tool: ready_for_verification]_

- Hero: místo prázdného slotu je vlastní mock přehled — sloupcový graf tržeb po týdnech, dvě KPI (marže, objednávky) a tabulka kategorií. Nemá napodobovat Looker Studio.
- Blok se zakladatelem odstraněn.
- Stránka kontaktů už existuje: **Kontakt.dc.html** (formulář + časová osa dalších kroků), odkazovaná z navigace, CTA i patičky. Pokud jste ji měli na mysli jinak (např. s mapou, e‑mailem, telefonem, IČO), napište, co má obsahovat.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Opraveno: dashboard v hero má zpět `overflow:hidden`, hodnoty nezalamují, tabulka zkrácena na 3 řádky a kompaktnější rozměry, aby se vešla i v užším náhledu.

