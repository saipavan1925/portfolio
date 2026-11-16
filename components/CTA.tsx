'use client';

import { Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-tech">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">Let&apos;s Build Something</h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          I&apos;m open to senior data engineering roles working on cloud-native platforms, large-scale
          migrations, and agentic AI tooling. If that sounds like your team, I&apos;d love to talk.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="mailto:bsaipavan98@gmail.com"
            className="bg-accent hover:bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105"
          >
            <Mail size={20} /> Email Me
          </a>
          <a
            href="https://linkedin.com/in/sai-pavan-banala"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
          >
            <Linkedin size={20} /> Connect on LinkedIn
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-left">
          <a
            href="mailto:bsaipavan98@gmail.com"
            className="bg-secondary/60 border border-white/5 rounded-xl p-5 hover:border-accent/40 transition"
          >
            <Mail size={20} className="text-accent mb-3" />
            <p className="text-xs text-gray-400 mb-1">Email</p>
            <p className="text-sm font-medium break-all">bsaipavan98@gmail.com</p>
          </a>

          <a
            href="tel:+18135731604"
            className="bg-secondary/60 border border-white/5 rounded-xl p-5 hover:border-accent/40 transition"
          >
            <Phone size={20} className="text-accent2 mb-3" />
            <p className="text-xs text-gray-400 mb-1">Phone</p>
            <p className="text-sm font-medium">813-573-1604</p>
          </a>

          <div className="bg-secondary/60 border border-white/5 rounded-xl p-5">
            <MapPin size={20} className="text-accent3 mb-3" />
            <p className="text-xs text-gray-400 mb-1">Location</p>
            <p className="text-sm font-medium">New Jersey, USA</p>
          </div>
        </div>

        <div className="flex gap-5 justify-center mt-10">
          <a
            href="https://github.com/saipavan1925"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-accent p-3 rounded-full transition transform hover:scale-110"
            title="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com/in/sai-pavan-banala"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-accent p-3 rounded-full transition transform hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:bsaipavan98@gmail.com"
            className="bg-secondary hover:bg-accent p-3 rounded-full transition transform hover:scale-110"
            title="Email"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
