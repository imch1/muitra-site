/* Mission page — EN / FR / ES (Spanish stays informal: tú / vosotros) */
const I18N = {
  en: {
    "nav.cta": "Get the app",
    "menu.how": "How it works",
    "menu.mission": "Mission",
    "menu.privacy": "Privacy policy",
    "menu.contact": "Contact",
    "menu.copied": "Copied!",
    "menu.language": "Language",
    "mission.eyebrow": "Our mission",
    "mission.title": "A home that feels fair.",
    "mission.sub": "Muitra exists to take the mental load off one person's shoulders — and share it, quietly and fairly, between everyone who lives there.",
    "mission.b1.title": "Sharing, not scorekeeping",
    "mission.b1.body": "Most homes run on one person remembering everything. Muitra turns that invisible work into a shared rhythm — no nagging, and no tally to keep in your head.",
    "mission.b2.title": "The mental load is real work",
    "mission.b2.body": "Deciding what needs doing, and when, is a job in itself. We make that job visible and split it — not just the chores, but the remembering.",
    "mission.b3.title": "Built for partners and households",
    "mission.b3.body": "Whether you're two or six, Muitra keeps turns balanced automatically — so your home runs on trust instead of resentment.",
    "mission.b4.title": "Small habits, calmer home",
    "mission.b4.body": "A fairer home is built from tiny, repeatable moments. Muitra protects those habits so daily life feels lighter for everyone.",
    "mission.ctaTitle": "Be part of it",
    "mission.ctaBody": "Muitra is in closed testing on Android. Request access and we'll add you to the beta.",
    "mission.ctaButton": "Get the app",
    "footer.home": "Home",
    "footer.privacy": "Privacy policy",
    "footer.contact": "Contact"
  },
  fr: {
    "nav.cta": "Obtenir l'appli",
    "menu.how": "Comment ça marche",
    "menu.mission": "Mission",
    "menu.privacy": "Confidentialité",
    "menu.contact": "Contact",
    "menu.copied": "Copié !",
    "menu.language": "Langue",
    "mission.eyebrow": "Notre mission",
    "mission.title": "Un foyer qui semble juste.",
    "mission.sub": "Muitra existe pour retirer la charge mentale des épaules d'une seule personne — et la partager, sans bruit et équitablement, entre tous ceux qui vivent là.",
    "mission.b1.title": "Partager, pas compter les points",
    "mission.b1.body": "La plupart des foyers reposent sur une personne qui pense à tout. Muitra transforme ce travail invisible en un rythme partagé — plus besoin de rappeler, ni de tenir les comptes dans sa tête.",
    "mission.b2.title": "La charge mentale est un vrai travail",
    "mission.b2.body": "Décider de ce qu'il faut faire, et quand, est un travail en soi. On le rend visible et on le partage — pas seulement les tâches, mais le fait d'y penser.",
    "mission.b3.title": "Pensé pour les couples et les foyers",
    "mission.b3.body": "À deux ou à six, Muitra garde les tours équilibrés automatiquement — pour que votre foyer repose sur la confiance plutôt que sur les rancœurs.",
    "mission.b4.title": "De petites habitudes, un foyer plus serein",
    "mission.b4.body": "Un foyer plus juste se construit avec de petits moments répétés. Muitra protège ces habitudes pour alléger le quotidien de chacun.",
    "mission.ctaTitle": "En faire partie",
    "mission.ctaBody": "Muitra est en test fermé sur Android. Demandez l'accès et on vous ajoute à la bêta.",
    "mission.ctaButton": "Obtenir l'appli",
    "footer.home": "Accueil",
    "footer.privacy": "Confidentialité",
    "footer.contact": "Contact"
  },
  es: {
    "nav.cta": "Obtener la app",
    "menu.how": "Cómo funciona",
    "menu.mission": "Misión",
    "menu.privacy": "Privacidad",
    "menu.contact": "Contacto",
    "menu.copied": "¡Copiado!",
    "menu.language": "Idioma",
    "mission.eyebrow": "Nuestra misión",
    "mission.title": "Un hogar que se siente justo.",
    "mission.sub": "Muitra existe para quitar la carga mental de los hombros de una sola persona — y repartirla, sin ruido y de forma justa, entre todos los que viven allí.",
    "mission.b1.title": "Repartir, no llevar la cuenta",
    "mission.b1.body": "La mayoría de los hogares dependen de una persona que se acuerda de todo. Muitra convierte ese trabajo invisible en un ritmo compartido — nadie tiene que recordárselo a los demás ni llevar la cuenta en su cabeza.",
    "mission.b2.title": "La carga mental es trabajo de verdad",
    "mission.b2.body": "Decidir qué hay que hacer, y cuándo, ya es un trabajo en sí. Lo hacemos visible y lo repartimos — no solo las tareas, también el acordarse.",
    "mission.b3.title": "Pensado para parejas y hogares",
    "mission.b3.body": "Seáis dos o seis, Muitra mantiene los turnos equilibrados de forma automática — para que vuestro hogar funcione con confianza y no con rencor.",
    "mission.b4.title": "Pequeños hábitos, un hogar más tranquilo",
    "mission.b4.body": "Un hogar más justo se construye con pequeños momentos repetidos. Muitra cuida esos hábitos para que el día a día sea más ligero para todos.",
    "mission.ctaTitle": "Forma parte",
    "mission.ctaBody": "Muitra está en prueba cerrada en Android. Solicita acceso y te añadimos a la beta.",
    "mission.ctaButton": "Obtener la app",
    "footer.home": "Inicio",
    "footer.privacy": "Privacidad",
    "footer.contact": "Contacto"
  }
};

const SUPPORTED = ["en", "fr", "es"];

function applyLang(lang) {
  if (!SUPPORTED.includes(lang)) lang = "en";
  const dict = I18N[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
  try { localStorage.setItem("muitra_lang", lang); } catch (e) {}
}

function initialLang() {
  let saved = null;
  try { saved = localStorage.getItem("muitra_lang"); } catch (e) {}
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return SUPPORTED.includes(nav) ? nav : "en";
}

function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const panel = document.getElementById("menuPanel");
  const overlay = document.getElementById("menuOverlay");
  if (!toggle || !panel) return;
  function setOpen(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    if (overlay) overlay.hidden = !open;
  }
  toggle.addEventListener("click", () =>
    setOpen(!document.body.classList.contains("menu-open"))
  );
  if (overlay) overlay.addEventListener("click", () => setOpen(false));
  panel.querySelectorAll(".menu-nav a").forEach((a) =>
    a.addEventListener("click", () => { if (a.id !== "menuContact") setOpen(false); })
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function initContact() {
  const link = document.getElementById("menuContact");
  if (!link) return;
  const flag = link.querySelector(".menu-copied");
  link.addEventListener("click", () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText("muitrapp@gmail.com").catch(() => {});
    }
    if (flag) {
      flag.hidden = false;
      clearTimeout(link._t);
      link._t = setTimeout(() => { flag.hidden = true; }, 2000);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.addEventListener("click", () => applyLang(b.dataset.lang));
  });
  applyLang(initialLang());
  initMenu();
  initContact();
});
