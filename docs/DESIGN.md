## Purpose

This file defines the visual direction for `naveedahmed.ai`.

It governs:

* theme
* visual language
* colors
* typography
* spacing
* layout
* cards
* borders
* motion
* responsive behavior
* diagrams
* visual hierarchy

It does **not** define the actual copy or content of individual sections.

---

## Design Goal

The portfolio should feel like the website of a strong:

**Backend / Product Engineer**

Not:

* generic frontend developer
* MERN portfolio
* freelancer template
* cyberpunk developer
* AI hype website

The visual impression should be:

**technical + precise + calm + product-quality + engineering-focused**

---

## Theme Direction

Use a **dark-first technical editorial theme**.

The site should feel modern and engineered, but not futuristic for the sake of looking technical.

Think:

```text
Linear
Vercel
GitHub
Raycast
Stripe engineering pages
modern technical documentation
```

The design should communicate:

* clarity
* depth
* confidence
* engineering maturity
* product thinking

---

## Visual Personality

Use:

* dark neutral surfaces
* subtle contrast
* clean typography
* restrained accent color
* thin borders
* generous whitespace
* structured grids
* technical diagrams
* small engineering details

Avoid:

* glowing neon backgrounds
* hacker green
* fake terminals everywhere
* Matrix effects
* typewriter animations
* excessive gradients
* 3D developer avatars
* floating technology logos
* huge glassmorphism cards
* animated background particles

Technical credibility should come from the **work**, not visual gimmicks.

---

## Color System

Use mostly neutral colors.

Recommended direction:

```text
Background:
near-black / deep charcoal

Elevated Surface:
slightly lighter charcoal

Primary Text:
soft white

Secondary Text:
neutral gray

Muted Text:
darker gray

Borders:
subtle gray with low contrast
```

Use **one primary accent color**.

Recommended:

```text
electric blue
or
blue-violet
```

The accent should be used sparingly for:

* links
* active states
* important labels
* subtle diagram highlights
* buttons
* selected navigation

Do not color every section differently.

---

## Dark Mode

Dark mode is the primary visual experience.

Avoid pure:

```css
#000000
```

for large backgrounds.

Prefer slightly softened dark neutrals.

Likewise, avoid pure white for long text.

The contrast should remain accessible without creating an overly harsh screen.

---

## Light Mode

Light mode is optional.

If implemented, it should use the same design language rather than becoming a completely different theme.

Do not delay the initial portfolio redesign just to build a complicated theme system.

---

## Typography

Typography should feel:

**technical, modern, readable, professional**

Use one strong sans-serif family for the majority of the site.

Good direction:

* Geist
* Inter
* Manrope
* similar high-quality sans-serif

Use monospace selectively for:

* small technical labels
* code
* dates
* metadata
* architecture annotations
* technology names where appropriate

Do not make the whole site monospace.

---

## Type Hierarchy

Use a strong but restrained hierarchy.

### Hero heading

Large and confident.

Avoid enormous headings that consume the entire viewport.

### Section headings

Clear and compact.

### Body text

Highly readable with comfortable line height.

### Metadata

Smaller and quieter.

Examples:

```text
2024 — PRESENT
BACKEND / PRODUCT ENGINEER
SDK / PLATFORM
NODE.JS · TYPESCRIPT · POSTGRESQL
```

Metadata can use monospace or uppercase styling carefully.

---

## Width

Keep long text readable.

Recommended:

```text
Body copy:
~60–75 characters per line

Main content:
roughly 1100–1250px maximum width
```

Do not stretch paragraphs across very wide desktop screens.

---

## Grid

Use a consistent layout grid.

Desktop:

```text
12-column style grid
```

or an equivalent structured CSS grid.

Important content should align visually across sections.

Avoid random widths for every section.

---

## Spacing

Use generous vertical spacing between major sections.

The site should feel calm rather than compressed.

Use a consistent spacing scale rather than arbitrary values.

Example concept:

```text
4
8
12
16
24
32
48
64
96
128
```

Not every value needs to exist.

Consistency matters more than the exact scale.

---

## Section Style

Sections should generally sit naturally on the page rather than every section being wrapped in a giant card.

Prefer:

```text
Section heading

content
content
content
```

over:

```text
[ giant rounded card containing entire section ]
```

Use cards only when the content genuinely behaves like a distinct item.

---

## Cards

Cards should be restrained.

Use:

* subtle surface difference
* thin border
* moderate radius
* clear spacing
* minimal shadow

Avoid:

* huge rounded corners
* heavy shadows
* strong glowing borders
* unnecessary glass effects

Cards should organize information, not become the visual identity.

---

## Borders

Thin borders can be an important part of the visual system.

Use them for:

* section separation
* project cards
* diagrams
* navigation
* metadata groups

Borders should usually be low contrast.

Hover states can increase border contrast slightly.

---

## Buttons

Buttons should be simple and product-like.

Primary button:

```text
solid accent or high-contrast neutral
```

Secondary:

```text
transparent / outlined
```

Avoid:

* giant gradient buttons
* glowing CTAs
* excessive pill shapes
* multiple competing primary buttons

---

## Navigation

Navigation should be minimal.

Desktop navigation should feel lightweight and precise.

Possible structure:

```text
Naveed Ahmed

Work
Experience
About
Writing
Contact
```

The exact navigation items will be defined in the content documents.

Sticky navigation is acceptable if subtle.

Avoid oversized navigation bars.

---

## Hero Visual Direction

The hero should prioritize identity and positioning.

It should **not** rely on:

* stock illustrations
* developer cartoons
* huge portrait photography
* 3D avatars
* animated code rain

A small technical visual, architecture motif, grid, or abstract system diagram can be used if it supports the engineering identity.

The text remains primary.

---

## Engineering Visual Language

Use subtle engineering-inspired visual elements throughout the portfolio.

Examples:

```text
API boundaries
nodes and connections
request flows
small architecture diagrams
data pipelines
system timelines
event flows
SDK integration diagrams
database / retrieval flows
```

These should look like real engineering diagrams, not decorative sci-fi graphics.

---

## Rasterex Visuals

Rasterex-related visual material can use:

* SDK architecture
* iframe/application boundaries
* PostMessage flows
* integration lifecycle
* package/API diagrams

Do not expose confidential company implementation details.

Diagrams should communicate the engineering problem and ownership.

---

## PlayLight Visuals

PlayLight can visually show:

```text
User
↓
API
↓
Context Retrieval
↓
PostgreSQL / pgvector
↓
Context Assembly
↓
LLM
↓
Response
```

Use clean system diagrams instead of AI-generated brain/network imagery.

Avoid generic:

* glowing AI brains
* robots
* neural-network stock graphics

---

## Technology Representation

Do not create a giant wall of technology logos.

Skills should be presented contextually.

Better:

```text
Backend
Node.js · TypeScript · NestJS

Data
PostgreSQL · pgvector · Redis

Platform
SDKs · APIs · Docker · AWS
```

Even better when technologies appear inside actual project/case-study context.

---

## Motion

Motion should be subtle.

Good uses:

* small fade/slide on section entry
* hover transition
* navigation transition
* diagram interaction
* button feedback

Keep motion fast and intentional.

Avoid:

* long entrance animations
* excessive scroll animation
* parallax everywhere
* bouncing elements
* spinning technology icons
* cursor-following effects

Respect:

```css
prefers-reduced-motion
```

---

## Hover States

Hover should provide feedback, not entertainment.

Examples:

```text
border becomes slightly brighter
title shifts by 1–2px
arrow moves subtly
background gains small contrast
```

Avoid major scaling or glowing effects.

---

## Icons

Use one consistent icon system.

Icons should be small and functional.

Avoid mixing multiple icon styles.

Do not use icons where text communicates the idea more clearly.

---

## Images

Use images only when they provide evidence or understanding.

Good:

* product screenshots
* architecture diagrams
* sanitized technical visuals
* relevant interface screenshots

Bad:

* random Unsplash developer photos
* laptops on desks
* generic programming images
* AI stock art

---

## Responsive Design

Mobile is not a compressed desktop version.

On small screens:

* reduce heading sizes
* collapse complex grids
* stack cards
* simplify diagrams
* keep readable spacing
* preserve hierarchy
* avoid horizontal scrolling

Do not hide important proof just because the viewport is small.

---

## Accessibility

Design must support:

* sufficient contrast
* visible focus states
* keyboard navigation
* readable font sizes
* clear links
* reduced motion
* semantic hierarchy

Accessibility should be part of the visual system, not added later.

---

## Page Rhythm

Pages should follow a rhythm similar to:

```text
Strong statement
↓
Proof
↓
Technical depth
↓
Breathing space
↓
Next proof
```

Avoid displaying every piece of information at once.

Let important engineering work breathe.

---

## Visual Density

The portfolio should be information-rich but not visually crowded.

Use progressive depth:

```text
quick scan
→ important details
→ deeper case study
```

Recruiters should understand the profile quickly.

Engineers should be able to go deeper.

---

## Design Anti-Patterns

Do not use:

* skill percentage bars
* circular skill meters
* "95% JavaScript"
* fake terminal introductions
* typewriter hero text
* animated matrix backgrounds
* neon cyberpunk themes
* excessive glassmorphism
* huge technology logo clouds
* generic timeline templates
* meaningless statistics
* stock developer imagery
* AI-generated portraits
* overly playful gradients
* every section inside a card

---

## Overall Visual Test

Before approving a design, ask:

### Does it look like this person builds serious software?

### Can a recruiter understand the hierarchy in 10 seconds?

### Can an engineer find technical depth without hunting for it?

### Does the visual design support the work instead of distracting from it?

### Would this still look professional without animations?

If the answer is no, simplify.

---

## Final Direction

The portfolio should feel:

**dark, precise, technical, calm, modern, and product-quality.**

Not flashy.

Not generic.

Not trying to prove engineering ability through visual effects.

The design should make the work feel credible.

**Engineering evidence is the hero. The visual system exists to frame it.**
