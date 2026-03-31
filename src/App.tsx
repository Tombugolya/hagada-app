import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from './components/Starfield';
import TopBar from './components/Layout/TopBar';
import SederStep from './components/SederStep';
import { sederSteps } from './content/haggadah';
import { NarrationProvider, useNarrationContext } from './hooks/NarrationContext';

// Section imports
import Kadesh from './sections/Kadesh';
import Urchatz from './sections/Urchatz';
import Karpas from './sections/Karpas';
import Yachatz from './sections/Yachatz';
import Maggid from './sections/Maggid';
import Rachtzah from './sections/Rachtzah';
import Motzi from './sections/Motzi';
import Matzah from './sections/Matzah';
import Maror from './sections/Maror';
import Korech from './sections/Korech';
import ShulchanOrech from './sections/ShulchanOrech';
import Tzafun from './sections/Tzafun';
import Barech from './sections/Barech';
import Hallel from './sections/Hallel';
import Nirtzah from './sections/Nirtzah';

const sectionComponents: Record<string, React.ComponentType> = {
  kadesh: Kadesh,
  urchatz: Urchatz,
  karpas: Karpas,
  yachatz: Yachatz,
  maggid: Maggid,
  rachtzah: Rachtzah,
  motzi: Motzi,
  matzah: Matzah,
  maror: Maror,
  korech: Korech,
  'shulchan-orech': ShulchanOrech,
  tzafun: Tzafun,
  barech: Barech,
  hallel: Hallel,
  nirtzah: Nirtzah,
};

const TOTAL_PAGES = sederSteps.length + 2;

const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 60 : -60,
  }),
  center: { opacity: 1, y: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -60 : 60,
  }),
};

function PageNav({
  page,
  setPage,
}: {
  page: number;
  setPage: (p: number, dir: number) => void;
}) {
  const isHero = page === 0;
  const stepIndex = page - 1;
  const step = sederSteps[stepIndex];

  const progress = page / (TOTAL_PAGES - 1);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-midnight/90 backdrop-blur-md border-t border-gold/10 safe-bottom">
      {/* Thin progress bar at the very top of the nav */}
      <div className="h-0.5 bg-white/5">
        <motion.div
          className="h-full bg-gold/60"
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: 'spring', damping: 20 }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
        {/* Back button */}
        <button
          onClick={() => setPage(page - 1, -1)}
          disabled={page === 0}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm transition-all min-w-[3rem] justify-center ${
            page === 0
              ? 'opacity-0 pointer-events-none'
              : 'bg-white/5 text-parchment/70 active:bg-white/15 hover:bg-white/10 hover:text-gold border border-white/10'
          }`}
        >
          <span>←</span>
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Center: mobile = step name + counter, desktop = dots */}
        <div className="flex-1 mx-3">
          {/* Mobile: clean text indicator */}
          <div className="sm:hidden text-center">
            {step ? (
              <div>
                <p className="text-gold text-sm font-display tracking-wide">{step.transliteration}</p>
                <p className="text-parchment/30 text-[10px]">{step.number} of 15</p>
              </div>
            ) : page === 0 ? (
              <p className="text-parchment/40 text-xs">Haggadah</p>
            ) : (
              <p className="text-gold text-sm font-display">Chag Sameach</p>
            )}
          </div>

          {/* Desktop: dot indicators */}
          <div className="hidden sm:flex items-center justify-center gap-1">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i, i > page ? 1 : -1)}
                className={`transition-all rounded-full shrink-0 ${
                  i === page
                    ? 'w-6 h-2 bg-gold'
                    : 'w-2 h-2 bg-white/15 hover:bg-white/30'
                }`}
                title={i === 0 ? 'Home' : i <= sederSteps.length ? sederSteps[i - 1].transliteration : 'End'}
              />
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={() => setPage(page + 1, 1)}
          disabled={page === TOTAL_PAGES - 1}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm transition-all min-w-[3rem] justify-center ${
            page === TOTAL_PAGES - 1
              ? 'opacity-0 pointer-events-none'
              : 'bg-gold/20 text-gold active:bg-gold/40 hover:bg-gold/30 border border-gold/30 font-medium'
          }`}
        >
          <span className="hidden sm:inline">
            {isHero ? 'Begin' : 'Next'}
          </span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const narration = useNarrationContext();
  const [page, setPageRaw] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const setPage = useCallback((p: number, dir: number) => {
    if (p < 0 || p >= TOTAL_PAGES) return;
    narration.stop();
    setDirection(dir);
    setPageRaw(p);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [narration]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setPage(page + 1, 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setPage(page - 1, -1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [page, setPage]);

  // Touch swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Only trigger on horizontal swipes (not vertical scrolling)
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) setPage(page + 1, 1);   // swipe left = next
      else setPage(page - 1, -1);           // swipe right = back
    }
  }, [page, setPage]);

  const stepIndex = page - 1;
  const step = sederSteps[stepIndex];
  const SectionComponent = step ? sectionComponents[step.id] : null;

  return (
    <div
      className="relative h-dvh overflow-hidden flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Starfield />
      <TopBar narration={narration} />

      {/* Page content area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden mt-14 -webkit-overflow-scrolling-touch">

      <AnimatePresence mode="wait" custom={direction}>
        {page === 0 && (
          <motion.section
            key="hero"
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 min-h-full flex flex-col items-center justify-center text-center px-4 pb-16"
          >
            <div className="mb-4 sm:mb-6 text-5xl sm:text-7xl">🕎</div>
            <h1 className="font-hebrew text-4xl sm:text-5xl md:text-7xl text-gold mb-3 sm:mb-4 leading-tight">
              הַגָּדָה שֶׁל פֶּסַח
            </h1>
            <p className="font-display text-lg sm:text-2xl md:text-3xl text-parchment tracking-[0.15em] sm:tracking-[0.2em] mb-2">
              HAGGADAH SHEL PESACH
            </p>
            <p className="text-parchment/60 text-sm sm:text-lg max-w-lg px-4">
              The telling of the story of our Exodus from Egypt — an interactive journey through the Passover Seder
            </p>
            <div className="mt-6 sm:mt-8 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <motion.button
              onClick={() => setPage(1, 1)}
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 rounded-full bg-gold/20 text-gold border border-gold/30 active:bg-gold/40 hover:bg-gold/30 font-display text-sm sm:text-base tracking-wider transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BEGIN THE SEDER →
            </motion.button>
          </motion.section>
        )}

        {step && SectionComponent && (
          <motion.div
            key={step.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <SederStep
              id={step.id}
              number={step.number}
              hebrew={step.hebrew}
              transliteration={step.transliteration}
              english={step.english}
              icon={step.icon}
              gradient={step.colorTheme.gradient}
            >
              <SectionComponent />
            </SederStep>
          </motion.div>
        )}

        {page === TOTAL_PAGES - 1 && (
          <motion.footer
            key="footer"
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 min-h-full flex flex-col items-center justify-center text-center px-4 pb-16"
          >
            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">✨</div>
            <p className="text-gold font-hebrew text-4xl sm:text-5xl mb-3 sm:mb-4">חַג שָׂמֵחַ</p>
            <p className="font-display text-xl sm:text-2xl text-parchment tracking-wider mb-2">Chag Sameach</p>
            <p className="text-parchment/60 text-base sm:text-lg">Happy Passover!</p>
            <div className="mt-4 sm:mt-6 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="text-parchment/30 text-xs sm:text-sm mt-6 sm:mt-8">
              An interactive Haggadah experience
            </p>
            <button
              onClick={() => setPage(0, -1)}
              className="mt-4 sm:mt-6 px-5 sm:px-6 py-2 rounded-full bg-white/5 text-parchment/50 active:text-gold hover:text-gold border border-white/10 text-sm transition-all"
            >
              ← Return to beginning
            </button>
          </motion.footer>
        )}
      </AnimatePresence>
      </div>

      <PageNav page={page} setPage={setPage} />
    </div>
  );
}

export default function App() {
  return (
    <NarrationProvider>
      <AppContent />
    </NarrationProvider>
  );
}
