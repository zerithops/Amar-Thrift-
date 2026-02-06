
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-[#121212] flex flex-col items-center justify-center">
      <div className="mb-12 animate-fade-up flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white serif mb-4 tracking-tighter">
          AMAR <span className="font-light italic text-[#C5A059]">THRIFT</span>
        </h1>
        <div className="h-[1px] w-20 bg-[#C5A059] animate-[expand_2s_ease-in-out_infinite]"></div>
      </div>
      <p className="text-[9px] uppercase tracking-[0.5em] text-stone-500 font-black animate-pulse">
        Preserving Excellence
      </p>
      
      <style>{`
        @keyframes expand {
          0% { width: 0; opacity: 0; }
          50% { width: 100px; opacity: 1; }
          100% { width: 0; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
