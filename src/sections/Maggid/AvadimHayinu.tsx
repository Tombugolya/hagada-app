import { motion } from 'framer-motion';
import { haggadahText } from '../../content/haggadah';
import SectionImage from '../../components/SectionImage';
import { useLanguage } from '../../hooks/LanguageContext';
import { t } from '../../content/translations';

export default function AvadimHayinu() {
  const section = haggadahText['avadim-hayinu'];
  const { isHebrew } = useLanguage();

  const displayContent = isHebrew ? (section.contentHe || section.content) : section.content;
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

      <SectionImage src="/images/generated/slavery.png" alt="Israelites in slavery" />

      {/* Liturgical Hebrew — shown in both modes */}
      {section.hebrewContent && (
        <div className="space-y-4 mb-8">
          {section.hebrewContent.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="hebrew-text text-gold-light/90 text-xl p-4 rounded-lg bg-white/5 border border-gold/10"
            >
              {line}
            </motion.p>
          ))}
        </div>
      )}

      {/* Translated narrative */}
      <div className="space-y-4">
        {displayContent.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className={`text-parchment/90 text-lg leading-relaxed ${isHebrew ? 'font-hebrew' : ''}`}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {displayCommentary && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-5 rounded-xl bg-gold/5 border border-gold/10 text-parchment/60 text-base"
        >
          <span className="text-gold font-display text-sm tracking-wider block mb-1">{t('section.commentary')}</span>
          {displayCommentary}
        </motion.div>
      )}
    </motion.div>
  );
}
