# Read the Mass on a Graduated Scale — Lesson Content

Status: **Provisional Draft — Methodologist approval pending; NOT approved for implementation**
Target Lesson: `learningApps/playground/Data/Lessons/1/readingMassScale/`
Audience: **Grade 3** (approximately ages 8–9), can count in hundreds and halfway 50-gram intervals
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: interpret equal gram graduations, identify intermediate 50-gram marks, report numeric mass with g, zero/tare an empty scale before reading.
Target Skills: `weighObject.data.ts` as linked in the Brief. Comparing masses on a qualitative equal-arm balance remains the distinct prerequisite `compareMass` Skill.
Program dependence: None
Implementation: editorial only, with proposed custom Scene; no runtime Lesson data, Question/Quiz, grading or physical hardware.

## INSTRUCTIONAL CONCEPT

**"A scale reading needs the mark _and_ the unit."** A balance that tips tells us which object has greater mass, but not **how many grams**. A calibrated **mass scale** with numbered marks and equal spaces can produce a numeric reading. This simple schematic instrument reads grams (g): large ticks at **0, 100, 200, 300, 400, 500, 600 g**, with an unlabeled **midpoint tick** at **50 g** between each pair. The child first discovers the 100 g spacing, then interprets the in-between marks to find values like **350 g**, rather than merely reciting visible printed numerals.

The scale is **zeroed when empty**. An illustrative +100 g offset is a measurement error, not added object mass. The Scene helps identify the error and reset/tare the instrument before reporting a trustworthy result. A real spring scale relates a physical force to a _mass-calibrated display under specified conditions_; this Stage 3 Lesson focuses on reading an ideal gram-calibrated scale, not the physics of force and mass or device calibration.

## LEARNER JOURNEY

1. Switch from an equal-arm balance comparison to a graduated **gram-reading** instrument and identify the printed unit g.
2. Read a pointer exactly at a numbered major mark, then explain an unlabeled midway tick between 300 and 400: **350 g**.
3. Diagnose an empty instrument that reads 100 g; check zero, tare/reset, then obtain the correct **350 g** for the same example object.
4. Independently read **550 g** on the upper end of the graduation range and reject two common mistakes: giving "500 g" by nearest label, or "550" without its unit.

Each reveal is learner-controlled; numerical values never become a pass/fail badge or an unapproved mastery decision.

## SECTION PLAN

### Section 1 — Which Tool Gives a Number?

- **Purpose:** connect qualitative mass comparison to a calibrated numerical mass reading.
- **Current shape:** one vertically ordered `LessonSection_Config`.
- **Ordered Resource blocks:**
  1. **text — currently supported:** "Our equal-arm balance could show which object was heavier. Can it tell us **exactly how many grams**? This different scale has numbered marks and a letter **g**. What might the number mean?"
  2. **scene — Resource type supported, custom Scene proposed:** [Graduated Mass Scale](./scenes/graduatedMassScale.scene-spec.md), placement A. Show an empty, zeroed ideal mass scale with seven major ticks (0–600 g in steps of 100 g) and **six** 100-gram intervals, each containing one midpoint tick worth 50 g. "Place object" sets pointer to **200 g**, exactly at major tick 200. Learner chooses reading "2", "200 g", or "200" and requests "Show how marks work."
  3. **markdown — currently supported:** "The scale is labeled **grams**, written **g**. Its big marks go **0, 100, 200, 300, 400, 500, 600**. Our pointer reaches **200**, so the mass reading is **200 g**—not just '2' and not just '200' without a unit."
- **Explanatory feedback:** For 2: "The second major tick **after 0** is labeled **200**; each big interval is one hundred grams." For bare 200: "The number is right, but we also need its unit: **200 g**." For 200 g: "Yes. A reading tells us both the number and the unit."
- **Access:** Every tick has a named text position. "Read full scale" recites the ordered marks and spacing, not graphic color. The pointer state is announced as a position along the graduated scale.
- **Planned Note:** "A mass reading is a number **with a unit**, such as 200 g."

### Section 2 — Halfway Between Three Hundred and Four Hundred

- **Purpose:** infer the midpoint value from equal graduation intervals rather than copying the nearest printed label.
- **Current shape:** one vertical `LessonSection_Config`.
- **Ordered Resource blocks:**
  1. **text — currently supported:** "Between **300 g** and **400 g** there is a small tick in the middle. If the big gap is **100 g**, how much is half the gap? What does the pointer mean when it stops there?"
  2. **scene — proposed:** [Graduated Mass Scale](./scenes/graduatedMassScale.scene-spec.md), placement B. Fixed scale 0–600 g, 100 g major interval and one intermediate 50 g tick per adjacent pair. Pointer **350 g** at exactly halfway in the 300–400 span. Learner can bracket 300→350→400, select "300 g", "350 g" or "400 g", then reveal an **equal-length pair of 50 g subintervals**.
  3. **markdown — currently supported:** "We split the gap from **300 to 400** into two equal parts: **300→350** and **350→400**, each **50 grams**. The pointer is halfway, so we read **350 g**. The little tick has a value even without a printed number."
- **Feedback:** For 300: "The pointer is **after** the 300 mark, halfway to 400." For 400: "It has not reached the next big mark." For 350 g: "We counted two equal halves of one 100 g interval." If the child says the short tick is 1 g: "The _size_ of an interval comes from the numbered scale, not from how small the tick looks."
- **Access:** Textual interval summary before reveal says "pointer at midway tick between printed 300 and 400" (contains enough information to solve). A "Show major interval" control reveals all 100 g labels without requiring pointing at tiny marks.
- **Planned Note:** "Halfway across a 100 g interval is 50 g more."

### Section 3 — The Scale Wasn't at Zero

- **Purpose:** identify and correct a tare/zero problem before accepting a mass reading.
- **Current shape:** one vertical `LessonSection_Config`.
- **Ordered Resource blocks:**
  1. **text — currently supported:** "This scale is **empty**, but the pointer already shows **100 g**. Would it be fair to weigh an object and trust its number? What should we check first?"
  2. **scene — proposed:** [Graduated Mass Scale](./scenes/graduatedMassScale.scene-spec.md), placement C. Model base-offset **+100 g** before tare. Empty instrument indicates **100 g**; place example object with fixed true modeled mass **350 g** without tare ⇒ apparent indicated reading **450 g**, which is **not** a valid object-only mass. Choose "Remove object", "Zero/tare empty scale" ⇒ offset becomes 0, empty pointer 0. Then "Place same object" ⇒ **350 g**. Learner can replay but not treat the earlier 450 g as correct.
  3. **markdown — currently supported:** "An empty scale should start at **0 g**. When it did not, the reading included an unwanted offset. We reset the **empty** scale to zero and weighed the **same object** again. Now the pointer shows **350 g**. The object's mass did not change."
- **Feedback:** If learner keeps 450 g: "That scale already showed 100 g while empty. First set it to zero, or you may include the unwanted starting offset." If the learner tries "Tare" while object remains: "In this model, remove the object first; we are measuring **that object's mass** relative to an empty scale." If correct: "Empty reading 0 g, then object reading 350 g. The setup is now consistent."
- **Boundary:** Real scales may have advanced taring for container mass, but this Lesson's empty-zero procedure is intentionally narrow and reliable. No subtraction-based mass correction or force mechanics is taught.
- **Planned Note:** "Check the empty scale reads **0** before measuring."

### Section 4 — Your Own Mass Reading

- **Purpose:** independent interpretation of a high midpoint and a complete unit-bearing report.
- **Current shape:** `LessonSection_Config`, vertical.
- **Ordered Resource blocks:**
  1. **text — currently supported:** "The scale is properly zeroed. The new pointer is on a small tick halfway **between 500 and 600 g**. What mass should we write? Include the unit."
  2. **scene — proposed:** [Graduated Mass Scale](./scenes/graduatedMassScale.scene-spec.md), placement D. Empty ready instrument at 0 g; example object mass **550 g** moves pointer to one minor tick midway 500–600. Learner selects/enters 500 g, 550 g, 600 g or bare 550; a separate accessible "Read scale intervals" control explains that 500→550 and 550→600 are equal **50 g** subintervals.
  3. **markdown — currently supported:** "The last big gap goes from **500 to 600 grams**. Halfway is **550**. The mass is **550 g**. We used the actual little tick and wrote its unit, rather than guessing the nearest printed number."
- **Explanatory feedback:** 500 g: "The pointer has moved **past** 500 to the halfway tick." 600 g: "The pointer has not reached 600." Bare 550: "You found the value; add **g** for grams." 550 g: "Correct reading and unit, with the zero already checked." No score and no permanent mark of mastery.
- **Fresh alternative:** Add an unscored 450 g reading with the pointer between 400–500 to check that the learner generalized the equal midpoint value, not remembered only 550. All presets are deterministic.
- **Low-tech transfer:** A virtual list of ticks and pointer positions is sufficient; no physical kitchen scale is required.

## CUSTOM SCENE SPECIFICATIONS

- [Graduated Mass Scale](./scenes/graduatedMassScale.scene-spec.md) — prop-free, deterministic custom Scene specification covering major/minor ticks, zero checks and explanatory alternatives.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1: "A mass reading needs a number and unit, like **200 g**."
2. After Section 2 midpoint: "Each little halfway tick adds **50 g** on this scale."
3. After Section 3 tare: "Zero an empty scale before weighing an object."

No current Note API, unlock state, scheduled recall or learner-specific storage is asserted. These are future Git-authored recall cues only.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The 550 g and optional 450 g readings are **unscored formative transfer**. Assessment Architect can separately design items varying intervals, units and zero-state errors with suitable audio/nonvisual equivalents; must not infer mastery from one correct pointer reading or silently assign grading thresholds.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate all instrument labels, unit grammar, midpoint explanations, zero/tare instructions, pointer states, feedback and Notes genuinely for every supported locale. A visually graduated scale must have an equivalent **ordered list of major and minor ticks** and a clear pointer position relative to the neighboring labels, so screen-reader users can infer exactly the same value **before** requesting the reveal. Numeric scale direction and 0/100…600 mapping remain consistent in RTL; translating UI reading order must not mirror the instrument's values. Controls are ordinary accessible buttons/choices, no tiny pointer dragging, external sensor, color-only mark identification, forced speech or sound. Provide 200% zoom, visible focus, large touch areas, reduced motion, screen-reader state announcements, complete post-download offline use and WCAG 2.2 AA verification. This is a design contract, not evidence of implemented accessibility.

## PRODUCTION / PLATFORM DEPENDENCIES

The Playground renderer currently handles `text`, `markdown`, `scene`, but the custom mass-scale Scene, real locales, runtime Lesson, tests and caching do **not** exist. Coding Agent must verify locale context before implementing prop-free Scene roots, interval logic and accessibility behavior; no invented instrument sensor API. Do not add scoring, Questions, Quizzes, Note persistence, analytics or platform state contracts here.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md), canonical `weighObject.data.ts` source and earlier qualitative `compareMass.data.ts` prerequisite.
- Editor: verify that the deliberate +100 g offset example is labeled as **uncorrected instrument reading**, not the actual object mass.
- Editor: confirm 50 g midpoint interpretation fits the chosen Grade 3 prerequisite numeracy without adding kilogram conversion.
- Methodologist and Scene approval are both pending.

## HANDOFF

Methodologist approves the numeric scale and accuracy claims. Screenwriter/editor validates all values, feedback and accessible equivalents. Approved Scene spec then passes to Scene Designer/Coding Agent with tests; assessment is separately authorized.
