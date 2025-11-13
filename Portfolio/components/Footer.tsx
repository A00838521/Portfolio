import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contacto" className="py-12 px-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="mb-6 text-zinc-900 dark:text-zinc-100">Conectemos</h3>
          
          <div className="flex justify-center gap-6 mb-8">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/A00838521"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/bruno-vazquez-espinoza"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:bruno.mega.25@gmail.com"
              className="p-4 rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </div>

          <div className="text-zinc-600 dark:text-zinc-400 flex items-center justify-center gap-2">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>usando React y Tailwind CSS</span>
          </div>
          
          <p className="mt-4 text-zinc-500 dark:text-zinc-500">
            © 2025 Bruno Vázquez Espinoza. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
