'use client';

import { Bot, Database, LineChart, CreditCard, Shuffle } from 'lucide-react';

const projects = [
  {
    icon: Bot,
    title: 'Agentic Informatica-to-Databricks Migration',
    role: 'Senior Software Engineer · TD Bank',
    gradient: 'from-blue-500 to-cyan-400',
    summary:
      'An agentic AI workflow that parses Informatica XML mapplets and generates column-level SQL prototypes for every target column of a commercial small-business lending data product, where precision of delivered data is business-critical.',
    impact: [
      'Delivered the full Informatica-to-cloud migration to production in under 2 months',
      'Consolidated column-level prototypes into a single validated SQL, converted to Databricks-ready code',
      'Used agentic AI to generate ETL code, author unit and test cases, and deploy to production',
      'Auto-documented the migration, giving engineering and business teams auditable traceability',
    ],
    tech: ['Informatica XML Mapplets', 'GitHub Copilot Agents', 'LLM Orchestration', 'PySpark', 'Spark SQL', 'Azure Databricks', 'Delta Lake'],
  },
  {
    icon: Shuffle,
    title: 'Agentic AI Migration Accelerator (SQL & Alteryx)',
    role: 'Software Engineer · TD Bank',
    gradient: 'from-emerald-500 to-teal-400',
    summary:
      'An accelerator built on LLM-orchestrated GitHub Copilot agents that autonomously converts legacy SQL stored procedures and Alteryx workflows into Databricks-ready Spark SQL — compressing months of manual engineering into days.',
    impact: [
      'Automated conversion of 90 legacy SQL stored procedures and 20 Alteryx workflows',
      '95% autonomous conversion confidence via schema-aware code generation with validation logic',
      'Reduced human review to edge cases only',
      'Established end-to-end data lineage from on-prem sources to Azure targets for compliance teams',
    ],
    tech: ['GitHub Copilot Agents', 'Claude', 'LLM Orchestration', 'Spark SQL', 'Azure Databricks'],
  },
  {
    icon: LineChart,
    title: 'Credit Risk Analytics Engineering',
    role: 'Software Engineer · TD Bank',
    gradient: 'from-amber-500 to-orange-400',
    summary:
      'A production reporting platform for credit risk and compliance teams, replacing manual processes with automated daily delivery on Azure Databricks.',
    impact: [
      'Engineered 60+ production-grade reports using SQL and PySpark on Azure Databricks',
      'Cut report turnaround from hours to minutes with Databricks Workflows and ADF orchestration',
      'Reduced manual intervention by 60% through built-in validation and exception handling',
      'Lowered production incidents with data quality rules, schema enforcement, and audit trails',
    ],
    tech: ['SQL', 'PySpark', 'Azure Databricks', 'Airflow', 'Azure Data Factory'],
  },
  {
    icon: CreditCard,
    title: 'Retail Co-Brand Portfolio Migration (I)',
    role: 'Software Engineer · TD Bank',
    gradient: 'from-violet-500 to-purple-400',
    summary:
      'End-to-end migration of a Fortune 500 retail co-brand credit card portfolio from legacy on-prem SQL to Azure Cloud, staging raw extracts through AWS S3 into Bronze/Silver/Gold Medallion layers.',
    impact: [
      'Processed millions of records per day with zero data loss',
      'Cut pipeline SLAs from 6+ hours to under 3, enabling same-day credit risk reporting',
      'Tuned partitioning strategies, intelligent caching, and cluster capacity on PySpark + Delta Lake',
      'Built metadata-driven ingestion with automated reconciliation and change detection',
    ],
    tech: ['PySpark', 'Delta Lake', 'Azure Data Factory', 'Azure Databricks', 'AWS S3', 'Medallion Architecture'],
  },
  {
    icon: Database,
    title: 'Retail Co-Brand Portfolio Migration (II)',
    role: 'Software Engineer · TD Bank',
    gradient: 'from-rose-500 to-pink-400',
    summary:
      'A second Fortune 500 portfolio migration carrying the added complexity of a simultaneous source system change — a new AWS S3 feed requiring full remapping of every data element.',
    impact: [
      'Designed and validated a comprehensive mapping layer between old and new source schemas',
      'Credit risk and compliance reports produced identical outputs post-migration, no business disruption',
      'Delivered a full audit trail and reconciliation framework traceable to every data element',
      'Partnered with DevOps on Jenkins + Airflow CI/CD, reducing MTTR for production pipeline failures',
    ],
    tech: ['PySpark', 'Delta Lake', 'Azure Data Factory', 'Azure Databricks', 'Schema Remapping', 'Jenkins'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">What I&apos;ve Built</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Five high-impact production systems at TD Bank — agentic AI migrations, credit risk analytics,
            and large-scale on-prem-to-cloud portfolio migrations.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article
                key={project.title}
                className="group bg-secondary/60 border border-white/5 rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                  >
                    <Icon size={26} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-accent2 font-medium mb-4">{project.role}</p>
                    <p className="text-gray-300 leading-relaxed mb-6">{project.summary}</p>

                    <ul className="space-y-2 mb-6">
                      {project.impact.map((item) => (
                        <li key={item} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                          <span className="text-accent2 mt-1 shrink-0">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-primary/80 text-gray-300 px-3 py-1 rounded-full text-xs border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
