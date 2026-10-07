# Web Application Development — Lab 1 Homework 2

**Student:** Nguyễn Tất Tấn Tài
**Course:** Web Application Development (2025–2026)
**Deliverable:** HW2 — Drum Kit Engine (Contract-First)

---

## 📋 Project Overview

A polyphonic drum kit engine built with **Vanilla HTML5 + Modern CSS + ES6+ JavaScript** — no frameworks, no libraries, no CDN.

Demonstrates **contract-first decoupling**: HTML exposes `data-key` + `data-sound`, JavaScript reads via `dataset`, and never hardcodes key mappings. Audio engine, keydown handler, and FIFO beat recorder are separate concerns.

---

## 🎯 Deliverables

- 9 interactive drum pads (semantic `<button>`, not `<div>`)
- Polyphonic audio engine (overlapping sounds allowed)
- W3C-compliant keyboard handling (`keydown` + `event.key`, `event.repeat` throttled)
- FIFO beat recorder with timestamped queue
- Full keyboard + mouse support
- Mobile-first 375px responsive

---

## 🏗️ Architecture

### Tech Stack
- Vanilla HTML5
- Modern CSS (custom properties, Grid, aspect-ratio)
- ES6+ JavaScript (const, arrow functions, IIFE modules, Map, CustomEvent)
- No build step, no bundler

### File Structure

web-lab1-homework2/
├── index.html                  # 9 drum pads + recorder controls
├── css/
│   ├── reset.css               # Box-sizing + base normalization
│   └── drum.css                # Tokens, layout, pad states, responsive
├── js/
│   ├── audio-engine.js         # Polyphonic engine + keydown + repeat throttle
│   └── recorder.js             # FIFO beat recorder (decoupled via CustomEvent)
├── sounds/                     # 9 .wav samples
│   ├── boom.wav  clap.wav  hihat.wav  kick.wav  openhat.wav
│   ├── ride.wav  snare.wav  tink.wav  tom.wav
├── project-rules.md            # Architectural constraints
├── TASK_DECOMPOSITION.md       # WBS + contracts (committed before code)
├── CHAT_LOG.md                 # AI-assisted workflow log
└── README.md                   # This file

---

## 🚀 Local Development

### Requirements
- Any modern browser (Chrome, Firefox, Edge, Safari)
- [VS Code](https://code.visualstudio.com/) with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension

### Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Tantai152/web-lab1-homework2.git
   cd web-lab1-homework2
   ```
2. Open folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.
4. Browser opens at `http://localhost:5500`.

⚠️ **Strict ban:** Never open `index.html` via `file:///....` This breaks media-src CSP and Audio playback.

---

## 🎹 Key Bindings

| Key | Pad | Sound |
|-----|-----|-------|
| A | Clap | `sounds/clap.wav` |
| S | Hi-Hat | `sounds/hihat.wav` |
| D | Kick | `sounds/kick.wav` |
| F | Open Hat | `sounds/openhat.wav` |
| G | Boom | `sounds/boom.wav` |
| H | Ride | `sounds/ride.wav` |
| J | Snare | `sounds/snare.wav` |
| K | Tom | `sounds/tom.wav` |
| L | Tink | `sounds/tink.wav` |

---

## 🔒 Contracts

### HTML ↔ JS Contract
```html
<button class="drum-pad" data-key="a" data-sound="sounds/clap.wav" type="button">
```
- `data-key`: single lowercase letter
- `data-sound`: relative path to `.wav`
- JS reads via `dataset.key` and `dataset.sound` — **zero hardcoded key mapping**.

### Audio Engine Contract
- **Polyphonic**: `new Audio(path)` per hit → overlapping sounds allowed.
- `window.playSound(key)` exposed for recorder replay.
- Emits `CustomEvent('drum:hit', { detail: { key } })` on every hit.

### Keyboard Contract (W3C)
- Listen `keydown` only. `keypress` and `keyCode` are **banned**.
- Read `event.key`, lowercase-normalize.
- `event.repeat` guard prevents audio flood when key held.
- Ignore `event.ctrlKey` / `event.metaKey`.

### Recorder Contract
- **FIFO**: `Array.push` to enqueue, `Array.shift` to dequeue. **Never `pop`**.
- Event shape: `{ key, t }` where `t = performance.now() - recordStart`.
- Decoupled: listens to `drum:hit`, replays via `window.playSound()`.

### Security Contract
- Strict CSP with `media-src 'self'`.
- Zero inline event handlers.
- Zero `innerHTML` with user input.
- Zero `var` declarations.

---

## ✅ Verification Checklist

| Check | Command | Expected |
|-------|---------|----------|
| No `<div>` for structure | `grep -c "<div" index.html` | 0 |
| Exactly one `<h1>` | `grep -c "<h1" index.html` | 1 |
| 9 drum pads | `grep -c 'class="drum-pad"' index.html` | 9 |
| Every pad has data-key | `grep -c 'data-key=' index.html` | 9 |
| Every pad has data-sound | `grep -c 'data-sound=' index.html` | 9 |
| No `keypress` | `grep -n "keypress" js/` | empty |
| No `keyCode` | `grep -n "keyCode" js/` | empty |
| No `var` | `grep -rnE "\bvar\b" js/` | empty |
| No `innerHTML` | `grep -rn "innerHTML" js/` | empty |
| FIFO (shift, not pop) | `grep -n "\.shift()" js/recorder.js` | present |

### Manual Tests
- ✅ Click any pad → sound plays
- ✅ Press A–L keys → corresponding sound
- ✅ Hold A for 2s → only 1 sound (repeat guard works)
- ✅ Press Ctrl+A → no sound (modifier guard works)
- ✅ Click 3 pads rapidly → 3 sounds overlap (polyphonic)
- ✅ Record → play → beats replay in FIFO order
- ✅ Clear → queue reset, Play disabled
- ✅ 375px viewport: no horizontal scrollbar
- ✅ Console errors: 0

---

## 🎤 Live Refactoring Defense

The instructor may modify a contract constraint during grading. Expected fixes:

| Test | Fix |
|------|-----|
| Change `data-key="a"` to `data-key="z"` | Edit HTML only. Zero JS changes. |
| Add a new pad `<button data-key="q">` | Edit HTML only. Engine picks it up. |
| Change `data-sound` path | Edit HTML only. |
| Comment out `if (event.repeat) return;` | Observe audio flood → proves guard necessity. |
| Change `.shift()` to `.pop()` in recorder | Observe LIFO playback → proves FIFO contract. |

---

## 🧠 Engineering Principles

- **Decompose before prompting.** WBS written before any code.
- **Contract-first.** `data-key` + `data-sound` defined before JS.
- **One prompt = one task = one file = one commit.**
- **Decouple concerns.** Audio engine ≠ recorder. They talk via `CustomEvent`.
- **Verify in isolation before integrating.**
- *"AI can generate code. Developers are responsible for proving that it is correct."*

---

## 📚 References

- [MDN — KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
- [MDN — HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
- [MDN — CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
- [MDN — window.setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)

---

## 📄 License

Academic coursework — not licensed for reuse.