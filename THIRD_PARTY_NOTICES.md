# Third-party interface assets

## Organization marks

The locally hosted SVG files in `public/logos/` identify Yuvraj's work and education. Original vector geometry is preserved and displayed through a single navy CSS alpha mask. The marks remain the property of their respective organizations; their inclusion does not imply endorsement.

- Arclin: official header SVG from https://www.arclin.com/ (200 × 40 lockup).
- Wood: official logo from https://www.woodgroup.com/__data/assets/file/0024/368601/Logo-Wood-Sidara.svg. Credit: Wood PLC.
- Bayer: Bayer AG's mark via https://commons.wikimedia.org/wiki/File:Logo_Bayer.svg; original SVG at https://upload.wikimedia.org/wikipedia/commons/f/f7/Logo_Bayer.svg. Commons identifies it as a public-domain text logo, with trademark rights retained.
- Alcon: https://www.alcon.com/sites/g/files/rbvwei4411/files/alcon_assets/alcon-logo.svg.
- Georgia Tech: https://www.gatech.edu/modules/contrib/gt_tools/images/gt-logo.svg.

Retrieved October 28, 2026. No remote logo requests are made by the website.

The circular Background cloud uses local symbol-only derivatives in `public/logos/icons/`: Arclin's symbol, Georgia Tech's GT monogram, and cropped original W/A letterforms from the Wood/Alcon wordmarks. The W/A crops are local display treatments, not claims of official standalone brand icons. Bayer retains its complete cross symbol. The full source lockups remain stored for provenance.

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
