import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { usePeopleStats } from '../hooks/usePeopleStats';

export const Users: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language as keyof typeof translations] : translations.en;
  const { stats, loading } = usePeopleStats();

  const blueskyCount = stats ? stats.Bluesky : 0;
  const discordCount = stats ? stats.Discord : 0;
  const youtubeCount = stats ? stats.YouTube : 0;
  const ulbpCount = stats ? stats.ULBP : 0;
  const ulbphubCount = stats ? stats.ULBP_HUB : 0;

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-8 font-black">
      <div className="bg-[#59b8db]/90 rounded-[2rem] p-8 shadow-xl border-2 border-white/60">
        <h2 className="text-4xl text-white mb-8 tracking-wide drop-shadow-md">{t.usersTitle}</h2>
        
        <div className="flex flex-col gap-4">
          {/* Item 1: Subscribers (Bluesky) */}
          <div className={`bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6 ${!loading && blueskyCount === 0 ? 'opacity-80 grayscale' : ''}`}>
            <div className={`p-3 rounded-2xl shadow-sm ${!loading && blueskyCount === 0 ? 'bg-gray-200' : 'bg-blue-100'}`}>
              <img src="/icon/Bluesky_Logo.svg" alt="Bluesky" className="w-12 h-12" />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-3xl font-black ${!loading && blueskyCount === 0 ? 'text-gray-500' : 'text-[#59b8db]'}`}>{loading ? '...' : blueskyCount}</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.subscribers.replace('1 ', '').replace('1', '')}</span>
            </div>
          </div>
          
          {/* Item 2: Subscribers (Discord) */}
          <div className={`bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6 ${!loading && discordCount === 0 ? 'opacity-80 grayscale' : ''}`}>
            <div className={`p-3 rounded-2xl shadow-sm ${!loading && discordCount === 0 ? 'bg-gray-200' : 'bg-indigo-100'}`}>
              <img src="/icon/discord.svg" alt="Discord" className="w-12 h-12" />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-3xl font-black ${!loading && discordCount === 0 ? 'text-gray-500' : 'text-indigo-500'}`}>{loading ? '...' : discordCount}</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.discordSubscribers.replace('1 ', '').replace('1', '')}</span>
            </div>
          </div>
          
          {/* Item 3: Subscribers (YouTube) */}
          <div className={`bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6 ${!loading && youtubeCount === 0 ? 'opacity-80 grayscale' : ''}`}>
            <div className={`p-3 rounded-2xl shadow-sm ${!loading && youtubeCount === 0 ? 'bg-gray-200' : 'bg-red-100'}`}>
              <img src="/icon/YouTube.png" alt="YouTube" className="w-12 h-12" />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-3xl font-black ${!loading && youtubeCount === 0 ? 'text-gray-500' : 'text-red-500'}`}>{loading ? '...' : youtubeCount}</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.youtubeSubscribers.replace('4 ', '').replace('4', '')}</span>
            </div>
          </div>

          {/* Item 4: Registered (ULBP HUB) */}
          <div className={`bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6 ${!loading && ulbphubCount === 0 ? 'opacity-80 grayscale' : ''}`}>
            <div className={`p-3 rounded-2xl shadow-sm ${!loading && ulbphubCount === 0 ? 'bg-gray-200' : 'bg-amber-100'}`}>
              <img src="/ULBP/ULBP.png" alt="ULBP HUB" className={`w-12 h-12 rounded-xl ${!loading && ulbphubCount === 0 ? 'grayscale' : ''}`} />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-3xl font-black ${!loading && ulbphubCount === 0 ? 'text-gray-500' : 'text-[#dbb559]'}`}>{loading ? '...' : ulbphubCount}</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.registered.replace('2 ', '').replace('2', '')}</span>
            </div>
          </div>
          
          {/* Item 5: Players (ULBP) */}
          <div className={`bg-white/95 p-5 rounded-2xl shadow-inner border border-white/50 flex flex-row items-center gap-6 ${!loading && ulbpCount === 0 ? 'opacity-80 grayscale' : ''}`}>
            <div className={`p-3 rounded-2xl shadow-sm ${!loading && ulbpCount === 0 ? 'bg-gray-200' : 'bg-green-100'}`}>
              <img src="/ULBP/ULBP.png" alt="ULBP" className={`w-12 h-12 rounded-xl ${!loading && ulbpCount === 0 ? 'grayscale' : ''}`} />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-3xl font-black ${!loading && ulbpCount === 0 ? 'text-gray-500' : 'text-green-600'}`}>{loading ? '...' : ulbpCount}</span>
              <span className="text-[#4A3219] text-xl font-medium tracking-wide">{t.players.replace('0 ', '').replace('0', '')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
