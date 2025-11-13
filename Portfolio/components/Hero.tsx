import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="flex-shrink-0"
          >
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <img
                  src="https://github.com/A00838521.png"
                  alt="Avatar Bruno"
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-zinc-900 dark:text-zinc-100"
            >
              Bruno Vázquez Espinoza
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-zinc-600 dark:text-zinc-400"
            >
              Estudiante de Ingeniería en Tecnologías Computacionales
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 text-zinc-600 dark:text-zinc-400 max-w-2xl"
            >
              Apasionado por el desarrollo de software, la creación de aplicaciones innovadoras
              y la resolución de problemas complejos mediante la tecnología. Enfocado en crear
              experiencias digitales impactantes y funcionales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              <a
                href="https://github.com/A00838521"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/bruno-vazquez-espinoza"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:bruno.mega.25@gmail.com"
                className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
