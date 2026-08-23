# PLAYLIGHT_SECTION.md

## Purpose

PlayLight is the second major proof section.

Rasterex demonstrates:

**production engineering inside an established product**

PlayLight demonstrates:

**zero-to-one technical ownership**

The visitor should understand that Naveed is not simply integrating an LLM API.

He is designing the backend system around:

* persistent user context
* PostgreSQL
* pgvector
* embeddings
* retrieval
* context construction
* LLM integration
* user isolation
* reliability
* cost
* security
* evaluation

---

# Section Position

Homepage progression:

```text
Hero
↓
What I Build
↓
Rasterex
↓
PlayLight
↓
Experience
```

Rasterex answers:

> Can Naveed work on production systems?

PlayLight answers:

> Can Naveed make architecture decisions and build a product from zero?

---

# Section Eyebrow

Recommended:

```text
ZERO-TO-ONE PRODUCT ENGINEERING
```

Alternative:

```text
TECHNICAL OWNERSHIP
```

Prefer:

**ZERO-TO-ONE PRODUCT ENGINEERING**

---

# Product Label

```text
PLAYLIGHT
PERSONALIZED AI PRODUCT
```

Role metadata:

```text
Technical Co-Founder / Backend Engineer
Part-time · Jan 2026 — Present
```

Do not lead with:

```text
CTO
AI Founder
AI Expert
```

The architecture should prove the ownership.

---

# Main Heading

Recommended:

# Building a backend that gives AI persistent, user-specific context.

Alternative:

# Designing the system behind personalized AI interactions.

Preferred:

**Building a backend that gives AI persistent, user-specific context.**

It immediately introduces the actual technical problem.

---

# Intro Copy

Recommended:

> PlayLight is a personalized AI product I’m building with my co-founder. I own much of the backend and technical architecture, including how user data is stored, retrieved, transformed into model context, and kept isolated across users.

Then:

> The challenge is not simply calling an LLM. The backend has to decide what information matters, retrieve it safely, control context size and cost, handle stale or conflicting information, and remain reliable when model providers or dependencies fail.

This should establish the real engineering problem.

---

# Architecture Overview

Primary architecture:

```text
┌───────────────────┐
│       User        │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│    NestJS API     │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ User Data /       │
│ Conversation      │
│ Context           │
└─────────┬─────────┘
          │
          ├──────────────┐
          ▼              ▼
┌────────────────┐  ┌────────────────┐
│  PostgreSQL    │  │   Embeddings   │
│                │  │                │
└───────┬────────┘  └───────┬────────┘
        │                   │
        └─────────┬─────────┘
                  ▼
          ┌────────────────┐
          │    pgvector    │
          │   Retrieval    │
          └───────┬────────┘
                  │
                  ▼
          ┌────────────────┐
          │ Context        │
          │ Assembly       │
          └───────┬────────┘
                  │
                  ▼
          ┌────────────────┐
          │    LLM API     │
          └───────┬────────┘
                  │
                  ▼
          ┌────────────────┐
          │ Personalized   │
          │ Response       │
          └────────────────┘
```

This is conceptual.

The actual implementation must remain truthful to the codebase.

---

# Scroll Story

Desktop should use a sticky architecture visualization.

Recommended layout:

```text
LEFT                           RIGHT

story steps                    architecture
scroll naturally               remains sticky
                               and evolves
```

Do not expose the complete system immediately.

Build it as the visitor progresses.

---

# Step 01 — Product Problem

## Label

```text
01 / CONTEXT
```

## Heading

**AI becomes more useful when it remembers the right things.**

## Copy

> A useful personalized assistant needs more than the current message. It needs relevant historical context while avoiding unrelated, outdated, or cross-user information.

The engineering problem is:

```text
What should be remembered?

What should be retrieved?

What should be ignored?

What belongs to this user?

How much context should reach the model?
```

## Visual

Begin simple:

```text
Current Request
      +
User History
      ↓
      ?
      ↓
Personalized Response
```

The question mark represents the system PlayLight has to solve.

---

# Step 02 — Data Ownership

## Label

```text
02 / DATA
```

## Heading

**Persistent context starts with a trustworthy source of truth.**

## Copy

> PostgreSQL stores the product’s persistent application data and user-owned context. The data model has to preserve ownership boundaries, support updates and deletion, and remain queryable as the product evolves.

Architecture becomes:

```text
User
 ↓
NestJS
 ↓
PostgreSQL

user_id
conversation
context
metadata
```

Do not expose actual private schema details unless sanitized.

---

# Step 03 — Embeddings

## Label

```text
03 / EMBEDDINGS
```

## Heading

**Not every piece of history belongs in every prompt.**

## Copy

> Relevant context can be represented with embeddings so the backend can search past information semantically rather than sending the entire user history to the model.

Visual transition:

```text
User Context
     ↓
Embedding
     ↓
Vector
```

Then:

```text
PostgreSQL
    +
pgvector
```

Do not explain transformer mathematics.

Keep focus on application engineering.

---

# Step 04 — Retrieval

## Label

```text
04 / RETRIEVAL
```

## Heading

**Retrieve the smallest useful context, not the largest possible context.**

## Copy

> The retrieval layer searches for context relevant to the current request while preserving user isolation and considering metadata, relevance, recency, and future stale-memory handling.

Visual:

```text
Incoming Request
       ↓
     Query
       ↓
┌──────────────────────┐
│ user-scoped search   │
│ vector similarity    │
│ metadata filtering   │
└──────────┬───────────┘
           ↓
Relevant Context
```

Important visual detail:

show user boundary.

```text
USER A
┌─────────────────────────┐
│ vectors / context       │
└─────────────────────────┘

USER B
┌─────────────────────────┐
│ vectors / context       │
└─────────────────────────┘
```

Never visually mix them.

---

# Step 05 — Context Assembly

## Label

```text
05 / CONTEXT CONSTRUCTION
```

## Heading

**Retrieval is only useful if the model receives the right context.**

## Copy

> Retrieved information still has to be filtered, ordered, shaped, and fitted into a context budget before it becomes part of the model request.

Visual:

```text
System Instructions
        +
Current Request
        +
Relevant History
        +
Retrieved Context
        ↓
┌────────────────────┐
│ Context Assembly   │
└─────────┬──────────┘
          ↓
Model Request
```

This is one of the strongest backend/AI-system concepts in the section.

---

# Step 06 — Model Boundary

## Label

```text
06 / LLM INTEGRATION
```

## Heading

**The model is a dependency, not the architecture.**

## Copy

> The LLM sits behind an application boundary. The backend owns what data is sent, how responses are handled, what happens on timeout or malformed output, and how the result is persisted.

Visual:

```text
Application
     ↓
Model Boundary
     ↓
LLM Provider
     ↓
Validated Response
     ↓
Application
```

This should visually reinforce:

```text
PlayLight ≠ LLM wrapper
```

---

# Step 07 — Reliability

## Label

```text
07 / RELIABILITY
```

## Heading

**AI dependencies fail like every other external system.**

## Copy

> The architecture has to account for provider latency, timeouts, retries, duplicate work, partial failures, expensive requests, and graceful recovery.

Show potential failure points:

```text
API
 │
 ├── PostgreSQL      ✓ / ✕
 │
 ├── Retrieval       ✓ / ✕
 │
 └── LLM Provider    ✓ / ✕
```

Then show controls conceptually:

```text
timeouts
retries
idempotency
logging
fallback behavior
```

Only present mechanisms as implemented where they actually exist.

Planned or evolving reliability work must not be presented as already deployed.

---

# Step 08 — Security

## Label

```text
08 / SECURITY
```

## Heading

**Personalization makes isolation a core architectural requirement.**

## Copy

> User context must remain scoped to the correct user throughout persistence, retrieval, context construction, and model requests.

Show:

```text
User A Request
      ↓
User A Data
      ↓
User A Retrieval
      ↓
User A Context
```

and separately:

```text
User B Request
      ↓
User B Data
```

Never:

```text
User A → shared unscoped retrieval → User B data
```

Additional concerns can be shown quietly:

```text
authorization
prompt injection
untrusted retrieved content
resource abuse
secrets
```

---

# Step 09 — Cost & Context Control

## Label

```text
09 / COST
```

## Heading

**More context is not automatically better.**

## Copy

> Personalized AI systems have a direct relationship between retrieved context, token usage, latency, and cost. The backend needs to control how much information reaches the model instead of continuously growing prompts.

Visual:

```text
100 memories
      ↓
retrieval
      ↓
6 relevant items
      ↓
context budget
      ↓
LLM
```

This communicates engineering maturity better than showing a generic AI icon.

---

# Step 10 — Evaluation

## Label

```text
10 / EVALUATION
```

## Heading

**A response sounding good is not enough evidence that the system works.**

## Copy

> Retrieval and personalization need repeatable evaluation: whether the right context was retrieved, whether unrelated context leaked in, how much the request cost, and whether changes improved or regressed the user experience.

Visual:

```text
Input
 ↓
Retrieved Context
 ↓
Response
 ↓
Evaluate

relevance
personalization
isolation
latency
cost
```

This represents the engineering direction for the system.

Do not claim a mature evaluation platform unless one actually exists.

---

# Architecture Evolution

The architecture should progressively build during the scroll:

```text
User
 ↓

User
 ↓
NestJS
 ↓
PostgreSQL

        +

Embeddings
 ↓
pgvector

        ↓

Retrieval

        ↓

Context Assembly

        ↓

LLM

        ↓

Response
```

By the end, the visitor understands the whole system because they watched it form.

---

# Current Technical Stack

Use a restrained row:

```text
NestJS
TypeScript
PostgreSQL
pgvector
Embeddings
LLM APIs
```

Only add:

```text
Redis
BullMQ
RabbitMQ
AWS
OpenTelemetry
```

when those technologies genuinely exist in the PlayLight implementation and can be defended.

Do not add them merely because they are in Naveed's learning plan.

---

# Technical Ownership

Include a compact ownership block.

Recommended:

## My responsibility

```text
Backend architecture

Data model

API design

Persistent user context

Embedding / retrieval flow

LLM integration

Security boundaries

Reliability decisions

Technical tradeoffs
```

Do not write:

```text
Built everything
```

if responsibilities are shared.

---

# Founder Context

Keep founder language restrained.

Recommended:

> I’m building PlayLight with one co-founder and own much of the hands-on backend and technical architecture.

Do not turn this section into:

```text
Founder journey
startup hustle
entrepreneurship
visionary CTO
```

The portfolio is positioning Naveed as an engineer.

Founder experience is evidence of ownership.

---

# Product Status

Show the actual current product status when known.

Possible labels:

```text
IN DEVELOPMENT
PRE-LAUNCH
PRIVATE BETA
LIVE
```

Use only the truthful current status.

Do not invent:

* users
* revenue
* funding
* waitlist size
* growth metrics
* beta status

---

# Decision Notes

Optionally include 2–3 small engineering decision blocks.

Example:

```text
DECISION
PostgreSQL + pgvector

WHY
Keep relational application data and vector retrieval
inside the same primary data system at current scale.

TRADEOFF
Simpler operational model, but vector workload and
index strategy must be monitored as the dataset grows.
```

Another:

```text
DECISION
Selective retrieval

WHY
Sending complete history increases noise, tokens,
latency, and cost.

TRADEOFF
Retrieval quality becomes a system that must itself
be evaluated.
```

These should demonstrate reasoning.

---

# What This Section Must Prove

By the end, the visitor should understand that Naveed can discuss:

```text
API design
↓
data modeling
↓
user isolation
↓
embeddings
↓
vector search
↓
retrieval
↓
context construction
↓
LLM integration
↓
reliability
↓
security
↓
cost
↓
evaluation
```

That is the difference between:

**using an AI API**

and:

**engineering an AI-backed product.**

---

# Motion

PlayLight should have the strongest **data-flow animation** on the site.

Signals can represent:

```text
request
context
embedding
retrieval result
model request
response
```

Use only a few simultaneously.

Example:

```text
User
 │
 •
 ▼
API
 │
 •
 ▼
Retrieval
```

Different signal behavior may distinguish:

```text
request →
retrieval →
response ←
```

Keep movement controlled.

---

# Rasterex → PlayLight Transition

Rasterex ends with an integration architecture:

```text
Application
 ↓
SDK
 ↓
Platform
```

As Rasterex concludes:

```text
SDK node fades
Platform becomes Backend
new Data node appears
```

Until the architecture becomes:

```text
User
 ↓
Backend
 ↓
Data
```

Then PlayLight expands it.

This makes the transition feel natural:

**integration architecture → backend architecture**

---

# Transition Into Experience

At the end of PlayLight, the complete architecture gradually simplifies.

Nodes collapse into milestones.

For example:

```text
● API
● PostgreSQL
● Retrieval
● LLM
```

move toward a vertical line:

```text
●
│
●
│
●
│
●
```

That line becomes the **Experience Timeline** in the next section.

This preserves the continuous motion language.

---

# Mobile

Do not use the full sticky architecture experience on mobile.

Recommended:

```text
PlayLight intro

small architecture overview

01 Context
02 Data
03 Retrieval
04 Context Assembly
05 LLM
06 Reliability
07 Security
```

Combine less-important steps where needed.

The full story must remain understandable without motion.

---

# Confidentiality

PlayLight is Naveed's own product, but still avoid exposing:

* secrets
* credentials
* private user data
* security-sensitive implementation details
* provider secrets
* unnecessary proprietary logic

Architecture can be more detailed than Rasterex because Naveed owns it, but security still matters.

---

# What Not to Do

Do not present PlayLight as:

```text
AI-powered revolutionary platform
```

Avoid:

* glowing AI brain
* robot illustrations
* neural-network stock imagery
* ChatGPT-style fake conversations everywhere
* AI buzzword clouds
* exaggerated founder titles
* fake users/revenue
* pretending every planned feature exists
* listing every AI framework available

The technical system is interesting enough.

---

# Preferred Section Flow

```text
ZERO-TO-ONE PRODUCT ENGINEERING

PLAYLIGHT

Building a backend that gives AI
persistent, user-specific context.

short product context


01 Context
       │
02 Data
       │
03 Embeddings
       │
04 Retrieval
       │
05 Context Assembly
       │
06 LLM Boundary
       │
07 Reliability
       │
08 Security
       │
09 Cost
       │
10 Evaluation


Architecture Overview

My Responsibility

Technical Stack

Selected Decisions
```

---

# Final Direction

Rasterex should make the visitor think:

> He has worked on real production integration problems.

PlayLight should make them think:

> He can reason about and own a backend product architecture himself.

Together:

```text
Rasterex
Production depth
        +
PlayLight
Zero-to-one ownership
        =
Backend / Product Engineer
```

That combination is the core proof behind the entire portfolio.
