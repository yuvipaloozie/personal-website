---
name: Process experimental view
description: A route-local process narrative within the existing academic showcase.
colors:
  navy: "#203858"
  action-navy: "#243d63"
  paper: "#fbfaf8"
  reading-ink: "#454944"
  action-surface: "#e8edf2"
  pipe-inactive: "#bbc6ce"
  equipment-outline: "#587084"
  diagram-label: "#536a7d"
  stipple-dark: "#71899d"
  stipple-light: "#a1b1bd"
  paper-grid: "#a9bac8"
  equipment-perimeter: "#cad4dc"
  output-inactive: "#8a9faf"
typography:
  display:
    fontFamily: '"Geist Pixel", "Instrument Sans", sans-serif'
    fontSize: "clamp(68px, 8vw, 100px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Geist Pixel", "Instrument Sans", sans-serif'
    fontSize: "clamp(38px, 4.5vw, 56px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Instrument Sans", Arial, Helvetica, sans-serif'
    fontSize: "17px"
    lineHeight: 1.7
rounded:
  action: "8px"
components:
  process-action:
    backgroundColor: "{colors.action-surface}"
    textColor: "{colors.navy}"
    rounded: "{rounded.action}"
    padding: "12px 16px"
---

# Design System: Process experimental view

## Overview

This document applies only to `/plant`, an approved experimental alternative to the classic homepage. Its process-flow metaphor extends the existing paper, navy, pixel and dither vocabulary. It does not replace the root design system or change the default homepage, reading routes or graph explorer.

The diagram is original abstract geometry drawn in Canvas 2D, inspired by process diagrams and P&ID symbols. It is not an operating plant drawing. No source artwork, new font download or package is introduced for this route. Product facts continue to come from the shared profile, project previews and graph data.

## Colors

The inherited navy and warm paper carry identity and ground. Route-local blue-gray outlines and stipple sit behind reading content. Active process piping uses navy; inactive piping remains pale. Keep labels sharp and solid. The shared navigation retains its global action navy and control states.

## Typography

Use the existing local font files: Geist Pixel Square for display headings, Instrument Sans for reading copy and diagram labels, and Geist Mono for shared navigation. Diagram labels are 14px Instrument Sans; the ML marker is 12px. The introduction is 24px with 1.4 line height. Project links are 20px; supporting summaries are 15px. These route sizes do not redefine classic-page typography.

## Layout

The content container is 1200px wide with 48px side padding, changing to 20px at widths of at least 1400px. Reading columns cap at 470px. Desktop copy occupies the left at feed, conditioning and separation, and moves right with 54% left padding at reaction. Keep diagram geometry in the complementary open space.

| Section anchor | Reading purpose | Process geometry |
| --- | --- | --- |
| `feed` | Name, introduction and portrait | Vessel: Chemical engineering / Physical systems |
| `conditioning` | Engineering background and Resume | Exchanger: Automation / measurement; Process signals |
| `reaction` | Three applied projects | Stirred vessel: Applied machine learning; ML signal and project outputs |
| `separation` | Writing links | Tray column: Writing / shared methods |
| `feedback` | Contact and graph entry | Outlet valve, arrow and Learning / feedback return |

At 720–900px, use intermediate equipment on a right-hand spine at viewport width minus 110px, retaining exchanger, stirrer and tray internals. Below 720px, use small equipment on a thin spine at width minus 27px. Both omit diagram labels, utility detail and the return loop. Content uses 24px side padding; copy reserves 220px on tablets and 52px on phones. Project copy returns left. Headlines become 38px and the name uses `clamp(58px, 12vw, 80px)`. Narrow layouts shorten the conditioning, project and writing stages. At 480px or less, portrait and biography stack and the hero expands to 800px.

## Elevation & Depth

Keep the route flat. An isolated page layer holds a fixed, pointer-transparent canvas behind normal document content. Cached engineering paper uses a broken-pixel grid at 64-unit intervals with sparse seeded stipple. Measured reading masks remove texture beneath copy, captions and closing content, fading it back across 28 units of clearance. Paper-filled equipment, restrained outlines and desktop perimeter stipple provide depth without shadows or cards. Print hides the canvas and removes section minimum heights.

## Shapes

Equipment uses capsule vessels, an elliptical exchanger, tray lines, bow-tie valves, right-angle piping and a dashed instrument loop. Desktop geometry uses a 1200px design coordinate space; section-relative equipment positions follow measured content rather than a fixed page-length illustration. Actions and project links retain 8px corners and the existing pixel arrow vocabulary.

## Components

The canvas is decorative and hidden from assistive technology; section headings and ordinary links carry the narrative. The inherited portrait, DitherSweep interactions, header and footer remain shared components. “Classic view” returns to `/`; project and writing entries use their existing detail links. Resume, Projects, Blog and Graph links lead to canonical routes. Actions, text links and writing links have at least 44px height.

Three measured `data-process-output` links connect the real projects to node, signal and microscopy glyphs: `p_psm`, `p_yield` and `p_chana`. Desktop branches run from the reactor to each link; narrow layouts place glyphs on the spine at the link's measured height. Pointer hover or keyboard focus highlights the corresponding output. Its bounded moving marker shares the existing diagram clock.

Scroll continuously reveals a navy path over the pale complete piping. Section offsets, output anchors and reading masks are measured on resize, ResizeObserver updates and font readiness; the cached grid rebuilds with that layout work. A viewport marker at 62% height maps between equipment anchors, then interpolates cumulative polyline distance so horizontal turns reveal continuously. Scrolling backward reverses the reveal.

Idle motion remains visible without scrolling: existing 8×8 Bayer thresholds stipple equipment with a slow sine field, while packets travel only along revealed piping. Paints are bounded to approximately 25fps, device pixel ratio to 1.5, and offscreen equipment skips stipple work. Hidden tabs cancel frames and reset the clock reference. Reduced motion freezes stipple time, omits packet and output-marker motion, and paints only on invalidation; scroll reveal and output highlights remain available. Disposal guards cancel pending work after navigation. No additional animation loop or raster asset is introduced; engineering paper is generated locally in memory. The inherited portrait's static wave-time fallback on this route remains unchanged.

## Do's and Don'ts

- Do preserve sharp reading copy, open diagram clearance and the existing canonical destinations.
- Do keep this extension local. AmbientResearch excludes `/plant` so the classic wave does not compete with the process canvas.
- Don't promote these route-specific proportions or process symbols into global site rules.
- Don't imply the diagram documents a real facility or add invented process data.
- Don't replace root `DESIGN.md`, `.impeccable` files, original portrait or shared project records when maintaining this route.
