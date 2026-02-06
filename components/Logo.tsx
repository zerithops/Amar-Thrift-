
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", light = false }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex flex-col justify-center items-start ${className}`}>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-black tracking-tighter serif ${light ? 'text-white' : 'text-stone-900'}`}>
            AMAR
          </span>
          <span className="bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-widest">
            THRIFT
          </span>
          <span className="text-xl">🧥</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <img 
        src="https://i.ibb.co/XrnM3hB/logo.png" 
        alt="Amar Thrift" 
        className={`h-full w-auto object-contain ${light ? 'brightness-0 invert' : ''}`}
        onError={() => setError(true)}
      />
      <div className="hidden lg:block">
        <h1 className={`text-xl font-bold tracking-tighter leading-none serif ${light ? 'text-white' : 'text-stone-900'}`}>
          AMAR <span className="font-light italic">THRIFT</span>
        </h1>
        <p className={`text-[9px] uppercase tracking-[0.3em] font-medium mt-1 ${light ? 'text-stone-400' : 'text-stone-500'}`}>
          amarthrift.shop 🧥
        </p>
      </div>
    </div>
  );
};

export default Logo;
