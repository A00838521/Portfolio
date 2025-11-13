import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Check, Briefcase, Image as ImageIcon, Info } from 'lucide-react';
import { useI18n } from '../i18n';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Project } from './ProjectsSection';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

import { useState } from 'react';

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [showAll, setShowAll] = useState(false);
  if (!project) return null;
  const { t } = useI18n();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 lg:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-zinc-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 lg:p-6 flex items-center justify-between z-10">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-lg lg:text-2xl">{project.title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6 space-y-8">
            {/* Tech Stack */}
            <div>
              <h3 className="mb-3 text-zinc-900 dark:text-zinc-100">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Long Description or Role/Experience */}
            {project.longDescription && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-zinc-900 dark:text-zinc-100">{t('projects.descriptionSource')}</h3>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                    <Info className="w-3 h-3" /> {t('projects.readmeNote')}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            )}

            {project.role && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                  <h3 className="text-zinc-900 dark:text-zinc-100">Mi Rol</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                  <span className="text-purple-600 dark:text-purple-400">{project.role}</span>
                </p>
                {project.experience && (
                  <div>
                    <h3 className="mb-3 text-zinc-900 dark:text-zinc-100">Experiencia</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {project.experience}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="mb-3 text-zinc-900 dark:text-zinc-100">Características Principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                    >
                      <div className="mt-0.5 p-1 bg-green-500/10 rounded-full flex-shrink-0">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-zinc-700 dark:text-zinc-300 text-sm lg:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* README Images Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-500" />
                    <h3 className="text-zinc-900 dark:text-zinc-100">{t('projects.imagesGallery')}</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{project.screenshots.length} imágenes</span>
                  </div>
                  {project.screenshots.length > 6 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAll(v => !v)}
                      className="text-xs"
                    >
                      {showAll ? t('projects.showLess') : t('projects.showMore')}
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {(showAll ? project.screenshots : project.screenshots.slice(0, 6)).map((screenshot, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 aspect-video"
                    >
                      <ImageWithFallback
                        src={screenshot}
                        alt={`${project.title} imagen ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4">
              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Ver Código en GitHub
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
