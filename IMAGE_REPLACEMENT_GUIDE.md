# Flash Danze V14 — responsive world image repair

This is an installable code update, not a new 4K photo pack. The ten included original photos are only **1600 × 900**. They remain soft when enlarged; upscaling cannot restore missing detail.

To fully solve quality, replace the ten JPGs in `worlds/` with properly licensed high-resolution 3840 × 2160 (or larger) originals: grid, city, garden, temple, club, studio, playground, sunset, halloween, winter. Keep filenames identical. For iPhone portrait, add separately composed 2160 × 3840 (or larger) images under `worlds/portrait/`, with the same filenames. The game automatically selects portrait photos on portrait screens and landscape photos on landscape screens.

Upload the **contents** of the `flashv13` folder to the website deployment root, including subfolders. Existing gameplay, timer, progress, and buttons remain. Word fitting is retriggered after fonts load. Test on real iPhone portrait and landscape.

**Limit:** Original high-resolution scene assets were not available in the provided project, so this ZIP cannot truthfully deliver restored photographic detail until you replace the originals.
