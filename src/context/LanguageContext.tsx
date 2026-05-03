import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language | null;
  setLanguage: (lang: Language) => void;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam === 'en' || langParam === 'ru') {
      setLanguageState(langParam);
      localStorage.setItem('ulbp_lang', langParam);
      
      // Clean up URL to just the path
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      setIsLoaded(true);
      return;
    }

    // 2. Check localStorage
    const storedLang = localStorage.getItem('ulbp_lang') as Language | null;
    if (storedLang === 'en' || storedLang === 'ru') {
      setLanguageState(storedLang);
    }
    
    setIsLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ulbp_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
