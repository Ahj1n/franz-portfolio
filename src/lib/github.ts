export interface GitHubStats {
  commitsThisYear: number | null;
  commitsLastYear: number | null;
  longestStreak: number | null;
  publicRepos: number | null;
}

const USER = "Ahj1n";

export async function getGitHubStats(): Promise<GitHubStats> {
  const year = new Date().getFullYear();
  const token = process.env.GITHUB_TOKEN;

  const restHeaders: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const ghFetch = (url: string) =>
    fetch(url, { headers: restHeaders, next: { revalidate: 3600 } });

  let commitsThisYear: number | null = null;
  let commitsLastYear: number | null = null;
  let longestStreak: number | null = null;
  let publicRepos: number | null = null;

  // 1 & 2. Commit counts — GraphQL gives exact profile numbers (incl. private repos).
  //         Falls back to REST search (public only) when no token is set.
  if (token) {
    try {
      const query = `
        query($login: String!, $from: DateTime!, $to: DateTime!, $fromPrev: DateTime!, $toPrev: DateTime!) {
          user(login: $login) {
            thisYear: contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
              contributionCalendar {
                weeks {
                  contributionDays { contributionCount }
                }
              }
            }
            lastYear: contributionsCollection(from: $fromPrev, to: $toPrev) {
              totalCommitContributions
            }
          }
        }
      `;
      const variables = {
        login: USER,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
        fromPrev: `${year - 1}-01-01T00:00:00Z`,
        toPrev: `${year - 1}-12-31T23:59:59Z`,
      };
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = await res.json() as {
          data?: {
            user?: {
              thisYear?: {
                totalCommitContributions: unknown;
                contributionCalendar?: {
                  weeks?: Array<{ contributionDays: Array<{ contributionCount: unknown }> }>;
                };
              };
              lastYear?: { totalCommitContributions: unknown };
            };
          };
        };
        const ty = json.data?.user?.thisYear?.totalCommitContributions;
        const ly = json.data?.user?.lastYear?.totalCommitContributions;
        commitsThisYear = typeof ty === "number" ? ty : null;
        commitsLastYear = typeof ly === "number" ? ly : null;

        const allDays = json.data?.user?.thisYear?.contributionCalendar?.weeks
          ?.flatMap((w) => w.contributionDays) ?? [];
        let best = 0, run = 0;
        for (const d of allDays) {
          if (typeof d.contributionCount === "number" && d.contributionCount > 0) {
            run++;
            if (run > best) best = run;
          } else {
            run = 0;
          }
        }
        longestStreak = best > 0 ? best : null;
      }
    } catch { /* silently fall back to null */ }
  } else {
    // No token — REST search API (public repos only, will undercount)
    try {
      const res = await ghFetch(
        `https://api.github.com/search/commits?q=author:${USER}+committer-date:${year}-01-01..${year}-12-31&per_page=1`
      );
      if (res.ok) {
        const data = await res.json() as { total_count: unknown };
        commitsThisYear = typeof data.total_count === "number" ? data.total_count : null;
      }
    } catch { /* silently fall back to null */ }

    try {
      const lastYear = year - 1;
      const res = await ghFetch(
        `https://api.github.com/search/commits?q=author:${USER}+committer-date:${lastYear}-01-01..${lastYear}-12-31&per_page=1`
      );
      if (res.ok) {
        const data = await res.json() as { total_count: unknown };
        commitsLastYear = typeof data.total_count === "number" ? data.total_count : null;
      }
    } catch { /* silently fall back to null */ }
  }

  // 3. Public repos (REST — no token needed for public count)
  try {
    const res = await ghFetch(`https://api.github.com/users/${USER}`);
    if (res.ok) {
      const data = await res.json() as { public_repos: unknown };
      publicRepos = typeof data.public_repos === "number" ? data.public_repos : null;
    }
  } catch { /* silently fall back to null */ }

  return { commitsThisYear, commitsLastYear, longestStreak, publicRepos };
}
