import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { plagues, haggadahText } from '../../content/haggadah';

// ─── PLAGUE-SPECIFIC SOUND EFFECTS ──────────────────────────────

function getAudioCtx(): AudioContext {
  if (!(window as any).__plagueAudioCtx) {
    (window as any).__plagueAudioCtx = new AudioContext();
  }
  return (window as any).__plagueAudioCtx;
}

function playPlagueSound(effect: string) {
  const ctx = getAudioCtx();
  const now = ctx.currentTime;

  switch (effect) {
    case 'blood': {
      // Thick, wet dripping sound
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300 - i * 40, now + i * 0.2);
        osc.frequency.exponentialRampToValueAtTime(80, now + i * 0.2 + 0.3);
        gain.gain.setValueAtTime(0.25, now + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.3);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * 0.2);
        osc.stop(now + i * 0.2 + 0.35);
      }
      break;
    }
    case 'frogs': {
      // Ribbit-ribbit croaking
      for (let i = 0; i < 5; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        const t = now + i * 0.25;
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.12);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.setValueAtTime(0.06, t + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      }
      break;
    }
    case 'lice': {
      // High-pitched scratchy buzzing
      const buf = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.1 * Math.sin(i * 0.05) * (1 - i / data.length);
      }
      const src = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 4000;
      src.buffer = buf;
      src.connect(filter).connect(ctx.destination);
      src.start(now);
      break;
    }
    case 'beasts': {
      // Low rumbling growl/roar
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(40, now + 1);
      osc2.frequency.setValueAtTime(63, now);
      osc2.frequency.exponentialRampToValueAtTime(125, now + 0.3);
      osc2.frequency.exponentialRampToValueAtTime(42, now + 1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
      osc.connect(gain).connect(ctx.destination);
      osc2.connect(gain);
      osc.start(now);
      osc2.start(now);
      osc.stop(now + 1.2);
      osc2.stop(now + 1.2);
      break;
    }
    case 'pestilence': {
      // Sickly, woozy warble
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 150;
      lfo.type = 'sine';
      lfo.frequency.value = 5;
      lfoGain.gain.value = 30;
      lfo.connect(lfoGain).connect(osc.frequency);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      lfo.start(now);
      osc.stop(now + 2);
      lfo.stop(now + 2);
      break;
    }
    case 'boils': {
      // Bubbling, popping sounds
      for (let i = 0; i < 8; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.12 + Math.random() * 0.05;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200 + Math.random() * 400, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.08);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
      }
      break;
    }
    case 'hail': {
      // Sharp cracking impacts
      for (let i = 0; i < 10; i++) {
        const t = now + i * 0.15 + Math.random() * 0.08;
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let j = 0; j < d.length; j++) {
          d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (d.length * 0.1));
        }
        const src = ctx.createBufferSource();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, t);
        src.buffer = buf;
        src.connect(gain).connect(ctx.destination);
        src.start(t);
      }
      break;
    }
    case 'locusts': {
      // Buzzing swarm — oscillating noise
      const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const t2 = i / ctx.sampleRate;
        const envelope = Math.sin(t2 * Math.PI / 2) * (1 - t2 / 2);
        data[i] = (Math.random() * 2 - 1) * 0.08 * envelope * (1 + Math.sin(t2 * 40));
      }
      const src = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 2;
      src.buffer = buf;
      src.connect(filter).connect(ctx.destination);
      src.start(now);
      break;
    }
    case 'darkness': {
      // Deep ominous drone
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc2.type = 'sine';
      osc.frequency.value = 55;
      osc2.frequency.value = 58; // slight detuning for eeriness
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.8);
      gain.gain.setValueAtTime(0.2, now + 2);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 3);
      osc.connect(gain).connect(ctx.destination);
      osc2.connect(gain);
      osc.start(now);
      osc2.start(now);
      osc.stop(now + 3.2);
      osc2.stop(now + 3.2);
      break;
    }
    case 'firstborn': {
      // Mournful, solemn descending tones
      const notes = [440, 392, 349, 294, 262];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.6;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.9, t + 0.5);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.15, t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.55);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.6);
      });
      break;
    }
  }
}

// ─── PLAGUE EFFECT COMPONENTS ────────────────────────────────────

function BloodEffect() {
  // Red streaks dripping down the screen
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 rounded-b-full"
          style={{
            left: `${5 + i * 8}%`,
            width: `${8 + Math.random() * 15}px`,
            background: 'linear-gradient(to bottom, #8B0000, #FF0000, rgba(139,0,0,0.3))',
          }}
          initial={{ height: 0, opacity: 0.9 }}
          animate={{ height: `${40 + Math.random() * 50}vh` }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: i * 0.08, ease: 'easeIn' }}
        />
      ))}
      <motion.div
        className="absolute inset-0 bg-red-900/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    </div>
  );
}

function FrogsEffect() {
  // Frogs bouncing across the screen
  const frogs = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: 100 + Math.random() * 20,
    endX: Math.random() * 100,
    endY: Math.random() * 60,
    size: 20 + Math.random() * 25,
    delay: Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {frogs.map(f => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ fontSize: f.size, left: `${f.startX}%`, top: `${f.startY}%` }}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            x: [0, (f.endX - f.startX) * 3, (f.endX - f.startX) * 6],
            y: [0, -(f.startY - f.endY) * 4, -20],
            opacity: [1, 1, 0],
            rotate: [0, -20, 20],
          }}
          transition={{ duration: 2, delay: f.delay, ease: 'easeOut' }}
        >
          🐸
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 bg-green-900/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    </div>
  );
}

function LiceEffect() {
  // Crawling swarm rising from the ground + itchy screen shake
  const bugs = Array.from({ length: 250 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 1,
    duration: 1.5 + Math.random() * 1.5,
    wobble: 15 + Math.random() * 30,
  }));

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {/* Itchy screen shake */}
      <motion.div
        className="fixed inset-0"
        animate={{
          x: [0, -2, 2, -1, 1, -2, 2, 0],
          y: [0, 1, -1, 2, -2, 1, -1, 0],
        }}
        transition={{ duration: 0.3, repeat: 7 }}
      />

      {/* Swarm crawling up from bottom */}
      {bugs.map(bug => (
        <motion.div
          key={bug.id}
          className="absolute rounded-full bg-amber-900"
          style={{
            width: bug.size,
            height: bug.size,
            left: `${bug.x}%`,
            bottom: '-2%',
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -(window.innerHeight * (0.3 + Math.random() * 0.7))],
            x: [0, bug.wobble, -bug.wobble, bug.wobble * 0.5, 0],
            opacity: [0, 0.9, 0.9, 0.7, 0],
          }}
          transition={{
            duration: bug.duration,
            delay: bug.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Additional larger crawlers everywhere */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`crawler-${i}`}
          className="absolute text-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 80],
            y: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 60],
            opacity: [0, 1, 1, 0],
            rotate: [0, Math.random() * 720],
          }}
          transition={{ duration: 2.5, delay: i * 0.06 }}
        >
          🐜
        </motion.div>
      ))}

      {/* Dusty overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 100%, rgba(120,80,20,0.25), transparent 70%)' }}
        animate={{ opacity: [0, 0.8, 0.4, 0.6, 0] }}
        transition={{ duration: 2.5 }}
      />
    </div>
  );
}

function BeastsEffect() {
  // Animal silhouettes charging across
  const animals = ['🦁', '🐻', '🐺', '🐍', '🦂', '🐆', '🦅', '🐗'];
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {animals.map((animal, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            fontSize: 30 + Math.random() * 30,
            top: `${10 + i * 10}%`,
            left: i % 2 === 0 ? '-10%' : '110%',
          }}
          animate={{ x: i % 2 === 0 ? '110vw' : '-110vw' }}
          transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeIn' }}
        >
          {animal}
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 bg-orange-900/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}

function PestilenceEffect() {
  // Sickly green pulse / toxic cloud
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(50,120,50,0.4), rgba(0,0,0,0))' }}
        animate={{ opacity: [0, 0.8, 0.4, 0.8, 0], scale: [0.8, 1.2, 1, 1.1, 0.8] }}
        transition={{ duration: 2.5 }}
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 60 + Math.random() * 80,
            height: 60 + Math.random() * 80,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            background: 'radial-gradient(circle, rgba(80,150,50,0.3), transparent)',
          }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function BoilsEffect() {
  // Red bubbling spots appearing
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            background: 'radial-gradient(circle, #cc3333, #880000)',
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: [0, 10 + Math.random() * 20, 10 + Math.random() * 15],
            height: [0, 10 + Math.random() * 20, 10 + Math.random() * 15],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 2, delay: i * 0.06 }}
        />
      ))}
      <motion.div
        className="absolute inset-0 bg-red-900/10"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2.5 }}
      />
    </div>
  );
}

function HailEffect() {
  // White/blue hailstones falling with fire trails
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        const x = Math.random() * 100;
        const size = 6 + Math.random() * 12;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: '-5%',
              width: size,
              height: size,
              background: 'radial-gradient(circle, white, #88ccff)',
              boxShadow: `0 -${size}px ${size * 2}px rgba(255,100,0,0.4), 0 0 ${size}px rgba(136,204,255,0.6)`,
            }}
            animate={{ y: '110vh', rotate: 360 }}
            transition={{ duration: 0.8 + Math.random() * 0.5, delay: i * 0.05, ease: 'easeIn' }}
          />
        );
      })}
      <motion.div
        className="absolute inset-0 bg-blue-900/10"
        animate={{ opacity: [0, 0.2, 0.1, 0.2, 0] }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}

function LocustsEffect() {
  // Swarm of locusts flying across
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: '-5%',
            top: `${Math.random() * 100}%`,
            fontSize: 12 + Math.random() * 16,
          }}
          animate={{
            x: ['0vw', `${110}vw`],
            y: [0, Math.sin(i) * 50, Math.sin(i + 1) * 30, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            delay: Math.random() * 0.8,
            ease: 'linear',
          }}
        >
          🦗
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 bg-lime-900/10"
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 2.5 }}
      />
    </div>
  );
}

function DarknessEffect() {
  // Total darkness that slowly lifts
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.95, 0.95, 0.7, 0] }}
        transition={{ duration: 3, times: [0, 0.2, 0.6, 0.8, 1] }}
      />
      {/* Faint hint of eyes in the dark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.6, 0.6, 0] }}
        transition={{ duration: 3, times: [0, 0.25, 0.35, 0.65, 0.8] }}
      >
        <p className="text-white/40 font-display text-xl tracking-[0.5em]">DARKNESS</p>
        <p className="text-white/20 text-sm mt-2">Three days of impenetrable night</p>
      </motion.div>
    </div>
  );
}

function FirstbornEffect() {
  // Solemn, ghostly effect — most dramatic
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.6, 0.8, 0] }}
        transition={{ duration: 3.5 }}
      />
      {/* Ghostly light passing over */}
      <motion.div
        className="absolute top-0 h-full w-32"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
        }}
        initial={{ left: '-10%' }}
        animate={{ left: '110%' }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.8, 0.8, 0] }}
        transition={{ duration: 3.5, times: [0, 0.15, 0.3, 0.7, 0.9] }}
      >
        <p className="text-white/30 font-display text-2xl tracking-[0.3em]">מַכַּת בְּכוֹרוֹת</p>
        <p className="text-white/20 text-sm mt-3 font-display tracking-wider">THE FINAL PLAGUE</p>
      </motion.div>
    </div>
  );
}

const EFFECT_COMPONENTS: Record<string, React.ComponentType> = {
  blood: BloodEffect,
  frogs: FrogsEffect,
  lice: LiceEffect,
  beasts: BeastsEffect,
  pestilence: PestilenceEffect,
  boils: BoilsEffect,
  hail: HailEffect,
  locusts: LocustsEffect,
  darkness: DarknessEffect,
  firstborn: FirstbornEffect,
};

const EFFECT_DURATION: Record<string, number> = {
  blood: 2500,
  frogs: 2500,
  lice: 2500,
  beasts: 2000,
  pestilence: 3000,
  boils: 2500,
  hail: 2000,
  locusts: 3000,
  darkness: 3500,
  firstborn: 4000,
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────

export default function TenPlagues() {
  const [activated, setActivated] = useState<Set<number>>(new Set());
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [lastPlague, setLastPlague] = useState<number | null>(null);
  const section = haggadahText['ten-plagues'];

  const wineLevel = 100 - (activated.size * 10);

  // Clean up effect after duration
  useEffect(() => {
    if (!activeEffect) return;
    const duration = EFFECT_DURATION[activeEffect] || 2500;
    const timer = setTimeout(() => setActiveEffect(null), duration);
    return () => clearTimeout(timer);
  }, [activeEffect]);

  const activatePlague = useCallback((index: number) => {
    if (activated.has(index) || activeEffect) return;

    const effect = plagues[index].effect;
    playPlagueSound(effect);
    setActivated(prev => new Set([...prev, index]));
    setLastPlague(index);
    setActiveEffect(effect);
  }, [activated, activeEffect]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto relative"
    >
      {/* Plague effect overlay */}
      <AnimatePresence>
        {activeEffect && EFFECT_COMPONENTS[activeEffect] && (() => {
          const EffectComponent = EFFECT_COMPONENTS[activeEffect];
          return <EffectComponent key={activeEffect} />;
        })()}
      </AnimatePresence>

      <h3 className="font-display text-xl sm:text-2xl text-gold text-center mb-1 sm:mb-2">{section.title}</h3>
      <p className="hebrew-text text-center text-gold-light/80 text-lg sm:text-xl mb-1 sm:mb-2">{section.hebrewTitle}</p>
      <p className="text-center text-parchment/60 text-xs sm:text-sm mb-2 sm:mb-4 max-w-lg mx-auto">{section.instruction}</p>
      <p className="text-center text-parchment/40 text-[10px] sm:text-xs mb-4 sm:mb-8">Tap each plague to remove a drop of wine from your cup</p>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center lg:items-start justify-center">
        {/* Wine glass — horizontal on mobile, vertical on desktop */}
        <div className="flex flex-row lg:flex-col items-center gap-3 shrink-0 lg:sticky lg:top-24">
          <svg viewBox="0 0 120 200" className="w-20 h-36 sm:w-32 sm:h-52">
            <defs>
              <linearGradient id="plague-wine" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#4A1A20" />
                <stop offset="50%" stopColor="#722F37" />
                <stop offset="100%" stopColor="#9B4449" />
              </linearGradient>
              <clipPath id="plague-cup-clip">
                <path d="M20,15 Q18,90 30,125 L40,125 L40,160 L80,160 L80,125 L90,125 Q102,90 100,15 Z" />
              </clipPath>
            </defs>

            {/* Wine fill */}
            <g clipPath="url(#plague-cup-clip)">
              <motion.rect
                x="18"
                width="84"
                fill="url(#plague-wine)"
                animate={{ y: 125 - (wineLevel * 1.1), height: wineLevel * 1.15 + 40 }}
                transition={{ type: 'spring', damping: 15 }}
              />
            </g>

            {/* Glass outline */}
            <path d="M20,15 Q18,90 30,125 L40,125 L40,160 L80,160 L80,125 L90,125 Q102,90 100,15 Z"
              fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" />
            <ellipse cx="60" cy="15" rx="41" ry="7" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4" />
            <ellipse cx="60" cy="160" rx="22" ry="4" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
            <line x1="35" y1="175" x2="85" y2="175" stroke="#D4AF37" strokeWidth="2" opacity="0.4" />
            <ellipse cx="60" cy="175" rx="28" ry="5" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.3" />
          </svg>

          {/* Drop animation */}
          <AnimatePresence>
            {lastPlague !== null && activated.has(lastPlague) && (
              <motion.div
                key={lastPlague}
                initial={{ y: -60, opacity: 1 }}
                animate={{ y: 10, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-wine text-xl"
              >
                💧
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-gold/50 text-sm mt-2">{activated.size}/10 plagues</p>

          {/* Seder plate for drops */}
          <div className="mt-2 flex flex-wrap gap-1 justify-center max-w-[120px]">
            {Array.from(activated).sort().map(i => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 rounded-full bg-wine"
                title={plagues[i].english}
              />
            ))}
          </div>
        </div>

        {/* Plagues list */}
        <div className="flex-1 w-full space-y-2 sm:space-y-3">
          {plagues.map((plague, i) => {
            const isActive = activated.has(i);
            const isAnimating = activeEffect === plague.effect;
            return (
              <motion.button
                key={plague.english}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => activatePlague(i)}
                disabled={isActive || !!activeEffect}
                className={`w-full flex items-center gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-lg sm:rounded-xl border transition-all text-left ${
                  isAnimating
                    ? 'bg-wine/40 border-wine/60 ring-2 ring-wine/30'
                    : isActive
                    ? 'bg-wine/20 border-wine/30 opacity-60'
                    : 'bg-white/5 border-white/10 active:bg-white/10 hover:border-gold/30 cursor-pointer'
                }`}
              >
                <motion.span
                  className="text-2xl sm:text-3xl"
                  animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {plague.icon}
                </motion.span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 flex-wrap">
                    <span className="text-parchment font-display text-sm sm:text-base">{plague.english}</span>
                    <span className="hebrew-text text-gold-light/70 text-xs sm:text-sm">{plague.hebrew}</span>
                  </div>
                  <p className="text-parchment/50 text-xs sm:text-sm hidden sm:block">{plague.description}</p>
                </div>
                {isActive && !isAnimating && <span className="text-wine text-lg">✓</span>}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {activated.size === 10 && !activeEffect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-center p-6 rounded-xl bg-gold/5 border border-gold/20"
          >
            <p className="text-parchment text-lg">
              {section.commentary}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
