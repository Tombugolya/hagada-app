import { motion } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';

const foods = ['🥚', '🍖', '🥗', '🍲', '🥘', '🍷'];

export default function ShulchanOrech() {
  const section = haggadahText['shulchan-orech'];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Festive food animation */}
      <motion.div
        className="flex justify-center gap-4 mb-10 flex-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {foods.map((food, i) => (
          <motion.div
            key={i}
            className="text-4xl"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.3, rotate: 10 }}
          >
            {food}
          </motion.div>
        ))}
      </motion.div>

      <SectionText
        instructions={section.instruction}
        body={section.content.join('\n\n')}
        commentary={section.commentary}
      />
    </div>
  );
}
