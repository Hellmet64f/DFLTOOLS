import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { AlertTriangle, X, ArrowLeft, ShieldCheck, Activity } from 'lucide-react';

const products: Product[] = [
  {
    id: '1',
    name: 'DFL Painel Mobile V2',
    description: 'O painel mais completo do mercado. Acesso a todas as funções premium, atualizações semanais e suporte vip.',
    price: 29.90,
    type: 'subscription',
    image: 'https://picsum.photos/id/1/600/400',
    features: [
      'Aimlock Suave 100%',
      'No Recoil 80%',
      'Removedor de Lag',
      'Bypass Anti-Cheat Atualizado',
      'Suporte 24/7'
    ],
    badge: 'MAIS VENDIDO',
    status: 'safe',
    rating: 4.9,
    reviews: 1240
  },
  {
    id: '2',
    name: 'DFL Regedit VIP Gold',
    description: 'Arquivo Regedit otimizado para Mobile e Emulador. Compra única com acesso vitalício às versões Gold.',
    price: 89.90,
    type: 'lifetime',
    image: 'https://picsum.photos/id/2/600/400',
    features: [
      'Sensibilidade X/Y Otimizada',
      'Macro Embutido',
      'Instalação Fácil',
      'Acesso Vitalício',
      'Grupo VIP no Discord'
    ],
    badge: 'VITALÍCIO',
    status: 'safe',
    rating: 4.7,
    reviews: 856
  },
  {
    id: '3',
    name: 'Pack Texturas Pro',
    description: 'Skins visuais e otimização gráfica para rodar liso em celulares fracos. Não afeta a gameplay dos outros.',
    price: 14.90,
    type: 'subscription',
    image: 'https://picsum.photos/id/3/600/400',
    features: [
      'Skins Raras Visuais',
      'FPS Boost',
      'Redução de Gráficos',
      'Anti-Blacklist'
    ],
    status: 'updating',
    rating: 4.5,
    reviews: 320
  },
  {
    id: '4',
    name: 'DFL FREE',
    description: 'Produto gratuito atualizado mensalmente. A opção mais segura de terceiros selecionada por nossa IA.',
    price: 0,
    type: 'subscription',
    image: 'https://picsum.photos/id/160/600/400',
    features: [
      'Atualização Automática Mensal',
      'Scan de Segurança por IA',
      'Encontrado em Redes Sociais',
      'Sem Custos'
    ],
    badge: 'GRÁTIS',
    status: 'safe',
    rating: 4.2,
    reviews: 5400
  }
];

interface ShopProps {
  addToCart: (product: Product) => void;
}

export const Shop: React.FC<ShopProps> = ({ addToCart }) => {
  const navigate = useNavigate();
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    if (product.price === 0) {
      setPendingProduct(product);
      setShowFreeModal(true);
    } else {
      addToCart(product);
    }
  };

  const confirmFreeProduct = () => {
    if (pendingProduct) {
      addToCart(pendingProduct);
    }
    setShowFreeModal(false);
  };

  return (
    <div className="min-h-screen bg-dfl-dark pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Início
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-green-400 uppercase">Sistemas DFL Online</span>
            </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">LOJA OFICIAL DFL</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Produtos verificados e monitorados 24h pelo nosso sistema de segurança.
          </p>
        </div>

        {/* System Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
           <div className="bg-dfl-card border border-white/10 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Status Anti-Cheat</h4>
                <p className="text-xs text-green-400">Seguro / Atualizado</p>
              </div>
           </div>
           <div className="bg-dfl-card border border-white/10 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Estabilidade</h4>
                <p className="text-xs text-blue-400">100% Operacional</p>
              </div>
           </div>
           <div className="bg-dfl-card border border-white/10 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Verificação IA</h4>
                <p className="text-xs text-purple-400">Ativa em todos os produtos</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleProductClick} />
          ))}
        </div>
      </div>

      {/* Modal Aviso DFL FREE */}
      {showFreeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowFreeModal(false)}></div>
          <div className="relative bg-dfl-card border border-yellow-500/30 p-8 rounded-2xl max-w-lg w-full shadow-[0_0_50px_rgba(234,179,8,0.2)]">
            <button onClick={() => setShowFreeModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 animate-pulse">
                <ShieldCheck className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">VERIFICADO PELA DFL SECURITY</h3>
                <p className="text-gray-300 leading-relaxed">
                  Este produto é uma ferramenta de terceiros encontrada publicamente. Nosso sistema <strong>DFL AI Security</strong> analisou o código e removeu scripts maliciosos conhecidos.
                </p>
                <div className="bg-black/30 p-3 rounded-lg text-xs text-left space-y-1 border border-white/5">
                   <div className="flex justify-between text-green-400"><span>Malware Scan:</span> <span>LIMPO</span></div>
                   <div className="flex justify-between text-green-400"><span>Keylogger Scan:</span> <span>LIMPO</span></div>
                   <div className="flex justify-between text-yellow-400"><span>Risco de Ban:</span> <span>BAIXO</span></div>
                </div>
                <p className="text-dfl-secondary font-bold mt-4">
                  Apoiamos a comunidade segura!
                </p>
              </div>

              <button 
                onClick={confirmFreeProduct}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-105"
              >
                Entendi, Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};