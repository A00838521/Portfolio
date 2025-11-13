export interface RepoInfo {
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  default_branch?: string;
  topics?: string[];
}

interface ReadmeParsed {
  description: string | null;
  images: string[];
}

export async function fetchRepo(owner: string, repo: string): Promise<RepoInfo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data as RepoInfo;
  } catch {
    return null;
  }
}

// Simple cache with TTL in sessionStorage
function getCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { expiry, value } = JSON.parse(raw);
    if (Date.now() > expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return value as T;
  } catch { return null; }
}

function setCache<T>(key: string, value: T, ttlMs = 6 * 60 * 60 * 1000) { // 6h
  try {
    sessionStorage.setItem(key, JSON.stringify({ expiry: Date.now() + ttlMs, value }));
  } catch { /* ignore */ }
}

export async function validateImage(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) return false;
    const ct = res.headers.get('content-type') || '';
    if (!ct.startsWith('image/') || ct.includes('svg')) return false;
    return true;
  } catch {
    return false;
  }
}

async function tryFetchRaw(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function fetchCoverImage(owner: string, repo: string, branch = 'main'): Promise<string | null> {
  const candidates = ['cover.png', 'cover.jpg', 'cover.jpeg'];
  for (const file of candidates) {
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
    try {
      const head = await fetch(rawUrl, { method: 'HEAD' });
      if (head.ok) return rawUrl;
    } catch {
      /* ignore */
    }
  }
  return null;
}

export async function fetchReadmeImage(owner: string, repo: string, branch = 'main'): Promise<string | null> {
  const readmeRaw = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
  const content = await tryFetchRaw(readmeRaw);
  if (!content) return null;
  // collect all images
  const matches = [...content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map(m => m[1].trim());
  const isBadgeOrTiny = (u: string) => /shields\.io|badgen|badge|icons?8|logo|icon|thumb|thumbnail|small|mini|\.svg($|\?)/i.test(u);
  for (let rawUrl of matches) {
    if (isBadgeOrTiny(rawUrl)) continue;
    if (!rawUrl.startsWith('http')) {
      rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${rawUrl.replace(/^\.\//, '')}`;
    }
    return rawUrl;
  }
  return null;
}

export async function fetchReadmeParsed(owner: string, repo: string, branch = 'main'): Promise<ReadmeParsed | null> {
  const cacheKey = `readmeParsed:${owner}/${repo}`;
  const cached = getCache<ReadmeParsed>(cacheKey);
  if (cached) return cached;
  const readmeRaw = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
  const content = await tryFetchRaw(readmeRaw);
  if (!content) return null;
  const lines = content.split(/\r?\n/);
  const images: string[] = [];
  for (const line of lines) {
    const imgMatches = [...line.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)];
    for (const m of imgMatches) {
      let url = m[1].trim();
      if (!url.startsWith('http')) {
        url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${url.replace(/^\.\//, '')}`;
      }
      // Skip badges/logos/svg to avoid thumbnails
      if (/shields\.io|badgen|badge|icons?8|logo|icon|thumb|thumbnail|small|mini|\.svg($|\?)/i.test(url)) continue;
      images.push(url);
    }
  }
  // Find first paragraph without image markdown or heading
  let description: string | null = null;
  const paragraphs = content.split(/\n\n+/);
  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;
    if (/!\[[^\]]*\]\(/.test(trimmed)) continue; // skip image-only
    description = trimmed.replace(/\s+/g, ' ');
    break;
  }
  const parsed: ReadmeParsed = { description, images };
  setCache(cacheKey, parsed);
  return parsed;
}

export function fallbackImage(repo: string, language?: string | null): string {
  const picsum = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/800`;
  const map: Record<string, string> = {
    Portfolio: picsum('portfolio-hero'),
    WindowManager: picsum('window-manager'),
    ForaneoApp: picsum('foraneo-app'),
    TryingEEG: picsum('trying-eeg'),
  };
  if (map[repo]) return map[repo];
  if (language?.includes('Python')) return picsum('python');
  if (language?.includes('TypeScript')) return picsum('typescript');
  return picsum('developer');
}

// GraphQL contributions (public + optional private if token scope)
// For security, we no longer inject a build-time token. If a user wants
// to test private contributions locally, they can set localStorage['gh_token'] manually.
export async function fetchContributionsGraphQL(username: string): Promise<{ weeks: { date: Date; count: number }[][] | null; error?: string }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('gh_token') || undefined : undefined;
  if (!token) return { weeks: null, error: 'missing-token' };
  const cacheKey = `contribGraphQL:${username}`;
  const cached = getCache<{ date: string; count: number }[][]>(cacheKey);
  if (cached) {
    return { weeks: cached.map(week => week.map(day => ({ date: new Date(day.date), count: day.count }))) };
  }
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}`;
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });
    if (res.status === 403) {
      return { weeks: null, error: 'rate-limit-or-auth' };
    }
    if (!res.ok) return { weeks: null, error: 'unknown' };
    const json = await res.json();
    const weeksRaw = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeksRaw) return { weeks: null, error: 'no-data' };
    const weeks: { date: Date; count: number }[][] = weeksRaw.map((w: any) => w.contributionDays.map((d: any) => ({ date: new Date(d.date), count: d.contributionCount })));
    // cache simplified structure
    setCache(cacheKey, weeks.map(week => week.map(day => ({ date: day.date.toISOString(), count: day.count }))), 60 * 60 * 1000);
    return { weeks };
  } catch {
    return { weeks: null, error: 'network' };
  }
}

// Public fallback without token using a community API that returns daily contributions
export async function fetchContributionsPublic(username: string): Promise<{ date: Date; count: number }[][] | null> {
  const cacheKey = `contribPublic:${username}`;
  const cached = getCache<{ date: string; count: number }[][]>(cacheKey);
  if (cached) return cached.map(week => week.map(d => ({ date: new Date(d.date), count: d.count })));
  try {
    // Primary endpoint
    let res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
    if (!res.ok) {
      // Alternative endpoint
      res = await fetch(`https://gh-contributions-api.vercel.app/v1/${username}`);
    }
    if (!res.ok) return null;
    const data = await res.json();

    // Normalize into a map of date->count
    const counts: Record<string, number> = {};
    if (Array.isArray(data?.contributions)) {
      for (const c of data.contributions) {
        if (c?.date && typeof c?.count === 'number') counts[c.date] = c.count;
      }
    } else if (Array.isArray(data?.weeks)) {
      for (const w of data.weeks) {
        for (const d of w?.contributionDays || []) {
          if (d?.date && typeof d?.contributionCount === 'number') counts[d.date] = d.contributionCount;
          else if (d?.date && typeof d?.count === 'number') counts[d.date] = d.count;
        }
      }
    } else if (Array.isArray(data?.months)) {
      for (const m of data.months) {
        for (const w of m.weeks || []) {
          for (const d of w.days || []) {
            if (d?.date && typeof d?.count === 'number') counts[d.date] = d.count;
          }
        }
      }
    }

    // Build last ~26 weeks grid
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
    setCache(cacheKey, weeks.map(week => week.map(day => ({ date: day.date.toISOString(), count: day.count }))), 60 * 60 * 1000);
    return weeks;
  } catch {
    return null;
  }
}
