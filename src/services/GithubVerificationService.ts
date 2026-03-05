import { Octokit } from 'octokit';

// Initialize Octokit (Use a Personal Access Token in production to avoid rate limits)
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export class GithubVerificationService {
  /**
   * Extracts owner, repo, and PR number from a standard GitHub PR URL
   */
  static parsePrUrl(url: string) {
    const regex = /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/;
    const match = url.match(regex);
    if (!match) return null;
    
    return {
      owner: match[1],
      repo: match[2],
      pull_number: parseInt(match[3], 10)
    };
  }

  /**
   * Verifies if the PR exists and is either 'open' or 'merged'
   */
  static async verifyPR(prUrl: string): Promise<{ isValid: boolean; error?: string; details?: any }> {
    const parsed = this.parsePrUrl(prUrl);
    
    if (!parsed) {
      return { isValid: false, error: 'INVALID_URL_FORMAT' };
    }

    try {
      const { data: pr } = await octokit.rest.pulls.get({
        owner: parsed.owner,
        repo: parsed.repo,
        pull_number: parsed.pull_number,
      });

      // We accept PRs that are actively being worked on (open) or successfully merged
      if (pr.state === 'open' || pr.merged) {
        return { 
          isValid: true, 
          details: { title: pr.title, author: pr.user?.login, state: pr.state } 
        };
      } else {
        return { isValid: false, error: 'PR_CLOSED_OR_REJECTED' };
      }
    } catch (error: any) {
      console.error("GitHub API Error:", error.message);
      return { isValid: false, error: 'PR_NOT_FOUND_OR_PRIVATE' };
    }
  }
}
