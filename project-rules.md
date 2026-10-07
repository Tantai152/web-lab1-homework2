# Project Architectural Constraints — HW2 Drum Kit

## Tech Stack
- Vanilla HTML5 + modern CSS + ES6+ JS only.
- No CDN, no external library, no jQuery.
- Live Server at http://localhost:5500 ONLY. file:/// banned.

## Code Standards
- const by default; let only if reassigned. var banned.
- Zero innerHTML with user input.
- Zero inline event handlers (onclick=, onkeydown=, ...).
- Semantic HTML over generic div for structure.

## Accessibility (WCAG 2.2 AA)
- Exactly one h1 per document.
- Full keyboard Tab + Enter flow.
- Visible :focus-visible outline 3px.
- Contrast >= 4.5:1.
- Drum pads are <button>, not <div>.

## Keyboard Contract
- Listen keydown only. keypress and keyCode are banned.
- event.repeat MUST guard against audio flood on held keys.
- Read event.key, not event.keyCode.

## Decoupling Contract
- HTML exposes data-key + data-sound. JS reads via dataset.
- Zero hardcoded key-to-sound mapping in JS.
- Audio engine, keydown handler, and recorder are separate concerns.

## Workflow
- Atomic commits only. One task = one commit.
- Docs committed BEFORE any code.
- Minimum 6 commits.
