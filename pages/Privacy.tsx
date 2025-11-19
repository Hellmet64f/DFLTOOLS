import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dfl-dark pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="bg-dfl-card border border-white/10 p-8 rounded-2xl">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="w-12 h-12 bg-dfl-secondary/10 rounded-lg flex items-center justify-center text-dfl-secondary">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">Política de Privacidade</h1>
          </div>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Coleta de Dados</h2>
              <p>A DFL TOOLS preza pelo seu anonimato. Coletamos apenas o necessário para processar a transação e garantir o acesso ao produto: E-mail e ID da Transação.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Dados de Dispositivo</h2>
              <p>Ao utilizar o "Gerador de Sensibilidade IA" ou nossos Painéis, podemos coletar informações técnicas como modelo do aparelho, versão do Android e DPI para gerar as configurações corretas. Esses dados não são vinculados à sua identidade pessoal.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Compartilhamento</h2>
              <p>Nós NÃO vendemos, alugamos ou compartilhamos seus dados com terceiros, exceto com gateways de pagamento para processar a compra.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Segurança</h2>
              <p>Utilizamos criptografia SSL em todas as comunicações do site. Nossos produtos são verificados por IA para garantir que não contenham malwares que possam roubar dados do seu dispositivo.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Cookies</h2>
              <p>Utilizamos cookies apenas para manter sua sessão de carrinho e preferências de navegação ativas.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};