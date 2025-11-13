// Editable listado de repos destacados.
// Para cambiar los proyectos visibles: ajusta este arreglo.
// Control global: modifica MAX_FEATURED para mostrar más/menos (por defecto 4).
// Campos:
// owner: usuario/organización GitHub
// repo: nombre del repositorio
// title: título mostrado
// description: texto corto mostrado en la tarjeta
// type: 'web' | 'mobile'
// tech: tecnologías principales

export interface FeaturedRepoConfig {
  owner: string;
  repo: string;
  title: string;
  description: string;
  type: 'web' | 'mobile';
  tech: string[];
}

export const featuredRepos: FeaturedRepoConfig[] = [
  {
    owner: 'A00838521',
    repo: 'Portfolio',
    title: 'Portfolio',
    description: 'Portafolio personal construido con React, Vite y Tailwind.',
    type: 'web',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS']
  },
  {
    owner: 'A00838521',
    repo: 'WindowManager',
    title: 'WindowManager',
    description: 'Experimentos con MediaPipe y control tipo window manager.',
    type: 'web',
    tech: ['Python', 'MediaPipe']
  },
  {
    owner: 'A00838521',
    repo: 'ForaneoApp',
    title: 'Foráneo App',
    description: 'App móvil con Flutter para estudiantes foráneos.',
    type: 'mobile',
    tech: ['Flutter', 'Dart']
  },
  {
    owner: 'A00838521',
    repo: 'TryingEEG',
    title: 'Trying EEG',
    description: 'Exploración de señales EEG y notebooks.',
    type: 'web',
    tech: ['Python', 'Jupyter']
  }
];

// Número máximo de repos a mostrar en la sección de proyectos.
// Aumenta o reduce este valor según necesites.
export const MAX_FEATURED = 4;
