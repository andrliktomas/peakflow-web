/**
 * Jedno místo pro identitu webu, kontakty a nastavení formuláře.
 */

export const site = {
  name: "PeakFlow",
  legalName: "PeakFlow s.r.o.",
  domain: "peakflow.cz",
  url: "https://peakflow.cz",
  description:
    "Datová analytika a AI automatizace pro moderní e-shopy a B2B firmy. Propojíme ERP, e-shop a legacy databáze, data vyčistíme a dodáme dashboardy i AI automatizace.",
} as const;

export const contact: {
  email: string;
  phone: string;
  /** Calendly / Cal.com / Google rezervace — zobrazí se jako tlačítko na Kontaktu. */
  bookingUrl: string | null;
} = {
  email: "info@peakflow.cz",
  phone: "+420 732 854 316",
  // TODO(klient): doplnit rezervační odkaz, až bude.
  bookingUrl: null,
};

/**
 * Kontaktní formulář jede přes Web3Forms (https://web3forms.com).
 *
 * `access_key` je *publishable* klíč: je navázaný na jednu e-mailovou adresu
 * (info@peakflow.cz) a umí jen jedno — poslat na ni zprávu. Web3Forms s tím
 * počítá, klíč je vidět ve zdrojovém kódu každé nasazené stránky, takže ho
 * nemá smysl tajit v repozitáři.
 *
 * Jde přebít proměnnou `NEXT_PUBLIC_WEB3FORMS_KEY` (Workers & Pages →
 * peakflow-web → Settings → Variables and Secrets), aby šel klíč vyměnit bez
 * zásahu do kódu. Protože je to `NEXT_PUBLIC_*` proměnná, zapeče se do buildu
 * — po změně je vždy potřeba nový deploy, restart nestačí.
 *
 * Kdyby na klíč někdo poslal spam, zneplatněte ho na web3forms.com, vygenerujte
 * nový a přepište ho tady (nebo v proměnné).
 */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const web3formsKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "0704ad42-9561-46ee-b379-c581b45ed4e6";
