import { motion } from 'framer-motion';
import { haggadahText } from '../../content/haggadah';
import SectionText from '../../components/SectionText';
import WineCup from '../../components/WineCup';

export default function SecondCup() {
  const section = haggadahText['second-cup'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <h3 className="font-display text-2xl text-gold text-center mb-2">{section.title}</h3>
      <p className="hebrew-text text-center text-gold-light/80 text-xl mb-8">{section.hebrewTitle}</p>

      <div className="flex justify-center mb-8">
        <WineCup size={100} fillPercent={100} />
      </div>

      {section.hebrewContent && (
        <div className="p-5 rounded-xl bg-white/5 border border-gold/15 mb-6 text-center">
          <p className="hebrew-text text-gold-light text-xl">{section.hebrewContent[0]}</p>
        </div>
      )}

      <SectionText
        instructions={section.instruction}
        blessingHebrew={section.blessingHebrew}
        blessing={section.blessing}
        blessingEnglish={section.blessingEnglish}
        body={section.content.join('\n\n')}
      />
    </motion.div>
  );
}
