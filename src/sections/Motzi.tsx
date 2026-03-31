import { motion } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';

export default function Motzi() {
  const section = haggadahText['motzi'];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {/* Three matzot stack */}
        <div className="relative">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="w-48 h-8 rounded-lg bg-gradient-to-r from-amber-200/60 to-amber-300/40 border border-amber-400/30 mb-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, rgba(139,69,19,0.3) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }} />
              {i === 1 && (
                <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-amber-600/40" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionText
        instructions={section.instruction}
        blessingHebrew={section.blessingHebrew}
        blessing={section.blessing}
        blessingEnglish={section.blessingEnglish}
        body={section.content.join('\n\n')}
      />
    </div>
  );
}
