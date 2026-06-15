# Phonics Pal (phonics-pal-grlc)

> ⚠️ **THIS IS A LIVE APP.** Deployed via Vercel auto-deploy on push to `main`, embedded
> via iframe in WordPress on thecenterbookgr.com, and used by real students. Any change
> that reaches `main` ships to production. Work on a branch, keep scope tight, and never
> push experimental work directly to `main`.

---

## Read this first — before ANY design work

**Read [`playful-scholar-kit/CLAUDE.md`](playful-scholar-kit/CLAUDE.md) in full before touching
colors, fonts, or any visual element.** It is the single source of truth for the Playful
Scholar Design System (v2.8). Do not proceed with design work until you have read it.

Canonical references inside the kit submodule:
- `playful-scholar-kit/tokens.css` — every color, font, radius, spacing token (CSS variables)
- `playful-scholar-kit/tailwind.config.js` — Tailwind class mappings (point back to tokens.css)
- `playful-scholar-kit/PlayfulScholar_DesignSystem_v2_7_VisualReference.html` — rendered visual reference

**Rules that follow from the kit:**
- To change a color globally, edit `tokens.css`. **Never hardcode hex values** in components.
- Font is **Quicksand, weights 500 and 700 only**. Never use weight 400 (intentional tripwire).
- **Never type ALL CAPS.** Use CSS `uppercase` only (typed caps break screen readers).
- ADA / WCAG AA is non-negotiable — do not regress contrast, focus rings, or ARIA.

---

## Current engagement scope — STRICT

This round of work is limited to:

1. **Colors** — align to design-system tokens.
2. **Fonts** — align to design-system typography.
3. **One text fix** — a single approved copy/text correction.

**Out of scope (do NOT change):**
- Functionality / behavior
- Structure / component architecture
- Layout

If a change appears to require touching functionality, structure, or layout, **stop and ask**
before proceeding. When the spec is ambiguous, ask before guessing.

---

## Role rules (Nicole / Steve workflow)

- **Nicole** prototypes in `/prototypes/` only — safe to experiment freely there.
- **Steve** integrates approved designs into `/src/` with API wiring and deploys.
- **Nicole never modifies `/src/` directly.**
- New work goes on a branch named `nicole/<feature-name>` before review.

---

## Submodule note

`playful-scholar-kit/` is a git submodule. After cloning this repo, run
`git submodule update --init --recursive` to populate it.
