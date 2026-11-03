// Fixed texts of the page in every language. Both languages must have the same keys,
// so a missing translation fails `npm run check`.
export const languages = ['en', 'sk'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

const en = {
  'nav.label': 'Sections',
  'nav.about': 'About',
  'nav.work': 'Work',
  'nav.skills': 'Skills',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',
  'link.email': 'Email',
  'section.about': 'About',
  'section.work': 'Selected work',
  'section.skills': 'Skills',
  'section.experience': 'Experience',
  'section.contact': 'Contact',
  'project.at': 'at',
  'project.more': 'Would you like to know more?',
  'project.back': 'All projects',
  'project.navLabel': 'Navigation',
  'notFound.title': 'Page not found',
  'notFound.text': "This page doesn't exist, or it has moved.",
  'notFound.back': 'Back to the homepage',
  'switch.title': 'English version',
  'switch.navLabel': 'Language',
};

const sk: Record<keyof typeof en, string> = {
  'nav.label': 'Sekcie stránky',
  'nav.about': 'O mne',
  'nav.work': 'Projekty',
  'nav.skills': 'Zručnosti',
  'nav.experience': 'Skúsenosti',
  'nav.contact': 'Kontakt',
  'link.email': 'E-mail',
  'section.about': 'O mne',
  'section.work': 'Vybrané projekty',
  'section.skills': 'Zručnosti',
  'section.experience': 'Pracovné skúsenosti',
  'section.contact': 'Kontakt',
  'project.at': 'v',
  'project.more': 'Chcete vedieť viac?',
  'project.back': 'Všetky projekty',
  'project.navLabel': 'Navigácia',
  'notFound.title': 'Stránka sa nenašla',
  'notFound.text': 'Táto stránka neexistuje alebo bola presunutá.',
  'notFound.back': 'Späť na úvodnú stránku',
  'switch.title': 'Slovenská verzia',
  'switch.navLabel': 'Jazyk',
};

const ui: Record<Lang, typeof en> = { en, sk };

export const t = (lang: Lang) => ui[lang];

// Slovak names of project tags that are concepts, not tools. Project files keep the English tags
// in both languages (the translation check compares them); other tags are shown as they are.
const tagTranslations: Record<Exclude<Lang, 'en'>, Record<string, string>> = {
  sk: {
    Statistics: 'Štatistika',
    'Linear programming': 'Lineárne programovanie',
    Testing: 'Testovanie',
    'Excel/VBA automation': 'Automatizácia Excel/VBA',
  },
};

export const translateTag = (lang: Lang, tag: string) => (lang === 'en' ? tag : (tagTranslations[lang][tag] ?? tag));

// Picks the right language from a YAML value that is either one text or `{ en, sk }`.
export const pick = (lang: Lang, value: string | Record<Lang, string>) =>
  typeof value === 'string' ? value : value[lang];

// Home page of each language.
export const homePath = (lang: Lang) => (lang === defaultLang ? '/' : `/${lang}/`);

// A project's own page: /work/<slug>, or /sk/work/<slug>.
export const projectPath = (lang: Lang, slug: string) => `${homePath(lang)}work/${slug}`;

// The same page in every language, e.g. for hreflang links and the language switch.
export type PagePaths = Record<Lang, string>;
export const pathsFor = (path: (lang: Lang) => string): PagePaths =>
  Object.fromEntries(languages.map((lang) => [lang, path(lang)])) as PagePaths;
