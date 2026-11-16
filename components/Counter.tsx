'use client';

import { useEffect, useRef, useState } from 'react';

type CounterProps = {
  end: number;
  suffix?: string;
  duration?: number;
};

export default function Counter({ end, suffix = '', duration = 1500 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  // Start at the final value so the prerendered HTML is meaningful;
  // the count-up runs from 0 once the element scrolls into view.
  const [value, setValue] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
