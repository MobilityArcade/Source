# FLASH DANZE V12 — CINEMATIC WORLDS

Complete replacement package, built from V11. Preserves the original gameplay, movement words, timing options, language choices, arcade audio, 8 font settings, color selection, and existing effects.

## Install (findthesource.app)
1. Back up your current live site folder first.
2. Unzip this archive.
3. Upload **every file and the entire `worlds/` folder** to the SAME live site directory that contains `index.html`. Overwrite the old files of the same name. Do not delete unrelated site files.
4. Redeploy if your hosting provider requires it, then hard-refresh your browser. Test on desktop and iPhone.

## New in V12
- Ten original SVG still-image scenic backgrounds: Retro Grid, Neon City, Future Garden, Neon Temple, Dance Club, Neon Studio, Urban Playground, Neon Sunset, Halloween, Winter.
- These are lightweight, original illustrated stage assets, **not** photorealistic replacements for the visual references. Replace `worlds/<name>.svg` with your own properly licensed artwork if desired; if using JPG/PNG/WebP, update the corresponding URL in `cinematic-worlds.js`.
- Keeps Neon Burst and other original animation-based effects selectable.
- Scenic background art sits behind all gameplay text, timer, and controls; the visual layers no longer fight the words.
- Small logo and tagline grouped top left during gameplay; timer remains top right.
- `cinematic-worlds.js` is the new asset loader.

## Official logo
The precise approved brushstroke logo has **not** been extracted as a transparent image from the screenshot. The current CSS logo remains as a placeholder. To replace it pixel-perfectly, supply a transparent `flash-danze-logo.png` or SVG source. Do not use a browser screenshot as the production logo.

## Files to upload
Replace: index.html, style.css, igusta.js, README.md.
Add: cinematic-worlds.js and the entire worlds/ directory.
Keep unchanged: words.js, neon-burst.js, ambient-flow.js, arcade-worlds.js, scenic-worlds.js, arcade-audio.js (included here for full-install convenience).

No music, API keys, external image hosting, or external fonts required. All art is original, bundled, and works offline after assets load.
