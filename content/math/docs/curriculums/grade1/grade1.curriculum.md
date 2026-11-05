# Mathematics — Grade 1

Date: 2026-10-28

A country-independent first-stage mathematics curriculum organized around observable competencies rather than a specific national syllabus or timetable. It builds number sense, early operations, mathematical language, geometry, measurement, and reasoning through progressively more abstract representations.

The plan establishes a pedagogical sequence, not fixed instructional hours or finalized lesson experiences. Module and lesson files provide the linked source material; the approved [Skills Taxonomy](../skills/taxonomy.md) owns the competency hierarchy and its separate editorial Definition and Code links.

## TARGET AUDIENCE

Ages: 6–7 (approximate)
Designed for learners beginning formal mathematics, including those still acquiring independent reading skills. Prior understanding matters more than chronological age; spoken explanations and concrete models should remain available wherever a reading barrier could obscure mathematical understanding.

Prerequisites:

- No formal mathematical prerequisites.
- Learners should be able to engage with basic objects or accessible equivalents; independent reading is not required.

## EXPECTED RESULTS

- Count, represent, compare, and order numbers within 20, including zero and groups of ten.
- Explain addition and subtraction with objects; solve and check simple calculations within 20.
- Read equalities, interpret one-step problems, and distinguish known from unknown quantities.
- Identify common shapes, spatial relationships, and basic measurement ideas.
- Read whole hours, compose simple money amounts, and interpret elementary categorical data.

## Методичні межі й редакційні примітки

Scope: Concrete number sense and basic arithmetic within 20; simple spatial, measurement, time, money, and data contexts. Recurring practice may revisit the same skill across lessons.
Exclusions: Counting to 100 as an exit requirement, multi-step word problems, formal algebra, fixed national standards, and prescribed lesson hours.
Progression: Module and lesson order is a pedagogical proposal; check prerequisite sequencing before publishing, especially the introduction of subtraction relative to early facts within 10.
Dependencies: Skills are linked to their existing `*.data.ts` Code implementations. Editorial Definitions are linked separately in the [Skills Taxonomy](../skills/taxonomy.md). File presence establishes traceability, not proof of runtime registration; complete Learning Briefs, assessments, and UI specifications belong to later stages.

## LEARNING PLAN

### 01 - Кількість, числа й порядок

File: [Кількість, числа й порядок](./grade-1/01-kilkist-chysla-i-poriadok/README.md)
Goal: Establish cardinality, number notation, counting order, and grouping within 20.
Learners move from counting individual objects to comparing and ordering written numbers. Equal groups and the first ten provide the foundations for later arithmetic.

#### 01 - Один предмет — одне число

File: [Один предмет — одне число](./grade-1/01-kilkist-chysla-i-poriadok/01-odyn-predmet-odne-chyslo/README.md)
Goal: Count every object exactly once and state the total.
Use a one-to-one counting action to distinguish counting words from the number of objects.
Target skills:

- [One-to-one correspondence when counting](../../src/data/skillsTaxonomy/counting/sequence/skills/oneToOne.data.ts)
- [Determining how many objects are in a set](../../src/data/skillsTaxonomy/counting/cardinality/skills/basicCardinality.data.ts)

#### 02 - Нуль і цифри

File: [Нуль і цифри](./grade-1/01-kilkist-chysla-i-poriadok/02-nul-i-tsyfry/README.md)
Goal: Recognize zero and connect digits 0–9 with quantities.
Contrast empty sets with visible groups, then match spoken number words, digits, and objects.
Target skills:

- [Understanding zero as an empty quantity](../../src/data/skillsTaxonomy/counting/cardinality/skills/zero.data.ts)
- [Digits 0–9 and the meaning of a digit](../../src/data/skillsTaxonomy/numeration/notation/skills/digits09.data.ts)

#### 03 - Лічба вперед і назад до 20

File: [Лічба вперед і назад до 20](./grade-1/01-kilkist-chysla-i-poriadok/03-lichba-vpered-i-nazad-do-20/README.md)
Goal: Continue counting forward and backward within 20.
Start at different numbers and cross ten in both directions, using objects when needed.
Target skills:

- [Counting forward within 20](../../src/data/skillsTaxonomy/counting/sequence/skills/forward20.data.ts)
- [Counting backward within 20](../../src/data/skillsTaxonomy/counting/sequence/skills/backward20.data.ts)

#### 04 - Читаємо й записуємо числа до 20

File: [Читаємо й записуємо числа до 20](./grade-1/01-kilkist-chysla-i-poriadok/04-chytaiemo-i-zapysuiemo-chysla-do-20/README.md)
Goal: Read, write, and identify numbers from 0 to 20.
Match two-digit numerals with spoken names and concrete quantities, including 10 and 20.
Target skills:

- [Reading, writing and matching numbers 0–20](../../src/data/skillsTaxonomy/numeration/notation/skills/readWrite20.data.ts)

#### 05 - Порядковий номер і сусіди числа

File: [Порядковий номер і сусіди числа](./grade-1/01-kilkist-chysla-i-poriadok/05-poriadkovyi-nomer-i-susidy-chysla/README.md)
Goal: Tell ordinal position from quantity and locate neighboring numbers.
Compare 'the third object' with 'three objects'; find previous, next, and intermediate numbers.
Target skills:

- [Recognizing ordinal position](../../src/data/skillsTaxonomy/counting/ordinal/skills/basicOrdinal.data.ts)
- [Previous, next and intermediate numbers](../../src/data/skillsTaxonomy/numeration/numberLine/skills/beforeAfterBetween.data.ts)

#### 06 - Де більше, менше чи порівну

File: [Де більше, менше чи порівну](./grade-1/01-kilkist-chysla-i-poriadok/06-de-bilshe-menshe-chy-porivnu/README.md)
Goal: Compare two groups as greater, smaller, or equal.
Use matching and counting to justify a comparison without relying on size or arrangement.
Target skills:

- [Comparing sets by matching or counting](../../src/data/skillsTaxonomy/counting/cardinality/skills/compareSets.data.ts)
- [Greater, less or equal quantities](../../src/data/skillsTaxonomy/numeration/comparison/skills/moreLessEqual.data.ts)

#### 07 - Порівнюємо й упорядковуємо числа

File: [Порівнюємо й упорядковуємо числа](./grade-1/01-kilkist-chysla-i-poriadok/07-porivniuiemo-i-uporiadkovuiemo-chysla/README.md)
Goal: Use comparison signs and order numbers within 20.
Read <, >, and = as relationships and arrange numbers by value.
Target skills:

- [Comparison symbols <, > and =](../../src/data/skillsTaxonomy/numeration/comparison/skills/comparisonSymbols.data.ts)
- [Ordering numbers 0–20](../../src/data/skillsTaxonomy/numeration/comparison/skills/order20.data.ts)

#### 08 - Числова пряма до 20

File: [Числова пряма до 20](./grade-1/01-kilkist-chysla-i-poriadok/08-chyslova-priama-do-20/README.md)
Goal: Locate numbers and neighbors on a line from 0 to 20.
Interpret equally spaced positions, relative direction, and one-step movement on a number line.
Target skills:

- [Numbers on a line to 20](../../src/data/skillsTaxonomy/numeration/numberLine/skills/numberLine20.data.ts)

#### 09 - Десяток як група

File: [Десяток як група](./grade-1/01-kilkist-chysla-i-poriadok/09-desiatok-iak-hrupa/README.md)
Goal: Make and break a group of ten objects.
Bundle ten ones into one ten and unbundle it without changing the quantity.
Target skills:

- [Grouping and ungrouping ten ones](../../src/data/skillsTaxonomy/numeration/placeValue/skills/makeTen.data.ts)

#### 10 - Лічба парами та п’ятірками

File: [Лічба парами та п’ятірками](./grade-1/01-kilkist-chysla-i-poriadok/10-lichba-paramy-ta-piatirkamy/README.md)
Goal: Count equal groups by twos and fives.
Build repeated groups and connect skip-counting sequences with the objects they count.
Target skills:

- [Counting in steps of 2](../../src/data/skillsTaxonomy/counting/steps/skills/countBy2.data.ts)
- [Counting in steps of 5](../../src/data/skillsTaxonomy/counting/steps/skills/countBy5.data.ts)

#### 11 - Число в різних представленнях

File: [Число в різних представленнях](./grade-1/01-kilkist-chysla-i-poriadok/11-chyslo-v-riznykh-predstavlenniakh/README.md)
Goal: Link quantities, numerals, and number-line positions.
Translate between concrete sets, written numbers, and placements rather than learning each separately.
Target skills:

- [Matching representations of a number](../../src/data/skillsTaxonomy/numeration/placeValue/skills/multipleRepresentations.data.ts)

### 02 - Додавання та віднімання

File: [Додавання та віднімання](./grade-1/02-dodavannia-ta-vidnimannia/README.md)
Goal: Develop concrete addition and subtraction through sums and differences within 20.
Part–whole models, zero, commutativity, and bridging through ten support understanding of operations. Inverse relationships are introduced as a way to check work.

#### 01 - Частини та ціле

File: [Частини та ціле](./grade-1/02-dodavannia-ta-vidnimannia/01-chastyny-ta-tsile/README.md)
Goal: Recognize a whole as two parts and find a missing part.
Separate and reunite objects, keeping the total invariant and identifying unknown components.
Target skills:

- [Addition and subtraction — Part–whole relationship](../../src/data/skillsTaxonomy/arithmetic/additionSubtraction/skills/partWhole.data.ts)

#### 02 - Що означає додати

File: [Що означає додати](./grade-1/02-dodavannia-ta-vidnimannia/02-shcho-oznachaie-dodaty/README.md)
Goal: Model addition as joining or adding objects, including zero.
Connect visible actions to the + sign; notice that adding zero leaves the quantity unchanged.
Target skills:

- [Addition — Meaning and models](../../src/data/skillsTaxonomy/arithmetic/addition/skills/addMeaning.data.ts)
- [Addition — Zero](../../src/data/skillsTaxonomy/arithmetic/addition/skills/addZero.data.ts)

#### 03 - Суми та різниці в межах 10

File: [Суми та різниці в межах 10](./grade-1/02-dodavannia-ta-vidnimannia/03-sumy-ta-riznytsi-v-mezhakh-10/README.md)
Goal: Develop basic addition and subtraction facts within 10.
Use concrete number relationships instead of memorizing isolated answers; subtraction is first shown through removal.
Target skills:

- [Addition and subtraction — Number facts ≤ 10](../../src/data/skillsTaxonomy/arithmetic/additionSubtraction/skills/factsWithin10.data.ts)

#### 04 - Склад числа 10

File: [Склад числа 10](./grade-1/02-dodavannia-ta-vidnimannia/04-sklad-chysla-10/README.md)
Goal: Build ten from two complementary parts.
Explore alternative pairs for the same whole and use ten frames to find missing parts.
Target skills:

- [Addition and subtraction — Bonds of 10](../../src/data/skillsTaxonomy/arithmetic/additionSubtraction/skills/numberBonds10.data.ts)

#### 05 - Переставляємо доданки

File: [Переставляємо доданки](./grade-1/02-dodavannia-ta-vidnimannia/05-perestavliaiemo-dodanky/README.md)
Goal: Explain why swapping addends preserves the sum.
Rearrange the same groups and compare their unchanged combined quantity.
Target skills:

- [Addition — Commutative property](../../src/data/skillsTaxonomy/arithmetic/addition/skills/commutativeAddition.data.ts)

#### 06 - Доповнення до десяти

File: [Доповнення до десяти](./grade-1/02-dodavannia-ta-vidnimannia/06-dopovnennia-do-desiaty/README.md)
Goal: Use making ten as a mental addition strategy.
Split one addend to complete a ten, then combine the remaining objects.
Target skills:

- [Addition — Making ten](../../src/data/skillsTaxonomy/arithmetic/addition/skills/makeTenStrategy.data.ts)

#### 07 - Додавання з переходом через десяток

File: [Додавання з переходом через десяток](./grade-1/02-dodavannia-ta-vidnimannia/07-dodavannia-z-perekhodom-cherez-desiatok/README.md)
Goal: Add one-digit numbers when the sum crosses ten.
Show each regrouping step through a full ten and leftover ones.
Target skills:

- [Addition — Crossing ten](../../src/data/skillsTaxonomy/arithmetic/addition/skills/crossTenAddition.data.ts)

#### 08 - Що означає відняти

File: [Що означає відняти](./grade-1/02-dodavannia-ta-vidnimannia/08-shcho-oznachaie-vidniaty/README.md)
Goal: Model subtraction, including subtracting zero or all objects.
Contrast removing a part with joining groups and describe the resulting difference.
Target skills:

- [Subtraction — Meaning and models](../../src/data/skillsTaxonomy/arithmetic/subtraction/skills/subtractMeaning.data.ts)
- [Subtraction — Zero](../../src/data/skillsTaxonomy/arithmetic/subtraction/skills/subtractZero.data.ts)
- [Subtraction — Same number](../../src/data/skillsTaxonomy/arithmetic/subtraction/skills/subtractSelf.data.ts)

#### 09 - Віднімання через десяток

File: [Віднімання через десяток](./grade-1/02-dodavannia-ta-vidnimannia/09-vidnimannia-cherez-desiatok/README.md)
Goal: Subtract within 20 by passing through ten.
Split the amount removed to reach ten first, then subtract the remainder.
Target skills:

- [Subtraction — Crossing ten](../../src/data/skillsTaxonomy/arithmetic/subtraction/skills/crossTenSubtraction.data.ts)

#### 10 - Обчислення в межах 20

File: [Обчислення в межах 20](./grade-1/02-dodavannia-ta-vidnimannia/10-obchyslennia-v-mezhakh-20/README.md)
Goal: Apply addition and subtraction within 20 and check inverses.
Connect related equations and use the opposite operation to test a result.
Target skills:

- [Addition and subtraction — Number facts ≤ 20](../../src/data/skillsTaxonomy/arithmetic/additionSubtraction/skills/factsWithin20.data.ts)
- [Addition and subtraction — Inverse operations](../../src/data/skillsTaxonomy/arithmetic/additionSubtraction/skills/inverseOperations.data.ts)

### 03 - Математична мова, рівності та задачі

File: [Математична мова, рівності та задачі](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/README.md)
Goal: Connect mathematical language with numerical relationships and word problems.
Learners read expressions and equalities, identify known and unknown quantities, and translate short situations into models. Explanations should make the mathematical choice explicit.

#### 01 - Знак рівності означає баланс

File: [Знак рівності означає баланс](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/01-znak-rivnosti-oznachaie-balans/README.md)
Goal: Understand equality as two expressions with the same value.
Compare both sides of =, including cases where each side contains an operation.
Target skills:

- [Understanding the equals sign](../../src/data/skillsTaxonomy/algebra/equalities/skills/equalityMeaning.data.ts)
- [Checking numerical equalities and inequalities](../../src/data/skillsTaxonomy/algebra/equalities/skills/trueFalseEquality.data.ts)

#### 02 - Читаємо числові вирази

File: [Читаємо числові вирази](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/02-chytaiemo-chyslovi-vyrazy/README.md)
Goal: Read simple numerical expressions accurately.
Connect the order of numbers and operation signs with concrete addition and subtraction actions.
Target skills:

- [Reading and writing numerical expressions](../../src/data/skillsTaxonomy/algebra/expressions/skills/readNumericExpressions.data.ts)

#### 03 - Пропущене число

File: [Пропущене число](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/03-propushchene-chyslo/README.md)
Goal: Complete true equalities and find an unknown addend.
Represent missing quantities and verify each proposed value by substitution.
Target skills:

- [Completing a true equality](../../src/data/skillsTaxonomy/algebra/equalities/skills/completeEquality.data.ts)
- [Finding an unknown addend](../../src/data/skillsTaxonomy/algebra/unknowns/skills/unknownAddend.data.ts)

#### 04 - Що відомо в задачі?

File: [Що відомо в задачі?](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/04-shcho-vidomo-v-zadachi/README.md)
Goal: Identify known information and the actual question in a word problem.
Separate quantities supplied by the story from the quantity still to be found.
Target skills:

- [Identifying known and unknown quantities](../../src/data/skillsTaxonomy/problemSolving/conditions/skills/identifyKnownUnknown.data.ts)

#### 05 - Малюнок і вираз до задачі

File: [Малюнок і вираз до задачі](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/05-maliunok-i-vyraz-do-zadachi/README.md)
Goal: Build a model and choose an operation for a one-step problem.
Translate a short story into an object diagram and a matching addition or subtraction expression.
Target skills:

- [Modeling a one-step problem](../../src/data/skillsTaxonomy/problemSolving/models/skills/oneStepModel.data.ts)
- [Choosing addition or subtraction](../../src/data/skillsTaxonomy/problemSolving/models/skills/chooseOperationAddSub.data.ts)

#### 06 - На скільки більше або менше

File: [На скільки більше або менше](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/06-na-skilky-bilshe-abo-menshe/README.md)
Goal: Compare quantities and describe increases or decreases.
Distinguish 'how many more' comparisons from changes in a single quantity.
Target skills:

- [Solving additive comparison problems](../../src/data/skillsTaxonomy/problemSolving/comparisons/skills/additiveComparison.data.ts)
- [Increasing or decreasing by a given amount](../../src/data/skillsTaxonomy/problemSolving/comparisons/skills/increaseDecreaseNumber.data.ts)

#### 07 - Задачі на частини й ціле

File: [Задачі на частини й ціле](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/07-zadachi-na-chastyny-i-tsile/README.md)
Goal: Solve part–whole situations and name the result's unit.
Decide whether the whole or a part is unknown, then explain what the answer counts.
Target skills:

- [Solving part-whole and inverse problems](../../src/data/skillsTaxonomy/problemSolving/parts/skills/partWholeAddsub.data.ts)
- [Checking answer units and reasonableness](../../src/data/skillsTaxonomy/problemSolving/planning/skills/explainAnswerUnits.data.ts)

#### 08 - Закономірність і пояснення

File: [Закономірність і пояснення](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/08-zakonomirnist-i-poiasnennia/README.md)
Goal: Continue a pattern and justify its rule.
Check that a proposed numerical step works across the sequence, not only at its end.
Target skills:

- [Continuing numerical patterns with a constant step](../../src/data/skillsTaxonomy/algebra/patterns/skills/arithmeticPattern.data.ts)
- [Explaining a chosen calculation strategy](../../src/data/skillsTaxonomy/reasoning/argumentation/skills/explainStrategy.data.ts)

#### 09 - Створюємо власну задачу

File: [Створюємо власну задачу](./grade-1/03-matematychna-mova-rivnosti-ta-zadachi/09-stvoriuiemo-vlasnu-zadachu/README.md)
Goal: Create a simple solvable word problem from a picture or expression.
Choose consistent data, a meaningful event, and a question without revealing the answer in the condition.
Target skills:

- [Creating a word problem from a model](../../src/data/skillsTaxonomy/problemSolving/models/skills/createProblem.data.ts)

### 04 - Геометрія та вимірювання

File: [Геометрія та вимірювання](./grade-1/04-heometriia-ta-vymiriuvannia/README.md)
Goal: Recognize shapes, spatial relations, and simple measurement principles.
Learners identify two- and three-dimensional figures, compose shapes, compare mass and capacity, and measure or estimate length with appropriate units.

#### 01 - Ліворуч, праворуч, між

File: [Ліворуч, праворуч, між](./grade-1/04-heometriia-ta-vymiriuvannia/01-livoruch-pravoruch-mizh/README.md)
Goal: Describe positions and follow short spatial directions.
Use clearly named reference points for left, right, between, and path instructions.
Target skills:

- [Describing relative positions](../../src/data/skillsTaxonomy/geometry/orientation/skills/positionWords.data.ts)
- [Giving and following route directions](../../src/data/skillsTaxonomy/geometry/orientation/skills/spatialOrientationPath.data.ts)

#### 02 - Плоскі фігури

File: [Плоскі фігури](./grade-1/04-heometriia-ta-vymiriuvannia/02-ploski-fihury/README.md)
Goal: Identify common plane shapes despite changes of size or orientation.
Compare sides, corners, and closure instead of matching a memorized appearance.
Target skills:

- [Identifying basic plane figures](../../src/data/skillsTaxonomy/geometry/figures/skills/identify2dShapes.data.ts)

#### 03 - Об’ємні фігури

File: [Об’ємні фігури](./grade-1/04-heometriia-ta-vymiriuvannia/03-obiemni-fihury/README.md)
Goal: Recognize common three-dimensional solids.
Distinguish spheres, cubes, cylinders, and cones by visible spatial properties.
Target skills:

- [Identifying basic solid figures](../../src/data/skillsTaxonomy/geometry/solids/skills/identify3dSolids.data.ts)

#### 04 - Складаємо фігури

File: [Складаємо фігури](./grade-1/04-heometriia-ta-vymiriuvannia/04-skladaiemo-fihury/README.md)
Goal: Compose and decompose shapes into familiar parts.
Assemble and separate plane figures without losing or overlapping components.
Target skills:

- [Composing and decomposing plane figures](../../src/data/skillsTaxonomy/geometry/figures/skills/composeDecomposeShapes.data.ts)

#### 05 - Довший, коротший, однаковий

File: [Довший, коротший, однаковий](./grade-1/04-heometriia-ta-vymiriuvannia/05-dovshyi-korotshyi-odnakovyi/README.md)
Goal: Compare lengths and measure them with repeated equal units.
Align starts, avoid gaps, and explain why a common unit is needed.
Target skills:

- [Comparing lengths directly and indirectly](../../src/data/skillsTaxonomy/measurement/length/skills/compareLength.data.ts)
- [Measuring length with repeated nonstandard units](../../src/data/skillsTaxonomy/measurement/length/skills/nonstandardLength.data.ts)

#### 06 - Лінійка та сантиметр

File: [Лінійка та сантиметр](./grade-1/04-heometriia-ta-vymiriuvannia/06-liniika-ta-santymetr/README.md)
Goal: Use a ruler, measure a segment in centimeters, and draw a segment of a given length.
Count centimeter intervals rather than tick marks; use a consistent virtual scale.
Target skills:

- [Using a ruler](../../src/data/skillsTaxonomy/measurement/length/skills/useRuler.data.ts)
- [Measuring segments in centimeters](../../src/data/skillsTaxonomy/measurement/length/skills/measureCentimeters.data.ts)
- [Drawing segments of a given length in centimeters](../../src/data/skillsTaxonomy/measurement/length/skills/drawSegmentCentimeters.data.ts)

#### 07 - Важче та місткіше

File: [Важче та місткіше](./grade-1/04-heometriia-ta-vymiriuvannia/07-vazhche-ta-mistkishe/README.md)
Goal: Compare mass and capacity using appropriate models.
Distinguish a balance comparison from the volume a container can hold.
Target skills:

- [Comparing masses using a balance](../../src/data/skillsTaxonomy/measurement/mass/skills/compareMass.data.ts)
- [Comparing container capacities by pouring or measuring](../../src/data/skillsTaxonomy/measurement/capacity/skills/capacityConcept.data.ts)

#### 08 - Оцінюємо довжину перед вимірюванням

File: [Оцінюємо довжину перед вимірюванням](./grade-1/04-heometriia-ta-vymiriuvannia/08-otsiniuiemo-dovzhynu-pered-vymiriuvanniam/README.md)
Goal: Estimate length, then test the estimate by measuring.
Use a reference length, compare estimated and measured results, and learn from the difference.
Target skills:

- [Estimating length and checking by measurement](../../src/data/skillsTaxonomy/measurement/length/skills/estimateLength.data.ts)

### 05 - Час, гроші, дані

File: [Час, гроші, дані](./grade-1/05-chas-hroshi-dani/README.md)
Goal: Use time, money, and basic data representations to explain everyday quantities.
Learners read whole hours and simple calendars, assemble money amounts, classify observations, and interpret tables and pictographs. Reasoning links representations to clear answers.

#### 01 - Частини доби та години

File: [Частини доби та години](./grade-1/05-chas-hroshi-dani/01-chastyny-doby-ta-hodyny/README.md)
Goal: Sequence parts of a day and read whole hours.
Recognize morning/day/evening/night and distinguish a clock reading from time-of-day context.
Target skills:

- [Sequencing parts of the day](../../src/data/skillsTaxonomy/time/calendar/skills/daySequence.data.ts)
- [Reading time to the hour](../../src/data/skillsTaxonomy/time/clock/skills/readHour.data.ts)

#### 02 - Дні тижня та календар

File: [Дні тижня та календар](./grade-1/05-chas-hroshi-dani/02-dni-tyzhnia-ta-kalendar/README.md)
Goal: Navigate days of the week and the calendar.
Locate dates and months without assuming a universal start-of-week column.
Target skills:

- [Navigating days, weeks, and months in a calendar](../../src/data/skillsTaxonomy/time/calendar/skills/weekMonthYear.data.ts)

#### 03 - Грошові номінали та суми

File: [Грошові номінали та суми](./grade-1/05-chas-hroshi-dani/03-hroshovi-nominaly-ta-sumy/README.md)
Goal: Recognize configured denominations and compose and compare amounts.
Use an illustrative currency or a verified locale-specific set of denominations, never assumed universal coins.
Target skills:

- [Recognizing coin and banknote denominations](../../src/data/skillsTaxonomy/money/denominations/skills/recognizeDenominations.data.ts)
- [Composing a money amount](../../src/data/skillsTaxonomy/money/denominations/skills/composeAmount.data.ts)
- [Comparing money amounts](../../src/data/skillsTaxonomy/money/denominations/skills/compareAmounts.data.ts)

#### 04 - Сортуємо й рахуємо дані

File: [Сортуємо й рахуємо дані](./grade-1/05-chas-hroshi-dani/04-sortuiemo-i-rakhuiemo-dani/README.md)
Goal: Collect and count observations in each category.
Use predefined categories, tally each observation once, and check category totals.
Target skills:

- [Counting category frequencies](../../src/data/skillsTaxonomy/data/collection/skills/collectCounts.data.ts)

#### 05 - Прості таблиці й піктограми

File: [Прості таблиці й піктограми](./grade-1/05-chas-hroshi-dani/05-prosti-tablytsi-i-piktohramy/README.md)
Goal: Read simple tables and one-to-one pictographs.
Find category values, interpret explicit zeroes, and observe the pictograph legend.
Target skills:

- [Reading a simple data table](../../src/data/skillsTaxonomy/data/presentation/skills/readSimpleTable.data.ts)
- [Reading a one-to-one pictograph](../../src/data/skillsTaxonomy/data/presentation/skills/readPictograph.data.ts)

#### 06 - Поясни, як ти міркував

File: [Поясни, як ти міркував](./grade-1/05-chas-hroshi-dani/06-poiasny-iak-ty-mirkuvav/README.md)
Goal: Explain a calculation by relating a story, model, and expression.
Select and justify the operation with concrete evidence, not only a keyword.
Target skills:

- [Representing a situation with an expression or equation](../../src/data/skillsTaxonomy/algebra/formalization/skills/translateSituation.data.ts)
- [Classifying objects or numbers by a rule and justifying the choice](../../src/data/skillsTaxonomy/reasoning/argumentation/skills/classifyAndJustify.data.ts)
- [Converting between concrete, diagrammatic, verbal and symbolic representations](../../src/data/skillsTaxonomy/reasoning/representations/skills/multipleRepresentations.data.ts)
