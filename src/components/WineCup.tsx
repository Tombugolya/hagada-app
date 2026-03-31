import { motion } from 'framer-motion';

interface WineCupProps {
  fillPercent?: number;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function WineCup({ fillPercent = 100, size = 120, className = '', animate = true }: WineCupProps) {
  const cupHeight = size;
  const cupWidth = size * 0.55;
  const stemHeight = size * 0.3;
  const bowlHeight = size * 0.55;
  const baseWidth = size * 0.5;

  const wineHeight = (bowlHeight * fillPercent) / 100;

  return (
    <div className={`inline-flex flex-col items-center ${className}`} style={{ width: cupWidth + 20, height: cupHeight + 10 }}>
      <svg width={cupWidth + 20} height={cupHeight + 10} viewBox={`0 0 ${cupWidth + 20} ${cupHeight + 10}`}>
        {/* Glass bowl */}
        <path
          d={`M ${10} ${5}
              Q ${10} ${bowlHeight + 5} ${(cupWidth + 20) / 2 - 3} ${bowlHeight + 5}
              L ${(cupWidth + 20) / 2 + 3} ${bowlHeight + 5}
              Q ${cupWidth + 10} ${bowlHeight + 5} ${cupWidth + 10} ${5}
              Z`}
          fill="none"
          stroke="rgba(212, 175, 55, 0.4)"
          strokeWidth="1.5"
        />

        {/* Wine fill */}
        <motion.clipPath id={`wine-clip-${size}`}>
          <rect
            x={10}
            y={bowlHeight + 5 - wineHeight}
            width={cupWidth + 10}
            height={wineHeight}
          />
        </motion.clipPath>
        <path
          d={`M ${10} ${5}
              Q ${10} ${bowlHeight + 5} ${(cupWidth + 20) / 2 - 3} ${bowlHeight + 5}
              L ${(cupWidth + 20) / 2 + 3} ${bowlHeight + 5}
              Q ${cupWidth + 10} ${bowlHeight + 5} ${cupWidth + 10} ${5}
              Z`}
          fill="rgba(114, 47, 55, 0.8)"
          clipPath={`url(#wine-clip-${size})`}
        >
          {animate && (
            <animate
              attributeName="fill"
              values="rgba(114,47,55,0.7);rgba(140,50,60,0.9);rgba(114,47,55,0.7)"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Wine surface shimmer */}
        {fillPercent > 0 && (
          <motion.ellipse
            cx={(cupWidth + 20) / 2}
            cy={bowlHeight + 5 - wineHeight + 2}
            rx={cupWidth * 0.35}
            ry={2}
            fill="rgba(200, 80, 90, 0.3)"
            animate={animate ? { opacity: [0.2, 0.5, 0.2] } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Stem */}
        <rect
          x={(cupWidth + 20) / 2 - 2}
          y={bowlHeight + 5}
          width={4}
          height={stemHeight}
          fill="rgba(212, 175, 55, 0.3)"
        />

        {/* Base */}
        <ellipse
          cx={(cupWidth + 20) / 2}
          cy={bowlHeight + stemHeight + 7}
          rx={baseWidth / 2}
          ry={4}
          fill="none"
          stroke="rgba(212, 175, 55, 0.4)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
