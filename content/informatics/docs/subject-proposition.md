# Informatics — Subject Proposition

Date: 2026-10-29

A subject-specific proposal of learning directions and scenarios for Informatics. This is **not** a Curriculum, a Skills Taxonomy, implemented code, or a new category of learning content. General conventions and interdisciplinary decisions: [Studio Subject Proposition](../../../studio/Subject%20Proposition.md). Canonical competencies: [Informatics Skills Taxonomy](./skills/taxonomy.md).

**Subject boundary:** using a digital tool in Music, Geography, or Engineering does not automatically turn those lessons into Informatics. An independent Informatics topic must teach algorithms, data structures, programs, or digital systems.

**UX is shared by two textbooks:** **Engineering** studies human interaction with physical products, mechanisms, devices, and whole engineering systems; **Informatics** separately studies UX of **digital products and devices**: navigation, feedback, comprehensibility, accessibility, and interface integrity. A physical button on a digital device can serve as an example in both if each subject has its own learning goal. Using a digital tool in another subject does not automatically create Informatics Skills. Art covers visual language and composition. [ISO 9241 — UX terminology](https://www.iso.org/obp/ui/).

## 1. Scope and Interdisciplinary Connections

**Global index — the Informatics textbook entry:**

| No. | Textbook        | Main subject areas                                                                                                                                                                                                                                                                                                    | Question-based / encyclopedic sections                                 |
| --- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 8   | **Informatics** | Boolean logic, algorithms, search strategies and algorithm efficiency, programming and recursion, databases, statistics, probability, digital systems and concurrent/parallel execution, robotics, software architecture, design principles, procedural generation and optimization, AI and prompting, digital safety | **"How does it work?"** — computers, the Internet, Wi-Fi, programs, AI |

**Subject-owned areas carried over from the global proposal:**

| Area                                            | Subject ownership | Indicative content                                                                                                                                                     |
| ----------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Artificial Intelligence (AI)**                | Informatics       | Learning from examples, pattern recognition, intuitive introduction to neural networks, generative AI, errors and limitations                                          |
| **AI Model Architectures and Selection**        | Informatics       | Intuitive comparison of dense and mixture-of-experts (MoE) models; quantization, speed, memory, context, cost, quality, and selecting a model for a task               |
| **Software Architecture and Design Principles** | Informatics       | Objects, properties, behavior, composition, interfaces, abstraction, encapsulation, inheritance, polymorphism; DRY, KISS, YAGNI, SRP, and simple design-pattern models |

**Interdisciplinary areas (editorial copy for Informatics; the global source remains [here](../../../studio/Subject%20Proposition.md)):**

| Area                                                   | Subject ownership                                                | Indicative content                                                                                                                                                                            |
| ------------------------------------------------------ | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Robotics**                                           | Engineering; Informatics; Physics                                | Robots, sensors, actuators, programmable control, automation                                                                                                                                  |
| **Prompting and AI Literacy**                          | Informatics; Language and Literature; Human Thought / Philosophy | Clear task specification, context, examples and constraints in instructions; output verification, prompt refinement, confidentiality                                                          |
| **Cybersecurity**                                      | Informatics; Health and Safety                                   | Passwords, privacy, fraud, digital footprints, safe communication                                                                                                                             |
| **Game Design**                                        | Informatics; Art                                                 | Game rules, mechanics, creation and testing                                                                                                                                                   |
| **Procedural Generation and Engineering Optimization** | Informatics; Mathematics; Art                                    | Algorithmic generation of graphics, objects, worlds, and sounds; seeds, parameters, disk-space savings and trade-offs with memory, time, and computing power; .kkrieger (2004, roughly 96 KB) |
| **Search Strategies and Algorithm Efficiency**         | Informatics; Mathematics                                         | Random guessing, sequential and binary search, sorted data, number of checks, prerequisites, and a visual comparison in the 'Find the Surprise' activity                                      |
| **Possibility, Probability, and Guarantee**            | Mathematics; Informatics; Human Thought / Philosophy             | Distinguish 'it can happen', 'how likely it is', and 'it is guaranteed'; the misconception that two outcomes imply 50/50; how data and assumptions affect chance estimates                    |
| **The History of World-Changing Inventions**           | History; Engineering; Physics; Informatics; Art                  | What problem an invention solved, who worked on it and how, previous approaches, validation, and the changes and consequences it brought                                                      |

**Algorithm Lab — example activity:**

- **'Algorithm Lab'** — generate a virtual forest, pattern, or city from rules and a random seed, comparing instruction size, generation time, and appearance. In 'Find the Surprise,' compare random guessing with binary search using 'higher/lower' hints.

## 2. Software Architecture, Design Patterns, and AI Engineering

Within **Informatics**, we propose developing foundational engineering reasoning **before requiring code**: break a large task into parts, organize object interactions, define rules, verify a system's behavior, and choose an appropriate AI tool.

- **Object thinking:** objects, properties, actions, relationships, responsibility, composition; visual examples of abstraction, encapsulation, inheritance, and polymorphism. Knowing a metaphor is not equivalent to designing a program independently.
- **Principles:** DRY (avoid unnecessary duplication), KISS (avoid needless complexity), YAGNI (do not build unnecessary features), SRP (one coherent responsibility); later, intuitive concepts of interfaces, substitutability, and dependency on contracts. **Do not impose formal SOLID as compulsory material on every Grade 1–3 pupil.**
- **Patterns:** Factory (a 'workshop' creating an appropriate object), Strategy (interchangeable ways of performing a task), Observer (subscribers responding to events); begin with interactive models, introduce the terminology, and optionally code later.
- **Prompt Engineering:** describe the task, inputs, expected output format, examples, and constraints; refine after errors and compare responses against criteria. Avoid sharing personal information and automatically trusting confidently worded text.
- **AI model architectures:** intuitively compare a _dense_ model with a _mixture of experts (MoE)_, where a router activates some computing blocks for tokens (not necessarily distinct 'math experts' and 'history experts'); illustrate **quantization** as lowering numerical representation precision to save memory, potentially at a quality cost.
- **Model selection:** compare accuracy, response latency, price, context size, memory requirements, privacy, and reliability for a task; a larger or more expensive model is not always needed.

| Indicative level | Software design                                                               | Working with AI                                                                         |
| ---------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Grade 1**      | Objects, actions, simple instructions, sequences, DRY, KISS                   | Ask clear questions, compare results with requirements, notice errors                   |
| **Grade 2**      | Responsibilities, composition, encapsulation, and abstraction through models  | Context, format, constraints, iterative prompt refinement, different model capabilities |
| **Grade 3**      | Inheritance and polymorphism through examples, Factory/Strategy/Observer, SRP | Intuitive dense/MoE comparison, quantization, evidence-based model selection            |

**Assessment through actions:** assemble a system from blocks, identify duplication, replace a strategy, predict an event response, improve an unclear prompt, choose a model for defined requirements, and explain the trade-off. Do not insist on verbatim definitions or adult-level syntax. The table is **guidance for a spiral progression, not a compulsory standard for every child**: adjust depth to readiness and interest.

## 3. 'How Did a Game Fit into 96 KB?' — .kkrieger and Procedural Generation

**An Informatics engineering case** linked to Mathematics (rules, functions, randomness), Art (textures and shapes), and the history of technology. Core question: **why might storing instructions for generating an object be better than storing the completed object?**

**Verified history:** in 2004, **.theprodukkt**, connected to the German demoscene group Farbrausch, released **.kkrieger**, an experimental 3D shooter with an executable around **96 KB** (sources also cite **97,280 bytes**). This was **not Far Cry**, nor a 10 KB game. The project competed in the 96 KB game category at Breakpoint 2004.

**How it worked:**

1. Instead of storing many completed textures, models, and audio files, the developers described some content through **rules, parameters, and procedural generation algorithms**.
2. On startup, the program computed and assembled the required resources. Audio used, among other things, a software synthesizer; visuals used texture and geometry generators.
3. Code optimization and executable packing were also used (including **kkrunchy**). The game relied on Windows graphics/audio libraries **Direct3D / DirectSound** and available computer hardware.
4. **Disk file size was not the same as runtime memory use or computational workload.** Startup resource generation required time, RAM, and CPU/GPU work; complex scenes could have substantial hardware demands and limitations. The technique does not automatically make every game better or smaller.

**Why it mattered:** the team demonstrated that a complex 3D scene with textures, audio, and game mechanics can emerge from a **very compact description** when programmers and artists jointly develop generative tools. This was not 'magical compression of any game' but a **different organization of resources and a trade-off among storage, CPU, GPU, memory, and time**. It was a demoscene engineering experiment, not proof that any large modern game can always fit into 96 KB.

**Learning interactions:**

- **'Save the Picture or the Recipe?'** — compare pre-rendered images with a short algorithm for making them. Show storage and computation time using clearly educational example numbers rather than actual .kkrieger measurements.
- **'A Forest from One Seed'** — set a seed, tree count, height, and palette; the program reproduces the same forest for the same parameters and algorithm. Explain deterministic pseudorandomness.
- **'Texture Lab'** — create a rule for repetition and variation instead of drawing every stone manually; change parameters and assess repeatability, visual expression, and complexity.
- **'Find the Trade-off'** — compare three hypothetical storage strategies (ready-made data, compressed data, procedural generation) in file size, preparation time, memory use, and computation; **compression is not generation**.

**Spiral progression:** Grade 1 — 'recipe versus completed picture'; Grade 2 — parameters and repeating patterns; Grade 3 — seeds, procedural world creation, and justified choices between storage and computation. Activities need not require writing code; adapt numbers and detail to learner age.

**Historical and technical references:** [Game Developer / Gamasutra — interview with Fabian Giesen (2005-04-12)](https://www.gamedeveloper.com/design/interview-frugal-fragging-with-i-kkrieger-i-), [ComputerBase — report on a 96 KB shooter (2004-04-17)](https://www.computerbase.de/news/gaming/kompletter-ego-shooter-mit-96-kb.10046/), [MobyGames — .kkrieger: Chapter 1](https://www.mobygames.com/game/31194/kkrieger-chapter-1/). Do not attribute resource generation only to the CPU: graphics libraries and the GPU also mattered.

## 4. Search Algorithms, Possibility, and Probability — 'Find the Surprise'

**An Informatics learning case**, connected to Mathematics (numerical order, comparison, possibility, and probability). Students investigate how information and strategy change the **guaranteed number of checks** and distinguish _'possible'_, _'likely'_, and _'guaranteed'_. This is a proposal for a future interactive lab, not an implemented interface.

**Initial setup:** the first rounds use **100 numbered cells** (1–100), one hidden surprise, and comparable checking rules. The field is a **10 × 10 grid**, numbered **left to right across each row, top to bottom**: 1–10, 11–20, …, 91–100. The first round gives **three tries without hints**; the second provides 'higher/lower/found' hints and up to **seven tries**. The remaining range visibly narrows after each hint. **1,000 cells are a later thought experiment and possible scaling**, not an unannounced replacement of the initial grid.

### Visual Scene Plan: a 10 × 10 Grid with Hiding-Place Covers

1. **Introduce the field.** First show **10 rows of 10 cells**, each clearly numbered **1 to 100**. The camera/composition conveys that the numbers form **one ordered list**, arranged as a grid only for easier viewing. Cell 51 begins the sixth row. 'Half' refers to a **numerical interval**, not necessarily the geometric left or right half of the square.
2. **Cover the hiding places.** An **opaque cover** appears above each cell and descends, visibly closing all 100 positions. The **number must stay visible on top of or next to the cover**; otherwise ordered search with hints is hard to understand. Covers neither reveal their contents nor accidentally hint at the surprise's location.
3. **Invite the learner to play.** After a short animation, show the round's rules and the remaining attempt count. **'Choose a cell — open the cover.'** The first round explicitly identifies itself as a _scripted no-win demonstration_, not a genuinely random draw.
4. **Opening and feedback.** A click raises or moves only the selected cover. Underneath is an **empty cell** or **the surprise**, according to the current round's rules. An opened cell remains visually distinct, and repeated clicks do not consume another attempt. In the 'higher/lower' mode, a separate message specifies direction; impossible numbers become dimmed or their covers move aside **as eliminated candidates, not additional checks**.
5. **Halving within a grid.** After selecting the middle **by number**, not the visually central square, highlight the remaining numerical interval. If 50 was checked and the answer is 'higher', the candidates are **51–100**. Display these as **50 eligible positions**, not necessarily as an exact rectangular half of the field. The next midpoint may be 75 or 76 depending on the rounding convention; use the same convention throughout.
6. **Accessibility and controls.** Every cover needs a name such as 'Cell no. …', a status ('closed/checked/eliminated'), keyboard operation, and screen-reader support. Results and hints must not depend on color alone. The falling animation should be skippable or respect reduced-motion settings. On narrow screens retain logical numerical order and usable targets; do not render 100 microscopic buttons.

**Presentation principle:** opaque covers conceal **the hiding place, not its position identifier**. Halving applies to **the ordered index list**, not geometrically cutting the square field in half.

### Possibility Is Not Probability

- **Possibility** asks 'can this happen under the stated conditions?' **Probability** estimates how frequently or with what chance an event is expected under a model. Knowing only the answers 'yes/no' does not make the odds 50/50.
- **The '50/50' fallacy:** 'I may go outside and encounter a living Tyrannosaurus rex—or not—so the odds are 50/50.' Two logical outcomes are **not necessarily equally likely**. There is no basis for assigning a 50% chance of encountering a living _non-avian_ dinosaur such as T. rex. Modern birds are evolutionarily dinosaurs, so 'living dinosaur' alone is ambiguous.
- **A clear counterexample:** only one of 100 identically covered cells contains a surprise. If its placement is fair and uniform, a single random guess has a **1%** chance, not 50%, despite the two labels 'found/not found'.
- **Uncertainty is not a number:** without evidence or a justified model, 'I do not know the probability' is better than an invented percentage. **Impossible**, **possible but very unlikely**, **equally likely**, and **guaranteed** describe different properties of events.

### Search Strategies and Mathematical Benchmarks

| Strategy                        | Information after a check                           | Maximum checks for 100 cells                                       |
| ------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ |
| **Random choice without hints** | 'Found/not found' for one cell                      | Up to **100**, provided already checked cells are not chosen again |
| **Sequential (linear) search**  | Check cells in order                                | Up to **100**                                                      |
| **Binary search**               | Check the midpoint and receive 'higher/lower/found' | Up to **7** with ordered numbers and correct midpoint selection    |

For `n` potential positions under this model, the maximum number of binary-search checks is `⌈log₂(n + 1)⌉`: **100 cells → at most 7**, not 3. Crucially, **higher/lower search requires ordered data**. Only then may roughly half the candidates be eliminated, as with an alphabetically ordered dictionary.

### Investigation: 'What If There Are Ten Times as Many Cells?'

**Before revealing the answer**, ask learners to predict: 'With **100 cells**, guaranteed binary search needed no more than **7 checks**. If there are **1,000 cells**, does it need ten times as many—70 checks—or only a few extra?' Invite them to choose and justify a hypothesis.

**Interactive reveal:** show 1,000 positions as, for example, **10 pages of 100 cells** with the same numbered 10 × 10 grid per page. Numbering continues from 1 to 1,000; the midpoint is chosen by **index across all pages**, not merely the visible page. After each hint, dim roughly half of the **entire** collection, including whole pages, and show remaining candidates: **1,000 → about 500 → 250 → 125 → 62–63 → 31–32 → 15–16 → 7–8 → 3–4 → 1–2 → 0–1** (exact values depend on whether the midpoint itself was tested and the rounding convention). Not every cell needs to fit on a small screen simultaneously; global order and visible narrowing progress matter.

| Number of positions | Linear search, worst case | Binary search, worst case |
| ------------------: | ------------------------: | ------------------------: |
|                 100 |                       100 |                     **7** |
|                1000 |                      1000 |                    **10** |

**Conclusion:** the collection grows **tenfold**, but the guaranteed upper bound for binary search rises only **from 7 to 10 checks**, or **3 additional** checks. This follows from repeatedly eliminating roughly half the candidates. The general rule depends on dataset size; a tenfold increase does not always add exactly three checks. Later, `2⁷ = 128` and `2¹⁰ = 1024` can make logarithmic growth more intuitive. Learners should **predict first** and then test the result.

**A fair random experiment as a separate benchmark:** if one surprise is placed **in advance**, independently and uniformly among 100 cells, three **distinct** random choices have a **3% probability of success**. This does **not** mean precisely 3% of guesses must succeed in each small sample, and it is **not** the probability of winning in the scripted round described below.

### Interactive Lab: Two Contrasting Rounds

1. **Round 1 — 'No hints: worst case.'** Learners see **100 cells and three attempts** with no directional hints. This is an **explicitly labeled scripted demonstration of guaranteed failure**: the program always shows three misses to illustrate the _worst case_ without additional information. Explain the rule plainly: **'This round demonstrates a case where three checks are not enough. It is not a random draw.'** One model uses an adversary who, after the three choices, puts the surprise in one of the **other 97** cells. Do not claim it was independently and uniformly hidden before the round; do not say 'you had a 3% chance', because **the scripted round has a 0% chance of winning by design**.
2. **Round 2 — 'Higher/Lower.'** Again use **100 ordered numbered cells**, but fix the hidden target **before the first click and never change it**. Every check gives a 'higher/lower/found' hint and highlights the remaining possible interval. Learners choose the next cell themselves, can try the midpoint and compare it with an endpoint guess, and can find the surprise **within 7 checks** if they consistently choose the midpoint of the feasible range.
3. **Debrief.** Compare the scripted failure with the strategy that guarantees success in Round 2. Explicitly note that the rounds **differ in the available information and how the hiding place is chosen**. Ask what Round 1 would look like in a fair random game, show the **3% benchmark for three distinct guesses out of 100**, and distinguish _possible success_, _probability_, and _guarantee_.
4. **Further experiments.** Optionally provide a **clearly labeled fair random mode** with an unchanging preselected hiding place and a chance of success, repeat the experiment to observe frequencies, or compare algorithms on a sorted array, dictionary, or catalog. If implemented, outcomes must remain genuinely randomized without covertly programming wins or losses.

**Essential pedagogical boundary:** guaranteed loss in a **scripted worst-case** is acceptable teaching dramaturgy, but **must not be misrepresented as a fair random experiment**. Doing so would teach incorrect probability and invalidate the comparison. Learners must know the rules before each round and receive an explanation afterward; losing does not count as a learner error.

**Competencies and further depth:** distinguish possibility, probability, and certainty; understand search preconditions; compare random, sequential, and binary searches; interpret worst-case operation counts; **predict how the number of checks changes as the number of elements grows**. A Curriculum may later introduce `O(n)`, `O(log n)`, and investigate scaling with collection size. **The taxonomy does not impose a maximum learning depth.**

## 5. How Generative AI Selects Tokens — Interactive Galton Board

**Subject: Informatics; objective: understand text generation mechanisms, not merely learn prompt writing.** A Galton board (Plinko) illustrates **sampling from a probability distribution** but is a **pedagogical analogy**, not the structure of a language model. A model evaluates possible **next tokens from the current context**, not independent ball drops. The number of candidates follows the **tokenizer vocabulary**; billions of model parameters do not mean billions of possible next tokens.

**Interactive scenario:**

1. **'2 + 2 = ...'** — offer three illustrative continuations ('4', '5', '11') with clearly labeled **invented educational probabilities**, for example 94%, 4%, and 2%. Learners predict a selection. These are **not probabilities measured from a real model**, and mathematical truth is not established by likely text continuations.
2. A ball falls into one outcome. Switch between **'sample from the distribution'** and **'select the most likely'** to show that a model need not sample randomly. Compare observed frequencies across repetitions with the supplied probabilities.
3. Add context such as 'Pretend this is spoken by a toddler' or 'Give a typical wrong answer' and **redraw the distribution**; a baby-like sound or wrong response may receive **illustratively** more probability, but a real chatbot is **not guaranteed** to behave that way. Context does not turn the model into an infant or an unsuccessful student.
4. Include the chosen token in the context, then calculate a **new distribution for the next token**. A token may be a symbol, a fragment, a word, or punctuation: **a token is not the same as a letter, character, or whole word**.
5. Show a visual **context window counter**. Models have different token limits. When input exceeds a limit, a service may **reject, truncate, or summarize** history; do not promise one behavior for every system. Distinguish context capacity from response length limits.
6. Compare a **predictive task** (estimate a category, number, or risk) with a **generative task** (produce a sequence or image). **They are not mutually exclusive:** text generation includes next-token prediction, so 'predictive AI' depends on the context in which the term is used.

**Accessibility:** all probabilities are shown as text, animations can be disabled, and probabilities are **invented teaching values only**. [Reference on tokens and context](https://help.openai.com/en/articles/4936856-understanding-and-counting-tokens).

## 6. Digital Safety and AI — Learning Cases

### AI Sycophancy: 'You Are a Genius!' Is Not Evidence

In a safe fictional exchange, learners compare ungrounded praise with properly checked claims. **Sycophancy** is excessive agreement that can reinforce mistakes. **Do not claim AI always agrees or that a single commercial motive has been established.** A documented example: **OpenAI rolled back an overly sycophantic GPT-4o update in April 2025**. Teach learners to ask for counterarguments, verify independent sources, and not treat compliments as confirmation.

**Real-world case for older learners / guided educational discussion:** according to his accounts and journalistic reports, Canadian **Allan Brooks** became convinced he had made a false mathematical breakthrough during prolonged conversations with a chatbot. He later became **program director of The Human Line Project**; **Etienne Brisson is its founder**. Present this as reported experience and testimony, not a clinical diagnosis or final legal finding. Highlight risks of losing touch with verifiable reality, isolation from close relationships, and excessively long conversations; emphasize support from trusted people and qualified professionals. Do not romanticize psychological crises or reproduce harmful dialogue. [OpenAI on sycophancy](https://openai.com/index/sycophancy-in-gpt-4o/); [The Human Line Project](https://thehumanlineproject.org/); [interview with Brooks and Brisson](https://intoaisafety.transistor.fm/episodes/holding-the-human-line-w-allan-brooks-and-etienne-brisson/transcript).

### Search Engines Can Index Shared Conversations

In **July 2025**, search indexes included **some ChatGPT conversations deliberately shared through public links with search discoverability enabled**; **OpenAI removed that option on July 31**. This does not mean all private chats were exposed. Using **fictional examples**, learners distinguish private conversations, public links, universally accessible documents, and personal/medical/work secrets that should not be disclosed. [Report with clarification and correction](https://techcrunch.com/2025/07/31/your-public-chatgpt-queries-are-getting-indexed-by-google-and-other-search-engines/).

### Why De-identified Data May Still Be Linkable to People

Use **fictional routes** to illustrate how combining time and location with other data can distinguish one person within a large dataset. A study by **Yves-Alexandre de Montjoye and colleagues (2013)** analyzed **1.5 million mobility trajectories** and found that **four space-time points uniquely characterized 95% of trajectories** in that dataset. This is **not equivalent to determining the names, children, or addresses of arbitrary specific individuals**. Do not invent an unsourced story about a 'Norwegian programmer'. Never experiment with real children's data. [Research paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC3607247/).

### Phishing, Lookalike Addresses, and Email Trust

With safe fictional examples, compare a visible button label with the actual domain (`facebook.com.example.org` belongs to **`example.org`**, not `facebook.com`), lookalike characters, email such as `BillGates@gmail.com`, and a fake login form. **Display names and logos do not authenticate the sender.** Link risks include theft of entered passwords, malicious downloads or execution, and exploitation where a technical vulnerability exists. **Do not claim that clicking any link automatically executes malicious code.** Introduce phishing, social engineering, multi-factor authentication, domain checks, and official support channels. Treat **detecting phishing**, **assessing the risk of following a link**, and **verifying the actual domain** as separate skills; detecting lookalike characters belongs to domain verification. For MFA, distinguish understanding independent authentication factors from safely configuring and recovering access.

## 7. Program Logic and the People Who Developed It

**Boolean logic.** Begin by evaluating a single condition; examine AND, inclusive OR, and NOT independently before combining them into expressions with parentheses and defined operator precedence. Grouping can change outcomes, and evaluating a logical expression should not be confused with writing code to implement the check.

**Recursion as computation.** Using simple finite examples, distinguish tracing a recursive call with a base case from independently designing a recursive algorithm in which progressively smaller subproblems terminate. Do not confuse recursion with an endless chain of calls that never reaches a base case.

**Interaction: 'Why Did the Second Condition Never Run?'** Use `if (hasGreen)` followed by `else if (hasGreen && hasRed)` to show that for an object with both flags the second branch is **unreachable**: the first condition shadows it. The fix is to place the **more specific condition earlier** when checks overlap in a chain of alternatives. **Do not universalize this into 'complex conditions always come first'**; two independent `if` statements may both execute.

**Interaction: 'Why Calculate the Same Thing a Thousand Times?'** Compare repeatedly computing a constant expression **inside a loop** with computing it once **before the loop**. Moving it out is safe only when dependencies are unchanged and the move **preserves side effects**. Also illustrate an **infinite loop** with no reachable exit condition.

**History of programming — ideas, technological contributions, and their creators.** The [Skills Taxonomy](./skills/taxonomy.md) identifies reusable conceptual contributions rather than creating a separate competency for each biography. Nevertheless, **named people and teams are mandatory learning content** and must not disappear when Skill headings are revised.

| Conceptual contribution                | Required historical content                                                                                                                               |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Origins of programming                 | **Ada Lovelace**, **Charles Babbage's Analytical Engine**, descriptions of sequences of operations                                                        |
| Early electronic programming           | **Six ENIAC women programmers** and practical program preparation for early electronic computers                                                          |
| Compiler development                   | **Grace Hopper**, higher-level program descriptions, collaborative development of languages and compilers                                                 |
| Software reliability                   | **Margaret Hamilton**, **Apollo** software team, failure handling and requirements for safety-critical systems                                            |
| Eliminating network loops              | **Radia Perlman**, **Spanning Tree Protocol** for local-area network bridges; not IP routing                                                              |
| Computability theory                   | **Alan Turing**, formal computation models and their limits                                                                                               |
| Historical cryptanalysis methods       | **Joan Clarke**, **Alan Turing**, **Gordon Welchman**, **Polish cryptanalysts**, and their contributions to search methods                                |
| Computing and special-purpose machines | Development of programmable computers; **Bombe** as an electromechanical machine for testing possible **Enigma** settings, not a general-purpose computer |

Use historical examples to show the foundational and long-undervalued work of women alongside that of other researchers. Do not replace documented contributions with an unsupported claim that one group invented nearly all technologies. The **Turing Test** and **John Searle's Chinese Room (1980)** belong to discussions of AI, imitation, and understanding, not a group of historical computing machines.

**Historical references:** [Computer History Museum — Women in Computing](https://computerhistory.org/activities-resources/women-in-computing-history/); [National Museum of Computing — Bombe](https://www.tnmoc.org/bombe); [GCHQ — Joan Clarke](https://www.gchq.gov.uk/information/joan-clarke); [Stanford Encyclopedia — Chinese Room](https://plato.stanford.edu/entries/chinese-room/).

**Databases and parallelism — separate technical models.** A library catalog illustrates the distinction between a plain formatted table and a relational database with records, fields, unique keys, and relationships. Several independent computations illustrate sequential execution, concurrent interleaving, and actual simultaneous parallel execution. Separately plan task dependencies without promising automatic speedups.

## 8. Elementary Algorithms — Each with Its Own Learning Model

**Editorial organization:** in the [Skills Taxonomy](./skills/taxonomy.md), the Algorithms domain groups competencies **by purpose**: search, sorting, collection processing, general construction, and analysis. Each named elementary algorithm has **its own Skill** as an independently identifiable competency, such as applying linear search. Prerequisites, efficiency, and comparisons may be additional independent Skills in the same group. No separate `Algorithm` entity is being introduced: the Domain → Group → Skill hierarchy already supports classification and independent assessment. If evidence later shows a need to represent one algorithm as a separate entity linked to multiple Skills, first conduct an architecture review.

| Algorithm                 | Simple explanation / learning model                                   | Important distinction                                               |
| ------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Linear search             | Examine one card at a time until the target appears                   | No sorting required; the target may be absent                       |
| Binary search             | Inspect the midpoint of sorted cards and discard the impossible half  | The same rule does not work on arbitrarily shuffled values          |
| Selection sort            | Select the smallest remaining card and move it into the sorted prefix | Finding a minimum is one step, not the entire sort                  |
| Insertion sort            | Place the next card in the correct position within the sorted prefix  | The sorted portion must be maintained                               |
| Bubble sort               | Compare adjacent cards and swap pairs that are out of order           | One pass does not always sort the entire collection                 |
| Element counting          | Traverse objects, adding one for each match                           | Count is not the same as the sum of values                          |
| Sum accumulation          | Add numbers one at a time to an imaginary box                         | Do not confuse a sum accumulator with an element counter            |
| Maximum finding           | Maintain the largest value seen so far and update as needed           | Sorting the entire set is unnecessary                               |
| Minimum finding           | Maintain the smallest value seen so far and update as needed          | Sorting the entire set is unnecessary                               |
| Binary search tree lookup | Compare a key at each node and choose the left or right subtree       | The search tree ordering rule is required; not every tree qualifies |

**Inclusion criterion:** first check whether the real principle of an algorithm can be explained to Grade 1–3 learners through an honest, understandable model without hiding a decisive prerequisite. If it cannot be explained correctly, **justify** the decision rather than automatically including or excluding it by name. This is a criterion for selecting examples and planning lessons, **not an age ceiling for the entire taxonomy**. One Skill does not require one separate implementation or Lesson.

## 9. Digital Product UX — How People Interact with Devices

**Both textbooks retain UX, with different goals.** Engineering may examine a physical button's form, actuation force, and placement; Informatics examines what happens **inside the digital system** when it is pressed: whether device state is clear, the outcome is communicated, errors can be corrected, and the same action is available through alternative means. A digital device is not only a screen: buttons, keyboards, audio feedback, touch controls, and accessible alternatives all matter.

**Mini-lab: 'Why Doesn't the Button Work?'** Using a safe digital-device model, a learner presses a button without visible feedback, then compares it with a model that displays status. They decide whether the action's purpose is clear, the feature is discoverable, errors are communicated, and the task can be completed without sound or a mouse. Also show a deceptive button concealing the actual consequence: this concerns digital UX integrity.

**Disciplinary boundary:** general design principles, ergonomics, and usability of engineering products stay within Engineering; interaction with digital functions, settings, software states, and interfaces is a distinct Informatics subject area. Learning materials may overlap, while Skills and their identifiers stay local to each textbook. UX must not be reduced to accessibility alone or to safety alone.
