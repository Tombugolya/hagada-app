import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';
interface Droplet {
  id: number;
  x: number;
  delay: number;
  size: number;
  duration: number;
}

export default function Urchatz() {
  const section = haggadahText['urchatz'];
  const [isWashing, setIsWashing] = useState(false);
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [washComplete, setWashComplete] = useState(false);
  useEffect(() => {
    if (!isWashing) return;

    let dropId = 0;
    const interval = setInterval(() => {
      setDroplets(prev => [
        ...prev.slice(-20),
        {
          id: dropId++,
          x: 30 + Math.random() * 40,
          delay: Math.random() * 0.3,
          size: 3 + Math.random() * 5,
          duration: 1 + Math.random() * 0.5,
        },
      ]);
    }, 150);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsWashing(false);
      setWashComplete(true);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isWashing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      {/* Water washing animation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex flex-col items-center mb-10"
      >
        <div className="relative w-64 h-64">
          {/* Water pitcher / hands illustration */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="water-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2d7ab0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1a4a6e" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id="water-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2d7ab0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2d7ab0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glow */}
            {isWashing && (
              <motion.circle
                cx="100"
                cy="100"
                r="90"
                fill="url(#water-glow)"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            {/* Hands outline */}
            <g transform="translate(50, 80)" opacity="0.7">
              {/* Left hand */}
              <path
                d="M10,60 Q5,40 15,20 Q20,10 30,5 Q35,0 40,5 L45,15 Q48,5 55,3 Q60,5 58,15 L55,30 Q50,50 45,60 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              {/* Right hand */}
              <path
                d="M90,60 Q95,40 85,20 Q80,10 70,5 Q65,0 60,5 L55,15 Q52,5 45,3 Q40,5 42,15 L45,30 Q50,50 55,60 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
            </g>

            {/* Water stream when washing */}
            {isWashing && (
              <motion.path
                d="M100,10 Q98,50 100,90 Q102,50 100,10"
                fill="url(#water-grad)"
                opacity="0.6"
                animate={{ d: [
                  'M100,10 Q95,50 100,90 Q105,50 100,10',
                  'M100,10 Q105,50 100,90 Q95,50 100,10',
                  'M100,10 Q95,50 100,90 Q105,50 100,10',
                ]}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}

            {/* Ripples at bottom */}
            {isWashing && (
              <>
                <motion.ellipse
                  cx="100" cy="160" rx="20" ry="3"
                  fill="none" stroke="#2d7ab0" strokeWidth="1"
                  animate={{ rx: [10, 40, 10], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.ellipse
                  cx="100" cy="160" rx="15" ry="2"
                  fill="none" stroke="#2d7ab0" strokeWidth="1"
                  animate={{ rx: [5, 30, 5], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </svg>

          {/* Animated droplets */}
          <AnimatePresence>
            {droplets.map(drop => (
              <motion.div
                key={drop.id}
                initial={{ y: 0, x: `${drop.x}%`, opacity: 0.9, scale: 1 }}
                animate={{ y: 200, opacity: 0, scale: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: drop.duration, delay: drop.delay, ease: 'easeIn' }}
                className="absolute top-8"
                style={{ left: `${drop.x}%` }}
              >
                <div
                  className="rounded-full bg-sea-light/60"
                  style={{ width: drop.size, height: drop.size * 1.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!washComplete ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => setIsWashing(true)}
            disabled={isWashing}
            className="mt-4 px-8 py-3 rounded-full bg-sea/30 border border-sea-light/40 text-sea-light font-display tracking-wider hover:bg-sea/50 transition-colors disabled:opacity-50"
          >
            {isWashing ? 'Washing...' : 'Wash Hands'}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-sea-light text-lg mb-2">Hands purified</p>
            <p className="text-parchment/50 text-sm">No blessing is recited for this washing</p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: washComplete ? 1 : 0.4, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <SectionText
          instructions={section.instruction}
          body={section.content.join('\n\n')}
        />
      </motion.div>
    </motion.div>
  );
}
