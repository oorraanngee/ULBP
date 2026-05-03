import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = language ? translations[language] : translations.en;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-full flex-col flex gap-8">
      <div className="bg-[#59422a]/95 backdrop-blur-md rounded-3xl p-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-[#3a2918] relative w-full overflow-hidden">
        <h2 className="text-4xl font-black text-amber-100 mb-8 text-center drop-shadow-lg tracking-wide uppercase">
          {language === 'ru' ? 'Ваш профиль' : 'Your Profile'}
        </h2>
        
        <div className="bg-[#483522] rounded-2xl p-6 shadow-inner border border-amber-900/30 flex flex-col gap-4 max-w-2xl mx-auto">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-2xl bg-[#59422a] border-4 border-amber-800 shadow-md flex items-center justify-center shrink-0">
              <span className="text-4xl font-bold text-amber-100">{user.email?.charAt(0).toUpperCase() || 'U'}</span>
            </div>
            
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-amber-100">{user.email?.split('@')[0]}</h3>
              <p className="text-amber-500/80 font-medium">{user.email}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-amber-900/40">
            <p className="text-amber-100/80 text-sm">
              {language === 'ru' ? 'Больше функций профиля появится позже.' : 'More profile features coming soon.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
