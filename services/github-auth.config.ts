// GitHub OAuth Configuration
// Este arquivo contém as configurações necessárias para autenticação com GitHub

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'SEU_CLIENT_ID';
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI || window.location.origin + '/auth/callback';

export const GITHUB_OAUTH_CONFIG = {
  clientId: GITHUB_CLIENT_ID,
  redirectUri: GITHUB_REDIRECT_URI,
  scope: 'read:user user:email', // Permissões solicitadas
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  userUrl: 'https://api.github.com/user',
  userEmailUrl: 'https://api.github.com/user/emails',
};

export const getGitHubAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: GITHUB_OAUTH_CONFIG.clientId,
    redirect_uri: GITHUB_OAUTH_CONFIG.redirectUri,
    scope: GITHUB_OAUTH_CONFIG.scope,
    state: Math.random().toString(36).substring(7),
  });
  return `${GITHUB_OAUTH_CONFIG.authorizationUrl}?${params.toString()}`;
};

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  public_repos: number;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  scope: string;
}
