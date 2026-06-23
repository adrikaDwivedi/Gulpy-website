import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import Droplets from '../Droplets';

function ConfettiDrop({ emoji, style }) {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none"
      style={style}
      initial={{ opacity: 1, y: -10, scale: 0.5, rotate: 0 }}
      animate={{ opacity: 0, y: 80, scale: 1.2, rotate: Math.random() > 0.5 ? 360 : -360 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      aria-hidden="true"
    >
      {emoji}
    </motion.div>
  );
}

const emojis = ['💧', '✨', '🎉', '🔥', '💪', '⭐'];

export default function Waitlist() {
  const { ref, inView } = useInView(0.15);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Please enter your name';
    if (!email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email';
    return e;
  };

  const spawnConfetti = () => {
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      style: { left: `${10 + Math.random() * 80}%`, top: `${20 + Math.random() * 40}%` },
    }));
    setConfetti(items);
    setTimeout(() => setConfetti([]), 1400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900)); // Simulate network

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('gulpy_waitlist') || '[]');
      existing.push({ name: name.trim(), email: email.trim().toLowerCase(), joinedAt: new Date().toISOString() });
      localStorage.setItem('gulpy_waitlist', JSON.stringify(existing));
    } catch {}

    setLoading(false);
    setSubmitted(true);
    spawnConfetti();
  };

  return (
    <section
      id="waitlist"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(140deg,#070f1e 0%,#0D2245 50%,#0a1830 100%)' }}
      aria-labelledby="waitlist-heading"
    >
      {/* Ambient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(56,189,248,0.06) 0%,transparent 65%)' }} aria-hidden="true" />

      <Droplets />

      <div className="max-w-2xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-5">
            <span className="pill">Early access</span>
          </div>
          <h2 id="waitlist-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Be the first
            <br />
            <span className="text-gradient">to experience GULPY.</span>
          </h2>
          <p className="text-white/45 text-base leading-relaxed max-w-lg mx-auto">
            Join thousands of people already on the waitlist. Early members get lifetime perks and priority access.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="glass-dark rounded-3xl p-7 sm:p-10 relative overflow-hidden"
          style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)' }}
        >
          {/* Confetti */}
          {confetti.map((c) => <ConfettiDrop key={c.id} {...c} />)}

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Waitlist signup form"
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="wl-name" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      Your name
                    </label>
                    <input
                      id="wl-name"
                      type="text"
                      placeholder="Alex Johnson"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
                      className="input-field"
                      autoComplete="given-name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-err' : undefined}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p id="name-err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1.5 font-medium" role="alert">
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="wl-email" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      Email address
                    </label>
                    <input
                      id="wl-email"
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                      className="input-field"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-err' : undefined}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p id="email-err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1.5 font-medium" role="alert">
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-base justify-center"
                  style={{ padding: '16px 32px' }}
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Joining waitlist…
                    </span>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" />
                        <path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </svg>
                      Reserve my spot — it's free
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-white/25 mt-4">
                  🔒 No spam, ever. Unsubscribe anytime.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-6"
                role="status"
                aria-live="polite"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="text-5xl mb-5"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-extrabold text-white mb-2">You're on the list!</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                  Hey {name.split(' ')[0]} — you're officially in. We'll be in touch the moment GULPY launches. Stay hydrated until then! 💧
                </p>
                <div className="mt-6 px-5 py-3 rounded-2xl inline-flex items-center gap-2" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
                  <span className="text-cyan-400 font-bold text-sm">#{Math.floor(Math.random() * 900) + 2100}</span>
                  <span className="text-white/40 text-xs">on the waitlist</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-5 mt-8"
        >
          {[
            { icon: '📱', label: 'iOS & Android' },
            { icon: '✨', label: 'Free to use' },
            { icon: '🚀', label: 'Launching soon' },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <span className="text-sm">{t.icon}</span>
              <span className="text-xs text-white/35 font-medium">{t.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
