export interface RepoInfo {
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
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
