import { motion } from 'framer-motion';

interface NarrationButtonProps {
  text: string;
  narration: {
    isPlaying: boolean;
    speak: (text: string) => void;
    stop: () => void;
  };
}

export default function NarrationButton({ text, narration }: NarrationButtonProps) {
  const handleClick = () => {
    if (narration.isPlaying) {
      narration.stop();
    } else {
      narration.speak(text);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
        narration.isPlaying
          ? 'bg-gold text-midnight'
          : 'bg-white/10 text-parchment/70 hover:bg-white/15 hover:text-gold'
      }`}
      title={narration.isPlaying ? 'Stop narration' : 'Read this section aloud'}
    >
      <span>{narration.isPlaying ? '⏹' : '🔊'}</span>
      <span>{narration.isPlaying ? 'Stop' : 'Read Aloud'}</span>
    </motion.button>
  );
}
