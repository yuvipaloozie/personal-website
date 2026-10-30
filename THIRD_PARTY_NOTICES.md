# Third-party interface assets

## Organization marks

The locally hosted SVG files in `public/logos/` identify Yuvraj's work and education. Original vector geometry is preserved and displayed through a single navy CSS alpha mask. The marks remain the property of their respective organizations; their inclusion does not imply endorsement.

- Arclin: official header SVG from https://www.arclin.com/ (200 × 40 lockup).
- Wood: official logo from https://www.woodgroup.com/__data/assets/file/0024/368601/Logo-Wood-Sidara.svg. Credit: Wood PLC.
- Bayer: Bayer AG's mark via https://commons.wikimedia.org/wiki/File:Logo_Bayer.svg; original SVG at https://upload.wikimedia.org/wikipedia/commons/f/f7/Logo_Bayer.svg. Commons identifies it as a public-domain text logo, with trademark rights retained.
- Alcon: https://www.alcon.com/sites/g/files/rbvwei4411/files/alcon_assets/alcon-logo.svg.
- Georgia Tech: https://www.gatech.edu/modules/contrib/gt_tools/images/gt-logo.svg.

Retrieved October 28, 2026. No remote logo requests are made by the website.

The Background network uses local Arclin and Georgia Tech symbol derivatives in `public/logos/icons/`, retaining the original vector geometry. Wood and Alcon use their complete source lockups; Bayer retains its complete cross symbol. All marks render through the same navy mask treatment.

## Dithering shader

`src/components/ui/dither-shader.tsx` is adapted from the **Dithering** component by Paper Design, retrieved through the 21st.dev component registry (demo 17827).

- Component: https://21st.dev/@paper-design/components/dithering
- Upstream shader: https://shaders.paper.design/dithering
- License: Apache License 2.0; full text in `public/PaperShaders-Apache-2.0.txt`.
- Local changes: an authored wave field, 8×8 ordered Bayer quantization, grayscale palette props, pixel-size and speed controls, a bounded pixel budget, pause/resume, elapsed-time preservation, and reduced-motion handling.

The site uses shadcn/ui's existing Button and Base UI grouped controls. No external shader service or runtime asset requests are required.

## Display typography

Geist Pixel Square is locally hosted from https://github.com/vercel/geist-font and used only for the homepage display name. License texts: public/fonts/Geist-OFL.txt and public/fonts/Geist-LICENSE.txt.

## Geist Mono

The locally hosted `public/fonts/geist-mono-latin.woff2` is distributed with Next.js and originates from Vercel's Geist font family. Used for navigation and graph labels under the SIL Open Font License 1.1. See `public/fonts/Geist-LICENSE.txt` and https://github.com/vercel/geist-font.


## Favorites carousel and cover artwork

The About gallery is adapted from the 21st.dev CircularGallery component pasted by the user (circular-gallery-2.tsx). Local changes preserve natural image ratios, keep the title and controls in accessible HTML, confine pointer input to the gallery, add reduced-motion and offscreen handling, bound pixel density, and release GPU resources. It uses [OGL](https://github.com/oframe/ogl), distributed under MIT; see node_modules/ogl/LICENSE. The earlier Skiper/Swiper experiment is not included in the final implementation; no supplied sample artwork is used.

Cover artwork remains the property of its respective publishers/artists. Locally stored covers identify the selected works; they are not original portfolio artwork.

- Whiplash: Sony Pictures Classics, https://www.sonyclassics.com/whiplash/ (official anniversary poster).
- Swades: theatrical poster, https://en.wikipedia.org/wiki/Swades .
- Random Access Memories: Daft Life / Columbia / Sony, https://music.apple.com/us/album/random-access-memories/617154241 .
- My Beautiful Dark Twisted Fantasy: UMG, https://music.apple.com/us/album/my-beautiful-dark-twisted-fantasy/1443160553 (official clean cover).
- Born a Crime: Penguin Random House, https://www.penguinrandomhouse.com/books/537515/born-a-crime-by-trevor-noah/ .
- A Little Life: Penguin Random House, https://www.penguinrandomhouse.com/books/239717/a-little-life-by-hanya-yanagihara/ .
- 99% Invisible: podcast artwork via https://podcasts.apple.com/us/podcast/99-invisible/id394775318 .
- Hard Fork: The New York Times, podcast artwork via https://podcasts.apple.com/us/podcast/hard-fork/id1528594034 .
- Tangle: official purple logo from https://www.readtangle.com/ .
- The Economist: wordmark by The Economist from https://commons.wikimedia.org/wiki/File:TheEconomistLogo.svg (2009/2011 version). This simple text logo is marked public domain on Commons; trademark ownership remains with The Economist.
