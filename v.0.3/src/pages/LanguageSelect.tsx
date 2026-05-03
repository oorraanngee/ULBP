import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSelect: React.FC = () => {
  const { setLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-0 overflow-x-hidden">
      <div 
        className="absolute top-0 bottom-0 left-0 right-0 -z-10"
        style={{
          backgroundColor: '#D5FBFF',
          backgroundImage: `url('/ULBP/BG.png'), url('/ULBP/BG-2.png')`,
          backgroundPosition: 'top center, center 2121px',
          backgroundRepeat: 'no-repeat, repeat-y'
        }}
      />
      <div className="bg-gradient-to-b from-[#0fd4f1]/80 to-[#0a9eb5]/80 backdrop-blur-md relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/40 max-w-md w-full mx-4 py-12 px-8 flex flex-col items-center">
        <h1 className="text-3xl font-black text-white mb-10 text-center drop-shadow-md tracking-wide">
          Select Language / Выберите язык
        </h1>
        
        <div className="flex gap-10 justify-center">
          <button 
            onClick={() => setLanguage('en')}
            className="group transition-transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/60 shadow-xl group-hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] group-hover:border-white transition-all">
              <img src="/ULBP/EN/lang-icon.png" alt="English" className="w-full h-full object-cover" />
            </div>
          </button>
          
          <button 
            onClick={() => setLanguage('ru')}
            className="group transition-transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/60 shadow-xl group-hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] group-hover:border-white transition-all">
              <img src="/ULBP/RU/lang-icon.png" alt="Русский" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
