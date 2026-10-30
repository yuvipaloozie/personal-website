---
name: Main homepage process composition
description: Detailed homepage geometry supplementing the root design system.
colors:
  navy: "#203858"
  action-navy: "#243d63"
  paper: "#fbfaf8"
  reading-ink: "#454944"
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
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.action}"
    padding: "12px 16px"
---

# Design System: Main homepage process composition

## Overview

This document details the process homepage now mounted at `/` through `src/components/ProcessHome.tsx`. The former experimental `/plant` route permanently redirects to `/`; the classic homepage is retired. Root `DESIGN.md` is normative for the shared process system across About, Projects, Blog, Resume and detail pages. This file retains homepage-specific geometry and responsive details; the graph keeps its established explorer.

The diagram is original abstract geometry drawn in Canvas 2D, inspired by process diagrams and P&ID symbols. It is not an operating plant drawing and uses no source diagram artwork. The affiliation cloud uses locally stored official SVG geometry; no new font download or package is introduced. Product facts continue to come from the shared profile, project previews and graph data.

Visible section labels are Background, Selected projects, Blog and Contact. The hero action is Background. Explanatory captions and repeated stage/writing intros are removed; retain the factual introduction, career entries, project summaries and ordinary destinations.

## Colors

The inherited navy and warm paper carry identity and ground. Route-local blue-gray outlines and stipple sit behind reading content. Active process piping uses navy; inactive piping remains pale. Keep labels sharp and solid. The shared navigation retains its global action navy and control states.

## Typography

Use the existing local font files: Geist Pixel Square for display headings, Instrument Sans for reading copy and diagram labels, and Geist Mono for shared navigation. Diagram labels are 14px Instrument Sans; the ML marker is 12px. The introduction is 24px with 1.4 line height. Project links are 20px; supporting summaries are 15px. These route sizes do not redefine classic-page typography.

## Layout

The content container is 1200px wide with 48px side padding, changing to 20px at widths of at least 1400px. Reading columns cap at 470px. Desktop copy occupies the left at feed, conditioning and separation, and moves right with 54% left padding at reaction. Keep diagram geometry in the complementary open space.

In Background, a stationary 230×270px affiliation network sits alongside the career list in `plant-background-details`, moving above it at 900px and below. Five asymmetrically placed links retain at least 60px width and 60px height, expanding for full Wood and Alcon lockups from `/logos/wood.svg` and `/logos/alcon.svg`. Navy masks retain the Arclin symbol, intact Bayer cross and Georgia Tech monogram, with local icon variants for Arclin/Georgia Tech. Loose pixel-dotted paths and junctions replace circular guides. Preserve real experience/Resume/education destinations, accessible names, DitherSweep and dotted focus. Only the selected mark scales to 1.08 on fine-pointer hover or keyboard focus over 220ms with `cubic-bezier(.16, 1, .3, 1)`; reduced motion removes transition timing. No orbit, continuous affiliation animation or JavaScript loop remains. Keep both background reading masks clear beneath the network.

| Section anchor | Reading purpose | Process geometry |
| --- | --- | --- |
| `feed` | Name, introduction and portrait | Vessel: Chemical engineering / Physical systems |
| `conditioning` | Engineering background and Resume | Exchanger: Automation / measurement; Process signals |
| `reaction` | Three applied projects | Stirred vessel: Applied machine learning; ML signal and project outputs |
| `separation` | Writing links | Tray column: Writing / shared methods |
| `feedback` | Contact and graph entry | Outlet valve, arrow, dash-dot outer return and measured Contact signal |

At 720–900px, use intermediate equipment on a right-hand spine at viewport width minus 110px, retaining exchanger, stirrer and tray internals. Below 720px, use small equipment on a thin spine at width minus 27px. Both omit diagram labels, utility detail and the return loop. Content uses 24px side padding; copy reserves 220px on tablets and 52px on phones. Project copy returns left. Headlines become 38px and the name uses `clamp(58px, 12vw, 80px)`. Narrow layouts shorten the conditioning, project and writing stages. At 480px or less, portrait and biography stack and the hero expands to 800px.

## Elevation & Depth

An isolated page layer holds a fixed, pointer-transparent canvas behind normal document content. Cached engineering paper uses a broken-pixel grid at 64-unit intervals with sparse seeded stipple. Measured reading masks remove texture beneath copy, closing content and the affiliation cloud, fading it back across 28 units of clearance. Paper-filled equipment, restrained outlines and desktop perimeter stipple provide depth without shadows or cards. A 28px-wide clearance corridor around the main path (18px at <=900px) separates it from the depth plane; cached paper stock is redrawn afterward. Equipment outlines clear a 14px stroke band. The original cached depth train connects a feed tank, pump, four-port exchanger, reactor, tray separator and product trunk through boundary nozzles, with recycle, shared utilities and instruments. Its 1100px tile uses continuous process pipes, vessel Bayer stipple and cached process/recycle flow routes. It draws at 27% opacity, or 20% below 600px, and moves at 0.32 times page scroll; reduced motion restores normal page-relative scrolling and omits packets. It uses the same canvas and frame loop, with independent reading masks. Root `DESIGN.md` specifies the shared depth material. Print hides the canvas and removes section minimum heights.

## Shapes

Equipment uses capsule vessels, an elliptical exchanger, tray lines, bow-tie valves, right-angle piping and a dashed instrument loop. Desktop geometry uses a 1200px design coordinate space; section-relative equipment positions follow measured content rather than a fixed page-length illustration. Actions and project links retain 8px corners and the existing pixel arrow vocabulary. Shared process ports have a solid 1px stem and double flanges (7px half-width/12px stem extent, compact 4px/7px). Shared signals use 1px [2, 5] dots, a 4px solid start and 6px hollow end, becoming solid navy at 1.6px on interaction. Primary piping stays solid; the outer desktop return is 1px [10, 5, 2, 5] dash-dot with no vertical caption. The stationary affiliation network uses orthogonal elbows, matching [2, 5] dots and square junctions.

## Components

The canvas is decorative and hidden from assistive technology; section headings and ordinary links carry the narrative. The inherited portrait, DitherSweep interactions, header and footer remain shared components. “About me” leads to `/about`; project entries link directly to their GitHub repositories with GitHub icons, while writing entries retain their article links. Resume, Projects, Blog and Graph links lead to canonical routes. Actions, text links and writing links have at least 44px height.

Homepage actions inherit the shared borderless 8px ghost treatment and dotted keyboard focus from `process-controls.css`; their former filled action surface is superseded. Keep labels and icons stationary, with pixel sweeps supplying action feedback.

The homepage selects PSM Knowledge Graph, Semiconductor Yield Optimization & RCA and OCLAST from the five curated projects in `src/lib/project-previews.ts`; legacy selected-project detail URLs redirect to repositories. Three measured `data-process-output` links connect the real projects to node, signal and microscopy glyphs: `p_psm`, `p_yield` and `p_chana`. Desktop branches run from the reactor to each link; narrow layouts place glyphs on the spine at the link's measured height. Pointer hover or keyboard focus highlights the corresponding output. Its bounded moving marker shares the existing diagram clock. Matching flange ports terminate each branch. Repository accessible names identify GitHub and new-tab behavior. On desktop, the DOM-measured Contact email action receives an orthogonal signal beneath its action row from the process outlet; hover/focus activates it. This branch is omitted at <=900px.

Scroll continuously reveals a navy path over the pale complete piping. Section offsets, output anchors and reading masks are measured on resize, ResizeObserver updates and font readiness; the cached grid rebuilds with that layout work. A viewport marker at 62% height maps between equipment anchors, then interpolates cumulative polyline distance so horizontal turns reveal continuously. Scrolling backward reverses the reveal.

Idle motion remains visible without scrolling: existing 8×8 Bayer thresholds stipple equipment with a slow sine field, while packets travel only along revealed piping. Paints are bounded to approximately 25fps, device pixel ratio to 1.5, and offscreen equipment skips stipple work. Hidden tabs cancel frames and reset the clock reference. Reduced motion freezes stipple time, omits packet and output-marker motion, and paints only on invalidation; scroll reveal and output highlights remain available. Disposal guards cancel pending work after navigation. No additional animation loop or raster asset is introduced; `src/lib/process-grid.ts` generates shared engineering paper locally in memory. PlantDiagram now publishes the wave frame used by the inherited portrait mask, restoring its clock-driven edge animation.

## Do's and Don'ts

- Do preserve sharp reading copy, open diagram clearance and the existing canonical destinations.
- Do keep homepage geometry distinct from the quieter shared subpage circuits. The old AmbientResearch layer is no longer mounted in the root layout.
- Don't apply these homepage-specific proportions to every reading page; follow root `DESIGN.md` for subpage rules.
- Don't imply the diagram documents a real facility or add invented process data.
- Don't restore the retired Classic view action or alter original portrait and factual project records when maintaining this composition.
