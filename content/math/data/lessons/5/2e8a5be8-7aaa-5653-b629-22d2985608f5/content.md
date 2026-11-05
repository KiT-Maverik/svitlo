# Read and Write a Number Expression — Lesson Content

**Screenwriter status:** Provisional Draft — **Methodologist Brief not approved**.  
**Methodologist source:** [Draft Brief](./methodologist-brief.md). **Program dependence:** None. **Lesson implementation:** Not implemented.  
**Editorial source language:** English, pending genuine locale-by-locale production translations.

## Learning experience — what the learner does

The learner does not merely calculate totals. The central task is to **understand and construct a numerical expression that faithfully represents the described operation**. Expression, mathematical statement and numeric result are distinguished explicitly. Use short written and optional spoken prompts plus manipulations with a fully equivalent keyboard/select alternative.

### Section 1 — What does “seven plus four” mean?

_Purpose: connect everyday quantity joining to an expression, before requiring a result._

1. **`text` Resource:** “Seven shells are here. Four more shells arrive. What could we write to **show that change**?” Let learners predict a notation before any answer is supplied.
2. **`scene` Resource (proposed):** [Expression Reader](./scenes/expressionReader.scene-spec.md), entry A. Display a labeled group of **7** shells with an incoming group of **4**. Learner chooses between the expressions **7 + 4**, **7 − 4**, and **4 − 7**, with keyboard/touch controls. After selection, the learner may reveal the number **11** of shells, but **7 + 4** remains displayed as the original expression.
3. **`text` Resource, feedback:** For 7 + 4: “Yes: you join the seven shells and the four arriving shells.” For 7 − 4: “Subtracting four would remove shells, but four arrived.” For 4 − 7: “This would begin with four and take away seven; that is not the story.”
4. **`markdown` Resource:** “A **numerical expression** uses numbers and operations to describe a value: **7 + 4**. It does not need to show its answer yet. **7 + 4 = 11** is a complete equality saying what the expression equals.” This is a meaning distinction, not a demand to memorize terminology without a model.

### Section 2 — Reading from left to right is not enough

_Purpose: protect the mathematical roles of the operands, especially in subtraction phrases._

1. **`text`:** “A bowl starts with **9** grapes. **3** are eaten. Say the change in words, then write an expression.” Offer a short silent prediction.
2. **`scene` Resource (proposed):** Expression Reader, independent entry B. Fixed initial group 9 and a clearly labeled removed group 3. Learner chooses between **9 − 3**, **3 − 9**, and **9 + 3**, then reveals remaining **6**. The UI preserves the chronological source: start → take away.
3. **`text`, feedback:** For 9 − 3: “Nine is the starting amount; three are removed.” For 3 − 9: “The expression would start with three, then remove nine. But the bowl **started with nine**.” For addition: “The three leave the bowl; they are not added.”
4. **`markdown`:** “The phrase ‘**subtract three from nine**’ means **9 − 3**. The word _from_ reverses the order we might hear the numbers in the sentence; mathematical roles, not word position, decide the expression.”

### Section 3 — An expression is not the same thing as a full equation

_Purpose: contrast a mathematical fragment describing a calculation with a statement comparing values._

1. **`text`:** “The teacher says: ‘Write **an expression** for the sum of six and two.’ Which card answers that instruction: **6 + 2**, **6 + 2 = 8**, or **8**?”
2. **`scene` Resource (proposed):** Expression Reader, entry C, displays these three distinct cards. Each card is read accessibly. The learner sorts them under **expression**, **complete equality**, and **value** with choices; sorting is instructional, not a scored Question. Explain each: **6 + 2** is the asked-for expression; **6 + 2 = 8** adds a true claim; **8** is only its value. After choice, invite the child to read **10 − 4** aloud, without calculating it first.
3. **`text`, feedback:** For choosing the equality, “That statement is true, but the request was only for the calculation expression.” For choosing eight, “Eight tells the value, not the operation.” For choosing 6 + 2, “This shows both amounts and how they are connected.”
4. **`markdown`:** Optional recall: “**Expression:** 10 − 4. **Value:** 6. **Equality:** 10 − 4 = 6.” Do not imply every expression must always be calculated in the Lesson.

### Section 4 — Make an expression for a fresh situation

_Purpose: independently translate a story to symbols, with progressive hints rather than a token quiz._

1. **`text`:** “There are **14** tokens in a jar. **4** tokens are taken out. Without writing the answer yet, create a numeric expression for what remains.”
2. **`scene` Resource (proposed):** Expression Reader, entry D, begins with a story and empty symbol slots. Learner may choose digits, + or −, or use a simple accessible text field. First optional hint: “Which number is in the jar at the beginning?” Second hint: “Does ‘taken out’ join or remove?” Valid expression: **14 − 4**.
3. **`text`, feedback:** For **4 − 14**: “Four is the amount removed, not the starting amount.” For **14 + 4**: “The tokens were taken out, not put in.” For **14 − 4 = 10**: “The calculation is right, but you wrote a complete equality. Show only the expression **14 − 4** for this request.” Confirm by revealing ten _only if the learner asks_.
4. **`markdown`:** “Before you write symbols, ask: **What amount starts? What changes? What action connects them?** A good expression describes that relationship. You can work out its value afterward.”

## Screenwriter production handoff and boundaries

General Section Resources are ordered **top to bottom in one column**. `text`, `markdown` and `scene` are recognized types in the inspected generic Playground renderer; **this Expression Reader Scene is proposed**, requires localization and React implementation later, and has a separate [Scene specification](./scenes/expressionReader.scene-spec.md). No arbitrary section discriminator, Questions, Quiz, grading, mastery tracking or Notes state is introduced.

The editorial English phrases are **not translated lesson resources**. Every prompt, mathematical speech, accessible control, feedback and example must be translated truly for all configured locales without English fallback. In RTL, preserve expression operand order and speech semantics, specifically “subtract three from nine”; adapt layout and focus order rather than flipping numbers. Counters must have text-count equivalents; all choices work with keyboard/switch/touch, readable zoom, visible focus, reduced motion and high contrast independent of color. All selected learning resources and feedback must be available offline **after an implemented download path**, not presumed present now. The approval gate for the Brief and Scene remains open.
