# Division Equality Checker — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding an Unknown Dividend](../content.md), Sections 3–4
Methodologist objective(s): Identify a missing dividend and verify its recovered value **in the original exact division**, distinguishing multiplication for finding from division for checking. [Methodologist Brief](../methodologist-brief.md).

## LEARNER PURPOSE AND CONCEPT

A child substitutes a proposed total into the very expression that had the box, then compares the actual quotient with the stated quotient. The Scene must make clear the different jobs of operations: multiplication discovers a total from equal groups; exact division verifies that total in the original equality.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Only exact division among G nonzero equal groups of S with whole W=G×S; groups and sizes 2–5, W≤20. In the **sharing model**, □ ÷ G = S means the number in each of G groups is S.
- Guided original: □ ÷ 3 = 4; candidate 9 yields 9 ÷ 3 = 3, **not** 4; 12 yields 12 ÷ 3 = 4, equal; 15 yields 15 ÷ 3 = 5, **not** 4.
- Independent original: □ ÷ 4 = 3; candidates 8→8 ÷ 4 = 2 (mismatch), 12→12 ÷ 4 = 3 (match), 16→16 ÷ 4 = 4 (mismatch).
- Each candidate has an exact quotient in the selected set. Do not generalize these choices to any candidate; division with a remainder is excluded from this Lesson, not assumed impossible in general.
- Multiplication retrievals: 3×4=12 and 4×3=12; keep the **chosen group-count/group-size story** attached to each example. The equals sign compares computed numeric values.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Guided entry / Section 3**

1. Display “□ ÷ 3 = 4”. Ask “What number could go into the box?” A child can first select “Show 3 groups of 4”, revealing the equal-group drawing/list, before choosing.
2. Choices 9, 12, 15 are native controls; picking one replaces only □ in the original displayed equality. Show evaluated left side and fixed right side in words and numerals.
3. 9: “Nine shared among three groups makes three in each. Our equality says four. This candidate does not fit.” 12: “Twelve shared among three gives four in each. Both sides say four.” 15: “Fifteen shared among three makes five in each, not four.”
4. After a wrong guess, preserve it as a **trial** rather than claiming the displayed unequal statement is true. Allow “Try another total” or “Show why”. Provide “Count 4 + 4 + 4 = 12” without requiring a guess.
5. Reveal “3 groups × 4 each = 12” and then **“12 ÷ 3 = 4”**. Optionally show the second exact grouping interpretation, twelve arranged into groups of three yields four groups, with a verbal label explaining how the story changes.

**Independent entry / Section 4**

1. New state: “□ ÷ 4 = 3” and prompt “If there are four equal groups with three in each, how many objects altogether?” Initially no answer or illustrated result.
2. Choices 8, 12, 16 and “Show groups”/“Hint”/“Show explanation”. Hint: “Count three once for each of the four groups.”
3. 8 produces “8 ÷ 4 = 2, not 3”. 12 produces “12 ÷ 4 = 3. Both sides equal three”. 16 produces “16 ÷ 4 = 4, not 3”. Reconstruct as 3 + 3 + 3 + 3 = 12; 4×3=12.
4. Prompt “What was missing—number of groups, objects in a group, or the total?” The learner may choose **the total**, speak to an adult or simply inspect the explanation. No automatic speech evaluation.
5. “Reset” clears a placement’s tentative choices without affecting the other Section. No score or mastery message.

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: original equality with an accessible “missing dividend” label, fixed divisor and quotient, candidate buttons, temporary substitution view, computed quotient, model of G groups, group-count/per-group labels, comparison text, hint and reset.
- Two separate prop-free Scene instances must start from their own examples; **do not invent a React mode prop**. Coding Agent may share mathematical utilities without sharing presentation state.
- State: source equality data W unknown, G/S fixed, candidate selected, show/hide equal-group explanation, placement-specific hints. Candidate C can be declared “fits” iff C/G=S with remainder 0.
- All displayed arithmetic must follow the original, not replace it with an unrelated fact; if an invalid non-exact candidate is ever introduced later, the Scene must not invent a quotient or claim a full exact division. Only current exact candidates are authorized.
- A counter visualization must have precisely C or G×S objects as labeled; avoid silently showing twelve while testing a wrong candidate nine.
- Incorrect equality is visibly “trial does not fit”, not misrepresented as a mathematical identity.
- A user can see full explanation without answering; no timer, forced tries, fixed threshold or hidden assessment persistence.

## VISUAL / AUDIO / MEDIA DIRECTION

Keep the original equality at eye level, large enough to read; show substitution exactly in the missing position and put “actual result” / “expected result” as two labeled values. Countable small equal-group display is optional until requested, with deterministic SVG/HTML. Animated grouping can be stepped through or skipped; no audio/video or image file is essential. No gamification or automatic success animation.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all source strings into the full supported locale roster; provide plain-language alternatives to dividend/divisor/quotient. Preserve operand meaning/order in RTL (never mirror ÷ into a different equality). Read complete statements as “unknown whole divided by three equals four” and, after choosing twelve, “twelve divided by three equals four; left equals right.” All comparisons have accessible text and group lists, not color-only cues. Keyboard/touch/switch input, visible focus, 200% zoom, reduced motion and screen-reader status announcements support the same investigative steps; no dragging or spoken response requirement. Entire model and feedback must function locally offline after package download on weak devices.

## ACCEPTANCE SCENARIOS

1. Guided □ ÷ 3 = 4: 9 gives 3 ≠ 4; 12 gives 4 = 4; 15 gives 5 ≠ 4.
2. Show groups before answer: three groups of four visibly/textually yield twelve with no leaked grade.
3. Independent □ ÷ 4 = 3: 8 gives 2 ≠ 3; 12 gives 3 = 3; 16 gives 4 ≠ 3; reconstruction 4×3=12.
4. The actual original expression remains visible during checking, including after an incorrect trial.
5. Neither Section’s choices leak to the other; hints/reveal/reset always work.
6. No remainder, divisor-zero or larger-scope examples are silently added.
7. Keyboard, screen reader, RTL, reduced motion, mobile and locally downloaded offline modes show identical calculations and explanatory meaning.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Scene rendering exists; this Scene and per-placement entries are **proposed** pending approval and later Design Scene/tests. The editor must preserve the **readiness-gated enrichment** restriction for grades 1–2. Coding Agent owns technical integration and genuine localization, Assessment Architect owns any future validated graded questions; none are created here.
