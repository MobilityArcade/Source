# FLASH DANZE — Neon Arcade V3

A standalone, voice-free movement flashcard game. No AI, API key, account, backend, external fonts, or dependencies.

## Files to deploy
Upload `index.html`, `style.css`, `igusta.js`, and `words.js` together to the root of a GitHub repository. Deploy as a static site on Vercel or GitHub Pages. Open index.html directly for local testing.

## Features
- Dance-only flow: landing, settings, huge 3-2-1-GO countdown, movement prompts, finish
- Neon animated beams, glow, stage grid and colorful typography rendered with CSS; no dancer images
- 30 seconds, 1 minute, 3 minutes; Quick, Steady, Chill pacing
- English/Spanish prompts; large built-in dance vocabulary
- Optional nonverbal chimes, occasional arcade-style coin cues, halfway and end tones
- Responsive portrait/landscape; Pause, Next, End; auto pause on tab hiding

## Notes
This is a functional browser approximation of the illustrated concept, not pixel-identical: the reference artwork has complex composited lighting and dancer silhouettes, while this implementation intentionally uses lightweight CSS effects without people. Sound may require a user tap to unlock audio on iOS. Test on physical phones, especially long-word readability and landscape layout. `prefers-reduced-motion` disables animations.
