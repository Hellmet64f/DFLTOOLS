import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, Headphones, Lock, ArrowLeft, Github, Mail, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, Order } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  isSpecial?: boolean; // For special UI like download links
}

interface SupportProps {
  user: UserProfile | null;
  orders: Order[];
  onLogin: (email: string) => void;
  onLoginGithub: (username: string) => Promise<UserProfile | null>;
}

export const Support: React.FC<SupportProps> = ({ user, orders, onLogin, onLoginGithub }) => {
  const [inputId, setInputId] = useState(''); // Used for Email or Order ID input
  const [authMethod, setAuthMethod] = useState<'email' | 'github'>('email');
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initialize chat when user is logged in
  useEffect(() => {
    if (user && messages.length === 0) {
      setMessages([
        { id: '1', sender: 'bot', text: `Olá, ${user.name}! Sou a IA da DFL TOOLS. Vejo que você já tem um perfil conosco. Como posso ajudar?` }
      ]);
    }
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputId) return;

    if (authMethod === 'email') {
      if (inputId.length > 3) {
        if (inputId.includes('@')) {
          onLogin(inputId);
        } else {
          // Mock Login with Order ID
          onLogin(`cliente_${inputId.replace('#', '')}@dfl.com`);
        }
      }
    } else {
      // GitHub Login
      setIsLoadingGithub(true);
      await onLoginGithub(inputId);
      setIsLoadingGithub(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Logic
    setTimeout(() => {
      let botResponse = '';
      const lowerInput = userMsg.text.toLowerCase();

      // Check for "Download didn't arrive" intent
      if (
        (lowerInput.includes('não') && lowerInput.includes('download')) || 
        (lowerInput.includes('não') && lowerInput.includes('chegou')) ||
        (lowerInput.includes('baixar') && lowerInput.includes('como')) ||
        (lowerInput.includes('link'))
      ) {
        // Check if user has orders
        if (orders.length > 0) {
          const lastOrder = orders[orders.length - 1];
          botResponse = `Verifiquei aqui no sistema e encontrei seu pedido mais recente (${lastOrder.id}) aprovado! \n\nComo você já comprou, posso liberar o acesso direto por aqui.`;
          
          // Push the text message first
           setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: botResponse }]);
           
           // Then push a "link" message shortly after
           setTimeout(() => {
             setMessages(prev => [...prev, { 
               id: (Date.now() + 1).toString(), 
               sender: 'bot', 
               text: '⬇️ CLIQUE AQUI PARA BAIXAR SEU PRODUTO', 
               isSpecial: true 
             }]);
           }, 1000);
           
           setIsTyping(false);
           return; // Exit to avoid overwriting
        } else {
          botResponse = 'Analisei seu perfil e não encontrei pedidos confirmados vinculados a este e-mail. Você tem o ID do pedido? Se comprou agora, pode levar alguns minutos para processar.';
        }
      } 
      else if (lowerInput.includes('instalar') || lowerInput.includes('instalação')) {
        botResponse = 'Para instalar, use o ZArchiver para extrair os arquivos na pasta Android > Data. Recomendo ver a aba "Cursos" no menu principal para o tutorial passo a passo.';
      } 
      else if (lowerInput.includes('ban') || lowerInput.includes('risco')) {
        botResponse = 'Nossos produtos possuem tecnologia DFL Guard (Anti-Ban). Porém, recomendamos usar com moderação e nunca utilizar a conta principal se for testar funções "rage" (muito agressivas).';
      } 
      else if (lowerInput.includes('humano') || lowerInput.includes('atendente')) {
        botResponse = 'Entendi. Estou transferindo seu caso para um de nossos especialistas humanos. Aguarde um momento... (Simulação: Ticket #9283 aberto no Discord)';
      } 
      else {
        botResponse = 'Entendi. Sou uma IA treinada para suporte de Regedits e Painéis. Posso ajudar com Instalação, Problemas de Download ou Dúvidas de Segurança.';
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dfl-dark pt-24 pb-20 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md mb-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
        </div>
        <div className="max-w-md w-full bg-dfl-card border border-white/10 p-8 rounded-2xl text-center animate-fadeIn">
          <div className="w-16 h-16 bg-dfl-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-dfl-primary">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Área do Cliente</h2>
          <p className="text-gray-400 mb-6">O suporte é exclusivo para clientes. Identifique-se para criar seu perfil de atendimento.</p>
          
          {/* Auth Switcher */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg mb-4">
             <button 
                onClick={() => { setAuthMethod('email'); setInputId(''); }}
                className={`flex-1 py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${authMethod === 'email' ? 'bg-dfl-primary text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Mail className="w-4 h-4" /> E-mail / ID
              </button>
              <button 
                onClick={() => { setAuthMethod('github'); setInputId(''); }}
                className={`flex-1 py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${authMethod === 'github' ? 'bg-gray-800 text-white border border-white/20' : 'text-gray-400 hover:text-white'}`}
              >
                <Github className="w-4 h-4" /> GitHub
              </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative">
               {authMethod === 'github' && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">@</div>
               )}
               <input 
                type="text" 
                placeholder={authMethod === 'email' ? "E-mail da compra ou ID do Pedido" : "Usuário do GitHub"}
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                className={`w-full bg-black/40 border border-white/10 rounded-lg p-3 ${authMethod === 'github' ? 'pl-8' : 'pl-3'} text-white focus:border-dfl-primary outline-none`}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoadingGithub}
              className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${authMethod === 'github' ? 'bg-gray-800 hover:bg-gray-700 border border-white/20' : 'bg-dfl-primary hover:bg-dfl-primary/90 text-white'}`}
            >
              {isLoadingGithub ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Acessar Suporte'}
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-4">
            {authMethod === 'github' ? 'Buscaremos sua foto e nome público do GitHub.' : 'O sistema criará um perfil temporário.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dfl-dark pt-24 pb-20 flex flex-col">
      <div className="container mx-auto px-4 max-w-3xl flex-grow flex flex-col h-[80vh]">
        
        <div className="bg-dfl-card border border-white/10 p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-dfl-secondary/20 rounded-full flex items-center justify-center text-dfl-secondary relative">
              <Headphones className="w-5 h-5" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dfl-card rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-white">Suporte DFL Inteligente</h3>
              <p className="text-xs text-green-400">Conectado como: {user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             {/* Profile Badge */}
             <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-white/20" />
          </div>
        </div>

        <div className="flex-grow bg-black/20 border-x border-white/10 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.sender === 'user' ? 'border border-dfl-primary' : 'bg-gray-700'}`}>
                  {msg.sender === 'user' ? <img src={user.avatar} alt="Me" className="w-full h-full object-cover" /> : <Bot className="w-4 h-4 text-dfl-secondary" />}
                </div>
                
                {msg.isSpecial ? (
                  <div className="bg-dfl-secondary/10 border border-dfl-secondary/50 p-4 rounded-xl text-center w-full cursor-pointer hover:bg-dfl-secondary/20 transition-colors">
                    <p className="text-dfl-secondary font-bold font-mono text-sm">{msg.text}</p>
                  </div>
                ) : (
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-dfl-primary text-white rounded-tr-none' 
                      : 'bg-gray-800 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                   <Bot className="w-4 h-4 text-dfl-secondary" />
                </div>
                <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none text-gray-400 text-sm italic">
                  Verificando pedidos...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="bg-dfl-card border border-white/10 p-4 rounded-b-2xl flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua dúvida..."
            className="flex-grow bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-dfl-primary outline-none"
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="bg-dfl-primary hover:bg-dfl-primary/90 disabled:opacity-50 text-white p-3 rounded-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};