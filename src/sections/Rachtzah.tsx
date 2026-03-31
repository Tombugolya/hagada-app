import { motion } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';
import { sectionTextProps } from '../content/sectionHelper';

export default function Rachtzah() {
  const section = haggadahText['rachtzah'];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Animated water drops */}
        <div className="flex gap-4">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="text-4xl"
              animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            >
              💧
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionText {...sectionTextProps(section)} />
    </div>
  );
}
