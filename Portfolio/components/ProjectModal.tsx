import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Check, Briefcase } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Project } from './ProjectsSection';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

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
                <h3 className="mb-3 text-zinc-900 dark:text-zinc-100">Descripción</h3>
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

            {/* Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <h3 className="mb-3 text-zinc-900 dark:text-zinc-100">
                  {project.type === 'mobile' ? 'Pantallas de la Aplicación' : 'Capturas de Pantalla'}
                </h3>
                <div className={`grid gap-4 ${
                  project.type === 'mobile' 
                    ? 'grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {project.screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${
                        project.type === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'
                      }`}
                    >
                      <ImageWithFallback
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
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
