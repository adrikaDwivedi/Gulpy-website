

const drops = [
  { size: 28, top: '12%', left: '8%',  delay: 0,    anim: 'drop-a', opacity: 0.55 },
  { size: 18, top: '28%', left: '14%', delay: 1.2,  anim: 'drop-b', opacity: 0.4  },
  { size: 38, top: '18%', right: '9%', delay: 0.5,  anim: 'drop-c', opacity: 0.45 },
  { size: 14, top: '45%', right:'16%', delay: 2.1,  anim: 'drop-a', opacity: 0.3  },
  { size: 22, top: '62%', left: '6%',  delay: 1.7,  anim: 'drop-b', opacity: 0.35 },
  { size: 32, top: '72%', right:'7%',  delay: 0.9,  anim: 'drop-c', opacity: 0.4  },
  { size: 16, top: '55%', left:'22%',  delay: 3.0,  anim: 'drop-a', opacity: 0.28 },
  { size: 20, top: '38%', right:'28%', delay: 2.5,  anim: 'drop-b', opacity: 0.32 },
];

function Droplet({ size, opacity, style, animClass, delay }) {
  return (
    <div
      className={`absolute pointer-events-none ${animClass}`}
      style={{ animationDelay: `${delay}s`, ...style }}
      aria-hidden="true"
    >
      <svg width={size} height={size * 1.25} viewBox="0 0 40 52" fill="none">
        <path
          d="M20 2C20 2 4 20 4 32C4 42 11.16 48 20 48C28.84 48 36 42 36 32C36 20 20 2 20 2Z"
          fill={`rgba(56,189,248,${opacity})`}
          style={{ filter: 'blur(0.5px)' }}
        />
        <path
          d="M14 30C14 30 12 24 18 20"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function Droplets({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {drops.map((d, i) => {
        const style = {};
        if (d.top) style.top = d.top;
        if (d.left) style.left = d.left;
        if (d.right) style.right = d.right;
        return (
          <Droplet
            key={i}
            size={d.size}
            opacity={d.opacity}
            style={style}
            animClass={`animate-${d.anim}`}
            delay={d.delay}
          />
        );
      })}
    </div>
  );
}

export function SingleDrop({ size = 24, opacity = 0.6, className = '' }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 40 52" fill="none" className={className}>
      <path
        d="M20 2C20 2 4 20 4 32C4 42 11.16 48 20 48C28.84 48 36 42 36 32C36 20 20 2 20 2Z"
        fill={`rgba(56,189,248,${opacity})`}
      />
      <path d="M14 30C14 30 12 24 18 20" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
