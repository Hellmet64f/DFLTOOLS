import React, { useState } from 'react';
import { CartItem, Order, UserProfile } from '../types';
import { X, Trash2, Loader2, CheckCircle, Copy, Tag, Github, Mail } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onCreateOrder: (email: string, total: number) => Order;
  onLoginGithub: (username: string) => Promise<UserProfile | null>;
  user: UserProfile | null;
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onCreateOrder, onLoginGithub, user, showToast }) => {
  const [step, setStep] = useState<'cart' | 'email' | 'processing' | 'success'>('cart');
  const [email, setEmail] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [authMethod, setAuthMethod] = useState<'email' | 'github'>('email');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'DFL10') {
      setDiscount(subtotal * 0.10);
      showToast('success', 'Cupom DFL10 aplicado! 10% OFF');
    } else if (coupon.toUpperCase() === 'FREE') {
      showToast('error', 'Este cupom expirou.');
    } else {
      showToast('error', 'Cupom inválido.');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    if (user) {
      setEmail(user.email);
    }
    setStep('email');
  };

  const confirmOrder = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (user) {
      processOrder(user.email);
      return;
    }

    if (authMethod === 'email') {
      if (!email) return;
      processOrder(email);
    } else {
      // GitHub Login Flow
      if (!githubUsername) return;
      setIsLoadingGithub(true);
      const githubUser = await onLoginGithub(githubUsername);
      setIsLoadingGithub(false);
      
      if (githubUser) {
        processOrder(githubUser.email);
      }
    }
  };

  const processOrder = (finalEmail: string) => {
    setStep('processing');
    setTimeout(() => {
      const order = onCreateOrder(finalEmail, total);
      setLastOrder(order);
      setStep('success');
      showToast('success', 'Pedido realizado com sucesso!');
    }, 2000);
  };

  const handleClose = () => {
    setStep('cart');
    if (!user) {
      setEmail('');
      setGithubUsername('');
    }
    setLastOrder(null);
    setDiscount(0);
    setCoupon('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative w-full max-w-md bg-dfl-card h-full border-l border-white/10 flex flex-col animate-slideInRight">
        
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {step === 'cart' && 'Seu Carrinho'}
            {step === 'email' && 'Identificação'}
            {step === 'processing' && 'Processando...'}
            {step === 'success' && 'Pedido Aprovado!'}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {step === 'cart' && (
             <div className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">Seu carrinho está vazio.</div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                    <div className="flex-grow">
                      <h4 className="text-white font-medium text-sm">{item.name}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-dfl-primary font-bold text-sm">R$ {item.price.toFixed(2)}</p>
                        <span className="text-[10px] bg-white/10 px-1.5 rounded text-gray-400">ID: {item.id}</span>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-400 self-center">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {step === 'email' && (
            <div className="animate-fadeIn space-y-6">
              {user ? (
                <div className="bg-dfl-primary/10 border border-dfl-primary/30 p-6 rounded-xl text-center space-y-4">
                   <div className="w-20 h-20 mx-auto rounded-full border-2 border-dfl-primary p-1">
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-white">Olá, {user.name}!</h3>
                     <p className="text-sm text-gray-400">Continuar compra com a conta:</p>
                     <p className="text-dfl-primary font-mono mt-1">{user.email}</p>
                   </div>
                   
                   <button 
                    onClick={() => confirmOrder()} 
                    className="w-full bg-dfl-primary hover:bg-dfl-primary/90 text-white font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
                   >
                    Confirmar Pedido
                  </button>
                  <p className="text-xs text-gray-500 mt-2">O pedido será vinculado automaticamente ao seu perfil.</p>
                </div>
              ) : (
                <>
                  <div className="bg-dfl-primary/10 border border-dfl-primary/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-300">Para gerar seu acesso vitalício ou mensal, precisamos vincular a compra ao seu perfil. Escolha como deseja entrar:</p>
                  </div>

                  {/* Auth Method Switcher */}
                  <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
                    <button 
                      onClick={() => setAuthMethod('email')}
                      className={`flex-1 py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${authMethod === 'email' ? 'bg-dfl-primary text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Mail className="w-4 h-4" /> E-mail
                    </button>
                    <button 
                      onClick={() => setAuthMethod('github')}
                      className={`flex-1 py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${authMethod === 'github' ? 'bg-gray-800 text-white border border-white/20' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </button>
                  </div>

                  <form onSubmit={confirmOrder} className="space-y-4">
                    {authMethod === 'email' ? (
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Seu Melhor E-mail</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="exemplo@gmail.com"
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-dfl-primary outline-none"
                        />
                      </div>
                    ) : (
                      <div>
                         <label className="block text-sm font-bold text-white mb-2">Usuário do GitHub</label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">@</div>
                          <input 
                            type="text" 
                            required
                            value={githubUsername}
                            onChange={(e) => setGithubUsername(e.target.value)}
                            placeholder="seu-usuario"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-4 pl-8 text-white focus:border-gray-500 outline-none"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Usaremos sua foto de perfil e nome público do GitHub.</p>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isLoadingGithub}
                      className={`w-full font-bold py-4 rounded-lg flex items-center justify-center gap-2 ${authMethod === 'github' ? 'bg-gray-800 hover:bg-gray-700 border border-white/10' : 'bg-dfl-primary hover:bg-dfl-primary/90'} text-white transition-all`}
                    >
                      {isLoadingGithub ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Finalizar Compra'}
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {step === 'processing' && (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
              <Loader2 className="w-12 h-12 text-dfl-primary animate-spin mb-4" />
              <h3 className="text-xl font-bold text-white">Gerando Licença...</h3>
              <p className="text-gray-400 text-sm mt-2">Validando segurança e vinculando ao perfil.</p>
            </div>
          )}

          {step === 'success' && lastOrder && (
            <div className="animate-fadeIn space-y-6 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Sucesso!</h3>
              <p className="text-gray-400">Licença ativada para <strong>{user?.email || email}</strong>.</p>

              <div className="bg-black/40 border border-dashed border-white/20 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">ID DO PEDIDO</p>
                <div className="flex items-center justify-center gap-2 text-xl font-mono font-bold text-dfl-primary">
                  {lastOrder.id}
                  <Copy className="w-4 h-4 cursor-pointer hover:text-white" onClick={() => showToast('success', 'ID copiado!')} />
                </div>
              </div>

              <div className="text-left bg-white/5 p-4 rounded-lg space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase">Próximos Passos:</p>
                <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                  <li>Vá para a <strong>Área do Cliente</strong> no menu.</li>
                  <li>Baixe seu produto e copie a key.</li>
                  <li>Siga o tutorial no menu Cursos.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {step === 'cart' && (
          <div className="p-6 border-t border-white/10 bg-dfl-dark">
            {/* Coupon Field */}
            <div className="mb-4 flex gap-2">
               <div className="relative flex-grow">
                 <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                 <input 
                    type="text" 
                    placeholder="Cupom (Ex: DFL10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-dfl-primary outline-none uppercase"
                 />
               </div>
               <button 
                onClick={handleApplyCoupon}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 rounded-lg text-sm transition-all"
               >
                 Aplicar
               </button>
            </div>

            <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center mb-2 text-sm text-green-400">
                <span>Desconto</span>
                <span>- R$ {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-white">R$ {total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full bg-dfl-secondary hover:bg-dfl-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg transition-all"
            >
              Finalizar Compra
            </button>
          </div>
        )}
        
        {step === 'success' && (
           <div className="p-6 border-t border-white/10 bg-dfl-dark">
            <button 
              onClick={handleClose}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-lg transition-all"
            >
              Fechar e Acessar Área VIP
            </button>
          </div>
        )}

      </div>
    </div>
  );
};