# Viewpoint Position Lab — Scene Specification

**Status:** Provisional Draft pending Methodologist approval.
**Owner:** Educational Screenwriter.
**Parent Lesson:** [Lesson Content](../content.md); [Methodologist Brief](../methodologist-brief.md).
**Implementation:** Proposed only. `scene` Resource type may exist; this bespoke component does not. **Scene interface:** self-contained and prop-free. No invented events, API fields, persistence or scoring.

## Pedagogical purpose

An object can stay still while its position words change when the observer walks around it. The learner must be able to **predict** a state, **change** a mathematically meaningful property, **observe** a contrast and **explain** its significance. A static animation or decorative drag is insufficient.

## Domain model and immutable rules

Two observers placed on opposite sides of a fixed table; real left-right labels change with vantage point; do not mirror the object world when switching locale.

## Interaction design and state transitions

- Objects/state: initial (front observer), prediction (same/different), opposite observer, compare both annotated descriptions, reset; fixed object coordinates.
- Show accessible starting information and a predicted outcome before the relevant reveal.
- Controls: labeled **Choose / Change / Compare / Explain / Undo or Reset**, adapted to the specific context of the Lesson. Use discrete accessible controls; any drag or gesture is optional enhancement.
- Every user action updates both the graphical model and a semantic text ledger with the same content. Show one new fact per step; never assume a narrative autoplays.
- A wrong prediction prompts a reasoned comparison, offers a hint and a retry, and does not lock progress or affect scores.
- Reset returns to the documented preset and clears only local presentation state. Each Section placement must stand alone and must not inherit another Section's model state.

## Exact acceptance scenarios

1. From the front, cup left of book; from behind, cup right of book.
2. Switching observers never changes coordinates of cup/book.
3. Without a named viewer, explain ambiguity instead of marking a direction universally correct.
4. A child can complete the reasoning without drag, color interpretation, sound or timed actions; explanatory feedback is the same.
5. A Section can be reopened and reset with no dependence on a previous Lesson or Program.
6. Mathematical labels and relationships remain correct under RTL and locale-specific presentation, including observer-relative directions.
7. A narrow mobile viewport, 200% text scaling, reduced-motion preference and offline use after download preserve the exact learning content.

## Visual and media specification

Use clear, low-complexity SVG/HTML geometric models with visible endpoints/markers where needed. Animation is optional and pausable; prefer instantaneous state change in reduced-motion mode. Do not embed translatable text into artwork. Labels and controls should remain legible on touch devices; geometry must not be distorted by container scaling.

## Localization and inclusive interaction

Prepare real translations for all supported locales; missing translation is a release blocker, never a silent English fallback. Use semantic rather than blanket RTL mirroring. Provide explicit narrated/textual descriptions of object relationships, ordered state summaries, keyboard/switch controls, visible focus, WCAG 2.2 AA contrast/target review, and nonvisual equivalent decisions. Optional audio has captions/transcript. All required material must load from offline assets; no cloud computation or media is necessary.

## Review and handoff

The Methodologist must approve the Brief before any content is formally approved. The editor then reviews the provisional scene specification. A future Scene Designer/Coding Agent verifies existing contracts, creates a tested prop-free component and real locale resources separately; no React, Question, Quiz or scoring is part of this PR.
