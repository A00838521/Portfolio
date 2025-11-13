import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { fetchContributionsPublic } from '../services/github';

// Genera datos de ejemplo para el calendario de contribuciones
// Obtiene eventos públicos y calcula commits por día (aprox). Rate limit sin token: 60/h.
async function fetchContributionData(username: string): Promise<{ date: Date; count: number }[][]> {
  try {
    const perPage = 100;
    const pages = 3; // hasta ~300 eventos recientes
    const allEvents: any[] = [];
    for (let page = 1; page <= pages; page++) {
      const res = await fetch(`https://api.github.com/users/${username}/events?per_page=${perPage}&page=${page}`);
      if (!res.ok) break;
      const events = await res.json();
      allEvents.push(...events);
      if (events.length < perPage) break;
    }
    const counts: Record<string, number> = {};
    allEvents.forEach(ev => {
      if (ev.type === 'PushEvent') {
        const day = ev.created_at.split('T')[0];
        counts[day] = (counts[day] || 0) + ev.payload.commits.length;
      }
    });
    // Últimos 26 semanas (~182 días)
    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 182);
    const weeks: { date: Date; count: number }[][] = [];
    let cursor = new Date(start);
    while (cursor <= today) {
      const week: { date: Date; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const iso = cursor.toISOString().split('T')[0];
        week.push({ date: new Date(cursor), count: counts[iso] || 0 });
        cursor.setDate(cursor.getDate() + 1);
        if (cursor > today) break;
      }
      weeks.push(week);
    }
    return weeks;
  } catch {
    return [];
  }
}

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
  const { t } = useI18n();
  const [hoveredDay, setHoveredDay] = useState<{ date: Date; count: number } | null>(null);
  const [contributionData, setContributionData] = useState<{ date: Date; count: number }[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const username = 'A00838521';
    (async () => {
      // 0) Try prebuilt static file (generated in CI), 1) public API fallback
      try {
        const base = (import.meta as any).env?.BASE_URL ?? '/';
        const staticRes = await fetch(`${base}contributions.json`, { cache: 'no-store' });
        if (staticRes.ok) {
          const data = await staticRes.json();
          if (mounted && Array.isArray(data)) {
            setContributionData(data.map((w:any)=>w.map((d:any)=>({ date: new Date(d.date), count: d.count }))));
            setLoading(false);
            return;
          }
        }
      } catch {}

      // Single reliable fallback: public API
      let weeks = await fetchContributionsPublic(username);
      if (!weeks || weeks.length === 0) weeks = await fetchContributionData(username);
      if (mounted) {
        setContributionData(weeks || []);
        setLoading(false);
        if (!weeks || weeks.length === 0) setError('no-data');
      }
    })();
    return () => { mounted = false; };
  }, []);
  
  // Para obtener datos reales de GitHub, descomenta esto:
  /*
  useEffect(() => {
    const fetchContributions = async () => {
      const username = 'A00838521';
      
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
            <span>{t('lang.shortMon') || 'Lun'}</span>
            <span>{t('lang.shortWed') || 'Mié'}</span>
            <span>{t('lang.shortFri') || 'Vie'}</span>
          </div>
          
          {/* Contribution grid */}
          <div className="flex gap-1">
            {(!loading ? contributionData : []).map((week, weekIndex) => (
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
          {hoveredDay.count} {t('github.contributions').toLowerCase()} - {hoveredDay.date.toLocaleDateString()}
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
      {error && (
        <div className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded">
          {t('github.contributions.error')}
        </div>
      )}
    </div>
  );
}
