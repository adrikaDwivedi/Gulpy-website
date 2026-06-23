import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: '💧',
    title: 'One-tap Logging',
    desc: 'Log water instantly with preset cup sizes. Built for real life — no friction, no fuss.',
    color: '#38BDF8',
    tag: 'Core',
    detail: 'Preset sizes: sip, cup, bottle, custom',
  },
  {
    icon: '🎯',
    title: 'Smart Daily Goals',
    desc: 'Your target is personalised to your body weight, activity level, and local weather.',
    color: '#3B82F6',
    tag: 'Personalised',
    detail: 'Adapts as your lifestyle changes',
  },
  {
    icon: '🔥',
    title: 'Streak Tracking',
    desc: 'Build momentum. Hit your daily goal and watch your streak grow. Missing hurts (in a good way).',
    color: '#F97316',
    tag: 'Habit',
    detail: 'Calendar heatmap + milestone badges',
  },
  {
    icon: '🔔',
    title: 'Smart Reminders',
    desc: 'Intelligent nudges timed to your routine — not spam. Quiet hours respected automatically.',
    color: '#34D399',
    tag: 'Notifications',
    detail: 'Learns your best reminder windows',
  },
  {
    icon: '📈',
    title: 'Progress Analytics',
    desc: 'Beautiful charts that reveal your hydration patterns, weekly trends, and monthly totals.',
    color: '#818CF8',
    tag: 'Insights',
    detail: 'Weekly, monthly & all-time views',
  },
  {
    icon: '🤖',
    title: 'AI Coach',
    desc: 'An intelligent coach that adapts your goal based on exercise, sleep, and how you feel.',
    color: '#EC4899',
    tag: 'Coming soon',
    detail: 'Powered by health data you control',
  },
];

function FeatureCard({ icon, title, desc, color, tag, detail, delay }) {
  const { ref, inView } = useInView(0.15);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className="feature-card group"
      role="article"
    >
      {/* Icon */}
      <div className="relative mb-5 inline-flex">
        <div
          className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: `${color}12`, border: `1px solid ${color}22`, width: 52, height: 52 }}
        >
          {icon}
        </div>
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${color}18`, filter: 'blur(8px)', zIndex: -1 }}
        />
      </div>

      {/* Tag */}
      <div className="mb-3">
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md"
          style={{ background: `${color}10`, color: color }}
        >
          {tag}
        </span>
      </div>

      <h3 className="text-base font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>

      {/* Detail line */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
        <div className="w-1 h-3.5 rounded-full" style={{ background: color }} />
        <span className="text-[11px] text-gray-400 font-medium">{detail}</span>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="features" className="py-24 lg:py-32" style={{ background: 'linear-gradient(180deg,#f8faff 0%,white 100%)' }} aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-5">
            <span className="pill-light">Features</span>
          </div>
          <h2 id="features-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Everything you need
            <br />
            <span className="text-gradient">to stay hydrated.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            No bloat. No complexity. Just the right tools, beautifully crafted to make hydration a habit you'll keep.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
