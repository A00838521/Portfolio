import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Smartphone, Globe, Code } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'App Móvil de Productividad',
    description: 'Aplicación móvil para gestión de tareas con sincronización en la nube',
    type: 'mobile' as const,
    tech: ['React Native', 'Firebase', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: 'Panel de control para visualización de datos en tiempo real',
    type: 'web' as const,
    tech: ['React', 'D3.js', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con carrito de compras y pagos',
    type: 'web' as const,
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'App de Fitness',
    description: 'Aplicación para seguimiento de entrenamientos y nutrición',
    type: 'mobile' as const,
    tech: ['Flutter', 'SQLite', 'Dart'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Sistema de Gestión',
    description: 'Sistema integral para administración de recursos empresariales',
    type: 'web' as const,
    tech: ['Vue.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    title: 'App de Redes Sociales',
    description: 'Plataforma social con chat en tiempo real y compartición de contenido',
    type: 'mobile' as const,
    tech: ['Swift', 'Firebase', 'CloudKit'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-zinc-900 dark:text-zinc-100">Proyectos Destacados</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Una selección de mis trabajos más recientes y significativos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
