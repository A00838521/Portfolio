import { motion } from 'framer-motion';
import { Smartphone, Globe } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  description: string;
  type: 'mobile' | 'web';
  tech: string[];
  image: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className={`relative overflow-hidden ${project.type === 'mobile' ? 'aspect-[9/16] max-h-80' : 'aspect-video'}`}>
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-zinc-900/90 rounded-full backdrop-blur-sm">
          {project.type === 'mobile' ? (
            <Smartphone className="w-4 h-4" />
          ) : (
            <Globe className="w-4 h-4" />
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-zinc-900 dark:text-zinc-100">{project.title}</h3>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
