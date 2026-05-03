import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { auth, googleProvider, signInWithRedirect, signInWithEmailAndPassword, sendSignInLinkToEmail, getRedirectResult } from '../firebase';

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

export const Login: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language as keyof typeof translations] : translations.en;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          setMessage('Google login successful!');
        }
      })
      .catch((error) => {
        setMessage(`Google Auth Error: ${error.message}`);
      });
  }, []);

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Logged in successfully!');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      setMessage(`Google Auth Error: ${error.message}`);
    }
  };

  const handleEmailLinkLogin = async () => {
    if (!email) {
      setMessage('Please enter your email to send a magic link.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const actionCodeSettings = {
        url: window.location.origin + '/login',
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('Magic link sent to your email!');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopitFormWrapper title={t.loginTitle}>
      <form className="w-full flex flex-col gap-5 relative z-10" onSubmit={handleEmailPasswordLogin}>
        <div>
          <label className="block text-white text-lg mb-2">{t.emailOrUsername}</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border-2 border-transparent rounded-2xl px-4 py-3 text-gray-800 outline-none focus:border-purple-300 transition-colors"
          />
        </div>
        <div>
          <label className="block text-white text-lg mb-2">{t.password}</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border-2 border-transparent rounded-2xl px-4 py-3 text-gray-800 outline-none focus:border-purple-300 transition-colors"
          />
        </div>
        
        {message && <p className="text-white text-center">{message}</p>}

        <button 
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-4 bg-[#65c227] hover:bg-[#76d634] text-white rounded-full shadow-[0_6px_0_#2b6307] active:shadow-[0_0px_0_#2b6307] active:translate-y-[6px] transition-all text-xl uppercase tracking-wider"
        >
          {loading ? '...' : t.loginBtn}
        </button>
        
        <div className="flex flex-col gap-3 mt-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-[#3b82f6] hover:bg-[#60a5fa] text-white rounded-full shadow-[0_5px_0_#1d4ed8] active:shadow-[0_0px_0_#1d4ed8] active:translate-y-[5px] transition-all text-lg uppercase tracking-wider"
          >
            {t.loginWithGoogle}
          </button>
          
          <button 
            type="button"
            onClick={handleEmailLinkLogin}
            disabled={loading}
            className="w-full py-3 bg-[#f97316] hover:bg-[#fb923c] text-white rounded-full shadow-[0_5px_0_#c2410c] active:shadow-[0_0px_0_#c2410c] active:translate-y-[5px] transition-all text-lg uppercase tracking-wider"
          >
            {t.magicLink}
          </button>
        </div>
      </form>
    </PopitFormWrapper>
  );
};
