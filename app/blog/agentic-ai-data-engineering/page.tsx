import Link from 'next/link';
import ReadingProgress from '@/components/ReadingProgress';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Agentic AI in Data Engineering - Sai Pavan Banala',
  description:
    'How LLM-orchestrated Copilot agents converted 90 legacy SQL stored procedures and 20 Alteryx workflows into Databricks-ready Spark SQL at 95% autonomous confidence.',
};

export default function Post() {
  return (
    <article className="min-h-screen bg-primary py-20 px-6">
      <ReadingProgress />
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-accent text-sm mb-10 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to blog
        </Link>

        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 mb-6" />

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
          Agentic AI in Data Engineering: Migrating 90 Stored Procedures in Days
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-white/10">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> March 12, 2026</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> 9 min read</span>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed text-[17px]">
          <p className="text-xl text-gray-200 leading-relaxed">
            Legacy migration work is the least glamorous thing in data engineering and the most expensive.
            A bank accumulates hundreds of stored procedures and desktop workflows over a decade, each one
            encoding business logic nobody fully remembers. Rewriting them by hand is slow, error-prone,
            and very hard to staff. We replaced most of that effort with a fleet of agents.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">The problem we actually had</h2>
          <p>
            Our target was 90 legacy SQL stored procedures and 20 Alteryx workflows feeding credit risk
            reporting. The destination was Databricks — Spark SQL running over Delta Lake. The naive estimate
            for a manual rewrite was several engineer-months, and the real cost was worse than the number
            suggested: every manual rewrite is a fresh opportunity to silently change a join, drop a filter,
            or round a number differently. On credit risk data, a silent change is the expensive kind.
          </p>
          <p>
            What made this tractable for an LLM is that it is fundamentally a translation task with a
            checkable answer. We were not asking a model to invent business logic. We were asking it to
            re-express logic that already existed, in a dialect we could test against the original.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Why agents and not just prompts</h2>
          <p>
            A single prompt per procedure fails for an obvious reason: the model has no idea what the tables
            look like. Stored procedures reference dozens of objects, some of which are themselves views over
            other views. A one-shot translation hallucinates column names with total confidence.
          </p>
          <p>
            The fix was to give the agent tools and let it work the problem in steps. Each agent could
            inspect the source schema, resolve dependencies, read the procedure, emit candidate Spark SQL,
            run it against a sample, and read the error back. That loop — generate, execute, observe, repair —
            is what moved accuracy from &quot;interesting demo&quot; to something we could put in front of
            a compliance team.
          </p>

          <pre className="text-sm"><code>{`Agent loop (simplified)

  1. resolve_dependencies(proc)      -> table + view graph
  2. fetch_schema(tables)            -> typed column catalog
  3. generate_spark_sql(proc, schema)-> candidate translation
  4. dry_run(candidate)              -> errors | row sample
  5. if errors: repair(candidate, errors) -> goto 4
  6. reconcile(candidate, source)    -> row + aggregate diff
  7. if diff: flag_for_human()
     else:    emit + generate_tests()`}</code></pre>

          <h2 className="text-2xl font-bold text-white pt-6">Schema-aware generation</h2>
          <p>
            The single highest-leverage change was injecting the real schema into the generation step. Not a
            description of the schema — the actual typed column catalog for every object in the dependency
            graph, pulled live. Hallucinated column names essentially disappeared once the model could see
            the columns.
          </p>
          <p>
            The second change was giving the agent the dialect differences explicitly. SQL Server and Spark
            SQL disagree about date arithmetic, string functions, null ordering, and implicit casting. Left
            to infer these, the model produces code that parses and returns subtly wrong answers. Given a
            short, concrete mapping of the traps, it produces code that is right the first time far more often.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Validation is the whole product</h2>
          <p>
            We reached 95% autonomous conversion confidence. The number people usually ask about is the 95%.
            The number that mattered to us was the other 5% — specifically, our ability to <em>identify</em>
            which 5%. A migration tool that is 95% correct and cannot tell you which parts are wrong is worse
            than useless, because it moves the failure from your build to your regulator.
          </p>
          <p>So every translation had to clear three gates before it was accepted:</p>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span><strong className="text-white">Execution</strong> — the generated Spark SQL runs without error against real schemas.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span><strong className="text-white">Reconciliation</strong> — row counts and aggregate checksums match the source procedure output on the same input window.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span><strong className="text-white">Generated tests</strong> — the agent authors unit tests covering null handling, boundary dates, and edge-case joins, which then live on in the repo.</span></li>
          </ul>
          <p>
            Anything failing a gate was routed to a human with the diff attached. That is the real output of
            the system: not &quot;here is your code&quot; but &quot;here is your code, here is the evidence it
            is correct, and here are the four cases where I am not sure.&quot;
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Lineage as a side effect</h2>
          <p>
            An unplanned benefit: because the agents had already resolved every dependency to translate the
            logic, we had a complete source-to-target map almost for free. We captured it and handed compliance
            teams end-to-end lineage from on-prem systems to Azure targets — something that had previously been
            maintained by hand in a spreadsheet, and was always out of date.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">What I would tell someone starting this</h2>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Pick a domain where correctness is checkable by machine. Translation qualifies; greenfield design does not.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Spend your effort on the validation harness, not on prompt wording. The harness is what earns trust.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Give agents live schema access. Context beats cleverness every time.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Design for the failures. Routing uncertain cases to humans with good diffs is a feature, not an admission of defeat.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Capture the metadata the agents generate along the way. Lineage, documentation, and tests are often worth as much as the migration itself.</span></li>
          </ul>

          <p className="pt-4">
            Months of manual engineering became days of supervised automation. The engineering judgment did
            not disappear — it moved from typing out translations to designing the system that checks them.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-white/10">
          <p className="text-gray-400 mb-4">Working on something similar? I&apos;d like to hear about it.</p>
          <Link href="/#contact" className="bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold inline-block transition">
            Get in touch
          </Link>
        </div>
      </div>
    </article>
  );
}
