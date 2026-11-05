# One-Step Model Builder — Scene Specification

Status: Provisional Draft — pending Methodologist approval
Owner: Educational Screenwriter
Parent: [Lesson Content](../content.md), Sections 1–4
Methodologist source: [Draft Brief](../methodologist-brief.md)

## Mathematical purpose

A model must show the roles of known whole, known parts or initial/change amounts, and an unknown. Preserve quantity and the direction of change. Use same-sized discrete units for visual counters; any bar segments represent integer unit counts with a consistent scale. The diagram is not itself a calculation result.

## Experiences and learner actions

1. **Addition, guided**: “Seven apples sit on a plate. Five more are added.” Let learner form labeled groups of seven existing and five incoming apples. Place a ? on their combined total, not on either known part. Ask which expression matches: 7+5=? or 7−5=?. Correct feedback: “Both groups join; the whole is unknown.” Incorrect: “Nothing was taken away.”
2. With “Reveal total”, count all twelve and display “12 apples”. Keep the seven/five origin labels so the total does not replace their meaning. Wrong unit prompt: “We counted apples, not plates.”
3. **Removal, guided**: “Twelve apples are present, five are eaten.” Twelve unit counters begin in a known-whole tray; remove or mark five, and mark the remaining unknown ?. Correct equation 12−5=? yields seven. Mistaken addition choice: “Five leave the original twelve.”
4. **Independent transfer**: “Nine books on a desk. Four moved into a bag. How many remain on the desk?” Start fresh. Learner labels known nine, change of four leaving, remaining ?. Construct 9−4=? and reveal five books optionally. Incorrect model with 9 as unknown receives “The story already tells us nine books were on the desk.”
5. Offer “Show the story”, “Try another model” and “Reset”; avoid gatekeeping explanatory feedback behind selecting a presumed correct response.

## Objects and state

Equal-unit counters; visible before/added/removed/remaining regions; semantic part/whole labels; expression choices; keyboard-friendly +/- counter controls; reveal booleans; one active scenario. The model source data contains exact counts and a relationship type; the display derives final counts consistently. A changed physical model requires an updated displayed expression. No user score, Question, persistent mastery or shared scene-local state across Sections.

## Accessibility, localization and mobile/offline behavior

Give a full nonvisual description of the relationship (“Nine initially, four removed, five remain”) only after reveal, and a description of known roles before reveal. Every action works by keyboard, switches and touch without drag, and conveys state with text not solely colored bars. RTL does not reverse before/after causality; labels follow language direction while arithmetic remains unambiguous. Translate all narratives and feedback for every locale, provide optional equivalent audio, reduced motion, focus management, small-screen reflow and offline assets. The scene takes no React props.

## Acceptance cases

- 7+5=12 apples; “five” is added amount, not total.
- 12−5=7 apples; removal is modeled as a known whole decreasing.
- 9−4=5 books; nine is initially known, remaining count is unknown until reveal.
- Choosing the wrong operation produces relationship-based feedback.
- Diagrams with different visual arrangement but identical counts express the same modeled relationship.
- Reset, RTL, keyboard, screen reader and offline mode preserve exact story roles.

## Dependencies and open questions

A new self-contained Scene is proposed; the Coding Agent must verify existing resource renderer and translation context after approval. No component, API contract, scoring or Note persistence is implemented here.
