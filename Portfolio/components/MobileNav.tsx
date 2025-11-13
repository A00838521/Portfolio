import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Code, GitBranch, Heart, Menu, X, Moon, Sun, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useI18n } from '../i18n';

interface MobileNavProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItemsBase = [
  { id: 'sobre-mi', labelKey: 'nav.about', icon: User },
  { id: 'proyectos', labelKey: 'nav.projects', icon: Briefcase },
  { id: 'habilidades', labelKey: 'nav.skills', icon: Code },
  { id: 'github', labelKey: 'nav.github', icon: GitBranch },
  { id: 'intereses', labelKey: 'nav.interests', icon: Heart },
];

export function MobileNav({ theme, toggleTheme, activeSection, setActiveSection }: MobileNavProps) {
  const { t, toggleLang } = useI18n();
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
    link.href = '/cv/BrunoVazquezEspinoza.pdf';
    link.download = 'CV_Bruno_Vazquez_Espinoza.pdf';
    // link.click(); // Activa cuando agregues el archivo en /public/cv
    alert('Para habilitar la descarga, coloca tu PDF en /public/cv/BrunoVazquezEspinoza.pdf');
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
                <img
                  src="https://github.com/A00838521.png"
                  alt="Avatar Bruno"
                  className="w-full h-full rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
            <div>
              <div className="text-sm">Bruno Vázquez Espinoza</div>
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
              variant="outline"
              size="sm"
              onClick={toggleLang}
            >
              {t('actions.lang')}
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
                  <img
                    src="https://github.com/A00838521.png"
                    alt="Avatar Bruno"
                    className="w-full h-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                </div>
                <h2 className="mb-1">Bruno Vázquez Espinoza</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Ingeniería en Tecnologías Computacionales</p>
              </motion.div>

              {/* Download CV */}
              <Button
                onClick={handleDownloadCV}
                className="w-full mb-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('actions.downloadCV')}
              </Button>

              {/* Navigation */}
              <nav className="space-y-2 mb-8">
                {navItemsBase.map((item, index) => {
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
                      <span>{t(item.labelKey)}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Social Links */}
              <div className="flex gap-3 justify-center">
                <a
                  href="https://github.com/A00838521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/bruno-vazquez-espinoza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <button
                  onClick={() => { navigator.clipboard.writeText('bruno.mega.25@gmail.com'); toast.success(t('toast.emailCopied')); }}
                  className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
