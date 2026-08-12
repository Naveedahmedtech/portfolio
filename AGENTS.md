# AGENTS.md

## Scope

Engineering rules only.

Do not define portfolio copy, sections, design, theme, colors, typography, or animation here. Those belong in separate documents.

## Engineering Style

Build the portfolio as production-quality Next.js code:

* simple and readable
* strongly typed
* server-first
* secure
* testable
* maintainable
* no unnecessary abstractions

Use practical Clean Architecture, not ceremony.

## Next.js

* Use App Router.
* Prefer Server Components.
* Add `"use client"` only for real browser interaction/state.
* Keep pages/layouts thin.
* Keep business/data logic out of JSX.
* Keep secrets and privileged logic server-side.
* Use Route Handlers or Server Actions only when they solve a real need.

## Architecture

For non-trivial features, keep dependencies in this direction:

```text
Presentation → Application → Domain ← Infrastructure
```

* **Presentation:** pages, components, route handlers, server actions
* **Application:** use cases and orchestration
* **Domain:** pure types/rules with no React/Next/vendor dependency
* **Infrastructure:** external APIs, database, email, analytics, CMS, filesystem

Do not create layers that have no real purpose.

## Project Structure

Prefer feature-based organization:

```text
src/
  app/
  components/
  features/
  lib/
  config/
```

Keep feature-specific code inside its feature.

Avoid giant `utils`, `helpers`, or `services` dumping grounds.

## TypeScript

* Use strict TypeScript.
* Avoid `any`.
* Use `unknown` for untrusted values and validate/narrow them.
* Strongly type exported functions and public contracts.
* Runtime-validate forms, env vars, query params, API responses, and other external input.
* Prefer clear types over clever generics.

## Backend Boundaries

Do not call external systems directly from random UI components.

Prefer:

```text
UI → application function → infrastructure adapter
```

Do not leak vendor-specific response shapes across the app.

## Errors & Security

* Handle validation, not-found, authorization, dependency, and internal failures intentionally.
* Never expose stack traces or secrets.
* Validate all external input server-side.
* Never trust client-side validation as a security boundary.
* Never log passwords, tokens, secrets, or sensitive user data.

## Backend Mindset

For every external or async operation ask:

```text
What can fail?
Can it time out?
Should it retry?
Could retry duplicate work?
What should be logged?
What should the user see?
```

Do not retry forever or blindly retry non-idempotent work.

## Performance

* minimize client JavaScript
* avoid unnecessary hydration
* avoid duplicate fetching
* optimize images
* lazy-load expensive optional UI
* cache intentionally
* measure before optimizing

## No Fake Complexity

Do not add infrastructure only to make the portfolio look backend-heavy.

No Redis, BullMQ, RabbitMQ, Kafka, microservices, Kubernetes, or database unless the product genuinely needs them.

## Testing

Test behavior that matters:

* validation
* pure logic
* transformations
* server functions
* critical API behavior

Prefer behavior-focused tests.

## Agent Workflow

Before coding:

1. inspect the existing repository
2. inspect `package.json`
3. understand the current Next.js version and conventions
4. inspect TypeScript/lint/test/build configuration
5. reuse sound existing patterns
6. make the smallest coherent change

Avoid unnecessary rewrites and unrelated refactors.

## Before Completion

Run the checks that exist in the repository, typically:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Do not claim completion with known errors.

## Final Rule

Write **boring, clear, strong code**.

Optimize for:

**clear boundaries, strong types, safe server behavior, predictable failures, and maintainability.**
