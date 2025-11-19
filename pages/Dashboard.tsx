import React from 'react';
import { UserProfile, Order } from '../types';
import { Download, Key, ArrowLeft, Package, LogOut, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  user: UserProfile | null;
  orders: Order[];
  onLogout: () => void;
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, orders, onLogout, showToast }) => {
  const navigate = useNavigate();

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    showToast('success', 'Chave copiada para a área de transferência!');
  };

  const handleDownload = (productName: string) => {
    showToast('info', `Iniciando download de ${productName}...`);
    setTimeout(() => {
        showToast('success', 'Download concluído!');
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dfl-dark pt-24 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Acesso Restrito</h2>
        <p className="text-gray-400 mb-6">Você precisa fazer login ou uma compra para acessar esta área.</p>
        <button onClick={() => navigate('/')} className="bg-dfl-primary text-white px-6 py-3 rounded-lg">Voltar para Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dfl-dark pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
           <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <button 
              onClick={() => {
                onLogout();
                navigate('/');
              }}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
        </div>

        {/* Profile Header */}
        <div className="bg-dfl-card border border-white/10 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-[0_0_40px_rgba(124,58,237,0.1)]">
          <div className="w-24 h-24 rounded-full p-1 border-2 border-dfl-primary">
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold text-white mb-1">Olá, {user.name}!</h1>
            <p className="text-gray-400">{user.email}</p>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
               <span className="px-3 py-1 bg-dfl-primary/20 text-dfl-primary rounded-full text-xs font-bold border border-dfl-primary/30">CLIENTE VIP</span>
               <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">CONTA VERIFICADA</span>
            </div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center min-w-[150px]">
            <p className="text-gray-500 text-xs uppercase font-bold mb-1">Total de Pedidos</p>
            <p className="text-3xl font-black text-white">{orders.length}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-dfl-secondary" />
            Meus Produtos e Licenças
        </h2>

        {orders.length === 0 ? (
            <div className="bg-dfl-card border border-white/10 rounded-xl p-12 text-center">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-400 mb-6">Você ainda não adquiriu nenhuma ferramenta DFL.</p>
                <button onClick={() => navigate('/shop')} className="bg-dfl-primary hover:bg-dfl-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-all">
                    Ir para a Loja
                </button>
            </div>
        ) : (
            <div className="grid gap-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-dfl-card border border-white/10 rounded-xl overflow-hidden animate-fadeIn">
                        <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
                            <div>
                                <span className="text-gray-400 text-xs uppercase">Pedido</span>
                                <p className="text-white font-mono font-bold">{order.id}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-gray-400 text-xs uppercase">Data</span>
                                <p className="text-white">{order.date}</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex flex-col md:flex-row items-center gap-6">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-800" />
                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                        <p className="text-sm text-gray-400 mb-2">{item.type === 'subscription' ? 'Licença Mensal' : 'Licença Vitalícia'}</p>
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <div className="bg-black/50 px-3 py-1.5 rounded border border-white/10 font-mono text-yellow-500 text-sm flex items-center gap-2">
                                                <Key className="w-3 h-3" />
                                                {order.licenseKeys?.find(k => k.productId === item.id)?.key || 'XXXX-XXXX-XXXX-XXXX'}
                                            </div>
                                            <button 
                                              onClick={() => handleCopyKey(order.licenseKeys?.find(k => k.productId === item.id)?.key || '')}
                                              className="text-gray-400 hover:text-white p-1.5"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                      onClick={() => handleDownload(item.name)}
                                      className="bg-dfl-secondary hover:bg-dfl-secondary/90 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                    >
                                        <Download className="w-5 h-5" />
                                        Baixar Agora
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};