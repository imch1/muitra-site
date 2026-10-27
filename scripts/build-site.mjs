import fs from 'node:fs';
import path from 'node:path';

const origin = 'https://muitra.com';
const languages = ['en', 'fr', 'es'];
const pages = ['home', 'tutorial', 'mission', 'solo', 'couples', 'roommates'];
const basePath = { home: '/', tutorial: '/tutorial', mission: '/mission', solo: '/solo/', couples: '/couples/', roommates: '/roommates/' };
const outputFile = { home: 'index.html', tutorial: 'tutorial.html', mission: 'mission.html', solo: 'solo/index.html', couples: 'couples/index.html', roommates: 'roommates/index.html' };
const dictionaries = Object.fromEntries(['home', 'tutorial', 'mission'].map((page) => [page, JSON.parse(fs.readFileSync(`content/${page}.json`, 'utf8'))]));

const labels = {
  en: { solo: 'For one person', couples: 'For couples', roommates: 'For roommates', explore: 'Find your way to use Muitra', exploreBody: 'Start on your own, share chores as a couple, or organize a household together.', download: 'Download Muitra' },
  fr: { solo: 'Pour une personne', couples: 'Pour les couples', roommates: 'Pour les colocations', explore: 'Muitra s’adapte à votre foyer', exploreBody: 'Organisez-vous seul, partagez les tâches à deux ou gérez une colocation.', download: 'Télécharger Muitra' },
  es: { solo: 'Para una persona', couples: 'Para parejas', roommates: 'Para compañeros de piso', explore: 'Muitra se adapta a tu hogar', exploreBody: 'Organízate a solas, reparte las tareas en pareja o coordina un piso compartido.', download: 'Descargar Muitra' },
};
const audienceIcons = { solo: '🧍', couples: '👫', roommates: '👥' };

const metadata = {
  en: {
    home: ['Muitra | Chores and routines for solo homes, couples and roommates', 'Organize personal routines or share household chores fairly. Muitra helps solo homes, couples and roommates plan recurring tasks on iPhone and Android.'],
    tutorial: ['How Muitra works | Personal routines and shared chores', 'See how Muitra organizes recurring tasks, shows what is due and rotates shared chores between people at home.'],
    mission: ['Our mission | Muitra', 'Why Muitra helps people organize home routines and share the mental load of household work.'],
    solo: ['Personal routine and chore app for one person | Muitra', 'Plan recurring household tasks, see what is due today and keep personal routines in one place with Muitra for solo homes.'],
    couples: ['A fair chore app for couples | Muitra', 'Share chores as a couple without keeping score. Muitra rotates recurring tasks and shows whose turn is next.'],
    roommates: ['Roommate chore rotation app | Muitra', 'Organize household chores with roommates. Muitra rotates recurring tasks and shows who does what in a group of up to six.'],
  },
  fr: {
    home: ['Muitra | Tâches et routines pour soi, en couple ou en colocation', 'Organisez vos routines personnelles ou répartissez les tâches ménagères équitablement, seul, en couple ou en colocation.'],
    tutorial: ['Comment fonctionne Muitra | Routines et tâches partagées', 'Découvrez comment Muitra planifie les tâches récurrentes et fait tourner les tâches partagées entre les membres du foyer.'],
    mission: ['Notre mission | Muitra', 'Pourquoi Muitra aide à organiser le quotidien et à partager la charge mentale des tâches ménagères.'],
    solo: ['Appli de routines et tâches ménagères en solo | Muitra', 'Planifiez les tâches ménagères récurrentes, voyez ce qui est prévu aujourd’hui et gardez vos routines personnelles au même endroit.'],
    couples: ['Répartition des tâches ménagères en couple | Muitra', 'Partagez les tâches ménagères en couple sans compter les points. Muitra fait tourner les routines et indique à qui est le tour.'],
    roommates: ['Rotation des tâches ménagères en colocation | Muitra', 'Organisez les tâches ménagères en colocation. Muitra fait tourner les routines dans un foyer de six personnes maximum.'],
  },
  es: {
    home: ['Muitra | Tareas y rutinas para ti, tu pareja o tus compañeros de piso', 'Organiza tus rutinas personales o reparte las tareas del hogar de forma justa, a solas, en pareja o en un piso compartido.'],
    tutorial: ['Cómo funciona Muitra | Rutinas y tareas compartidas', 'Descubre cómo Muitra organiza tareas recurrentes y rota las tareas compartidas entre las personas de casa.'],
    mission: ['Nuestra misión | Muitra', 'Por qué Muitra ayuda a organizar las rutinas del hogar y a repartir la carga mental de las tareas domésticas.'],
    solo: ['App de rutinas y tareas del hogar para una persona | Muitra', 'Planifica tareas recurrentes, mira qué toca hoy y guarda tus rutinas personales en un solo lugar.'],
    couples: ['App para repartir las tareas del hogar en pareja | Muitra', 'Reparte las tareas del hogar en pareja sin llevar la cuenta. Muitra rota las rutinas y muestra a quién le toca.'],
    roommates: ['App de turnos de limpieza para compañeros de piso | Muitra', 'Organiza las tareas del hogar con tus compañeros de piso. Muitra rota las rutinas para grupos de hasta seis personas.'],
  },
};

const audience = {
  en: {
    solo: { eyebrow: 'A calmer routine for one', title: 'Keep your home routines on track, on your own.', intro: 'Muitra works from day one with a home for one person. Put recurring household tasks in one place and see what needs doing today.', points: [['Make routines repeat', 'Add a task once, choose how often it comes back and let Muitra plan the next occurrence.'], ['See today and what is ahead', 'Use Today and the week or month calendar to keep your household tasks in view.'], ['Your tasks stay yours', 'A Solo home starts with personal tasks. You can later invite others by converting it to a Couple or Group home.'], ["Plan one-time tasks too", "Add one-time chores alongside recurring routines so unexpected jobs stay in the same view."]], related: 'Sharing a home later? Explore Muitra for couples or roommates.' },
    couples: { eyebrow: 'For two people sharing a home', title: 'Share chores fairly, without keeping score.', intro: 'Decide which chores you share and let Muitra keep track of whose turn comes next.', points: [['Rotate each routine', 'Choose the people on a recurring task. Completing it passes the next turn automatically.'], ['See who does what', 'Today and the calendar show upcoming work so you can plan together.'], ['Help without losing the balance', 'Help or cover a task when life changes. Muitra keeps the shared routine moving.'], ["Keep personal tasks separate", "Plan your own routines in the same home, apart from the chores you share."]], related: 'Living alone or with more people? Explore Solo or Group homes.' },
    roommates: { eyebrow: 'For shared flats and group homes', title: 'Put roommate chores on a clear rotation.', intro: 'Keep the household routine visible to everyone in a group of up to six people.', points: [['Give every task its own rotation', 'Pick who takes part in each recurring chore, from all roommates to a smaller group.'], ['Know whose turn is next', 'Muitra passes shared chores along when they are completed, with no separate rota to maintain.'], ['Plan as a household', 'Use Today and the calendar to see what is due and who is assigned.'], ["Keep your own routines", "Track personal tasks in the same home without adding them to the shared rotation."]], related: 'Need a personal routine or a two-person home? Explore Solo and Couple homes.' },
  },
  fr: {
    solo: { eyebrow: 'Un quotidien plus simple en solo', title: 'Gardez vos routines à la maison sous contrôle.', intro: 'Muitra fonctionne dès le premier jour avec un foyer d’une personne. Regroupez vos tâches ménagères récurrentes et voyez ce qui est prévu aujourd’hui.', points: [['Des routines qui reviennent', 'Ajoutez une tâche une fois, choisissez sa fréquence et laissez Muitra prévoir la prochaine échéance.'], ['Aujourd’hui et les jours suivants', 'Consultez Aujourd’hui ainsi que le calendrier par semaine ou par mois pour garder une vue d’ensemble.'], ['Vos tâches restent personnelles', 'Un foyer Solo commence avec des tâches personnelles. Vous pouvez ensuite le convertir en foyer Couple ou Groupe pour inviter d’autres personnes.'], ["Gérez aussi les imprévus", "Ajoutez une tâche ponctuelle à côté de vos routines pour ne rien oublier."]], related: 'Vous partagerez bientôt votre foyer ? Découvrez Muitra pour les couples et les colocations.' },
    couples: { eyebrow: 'Pour deux personnes sous le même toit', title: 'Partagez les tâches sans compter les points.', intro: 'Choisissez les tâches à partager et laissez Muitra suivre à qui revient le prochain tour.', points: [['Chaque routine passe à tour de rôle', 'Choisissez les participants d’une tâche récurrente. Une fois terminée, elle passe automatiquement à la personne suivante.'], ['Voyez qui fait quoi', 'Aujourd’hui et le calendrier affichent les tâches à venir pour vous organiser à deux.'], ['Aidez sans perdre l’équilibre', 'Aidez ou couvrez une tâche quand les plans changent. Muitra garde le fil de la routine partagée.'], ["Gardez vos tâches personnelles", "Organisez vos propres routines dans le même foyer, séparément des tâches partagées."]], related: 'Vous vivez seul ou à plusieurs ? Découvrez les foyers Solo et Groupe.' },
    roommates: { eyebrow: 'Pour les colocations et les groupes', title: 'Faites tourner les tâches en colocation.', intro: 'Partagez une organisation claire avec un groupe de six personnes maximum.', points: [['Une rotation par tâche', 'Choisissez qui participe à chaque corvée récurrente : toute la colocation ou seulement quelques personnes.'], ['À qui le tour ?', 'Quand une tâche partagée est terminée, Muitra passe le tour sans tableau de corvées à tenir à jour.'], ['Planifiez ensemble', 'Consultez Aujourd’hui et le calendrier pour voir les échéances et les personnes concernées.'], ["Chacun garde ses tâches", "Suivez vos routines personnelles dans le foyer sans les ajouter à la rotation commune."]], related: 'Besoin de routines personnelles ou d’un foyer à deux ? Découvrez Solo et Couple.' },
  },
  es: {
    solo: { eyebrow: 'Una rutina más tranquila para ti', title: 'Lleva al día las rutinas de casa por tu cuenta.', intro: 'Muitra funciona desde el primer día con un hogar de una persona. Reúne las tareas domésticas recurrentes y mira qué toca hoy.', points: [['Rutinas que se repiten', 'Añade una tarea una vez, elige cada cuánto se repite y deja que Muitra programe la siguiente.'], ['Hoy y los próximos días', 'Consulta Hoy y el calendario semanal o mensual para tener tus tareas a la vista.'], ['Tus tareas siguen siendo tuyas', 'Un hogar Solo empieza con tareas personales. Más adelante puedes convertirlo en Pareja o Grupo e invitar a otras personas.'], ["Organiza tareas puntuales", "Añade tareas de una sola vez junto a tus rutinas para no olvidar nada."]], related: '¿Vas a compartir casa más adelante? Descubre Muitra para parejas y compañeros de piso.' },
    couples: { eyebrow: 'Para dos personas que comparten casa', title: 'Repartid las tareas sin llevar la cuenta.', intro: 'Elegid qué tareas compartís y dejad que Muitra recuerde a quién le toca después.', points: [['Cada rutina tiene su turno', 'Elegid quién participa en una tarea recurrente. Al completarla, el siguiente turno pasa automáticamente.'], ['Ved quién hace qué', 'Hoy y el calendario muestran lo que viene para que podáis organizaros.'], ['Ayudad sin perder el equilibrio', 'Ayudad o cubrid una tarea cuando cambien los planes. Muitra mantiene el ritmo compartido.'], ["Mantén tus tareas personales", "Organiza tus propias rutinas en el mismo hogar, separadas de las tareas compartidas."]], related: '¿Vives a solas o con más gente? Descubre los hogares Solo y Grupo.' },
    roommates: { eyebrow: 'Para pisos compartidos y grupos', title: 'Organizad las tareas con turnos claros.', intro: 'Mantened las rutinas a la vista de todos en un grupo de hasta seis personas.', points: [['Un turno distinto por tarea', 'Elegid quién participa en cada tarea recurrente: todo el piso o un grupo más pequeño.'], ['Sabed a quién le toca', 'Al completar una tarea compartida, Muitra pasa el turno sin tener que mantener otra tabla.'], ['Planificad juntos', 'Consultad Hoy y el calendario para ver qué toca y quién se encarga.'], ["Cada persona tiene sus tareas", "Sigue tus rutinas personales en el mismo hogar sin añadirlas al turno compartido."]], related: '¿Necesitas rutinas personales o un hogar para dos? Descubre Solo y Pareja.' },
  },
};

const overrides = {
  en: { 'hero.eyebrow': 'For solo homes, couples & roommates', 'hero.title': 'Make home routines easier—<br /><em>alone or together.</em>', 'hero.sub': 'Plan your own recurring tasks or share household chores fairly. Muitra keeps track of what is due and, when you share a task, whose turn is next.', 'proof.people': 'people per home', 'proof.automatic': 'routines', 'get.body': 'Muitra is live on the App Store and Google Play. Start with a Solo, Couple or Group home.' },
  fr: { 'hero.eyebrow': 'Pour soi, en couple ou en colocation', 'hero.title': 'Des routines plus simples—<br /><em>seul ou à plusieurs.</em>', 'hero.sub': 'Planifiez vos tâches récurrentes ou partagez les tâches ménagères équitablement. Muitra suit les échéances et, pour les tâches partagées, à qui revient le prochain tour.', 'proof.people': 'personnes par foyer', 'proof.automatic': 'routines', 'get.body': 'Muitra est disponible sur l’App Store et Google Play. Commencez avec un foyer Solo, Couple ou Groupe.' },
  es: { 'hero.eyebrow': 'Para ti, tu pareja o tus compañeros de piso', 'hero.title': 'Rutinas de casa más fáciles—<br /><em>a solas o en compañía.</em>', 'hero.sub': 'Planifica tus tareas recurrentes o reparte las tareas del hogar de forma justa. Muitra recuerda qué toca y, en las tareas compartidas, a quién le toca después.', 'proof.people': 'personas por hogar', 'proof.automatic': 'rutinas', 'get.body': 'Muitra ya está disponible en App Store y Google Play. Empieza con un hogar Solo, Pareja o Grupo.' },
};
const pageOverrides = {
  en: { tutorial: { 'tutorial.intro_body': 'Start with a home for one, a couple or a group. Add routines for yourself or share tasks with others.', 'tutorial.fair_body': 'For shared routines, Muitra keeps turns balanced between the selected people. Solo routines stay with you.' }, mission: { 'mission.b3.title': 'Built for one person or a household', 'mission.b3.body': 'Start with personal routines in a Solo home, share tasks with a partner, or coordinate a group of up to six.' } },
  fr: { tutorial: { 'tutorial.intro_body': 'Commencez seul, en couple ou en groupe. Ajoutez des routines personnelles ou partagez les tâches avec les autres.', 'tutorial.fair_body': 'Pour les routines partagées, Muitra équilibre les tours entre les personnes choisies. Les routines Solo restent les vôtres.' }, mission: { 'mission.b3.title': 'Pensé pour soi ou pour un foyer', 'mission.b3.body': 'Commencez avec des routines personnelles en Solo, partagez les tâches à deux ou coordonnez un groupe de six personnes maximum.' } },
  es: { tutorial: { 'tutorial.intro_body': 'Empieza a solas, en pareja o en grupo. Añade rutinas personales o comparte tareas con otras personas.', 'tutorial.fair_body': 'En las rutinas compartidas, Muitra equilibra los turnos entre las personas elegidas. Las rutinas Solo siguen siendo tuyas.' }, mission: { 'mission.b3.title': 'Pensado para una persona o un hogar', 'mission.b3.body': 'Empieza con rutinas personales en Solo, comparte tareas en pareja o coordina un grupo de hasta seis personas.' } },
};

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function imageSize(file) {
  const header = Buffer.alloc(24);
  const fd = fs.openSync(file, 'r');
  try { fs.readSync(fd, header, 0, 24, 0); } finally { fs.closeSync(fd); }
  if (header.subarray(1, 4).toString() !== 'PNG') throw new Error(`Expected PNG: ${file}`);
  return `width="${header.readUInt32BE(16)}" height="${header.readUInt32BE(20)}"`;
}

function url(page, lang) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const suffix = lang !== 'en' && ['tutorial', 'mission'].includes(page) ? '/' : '';
  return `${origin}${prefix}${basePath[page]}${suffix}`;
}

function localPath(page, lang) {
  return new URL(url(page, lang)).pathname;
}

function translate(html, dictionary) {
  html = html.replace(/(<([a-z][a-z0-9]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi, (whole, open, tag, key, _old, close) => {
    if (!(key in dictionary)) throw new Error(`Missing translation: ${key}`);
    return `${open}${escapeHtml(dictionary[key])}${close}`;
  });
  html = html.replace(/(<h1\b[^>]*\bdata-i18n-html="([^"]+)"[^>]*>)[\s\S]*?(<\/h1>)/gi, (whole, open, key, close) => {
    if (!(key in dictionary)) throw new Error(`Missing HTML translation: ${key}`);
    const allowed = dictionary[key].replace(/<br\s*\/>|<em>|<\/em>/g, '');
    if (/[<>]/.test(allowed)) throw new Error(`Unexpected HTML in ${key}`);
    return `${open}${dictionary[key]}${close}`;
  });
  html = html.replace(/<[^>]+\bdata-i18n-aria="([^"]+)"[^>]*>/gi, (tag, key) => {
    if (!(key in dictionary)) throw new Error(`Missing ARIA translation: ${key}`);
    return tag.replace(/aria-label="[^"]*"/, `aria-label="${escapeHtml(dictionary[key])}"`);
  });
  return html;
}

function audienceMain(page, lang) {
  const data = audience[lang][page];
  const points = data.points.map(([title, body]) => `<article class="value"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></article>`).join('\n      ');
  return `<main id="top">
    <section class="tut-hero audience-hero">
      <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
      <h1 class="tut-title">${escapeHtml(data.title)}</h1>
      <p class="tut-sub">${escapeHtml(data.intro)}</p>
    </section>
    <section class="values grid-2 audience-values" aria-label="${escapeHtml(labels[lang][page])}">${points}</section>
    <section class="get reveal audience-get" id="get">
      <h2>${escapeHtml(labels[lang].download)}</h2>
      <p>${escapeHtml(data.related)}</p>
      <div class="store-links">
        <a class="btn btn-light btn-lg" href="https://apps.apple.com/app/id6783798977" target="_blank" rel="noopener">${escapeHtml(dictionaries.home[lang]['hero.ctaPrimary'])}</a>
        <a class="btn btn-dark btn-lg" href="https://play.google.com/store/apps/details?id=com.imch.muitra">${escapeHtml(dictionaries.home[lang]['hero.ctaSecondary'])}</a>
      </div>
    </section>
  </main>`;
}

function addAudienceLinks(html, lang, page) {
  const isTop = ['mission', 'solo', 'couples', 'roommates'].includes(page);
  const links = ['solo', 'couples', 'roommates'].map((kind) => `<a class="audience-card" href="${localPath(kind, lang)}"${kind === page ? ' aria-current="page"' : ''}><span class="audience-card-icon" aria-hidden="true">${audienceIcons[kind]}</span><span class="audience-card-label">${escapeHtml(labels[lang][kind])}</span><span class="audience-card-arrow" aria-hidden="true">→</span></a>`).join('\n        ');
  const section = `<section class="audience-section${isTop ? ' audience-section-top' : ''}" aria-labelledby="audience-title"><div class="section-heading"><h2 id="audience-title">${escapeHtml(labels[lang].explore)}</h2><p>${escapeHtml(labels[lang].exploreBody)}</p></div><div class="audience-cards">${links}</div></section>`;
  if (page === 'home') return html.replace('    <!-- ===== Get the app ===== -->', `${section}\n    <!-- ===== Get the app ===== -->`);
  return html.replace('    <section class="values grid-2', `    ${section}\n\n    <section class="values grid-2`);
}

function build(page, lang) {
  const templatePage = ['solo', 'couples', 'roommates'].includes(page) ? 'mission' : page;
  let html = fs.readFileSync(`templates/${templatePage}.template`, 'utf8');
  const dictionary = { ...dictionaries[templatePage][lang], ...(page === 'home' ? overrides[lang] : {}), ...(pageOverrides[lang][page] || {}) };
  html = translate(html, dictionary);
  if (['solo', 'couples', 'roommates'].includes(page)) html = html.replace(/<main id="top">[\s\S]*?<\/main>/, audienceMain(page, lang));
  html = addAudienceLinks(html, lang, page);
  html = html.replace('<html lang="en">', `<html lang="${lang}">`);
  html = html.replace(/(<a[^>]+href=")\/(tutorial|mission)(")/g, (_m, start, target, end) => `${start}${localPath(target, lang)}${end}`);
  html = html.replace(/href="\/#(features|get)"/g, (_whole, fragment) => `href="${localPath('home', lang)}#${fragment}"`);
  html = html.replace(/href="\/"/g, `href="${localPath('home', lang)}"`);
  html = html.replace(/(<a[^>]+href=")#top(")/g, (_m, start, end) => `${start}${localPath('home', lang)}${end}`);
  html = html.replace(/(<a[^>]+href=")#features(")/g, (_m, start, end) => `${start}${localPath('home', lang)}#features${end}`);
  html = html.replace(/(<a[^>]+href=")#get(")/g, (_m, start, end) => `${start}${localPath('home', lang)}#get${end}`);
  if (['solo', 'couples', 'roommates'].includes(page)) html = html.replace(/ class="current" aria-current="page"/g, '');
  html = html.replace(/<div class="lang-switch"[^>]*>[\s\S]*?<\/div>/, `<div class="lang-switch" role="group" aria-label="Language">${languages.map((code) => `<a href="${localPath(page, code)}" hreflang="${code}" lang="${code}"${code === lang ? ' class="active" aria-current="page"' : ''}>${code.toUpperCase()}</a>`).join('')}</div>`);
  const ariaLabels = { fr: { 'Muitra home': 'Accueil Muitra', 'Primary navigation': 'Navigation principale', 'Site menu': 'Menu du site', Language: 'Langue', Screens: 'Captures d’écran', 'Why Muitra': 'Pourquoi Muitra' }, es: { 'Muitra home': 'Inicio de Muitra', 'Primary navigation': 'Navegación principal', 'Site menu': 'Menú del sitio', Language: 'Idioma', Screens: 'Capturas de pantalla', 'Why Muitra': 'Por qué Muitra' } };
  if (ariaLabels[lang]) for (const [source, translated] of Object.entries(ariaLabels[lang])) html = html.replaceAll(`aria-label="${source}"`, `aria-label="${translated}"`);
  html = html.replace(/(href|src)="(assets\/|site\.webmanifest|styles\.css)/g, '$1="/$2');
  html = html.replace(/<script src="(?:app|tutorial|mission)\.js[^\"]*"><\/script>/, '<script src="/site.js"></script>');
  if (page === 'home') {
    html = html.replace('<strong>2–6</strong>', '<strong>1–6</strong>');
    html = html.replace('<strong>100%</strong>', `<strong>${{ en: 'Solo + Shared', fr: 'Solo + Partagé', es: 'Solo + Compartido' }[lang]}</strong>`);
    html = html.replace(/<img id="heroShot"[^>]*\/>/, `<img id="heroShot" src="/assets/screens/${lang}/2.png" alt="${escapeHtml(dictionaries.home[lang].alt[1])}" ${imageSize(`assets/screens/${lang}/2.png`)} fetchpriority="high" />`);
    for (let i = 1; i <= 6; i++) html = html.replace(new RegExp(`<img id="shot${i}"[^>]*\\/>`), `<img id="shot${i}" src="/assets/screens/${lang}/${i}.png" alt="${escapeHtml(dictionaries.home[lang].alt[i - 1])}" ${imageSize(`assets/screens/${lang}/${i}.png`)} loading="lazy" />`);
  }
  if (page === 'tutorial') for (let i = 1; i <= 5; i++) html = html.replace(new RegExp(`<img id="t${i}"[^>]*\\/>`), `<img id="t${i}" src="/assets/screens/${lang}/${i}.png" alt="${escapeHtml(dictionaries.tutorial[lang].alt[i - 1])}" ${imageSize(`assets/screens/${lang}/${i}.png`)} loading="lazy" />`);
  const [title, description] = metadata[lang][page];
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/\s*<!-- Open Graph \/ social -->[\s\S]*?<meta name="twitter:card"[^>]*\/>/, '');
  const canonical = url(page, lang);
  const alternates = languages.map((code) => `<link rel="alternate" hreflang="${code}" href="${url(page, code)}" />`).join('\n  ');
  const structured = page === 'home' ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'WebSite', name: 'Muitra', url: origin }, { '@type': 'Organization', name: 'Muitra', url: origin, logo: `${origin}/assets/icon-512.png`, sameAs: ['https://www.instagram.com/muitrapp/', 'https://x.com/muitrapp', 'https://www.tiktok.com/@muitrapp'] }] })}</script>` : '';
  const head = `<link rel="canonical" href="${canonical}" />\n  ${alternates}\n  <link rel="alternate" hreflang="x-default" href="${url(page, 'en')}" />\n  <meta property="og:type" content="website" />\n  <meta property="og:title" content="${escapeHtml(title)}" />\n  <meta property="og:description" content="${escapeHtml(description)}" />\n  <meta property="og:url" content="${canonical}" />\n  <meta property="og:image" content="${origin}/assets/screens/${lang}/2.png" />\n  <meta name="twitter:card" content="summary_large_image" />\n  ${structured}`;
  html = html.replace(/(<meta name="description"[^>]*\/>)/, `$1\n  ${head}`);
  html = html.replace(/\sdata-i18n(?:-html|-aria)?="[^"]+"/g, '');
  html = html.replace(/^  $/gm, '');
  if (html.includes('src="assets/') || html.includes('href="assets/')) throw new Error(`Relative asset in ${page}/${lang}`);
  const file = lang === 'en' ? outputFile[page] : path.join(lang, page === 'home' ? 'index.html' : `${page}/index.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

for (const page of pages) for (const lang of languages) build(page, lang);
const entries = pages.flatMap((page) => languages.map((lang) => `  <url><loc>${url(page, lang)}</loc></url>`));
fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`);
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.copyFileSync('scripts/runtime-source.js', 'site.js');
