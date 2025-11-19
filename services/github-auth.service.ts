import { GitHubUser, AuthToken, GITHUB_OAUTH_CONFIG } from './github-auth.config';

/**
 * Serviço para gerenciar autenticação com GitHub
 * Realiza as requisições necessárias para autenticar, recuperar dados do usuário e gerenciar sessões
 */

// Chave de armazenamento no localStorage
const AUTH_TOKEN_KEY = 'dfl_github_token';
const AUTH_USER_KEY = 'dfl_github_user';

/**
 * Obter token de acesso do GitHub a partir do código de autorização
 * NOTA: Esta requisição deve ser feita do LADO DO SERVIDOR para manter o client_secret seguro
 */
export const exchangeCodeForToken = async (code: string): Promise<AuthToken | null> => {
  try {
    // Exemplo: Chamar seu backend para realizar a troca
    const response = await fetch('/api/auth/github/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao trocar código por token: ${response.statusText}`);
    }

    const data: AuthToken = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao trocar código:', error);
    return null;
  }
};

/**
 * Obter dados do usuário autenticado
 */
export const fetchGitHubUser = async (accessToken: string): Promise<GitHubUser | null> => {
  try {
    const response = await fetch(GITHUB_OAUTH_CONFIG.userUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Não foi possível recuperar dados do usuário');
    }

    const user: GitHubUser = await response.json();
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
};

/**
 * Salvar token no localStorage
 */
export const saveAuthToken = (token: string) => {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};

/**
 * Recuperar token do localStorage
 */
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    return null;
  }
};

/**
 * Salvar dados do usuário
 */
export const saveAuthUser = (user: GitHubUser) => {
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
  }
};

/**
 * Recuperar dados do usuário
 */
export const getAuthUser = (): GitHubUser | null => {
  try {
    const user = localStorage.getItem(AUTH_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Erro ao recuperar usuário:', error);
    return null;
  }
};

/**
 * Fazer logout
 */
export const logout = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

/**
 * Verificar se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null && getAuthUser() !== null;
};
