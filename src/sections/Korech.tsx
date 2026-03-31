import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';
import { sectionTextProps } from '../content/sectionHelper';
import { t } from '../content/translations';
import SectionImage from '../components/SectionImage';
import { useLanguage } from '../hooks/LanguageContext';

const layersEn = ['🫓 Matzah', '🥬 Maror', '🟫 Charoset', '🫓 Matzah'];
const layersHe = ['🫓 מצה', '🥬 מרור', '🟫 חרוסת', '🫓 מצה'];

export default function Korech() {
  const section = haggadahText['korech'];
  const [step, setStep] = useState(0);
  const { isHebrew } = useLanguage();
  const layers = isHebrew ? layersHe : layersEn;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        className="flex flex-col items-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative h-40 w-40 flex flex-col justify-end items-center">
          <AnimatePresence>
            {layers.slice(0, step).map((layer, i) => (
              <motion.div
                key={`${layer}-${i}`}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center text-sm text-parchment/70 mb-1"
              >
                {layer}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setStep(s => Math.min(s + 1, layers.length))}
          disabled={step >= layers.length}
          className={`mt-4 px-5 py-2 rounded-full text-sm transition-all ${
            step >= layers.length
              ? 'bg-gold/20 text-gold'
              : 'bg-white/10 text-parchment/70 hover:bg-white/15 cursor-pointer'
          }`}
        >
          {step >= layers.length ? `🥪 ${t('korech.complete')}` : `${t('korech.addLayer', { layer: layers[step] })}`}
        </button>
      </motion.div>

      <SectionImage src="/images/generated/korech.png" alt="Hillel sandwich" />
      <SectionText {...sectionTextProps(section)} />
    </div>
  );
}
