import { motion } from 'framer-motion';
import { useNarrationContext } from '../hooks/NarrationContext';
import { useLanguage } from '../hooks/LanguageContext';
import { t } from '../content/translations';

interface SectionTextProps {
  blessing?: string;
  blessingHebrew?: string;
  blessingEnglish?: string;
  instructions?: string;
  instructionsHe?: string;
  body: string;
  bodyHe?: string;
  commentary?: string;
  commentaryHe?: string;
  className?: string;
}

export default function SectionText({
  blessing,
  blessingHebrew,
  blessingEnglish,
  instructions,
  instructionsHe,
  body,
  bodyHe,
  commentary,
  commentaryHe,
  className = '',
}: SectionTextProps) {
  const narration = useNarrationContext();
  const { isHebrew } = useLanguage();

  const displayInstructions = isHebrew ? (instructionsHe || instructions) : instructions;
  const displayBody = isHebrew ? (bodyHe || body) : body;
  const displayCommentary = isHebrew ? (commentaryHe || commentary) : commentary;

  const readableText = [
    displayInstructions,
    isHebrew ? undefined : blessingEnglish,
    displayBody,
    displayCommentary ? `${t('section.commentary')}: ${displayCommentary}` : undefined,
  ].filter(Boolean).join('. ');

  const handleNarration = () => {
    if (narration.isPlaying) {
      narration.stop();
    } else {
      narration.speak(readableText);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto space-y-5 ${className}`}>
      {readableText.trim() && (
        <div className={`flex ${isHebrew ? 'justify-start' : 'justify-end'}`}>
          <motion.button
            onClick={handleNarration}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
              narration.isPlaying
                ? 'bg-gold text-midnight font-medium'
                : 'bg-white/10 text-parchment/70 active:bg-white/20'
            }`}
          >
            <span>{narration.isPlaying ? '⏹' : '🔊'}</span>
            <span>{narration.isPlaying ? t('section.stop') : t('section.readAloud')}</span>
          </motion.button>
        </div>
      )}

      {displayInstructions && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-gold/80 italic text-lg ${isHebrew ? 'border-r-2 border-gold/30 pr-4' : 'border-l-2 border-gold/30 pl-4'}`}
        >
          {displayInstructions}
        </motion.div>
      )}

      {blessingHebrew && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="hebrew-text text-xl md:text-2xl text-gold-light leading-relaxed py-3 px-4 sm:px-6 rounded-lg bg-white/5 border border-gold/20"
        >
          {blessingHebrew}
        </motion.div>
      )}

      {!isHebrew && blessing && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-parchment/70 italic text-base"
        >
          {blessing}
        </motion.p>
      )}

      {!isHebrew && blessingEnglish && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-parchment text-lg font-medium"
        >
          {blessingEnglish}
        </motion.p>
      )}

      {displayBody && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`text-parchment/90 text-lg md:text-xl leading-relaxed whitespace-pre-line ${isHebrew ? 'font-hebrew' : 'font-serif'}`}
        >
          {displayBody}
        </motion.div>
      )}

      {displayCommentary && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-5 p-4 rounded-xl bg-gold/5 border border-gold/15 text-parchment/70 text-base leading-relaxed"
        >
          <span className="text-gold font-display text-sm tracking-wider uppercase block mb-1">{t('section.commentary')}</span>
          {displayCommentary}
        </motion.div>
      )}
    </div>
  );
}
