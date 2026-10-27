# Academic showcase design

The user approved the “Al-folio, refined” study on 26 October 2026, with topic browsing borrowed from the research notebook variation.

Use a calm white reading surface, compact biography, modest right-hand portrait, blue text links, and bibliography-like project entries with original project thumbnails. The existing background asset belongs to the knowledge-graph explorer. About focuses on the professional biography and portrait.

## Tokens

- Typography: Instrument Sans throughout, locally hosted as a Latin variable WOFF2, with Arial/Helvetica fallback. No serif fonts: explicitly requested by the user. License: public/fonts/InstrumentSans-OFL.txt. Headings use 500 weight and tighter spacing; body uses 400.
- Ground: #ffffff. Text: #17332a. Secondary: #536b60. Accent: #246b52. Hover: #154631.
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
