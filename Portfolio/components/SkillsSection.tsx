import { motion } from 'framer-motion';
import { Code2, Database, Smartphone, Globe, Boxes, Palette } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'Astro', 'HTML', 'CSS'],
  },
  {
    title: 'Backend',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    skills: ['Node.js', 'REST APIs', 'Python (scripts)'],
  },
  {
    title: 'Datos/IA',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-500',
    skills: ['Python', 'Jupyter Notebook', 'MediaPipe', 'Señales EEG (exploración)'],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    color: 'from-teal-500 to-emerald-500',
    skills: ['Flutter', 'Dart'],
  },
  {
    title: 'Sistemas/Otros',
    icon: Code2,
    color: 'from-yellow-500 to-orange-500',
    skills: ['C++', 'MATLAB', 'LaTeX/TeX'],
  },
  {
    title: 'DevOps',
    icon: Boxes,
    color: 'from-orange-500 to-red-500',
    skills: ['Git', 'GitHub', 'Linux'],
  },
  {
    title: 'Diseño',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    skills: ['Figma', 'UI/UX', 'Responsive Design'],
  },
];

export function SkillsSection() {
  return (
    <section id="habilidades" className="min-h-screen px-12 py-20">
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-zinc-900 dark:text-zinc-100">Habilidades Técnicas</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Tecnologías y herramientas que domino
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-transparent hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="mb-4 text-zinc-900 dark:text-zinc-100">{category.title}</h3>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`} />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
