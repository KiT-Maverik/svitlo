# One Example Is Not a Rule — Lesson Content

**Screenwriter status:** Provisional Draft, pending explicit Methodologist approval.  
**Source:** [Draft Methodologist Brief](./methodologist-brief.md). **Program dependence:** None. **Runtime:** Not implemented.  
**Language:** English editorial source only, not translated learner assets.

## Learning experience

A single true example is informative but cannot prove a statement about **every** possible case. By contrast, **one verified counterexample** can disprove a universal statement. The scene first teaches what the premise of a claim is, then checks whether a proposed counterexample actually meets it; this prevents children from merely selecting a visually surprising arithmetic fact.

### Section 1 — “This worked” is not “This always works”

_Purpose: distinguish observation of one case from a general rule._

1. **`text` Resource:** “Try **1 + 3 = 4**. Both numbers we added are odd, and the answer is four. Can we now say **every pair of odd numbers adds up to four**?”
2. **`scene` Resource (proposed):** [Counterexample Detective](./scenes/counterexampleDetective.scene-spec.md), entry A. Let the learner verify 1 and 3 are odd and total four. Then offer a different pair 3+5=**8**, so the claim about **every pair** giving four fails. “The first example was true, but it tested only one pair.”
3. **`text`, feedback:** For “the rule is proved”: “One true case does not describe every pair. Three and five are also odd but total eight.” For “not enough evidence”: “Yes. A universal claim is about all cases in its specified class.”
4. **`markdown`:** “An **example** is one case. A **general rule** claims what happens for all cases of a stated kind. The word **every** makes the claim stronger.”

### Section 2 — Find a real counterexample

_Purpose: refute a clearly false universal claim with a case inside its premises._

1. **`text`:** “A card says: **Every sum of two odd whole numbers is odd**. What numbers would you test to check whether that is true?”
2. **`scene` Resource (proposed):** Detective entry B presents pairs **3+5**, **4+5**, **1+3**, and learner-selected small odd numbers. The child must check **both operands are odd** before using the sum. For **3+5=8**, show eight is even: the case satisfies the premises and contradicts the conclusion, so it is a real counterexample.
3. **`text`, feedback:** For **4+5=9**: “Nine is odd, but four is **even**, so that pair does not test a claim about two _odd_ numbers. It is not a valid counterexample.” For 3+5: “Both inputs are odd and eight is even, so one valid case disproves ‘every sum is odd’.”
4. **`markdown`:** “A **counterexample** must satisfy the rule's conditions but fail its claimed result. One valid counterexample is enough to show a universal claim is false.”

### Section 3 — One example may support a true rule without proving it

_Purpose: prevent the misunderstanding that 'no counterexample so far' guarantees a rule._

1. **`text`:** “A student checks **4 + 0 = 4** and proposes **adding zero never changes a whole number**. Is the example true? Does this single example by itself prove the rule for every whole number?”
2. **`scene` Resource (proposed):** Detective entry C lets learners try 7+0=7 and 12+0=12. Explain: “These are true supporting cases. Trying more cases is helpful, but examples alone are not a proof for every whole number.” Include a simple conceptual visual: a collection with zero added stays unchanged, as an _informal explanation_ rather than a formal quantified proof.
3. **`text`, feedback:** “You may have good reasons for the rule, but simply listing three examples still doesn't establish **all** cases.” If a learner claims examples were false, reveal the exact sums and set separation of verified instance vs universal justification.
4. **`markdown`:** “No counterexample found **yet** is not the same thing as proving a rule. First decide what the rule claims about all cases.”

### Section 4 — Independent transfer: refute a new “every” statement

_Purpose: construct a counterexample with a full premise/result explanation._

1. **`text`:** “Someone claims: **Every whole number greater than five is odd**. Find one number that proves this claim wrong. Explain why it fits the first part and fails the second.”
2. **`scene` Resource (proposed):** Detective entry D lets the learner choose a whole number from 0–20 via accessible stepper/typing. **6** is the simplest counterexample: 6 > 5 and 6 is even. Other eligible examples include 8, 10, 12 and so on. For choice 4: “Four is not greater than five, so it cannot test the claim.” For 7: “Seven is greater than five **and odd**; it supports the claim in one case but does not refute it.” For 6: “Six is greater than five, yet it is even; the rule says **every** such number is odd, so it is false.”
3. **`text`:** The learner may speak to a trusted adult, choose a two-part explanatory sentence or type a short reason: “My number meets ___ but not ___.” A “Show complete explanation” control is available without response.
4. **`markdown`:** “**Recall:** An example checks **one** case. A universal rule says **every** case. To disprove it, find **one case that fits the conditions but contradicts the conclusion**.”

## Accuracy, roles and access boundaries

Parity refers to nonnegative whole numbers in this introductory Lesson; statements have explicitly defined domains. For the odd+odd false claim, 4+5=9 is **not** a counterexample because 4 is even, even though its sum is odd. Other valid odd pairs whose sum is even can be accepted. The Lesson teaches recognizing what examples can/cannot establish and finding counterexamples, **not** formal proof of universal truths. Preserve the two separate Target Skills in the Brief. No new inference competency ID is invented.

All Section resources appear in an ordered **single vertical column** using available `text`/`markdown` and a **proposed** `scene`. [Counterexample Detective](./scenes/counterexampleDetective.scene-spec.md) is editorial-only. The learning choices do not prove mastery or create Questions, quizzes, grades or persistence. Deliver nonvisual parity information, explicit condition checks, keyboard/touch/switch number selection, visible focus, reduced motion and non-color-dependent feedback. Every label, “every/some” quantifier, parity term, explanation, numbers and accessible descriptions require actual localization for all supported locales; RTL retains logical premise/conclusion and arithmetic order. The future implemented selected-locale experience must work offline after download, not assumed available now. Methodologist/editor approval remains outstanding.
