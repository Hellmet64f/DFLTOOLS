import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User as UserIcon } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
  user: UserProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart, user }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-dfl-primary font-bold" : "text-gray-300 hover:text-white";

  return (
    <nav className="fixed top-0 w-full z-50 bg-dfl-dark/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-white flex items-center gap-1 tracking-tighter">
          <span>DFL</span>
          <span className="text-dfl-primary">TOOLS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={isActive('/')}>Início</Link>
          <Link to="/shop" className={isActive('/shop')}>Loja</Link>
          <Link to="/generator" className={isActive('/generator')}>Gerador IA</Link>
          <Link to="/course" className={isActive('/course')}>Cursos</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Status Indicator for Desktop */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Sistemas Online</span>
          </div>

          {/* User Profile or Cart */}
          {user && (
            <Link to="/dashboard" className="hidden md:flex items-center gap-2 pl-2 pr-4 py-1 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-dfl-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-none">{user.name}</span>
                <span className="text-[10px] text-green-400 leading-none">Área VIP</span>
              </div>
            </Link>
          )}

          <button 
            onClick={toggleCart}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-dfl-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dfl-card border-b border-white/10 p-4 absolute w-full shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-4">
            {user && (
              <div className="flex items-center gap-3 mb-2 p-3 bg-white/5 rounded-lg">
                 <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-dfl-primary" />
                 <div>
                    <p className="text-white font-bold">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                 </div>
              </div>
            )}

            <div className="flex items-center gap-2 px-2 py-2 text-xs font-bold text-green-400 bg-green-500/10 rounded w-fit">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              SISTEMAS ONLINE
            </div>
            <Link to="/" onClick={() => setIsOpen(false)} className={`p-2 rounded ${isActive('/')}`}>Início</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className={`p-2 rounded ${isActive('/shop')}`}>Loja</Link>
            <Link to="/generator" onClick={() => setIsOpen(false)} className={`p-2 rounded ${isActive('/generator')}`}>Gerador IA</Link>
            <Link to="/course" onClick={() => setIsOpen(false)} className={`p-2 rounded ${isActive('/course')}`}>Cursos</Link>
            {user && <Link to="/dashboard" onClick={() => setIsOpen(false)} className={`p-2 rounded ${isActive('/dashboard')}`}>Área do Cliente</Link>}
            <Link to="/support" onClick={() => setIsOpen(false)} className={`p-2 rounded ${isActive('/support')}`}>Suporte</Link>
          </div>
        </div>
      )}
    </nav>
  );
};