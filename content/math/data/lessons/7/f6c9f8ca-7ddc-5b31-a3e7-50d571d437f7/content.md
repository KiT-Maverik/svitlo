# Show the Story Before You Solve — Lesson Content

Content status: Provisional Draft — pending Methodologist approval
Owner: Educational Screenwriter
Methodologist input: [Draft Brief](./methodologist-brief.md)
Program dependence: None
Implementation: Not implemented

## Section 1 — A situation can be shown

1. **text**: “Seven apples sit on a plate. Five more are added. How could we show the story without doing the calculation first?”
2. **scene (proposed)**: [One-Step Model Builder](./scenes/oneStepModelBuilder.scene-spec.md), add-to mode. A learner groups seven and five unit counters, labels the unknown total, and may inspect a part-whole bar with equal-unit lengths.
3. **text**: “We know seven to start and five arrive. We need the total. Our model shows both parts.” If the child mistakenly labels five as total: “Five are the new apples, not all the apples.”

## Section 2 — Which expression matches?

1. **markdown**: “The two parts make the whole. A model with seven and five joining matches 7 + 5 = ?. The question mark is the unknown total.”
2. **scene (proposed)**: Offer a visual model for 7 + 5 = ? and an incorrect model of 7 − 5 = ?. Children match the addition relationship, with exact feedback “No apples are removed in this story.”
3. **text**: “Counting gives twelve apples. The unit is apples, not just the number twelve.”

## Section 3 — A different story, a different model

1. **text**: “There are twelve apples. Five are eaten. How many remain?” Ask the learner to predict whether the first model still fits.
2. **scene (proposed)**: Builder remove-from mode. Twelve counters start as known whole; five are marked removed, and the remaining quantity is the unknown: 12 − 5 = ?.
3. **text**: “The model must keep track of what the twelve and the five mean. The seven left are the answer.” If the learner chooses 12 + 5: “The story says five are taken away, not added.”

## Section 4 — Transfer without a hint

1. **text**: “Nine books are on a desk. Four are moved into a bag. Draw or assemble a model. What is known and unknown?”
2. **scene (proposed)**: Fresh builder state with labeled counter alternative. Correct initial model: nine as whole, four removed, five remaining unknown; equation 9 − 4 = ?; answer five books.
3. **text**: Reveal after reflection: “A good model explains the change. We knew nine books and four moved away. Five stayed on the desk.” Incorrect arrangement feedback: “Check whether the whole existed before the change.”
4. **markdown**: “Remember: **show the relationship before choosing the operation**.”

## Access and production constraints

All blocks in each Section are in vertical order; the Builder is proposed. Every counter group is textually described with group roles and units. Keyboard/tap actions replace dragging, and unknowns are labeled rather than encoded by color alone. RTL adjusts reading order while preserving before/change/after sequence and part-whole semantics. Localize all story and mathematical feedback for all supported locales; support zoom, contrast, reduced motion and full offline use. No scored Questions, Quiz or persistent Note behavior.

## Review handoff

Provisional pending [Methodologist Brief](./methodologist-brief.md) approval. [Model Builder Scene specification](./scenes/oneStepModelBuilder.scene-spec.md).
