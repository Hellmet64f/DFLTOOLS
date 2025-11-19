export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  email: string | null;
}

export const fetchGithubUser = async (username: string): Promise<GithubUser | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const data = await response.json();
    return data as GithubUser;
  } catch (error) {
    console.error("Error fetching Github user:", error);
    return null;
  }
};