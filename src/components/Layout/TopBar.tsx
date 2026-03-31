import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageContext';
import { t } from '../../content/translations';

interface TopBarProps {
  narration: {
    isPlaying: boolean;
    isPaused: boolean;
    rate: number;
    availableVoices: SpeechSynthesisVoice[];
    voice: SpeechSynthesisVoice | null;
    stop: () => void;
    pause: () => void;
    resume: () => void;
    setRate: (rate: number) => void;
    setVoice: (voice: SpeechSynthesisVoice) => void;
  };
  onChecklistToggle?: () => void;
}

const rates = [0.5, 0.75, 1, 1.25, 1.5];

export default function TopBar({ narration, onChecklistToggle }: TopBarProps) {
  const [showControls, setShowControls] = useState(false);
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-gold/10"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="font-display text-gold text-sm sm:text-base md:text-lg tracking-wider truncate mr-2">
          {t('app.title')}
        </h1>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {narration.isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="flex gap-0.5">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-gold rounded-full"
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <button
                onClick={narration.isPaused ? narration.resume : narration.pause}
                className="text-gold active:text-gold-light text-base p-1"
              >
                {narration.isPaused ? '▶' : '⏸'}
              </button>
              <button
                onClick={narration.stop}
                className="text-gold/60 active:text-gold text-base p-1"
              >
                ⏹
              </button>
            </motion.div>
          )}

          {/* Checklist */}
          {onChecklistToggle && (
            <button
              onClick={onChecklistToggle}
              className="text-parchment/60 active:text-gold hover:text-gold transition-colors text-lg p-1"
              title={lang === 'he' ? 'רשימת הכנות' : 'Preparation checklist'}
            >
              📋
            </button>
          )}

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="px-2.5 py-1 rounded-full text-sm font-medium transition-colors bg-white/5 border border-gold/20 text-gold hover:bg-gold/20 active:bg-gold/30"
            title={lang === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
          >
            {lang === 'en' ? 'עב' : 'EN'}
          </button>

          <button
            onClick={() => setShowControls(!showControls)}
            className="text-parchment/60 active:text-gold hover:text-gold transition-colors text-xl p-1"
            title="Settings"
          >
            ⚙
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gold/10"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-parchment/50">{t('settings.speed')}</span>
                {rates.map(r => (
                  <button
                    key={r}
                    onClick={() => narration.setRate(r)}
                    className={`px-2.5 py-1 rounded text-sm transition-colors ${
                      narration.rate === r
                        ? 'bg-gold text-midnight font-bold'
                        : 'text-parchment/60 active:text-gold'
                    }`}
                  >
                    {r}x
                  </button>
                ))}
              </div>

              {narration.availableVoices.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-parchment/50">{t('settings.voice')}</span>
                  <select
                    value={narration.voice?.name || ''}
                    onChange={e => {
                      const v = narration.availableVoices.find(v => v.name === e.target.value);
                      if (v) narration.setVoice(v);
                    }}
                    className="bg-royal-light text-parchment text-sm rounded px-2 py-1.5 border border-gold/20 max-w-[200px]"
                  >
                    {narration.availableVoices.map(v => (
                      <option key={v.name} value={v.name}>
                        {v.name.replace(/Microsoft |Google |Apple /, '')}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
