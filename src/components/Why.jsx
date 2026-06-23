import { motion } from 'framer-motion';
import { useInView, useCounter } from '../hooks/useInView';

const stats = [
  { icon: '😵', value: 75, suffix: '%', label: 'of people are chronically dehydrated without knowing it', color: '#F97316' },
  { icon: '🧠', value: 2,  suffix: '%', label: 'drop in hydration impairs focus and short-term memory', color: '#38BDF8' },
  { icon: '⚡', value: 30, suffix: '%', label: 'energy boost reported by people who drink enough water daily', color: '#34D399' },
  { icon: '💪', value: 3,  suffix: 'x', label: 'faster muscle recovery with proper hydration after exercise', color: '#818CF8' },
];

function StatCard({ icon, value, suffix, label, color, delay }) {
  const { ref, inView } = useInView(0.2);
  const count = useCounter(value, 1600, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="feature-card group flex flex-col gap-4"
      role="article"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: `${color}14`, border: `1px solid ${color}28` }}>
          {icon}
        </div>
        <div>
          <div className="text-3xl font-extrabold tracking-tight" style={{ color }}>
            {count}{suffix}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{label}</p>

      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${Math.min(value * (suffix === '%' ? 1 : 30), 100)}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default function Why() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="why" className="py-24 lg:py-32 bg-white" aria-labelledby="why-heading">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent mb-24" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-5">
            <span className="pill-light">The problem</span>
          </div>
          <h2 id="why-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Most people don't drink
            <br />
            <span className="text-gradient">nearly enough water.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Dehydration quietly sabotages your energy, mood, and focus — every single day. GULPY fixes that.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
          style={{ background: 'linear-gradient(135deg,#f0f9ff 0%,#e8f4fd 50%,#eff6ff 100%)', border: '1px solid rgba(56,189,248,0.15)' }}
        >
          <div className="text-5xl flex-shrink-0">💧</div>
          <div>
            <h3 className="text-xl font-bold text-navy-900 mb-1">The solution is simple.</h3>
            <p className="text-gray-500 leading-relaxed">
              You don't need to overhaul your life. You just need a gentle, beautiful nudge. That's exactly what GULPY is built to be.
            </p>
          </div>
          <button
            onClick={() => document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary flex-shrink-0"
            style={{ padding: '12px 24px' }}
          >
            Join free →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
