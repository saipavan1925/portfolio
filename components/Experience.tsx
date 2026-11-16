'use client';

import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

const roles = [
  {
    title: 'Senior Software Engineer (Data Engineering)',
    company: 'TD Bank | Hexaware Technologies',
    location: 'New Jersey',
    period: 'Jul 2026 – Present',
    current: true,
    points: [
      'Delivered 5 high-impact projects spanning agentic AI-driven migrations, credit risk analytics engineering, and two large-scale on-prem-to-cloud credit card portfolio migrations for Fortune 500 retail co-brand portfolios.',
      'Architected an agentic AI workflow parsing Informatica XML mapplets into column-level SQL prototypes for a commercial small-business lending data product.',
      'Took the end-to-end Informatica-to-cloud migration to production in under 2 months, reducing dependency on the on-prem warehouse.',
    ],
  },
  {
    title: 'Software Engineer (Data Engineering)',
    company: 'TD Bank | Hexaware Technologies',
    location: 'New Jersey',
    period: 'Jul 2024 – Jun 2026',
    current: false,
    points: [
      'Built an agentic AI accelerator that autonomously converted 90 legacy SQL stored procedures and 20 Alteryx workflows to Databricks-ready Spark SQL at 95% conversion confidence.',
      'Engineered 60+ production-grade reports for credit risk and compliance teams, cutting turnaround from hours to minutes and manual intervention by 60%.',
      'Led two Fortune 500 retail co-brand portfolio migrations into Bronze/Silver/Gold Medallion layers, processing millions of records daily with zero data loss and cutting SLAs from 6+ hours to under 3.',
      'Implemented CI/CD via Jenkins and Airflow with DevOps, reducing MTTR for production pipeline failures.',
    ],
  },
  {
    title: 'Senior Systems Engineer',
    company: 'Infosys Ltd',
    location: 'India',
    period: 'Aug 2021 – Jun 2022',
    current: false,
    points: [
      'Reduced data processing errors by 50% by re-engineering PySpark ETL pipelines with automated validation, monitoring, and alerting for supply-chain forecasting models.',
      'Designed and deployed forecasting and analytical models on Azure Databricks, integrating outputs into the enterprise data warehouse for regional demand planning.',
      'Accelerated new data source onboarding from weeks to days with reusable ADF and Delta Lake ingestion workflows.',
      'Cut cloud costs by tuning ADLS storage layouts, Delta Lake configurations, and Databricks cluster settings on high-volume workloads.',
    ],
  },
  {
    title: 'Systems Engineer',
    company: 'Infosys Ltd',
    location: 'India',
    period: 'Sep 2019 – Aug 2021',
    current: false,
    points: [
      'Built secure automated ingestion frameworks for encrypted enterprise sources (SFTP/FTP), onboarding millions of records daily under enterprise security and compliance requirements.',
      'Implemented data validation, structured logging, and error-handling frameworks across dev, QA, and production.',
      'Developed Python-based transformation engines converting raw inbound files into analytics-ready datasets.',
      'Built SQL Server staging and curated data models that became the foundation for the demand planning platform.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-primary">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Career</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            5+ years building production data platforms across banking and supply chain.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-[10rem] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent2 to-transparent hidden md:block" />

          <div className="space-y-10">
            {roles.map((role) => (
              <div key={role.title + role.period} className="md:flex md:gap-8 relative">
                <div className="md:w-36 shrink-0 md:text-right pt-1">
                  <span className="text-xs font-semibold text-accent2 leading-relaxed">{role.period}</span>
                </div>

                <div className="hidden md:block absolute left-[10rem] top-2 -translate-x-1/2">
                  <span
                    className={`block w-3 h-3 rounded-full ring-4 ring-primary ${
                      role.current ? 'bg-accent2 animate-pulse' : 'bg-accent'
                    }`}
                  />
                </div>

                <div className="flex-1 bg-secondary/60 border border-white/5 rounded-2xl p-6 hover:border-accent/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Briefcase size={18} className="text-accent" />
                    <h3 className="text-xl font-bold">{role.title}</h3>
                    {role.current && (
                      <span className="bg-accent2/20 text-accent2 text-xs font-semibold px-2.5 py-1 rounded-full border border-accent2/30">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    {role.company}
                    <span className="text-gray-600">·</span>
                    <MapPin size={13} /> {role.location}
                  </p>
                  <ul className="space-y-2.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                        <span className="text-accent mt-1 shrink-0">▸</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-tech border border-accent/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <GraduationCap size={28} className="text-accent3 shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">M.S., Business Analytics and Information Systems</h3>
              <p className="text-gray-300">University of South Florida</p>
              <p className="text-sm text-accent2 mt-2">August 2022 – May 2024 · GPA 3.9 / 4.0</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
