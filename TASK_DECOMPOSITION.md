# TASK DECOMPOSITION — HW2: Drum Kit Engine

## Project Info
- Student: Nguyễn Tất Tấn Tài
- Course: Web Application Development — Lab 1
- Deliverable: HW2 Drum Kit Engine
- Minimum commits: 6

## Contracts

### HTML Contract
- Exactly one h1.
- Landmarks: header, main, footer.
- Zero div for structure — use section, button, footer.
- 9 drum pads: button.drum-pad[data-key][data-sound].
- data-key = single lowercase letter (a-z).
- data-sound = relative path to audio file.
- Recorder controls: 3 buttons (#rec-btn, #play-btn, #clear-btn) + p#rec-status[role="status"].

### Audio Engine Contract
- Polyphonic: new Audio() per hit → overlapping sounds allowed.
- Read sound path from element.dataset.sound ONLY.
- Expose window.playSound(key) for recorder playback.
- No hardcoded key-to-sound mapping.

### Keyboard Contract
- Listen keydown only. event.repeat guard prevents flood.
- Read event.key, lowercase-normalize.
- Ignore ctrl/meta modifiers.

### Recorder Contract
- FIFO queue: Array.push, Array.shift.
- Each event: { key, t } where t = ms since record start.
- Decoupled from engine: listens to 'drum:hit' CustomEvent.
- Playback: setTimeout per event, cleared on stop.

### Security Contract
- Zero inline handlers.
- Zero innerHTML with user input.
- Meta CSP in head.

## WBS Table

| ID | Sub-task | Output file | Acceptance | Commit |
|----|----------|-------------|------------|--------|
| HW2-00 | Define WBS and contracts | TASK_DECOMPOSITION.md, project-rules.md | Docs committed before any code | docs(spec): define WBS and component contracts |
| HW2-01 | Semantic HTML + data-sound contract | index.html | 9 pads data-key + data-sound, 0 div, 1 h1 | feat(html): build semantic landmark tree with data-sound contract |
| HW2-02 | Box-sizing reset | css/reset.css | No color, no hex | feat(css): box-sizing reset and base normalization |
| HW2-03 | Drum pad layout and visual states | css/drum.css | Grid auto-fit, .active state, 375px no h-scroll | feat(css): drum pad layout and active state |
| HW2-04 | Audio engine (polyphonic, decoupled) | js/audio-engine.js | Reads data-sound, exposes window.playSound | feat(js): implement decoupled audio engine logic |
| HW2-05 | Keydown listener + repeat throttle | js/audio-engine.js | event.repeat guard, event.key | feat(js): bind keydown events with repeat throttling |
| HW2-06 | FIFO beat recorder | js/recorder.js | Timestamped queue, FIFO shift, CustomEvent listener | feat(js): implement FIFO beat recorder |
| HW2-07 | README | README.md | Setup + live defense notes | docs(readme): add setup and verification guide |

## Verification Gates
- After HW2-00: docs committed, no code.
- After HW2-01: grep div=0, h1=1, all pads have data-key+data-sound.
- After HW2-04: 2 keys pressed simultaneously → 2 sounds overlap.
- After HW2-05: held key → 1 sound only (no flood).
- After HW2-06: record 3 beats → playback matches order.
- Live defense: change data-key in HTML → JS works without change.
