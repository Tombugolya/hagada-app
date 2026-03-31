import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haggadahText, chadGadya, echadMiYodea } from '../content/haggadah';
import { useSoundEffect } from '../hooks/useSoundEffect';
import SectionImage from '../components/SectionImage';

export default function Nirtzah() {
  const section = haggadahText['nirtzah'];
  const [showChadGadya, setShowChadGadya] = useState(false);
  const [showEchad, setShowEchad] = useState(false);
  const [finaleTriggered, setFinaleTriggered] = useState(false);
  const { play } = useSoundEffect();

  const triggerFinale = () => {
    if (finaleTriggered) return;
    setFinaleTriggered(true);
    play('success');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Conclusion text */}
      <div className="space-y-4 mb-8">
        {section.content.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-parchment/90 text-lg leading-relaxed text-center"
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Hebrew text */}
      {section.hebrewContent && (
        <div className="space-y-3 mb-10">
          {section.hebrewContent.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="hebrew-text text-gold-light text-xl text-center"
            >
              {line}
            </motion.p>
          ))}
        </div>
      )}

      <SectionImage src="/images/generated/nirtzah.png" alt="Next Year in Jerusalem" />

      {/* GRAND FINALE — Next Year in Jerusalem */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center my-16"
      >
        <motion.button
          onClick={triggerFinale}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <motion.div
            className={`p-10 rounded-3xl border-2 transition-all ${
              finaleTriggered
                ? 'bg-gradient-to-b from-gold/20 to-gold/5 border-gold/50'
                : 'bg-gradient-to-b from-gold/10 to-transparent border-gold/20 hover:border-gold/40'
            }`}
            animate={finaleTriggered ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: finaleTriggered ? Infinity : 0 }}
          >
            <motion.p
              className="font-hebrew text-4xl sm:text-5xl text-gold mb-3"
              animate={finaleTriggered ? { textShadow: ['0 0 10px rgba(212,175,55,0)', '0 0 30px rgba(212,175,55,0.5)', '0 0 10px rgba(212,175,55,0)'] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              לְשָׁנָה הַבָּאָה בִּירוּשָׁלָיִם!
            </motion.p>
            <motion.p
              className="font-display text-2xl text-parchment tracking-wider"
              initial={{ opacity: finaleTriggered ? 1 : 0.7 }}
              animate={{ opacity: 1 }}
            >
              NEXT YEAR IN JERUSALEM!
            </motion.p>
          </motion.div>
        </motion.button>

        {/* Celebration particles */}
        <AnimatePresence>
          {finaleTriggered && (
            <>
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${30 + Math.random() * 40}%`,
                    top: '50%',
                    backgroundColor: ['#D4AF37', '#F0D060', '#722F37', '#f5f0e8'][i % 4],
                  }}
                  initial={{ scale: 0, y: 0, x: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    y: (Math.random() - 0.5) * 200,
                    x: (Math.random() - 0.5) * 200,
                  }}
                  transition={{ duration: 1.5, delay: i * 0.05 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Traditional songs */}
      <div className="space-y-6 mt-16">
        {/* Chad Gadya */}
        <div className="rounded-2xl border border-gold/15 overflow-hidden">
          <button
            onClick={() => setShowChadGadya(!showChadGadya)}
            className="w-full p-5 flex items-center justify-between bg-white/5 hover:bg-white/8 transition-colors text-left"
          >
            <div>
              <h4 className="font-display text-lg text-gold">Chad Gadya — One Little Goat</h4>
              <p className="text-parchment/50 text-sm">חַד גַּדְיָא</p>
            </div>
            <span className="text-gold text-xl">{showChadGadya ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {showChadGadya && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 space-y-3 border-t border-gold/10">
                  {chadGadya.map((verse, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="text-parchment/80 text-base leading-relaxed"
                    >
                      {verse}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Echad Mi Yodea */}
        <div className="rounded-2xl border border-gold/15 overflow-hidden">
          <button
            onClick={() => setShowEchad(!showEchad)}
            className="w-full p-5 flex items-center justify-between bg-white/5 hover:bg-white/8 transition-colors text-left"
          >
            <div>
              <h4 className="font-display text-lg text-gold">Echad Mi Yodea — Who Knows One?</h4>
              <p className="text-parchment/50 text-sm">אֶחָד מִי יוֹדֵעַ</p>
            </div>
            <span className="text-gold text-xl">{showEchad ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {showEchad && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 space-y-2 border-t border-gold/10">
                  {echadMiYodea.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5"
                    >
                      <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-display text-sm shrink-0">
                        {item.number}
                      </span>
                      <span className="text-parchment/80 text-base">{item.answer}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {section.commentary && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 p-5 rounded-xl bg-gold/5 border border-gold/10 text-parchment/60 text-base"
        >
          <span className="text-gold font-display text-sm tracking-wider block mb-1">COMMENTARY</span>
          {section.commentary}
        </motion.div>
      )}
    </div>
  );
}
