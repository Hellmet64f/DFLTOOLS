import React, { useEffect, useState } from 'react';
import { exchangeCodeForToken, fetchGitHubUser, saveAuthToken, saveAuthUser } from '../services/github-auth.service';

/**
 * Página de callback para autenticação com GitHub
 * Processa o código de autorização retornado pelo GitHub
 * e realiza o login do usuário
 */
const AuthCallback: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extrair o código da URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');

        // Verificar se não ocorreu erro do GitHub
        const errorParam = params.get('error');
        if (errorParam) {
          throw new Error(`Erro do GitHub: ${errorParam}`);
        }

        if (!code) {
          throw new Error('Não foi encontrado um código de autorização');
        }

        // Trocar o código por um token
        const token = await exchangeCodeForToken(code);
        if (!token || !token.access_token) {
          throw new Error('Não foi possível obter um token de acesso');
        }

        // Buscar dados do usuário
        const user = await fetchGitHubUser(token.access_token);
        if (!user) {
          throw new Error('Não foi possível recuperar dados do usuário');
        }

        // Salvar token e dados do usuário
        saveAuthToken(token.access_token);
        saveAuthUser(user);

        // Redirecionar para a página inicial ou dashboard
        window.location.href = '/';
      } catch (err) {
        console.error('Erro na autenticação:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Ocorreu um erro durante a autenticação'
        );
        setLoading(false);
      }
    };

    handleCallback();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Autenticando...</h1>
        <p>Aguarde enquanto processamos seu login com o GitHub</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <h1>Erro na Autenticação</h1>
        <p>{error}</p>
        <a href="/">Voltar para a página inicial</a>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
