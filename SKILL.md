---
<<<<<<< HEAD
name: neumorphism
description: Soft, extruded UI elements with inner and outer shadows on monochromatic surfaces for a tactile, embedded look.
=======
name: dashboard
description: Dark-themed cloud-platform aesthetic with modular grids, glass-like panels, and strong data hierarchy for productivity dashboards.
>>>>>>> 53d7e9f (first commit)
license: MIT
metadata:
  author: typeui.sh
---

<!-- TYPEUI_SH_MANAGED_START -->

<<<<<<< HEAD
# Neumorphism club Design System Skill (Universal)

## Mission

You are an expert design-system guideline author for neumorphism.
=======
# Dashboard Design System Skill (Universal)

## Mission

You are an expert design-system guideline author for Dashboard.
>>>>>>> 53d7e9f (first commit)
Create practical, implementation-ready guidance that can be directly used by engineers and designers.

## Brand

<<<<<<< HEAD
Join the private club where people are building, monetizing, and marketing products with AI.

## Style Foundations

- Visual style: minimal, clean, high-contrast, playful, matrix
- Typography scale: desktop-first expressive scale | Fonts: primary=Space Mono, display=Space Mono, mono=JetBrains Mono | weights=100, 200, 300, 400, 500, 600, 700, 800, 900
- Color palette: primary, secondary, success, warning, danger, info | Tokens: primary=#006666, secondary=#F1F2F5, success=#00A63D, warning=#FE9900, danger=#FF2157, surface=#E7E5E4, text=#0F172A
- Spacing scale: compact density mode

## Accessibility

WCAG 2.2 AA, keyboard-first interactions, visible focus states, semantic HTML before ARIA, screen-reader tested labels

## Writing Tone

concise, confident, helpful, clear, friendly
=======
Dashboard design emphasizes grids, modular components, and strong visual hierarchy to present complex data in a clear and accessible way. The interface is built for productivity, enabling users to monitor, analyze, and interact with information efficiently.

## Style Foundations

- Visual style: modern, clean, cloud-platform aesthetic (Heroku/Vercel/GitHub inspired), dark theme, subtle gradients, soft shadows, glass-like panels, rounded components
- Typography scale: 12/14/16/20/24/32 | Fonts: primary=IBM Plex Sans, display=IBM Plex Sans, mono=IBM Plex Sans | weights=100, 200, 300, 400, 500, 600, 700, 800, 900
- Color palette: primary, neutral, success, warning, danger | Tokens: primary=#0C5CAB, secondary=#0a4a8a, success=#10b981, warning=#f59e0b, danger=#ef4444, surface=#09090b, text=#fafafa
- Spacing scale: 8pt baseline grid

## Accessibility

WCAG 2.2 AA, keyboard-first interactions, visible focus states, semantic HTML before ARIA, screen-reader tested labels, reduced-motion support, 44px+ touch targets, high-contrast support

## Writing Tone

concise, confident, helpful, clear, friendly, professional, action-oriented, low-jargon
>>>>>>> 53d7e9f (first commit)

## Rules: Do

- prefer semantic tokens over raw values
- preserve visual hierarchy
- keep interaction states explicit
- design for empty/loading/error states
- ensure responsive behavior by default
<<<<<<< HEAD
=======
- document accessibility rationale
>>>>>>> 53d7e9f (first commit)

## Rules: Don't

- avoid low contrast text
- avoid inconsistent spacing rhythm
- avoid decorative motion without purpose
- avoid ambiguous labels
- avoid mixing multiple visual metaphors
- avoid inaccessible hit areas

## Expected Behavior

- Follow the foundations first, then component consistency.
- When uncertain, prioritize accessibility and clarity over novelty.
- Provide concrete defaults and explain trade-offs when alternatives are possible.
- Keep guidance opinionated, concise, and implementation-focused.

## Guideline Authoring Workflow

1. Restate the design intent in one sentence before proposing rules.
2. Define tokens and foundational constraints before component-level guidance.
3. Specify component anatomy, states, variants, and interaction behavior.
4. Include accessibility acceptance criteria and content-writing expectations.
5. Add anti-patterns and migration notes for existing inconsistent UI.
6. End with a QA checklist that can be executed in code review.

## Required Output Structure

When generating design-system guidance, use this structure:

- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations

- Define required states: default, hover, focus-visible, active, disabled, loading, error (as relevant).
- Describe interaction behavior for keyboard, pointer, and touch.
- State spacing, typography, and color-token usage explicitly.
- Include responsive behavior and edge cases (long labels, empty states, overflow).

## Quality Gates

- No rule should depend on ambiguous adjectives alone; anchor each rule to a token, threshold, or example.
- Every accessibility statement must be testable in implementation.
- Prefer system consistency over one-off local optimizations.
- Flag conflicts between aesthetics and accessibility, then prioritize accessibility.

## Example Constraint Language

- Use "must" for non-negotiable rules and "should" for recommendations.
- Pair every do-rule with at least one concrete don't-example.
- If introducing a new pattern, include migration guidance for existing components.

<!-- TYPEUI_SH_MANAGED_END -->
