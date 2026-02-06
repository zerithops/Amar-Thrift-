
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#121212] flex items-center overflow-hidden">
      {/* Background with cinematic texture */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
          alt="Vintage Storefront" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-stone-700 rounded-full mb-8 bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
            <span className="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-bold">New Drop: 90s Streetwear</span>
          </div>
          
          <h2 className="text-7xl md:text-9xl font-bold text-white mb-8 serif leading-[0.9]">
            Wear <br />
            <span className="italic font-light text-[#C5A059]">The Story.</span>
          </h2>
          
          <p className="text-stone-400 text-lg md:text-xl max-w-md mb-12 leading-relaxed font-light">
            Luxury curation for the conscious individual. Pre-loved, authenticated, and delivered with a touch of nostalgia to your doorstep in Dhaka.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-[#C5A059] text-white font-bold tracking-[0.2em] text-xs uppercase hover:bg-white hover:text-stone-900 transition-all shadow-2xl"
            >
              SHOP COLLECTION
            </button>
            <button className="px-10 py-5 border border-stone-700 text-white font-bold tracking-[0.2em] text-xs uppercase hover:bg-white/10 transition-all backdrop-blur-sm">
              OUR MANIFESTO
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-end animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-[400px] h-[550px]">
            <div className="absolute inset-0 border-[0.5px] border-[#C5A059]/30 translate-x-6 translate-y-6"></div>
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              alt="Featured Look"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-2xl max-w-[200px]">
              <p className="serif italic text-stone-900 text-lg mb-2">"Quality never goes out of style."</p>
              <div className="w-8 h-[1px] bg-[#C5A059]"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-stone-500">
        <span className="text-[10px] uppercase tracking-widest font-bold rotate-90 mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-stone-800 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
