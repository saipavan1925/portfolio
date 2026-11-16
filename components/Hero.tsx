'use client';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-tech flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="mb-6 inline-block">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Welcome to my portfolio</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Senior Data Engineer<br />
          <span className="bg-gradient-accent bg-clip-text text-transparent">Building Scalable Cloud Platforms</span>
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
          <a href="https://linkedin.com/in/sai-pavan-banala" target="_blank" rel="noopener noreferrer" className="bg-secondary hover:bg-accent p-3 rounded-full transition transform hover:scale-110" title="LinkedIn">
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
              <span key={tech} className="bg-secondary px-3 py-1 rounded-full text-xs border border-accent/20">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
