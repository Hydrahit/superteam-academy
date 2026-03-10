'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 2000): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return count;
}

interface StatItemProps {
  icon: string;
  target: number;
  suffix: string;
  label: string;
}

function StatItem({ icon, target, suffix, label }: StatItemProps) {
  const count = useCountUp(target);
  const ref = useRef<HTMLDivElement>(null);

  // We need to attach the ref for the IntersectionObserver inside useCountUp
  // Since useCountUp uses its own ref, we wrap the component to ensure visibility
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl text-[#00C896] mb-2">{icon}</div>
      <div className="font-display text-6xl font-black gradient-text">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-base text-[#888888] mt-2">{label}</p>
    </div>
  );
}

const stats: StatItemProps[] = [
  { icon: '🎓', target: 3200, suffix: '+', label: 'Active Learners' },
  { icon: '📜', target: 500, suffix: '+', label: 'Certs Minted' },
  { icon: '📚', target: 5, suffix: '', label: 'Courses' },
  { icon: '⛓️', target: 100, suffix: '%', label: 'On-Chain' },
];

export default function StatsBar() {
  return (
    <section className="w-full py-16 px-8 bg-[#080808] border-y border-[#1A1A1A]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
