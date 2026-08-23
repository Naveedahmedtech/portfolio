# MOTION_DESIGN.md

## Purpose

Define the motion and scroll experience for the entire portfolio.

The goal is not to add animations to individual components.

The goal is to make the website feel like **one continuous engineering walkthrough**.

---

# Core Experience

The visitor should feel that scrolling moves them through a story:

```text
Introduction
↓
Engineering Identity
↓
Production Work
↓
System Architecture
↓
Product Ownership
↓
Experience
↓
Engineering Thinking
↓
Contact
```

Sections should feel connected rather than like independent cards stacked vertically.

---

# Motion Personality

Motion should feel:

**smooth, controlled, technical, calm, deliberate**

Not:

* playful
* bouncy
* cinematic for no reason
* flashy
* game-like
* cyberpunk

The website should still feel excellent when motion is disabled.

---

# Scroll Philosophy

Scrolling is the primary interaction.

Use scroll progress to gradually reveal and transform content.

Prefer:

```text
element enters
→ establishes itself
→ transforms slightly
→ hands attention to next section
```

instead of:

```text
scroll
→ everything fades in
→ scroll
→ everything fades in again
```

Not every section should use the same animation.

---

# Global Background

The background should remain visually connected throughout the page.

Use:

* deep neutral base
* very subtle technical grid
* faint system lines
* occasional nodes
* restrained blue/indigo accent glow
* slow background movement

The background should evolve slightly as the visitor moves through the site.

Do not reset the visual world at every section.

---

# Continuous System Motif

Use a recurring visual language based on:

```text
nodes
connections
boundaries
requests
events
data flow
services
```

Example:

```text
●────────●
         │
         ●───────●
                 │
                 ●
```

The motif begins abstractly in the hero.

As the visitor scrolls, it becomes increasingly meaningful.

Later it can turn into actual architecture diagrams for Rasterex and PlayLight.

---

# Scroll Progress

Use a subtle global indication that the user is moving through a system/story.

Possible approaches:

* thin progress line
* navigation state
* background path progressing
* nodes activating as sections are reached

Do not use a large visible progress bar.

The effect should mostly be subconscious.

---

# Section Transitions

Avoid hard visual breaks between every section.

Prefer transitions where elements from the previous scene visually lead into the next.

Example:

```text
Hero system line
        ↓
continues downward
        ↓
becomes Rasterex integration diagram
        ↓
continues
        ↓
becomes PlayLight request pipeline
```

This creates one connected engineering narrative.

---

# Hero Motion

The hero begins quiet.

On load:

1. identity appears
2. primary statement resolves
3. supporting content appears
4. technical system visual initializes
5. navigation settles into place

Do not animate every word individually.

Keep initial load fast.

---

# Hero → First Section

As the user begins scrolling:

* hero text moves/fades slightly
* system visual remains longer
* background nodes begin moving
* the next section enters through the same visual system

The visitor should feel like they are **entering the architecture**, not leaving one section and opening another.

---

# Pinned Moments

Use pinned/sticky scenes selectively.

Good candidates:

* Rasterex architecture
* PlayLight architecture
* experience progression
* major engineering statement

Example:

```text
LEFT
sticky explanation

RIGHT
diagram changes as user scrolls
```

As the user scrolls:

```text
Problem
↓
Integration
↓
SDK
↓
Communication
↓
Result
```

The visual stays anchored while the explanation changes.

Do not pin every section.

---

# Rasterex Motion

Rasterex should feel like an integration/system story.

Possible progression:

```text
Customer Application
        ↓
Integration Boundary
        ↓
@rasterex/viewer SDK
        ↓
Rasterex Canvas
```

Then introduce:

```text
commands →
events ←
errors ←
lifecycle ↔
```

The architecture can build progressively as the visitor scrolls.

Start simple.

Add complexity only when the text explains it.

---

# PlayLight Motion

PlayLight should feel like a backend/data pipeline.

Possible progression:

```text
User Request
    ↓
NestJS API
    ↓
User Context
    ↓
PostgreSQL / pgvector
    ↓
Retrieval
    ↓
Context Assembly
    ↓
LLM
    ↓
Response
```

Each part can activate as its explanation enters the viewport.

The user should visually understand the architecture without watching a video.

---

# Data Flow Animation

Use small moving signals along architecture lines.

Example:

```text
●────•──────→●
```

The moving point represents:

* request
* event
* context
* message
* result

Keep these animations slow and subtle.

Do not have dozens of particles moving simultaneously.

---

# Text Reveal

Text animation should remain restrained.

Preferred:

```text
opacity 0 → 1
small translateY → 0
```

or controlled line reveal.

Avoid:

* typewriter effects
* letters flying individually
* rotating words every few seconds
* large blur effects everywhere

The writing should remain easy to read.

---

# Large Statements

Important engineering statements can have more deliberate scroll treatment.

Example:

```text
I build systems that sit
between products,
developers,
data,
and production.
```

The sentence can reveal line-by-line as the visitor reaches it.

Use this rarely.

---

# Cards

Cards should not all animate independently.

For collections:

```text
first item
→ second
→ third
```

with a very small stagger.

No bouncing.

No dramatic scaling.

Hover should remain subtle.

---

# Experience Timeline

Experience can use a vertical system/timeline line.

As the user scrolls:

```text
2021
  │
  ● Media Techtics
  │
2023
  │
  ● M TECHUB
  │
2024
  │
  ● Aridian / Rasterex
  │
2026
  │
  ● PlayLight
```

The line progresses with scroll.

Active experience becomes brighter.

Inactive items remain quieter.

---

# Navigation Motion

Navigation should remain stable.

On scroll:

* background becomes slightly more solid
* border may become visible
* active section changes
* layout should not dramatically resize

The navigation acts as orientation while the rest of the site moves.

---

# Footer Transition

The site should not simply stop.

Before the footer, the motion system should resolve.

Example:

```text
multiple system paths
        ↓
        ↓
converge into one point
        ↓
Let's build something meaningful.
```

Then movement becomes quiet.

Footer becomes the resting state of the experience.

---

# Hover Motion

Use small feedback:

```text
arrow → moves 2–4px
border → gains contrast
surface → becomes slightly brighter
diagram node → activates
```

No large zoom effects.

---

# Cursor

Use the standard cursor.

Do not add:

* custom cursor
* glowing follower
* giant circle
* magnetic cursor everywhere

Optional interactive diagram areas may respond subtly to pointer position.

---

# Smooth Scrolling

The overall scroll should feel smooth, but never disconnected from normal browser behavior.

Do not make scrolling:

* slow
* heavy
* delayed
* difficult to control

The visitor should always feel in control.

---

# Mobile

Do not attempt to reproduce every desktop scroll animation on mobile.

Simplify.

Desktop:

```text
sticky scenes
diagram transitions
scroll-linked transforms
```

Mobile:

```text
natural document flow
simple reveals
lighter diagram animation
```

Content must remain understandable without complex motion.

---

# Performance

Motion must not damage the quality of the site.

Prioritize:

* transform
* opacity
* GPU-friendly animation
* minimal layout recalculation
* lazy activation
* limited simultaneous animations

Do not animate large expensive blur filters continuously.

Do not make animation libraries part of the critical experience unless necessary.

---

# Reduced Motion

Respect:

```css
prefers-reduced-motion
```

When enabled:

* remove scroll-linked transforms
* remove moving data signals
* remove parallax
* remove complex transitions

All content must remain fully usable.

---

# Motion Hierarchy

Use three levels.

## Level 1 — Ambient

Very slow background/grid/system movement.

Almost invisible.

## Level 2 — Interface

Hover, buttons, navigation, cards.

Fast and subtle.

## Level 3 — Narrative

Rasterex architecture, PlayLight architecture, key transitions.

These receive the strongest motion treatment.

Do not use Level 3 everywhere.

---

# Important Rule

Animation must explain or guide.

Before adding motion, ask:

```text
Does this direct attention?

Does this explain a relationship?

Does this help the transition between ideas?

Does this make the system easier to understand?
```

If the answer is no:

**do not animate it.**

---

# Desired Walkthrough

The final portfolio should feel approximately like:

```text
NAVIGATION
      ↓

HERO
identity appears
system initializes
      ↓

ENGINEERING INTRO
system begins moving
      ↓

RASTEREX
system becomes integration architecture
      ↓

PLAYLIGHT
integration transforms into backend/data pipeline
      ↓

EXPERIENCE
pipeline becomes timeline
      ↓

ENGINEERING / WRITING
timeline resolves into selected thinking
      ↓

CONTACT
visual system converges
      ↓

FOOTER
motion becomes still
```

---

# Final Direction

The user should not think:

> "This website has lots of animations."

They should think:

> "This was incredibly smooth to walk through."

Motion exists to connect the story.

**One page. One visual system. One continuous engineering narrative.**
