import Link from 'next/link';
import ReadingProgress from '@/components/ReadingProgress';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'A Practical Guide to Medallion Architecture - Sai Pavan Banala',
  description:
    'What actually belongs in Bronze, Silver, and Gold on Azure Databricks, where schema enforcement goes, and the reconciliation patterns that keep millions of daily records honest.',
};

export default function Post() {
  return (
    <article className="min-h-screen bg-primary py-20 px-6">
      <ReadingProgress />
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-accent text-sm mb-10 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to blog
        </Link>

        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-6" />

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
          A Practical Guide to Medallion Architecture on Azure Databricks
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-white/10">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> January 28, 2026</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> 12 min read</span>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed text-[17px]">
          <p className="text-xl text-gray-200 leading-relaxed">
            Bronze, Silver, Gold is three boxes and two arrows. Every vendor diagram makes it look settled.
            The hard part is not the picture — it is deciding what belongs in each layer when a real source
            system starts sending you malformed dates at 2am.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Bronze: resist the urge to fix anything</h2>
          <p>
            Bronze is the landing zone. Raw data, as it arrived, with provenance attached. The discipline here
            is negative — it is about what you <em>don&apos;t</em> do. No type coercion, no deduplication,
            no business rules, no dropping of bad rows.
          </p>
          <p>
            This feels wrong the first time. You can see the broken record and you have the fix right there.
            Do not apply it in Bronze. The moment Bronze stops being a faithful copy of the source, you lose
            your ability to replay. And you will need to replay — because in six months you will discover a
            transformation bug and need to rebuild Silver from scratch without going back to a source system
            that has since been decommissioned.
          </p>
          <p>What Bronze <em>should</em> add is metadata about the arrival itself:</p>
          <pre className="text-sm"><code>{`bronze.transactions
  ├─ <source columns, original types, unmodified>
  ├─ _ingest_timestamp    timestamp
  ├─ _source_file         string
  ├─ _batch_id            string
  └─ _ingest_date         date      -- partition key`}</code></pre>
          <p>
            Partition Bronze by ingestion date, not by business date. Business dates are untrustworthy at this
            stage, and ingestion date is what you need when you are answering &quot;what did we receive on the
            day the numbers went wrong?&quot;
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Silver: where the real work happens</h2>
          <p>
            Silver is cleansed, conformed, deduplicated, and typed. This is the layer most teams
            under-invest in and later regret. If Silver is good, Gold is almost trivial. If Silver is weak,
            you will find the same cleanup logic copy-pasted across fifteen Gold tables, each drifting from
            the others.
          </p>
          <p>Silver is where schema enforcement belongs. Delta Lake gives you this directly:</p>
          <pre className="text-sm"><code>{`(df.write
   .format("delta")
   .mode("append")
   .option("mergeSchema", "false")   # fail loudly on drift
   .saveAsTable("silver.transactions"))`}</code></pre>
          <p>
            Set <code>mergeSchema</code> to false in Silver and let writes fail when the source changes shape.
            An alert at 2am is unpleasant; silently absorbing a renamed column and serving wrong numbers for a
            quarter is much worse. Schema evolution should be a reviewed decision, not an automatic one.
          </p>
          <p>The deduplication pattern that holds up under late-arriving data:</p>
          <pre className="text-sm"><code>{`from pyspark.sql import Window
from pyspark.sql import functions as F

w = (Window
     .partitionBy("transaction_id")
     .orderBy(F.col("source_updated_at").desc(),
              F.col("_ingest_timestamp").desc()))

silver = (bronze
          .withColumn("_rn", F.row_number().over(w))
          .filter(F.col("_rn") == 1)
          .drop("_rn"))`}</code></pre>
          <p>
            Note the two-level ordering. Sorting only by the source timestamp breaks when a source system
            re-sends a record with an identical timestamp; falling back to ingestion time makes the result
            deterministic.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Gold: shaped for a consumer, not for elegance</h2>
          <p>
            Gold is business-level aggregation — the tables analysts and dashboards actually query. The
            temptation is to build one beautiful, normalized Gold model that serves everyone. Resist it.
            Gold tables should be denormalized and purpose-built. It is entirely reasonable to have three
            Gold tables covering overlapping data if three teams ask three different questions.
          </p>
          <p>
            Duplication in Gold is cheap. Contention over a single shared model is expensive, because every
            change requires consensus from every consumer.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Reconciliation: the part nobody puts in the diagram</h2>
          <p>
            Running millions of records daily, &quot;the pipeline succeeded&quot; is not the same as
            &quot;the data is right.&quot; A job can complete happily having processed a truncated file.
            Every layer boundary needs a reconciliation check that runs as part of the pipeline, not as a
            separate report somebody reads on Thursdays.
          </p>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span><strong className="text-white">Count reconciliation</strong> — source rows versus Bronze rows per batch, exact match expected.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span><strong className="text-white">Checksum reconciliation</strong> — sums of key financial columns carried through Bronze → Silver → Gold. Any divergence is explained by a documented rule or it is a bug.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span><strong className="text-white">Volume anomaly detection</strong> — today&apos;s row count against a trailing average. A 40% drop usually means a partial file, not a quiet business week.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span><strong className="text-white">Referential checks</strong> — orphaned foreign keys surfacing at the Silver boundary, where you can still trace them back.</span></li>
          </ul>
          <p>
            Write these as pipeline tasks that fail the run. A check that only logs a warning is a check
            nobody will see.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Metadata-driven ingestion</h2>
          <p>
            Once you are past roughly ten source tables, hand-written notebooks per table stop scaling. The
            move is to drive ingestion from a configuration table — source location, format, target, partition
            keys, quality rules, SLA — and run one parameterized pipeline over it.
          </p>
          <p>
            The payoff is onboarding time. Adding a new source becomes a configuration row and a review,
            measured in days rather than weeks, and every new source inherits the validation and audit
            behaviour of every existing one rather than reimplementing it.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">The short version</h2>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Bronze is immutable and boring. Keep it that way so you can always replay.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Silver carries the weight. Enforce schema, deduplicate deterministically, conform types once.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Gold serves consumers. Denormalize freely; duplication beats coordination overhead.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Reconcile at every boundary, and make failures fail the run.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Drive ingestion from metadata before you have fifty bespoke notebooks.</span></li>
          </ul>
        </div>

        <div className="mt-16 pt-10 border-t border-white/10">
          <p className="text-gray-400 mb-4">Building a lakehouse and want a second opinion on the layout?</p>
          <Link href="/#contact" className="bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold inline-block transition">
            Get in touch
          </Link>
        </div>
      </div>
    </article>
  );
}
