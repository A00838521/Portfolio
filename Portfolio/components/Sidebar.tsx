import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Moon, Sun, User, Briefcase, Code, GitBranch, Heart, Download } from 'lucide-react';
import { Button } from './ui/button';
import { useI18n } from '../i18n';
import { toast } from 'sonner';

interface SidebarProps {
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

export function Sidebar({ theme, toggleTheme, activeSection, setActiveSection }: SidebarProps) {
  const { t, toggleLang } = useI18n();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleDownloadCV = () => {
    const base = (import.meta as any).env?.BASE_URL || '/';
    const link = document.createElement('a');
    link.href = `${base}cv/BrunoVazquezEspinoza.pdf`;
    link.download = 'CV_Bruno_Vazquez_Espinoza.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-8 pb-14 flex flex-col overflow-y-hidden no-scrollbar z-50"
    >
      {/* Profile Section */}
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 mx-auto">
            <img
              src="https://github.com/A00838521.png"
              alt="Avatar Bruno Vázquez Espinoza"
              className="w-full h-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="mb-2 text-zinc-900 dark:text-zinc-100">Bruno Vázquez Espinoza</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-1">Ingeniería en Tecnologías Computacionales</p>
          <p className="text-zinc-600 dark:text-zinc-400">ITESM (2023–2027)</p>
        </motion.div>
      </div>

      {/* Download CV Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <Button
          onClick={handleDownloadCV}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          {t('actions.downloadCV')}
        </Button>
      </motion.div>

      {/* Navigation */}
      <nav className="mb-8 flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          {navItemsBase.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
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
        </motion.div>
      </nav>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="space-y-4"
      >
        <div className="flex gap-3 justify-center flex-wrap">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/A00838521"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com/in/bruno-vazquez-espinoza"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigator.clipboard.writeText('bruno.mega.25@gmail.com');
              toast.success(t('toast.emailCopied'));
            }}
            className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Mail className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2"
        >
          {theme === 'light' ? (
            <>
              <Moon className="h-4 w-4" />
              <span>{t('actions.darkMode')}</span>
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              <span>{t('actions.lightMode')}</span>
            </>
          )}
        </Button>

        {/* Language Toggle */}
        <Button
          variant="secondary"
          onClick={toggleLang}
          className="w-full mt-2"
        >
          {t('actions.lang')}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText('bruno.mega.25@gmail.com');
            toast.success(t('toast.emailCopied'));
          }}
          className="w-full mt-2 flex items-center justify-center gap-2"
        >
          <Mail className="h-4 w-4" /> {t('email.button')}
        </Button>
      </motion.div>
    </motion.aside>
  );
}
