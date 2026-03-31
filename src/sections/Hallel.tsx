import { motion } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';
import WineCup from '../components/WineCup';
import SectionImage from '../components/SectionImage';

export default function Hallel() {
  const section = haggadahText['hallel'];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Musical notes animation */}
      <motion.div
        className="flex justify-center gap-6 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {['♪', '♫', '♪', '♫', '♪'].map((note, i) => (
          <motion.span
            key={i}
            className="text-3xl text-gold/60"
            animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            {note}
          </motion.span>
        ))}
      </motion.div>

      <SectionImage src="/images/generated/hallel.png" alt="Songs of praise" />

      {/* Psalms text with Hebrew */}
      <div className="space-y-4 mb-8">
        {section.content.map((verse, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-lg bg-white/3 border border-white/5"
          >
            {section.hebrewContent?.[i] && (
              <p className="hebrew-text text-gold-light/80 text-lg mb-2">{section.hebrewContent[i]}</p>
            )}
            <p className="text-parchment/80 text-lg italic">{verse}</p>
          </motion.div>
        ))}
      </div>

      {/* Fourth cup */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <p className="font-display text-gold text-lg mb-4">The Fourth Cup of Wine</p>
        <div className="flex justify-center">
          <WineCup size={100} fillPercent={100} />
        </div>
      </motion.div>

      <div className="mt-8">
        <SectionText
          instructions={section.instruction}
          blessingHebrew={section.blessingHebrew}
          blessing={section.blessing}
          blessingEnglish={section.blessingEnglish}
          body=""
          commentary={section.commentary}
        />
      </div>
    </div>
  );
}
