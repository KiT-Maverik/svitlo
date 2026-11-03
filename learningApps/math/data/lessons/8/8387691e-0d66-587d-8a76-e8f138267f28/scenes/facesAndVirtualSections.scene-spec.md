# Faces and Virtual Sections — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Find Flat Shapes on and Through Solids](../content.md), Sections 1–4
Methodologist objective: [Draft Methodologist Brief](../methodologist-brief.md) — recognize 2D figures on 3D solids' **flat faces** and in **specified planar sections**, never confuse a part/representation with the whole 3D object.

## LEARNER PURPOSE AND CONCEPT

The learner first points to/reads an actual **flat exterior face**, then distinguishes it from curved exterior surfaces and from a **flat cross-sectional region created by a virtual plane inside** the solid. Viewing a 3D shape from the front may give the same _outline_ as a face or section while conveying a different geometric object. The interface must make the **face/section/whole** distinction explicit using controlled examples and a fully equivalent textual plan.

Learner voice: "**A face is flat on the outside. A section is a flat region in an imagined cut through the solid. Neither is the whole 3D object.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- **Face:** a planar 2D region forming part of the solid's **outer boundary**. The face of a cube is **square-shaped**; a selected face of a (4,2,2) cuboid can be a **4×2 rectangle**, with units abstract and not centimeters.
- **Cylinder:** an ideal right circular cylinder has two flat **filled disk-shaped exterior bases** and a **curved lateral exterior**. The boundary of a disk is a **circle**; the filled region is a **disk**. The curved outside is not a flat rectangle even if its unfolded net might be drawn as a rectangle.
- **Sphere:** a perfect sphere has **zero flat exterior faces**. Its silhouette or a painted circular outline on a depiction is not a planar face.
- **Plane section:** the intersection of a **solid body** with an imaginary plane, represented here as a **filled 2D region** (not just an outline line). The virtual cut must be explicitly placed **through the interior** at a stated orientation; "a plane is parallel to the cuboid's front face" means the section of a uniform cuboid is a same-sized rectangle in that orientation.
- Specific permitted examples only:
  1. Cuboid dimensions **4×2×2**, section by plane **parallel to the chosen 4×2 front face** inside the body → **4×2 filled rectangle**. Face is outside; section is inside.
  2. Right circular cylinder, plane **perpendicular to its central axis** through interior → **filled circular disk**. A plane at another angle need **not** produce a circular disk; avoid universal claim.
  3. Sphere, plane **through its center** → **filled circular disk** (the sphere does **not** acquire a flat exterior face; section is an internal imaginary intersection). A sphere plane offset from its center also produces a disk if it intersects, but **not necessarily same radius**; outside intended examples.
- Mathematical labels "circular base" and "disk face" are localized as one flat region and its rim as separate boundary. An actual cone or cylinder picture can use perspective distortion, but true sectional geometry is determined by the **model and plane**, not the projected outline.
- The original **solid stays 3D** in this thought experiment; a virtual plane reveals a part of it and does not turn the whole into a flat figure. No physical cutting instructions or sharp tools; no arbitrary oblique cuts, calculus, slicing technology, surface area or volume computation.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A — Find One Face (Section 1)

1. Fixed cube and cuboid models. Prompt: "**If we highlight just the front outside part of this cube, is it a square or another cube?**"
2. "Show whole cube" displays cube as 3D model with six square-shaped faces; "Highlight front face" emphasizes **one 2D planar square region**; "Extract shape description" reports "flat square on exterior of a cube". Do not imply the face gains depth when the model rotates.
3. For cuboid (4,2,2), choose its explicitly **4×2 exterior face** and report "flat rectangle" even if its perspective projection appears as a slanted quadrilateral. In an end view, the 2×2 face is **square-shaped**, also a rectangle.
4. Feedback if "the face is a cube": "This is just one **flat surface**; the whole cube has depth and other surfaces." For "the cuboid has no squares": "A 2×2 end face is square, while this selected 4×2 face is a nonsquare rectangle."
5. Nonvisual surface inventory names selected face and all other exterior faces without requiring visually separating an SVG region. Reset restores the selected front face and unpublished answer.

### B — Identify Flat Bases vs Curved Sides (Section 2)

1. Right circular cylinder and sphere are selectable independently. Ask: "**Does a sphere have a flat circular outside face just because it looks round?**"
2. Cylinder inspection reveals exactly two **flat filled disk bases**, with a **circular rim** around each, and one curved lateral surface. Highlighting the lateral part labels it **not a flat face**. The cylinder itself remains a 3D body.
3. Sphere inspection reveals **no flat exterior face**. In a front view, it can have a circular outline, but an outline is not the flat region of a face. Use state sentence "Curved outside everywhere" instead of an unavailable physical probe.
4. Wrong choice "cylinder side is a rectangle face": "Its side is **curved around** the tube, not a flat rectangle on the outside." Wrong choice "sphere has a disk face": "A circular-looking drawing is not an actual flat outside face."
5. Display circle vs disk distinction as **rim-only line** versus **filled base region** with text. Don't invent a new `image` Resource or a photo.

### C — Reveal Only the Specified Virtual Plane Section (Section 3)

1. Choose one of three specified solid/plane pairs, always with plane orientation explained **before** the learner predicts shape:
   - Cuboid (4,2,2), plane **parallel to its 4×2 front exterior face**, through interior.
   - Upright right circular cylinder, plane **horizontal** (perpendicular to axis), through interior.
   - Sphere, plane **through center** (orientation irrelevant for circular central section).
2. Prompt predicted section type: "Filled rectangle", "Filled disk", "Whole 3D solid" for each case. A text option "I need a clearer description" supplies plane orientation, not the predicted answer.
3. On "Reveal section", display flat **filled** 2D intersection region with a persistent tag **SECTION INSIDE**, and describe "Cuboid: 4×2 rectangle", "Cylinder: circular disk", "Sphere center: circular disk".
4. "Show original whole" restores 3D model **without** implying the virtual section becomes a new flat exterior face. "Compare outside" reaffirms: sphere outside has zero flat faces; cylinder outside has disk bases; cuboid outside has rectangular faces.
5. Feedback for "every cylinder slice is circular": "Only the shown cut **perpendicular to the axis** is guaranteed to be a disk in this Lesson. Different cuts can look different." For "sphere cannot have flat section": "The exterior curves, but the **virtual plane through the interior** meets a disk-shaped region." For "cube became a square": "The section is flat; the original solid is still 3D."
6. No free arbitrary plane rotation; the small set of correct predefined cases is the learning model, not an inaccurate unrestricted visual cutter.

### D — Classify What the Flat Shape Represents (Section 4)

1. Three independently described objects/scenes:
   - The flat **top exterior base of an upright cylinder** → filled disk **FACE** on outside.
   - A **central virtual plane section through a sphere** → filled disk **SECTION** inside.
   - The **whole sphere seen in a circular-looking silhouette** → **SOLID**, not a flat disk.
2. Prompt "Which is an _exterior face_, which is a _section_, which is the _whole solid_?" Offer three named options with keyboard accessible one-to-one assignments; a screen reader can hear each object's role description after preview.
3. Reveal each category and explain why two scenes may contain disk-shaped flat regions but represent different **part locations**, while the third is a 3D body. For sphere: "**No flat exterior face**, but a flat imagined central section." Avoid claiming the sphere's outside is now cut flat.
4. Second case contrasts cuboid **exterior 4×2 face** and **interior parallel 4×2 section**: both rectangles geometrically, different **roles**. The two are not interchangeable as locations.
5. Feedback for misclassifying a sphere silhouette as a disk face: "The picture's circular outline is a **view of a 3D ball-shaped solid**, not a flat outside region." For face as section: "One is on the outside; the other is on an imaginary plane inside."
6. Provide hint/revisit/reset controls and a fresh model without scoring; independent success is an explanation of **both shape and role**.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** ideal cuboid, cube, cylinder, sphere; selected planar exterior face; curved exterior highlight; predefined imaginary slicing-plane representation; cross-section region, role labels FACE / SECTION / SOLID; step-based selection, prediction, reveal, back/reset.
- **Local state per Section:** immutable model definition and plane preset, selected area/face, current visual/text view mode, prediction, reveal stage and feedback. Reset removes only this instance's reveal, leaving other Sections independent.
- **Invariant 1:** exterior face is _on boundary_; interior section lies _inside plane–body intersection_, cannot be called an exterior face by default.
- **Invariant 2:** true 2D region of the cuboid parallel section is 4×2 rectangle; right-cylinder perpendicular cut is disk; sphere central cut is disk. No "all cuts same" claim.
- **Invariant 3:** sphere has **no flat external face**, despite a flat central cross-section; cylinder's lateral surface is curved, not a planar rectangle.
- **Invariant 4:** viewpoint change or reduced-motion view switch cannot alter actual face/section roles or 3D identity. No nonlocal physics, measurement scale, online service or hardware.
- **Prop-free root requirement:** each public Scene component is independent and takes no incoming props. Internal helpers may share immutable models, but no guessed `solid`, `plane`, `locale`, `onChange`/session callback prop is permitted. Verify actual locale context when implementing.
- **Alternative interaction:** named solid/plane selector, "Inspect face", "Show selected plane", "Reveal flat region" and "Read comparison" buttons are equivalent to 3D gestures. Build a nonvisual diagram ledger before giving child the classification result.

## VISUAL / AUDIO / MEDIA DIRECTION

Use minimal high-contrast static SVG/HTML **3D schematics** and **filled 2D section cards**, preferably lightweight rather than graphics-intensive volumetric animation. Distinguish **plane sheet**, **highlighted intersection region**, and **whole solid** by labels/outlines/hatching, not color-only semantics. Render an **interior plane** with dotted boundary and explain "imaginary" to avoid suggesting actual cutting. Avoid real blades/photos, cutting instructions, fluid or material behavior. Perspective projection may look slanted but must not change true section labels. Animated swipe is optional, pauseable and replaced by instantaneous state in reduced motion.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Real supported-locale translations required for _face, base, curved side, disk, circle boundary, section, virtual plane, outside, inside, perpendicular/parallel_ and all control/feedback/audio-description strings. RTL UI order may mirror but physical model orientation must remain **explicit**, and roles/section shapes cannot accidentally flip. Give accessible **plane orientation description** before the learner predicts, in each of the four Section placements; don't reveal the answer by naming it in the pre-reveal alt text, while still allowing meaningful reasoning from the model. Keyboard/switch controls, large touch areas, visible focus, non-color-coded statuses, readable text list, reduced motion, mobile 200% zoom, screen-reader announcements and complete post-download offline operation are requirements. If a truly equivalent nonvisual 3D section presentation cannot be made, raise an explicit editor/accessibility blocker; do not silently remove sections.

## ACCEPTANCE SCENARIOS

1. Cube selected front exterior face is **flat square region**, not a cube; cuboid selected **4×2 face** is **flat rectangle** independent of perspective.
2. Cylindrical top/bottom exterior faces are **filled disks** with circular rims; cylindrical lateral exterior side is **curved**, not a planar rectangle.
3. Sphere has **zero exterior flat faces** in every view and full-sphere mode.
4. Cuboid face-parallel **interior** section is a filled 4×2 rectangle; section is **not** exterior face despite same shape.
5. Upright right cylinder cut horizontally, perpendicular to axis, has a **filled disk section**; no general statement about oblique cuts.
6. Sphere cut **through its center** yields a disk section even though exterior has no flat face; original sphere stays 3D.
7. Stage D correctly assigns exterior cylinder base=FACE, sphere central virtual region=SECTION, whole sphere silhouette=SOLID; explain same-looking outlines are not interchangeable.
8. Each Section independently resets, avoids invented public props, shows explicit plane direction and correct surface roles.
9. Keyboard, screen reader, RTL, reduced motion, mobile, low-end and complete post-download offline modes provide equivalent section reasoning without real cutting or color reliance.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Existing `scene` Resource supports embedding a custom component **only after it is authored and integrated**; this Scene is not implemented. Scene Designer must wait for approval, then engineer verified prop-free Section roots, accessible plane-section representations, locale resources and co-located tests. No real tools, runtime Lesson data, Question/Quiz/scoring, persistent Notes or fabricated API events. Editor to review filled-disk vs circle-boundary vocabulary and Grade 3 suitability.
