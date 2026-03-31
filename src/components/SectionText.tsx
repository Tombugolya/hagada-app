import { motion } from 'framer-motion';
import { useNarrationContext } from '../hooks/NarrationContext';

interface SectionTextProps {
  blessing?: string;
  blessingHebrew?: string;
  blessingEnglish?: string;
  instructions?: string;
  body: string;
  commentary?: string;
  className?: string;
}

export default function SectionText({
  blessing,
  blessingHebrew,
  blessingEnglish,
  instructions,
  body,
  commentary,
  className = '',
}: SectionTextProps) {
  const narration = useNarrationContext();

  const readableText = [
    instructions,
    blessingEnglish,
    body,
    commentary ? `Commentary: ${commentary}` : undefined,
  ].filter(Boolean).join('. ');

  const handleNarration = () => {
    if (narration.isPlaying) {
      narration.stop();
    } else {
      narration.speak(readableText);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto space-y-4 sm:space-y-6 ${className}`}>
      {/* Read Aloud / Stop button */}
      {readableText.trim() && (
        <div className="flex justify-end">
          <motion.button
            onClick={handleNarration}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-colors ${
              narration.isPlaying
                ? 'bg-gold text-midnight font-medium'
                : 'bg-white/10 text-parchment/70 active:bg-white/20 hover:bg-white/15 hover:text-gold'
            }`}
          >
            <span>{narration.isPlaying ? '⏹' : '🔊'}</span>
            <span>{narration.isPlaying ? 'Stop' : 'Read Aloud'}</span>
          </motion.button>
        </div>
      )}

      {instructions && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold/80 italic text-base sm:text-lg border-l-2 border-gold/30 pl-3 sm:pl-4"
        >
          {instructions}
        </motion.div>
      )}

      {blessingHebrew && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="hebrew-text text-lg sm:text-2xl text-gold-light leading-relaxed py-3 sm:py-4 px-4 sm:px-6 rounded-lg bg-white/5 border border-gold/20"
        >
          {blessingHebrew}
        </motion.div>
      )}

      {blessing && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-parchment/70 italic text-sm sm:text-base"
        >
          {blessing}
        </motion.p>
      )}

      {blessingEnglish && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-parchment text-base sm:text-lg font-medium"
        >
          {blessingEnglish}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-parchment/90 text-base sm:text-xl leading-relaxed whitespace-pre-line font-serif"
      >
        {body}
      </motion.div>

      {commentary && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-4 sm:mt-6 p-3 sm:p-5 rounded-xl bg-gold/5 border border-gold/15 text-parchment/70 text-sm sm:text-base leading-relaxed"
        >
          <span className="text-gold font-display text-xs sm:text-sm tracking-wider uppercase block mb-1 sm:mb-2">Commentary</span>
          {commentary}
        </motion.div>
      )}
    </div>
  );
}
