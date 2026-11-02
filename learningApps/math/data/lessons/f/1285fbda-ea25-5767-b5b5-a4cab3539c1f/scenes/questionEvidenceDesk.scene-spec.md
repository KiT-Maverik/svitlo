# Question-Dependent Evidence Desk — Scene Specification

Status: **Provisional Draft pending explicit Methodologist/editor approval**  
Owner: Educational Screenwriter  
Parent: [Lesson Content](../content.md), Sections 1–4 and [Draft Brief](../methodologist-brief.md)  
Status: **Proposed prop-free Scene**, not an existing component. The four placements must work independently.

## What the learner will discover

A numeric fact can be _unnecessary for one question but necessary for another_. A missing fact is different: it can permit multiple answers to one and the same question. Each entry keeps the **actual question visible** and ties learner judgments to the relationships in the story, not to whether text looks decorative. When the question changes, reset any previous relevance verdict; when a required quantity is unknown, do not invent or silently assume a value.

## Opening: an unnecessary number (Entry A, Section 1)

Display “There are **7 stars**, **4 circles**, and **3 triangles** on a board. How many **stars and circles together**?” with labeled, accessible groups of exactly seven, four and three shapes. Choose fact, then classify it as “needed for this question” or “not needed for this question”. Learner may select with keyboard/touch, no drag required. Correct: 7 stars and 4 circles needed; 3 triangles irrelevant _to this question_. The answer is **11** stars and circles. If the learner includes triangles in the result: “You answered how many shapes in total, but this question asks only about stars and circles.” If they omit circles: “The question names circles as well.” Never call the triangle statement false or always useless.

## Change only the question (Entry B, Section 2)

Show identical groups **7 stars, 4 circles, 3 triangles** and now ask “How many shapes **altogether**?” Clear earlier relevance choices but preserve facts. Now all three quantities matter, and **7 + 4 + 3 = 14 shapes**. The child should be able to explain that the formerly extra three triangles became essential because the requested total changed. If triangles are still excluded: “This time triangles are included in _all shapes_.” This is a new starting entry, not a hidden cross-Section state dependency.

## A missing quantity (Entry C, Section 3)

Show “There are **7 bicycles** and **some scooters**. How many vehicles?” Explicitly state that the scene treats these as the only vehicle categories in the problem. Mark bicycles 7 known, scooters unknown, combined vehicle count unknown. Provide two separately labeled **hypotheses**, never silently presented as original facts:

- _If there are 2 scooters_, the total is **7 + 2 = 9 vehicles**.
- _If there are 5 scooters_, the total is **7 + 5 = 12 vehicles**.
  Both worlds satisfy the supplied information but lead to distinct answers. Feedback for “exactly nine”: “Nine follows only if two scooters exist; the story did not say that.” For “no single answer”: “Correct: we need the scooter count.” An “Add a fact” exploration may set scooters to 3, then compute 10, but it must visibly label this as a **new hypothetical condition**, not inferred data.

## Independent contrast (Entry D, Section 4)

Two self-contained cards, with a separate question and reset for each:

**Card 1:** “A jar contains 6 blue beads, 5 yellow beads, and 4 red beads. How many **blue and yellow** beads?” Count 6 + 5 = **11**; four red beads are extra to this question. If the learner includes red, clarify that 15 would answer _all beads_, not the specified subset.

**Card 2:** “A jar contains 6 blue beads and **some yellow beads**. These are the only bead types in the jar. How many beads **in total**?” Insufficient information: the yellow count is needed. Example compatible completions: two yellow → 8 total; five yellow → 11 total. If a child answers 11 without a stated yellow count: “That requires five yellow beads, which the story never supplied.” A useful response is “How many yellow beads?” rather than a guessed total.

## Interactive objects, semantic state and feedback logic

Objects: story and question text, quantity and category labels, per-fact classification, optional model counts, “Try another possibility”, “Change question”, “Show explanation”, “Reset” and explicit hypotheses. State: active independent entry, category selections, question variant, hypothetical missing quantity (never silently converted to a given fact), explanation visibility. **A datum is relevant iff it influences the requested answer under the stated relationships**; the same number can be relevant under one question and irrelevant under another. In a missing-data demonstration, show two complete consistent assignments with different results to establish non-uniqueness. Do not score categorization, store learner state or invent assessment methods.

## Visual and audio / inclusive direction

Each fact can be inspected by numbered card with labeled quantity, category and role. Relevance colors must also have explicit text such as “needed” and “not needed for this question”; “missing” must have its own descriptive text. Keyboard/switch interaction follows select-card then choose classification, and touch controls have generous targets; optional dragging is never required. Screen readers must announce the full exact question before any judgments, all candidate worlds and conditional status. RTL preserves which question each classification refers to, the time/logical order of hypotheses and arithmetic operands. Provide reduced-motion nonanimated reveals, visible focus, high contrast, mobile reflow, zoom and complete offline functionality after implementation. All words, plural units, cardinality, mathematical relations, hints and alternatives need genuine locale translations with no default English substitution.

## Future acceptance cases

1. Seven stars + four circles = 11; three triangles are extraneous to **that question**.
2. With “all shapes” question, 7+4+3=14; all three facts relevant.
3. Seven bicycles plus unknown scooters gives no unique total; 2 scooters gives 9 and 5 scooters gives 12 **conditionally**.
4. Independent blue/yellow count is 11, ignoring 4 red; independent jar with unknown yellow count lacks unique answer.
5. Every false guess receives an explanation of the difference between stated data, hypothesized conditions and target question.
6. Entry resets, keyboard/screen-reader, touch, zoom, RTL, reduced-motion and offline presentations expose identical reasoning without scores.

## Editorial / implementation handoff

Only a generic Scene resource is verified. This exact scene, locale dictionaries and accessible alternatives require implementation, thorough verification and editorial approvals. No scoring, Question/Quiz, Program logic, persistence or Note API is specified.
