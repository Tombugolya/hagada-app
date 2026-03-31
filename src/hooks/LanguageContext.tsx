import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'en' | 'he';

interface LanguageContextValue {
  lang: Lang;
  isHebrew: boolean;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getLangFromURL(): Lang {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  return lang === 'he' ? 'he' : 'en';
}

function setLangInURL(lang: Lang) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getLangFromURL);

  useEffect(() => {
    setLangInURL(lang);
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState(l => l === 'en' ? 'he' : 'en'), []);

  return (
    <LanguageContext.Provider value={{ lang, isHebrew: lang === 'he', toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
