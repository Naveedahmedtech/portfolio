# naveedahmed.ai

Personal portfolio for Naveed Ahmed, a Backend / Product Engineer. The site presents production engineering work, product architecture, backend systems, integrations, and AI infrastructure.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript with strict mode enabled
- CSS in `src/app/globals.css`
- Server-first components with client components only where browser interaction is required

## Getting started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available commands

```bash
npm run dev        # Start the development server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting files
npm run build      # Create a production build
npm start          # Serve the production build
```

There is currently no automated test script configured in `package.json`.

## Project structure

```text
src/
  app/                         Next.js routes, layout, metadata, and global CSS
  components/                  Shared UI components and motion layer
  features/
    about/                     About section
    contact/                   Contact section
    experience/                Career timeline
    focus/                     Engineering focus section
    playlight/                 PlayLight case study
    rasterex/                  Rasterex case study
    thinking/                  Engineering principles
  config/                      Site configuration
public/                        Static assets, resume, and crawler-facing content
docs/                          Section and design documentation
```

## Rasterex case study

The Rasterex section documents work on a customer-facing integration and delivery architecture for an on-premise technical drawing/document viewer.

The story covers:

- separating customer application code from the compiled Canvas deployment
- keeping the Canvas on the customer’s server while exposing a `postMessage` / SDK integration boundary
- a unified EXE installer that orchestrates the required MSI packages and IIS setup
- an npm package and sandbox Canvas for evaluation without first installing the full Windows Server stack
- customer deployment support, integration debugging, documentation, and feedback loops

The section intentionally avoids unverifiable metrics, customer names, testimonials, and invented API names.

## Content and design documentation

The `docs/` directory contains the working documentation for the site’s sections, design language, motion behavior, SEO, and content decisions. Keep those documents aligned with meaningful changes to the corresponding feature.

## Engineering conventions

- Prefer Server Components and keep client-side JavaScript focused on real interaction.
- Keep feature-specific code inside its feature directory.
- Validate external input at server boundaries.
- Preserve strong TypeScript types and avoid `any`.
- Keep business and data logic out of JSX where it becomes non-trivial.
- Make focused changes and run lint, typecheck, and build checks before completion.
