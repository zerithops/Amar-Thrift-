
import React from 'react';
import { ViewState } from '../types';
import Logo from './Logo';

interface FooterProps {
  setView: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-[#121212] pt-32 pb-16 text-white border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <div className="cursor-pointer mb-10" onClick={() => setView('shop')}>
              <Logo light className="h-20" />
            </div>
            <p className="text-stone-500 text-lg max-w-sm font-light leading-relaxed mb-10">
              Preserving high-fashion heritage through conscious curation. Curated for the modern wardrobe, authenticated by hand.
            </p>
            <div className="flex gap-8">
              <a href="https://www.instagram.com/amar_thrift_?igsh=OTQwdmgxYnJjZm56" target="_blank" className="text-[#C5A059] hover:text-white transition-colors">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Instagram</span>
              </a>
              <a href="#" className="text-stone-600 hover:text-white transition-colors">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Facebook</span>
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Navigation</h4>
            <ul className="space-y-6">
              <li><button onClick={() => setView('shop')} className="text-stone-500 hover:text-[#C5A059] text-sm uppercase tracking-widest font-bold transition-colors">Collection</button></li>
              <li><button className="text-stone-500 hover:text-[#C5A059] text-sm uppercase tracking-widest font-bold transition-colors">Authentication</button></li>
              <li><button className="text-stone-500 hover:text-[#C5A059] text-sm uppercase tracking-widest font-bold transition-colors">Sustainability</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Support</h4>
            <ul className="space-y-6">
              <li><button className="text-stone-500 hover:text-[#C5A059] text-sm uppercase tracking-widest font-bold transition-colors">Shipping Info</button></li>
              <li><button className="text-stone-500 hover:text-[#C5A059] text-sm uppercase tracking-widest font-bold transition-colors">Care Guide</button></li>
              <li><button onClick={() => setView('admin')} className="text-stone-500 hover:text-[#C5A059] text-sm uppercase tracking-widest font-bold transition-colors">Staff Login</button></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Dhaka Atelier</h4>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Private viewings by appointment only. <br />
              Gulshan-1, Dhaka, Bangladesh.
            </p>
            <p className="text-white font-mono text-sm">contact@amarthrift.shop</p>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-stone-600 text-[10px] font-black uppercase tracking-[0.5em]">
            © 2024 AMAR THRIFT • DHAKA STUDIO • AMARTHRIFT.SHOP
          </p>
          <div className="flex gap-12 text-stone-600 text-[10px] font-black uppercase tracking-[0.3em]">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
