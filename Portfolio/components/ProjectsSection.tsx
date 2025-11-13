import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Github, Star, GitFork, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProjectModal } from './ProjectModal';
import { fetchRepo, RepoInfo, fetchCoverImage, fetchReadmeImage, fallbackImage, fetchReadmeParsed, validateImage } from '../services/github';
import { featuredRepos } from '../config/featured';
import { useI18n } from '../i18n';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'mobile' | 'web';
  tech: string[];
  image: string;
  github: string;
  longDescription?: string;
  features?: string[];
  screenshots?: string[];
  role?: string;
  experience?: string;
}

// Tomar solo los primeros 4 definidos en config
const featured = featuredRepos.slice(0, 4).map((r, idx) => ({ id: idx + 1, ...r }));

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [repoInfo, setRepoInfo] = useState<Record<string, RepoInfo | null>>({});
  const [images, setImages] = useState<Record<string, string>>({});
  const [readmeData, setReadmeData] = useState<Record<string, { description: string | null; images: string[] }>>({});
  const { t } = useI18n();

  useEffect(() => {
    let mounted = true;
    async function load() {
      const repoEntries: [string, RepoInfo | null][] = [];
      const imageEntries: [string, string][] = [];
      for (const f of featured) {
        const info = await fetchRepo(f.owner, f.repo);
        repoEntries.push([`${f.owner}/${f.repo}`, info]);
        const branch = info?.default_branch || 'main';
        // Default to Unsplash fallback
        let img = fallbackImage(f.repo, info?.language);
        // Cover has priority over fallback
        const cover = await fetchCoverImage(f.owner, f.repo, branch);
        if (cover) img = cover;
        // Parse README and override only if we find a good image
        const parsed = await fetchReadmeParsed(f.owner, f.repo, branch);
        if (parsed) {
          readmeData[`${f.owner}/${f.repo}`] = parsed;
          if (parsed.images.length > 0) {
            // pick first valid image
            const candidate = parsed.images[0];
            if (await validateImage(candidate)) {
              img = candidate;
            }
          } else {
            const readmeImg = await fetchReadmeImage(f.owner, f.repo, branch);
            if (readmeImg && (await validateImage(readmeImg))) img = readmeImg;
          }
        }
        imageEntries.push([`${f.owner}/${f.repo}`, img]);
      }
      if (mounted) {
        setRepoInfo(Object.fromEntries(repoEntries));
        setImages(Object.fromEntries(imageEntries));
        setReadmeData({ ...readmeData });
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <section id="proyectos" className="min-h-screen px-6 lg:px-12 py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="mb-4 text-zinc-900 dark:text-zinc-100">{t('projects.title')}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">{t('projects.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featured.map((project, index) => {
              const key = `${project.owner}/${project.repo}`;
              const info = repoInfo[key];
              const githubUrl = info?.html_url ?? `https://github.com/${key}`;
              const language = info?.language ?? project.tech[0] ?? '';
              const stars = info?.stargazers_count ?? 0;
              const forks = info?.forks_count ?? 0;
              const updated = info?.updated_at ? new Date(info.updated_at).toLocaleDateString() : '';
              const img = images[key] || fallbackImage(project.repo, info?.language);
              const parsed = readmeData[key];
              const projectForModal: Project = {
                id: project.id,
                title: project.title,
                description: project.description,
                type: project.type,
                tech: project.tech,
                image: img,
                github: githubUrl,
                longDescription: parsed?.description || undefined,
                screenshots: parsed?.images || undefined,
              };
              return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-zinc-50 dark:bg-zinc-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedProject(projectForModal)}
              >
                {/* Project Image with Phone Frame for Mobile */}
                <div className={`relative overflow-hidden ${project.type === 'mobile' ? 'aspect-[16/9] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center' : 'aspect-video'}`}>
                  {project.type === 'mobile' ? (
                    /* Mobile phone mockup */
                    <div className="relative w-64 h-[500px] bg-zinc-900 dark:bg-zinc-950 rounded-[3rem] p-3 shadow-2xl">
                      {/* Phone notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 dark:bg-zinc-950 rounded-b-2xl z-10"></div>
                      {/* Phone screen */}
                      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                        <ImageWithFallback
                          src={img}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      {/* Phone button */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-700 dark:bg-zinc-600 rounded-full"></div>
                    </div>
                  ) : (
                    /* Web project */
                    <ImageWithFallback
                      src={img}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full flex items-center gap-2 z-20">
                    {project.type === 'mobile' ? (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span className="text-sm">Mobile</span>
                      </>
                    ) : (
                      <>
                        <Globe className="w-4 h-4" />
                        <span className="text-sm">Web</span>
                      </>
                    )}
                  </div>

                  {/* GitHub Link */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <motion.a
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      href={githubUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow hover:shadow-md hover:bg-white dark:hover:bg-zinc-800 transition-all"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>

                  {/* Click to view indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="px-6 py-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full">
                      <span className="text-sm">{t('projects.viewDetails')}</span>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="mb-2 text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* GitHub metadata */}
                  <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1"><Star className="w-4 h-4" /> {stars}</span>
                    <span className="inline-flex items-center gap-1"><GitFork className="w-4 h-4" /> {forks}</span>
                    {language && <span className="inline-flex items-center gap-1">{language}</span>}
                    {updated && <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {updated}</span>}
                  </div>
                </div>
              </motion.div>
            );})}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
