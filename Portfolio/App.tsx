import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { MainContent } from './components/MainContent';
import { Header } from './components/Header';
import { LanguageProvider } from './i18n';
import { Toaster } from 'sonner';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState('sobre-mi');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['sobre-mi', 'proyectos', 'habilidades', 'repositorios', 'github', 'intereses'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header theme={theme} toggleTheme={toggleTheme} />
        </div>
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            theme={theme} 
            toggleTheme={toggleTheme} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <MobileNav
            theme={theme}
            toggleTheme={toggleTheme}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        
        <MainContent />
        <Toaster richColors closeButton position="top-right" />
      </div>
    </LanguageProvider>
  );
}
