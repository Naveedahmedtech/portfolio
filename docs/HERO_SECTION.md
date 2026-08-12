# HERO_SECTION.md

## Purpose

The hero is the first proof of positioning.

Within a few seconds, the visitor should understand:

* who Naveed is
* what kind of engineer he is
* what he works on
* why the portfolio is worth exploring
* where to go next

The hero should not try to explain the entire career.

---

## Primary Positioning

Use:

**Backend / Product Engineer**

This is the main identity.

Do not lead with:

* Full-Stack Developer
* MERN Developer
* AI Engineer
* Software Developer
* Freelancer

AI should appear as part of the systems being built, not as the entire professional identity.

---

## Hero Content Structure

Recommended order:

```text
availability / identity label

main engineering statement

short supporting paragraph

primary + secondary actions

small engineering metadata

technical motion visual
```

---

## Eyebrow / Status

Use a small technical label above the main heading.

Recommended direction:

```text
BACKEND / PRODUCT ENGINEER
```

or:

```text
BUILDING PRODUCTION BACKENDS, SDKs & AI SYSTEMS
```

Optionally pair with a subtle status indicator:

```text
● Open to remote opportunities
```

Keep it quiet.

Do not use:

```text
HELLO WORLD
Hi, I'm Naveed 👋
Welcome to my portfolio
```

---

## Main Heading

The heading should communicate the type of problems Naveed works on rather than repeat the job title.

Recommended:

# I build backend systems that connect products, developers, data, and AI.

This is the preferred direction.

Alternative:

# Building reliable backend systems, developer platforms, and AI-enabled products.

The first option is stronger because it communicates relationships between systems rather than listing technologies.

---

## Supporting Copy

Recommended:

> I’m Naveed Ahmed, a Backend / Product Engineer working with Node.js, TypeScript, NestJS, and PostgreSQL. I build APIs, SDKs, integrations, and production systems — from enterprise document-viewing integrations at Rasterex to personalized AI infrastructure at PlayLight.

Keep this to approximately 2–3 lines on desktop.

The paragraph should establish:

* backend specialization
* production experience
* developer-platform / integration work
* PlayLight technical ownership

Do not turn the hero into a skill list.

---

## Primary Actions

Use two actions.

Primary:

```text
Explore my work →
```

Should lead to the strongest proof section.

Secondary:

```text
Get in touch
```

Optional tertiary text link:

```text
Resume ↗
```

Do not show more than two visually strong actions.

Avoid:

```text
Hire Me
Download CV Now
Let's Work Together!
View Services
```

---

## Engineering Metadata

Below the CTAs, show a small technical metadata row.

Example:

```text
Node.js    TypeScript    NestJS    PostgreSQL    SDKs    AI Backend
```

or grouped:

```text
BACKEND
Node.js · TypeScript · NestJS

DATA
PostgreSQL · pgvector

PLATFORM
APIs · SDKs · Integrations
```

Keep this visually quiet.

It supports the positioning; it is not the main content.

---

# Hero Layout

## Desktop

Preferred layout:

```text
┌───────────────────────────────────────────────────────┐

  LEFT                                  RIGHT

  Backend / Product Engineer           technical system
                                       visualization
  Main heading                         / motion
  goes here

  Supporting paragraph

  [ Explore my work → ] [ Get in touch ]

  technical metadata

└───────────────────────────────────────────────────────┘
```

Use roughly:

```text
60% text
40% visual
```

The text remains the primary element.

---

## Mobile

Stack naturally:

```text
status
heading
supporting copy
actions
metadata
visual
```

The technical visual should become smaller and simpler.

Do not allow the visual to push the actual message below the fold.

---

# Hero Height

The hero should feel substantial but not trap the user in a full-screen intro.

Target approximately:

```text
80–95vh desktop
```

depending on navigation height and final typography.

On smaller screens use content-driven height.

Do not force `100vh` if it causes clipping or awkward mobile behavior.

---

# Hero Motion

The hero is the starting point of the global motion system.

## Initial Entry

Sequence:

```text
1. eyebrow/status appears
2. heading resolves
3. supporting copy appears
4. CTAs appear
5. system visual activates
```

Keep delays short.

The visitor should not wait for the content.

---

## Text Motion

Use restrained motion:

```text
opacity: 0 → 1
translateY: ~12–20px → 0
```

The main heading may reveal by line if it remains fast and readable.

Do not animate character-by-character.

No typewriter effect.

---

# Technical Hero Visual

The right side should contain an abstract system visualization.

It should represent the idea that Naveed works across system boundaries.

Suggested conceptual structure:

```text
              ┌─────────────┐
              │   Client    │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
        ─────►│     API     │─────►
              └──────┬──────┘
                     │
           ┌─────────┴─────────┐
           ▼                   ▼
      ┌──────────┐        ┌──────────┐
      │   Data   │        │ Service  │
      └──────────┘        └────┬─────┘
                               │
                               ▼
                           ┌────────┐
                           │ Output │
                           └────────┘
```

Do not necessarily show these exact labels.

The initial hero visual should remain partially abstract.

Later sections can reveal real architectures.

---

## Visual Meaning

The system should subtly suggest:

* requests
* integrations
* APIs
* data movement
* events
* service boundaries

This connects directly with the engineering work shown later.

---

## Data Signal Motion

Use one or two small moving signals.

Example:

```text
●──────•────────→●
```

Signals move between nodes slowly.

Possible behavior:

```text
request →
processing →
response ←
```

Do not fill the visual with particles.

---

# Scroll Transition

The hero visual should not simply disappear when leaving the section.

As the visitor scrolls:

```text
hero text fades/moves upward

system visual stays visible slightly longer

one connection/path extends downward

next section inherits that visual line
```

This begins the continuous site walkthrough defined in `MOTION_DESIGN.md`.

The transition should communicate:

> We are moving deeper into the systems Naveed builds.

---

# Background

Follow the global dark technical theme.

Hero background may include:

* subtle grid
* faint node connections
* restrained blue/indigo glow
* low-opacity radial light around the technical visual

Do not use a large colorful hero gradient.

Do not use decorative blobs.

---

# Portrait

A large portrait is **not required** in the hero.

The strongest first impression should be the engineering positioning.

If a professional photo is introduced later, use it deliberately in About rather than automatically placing it beside the hero headline.

---

# Social Links

Do not place a large row of social icons in the hero.

GitHub and LinkedIn can exist:

* in navigation
* as small tertiary links
* in the footer

The hero should prioritize:

```text
positioning → proof → action
```

---

# What Not to Include

Do not use:

* “Hi, I'm Naveed”
* waving emoji
* typewriter job titles
* rotating titles
* years-of-experience counters
* skill percentages
* tech-logo clouds
* large portrait
* fake terminal
* code-editor mockup
* generic laptop illustration
* AI brain artwork
* “passionate developer” copy
* long biography
* three or more CTA buttons

---

# Hero Conversion Test

A recruiter should be able to answer these after roughly 5–10 seconds:

### Who is he?

Backend / Product Engineer.

### What does he build?

Backend systems, SDKs, integrations, and AI-enabled products.

### What stack is central?

Node.js, TypeScript, NestJS, PostgreSQL.

### Does he have real production work?

Yes — Rasterex.

### Does he have zero-to-one ownership?

Yes — PlayLight.

### Where do I go next?

Explore the work.

---

# Preferred Final Copy

## Eyebrow

```text
BACKEND / PRODUCT ENGINEER
```

## Heading

```text
I build backend systems that connect products, developers, data, and AI.
```

## Supporting Text

```text
I’m Naveed Ahmed, a Backend / Product Engineer working with Node.js, TypeScript, NestJS, and PostgreSQL. I build APIs, SDKs, integrations, and production systems — from enterprise document-viewing integrations at Rasterex to personalized AI infrastructure at PlayLight.
```

## Actions

```text
Explore my work →
Get in touch
```

## Metadata

```text
Node.js · TypeScript · NestJS · PostgreSQL · SDKs · AI Backend
```

---

# Final Direction

The hero should feel like the **entry point into an engineering system**, not a personal introduction slide.

The visitor starts with:

**what Naveed builds**

and then scrolls deeper into:

**how he builds it, where he has done it, and what he owns.**
