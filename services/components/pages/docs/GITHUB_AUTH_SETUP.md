# Configuração do Sistema de Login com GitHub

Este documento descreve como configurar e utilizar o sistema de autenticação OAuth com GitHub na sua loja DFLTOOLS.

## 1. Criar um OAuth App no GitHub

### Passos:

1. Acesse https://github.com/settings/developers
2. Clique em "New OAuth App"
3. Preencha os dados:
   - **Application name**: DFLTOOLS Loja
   - **Homepage URL**: http://localhost:5173 (para desenvolvimento)
   - **Authorization callback URL**: http://localhost:5173/auth/callback

4. Clique em "Register application"
5. Copie o **Client ID**
6. Clique em "Generate a new client secret" e copie o valor

## 2. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Abra `.env.local` e adicione:
   ```
   VITE_GITHUB_CLIENT_ID=seu_client_id_copiado
   VITE_GITHUB_REDIRECT_URI=http://localhost:5173/auth/callback
   ```

## 3. Usar o Botão de Login

Importe e use o componente `GitHubLoginButton` em seu componente:

```jsx
import GitHubLoginButton from './components/GitHubLoginButton';

function App() {
  return (
    <div>
      <h1>Bem-vindo à Loja</h1>
      <GitHubLoginButton />
    </div>
  );
}
```

## 4. Configurar a Rota de Callback

Adicione a rota `/auth/callback` ao seu router. No React Router:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        {/* outras rotas */}
      </Routes>
    </BrowserRouter>
  );
}
```

## 5. Acessar Dados do Usuário Autenticado

```jsx
import { getAuthUser, isAuthenticated, logout } from '../services/github-auth.service';

function Profile() {
  const user = getAuthUser();
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <p>Por favor, faça login</p>;
  }

  return (
    <div>
      <img src={user?.avatar_url} alt={user?.login} />
      <h2>{user?.name || user?.login}</h2>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## 6. Deploy para Produção (GitHub Pages/Vercel)

### GitHub Pages:

1. Crie um novo OAuth App com:
   - **Homepage URL**: https://seu-username.github.io/DFLTOOLS
   - **Authorization callback URL**: https://seu-username.github.io/DFLTOOLS/auth/callback

2. Atualize `.env.local`:
   ```
   VITE_GITHUB_CLIENT_ID=novo_client_id
   VITE_GITHUB_REDIRECT_URI=https://seu-username.github.io/DFLTOOLS/auth/callback
   ```

### Vercel:

1. Adicione as variáveis no painel do Vercel
2. O sistema detectará automaticamente a URL correta se configurar `VITE_GITHUB_REDIRECT_URI=auto`

## 7. Segurança - Nota Importante

⚠️ **AVISO**: O `client_secret` do GitHub NUNCA deve ser exposto no frontend!

Se você quer usar um backend para trocar o código por um token:

1. Crie um endpoint no seu servidor: `POST /api/auth/github/token`
2. No servidor, use o `client_secret` de forma segura
3. Retorne apenas o `access_token` para o frontend

## 8. Estrutura de Arquivos

```
.
├─ services/
│  ├─ github-auth.config.ts      # Configuração do OAuth
│  ├─ github-auth.service.ts     # Lógica de autenticação
│  └─ components/
│     ├─ GitHubLoginButton.tsx   # Botão de login
│     └─ pages/
│        └─ AuthCallback.tsx      # Página de callback
├─ .env.example
└─ docs/
   └─ GITHUB_AUTH_SETUP.md
```

## Troubleshooting

### "Error: Invalid redirect_uri"
- Verifique se a URL de callback exatamente coincide com a configurada no GitHub OAuth App

### "Token não é válido"
- Regenere o `client_secret` no GitHub
- Limpe o `localStorage` do navegador

### "Dados do usuário não carregam"
- Verifique as permissões (escopo) no OAuth App
- Certifique-se que o token ainda é válido

## Referências

- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps)
- [GitHub API - Get authenticated user](https://docs.github.com/en/rest/reference/users#get-the-authenticated-user)
