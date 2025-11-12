import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Code, GitBranch, Heart, Menu, X, Moon, Sun, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from './ui/button';

interface MobileNavProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItems = [
  { id: 'sobre-mi', label: 'Sobre Mí', icon: User },
  { id: 'proyectos', label: 'Proyectos', icon: Briefcase },
  { id: 'habilidades', label: 'Habilidades', icon: Code },
  { id: 'github', label: 'GitHub', icon: GitBranch },
  { id: 'intereses', label: 'Intereses', icon: Heart },
];

export function MobileNav({ theme, toggleTheme, activeSection, setActiveSection }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/path-to-your-cv.pdf';
    link.download = 'CV_TuNombre.pdf';
    // link.click(); // Descomenta cuando tengas el CV listo
    alert('Aquí se descargará tu CV. Coloca tu archivo PDF en /public y actualiza la ruta');
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs">
                TN
              </div>
            </div>
            <div>
              <div className="text-sm">Tu Nombre</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">ITC</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white dark:bg-zinc-900 pt-16"
          >
            <div className="h-full overflow-y-auto p-6 pb-24">
              {/* Profile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 mx-auto mb-4">
                  <div className="w-full h-full rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-400 dark:text-zinc-600">Foto</span>
                  </div>
                </div>
                <h2 className="mb-1">Tu Nombre</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Ingeniería en Tecnologías Computacionales</p>
              </motion.div>

              {/* Download CV */}
              <Button
                onClick={handleDownloadCV}
                className="w-full mb-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar CV
              </Button>

              {/* Navigation */}
              <nav className="space-y-2 mb-8">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Social Links */}
              <div className="flex gap-3 justify-center">
                <a
                  href="https://github.com/tuusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/tuusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:tuemail@ejemplo.com"
                  className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
