# Third-party interface assets

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
