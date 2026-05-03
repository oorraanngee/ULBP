import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { newsData } from '../data/news';

const NewsItem = ({ title, date, excerpt }: { title: string, date: string, excerpt: string }) => (
  <div className="bg-white/95 p-4 rounded-xl mb-4 font-black">
    <h4 className="text-[#4A3219] text-xl">{title}</h4>
    <p className="text-xs text-[#8C623E] mb-2">{date}</p>
    <p className="text-[#4A3219] text-sm">{excerpt}</p>
  </div>
);

const LevelItem = ({ name, author, icon }: { name: string, author: string, icon: string }) => (
  <div className="flex items-center gap-3 bg-white/95 p-3 rounded-xl mb-3 transition-transform hover:scale-[1.02] cursor-pointer font-black">
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <h4 className="text-[#4A3219] leading-tight truncate max-w-[150px]">{name}</h4>
      <p className="text-xs text-[#8C623E] font-extralight">By {author}</p>
    </div>
  </div>
);

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const langKey = language?.toUpperCase() || 'EN';
  const t = language ? translations[language as keyof typeof translations] : translations.en;
  
  const currentNews = newsData[(language || 'en') as keyof typeof newsData] || newsData.en;
  const latestNews = currentNews[0];
  
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const totalFrames = 16;
  const frameDelay = 100;

  // 1. Улучшенный прелоад
  useEffect(() => {
    let loadedCount = 0;
    const cache: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/ULBP/${langKey}/${langKey}-animate/${i}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) setImagesLoaded(true);
      };
      img.onerror = () => {
        loadedCount++; // чтобы не зависнуть при ошибке
        if (loadedCount === totalFrames) setImagesLoaded(true);
      };
      cache.push(img);
    }
  }, [langKey, totalFrames]);

  // 2. Логика анимации
  useEffect(() => {
    if (!imagesLoaded) return;

    let timer: NodeJS.Timeout;

    // Пауза 1 секунда перед стартом
    const startDelay = setTimeout(() => {
      let frame = 1;
      
      const play = () => {
        timer = setTimeout(() => {
          frame++;
          if (frame <= totalFrames) {
            setCurrentFrame(frame);
            if (frame === totalFrames) {
              setIsAnimationDone(true);
            } else {
              play();
            }
          }
        }, frameDelay);
      };

      play();
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timer);
    };
  }, [imagesLoaded, langKey, totalFrames, frameDelay]);

  return (
    <div className="w-full mt-2">
      {/* 3. Оптимизированный рендеринг кадров */}
      <div className="relative w-full bg-transparent flex items-center justify-center"> 
        {/* Вместо одного <img> рендерим все 16 */}
        {Array.from({ length: totalFrames }).map((_, idx) => {
          const frameNum = idx + 1;
          return (
            <img
              key={frameNum}
              src={`/ULBP/${langKey}/${langKey}-animate/${frameNum}.png`}
              alt={frameNum === 1 ? "Welcome to ULBP HUB" : ""}
              className={`w-full h-auto transition-opacity duration-0 ${
                frameNum === 1 ? 'relative' : 'absolute top-0 left-0'
              } ${currentFrame === frameNum ? 'opacity-100' : 'opacity-0'}`}
              style={{ pointerEvents: 'none' }} // Чтобы не мешали кликам
            />
          );
        })}

        {/* Хитбоксы (появляются только в конце) */}
        {isAnimationDone && (
          <div className="absolute inset-0 z-10 w-full h-full">
            <Link 
              to="/login"
              className="absolute bottom-[5%] right-[5%] w-[18%] h-[18%] cursor-pointer z-10"
              title={t.loginTitle}
            />
            
            <Link
              to="/register"
              className="absolute bottom-[20%] right-[25%] w-[10%] h-[5%] cursor-pointer z-10"
              title={t.registerTitle}
            />
            
            <Link
              to="/not-released"
              className="absolute bottom-[8%] right-[25%] w-[15%] h-[10%] cursor-pointer z-10"
              title={t.notReleasedTitle}
            />
          </div>
        )}
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 font-black">
        
        {/* Column 1: Navigation Menu (like "One-click searches") */}
        <div className="bg-gradient-to-b from-[#0fd8f5] to-[#0a9eb5] rounded-[2rem] p-6 shadow-xl border-4 border-white/40">
          <h3 className="text-2xl text-white mb-6 drop-shadow-md">
            {t.navigation}
          </h3>
          <div className="flex flex-col gap-3">
            <Link to="/" className="w-full py-3 bg-gradient-to-b from-[#87d52f] to-[#4fa315] hover:from-[#9af236] hover:to-[#5ebf1a] text-white text-center rounded-xl shadow-[0_4px_0_#2b6307] active:shadow-[0_0px_0_#2b6307] active:translate-y-[4px] transition-all uppercase tracking-wider text-sm drop-shadow-md border border-white/30">
              {t.home}
            </Link>
            <Link to="/news" className="w-full py-3 bg-gradient-to-b from-[#87d52f] to-[#4fa315] hover:from-[#9af236] hover:to-[#5ebf1a] text-white text-center rounded-xl shadow-[0_4px_0_#2b6307] active:shadow-[0_0px_0_#2b6307] active:translate-y-[4px] transition-all uppercase tracking-wider text-sm drop-shadow-md border border-white/30">
              {t.newsTitle}
            </Link>
            <Link to="/about" className="w-full py-3 bg-gradient-to-b from-[#87d52f] to-[#4fa315] hover:from-[#9af236] hover:to-[#5ebf1a] text-white text-center rounded-xl shadow-[0_4px_0_#2b6307] active:shadow-[0_0px_0_#2b6307] active:translate-y-[4px] transition-all uppercase tracking-wider text-sm drop-shadow-md border border-white/30">
              {t.aboutTitle}
            </Link>
            <Link to="/register" className="w-full py-3 bg-gradient-to-b from-[#87d52f] to-[#4fa315] hover:from-[#9af236] hover:to-[#5ebf1a] text-white text-center rounded-xl shadow-[0_4px_0_#2b6307] active:shadow-[0_0px_0_#2b6307] active:translate-y-[4px] transition-all uppercase tracking-wider text-sm drop-shadow-md border border-white/30">
              {t.registerTitle}
            </Link>
            <Link to="/login" className="w-full py-3 bg-gradient-to-b from-[#87d52f] to-[#4fa315] hover:from-[#9af236] hover:to-[#5ebf1a] text-white text-center rounded-xl shadow-[0_4px_0_#2b6307] active:shadow-[0_0px_0_#2b6307] active:translate-y-[4px] transition-all uppercase tracking-wider text-sm drop-shadow-md border border-white/30">
              {t.loginTitle}
            </Link>
          </div>
        </div>

        {/* Column 2: News */}
        <div className="bg-gradient-to-b from-[#56c5e2] to-[#3aa2bd] rounded-[2rem] p-6 shadow-xl border-4 border-white/40">
          <h3 className="text-2xl text-white mb-6 drop-shadow-md">
            {t.latestNews}
          </h3>
          {latestNews && (
            <NewsItem 
              title={latestNews.title}
              date={latestNews.date}
              excerpt={latestNews.excerpt}
            />
          )}
          <Link to="/news" className="block text-center w-full mt-4 py-2 bg-gradient-to-b from-[#4bcbe9] to-[#2babc9] hover:from-[#65ddf9] hover:to-[#38c9e9] text-white rounded-full shadow-[0_4px_0_#1a768c] active:shadow-[0_0px_0_#1a768c] active:translate-y-[4px] transition-all uppercase tracking-wider text-sm border border-white/20">
            {t.readMore}
          </Link>
        </div>

        {/* Column 3: Newest levels */}
        <div className="bg-gradient-to-b from-[#58d5b2] to-[#3aab8c] rounded-[2rem] p-6 shadow-xl border-4 border-white/40">
          <h3 className="text-2xl text-white mb-6 drop-shadow-md">
            {t.newestLevels}
          </h3>
          <div className="w-full h-32 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
            <p className="text-white text-center px-4">{t.noServerConnection}</p>
          </div>
        </div>

        {/* Column 4: Project Updates / About */}
        <div className="bg-gradient-to-b from-[#f265ad] to-[#c73e83] rounded-[2rem] p-6 shadow-xl border-4 border-white/40 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl text-white mb-6 drop-shadow-md">
              {t.projectUpdates}
            </h3>
            <ul className="text-white space-y-4 text-sm font-extralight">
              <li>
                <Link to="/news/email-launch" className="hover:text-pink-200 transition-colors block">
                  <span className="font-bold">{t.emailLaunchPrefix}</span> {t.emailLaunchDesc}
                </Link>
              </li>
              <li>
                <Link to="/news/bluesky-registration" className="hover:text-pink-200 transition-colors block">
                  <span className="font-bold">{t.blueskyRegPrefix}</span> {t.blueskyRegDesc}
                </Link>
              </li>
              <li>
                <Link to="/news/logo-creation" className="hover:text-pink-200 transition-colors block">
                  <span className="font-bold">{t.logoPrefix}</span> {t.logoDesc}
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/about" className="block text-center w-full mt-8 py-3 bg-gradient-to-b from-[#ff84c5] to-[#db4e99] hover:from-[#ff9fdb] hover:to-[#eb60aa] text-white rounded-xl shadow-[0_4px_0_#8f2659] active:shadow-[0_0px_0_#8f2659] active:translate-y-[4px] transition-all uppercase tracking-wider text-sm border border-white/30">
            {t.aboutProjectBtn}
          </Link>
        </div>

      </div>
    </div>
  );
};
