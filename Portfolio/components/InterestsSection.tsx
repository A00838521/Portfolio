import { motion } from 'framer-motion';
import { Shield, Brain, Award, Target, Code } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useI18n } from '../i18n';

const interests = [
  {
    id: 1,
    title: 'Ciberseguridad & CTF',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    description: 'Participante activo del equipo BlueLegion, donde colaboramos en competencias de Capture The Flag (CTF). Me apasiona el hacking ético, la criptografía, el análisis de vulnerabilidades y las técnicas de pentesting.',
    image: 'https://images.unsplash.com/photo-1761519609249-c0ca325f81db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwaGFja2luZyUyMGNvZGV8ZW58MXx8fHwxNzYyODQwMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Equipo BlueLegion - Competencias CTF',
      'Hacking ético y análisis de vulnerabilidades',
      'Criptografía y seguridad de redes',
      'Pentesting y análisis forense digital',
    ],
  },
  {
    id: 2,
    title: 'Neurociencia & IA',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    description: 'Fascinado por la intersección entre neurociencia y tecnología. Investigo sobre redes neuronales, computación cognitiva, interfaces cerebro-computadora (BCI) y cómo la comprensión del cerebro puede mejorar los sistemas de inteligencia artificial.',
    image: 'https://images.unsplash.com/photo-1549925245-6a03760d291f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb3NjaWVuY2UlMjBicmFpbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYyODkxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Redes neuronales y deep learning',
      'Computación cognitiva y neuroinformática',
      'Brain-Computer Interfaces (BCI)',
      'Aplicaciones de IA en neurociencia',
    ],
  },
  {
    id: 3,
    title: 'Frontend & Apps Móviles',
    icon: Code,
    color: 'from-blue-500 to-green-500',
    description: 'Construcción de interfaces modernas y accesibles con React y Tailwind, priorizando rendimiento y experiencia de usuario. Interés en apps móviles con React Native y ecosistema web.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIgZGV2ZWxvcG1lbnQlMjByZWFjdHxlfDF8fHx8MTc2Mjg5MjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'React + Tailwind: UI escalables y limpias',
      'Buenas prácticas de performance y accesibilidad',
      'UX enfocada en claridad y consistencia',
      'Interés en React Native para apps móviles',
    ],
  },
];

export function InterestsSection() {
  const { t } = useI18n();
  return (
    <section id="intereses" className="min-h-screen px-12 py-20">
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-4 text-zinc-900 dark:text-zinc-100">{t('interests.title')}</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">{t('interests.subtitle')}</p>
        </motion.div>

        <div className="space-y-12">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-video group">
                    <ImageWithFallback
                      src={interest.image}
                      alt={interest.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${interest.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="mb-4 text-zinc-900 dark:text-zinc-100">{interest.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {interest.highlights.map((highlight, hIndex) => (
                      <motion.div
                        key={hIndex}
                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + hIndex * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${interest.color} group-hover:scale-150 transition-transform`} />
                        <span className="text-zinc-700 dark:text-zinc-300">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Additional badge */}
                  {interest.id === 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full"
                    >
                      <Award className="w-5 h-5 text-red-500" />
                      <span className="text-red-600 dark:text-red-400">Miembro de BlueLegion</span>
                    </motion.div>
                  )}

                  {interest.id === 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full"
                    >
                      <Target className="w-5 h-5 text-purple-500" />
                      <span className="text-purple-600 dark:text-purple-400">Investigador Activo</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center"
        >
          <h3 className="mb-4 text-zinc-900 dark:text-zinc-100">{t('interests.cta.title')}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-6">{t('interests.cta.text')}</p>
          <a
            href="mailto:bruno.mega.25@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            {t('interests.cta.button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
