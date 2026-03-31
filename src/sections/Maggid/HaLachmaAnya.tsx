import { motion } from 'framer-motion';
import { haggadahText } from '../../content/haggadah';
import SectionImage from '../../components/SectionImage';

export default function HaLachmaAnya() {
  const section = haggadahText['ha-lachma-anya'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <h3 className="font-display text-2xl text-gold text-center mb-2">{section.title}</h3>
      <p className="hebrew-text text-center text-gold-light/80 text-xl mb-8">{section.hebrewTitle}</p>

      <SectionImage src="/images/generated/maggid-opening.png" alt="The story of the Exodus" />

      {section.instruction && (
        <p className="text-gold/60 italic text-base mb-6 border-l-2 border-gold/20 pl-4">{section.instruction}</p>
      )}

      {/* Hebrew and English side by side */}
      <div className="space-y-6">
        {section.content.map((line, i) => (
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
            <p className="text-parchment text-lg">{line}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-parchment/50 text-base p-4 rounded-lg bg-gold/5 border border-gold/10"
      >
        <span className="text-gold font-display text-sm tracking-wider block mb-1">COMMENTARY</span>
        {section.commentary || 'We begin the story by inviting all who are hungry to join us — a powerful reminder that freedom is not complete while others suffer.'}
      </motion.p>
    </motion.div>
  );
}
