/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: { 950: '#070f1e', 900: '#0D2245', 800: '#112952', 700: '#163362' },
        brand: { cyan: '#38BDF8', blue: '#3B82F6', indigo: '#6366F1' },
      },
      fontFamily: { sans: ['"Inter"', 'system-ui', 'sans-serif'] },
      backgroundImage: {
        'hero-grad': 'linear-gradient(140deg, #070f1e 0%, #0D2245 45%, #0c1e40 100%)',
        'cta-grad':  'linear-gradient(140deg, #0D2245 0%, #112952 100%)',
        'btn-grad':  'linear-gradient(135deg, #38BDF8 0%, #3B82F6 100%)',
      },
      boxShadow: {
        'glow':       '0 0 60px rgba(56,189,248,0.25)',
        'glow-sm':    '0 0 30px rgba(56,189,248,0.18)',
        'card':       '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(13,34,69,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.05), 0 24px 56px rgba(13,34,69,0.11)',
        'phone':      '0 60px 120px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.35)',
      },
      keyframes: {
        floatA: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)',  opacity: '0.55' },
          '40%':     { transform: 'translateY(-28px) rotate(5deg)', opacity: '0.85' },
          '70%':     { transform: 'translateY(-12px) rotate(-3deg)',opacity: '0.65' },
        },
        floatB: {
          '0%,100%': { transform: 'translateY(0px)',               opacity: '0.4' },
          '50%':     { transform: 'translateY(-22px) rotate(-6deg)',opacity: '0.7' },
        },
        floatC: {
          '0%,100%': { transform: 'translateY(0px)',  opacity: '0.3'  },
          '40%':     { transform: 'translateY(-34px)',opacity: '0.55' },
          '75%':     { transform: 'translateY(-10px)',opacity: '0.38' },
        },
        waveScroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ripple: {
          '0%':   { transform: 'scale(1)',   opacity: '0.45' },
          '100%': { transform: 'scale(2.6)', opacity: '0'    },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0'  },
        },
        fillUp: {
          '0%':   { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        loadDrop: {
          '0%':   { transform: 'translateY(-20px) scale(0.8)', opacity: '0' },
          '60%':  { transform: 'translateY(4px)  scale(1.05)', opacity: '1' },
          '100%': { transform: 'translateY(0px)  scale(1)',    opacity: '1' },
        },
        gradShift: {
          '0%,100%': { backgroundPosition: '0% 50%'   },
          '50%':     { backgroundPosition: '100% 50%'  },
        },
      },
      animation: {
        'drop-a':     'floatA 7s ease-in-out infinite',
        'drop-b':     'floatB 9.5s ease-in-out infinite',
        'drop-c':     'floatC 11s ease-in-out infinite',
        'wave':       'waveScroll 3s linear infinite',
        'wave-slow':  'waveScroll 5s linear infinite',
        'ripple':     'ripple 2.4s ease-out infinite',
        'ripple-2':   'ripple 2.4s ease-out 0.85s infinite',
        'shimmer':    'shimmer 2.8s linear infinite',
        'fill-up':    'fillUp 1.2s cubic-bezier(0.22,1,0.36,1) forwards',
        'load-drop':  'loadDrop 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'grad-shift': 'gradShift 6s ease infinite',
      },
    },
  },
  plugins: [],
};
