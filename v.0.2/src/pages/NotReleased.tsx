import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const PopitCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-gradient-to-b from-[#0fd4f1]/80 to-[#0a9eb5]/80 backdrop-blur-md relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/40 max-w-lg w-full mx-auto mt-12 p-8 font-black">
    <div className="relative z-10 w-full flex flex-col items-center">
      {children}
    </div>
  </div>
);

export const NotReleased: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language as keyof typeof translations] : translations.en;

  return (
    <PopitCard>
      <h2 className="text-4xl text-white mb-6 text-center drop-shadow-md">{t.notReleasedTitle}</h2>
      <div className="bg-white/95 p-6 text-center rounded-[1.5rem] shadow-inner w-full mb-8 border border-[#0a9eb5]/30">
        <p className="text-lg text-[#0a9eb5] font-black leading-relaxed">{t.notReleasedText}</p>
      </div>
      <Link 
        to="/" 
        className="px-8 py-4 bg-gradient-to-b from-[#ff84c5] to-[#db4e99] hover:from-[#ff9fdb] hover:to-[#eb60aa] text-white rounded-xl shadow-[0_4px_0_#8f2659] active:shadow-[0_0px_0_#8f2659] active:translate-y-[4px] transition-all text-xl uppercase tracking-wider border border-white/30"
      >
        {t.backToHome}
      </Link>
    </PopitCard>
  );
};
