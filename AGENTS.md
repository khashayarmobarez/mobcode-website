<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# mobcode project

Marketing site for **mobcode** — a mobile-engineering subscription product.
Stack: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, App
Router. This page will later sell subscriptions (Stripe), so keep the pricing
data in `src/lib/site.ts` ready to be wired to checkout.

## Structure

- `src/app/page.tsx` — composes the landing page from section components.
- `src/app/layout.tsx` — fonts (Unbounded/Sora/JetBrains Mono), metadata,
  global overlays.
- `src/app/globals.css` — Tailwind v4 theme tokens. All colors and fonts are
  theme-token driven: `bg-background`, `text-accent`, `font-display`,
  `font-sans`, `font-mono`, `border-line`, plus animation utilities
  (`animate-fade-up`, `animate-blink`, `animate-marquee`) and the `.reveal`
  scroll-reveal class. Never hardcode hex values in components.
- `src/components/` — one file per section. Server components by default; add
  `"use client"` only for interactivity (state/effects).
- `src/lib/site.ts` — single source of truth for site copy (nav, features,
  steps, tiers, faqs). Put copy here, not in components.
- `src/lib/utils.ts` — `cn()` for conditional Tailwind classes.

## Conventions

- Match the existing design system exactly; reuse existing components/patterns
  before writing new ones.
- No new dependencies without asking first.
- No dead code, no unused imports, no comments unless genuinely needed.

## Verification

Always run after changes: `npm run lint` then `npm run build` (build also runs
TypeScript checks). Start `npm run dev` to exercise behavior.

## Agent team

Custom opencode agents live in `.opencode/agents/` (`orchestrator`,
`architect`, `developer`, `debugger`, `tester`, `reviewer`). `model` fields are
left unset — add them there when ready. Custom tools/skills/commands live under
`.opencode/tools`, `.opencode/skills`, `.opencode/command` respectively.
