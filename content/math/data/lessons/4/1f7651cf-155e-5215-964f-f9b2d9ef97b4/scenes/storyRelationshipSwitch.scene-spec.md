# Story Relationship Switch — Scene Specification

Status: **Provisional Draft — pending Methodologist/editor approval**  
Owner: Educational Screenwriter  
Parent: [Lesson Content](../content.md), Sections 1–4; [Draft Brief](../methodologist-brief.md)  
Implementation: New **proposed**, self-contained, prop-free Scene; not yet available.

## Conceptual purpose

Operation selection follows the relationship of **known and unknown quantities**, not a word trigger. A contrast pair contains the same word “more” but switches who has the greater quantity. The Scene must keep that relationship explicit with labeled groups, without making longer bars a substitute for countable equal units.

## Learner actions and feedback per entry

**Entry A, Section 1:** Story 1: 7 shells in a box, 5 added → “before=7; change=+5; after=?” Learner predicts growth, selects 7+5=? (not 7−5=?), then reveals **12 shells**. Wrong subtraction feedback: “Five arrive and nothing leaves.” Story 2 is an independent starting state: 12 cards, 5 given away → 12−5=**7**. Wrong addition feedback: “Giving away reduces the collection; it cannot leave seventeen cards.”

**Entry B, Section 2, unknown larger:** “Ava has 9 beads; Sam has 4 more than Ava; how many does Sam have?” Label known Ava=9, unknown Sam, positive gap 4. Sam has **13** by 9+4. If 9−4 chosen: “Five is smaller than nine, so it cannot be Sam's amount when Sam has four more.”

**Entry C, Section 2, unknown smaller:** “Ava has 9 beads; Ava has 4 more than Sam; how many does Sam have?” Preserve the numbers 9 and 4 and the word “more,” but shift the greater-amount role to Ava; Sam has **5**, by 9−4. Show 5+4=9 as a relational check. If 13 chosen: “That would make Sam larger than Ava, contradicting the question.”

**Entry D, Section 3, known whole:** Fifteen markers total, six in a drawing box, remaining markers in a writing box. The learner first labels 15 as known whole, 6 as known part and ? as other part. Choose 15−6=**9 markers**. If 15+6 chosen: “Six is already inside the total fifteen; adding it again counts those markers twice.”

**Entry E, Section 4, independent transfer:** “Lina has 11 pencils. Lina has 3 more than Tom. How many does Tom have?” Show only the text and empty known/unknown roles. Expected “Lina is larger”, 11−3=**8**, reverse-check 8+3=11. A proposed 14 would make Tom greater and contradict the story. Hint 1: “Who has more?” Hint 2: “The smaller amount plus three equals eleven.” Reveal explanation on demand without grading.

## Objects, state, calculation invariants

Use complete localized story text, names attached to labeled unit-counted bars, known/unknown markers, a question label, operation options, optional comparison of exact totals, hints and reset. A single Scene entry owns its own active scenario and interactive choices. Mathematical evaluation must use the displayed operands and role relationship. No user action may switch the known person without visibly changing the story and mathematical model. The same word “more” is not an input to the mathematical rule; the roles are.

## Presentation and universal access

Place the relationship label, counts and comparison question in close reading order; illustrate larger/smaller with named equal-unit groups plus numerals, not solely bar direction. Keyboard/tap/switch users can make every selection and reveal the relation without mandatory dragging. All feedback is textual as well as optionally visual. Screen readers must announce each entity, quantity, larger/smaller relation and selected operation. RTL may reorder layout, not reverse which entity has more, the arrow's logical target or the subtraction operands. Provide meaningful real translations for all supported locales, zoom/reflow, visible focus, reduced-motion/static state and full offline functionality after implementation/download. Optional audio requires equal text.

## Acceptance cases for implementation

- 7+5=12 shells, 12−5=7 cards; directional changes correctly explained.
- Ava=9, Sam 4 more gives Sam=13. Ava=9, Ava 4 more than Sam gives Sam=5. Both contain “more.”
- Known whole 15 and known part 6 → missing part 9, not 21.
- Lina 11 and three more than Tom → Tom 8, not 14.
- Every wrong choice points to the violated quantity relationship; learners can revise choices and see explanations without a score.
- Independent reset, keyboard, screen-reader, RTL, zoom, reduced motion and offline scenarios preserve exact mathematics.

## Dependencies

The generic Playground renderer supports Scene resources, but this specific Scene is unimplemented. Coding Agent must validate actual context, semantic locales, WCAG 2.2 AA and tests before release. No invented API, Question correctness model, mastery record or Note persistence is authorized.
