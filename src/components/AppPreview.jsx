import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const screens = [
  {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    bg: 'linear-gradient(160deg,#070f1e 0%,#0D2245 100%)',
    content: <HomeScreen />,
  },
  {
    id: 'goal',
    label: 'Daily Goal',
    icon: '🎯',
    bg: 'linear-gradient(160deg,#0f1e3a 0%,#0D2245 100%)',
    content: <GoalScreen />,
  },
  {
    id: 'streak',
    label: 'Streaks',
    icon: '🔥',
    bg: 'linear-gradient(160deg,#1a0f00 0%,#2d1a00 60%,#0D2245 100%)',
    content: <StreakScreen />,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    bg: 'linear-gradient(160deg,#0a0a1e 0%,#1a1040 100%)',
    content: <AnalyticsScreen />,
  },
];

function HomeScreen() {
  return (
    <div className="flex flex-col items-center h-full px-4 pt-6 pb-4">
      <div className="w-full flex items-center justify-between mb-4">
        <div>
          <div className="text-[9px] text-white/40 uppercase tracking-wider">Good morning ☀️</div>
          <div className="text-sm font-bold text-white">Alex</div>
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">A</div>
      </div>

      {/* Mini bottle */}
      <div className="relative my-3 flex items-center justify-center">
        <svg width="70" height="100" viewBox="0 0 70 100" fill="none">
          <defs>
            <clipPath id="ph-bottle"><path d="M22 14 L16 24 Q12 30 12 36 L12 84 Q12 90 18 90 L52 90 Q58 90 58 84 L58 36 Q58 30 54 24 L48 14 Z"/></clipPath>
          </defs>
          <path d="M26 8 L22 14 L16 24 Q12 30 12 36 L12 84 Q12 90 18 90 L52 90 Q58 90 58 84 L58 36 Q58 30 54 24 L48 14 L44 8 Z" fill="rgba(56,189,248,0.08)" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
          <rect x="28" y="4" width="14" height="8" rx="3" fill="rgba(56,189,248,0.2)" stroke="rgba(56,189,248,0.35)" strokeWidth="1"/>
          <g clipPath="url(#ph-bottle)">
            <rect x="12" y="42" width="46" height="48" fill="rgba(56,189,248,0.7)"/>
            <path d="M-10 44 Q5 40 20 44 Q35 48 50 44 Q65 40 80 44" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
          </g>
          <text x="35" y="65" textAnchor="middle" fontFamily="Inter" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.9)">65%</text>
        </svg>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[9px] text-white/50">Today's intake</span>
          <span className="text-[9px] text-cyan-400 font-semibold">1.6L / 2.5L</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '65%' }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 w-full">
        {['250ml', '350ml', '500ml'].map((s) => (
          <button key={s} className="py-2 rounded-xl text-[9px] font-semibold text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
            + {s}
          </button>
        ))}
      </div>

      <div className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.15)' }}>
        <span className="text-sm">🔔</span>
        <span className="text-[9px] text-white/60">Next reminder in 45 min</span>
      </div>
    </div>
  );
}

function GoalScreen() {
  return (
    <div className="flex flex-col h-full px-4 pt-6 pb-4">
      <div className="text-sm font-bold text-white mb-1">Your Goal</div>
      <div className="text-[9px] text-white/40 mb-5">Personalised to you</div>

      <div className="text-center mb-4">
        <div className="text-4xl font-extrabold text-white mb-0.5">2.5<span className="text-xl text-white/40">L</span></div>
        <div className="text-[9px] text-cyan-400 uppercase tracking-widest">Daily target</div>
      </div>

      {[
        { label: 'Body weight', val: '70kg', pct: 60 },
        { label: 'Activity level', val: 'Moderate', pct: 50 },
        { label: 'Climate', val: 'Warm', pct: 70 },
      ].map((r) => (
        <div key={r.label} className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-[9px] text-white/50">{r.label}</span>
            <span className="text-[9px] text-white/70 font-semibold">{r.val}</span>
          </div>
          <div className="h-1 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${r.pct}%` }} />
          </div>
        </div>
      ))}

      <div className="mt-auto pt-2 text-[8px] text-white/30 text-center">Goal updates automatically as you grow</div>
    </div>
  );
}

function StreakScreen() {
  const days = ['M','T','W','T','F','S','S'];
  const done = [true, true, true, true, true, false, false];

  return (
    <div className="flex flex-col h-full px-4 pt-6 pb-4">
      <div className="text-sm font-bold text-white mb-0.5">Streak</div>
      <div className="text-[9px] text-white/40 mb-4">Keep the fire going 🔥</div>

      <div className="text-center my-3">
        <div className="text-5xl font-extrabold text-white">14</div>
        <div className="text-[9px] text-orange-400 uppercase tracking-widest mt-0.5">Day Streak</div>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="text-[7px] text-white/30 font-medium">{d}</div>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${done[i] ? 'bg-orange-500' : 'bg-white/8 border border-white/10'}`}>
              {done[i] ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="text-[9px] text-white/40 uppercase tracking-wider mb-2">Badges earned</div>
      <div className="flex gap-2 flex-wrap">
        {['🌟 7-day', '💪 First week', '🔥 On fire'].map((b) => (
          <div key={b} className="text-[9px] font-semibold px-2 py-1 rounded-lg text-orange-300" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.2)' }}>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  const bars = [42, 78, 55, 90, 68, 100, 82];
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  return (
    <div className="flex flex-col h-full px-4 pt-6 pb-4">
      <div className="text-sm font-bold text-white mb-0.5">Analytics</div>
      <div className="text-[9px] text-white/40 mb-4">This week's insights</div>

      <div className="flex gap-3 mb-5">
        {[{ v: '14.2L', l: 'This week' }, { v: '2.03L', l: 'Daily avg' }].map((s) => (
          <div key={s.l} className="flex-1 rounded-xl p-2.5" style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.12)' }}>
            <div className="text-base font-extrabold text-white">{s.v}</div>
            <div className="text-[8px] text-white/40">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-16">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-md" style={{ height: `${h * 0.6}px`, background: h === 100 ? 'linear-gradient(to top,#38BDF8,#3B82F6)' : 'rgba(56,189,248,0.3)' }} />
            <div className="text-[7px] text-white/30">{labels[i].slice(0,1)}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)' }}>
        <span className="text-sm">✨</span>
        <span className="text-[9px] text-emerald-300">Best week yet! Up 12% from last week.</span>
      </div>
    </div>
  );
}

export default function AppPreview() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="preview"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#070f1e 0%,#0D2245 50%,#070f1e 100%)' }}
      aria-labelledby="preview-heading"
    >
      {/* Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(56,189,248,0.08) 0%,transparent 70%)' }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)' }} aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-5">
            <span className="pill">App preview</span>
          </div>
          <h2 id="preview-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Beautiful screens.
            <br />
            <span className="text-gradient">Built for daily use.</span>
          </h2>
          <p className="text-white/45 text-base max-w-lg mx-auto leading-relaxed">
            Every screen is designed to feel like a reward. Here's a peek at what's coming.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 justify-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative flex-shrink-0"
          >
            {/* Outer phone chrome */}
            <div className="phone-frame rounded-[44px] p-3" style={{ width: 220, height: 440 }}>
              {/* Inner screen */}
              <div className="w-full h-full rounded-[36px] overflow-hidden relative" style={{ background: screens[active].bg }}>
                {/* Status bar */}
                <div className="flex justify-between items-center px-4 pt-3 pb-1">
                  <span className="text-[9px] text-white/50 font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {[3,3,4,4].map((h,i) => <div key={i} className="w-0.5 bg-white/50 rounded-sm" style={{height:h}} />)}
                    </div>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><rect x="0" y="2" width="9" height="6" rx="1.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/><rect x="9" y="3.5" width="1" height="3" rx="0.5" fill="rgba(255,255,255,0.5)"/><rect x="1" y="3" width="6" height="4" rx="1" fill="rgba(255,255,255,0.5)"/></svg>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 rounded-b-2xl bg-black" aria-hidden="true" />

                {/* Screen content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {screens[active].content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -inset-4 rounded-[56px] pointer-events-none" style={{ background: 'radial-gradient(ellipse,rgba(56,189,248,0.12) 0%,transparent 70%)', zIndex: -1 }} aria-hidden="true" />
          </motion.div>

          {/* Screen selector */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="flex lg:flex-col gap-3"
          >
            {screens.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`flex lg:flex-row flex-col items-center lg:items-start gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-250 ${
                  active === i
                    ? 'glass-dark border-cyan-400/30 shadow-glow-sm'
                    : 'border border-transparent hover:glass-dark'
                }`}
                style={active === i ? { border: '1px solid rgba(56,189,248,0.3)' } : { border: '1px solid transparent' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={active === i ? { background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.25)' } : { background: 'rgba(255,255,255,0.05)' }}
                >
                  {s.icon}
                </div>
                <div className="hidden lg:block">
                  <div className={`text-sm font-semibold ${active === i ? 'text-white' : 'text-white/50'}`}>{s.label}</div>
                  <div className="text-[11px] text-white/30 mt-0.5">Screen {i + 1}</div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
