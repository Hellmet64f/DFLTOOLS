import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-1 justify-center md:justify-start">
              <span>DFL</span>
              <span className="text-dfl-primary">TOOLS</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              A plataforma número 1 para jogadores de Free Fire que buscam alta performance com segurança.
            </p>
          </div>
          
          <div className="flex gap-8 text-gray-400 text-sm">
            <Link to="/terms" className="hover:text-white">Termos de Uso</Link>
            <Link to="/privacy" className="hover:text-white">Privacidade</Link>
            <Link to="/support" className="hover:text-white">Suporte</Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 gap-4">
          <p>&copy; 2024 DFLTOOLS. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" /> Pagamento Seguro
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Dados Criptografados
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};