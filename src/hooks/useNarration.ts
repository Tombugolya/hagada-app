import { useState, useCallback, useRef, useEffect } from 'react';

interface NarrationState {
  isPlaying: boolean;
  isPaused: boolean;
  rate: number;
  voice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
  currentText: string;
}

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  // Ranked preference: natural-sounding voices on macOS/Chrome/Edge
  const preferred = [
    // macOS enhanced voices (very natural)
    'Samantha (Enhanced)', 'Samantha', 'Karen (Enhanced)', 'Karen',
    'Daniel (Enhanced)', 'Daniel',
    // Chrome Google voices (natural)
    'Google UK English Female', 'Google UK English Male',
    'Google US English',
    // Edge Microsoft voices
    'Microsoft Zira', 'Microsoft David',
  ];

  for (const name of preferred) {
    const match = voices.find(v => v.name.includes(name));
    if (match) return match;
  }

  // Fallback: any voice with "Enhanced" or "Premium" in name
  const enhanced = voices.find(v =>
    v.name.includes('Enhanced') || v.name.includes('Premium') || v.name.includes('Natural')
  );
  if (enhanced) return enhanced;

  // Last resort: default or first available
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
  });
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const onEndRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const englishVoices = voices.filter(v => v.lang.startsWith('en'));
      // Pick the best default voice: prefer enhanced/premium voices, then well-known natural ones
      const bestVoice = pickBestVoice(englishVoices);
      setState(prev => ({
        ...prev,
        availableVoices: englishVoices,
        voice: prev.voice || bestVoice,
      }));
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    return () => { speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.rate;
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
  }, [state.rate, state.voice]);

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
  };
}
