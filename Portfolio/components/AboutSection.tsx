import { motion } from 'framer-motion';
import { MapPin, Calendar, GraduationCap } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="sobre-mi" className="min-h-screen flex items-center px-6 lg:px-12 py-20">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-zinc-900 dark:text-zinc-100"
          >
            Hola, soy{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Desarrollador
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed"
          >
            Estudiante apasionado por la tecnología y el desarrollo de software. Me especializo en
            crear soluciones innovadoras que combinan diseño elegante con funcionalidad robusta.
            Mi enfoque está en el desarrollo full-stack, aplicaciones móviles y la experiencia
            de usuario.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed"
          >
            Siempre estoy buscando nuevos desafíos que me permitan crecer como profesional y
            aportar valor a través de la tecnología. Me encanta aprender nuevas tecnologías
            y trabajar en proyectos que tengan un impacto real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              <span>Ingeniería en Tecnologías Computacionales</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>Tu Ciudad, País</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <Calendar className="w-5 h-5 text-pink-500" />
              <span>Disponible para colaborar</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 pt-10 border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-zinc-900 dark:text-zinc-100 mb-1">4+</div>
                <div className="text-zinc-600 dark:text-zinc-400 text-sm lg:text-base">Años Estudiando</div>
              </div>
              <div className="text-center">
                <div className="text-zinc-900 dark:text-zinc-100 mb-1">15+</div>
                <div className="text-zinc-600 dark:text-zinc-400 text-sm lg:text-base">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-zinc-900 dark:text-zinc-100 mb-1">10+</div>
                <div className="text-zinc-600 dark:text-zinc-400 text-sm lg:text-base">Tecnologías</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
