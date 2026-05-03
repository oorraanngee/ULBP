import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const Users: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language as keyof typeof translations] : translations.en;

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-8 font-black">
      <div className="bg-[#59b8db]/90 rounded-[2rem] p-8 shadow-xl border-2 border-white/60">
        <h2 className="text-4xl text-white mb-8 tracking-wide drop-shadow-md">{t.usersTitle}</h2>
        
        <div className="flex flex-col gap-4">
          {/* Item 1: Subscribers (Bluesky) */}
          <div className="bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6">
            <div className="bg-blue-100 p-3 rounded-2xl shadow-sm">
              <img src="/icon/Bluesky_Logo.svg" alt="Bluesky" className="w-12 h-12" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-[#59b8db]">1</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.subscribers.replace('1 ', '').replace('1', '')}</span>
            </div>
          </div>
          
          {/* Item 2: Subscribers (Discord) */}
          <div className="bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6">
            <div className="bg-indigo-100 p-3 rounded-2xl shadow-sm">
              <img src="/icon/discord.svg" alt="Discord" className="w-12 h-12" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-indigo-500">1</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.discordSubscribers.replace('1 ', '').replace('1', '')}</span>
            </div>
          </div>
          
          {/* Item 3: Subscribers (YouTube) */}
          <div className="bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6">
            <div className="bg-red-100 p-3 rounded-2xl shadow-sm">
              <img src="/icon/YouTube.png" alt="YouTube" className="w-12 h-12" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-red-500">4</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.youtubeSubscribers.replace('4 ', '').replace('4', '')}</span>
            </div>
          </div>

          {/* Item 4: Registered */}
          <div className="bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6">
            <div className="bg-amber-100 p-3 rounded-2xl shadow-sm">
              <img src="/ULBP/ULBP.png" alt="ULBP" className="w-12 h-12 rounded-xl" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-[#dbb559]">2</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.registered.replace('2 ', '').replace('2', '')}</span>
            </div>
          </div>
          
          {/* Item 5: Players */}
          <div className="bg-white/80 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6 opacity-80">
            <div className="bg-gray-200 p-3 rounded-2xl shadow-sm">
              <img src="/ULBP/ULBP.png" alt="ULBP" className="w-12 h-12 rounded-xl grayscale" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-gray-500">0</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.players.replace('0 ', '').replace('0', '')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
