import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/Toast';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Course } from './pages/Course';
import { Generator } from './pages/Generator';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Support } from './pages/Support';
import { Dashboard } from './pages/Dashboard';
import { fetchGithubUser } from './services/githubService';
import { Product, CartItem, UserProfile, Order, ToastMessage } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Global State for User and Orders
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast System
  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        showToast('info', 'Quantidade atualizada no carrinho');
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast('success', 'Adicionado ao carrinho!');
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('info', 'Item removido');
  };

  // Simulate Login/Profile Creation based on Email
  const loginUser = (email: string) => {
    const namePart = email.split('@')[0];
    // Clean name (remove numbers, capitalize)
    const cleanName = namePart.replace(/[0-9]/g, '').replace(/[._]/g, ' ');
    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    
    const newUser: UserProfile = {
      email,
      name: formattedName || 'Usuário',
      avatar: `https://ui-avatars.com/api/?name=${formattedName}&background=7c3aed&color=fff&bold=true`
    };
    setUser(newUser);
    return newUser;
  };

  // Login via Github
  const loginWithGithub = async (username: string) => {
    showToast('info', 'Buscando perfil no GitHub...');
    const githubUser = await fetchGithubUser(username);
    
    if (githubUser) {
      const newUser: UserProfile = {
        email: githubUser.email || `${githubUser.login}@github.user`, // Fallback email if private
        name: githubUser.name || githubUser.login,
        avatar: githubUser.avatar_url
      };
      setUser(newUser);
      showToast('success', `Bem-vindo, ${newUser.name}!`);
      return newUser;
    } else {
      showToast('error', 'Usuário do GitHub não encontrado.');
      return null;
    }
  };

  const generateLicenseKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return `DFL-${Array.from({length: 4}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')}-${Array.from({length: 4}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')}`;
  };

  const createOrder = (email: string, total: number) => {
    // Ensure user exists
    if (!user || user.email !== email) {
      // If user is logging in via email during checkout
      if (!user) loginUser(email);
    }

    const newOrder: Order = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cartItems],
      date: new Date().toLocaleDateString(),
      status: 'approved',
      total: total,
      licenseKeys: cartItems.map(item => ({
        productId: item.id,
        key: generateLicenseKey()
      }))
    };

    setOrders(prev => [...prev, newOrder]);
    setCartItems([]); // Clear cart
    return newOrder;
  };

  return (
    <Router>
      <div className="bg-dfl-dark min-h-screen flex flex-col font-sans text-white">
        <Navbar 
          cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
          toggleCart={() => setIsCartOpen(true)} 
          user={user}
        />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems} 
          onRemove={removeFromCart}
          onCreateOrder={createOrder}
          onLoginGithub={loginWithGithub}
          user={user}
          showToast={showToast}
        />

        <ToastContainer toasts={toasts} removeToast={removeToast} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/course" element={<Course />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route 
              path="/support" 
              element={
                <Support 
                  user={user} 
                  orders={orders} 
                  onLogin={loginUser} 
                  onLoginGithub={loginWithGithub}
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  user={user} 
                  orders={orders} 
                  onLogout={() => setUser(null)}
                  showToast={showToast}
                />
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;