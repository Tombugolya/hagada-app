import { useState } from 'react';
import { motion } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';
import SectionImage from '../components/SectionImage';

export default function Maror() {
  const section = haggadahText['maror'];
  const [spicy, setSpicy] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Spicy flash */}
      {spicy && (
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-red-900/20 z-30 pointer-events-none"
        />
      )}

      <motion.div
        className="flex justify-center mb-8 cursor-pointer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onClick={() => {
          setSpicy(true);
          setTimeout(() => setSpicy(false), 500);
        }}
      >
        <motion.div
          className="text-6xl"
          animate={spicy ? { x: [-3, 3, -3, 3, 0], rotate: [-2, 2, -2, 2, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          🥬
        </motion.div>
      </motion.div>
      <p className="text-center text-parchment/40 text-xs mb-6 -mt-4">Tap for a taste of bitterness</p>

      <SectionImage src="/images/generated/maror.png" alt="Bitter herbs" />
      <SectionText
        instructions={section.instruction}
        blessingHebrew={section.blessingHebrew}
        blessing={section.blessing}
        blessingEnglish={section.blessingEnglish}
        body={section.content.join('\n\n')}
        commentary={section.commentary}
      />
    </div>
  );
}
