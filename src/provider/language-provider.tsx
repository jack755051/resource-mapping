'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, defaultLanguage } from '@/config/i18n';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);

  // (選用) 初始化時可以讀取 localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as LanguageCode;
    if (savedLang) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang); // 記住使用者的選擇
    // 這裡未來可以擴充：切換路由、或是觸發 API
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 建立 Hook 方便使用
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
