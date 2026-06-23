import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Droplets from '../Droplets';

function WaterBottleSVG({ fillPct = 65 }) {
  const maxH = 180; // total fill area in SVG units
  const fillH = (fillPct / 100) * maxH;
  const fillY = 220 - fillH; // bottom-anchored

  return (
    <svg viewBox="0 0 160 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <defs>
        <clipPath id="bottle-clip">
          <path d="M58 38 L44 58 Q34 72 34 90 L34 226 Q34 248 56 248 L104 248 Q126 248 126 226 L126 90 Q126 72 116 58 L102 38 Z" />
        </clipPath>
        <linearGradient id="water-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="bottle-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(56,189,248,0.15)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Bottle body outline */}
      <path
        d="M64 16 L58 38 L44 58 Q34 72 34 90 L34 226 Q34 248 56 248 L104 248 Q126 248 126 226 L126 90 Q126 72 116 58 L102 38 L96 16 Z"
        fill="url(#bottle-grad)"
        stroke="rgba(56,189,248,0.35)"
        strokeWidth="1.5"
      />

      {/* Cap/neck */}
      <rect x="62" y="8" width="36" height="18" rx="5" fill="rgba(56,189,248,0.2)" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
      <rect x="67" y="4" width="26" height="8" rx="4" fill="rgba(56,189,248,0.35)" stroke="rgba(56,189,248,0.5)" strokeWidth="1" />

      {/* Water fill */}
      <g clipPath="url(#bottle-clip)">
        <motion.rect
          x="34" width="92" height="248"
          fill="url(#water-grad)"
          initial={{ y: 248 }}
          animate={{ y: fillY }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />

        {/* Animated wave on water surface */}
        <motion.g
          initial={{ y: 248 }}
          animate={{ y: fillY }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          {/* Wave path — wide enough to animate */}
          <g className="animate-wave" style={{ transformOrigin: 'center' }}>
            <path
              d="M-46 10 Q-30 2 -14 10 Q2 18 18 10 Q34 2 50 10 Q66 18 82 10 Q98 2 114 10 Q130 18 146 10 Q162 2 178 10 Q194 18 210 10"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
              fill="none"
            />
          </g>
          <g className="animate-wave-slow" style={{ transformOrigin: 'center' }}>
            <path
              d="M-46 16 Q-30 8 -14 16 Q2 24 18 16 Q34 8 50 16 Q66 24 82 16 Q98 8 114 16 Q130 24 146 16 Q162 8 178 16 Q194 24 210 16"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
              fill="none"
            />
          </g>
        </motion.g>

        {/* Bubbles */}
        {[
          { cx: 70, cy: 180, r: 3, delay: 0.8 },
          { cx: 90, cy: 200, r: 2, delay: 1.4 },
          { cx: 110, cy: 160, r: 4, delay: 1.0 },
          { cx: 60, cy: 210, r: 2.5, delay: 1.8 },
        ].map((b, i) => (
          <motion.circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill="rgba(255,255,255,0.35)"
            initial={{ opacity: 0, cy: b.cy + 20 }}
            animate={{ opacity: [0, 0.5, 0], cy: [b.cy + 20, b.cy - 40] }}
            transition={{ duration: 2.5, delay: b.delay, repeat: Infinity, repeatDelay: 1.5 }}
          />
        ))}
      </g>

      {/* Bottle shine */}
      <path
        d="M58 80 Q52 90 52 130 L52 200 Q56 210 62 210"
        stroke="url(#shine)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Percentage label */}
      <motion.text
        x="80" y="170"
        textAnchor="middle"
        fontFamily="Inter, system-ui"
        fontWeight="700"
        fontSize="22"
        fill="rgba(255,255,255,0.9)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {fillPct}%
      </motion.text>
      <motion.text
        x="80" y="186"
        textAnchor="middle"
        fontFamily="Inter, system-ui"
        fontWeight="500"
        fontSize="9"
        fill="rgba(255,255,255,0.6)"
        letterSpacing="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
      >
        DAILY GOAL
      </motion.text>

      {/* Glow base */}
      <ellipse cx="80" cy="260" rx="42" ry="8" fill="rgba(56,189,248,0.2)" style={{ filter: 'blur(10px)' }} />
    </svg>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  const [fill, setFill] = useState(65);

  // Slow oscillating fill
  useEffect(() => {
    let t = 0;
    const iv = setInterval(() => {
      t += 0.005;
      setFill(Math.round(60 + Math.sin(t) * 12));
    }, 60);
    return () => clearInterval(iv);
  }, []);

  const scrollToWaitlist = () => {
    document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg,#070f1e 0%,#0D2245 50%,#0c1e40 100%)' }}
      aria-label="Hero"
    >
      {/* Ambient orbs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(56,189,248,0.12) 0%,transparent 70%)', filter: 'blur(1px)' }} aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)', filter: 'blur(1px)' }} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)' }} aria-hidden="true" />

      {/* Floating droplets */}
      <Droplets />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.03) 1px,transparent 1px)', backgroundSize: '72px 72px' }} aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div {...fadeUp(0.1)} className="flex justify-center lg:justify-start mb-6">
              <div className="pill">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Coming Soon — Join the Waitlist
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-5"
            >
              Hydration that
              <br />
              <span className="text-gradient">feels rewarding.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              {...fadeUp(0.32)}
              className="text-base sm:text-lg text-white/55 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8"
            >
              GULPY turns drinking water into a daily ritual you'll love — with streaks, smart reminders, and beautiful progress tracking.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.42)} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <button onClick={scrollToWaitlist} className="btn-primary text-base" style={{ padding: '15px 32px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
                Get Early Access
              </button>
              <button
                onClick={() => document.querySelector('#why')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost text-base"
              >
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>

            {/* Stat chips */}
            <motion.div {...fadeUp(0.52)} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { val: '2,400+', label: 'People waiting' },
                { val: '100%', label: 'Free to start' },
                { val: 'iOS & Android', label: 'Coming soon' },
              ].map((s) => (
                <div key={s.label} className="stat-chip flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#38BDF8' }} />
                  <span className="text-xs font-semibold text-white/90">{s.val}</span>
                  <span className="text-xs text-white/40">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex justify-center items-center relative"
          >
            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-64 h-64 rounded-full border border-cyan-400/10 animate-pulse" />
              <div className="absolute w-80 h-80 rounded-full border border-cyan-400/5" />
              <div className="w-56 h-56 rounded-full absolute" style={{ background: 'radial-gradient(circle,rgba(56,189,248,0.08) 0%,transparent 70%)' }} />
            </div>

            {/* Ripple rings */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-48 h-48 rounded-full border border-cyan-400/20 animate-ripple" />
              <div className="w-48 h-48 rounded-full border border-cyan-400/15 animate-ripple-2 absolute" />
            </div>

            {/* Bottle */}
            <div className="relative w-48 h-72 sm:w-56 sm:h-80 z-10" style={{ filter: 'drop-shadow(0 20px 60px rgba(56,189,248,0.2))' }}>
              <WaterBottleSVG fillPct={fill} />
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              className="absolute top-8 -right-2 sm:right-4 stat-chip hidden sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <div>
                  <div className="text-xs font-bold text-white">14 day</div>
                  <div className="text-[10px] text-white/45">streak</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
              className="absolute bottom-12 -left-2 sm:left-2 stat-chip hidden sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">✅</span>
                <div>
                  <div className="text-xs font-bold text-white">Goal met</div>
                  <div className="text-[10px] text-white/45">2.5L today</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/25 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
