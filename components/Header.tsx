'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur border-b border-secondary">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
          saipavan.dev
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link href="#projects" className="text-light hover:text-accent transition">Projects</Link>
          <Link href="#skills" className="text-light hover:text-accent transition">Skills</Link>
          <Link href="#experience" className="text-light hover:text-accent transition">Experience</Link>
          <Link href="/blog" className="text-light hover:text-accent transition">Blog</Link>
          <a href="#contact" className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-secondary border-b border-secondary p-6 flex flex-col gap-4 md:hidden">
            <Link href="#projects" onClick={() => setIsOpen(false)} className="text-light hover:text-accent">Projects</Link>
            <Link href="#skills" onClick={() => setIsOpen(false)} className="text-light hover:text-accent">Skills</Link>
            <Link href="#experience" onClick={() => setIsOpen(false)} className="text-light hover:text-accent">Experience</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="text-light hover:text-accent">Blog</Link>
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-accent text-white px-4 py-2 rounded-lg text-center">Contact</a>
          </div>
        )}
      </nav>
    </header>
  );
}
