'use client';

import { Cloud, Server, Code2, Layers, GitBranch, Sparkles, BarChart3, Award } from 'lucide-react';
import Reveal from './Reveal';

const skillGroups = [
  {
    icon: Cloud,
    title: 'Azure & Databricks',
    color: 'text-blue-400',
    skills: ['Azure Databricks', 'Delta Lake', 'Azure Data Factory (ADF)', 'ADLS Gen2', 'Databricks Workflows', 'Azure Synapse'],
  },
  {
    icon: Server,
    title: 'AWS',
    color: 'text-orange-400',
    skills: ['S3', 'Redshift', 'EMR'],
  },
  {
    icon: Code2,
    title: 'Languages & Processing',
    color: 'text-emerald-400',
    skills: ['Python', 'SQL', 'PySpark', 'Spark SQL', 'Apache Spark', 'Kafka', 'Spark Streaming'],
  },
  {
    icon: Layers,
    title: 'Data Engineering',
    color: 'text-violet-400',
    skills: [
      'Medallion Architecture (Bronze/Silver/Gold)',
      'Informatica PowerCenter',
      'Metadata-Driven Ingestion',
      'Batch & Near-Real-Time Pipelines',
      'dbt',
      'Data Quality & Reconciliation',
      'Unit Testing',
      'Schema Evolution',
      'Audit & Compliance',
    ],
  },
  {
    icon: GitBranch,
    title: 'Orchestration & DevOps',
    color: 'text-cyan-400',
    skills: ['Apache Airflow', 'Jenkins', 'CI/CD', 'Git'],
  },
  {
    icon: Sparkles,
    title: 'Generative AI',
    color: 'text-amber-400',
    skills: [
      'Agentic AI',
      'LLM Orchestration',
      'GitHub Copilot Agents',
      'Claude',
      'Prompt Engineering',
      'Automated Code Generation',
      'Data Lineage Automation',
    ],
  },
  {
    icon: BarChart3,
    title: 'Databases & BI',
    color: 'text-rose-400',
    skills: ['Databricks SQL', 'SQL Server', 'Oracle', 'PostgreSQL', 'Power BI'],
  },
];

const certifications = ['Databricks Lakehouse Fundamentals', 'AWS Certified Data Engineer – Associate'];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Toolbox</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Technical Skills</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The stack I use to design, build, and operate cloud-native data platforms end to end.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={(i % 3) * 80} className="h-full">
                <div className="h-full bg-primary/70 border border-white/5 rounded-2xl p-6 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon size={22} className={group.color} />
                    <h3 className="text-lg font-bold">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-secondary text-gray-300 px-3 py-1.5 rounded-lg text-xs border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={80} className="h-full">
            <div className="h-full bg-gradient-accent/10 border border-accent/30 rounded-2xl p-6 bg-primary/70 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <Award size={22} className="text-accent3" />
                <h3 className="text-lg font-bold">Certifications</h3>
              </div>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert} className="flex gap-3 text-sm text-gray-200">
                    <span className="text-accent3 shrink-0">★</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
