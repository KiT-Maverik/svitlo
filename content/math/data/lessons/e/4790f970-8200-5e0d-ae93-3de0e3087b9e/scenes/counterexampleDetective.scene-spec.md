# Counterexample Detective — Scene Specification

**Status:** Provisional Draft — pending explicit Methodologist/editor approval.
**Owner:** Educational Screenwriter.
**Parent:** [Lesson Content](../content.md), Sections 1–4; [Draft Brief](../methodologist-brief.md).
**Technical status:** Proposed self-contained, **prop-free** Scene entries; not an implemented Question/Quiz.

## Mathematical meaning and lesson purpose

A statement asserting “**every** member of a specified class has property P” is refuted by **one example satisfying the class conditions but violating P**. A confirming instance does **not** prove the statement for the entire class. A candidate outside the class cannot refute the claim, however surprising its calculation looks. Constrain all examples to nonnegative whole numbers 0–20 with accessible explicit criteria for odd and even. Do not let a click on any “false looking” result count as a valid counterexample without checking premises.

## Entry A — one true case, false universal leap (Section 1)

Begin with **1 + 3 = 4**, both addends odd, sum four. Ask whether observing this single case establishes the proposed rule “**Every sum of two odd whole numbers equals four**”. The learner may inspect a second case **3 + 5 = 8**, where the addends are odd but the total differs. Reveal each case's conditions and conclusion separately. Choosing “proves rule” gives “One pair does make four, but another pair of odd numbers makes eight.” Choosing “not proved” gets “Correct: one example only establishes that case.” Do not claim examples alone amount to a proof of a different true rule.

## Entry B — a valid counterexample must fit conditions (Section 2)

Claim: **“Every sum of two odd whole numbers is odd.”** Offer candidate pairs **3 + 5**, **4 + 5**, **1 + 3**, each as an inspectable card:

- **3 and 5:** both odd (premise met), sum **8** (even; conclusion fails) → VALID counterexample.
- **4 and 5:** one addend even (premise NOT met), sum **9** odd → NOT a counterexample to this claim.
- **1 and 3:** both odd, sum **4** even → ALSO valid counterexample.
  Ask two independent questions for each candidate: “Do BOTH numbers satisfy the conditions?” and “Does the conclusion hold for this case?” Only if first yes and second no may the Scene label it a counterexample. If 4+5 selected as a refutation, give “Four is even, so this pair doesn't fit the rule's two-odd condition.” If 3+5 selected: “Both are odd, but eight is even. One valid counterexample refutes ‘every sum is odd’.” Do not reject 1+3 as another valid counterexample.

## Entry C — supporting instances do not establish universality (Section 3)

Claim: “**Adding zero to a whole number leaves that number unchanged**.” Offer 4+0=4, 7+0=7, 12+0=12, all genuinely true. The child checks each, then chooses between “These cases support the claim” and “These cases by themselves prove it for all whole numbers.” Explain: “They are examples; confirming more cases still does not by itself cover every possible whole number.” Show a simple model of putting an _empty_ extra collection next to any counted collection as an intuitive invariant rationale, but do not present a formal infinitely quantified proof. Distinguish “we did not find a counterexample” from “we proved the claim.”

## Entry D — independent counterexample (Section 4)

Claim: **“Every whole number greater than five is odd.”** Present an adjustable numeric choice from **0–20** by buttons/keyboard text entry/accessible stepper. Test the chosen number with two visible checks: (1) **Is n > 5?** (2) **Is n odd?** To refute the claim, condition (1) must be true and condition (2) must be false. **6** is simplest valid case (6>5, six even); 8, 10, 12, 14, 16, 18 and 20 also valid. **4** fails the condition n>5, so it is not a counterexample; **7** meets the condition but is odd, so it is confirming, not refuting; **5** does not satisfy strict greater-than. Feedback must identify which part of the claim is met or contradicted, not generic “wrong.” Provide a voluntary two-part sentence builder: “My number is greater than five but not odd, because ___.” A “Show explanation” action works without any guess.

## Objects, state and core rule checks

Immutable per-entry universal statement text and domain, candidate operands or chosen number, **premise-check result**, **conclusion-check result**, learner's tentative classification, optional case evidence, hint and explanation visibility, reset. A valid counterexample for a “for all x satisfying A(x), P(x)” proposition is exactly a candidate with **A(x) true and P(x) false**. Other candidates are supporting instances or invalid-domain examples. Every calculation is recomputed from displayed operands; do not identify correctness by which card the learner clicked, and do not treat failing premise as evidence of false conclusion. Each public Scene entry owns local initial state, takes no props and shares no required state across Sections. No grade, mastery, assessment state, leaderboard, Note event or tracking.

## Inclusive interaction, translation and offline access

Every candidate's facts are exposed in a **text proof ledger**: claimed condition, chosen numbers, condition satisfied (yes/no), computed sum/parity or property, conclusion satisfied (yes/no), classification. Screen readers navigate the ledger with named headings and hear quantified phrases in genuine local grammar. All controls work by keyboard/switch/tap with visible focus and large targets; no mandatory dragging, hover, timed answers, microphone or decorative animation. Distinguish statuses by words and symbols, not color. RTL preserves relation and arithmetic meaning (including “greater than” and “both odd”), with bidi-safe numeric reading and true translation of quantifiers “every” / “some.” Every narration alternative, label, feedback and number word must be translated for all configured locales with no English fallback. Reduced motion, high contrast, zoom/mobile reflow and complete offline behavior after a future selected-language download are mandatory design targets, not current capabilities.

## Future acceptance criteria

1. 1+3=4 is a true instance but cannot establish that every odd+odd sum is four; 3+5=8 refutes that universal claim.
2. For “every odd+odd sum is odd,” 3+5=8 and 1+3=4 are valid counterexamples; 4+5=9 is NOT, because four is even.
3. 4+0=4, 7+0=7, 12+0=12 are confirming cases, not a proof of the universal identity claim by enumeration.
4. “Every number >5 is odd” is refuted by six (and other even whole numbers greater than five), not by four, five or seven.
5. Any free candidate passing the conditions and failing the conclusion is accepted regardless of preset answer identity; all feedback describes the exact reason.
6. Independent reset, keyboard/screen-reader, RTL, zoom, reduced-motion, offline-selected-locale and screen-reader proof ledger reveal equal logical conclusions.
7. No score, Quiz/Question integration or claimed mastery exists.

## Engineering/editorial dependencies

Only generic Scene resources have current renderer support; this particular Detective, its dictionaries and accessible interactions must be implemented and tested later. A Coding Agent must inspect actual app contracts, validate WCAG 2.2 AA and PWA completeness, and wait for separate Methodologist and Scene approval. The specification is editorial Markdown, not runtime code.
