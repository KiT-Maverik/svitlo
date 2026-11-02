# Solid Surface Observatory — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Recognize Solids by Their Surfaces](../content.md), Sections 1–4
Methodologist objective: [Draft Methodologist Brief](../methodologist-brief.md) — identify familiar 3D solids by their surface structures and invariant properties, not solely silhouette/color/object category. This Scene is not a new Skill.

## LEARNER PURPOSE AND CONCEPT

The learner predicts what a face-on drawing reveals, examines flat versus curved surfaces, changes a **viewpoint without changing the solid**, and justifies a classification from surface structure. The design must work equally as an accessible **property explorer** with no 3D display. Changing the orientation of a solid must not mutate its actual geometric properties.

Learner voice: "**I can look for flat faces, curved parts, bases and corners. Turning an object does not change which solid it is.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Models and properties are ideal mathematical shapes. Every display or real-world object analogy is an **approximation** and not a photographic source of mathematical definitions.
- **Cube:** model side length 2 arbitrary model units, dimensions (2,2,2); **six square flat faces**, equal edge lengths; a cube also satisfies the definition of a **rectangular cuboid** (square is a special rectangle).
- **Non-cubic rectangular cuboid:** model dimensions (4,2,2), six rectangular flat faces, including possible square end faces because two dimensions agree; edge lengths **not all equal**. Do **not** claim every non-cubic cuboid's face must be a nonsquare rectangle.
- **Sphere:** radius fixed; a continuous **curved** exterior with **no planar flat faces** and no polyhedral vertices. A 2D circular silhouette or filled circle-shaped rendering is a **depiction**, not its full geometry.
- **Right circular cylinder:** two parallel congruent flat **disk-shaped bases** and one continuous **curved lateral surface**. The disk is the 2D filled region; its boundary is a circle. Avoid treating the rolled lateral side as a flat rectangular **face**, even if a net could be drawn separately.
- **Right circular cone:** one flat **disk-shaped base**, one curved lateral surface and an **apex tip**. Any perspective projection that obscures the base must offer a side/base view and text property ledger.
- For polyhedral models, **edges** are straight line segments where neighboring flat faces meet, **vertices/corners** are points where edges meet. For curved models, do not force undefined or convention-dependent "number of edges" totals; distinguish circular boundaries and an apex without assessing polyhedral edge-count rules.
- A rigid 90° viewpoint change preserves all model geometry: dimensions, planar face shapes, number of bases, curvature and vertex types. Changing render size/color likewise does not change category.
- No 3D volume/area equations, net unfolding, exact hidden-edge counting or physical size inference from SVG dimensions.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A — The Same Face-on Square Can Hide a Solid (Section 1)

1. Initial: show a **square-shaped 2D depiction** with an explicitly ambiguous interpretation. Prompt: "**Does this tell us the whole object has no depth?**" Choices "It could be a flat drawing" and "It could show one face of a 3D object". Both interpretations are plausible **until additional information is revealed**; the Scene must avoid marking either wrong.
2. "Reveal chosen 3D model" introduces an **ideal cube** and states that the earlier square was one possible face-on view of its **front face**; text "Cube has depth and six square faces" becomes available.
3. Controls "Front view", "Top view", "Side view" select **predefined camera poses** while keeping the cube static. Each pose gives a text description: front/top/side view sees a square-shaped flat face; the whole cube remains 3D.
4. Before each change, ask whether it will become a different solid; "Reveal unchanged properties" shows six square faces and equal edges remain. Correct explanation is about object invariants, not a timed visual rotation.
5. If the learner says every square image must represent a cube: "A flat square on paper can also just be a square. The picture alone doesn't tell us the whole solid." If they think only the front face exists: "The view hides other faces; the model has depth."

### B — Flat Faces: Cube and Rectangular Box (Section 2)

1. Present cube dimensions (2,2,2) and a non-cubic **rectangular cuboid** dimensions (4,2,2); hide abstract numeric dimensions from learner unless descriptive property detail requested. Predict: "Do both have flat faces shaped like rectangles?"
2. Show model property ledger:
   - Cube: six flat **square** faces; because squares are rectangles, it is a type of cuboid; all edge lengths equal.
   - Elongated box: six flat **rectangular** faces; two opposite end faces may be square; not all edge lengths equal, so it is **not a cube**.
3. "Compare front/top/end" shows distinct dimension pair relationships, not arbitrary picture flattening. The learner can select "Which model has all edges equal?" and receive a reasoned answer.
4. Optional preset rotates the long box to a perspective with a square-looking end. It **must not** be mislabeled a cube merely because its visible front looks square.
5. Feedback: "Cube is a special rectangular box; square faces satisfy the rectangle rule." For "long box became cube": "The length 4 part stayed longer than the 2 parts even though the view changed."
6. Counts of all faces can be shown, but do not turn full edges/vertices counting into a graded goal (a later canonical Skill addresses such attributes).

### C — Compare Sphere, Cylinder and Cone (Section 3)

1. Show three **separately selectable** ideal solids of equal-ish _display prominence_ but different geometric properties (display size is irrelevant). Choices "Sphere", "Cylinder", "Cone" remain hidden until learner predicts which is which, if appropriate.
2. Model ledger:
   - Sphere: zero flat bases, continuous curved outside, no apex.
   - Cylinder: **two** flat disk bases, curved outside between, no apex tip.
   - Cone: **one** flat disk base, curved outside, one apex.
3. Ask: "Which has **no flat surface**?" Reveal sphere. "Which has **two** flat circular bases?" Reveal cylinder. "Which has a pointed tip and one base?" Reveal cone.
4. "Look from top" may show a **circular silhouette** for the cylinder and cone; text must explain **a circular top view is not the entire solid**. "Look from side" reveals one curved side/tip distinction.
5. If sphere is selected as cylinder: "A sphere has no flat bases; cylinder has **two**." If cone selected as cylinder: "Cone has one base and an apex, not two bases." If side of cylinder called flat: "It curves around the container; only its bases are flat."
6. Visual rotation optional; a textual list of exact surface categories and count of flat bases provides the full instructional contrast.

### D — Recognize from Another View (Section 4)

1. Display an **inclined cylinder** with its top ellipse-looking outline (perspective projection) and one hidden base; a full property hint remains available "two circular disk bases, one curved side".
2. Prompt: "Sphere, cone or cylinder? Name **one property** that rules out another." Learner selects from property choices ("two flat round bases", "one base and tip", "none") and names the solid.
3. Reveal: **cylinder**; the apparent ellipse is a **perspective projection** of a circular base, not proof of an actual elliptical base in the ideal model.
4. Unfamiliar second case: rotated small cube versus long non-cubic cuboid shown from square end. Ask which **has equal edge lengths everywhere**; explain why a square-looking face alone does not prove cube.
5. Feedback is about **surfaces**, with help/no help/retry choices. Avoid accuracy scores or forcing an exact category when only one insufficient face is visible; if insufficient information is intentionally shown, explicitly allow "not enough information yet" and provide another view.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** five ideal solid model definitions, fixed textual property inventory per model, preset face/top/side viewpoint controls, prediction and reveal choices, definition labels, face/base highlighting and selection, reset.
- **Per-placement state:** fixed Section-specific preset A–D, selected model, viewpoint, property currently highlighted, prediction, reveal step. Shared model definitions are immutable; resetting a Section returns _its own_ preset without leaking state into another Section.
- **Rule 1:** changing viewpoint is not morphing; preserve faces/bases/edge relations. A 2D view may be insufficient for identification; never silently force a false unique solution.
- **Rule 2:** cube ⊂ rectangular cuboid; a sphere has zero flat bases, cylinder two, cone one. Rims/curved surfaces are not arbitrary planar faces.
- **Rule 3:** no "physical geometry" via CSS/SVG pixel distances. Dimensions 2 and 4 are schematic relative proportions only.
- **Prop-free contract:** each exported Scene root for the authored Section takes **zero incoming props**. Internal helpers can use private data arguments, but public roots must rely on the verified real context for locale and label strings—not invented `shape`, `locale`, `mode` or callbacks.
- **Equivalent interaction:** independent **buttons and semantic tables** allow property inspection without pointer dragging/3D scene orientation; wrong predictions prompt the specific missing feature and opportunity to inspect again. No score, event API, user progress or persistence.

## VISUAL / AUDIO / MEDIA DIRECTION

Favor lightweight SVG or schematic diagrams and exact face lists over graphics-heavy WebGL if learning is equivalent. A visual 3D model may use 90° view presets, but no mandatory 3D drag. Label specific flat faces and curved areas using outlines/patterns and text, not hue alone. A cube must not be "stretched" into a cuboid during an alleged rigid rotation. Optional short flip animations are controlled and replaced with instantaneous views for reduced motion. Avoid depicting a circular cylinder base as mathematically elliptical—make clear projection and actual base shape differ.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Authentic translation for all configured locales of solid names, base/face/edge/vertex words, comparison statements, statuses, controls, hints and SVG descriptions; missing translation is a release blocker. Semantic RTL UI changes reading and focus placement **without** changing geometric surface counts or the identity of the displayed object. Expose structured properties to screen readers, including unseen backs of solids so nonvisual users have enough evidence to reason when the visually hidden feature is deliberately revealed. Do not pre-reveal intended final classification in generic accessibility labels; provide equivalently staged evidence. Keyboard/switch operation, visible focus, 200% text, large mobile targets, reduced motion, contrast, no sound/color dependency and WCAG 2.2 AA need implementation checks. Assets/model logic must be complete offline after verified package/locale download, with no remote geometry engine.

## ACCEPTANCE SCENARIOS

1. Stage A face-on square is acknowledged as **ambiguous**; revealing a cube then shows a 3D solid with six square faces. Changing camera to top/side does not change category.
2. A (2,2,2) cube has square faces/equal edge lengths; (4,2,2) cuboid has six rectangular faces with some square end faces but is **not** a cube. Both are rectangular cuboids.
3. Stage C sphere has zero flat bases, cylinder **two**, cone **one**; corresponding curved lateral surface and apex distinctions are correct.
4. Cylinder viewed from above does **not** become a plane circle; it remains 3D and a perspective-projected base is a disk of circular actual shape.
5. Inclined cylinder stage D remains identifiable by **two flat circular bases**, even if only one appears directly in the chosen view; an available second view and readable inventory provide proof.
6. A square-looking end of an elongated cuboid must **not** be presented as sufficient evidence for cube classification.
7. Distinct per-Section prop-free placements have independent resets and model state; no false assessment of exact edges/corners of curved solids.
8. Full learning is possible without 3D manipulation through text/property controls and with keyboard, switch, screen reader, RTL, mobile, reduced-motion and complete post-download offline modes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic `scene` Resource is supported in Playground, but **Solid Surface Observatory is proposed and not implemented**. Scene Designer/Coding Agent must verify actual Section/locale provider contract, implement component/tested mathematical inventories, render complete nonvisual states and assure offline packaging _after editorial approval_. No runtime Lesson, Question, Quiz, Note unlock API, scoring or invented props. Editor to review technical face/curvature terminology at Grade 2.
