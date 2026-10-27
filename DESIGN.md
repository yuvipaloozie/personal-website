# Academic showcase design

The user approved the “Al-folio, refined” study on 26 October 2026, with topic browsing borrowed from the research notebook variation.

Use a calm white reading surface, compact biography, modest right-hand portrait, blue text links, and bibliography-like project entries with original project thumbnails. The existing background asset belongs to the knowledge-graph explorer. About focuses on the professional biography and portrait.

## Tokens

- Typography: Instrument Sans throughout, locally hosted as a Latin variable WOFF2, with Arial/Helvetica fallback. No serif fonts: explicitly requested by the user. License: public/fonts/InstrumentSans-OFL.txt. Headings use 500 weight and tighter spacing; body uses 400.
- Ground: #ffffff. Text: #1b1b1b. Secondary: #3e3e3e. Accent: #292929. Hover: #080808.
- Reading container: 1000px including 40px side padding; 25px padding under 760px and 22px under 600px.
- Body: 16px, line height 1.75. Homepage name: 64px, 44px on phones. Section headings: 25px. Project headings: 21px, 18px on phones. Supporting metadata: 12–14px.
- Homepage profile: text plus 248×292 portrait, 48px gap. Tablet portrait 185×225. Stack below 600px with 148×176 portrait. Keep the introduction to one concise paragraph. About retains its compact portrait.
- Sections: around 42px apart; no full-screen promotional hero, recruitment CTA, numbered spec labels, or decorative motion on reading pages.

## Behavior

Navigation uses About, Projects, Notes, CV. Topic controls use Base UI ToggleGroup/Toggle for keyboard navigation. Keep all projects reachable through /projects; the homepage starts with three selected entries. Follow-a-thread links come from the knowledge graph data. Reduced-motion preferences suppress nonessential motion. The graph keeps its own canvas interactions and original background treatment.

Reading connections appear on both project and note pages, with existing summaries and method links that select the matching homepage research thread. Keep discovery informative and immediate.

## Reference

Approved study: outputs/research-site-directions.html (Al-folio, refined), created in this chat's projectless workspace. Structural reference: https://alshedivat.github.io/al-folio/.

The user supplied a James Holt reference for sans-serif typography, black/white contrast, fine rules, and deliberate alignment. Apply those details inside the academic structure. Keep the original portrait and imagery; no full-screen promotional typography, distortion effects, or invented achievements. Horizontal rules mark content sections rather than drawing a decorative grid across the page.

No decorative gradient bands: removed at the user's request.

Approved polish: use one graph-derived PSM illustration with halftone nodes. public/psm-connections.svg draws only method and work connections present in graphData; it represents this site index, not an exported PSM dataset. Keep all project dates in the same metadata position. Topic and reading controls share terminology. Standalone action links and mobile navigation have 44px minimum hit heights.

## October 27 reference composition

The latest user reference adds a pixel display headline, open spacing, offset project imagery, and stronger layered dithering. The homepage uses Geist Pixel Square only for the name (up to 96px), with Instrument Sans retained for readable body text and other headings. Selected projects alternate image and text on desktop and stack on phones. The full Projects index retains its academic bibliography structure.

The ambient artwork combines a label-free version of the real project-connection diagram with 21st.dev's Paper Design Dithering shader. Reading content stays in full-contrast ink. A global shadcn Button pauses motion; reduced-motion preferences freeze it; hidden tabs suspend rendering; the shader pixel budget is bounded. The graph explorer keeps its original background. Attribution and local modifications are in THIRD_PARTY_NOTICES.md.

## Coherent wave treatment

The latest requested background is a grayscale wave with 8×8 ordered Bayer dithering, three-pixel cells, and speed 0.6. The supplied demo API is implemented in src/components/ui/dithering-shader.tsx and wave-1.tsx. The counter placeholder from the pasted snippet is intentionally excluded. The wave replaces the random-looking field; muted graph geometry sits behind it. Deep-green foreground ink and soft mineral-green selected states share one palette. Cohere's third-party reference in the Awesome DESIGN.md library informed this restrained palette relationship, not its brand assets or fonts.

About's Outside the work and On my shelf sections are removed at the user's request. Do not restore them automatically. Page titles and the footer signature now share the pixel display face. A short portrait color-development transition, project-image hover feedback, and slow graph drift support the wave. Pause, hidden-tab and reduced-motion states cover both looping layers.

## Bold monochrome refinement

The graph silhouette is removed from the ambient layer. The grayscale wave is the only animated background: ink #111111 against white, at stronger desktop opacity and lower phone opacity. All foreground text and control surfaces use charcoal and neutral gray. Portraits stay grayscale with increased contrast and a subtle ordered pixel overlay; they no longer animate back to color. Project imagery uses the same grayscale treatment. Preserve the knowledge-graph explorer and the PSM illustration as content; removal applies to the background silhouette only.

Latest user correction: retain the grayscale wave but restore full-color portraits without a pixel overlay. Use restrained navy #243d63 for actions, #203858 for display headings/signature, and pale blue-gray selected controls. Reading text remains charcoal.

## Dither material and controls — 27 October 2026

Preserve the academic reading structure, Instrument Sans, Geist Pixel display headings, navy accent and original colour portrait. Dithering belongs to material transitions and interaction states, while labels and reading text stay sharp.

- Portrait: a still photo, irregular rounded perimeter, transparent 8x8 Bayer cells mixed with slowly interpolated seeded noise. Its CPU mask samples the ambient WebGL clock and wave equation at the photo's actual screen coordinates. Match the wave's pixel budget and cell alignment; round raster cell boundaries to prevent hairlines. Keep the facial core opaque. Pause both systems together; suspend invisible work. Reduced motion uses the original still photo.
- Controls: 44px targets, square corners, thin blue-gray outlines, navy ink. A selected filter gains a navy field that dissolves over its final 12px using the same Bayer family. Keep labels over the solid part. No continuous loops inside controls.
- Icons: one authored 8x8 grid vocabulary, rendered at 16px, currentColor, decorative beside explicit labels. Pixel arrows, code, document, mail, graph and pause/play share the display lettering's material. Leave long text links and main navigation quiet.
- Images and content: preserve original project images and bibliography-style entries. Do not texture body copy, introduce decorative cards, or add shader instances per control.

### Research and adaptation

References inspected on 27 October 2026. These are inspirations, not copied assets or claims of common authorship.

1. Sean Galvin, https://sean.rest/ and https://sean.rest/blog/personal-site-2026/ — live personal site and first-person account of using Paper's dithering shader. Borrow the separation between a calm reading layer and an expressive ambient field. Preserve our sans-serif brief rather than its serif typography or marketing copy.
2. Maxime Heckel, https://maximeheckel.com/ and https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web/ — shader-led personal work and explanation of ordered dithering/postprocessing. Borrow a consistent graphic vocabulary and mathematical treatment of texture, scaled down for an academic site.
3. Low-tech Magazine, https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/ — editorial site with dithered imagery and reading-first structure. This reference uses static dithered images; it is not an animated background example. Borrow clear text, limited colour and treating dithering as a coherent image language.
4. Paper, https://shaders.paper.design/dithering — direct shader reference for wave forms, random/ordered matrices, pixel size and controlled motion.
5. Awesome DESIGN.md's Vercel analysis (local reference library, third-party interpretation) — useful for compact controls and restrained spacing, not a source for a new palette or hero layout.

### Primary aesthetic anchor

The user selected Sean Galvin as the closest overall aesthetic on 27 October 2026. Treat its open composition, fine animated ground and quiet controls as the atmosphere reference. Keep our al-folio reading hierarchy and routes, original content, navy accent and sans-serif preference. Retain the existing pixel display lettering as a restrained signature. Use 2px background cells with matching portrait sampling, 27% desktop field opacity and 20% on phones; lighten inactive control outlines. Keep text and project organization calm. Do not import Sean's serif face, freelance/booking pitch, or one-page panel structure.
