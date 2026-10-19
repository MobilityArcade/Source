# FLASH DANZE V16 — Four static high-detail artworks

Four background choices: Dance Hall, Futuristic City, Botanical Garden, Rooftop. Each is the original user-provided 1662–1672 px-wide artwork, converted to high-quality WebP **without upscaling**. The full-resolution image is displayed with `background-size: cover`; portrait mode crops horizontally rather than stretching.

No procedural neon worlds, moving backgrounds, canvas effects, sound effects, or white frame. Countdown, movement cues, progress bar, controls, and all existing gameplay remain separate HTML/CSS layers.

## Deployment
Upload **all files and the worlds folder** from this ZIP to the ROOT of your GitHub repository, replacing the old site files. Keep `worlds/*.webp` alongside index.html in the `worlds` directory. Commit, wait for Vercel, hard refresh the browser. Avoid uploading the enclosing ZIP itself. Old unused files in the repo may be deleted but do not affect this build.

Source images are ~1660 x 940 pixels; they are NOT native 4K. Upscaling alone cannot add detail. If a future 4K source becomes available, replace the matching `worlds/*.webp` file with an equivalent native-resolution image.
