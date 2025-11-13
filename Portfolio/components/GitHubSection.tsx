import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Star, GitFork, ExternalLink, Sparkles } from 'lucide-react';
import { GitHubContributions } from './GitHubContributions';
import { useI18n } from '../i18n';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
}

interface InterestingRepo {
  name: string;
  author: string;
  description: string;
  url: string;
  stars: string;
  language: string;
  languageColor: string;
}

// Datos de ejemplo - estos se reemplazarán con datos reales de la API
const defaultRepositories: Repository[] = [
  {
    id: 1,
    name: 'portfolio-website',
    description: 'Mi portafolio personal construido con React y Tailwind',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    stars: 5,
    forks: 2,
    url: '#',
  },
  {
    id: 2,
    name: 'task-manager',
    description: 'App de gestión de tareas con Firebase',
    language: 'JavaScript',
    languageColor: 'bg-yellow-500',
    stars: 3,
    forks: 1,
    url: '#',
  },
  {
    id: 3,
    name: 'ctf-writeups',
    description: 'Mis soluciones y writeups de CTF challenges',
    language: 'Python',
    languageColor: 'bg-green-500',
    stars: 8,
    forks: 3,
    url: '#',
  },
];

const interestingRepos: InterestingRepo[] = [
  {
    name: 'react-native-paper',
    author: 'callstack',
    description: 'Material Design para React Native',
    url: 'https://github.com/callstack/react-native-paper',
    stars: '12.5k',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
  },
  {
    name: 'shadcn/ui',
    author: 'shadcn',
    description: 'Componentes con Radix UI y Tailwind',
    url: 'https://github.com/shadcn/ui',
    stars: '58.2k',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
  },
  {
    name: 'expo',
    author: 'expo',
    description: 'Plataforma para apps React Native',
    url: 'https://github.com/expo/expo',
    stars: '31.8k',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
  },
];

export function GitHubSection() {
  const [repositories, setRepositories] = useState<Repository[]>(defaultRepositories);
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    // Función para obtener datos reales de GitHub
    const fetchGitHubData = async () => {
      const username = 'A00838521'; // Usuario de GitHub
      
      // DESCOMENTA ESTAS LÍNEAS CUANDO TENGAS TU API KEY
      // y COMENTA los datos de ejemplo de arriba
      
      /*
      try {
        setLoading(true);
        
        // Obtener repositorios
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`, {
          headers: {
            // Si tienes problemas de rate limit, agrega tu token aquí:
            // 'Authorization': 'token TU_GITHUB_TOKEN_AQUI'
          }
        });
        const reposData = await reposResponse.json();
        
        // Mapear colores de lenguajes
        const languageColors: Record<string, string> = {
          TypeScript: 'bg-blue-500',
          JavaScript: 'bg-yellow-500',
          Python: 'bg-green-500',
          Java: 'bg-red-500',
          'C++': 'bg-pink-500',
          Go: 'bg-cyan-500',
          Rust: 'bg-orange-500',
        };
        
        // Actualizar repositorios
        const mappedRepos = reposData.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'Sin descripción',
          language: repo.language || 'Unknown',
          languageColor: languageColors[repo.language] || 'bg-gray-500',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
        }));
        
        setRepositories(mappedRepos);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // En caso de error, mantener los datos de ejemplo
      } finally {
        setLoading(false);
      }
      */
    };

    // fetchGitHubData(); // Descomenta para activar la llamada a la API
  }, []);

  return (
    <section id="github" className="min-h-screen px-6 lg:px-12 py-20">
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-zinc-900 dark:text-zinc-100">{t('github.title')}</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">{t('github.subtitle')}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Left Side */}
          <div className="flex-1">
            {/* GitHub Contributions Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="mb-4 text-zinc-900 dark:text-zinc-100">{t('github.contributions')}</h3>
              <GitHubContributions />
            </motion.div>

            {/* Recent Repositories */}
            <div>
              <h3 className="mb-6 text-zinc-900 dark:text-zinc-100">{t('github.recentRepos')}</h3>
              <div className="space-y-4">
                {repositories.map((repo, index) => (
                  <motion.a
                    key={repo.id}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="group flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300"
                  >
                    <GitBranch className="w-5 h-5 text-zinc-600 dark:text-zinc-400 mt-0.5 flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {repo.name}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                      </div>
                      
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-1">
                        {repo.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-3 h-3 rounded-full ${repo.languageColor}`} />
                          <span className="text-zinc-600 dark:text-zinc-400">{repo.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
                          <span className="text-zinc-600 dark:text-zinc-400">{repo.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
                          <span className="text-zinc-600 dark:text-zinc-400">{repo.forks}</span>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Interesting Repos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-80"
          >
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h3 className="text-zinc-900 dark:text-zinc-100">{t('github.interesting')}</h3>
              </div>
              
              <div className="space-y-3">
                {interestingRepos.map((repo, index) => (
                  <motion.a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group block p-4 bg-gradient-to-br from-purple-500/5 to-blue-500/5 hover:from-purple-500/10 hover:to-blue-500/10 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/30 dark:hover:border-purple-500/30 rounded-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-zinc-900 dark:text-zinc-100 mb-0.5 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {repo.name}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500">por {repo.author}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                    </div>
                    
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${repo.languageColor}`} />
                        <span className="text-zinc-600 dark:text-zinc-400">{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                        <Star className="w-3 h-3" />
                        <span>{repo.stars}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
