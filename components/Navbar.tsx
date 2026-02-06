
import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import Logo from './Logo';

interface NavbarProps {
  view: ViewState;
  setView: (view: ViewState) => void;
  isAdmin: boolean;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ view, setView, isAdmin, logout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkView = view === 'shop' && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-nav py-4 shadow-xl border-b border-stone-200' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="cursor-pointer group" onClick={() => setView('shop')}>
          <Logo className="h-10 lg:h-12" light={isDarkView} />
        </div>

        <div className="flex items-center space-x-10">
          <button 
            onClick={() => setView('shop')}
            className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${
              isDarkView ? 'text-white' : 'text-stone-900'
            } hover:text-[#C5A059]`}
          >
            Archive
          </button>
          
          {isAdmin ? (
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setView('admin')}
                className={`text-[10px] font-bold tracking-[0.3em] uppercase ${view === 'admin' ? 'text-[#C5A059]' : (isDarkView ? 'text-stone-300' : 'text-stone-600')}`}
              >
                Studio
              </button>
              <button 
                onClick={() => setView('messages')}
                className={`text-[10px] font-bold tracking-[0.3em] uppercase ${view === 'messages' ? 'text-[#C5A059]' : (isDarkView ? 'text-stone-300' : 'text-stone-600')}`}
              >
                Inquiries
              </button>
              <button 
                onClick={logout}
                className="px-5 py-2 border border-[#C5A059] text-[#C5A059] text-[9px] font-black uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all rounded-full"
              >
                EXIT
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${
                isDarkView ? 'text-white/60 hover:text-white' : 'text-stone-400 hover:text-stone-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Vault
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
