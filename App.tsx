
import React, { useState, useEffect } from 'react';
import { ViewState, Product, OrderMessage } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AdminPanel from './components/AdminPanel';
import MessageInbox from './components/MessageInbox';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// All previous posts deleted as requested. Archive starts fresh.
const INITIAL_PRODUCTS: Product[] = [];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('shop');
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<OrderMessage[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    const storedProducts = localStorage.getItem('amarthrift_products');
    const storedMessages = localStorage.getItem('amarthrift_messages');
    
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('amarthrift_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    return () => clearTimeout(timer);
  }, []);

  // Update storage whenever products change, even if the list is emptied.
  useEffect(() => {
    localStorage.setItem('amarthrift_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('amarthrift_messages', JSON.stringify(messages));
  }, [messages]);

  const addProduct = (product: Product) => {
    setProducts([product, ...products]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addMessage = (message: OrderMessage) => {
    setMessages([message, ...messages]);
  };

  const handleAdminLogin = (password: string) => {
    if (password === 'chuna420') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-700">
      <Navbar 
        view={view} 
        setView={setView} 
        isAdmin={isAdminLoggedIn} 
        logout={() => setIsAdminLoggedIn(false)}
      />
      
      <main className="flex-grow">
        {view === 'shop' && (
          <>
            <Hero />
            <ProductGrid 
              products={products} 
              onOrderMessage={addMessage} 
            />
          </>
        )}

        {view === 'admin' && (
          <AdminPanel 
            products={products}
            onAdd={addProduct}
            onDelete={deleteProduct}
            isLoggedIn={isAdminLoggedIn}
            onLogin={handleAdminLogin}
          />
        )}

        {view === 'messages' && isAdminLoggedIn && (
          <MessageInbox messages={messages} />
        )}
      </main>

      <Footer setView={setView} />
    </div>
  );
};

export default App;
