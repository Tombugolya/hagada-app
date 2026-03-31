import { useState } from 'react';
import { motion } from 'framer-motion';
import { fourSons } from '../../content/haggadah';
import { t } from '../../content/translations';
import { useLanguage } from '../../hooks/LanguageContext';
import SectionImage from '../../components/SectionImage';

export default function FourSons() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const { isHebrew } = useLanguage();

  const toggleFlip = (idx: number) => {
    setFlipped(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto"
    >
      <h3 className="font-display text-xl sm:text-2xl text-gold text-center mb-1 sm:mb-2">{t('fourSons.title')}</h3>
      <p className="hebrew-text text-center text-gold-light/80 text-lg sm:text-xl mb-1 sm:mb-2">אַרְבָּעָה בָנִים</p>
      <p className="text-center text-parchment/50 text-xs sm:text-sm mb-6 sm:mb-10">{t('fourSons.tapToReveal')}</p>
      <SectionImage src="/images/generated/four-sons.png" alt="The Four Sons" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {fourSons.map((son, i) => (
          <motion.div
            key={son.type}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => toggleFlip(i)}
            className="cursor-pointer perspective-1000"
          >
            <div
              className="relative min-h-[220px] sm:min-h-[280px] rounded-2xl preserve-3d transition-transform duration-500"
              style={{ transform: flipped[i] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden">
                <div className={`h-full p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${son.color} border border-gold/15 flex flex-col items-center justify-center text-center`}>
                  <div className="text-3xl sm:text-5xl mb-2 sm:mb-3">{son.icon}</div>
                  {!isHebrew && <h4 className="font-display text-base sm:text-xl text-gold mb-1">{son.type}</h4>}
                  <p className="hebrew-text text-gold-light/70 text-sm sm:text-lg mb-2 sm:mb-4">{son.hebrew}</p>
                  <p className={`text-parchment/80 text-sm sm:text-base italic ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? (son.questionHe || son.question) : son.question}
                  </p>
                  <p className="text-gold/40 text-[10px] sm:text-xs mt-2 sm:mt-4 animate-pulse">{t('fourSons.tapToFlip')}</p>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <div className={`h-full p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${son.color} border border-gold/25 flex flex-col justify-center`}>
                  <div className="text-2xl sm:text-3xl text-center mb-2 sm:mb-3">{son.icon}</div>
                  <h4 className="font-display text-base sm:text-lg text-gold mb-2 sm:mb-3 text-center">{t('fourSons.response')}</h4>
                  <p className={`text-parchment/90 text-sm sm:text-base leading-relaxed ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? (son.responseHe || son.response) : son.response}
                  </p>
                  <p className="text-gold/40 text-[10px] sm:text-xs mt-2 sm:mt-4 text-center animate-pulse">{t('fourSons.tapBack')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
