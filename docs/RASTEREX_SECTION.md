# RASTEREX_SECTION.md

## Purpose

This section is the first major proof section.

Its job is to show that Naveed's backend/product positioning comes from **real production engineering**, not only personal projects.

Rasterex should demonstrate:

* SDK engineering
* framework-independent integrations
* browser/application boundaries
* PostMessage communication
* public integration contracts
* developer experience
* documentation
* deployment/package delivery
* international customer debugging
* product ownership inside an existing production system

This section should feel deeper than a normal resume entry.

---

# Section Position

The homepage flow:

```text
Hero
↓
What I Build
↓
Rasterex
↓
PlayLight
```

The previous section explains:

> what kind of engineering Naveed does

Rasterex answers:

> where has he done this in a real production product?

---

# Section Eyebrow

Recommended:

```text
PRODUCTION ENGINEERING
```

Alternative:

```text
PRODUCTION PROOF
```

Prefer:

**PRODUCTION ENGINEERING**

---

# Company / Product Label

Show:

```text
RASTEREX SOFTWARE AS
OSLO, NORWAY
```

Supporting metadata:

```text
SDK · INTEGRATIONS · DEVELOPER PLATFORM
```

Do not present Rasterex as Naveed's own company.

Clearly show the relationship:

```text
Backend Software Engineer
Aridian Technologies LLC
Working on Rasterex products
```

---

# Main Heading

Recommended:

# Making a complex document-viewing platform easier for developers to integrate.

Alternative:

# Building the SDK and integration layer between customer applications and Rasterex.

Preferred:

**Building the SDK and integration layer between customer applications and Rasterex.**

It immediately communicates your actual engineering boundary.

---

# Intro Copy

Recommended:

> Rasterex builds embedded viewing technology for CAD, BIM, PDF, and other technical documents. My work focuses on the developer-facing integration layer — helping applications embed, control, communicate with, and deploy the viewer through a clearer SDK and integration contract.

Keep company description short.

The section is about **your engineering work**, not Rasterex marketing.

---

# Role Summary

Use a compact ownership statement:

```text
My focus

@rasterex/viewer SDK
Framework-independent integration
iframe / PostMessage communication
Developer documentation
Integration debugging
Package and deployment workflows
```

Do not show this as a giant technology list.

---

# Primary Architecture Visual

This is the first real transformation of the abstract system visual introduced in the Hero.

Base architecture:

```text
┌─────────────────────────────┐
│     Customer Application    │
│                             │
│  React / Angular / Vanilla  │
│                             │
└──────────────┬──────────────┘
               │
               │ @rasterex/viewer
               ▼
┌─────────────────────────────┐
│      Integration Layer      │
│                             │
│  lifecycle                  │
│  commands                   │
│  events                     │
│  errors                     │
│                             │
└──────────────┬──────────────┘
               │
               │ iframe / PostMessage
               ▼
┌─────────────────────────────┐
│       Rasterex Canvas       │
│                             │
│     Document Viewer         │
│                             │
└─────────────────────────────┘
```

This is conceptual.

Do not expose confidential internal architecture.

---

# Scroll Story

Use a sticky architecture visual on desktop.

Recommended layout:

```text
LEFT                            RIGHT

story / explanation             architecture visual
                                stays sticky
```

As the visitor scrolls, the diagram develops.

---

# Step 01 — The Integration Boundary

## Label

```text
01 / INTEGRATION
```

## Heading

**One viewer. Different customer applications.**

## Copy

> Customers need to embed Rasterex inside applications built with different frameworks and architectures. The integration layer therefore cannot depend on React, Angular, or any specific frontend framework.

## Visual

Start with:

```text
React App ──┐
Angular App ├── ?
Vanilla JS ─┘
```

Then resolve into:

```text
Different Applications
        ↓
Framework-independent SDK
        ↓
Rasterex
```

---

# Step 02 — The SDK

## Label

```text
02 / SDK
```

## Heading

**A framework-independent contract for controlling the viewer.**

## Copy

> I work on the `@rasterex/viewer` JavaScript/TypeScript npm SDK, providing developers with a clearer integration surface for viewer lifecycle, document operations, commands, events, and errors.

## Visual

Transform architecture into:

```text
Application

viewer.open(...)
viewer.on(...)
viewer...
      ↓

@rasterex/viewer
      ↓

Rasterex Canvas
```

Do not invent specific public method names unless they exist in the actual SDK.

Use generic placeholders where necessary.

---

# Step 03 — Communication

## Label

```text
03 / COMMUNICATION
```

## Heading

**Commands move in. Events move back.**

## Copy

> The viewer can run across an iframe/browser boundary, so communication becomes an explicit contract rather than ordinary in-process function calls.

## Visual

```text
Host Application
      │
      │ commands
      ▼
┌───────────────┐
│    iframe     │
│               │
│ Rasterex      │
└───────────────┘
      │
      │ events / responses
      ▼
Host Application
```

Animate:

```text
command →
event ←
```

with small moving signals.

---

# Step 04 — Developer Experience

## Label

```text
04 / DEVELOPER EXPERIENCE
```

## Heading

**An SDK only works when developers can understand it.**

## Copy

> Integration quality is not only about code. I also work on SDK documentation, GitHub examples, installation guidance, and integration flows so external developers can understand the contract and diagnose problems more easily.

## Visual

The architecture expands into:

```text
SDK
├── Types
├── Examples
├── Documentation
└── Integration Guides
```

Keep it visual and minimal.

---

# Step 05 — Production Debugging

## Label

```text
05 / PRODUCTION
```

## Heading

**Real integrations fail at system boundaries.**

## Copy

> I work directly with international customer integrations to reproduce issues across application code, browser behavior, configuration, deployment, and the viewer boundary — then turn those findings into fixes, clearer contracts, or better documentation.

This is one of the strongest points in the section.

It demonstrates:

* communication
* debugging
* ownership
* system thinking
* product feedback loop

---

# Debugging Visual

Possible sequence:

```text
Customer App
    ↓
Integration
    ↓
Browser Boundary
    ↓
Viewer
    ↓
Deployment / Configuration
```

One layer becomes highlighted as the suspected failure point.

Then:

```text
Symptom
→ reproduce
→ isolate boundary
→ identify cause
→ improve SDK/product/docs
```

This is much stronger than showing a generic bug icon.

---

# Step 06 — Delivery

## Label

```text
06 / DELIVERY
```

## Heading

**Integration continues beyond the npm package.**

## Copy

> My work also touches package and installer delivery for customer-managed environments, where deployment assumptions, configuration, updates, and integration constraints matter as much as the SDK itself.

Keep this high-level.

Do not expose confidential deployment details.

---

# Impact Section

Do **not** invent numbers.

Until real metrics are available, use observable impact.

Recommended heading:

## What changed

Possible statements:

```text
A clearer framework-independent integration surface.

Reusable SDK contracts instead of framework-specific integration logic.

Documentation and examples that support external developers.

Customer integration issues feeding directly back into product and SDK improvements.

A more structured boundary between host applications and the viewer.
```

Only keep statements that are genuinely defensible.

---

# Company Scale

Company-level context can be included separately from personal impact.

Example:

```text
Rasterex viewing technology is used internationally across 50+ countries.
```

Visually label this clearly as:

```text
PRODUCT REACH
50+ COUNTRIES
```

Do not imply:

```text
Naveed deployed Rasterex to 50+ countries.
```

Company scale and individual contribution must remain distinct.

---

# Technologies / Concepts

At the end of the section, use a restrained metadata row:

```text
TypeScript
JavaScript
npm
SDK Design
PostMessage
iframe APIs
Integration Contracts
Developer Experience
```

Do not turn this into a skills cloud.

---

# Motion

Rasterex should be one of the strongest narrative-motion sections.

Recommended desktop behavior:

```text
text scrolls
+
architecture remains sticky
+
diagram changes with each story step
```

Sequence:

```text
Customer Applications
↓
SDK
↓
Integration Contract
↓
PostMessage Boundary
↓
Documentation
↓
Production Debugging
↓
Delivery
```

Each stage should modify the same system rather than replacing it with a completely unrelated illustration.

---

# Transition From Previous Section

The previous `WHAT I BUILD` section ends around:

```text
Developer Platforms & SDKs
```

Its abstract visual:

```text
Application → SDK → Platform
```

should smoothly become:

```text
Customer Application
      ↓
@rasterex/viewer
      ↓
Rasterex Canvas
```

No hard reset.

---

# Transition Into PlayLight

At the end of Rasterex, the architecture should simplify.

The integration diagram can collapse toward a generic request/data path:

```text
Application
↓
Backend
↓
Data
```

Then the next section transforms it into:

```text
User
↓
NestJS
↓
PostgreSQL / pgvector
↓
Retrieval
↓
LLM
```

This visually transitions from:

**production platform ownership**

to:

**zero-to-one product ownership**

---

# Mobile

Do not keep a long sticky sequence on mobile.

Use:

```text
Heading

Architecture diagram

01 Integration
copy

02 SDK
copy

03 Communication
copy

04 Developer Experience
copy

05 Production Debugging
copy

06 Delivery
copy
```

The diagram may update lightly or appear as smaller diagrams between steps.

Keep the content understandable without motion.

---

# Confidentiality Rule

Never expose:

* proprietary source code
* customer identities without permission
* confidential architecture
* credentials
* internal URLs
* private infrastructure
* proprietary protocol details
* customer-specific incidents
* non-public metrics

Use sanitized architecture.

The section should demonstrate engineering thinking without exposing company information.

---

# What Not to Do

Do not make this a generic project card.

Avoid:

```text
Rasterex
React / Node / TypeScript
Lorem ipsum...
View project
```

Also avoid:

* giant Rasterex logo
* marketing copy copied from Rasterex
* screenshots without explanation
* fake performance numbers
* claiming company-wide achievements personally
* overwhelming technical implementation details
* confidential customer stories

---

# Preferred Section Flow

```text
PRODUCTION ENGINEERING

Building the SDK and integration layer
between customer applications and Rasterex.

short context

              ARCHITECTURE
                   │
01 Integration     │
                   │
02 SDK             │
                   │
03 Communication   │
                   │
04 Developer DX    │
                   │
05 Debugging       │
                   │
06 Delivery        │

What changed

technical metadata
```

---

# Final Direction

The visitor should leave this section thinking:

> Naveed doesn't just build endpoints.

They should understand that he works on:

* public developer contracts
* application boundaries
* SDKs
* communication protocols
* customer integrations
* debugging
* documentation
* delivery

Rasterex should establish **production credibility**.

The next section, PlayLight, should then establish **technical ownership from zero to one**.
