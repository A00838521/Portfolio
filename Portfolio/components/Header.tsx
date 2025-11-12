import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-900 dark:text-zinc-100"
        >
          Portafolio
        </motion.div>

        <nav className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('proyectos')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Proyectos
          </button>
          <button
            onClick={() => scrollToSection('github')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Contacto
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="ml-4"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
