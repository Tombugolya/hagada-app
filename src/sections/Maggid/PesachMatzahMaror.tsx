import { motion } from 'framer-motion';
import { haggadahText } from '../../content/haggadah';

const symbols = [
  { name: 'Pesach', hebrew: 'פֶּסַח', icon: '🦴', description: 'The Passover Offering' },
  { name: 'Matzah', hebrew: 'מַצָּה', icon: '🫓', description: 'Unleavened Bread' },
  { name: 'Maror', hebrew: 'מָרוֹר', icon: '🥬', description: 'Bitter Herbs' },
];

export default function PesachMatzahMaror() {
  const section = haggadahText['pesach-matzah-maror'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <h3 className="font-display text-2xl text-gold text-center mb-2">{section.title}</h3>
      <p className="hebrew-text text-center text-gold-light/80 text-xl mb-8">{section.hebrewTitle}</p>

      {/* Three symbols */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {symbols.map((sym, i) => (
          <motion.div
            key={sym.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 rounded-2xl bg-white/5 border border-gold/15"
          >
            <motion.div
              className="text-5xl mb-3"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {sym.icon}
            </motion.div>
            <p className="font-display text-gold text-lg">{sym.name}</p>
            <p className="hebrew-text text-gold-light/60 text-base">{sym.hebrew}</p>
            <p className="text-parchment/50 text-xs mt-1">{sym.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Explanations */}
      <div className="space-y-4">
        {section.content.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`text-lg leading-relaxed ${
              i === 0 ? 'text-gold italic' : 'text-parchment/85'
            }`}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
