# FLASH DANZE V17 — Dance Hall living light

Built on V16. The original Dance Hall artwork remains the full-size, static WebP background. Only Dance Hall gains subtle animated lighting: slight pink/cyan fixture brightness shifts, restrained disco-ball sparkle, and soft changing floor reflection intensity. There is no camera movement, beam animation, particle effect, audio, or motion in the other three worlds. The game UI and gameplay remain unchanged.

The SVG light layer is precisely registered to the 1662 x 946 Dance Hall image, with matching `cover` / `slice` crop geometry on portrait and landscape. For users requesting reduced motion, the layer becomes static.

## Deploy
Extract the ZIP and upload all contents (including the `worlds` folder) to the GitHub repository root, replacing the prior files. The new `dance-hall-lights.js` must be uploaded alongside `index.html`. Allow Vercel to deploy and hard-refresh the page.
