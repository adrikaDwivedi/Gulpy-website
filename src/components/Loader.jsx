import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    // Animate fill from 0 → 100
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 2);
      setFill(Math.round(ease * 100));
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 300);
    };
    requestAnimationFrame(tick);
  }, []);

  const waterY = 80 - fill * 0.68; // SVG units

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-navy-900"
        >
          {/* Animated bottle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="72" height="100" viewBox="0 0 72 100" fill="none">
              <defs>
                <clipPath id="bottle-loader">
                  <path d="M22 8 L16 24 Q14 28 14 32 L14 82 Q14 90 22 90 L50 90 Q58 90 58 82 L58 32 Q58 28 56 24 L50 8 Z" />
                </clipPath>
              </defs>

              {/* Bottle outline */}
              <path
                d="M28 4 L22 8 L16 24 Q14 28 14 32 L14 82 Q14 90 22 90 L50 90 Q58 90 58 82 L58 32 Q58 28 56 24 L50 8 L44 4 Z"
                stroke="rgba(56,189,248,0.5)"
                strokeWidth="1.5"
                fill="rgba(56,189,248,0.05)"
              />
              {/* Neck */}
              <rect x="28" y="2" width="16" height="8" rx="3" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />

              {/* Water fill */}
              <g clipPath="url(#bottle-loader)">
                {/* Water body */}
                <motion.rect
                  x="14" width="44" height="90"
                  fill="rgba(56,189,248,0.65)"
                  initial={{ y: 90 }}
                  animate={{ y: waterY }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Wave */}
                <motion.g
                  initial={{ y: 90 }}
                  animate={{ y: waterY }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <svg x="-44" y="-6" width="116" height="12" overflow="visible">
                    <path
                      d="M0 6 Q14.5 0 29 6 Q43.5 12 58 6 Q72.5 0 87 6 Q101.5 12 116 6"
                      fill="none"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="2"
                      className="animate-wave"
                      style={{ transformOrigin: 'center' }}
                    />
                  </svg>
                </motion.g>
              </g>
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-5 text-base font-semibold text-white/70 tracking-widest uppercase"
          >
            GULPY
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-xs text-white/30 tracking-wider"
          >
            {fill}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
