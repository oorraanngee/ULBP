import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { newsData } from '../data/news';

export const News: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language as keyof typeof translations] : translations.en;
  const currentNews = newsData[(language || 'en') as keyof typeof newsData] || newsData.en;

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-8 font-black">
      <div className="bg-[#59b8db]/90 rounded-[2rem] p-8 shadow-xl border-2 border-white/60">
        <h2 className="text-4xl text-white mb-8 tracking-wide drop-shadow-md">{t.latestNews}</h2>
        
        <div className="flex flex-col gap-6">
          {currentNews.map((article) => (
            <Link 
              key={article.id} 
              to={`/news/${article.id}`}
              className="block bg-white/95 hover:bg-white/80 p-6 rounded-2xl shadow-inner transition-colors border border-transparent"
            >
              <h3 className="text-[#4A3219] text-xl mb-2 line-clamp-1">{article.title}</h3>
              <p className="text-xs text-[#8C623E] mb-3 font-extralight">{article.date}</p>
              <p className="text-[#4A3219] text-sm font-extralight line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
