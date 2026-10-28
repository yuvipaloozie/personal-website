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

### Header and graph typography

Navigation now uses Blog and Resume. The knowledge graph has a top-right entry with a miniature pixel network and stepped dither halos. Mobile keeps the name and graph entry on the first row, with the four reading routes beneath. Measure header height for the full-screen graph inset.

Use locally hosted Geist Mono for navigation and graph labels (Next.js bundled Latin WOFF2, SIL OFL license in public/fonts/Geist-LICENSE.txt). Geist Pixel remains the name/display signature; Instrument Sans remains the reading face. Research: Vercel's https://vercel.com/blog/introducing-geist-pixel explicitly places Mono and Pixel in one related family; https://vercel.com/font describes Mono's readability-first origins. Roboto Mono and Space Mono were considered, but the shared Geist foundation gives this site's UI and display a more consistent voice. No remote font request is needed.

The explorer keeps its nodes, category expansion, pan, zoom, details and original technical background. Render nodes with the shared Bayer/wave material, remove soft glow and rounded label plates, use dashed connections and moving connection particles, and add pause/reduced-motion/hidden-tab controls. The header mark carries this behavior at miniature scale.

### Dither sweep interactions

Adapt the user-supplied Dither Sweep Navbar's deterministic `pixelOrder`/`Pixels` engine to the existing header and controls. Preserve the complete supplied component in `src/components/ui/dither-sweep-navbar.tsx`; its optional standalone header is not mounted. A small `DitherSweep` adapter reuses the exact 24×6 hashed left-to-right arrival pattern in our navigation, graph entry, topic/thread selectors, print action and motion controls. Use a 440ms interaction with 180ms cell fades, pale navy on white and a contrasting blue on dark selected controls. Keep one sharp label above the effect. Keep the existing layout, brand, routes, active indicators and component semantics. No continuous animation, new package, canvas or additional animation clock is needed. Reduced motion and the site's pause controls remove transition timing; coarse pointers do not get sticky hover effects; focus-visible gets the same treatment. Forced-colour and print modes omit the decoration.

## October 28 minimal editorial refinement (supersedes square-control rules)

The user requests less text and sleeker rounded components. Keep the Sean-inspired dither atmosphere and al-folio routes. Borrow concise project/writing lists from https://paco.me/ and https://brianlovin.com/; https://rauno.me/ informs interaction restraint, not a new layout or typography. Primary sources read October 28, 2026.

- Homepage: short factual role/education introduction, three concise research interests, three image-led project previews with a single-sentence summary, title/date-only blog links. Remove homepage filters and repeated graph explanation; keep full filtering on Projects and the graph in the header.
- Preserve the full technical descriptions and factual records on project pages and Resume. Short index copy is centralized in src/lib/project-previews.ts. About has two factual paragraphs. Blog index shows titles/dates, with full writing one click away.
- Put optional topic exploration in a native details disclosure. Deep links to a research thread open it automatically.
- Use rounded navigation, filters and utility controls; 18px image/disclosure corners. Remove the old ragged selected-control edge: the supplied pixel sweep remains the texture for interaction. Preserve visible focus, readable labels, touch targets, reduced motion, original portrait and project assets.
- Tighten the hero and project spacing so work appears sooner. Keep the large pixel name, but cap it at 84px. Use a quieter footer signature.

## Notion-inspired document treatment

The user requested Notion inspiration while retaining the typefaces and dithering. Preserve the concise content, academic routes, Geist Pixel/Geist Mono/Instrument Sans roles, original portrait and project assets, synchronized dither wave, graph and sweep feedback. Use warm off-white #fbfaf8, charcoal reading text, subtle neutral dividers, 7–12px corners, quiet rounded-rectangle navigation, a concise callout for role/education, property-style research tags and document-icon writing rows. Keep navy for identity/actions. Match the shader ground to the page colour so the artwork blends with the document surface. Preserve real information and avoid mock editor controls, unnecessary sidebars or additional text.

Reference: https://www.notion.com/help/create-your-first-page (primary source for pages and block structure) and the local Awesome DESIGN.md Notion analysis for neutral surfaces, charcoal, hairlines and small component radii. That analysis describes Notion's marketing site, so its colourful campaign/CTA styling is not adopted.

## Animate refinement

Motion thesis: retain the synchronized dither artwork as the focal moment. Add continuity to selection with one moving surface across navigation, project topics and research threads. Animate the native research disclosure's size only in supporting browsers. Give action arrows a 3px directional response for feedback. No global reveal/stagger sequence or additional looping decoration.

Use a 240ms Web Animations FLIP transform for the bounded selection surface, measuring the current rendered position when interrupted. Keep link/button focus and labels separate from the decorative surface. Reposition on resize and reveal; leave static selected styling as a no-JS fallback. Use 140ms arrow feedback and 240ms native disclosure transitions with an instant fallback. Reduced motion and global pause settle selection instantly and remove spatial transitions. Hidden tabs cancel finite selection motion. No new packages, frame loops or page-copy changes.

### Preserve visible button dithering

The dither sweep remains separate from the gliding selection surface. Fit its full staggered grid to each control (6 rows, aspect-derived columns) rather than clipping a fixed oversized 24-column grid. Use a clearer pale-blue fill with navy labels and a 520ms total sweep. Retain the supplied deterministic pixel ordering, hover/focus triggers, dark-button contrast, and reduced-motion/pause behavior. Observe sizing only; add no animation loop.

### Footer and floating-control cleanup

At the user's request, remove the floating ambient Pause motion button. Keep system reduced-motion preferences and hidden/offscreen suspension. Retain the explorer's separate graph control. Replace repeated footer identity/location, knowledge-graph link and visible Email text with three icon-only GitHub, LinkedIn and Email links, using verified profile URLs, accessible names/tooltips and 44px targets. Keep the top-right knowledge graph navigation. Footer icons also use the restored dither sweep.
