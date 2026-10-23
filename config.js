/**
 * CONFIGURAȚIA SITE-ULUI — EDITAȚI CONȚINUTUL AICI
 * După modificare, salvați pe main pentru republicare.
 * Fișierele Drive trebuie partajate cu „Oricine are linkul / Cititor”.
 * Lăsați url: "" pentru documentele încă nepublicate.
 */
const SITE = {
  updatedAt: "23 octombrie 2026",

  // CONTACT — completați doar adresa confirmată a asociației.
  contactEmail: "",

  // ANUNȚURI — cel mai recent se pune primul.
  // Exemplu: { title: "Titlu", text: "Detalii", date: "23 octombrie 2026", important: true }
  announcements: [],

  // ============================================================
  // URL-URI DOCUMENTE STANDARD — LIPIȚI LINKURILE ÎNTRE GHILIMELE
  // ============================================================
  documents: [
    {
      title: "Carte de imobil",
      description: "Formular pentru actualizarea datelor din cartea imobilului.",
      url: "", // ← LINK DRIVE PENTRU CARTEA DE IMOBIL
    },
    {
      title: "Cereri și declarații",
      description: "Formulare standard pentru solicitări către asociație.",
      url: "", // ← LINK DRIVE PENTRU CERERI ȘI DECLARAȚII
    },
    {
      title: "Documente ale asociației",
      description: "Alte documente utile pentru proprietari și locatari.",
      url: "", // ← LINK DRIVE PENTRU DOCUMENTELE ASOCIAȚIEI
    },
  ],

  // ============================================================
  // PDF ÎNTREȚINERE — LIPIȚI URL-UL ȘI COMPLETAȚI LUNA
  // Primul document cu URL valid este afișat automat.
  // Pentru arhivă, adăugați câte un obiect pentru fiecare lună.
  // ============================================================
  maintenance: [
    {
      label: "", // ← LUNA ȘI ANUL, de exemplu: Octombrie 2026
      url: "", // ← LINK DRIVE CĂTRE PDF-UL LUNAR (nu folder)
    },
  ],
};
