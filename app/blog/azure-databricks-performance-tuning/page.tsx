import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Cutting Pipeline SLAs from 6 Hours to Under 3 - Sai Pavan Banala',
  description:
    'Partitioning strategies, caching decisions, and cluster tuning that halved runtime on a Fortune 500 credit card portfolio migration on Azure Databricks.',
};

export default function Post() {
  return (
    <article className="min-h-screen bg-primary py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-accent text-sm mb-10 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to blog
        </Link>

        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 mb-6" />

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
          Cutting Pipeline SLAs from 6 Hours to Under 3
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-white/10">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> November 15, 2025</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> 10 min read</span>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed text-[17px]">
          <p className="text-xl text-gray-200 leading-relaxed">
            A credit card portfolio migration was landing millions of records a day and finishing in just
            over six hours. The business needed same-day credit risk reporting, which meant finishing in
            three. Here is what moved the number, and what I spent time on that turned out not to matter.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Measure before touching anything</h2>
          <p>
            The instinct is to start adding cluster nodes. Resist it for one run and read the Spark UI
            instead. The stage timeline tells you whether you are bound by shuffle, by skew, by small files,
            or simply by doing too much work.
          </p>
          <p>
            In our case the profile was unambiguous: two stages accounted for roughly 70% of wall clock, both
            of them joins, and both showing a handful of tasks running ten times longer than the median.
            That is skew, and no amount of extra hardware fixes skew — you just pay more for the same
            stragglers.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Small files were the quiet tax</h2>
          <p>
            The upstream feed arrived as thousands of small files per day from an S3 landing zone. Spark was
            spending a significant share of its time on file listing and task scheduling overhead rather than
            on actual computation — thousands of tasks each processing a few megabytes.
          </p>
          <p>
            Compaction at the Bronze boundary was the single cheapest win. Delta&apos;s optimize handles this
            directly, and auto-compaction keeps it from regressing:
          </p>
          <pre className="text-sm"><code>{`-- one-time cleanup
OPTIMIZE bronze.transactions
WHERE _ingest_date >= current_date() - 7;

-- keep it from coming back
ALTER TABLE bronze.transactions SET TBLPROPERTIES (
  'delta.autoOptimize.optimizeWrite' = 'true',
  'delta.autoOptimize.autoCompact'   = 'true'
);`}</code></pre>
          <p>
            Target file sizes in the 128MB–1GB range. Smaller and you drown in overhead; much larger and you
            lose parallelism and the ability to prune effectively.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Partitioning: fewer, coarser partitions</h2>
          <p>
            The original design partitioned by date <em>and</em> account segment, which produced a large
            number of tiny partitions. Over-partitioning is a common and expensive mistake — it looks like
            careful design and behaves like fragmentation.
          </p>
          <p>
            We dropped to a single date partition and used Z-ordering for the secondary access pattern,
            which gives you data skipping without the directory explosion:
          </p>
          <pre className="text-sm"><code>{`OPTIMIZE silver.transactions
ZORDER BY (account_id, merchant_id);`}</code></pre>
          <p>
            The rule of thumb that has served me well: partition on the column that appears in nearly every
            query&apos;s filter — usually a date — and only if partitions will hold at least a gigabyte.
            Everything else is a Z-order candidate.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Handling the skew directly</h2>
          <p>
            A small number of high-volume merchant accounts dominated the join keys. Adaptive Query Execution
            handles a lot of this automatically on recent runtimes, and enabling skew join handling cost us
            nothing:
          </p>
          <pre className="text-sm"><code>{`spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")`}</code></pre>
          <p>
            For the dimension joins, broadcasting the smaller side removed the shuffle entirely. Worth
            checking your actual table sizes rather than trusting the default threshold — several of our
            dimensions were comfortably broadcastable and were not being broadcast because statistics were
            stale. Running <code>ANALYZE TABLE</code> fixed that for free.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Caching: useful in exactly one place</h2>
          <p>
            Caching is the most over-applied optimization in Spark. It only pays when a dataset is genuinely
            reused across multiple actions and fits comfortably in memory. We had one such dataset — a
            conformed account dimension referenced by six downstream transformations — and caching it helped
            measurably.
          </p>
          <p>
            Everywhere else, caching made things worse by evicting data the executors actually needed. If
            you cannot name the specific second action that reads the cached frame, do not cache it.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Cluster sizing came last</h2>
          <p>
            Only after the logical work was reduced did cluster configuration become worth tuning. The useful
            changes were unglamorous: fewer, larger workers rather than many small ones (less shuffle across
            the network), autoscaling bounded with a sensible floor so the job did not spend its first minutes
            scaling up, and a runtime upgrade that brought Photon and better AQE behaviour.
          </p>
          <p>
            Had we started here, we would have spent considerably more on compute to run the same inefficient
            plan slightly faster. Tuning the cluster before tuning the query is how cloud bills grow.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">What didn&apos;t help</h2>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-3"><span className="text-accent3 mt-1 shrink-0">▸</span><span>Manually setting <code>spark.sql.shuffle.partitions</code> — AQE coalesces better than a static guess.</span></li>
            <li className="flex gap-3"><span className="text-accent3 mt-1 shrink-0">▸</span><span>Repartitioning defensively before writes, which added a full shuffle to avoid a problem optimized writes already solved.</span></li>
            <li className="flex gap-3"><span className="text-accent3 mt-1 shrink-0">▸</span><span>Rewriting PySpark into Spark SQL for speed. The Catalyst optimizer treats them the same; pick whichever is more readable.</span></li>
          </ul>

          <h2 className="text-2xl font-bold text-white pt-6">Order of operations</h2>
          <p>
            If I were handed the same problem again, I would work it in this order, and I would stop as soon
            as the SLA was met:
          </p>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Read the Spark UI and identify the two stages that dominate wall clock.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Fix file sizes. Compaction is cheap and almost always helps.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Simplify partitioning; move secondary keys to Z-order.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Enable AQE and skew handling; refresh statistics so broadcasts trigger.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Cache only datasets with a named second reader.</span></li>
            <li className="flex gap-3"><span className="text-accent2 mt-1 shrink-0">▸</span><span>Only then resize the cluster.</span></li>
          </ul>

          <p className="pt-4">
            Six hours to under three, and the compute bill went down rather than up — because most of the
            gain came from doing less work, not from buying more machines.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-white/10">
          <p className="text-gray-400 mb-4">Fighting a pipeline SLA? Happy to compare notes.</p>
          <Link href="/#contact" className="bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold inline-block transition">
            Get in touch
          </Link>
        </div>
      </div>
    </article>
  );
}
