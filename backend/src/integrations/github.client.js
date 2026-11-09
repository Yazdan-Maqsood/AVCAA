import axios from 'axios';

// GitHub API integration for plagiarism checking (comparing with public repos)
export const searchGitHubCode = async (codeSnippet) => {
  try {
    // Note: GitHub Code Search API requires authentication for most queries
    const response = await axios.get('https://api.github.com/search/code', {
      params: { q: codeSnippet.substring(0, 50) }, // Searching first 50 chars as snippet
      headers: {
        // Add your GitHub Token here if you have one
        // Authorization: `token ${process.env.GITHUB_TOKEN}`
        Accept: 'application/vnd.github.v3+json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    return { total_count: 0, items: [] }; // Safe fallback
  }
};