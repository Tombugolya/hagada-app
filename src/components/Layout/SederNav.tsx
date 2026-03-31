import { motion } from 'framer-motion';
import type { SederStep } from '../../content/haggadah';

interface SederNavProps {
  steps: SederStep[];
  activeSection: string;
}

export default function SederNav({ steps, activeSection }: SederNavProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-1">
      {steps.map((step, i) => {
        const isActive = activeSection === step.id;
        return (
          <motion.button
            key={step.id}
            onClick={() => scrollTo(step.id)}
            className="group flex items-center gap-2 py-0.5"
            whileHover={{ x: -4 }}
          >
            {/* Label - shows on hover or when active */}
            <span
              className={`text-xs font-display tracking-wide transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'opacity-100 text-gold'
                  : 'opacity-0 group-hover:opacity-100 text-parchment/60'
              }`}
            >
              {step.transliteration}
            </span>

            {/* Dot */}
            <div className="relative">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gold scale-125 shadow-[0_0_8px_rgba(212,175,55,0.5)]'
                    : 'bg-parchment/20 group-hover:bg-parchment/40'
                }`}
              />
              {isActive && (
                <motion.div
                  layoutId="navRing"
                  className="absolute -inset-1 rounded-full border border-gold/40"
                />
              )}
            </div>

            {/* Step number */}
            <span
              className={`text-[10px] w-4 text-right transition-colors ${
                isActive ? 'text-gold' : 'text-parchment/30'
              }`}
            >
              {i + 1}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
