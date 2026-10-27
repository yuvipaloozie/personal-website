# Academic showcase design

The user approved the “Al-folio, refined” study on 26 October 2026, with topic browsing borrowed from the research notebook variation.

Use a calm white reading surface, compact biography, modest right-hand portrait, blue text links, and bibliography-like project entries with original project thumbnails. The existing background asset belongs to the knowledge-graph explorer. Keep the personal media shelf as a small interactive detail on About.

## Tokens

- Body and headings: locally hosted Lato, 400 and 700, with Arial/Helvetica fallback. Font license: public/fonts/Lato-OFL.txt.
- Ground: #ffffff. Text: #283039. Secondary: #596570. Accent: #24618b. Hover: #164563.
- Reading container: 920px including 40px side padding; 25px padding under 760px and 22px under 600px.
- Body: 16px, line height 1.75. Homepage name: 37px, 31px on phones. Section headings: 22–24px. Project headings: 18px. Supporting metadata: 12–14px.
- Profile: text plus 185×225 portrait, 36px gap. Stack below 600px and reduce portrait to 110×135.
- Sections: around 42px apart; no full-screen promotional hero, recruitment CTA, numbered spec labels, or decorative motion on reading pages.

## Behavior

Navigation uses About, Projects, Notes, CV. Topic controls use Base UI ToggleGroup/Toggle for keyboard navigation. Keep all projects reachable through /projects; the homepage starts with three selected entries. Follow-a-thread links come from the knowledge graph data. Reduced-motion preferences suppress nonessential motion. The graph keeps its own canvas interactions and original background treatment.

## Reference

Approved study: outputs/research-site-directions.html (Al-folio, refined), created in this chat's projectless workspace. Structural reference: https://alshedivat.github.io/al-folio/.
