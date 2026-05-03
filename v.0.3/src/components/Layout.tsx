import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { usePeopleStats } from '../hooks/usePeopleStats';
import { useAuth } from '../hooks/useAuth';

export const Layout: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language] : translations.en;
  const { stats } = usePeopleStats();
  const { user, logout } = useAuth();

  // Render differently based on language and login state
  const headerPath = `/ULBP/${language?.toUpperCase() || 'EN'}/header-${user ? '1' : '0'}.png`;

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      
      {/* Content wrapper with Backgrounds */}
      <div 
        className="flex-1 w-full flex flex-col relative z-0"
        style={{
          backgroundColor: '#D5FBFF',
          backgroundImage: `url('/ULBP/BG.png'), url('/ULBP/BG-2.png')`,
          backgroundPosition: 'top center, center 2121px',
          backgroundRepeat: 'no-repeat, repeat-y'
        }}
      >
        
        <header className="relative w-full max-w-[1200px] mx-auto mt-0">
        {/* Header Image as background for hitboxes */}
        <div className="relative w-full">
          <img 
            src={headerPath} 
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/ULBP/${language?.toUpperCase() || 'EN'}/header.png`; }} 
            alt="Header" 
            className="w-full h-auto block" 
          />
          
          {/* Hitboxes */}
          <Link 
            to="/" 
            className="absolute top-[20%] bottom-[20%] left-[2%] w-[15%] cursor-pointer z-10"
            title={t.navHome || "Home"}
          />
          <Link 
            to="/news" 
            className="absolute top-[20%] bottom-[20%] left-[18%] w-[14%] cursor-pointer z-10"
            title={t.navNews || "News"}
          />
          <Link 
            to="/about" 
            className="absolute top-[20%] bottom-[20%] left-[33%] w-[14%] cursor-pointer z-10"
            title={t.navAbout || "About"}
          />

          {!user ? (
            <>
              <Link 
                to="/login" 
                className="absolute top-[15%] bottom-[50%] right-[3%] w-[18%] cursor-pointer z-10"
                title={t.loginTitle || "Login"}
              />
              <Link 
                to="/register" 
                className="absolute top-[50%] bottom-[15%] right-[3%] w-[18%] cursor-pointer z-10"
                title={t.registerTitle || "Register"}
              />
            </>
          ) : (
            <>
              <button 
                onClick={logout}
                className="absolute top-[15%] bottom-[50%] right-[3%] w-[18%] cursor-pointer z-10"
                title={t.logoutTitle || "Logout"}
              />
              <Link 
                to="/profile" 
                className="absolute top-[50%] bottom-[15%] right-[3%] w-[18%] cursor-pointer z-10"
                title={t.profileTitle || "Profile"}
              />
            </>
          )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 pb-16 flex flex-col items-center">
        <Outlet />
      </main>

      </div>

      <footer className="w-full bg-[#0d141b] text-[#869cb3] text-sm py-10 px-8 border-t border-[#26374a]">
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
              <p className="text-xs text-[#6e8ba8] font-bold">
                {t.followers.replace('8', (stats ? stats.total : 8).toString()).replace('3', (stats ? stats.total : 8).toString())}
                {user ? (
                  <span className="text-white ml-1">{t.youArePart}</span>
                ) : (
                  <>
                    {' '}<Link to="/login" className="text-white hover:underline">{t.loginToJoin}</Link> {t.toBecomePart}
                  </>
                )}
              </p>
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
