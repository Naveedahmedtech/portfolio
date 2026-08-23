const investigations = [
  {
    category: "Performance",
    title: "Understanding Node.js behavior under load",
    summary:
      "I use controlled load tests to study how concurrency, blocking work, external dependencies, and event-loop behavior affect API latency. The goal is to identify the actual bottleneck from measurements rather than optimize based on assumptions.",
    topics: "Node.js · HTTP · Event Loop · Latency",
    visual: "load",
    status: "Active investigation",
  },
  {
    category: "PostgreSQL",
    title: "Validating database performance with query plans",
    summary:
      "I am working through PostgreSQL access patterns using EXPLAIN ANALYZE, indexes, transaction behavior, and realistic datasets to understand why a query is slow before changing the schema or adding an index.",
    topics: "PostgreSQL · Indexes · EXPLAIN ANALYZE · Query Plans",
    visual: "query",
    status: "Active investigation",
  },
  {
    category: "Reliability",
    title: "What should happen when part of the system fails?",
    summary:
      "I study failure behavior around timeouts, retries, duplicate work, idempotency, background jobs, and unavailable dependencies by reproducing those conditions and reasoning about how the system should recover.",
    topics: "Timeouts · Retries · Idempotency · Failure Modes",
    visual: "failure",
    status: "Applied in PlayLight",
  },
  {
    category: "AI Systems",
    title: "Evaluating retrieval instead of assuming personalization works",
    summary:
      "In PlayLight, I am working on how user-scoped retrieval, embeddings, context selection, and context limits affect model behavior. The next step is making retrieval quality measurable instead of treating a plausible response as proof that the system works.",
    topics: "Embeddings · pgvector · Retrieval · Evaluation",
    visual: "retrieval",
    status: "Applied in PlayLight",
  },
] as const;

function ArtifactVisual({
  type,
}: {
  type: (typeof investigations)[number]["visual"];
}) {
  if (type === "load") {
    return (
      <div className="artifact-visual artifact-load">
        <span />
        <span />
        <span />
        <i />
      </div>
    );
  }

  if (type === "query") {
    return (
      <div className="artifact-visual artifact-query">
        <span>Query</span>
        <i>Planner</i>
        <b>Execution Plan</b>
      </div>
    );
  }

  if (type === "failure") {
    return (
      <div className="artifact-visual artifact-failure">
        <span>Request</span>
        <i>Dependency ✓</i>
        <i>Dependency ✕</i>
        <i>Recovery →</i>
      </div>
    );
  }

  return (
    <div className="artifact-visual artifact-retrieval">
      <span>User Context</span>
      <i>Retrieval</i>
      <b>Selected Context</b>
      <em>Model</em>
    </div>
  );
}

export function EngineeringThinkingSection() {
  return (
    <section
      className="thinking-section section section-border"
      id="engineering"
      data-section="engineering"
      aria-labelledby="thinking-title"
    >
      <div className="thinking-heading" data-reveal>
        <p className="eyebrow">Engineering Practice</p>

        <h2 id="thinking-title">
          Understanding systems by measuring, breaking, and tracing them.
        </h2>
      </div>

      <p
        className="section-intro thinking-intro"
        data-reveal
        data-reveal-delay="1"
      >
        I use production work, controlled experiments, architecture
        tracing, and failure analysis to deepen my understanding of the
        systems I work with. My current focus is Node.js runtime behavior,
        PostgreSQL performance, backend reliability, and retrieval systems
        used in PlayLight.
      </p>

      <article className="featured-artifact" data-reveal>
        <div className="featured-artifact-copy">
          <p className="eyebrow">System walkthrough</p>

          <h3>Tracing a PlayLight AI request end to end</h3>

          <p>
            A walkthrough of how a PlayLight request moves through the
            backend: from the NestJS API into user-scoped data access,
            retrieval and context assembly, through the model boundary,
            and back into application state.
          </p>

          <span className="metadata">
            NestJS · PostgreSQL · pgvector · Retrieval · LLM APIs
          </span>
        </div>

        <ol
          className="featured-flow"
          aria-label="PlayLight request flow"
        >
          {[
            "Request",
            "NestJS",
            "User Data",
            "Retrieval",
            "Context",
            "Model",
            "Response",
          ].map((node, index) => (
            <li
              key={node}
              className={
                index === 1 || index === 5
                  ? "is-boundary"
                  : undefined
              }
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{node}</b>
            </li>
          ))}
        </ol>
      </article>

      <div className="artifact-grid">
        {investigations.map((investigation, index) => (
          <article
            className="artifact-card"
            data-reveal
            key={investigation.title}
          >
            <div className="artifact-card-top">
              <p className="eyebrow">{investigation.category}</p>

              <span className="artifact-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3>{investigation.title}</h3>

            <p>{investigation.summary}</p>

            <ArtifactVisual type={investigation.visual} />

            <div className="artifact-meta">
              <span className="metadata">
                {investigation.topics}
              </span>

              <span className="metadata">
                {investigation.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}