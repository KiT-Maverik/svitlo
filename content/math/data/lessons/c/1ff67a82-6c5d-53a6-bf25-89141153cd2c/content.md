# Plan Two Steps Before You Calculate — Lesson Content

**Screenwriter status:** Provisional Draft — pending [Methodologist Brief](./methodologist-brief.md) approval.  
**Program dependence:** None. **Technical state:** Not implemented. **Language:** English editorial source only.

## Teaching rationale and instructional contract

The learner must see the difference between **an intermediate answer** and **the final question** and create a dependency-aware plan. Do not impose a magic two-step formula or treat every two-operation string as equivalent to an explanation. The Lesson exposes two distinct dependencies—**find a whole, then subtract** and **find someone's amount, then combine two amounts**—before an independent transfer. This is not a graded Quiz or evidence of mastery.

### Section 1 — A question that hides another question

_Purpose: identify what the final question depends on._

1. **`text` Resource:** “A classroom shelf has **8 red books** and **7 blue books**. **6 books** are borrowed. How many books remain on the shelf?” Ask: “Can you subtract six from the total before you know how many books were there?” Let the learner predict what must be found first.
2. **`scene` Resource (proposed):** [Two-Step Dependency Planner](./scenes/twoStepPlanner.scene-spec.md), entry A. Separate the cards “red books: eight”, “blue books: seven”, “borrowed: six”, “total before borrowing: ?”, “remaining books: ?”. The learner connects the two unknowns with text-labeled dependency arrows (or uses a simple ordered choice panel), without performing arithmetic immediately.
3. **`text`:** First plan card: “Find the original total: **8 + 7 = 15 books**.” Second: “Find those remaining: **15 − 6 = 9 books**.” Wrong plan “8 − 6 = 2” feedback: “That only subtracts from the red group, but we need the total on the shelf. We were not told that the six were all borrowed from red.” A mathematically valid alternative decomposition must not be globally declared invalid; the point is preserving the **meaning** of the quantities.
4. **`markdown`:** “The first answer, **15**, helps us answer the second question. It is **not the final answer**. We can name it: ‘original total of books’.”

### Section 2 — The plan has to answer the final question

_Purpose: distinguish a meaningful first calculation from a complete solution._

1. **`text`:** “Ava has **12 stickers**. Sam has **3 fewer stickers than Ava**. How many stickers do **they have together**? Which is the first missing number?”
2. **`scene` Resource (proposed):** Planner entry B shows named known Ava=12, comparison gap 3, Sam=?, combined total=?. Learner first chooses “Find Sam's amount” and builds **12 − 3 = 9 stickers**. Next chooses “Add Ava's and Sam's amounts” and builds **12 + 9 = 21 stickers**.
3. **`text`, feedback:** For stopping at 9: “Nine answers **how many Sam has**, not how many they have together.” For 12+3=15 as Sam: “Three fewer means Sam has _less_ than Ava.” For directly 12+3=15 as total: “This adds Ava's amount to the _difference_, not Sam's amount.” For 21: “Together they have twenty-one stickers: twelve plus nine.”
4. **`markdown`:** “A good plan names both questions: **First, how many does Sam have? Second, how many do they have together?**”

### Section 3 — Change the steps, inspect the dependency

_Purpose: show why step order follows missing information rather than the order of numbers in a sentence._

1. **`text`:** “You are handed these two proposed steps for Ava and Sam: **A. 12 + Sam's stickers**; **B. 12 − 3**. Which one can you complete using the known information _right now_?”
2. **`scene` Resource (proposed):** Planner entry C. The “combined total” step displays “Sam's stickers: ?” until the learner completes the intermediate **B**. If the learner attempts A first, respond: “To combine Ava's and Sam's amounts, we must know Sam's count. Finding it first gives nine.” If B first, unlock the meaningful input “Sam = 9” and let A become **12+9=21**. This is **conceptual dependency**, not an arbitrary software gate; offer a complete explanation without requiring a successful click.
3. **`text`:** “The story listed Ava's twelve, then three fewer, then the question about the total. A plan follows **which quantities are needed**. Different valid strategies may still reach the same result.”

### Section 4 — Independent transfer: draw a short plan

_Purpose: learners select the intermediate before seeing the operations._

1. **`text`:** “Mila has **14 shells**. Theo has **5 fewer shells than Mila**. **How many shells do they have altogether?** Give yourself two questions to answer, then choose operations.”
2. **`scene` Resource (proposed):** Planner entry D. Show the complete story with empty intermediate/final cards; provide keyboard/touch selection of known roles, unknown Theo=?, combined total=? and operations. Hints are optional: “Who has fewer?” and “Whose number is still missing?” Expected first **14 − 5 = 9 shells (Theo)**; second **14 + 9 = 23 shells (combined)**.
3. **`text`, feedback:** If answer 9 only: “That is Theo's amount, but the question says _altogether_.” If 14+5=19: “Five is the **difference**, not Theo's count.” If 23: “Theo has nine, Mila has fourteen, and together they have twenty-three.” Allow a mathematical alternative plan only if both quantities and dependency can be explained consistently.
4. **`markdown`:** “**Recall:** Identify the final unknown. Ask **what missing quantity must be found first?** Give that intermediate a name and unit, then use it in the second step.”

## Accessibility, implementation and editorial scope

Each Section is an **ordered single vertical sequence** of `text`, `markdown` and **proposed** `scene` resources; the planner's internal diagram may use responsive spatial layout, but sibling Resources do not become columns. [Two-Step Dependency Planner](./scenes/twoStepPlanner.scene-spec.md) is specified, not implemented. No Question/Quiz, score, storage, Notes or Program quests have been generated. Prompts and explanations are fully authored as English editorial source, not as production locale files.

The Scene spec must offer **two equivalent paths**: a diagram with accessible quantity and dependency labels, and a purely text-based ordered plan choosing first and second steps. Never require drag/hover, color recognition, motion/audio or speech. Screen readers announce intermediate versus final results and units; keyboard/switch users navigate a stable logical order. In RTL, adapt presentation while retaining causal quantity dependency, mathematical operand order and named person relationships. Translate all strings, units, feedback, numbers and aria-like labels genuinely for all required locales before development; do not silently fall back to English. Reduced motion, responsive zoom and locally available offline contents/feedback are necessary implementation targets, not claims of already shipped capability. The Draft [Brief](./methodologist-brief.md) requires explicit approval before any formal Content or Scene approval.
