import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SingleDrop } from '../Droplets';

const links = [
  { label: 'Why GULPY', href: '#why' },
  { label: 'Features',  href: '#features' },
  { label: 'How it Works', href: '#how' },
  { label: 'Preview', href: '#preview' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-5 sm:px-8 transition-all duration-300 ${
            scrolled
              ? 'glass-dark rounded-2xl mx-4 sm:mx-8 shadow-glass'
              : ''
          }`}
          style={scrolled ? { boxShadow: '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)' } : {}}
        >
          <nav className="flex items-center justify-between h-12">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="GULPY home"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#38BDF8,#3B82F6)' }}>
                  <SingleDrop size={16} opacity={1} />
                </div>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg,#38BDF8,#3B82F6)', filter: 'blur(8px)', zIndex: -1 }} />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">GULPY</span>
            </button>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.07] transition-all duration-200 focus:outline-none"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden md:block">
              <button onClick={() => scrollTo('#waitlist')} className="btn-primary text-sm" style={{ padding: '10px 22px' }}>
                Join Waitlist
              </button>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 focus:outline-none"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block h-0.5 w-full bg-white/80 rounded-full origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.22 }}
                className="block h-0.5 w-full bg-white/80 rounded-full"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block h-0.5 w-full bg-white/80 rounded-full origin-center"
              />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(7,15,30,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-3">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  onClick={() => scrollTo(l.href)}
                  className="text-2xl font-semibold text-white/70 hover:text-white transition-colors py-3 focus:outline-none"
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.07 + 0.05, duration: 0.35 }}
                className="mt-6"
              >
                <button onClick={() => scrollTo('#waitlist')} className="btn-primary">
                  Join Waitlist
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
