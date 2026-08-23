## Purpose

Defines the structure, behavior, and visual rules for:

* main navigation
* mobile navigation
* footer

This document does not define the design system itself. Follow `DESIGN.md` for colors, typography, spacing, borders, and motion.

---

# Navigation

## Goal

The navigation should feel:

**minimal, precise, product-like, and technical**

It should help a recruiter or engineer quickly reach the strongest proof without making the site feel like a large marketing website.

---

## Desktop Structure

Recommended structure:

```text
Naveed Ahmed                     Work   Experience   About   Writing   Contact
```

Alternative brand treatment:

```text
NA / Backend Engineer            Work   Experience   About   Writing   Contact
```

Prefer **Naveed Ahmed** unless a compact brand treatment looks clearly better in the final design.

---

## Navigation Items

Use:

```text
Work
Experience
About
Writing
Contact
```

### Work

Leads to selected engineering work.

Primary proof should eventually include:

* Rasterex
* PlayLight
* selected technical work only when valuable

### Experience

Professional timeline and engineering responsibilities.

### About

Short professional story and engineering direction.

### Writing

Technical notes, architecture thinking, backend learning, or engineering articles.

If there is no meaningful writing content yet, do not show an empty Writing section.

### Contact

Primary conversion point.

---

## Do Not Add

Avoid unnecessary navigation items such as:

```text
Home
Services
Skills
Testimonials
Certificates
Tech Stack
Hire Me
Resume
Projects
Blog
```

unless later content strategy proves they are useful.

Do not create a crowded navigation bar.

---

## Resume

Do not make `Resume` a primary navigation item.

Instead, use a small secondary action:

```text
Resume ↗
```

or include it near the Contact CTA.

The site itself should provide stronger evidence than the resume.

---

## Navigation Layout

Desktop:

```text
[Name / Identity]          [Navigation]          [Optional CTA]
```

The navigation should remain visually lightweight.

Do not use:

* oversized header height
* giant logo
* heavy shadows
* large gradient background
* excessive glassmorphism

---

## Sticky Behavior

Use a subtle sticky navigation.

When scrolling:

* keep it compact
* slightly increase background opacity if necessary
* optionally add a subtle bottom border
* avoid dramatic shrinking animations

The navigation should never distract from the content.

---

## Active Section

When useful, indicate the active section subtly.

Examples:

```text
Work
```

can use:

* brighter text
* small underline
* subtle dot
* accent color

Avoid large animated indicators.

---

## Navigation Hover

Use restrained interaction.

Example:

```text
text: muted → primary
```

Optional:

```text
small underline
```

or:

```text
subtle 1–2px movement
```

No glow or dramatic scale effects.

---

## Logo / Identity

Do not create a decorative developer logo unless it has a real reason to exist.

Preferred:

```text
Naveed Ahmed
```

Optional secondary metadata:

```text
Backend / Product Engineer
```

Do not make the header identity too tall.

---

# Mobile Navigation

## Mobile Header

Recommended:

```text
Naveed Ahmed                         Menu
```

or:

```text
Naveed Ahmed                          ☰
```

Keep the control accessible and clearly labeled.

---

## Mobile Menu

Use a simple full-width or compact overlay.

Recommended order:

```text
Work
Experience
About
Writing
Contact

Resume ↗
GitHub ↗
LinkedIn ↗
```

Do not create an elaborate animated navigation experience.

---

## Mobile Interaction

* open quickly
* close immediately after navigation
* support keyboard interaction
* lock background scroll if using an overlay
* maintain visible focus states
* support Escape to close where appropriate

Motion should remain subtle.

---

# Primary Navigation CTA

A single small CTA can be used if it improves conversion.

Recommended:

```text
Get in touch
```

or:

```text
Contact
```

Do not use aggressive copy such as:

```text
HIRE ME NOW
LET'S BUILD
START A PROJECT
```

The tone should remain professional.

---

# Footer

## Goal

The footer should close the portfolio cleanly and provide:

* identity
* contact path
* professional links
* resume access
* minimal site navigation

It should not become another large content section.

---

## Recommended Footer Structure

Desktop concept:

```text
NAVEED AHMED

Backend / Product Engineer
Building backend systems, developer platforms,
integrations, and AI-enabled products.

Navigation
Work
Experience
About
Writing

Elsewhere
GitHub
LinkedIn
Resume
Email
```

Bottom row:

```text
© 2026 Naveed Ahmed                         Islamabad, Pakistan
```

---

## Footer Identity

Use:

```text
Naveed Ahmed
Backend / Product Engineer
```

Optional supporting line:

```text
Backend systems, developer platforms, integrations, and AI-enabled products.
```

Keep it concise.

---

## Professional Links

Include only meaningful links:

```text
GitHub
LinkedIn
Resume
Email
```

Optional later:

```text
Writing / RSS
```

Do not add empty or inactive social networks.

Avoid:

* Instagram
* Facebook
* random social icons

unless they become professionally relevant.

---

## Contact Treatment

Email should be visible enough to find quickly.

Example:

```text
technaveedahmed@gmail.com
```

It may be paired with:

```text
Open to remote and international opportunities.
```

Do not add unnecessary location-specific relocation copy here.

---

## Footer Location

Use:

```text
Islamabad, Pakistan
```

No need to list target relocation countries.

---

## Footer CTA

The footer may include one final, restrained CTA.

Example:

```text
Have an engineering role or interesting product problem?

Let's talk →
```

Keep it professional.

Do not make the footer feel like a freelance sales landing page.

---

## Footer Visual Style

Use:

* slightly separated surface or top border
* generous vertical spacing
* clear column structure
* subdued metadata
* strong link hover states

Avoid:

* massive footer height
* decorative illustrations
* animated backgrounds
* gradients just for decoration
* giant social icons

---

# Responsive Footer

Desktop:

```text
Identity        Navigation        Professional Links
```

Mobile:

```text
Identity

Navigation

Professional Links

Copyright / Location
```

Maintain generous spacing.

Do not compress everything into tiny columns.

---

# External Links

External links such as:

```text
GitHub
LinkedIn
Resume
```

may use:

```text
↗
```

Keep the icon subtle.

Example:

```text
GitHub ↗
LinkedIn ↗
Resume ↗
```

---

# Accessibility

Navigation and footer must use semantic elements:

```html
<header>
<nav>
<footer>
```

Requirements:

* keyboard accessible
* visible focus states
* meaningful link labels
* correct button semantics for mobile menu
* `aria-expanded` for menu state
* external-link behavior should be clear
* no clickable `div` elements

---

# Final Direction

The header should communicate:

**clarity and control**

The footer should communicate:

**professional closure and accessibility**

Neither should compete with the actual engineering work.

The visitor should immediately understand:

```text
Who is this?
→ Naveed Ahmed

What does he do?
→ Backend / Product Engineering

Where is the work?
→ Work

What has he done professionally?
→ Experience

How do I contact him?
→ Contact
```

Keep both components **minimal, precise, and useful**.
