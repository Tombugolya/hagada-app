import { motion } from 'framer-motion';
import { haggadahText } from '../../content/haggadah';
import SectionImage from '../../components/SectionImage';
import { useLanguage } from '../../hooks/LanguageContext';
import { t } from '../../content/translations';

export default function HaLachmaAnya() {
  const section = haggadahText['ha-lachma-anya'];
  const { isHebrew } = useLanguage();

  const displayContent = isHebrew ? (section.contentHe || section.content) : section.content;
  const displayInstruction = isHebrew ? (section.instructionHe || section.instruction) : section.instruction;
  const displayCommentary = isHebrew ? (section.commentaryHe || section.commentary) : section.commentary;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <h3 className="font-display text-2xl text-gold text-center mb-2">{isHebrew ? section.hebrewTitle : section.title}</h3>
      {!isHebrew && <p className="hebrew-text text-center text-gold-light/80 text-xl mb-8">{section.hebrewTitle}</p>}

      <SectionImage src="/images/generated/maggid-opening.png" alt="The story of the Exodus" />

      {displayInstruction && (
        <p className={`text-gold/60 italic text-base mb-6 ${isHebrew ? 'border-r-2 border-gold/20 pr-4' : 'border-l-2 border-gold/20 pl-4'}`}>
          {displayInstruction}
        </p>
      )}

      {/* Liturgical Hebrew + translated content */}
      <div className="space-y-6">
        {displayContent.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-5 rounded-xl bg-white/5 border border-gold/10"
          >
            {section.hebrewContent?.[i] && (
              <p className="hebrew-text text-gold-light text-xl mb-3">{section.hebrewContent[i]}</p>
            )}
            <p className={`text-parchment text-lg ${isHebrew ? 'font-hebrew' : ''}`}>{line}</p>
          </motion.div>
        ))}
      </div>

      {displayCommentary && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-parchment/50 text-base p-4 rounded-lg bg-gold/5 border border-gold/10"
        >
          <span className="text-gold font-display text-sm tracking-wider block mb-1">{t('section.commentary')}</span>
          {displayCommentary}
        </motion.p>
      )}
    </motion.div>
  );
}
