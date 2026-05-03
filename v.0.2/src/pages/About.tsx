import React from 'react';
import Markdown from 'react-markdown';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const markdownContentRU = `
О проекте Ultimate LittleBigPlanet

**Ultimate LittleBigPlanet (ULBP)** — это проект по объединению контента и игровых механик всей серии LittleBigPlanet в единую среду для ПК. Система включает в себя элементы LittleBigPlanet 1, 2, 3, LBP Vita и LBP Karting.

***

### Основной функционал

**Архивация и импорт:** Проект позволяет переносить уровни и целые кампании (эпизоды) с консолей PS3, PS4 и PS5. Это обеспечивает сохранность пользовательского контента и архивов оригинальной игры.

**Унификация движка:** Взаимодействие с объектами и физика адаптированы для работы на ПК, сохраняя специфику каждой из оригинальных частей.

**Поддержка VR и периферии:** В игру интегрирована эмуляция PlayStation Move через VR-устройства. Также планируется поддержка оригинального оборудования (PS Move и PlayStation Eye).

**Автономность:** Игра является полностью функциональной в офлайн-режиме, ориентируясь на одиночное прохождение, локальный кооператив или игру по LAN.

***

### Экосистема ULBP HUB

Взаимодействие с данными происходит через ULBP HUB — интерфейс, существующий в двух формах:

**Локальная версия:** Запускается автоматически вместе с игрой на ПК. Она управляет локальной базой данных, фиксирует появление новых эпизодов и действия игрока.

**Веб-версия:** Глобальный узел для регистрации в экосистеме. В перспективе веб-версия позволит синхронизировать данные между пользователями через систему локальных ключей.

***

### Взаимодействие с контентом

При наличии соединения с базой данных, HUB позволяет искать и загружать эпизоды напрямую в игру. Если игра запущена, выбранные на сайте уровни ставятся в очередь на автоматическую загрузку. Интернет-соединение расширяет возможности поиска и обмена данными, но не является обязательным требованием для работы базовых функций игры.
`;

const markdownContentEN = `
About Ultimate LittleBigPlanet

**Ultimate LittleBigPlanet (ULBP)** is a project aimed at merging the content and gameplay mechanics of the entire LittleBigPlanet series into a unified PC environment. The system incorporates elements from LittleBigPlanet 1, 2, 3, LBP Vita, and LBP Karting.

***

### Core Features

**Archiving and Importing:** The project allows porting levels and entire campaigns (episodes) from PS3, PS4, and PS5 consoles. This explicitly preserves user-generated content and original game archives.

**Engine Unification:** Object interaction and physics are specially adapted for PC, preserving the specifics of each original entry.

**VR and Peripheral Support:** The game integrates PlayStation Move emulation through VR devices. Official hardware support (PS Move and PlayStation Eye) is also planned.

**Autonomy:** The game is fully functional offline, focusing on single-player traversal, local co-op, or LAN play.

***

### The ULBP HUB Ecosystem

Data interaction happens through the ULBP HUB — an interface existing in two forms:

**Local Version:** Launches automatically with the PC game. It manages the local database, registers new episodes, and tracks player actions.

**Web Version:** The global node for registering in the ecosystem. Moving forward, the web version will synchronize data between users via a local key system.

***

### Content Interaction

When connected to the database, the HUB lets you search and load episodes directly into the game. If the game is running, levels selected on the website are queued for automatic download. Internet connection expands search and sharing possibilities but is not required for the game's core features.
`;

export const About: React.FC = () => {
  const { language } = useLanguage();
  const t = language ? translations[language as keyof typeof translations] : translations.en;
  
  const content = language === 'ru' ? markdownContentRU : markdownContentEN;

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-8 font-black">
      <div className="bg-[#4ebfac]/90 rounded-[2rem] p-8 shadow-xl border-2 border-white/60">
        <h2 className="text-4xl text-white mb-8 tracking-wide drop-shadow-md">{t.aboutTitle}</h2>
        
        <div className="bg-white/95 p-8 rounded-2xl mb-6 shadow-inner text-[#4A3219] font-extralight leading-relaxed markdown-container">
          <div className="markdown-body prose prose-lg prose-[#4A3219] max-w-none prose-headings:font-black prose-headings:text-[#4A3219] prose-a:text-[#59b8db] prose-strong:font-black pb-4">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};
