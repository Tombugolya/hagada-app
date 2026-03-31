import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import { t } from '../content/translations';
import { useLanguage } from '../hooks/LanguageContext';
import { useSoundEffect } from '../hooks/useSoundEffect';

const HIDING_SPOTS = [
  { id: 'cushion', label: 'Under the cushion', labelHe: 'מתחת לכרית', x: 10, y: 60, w: 25, h: 20, emoji: '🛋️' },
  { id: 'bookshelf', label: 'Behind the books', labelHe: 'מאחורי הספרים', x: 70, y: 10, w: 25, h: 25, emoji: '📚' },
  { id: 'plant', label: 'Behind the plant', labelHe: 'מאחורי הצמח', x: 5, y: 10, w: 20, h: 30, emoji: '🪴' },
  { id: 'table', label: 'Under the table', labelHe: 'מתחת לשולחן', x: 35, y: 45, w: 30, h: 25, emoji: '🍽️' },
  { id: 'curtain', label: 'Behind the curtain', labelHe: 'מאחורי הווילון', x: 75, y: 40, w: 20, h: 35, emoji: '🪟' },
  { id: 'cabinet', label: 'In the cabinet', labelHe: 'בתוך הארון', x: 40, y: 5, w: 25, h: 20, emoji: '🗄️' },
  { id: 'rug', label: 'Under the rug', labelHe: 'מתחת לשטיח', x: 30, y: 75, w: 30, h: 15, emoji: '🟫' },
  { id: 'chair', label: 'Behind the chair', labelHe: 'מאחורי הכיסא', x: 65, y: 60, w: 20, h: 25, emoji: '🪑' },
];

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export default function Tzafun() {
  const section = haggadahText['tzafun'];
  const { isHebrew } = useLanguage();
  const [hiddenSpot, setHiddenSpot] = useState(() =>
    HIDING_SPOTS[Math.floor(Math.random() * HIDING_SPOTS.length)].id
  );
  const [searched, setSearched] = useState<Set<string>>(new Set());
  const [found, setFound] = useState(false);
  const [hint, setHint] = useState('');
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [confetti, setConfetti] = useState<Array<{ x: number; y: number; color: string }>>([]);
  const { play } = useSoundEffect();

  useEffect(() => {
    if (found) return;
    const timer = setInterval(() => setElapsed(Date.now() - startTime), 100);
    return () => clearInterval(timer);
  }, [found, startTime]);

  const handleSearch = useCallback((spotId: string) => {
    if (found || searched.has(spotId)) return;

    const newSearched = new Set([...searched, spotId]);
    setSearched(newSearched);

    if (spotId === hiddenSpot) {
      play('success');
      setFound(true);
      setHint('');
      // Generate confetti
      setConfetti(
        Array.from({ length: 30 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: ['#D4AF37', '#F0D060', '#722F37', '#9B4449', '#f5f0e8'][Math.floor(Math.random() * 5)],
        }))
      );
    } else {
      play('pop');
      const target = HIDING_SPOTS.find(s => s.id === hiddenSpot)!;
      const clicked = HIDING_SPOTS.find(s => s.id === spotId)!;
      const dist = getDistance(
        target.x + target.w / 2, target.y + target.h / 2,
        clicked.x + clicked.w / 2, clicked.y + clicked.h / 2
      );

      if (dist < 30) setHint(t('tzafun.warmer'));
      else if (dist < 50) setHint(t('tzafun.warm'));
      else setHint(t('tzafun.cold'));
    }
  }, [found, searched, hiddenSpot, play]);

  const reset = () => {
    setHiddenSpot(HIDING_SPOTS[Math.floor(Math.random() * HIDING_SPOTS.length)].id);
    setSearched(new Set());
    setFound(false);
    setHint('');
    setConfetti([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-parchment/40 text-xs mb-4">
          {!found && (isHebrew
            ? `${(elapsed / 1000).toFixed(1)} :זמן | ${searched.size}/${HIDING_SPOTS.length} :חיפושים`
            : `Time: ${(elapsed / 1000).toFixed(1)}s | Searched: ${searched.size}/${HIDING_SPOTS.length}`)}
        </p>
      </div>

      {/* The room scene */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-xl sm:rounded-2xl bg-gradient-to-b from-royal-light/40 to-midnight border border-gold/15 overflow-hidden mb-4 sm:mb-6">
        {/* Room elements */}
        {HIDING_SPOTS.map(spot => {
          const isSearched = searched.has(spot.id);
          const isFound = found && spot.id === hiddenSpot;

          return (
            <motion.button
              key={spot.id}
              onClick={() => handleSearch(spot.id)}
              disabled={found || isSearched}
              className={`absolute flex flex-col items-center justify-center rounded-lg sm:rounded-xl transition-all cursor-pointer ${
                isFound
                  ? 'bg-gold/30 border-2 border-gold ring-4 ring-gold/20'
                  : isSearched
                  ? 'bg-white/5 border border-white/5 opacity-40'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30'
              }`}
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: `${spot.w}%`,
                height: `${spot.h}%`,
              }}
              whileHover={!found && !isSearched ? { scale: 1.05 } : {}}
              whileTap={!found && !isSearched ? { scale: 0.95 } : {}}
            >
              <span className="text-xl sm:text-2xl md:text-3xl">{spot.emoji}</span>
              <span className="text-[8px] sm:text-[10px] md:text-xs text-parchment/40 mt-0.5 leading-tight text-center">{isHebrew ? spot.labelHe : spot.label}</span>
              {isFound && <span className="text-xl mt-1">🫓</span>}
            </motion.button>
          );
        })}

        {/* Confetti */}
        <AnimatePresence>
          {confetti.map((c, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ left: `${c.x}%`, top: `${c.y}%`, backgroundColor: c.color }}
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: [0, 1.5, 0], y: [0, -30, 60], opacity: [1, 1, 0] }}
              transition={{ duration: 1.5, delay: i * 0.03 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Hint text */}
      <AnimatePresence mode="wait">
        {hint && !found && (
          <motion.p
            key={hint}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-lg mb-4"
          >
            {hint}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Found state */}
      {found && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 rounded-xl bg-gradient-to-b from-gold/10 to-transparent border border-gold/20 mb-6"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h4 className="font-display text-2xl text-gold mb-1">{t('tzafun.found')}</h4>
          <p className="text-parchment/70 mb-4">
            {isHebrew
              ? `נמצא תוך ${(elapsed / 1000).toFixed(1)} שניות עם ${searched.size} חיפושים`
              : `Found in ${(elapsed / 1000).toFixed(1)} seconds with ${searched.size} searches`}
          </p>
          <button
            onClick={reset}
            className="px-6 py-2 rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-colors font-display text-sm tracking-wider"
          >
            {t('tzafun.playAgain')}
          </button>
        </motion.div>
      )}

      <div className="mt-4">
        <div className="space-y-3">
          {(isHebrew ? (section.contentHe || section.content) : section.content).map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`text-parchment/80 text-lg leading-relaxed ${isHebrew ? 'font-hebrew' : ''}`}
            >
              {p}
            </motion.p>
          ))}
        </div>
        {(isHebrew ? (section.commentaryHe || section.commentary) : section.commentary) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 p-5 rounded-xl bg-gold/5 border border-gold/10 text-parchment/60 text-base"
          >
            <span className="text-gold font-display text-sm tracking-wider block mb-1">{t('section.commentary')}</span>
            {isHebrew ? (section.commentaryHe || section.commentary) : section.commentary}
          </motion.div>
        )}
      </div>
    </div>
  );
}
