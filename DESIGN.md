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
---

# Design System: Research and Engineering — Process

## Overview

The approved main website now uses the process design first developed on `/plant`. The homepage at `/` tells a five-stage engineering narrative; `/plant` permanently redirects there. About, Projects, Blog, Resume and detail pages share its engineering paper and margin circuits. The former classic homepage and ambient wave are retired from the public layout. The knowledge graph retains its established explorer and original technical background.

The visual character is open, technical and readable: warm paper, restrained navy, pixel display lettering, precise sans-serif reading copy and dithered original diagram geometry. The drawing connects physical systems, measurement, applied models and shared learning; it does not represent an operating plant. Existing factual records, portrait, project imagery and canonical reading destinations remain authoritative.

Use direct content labels: Background, Selected projects, Blog and Contact on the homepage. Remove repeated explanatory intros and decorative eyebrows where the heading or linked content already communicates the purpose. The header brand is the plain name without a leading icon; preserve its existing font.

Historical lineage: the October 26 al-folio study established academic organization; Sean Galvin supplied the open dither atmosphere; the October 28 Notion-inspired treatment established warm paper and quiet rounded controls. The approved process system supersedes earlier square-control, charcoal-only, full ambient-wave and classic-home composition instructions. Keep their useful reading restraint, sans-serif preference and original assets.

Retained reference context: [al-folio](https://alshedivat.github.io/al-folio/), [Sean Galvin](https://sean.rest/), [Paper dithering](https://shaders.paper.design/dithering) and [Notion page structure](https://www.notion.com/help/create-your-first-page) informed prior refinements. They are inspirations, not copied brand assets. Preserve existing third-party attribution in `THIRD_PARTY_NOTICES.md`.

[21st Animated Beam](https://21st.dev/@dillionverma/components/animated-beam) informed the connection and motion concept; the utility circuit uses original geometry, with no copied code, installed component or dependency. The [official shadcn ghost Button](https://ui.shadcn.com/docs/components/base/button) supplies the existing Button variant used by PrintResume; shared site styling controls its final appearance.

## Colors

The frontmatter records extracted current colors; process paper, ink and copy are actual custom properties in `src/styles/process.css`. Navy identifies headings, active circuits and actions. Blue-gray outlines, subdued equipment texture and sparse grid marks stay behind full-contrast reading content. Neutral rounded controls use pale-blue selection and a separately visible blue pixel sweep. Do not texture labels or body text.

## Typography

All fonts are locally hosted: Instrument Sans Latin variable WOFF2 for copy; Geist Pixel Square for identity and display headings; Geist Mono for navigation and graph labels. Preserve their existing OFL license files. No serif face or remote font request is needed.

Home display sizing is in frontmatter. Home section headings use `clamp(38px, 4.5vw, 56px)` with 1.08 line height. Subpage headings use the headline role; detail titles reduce to `clamp(34px, 4.5vw, 54px)`. Subpage section headings are 34px/1.2. Project-index titles stay Instrument Sans 500 at 23px/1.3; Blog links are 20px/1.4. Long prose is 17px/1.8 at 70ch maximum. Dates and diagram labels stay smaller and sharp. At 600px and below, prose becomes 16px and index headings 48px; detail and experience titles use `clamp(1.75rem, 8.8vw, 2.125rem)`, approximately 28px at 320px and 34px at 390px with the default root size.

Reading sizes use the actual `--process-reading-size`, `--process-reading-compact` and `--process-action-size` properties. At the default root size these are 17px, 16px and 14px respectively. Article prose explicitly uses compact 16px/1.75 (28px line height) at 600px and below; desktop remains 17px/1.8. Project Details/Code actions and result counts use the action role; action links retain 44px targets and result counts use tabular numerals. Process subpage headings balance wrapping; process paragraphs and homepage copy use pretty wrapping. Keep the existing font families and layout.

## Layout

Use a 1200px process container. Standard subpage padding is 66px 100px 92px 48px; reading, experience and Resume surfaces reserve 160px on the right for the margin circuit. At 900px and below use 48px 74px 72px 28px, with 80px right clearance on reading surfaces. At 600px and below use 42px 48px 60px 22px.

Homepage copy alternates around a large connected process drawing. Its measured stages are feed/identity, conditioning/background, reaction/projects, separation/writing and feedback/contact. See `src/app/plant/DESIGN.md` for its detailed geometry. At 720–900px, equipment occupies an intermediate right rail; below 720px it becomes a thin spine. At 480px and below, portrait and biography stack.

About uses biography plus a 248×310 portrait, becoming 185×231 below 900px and stacking with a 148×185 portrait below 600px. Its three real career/foundation links form a dotted horizontal path, becoming vertical on phones. Project entries pair 168×128 images with text, reduce to 128×105 at 900px, and stack with 175px-high images below 600px. Blog rows pair titles and dates, stacking below 720px. Reading articles cap at 760px; original detail images retain their proportions and full color. Resume uses factual grouped entries and a dedicated print layout.

## Elevation & Depth

Keep surfaces flat. Fixed pointer-transparent canvases sit behind isolated content. A shared cached drawing stock uses broken 64-unit grid axes, 4-unit sampling and sparse seeded stipple. Measured reading masks clear the texture under content and fade it back over 28 units. Equipment uses paper fills, thin outlines, Bayer shading and sparse perimeter texture. Reading and Resume grids use 65% stock opacity. Avoid shadows, decorative cards and extra shader layers. Print removes canvases and switches to plain readable document styling.

An original cached utility circuit in `src/lib/process-depth.ts` adds a faint second plane of connected orthogonal paths, vessels, instrument taps and an exchanger. Its 760px-high tile scrolls at 0.32 times the page offset, at 22% opacity on wider screens and 16% below 600px. Reading masks clear this moving layer with 14px horizontal and 10px vertical clearance. Reduced motion restores normal page-relative scrolling and removes its traveling packet. It reuses the active canvas and existing frame loop; quiet reading surfaces still have no idle loop. Do not simulate depth with blur or add another animation clock.

## Shapes

Use capsule vessels, elliptical conditioning equipment, tray lines, small pixel marks, orthogonal process piping and dashed signals. These are original abstract drawings. Shared controls and project images use 8px corners; preserve sharp labels and the authored 8×8 icon vocabulary rendered at 16px. Do not add invented equipment IDs or facility data.

## Components

Home, About, Projects, Blog and Resume appear in the shared navigation with the separate Knowledge graph entry. Footer has three named icon links for GitHub, LinkedIn and Email, each a 44px target. Keep visible focus and keyboard semantics. No floating global pause control is mounted; the graph retains its separate control.

`src/styles/process-controls.css` owns a shared borderless ghost treatment across navigation, filters, utility controls, footer links, disclosures and graph buttons: transparent at rest, no shadow, 8px corners and at least 44px height. Print and graph-motion controls use the pale utility surface with 10px 12px padding; disclosure summaries share that surface. Selected controls use the pale-blue plate, or the existing traveling indicator without a duplicate plate. Keyboard focus uses a 2px dotted navy outline offset 3px; forced colors use Highlight. PrintResume uses `Button variant="ghost"` with the existing DitherSweep. Keep the compact responsive navigation padding.

At 360px and below, the header brand uses 18px text with a 6px gap. Navigation uses zero gap and links at least 44px wide with 6px inline padding, keeping its five items on one row. The graph entry hides only its visible text, retaining the existing GraphMark within a target at least 44×44px. Its explicit accessible name and title remain “Knowledge graph”.

Homepage `PlantDiagram` measures section offsets and the three real project links, continuously revealing piping through a viewport marker at 62% height. The node, signal and microscopy project glyphs respond to pointer/focus; marker motion shares the diagram clock. Idle equipment stipple and revealed-path packets paint at approximately 25fps. The homepage About me action leads to `/about`; no Classic view link remains.

`ProcessSurface` and `ProcessBackdrop` unify the subpages. About and indexes have a small margin vessel and traveling packets, with measured content connections and pointer/focus highlights. Detail, experience and Resume surfaces omit idle equipment and animation loops: they repaint on scroll and other invalidations. The margin reveal follows a 58%-height marker. Below 720px its rail is at width minus 22px and equipment/branch detail disappears.

Both canvases publish the wave frame consumed by the portrait edge mask. The homepage and animated subpages restore clock-driven portrait dithering. Reduced motion freezes time, omits packets and removes spatial transitions; scroll reveals and focus feedback remain usable. Hidden tabs cancel frames; disposal guards prevent work after navigation. Canvas device pixel ratio caps at 1.5. Resize, content observations and font readiness rebuild measured drawing stock. No added package or downloaded raster artwork supports this system.

Keep DitherSweep separate from selection motion: deterministic hashed pixel arrival fills a six-row, aspect-fitted grid over 520ms. A bounded 240ms selection glide provides finite continuity. Shared control color and surface transitions use 160ms; reduced motion removes transition timing. Forced colors and print omit sweep decoration. Reading text remains above every effect.

About foundation links reuse DitherSweep with an inner grid label for title, subtitle and arrow. The associated path node changes from gray-blue to navy on keyboard focus or fine-pointer hover over 140ms. Icons and labels remain stationary: the shared control rules suppress translation on foundation, project-action and thread-entry arrows. Reduced motion preserves static highlight and sweep states. Link semantics and real destinations remain unchanged.

Projects retains full topic filters and the native research-topic disclosure. Research thread links target `/projects#thread-{threadId}`; deep links open the disclosure. Detail pages retain related reading and real method connections. Avoid decorative reveals that delay access to content.

## Do's and Don'ts

- Do use one shared engineering-paper material across the main site, with more motion on discovery surfaces and quiet reading margins.
- Do preserve the original portrait, project assets, factual technical detail, canonical routes and graph interactions.
- Do keep reading areas clear, controls usable at 44px, and responsive circuit clearance explicit.
- Don't restore the retired classic homepage, ambient wave, removed About hobby/book sections or old floating motion control without a new request.
- Don't turn the abstract process story into claims about a real plant, new publications or invented accomplishments.
- Don't add remote fonts, gratuitous looping effects or decorative card grids.
