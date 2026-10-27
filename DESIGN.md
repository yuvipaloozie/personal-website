# Academic showcase design

The user approved the “Al-folio, refined” study on 26 October 2026, with topic browsing borrowed from the research notebook variation.

Use a calm white reading surface, compact biography, modest right-hand portrait, blue text links, and bibliography-like project entries with original project thumbnails. The existing background asset belongs to the knowledge-graph explorer. Keep the personal media shelf as a small interactive detail on About.

## Tokens

- Typography: Instrument Sans throughout, locally hosted as a Latin variable WOFF2, with Arial/Helvetica fallback. No serif fonts: explicitly requested by the user. License: public/fonts/InstrumentSans-OFL.txt. Headings use 500 weight and tighter spacing; body uses 400.
- Ground: #ffffff. Text: #222420. Secondary: #62665f. Accent: #334f5b. Hover: #172d36.
- Reading container: 1000px including 40px side padding; 25px padding under 760px and 22px under 600px.
- Body: 16px, line height 1.75. Homepage name: 56px, 38px on phones. Section headings: 25px. Project headings: 21px, 18px on phones. Supporting metadata: 12–14px.
- Profile: text plus 185×225 portrait, 36px gap. Stack below 600px and reduce portrait to 110×135.
- Sections: around 42px apart; no full-screen promotional hero, recruitment CTA, numbered spec labels, or decorative motion on reading pages.

## Behavior

Navigation uses About, Projects, Notes, CV. Topic controls use Base UI ToggleGroup/Toggle for keyboard navigation. Keep all projects reachable through /projects; the homepage starts with three selected entries. Follow-a-thread links come from the knowledge graph data. Reduced-motion preferences suppress nonessential motion. The graph keeps its own canvas interactions and original background treatment.

Reading connections appear on both project and note pages, with existing summaries and method links that select the matching homepage research thread. Keep discovery informative and immediate.

## Reference

Approved study: outputs/research-site-directions.html (Al-folio, refined), created in this chat's projectless workspace. Structural reference: https://alshedivat.github.io/al-folio/.

The user supplied a James Holt reference for sans-serif typography, black/white contrast, fine rules, and deliberate alignment. Apply those details inside the academic structure. Keep the original portrait and imagery; no full-screen promotional typography, distortion effects, or invented achievements. Horizontal rules mark content sections rather than drawing a decorative grid across the page.

About includes the explicitly requested 21st.dev black-and-white Silk Blend as a full-bleed band. Preserve stops Slate 10%, Paper 57%, Ash 70%, Ink 96%, base angle 187deg, and the supplied RAF sway formula. Grain uses the user's CSS/SVG approximation; this is not an exact bitmap export. Pause/resume, reduced motion, offscreen and hidden-tab suspension are required. Source: https://21st.dev/community/gradients.

