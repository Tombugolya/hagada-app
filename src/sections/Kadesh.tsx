import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import { t } from '../content/translations';
import SectionText from '../components/SectionText';
import SectionImage from '../components/SectionImage';
import { sectionTextProps } from '../content/sectionHelper';

export default function Kadesh() {
  const section = haggadahText['kadesh'];
  const [fillLevel, setFillLevel] = useState(0);
  const [isFilling, setIsFilling] = useState(false);
  const [showBlessing, setShowBlessing] = useState(false);

  const handleFillCup = () => {
    if (isFilling) return;
    setIsFilling(true);
    setFillLevel(0);

    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setFillLevel(step / steps);
      if (step >= steps) {
        clearInterval(interval);
        setIsFilling(false);
        setShowBlessing(true);
      }
    }, 30);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      {/* Wine Cup SVG */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex flex-col items-center mb-10"
      >
        <svg
          viewBox="0 0 200 300"
          className="w-48 h-72 cursor-pointer drop-shadow-2xl"
          onClick={handleFillCup}
        >
          {/* Glass glow */}
          <defs>
            <radialGradient id="wine-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#722F37" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#722F37" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="wine-fill" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#4A1A20" />
              <stop offset="50%" stopColor="#722F37" />
              <stop offset="100%" stopColor="#9B4449" />
            </linearGradient>
            <linearGradient id="glass-shine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.05" />
              <stop offset="30%" stopColor="white" stopOpacity="0.15" />
              <stop offset="50%" stopColor="white" stopOpacity="0.05" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <clipPath id="cup-clip">
              <path d="M55,50 Q50,140 65,180 L75,180 L75,240 L125,240 L125,180 L135,180 Q150,140 145,50 Z" />
            </clipPath>
          </defs>

          {/* Ambient glow when filled */}
          {fillLevel > 0.5 && (
            <circle cx="100" cy="140" r="100" fill="url(#wine-glow)" opacity={fillLevel * 0.5} />
          )}

          {/* Wine liquid */}
          <g clipPath="url(#cup-clip)">
            <motion.rect
              x="50"
              y={180 - fillLevel * 130}
              width="100"
              height={fillLevel * 135 + 65}
              fill="url(#wine-fill)"
              initial={false}
            />
            {/* Wine surface shimmer */}
            {fillLevel > 0.05 && (
              <motion.ellipse
                cx="100"
                cy={180 - fillLevel * 130}
                rx="42"
                ry="4"
                fill="#9B4449"
                opacity="0.6"
                animate={{ ry: [3, 5, 3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </g>

          {/* Glass outline - goblet shape */}
          <path
            d="M55,50 Q50,140 65,180 L75,180 L75,240 L125,240 L125,180 L135,180 Q150,140 145,50 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2.5"
            opacity="0.7"
          />

          {/* Glass rim */}
          <ellipse cx="100" cy="50" rx="46" ry="8" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />

          {/* Base */}
          <ellipse cx="100" cy="240" rx="30" ry="5" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
          <line x1="60" y1="260" x2="140" y2="260" stroke="#D4AF37" strokeWidth="3" opacity="0.5" />
          <ellipse cx="100" cy="260" rx="40" ry="6" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.4" />

          {/* Glass shine */}
          <path
            d="M70,60 Q68,130 78,175"
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity="0.1"
            strokeLinecap="round"
          />
        </svg>

        <AnimatePresence>
          {fillLevel < 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gold/60 text-sm mt-4 animate-pulse"
            >
              {t('kadesh.tapToPour')}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Blessing and content appear after cup is filled */}
      <AnimatePresence>
        {showBlessing && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionImage src="/images/generated/kadesh.png" alt="Kiddush cup and Seder table" />
            <SectionText {...sectionTextProps(section)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
