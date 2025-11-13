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
