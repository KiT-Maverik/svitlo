# Statement Verifier — Scene Specification

**Status:** Provisional Draft — pending Methodologist/editor approval.
**Owner:** Educational Screenwriter.
**Parent:** [Lesson Content](../content.md), Sections 1–4; [Draft Brief](../methodologist-brief.md).
**Availability:** Proposed prop-free and self-contained Scene, not an implemented Question or Quiz.

## Mathematical and pedagogical purpose

Each complete equality or strict inequality is a mathematical **claim**, true only if the evaluated values of both complete sides satisfy the _specified_ sign. The comparison must be based on the actual numbers, never the orientation of a decorative picture or merely the leftmost numeral. In particular, equal values satisfy = but **not** < or >.

## Experiences, learner actions and feedback

### Entry A — two different expressions, same value (Section 1)

Display 3 + 5 = 4 + 4 and two quantity boards, each with its own “Show count” control. Prompt “Is it true?” before revealing totals. Board A totals eight; board B also eight. The original equality is true. If the learner picks false because the arrangements look unlike, respond “Three plus five is eight. Four plus four is also eight. Both values match.” Mark prediction as revisable and do not record success/failure.

### Entry B — compare evaluated values with strict signs (Section 2)

First show 7 < 8 and 8 > 7, with text “seven is less than eight” and “eight is greater than seven”; this explains sign meaning rather than teaching a nonmathematical mnemonic. Show 5 + 2 < 4 + 4 with totals concealed. Allow evaluation of left=7 and right=8 in either order, then invite true/false verdict: true because 7<8. Incorrect false feedback: “The first value is seven, the other is eight; seven really is smaller.” Next show 9 − 2 > 3 + 5, left=7, right=8. The claim is false because 7 is not greater than 8. The learner may revise after revealing values.

### Entry C — equal numbers do not satisfy a strict inequality (Section 3)

Display 4 + 6 < 8 + 2. After prediction reveal 10 on left and 10 on right; original claim is false. Offer relation-change controls =, < and > while **keeping operands fixed**. Choosing = yields 10=10, true. Retaining < or selecting > gets explicit feedback “Ten is neither less than nor greater than ten; it is equal.” Show both **original** and **edited** forms with labels; never rewrite history to suggest the original was true.

### Entry D — independent transfer (Section 4)

Display 5 + 6 > 8 + 2 with no initial arithmetic hint. The learner can explicitly reveal a hint for each side, then select verdict. Values 11 and 10, so the claim is true. Wrong false verdict: “Eleven is greater than ten, so the statement is true.” Optional contrast 8 − 3 > 2 + 4 is 5>6, false; a correct repair is 8 − 3 < 2 + 4. An always-available “Show explanation” action presents these calculations without requiring a guess.

## Objects, initial states and invariants

- Complete operand/expression text for each side, original relation operator, independently disclosed numeric values, learner verdict, optional replacement operator in entry C, explanation and hint reveal states, Reset.
- Calculate side values from the expressions shown. For = compare numeric equality; for < compare strictly less; for > compare strictly greater. A chosen answer must **never** determine the result calculation.
- No automatic state transfer between entries; each is a self-contained public no-props Scene with its own initial scenario. Reusing internal math helpers is allowed, inventing external props, learner records or assessment APIs is not.
- A verdict of false is a _teaching decision_, not a score or Skill mastery measurement. Always show why the relationship fails.

## Visual/media and universal access

Use a compact expression row with separate optional counted groups. All information must be accessible as text and speech-ready mathematical descriptions; reading a bare sign without its relation meaning is insufficient. Color may emphasize but never encode truth alone. Controls support keyboard/touch/switch; no hover, drag, timer, audio-only or animation-only path. Use explicit left/right semantic labels adapted to locale layout while preserving mathematical operand order and sign meaning in RTL. For example, 7 < 8 cannot become 8 < 7 through blind mirroring. Provide genuine translations for every supported locale including mathematical read-outs, hints, control names and error explanations. Reduced-motion outcomes, readable zoom/mobile layout, visual focus and a locally available offline version after download are implementation acceptance targets only.

## Acceptance scenarios

1. 3 + 5 = 4 + 4 is 8=8, true.
2. 7<8 and 8>7 are true; 5+2<4+4 is 7<8 true.
3. 9−2>3+5 is 7>8 false.
4. 4+6<8+2 is 10<10 false; changing only the sign to = yields true.
5. 5+6>8+2 is 11>10 true; 8−3>2+4 is 5>6 false.
6. Misconception feedback names both evaluated values and the relation; no grading.
7. Independent reset and keyboard, screen-reader, RTL, zoom, reduced-motion and downloaded-offline access all preserve numeric outcomes.

## Editorial/technical handoff

The current generic renderer supports a Scene Resource, not this particular design. Coding Agent must verify concrete localization context, build a prop-free Scene and tests, review WCAG 2.2 AA and offline completeness, and seek editor approval. No runtime data, Question/Quiz config, score, persistence or Note event is introduced.
