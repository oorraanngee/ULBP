import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const Layout: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language] : translations.en;

  // Render differently based on language to show correct header image
  const headerPath = `/ULBP/${language?.toUpperCase() || 'EN'}/header.png`;

  return (
    <div 
      className="min-h-screen flex flex-col font-sans"
      style={{
        backgroundImage: `url('/ULBP/BG.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <header className="relative w-full max-w-[1200px] mx-auto mt-0">
        {/* Header Image as background for hitboxes */}
        <div className="relative w-full">
          <img src={headerPath} alt="Header" className="w-full h-auto block" />
          
          {/* Hitboxes */}
          <Link 
            to="/" 
            className="absolute top-[20%] bottom-[20%] left-[3%] w-[15%] cursor-pointer z-10"
            title="Home"
          />
          
          <Link 
            to="/login" 
            className="absolute top-[15%] bottom-[50%] right-[3%] w-[18%] cursor-pointer z-10"
            title="Login"
          />

          <Link 
            to="/register" 
            className="absolute top-[50%] bottom-[15%] right-[3%] w-[18%] cursor-pointer z-10"
            title="Register"
          />
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 flex flex-col items-center">
        <Outlet />
      </main>

      <footer className="w-full bg-[#0d141b] text-[#869cb3] text-sm py-10 px-8 mt-12 border-t border-[#26374a]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-lg font-bold">FAQ</h4>
            <a 
              href="https://bsky.app/profile/ulbp.bsky.social" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-fit bg-white text-[#333] px-3 py-1.5 rounded gap-2 items-center cursor-pointer hover:bg-gray-100 transition-colors text-xs font-bold shadow-sm"
            >
              <img src="/icon/Bluesky_Logo.svg" alt="Bluesky" className="w-5 h-5 -ml-1" />
              {t.followUs}
            </a>
            <div className="flex items-center gap-2 mt-1">
              <Link to="/users" className="flex bg-white text-[#333] px-3 py-1.5 rounded gap-1 items-center cursor-pointer hover:bg-gray-100 transition-colors text-xs font-bold shadow-sm">
                <img src="/icon/Bluesky_Logo.svg" alt="Bluesky" className="w-4 h-4" />
                <span className="opacity-50">/</span>
                <img src="/ULBP/ULBP.png" alt="ULBP" className="w-4 h-4 rounded-sm" />
                <span className="opacity-50">/</span>
                <img src="/icon/discord.svg" alt="Discord" className="w-4 h-4" />
                <span className="opacity-50">/</span>
                <img src="/icon/YouTube.png" alt="YouTube" className="w-4 h-4" />
              </Link>
              <p className="text-xs text-[#6e8ba8] font-bold">{t.followers} <Link to="/login" className="text-white hover:underline">{t.loginToJoin}</Link> {t.toBecomePart}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 font-bold text-xs mt-4">
            <div className="flex flex-wrap gap-2 text-white">
              <Link to="/about" className="hover:underline">{t.aboutTitle}</Link>
              <span>|</span>
              <a href="mailto:support.ulbp@gmail.com" className="hover:underline">support.ulbp@gmail.com</a>
              <span>|</span>
              <Link to="/login" className="hover:underline">{t.loginTitle}</Link>
              <span>|</span>
              <button onClick={() => { localStorage.removeItem('ulbp_lang'); window.location.href='/'; }} className="hover:underline cursor-pointer">{t.changeLanguage}</button>
              <span>|</span>
              <a href="https://discord.gg/zk3vW4uQ" target="_blank" rel="noopener noreferrer" className="hover:underline">{t.discord}</a>
            </div>
            <div className="opacity-50 font-normal leading-relaxed text-[11px] max-w-5xl">
              <p>{t.footerLegal}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
