
import { SingleDrop } from '../Droplets';

const socials = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.23 6.23 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.07 8.07 0 004.74 1.53V6.78a4.85 4.85 0 01-.97-.09z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const links = [
  { label: 'Why GULPY', href: '#why' },
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how' },
  { label: 'App Preview', href: '#preview' },
  { label: 'Join Waitlist', href: '#waitlist' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden pt-16 pb-10"
      style={{ background: '#070f1e', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      role="contentinfo"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.02) 1px,transparent 1px)', backgroundSize: '64px 64px' }} aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#38BDF8,#3B82F6)' }}>
                <SingleDrop size={18} opacity={1} />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">GULPY</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-6">
              Hydration that feels rewarding. Track, streak, and thrive — one sip at a time.
            </p>

            {/* App store badges placeholder */}
            <div className="flex flex-wrap gap-3">
              {['App Store', 'Google Play'].map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-not-allowed opacity-50"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  title="Coming soon"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                    {s === 'App Store'
                      ? <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      : <path d="M3.18 23.76c.34.19.73.19 1.07 0L12 19.07l7.75 4.69c.34.19.73.19 1.07 0 .33-.19.51-.54.49-.9l-.5-8.83 5.62-7.12c.2-.25.26-.58.16-.88-.1-.3-.36-.52-.67-.57l-8.73-1.5L13.07.99A.997.997 0 0012 .5a.997.997 0 00-1.07.49l-3.12 5.97-8.73 1.5c-.31.05-.57.27-.67.57-.1.3-.04.63.16.88l5.62 7.12-.5 8.83c-.02.36.16.71.49.9z" fillRule="evenodd"/>}
                  </svg>
                  <div>
                    <div className="text-[8px] text-white/40 leading-none">Coming soon</div>
                    <div className="text-xs font-semibold text-white/70 leading-tight">{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-4">Navigate</div>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200 focus:outline-none"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-4">Connect</div>
            <a href="mailto:hello@gulpy.app" className="text-sm text-white/45 hover:text-cyan-400 transition-colors duration-200 block mb-4">
              hello@gulpy.app
            </a>
            <div className="flex gap-2 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/35 hover:text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(56,189,248,0.12)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} GULPY. Made with 💧 for better health.
            </p>
            <div className="flex gap-5">
              {['Privacy Policy', 'Terms of Service'].map((l) => (
                <span key={l} className="text-xs text-white/20 cursor-default">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
