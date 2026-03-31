import { useCallback, useRef } from 'react';

type SoundName = 'drop' | 'splash' | 'crack' | 'chime' | 'pop' | 'whoosh' | 'success' | 'click';

const audioCtxRef = { current: null as AudioContext | null };

function getAudioContext(): AudioContext {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new AudioContext();
  }
  return audioCtxRef.current;
}

function synthesizeSound(name: SoundName) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  switch (name) {
    case 'drop': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    }
    case 'splash': {
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
      }
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2000;
      source.buffer = buffer;
      gain.gain.setValueAtTime(0.2, now);
      source.connect(filter).connect(gain).connect(ctx.destination);
      source.start(now);
      break;
    }
    case 'crack': {
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.05));
      }
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      source.buffer = buffer;
      source.connect(gain).connect(ctx.destination);
      source.start(now);
      break;
    }
    case 'chime': {
      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.5);
      });
      break;
    }
    case 'pop': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
      break;
    }
    case 'whoosh': {
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        data[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI) * 0.3;
      }
      const source = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(3000, now + 0.4);
      source.buffer = buffer;
      source.connect(filter).connect(ctx.destination);
      source.start(now);
      break;
    }
    case 'success': {
      [523, 659, 784, 1047].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.4);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.4);
      });
      break;
    }
    case 'click': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 1000;
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
      break;
    }
  }
}

export function useSoundEffect() {
  const playingRef = useRef(false);

  const play = useCallback((name: SoundName) => {
    if (playingRef.current) return;
    playingRef.current = true;
    synthesizeSound(name);
    setTimeout(() => { playingRef.current = false; }, 100);
  }, []);

  return { play };
}
