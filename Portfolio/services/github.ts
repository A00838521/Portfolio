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
  const match = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
  if (!match) return null;
  let url = match[1].trim();
  if (url.startsWith('http')) return url;
  // relative path
  url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${url.replace(/^\.\//, '')}`;
  return url;
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
  const map: Record<string, string> = {
    Portfolio: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=800&fit=crop',
    WindowManager: 'https://images.unsplash.com/photo-1585076800581-5f4c5bb5bd7f?w=1200&h=800&fit=crop',
    ForaneoApp: 'https://images.unsplash.com/photo-1539883371015-0c6e6bd5d9ac?w=1200&h=800&fit=crop',
    TryingEEG: 'https://images.unsplash.com/photo-1512551980832-13df02babc9e?w=1200&h=800&fit=crop',
  };
  if (map[repo]) return map[repo];
  if (language?.includes('Python')) return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop';
  if (language?.includes('TypeScript')) return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop';
  return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop';
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
    setCache(cacheKey, weeks.map(week => week.map(day => ({ date: day.date.toISOString(), count: day.count }))));
    return { weeks };
  } catch {
    return { weeks: null, error: 'network' };
  }
}
