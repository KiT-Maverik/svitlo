# ChanceSpinnerLab — Interactive Scene Specification

**Editorial status: Provisional Draft — pending Methodologist and separate Scene approvals.**
**Lesson:** [Which Outcome Is More Likely? — Content](../content.md)
**Methodologist source:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skills:**

- [likelihoodLanguage.data.ts](../../../../../data/skills/probability/events/skills/likelihoodLanguage.data.ts)

## Pedagogical role

Distinguish an event being possible from it being more or less likely, compare chances only under clearly specified spinner conditions and account for whether outcomes are equally likely.

**Why a custom interactive Scene is warranted:** The prior lessons established certain/impossible events and complete outcome lists; comparisons of likelihood require inspecting how the possible results are distributed, not just naming them. Choose between four predetermined spinners, toggle visibility of individual sector labels and total color coverage, predict which color is more/equally/less likely, request an explanation, reset. Optional single spin animation must not alter the logical comparison; avoid reliance on randomness or streaks. Local state, prop-free, no invented APIs.

This Scene is a **proposed self-contained, prop-free root**. A renderer for the generic `scene` Resource is not proof that this named Scene exists. All instructional presets are controlled internally, and no invented props, events, answer callbacks, Note persistence or global state are authorized.

## Model, essential visual states and verifiable answers

| State / preset          | Concrete representation                                           | Explanation / correct conclusion                                                |
| ----------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Five equal sectors      | B,B,B,B,Y; each 72°; uniform pointer direction                    | Blue more likely than yellow; yellow possible                                   |
| Four equal sectors      | B,B,Y,Y; each 90°; uniform pointer direction                      | Blue and yellow equally likely; neither certain                                 |
| Unequal sector contrast | Blue region 180°; yellow regions 90°+90°; uniform direction       | Each color covers half of total angle; chances equal despite 1 versus 2 sectors |
| Transfer six sectors    | Y,Y,Y,Y,B,B; each 60°; uniform pointer direction                  | Yellow more likely than blue; blue remains possible                             |
| No spin taken           | Current spinner unchanged, no observed outcomes                   | The chance comparison follows from stated conditions, not a recorded trial      |
| Learner choice mistake  | Any possible-but-less-likely choice incorrectly marked impossible | Explicit available-sector evidence and retry                                    |

**Model scope and limitation:** Comparison assumes a uniform pointer direction over angular positions and no physical spin bias. Without the stated fairness model, the number of colored slices alone may not establish real probabilities.

## Learner controls, transitions and no-penalty recovery

1. Start in a fully described initial preset. Announce all model conditions before a prediction: chosen whole, clock reading scale, table headings or spinner fairness conditions.
2. Make the next mathematical change depend on an explicit labelled learner action. Learner can always inspect numerical, textual and nonvisual descriptions of the same state.
3. Hold back the result label until a prediction or a voluntary reveal, then give a reason citing the governing condition—not only “Correct”.
4. Incorrect choices show the precise mismatch and allow retry, reset or exploration of another preset; no animation-only messages, automatic penalties or fake mastery transitions.
5. Switch between explicitly enumerated presets using controls **inside** this Scene, not through public props or a cross-Section state contract. Reset must restore the full initial conditions.
6. Provide a fresh independent transfer preset with optional hint and learner-triggered full reveal. The Scene remains useful when a learner skips prediction and requests explanation.

## Required explanatory feedback and errors

- **Both colors are possible—but are they equal? / Yellow impossible:** “The yellow sector is small in number, not missing. The pointer could land there.”
- **Both colors are possible—but are they equal? / Equal chances:** “The five slices are equally sized and have equal chance individually. Four are blue and one is yellow.”
- **Equal chances require equal coverage / Blue more likely:** “Both colors cover exactly two equal-sized slices. Neither has more of the circle.”
- **Equal chances require equal coverage / Blue certain:** “There are yellow slices too. Equal chances do not tell us the next result.”
- **A large slice can matter more than several small ones / Yellow more likely because two slices:** “The yellow slices are each smaller. Together they cover one half, the same as blue's single half.”
- **A large slice can matter more than several small ones / Blue certain:** “Half the circle is yellow. Yellow remains possible.”
- **New spinner, make a justified prediction / Blue impossible:** “There are two blue slices. Blue can happen even though there are more yellow slices.”
- **New spinner, make a justified prediction / Yellow certain:** “The spinner also has blue slices. More likely does not mean guaranteed.”
- **New spinner, make a justified prediction / Equal chance:** “Four equally likely slices are yellow, while only two are blue. The coverage is not the same.”

**Exclude:** Formal probability calculations, probability fractions/percentages, sampling variation over repeated runs, dependent events and biased spin mechanisms belong elsewhere. A physical spinner is only treated as uniform when explicitly stated.

## Equivalent participation without sight, color, drag or hearing

A linearized list of colored sector labels, exact equal/unequal sector sizes and the total angle or half-circle coverage of each color supports every prediction without seeing colors or geometry. Keyboard choices are equally expressive.

All meaningful actions must work with keyboard and touch via clearly labelled semantic controls, with visible focus, coherent traversal and judicious state announcements. Do not require precise drag targets, perception of motion, audio or physical pointing. In a screen-reader mode, every label and explanation must preserve the actual quantitative relationships, not merely read an image title.

## Internationalization, access, mobile and offline acceptance

Supply genuine translations for all configured locales (including RTL languages), including control names, state descriptions, worked feedback, captions and any narration. No placeholder English duplicates or silent fallback. Semantic RTL affects reading/layout order but does not invert mathematical signs, fraction units, numeric ordering, clock-hand relationships or spinner probability. Support WCAG 2.2 AA, reduced motion, minimum accessible target sizes, responsive layout and equivalent low-resource/offline functioning once the PWA download infrastructure is implemented; do not assert these are already available.

## Coding Agent and Assessment Architect handoff

**Not implemented.** Future work must create the Scene module and its own co-located tests for every required state, reset, feedback, keyboard, focus, screen-reader, RTL, locale, reduced-motion, low-device and offline use case. There is no fabricated Scene API, Question/Quiz configuration, performance score or completion event. Methodologist approval must occur before this provisional specification becomes an approved implementation source.
