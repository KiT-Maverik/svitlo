# Expression Match Lab — Scene Specification

Status: **Provisional Draft — pending Methodologist/editor approval**  
Owner: Educational Screenwriter  
Parent: [Lesson Content](../content.md), Sections 1–4; [Draft Methodologist Brief](../methodologist-brief.md)  
Implementation: **Proposed** self-contained, prop-free Scene; no existing component is claimed.

## Educational purpose and invariant

A child determines an unknown component so that the **whole expressions** on both sides of an equality have the same value. The box is one number, not necessarily the value of its side. Each visualization must preserve equal-sized count units; do not use an ornamental balancing scale as proof of numeric equality. Re-evaluate both side expressions after every change. Constrain inputs to whole numbers 0–20 and examples with nonnegative results.

## Experience beats and feedback

**Entry A (Section 1), 6 + □ = 4 + 5:** The right board displays four counters and five counters; the learner may reveal nine total. The left has six fixed counters and a candidate box. Let the learner predict 3 / 5 / 9, then inspect the two results. Candidate 3 → 6+3=9, true; candidate 5 → 11 against 9, false; candidate 9 → 15 against 9, false. For 9 give targeted feedback: “Nine is the value of the entire other side, but the box is only part of this side.” For 3: “Both sides make nine.”

**Entry B (Section 2), 7 + 2 = □ − 1:** The left value is nine. Provide an adjustable starting collection, then explicitly remove one unit. Candidate 9 leaves eight, 11 leaves ten; only **10** leaves nine. Read each revealed result aloud through equivalent text (audio optional). Correct feedback: “Ten minus one is nine; both expressions match.” Incorrect: “The box is the starting count, not the count left afterward.”

**Entry C (Section 3), 8 + □ = 6 + 5:** Begin with candidate **11** and ask whether the equality is true. Reveal left 8+11=19, right 6+5=11. Give a way to revise the box; candidate **3** yields 11/11. If the learner proposes moving the equals sign, reply: “Changing the symbol's position does not change either value.”

**Entry D (Section 4), □ + 4 = 5 + 6:** Fresh independent state with no prefilled number. Enable number entry plus accessible +/- controls. First hint: “Find five plus six.” Second hint: “What plus four makes eleven?” Candidate **7** passes because 7+4=11 and 5+6=11. Candidate 11 fails (15 versus 11); explain why copying the total is wrong. “Show explanation” must be available without any submission or score.

## Objects, local state, action semantics

Objects: full readable expression, fixed and editable side counts, optional grouped counters, candidate controls, “Count this side”, “Compare”, “Hint”, “Show reasoning”, “Reset” actions. State: one local scenario, entered integer or unset, separate revealed-total flags, optional tentative prediction and chosen explanation. The verdict is **left expression's evaluated number equals right expression's evaluated number**; never cache correctness based only on the candidate's ID, color or diagram height. An unset box must show “not yet filled,” not “false.” Each Section entry starts from its specified scenario independently; no cross-Section state, prop-based scenario selection or persistence is assumed.

## Accessibility, visuals and offline intent

Place each operand near its labeled counter group. Keyboard, switch and touch users must choose and adjust every candidate without drag. Screen readers announce expression, candidate, two computed side values and match/mismatch conclusion, never color alone. Provide text explanation alongside any animation, reduced-motion instant result, zoom/reflow and clearly located focus. RTL adapts interface labels and reading order but does **not** reverse subtraction operands or mathematical equality meaning. Translate all prompts, numerical speech, unit words, accessible labels and feedback faithfully into every supported locale (English only is an editorial source). All math and media should operate offline after a downloaded implementation; offline support is not presently asserted.

## Acceptance cases

1. A: 6+3=4+5 true; 6+5=11 versus 9; 6+9=15 versus 9.
2. B: 7+2=10−1 true; candidate 9 gives 8, 11 gives 10, both false.
3. C: 8+11=19 against 11 false; candidate 3 makes 11 against 11 true.
4. D: 7+4=5+6=11 true; candidate 11 makes 15 against 11 false.
5. Reset/isolation, explicit hints and user-controlled explanation work without a Question or score.
6. Keyboard, screen reader, small-screen zoom, RTL, reduced-motion and fully downloaded offline paths convey identical numerical reasoning.

## Editorial / technical dependencies

No React, Score, Quiz, Question, Note event or Lesson runtime config is implemented here. Coding Agent must confirm current Scene localization context and renderer, create localized strings, implement prop-free Scene components and tests, and obtain explicit editor approval of both Brief and Scene.
