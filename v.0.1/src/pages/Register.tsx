import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from '../firebase';

const PopitFormWrapper: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div 
    className="bg-gradient-to-b from-[#0fd4f1]/80 to-[#0a9eb5]/80 backdrop-blur-md relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/40 max-w-md w-full mx-auto mt-12 p-8 font-black"
  >
    <div className="relative z-10 w-full flex flex-col items-center">
      <h2 className="text-4xl text-white mb-8 text-center">{title}</h2>
      {children}
    </div>
  </div>
);

export const Register: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language as keyof typeof translations] : translations.en;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Account created successfully!');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage('Google login successful!');
    } catch (error: any) {
      setMessage(`Google Auth Error: ${error.message}`);
    }
  };

  return (
    <PopitFormWrapper title={t.registerTitle}>
      <form className="w-full flex flex-col gap-5 relative z-10" onSubmit={handleRegister}>
        <div>
          <label className="block text-white text-lg mb-2">{t.emailOrUsername}</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border-2 border-transparent rounded-2xl px-4 py-3 text-gray-800 outline-none focus:border-pink-300 transition-colors"
          />
        </div>
        <div>
          <label className="block text-white text-lg mb-2">{t.password}</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border-2 border-transparent rounded-2xl px-4 py-3 text-gray-800 outline-none focus:border-pink-300 transition-colors"
          />
        </div>
        
        {message && <p className="text-white text-center">{message}</p>}

        <button 
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-4 bg-[#65c227] hover:bg-[#76d634] text-white rounded-full shadow-[0_6px_0_#2b6307] active:shadow-[0_0px_0_#2b6307] active:translate-y-[6px] transition-all text-xl uppercase tracking-wider"
        >
          {loading ? '...' : t.registerBtn}
        </button>
        
        <div className="flex flex-col gap-3 mt-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-[#3b82f6] hover:bg-[#60a5fa] text-white rounded-full shadow-[0_5px_0_#1d4ed8] active:shadow-[0_0px_0_#1d4ed8] active:translate-y-[5px] transition-all text-lg uppercase tracking-wider"
          >
            {t.signupWithGoogle}
          </button>
        </div>
      </form>
    </PopitFormWrapper>
  );
};
