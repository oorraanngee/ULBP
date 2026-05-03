/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { LanguageSelect } from './pages/LanguageSelect';
import { Home } from './pages/Home';
import { NotReleased } from './pages/NotReleased';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { About } from './pages/About';

const LanguageRouter = () => {
  const { language, isLoaded } = useLanguage();

  if (!isLoaded) return null; // wait for language logic to resolve

  // If no language chosen, show select page
  if (!language) {
    return <LanguageSelect />;
  }

  // Once language is chosen, provide normal routing
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="about" element={<About />} />
        <Route path="not-released" element={<NotReleased />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <LanguageRouter />
      </BrowserRouter>
    </LanguageProvider>
  );
}
