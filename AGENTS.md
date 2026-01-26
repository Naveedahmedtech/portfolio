# AGENTS.md — Portfolio Architecture & AI Governance (Codex-Strict)

## Role

**Senior Systems Architect & Creative Technologist**

You are rebuilding this portfolio as a **modular, enterprise-grade system**. You must balance:

* **High-end Three.js / R3F motion design**
* **Strict managerial engineering standards** (robustness, maintainability, performance, governance)


# PHASE 2+ (DO NOT START UNTIL APPROVED)

## 3D Scene Orchestration (Three.js / R3F)

### Requirements

* Canvas management:

  * Global or section-scoped using `View` from `@react-three/drei`.
  * 3D elements may follow DOM layout.
* Performance:

  * `AdaptiveEvents`, `AdaptiveDpr`.
  * `Preload` for all assets.
  * Animation strictly via refs + `useFrame` (no per-frame React state).
* Interaction:

  * GSAP ScrollTrigger scrubbing controls 3D transforms.

---

## Advanced GSAP Animation Suite

* Pinned panels with overscroll.
* MotionPath waypoints controlling 3D rotation & text reveals.
* SplitText kinetic headers.
* Lateral pinned progress indicator.
* Mandatory GSAP cleanup on unmount.

---

## UI/UX Section Roadmap (Configurable + Decoupled)

1. **Hero [Public]** — R3F abstract scene + kinetic reveal, reacts to scroll & mouse.
2. **Unified Skills [Public]** — Bento grid + perspective toggle, waypoints illuminate 3D nodes.
3. **Experience & Projects [Public]** — Loaded from preserved data, pinned transitions + 3D depth.
4. **Blogs [Public]** — MDX scaffold; toggle via `SHOW_BLOG: false`.
5. **Contact [Public]** — EmailJS + Zod + honeypot.
6. **Admin Dashboard [Private]** — Hidden shortcut `shift + a + d`; manages feature flags & blog content.

---

## Auth, Security & Routing

* `PublicRoute` vs `ProtectedRoute` separation.
* Auth via `AuthContext` + `sessionStorage`.
* Hidden login sequence.

---

## Engineering Standards (Managerial Grade)

* Error boundaries around Canvas and major features.
* Lighthouse 100/100 target.
* GPU-accelerated transitions.
* Full cleanup:

  * Kill all GSAP ScrollTriggers.
  * Dispose all Three.js objects.
  * Remove raf loops on unmount.

---

# Content Strategy & Narrative System

Persona: **"A Visionary Engineering Leader & AI Orchestrator"**

## Hero Copy

* **Title:** AI Orchestrator & Engineering Manager
* **Subtext:** "Architecting scalable intelligent systems and leading high-performance teams to bridge the gap between complex AI logic and business ROI."

## Unified Skills

### Manager

* SDLC Governance
* Mentorship
* Strategic Roadmap Planning
* Cross-functional Collaboration

### Developer

* Latency Optimization
* React 19 / Three.js
* Agentic Workflows (LangGraph)
* System Security

## Experience Narratives — Google XYZ Formula

Format future experience rewrites as:
“Accomplished [X] as measured by [Y], by doing [Z].”

## About / Philosophy

Theme: **People-First Technical Excellence**
Content includes:

* AI ethics & governance.
* Day 2 operations.
* Ownership culture in engineering teams.

## Tone Guidelines

* Sophisticated, authoritative, accessible.
* "Understands the code, speaks business."
* Keywords: **Scalability, Orchestration, Governance, ROI, High-Fidelity, Resilience**.
