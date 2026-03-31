import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';
import { sectionTextProps } from '../content/sectionHelper';
import SectionImage from '../components/SectionImage';
export default function Karpas() {
  const section = haggadahText['karpas'];
  const [isDipping, setIsDipping] = useState(false);
  const [dipped, setDipped] = useState(false);

  const handleDip = () => {
    if (isDipping || dipped) return;
    setIsDipping(true);
    setTimeout(() => {
      setIsDipping(false);
      setDipped(true);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      {/* Dipping animation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center mb-10 cursor-pointer"
        onClick={handleDip}
      >
        <div className="relative w-72 h-72">
          <svg viewBox="0 0 240 240" className="w-full h-full">
            <defs>
              <linearGradient id="salt-water" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a8c8e0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6a9ec0" stopOpacity="0.8" />
              </linearGradient>
              <radialGradient id="tear-glow" cx="50%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#a8c8e0" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1a4a6e" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Bowl */}
            <ellipse cx="120" cy="180" rx="80" ry="15" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
            <path
              d="M40,160 Q40,190 120,195 Q200,190 200,160"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Salt water surface */}
            <motion.ellipse
              cx="120" cy="160" rx="75" ry="12"
              fill="url(#salt-water)"
              animate={{ ry: isDipping ? [12, 15, 12] : 12 }}
              transition={{ duration: 0.5 }}
            />
            <circle cx="120" cy="130" r="80" fill="url(#tear-glow)" />

            {/* Tear drops floating */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.g key={i}>
                <motion.path
                  d={`M${85 + i * 18},${140 + (i % 2) * 10} Q${85 + i * 18},${134 + (i % 2) * 10} ${88 + i * 18},${140 + (i % 2) * 10} Q${85 + i * 18},${146 + (i % 2) * 10} ${82 + i * 18},${140 + (i % 2) * 10} Z`}
                  fill="#a8c8e0"
                  opacity="0.4"
                  animate={{
                    y: [0, -3, 0, 3, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.4,
                    repeat: Infinity,
                  }}
                />
              </motion.g>
            ))}

            {/* Parsley sprig */}
            <motion.g
              animate={{
                y: isDipping ? [0, 40, 0] : 0,
                rotate: isDipping ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 2 }}
              style={{ originX: '120px', originY: '80px' }}
            >
              {/* Stem */}
              <line x1="120" y1="50" x2="120" y2="120" stroke="#4a8a4a" strokeWidth="3" strokeLinecap="round" />
              {/* Leaves */}
              <path d="M120,70 Q105,55 110,70 Q105,75 120,70" fill="#4a8a4a" opacity="0.9" />
              <path d="M120,70 Q135,55 130,70 Q135,75 120,70" fill="#2d5a2d" opacity="0.9" />
              <path d="M120,85 Q100,72 108,87 Q102,92 120,85" fill="#4a8a4a" opacity="0.8" />
              <path d="M120,85 Q140,72 132,87 Q138,92 120,85" fill="#2d5a2d" opacity="0.8" />
              <path d="M120,100 Q108,90 113,100 Q108,105 120,100" fill="#4a8a4a" opacity="0.7" />
              <path d="M120,100 Q132,90 127,100 Q132,105 120,100" fill="#2d5a2d" opacity="0.7" />
              {/* Water drops on parsley after dipping */}
              {dipped && (
                <>
                  <circle cx="115" cy="95" r="2" fill="#a8c8e0" opacity="0.7" />
                  <circle cx="125" cy="80" r="1.5" fill="#a8c8e0" opacity="0.6" />
                  <circle cx="110" cy="75" r="2" fill="#a8c8e0" opacity="0.5" />
                </>
              )}
            </motion.g>
          </svg>
        </div>

        <AnimatePresence>
          {!dipped && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-spring-light/60 text-sm mt-2 animate-pulse"
            >
              {isDipping ? 'Dipping...' : 'Tap to dip the vegetable in salt water'}
            </motion.p>
          )}
          {dipped && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-spring-light text-lg mt-2"
            >
              We taste the tears of our ancestors
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <SectionImage src="/images/generated/karpas.png" alt="Karpas dipping in salt water" />
      <SectionText {...sectionTextProps(section)} />
    </motion.div>
  );
}
