import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Terminal, AlertTriangle, Settings, ArrowLeft } from 'lucide-react';

const tabs = [
  {
    id: 'intro',
    title: 'O que é DFLTOOLS?',
    icon: <BookOpen className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Entendendo o Produto</h3>
        <p className="text-gray-300 leading-relaxed">
          O <strong>DFLTOOLS</strong> é um conjunto de otimizações de software desenhadas para melhorar a resposta de toque e a precisão em jogos de tiro mobile.
        </p>
        <div className="bg-dfl-card border border-white/10 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-dfl-primary mb-2">Regedit vs Painel</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li><strong>Regedit:</strong> Modificações nos registros do sistema operacional (Android/Windows) para alterar a sensibilidade do toque e prioridade de processamento.</li>
            <li><strong>Painel:</strong> Um aplicativo externo que injeta configurações temporárias enquanto você joga, oferecendo funções mais avançadas como auxílio de mira.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'install',
    title: 'Instalação',
    icon: <Terminal className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Guia de Instalação</h3>
        <p className="text-gray-300">Siga o passo a passo para instalar o Regedit VIP.</p>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-dfl-primary rounded-full flex items-center justify-center font-bold text-white shrink-0">1</div>
            <div>
              <h5 className="font-bold text-white">Baixar o Arquivo</h5>
              <p className="text-gray-400 text-sm">Após a compra, acesse seu painel e baixe o arquivo .zip.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-dfl-primary rounded-full flex items-center justify-center font-bold text-white shrink-0">2</div>
            <div>
              <h5 className="font-bold text-white">Gerenciador de Arquivos</h5>
              <p className="text-gray-400 text-sm">Use o ZArchiver para extrair o conteúdo na pasta Android > Data > com.dts.freefireth.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-dfl-primary rounded-full flex items-center justify-center font-bold text-white shrink-0">3</div>
            <div>
              <h5 className="font-bold text-white">Reiniciar</h5>
              <p className="text-gray-400 text-sm">Reinicie o aparelho para aplicar as alterações de registro.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'config',
    title: 'Configuração',
    icon: <Settings className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Ajuste Fino</h3>
        <p className="text-gray-300">Não basta instalar, você precisa configurar sua DPI corretamente.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dfl-card p-4 rounded-lg border border-white/10">
            <h4 className="text-dfl-secondary font-bold mb-2">DPI Baixa (Abaixo de 500)</h4>
            <p className="text-sm text-gray-400">Melhor para controle de recoil e armas de um tiro (SVD, AC80).</p>
          </div>
          <div className="bg-dfl-card p-4 rounded-lg border border-white/10">
            <h4 className="text-dfl-secondary font-bold mb-2">DPI Alta (Acima de 800)</h4>
            <p className="text-sm text-gray-400">Ideal para movimentação rápida e subida de capa com SMGs (MP40, UMP).</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-200 text-sm">
          Use nosso Gerador de Sensibilidade IA para encontrar o valor exato para seu celular.
        </div>
      </div>
    )
  },
  {
    id: 'safety',
    title: 'Segurança',
    icon: <AlertTriangle className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Política de Uso Seguro</h3>
        <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-xl">
          <h4 className="text-red-400 font-bold flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" /> Aviso Importante
          </h4>
          <p className="text-gray-300 mb-4 text-sm">
            Embora nossos produtos Regedit sejam focados em otimização do sistema e dificilmente detectáveis, o uso de softwares de terceiros (Painéis injetores) sempre carrega riscos inerentes.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
            <li>Recomendamos testar em contas secundárias primeiro.</li>
            <li>Não abuse de funções "rage" (tiros através da parede, aimbot óbvio).</li>
            <li>O DFLTOOLS não se responsabiliza por banimentos. Use com moderação.</li>
          </ul>
        </div>
      </div>
    )
  }
];

export const Course: React.FC = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dfl-dark pt-24 pb-20">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4">ACADEMIA DFLTOOLS</h2>
          <p className="text-gray-400">Domine suas ferramentas e entenda como funciona o sistema.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all font-medium ${
                  activeTab === tab.id 
                    ? 'bg-dfl-primary text-white shadow-lg shadow-dfl-primary/25' 
                    : 'bg-dfl-card text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4 bg-dfl-card border border-white/5 rounded-2xl p-8 min-h-[400px]">
            {tabs.find(t => t.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};