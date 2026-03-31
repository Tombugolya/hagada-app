import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import { t } from '../content/translations';
import SectionText from '../components/SectionText';
import { sectionTextProps } from '../content/sectionHelper';
import WineCup from '../components/WineCup';
import SectionImage from '../components/SectionImage';

export default function Barech() {
  const section = haggadahText['barech'];
  const [doorOpen, setDoorOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Third cup */}
      <div className="flex justify-center mb-8">
        <WineCup size={100} fillPercent={100} />
      </div>

      <SectionText {...sectionTextProps(section)} />

      {/* Cup of Elijah and door */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <SectionImage src="/images/generated/elijah.png" alt="Cup of Elijah" />
        <h4 className="font-display text-lg text-gold mb-4">{t('barech.cupOfElijah')}</h4>

        {/* Door animation */}
        <div
          className="mx-auto w-48 h-64 relative cursor-pointer mb-6"
          onClick={() => setDoorOpen(!doorOpen)}
        >
          {/* Door frame */}
          <div className="absolute inset-0 rounded-t-3xl border-2 border-gold/30 bg-gradient-to-b from-royal-light/40 to-midnight overflow-hidden">
            {/* Stars visible when door opens */}
            <AnimatePresence>
              {doorOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-b from-midnight via-royal to-midnight"
                >
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gold/80 rounded-full"
                      style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 80}%` }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                    />
                  ))}
                  <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-4xl">
                    🌟
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Door panel */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-amber-900/50 to-amber-950/70 origin-left"
              animate={{ rotateY: doorOpen ? -70 : 0 }}
              transition={{ type: 'spring', damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute right-4 top-1/2 w-2 h-6 rounded-full bg-gold/40" />
            </motion.div>
          </div>
        </div>
        <p className="text-gold/50 text-sm animate-pulse">
          {doorOpen ? t('barech.welcome') : t('barech.openDoor')}
        </p>

        {/* Elijah's prayer in Hebrew */}
        {section.hebrewContent && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 p-5 rounded-xl bg-white/5 border border-gold/15 text-center"
          >
            <p className="hebrew-text text-gold-light text-xl">{section.hebrewContent[0]}</p>
            <p className="text-parchment/70 text-sm mt-2 italic">
              Elijah the Prophet, may he come speedily in our days, with the Messiah, son of David.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
