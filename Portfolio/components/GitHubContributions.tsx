import { motion } from 'framer-motion';
import { useState } from 'react';

// Genera datos de ejemplo para el calendario de contribuciones
const generateContributionData = () => {
  const weeks = 26; // Reducido de 52 a 26 semanas (6 meses)
  const daysPerWeek = 7;
  const data = [];
  
  for (let week = 0; week < weeks; week++) {
    const weekData = [];
    for (let day = 0; day < daysPerWeek; day++) {
      // Genera un número aleatorio de contribuciones (0-20)
      const contributions = Math.floor(Math.random() * 21);
      weekData.push({
        date: new Date(2024, 0, week * 7 + day + 1),
        count: contributions,
      });
    }
    data.push(weekData);
  }
  
  return data;
};

const getContributionLevel = (count: number) => {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

const getContributionColor = (level: number) => {
  const colors = [
    'bg-zinc-200 dark:bg-zinc-800',
    'bg-green-200 dark:bg-green-900/40',
    'bg-green-400 dark:bg-green-700/60',
    'bg-green-600 dark:bg-green-500/80',
    'bg-green-700 dark:bg-green-400',
  ];
  return colors[level];
};

export function GitHubContributions() {
  const [hoveredDay, setHoveredDay] = useState<{ date: Date; count: number } | null>(null);
  const contributionData = generateContributionData();
  
  // Para obtener datos reales de GitHub, descomenta esto:
  /*
  useEffect(() => {
    const fetchContributions = async () => {
      const username = 'tuusuario';
      
      // Necesitarás usar la API de GraphQL de GitHub
      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;
      
      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer TU_GITHUB_TOKEN_AQUI',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        
        const data = await response.json();
        // Procesar y actualizar los datos
      } catch (error) {
        console.error('Error fetching contributions:', error);
      }
    };
    
    fetchContributions();
  }, []);
  */

  return (
    <div className="relative">
      <div className="overflow-x-auto pb-4">
        <div className="inline-flex gap-1 p-3 lg:p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700">
          {/* Day labels - Solo en desktop */}
          <div className="hidden lg:flex flex-col justify-between h-full mr-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Lun</span>
            <span>Mié</span>
            <span>Vie</span>
          </div>
          
          {/* Contribution grid */}
          <div className="flex gap-1">
            {contributionData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => {
                  const level = getContributionLevel(day.count);
                  const color = getContributionColor(level);
                  
                  return (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      whileHover={{ scale: 1.3 }}
                      className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-sm ${color} cursor-pointer transition-all`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs lg:text-sm rounded-lg shadow-lg whitespace-nowrap z-10"
        >
          {hoveredDay.count} contribución{hoveredDay.count !== 1 ? 'es' : ''} - {hoveredDay.date.toLocaleDateString()}
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-zinc-600 dark:text-zinc-400">
        <span>Menos</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-sm ${getContributionColor(level)}`}
            />
          ))}
        </div>
        <span>Más</span>
      </div>
    </div>
  );
}
