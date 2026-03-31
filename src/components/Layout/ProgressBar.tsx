import { motion, useScroll, useSpring } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 h-0.5 bg-gold/80 origin-left z-50"
      style={{ scaleX }}
    />
  );
}
