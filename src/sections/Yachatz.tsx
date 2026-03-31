import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';
import { sectionTextProps } from '../content/sectionHelper';
import { useSoundEffect } from '../hooks/useSoundEffect';

export default function Yachatz() {
  const section = haggadahText['yachatz'];
  const [broken, setBroken] = useState(false);
  const { play } = useSoundEffect();

  const handleBreak = () => {
    if (broken) return;
    play('crack');
    setBroken(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Interactive matzah breaking */}
      <motion.div
        className="flex justify-center mb-10 cursor-pointer"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={handleBreak}
      >
        <div className="relative">
          {!broken ? (
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-56 h-20 rounded-lg bg-gradient-to-br from-amber-200/80 to-amber-300/60 border border-amber-400/40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(139,69,19,0.3) 1px, transparent 1px), radial-gradient(circle at 60% 70%, rgba(139,69,19,0.2) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(139,69,19,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px, 25px 25px, 15px 15px',
                }} />
                {/* Crack line in middle */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-amber-600/30" />
                <span className="text-amber-800/60 font-display text-sm tracking-wider">MATZAH</span>
              </div>
              <p className="text-gold/50 text-sm mt-3 animate-pulse">Tap to break the matzah</p>
            </motion.div>
          ) : (
            <div className="flex items-center gap-6">
              <motion.div
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: -20, rotate: -5 }}
                transition={{ type: 'spring', damping: 10 }}
                className="w-28 h-20 rounded-lg bg-gradient-to-br from-amber-200/80 to-amber-300/60 border border-amber-400/40 flex items-center justify-center relative overflow-hidden"
                style={{ borderRight: '2px solid rgba(139,69,19,0.4)', borderRadius: '8px 2px 2px 8px' }}
              >
                <span className="text-amber-800/40 text-xs">Smaller piece</span>
              </motion.div>
              <motion.div
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: 20, rotate: 3 }}
                transition={{ type: 'spring', damping: 10 }}
                className="w-32 h-20 rounded-lg bg-gradient-to-br from-amber-200/80 to-amber-300/60 border border-amber-400/40 flex items-center justify-center relative overflow-hidden"
                style={{ borderLeft: '2px solid rgba(139,69,19,0.4)', borderRadius: '2px 8px 8px 2px' }}
              >
                <span className="text-amber-800/40 text-xs">Afikoman</span>
              </motion.div>
            </div>
          )}

          {/* Crumb particles on break */}
          <AnimatePresence>
            {broken && Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/60"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 100,
                  y: Math.random() * 60 + 20,
                  opacity: 0,
                }}
                transition={{ duration: 0.8 }}
                style={{ left: '50%', top: '50%' }}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <SectionText {...sectionTextProps(section)} />
    </div>
  );
}
