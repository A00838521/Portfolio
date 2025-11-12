import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Moon, Sun, User, Briefcase, Code, GitBranch, Heart, Download } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
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

export function Sidebar({ theme, toggleTheme, activeSection, setActiveSection }: SidebarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleDownloadCV = () => {
    // Aquí puedes poner la URL de tu CV
    // Por ahora crearemos un CV de ejemplo
    const link = document.createElement('a');
    link.href = '/path-to-your-cv.pdf'; // Cambia esto por la ruta real de tu CV
    link.download = 'CV_TuNombre.pdf';
    // link.click(); // Descomenta cuando tengas el CV listo
    
    // Mientras tanto, mostramos un alert
    alert('Aquí se descargará tu CV. Coloca tu archivo PDF en /public y actualiza la ruta en Sidebar.tsx');
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-8 flex flex-col overflow-y-auto z-50"
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
            <div className="w-full h-full rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-400 dark:text-zinc-600">Tu Foto</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="mb-2 text-zinc-900 dark:text-zinc-100">Tu Nombre</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-1">Ingeniería en Tecnologías</p>
          <p className="text-zinc-600 dark:text-zinc-400">Computacionales</p>
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
          Descargar CV
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
          {navItems.map((item, index) => {
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
                <span>{item.label}</span>
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
        <div className="flex gap-3 justify-center">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com/in/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:tuemail@ejemplo.com"
            className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Mail className="w-5 h-5" />
          </motion.a>
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
              <span>Modo Oscuro</span>
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              <span>Modo Claro</span>
            </>
          )}
        </Button>
      </motion.div>
    </motion.aside>
  );
}
