import { motion } from 'framer-motion';

interface SectionImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SectionImage({ src, alt, className = '' }: SectionImageProps) {
  // Prepend Vite base URL so images work on GitHub Pages (served from /hagada-app/)
  const fullSrc = src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`my-3 sm:my-6 flex justify-center ${className}`}
    >
      <img
        src={fullSrc}
        alt={alt}
        loading="lazy"
        className="w-full max-w-xl rounded-lg sm:rounded-xl border border-gold/20 shadow-lg shadow-black/30"
      />
    </motion.div>
  );
}
