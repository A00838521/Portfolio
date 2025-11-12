import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Github } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProjectModal } from './ProjectModal';

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

const projects: Project[] = [
  {
    id: 1,
    title: 'TaskFlow - App de Productividad',
    description: 'Aplicación móvil multiplataforma para gestión de tareas con sincronización en tiempo real.',
    type: 'mobile',
    tech: ['React Native', 'Firebase', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    github: '#',
    longDescription: 'TaskFlow es una aplicación completa de gestión de tareas diseñada para equipos modernos. Incluye sincronización en tiempo real, notificaciones push, y una interfaz intuitiva que facilita la colaboración.',
    features: [
      'Sincronización en tiempo real con Firebase',
      'Modo offline con almacenamiento local',
      'Notificaciones push personalizadas',
      'Colaboración en equipo con permisos',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Analytics Dashboard',
    description: 'Dashboard para visualización de métricas y análisis de datos empresariales.',
    type: 'web',
    tech: ['React', 'D3.js', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    github: '#',
    role: 'Desarrollador Frontend',
    experience: 'Trabajé en este proyecto durante un bootcamp intensivo de desarrollo web. Mi responsabilidad principal fue implementar las visualizaciones interactivas usando D3.js y conectarlas con la API backend. Aprendí mucho sobre manejo de estados complejos y optimización de rendimiento con grandes volúmenes de datos.',
  },
  {
    id: 3,
    title: 'FitTrack - Health & Fitness',
    description: 'App de seguimiento de fitness con planes personalizados y contador de calorías.',
    type: 'mobile',
    tech: ['Flutter', 'Dart', 'SQLite'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    github: '#',
    longDescription: 'Aplicación personal de fitness que desarrollé para practicar Flutter y aprender sobre almacenamiento local. Incluye planes de entrenamiento, seguimiento de progreso y un contador de calorías.',
    screenshots: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 4,
    title: 'Sistema de Gestión Escolar',
    description: 'Plataforma web para administración de alumnos, profesores y calificaciones.',
    type: 'web',
    tech: ['Vue.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    github: '#',
    role: 'Desarrollador Full-Stack',
    experience: 'Proyecto final de curso donde colaboré con un equipo de 3 personas. Me encargué del diseño de la base de datos MongoDB y la implementación del sistema de autenticación con JWT. También desarrollé varios componentes de la interfaz de usuario con Vue.js.',
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            <h2 className="mb-4 text-zinc-900 dark:text-zinc-100">Proyectos Destacados</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Una selección de mis trabajos más recientes y significativos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-zinc-50 dark:bg-zinc-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedProject(project)}
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
                          src={project.image}
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
                      src={project.image}
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
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  </div>

                  {/* Click to view indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="px-6 py-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full">
                      <span className="text-sm">Click para ver detalles</span>
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
                </div>
              </motion.div>
            ))}
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
