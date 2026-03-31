import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { dayenuVerses } from '../../content/haggadah';
import { t } from '../../content/translations';
import SectionImage from '../../components/SectionImage';

export default function Dayenu() {
  const [activeVerse, setActiveVerse] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleSingAlong = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      setActiveVerse(-1);
      return;
    }

    setIsPlaying(true);
    setActiveVerse(0);
    let verse = 0;

    intervalRef.current = setInterval(() => {
      verse++;
      if (verse >= dayenuVerses.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
        setActiveVerse(-1);
      } else {
        setActiveVerse(verse);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <h3 className="font-display text-2xl text-gold text-center mb-2">{t('dayenu.title')}</h3>
      <p className="hebrew-text text-center text-gold-light/80 text-xl mb-2">דַּיֵּנוּ</p>
      <p className="text-center text-parchment/50 text-sm mb-6">{t('dayenu.subtitle')}</p>

      <SectionImage src="/images/generated/dayenu.png" alt="Crossing the Red Sea" />

      <div className="flex justify-center mb-8">
        <button
          onClick={toggleSingAlong}
          className={`px-6 py-2.5 rounded-full font-display text-sm tracking-wider transition-all ${
            isPlaying
              ? 'bg-gold text-midnight'
              : 'bg-gold/20 text-gold hover:bg-gold/30'
          }`}
        >
          {isPlaying ? `⏹ ${t('dayenu.stop')}` : `▶ ${t('dayenu.singAlong')}`}
        </button>
      </div>

      <div className="space-y-3">
        {dayenuVerses.map((verse, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`p-4 rounded-xl border transition-all duration-500 ${
              activeVerse === i
                ? 'bg-gold/15 border-gold/40 scale-[1.02]'
                : 'bg-white/3 border-white/5'
            }`}
          >
            <p className={`text-base transition-colors ${
              activeVerse === i ? 'text-parchment' : 'text-parchment/70'
            }`}>
              {verse.english}
            </p>
            <p className={`hebrew-text text-sm mt-1 transition-colors ${
              activeVerse === i ? 'text-gold-light' : 'text-gold-light/40'
            }`}>
              {verse.hebrew}
            </p>
            <motion.p
              className="text-gold font-display text-lg text-center mt-2"
              animate={activeVerse === i ? { scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {activeVerse === i && 'DAYENU! דַּיֵּנוּ'}
            </motion.p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center p-6 rounded-xl bg-gold/5 border border-gold/15"
      >
        <p className="text-parchment/70 text-lg italic">
          How much more so, then, should we be grateful to God for all these good things combined that He has bestowed upon us!
        </p>
      </motion.div>
    </motion.div>
  );
}
