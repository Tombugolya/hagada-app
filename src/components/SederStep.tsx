import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SederStepProps {
  id: string;
  number: number;
  hebrew: string;
  transliteration: string;
  english: string;
  icon: string;
  gradient: string;
  children: ReactNode;
}

export default function SederStep({
  id,
  number,
  hebrew,
  transliteration,
  english,
  icon,
  gradient,
  children,
}: SederStepProps) {
  return (
    <section
      id={id}
      className={`relative pt-10 sm:pt-16 pb-24 px-3 sm:px-6 md:px-8 ${gradient}`}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Step header - responsive */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="text-2xl sm:text-3xl mb-1">{icon}</div>
          <div className="text-gold/50 font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-1">
            Step {number} of 15
          </div>
          <h2 className="font-hebrew text-2xl sm:text-3xl md:text-4xl text-gold mb-0.5 sm:mb-1 leading-tight">
            {hebrew}
          </h2>
          <p className="font-display text-base sm:text-lg md:text-xl text-parchment tracking-wide">
            {transliteration}
          </p>
          <p className="text-parchment/60 text-xs sm:text-sm mt-0.5">{english}</p>
          <div className="mt-2 w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </motion.div>

        {/* Step content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
