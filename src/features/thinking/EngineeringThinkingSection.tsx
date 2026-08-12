const artifacts = [
  {
    category: "Performance",
    title: "What happens when a Node.js server is under load?",
    summary: "Small benchmarking experiments focused on latency, concurrency, event-loop behavior, blocking work, and observable bottlenecks instead of benchmark numbers without a hypothesis.",
    topics: "Node.js · HTTP · Event Loop · Latency",
    visual: "load",
  },
  {
    category: "PostgreSQL",
    title: "Indexes should follow access patterns",
    summary: "Notes and experiments around query plans, index choices, transaction behavior, and using EXPLAIN ANALYZE to validate assumptions instead of treating indexes as automatic improvements.",
    topics: "PostgreSQL · Indexes · EXPLAIN ANALYZE · Query Plans",
    visual: "query",
  },
  {
    category: "Reliability",
    title: "Designing for failure instead of only the happy path",
    summary: "Practical notes on timeouts, retries, idempotency, graceful failure, logging, observability, and what should happen when a dependency becomes unavailable.",
    topics: "Timeouts · Retries · Idempotency · Failure Modes",
    visual: "failure",
  },
  {
    category: "AI Systems",
    title: "Why retrieval quality matters more than simply adding more context",
    summary: "Exploring user-scoped retrieval, embeddings, relevance, stale context, context budgets, and how retrieval quality affects personalization, cost, and model behavior.",
    topics: "Embeddings · pgvector · Retrieval · Evaluation",
    visual: "retrieval",
  },
] as const;

function ArtifactVisual({ type }: { type: (typeof artifacts)[number]["visual"] }) {
  if (type === "load") {
    return <div className="artifact-visual artifact-load"><span /><span /><span /><i /></div>;
  }
  if (type === "query") {
    return <div className="artifact-visual artifact-query"><span>Query</span><i>Planner</i><b>Index Scan</b></div>;
  }
  if (type === "failure") {
    return <div className="artifact-visual artifact-failure"><span>API</span><i>Database&nbsp; ✓</i><i>External API&nbsp; ✕</i><i>Recovery&nbsp; →</i></div>;
  }
  return <div className="artifact-visual artifact-retrieval"><span>User History</span><i>Retrieval</i><b>Relevant Context</b><em>LLM</em></div>;
}

export function EngineeringThinkingSection() {
  return (
    <section className="thinking-section section section-border" id="thinking" data-section="thinking" aria-labelledby="thinking-title">
      <div className="thinking-heading" data-reveal>
        <p className="eyebrow">Engineering Thinking</p>
        <h2 id="thinking-title">I like understanding what happens beneath the abstraction.</h2>
      </div>
      <p className="section-intro thinking-intro" data-reveal data-reveal-delay="1">
        I use real systems, small experiments, architecture notes, and failure analysis to understand the technologies I work with — from Node.js runtime behavior and PostgreSQL query plans to retrieval systems, networking, reliability, and production debugging.
      </p>

      <article className="featured-artifact" data-reveal>
        <div className="featured-artifact-copy">
          <p className="eyebrow">Architecture</p>
          <h3>Tracing a PlayLight AI request end to end</h3>
          <p>A system walkthrough from the incoming NestJS request through PostgreSQL, retrieval, context assembly, the model boundary, persistence, and failure paths.</p>
          <span className="metadata">NestJS · PostgreSQL · pgvector · Retrieval · LLM APIs</span>
        </div>
        <div className="featured-flow" aria-label="PlayLight request flow">
          {['Request', 'NestJS', 'Data', 'Retrieval', 'Context', 'LLM', 'Response'].map((node, index, nodes) => (
            <span key={node}><b>{node}</b>{index < nodes.length - 1 && <i aria-hidden="true">↓</i>}</span>
          ))}
        </div>
      </article>

      <div className="artifact-grid">
        {artifacts.map((artifact) => (
          <article className="artifact-card" data-reveal key={artifact.title}>
            <p className="eyebrow">{artifact.category}</p>
            <h3>{artifact.title}</h3>
            <p>{artifact.summary}</p>
            <ArtifactVisual type={artifact.visual} />
            <span className="metadata">{artifact.topics}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
