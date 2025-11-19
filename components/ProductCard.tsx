import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Check, ShieldCheck, AlertTriangle, Hammer, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'updating': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'risk': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe': return 'Indetectável (Seguro)';
      case 'updating': return 'Em Atualização';
      case 'risk': return 'Risco / Manutenção';
      default: return 'Desconhecido';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <ShieldCheck className="w-3 h-3" />;
      case 'updating': return <Hammer className="w-3 h-3" />;
      case 'risk': return <AlertTriangle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="relative group bg-dfl-card border border-white/10 rounded-xl overflow-hidden hover:border-dfl-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] flex flex-col h-full">
      {product.badge && (
        <div className={`absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full z-10 ${product.price === 0 ? 'bg-dfl-secondary' : 'bg-dfl-primary'}`}>
          {product.badge}
        </div>
      )}
      
      {/* ID Badge */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10 text-[10px] text-gray-300 font-mono">
        ID: {product.id}
      </div>
      
      <div className="h-48 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dfl-card to-transparent opacity-90"></div>
        <div className="absolute bottom-4 left-4 w-[calc(100%-2rem)]">
          <h3 className="text-2xl font-bold text-white truncate">{product.name}</h3>
          <div className="flex justify-between items-end mt-1">
             <div className="flex flex-col">
                <p className="text-dfl-primary font-medium text-sm">{product.type === 'subscription' ? 'Assinatura Mensal' : 'Vitalício'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">({product.reviews})</span>
                </div>
             </div>
             
             {/* Status Badge */}
             <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(product.status)}`}>
               {getStatusIcon(product.status)}
               {getStatusText(product.status)}
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-400 mb-6 text-sm h-10 line-clamp-2">{product.description}</p>
        
        <div className="space-y-3 mb-8 flex-grow">
          {product.features.map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-300">
              <Check className={`w-4 h-4 mr-2 flex-shrink-0 ${product.price === 0 ? 'text-dfl-secondary' : 'text-dfl-secondary'}`} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              {product.price === 0 ? (
                <span className="text-3xl font-bold text-dfl-secondary">GRÁTIS</span>
              ) : (
                <>
                  <span className="text-3xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
                  <span className="text-gray-500 text-sm ml-1">{product.type === 'subscription' ? '/mês' : ' único'}</span>
                </>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            disabled={product.status === 'risk' || product.status === 'updating'}
            className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 
              ${product.status === 'risk' || product.status === 'updating' ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 
                product.price === 0 ? 'bg-dfl-secondary text-black hover:bg-dfl-secondary/90' : 'bg-white text-black hover:bg-dfl-primary hover:text-white'
              }`}
          >
            {product.status === 'updating' ? <Hammer className="w-5 h-5" /> : product.status === 'risk' ? <AlertTriangle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            {product.status === 'updating' ? 'Em Manutenção' : product.status === 'risk' ? 'Indisponível' : product.price === 0 ? 'Obter Agora' : 'Comprar Agora'}
          </button>
        </div>
      </div>
    </div>
  );
};