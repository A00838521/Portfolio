import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'es' | 'en';

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
};

const dictionaries: Record<Lang, Record<string, string>> = {
  es: {
    'nav.about': 'Sobre Mí',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.github': 'GitHub',
    'nav.interests': 'Intereses',

    'actions.downloadCV': 'Descargar CV',
    'actions.darkMode': 'Modo Oscuro',
    'actions.lightMode': 'Modo Claro',
    'actions.lang': 'EN',

    'about.title': 'Hola, soy Bruno Vázquez Espinoza',
    'about.bio1': 'Estudiante apasionado por la tecnología y el desarrollo de software. Me especializo en crear soluciones que combinan diseño elegante con funcionalidad robusta, con enfoque en frontend, ciberseguridad y aplicaciones móviles.',
    'about.bio2': 'Siempre busco desafíos que me permitan crecer y aportar valor a través de la tecnología. Me encanta aprender continuamente y trabajar en proyectos con impacto real.',
    'about.degree': 'Ingeniería en Tecnologías Computacionales (ITESM, 2023–2027)',
    'about.location': 'Monterrey, México',
    'about.availability': 'Disponible para colaborar',
    'about.stats.years': 'Años Estudiando',
    'about.stats.projects': 'Proyectos',
    'about.stats.tech': 'Tecnologías',

    'interests.title': 'Intereses Personales',
    'interests.subtitle': 'Áreas de investigación y desarrollo que me apasionan',
    'interests.cta.title': '¿Compartes estos intereses?',
    'interests.cta.text': 'Siempre estoy abierto a colaborar en proyectos relacionados con ciberseguridad, neurociencia e inteligencia artificial. Si tienes ideas o propuestas, ¡hablemos! ',
    'interests.cta.button': 'Conectemos',
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.github': 'GitHub',
    'nav.interests': 'Interests',

    'actions.downloadCV': 'Download CV',
    'actions.darkMode': 'Dark Mode',
    'actions.lightMode': 'Light Mode',
    'actions.lang': 'ES',

    'about.title': "Hi, I'm Bruno Vázquez Espinoza",
    'about.bio1': 'Student passionate about technology and software development. I build solutions that blend elegant design with robust functionality, focusing on frontend, cybersecurity, and mobile apps.',
    'about.bio2': 'I constantly seek challenges to grow and deliver value through technology. I love continuous learning and building projects with real impact.',
    'about.degree': 'B.S. in Computer Technologies (ITESM, 2023–2027)',
    'about.location': 'Monterrey, Mexico',
    'about.availability': 'Open to collaborate',
    'about.stats.years': 'Years Studying',
    'about.stats.projects': 'Projects',
    'about.stats.tech': 'Technologies',

    'interests.title': 'Personal Interests',
    'interests.subtitle': 'Research and development areas I’m passionate about',
    'interests.cta.title': 'Share these interests?',
    'interests.cta.text': 'I’m always open to collaborate on projects related to cybersecurity, neuroscience and AI. If you have ideas or proposals, let’s talk!',
    'interests.cta.button': 'Let’s connect',
  },
};

const I18nContext = createContext<I18nContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');
  const toggleLang = () => setLang(prev => (prev === 'es' ? 'en' : 'es'));
  const t = (key: string) => dictionaries[lang][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
