# iGusta Movement Flashcards V2

A fresh, standalone, **offline-first** movement flashcard experience. No AHKI code, AI API, chat, speech synthesis, or backend.

## Features
- Dance, Stretch, Flow, Play (solid color modes)
- 246 bilingual English/Spanish flashcard pairs (dance: 66, stretch: 60, flow: 60, play: 60)
- 30 seconds, 1 minute, 3 minutes
- Quick, Steady, Relaxed card changes; NEXT button to advance manually
- Optional nonverbal start, midpoint, finish sounds; no spoken words
- Responsive portrait and landscape with centered white text and border
- Pause/Resume, End, Replay; automatically pauses if browser tab is hidden

## Deploy
Upload **index.html**, **style.css**, **igusta.js**, and **words.js** to the root of a new GitHub repo, and deploy as a static site on Vercel or GitHub Pages. No API key, environment variables, or serverless functions are needed.

Open `index.html` locally to try it. Sounds require a browser gesture and can be disabled in setup. Browser backgrounding may pause the round.

## Vocabulary
Edit `words.js` to add more English/Spanish pairs. Each pair is `[English, Spanish]` and belongs to one of four categories. Avoid hazardous or overly complex movement prompts.
