import { useState, useCallback, useRef, useEffect } from 'react';
import type { Lang } from './LanguageContext';

interface NarrationState {
  isPlaying: boolean;
  isPaused: boolean;
  rate: number;
  voice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
  currentText: string;
  lang: Lang;
}

function pickBestVoice(voices: SpeechSynthesisVoice[], lang: Lang): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  if (lang === 'he') {
    // Hebrew voice preferences
    const hePreferred = [
      'Carmit', // macOS Hebrew voice
      'he-IL', 'Hila', 'Avri',
    ];
    for (const name of hePreferred) {
      const match = voices.find(v => v.name.includes(name));
      if (match) return match;
    }
    // Any enhanced Hebrew voice
    const enhanced = voices.find(v => v.name.includes('Enhanced') || v.name.includes('Premium'));
    if (enhanced) return enhanced;
    return voices[0];
  }

  // English voice preferences
  const enPreferred = [
    'Samantha (Enhanced)', 'Samantha', 'Karen (Enhanced)', 'Karen',
    'Daniel (Enhanced)', 'Daniel',
    'Google UK English Female', 'Google UK English Male',
    'Google US English',
    'Microsoft Zira', 'Microsoft David',
  ];

  for (const name of enPreferred) {
    const match = voices.find(v => v.name.includes(name));
    if (match) return match;
  }

  const enhanced = voices.find(v =>
    v.name.includes('Enhanced') || v.name.includes('Premium') || v.name.includes('Natural')
  );
  if (enhanced) return enhanced;

  return voices.find(v => v.default) || voices[0];
}

export function useNarration() {
  const [state, setState] = useState<NarrationState>({
    isPlaying: false,
    isPaused: false,
    rate: 1,
    voice: null,
    availableVoices: [],
    currentText: '',
    lang: 'en',
  });
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const onEndRef = useRef<(() => void) | null>(null);
  const allVoicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Load all voices once
  useEffect(() => {
    const loadVoices = () => {
      allVoicesRef.current = speechSynthesis.getVoices();
      // Filter for current language and pick best
      updateVoicesForLang(state.lang);
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    return () => { speechSynthesis.onvoiceschanged = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateVoicesForLang = useCallback((lang: Lang) => {
    const allVoices = allVoicesRef.current;
    const langPrefix = lang === 'he' ? 'he' : 'en';
    const filtered = allVoices.filter(v => v.lang.startsWith(langPrefix));
    const best = pickBestVoice(filtered, lang);
    setState(prev => ({
      ...prev,
      lang,
      availableVoices: filtered,
      voice: best,
    }));
  }, []);

  // Public method to switch language
  const setLang = useCallback((lang: Lang) => {
    updateVoicesForLang(lang);
  }, [updateVoicesForLang]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.rate;
    utterance.lang = state.lang === 'he' ? 'he-IL' : 'en-US';
    if (state.voice) utterance.voice = state.voice;
    utterance.pitch = 1;

    onEndRef.current = onEnd || null;
    utterance.onend = () => {
      setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
      onEndRef.current?.();
    };
    utterance.onerror = () => {
      setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
    };

    utteranceRef.current = utterance;
    setState(prev => ({ ...prev, isPlaying: true, isPaused: false, currentText: text }));
    speechSynthesis.speak(utterance);
  }, [state.rate, state.voice, state.lang]);

  const pause = useCallback(() => {
    speechSynthesis.pause();
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    speechSynthesis.resume();
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
  }, []);

  const setRate = useCallback((rate: number) => {
    setState(prev => ({ ...prev, rate }));
  }, []);

  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setState(prev => ({ ...prev, voice }));
  }, []);

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
    setRate,
    setVoice,
    setLang,
  };
}
