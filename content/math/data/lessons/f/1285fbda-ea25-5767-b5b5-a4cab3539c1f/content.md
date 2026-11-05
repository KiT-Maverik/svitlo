# Do We Have Enough Information? — Lesson Content

**Screenwriter status:** Provisional Draft — pending explicit [Methodologist approval](./methodologist-brief.md).
**Implementation:** None. **Program dependence:** None. **Working language:** English editorial source, translation not yet authored.

## Editorial experience

Some facts are _extra for this question_; other problems are _missing a fact needed for any single answer_. These cases must never be collapsed into “ignore numbers you don't like.” The learner first discovers why one stated number is irrelevant and how its role changes with the question, then sees why insufficient information allows several different answers. The Scene [Question-Dependent Evidence Desk](./scenes/questionEvidenceDesk.scene-spec.md) deliberately separates **claim, given facts, question, and possible completions**.

### Section 1 — A number that does not help this question

_Purpose: distinguish relevance from merely noticing numerals._

1. **`text`:** “On a board there are **7 stars**, **4 circles** and **3 triangles**. How many **stars and circles together**?” Let the learner predict which two collections will matter.
2. **`scene` resource, proposed:** Evidence Desk entry A shows three labeled groups and the exact question at all times. The learner tags 7 stars and 4 circles as “needed” and 3 triangles as “not needed for this question”. This is not a drag-only interaction.
3. **`text`:** Correct feedback: “Seven stars and four circles make **11**. The triangles do not change the number of _stars and circles_.” If triangles selected as needed: “The question asks about two kinds of shapes, not all three.” If a child excludes 4: “Circles are named in the question; counting only stars gives seven, not eleven.”
4. **`markdown`:** “A number can be true but **not needed to answer this particular question**. That does not mean the number is false.”

### Section 2 — Change the question, change which facts matter

_Purpose: correct the misconception that a fact is permanently irrelevant._

1. **`text`:** “Now ask **How many shapes altogether?** We did not add any new shapes. Did we need a different fact?”
2. **`scene` resource, proposed:** Entry B reuses the **same three known quantities** but resets judgments and swaps only the question. All 7, 4 and 3 are relevant. The total is **14**.
3. **`text`:** Feedback for excluding three: “Triangles are shapes too, and now we are counting all shapes.” For selecting all: “Yes: seven plus four plus three is fourteen.”
4. **`markdown`:** “The _question_ decides what information helps. Check the relationship before calling a fact extra.”

### Section 3 — A number that the story does not give

_Purpose: recognize insufficient data and demonstrate why guesses do not establish answers._

1. **`text`:** “Outside a school there are **7 bicycles** and **some scooters**. How many vehicles are there?” Ask learners what they know, and what is still missing.
2. **`scene` resource, proposed:** Evidence Desk entry C labels known bicycles=7, scooters=?, vehicles total=?. The learner can test two alternative **hypothetical** possibilities without pretending they are given: “Suppose there are **2 scooters**” → 7+2=**9 vehicles**; “Suppose there are **5 scooters**” → 7+5=**12 vehicles**.
3. **`text`:** “Both possibilities fit the original story. So the original question has **no uniquely determined number**. We would need the number of scooters.” If the learner guesses 9: “Nine is possible _if_ there are two scooters, but the story never told us there were two.”
4. **`markdown`:** “When a needed number is missing, guessing it changes the problem. You may describe _what information is needed_ without supplying an answer.”

### Section 4 — Independent transfer: tell excess from shortage

_Purpose: independently classify and justify an unfamiliar problem._

1. **`text`:** Present two short cards one at a time.
   - **Card 1:** “A jar has **6 blue beads**, **5 yellow beads** and **4 red beads**. How many blue and yellow beads?” The red count is **extra for that question**; six plus five gives **11**.
   - **Card 2:** “A jar has **6 blue beads** and **some yellow beads**. How many beads total?” Assuming only those two bead types are present, the yellow count is **missing**; there is **no single justified total**.
2. **`scene` resource, proposed:** Entry D asks first “Can we calculate one definite answer?” then “Show why.” The learner may classify with keyboard/tap, cite an exact sentence, or reveal a worked comparison. For Card 1, a failure to include yellow prompts: “The question names blue _and_ yellow.” For Card 2, a proposed total of 11 receives: “Eleven would require five yellow beads, which were not specified.”
3. **`text`:** Reveal a compact rule of thumb with two separate tests: “**Extra:** I can answer without that fact. **Missing:** Different valid choices give different answers.”
4. **`markdown`:** Invite a voluntary spoken, typed or nonverbal explanation. No Score/Quiz object is created. Optional recall cue: “Ask the question first; then look for facts that matter and facts you still need.”

## Accuracy and inclusivity handoff

The Scene spec must preserve the **specific question** while judging facts. Incomplete information is established by two solutions consistent with the same original facts, not by guessing a preferred value. Numeric and unit labels must appear even without graphics. Each Section is a **single vertical** ordered sequence of `text`, `markdown` and proposed `scene` blocks. Do not invent storage, Question, mastery or online API behavior.

Genuine translations are required for every supported locale; grammatical quantifiers (“some”, “altogether”), exact unit names, right-to-left reading order, labels and feedback must be reviewed so quantities and logical implications survive translation. Give clear screen-reader access to each story/question/fact, keyboard/touch/switch category selection rather than compulsory dragging, reduced motion, high contrast, small-screen reflow, no timed access and offline-equivalent resources after implementation. A proposed experience is not a shipped PWA promise.

This document and [Question-Dependent Evidence Desk](./scenes/questionEvidenceDesk.scene-spec.md) remain provisional until [Methodologist Brief](./methodologist-brief.md) approval.
