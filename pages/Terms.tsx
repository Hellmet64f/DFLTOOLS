import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Terms: React.FC = () => {
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
            <div className="w-12 h-12 bg-dfl-primary/10 rounded-lg flex items-center justify-center text-dfl-primary">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">Termos de Uso</h1>
          </div>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Aceitação dos Termos</h2>
              <p>Ao acessar e usar a plataforma DFL TOOLS, você concorda com os termos aqui descritos. Somos uma plataforma de intermediação (marketplace) que conecta desenvolvedores de ferramentas de otimização com usuários finais.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Natureza dos Produtos</h2>
              <p>Os produtos listados (Regedits, Painéis, Sensibilidades) são softwares de terceiros focados em otimização de sistema e auxílio de mira. A DFL TOOLS realiza uma curadoria de segurança, mas o uso final é de total responsabilidade do usuário.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Responsabilidade e Banimentos</h2>
              <p>Embora utilizemos sistemas de verificação de segurança para minimizar riscos, a modificação de arquivos de jogos sempre carrega riscos inerentes. A DFL TOOLS não se responsabiliza por suspensões ou banimentos em contas de jogos decorrentes do uso das ferramentas.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Reembolsos</h2>
              <p>Devido à natureza digital dos produtos (envio imediato e impossibilidade de devolução do arquivo), oferecemos reembolso apenas em casos onde o produto comprovadamente não funcionou e o suporte técnico não conseguiu resolver o problema em até 7 dias.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Atualizações</h2>
              <p>Produtos de assinatura recebem atualizações automáticas enquanto a assinatura estiver ativa. Produtos vitalícios garantem acesso à versão comprada e suas correções de bugs, mas não necessariamente a novas versões "major" (ex: V1 para V2).</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};