# Half and Double: Divide by Two — Content

Status: Draft — provisional Screenwriter script pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/divisionHalvesAndDoubles/
Primary audience: Grade 2
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not editor-approved)
Target Skills: by2, doubleHalf — links in the Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Integrate exact division by two with halving/doubling as inverse actions; two equal shares are formed and their combined amount restores the whole. Distinguish two large shares from pairs of two.

12 ÷ 2 = 6, 6 + 6 = 12, and 2×6=12; 16÷2=8 with 2×8=16; 10÷2=5 with 2×5=10. For the sharing story 12÷2=6 means TWO groups each containing SIX; for grouping it means SIX complete groups of TWO. For thirteen whole counters divided among two groups, six each leaves one leftover; 13÷2=6 is not an exact whole-number equality. Whole even amounts ≤20; no forced half-objects or fractions.

The child first predicts, then performs an exact group action, then compares the observed amounts to the original mathematical statement. Explanation and retry are available without any graded gate.

## LEARNER JOURNEY

1. **Two Equal Halves:** Use 'Give one to each' for six rounds, distributing unique counters into two labeled trays; offer grouped actions and text totals.
2. **Double the Half:** Show both complete shares and allow the learner to recombine them and read both the addition and multiplication checks.
3. **Two Groups or Groups of Two?:** Show two explicitly labeled story panels: two groups of six vs six groups of two, preserving exact twelve and expression 12÷2=6.
4. **Halve Sixteen and Ten:** Offer independently reset 16- and 10-counter models, with optional odd thirteen contrast. Check eight and five by multiplying by two.

## SECTION PLAN

### Section 1 — Two Equal Halves

- **Objective:** Make two equal shares of twelve and name six as half.
- **Structure:** one ordered vertical LessonSection_Config, text → scene → markdown.
- **Text resource (available):** “Share twelve counters into TWO equal groups. How many in each?”
- **Scene resource (generic type exists; new implementation proposed):** [Half and Double Balance](./scenes/halfDoubleBalance.scene-spec.md). Use 'Give one to each' for six rounds, distributing unique counters into two labeled trays; offer grouped actions and text totals.
- **Markdown resource (available):** “Two groups each have six. Six is half of twelve.” Equation **12 ÷ 2 = 6**.
- **Child's meaningful action and feedback:** Use 'Give one to each' for six rounds, distributing unique counters into two labeled trays; offer grouped actions and text totals. For common wrong responses: If 7 and 5 are offered, compare group counts and rebalance one counter. The original counters and calculation remain inspectable; do not mark a false trial as a true identity.
- **Model:** each source counter, group total, group count, number in each, remainder (if any) and check have equivalent ordered text and focusable controls.
- **Navigation:** Offer replay, full explanation, and then the next conceptual contrast without mandatory success.
- **Accessibility/localization:** real locale strings, independent semantic LTR/RTL numerical ordering, keyboard/touch/switch and screen-reader actions, visible focus, reduced-motion and offline state parity.
- **Planned Note:** Half of an even amount is one of two equal shares., only after complete evidence and explanation, not a score or wired event.
- **Dependencies:** proposed self-contained prop-free scene entry; no invented API or runtime props.

### Section 2 — Double the Half

- **Objective:** Verify the half by doubling six to obtain twelve.
- **Structure:** one ordered vertical LessonSection_Config, text → scene → markdown.
- **Text resource (available):** “If one half is six, what is double six?”
- **Scene resource (generic type exists; new implementation proposed):** [Half and Double Balance](./scenes/halfDoubleBalance.scene-spec.md). Show both complete shares and allow the learner to recombine them and read both the addition and multiplication checks.
- **Markdown resource (available):** “Doubling means two equal groups of six; together they reconstruct twelve.” Equation **6 + 6 = 12; 2 × 6 = 12**.
- **Child's meaningful action and feedback:** Show both complete shares and allow the learner to recombine them and read both the addition and multiplication checks. For common wrong responses: If seven is chosen, show that six plus one differs from six plus six. The original counters and calculation remain inspectable; do not mark a false trial as a true identity.
- **Model:** each source counter, group total, group count, number in each, remainder (if any) and check have equivalent ordered text and focusable controls.
- **Navigation:** Offer replay, full explanation, and then the next conceptual contrast without mandatory success.
- **Accessibility/localization:** real locale strings, independent semantic LTR/RTL numerical ordering, keyboard/touch/switch and screen-reader actions, visible focus, reduced-motion and offline state parity.
- **Planned Note:** Doubling one half rebuilds the original amount., only after complete evidence and explanation, not a score or wired event.
- **Dependencies:** proposed self-contained prop-free scene entry; no invented API or runtime props.

### Section 3 — Two Groups or Groups of Two?

- **Objective:** Contrast two groups of six with six groups of two, labeling the quotient units.
- **Structure:** one ordered vertical LessonSection_Config, text → scene → markdown.
- **Text resource (available):** “What changes if we make GROUPS OF two instead of TWO groups?”
- **Scene resource (generic type exists; new implementation proposed):** [Half and Double Balance](./scenes/halfDoubleBalance.scene-spec.md). Show two explicitly labeled story panels: two groups of six vs six groups of two, preserving exact twelve and expression 12÷2=6.
- **Markdown resource (available):** “In sharing the six counts objects per group; in grouping it counts complete pairs.” Equation **12 ÷ 2 = 6**.
- **Child's meaningful action and feedback:** Show two explicitly labeled story panels: two groups of six vs six groups of two, preserving exact twelve and expression 12÷2=6. For common wrong responses: If child claims two groups in the pairing story, read every one of six pairs. The original counters and calculation remain inspectable; do not mark a false trial as a true identity.
- **Model:** each source counter, group total, group count, number in each, remainder (if any) and check have equivalent ordered text and focusable controls.
- **Navigation:** Offer replay, full explanation, and then the next conceptual contrast without mandatory success.
- **Accessibility/localization:** real locale strings, independent semantic LTR/RTL numerical ordering, keyboard/touch/switch and screen-reader actions, visible focus, reduced-motion and offline state parity.
- **Planned Note:** Half of an even amount is one of two equal shares., only after complete evidence and explanation, not a score or wired event.
- **Dependencies:** proposed self-contained prop-free scene entry; no invented API or runtime props.

### Section 4 — Halve Sixteen and Ten

- **Objective:** Transfer exact halving to sixteen and ten and check via doubling.
- **Structure:** one ordered vertical LessonSection_Config, text → scene → markdown.
- **Text resource (available):** “Find half of sixteen and half of ten, then double each answer.”
- **Scene resource (generic type exists; new implementation proposed):** [Half and Double Balance](./scenes/halfDoubleBalance.scene-spec.md). Offer independently reset 16- and 10-counter models, with optional odd thirteen contrast. Check eight and five by multiplying by two.
- **Markdown resource (available):** “Eight doubled is sixteen; five doubled is ten. A leftover in an odd model does not produce an exact result.” Equation **16 ÷ 2 = 8; 2 × 8 = 16; 10 ÷ 2 = 5; 2 × 5 = 10**.
- **Child's meaningful action and feedback:** Offer independently reset 16- and 10-counter models, with optional odd thirteen contrast. Check eight and five by multiplying by two. For common wrong responses: If nine is half sixteen, double nine gives eighteen; if six is half ten, double six gives twelve. The original counters and calculation remain inspectable; do not mark a false trial as a true identity.
- **Model:** each source counter, group total, group count, number in each, remainder (if any) and check have equivalent ordered text and focusable controls.
- **Navigation:** Close with voluntary reflection, no score or assumed mastery.
- **Accessibility/localization:** real locale strings, independent semantic LTR/RTL numerical ordering, keyboard/touch/switch and screen-reader actions, visible focus, reduced-motion and offline state parity.
- **Planned Note:** Doubling one half rebuilds the original amount., only after complete evidence and explanation, not a score or wired event.
- **Dependencies:** proposed self-contained prop-free scene entry; no invented API or runtime props.

## CUSTOM SCENE SPECIFICATIONS

- [Half and Double Balance](./scenes/halfDoubleBalance.scene-spec.md), four independent Scene placements described in a separate Draft specification.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- “Half of an even amount is one of two equal shares.” — proposed after complete model explanation.
- “Doubling one half rebuilds the original amount.” — proposed after complete model explanation.

These Notes are not implemented, persisted or scheduled; unlocking is not mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 introduces new numbers and a meaningful check. All interactions are formative; Assessment Architect owns separately validated scored Questions, Skill attribution and passing thresholds. Select-one Quiz support in the generic adapter does not implement these proposed Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate all text, controls, aria descriptions, status and feedback into every supported locale without fallback. A nonvisual learner must be able to perform each action with a keyboard and ordered interactive count ledger, not merely listen to a summary of a picture. RTL order must preserve the actual dividend/divisor/quotient. Ensure WCAG 2.2 AA, 200% zoom, mobile, reduced motion, child-sized targets and downloaded offline equivalence.

## PRODUCTION / PLATFORM DEPENDENCIES

Generic LessonSection_Config text/markdown/scene rendering exists, but Half and Double Balance is **proposed**. After approval, implement prop-free entries and own tests, full locale content, offline calculations and accessibility. Notes/review scheduling/PWA sync are separate product features. No React or Quiz implementation is authored here.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft.
- [Generated Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md), coordinator-owned and not edited.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- The combined lesson must provide separately observable understanding of division by two and the inverse half/double relationship.

## HANDOFF

Provisional Draft script plus Draft Scene specification for editorial review. Methodologist approval precedes Content/Scene review, then separate Scene Designer/Coding Agent work. No existing Lesson changed.
