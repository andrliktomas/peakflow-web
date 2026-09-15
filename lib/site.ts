/**
 * Single place for everything the client still has to supply.
 *
 * The design handoff left three things open (see design-source/chats/chat1.md):
 * a contact e-mail, a phone number, and a booking link (Calendly / Cal.com).
 * Until they arrive, `null` means "not known yet" and the UI simply omits the
 * element rather than rendering an empty row or a dead link.
 */

export const site = {
  name: "PeakFlow",
  legalName: "PeakFlow s.r.o.",
  domain: "peakflow.cz",
  url: "https://peakflow.cz",
  founder: "Jiří Brtník",
  description:
    "Datová analytika a AI automatizace pro moderní e-shopy a B2B firmy. Propojíme ERP, e-shop a legacy databáze, data vyčistíme a dodáme dashboardy i AI automatizace.",
} as const;

/**
 * TODO(klient): doplnit skutečné kontakty.
 * Jakmile je vyplníte, objeví se automaticky na stránce Kontakt i v patičce.
 */
export const contact: {
  email: string | null;
  phone: string | null;
  /** Calendly / Cal.com / Google rezervace — nahradí formulář jako primární CTA. */
  bookingUrl: string | null;
} = {
  email: null,
  phone: null,
  bookingUrl: null,
};

/**
 * Kam se odesílá kontaktní formulář.
 *
 * Nastavte proměnnou prostředí `NEXT_PUBLIC_FORM_ENDPOINT` (v Cloudflare Pages
 * pod Settings → Environment variables) na URL vaší form služby, např.:
 *   Formspree  https://formspree.io/f/xxxxxxxx
 *   Web3Forms  https://api.web3forms.com/submit
 *   vlastní    https://api.peakflow.cz/kontakt
 *
 * Endpoint dostane JSON i `multipart/form-data` (posíláme FormData, aby to
 * fungovalo s většinou služeb bez dalšího nastavení) a musí vrátit 2xx.
 * Dokud proměnná není nastavená, formulář validuje a zobrazí potvrzení,
 * ale nic neodesílá — a do konzole zaloguje varování.
 */
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
