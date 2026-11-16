'use client';

import Counter from './Counter';
import Reveal from './Reveal';

const stats = [
  { end: 5, suffix: '+', label: 'Years of Data Engineering' },
  { end: 90, suffix: '', label: 'SQL Procedures Migrated with Agentic AI' },
  { end: 95, suffix: '%', label: 'Autonomous Conversion Confidence' },
  { end: 60, suffix: '+', label: 'Production Reports Delivered' },
];

export default function Stats() {
  return (
    <section className="bg-primary px-6">
      <div className="max-w-6xl mx-auto -mt-12 relative z-20">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-secondary p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
