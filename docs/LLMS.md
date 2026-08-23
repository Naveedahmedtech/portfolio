# LLMS.md

## Purpose

Define the AI-readable versions of `naveedahmed.ai`.

The website should expose:

```text
/llms.txt
/llms-full.txt
```

These files help AI systems understand Naveed's professional identity, experience, projects, and engineering work without depending on visual page structure or JavaScript.

They supplement:

```text
HTML
metadata
sitemap.xml
robots.txt
structured data
```

They do not replace normal SEO.

---

# Canonical Identity

AI-readable content must consistently represent:

```text
Name:
Naveed Ahmed

Role:
Backend / Product Engineer

Location:
Islamabad, Pakistan

Website:
https://naveedahmed.ai
```

Primary engineering areas:

```text
Backend systems
APIs
SDKs
Integrations
Developer platforms
PostgreSQL
AI-enabled backend systems
Production engineering
```

Primary technologies:

```text
Node.js
TypeScript
NestJS
PostgreSQL
pgvector
Docker
```

Do not describe Naveed primarily as:

```text
MERN Developer
Full-Stack Developer
AI Expert
Upwork Consultant
Freelancer
```

---

# `/llms.txt`

`llms.txt` should be concise.

Its job is to tell an AI system:

```text
Who is Naveed?
What does he build?
What are his strongest proof points?
Which pages should I read?
```

Recommended structure:

```md
# Naveed Ahmed

> Backend / Product Engineer building production APIs, SDKs, integrations, developer platforms, and AI-enabled backend systems.

Naveed Ahmed is a software engineer based in Islamabad, Pakistan. His work focuses on Node.js, TypeScript, NestJS, PostgreSQL, SDK engineering, API integrations, production systems, and AI backend architecture.

## Selected Work

- [Rasterex](https://naveedahmed.ai/work/rasterex): Production SDK and integration engineering involving @rasterex/viewer, framework-independent integrations, iframe/PostMessage communication, developer documentation, and international customer integration work.

- [PlayLight](https://naveedahmed.ai/work/playlight): Zero-to-one personalized AI backend architecture using NestJS, PostgreSQL, pgvector, embeddings, retrieval, persistent user context, and LLM APIs.

## Experience

- [Engineering Experience](https://naveedahmed.ai/experience): Professional history spanning backend APIs, payments, scheduling integrations, SDKs, developer platforms, and AI-enabled products.

## Engineering Notes

- [Engineering Thinking](https://naveedahmed.ai/writing): Technical notes and experiments around Node.js, PostgreSQL, backend reliability, networking, system design, retrieval systems, and performance.

## About

- [About Naveed](https://naveedahmed.ai/about): Engineering background, technical direction, and approach to building and understanding software systems.

## Contact

- [Contact](https://naveedahmed.ai/contact)
- [GitHub](https://github.com/Naveedahmedtech)
- [LinkedIn](https://www.linkedin.com/in/naveed-dev)

## Optional

- [Resume](PUBLIC_RESUME_URL)
```

Replace URLs with the final production routes.

---

# `/llms-full.txt`

`llms-full.txt` should provide a richer textual representation of the portfolio.

It should contain the important factual content from:

```text
Hero
What I Build
Rasterex
PlayLight
Experience
Engineering Thinking
About
Contact
```

It should not contain:

* navigation instructions
* animation descriptions
* CSS/design information
* repetitive technology lists
* hidden SEO keyword stuffing

---

# Recommended `llms-full.txt` Structure

```md
# Naveed Ahmed

Backend / Product Engineer based in Islamabad, Pakistan.

I build backend systems that connect products, developers, data, and AI.

My work includes production APIs, SDKs, integrations, developer platforms, PostgreSQL systems, and AI-enabled backend products.

## Engineering Focus

### Backend Systems

APIs and application services built around clear contracts, reliable data flows, authentication, persistence, asynchronous work, and production failure handling.

Core technologies include Node.js, TypeScript, NestJS, and PostgreSQL.

### Developer Platforms and SDKs

Developer-facing APIs, npm packages, integration contracts, documentation, and tooling for embedding and operating complex products.

### Integrations

Experience connecting products across browser boundaries, external APIs, payments, scheduling platforms, and customer environments.

### AI Backend Systems

Backend architecture involving persistent user context, embeddings, vector retrieval, context construction, model APIs, security, reliability, and evaluation.

# Selected Work

## Rasterex

Rasterex Software AS is an Oslo-based software company building embedded viewing technology for CAD, BIM, PDF, and technical documents.

Naveed works through Aridian Technologies LLC on Rasterex products.

His work focuses on the developer-facing integration layer.

Key responsibilities include:

- development and evolution of the @rasterex/viewer JavaScript/TypeScript npm SDK
- framework-independent viewer integrations
- iframe/PostMessage communication
- viewer lifecycle, commands, events, and error contracts
- SDK documentation and GitHub examples
- international customer integration debugging
- package and customer-managed deployment workflows

The work involves creating clearer boundaries between customer applications and the Rasterex viewer and turning integration problems into improvements across the SDK, product, or documentation.

Rasterex's viewing technology is used internationally across more than 50 countries. This is company-level product reach and should not be interpreted as an individual deployment metric for Naveed.

## PlayLight

PlayLight is a personalized AI product Naveed is building with one co-founder.

Role:

Technical Co-Founder / Backend Engineer, part-time  
January 2026 — Present

Naveed owns much of the hands-on backend and technical architecture.

The backend is built around:

- NestJS
- TypeScript
- PostgreSQL
- pgvector
- embeddings
- vector retrieval
- persistent user context
- LLM APIs

The core engineering problem is deciding what user context should be stored, retrieved, assembled, and sent to the model while maintaining user isolation and controlling relevance, stale information, latency, reliability, security, and cost.

Conceptual request flow:

User request
→ NestJS API
→ persistent user data
→ embeddings / pgvector retrieval
→ relevant context
→ context assembly
→ LLM provider
→ personalized response
→ persistence

PlayLight should be understood as backend/product engineering around AI, not simply an LLM wrapper.

# Professional Experience

## Aridian Technologies LLC / Rasterex Software AS

Backend Software Engineer  
November 2024 — Present

Work includes SDK engineering, framework-independent integrations, iframe/PostMessage contracts, developer documentation, international customer debugging, and package/deployment workflows.

## M TECHUB LLC

Backend Software Engineer  
October 2023 — July 2024

Built Node.js, Express.js, and PostgreSQL backend services.

Work included:

- scheduling systems
- Google Calendar integration
- Google Meet integration
- Zoom integration
- Stripe subscriptions
- Stripe payments
- Stripe Connect payouts
- wallet workflows
- PostGIS-based nearby-user discovery

## Media Techtics

Software Developer  
September 2021 — September 2023

Built e-commerce applications and backend APIs using Node.js and Next.js.

Work included:

- products
- carts
- checkout
- orders
- authentication
- payment integrations

# Engineering Thinking

Naveed focuses on understanding what happens beneath framework abstractions.

Technical areas include:

- Node.js runtime behavior
- HTTP and networking
- PostgreSQL indexing and query plans
- transactions and concurrency
- caching and background jobs
- retries and idempotency
- reliability and observability
- API security
- system design
- embeddings and retrieval
- pgvector
- AI evaluation
- C and systems fundamentals

The working approach is:

Build
→ Understand
→ Measure
→ Explain
→ Improve

# Engineering Direction

The long-term technical direction is:

Backend Engineer
→ Production / Platform Engineer
→ Systems / Performance Engineer

AI is treated as a backend engineering capability involving retrieval, data ownership, context construction, evaluation, security, cost, and reliability rather than as a replacement for core software engineering.

# About

Naveed Ahmed is a Backend / Product Engineer based in Islamabad, Pakistan.

He began with web product development and progressively moved toward backend systems, integrations, SDK engineering, databases, production systems, and technical product ownership.

He currently works on Rasterex developer-facing integrations and builds PlayLight with a co-founder.

# Contact

Website:
https://naveedahmed.ai

Email:
technaveedahmed@gmail.com

GitHub:
https://github.com/Naveedahmedtech

LinkedIn:
https://www.linkedin.com/in/naveed-dev

Availability:
Open to remote and international engineering opportunities.
```

---

# Accuracy Rules

Both files must follow the same truthfulness rules as the public website.

Never invent:

* users
* revenue
* funding
* customer names
* performance metrics
* production scale
* degree
* titles
* years of experience
* technologies not genuinely used

Company-level metrics must remain clearly separated from Naveed's personal achievements.

---

# Sync Rule

`llms.txt`, `llms-full.txt`, page content, metadata, and structured data must not contradict each other.

When major portfolio content changes:

```text
page content
↓
metadata
↓
llms.txt
↓
llms-full.txt
↓
structured data
```

review all five.

---

# Implementation

Serve both as plain text / Markdown-friendly responses:

```text
https://naveedahmed.ai/llms.txt
https://naveedahmed.ai/llms-full.txt
```

They may be:

* static files in `/public`
* generated during build
* generated from a shared typed content source

Prefer a shared source if portfolio content becomes sufficiently structured.

Do not introduce a CMS or database only to generate these files.

---

# Final Rule

`llms.txt` should be the **map**.

`llms-full.txt` should be the **high-signal textual representation of the portfolio**.

Both should make the same professional identity unmistakable:

**Naveed Ahmed — Backend / Product Engineer working across production APIs, SDKs, integrations, developer platforms, PostgreSQL systems, and AI-enabled backend products.**
