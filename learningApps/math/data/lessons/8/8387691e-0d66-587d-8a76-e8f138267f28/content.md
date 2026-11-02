# Find Flat Shapes on and Through Solids — Lesson Content

Status: **Provisional Draft — Methodologist approval pending; NOT approved for implementation.**
Target Lesson: `learningApps/playground/Data/Lessons/1/flatFacesAndCrossSections/`
Audience: **Grade 3**, approximately 8–9 years, including nonvisual and alternative-input learners
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: identify plane figures on flat faces and bases, distinguish face from whole solid, identify deliberately oriented virtual plane sections and explain why sphere has no flat exterior face but can yield a circular plane section.
Target Skills: `shapeOnSolidSurface.data.ts` as linked in the Brief. Recognizing solids and flat figures are prerequisites, not new target Skills.
Program dependence: None
Implementation: **editorial only**; custom Scene not built and no runtime Lesson data.

## INSTRUCTIONAL CONCEPT

**"A flat piece of a solid is not the whole solid."** A cube has a square-shaped flat face, but a cube is not a square. A canlike cylinder has flat circular **disk** bases but its long exterior side is **curved**, not a planar rectangle. A virtual plane can pass through a solid and show a **flat region inside**, called a _plane section_ or _cross-section_: that region may be a rectangle or circular disk, depending on the solid **and the cut direction**.

This Lesson uses safe, imagined **virtual slicing only**. No physical knife, cutting of containers or adult materials. The everyday word "circle" often names a round filled shape, but the mathematical **circle** refers to the boundary while the **disk** includes its filled interior; explain this gently with a rim-versus-plate analogy, not advanced topology.

The source Skill includes both faces **and sections**; limiting the Lesson only to exterior faces would omit a material part of the competency. Therefore the intended depth is Grade 3, with only simple specified plane directions and a complete nonvisual alternative.

## LEARNER JOURNEY

1. Find one flat **face** on a cube or cuboid and compare its 2D boundary with the 3D object.
2. Inspect a cylinder's flat disk bases and curved exterior; contrast sphere with no flat _exterior_ face.
3. Predict which 2D filled region a **specific virtual plane** would reveal in a cuboid, cylinder or sphere; examine same solid before and after cut.
4. Transfer to unfamiliar view and explain whether an offered flat shape is **an exterior face, a virtual section, or merely a silhouette**.

Each Section remains a single-column ordered list of typed Resource blocks; any multi-view diagram occurs **inside** one proposed Scene block. No scored tasks or claim of mastery from one classification.

## SECTION PLAN

### Section 1 — The Square Face Is Not the Whole Cube

- **Purpose:** identify a flat 2D face and distinguish the region from an entire 3D solid.
- **Current shape:** `LessonSection_Config` with vertical Resource order.
- **Ordered blocks:**
  1. **text — available:** "Touch or imagine the flat **front face** of a cube. What shape is that **one face**? Is it the same as the whole cube? Now try a long rectangular box."
  2. **scene — existing Resource kind, proposed custom Scene:** [Faces and Virtual Sections](./scenes/facesAndVirtualSections.scene-spec.md), stage A. Cube with face highlight and separate face-only flat region **square**; rectangular cuboid of model dimensions **4×2×2** with a **4×2 rectangular face**, contrasted with the 3D whole. Show "Whole solid", "One exterior face", "Flat shape of face", "Read model". No visual 3D rotation necessary; fixed viewpoint buttons.
  3. **markdown — available:** "The cube is a **solid**, but one of its **flat faces** has the shape of a square. The long box has **rectangular flat faces**. A face has a flat region and a boundary; it is **part of** the solid's outside, not the entire solid."
- **Explanatory feedback:** If child calls a square a cube: "The square has only a flat area; the cube has depth and more faces." If they say the box front always looks like a rectangle from every perspective: "A perspective drawing can make the face look slanted. Its **true geometric face** is still rectangular."
- **Nonvisual equivalent:** Reveal text "Cube: exterior flat face is a filled square. Cuboid: selected exterior flat face is a filled 4-by-2 rectangle"; units are arbitrary diagram units, not measured centimeters.
- **Future Note:** "A flat face is a two-dimensional part of a solid."

### Section 2 — Flat Circular Bases, Curved Outside

- **Purpose:** distinguish exterior **flat** regions from a curved surface, and circle boundary from disk region.
- **Current shape:** one-column general Section.
- **Ordered blocks:**
  1. **text — available:** "A can has a flat round **top** and **bottom**. Is its wrapped-around side flat too? A ball looks round; does it have a flat outside face?"
  2. **scene — proposed:** [Faces and Virtual Sections](./scenes/facesAndVirtualSections.scene-spec.md), stage B. Ideal right circular cylinder: **top and bottom circular disk flat bases**, lateral side curved. Ideal sphere: **no flat exterior face**. Controls "Show disk face", "Show curved part", "Inspect sphere's outside" with explicit rule status. Use a rim-outline when naming the **circle** versus a filled flat disk for base area.
  3. **markdown — available:** "The cylinder's base is a **flat disk**: its outer rim is a **circle**. The long side wraps around and is **curved**, not a flat rectangle. A sphere has no flat exterior face at all. But that doesn't tell us what an imaginary flat slice through it might show."
- **Feedback:** "The cylinder side _looks_ rectangular in a drawing, but the actual side curves" if mistaken for flat. If sphere labeled as having a circular flat face: "A sphere has a round **outline** in a picture, not an outside flat disk."
- **Accessibility and direction:** A structured textual description lists outside areas and flat/curved property. Same semantic names in LTR and RTL. Rotate model among fixed views only on demand.

### Section 3 — A Virtual Flat Slice

- **Purpose:** introduce the plane-section concept without implying every cut through a solid is the same shape.
- **Current shape:** one-column general Section.
- **Ordered blocks:**
  1. **text — available:** "Imagine a perfectly flat, invisible sheet passing **through** a solid. The part where it meets the solid is a **flat section**. What shape would you see if the sheet stayed **parallel** to the front of a long rectangular box?"
  2. **scene — proposed:** [Faces and Virtual Sections](./scenes/facesAndVirtualSections.scene-spec.md), stage C. A cuboid of dimensions **4×2×2** with plane parallel to its **4×2 front face**, passing through interior yields a filled **4×2 rectangle**. A right circular cylinder with plane **perpendicular to its axis** (horizontal when cylinder stands upright) yields a filled **circular disk**. A sphere with plane **through its center** yields a filled **disk** with circular boundary. Three labeled predetermined cases, no arbitrary plane rotation or unsupported generalization.
  3. **markdown — available:** "A **section** is a flat shape made by an imaginary plane **inside** the solid. The box's face-parallel section is a **rectangle**. The cylinder's straight-across section is a **circular disk**. A sphere has **no flat face on the outside**—yet its central flat section is a disk. The **whole objects remain 3D**."
- **Predict/reveal:** Learner selects "rectangle", "disk" or "whole solid" before reveal; explanation names the **orientation of the plane** in every case. For "sphere cannot make a flat section": "The outside is curved, but an imagined flat sheet through the inside meets a flat disk-shaped region." For "all cylinder cuts are round": "Only the cut we defined—**perpendicular to its axis**—is guaranteed to make this disk."
- **Note:** "A plane section is a flat figure inside a 3D solid."

### Section 4 — Face, Section, or Just a Drawing?

- **Purpose:** independent transfer with a carefully worded classification challenge.
- **Current shape:** one-column general Section.
- **Ordered blocks:**
  1. **text — available:** "Three pictures all look round. One is a **filled top base of a cylinder**. Another is a **flat section through a sphere's middle**. The third is a **picture of the whole sphere**. Which are flat two-dimensional regions?"
  2. **scene — proposed:** [Faces and Virtual Sections](./scenes/facesAndVirtualSections.scene-spec.md), stage D. Three described models with independent reveal: exterior cylinder base = **flat disk face**; central sphere cut = **flat disk section**; whole sphere = **3D solid**, even if silhouette looks circular. Add a second classification: cuboid exterior 4×2 face versus its parallel interior 4×2 plane section; both rectangles but **different location/role**.
  3. **markdown — available:** "The top of the cylinder is an **exterior face**, the imaginary middle slice of the sphere is an **interior plane section**, and the whole sphere is a **solid**. Matching outlines do not make those three things identical."
- **Feedback:** "The shape of an outline is not enough. Ask whether this is **on the outside**, **a flat virtual cut**, or **the whole object**." Wrong choices receive the specific distinction, with no penalty or grade. Show nonvisual ledger distinguishing **flat** versus **3D** and **exterior** versus **section**.
- **Transfer without equipment:** Children describe the face and virtual section of a box from a labelled model, not by physically slicing any object.

## CUSTOM SCENE SPECIFICATIONS

- [Faces and Virtual Sections](./scenes/facesAndVirtualSections.scene-spec.md) — **proposed** self-contained, prop-free Scene concept with fixed safe virtual-section presets, surface/section text ledgers and no physical tools.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. Section 1 face reveal: "A face is one flat outside part, not a whole 3D solid."
2. Section 3 virtual cut: "A plane section is a flat shape where an imagined plane crosses a solid."
3. Section 4 contrast: "A sphere has no flat exterior face, but its central section is a disk."

These are editorial suggestions for **future** learner revision Notes. No actual Note ID, unlocking event, user state, notes sheet or scheduled review functionality is claimed.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Unscored stage D is an independently worded transfer. Any future Assessment Architect should vary exterior-versus-interior location and plane orientations with explicit accessibility descriptions, without asking children to classify an arbitrary oblique section on sight or claiming that observation alone proves mastery.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Genuine translations required for exterior face, curved side, flat disk, circle rim, plane section, "parallel/perpendicular" explained in age-appropriate everyday terms, all prompts, control labels, alternate model descriptions and feedback; missing locales block release. The scene's selected plane orientation and face/section identity must not flip incorrectly with RTL; direction and layout can mirror only if **geometry and descriptions are transformed together**. A nonvisual learner receives a sufficiently specified **orientation** and semantic state to reason about a section, not merely the shape name before the reveal. Keyboard/switch controls cycle through defined planes/models; no arbitrary 3D dragging, stereo vision, real slicing, audio or color-dependent identification. Reduced motion, WCAG 2.2 AA, focused labels, mobile and fully offline content/code after actual download remain implementation requirements.

## PRODUCTION / PLATFORM DEPENDENCIES

- **Available:** generic `LessonSection_Config` Resource blocks `text`, `markdown`, `scene`.
- **Proposed and unimplemented:** Faces and Virtual Sections model, deterministic virtual cut states, genuine context localization and nonvisual geometric reasoning, tests and offline delivery.
- A 2D schematic with clearly identified model and imaginary plane may be better than WebGL; never drop the **section** concept on low-powered devices. No runtime Lesson, Questions, Quizzes, scoring, physical safety instructions, Note persistence or invented event names.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md), direct canonical `shapeOnSolidSurface.data.ts` and previously transferred solid/plane-figure prerequisites.
- Editor: verify the central sphere slice and disk-versus-circle language are accessible to Grade 3; confirm nonvisual equivalence.
- Formal Methodologist approval is pending. Content and Scene specification are **Provisional Drafts** only.

## HANDOFF

Methodologist reviews concept completeness and grade suitability; Screenwriter/editor verifies exact planar geometry and verbal cues; Scene Designer implements from _approved_ specs later. Assessment Architect owns future scoring separately.
