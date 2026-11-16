'use client';

import { ArrowRight, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const ROLES = [
  'Scalable Cloud Platforms',
  'Agentic AI Accelerators',
  'Medallion Lakehouses',
  'Production Data Pipelines',
];

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let delay = deleting ? 38 : 70;
    if (!deleting && text === word) delay = 2400;
    if (deleting && text === '') delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section className="relative min-h-[92vh] bg-gradient-tech flex items-center justify-center px-6 overflow-hidden">
      {/* Ambient background: aurora blobs + engineering grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="absolute inset-0 hero-grid" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up py-24">
        <div className="mb-6 inline-block">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Welcome to my portfolio</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Senior Data Engineer
          {/* Fixed-height slot for the typewriter: reserves the maximum
              lines the longest phrase can wrap to (3 on phones, 2 from sm up,
              at leading-tight = 1.25em per line) so the content below the
              hero never shifts while text types and deletes. */}
          <span className="block min-h-[3.75em] sm:min-h-[2.5em]">
            <span className="bg-gradient-accent bg-clip-text text-transparent animate-gradient-x">
              Building {typed}
            </span>
            <span className="type-caret" aria-hidden="true" />
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          5+ years designing and delivering production-grade data platforms on Azure & AWS. Specialized in Databricks, Agentic AI, and large-scale migrations processing millions of records daily.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="#projects" className="bg-accent hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
            View My Work <ArrowRight size={20} />
          </a>
          <a href="#contact" className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 rounded-lg font-semibold transition">
            Get in Touch
          </a>
        </div>
        <div className="flex gap-6 justify-center mb-12">
          <a href="https://github.com/saipavan1925" target="_blank" rel="noopener noreferrer" className="bg-secondary hover:bg-accent p-3 rounded-full transition transform hover:scale-110" title="GitHub">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/saipavanbanala/" target="_blank" rel="noopener noreferrer" className="bg-secondary hover:bg-accent p-3 rounded-full transition transform hover:scale-110" title="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="mailto:bsaipavan98@gmail.com" className="bg-secondary hover:bg-accent p-3 rounded-full transition transform hover:scale-110" title="Email">
            <Mail size={24} />
          </a>
        </div>
        <div className="text-sm text-gray-400 space-y-2">
          <p className="font-semibold text-accent mb-3">Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Azure Databricks', 'PySpark', 'Delta Lake', 'Azure Data Factory', 'Python', 'SQL', 'AWS', 'Agentic AI'].map((tech) => (
              <span key={tech} className="bg-secondary/80 backdrop-blur px-3 py-1 rounded-full text-xs border border-accent/20 hover:border-accent/60 hover:text-light transition">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-500 hover:text-accent transition z-10 hidden md:block"
      >
        <ChevronDown size={26} className="animate-bounce" />
      </a>
    </section>
  );
}
