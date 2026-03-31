import { motion } from 'framer-motion';
import { haggadahText } from '../content/haggadah';
import SectionText from '../components/SectionText';
import { sectionTextProps } from '../content/sectionHelper';

export default function Matzah() {
  const section = haggadahText['matzah'];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        className="flex justify-center mb-8 text-6xl"
        initial={{ opacity: 0, rotate: -10 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring' }}
      >
        🫓
      </motion.div>

      <SectionText {...sectionTextProps(section)} />
    </div>
  );
}
