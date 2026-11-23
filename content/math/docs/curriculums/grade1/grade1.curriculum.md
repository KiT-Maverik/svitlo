# Mathematics — Grade 1

Date: 2026-10-28

A country-independent first-stage mathematics curriculum organized around observable competencies rather than a specific national syllabus or timetable. It builds number sense, early operations, mathematical language, geometry, measurement, and reasoning through progressively more abstract representations.

The plan establishes a pedagogical sequence, not fixed instructional hours or finalized lesson experiences. Module and lesson files provide the linked source material; the approved [Skills Taxonomy](../../../data/skills/index.ts) owns the competency hierarchy and its separate editorial Definition and Code links.

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
Dependencies: Skills refer to the current typed `data/skills/` registry. Earlier editorial Definitions were preserved in Git history; this historical plan does not itself authorize new Skill or Lesson production. File presence establishes traceability, not proof of runtime registration; complete Learning Briefs, assessments, and UI specifications belong to later stages.

## LEARNING PLAN

### 01 - Кількість, числа й порядок

File: `Кількість, числа й порядок`
Goal: Establish cardinality, number notation, counting order, and grouping within 20.
Learners move from counting individual objects to comparing and ordering written numbers. Equal groups and the first ten provide the foundations for later arithmetic.

#### 01 - Один предмет — одне число

File: `Один предмет — одне число`
Goal: Count every object exactly once and state the total.
Use a one-to-one counting action to distinguish counting words from the number of objects.
Target skills:

- [One-to-one correspondence when counting](../../../data/skills/counting/sequence/oneToOne.ts)
- [Determining how many objects are in a set](../../../data/skills/counting/cardinality/basicCardinality.ts)

#### 02 - Нуль і цифри

File: `Нуль і цифри`
Goal: Recognize zero and connect digits 0–9 with quantities.
Contrast empty sets with visible groups, then match spoken number words, digits, and objects.
Target skills:

- [Understanding zero as an empty quantity](../../../data/skills/counting/cardinality/zero.ts)
- [Digits 0–9 and the meaning of a digit](../../../data/skills/numeration/notation/digits09.ts)

#### 03 - Лічба вперед і назад до 20

File: `Лічба вперед і назад до 20`
Goal: Continue counting forward and backward within 20.
Start at different numbers and cross ten in both directions, using objects when needed.
Target skills:

- [Counting forward within 20](../../../data/skills/counting/sequence/forward20.ts)
- [Counting backward within 20](../../../data/skills/counting/sequence/backward20.ts)

#### 04 - Читаємо й записуємо числа до 20

File: `Читаємо й записуємо числа до 20`
Goal: Read, write, and identify numbers from 0 to 20.
Match two-digit numerals with spoken names and concrete quantities, including 10 and 20.
Target skills:

- [Reading, writing and matching numbers 0–20](../../../data/skills/numeration/notation/readWrite20.ts)

#### 05 - Порядковий номер і сусіди числа

File: `Порядковий номер і сусіди числа`
Goal: Tell ordinal position from quantity and locate neighboring numbers.
Compare 'the third object' with 'three objects'; find previous, next, and intermediate numbers.
Target skills:

- [Recognizing ordinal position](../../../data/skills/counting/ordinal/basicOrdinal.ts)
- [Previous, next and intermediate numbers](../../../data/skills/numeration/numberLine/beforeAfterBetween.ts)

#### 06 - Де більше, менше чи порівну

File: `Де більше, менше чи порівну`
Goal: Compare two groups as greater, smaller, or equal.
Use matching and counting to justify a comparison without relying on size or arrangement.
Target skills:

- [Comparing sets by matching or counting](../../../data/skills/counting/cardinality/compareSets.ts)
- [Greater, less or equal quantities](../../../data/skills/numeration/comparison/moreLessEqual.ts)

#### 07 - Порівнюємо й упорядковуємо числа

File: `Порівнюємо й упорядковуємо числа`
Goal: Use comparison signs and order numbers within 20.
Read <, >, and = as relationships and arrange numbers by value.
Target skills:

- [Comparison symbols <, > and =](../../../data/skills/numeration/comparison/comparisonSymbols.ts)
- [Ordering numbers 0–20](../../../data/skills/numeration/comparison/order20.ts)

#### 08 - Числова пряма до 20

File: `Числова пряма до 20`
Goal: Locate numbers and neighbors on a line from 0 to 20.
Interpret equally spaced positions, relative direction, and one-step movement on a number line.
Target skills:

- [Numbers on a line to 20](../../../data/skills/numeration/numberLine/numberLine20.ts)

#### 09 - Десяток як група

File: `Десяток як група`
Goal: Make and break a group of ten objects.
Bundle ten ones into one ten and unbundle it without changing the quantity.
Target skills:

- [Grouping and ungrouping ten ones](../../../data/skills/numeration/placeValue/makeTen.ts)

#### 10 - Лічба парами та п’ятірками

File: `Лічба парами та п’ятірками`
Goal: Count equal groups by twos and fives.
Build repeated groups and connect skip-counting sequences with the objects they count.
Target skills:

- [Counting in steps of 2](../../../data/skills/counting/steps/countBy2.ts)
- [Counting in steps of 5](../../../data/skills/counting/steps/countBy5.ts)

#### 11 - Число в різних представленнях

File: `Число в різних представленнях`
Goal: Link quantities, numerals, and number-line positions.
Translate between concrete sets, written numbers, and placements rather than learning each separately.
Target skills:

- [Matching representations of a number](../../../data/skills/numeration/placeValue/multipleRepresentations.ts)

### 02 - Додавання та віднімання

File: `Додавання та віднімання`
Goal: Develop concrete addition and subtraction through sums and differences within 20.
Part–whole models, zero, commutativity, and bridging through ten support understanding of operations. Inverse relationships are introduced as a way to check work.

#### 01 - Частини та ціле

File: `Частини та ціле`
Goal: Recognize a whole as two parts and find a missing part.
Separate and reunite objects, keeping the total invariant and identifying unknown components.
Target skills:

- [Addition and subtraction — Part–whole relationship](../../../data/skills/arithmetic/additionSubtraction/partWhole.ts)

#### 02 - Що означає додати

File: `Що означає додати`
Goal: Model addition as joining or adding objects, including zero.
Connect visible actions to the + sign; notice that adding zero leaves the quantity unchanged.
Target skills:

- [Addition — Meaning and models](../../../data/skills/arithmetic/addition/addMeaning.ts)
- [Addition — Zero](../../../data/skills/arithmetic/addition/addZero.ts)

#### 03 - Суми та різниці в межах 10

File: `Суми та різниці в межах 10`
Goal: Develop basic addition and subtraction facts within 10.
Use concrete number relationships instead of memorizing isolated answers; subtraction is first shown through removal.
Target skills:

- [Addition and subtraction — Number facts ≤ 10](../../../data/skills/arithmetic/additionSubtraction/factsWithin10.ts)

#### 04 - Склад числа 10

File: `Склад числа 10`
Goal: Build ten from two complementary parts.
Explore alternative pairs for the same whole and use ten frames to find missing parts.
Target skills:

- [Addition and subtraction — Bonds of 10](../../../data/skills/arithmetic/additionSubtraction/numberBonds10.ts)

#### 05 - Переставляємо доданки

File: `Переставляємо доданки`
Goal: Explain why swapping addends preserves the sum.
Rearrange the same groups and compare their unchanged combined quantity.
Target skills:

- [Addition — Commutative property](../../../data/skills/arithmetic/addition/commutativeAddition.ts)

#### 06 - Доповнення до десяти

File: `Доповнення до десяти`
Goal: Use making ten as a mental addition strategy.
Split one addend to complete a ten, then combine the remaining objects.
Target skills:

- [Addition — Making ten](../../../data/skills/arithmetic/addition/makeTenStrategy.ts)

#### 07 - Додавання з переходом через десяток

File: `Додавання з переходом через десяток`
Goal: Add one-digit numbers when the sum crosses ten.
Show each regrouping step through a full ten and leftover ones.
Target skills:

- [Addition — Crossing ten](../../../data/skills/arithmetic/addition/crossTenAddition.ts)

#### 08 - Що означає відняти

File: `Що означає відняти`
Goal: Model subtraction, including subtracting zero or all objects.
Contrast removing a part with joining groups and describe the resulting difference.
Target skills:

- [Subtraction — Meaning and models](../../../data/skills/arithmetic/subtraction/subtractMeaning.ts)
- [Subtraction — Zero](../../../data/skills/arithmetic/subtraction/subtractZero.ts)
- [Subtraction — Same number](../../../data/skills/arithmetic/subtraction/subtractSelf.ts)

#### 09 - Віднімання через десяток

File: `Віднімання через десяток`
Goal: Subtract within 20 by passing through ten.
Split the amount removed to reach ten first, then subtract the remainder.
Target skills:

- [Subtraction — Crossing ten](../../../data/skills/arithmetic/subtraction/crossTenSubtraction.ts)

#### 10 - Обчислення в межах 20

File: `Обчислення в межах 20`
Goal: Apply addition and subtraction within 20 and check inverses.
Connect related equations and use the opposite operation to test a result.
Target skills:

- [Addition and subtraction — Number facts ≤ 20](../../../data/skills/arithmetic/additionSubtraction/factsWithin20.ts)
- [Addition and subtraction — Inverse operations](../../../data/skills/arithmetic/additionSubtraction/inverseOperations.ts)

### 03 - Математична мова, рівності та задачі

File: `Математична мова, рівності та задачі`
Goal: Connect mathematical language with numerical relationships and word problems.
Learners read expressions and equalities, identify known and unknown quantities, and translate short situations into models. Explanations should make the mathematical choice explicit.

#### 01 - Знак рівності означає баланс

File: `Знак рівності означає баланс`
Goal: Understand equality as two expressions with the same value.
Compare both sides of =, including cases where each side contains an operation.
Target skills:

- [Understanding the equals sign](../../../data/skills/algebra/equalities/equalityMeaning.ts)
- [Checking numerical equalities and inequalities](../../../data/skills/algebra/equalities/trueFalseEquality.ts)

#### 02 - Читаємо числові вирази

File: `Читаємо числові вирази`
Goal: Read simple numerical expressions accurately.
Connect the order of numbers and operation signs with concrete addition and subtraction actions.
Target skills:

- [Reading and writing numerical expressions](../../../data/skills/algebra/expressions/readNumericExpressions.ts)

#### 03 - Пропущене число

File: `Пропущене число`
Goal: Complete true equalities and find an unknown addend.
Represent missing quantities and verify each proposed value by substitution.
Target skills:

- [Completing a true equality](../../../data/skills/algebra/equalities/completeEquality.ts)
- [Finding an unknown addend](../../../data/skills/algebra/unknowns/unknownAddend.ts)

#### 04 - Що відомо в задачі?

File: `Що відомо в задачі?`
Goal: Identify known information and the actual question in a word problem.
Separate quantities supplied by the story from the quantity still to be found.
Target skills:

- [Identifying known and unknown quantities](../../../data/skills/problemSolving/conditions/identifyKnownUnknown.ts)

#### 05 - Малюнок і вираз до задачі

File: `Малюнок і вираз до задачі`
Goal: Build a model and choose an operation for a one-step problem.
Translate a short story into an object diagram and a matching addition or subtraction expression.
Target skills:

- [Modeling a one-step problem](../../../data/skills/problemSolving/models/oneStepModel.ts)
- [Choosing addition or subtraction](../../../data/skills/problemSolving/models/chooseOperationAddSub.ts)

#### 06 - На скільки більше або менше

File: `На скільки більше або менше`
Goal: Compare quantities and describe increases or decreases.
Distinguish 'how many more' comparisons from changes in a single quantity.
Target skills:

- [Solving additive comparison problems](../../../data/skills/problemSolving/comparisons/additiveComparison.ts)
- [Increasing or decreasing by a given amount](../../../data/skills/problemSolving/comparisons/increaseDecreaseNumber.ts)

#### 07 - Задачі на частини й ціле

File: `Задачі на частини й ціле`
Goal: Solve part–whole situations and name the result's unit.
Decide whether the whole or a part is unknown, then explain what the answer counts.
Target skills:

- [Solving part-whole and inverse problems](../../../data/skills/problemSolving/parts/partWholeAddsub.ts)
- [Checking answer units and reasonableness](../../../data/skills/problemSolving/planning/explainAnswerUnits.ts)

#### 08 - Закономірність і пояснення

File: `Закономірність і пояснення`
Goal: Continue a pattern and justify its rule.
Check that a proposed numerical step works across the sequence, not only at its end.
Target skills:

- [Continuing numerical patterns with a constant step](../../../data/skills/algebra/patterns/arithmeticPattern.ts)
- [Explaining a chosen calculation strategy](../../../data/skills/reasoning/argumentation/explainStrategy.ts)

#### 09 - Створюємо власну задачу

File: `Створюємо власну задачу`
Goal: Create a simple solvable word problem from a picture or expression.
Choose consistent data, a meaningful event, and a question without revealing the answer in the condition.
Target skills:

- [Creating a word problem from a model](../../../data/skills/problemSolving/models/createProblem.ts)

### 04 - Геометрія та вимірювання

File: `Геометрія та вимірювання`
Goal: Recognize shapes, spatial relations, and simple measurement principles.
Learners identify two- and three-dimensional figures, compose shapes, compare mass and capacity, and measure or estimate length with appropriate units.

#### 01 - Ліворуч, праворуч, між

File: `Ліворуч, праворуч, між`
Goal: Describe positions and follow short spatial directions.
Use clearly named reference points for left, right, between, and path instructions.
Target skills:

- [Describing relative positions](../../../data/skills/geometry/orientation/positionWords.ts)
- [Giving and following route directions](../../../data/skills/geometry/orientation/spatialOrientationPath.ts)

#### 02 - Плоскі фігури

File: `Плоскі фігури`
Goal: Identify common plane shapes despite changes of size or orientation.
Compare sides, corners, and closure instead of matching a memorized appearance.
Target skills:

- [Identifying basic plane figures](../../../data/skills/geometry/figures/identify2dShapes.ts)

#### 03 - Об’ємні фігури

File: `Об’ємні фігури`
Goal: Recognize common three-dimensional solids.
Distinguish spheres, cubes, cylinders, and cones by visible spatial properties.
Target skills:

- [Identifying basic solid figures](../../../data/skills/geometry/solids/identify3dSolids.ts)

#### 04 - Складаємо фігури

File: `Складаємо фігури`
Goal: Compose and decompose shapes into familiar parts.
Assemble and separate plane figures without losing or overlapping components.
Target skills:

- [Composing and decomposing plane figures](../../../data/skills/geometry/figures/composeDecomposeShapes.ts)

#### 05 - Довший, коротший, однаковий

File: `Довший, коротший, однаковий`
Goal: Compare lengths and measure them with repeated equal units.
Align starts, avoid gaps, and explain why a common unit is needed.
Target skills:

- [Comparing lengths directly and indirectly](../../../data/skills/measurement/length/compareLength.ts)
- [Measuring length with repeated nonstandard units](../../../data/skills/measurement/length/nonstandardLength.ts)

#### 06 - Лінійка та сантиметр

File: `Лінійка та сантиметр`
Goal: Use a ruler, measure a segment in centimeters, and draw a segment of a given length.
Count centimeter intervals rather than tick marks; use a consistent virtual scale.
Target skills:

- [Using a ruler](../../../data/skills/measurement/length/useRuler.ts)
- [Measuring segments in centimeters](../../../data/skills/measurement/length/measureCentimeters.ts)
- [Drawing segments of a given length in centimeters](../../../data/skills/measurement/length/drawSegmentCentimeters.ts)

#### 07 - Важче та місткіше

File: `Важче та місткіше`
Goal: Compare mass and capacity using appropriate models.
Distinguish a balance comparison from the volume a container can hold.
Target skills:

- [Comparing masses using a balance](../../../data/skills/measurement/mass/compareMass.ts)
- [Comparing container capacities by pouring or measuring](../../../data/skills/measurement/capacity/capacityConcept.ts)

#### 08 - Оцінюємо довжину перед вимірюванням

File: `Оцінюємо довжину перед вимірюванням`
Goal: Estimate length, then test the estimate by measuring.
Use a reference length, compare estimated and measured results, and learn from the difference.
Target skills:

- [Estimating length and checking by measurement](../../../data/skills/measurement/length/estimateLength.ts)

### 05 - Час, гроші, дані

File: `Час, гроші, дані`
Goal: Use time, money, and basic data representations to explain everyday quantities.
Learners read whole hours and simple calendars, assemble money amounts, classify observations, and interpret tables and pictographs. Reasoning links representations to clear answers.

#### 01 - Частини доби та години

File: `Частини доби та години`
Goal: Sequence parts of a day and read whole hours.
Recognize morning/day/evening/night and distinguish a clock reading from time-of-day context.
Target skills:

- [Sequencing parts of the day](../../../data/skills/time/calendar/daySequence.ts)
- [Reading time to the hour](../../../data/skills/time/clock/readHour.ts)

#### 02 - Дні тижня та календар

File: `Дні тижня та календар`
Goal: Navigate days of the week and the calendar.
Locate dates and months without assuming a universal start-of-week column.
Target skills:

- [Navigating days, weeks, and months in a calendar](../../../data/skills/time/calendar/weekMonthYear.ts)

#### 03 - Грошові номінали та суми

File: `Грошові номінали та суми`
Goal: Recognize configured denominations and compose and compare amounts.
Use an illustrative currency or a verified locale-specific set of denominations, never assumed universal coins.
Target skills:

- [Recognizing coin and banknote denominations](../../../data/skills/money/denominations/recognizeDenominations.ts)
- [Composing a money amount](../../../data/skills/money/denominations/composeAmount.ts)
- [Comparing money amounts](../../../data/skills/money/denominations/compareAmounts.ts)

#### 04 - Сортуємо й рахуємо дані

File: `Сортуємо й рахуємо дані`
Goal: Collect and count observations in each category.
Use predefined categories, tally each observation once, and check category totals.
Target skills:

- [Counting category frequencies](../../../data/skills/data/collection/collectCounts.ts)

#### 05 - Прості таблиці й піктограми

File: `Прості таблиці й піктограми`
Goal: Read simple tables and one-to-one pictographs.
Find category values, interpret explicit zeroes, and observe the pictograph legend.
Target skills:

- [Reading a simple data table](../../../data/skills/data/presentation/readSimpleTable.ts)
- [Reading a one-to-one pictograph](../../../data/skills/data/presentation/readPictograph.ts)

#### 06 - Поясни, як ти міркував

File: `Поясни, як ти міркував`
Goal: Explain a calculation by relating a story, model, and expression.
Select and justify the operation with concrete evidence, not only a keyword.
Target skills:

- [Representing a situation with an expression or equation](../../../data/skills/algebra/formalization/translateSituation.ts)
- [Classifying objects or numbers by a rule and justifying the choice](../../../data/skills/reasoning/argumentation/classifyAndJustify.ts)
- [Converting between concrete, diagrammatic, verbal and symbolic representations](../../../data/skills/reasoning/representations/multipleRepresentations.ts)
