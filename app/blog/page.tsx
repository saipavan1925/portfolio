import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog - Sai Pavan Banala',
  description:
    'Writing on Azure Databricks, Medallion Architecture, agentic AI for data engineering, and large-scale cloud migrations.',
};

const posts = [
  {
    slug: 'agentic-ai-data-engineering',
    title: 'Agentic AI in Data Engineering: Migrating 90 Stored Procedures in Days',
    excerpt:
      'How LLM-orchestrated Copilot agents converted 90 legacy SQL stored procedures and 20 Alteryx workflows into Databricks-ready Spark SQL at 95% autonomous confidence — and the validation architecture that made it trustworthy.',
    date: 'March 12, 2026',
    readTime: '9 min read',
    tags: ['Agentic AI', 'LLM Orchestration', 'Databricks'],
    accent: 'from-emerald-500 to-teal-400',
  },
  {
    slug: 'medallion-architecture-guide',
    title: 'A Practical Guide to Medallion Architecture on Azure Databricks',
    excerpt:
      'Bronze, Silver, Gold is easy to draw and hard to run. What actually belongs in each layer, where schema enforcement goes, and the reconciliation patterns that keep millions of daily records honest.',
    date: 'January 28, 2026',
    readTime: '12 min read',
    tags: ['Medallion', 'Delta Lake', 'Architecture'],
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    slug: 'azure-databricks-performance-tuning',
    title: 'Cutting Pipeline SLAs from 6 Hours to Under 3',
    excerpt:
      'The partitioning strategies, caching decisions, and cluster capacity tuning that halved runtime on a Fortune 500 credit card portfolio migration — including the changes that did nothing.',
    date: 'November 15, 2025',
    readTime: '10 min read',
    tags: ['PySpark', 'Performance', 'Delta Lake'],
    accent: 'from-amber-500 to-orange-400',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-primary py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Writing</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Data Engineering Blog</h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            Notes from building production data platforms — Databricks, Medallion Architecture,
            agentic AI tooling, and the migrations that taught me the most.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-secondary/60 border border-white/5 rounded-2xl p-8 hover:border-accent/40 transition-all duration-300"
            >
              <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${post.accent} mb-5`} />

              <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} /> {post.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5">{post.excerpt}</p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/80 text-gray-300 px-3 py-1 rounded-full text-xs border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-accent text-sm font-semibold flex items-center gap-1.5">
                  Read <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
