import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    number: '01',
    icon: '🎯',
    title: 'Set your goal',
    desc: 'Answer a few quick questions about yourself. GULPY calculates your perfect daily hydration target in seconds.',
    color: '#38BDF8',
  },
  {
    number: '02',
    icon: '💧',
    title: 'Log every sip',
    desc: 'One tap. Choose your drink size or add a custom one. Your bottle fills up with every log — satisfying every time.',
    color: '#3B82F6',
  },
  {
    number: '03',
    icon: '🔔',
    title: 'Get smart reminders',
    desc: 'GULPY learns when you tend to forget and sends a gentle nudge. Never pushy, always timely.',
    color: '#818CF8',
  },
  {
    number: '04',
    icon: '🏆',
    title: 'Build your streak',
    desc: 'Hit your goal each day and watch your streak grow. Badges and milestones keep it exciting long-term.',
    color: '#34D399',
  },
];

function Step({ number, icon, title, desc, color, index }) {
  const { ref, inView } = useInView(0.2);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 sm:gap-10 items-start group"
    >
      {/* Connector line (not on last) */}
      {index < steps.length - 1 && (
        <div className="absolute left-6 top-[52px] w-px bottom-[-40px]" style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }} aria-hidden="true" />
      )}

      {/* Step number circle */}
      <div className="flex-shrink-0 relative z-10">
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-glow-sm"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
          role="img"
          aria-label={`Step ${number}`}
        >
          {icon}
        </motion.div>
        {/* Number badge */}
        <div
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-white"
          style={{ background: color }}
          aria-hidden="true"
        >
          {number.slice(-1)}
        </div>
      </div>

      {/* Content */}
      <div className="pb-12">
        <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color }}>
          Step {number}
        </div>
        <h3 className="text-xl font-bold text-navy-900 mb-2 tracking-tight">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="how" className="py-24 lg:py-32 bg-white" aria-labelledby="how-heading">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — heading */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex mb-5">
                <span className="pill-light">How it works</span>
              </div>
              <h2 id="how-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mb-5">
                Simple by design.
                <br />
                <span className="text-gradient">Powerful by habit.</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Four steps. Zero confusion. GULPY is built to fit into your life seamlessly — not add another thing to manage.
              </p>

              {/* Mini water bottle progress */}
              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: 'linear-gradient(135deg,#f0f9ff,#eff6ff)', border: '1px solid rgba(56,189,248,0.15)' }}>
                <div className="flex gap-1 items-end h-8">
                  {[40, 65, 80, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-2 rounded-full"
                      style={{ background: `linear-gradient(to top, #38BDF8, #3B82F6)`, height: `${h * 0.32}px` }}
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ delay: i * 0.15 + 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold text-navy-900">Daily progress</div>
                  <div className="text-[10px] text-gray-400">Builds over time</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — steps */}
          <div>
            {steps.map((s, i) => (
              <Step key={s.number} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
