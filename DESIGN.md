---
name: Research and Engineering — Process
description: Engineering paper, pixel identity and content-connected process diagrams.
colors:
  process-paper: "#fbfaf8"
  process-ink: "#203858"
  process-copy: "#454944"
  action-navy: "#243d63"
  action-hover: "#142844"
  muted-ink: "#536a7d"
  grid: "#a9bac8"
  pipe-inactive: "#bbc6ce"
  equipment-outline: "#587084"
  stipple-dark: "#71899d"
  stipple-light: "#a1b1bd"
  control-surface: "#edf1f5"
  utility-circuit: "#8da3b5"
  depth-process-line: "#7892a6"
  depth-utility-line: "#9aabba"
  signal-line: "#91a5b7"
  return-line: "#b0bcc5"
  selected-surface: "#e3e9ef"
  control-border: "#e4e1db"
  sweep: "#c9d8eb"
  sweep-selected: "#bacde5"
typography:
  display:
    fontFamily: '"Geist Pixel", "Instrument Sans", sans-serif'
    fontSize: "clamp(68px, 8vw, 100px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Geist Pixel", "Instrument Sans", sans-serif'
    fontSize: "clamp(48px, 7vw, 78px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: '"Instrument Sans", Arial, Helvetica, sans-serif'
    fontSize: "1.0625rem"
    lineHeight: 1.8
  body-compact:
    fontFamily: '"Instrument Sans", Arial, Helvetica, sans-serif'
    fontSize: "1rem"
    lineHeight: 1.75
  action:
    fontFamily: '"Instrument Sans", Arial, Helvetica, sans-serif'
    fontSize: ".875rem"
  navigation:
    fontFamily: '"Geist Mono", monospace'
rounded:
  control: "8px"
  filter: "8px"
  project-image: "8px"
spacing:
  prose-paragraph: "24px"
  resume-section: "44px"
components:
  ghost-control:
    backgroundColor: "transparent"
    textColor: "{colors.process-ink}"
    rounded: "{rounded.control}"
  print-action:
    backgroundColor: "{colors.control-surface}"
    textColor: "{colors.process-ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  filter-selected:
    backgroundColor: "{colors.selected-surface}"
    textColor: "{colors.process-ink}"
    rounded: "{rounded.filter}"
  footer-social:
    rounded: "{rounded.control}"
    width: "44px"
    height: "44px"
  affiliation-link:
    textColor: "{colors.process-ink}"
    rounded: "{rounded.control}"
    height: "60px"
    padding: "8px"
---

# Design System: Research and Engineering — Process

## Overview

The approved main website now uses the process design first developed on `/plant`. The homepage at `/` tells a five-stage engineering narrative; `/plant` permanently redirects there. About, Projects, Blog, Resume and detail pages share its engineering paper and margin circuits. The former classic homepage and ambient wave are retired from the public layout. The knowledge graph retains its established explorer and original technical background.

The visual character is open, technical and readable: warm paper, restrained navy, pixel display lettering, precise sans-serif reading copy and dithered original diagram geometry. The drawing connects physical systems, measurement, applied models and shared learning; it does not represent an operating plant. Existing factual records, portrait, project imagery and canonical reading destinations remain authoritative.

Use direct content labels: Background, Selected projects, Blog and Contact on the homepage. Remove repeated explanatory intros and decorative eyebrows where the heading or linked content already communicates the purpose. The header brand is the plain name without a leading icon; preserve its existing font.

Historical lineage: the October 26 al-folio study established academic organization; Sean Galvin supplied the open dither atmosphere; the October 28 Notion-inspired treatment established warm paper and quiet rounded controls. The approved process system supersedes earlier square-control, charcoal-only, full ambient-wave and classic-home composition instructions. Keep their useful reading restraint, sans-serif preference and original assets.

Retained reference context: [al-folio](https://alshedivat.github.io/al-folio/), [Sean Galvin](https://sean.rest/), [Paper dithering](https://shaders.paper.design/dithering) and [Notion page structure](https://www.notion.com/help/create-your-first-page) informed prior refinements. They are inspirations, not copied brand assets. Preserve existing third-party attribution in `THIRD_PARTY_NOTICES.md`.

[21st Animated Beam](https://21st.dev/@dillionverma/components/animated-beam) informed the connection and motion concept; the utility circuit uses original geometry, with no copied code, installed component or dependency. The [official shadcn ghost Button](https://ui.shadcn.com/docs/components/base/button) supplies the existing Button variant used by PrintResume; shared site styling controls its final appearance.

The local Awesome DESIGN.md IBM analysis (`references/design-md/ibm/DESIGN.md`, upstream [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)) informed this connection-coherence refinement through 4/8 spacing and flat geometry only. It is a third-party analysis, not an IBM-authored specification. Preserve this site's navy, pixel typography and rounded controls; no IBM palette, font or square-control replacement is adopted.

## Colors

The frontmatter records extracted current colors; process paper, ink and copy are actual custom properties in `src/styles/process.css`. Navy identifies headings, active circuits and actions. Blue-gray outlines, subdued equipment texture and sparse grid marks stay behind full-contrast reading content. Neutral rounded controls use pale-blue selection and a separately visible blue pixel sweep. Do not texture labels or body text.

## Typography

All fonts are locally hosted: Instrument Sans Latin variable WOFF2 for copy; Geist Pixel Square for identity and display headings; Geist Mono for navigation and graph labels. Preserve their existing OFL license files. No serif face or remote font request is needed.

Home display sizing is in frontmatter. Home section headings use `clamp(38px, 4.5vw, 56px)` with 1.08 line height. Subpage headings use the headline role; detail titles reduce to `clamp(34px, 4.5vw, 54px)`. Subpage section headings are 34px/1.2. Project-index titles stay Instrument Sans 500 at 23px/1.3; Blog links are 20px/1.4. Long prose is 17px/1.8 at 70ch maximum. Dates and diagram labels stay smaller and sharp. At 600px and below, prose becomes 16px and index headings 48px; detail and experience titles use `clamp(1.75rem, 8.8vw, 2.125rem)`, approximately 28px at 320px and 34px at 390px with the default root size.

Reading sizes use the actual `--process-reading-size`, `--process-reading-compact` and `--process-action-size` properties. At the default root size these are 17px, 16px and 14px respectively. Article prose explicitly uses compact 16px/1.75 (28px line height) at 600px and below; desktop remains 17px/1.8. Project GitHub actions and result counts use the action role; action links retain 44px targets and result counts use tabular numerals. Process subpage headings balance wrapping; process paragraphs and homepage copy use pretty wrapping. Keep the existing font families and layout.

## Layout

Use a 1200px process container. Standard subpage padding is 66px 100px 92px 48px; reading, experience and Resume surfaces reserve 160px on the right for the margin circuit. At 900px and below use 48px 74px 72px 28px, with 80px right clearance on reading surfaces. At 600px and below use 42px 48px 60px 22px.

Homepage copy alternates around a large connected process drawing. Its measured stages are feed/identity, conditioning/background, reaction/projects, separation/writing and feedback/contact. See `src/app/plant/DESIGN.md` for its detailed geometry. At 720–900px, equipment occupies an intermediate right rail; below 720px it becomes a thin spine. At 480px and below, portrait and biography stack.

About uses biography plus a 248×310 portrait, becoming 185×231 below 900px and stacking with a 148×185 portrait below 600px. Its three real career/foundation links form a dotted horizontal path, becoming vertical on phones. Project entries pair 168×128 images with text, reduce to 128×105 at 900px, and stack with 175px-high images below 600px. Blog rows pair titles and dates, stacking below 720px. Reading articles cap at 760px; article images retain their proportions and full color. Project miniatures use `object-fit: contain` and `filter: none` so complete schematic diagrams remain visible. Resume uses factual grouped entries and a dedicated print layout.

## Elevation & Depth

Keep surfaces flat. Fixed pointer-transparent canvases sit behind isolated content. A shared cached drawing stock uses broken 64-unit grid axes, 4-unit sampling and sparse seeded stipple. Measured reading masks clear the texture under content and fade it back over 28 units. Equipment uses paper fills, thin outlines, Bayer shading and sparse perimeter texture. Reading and Resume grids use 65% stock opacity. Avoid shadows, decorative cards and extra shader layers. Print removes canvases and switches to plain readable document styling.

An original cached process train in `src/lib/process-depth.ts` adds a faint second plane: feed tank → pump → four-port exchanger → stirred reactor → tray separator → product trunk, with a recycle return, shared dashed utility circuit and instrument taps. Continuous process pipes meet equipment at boundary nozzles; Bayer stipple stays inside vessels and the product/feed trunk joins successive tiles. Its 1100px-high tile scrolls at 0.32 times the page offset, at 27% opacity on wider screens and 20% below 600px. Flow routes cache segment lengths for packets on process and recycle paths. Reading masks clear this moving layer with 14px horizontal and 10px vertical clearance. Reduced motion restores normal page-relative scrolling and omits packets. It reuses the active canvas and existing frame loop; quiet reading surfaces still have no idle loop. Do not simulate depth with blur or add another animation clock.

The homepage foreground piping clears a 28px-wide corridor through the depth layer, reduced to 18px at widths of 900px or less. Redraw cached drawing stock after that clearance so paper texture remains coherent. A 14px stroke clearance around equipment outlines keeps rear circuits from appearing physically joined to the foreground plant. This is layer separation, independent of the reading masks.

## Shapes

Project miniatures are original navy and Bayer-style schematic SVGs in `public/projects/{psm,oclast,trading,arrhythmia,yield}.svg`, derived from the verified repository workflows. They illustrate methods and connections, not empirical performance, clinical results, exported data or facility drawings. Preserve descriptive alt text and complete diagram bounds.

Use capsule vessels, elliptical conditioning equipment, tray lines, small pixel marks, orthogonal process piping and dashed signals. These are original abstract drawings. Shared controls and project images use 8px corners; preserve sharp labels and the authored 8×8 icon vocabulary rendered at 16px. Do not add invented equipment IDs or facility data.

`src/lib/process-symbols.ts` defines the shared connection grammar. Process ports use a solid 1px stem with two flange bars, in the existing dark-stipple blue-gray; normal half-width/stem extents are 7px/12px and compact ones 4px/7px. Signals use a 1px `[2, 5]` dotted path, a 4px solid start square and a 6px hollow terminal. Active signals become solid navy at 1.6px. Main process piping remains solid; the desktop outer return uses a distinct 1px `[10, 5, 2, 5]` dash-dot path with no vertical Learning/feedback caption. Main equipment, project branches and subpage margin vessels share matching ports. Affiliation connections use orthogonal elbows, `[2, 5]` dots and square junctions rather than diagonal strokes.

## Components

Home, About, Projects, Blog and Resume appear in the shared navigation with the separate Knowledge graph entry. Footer has three named icon links for GitHub, LinkedIn and Email, each a 44px target. Keep visible focus and keyboard semantics. No floating global pause control is mounted; the graph retains its separate control.

`src/styles/process-controls.css` owns a shared borderless ghost treatment across navigation, filters, utility controls, footer links, disclosures and graph buttons: transparent at rest, no shadow, 8px corners and at least 44px height. Print and graph-motion controls use the pale utility surface with 10px 12px padding; disclosure summaries share that surface. Selected controls use the pale-blue plate, or the existing traveling indicator without a duplicate plate. Keyboard focus uses a 2px dotted navy outline offset 3px; forced colors use Highlight. PrintResume uses `Button variant="ghost"` with the existing DitherSweep. Keep the compact responsive navigation padding.

At 360px and below, the header brand uses 18px text with a 6px gap. Navigation uses zero gap and links at least 44px wide with 6px inline padding, keeping its five items on one row. The graph entry hides only its visible text, retaining the existing GraphMark within a target at least 44×44px. Its explicit accessible name and title remain “Knowledge graph”.

Project copy, canonical repository URLs, slugs and images come from `src/lib/project-previews.ts`, verified against GitHub listings and READMEs on October 29, 2026. The public set is PSM Knowledge Graph, OCLAST, Regime-Aware Sector Rotation, ECG Arrhythmia Classification, and Semiconductor Yield Optimization & RCA. Public project nodes and their connections, project listings and topic links use only that set. Index titles and the GitHub icon action link directly to repositories, with existing DitherSweep feedback; no separate Details action remains. The homepage retains three selected direct-repository links (PSM, yield and OCLAST) with GitHub icons. The five legacy `/projects/[slug]` URLs permanently redirect to their repositories; there are no internal project case-study pages. Shared cards suppress a duplicate Read more action when it would equal GitHub.

Homepage `PlantDiagram` measures section offsets and the three real project links, continuously revealing piping through a viewport marker at 62% height. The node, signal and microscopy project glyphs respond to pointer/focus; marker motion shares the diagram clock. Idle equipment stipple and revealed-path packets paint at approximately 25fps. The homepage About me action leads to `/about`; no Classic view link remains.

Homepage repository links explicitly name the project, GitHub destination and new-tab behavior for assistive technology. The Contact email action is also measured in the DOM: on desktop an orthogonal shared signal returns from the outlet beneath the action row to that link, becoming active on hover/focus. Omit this branch at 900px and below. Subpage content branches use the same shared signal terminals and active treatment.

In Background, `AffiliationLogos` forms a stationary 230×270px asymmetric network beside the career list; at 900px and below it sits above the list. Five absolutely positioned ghost links have at least 60px width and 60px height, with wider space for the full Wood and Alcon lockups. Navy alpha masks retain the Arclin symbol, intact Bayer cross and Georgia Tech monogram; Wood and Alcon use their complete local `/logos/wood.svg` and `/logos/alcon.svg` assets. Arclin and Georgia Tech retain local `public/logos/icons/` geometry. Faint pixel-dotted connections and junctions replace the circular orbits. Real experience/Resume/education destinations, accessible work/education names, DitherSweep, dotted focus and both background reading masks remain intact.

Only the selected logo mark scales to 1.08 on fine-pointer hover or keyboard focus, using a 220ms `cubic-bezier(.16, 1, .3, 1)` transition. Reduced motion removes transition timing. There is no continuous affiliation animation, orbit, circular guide or JavaScript loop. These affiliation assets retain separate brand authorship from the original process drawing.

`ProcessSurface` and `ProcessBackdrop` unify the subpages. About and indexes have a small margin vessel and traveling packets, with measured content connections and pointer/focus highlights. Detail, experience and Resume surfaces omit idle equipment and animation loops: they repaint on scroll and other invalidations. The margin reveal follows a 58%-height marker. Below 720px its rail is at width minus 22px and equipment/branch detail disappears.

Both canvases publish the wave frame consumed by the portrait edge mask. The homepage and animated subpages restore clock-driven portrait dithering. Reduced motion freezes time, omits packets and removes spatial transitions; scroll reveals and focus feedback remain usable. Hidden tabs cancel frames; disposal guards prevent work after navigation. Canvas device pixel ratio caps at 1.5. Resize, content observations and font readiness rebuild measured drawing stock. No added package or downloaded raster artwork supports this system.

Keep DitherSweep separate from selection motion: deterministic hashed pixel arrival fills a six-row, aspect-fitted grid over 520ms. A bounded 240ms selection glide provides finite continuity. Shared control color and surface transitions use 160ms; reduced motion removes transition timing. Forced colors and print omit sweep decoration. Reading text remains above every effect.

About retains the biography and color portrait. Favorites replaces the retired About actions and Background section. The user-supplied 21st.dev CircularGallery is adapted with OGL: a shallow curved track, natural cover proportions, small corners and subtle deformation only while navigating. A single DOM caption shows the selected title and a small media icon; podcast fillers stay labeled. Navy borderless 44px controls retain DitherSweep. The gallery is manual, with no autoplay or play/pause control. Caption and arrows form a single compact row below the art; the stage is 330px on desktop and 270px on phones. Navigation uses an interruptible 820ms quartic ease-out with frame-rate-independent, softly damped deformation. Wide wordmarks scale down proportionally to avoid overpowering the covers. Reduced motion disables curvature, deformation and interpolation. Dragging is local to the gallery with vertical page scrolling preserved; arrows and keyboard support every item. The GPU loop sleeps when settled/offscreen/hidden and releases resources on unmount. A regular image fallback remains available if WebGL or image loading fails. Background piping clears the whole carousel.

Projects retains topic filters and the native research-topic disclosure for the five curated projects. Research thread links target `/projects#thread-{threadId}`; deep links open the disclosure. Article and experience pages retain related reading and real method connections. Avoid decorative reveals that delay access to content.

## Do's and Don'ts

- Do use one shared engineering-paper material across the main site, with more motion on discovery surfaces and quiet reading margins.
- Do preserve the original portrait, project assets, factual technical detail, canonical routes and graph interactions.
- Do keep reading areas clear, controls usable at 44px, and responsive circuit clearance explicit.
- Don't restore the retired classic homepage, ambient wave, removed About hobby/book sections or old floating motion control without a new request.
- Don't turn the abstract process story into claims about a real plant, new publications or invented accomplishments.
- Don't add remote fonts, gratuitous looping effects or decorative card grids.

Project cards show two or three static method tags below each description. These use 12px text, navy `#203858` on `#eaf0f5`, 6px corners and a wrapping 6px gap. They identify libraries and ML skills, have no icons or motion, and are rendered as a labeled list. Canonical labels live in `project-previews.ts`.


The homepage introduction now combines the former hero and Background sections within #feed. The nested #conditioning anchor is retained as a measured process location, with a short Chemical and Biomolecular Engineering / PCOM paragraph and the affiliation network. Arclin and Georgia Tech appear once in the portrait introduction. About and Resume actions close this continuous opening. The separate Background heading, repeated career/education list and in-page Background button are retired. Both original right-side units remain connected: the opening vessel and exchanger are about 12–14% smaller on desktop, and the exchanger follows the nested background block. Later process stages retain their existing content and geometry.
