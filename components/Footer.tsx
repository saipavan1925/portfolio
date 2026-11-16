'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-white/5 pt-14 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              saipavan.dev
            </Link>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-sm">
              Senior Data Engineer building scalable, cloud-native data platforms on Azure and AWS —
              Databricks, Delta Lake, and agentic AI tooling.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://github.com/saipavan1925"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-accent p-2.5 rounded-lg transition"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/sai-pavan-banala"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-accent p-2.5 rounded-lg transition"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:bsaipavan98@gmail.com"
                className="bg-primary hover:bg-accent p-2.5 rounded-lg transition"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Navigate</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/#projects" className="hover:text-accent transition">Projects</Link></li>
              <li><Link href="/#skills" className="hover:text-accent transition">Skills</Link></li>
              <li><Link href="/#experience" className="hover:text-accent transition">Experience</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition">Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Focus Areas</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>Azure Databricks</li>
              <li>Medallion Architecture</li>
              <li>Agentic AI &amp; LLM Orchestration</li>
              <li>Cloud Migrations</li>
              <li>Data Quality &amp; Lineage</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sai Pavan Banala. Built with Next.js &amp; Tailwind CSS.
          </p>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition"
          >
            Back to top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
