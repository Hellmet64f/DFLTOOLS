import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, Zap, Shield, Smartphone, CheckCircle, FileText, Lock, Headphones, RefreshCw, Eye, Skull, Activity, XOctagon, EyeOff, AlertTriangle, Video, Mic } from 'lucide-react';

export const Home: React.FC = () => {
  // Simulated Ban Counter for the Risk Section
  const [bannedCount, setBannedCount] = useState(14582);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannedCount(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dfl-dark/80 to-dfl-dark"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-dfl-primary/20 text-dfl-primary border border-dfl-primary/30 text-sm font-bold mb-6 animate-pulse">
            SISTEMA DE SEGURANÇA DFL ATIVO
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            DOMINE O <span className="text-transparent bg-clip-text bg-gradient-to-r from-dfl-primary to-dfl-secondary">FREE FIRE</span>
            <br /> COM <span className="text-white">DFL</span><span className="text-dfl-primary">TOOLS</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            A única plataforma que protege sua conta. Nós curamos, verificamos e monitoramos todas as ferramentas para garantir sua segurança contra banimentos e golpes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="px-8 py-4 bg-dfl-primary hover:bg-dfl-primary/90 text-white font-bold rounded-lg transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(124,58,237,0.5)]">
              Ver Loja Oficial
            </Link>
            <Link to="/generator" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <Crosshair className="w-5 h-5" />
              Gerar Sensi IA
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-dfl-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-dfl-card border border-white/5 hover:border-dfl-primary/30 transition-colors">
              <div className="w-14 h-14 bg-dfl-primary/10 rounded-lg flex items-center justify-center mb-6 text-dfl-primary">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Performance Otimizada</h3>
              <p className="text-gray-400">Scripts limpados e otimizados pela nossa equipe para remover lag e garantir a resposta de toque instantânea.</p>
            </div>
            <div className="p-8 rounded-2xl bg-dfl-card border border-white/5 hover:border-dfl-primary/30 transition-colors">
              <div className="w-14 h-14 bg-dfl-secondary/10 rounded-lg flex items-center justify-center mb-6 text-dfl-secondary">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Segurança DFL Guard</h3>
              <p className="text-gray-400">Tecnologia proprietária que analisa atualizações do jogo e alerta sobre riscos antes que eles aconteçam.</p>
            </div>
            <div className="p-8 rounded-2xl bg-dfl-card border border-white/5 hover:border-dfl-primary/30 transition-colors">
              <div className="w-14 h-14 bg-dfl-accent/10 rounded-lg flex items-center justify-center mb-6 text-dfl-accent">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">IA Sensi Generator</h3>
              <p className="text-gray-400">Sistema exclusivo que calcula a DPI exata baseada no hardware do seu modelo de celular.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section: DFL vs Others */}
      <section className="py-20 bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-dfl-primary/5 blur-3xl -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              SEGURANÇA EM <span className="text-dfl-primary">PRIMEIRO LUGAR</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              O mercado de Regedits é cheio de perigos. A <strong>DFL TOOLS</strong> nasceu para ser o seu porto seguro. Nós filtramos o lixo e entregamos apenas o que funciona e é seguro.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Bad Side (Risk Terminal) */}
            <div className="lg:col-span-4 bg-red-950/10 border border-red-500/20 rounded-2xl p-1 relative overflow-hidden hover:border-red-500/40 transition-all group flex flex-col">
              {/* Background Glitch Effect */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,0,0,0.05)_2px,transparent_3px)] opacity-50 pointer-events-none"></div>
              
              <div className="h-full bg-black/60 backdrop-blur-sm p-6 rounded-xl flex flex-col">
                <div className="flex items-center gap-2 text-red-500 mb-6 border-b border-red-500/20 pb-4">
                  <Skull className="w-6 h-6 animate-pulse" />
                  <h3 className="text-xl font-bold tracking-widest">MERCADO PARALELO</h3>
                </div>

                {/* Fake Terminal */}
                <div className="bg-black font-mono text-xs p-4 rounded border border-red-900/50 mb-6 text-red-400/80 shadow-inner h-40 overflow-hidden relative">
                   <div className="absolute top-2 right-2 text-red-600 animate-pulse"><Activity className="w-4 h-4"/></div>
                   <p className="mb-1 text-gray-500">[SYSTEM] Injecting 'Mod_Menu_Free_v2.apk'...</p>
                   <p className="mb-1 text-red-500 font-bold">{'>'} ALERT: ANTI-CHEAT TRIGGERED</p>
                   <p className="mb-1 pl-2">- Modificação de Memória Detectada</p>
                   <p className="mb-1 pl-2 text-white">- Uploading: /Gallery/Photos.zip... [100%]</p>
                   <p className="mb-1 text-red-500 font-bold blink mt-2">{'>'} ACCOUNT PERMANENTLY BANNED</p>
                   <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent"></div>
                </div>

                <div className="space-y-4 flex-grow mb-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-500/10 rounded text-red-500 shrink-0"><AlertTriangle className="w-4 h-4" /></div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Mod Menu Detectável</h4>
                      <p className="text-xs text-gray-400">Mod Menus gratuitos alteram a OBB do jogo. O Anti-cheat detecta isso em minutos.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-500/10 rounded text-red-500 shrink-0"><EyeOff className="w-4 h-4" /></div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Roubo de Dados (Stealers)</h4>
                      <p className="text-xs text-gray-400">Scripts maliciosos que "rodam" senhas enquanto você joga.</p>
                    </div>
                  </div>
                </div>

                {/* Discord Scam Warning */}
                <div className="bg-red-600/10 border border-red-500/40 p-4 rounded-lg mb-4">
                   <h4 className="text-red-400 font-bold text-sm flex items-center gap-2 mb-2">
                     <AlertTriangle className="w-4 h-4" /> GOLPES NO DISCORD
                   </h4>
                   <p className="text-xs text-gray-300 mb-3">
                     Muitos servidores "fakes" recebem o PIX e banem você do servidor. Sem site, sem garantia.
                   </p>
                   
                   <div className="bg-black/50 p-3 rounded border border-white/5">
                      <p className="text-[10px] text-yellow-500 font-bold uppercase mb-1">Dica de Segurança:</p>
                      <p className="text-[11px] text-gray-300 leading-tight mb-2">
                        <strong className="text-white">NUNCA compre sem Call.</strong> Exija que o vendedor entre em voz e compartilhe tela.
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <Video className="w-3 h-3" />
                        <span>Grave tudo com: <strong>AZ Recorder</strong>, <strong>XRecorder</strong> ou outro celular.</span>
                      </div>
                   </div>
                </div>

                <div className="mt-auto pt-4 border-t border-red-500/20">
                   <p className="text-xs text-red-400 uppercase font-bold mb-1 flex justify-between">
                      <span>Contas Banidas Hoje (Global)</span>
                      <span className="animate-pulse text-red-500">AO VIVO</span>
                   </p>
                   <p className="text-3xl font-black text-white tabular-nums">{bannedCount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Good Side (Larger & Detailed) */}
            <div className="lg:col-span-8 bg-dfl-card border border-dfl-primary/50 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.15)]">
               <div className="absolute -right-10 -top-10 text-dfl-primary/5">
                <Shield size={250} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                <Shield className="w-8 h-8 text-dfl-primary" /> 
                Ecossistema de Segurança DFL
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                {/* Feature 1 */}
                <div className="flex gap-4">
                  <div className="bg-dfl-secondary/10 p-3 rounded-xl h-fit shrink-0">
                    <CheckCircle className="w-6 h-6 text-dfl-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Dupla Verificação (IA + Humano)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Nenhuma ferramenta entra na loja sem passar pelo nosso Scanner de Código IA e revisão manual de um especialista em segurança.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4">
                  <div className="bg-dfl-secondary/10 p-3 rounded-xl h-fit shrink-0">
                    <Eye className="w-6 h-6 text-dfl-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Monitoramento Anti-Ban</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Acompanhamos as atualizações do jogo em tempo real. Se um método se tornar detectável, a venda é pausada instantaneamente.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4">
                  <div className="bg-dfl-secondary/10 p-3 rounded-xl h-fit shrink-0">
                    <Lock className="w-6 h-6 text-dfl-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Privacidade e Anonimato</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Não exigimos CPF. Seus dados de pagamento são processados via gateway criptografado. Sua identidade gamer está segura.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex gap-4">
                  <div className="bg-dfl-secondary/10 p-3 rounded-xl h-fit shrink-0">
                    <Headphones className="w-6 h-6 text-dfl-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Suporte Técnico Dedicado</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Não sabe instalar? Nossa IA resolve 90% das dúvidas na hora, e nossos agentes humanos ajudam com configurações complexas.
                    </p>
                  </div>
                </div>

                {/* Feature 5 */}
                <div className="flex gap-4">
                  <div className="bg-dfl-secondary/10 p-3 rounded-xl h-fit shrink-0">
                    <Smartphone className="w-6 h-6 text-dfl-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Clean Files (Zero Malware)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Garantimos arquivos limpos. Nada de mineradores de cripto ou keyloggers escondidos que danificam seu celular ou PC.
                    </p>
                  </div>
                </div>

                 {/* Feature 6 */}
                 <div className="flex gap-4">
                  <div className="bg-dfl-secondary/10 p-3 rounded-xl h-fit shrink-0">
                    <RefreshCw className="w-6 h-6 text-dfl-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Garantia de Funcionamento</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Se o produto não funcionar como prometido e o suporte não resolver seu problema, devolvemos seu dinheiro em até 7 dias.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access / Tabs */}
      <section className="py-12 bg-dfl-dark border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link to="/terms" className="group p-6 bg-dfl-card border border-white/5 hover:border-dfl-primary/30 rounded-xl transition-all hover:-translate-y-1">
              <FileText className="w-8 h-8 text-gray-400 group-hover:text-dfl-primary mb-4 transition-colors" />
              <h4 className="font-bold text-white mb-2">Termos de Uso</h4>
              <p className="text-xs text-gray-500">Regras de transparência e reembolso.</p>
            </Link>

            <Link to="/privacy" className="group p-6 bg-dfl-card border border-white/5 hover:border-dfl-primary/30 rounded-xl transition-all hover:-translate-y-1">
              <Lock className="w-8 h-8 text-gray-400 group-hover:text-dfl-primary mb-4 transition-colors" />
              <h4 className="font-bold text-white mb-2">Privacidade & Dados</h4>
              <p className="text-xs text-gray-500">Seus dados protegidos com criptografia de ponta.</p>
            </Link>

            <Link to="/support" className="group p-6 bg-dfl-card border border-white/5 hover:border-dfl-primary/30 rounded-xl transition-all hover:-translate-y-1">
              <Headphones className="w-8 h-8 text-gray-400 group-hover:text-dfl-secondary mb-4 transition-colors" />
              <h4 className="font-bold text-white mb-2">Central de Suporte</h4>
              <p className="text-xs text-gray-500">Fale com nossa IA ou abra um ticket humanizado.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};