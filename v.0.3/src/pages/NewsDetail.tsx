import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { newsData } from '../data/news';

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  
  const currentNews = newsData[(language || 'en') as keyof typeof newsData] || newsData.en;
  const article = currentNews.find((news) => news.id === id);

  const notFoundText = language === 'ru' ? 'Новость не найдена' : 'News not found';
  const backText = language === 'ru' ? 'Назад к новостям' : 'Back to news';

  if (!article) {
    return (
      <div className="w-full max-w-[1200px] mx-auto mt-8 font-black">
        <div className="bg-[#59b8db]/90 rounded-[2rem] p-8 shadow-xl border-2 border-white/60 text-center text-white">
          <h2 className="text-4xl mb-4">{notFoundText}</h2>
          <Link to="/news" className="text-xl underline hover:text-[#0a9eb5]">{backText}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-8 font-black">
      <div className="bg-[#59b8db]/90 rounded-[2rem] p-8 shadow-xl border-2 border-white/60">
        <div className="mb-6">
          <Link to="/news" className="inline-block py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors border border-white/30">
            &larr; {backText}
          </Link>
        </div>
        
        <div className="bg-white/95 p-8 rounded-2xl shadow-inner text-[#4A3219]">
          <h2 className="text-3xl mb-2">{article.title}</h2>
          <p className="text-sm text-[#8C623E] mb-6 font-extralight">{article.date}</p>
          
          <div className="text-lg space-y-4 font-extralight leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
};
