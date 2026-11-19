<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (kk)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

Missing translations: 0

## DOMAINS

### Algoritmder

Groups: 5 · Skills: 23

[index.ts](../../../content/informatics/data/skills/algorithms/index.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (kk):** Mäselelerdı şeşudıñ qaitalanatyn täsılderın qūrudy, qoldanudy jäne salystyrudy üiren.

#### Taldau

Skills: 3

[index.ts](../../../content/informatics/data/skills/algorithms/analysis/index.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (kk):** Algoritmnıñ uaqyt pen jadqa qajettılıgı kırıs derekterıne qarai qalai özgeretının bıl.

##### Syzyqtyq jäne logarifmdık ösudı ajyratu

[distinguishLinearAndLogarithmicGrowth.ts](../../../content/informatics/data/skills/algorithms/analysis/distinguishLinearAndLogarithmicGrowth.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (kk):** Kırıs kölemıne proporsional ösudı qaita-qaita ekıge bölumen bailanysty ösumen salystyr.

##### Algoritmnıñ eñ naşar jağdaiyn bağalau

[estimateAnAlgorithmsWorstCase.ts](../../../content/informatics/data/skills/algorithms/analysis/estimateAnAlgorithmsWorstCase.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (kk):** Eñ naşar jağdaida algoritmge eñ köbı qanşa tekseru qajet bolatynyn bağala.

##### Uaqyt pen jad arasyndağy ymyrany tüsındıru

[explainTimeMemoryTradeOffs.ts](../../../content/informatics/data/skills/algorithms/analysis/explainTimeMemoryTradeOffs.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (kk):** Jyldamyraq algoritmderge nege köbırek uaqytşa jad qajet boluy mümkın ekenın tüsın.

#### Jinaqtardy öñdeu

Skills: 4

[index.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/index.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (kk):** Derekterdı qarap, sanaudy, qosudy jäne eñ ülken ne eñ kışı mändı tabudy üiren.

##### Elementterdı sanaudy qoldanu

[applyElementCounting.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/applyElementCounting.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (kk):** Jinaqtağy berılgen şartqa sai keletın barlyq elementterdı sana.

##### Eñ ülken mändı tabu

[applyMaximumFinding.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/applyMaximumFinding.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (kk):** Jinaqty qarap şyqqanda osy uaqytqa deiıngı eñ ülken mändı baqyla.

##### Eñ kışı mändı tabu

[applyMinimumFinding.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/applyMinimumFinding.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (kk):** Jinaqty qarap şyqqanda osy uaqytqa deiıngı eñ kışı mändı baqyla.

##### Qosyndyny jinaqtau

[applySumAccumulation.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/applySumAccumulation.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (kk):** Jinaq mänderın kezekpen jinaqtalğan qosyndyğa qos.

#### Qūrastyru

Skills: 6

[index.ts](../../../content/informatics/data/skills/algorithms/construction/index.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (kk):** Algoritm äreketterın, şarttaryn jäne toqtau erejelerın belgıleudı üiren.

##### Algoritmderdı talaptarğa sai salystyru

[compareAlgorithmsAgainstRequirements.ts](../../../content/informatics/data/skills/algorithms/construction/compareAlgorithmsAgainstRequirements.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (kk):** Mümkın algoritmderdı olardyñ talaptary men şekteulerı boiynşa salystyr.

##### Tızbektı algoritm qūru

[constructASequentialAlgorithm.ts](../../../content/informatics/data/skills/algorithms/construction/constructASequentialAlgorithm.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (kk):** Dūrys retpen oryndalatyn şekteulı qadamdar tızbegın sipatta.

##### Algoritmnıñ maqsatyn anyqtau

[defineAnAlgorithmsGoal.ts](../../../content/informatics/data/skills/algorithms/construction/defineAnAlgorithmsGoal.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (kk):** Algoritm nege jetuı kerek jäne qandai kırıs qabyldaitynyn körset.

##### Şartty tarmaqtaludy jobalau

[designConditionalBranching.ts](../../../content/informatics/data/skills/algorithms/construction/designConditionalBranching.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (kk):** Algoritmnıñ ärtürlı joldaryn naqty tekserıletın şarttarğa sai josparla.

##### Qaitalaudy jobalau

[designRepetition.ts](../../../content/informatics/data/skills/algorithms/construction/designRepetition.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (kk):** Dūrys jañartular men toqtau şarty bar qaitalanatyn ürdıstı jobala.

##### Rekursivtı algoritmdı ıske asyru

[implementARecursiveAlgorithm.ts](../../../content/informatics/data/skills/algorithms/construction/implementARecursiveAlgorithm.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (kk):** Kışıreietın ışkı esepterı jäne aiaqtaityn bazalyq jağdaiy bar rekursivtı algoritm qūr.

#### Izdeu

Skills: 6

[index.ts](../../../content/informatics/data/skills/algorithms/search/index.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (kk):** Ärtürlı ızdeu ädısterı jinaqtan elementtı qalai tabatynyn bıl.

##### Ekılık ızdeudı qoldanu

[applyBinarySearch.ts](../../../content/informatics/data/skills/algorithms/search/applyBinarySearch.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (kk):** Sūryptalğan derekterden mändı aralyqtyñ jartysyn qaita-qaita alyp tastap tap.

##### Ekılık ızdeu ağaşynan ızdeu

[applyBinaryTreeSearch.ts](../../../content/informatics/data/skills/algorithms/search/applyBinaryTreeSearch.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (kk):** Kılttı tabu üşın ekılık ızdeu ağaşynyñ rettelgen tarmaqtarymen jür.

##### Syzyqtyq ızdeudı qoldanu

[applyLinearSearch.ts](../../../content/informatics/data/skills/algorithms/search/applyLinearSearch.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (kk):** Izdeletın elementtı ärqaisysyn kezekpen tekserıp tap.

##### Izdeu ädısterın tekseru sany boiynşa salystyru

[compareSearchMethodsByCheckCount.ts](../../../content/informatics/data/skills/algorithms/search/compareSearchMethodsByCheckCount.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (kk):** Syzyqtyq jäne ekılık ızdeuge qajet tekseruler sanyn salystyr.

##### Ekılık ızdeudıñ alğyşarttaryn anyqtau

[identifyBinarySearchPrerequisites.ts](../../../content/informatics/data/skills/algorithms/search/identifyBinarySearchPrerequisites.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (kk):** Derekterdıñ ekılık ızdeuge qajet retpen sūryptalğanyn tekser.

##### Izdeu auqymynyñ ösuın boljau

[predictSearchScaling.ts](../../../content/informatics/data/skills/algorithms/search/predictSearchScaling.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (kk):** Derek kölemı ekı eselense de, ekılık ızdeude nege şamamen bır ğana qosymşa tekseru qajet bolatynyn tüsın.

#### Sūryptau

Skills: 4

[index.ts](../../../content/informatics/data/skills/algorithms/sorting/index.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (kk):** Sūryptau ädısterı mänderdı tañdalğan retpen qalai ornalastyratynyn bıl.

##### Köpırşıktı sūryptaudy qoldanu

[applyBubbleSort.ts](../../../content/informatics/data/skills/algorithms/sorting/applyBubbleSort.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (kk):** Qate rettelgen körşı mänderdıñ ornyn auystyryp sūrypta.

##### Kırıstıru arqyly sūryptaudy qoldanu

[applyInsertionSort.ts](../../../content/informatics/data/skills/algorithms/sorting/applyInsertionSort.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (kk):** Är jaña elementtı sūryptalğan bölıkke kırıstırıp rette.

##### Tañdau arqyly sūryptaudy qoldanu

[applySelectionSort.ts](../../../content/informatics/data/skills/algorithms/sorting/applySelectionSort.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (kk):** Qalğandarynyñ eñ kışısın qaita-qaita tañdap sūrypta.

##### Sūryptau ölşemın tüsındıru

[explainASortingCriterion.ts](../../../content/informatics/data/skills/algorithms/sorting/explainASortingCriterion.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (kk):** Jinaqty sūryptauğa qoldanatyn mändı nemese qasiettı tañda.

### Jasandy intellekt

Groups: 7 · Skills: 34

[index.ts](../../../content/informatics/data/skills/artificialIntelligence/index.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (kk):** Jasandy intellekt jüielerınıñ qalai üirenetının, boljaitynyn, mazmūn jasaitynyn jäne keide qatelesetının zertte.

#### Jasandy intellekt negızderı

Skills: 6

[index.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/index.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (kk):** Bağdarlamalanğan erejeler, üiretılgen modelder jäne Jİ tapsyrmalary arasyndağy aiyrmaşylyqtardy zertte.

##### Jİ tapsyrmalaryn jıkteu

[classifyAITasks.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/classifyAITasks.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (kk):** Jİ tapsyrmasy jıkteu, boljau nemese mazmūn jasauğa bağyttalğanyn anyqta.

##### Erejelerdı üiretılgen modelderden ajyratu

[distinguishRulesFromTrainedModels.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/distinguishRulesFromTrainedModels.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (kk):** Aiqyn bağdarlamalanğan şeşım erejelerı men derekter arqyly üiretılgen jüielerdı ajyrat.

##### Generativtı Jİ-dı tüsındıru

[explainGenerativeAI.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/explainGenerativeAI.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (kk):** Generativtı modelder mätın, suret jäne basqa mazmūndy qalai jasaitynyn tüsın.

##### Mysaldar arqyly üirenudı tüsındıru

[explainLearningFromExamples.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/explainLearningFromExamples.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (kk):** Mysaldardyñ modelge jaña kırıs derekterde nätijesın jaqsartuğa qalai kömektesetının tüsındır.

##### Boljamdyq Jİ-dı tüsındıru

[explainPredictiveAI.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/explainPredictiveAI.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (kk):** Boljau jüielerı mänderdı, sanattardy nemese oqiğalardyñ yqtimaldyğyn qalai bağalaitynyn zertte.

##### Jİ-dıñ yqtimal qatesın anyqtau

[identifyAPotentialAIError.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/identifyAPotentialAIError.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (kk):** Jİ jauabyn täuelsız tekseru qajet boluy mümkın ekenın körsetetın belgılerdı baiqa.

#### Elıkteu jäne tüsınu

Skills: 2

[index.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/index.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (kk):** Senımdı elıkteu men şynaiy tüsınudıñ aiyrmasyn zertte.

##### Serldıñ qytai bölmesın tüsındıru

[explainSearlesChineseRoom.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/explainSearlesChineseRoom.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (kk):** Qytai bölmesı oi täjıribesın jäne ol tudyrğan pıkırtalasty zertte.

##### Tiuring testın tüsındıru

[explainTheTuringTest.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/explainTheTuringTest.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (kk):** Tiuring testı nenı bağalaitynyn jäne nenı däleldei almaitynyn tüsın.

#### Tıl modelderınıñ tokenderı jäne konteksı

Skills: 6

[index.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/index.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (kk):** Tıl modelderı mätındı tokenderge qalai bölıp, kontekstı qalai paidalanatynyn bıl.

##### Ülgıleudı eñ yqtimal tokendı tañdaudan ajyratu

[distinguishSamplingFromChoosingTheMostLikelyToken.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/distinguishSamplingFromChoosingTheMostLikelyToken.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (kk):** Eñ yqtimal tokendı tañdaudy basqa yqtimal jalğastyrulardan ırıkteumen salystyr.

##### Token, tañba jäne sözdı ajyratu

[distinguishTokensCharactersAndWords.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/distinguishTokensCharactersAndWords.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (kk):** Tañbalar, sözder jäne tokender nege bırdei emes ekenın anyqta.

##### Tıl modelınıñ kontekst terezesın tüsındıru

[explainALanguageModelsContextWindow.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/explainALanguageModelsContextWindow.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (kk):** Tıl modelı kontekstıñ tek şekteulı kölemın nege qoldana alatynyn tüsındır.

##### Kontekst terezesınıñ tolyp ketuın tüsındıru

[explainContextWindowOverflow.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/explainContextWindowOverflow.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (kk):** Sūrau modeldıñ kontekst şegınen assa, ne boluy mümkın ekenın zertte.

##### Kelesı tokendı tañdaudy tüsındıru

[explainNextTokenSelection.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/explainNextTokenSelection.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (kk):** Tıl modelderı kontekst arqyly yqtimal kelesı tokendı qalai tañdaitynyn tüsındır.

##### Tokenderdı tüsındıru

[explainTokens.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/explainTokens.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (kk):** Tokendı modelge bailanysty mätın körsetu bırlıgı retınde tüsın.

#### Model arhitekturalary jäne resurstar

Skills: 5

[index.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/index.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (kk):** Ärtürlı Jİ model arhitekturalary önımdılıkke jäne resurs qajettılıgıne qalai äser etetının zertte.

##### Tapsyrmağa model tañdau

[chooseAModelForATask.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/chooseAModelForATask.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (kk):** Tapsyrma sapasy, jyldamdyq, bağa, qūpiialyq jäne qoljetımdı jad boiynşa model tañda.

##### Tyğyz jäne sarapşylar qospasy modelderın salystyru

[compareDenseAndMoEModels.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/compareDenseAndMoEModels.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (kk):** Köp parametrdı ıske qosatyn modelderdı tañdalğan sarapşylardy ğana paidalanatyn modeldermen salystyr.

##### Modelderdıñ jad talaptaryn salystyru

[compareModelMemoryRequirements.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/compareModelMemoryRequirements.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (kk):** Model failyn saqtauğa ğana emes, ony ıske qosuğa qajettı jadty bağala.

##### Jauap kıdırısın salystyru

[compareResponseLatency.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/compareResponseLatency.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (kk):** Jİ jauaby bastalğanşa kıdırıstı keiıngı generasia jyldamdyğynan bölek salystyr.

##### Kvanttaudy tüsındıru

[explainQuantization.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/explainQuantization.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (kk):** Sandyq däldıktı azaitu jadty ünemdese de, sapany özgertuı mümkın ekenın tüsın.

#### Prompt qūrastyru

Skills: 7

[index.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/index.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (kk):** Jİ jüielerıne anyğyraq nūsqaular, kontekst jäne şekteuler berudı üiren.

##### Kürdelı promptty ışkı tapsyrmalarğa bölu

[breakAComplexPromptIntoSubtasks.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/breakAComplexPromptIntoSubtasks.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (kk):** Kürdelı sūraudy nätijesı tekserıletın şağyn qadamdarğa böl.

##### Promptqa kontekst qosu

[providePromptContext.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/providePromptContext.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (kk):** Jİ sūrauyñdy tüsınuı üşın tiıstı qosymşa mälımet ber.

##### Nätijege qarai promptty jaqsartu

[refineAPromptBasedOnResults.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/refineAPromptBasedOnResults.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (kk):** Aldyñğy jauapta ne jetıspegenın teksergen soñ Jİ sūrauyn jaqsart.

##### Prompt maqsatyn anyqtau

[specifyAPromptObjective.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/specifyAPromptObjective.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (kk):** Jİ kömekşısı oryndauy tiıs naqty tapsyrmany tūjyrymda.

##### Prompttağy röldı körsetu

[specifyARoleInAPrompt.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/specifyARoleInAPrompt.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (kk):** Paidaly közqaras ne stildı belgıle, bıraq ony naqty sarapşylyq dep qabyldama.

##### Şyğys pışımın körsetu

[specifyAnOutputFormat.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/specifyAnOutputFormat.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (kk):** Keste nemese belgılengen örıster siiaqty naqty jauap qūrylymyn sūra.

##### Prompt şekteulerın anyqtau

[specifyPromptConstraints.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/specifyPromptConstraints.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (kk):** Kölem, derekközder jäne oidan şyğaruğa bolmaityn aqparat siiaqty şekteulerdı körset.

#### Jİ senımdılıgı jäne jauapty paidalanu

Skills: 4

[index.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/index.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (kk):** Jİ nätijelerın tekserudı jäne olardyñ adamdarğa äserın eskerudı üiren.

##### Jİ kömegımen qabyldanğan şeşımder üşın adamnyñ jauapkerşılıgın tüsındıru

[explainHumanResponsibilityForAIAssistedDecisions.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/explainHumanResponsibilityForAIAssistedDecisions.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (kk):** Jİ kömektesken şeşımder üşın de adamdar nege jauapty bolyp qalatynyn tüsındır.

##### Prompttardağy jeke derekterdı qorğau

[protectPersonalDataInPrompts.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/protectPersonalDataInPrompts.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (kk):** Jİ-ge sūrau jıbermes būryn qajetsız jeke aqparatty alyp tasta.

##### Jİ bırjaqtylyğynyñ täuekelderın tanu

[recognizeAIBiasRisks.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/recognizeAIBiasRisks.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (kk):** Jİ jüielerı toptarğa ne adamdarğa ädıletsız qarauy mümkın jağdailardy anyqta.

##### Jİ jauabyndağy faktılerdı tekseru

[verifyFactsInAnAIResponse.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/verifyFactsInAnAIResponse.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (kk):** Jİ-dıñ naqty derekter turaly tūjyrymdaryn senımdı täuelsız derekközdermen tekser.

#### Jİ-men qauıpsız ärekettesu

Skills: 4

[index.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/index.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (kk):** Jİ keñesterın jañylystyratyn ne ziiandy täueldılık tuğyzatyn ärekettesu ülgılerın tany.

##### Jİ-ge şamadan tys täueldılık täuekelın tüsındıru

[explainRisksOfOverrelianceOnAI.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/explainRisksOfOverrelianceOnAI.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (kk):** Jİ derbes oilaudy nemese adamdardyñ qoldauyn nege almastyrmauy kerek ekenın tüsın.

##### Jİ kırısındegı senımsız nūsqaulardy anyqtau

[identifyUntrustedInstructionsInAIInput.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/identifyUntrustedInstructionsInAIInput.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (kk):** Syrtqy materialda jasyrynğan, bıraq kömekşını basqarmauy tiıs nūsqaulardy tany.

##### Jİ paidalanğanda qūpiialardy qorğau

[protectSecretsWhenUsingAI.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/protectSecretsWhenUsingAI.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (kk):** Jİ-men jūmys ıstegende qūpiiasözder, qoljetımdılık kıltterı jäne qūpiia aqparatty qorğa.

##### Jİ-dıñ jalpaqtauyn tanu

[recognizeAISycophancy.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/recognizeAISycophancy.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (kk):** Dälelge negızdelmegen Jİ kelısımı men madaqtauyn baiqa.

### Eseptık oilau

Groups: 2 · Skills: 12

[index.ts](../../../content/informatics/data/skills/computationalThinking/index.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (kk):** Kürdelı mäselelerdı naqty qadamdarğa, zañdylyqtarğa jäne erejelerge böludı üiren.

#### Bölşekteu jäne abstraksialau

Skills: 4

[index.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/index.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (kk):** Mäselenıñ mañyzdy bölıkterı men bailanystaryn anyqtau arqyly ony jeñıldetudı üiren.

##### Jüienıñ abstraktılı modelın qūru

[buildAnAbstractSystemModel.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/buildAnAbstractSystemModel.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (kk):** Kürdelı jağdaidyñ nemese jüienıñ jeñıldetılgen ülgısın jasa.

##### Mäselenı bölıkterge bölu

[decomposeAProblem.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decomposeAProblem.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (kk):** Ülken mäselenı jeke şeşuge bolatyn şağyn tapsyrmalarğa böl.

##### Qaitalanatyn ädıstı jalpylau

[generalizeARepeatedMethod.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/generalizeARepeatedMethod.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (kk):** Bırneşe naqty mäselege ortaq qaita qoldanylatyn ädıstı tap.

##### Nysannyñ mañyzdy qasietterın anyqtau

[identifyEssentialObjectProperties.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/identifyEssentialObjectProperties.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (kk):** Tapsyrmağa qajet mälımetterdı tañda da, qatysy joqtaryn alyp tasta.

#### Logika jäne zañdylyqtar

Skills: 8

[index.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/index.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (kk):** Erejeler, zañdylyqtar men logikalyq şarttar mäselelerdı şeşuge qalai kömektesetının bıl.

##### Logikalyq JÄNE amalyn qoldanu

[applyLogicalAND.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/applyLogicalAND.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (kk):** Ekı şarttyñ da oryndaluyn JÄNE arqyly tekser.

##### Logikalyq EMES amalyn qoldanu

[applyLogicalNOT.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/applyLogicalNOT.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (kk):** Şarttyñ aqiqattyq mänın kerı özgertu üşın EMES amalyn qoldan.

##### Logikalyq NEMESE amalyn qoldanu

[applyLogicalOR.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/applyLogicalOR.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (kk):** Ekı şarttyñ kemınde bıreuı oryndalğanyn NEMESE arqyly tekser.

##### Qaişy erejelerdı anyqtau

[detectContradictoryRules.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/detectContradictoryRules.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (kk):** Ekı talaptyñ bır mezgılde aqiqat bola almaityn jağdaiyn tany.

##### Qarapaiym şartty bağalau

[evaluateASimpleCondition.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/evaluateASimpleCondition.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (kk):** Bır şarttyñ aqiqat, jalğan nemese äzırşe anyqtalmaitynyn şeş.

##### Kürdelı logikalyq örnekterdı bağalau

[evaluateCompoundLogicalExpressions.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/evaluateCompoundLogicalExpressions.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (kk):** Bırneşe operatory bar logikalyq örnekterdı dūrys retpen esepte.

##### Ereje boiynşa nätijenı boljau

[predictAnOutcomeFromARule.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/predictAnOutcomeFromARule.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (kk):** Ereje men bastapqy küi belgılı bolsa, kelesı ne bolatynyn anyqta.

##### Zañdylyqty tanu

[recognizeAPattern.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/recognizeAPattern.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (kk):** Tızbekterdegı zañdylyqtardy tany da, ūsynylğan erejenıñ säikes keletının tekser.

### Derekter qūrylymdary

Groups: 8 · Skills: 34

[index.ts](../../../content/informatics/data/skills/dataStructures/index.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (kk):** Jinaqtar, kıltter, ağaştar men jelıler ärtürlı äreketter üşın derekterdı qalai ūiymdastyratynyn bıl.

#### Sözdıkter

Skills: 3

[index.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/index.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (kk):** Sözdıkter bıregei kıltterdı saqtalğan mändermen qalai bailanystyratynyn bıl.

##### Sözdıktıñ qūrylymyn tüsındıru

[explainDictionaryStructure.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/explainDictionaryStructure.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (kk):** Sözdık aqparatty oryn boiynşa emes, kılt arqyly qalai tabatynyn tüsın.

##### Sözdıktegı mändı kılt arqyly alu

[retrieveADictionaryValueByKey.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/retrieveADictionaryValueByKey.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (kk):** Sözdıktegı mändı kılt arqyly tap jäne kılt joq jağdaidy öñde.

##### Sözdıktegı mändı jañartu

[updateADictionaryValue.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/updateADictionaryValue.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (kk):** Sözdıkte būrynnan bar kıltpen saqtalğan mändı özgert.

#### Graftar

Skills: 6

[index.ts](../../../content/informatics/data/skills/dataStructures/graphs/index.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (kk):** Graftar oryndardy, nysandardy jäne olardyñ bailanystaryn qalai körsetetının bıl.

##### Bağyttalğan jäne bağyttalmağan graftardy ajyratu

[distinguishDirectedAndUndirectedGraphs.ts](../../../content/informatics/data/skills/dataStructures/graphs/distinguishDirectedAndUndirectedGraphs.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (kk):** Bailanystar bır bağytty ma, älde ekı bağytty ma, anyqta.

##### Ağaştardy siklderı bar graftardan ajyratu

[distinguishTreesFromGraphsWithCycles.ts](../../../content/informatics/data/skills/dataStructures/graphs/distinguishTreesFromGraphsWithCycles.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (kk):** Graftarda siklder boluy mümkın, al ağaştarda nege bolmaitynyn tüsın.

##### Salmaqtalğan jäne salmaqtalmağan graftardy ajyratu

[distinguishWeightedAndUnweightedGraphs.ts](../../../content/informatics/data/skills/dataStructures/graphs/distinguishWeightedAndUnweightedGraphs.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (kk):** Graf qyrlarynda qaşyqtyq nemese qūn siiaqty sandar qaşan berıletının tany.

##### Graftyñ qūrylymyn tüsındıru

[explainGraphStructure.ts](../../../content/informatics/data/skills/dataStructures/graphs/explainGraphStructure.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (kk):** Graftyñ töbelerın jäne olardy bailanystyratyn qyrlaryn tany.

##### Graftan jol tabu

[findAPathInAGraph.ts](../../../content/informatics/data/skills/dataStructures/graphs/findAPathInAGraph.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (kk):** Qyrlardyñ bağytyn saqtai otyryp, töbeler arasyndağy jaramdy jolmen jür.

##### Irgeles töbelerdı anyqtau

[identifyAdjacentVertices.ts](../../../content/informatics/data/skills/dataStructures/graphs/identifyAdjacentVertices.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (kk):** Basqa töbemen tıkelei bailanysqan töbelerdı anyqta.

#### Kezek

Skills: 3

[index.ts](../../../content/informatics/data/skills/dataStructures/queue/index.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (kk):** Kezek elementterdı kelgen retımen qalai öñdeitının bıl.

##### Kezekten elementtı şyğaru

[dequeueAnElement.ts](../../../content/informatics/data/skills/dataStructures/queue/dequeueAnElement.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (kk):** Qalğandarynyñ retın özgertpei, kezektıñ basyndağy elementtı şyğar.

##### Kezekke element qosu

[enqueueAnElement.ts](../../../content/informatics/data/skills/dataStructures/queue/enqueueAnElement.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (kk):** Kezektıñ soñyna jaña element qos.

##### FIFO qağidasyn tüsındıru

[explainFIFO.ts](../../../content/informatics/data/skills/dataStructures/queue/explainFIFO.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (kk):** Kezekke bırınşı kırgen element nege bırınşı şyğatynyn tüsındır.

#### Tızbekter

Skills: 7

[index.ts](../../../content/informatics/data/skills/dataStructures/sequences/index.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (kk):** Rettelgen jinaqtardağy elementterge qatynaudy, qosudy jäne joiudy üiren.

##### Tızbek elementıne indeks arqyly qatynau

[accessASequenceElementByIndex.ts](../../../content/informatics/data/skills/dataStructures/sequences/accessASequenceElementByIndex.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (kk):** Elementtı indeksı boiynşa jaramdy oryndar şegınen şyqpai al.

##### Massivter men bailanysqan tızımderdı ajyratu

[distinguishArraysFromLinkedLists.ts](../../../content/informatics/data/skills/dataStructures/sequences/distinguishArraysFromLinkedLists.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (kk):** İndekstelgen massivterdı bailanysqan tüiınder tızbegımen salystyr.

##### Massiv qūrylymyn tüsındıru

[explainArrayStructure.ts](../../../content/informatics/data/skills/dataStructures/sequences/explainArrayStructure.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (kk):** Massivter elementterdı indekstermen belgılengen oryndarda qalai saqtaitynyn tüsın.

##### Tızım qūrylymyn tüsındıru

[explainListStructure.ts](../../../content/informatics/data/skills/dataStructures/sequences/explainListStructure.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (kk):** Tızımder ärtürlı täsılmen körsetıletın rettelgen jinaqtar ekenın tüsın.

##### Tızbekke element kırıstıru

[insertAnElementIntoASequence.ts](../../../content/informatics/data/skills/dataStructures/sequences/insertAnElementIntoASequence.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (kk):** Elementtı rettelgen tızbektegı tiıstı orynğa kırıstır.

##### Tızbekten elementtı joiu

[removeAnElementFromASequence.ts](../../../content/informatics/data/skills/dataStructures/sequences/removeAnElementFromASequence.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (kk):** Qalğan elementterdıñ retın saqtap, bıreuın joi.

##### Tızbektı aralap şyğu

[traverseASequence.ts](../../../content/informatics/data/skills/dataStructures/sequences/traverseASequence.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (kk):** Tızbektegı är elementtı retımen qarap şyq.

#### Jiyndar

Skills: 4

[index.ts](../../../content/informatics/data/skills/dataStructures/sets/index.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (kk):** Bıregei mänder jiyndaryn jäne olarğa tiıstılıktı tekseru amaldaryn üiren.

##### Jiyndardyñ qiylysuyn tabu

[computeSetIntersection.ts](../../../content/informatics/data/skills/dataStructures/sets/computeSetIntersection.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (kk):** Ekı jiynğa da ortaq elementterdı ğana tap.

##### Jiyndardyñ bırıguın tabu

[computeSetUnion.ts](../../../content/informatics/data/skills/dataStructures/sets/computeSetUnion.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (kk):** Ekı jiyndağy barlyq ärtürlı elementterdı qaitalamai bırıktır.

##### Jiyn qūrylymyn tüsındıru

[explainSetStructure.ts](../../../content/informatics/data/skills/dataStructures/sets/explainSetStructure.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (kk):** Jiyn ärtürlı elementterdıñ ärqaisysyn nege bır ret qana saqtaitynyn tüsın.

##### Jiynğa tiıstılıktı tekseru

[testSetMembership.ts](../../../content/informatics/data/skills/dataStructures/sets/testSetMembership.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (kk):** Belgılı bır männıñ jiynğa tiesılı ekenın tekser.

#### Stek

Skills: 3

[index.ts](../../../content/informatics/data/skills/dataStructures/stack/index.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (kk):** Stek soñğy qosylğan elementke aldymen qalai qatynauğa mümkındık beretının bıl.

##### LIFO qağidasyn tüsındıru

[explainLIFO.ts](../../../content/informatics/data/skills/dataStructures/stack/explainLIFO.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (kk):** Stek soñğy qosylğan elementtı nege bırınşı şyğaratynyn tüsın.

##### Stekten elementtı şyğaru

[popAnElementFromAStack.ts](../../../content/informatics/data/skills/dataStructures/stack/popAnElementFromAStack.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (kk):** Stek bos pa ekenın tekserıp, soñğy qosylğan elementtı şyğar.

##### Stekke element qosu

[pushAnElementOntoAStack.ts](../../../content/informatics/data/skills/dataStructures/stack/pushAnElementOntoAStack.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (kk):** Stektıñ üstıne jaña element qoi.

#### Derekter qūrylymyn tañdau

Skills: 4

[index.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/index.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (kk):** Bağdarlamanyñ derekterdı qoldanu täsılıne sai qūrylymdy tañda.

##### Qajettı amaldarğa qūrylym tañdau

[chooseAStructureForRequiredOperations.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/chooseAStructureForRequiredOperations.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (kk):** İndeksteuge, tiıstılıktı tekseruge, kezekke ne qatynastarğa laiyq jinaqty tañda.

##### Jinaqqa kırıstıru şyğyndaryn salystyru

[compareCollectionInsertionCosts.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/compareCollectionInsertionCosts.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (kk):** Kırıstıru kezınde massiv elementterın jyljytu ne sıltemelerdı özgertu nege qajet bolatynyn bıl.

##### Elementke qatynau şyğyndaryn salystyru

[compareElementAccessCosts.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/compareElementAccessCosts.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (kk):** Massiv pen bailanysqan tızımnıñ belgılı elementke qatynau jyldamdyğyn salystyr.

##### Derekter qūrylymdary men algoritmderdı ajyratu

[distinguishDataStructuresFromAlgorithms.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/distinguishDataStructuresFromAlgorithms.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (kk):** Derekterdı qūrylymda ūiymdastyru men algoritm arqyly öñdeudı ajyrat.

#### Ağaştar

Skills: 4

[index.ts](../../../content/informatics/data/skills/dataStructures/trees/index.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (kk):** Ağaştar aqparatty ata-analyq jäne enşıles tüiınderdıñ bailanystary arqyly qalai retteitının bıl.

##### Ağaştyñ japyraq jäne ışkı tüiınderın ajyratu

[distinguishLeafAndInternalTreeNodes.ts](../../../content/informatics/data/skills/dataStructures/trees/distinguishLeafAndInternalTreeNodes.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (kk):** Enşıles tüiınderı bar tüiınderdı enşıles tüiınderı joq japyraqtardan ajyrat.

##### Ekılık ızdeu ağaştaryn tüsındıru

[explainBinarySearchTrees.ts](../../../content/informatics/data/skills/dataStructures/trees/explainBinarySearchTrees.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (kk):** Ekılık ızdeu ağaşynda ızdeuge mümkındık beretın kıltterdı retteu erejesın tüsın.

##### Ağaş qūrylymyn tüsındıru

[explainTreeStructure.ts](../../../content/informatics/data/skills/dataStructures/trees/explainTreeStructure.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (kk):** Ağaştyñ tübırın, tarmaqtaryn, tüiınderı men bailanystaryn tany.

##### Ağaştan jol tabu

[findAPathInATree.ts](../../../content/informatics/data/skills/dataStructures/trees/findAPathInATree.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (kk):** Ağaştağy ekı tüiınnıñ arasyndağy naqty bailanystarmen jür.

### Jobalau ülgılerı

Groups: 3 · Skills: 23

[index.ts](../../../content/informatics/data/skills/designPatterns/index.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (kk):** Bağdarlamalyq obektılerdı jasau, bırıktıru jäne üilestırudıñ qaita qoldanylatyn joldaryn zertte.

#### Mınez-qūlyq ülgılerı

Skills: 11

[index.ts](../../../content/informatics/data/skills/designPatterns/behavioral/index.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (kk):** Obektıler sūraulardy qalai üilestırıp, äreketterın qalai özgertetının bıl.

##### Jauapkerşılık tızbegı

[chainOfResponsibility.ts](../../../content/informatics/data/skills/designPatterns/behavioral/chainOfResponsibility.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (kk):** Sūraudy öñdei alatyn öñdeuşı tabylğanşa kezekpen jıber.

##### Komanda

[command.ts](../../../content/informatics/data/skills/designPatterns/behavioral/command.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (kk):** Operasiany saqtauğa ne josparlauğa bolatyn obekt retınde körset.

##### İnterpretator

[interpreter.ts](../../../content/informatics/data/skills/designPatterns/behavioral/interpreter.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (kk):** Örnekter türınde berılgen erejelermen şağyn tıldı tüsındır.

##### İterator

[iterator.ts](../../../content/informatics/data/skills/designPatterns/behavioral/iterator.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (kk):** Kolleksia saqtau täsılın aşpai, elementterın aralap şyq.

##### Deldal

[mediator.ts](../../../content/informatics/data/skills/designPatterns/behavioral/mediator.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (kk):** Komponentterdıñ özara äreketın ortalyq deldal arqyly üilestır.

##### Memento

[memento.ts](../../../content/informatics/data/skills/designPatterns/behavioral/memento.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (kk):** Obekt küiın keiın qalpyna keltıru üşın saqta.

##### Baqylauşy

[observer.ts](../../../content/informatics/data/skills/designPatterns/behavioral/observer.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (kk):** Baqylanatyn obekt özgergende qyzyğuşylyq tanytqan jazyluşylarğa habarla.

##### Küi

[state.ts](../../../content/informatics/data/skills/designPatterns/behavioral/state.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (kk):** Obektınıñ jauap beruın ağymdağy küiıne qarai özgert.

##### Strategiia

[strategy.ts](../../../content/informatics/data/skills/designPatterns/behavioral/strategy.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (kk):** Bır ortaq interfeistı ūstanatyn algoritmder arasynda auys.

##### Ülgılık ädıs

[templateMethod.ts](../../../content/informatics/data/skills/designPatterns/behavioral/templateMethod.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (kk):** Algoritmnıñ negızgı qadamdaryn tūraqty ūstap, tañdalğan qadamdardy özgertuge mümkındık ber.

##### Keluşı

[visitor.ts](../../../content/informatics/data/skills/designPatterns/behavioral/visitor.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (kk):** Operasialardy olar äreket etetın obekt qūrylymdarynan böl.

#### Tudyruşy ülgıler

Skills: 5

[index.ts](../../../content/informatics/data/skills/designPatterns/creational/index.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (kk):** Klienttı naqty tipterge täueldı etpei obekt jasaudyñ ülgılerın üiren.

##### Abstraktılı fabrika

[abstractFactory.ts](../../../content/informatics/data/skills/designPatterns/creational/abstractFactory.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (kk):** Özara üilesetın bailanysty obektıler otbasyn qūratyn fabrikany qoldan.

##### Qūrastyruşy

[builder.ts](../../../content/informatics/data/skills/designPatterns/creational/builder.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (kk):** Kürdelı obektını qūrastyruşy arqyly qadamdap jasa.

##### Fabrika ädısı

[factoryMethod.ts](../../../content/informatics/data/skills/designPatterns/creational/factoryMethod.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (kk):** Tuyndy klasstar fabrika ädısı qandai naqty obekt jasaitynyn tañdasyn.

##### Prototip

[prototype.ts](../../../content/informatics/data/skills/designPatterns/creational/prototype.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (kk):** Baptalğan ülgını köşırıp, jaña obektıler jasa.

##### Jalğyz dana

[singleton.ts](../../../content/informatics/data/skills/designPatterns/creational/singleton.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (kk):** Jahandyq küi täuekelın eskerıp, bır ortaq danağa qoljetımdılıktı basqar.

#### Qūrylymdyq ülgıler

Skills: 7

[index.ts](../../../content/informatics/data/skills/designPatterns/structural/index.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (kk):** Komponentterdı qosu, orau jäne ortaq paidalanu ülgılerın zertte.

##### Adapter

[adapter.ts](../../../content/informatics/data/skills/designPatterns/structural/adapter.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (kk):** Säikes emes interfeisterdı özara türlendırıp bailanystyr.

##### Köpır

[bridge.ts](../../../content/informatics/data/skills/designPatterns/structural/bridge.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (kk):** Komponent abstraksiasyn ol qoldanatyn ıske asyrudan böl.

##### Kompozit

[composite.ts](../../../content/informatics/data/skills/designPatterns/structural/composite.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (kk):** Jeke obektıler men olardyñ toptaryn ortaq interfeis arqyly basqar.

##### Dekorator

[decorator.ts](../../../content/informatics/data/skills/designPatterns/structural/decorator.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (kk):** Tuyndy klasstardy köbeitpei, obektını orap jaña äreket qos.

##### Fasad

[facade.ts](../../../content/informatics/data/skills/designPatterns/structural/facade.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (kk):** Kürdelı komponentter jinağyna qarapaiym kıru nüktesın ber.

##### Jeñıl salmaq

[flyweight.ts](../../../content/informatics/data/skills/designPatterns/structural/flyweight.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (kk):** Artyq jad şyğynyn azaitu üşın qaita qoldanylatyn obekt derekterın ortaq paidalan.

##### Proksi

[proxy.ts](../../../content/informatics/data/skills/designPatterns/structural/proxy.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (kk):** Bırdei interfeisı bar basqa obekt arqyly negızgı obektıge kırudı basqar.

### Sifrlyq şyğarmaşylyq jäne oiyndar

Groups: 3 · Skills: 10

[index.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/index.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (kk):** Sifrlyq materialdar jasa, oiyn erejelerın qūrastyr jäne proseduralyq generasiany zertte.

#### Sifrlyq materialdar

Skills: 3

[index.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/index.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (kk):** Belgılı bır maqsatqa sai sifrlyq mazmūn jasaudy, öñdeudı jäne qūral tañdaudy üiren.

##### Sifrlyq şyğarmaşylyq qūralyn tañdau

[chooseADigitalCreativeTool.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/chooseADigitalCreativeTool.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (kk):** Jasağyñ keletın nätijege sai şyğarmaşylyq bağdarlamany tañda.

##### Qarapaiym sifrlyq tuyndy jasau

[createASimpleDigitalArtifact.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/createASimpleDigitalArtifact.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (kk):** Belgılı bır auditoriiağa arnalğan mazmūny üilesımdı sifrlyq aşyqhat, suret ne basqa tuyndy jasa.

##### Sifrlyq tuyndyny öñdeu

[editADigitalArtifact.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/editADigitalArtifact.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (kk):** Bar sifrlyq faildy bastapqy mağynasyn saqtai otyryp jaqsart.

#### Oiyn dizainy

Skills: 3

[index.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/index.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (kk):** Erejeler men oiynşylardyñ äreketterı oiyn täjıribesın qalai qalyptastyratynyn zertte.

##### Oiyn mehanikasyn jobalau

[designAGameMechanic.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/designAGameMechanic.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (kk):** Oiynşy äreketın oiyn küiınıñ özgeruımen jäne kerı bailanyspen bailanystyr.

##### Oiyn erejesın tūjyrymdau

[formulateAGameRule.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/formulateAGameRule.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (kk):** Oiynşylar nenıñ rūqsat etılgenın tüsınetındei etıp erejenı anyq jaz.

##### Qarapaiym oiynnyñ teñgerımın tekseru

[testTheBalanceOfASimpleGame.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/testTheBalanceOfASimpleGame.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (kk):** Erejeler oiyndy ädıl, qiyn ärı aiaqtauğa bolatyn etetının tekser.

#### Proseduralyq generasia

Skills: 4

[index.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/index.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (kk):** Algoritmder yqşam erejelerden mazmūnnyñ köptegen nūsqalaryn qalai jasaitynyn bıl.

##### Resurstardy saqtau men generasialaudy salystyru

[compareResourceStorageAndGeneration.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/compareResourceStorageAndGeneration.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (kk):** Proseduralyq generasia ünemdeitın saqtau ornyn oğan qajet esepteulermen salystyr.

##### Generator parametrlerın baptau

[configureGeneratorParameters.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/configureGeneratorParameters.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (kk):** Nätijenıñ körınısın ne sanyn basqaru üşın generator baptaularyn özgert.

##### Resurstardyñ proseduralyq generasiasyn tüsındıru

[explainProceduralResourceGeneration.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/explainProceduralResourceGeneration.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (kk):** Generator ärbır daiyn nūsqany saqtamai resurstardy qalai jasaitynyn tüsındır.

##### Bastapqy män arqyly nätijenı qaitalau

[reproduceResultsUsingAGenerationSeed.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/reproduceResultsUsingAGenerationSeed.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (kk):** Bastapqy män men erejeler özgermegen jağdaida nätijenıñ qalai qaitalanatynyn tüsın.

### Sifrlyq önımnıñ paidalanuşy täjıribesı

Groups: 3 · Skills: 8

[index.ts](../../../content/informatics/data/skills/digitalProductUX/index.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (kk):** Tüsınuge, şarlauğa jäne qoljetımdı paidalanuğa yñğaily sifrlyq täjıribe jasa.

#### Qoljetımdılık

Skills: 2

[index.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/index.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (kk):** Ärtürlı mümkındıkter men engızu ädısterı sifrlyq qoljetımdılıkke qalai äser etetının zertte.

##### Ärtürlı mümkındıkterı bar paidalanuşylardyñ qajettılıkterın anyqtau

[identifyNeedsOfUsersWithDifferentAbilities.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/identifyNeedsOfUsersWithDifferentAbilities.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (kk):** Pernetaqtany, ülkeitılgen mätındı ne kömekşı tehnologiiany qoldanatyn adamdardyñ qajettılıkterın anyqta.

##### Sifrlyq özara ärekettıñ qoljetımdılıgın tekseru

[testDigitalInteractionAccessibility.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/testDigitalInteractionAccessibility.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (kk):** İnterfeistı tıntuırsız ne dybyssyz tekserıp, kedergılerdı jaz.

#### Sifrlyq özara ärekettesu dizainy

Skills: 4

[index.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/index.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (kk):** İnterfeiste tüsınıktı äreketter men paidaly kerı bailanysty josparlaudy üiren.

##### Sifrlyq interfeistıñ kerı bailanysyn jobalau

[designDigitalInterfaceFeedback.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/designDigitalInterfaceFeedback.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (kk):** Tüimeler, jüktelu küilerı men qateler tüsınıktı kerı bailanys bersın.

##### Sifrlyq interfeis navigasiasyn jobalau

[designDigitalInterfaceNavigation.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/designDigitalInterfaceNavigation.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (kk):** Adamdar qajettı äreketterdı tabuy üşın ekrandar men navigasiany rette.

##### Sifrlyq önım paidalanuşysynyñ maqsatyn anyqtau

[identifyADigitalProductUsersGoal.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/identifyADigitalProductUsersGoal.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (kk):** Adamnyñ qoldanbada nemese sifrlyq qūrylğyda ne ıstegısı keletının anyqta.

##### Sifrlyq özara ärekettegı jiı qatelerdıñ aldyn alu

[preventCommonDigitalInteractionErrors.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/preventCommonDigitalInteractionErrors.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (kk):** Boldyrmauğa bolatyn qatelerdıñ aldyn alu üşın belgılerdı, tekserudı jäne rastaudy qoldan.

#### Täjıribenı bağalau jäne etika

Skills: 2

[index.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/index.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (kk):** Paidalanuşy synağy men adal dizain sifrlyq önımderdı qalai jaqsartatynyn zertte.

##### Manipuliasialyq interfeis ülgılerın tanu

[identifyManipulativeInterfacePatterns.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/identifyManipulativeInterfacePatterns.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (kk):** Şyğyndardy jasyratyn, tañdauğa mäjbürleitın ne bas tartuğa kedergı keltıretın interfeis ailalaryn tany.

##### Sifrlyq interfeistıñ paidalanu yñğailylyğyn tekseru

[testDigitalInterfaceUsability.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/testDigitalInterfaceUsability.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (kk):** Adamnyñ naqty tapsyrmany qosymşa işarasyz oryndai alatynyn baqyla.

### Sifrlyq qauıpsızdık jäne jauapkerşılık

Groups: 4 · Skills: 20

[index.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/index.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (kk):** Aqparatty qorğaudy, özgelerdı syilaudy jäne sifrlyq tehnologiia äserın tüsınudı üiren.

#### Akkaunttardy qorğau

Skills: 9

[index.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/index.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (kk):** Akkaunttardy qalai qorğaudy jäne kümändı habarlamalarğa qalai jauap berudı üiren.

##### Elektrondyq hat jıberuşınıñ şynaiylyğyn bağalau

[assessAnEmailSendersAuthenticity.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/assessAnEmailSendersAuthenticity.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (kk):** Jıberuşınıñ kım ekenın tek körsetılgen aty ne suretımen şektemei tekser.

##### Sıltemege ötudıñ täuekelın bağalau

[assessTheRiskOfFollowingALink.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/assessTheRiskOfFollowingALink.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (kk):** Kümändı sıltemenı aşqanda ne boluy mümkın ekenın bağala.

##### Köp faktorly autentifikasiany baptau

[configureMultiFactorAuthentication.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/configureMultiFactorAuthentication.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (kk):** Qosymşa kıru faktoryn qosyp, qoljetımdılıktı qauıpsız qalpyna keltırudı josparla.

##### Küştı parol tırkesın jasau

[createAStrongPassphrase.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/createAStrongPassphrase.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (kk):** Är akkauntqa bölek, ūzyn ärı boljau qiyn parol tırkesterın jasa.

##### Köp faktorly autentifikasiany tüsındıru

[explainMultiFactorAuthentication.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/explainMultiFactorAuthentication.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (kk):** Ekınşı täuelsız rastau faktory akkauntty qalai qorğaitynyn tüsın.

##### Bağdarlama jañartularynyñ mañyzyn tüsındıru

[explainWhySoftwareUpdatesMatter.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/explainWhySoftwareUpdatesMatter.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (kk):** Resmi jañartular qauıpsızdık osaldyqtaryn qalai tüzetetının bıl.

##### Fişing habarlamany tanu

[recognizeAPhishingMessage.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/recognizeAPhishingMessage.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (kk):** Qūpiiasöz ne kod ūrlau üşın özgenıñ atynan jazylğan habarlamalardy anyqta.

##### Kümändı sifrlyq bailanysqa jauap beru

[respondToSuspiciousDigitalContact.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/respondToSuspiciousDigitalContact.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (kk):** Kümändı bailanysta qauıpsız äreket et jäne ötınıştı bölek arnamen tekser.

##### Vebsait domenın tekseru

[verifyAWebsitesDomain.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/verifyAWebsitesDomain.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (kk):** Vebmekenjaidağy şynaiy domendı oqyp, jañylystyratyn ūqsas mekenjailardy tany.

#### Sifrlyq özara ärekettesu etikasy

Skills: 4

[index.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/index.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (kk):** Qūrmetpen söilesudı jäne avtorlardyñ rūqsatyn saqtaudy üiren.

##### Sifrlyq material avtoryn körsetu

[attributeDigitalMaterials.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/attributeDigitalMaterials.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (kk):** Paidalanatyn sifrlyq mazmūnnyñ bastapqy avtoryn körset.

##### Mäselenı qauıpsız habarlau ädısın tañdau

[chooseASafeWayToReportAProblem.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/chooseASafeWayToReportAProblem.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (kk):** İnternettegı mäselenı habarlau üşın senımdı adamdy nemese resmi arnany tañda.

##### Sifrlyq mazmūn lisenzialaryn ajyratu

[distinguishDigitalContentLicenses.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/distinguishDigitalContentLicenses.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (kk):** Avtorlyq qūqyq şekteulerın, aşyq lisenzialardy jäne qoğamdyq igılık materialdaryn ajyrat.

##### İnternettegı dūrys mınez-qūlyqty anyqtau

[identifyAppropriateOnlineBehavior.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/identifyAppropriateOnlineBehavior.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (kk):** Sifrlyq qarym-qatynasta qorqytu, qudalau jäne bullingtı tany.

#### Qūpiialyq

Skills: 5

[index.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/index.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (kk):** İnternette aqparat bölısu qūpiialyqqa qalai äser etuı mümkın ekenın bıl.

##### Derekterdı qauıpsız bölısu ädısın tañdau

[chooseSafeDataSharingMethods.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/chooseSafeDataSharingMethods.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (kk):** Qūpiia aqparatty kımge jäne qalai qauıpsız beruge bolatynyn şeş.

##### Jeke äñgımenı aşyq sıltemeden ajyratu

[distinguishAPrivateChatFromAPublicLink.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/distinguishAPrivateChatFromAPublicLink.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (kk):** Bölısılgen äñgıme men qūjatty kım aşa alatynyn tekser; sılteme mındettı türde jeke emes.

##### Derekter arqyly qaita säikestendırudı tüsındıru

[explainDataReIdentification.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/explainDataReIdentification.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (kk):** Bölek jinalğan mälımetterdı bırıktırıp, adamdy qaita qalai anyqtauğa bolatynyn tüsındır.

##### Jeke derekterdı anyqtau

[identifyPersonalData.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/identifyPersonalData.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (kk):** Basqa mälımettermen bırıktırgende de adamdy anyqtaityn aqparatty tany.

##### Sifrlyq ızdı tanu

[recognizeADigitalFootprint.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/recognizeADigitalFootprint.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (kk):** İnternettegı jazbalar men äreketter ūzaq saqtalatyn ız qaldyruy mümkın ekenın tüsın.

#### Esepteu tehnologiialarynyñ äleumettık jäne ekologiialyq äserı

Skills: 2

[index.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/index.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (kk):** Esepteu tehnologiialarynyñ ädıldıkke, resurstarğa jäne ortağa äserın zertte.

##### Algoritmnıñ paidalanuşylar toptaryna äserın bağalau

[assessAnAlgorithmsImpactOnUserGroups.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/assessAnAlgorithmsImpactOnUserGroups.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (kk):** Algoritm nätijelerı paidalanuşy toptaryna ädıletsız ärtürlı äser ete me, sony bağala.

##### Esepteudıñ ekologiialyq äserın bağalau

[assessComputingsEnvironmentalImpact.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/assessComputingsEnvironmentalImpact.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (kk):** Esepteudıñ energiia, material jäne elektrondyq qaldyqtarğa qatysty äserın salystyr.

### Sifrlyq jüieler men jelıler

Groups: 8 · Skills: 37

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/index.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (kk):** Esepteu qūrylğylary, sifrlyq aqparat jäne jelıler qalai bırge jūmys ısteitının bıl.

#### Sifrlyq qūrylğylardyñ qūramdas bölıkterı

Skills: 3

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/index.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (kk):** Apparattyq bölıkter men bağdarlamalyq qamtylym ärtürlı esepteu jūmystaryn qalai atqaratynyn zertte.

##### Apparattyq jäne bağdarlamalyq qamtylymdy ajyratu

[distinguishHardwareFromSoftware.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/distinguishHardwareFromSoftware.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (kk):** Kompiuterdıñ fizikalyq bölıkterın olardy basqaratyn bağdarlamalyq qamtylymnan ajyrat.

##### Prosesordyñ qyzmetın tüsındıru

[explainAProcessorsFunction.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/explainAProcessorsFunction.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (kk):** Prosesor faildardy tūraqty saqtamai, nūsqaulardy qalai oryndaitynyn tüsındır.

##### Sifrlyq qūrylğylardy tanu

[identifyDigitalDevices.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/identifyDigitalDevices.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (kk):** Bağdarlamalanatyn sifrlyq aqparatty öñdeitın qūrylğylardy tany.

#### Jad jäne derekterdı saqtau

Skills: 4

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/index.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (kk):** Uaqytşa jadtyñ, mikrobağdarlama jadynyñ jäne faildar qoimasynyñ ärtürlı qyzmetın bıl.

##### RAM, ROM jäne saqtau qūrylğylaryn ajyratu

[distinguishRAMROMAndStorage.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/distinguishRAMROMAndStorage.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (kk):** RAM, ROM jäne tūraqty saqtau qūrylğylary qandai aqparatty saqtauğa arnalğanyn salystyr.

##### Tūraqty saqtaudy tüsındıru

[explainPersistentStorage.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/explainPersistentStorage.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (kk):** Quat öşırılgennen keiın de saqtau qūrylğylary faildardy nege saqtaitynyn tüsın.

##### RAM jedel jadyn tüsındıru

[explainRAM.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/explainRAM.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (kk):** Kompiuter jūmys ıstegende jedel jadtyñ qajettı aqparatty qalai ūstaitynyn zertte.

##### ROM maqsatyn tüsındıru

[explainThePurposeOfROM.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/explainThePurposeOfROM.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (kk):** Quatsyz da saqtalatyn mikrobağdarlama jady qūrylğylardyñ ıske qosyluyna qalai kömektesetının tany.

#### Jelılık modelder men hattamalar

Skills: 11

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/index.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (kk):** Jelılık hattamalar aqparat jıberu erejelerın qalai anyqtaitynyn bıl.

##### Jelıge qol jetkızu ädısterın salystyru

[compareNetworkAccessMethods.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/compareNetworkAccessMethods.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (kk):** Soqtyğysudy anyqtau, ony boldyrmau jäne markerdı berudı tiıstı jağdailarda salystyr.

##### HTTP pen HTTPS-tı ajyratu

[distinguishHTTPFromHTTPS.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/distinguishHTTPFromHTTPS.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (kk):** HTTPS nenı qorğaitynyn jäne nelıkten ol saittyñ senımdılıgıne kepıl bolmaitynyn tüsın.

##### OSI men TCP/IP-dı ajyratu

[distinguishOSIFromTCPIP.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/distinguishOSIFromTCPIP.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (kk):** OSI-dıñ tūjyrymdamalyq qabattaryn İnternettıñ TCP/IP protokoldar stegımen salystyr.

##### TCP men UDP-dı ajyratu

[distinguishTCPFromUDP.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/distinguishTCPFromUDP.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (kk):** Senımdı TCP derekter ağyndaryn däl sondai kepıldıkterı joq UDP habarlarymen salystyr.

##### Jelılık protokoldy tüsındıru

[explainANetworkProtocol.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/explainANetworkProtocol.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (kk):** Qūrylğylarğa habar almasu üşın nege kelısılgen erejeler qajet ekenın tüsındır.

##### CSMA/CA täsılın tüsındıru

[explainCSMACA.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/explainCSMACA.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (kk):** Symsyz qūrylğylardyñ bos emes arna arqyly jıberuden qalai aulaq boluğa tyrysatynyn tüsındır.

##### CSMA/CD täsılın tüsındıru

[explainCSMACD.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/explainCSMACD.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (kk):** Būrynğy ortaq Ethernet jelılerınde soqtyğysulardy anyqtau nege qajet bolğanyn bıl.

##### DNS-tı tüsındıru

[explainDNS.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/explainDNS.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (kk):** DNS domen ataulary arqyly jelılık mekenjailardy tabuğa qalai kömektesetının tüsındır.

##### OSI qabattaryn tüsındıru

[explainTheOSILayers.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/explainTheOSILayers.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (kk):** Jelılık qyzmetterdı jüieleu üşın OSI-dıñ jetı qabatty ülgısın qoldan.

##### IP maqsatyn tüsındıru

[explainThePurposeOfIP.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/explainThePurposeOfIP.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (kk):** IP jelıler arasynda paketterge mekenjai berıp, olardy qalai jıberetının tüsın.

##### Token Ring täsılın tüsındıru

[explainTokenRing.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/explainTokenRing.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (kk):** Markerdı beru arqyly qai qūrylğynyñ derekter jıbere alatyny qalai retteletının zertte.

#### Jelıler

Skills: 4

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/index.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (kk):** Qosylğan qūrylğylar habarlamalardy qalai jıberıp, resurstardy qalai bölısetının zertte.

##### İnternet pen vebtı ajyratu

[distinguishTheInternetFromTheWeb.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/distinguishTheInternetFromTheWeb.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (kk):** İnternettıñ jelılık infraqūrylymyn vebtegı saittardan ajyrat.

##### Jelıdegı habarlamanyñ jetkızıluın tüsındıru

[explainNetworkMessageDelivery.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/explainNetworkMessageDelivery.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (kk):** Habarlamalar jelılık qūrylğylar arqyly mekenjaiyna qalai jetetının qadağala.

##### Kompiuterlık jelınıñ maqsatyn tüsındıru

[explainThePurposeOfAComputerNetwork.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/explainThePurposeOfAComputerNetwork.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (kk):** Jelıler aqparat almasu üşın bölek qūrylğylardy nege bırıktıretının tüsındır.

##### Symsyz bailanysty tüsındıru

[explainWirelessCommunication.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/explainWirelessCommunication.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (kk):** Symsyz qūrylğylar tıkelei kabelsız signaldar arqyly qalai bailanysatynyn zertte.

#### Sanau jüielerı

Skills: 4

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/index.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (kk):** Negızderı ärtürlı jüielerde sifrlar sandardy qalai körsetetının üiren.

##### Ekılık pen ondyq jüieler arasynda türlendıru

[convertBetweenBinaryAndDecimal.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/convertBetweenBinaryAndDecimal.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (kk):** Şağyn sandardy ekılık jäne ondyq jazylymdar arasynda türlendır.

##### Ekılık jäne on altylyq jüielerdı ajyratu

[distinguishBinaryAndHexadecimal.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/distinguishBinaryAndHexadecimal.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (kk):** Bit toptaryn on altylyq jüiede nege qysqaraq jazuğa bolatynyn tüsın.

##### Kompiuterdıñ ekılık logikasyn tüsındıru

[explainComputerBinaryLogic.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/explainComputerBinaryLogic.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (kk):** Ekılık nölder men bırlerdı ajyratylatyn elektrondyq signal küilerımen bailanystyr.

##### Pozisialyq sanau jüielerın tüsındıru

[explainPositionalNumeralSystems.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/explainPositionalNumeralSystems.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (kk):** Sandağy sifrdyñ orny onyñ mänın nege özgertetının tüsın.

#### Operasialyq jüieler

Skills: 4

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/index.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (kk):** Operasialyq jüieler bağdarlamalardy, faildardy jäne qūrylğylardy qalai basqaratynyn zertte.

##### Operasialyq jüieler otbasylaryn ajyratu

[distinguishOperatingSystemFamilies.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/distinguishOperatingSystemFamilies.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (kk):** Keñ taralğan operasialyq jüie otbasylary men olardyñ aiyrmaşylyqtaryn tany.

##### Operasialyq jüie prosesın tüsındıru

[explainAnOSProcess.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/explainAnOSProcess.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (kk):** Oryndalyp jatqan prosestı diskıde saqtalğan bağdarlama failynan ajyrat.

##### Operasialyq jüienıñ maqsatyn tüsındıru

[explainAnOperatingSystemsPurpose.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/explainAnOperatingSystemsPurpose.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (kk):** Operasialyq jüienıñ bağdarlamalyq jäne apparattyq qamtylymdy qalai üilestıretının tüsın.

##### Linus Torvaldstyñ Linux jüiesındegı rölın tüsındıru

[explainLinusTorvaldsRoleInLinux.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/explainLinusTorvaldsRoleInLinux.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (kk):** Linux iadrosy qalai bastalğanyn jäne köptegen üles qosuşylar operasialyq jüielerdı nege bırge damytatynyn bıl.

#### Beineleu jäne saqtau

Skills: 4

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/index.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (kk):** Qūrylğylar aqparatty qalai körsetetının jäne saqtalğan faildardy qalai retteitının üiren.

##### Sifrlyq fail ölşemderın salystyru

[compareDigitalFileSizes.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/compareDigitalFileSizes.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (kk):** Fail ölşemderın salystyryp, pışım men syğudyñ äserın tüsındır.

##### Sifrlyq pışımderdı ajyratu

[distinguishDigitalFormats.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/distinguishDigitalFormats.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (kk):** Fail pışımı saqtalğan bitterdıñ qalai tüsındırıletının anyqtaitynyn tany.

##### Ekılık körsetılımdı tüsındıru

[explainBinaryRepresentation.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/explainBinaryRepresentation.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (kk):** Nölder men bırler tızbekterı derekterdıñ ärtürlı türlerın qalai kodtaitynyn tüsın.

##### Faildardy katalogtarğa ornalastyru

[organizeFilesInDirectories.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/organizeFilesInDirectories.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (kk):** Faildardy joldary arqyly tabu üşın yñğaily qaltalarğa rette.

#### Tapsyrmalardy oryndau

Skills: 3

[index.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/index.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (kk):** Kezektesıp oryndalatyn tapsyrmalar men şynymen bır mezgılde atqarylatyn jūmystyñ aiyrmasyn tüsın.

##### Täuelsız tapsyrmalardy oryndauşylar arasynda bölu

[distributeIndependentTasksAcrossExecutors.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/distributeIndependentTasksAcrossExecutors.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (kk):** Qai tapsyrmalar qatar oryndala alatynyn, al qaisysy basqa nätijelerdı kütuı kerektıgın josparla.

##### Bäsekeles oryndaludy tüsındıru

[explainConcurrentExecution.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/explainConcurrentExecution.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (kk):** Bırneşe tapsyrma däl bır mezgılde oryndalmasa da qalai alğa jylji alatynyn tüsın.

##### Parallel oryndaludy tüsındıru

[explainParallelExecution.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/explainParallelExecution.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (kk):** Bırneşe prosesordyñ şynymen bır uaqytta jūmys ısteitın jağdailaryn tany.

### Git jäne aşyq bastapqy kod

Groups: 3 · Skills: 11

[index.ts](../../../content/informatics/data/skills/gitAndOpenSource/index.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (kk):** Äzırleuşıler özgerısterdı qalai qadağalaitynyn, bırlesıp jūmys ısteitının jäne bağdarlamany naqty rūqsattarmen bölısetının bıl.

#### Sifrlyq önımderdı bırlesıp äzırleu

Skills: 3

[index.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/index.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (kk):** Komandalar ülesterdı, şolulardy jäne joba nūsqalaryn qalai ūiymdastyratynyn bıl.

##### Ortaq sifrlyq jobadağy özgerısterdı üilestıru

[coordinateChangesInASharedDigitalProject.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/coordinateChangesInASharedDigitalProject.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (kk):** Kım nenı özgertetının jäne ortaq tüzetuler qalai bırıktırıletının josparla.

##### Üles qosu nūsqaularyn tüsındıru

[explainContributionGuidelines.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/explainContributionGuidelines.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (kk):** Üles qosu erejelerı ortaq kod bazasynda jūmys ısteuge nege kömektesetının tüsın.

##### Sifrlyq önım nūsqalaryn qadağalau

[trackDigitalProductVersions.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/trackDigitalProductVersions.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (kk):** Özgerısterdıñ qaşan jasalğanyn tabu ne būrynğy jūmysty qalpyna keltıru üşın nūsqalar tarihyn qoldan.

#### Git nūsqalardy basqaru

Skills: 6

[index.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/index.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (kk):** Git nūsqalardy qalai jazatynyn jäne komandalarğa özgerısterdı bırıktıruge kömektesetının bıl.

##### Jergılıktı jäne qaşyqtağy repozitoriilerdı ajyratu

[distinguishLocalAndRemoteRepositories.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/distinguishLocalAndRemoteRepositories.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (kk):** Öz kompiuterıñdegı jūmysty qaşyqtağy repozitorii arqyly bölısılgen köşırmelerden ajyrat.

##### Tarmaqty tüsındıru

[explainABranch.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/explainABranch.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (kk):** Tarmaqtar äzırleuşılerge özgerısterdıñ jeke bağyttarymen jūmys ısteuge qalai mümkındık beretının tüsın.

##### Kommittı tüsındıru

[explainACommit.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/explainACommit.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (kk):** Kommit — būrynğy tarihpen bailanysqan identifikatory bar küi körınısı ekenın tüsın.

##### Pul-rekvesttı tüsındıru

[explainAPullRequest.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/explainAPullRequest.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (kk):** Pul-rekvestter ūsynylğan özgerısterdı şoluğa qalai ūiymdastyratynyn bıl.

##### Repozitoriidı tüsındıru

[explainARepository.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/explainARepository.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (kk):** Repozitoriide joba men onyñ özgerıster tarihy saqtalatynyn tüsın.

##### Tarmaqtardy bırıktırudı tüsındıru

[explainBranchMerging.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/explainBranchMerging.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (kk):** Tarmaqtar qalai bırıktırıletının jäne keide qaişylyqtardy nege şeşu keregın bıl.

#### Aşyq bastapqy kod

Skills: 2

[index.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/index.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (kk):** Bağdarlamany şynymen aşyq bastapqy kodty etetın qandai rūqsattar baryn bıl.

##### Aşyq bastapqy kod pen tek jariia körınetın kodty ajyratu

[distinguishOpenSourceFromPubliclyVisibleCode.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/distinguishOpenSourceFromPubliclyVisibleCode.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (kk):** Bastapqy kodtyñ körınuı ony özdıgınen aşyq kodty etpeitının tüsın.

##### Aşyq bastapqy kodty tüsındıru

[explainOpenSource.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/explainOpenSource.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (kk):** Aşyq kod lisenzialary bağdarlamany qoldanuğa, özgertuge jäne qaita taratuğa qalai rūqsat beretının tüsın.

### Bağdarlamalau tarihy

Groups: 2 · Skills: 9

[index.ts](../../../content/informatics/data/skills/historyOfProgramming/index.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (kk):** Bağdarlamalau ideialary men esepteu maşinalary tarih boiy qalai damyğanyn bıl.

#### Negızgı ülester

Skills: 6

[index.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/index.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (kk):** Bağdarlamalauğa, bağdarlamalyq senımdılıkke jäne kompiuterlık jelılerge mañyzdy ülesterdı zertte.

##### Eseptelımdılık teoriiasyn tüsındıru

[explainComputabilityTheory.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/explainComputabilityTheory.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (kk):** Formaldy modelder kompiuterler nenı eseptei alatynyn, nenı eseptei almaitynyn qalai körsetetının bıl.

##### Erte elektrondyq bağdarlamalaudy tüsındıru

[explainEarlyElectronicProgramming.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/explainEarlyElectronicProgramming.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (kk):** Alğaşqy elektrondyq kompiuter komandalary bağdarlamalardy qalai qūryp, teksergenın bıl.

##### Kompiliatorlardyñ damuyn tüsındıru

[explainTheDevelopmentOfCompilers.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/explainTheDevelopmentOfCompilers.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (kk):** Kompiliatorlar oqylatyn tılderde bağdarlama jazudy qalai jeñıldetkenın bıl.

##### Bağdarlamalyq senımdılıktıñ damuyn tüsındıru

[explainTheDevelopmentOfSoftwareReliability.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/explainTheDevelopmentOfSoftwareReliability.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (kk):** Apollon missiialarynda qatelerdı öñdeu men senımdı bağdarlama nege mañyzdy bolğanyn tüsın.

##### Jelılık ılmekterdı joiudy tüsındıru

[explainTheEliminationOfNetworkLoops.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/explainTheEliminationOfNetworkLoops.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (kk):** Spanning Tree protokoly jergılıktı jelılerdegı ılmekterdıñ aldyn qalai alatynyn bıl.

##### Bağdarlamalaudyñ bastauyn tüsındıru

[explainTheOriginsOfProgramming.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/explainTheOriginsOfProgramming.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (kk):** Alğaşqy maşina jobalary men Ada Lavleis eñbegı bağdarlamalaudy qalai boljağanyn bıl.

#### Maşinalar jäne kriptotaldau

Skills: 3

[index.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/index.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (kk):** Maşinalar men matematikalyq ädıster tarihi kriptotaldauğa qalai kömekteskenın bıl.

##### Tarihi kriptotaldau ädısterın tüsındıru

[explainHistoricalCryptanalysisMethods.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/explainHistoricalCryptanalysisMethods.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (kk):** Kriptotaldauşylar şifrlardy būzu üşın zañdylyqtar men jüielı tekserudı qalai qoldanğanyn bıl.

##### Bağdarlamalanatyn kompiuterlerdıñ damuyn tüsındıru

[explainTheDevelopmentOfProgrammableComputers.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/explainTheDevelopmentOfProgrammableComputers.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (kk):** Mehanikalyq esepteu ideialarynan bağdarlamalanatyn elektrondyq maşinalarğa deiıngı damudy qadağala.

##### Bombe maşinasynyñ maqsatyn tüsındıru

[explainThePurposeOfTheBombe.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/explainThePurposeOfTheBombe.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (kk):** Bombe maşinasy Enigma yqtimal baptaularyn tekseruge qalai kömekteskenın tüsın.

### Aqparat jäne derekter

Groups: 5 · Skills: 24

[index.ts](../../../content/informatics/data/skills/informationAndData/index.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (kk):** Senımdı aqparatty tabudy, derekterdı retteudı jäne belgısızdık jaily oilaudy zertte.

#### Derekterdı jinau jäne ūiymdastyru

Skills: 4

[index.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/index.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (kk):** Qajettı aqparatty jinap, salystyruğa bolatyn jazbalardy retteudı üiren.

##### Derekterdı bırızdı jinau

[collectDataConsistently.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/collectDataConsistently.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (kk):** Ölşemderdı bırdei erejeler men bırlıkter arqyly jina.

##### Derekterdı belgısı boiynşa toptau

[groupDataByAttribute.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/groupDataByAttribute.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (kk):** Jazbalardy bır naqty belgı boiynşa topta.

##### Tapsyrmağa qajettı derekterdı anyqtau

[identifyDataNeededForATask.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/identifyDataNeededForATask.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (kk):** Sūraqqa şynymen qandai örıster men baqylaular keregın şeş.

##### Derekterdı kestede körsetu

[presentDataInATable.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/presentDataInATable.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (kk):** Qatarlary men bağandary atalğan, mänderı bırızdı keste qūr.

#### Derekter bazalary

Skills: 5

[index.ts](../../../content/informatics/data/skills/informationAndData/databases/index.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (kk):** Derekter bazalary jazbalardy qalai rettep, özara bailanysty aqparatty qalai bırıktıretının bıl.

##### Qarapaiym derekter bazasy shemasyn jobalau

[designASimpleDatabaseSchema.ts](../../../content/informatics/data/skills/informationAndData/databases/designASimpleDatabaseSchema.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (kk):** Tiıstı nysandar, örıster men bailanystardan qarapaiym baza josparyn qūr.

##### Jazbalar men örısterdı ajyratu

[distinguishRecordsAndFields.ts](../../../content/informatics/data/skills/informationAndData/databases/distinguishRecordsAndFields.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (kk):** Jazbany sipattaityn örısterden ajyrat.

##### Derekter bazasy kestesın tüsındıru

[explainADatabaseTable.ts](../../../content/informatics/data/skills/informationAndData/databases/explainADatabaseTable.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (kk):** Keste bır türdegı jazbalardy qalai saqtaitynyn tüsın.

##### Bastapqy kıltterdı tüsındıru

[explainPrimaryKeys.ts](../../../content/informatics/data/skills/informationAndData/databases/explainPrimaryKeys.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (kk):** Är jazbağa tūraqty bıregei kılt nege keregın tüsındır.

##### Kesteler arasyndağy bailanystardy modeldeu

[modelRelationshipsBetweenTables.ts](../../../content/informatics/data/skills/informationAndData/databases/modelRelationshipsBetweenTables.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (kk):** İdentifikatorlar arqyly ärtürlı kestelerdegı aqparatty bailanystyr.

#### Aqparat ızdeu jäne tekseru

Skills: 4

[index.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/index.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (kk):** Dälel ızdeudı jäne pıkırdıñ rastalğanyn tekserudı üiren.

##### Aqparat közderın salystyru

[compareInformationSources.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/compareInformationSources.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (kk):** Bırneşe derekközdı salystyryp, olardyñ baiandauyndağy aiyrmany tap.

##### Habarlamalar men derekterdı ajyratu

[distinguishMessagesFromData.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/distinguishMessagesFromData.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (kk):** Tırkelgen mändı habarlama beretın mağynadan ajyrat.

##### Aqparattyq ızdeu sūrauyn qūru

[formulateAnInformationQuery.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/formulateAnInformationQuery.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (kk):** Ne tabu keregıne säikes naqty ızdeu sözderın tañda.

##### Tūjyrymdy derekközben tekseru

[verifyAClaimAgainstASource.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/verifyAClaimAgainstASource.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (kk):** Qaitalanğan sözge emes, tiıstı dälelge süienıp tūjyrymdy tekser.

#### Yqtimaldyq jäne belgısızdık

Skills: 7

[index.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/index.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (kk):** Mümkın oqiğalardy, olardyñ yqtimaldyğyn jäne boljau şegın zertte.

##### Qarapaiym oqiğalardyñ yqtimaldyğyn salystyru

[compareProbabilitiesOfSimpleEvents.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/compareProbabilitiesOfSimpleEvents.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (kk):** Bırdei boljammen ekı nätijenıñ yqtimaldyğyn salystyr.

##### Mümkındık pen yqtimaldyqty ajyratu

[distinguishPossibilityFromProbability.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/distinguishPossibilityFromProbability.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (kk):** Oqiğa mümkın bolğanymen, onyñ yqtimaldyğy joğary bolmauy mümkın ekenın tüsın.

##### Kezdeisoq jäne anyqtalğan oqiğalardy ajyratu

[distinguishRandomAndDeterministicEvents.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/distinguishRandomAndDeterministicEvents.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (kk):** Erejemen anyqtalğan nätijelerdı kezdeisoq tañdalğan nätijelerden ajyrat.

##### Oqiğanyñ mümkındıgın tüsındıru

[explainEventPossibility.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/explainEventPossibility.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (kk):** Berılgen jağdaida nätijenıñ boluy mümkın be, anyqta.

##### Oqiğanyñ yqtimaldyğyn tüsındıru

[explainEventProbability.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/explainEventProbability.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (kk):** Körsetılgen yqtimaldyq modelımen oqiğa mümkındıgın bağala.

##### Boljaudyñ şekterın tüsındıru

[explainLimitsOfPrediction.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/explainLimitsOfPrediction.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (kk):** Yqtimaldyqty bılu bır synaq nätijesın nege aldyn ala aitpaitynyn tüsındır.

##### Modelde kezdeisoqtyqty qoldanu

[useRandomnessInAModel.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/useRandomnessInAModel.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (kk):** Mümkın nätijelerdı anyqtap, modelge kezdeisoq tañdaular qos.

#### Statistikalyq zertteu

Skills: 4

[index.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/index.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (kk):** Derekterdı diagramma, jiılık jäne salystyru arqyly zertteudı üiren.

##### Baqylaular jiyndaryn salystyru

[compareSetsOfObservations.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/compareSetsOfObservations.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (kk):** Ekı derek jiynyn bırdei ölşemder ne sanattar boiynşa salystyr.

##### Qarapaiym diagramma qūru

[constructASimpleChart.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/constructASimpleChart.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (kk):** Derekter ülesın dūrys körsetetın anyq diagramma jasa.

##### Eñ jiı kezdesetın mändı tabu

[findTheMostFrequentValue.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/findTheMostFrequentValue.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (kk):** Jiyn ışınde eñ köp kezdesetın mändı anyqta.

##### Diagrammany oqu

[readAChart.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/readAChart.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (kk):** Diagrammadağy şkala, atau jäne mänderdı körınıske aldanbai dūrys oqy.

### Bağdarlamalau

Groups: 8 · Skills: 37

[index.ts](../../../content/informatics/data/skills/programming/index.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (kk):** Kompiuter oryndaityn nūsqaulardy tüsınudı, jazudy jäne tekserudı üiren.

#### Derekter türlerı men sıltemeler

Skills: 6

[index.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/index.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (kk):** Tipter men sıltemeler bağdarlamalar qoldana alatyn mänderge qalai äser etetının zertte.

##### Män köşırmesın ortaq sıltemeden ajyratu

[distinguishValueCopyingFromSharedReferences.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/distinguishValueCopyingFromSharedReferences.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (kk):** Ekı ainymaly bır nysandy qaşan bölısetının jäne mänder qaşan täuelsız bolatynyn tüsındır.

##### Mänderdıñ türlerın ajyratu

[distinguishValueTypes.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/distinguishValueTypes.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (kk):** Män sandyq, mätındık ne logikalyq ekenın jäne onymen ne ısteuge bolatynyn anyqta.

##### Derekter türı kelısımın tüsındıru

[explainADataTypeContract.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/explainADataTypeContract.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (kk):** Bağdarlama funksiasy qandai män türın kütetının tüsın.

##### Qūrama derekter qūrylymdaryn tüsındıru

[explainCompositeDataStructures.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/explainCompositeDataStructures.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (kk):** Bırneşe mändı ūiymdastyratyn tızımderdı, massivterdı jäne jazbalardy tany.

##### Tıldegı qarapaiym mänderdı tüsındıru

[explainPrimitiveValuesInALanguage.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/explainPrimitiveValuesInALanguage.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (kk):** Tañdalğan bağdarlamalau tılınde anyqtalğan qarapaiym män türlerın tany.

##### Derekterdı kelısımge sai tekseru

[validateDataAgainstAContract.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/validateDataAgainstAContract.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (kk):** Kırıs derekterdı qoldanar aldynda olardyñ talap etıletın türge ne qūrylymğa säikes keletının tekser.

#### Funksialar jäne qaita paidalanu

Skills: 5

[index.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/index.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (kk):** Qaita qoldanylatyn äreketterdı funksialar türınde ūiymdastyrudy üiren.

##### Funksiany argumenttermen şaqyru

[callAFunctionWithArguments.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/callAFunctionWithArguments.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (kk):** Funksiany argumenttermen şaqyryp, olardyñ qalai qoldanylatynyn baqyla.

##### Parametrlerı bar funksiany anyqtau

[defineAFunctionWithParameters.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/defineAFunctionWithParameters.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (kk):** Tūraqty mysal mänderınıñ ornyna parametr qabyldaityn funksia jaz.

##### Rekursiiany tüsındıru

[explainRecursion.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/explainRecursion.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (kk):** Rekursivtı funksia kışırek jağdailardy şeşıp, soñynda qalai toqtaitynyn tüsın.

##### Funksianyñ maqsatyn tüsındıru

[explainThePurposeOfAFunction.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/explainThePurposeOfAFunction.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (kk):** Atauy bar funksia şaqyrylğanda ärekettı qalai oryndaitynyn tüsındır.

##### Funksia qaitarğan mändı paidalanu

[useAFunctionsReturnValue.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/useAFunctionsReturnValue.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (kk):** Qaitarylğan nätijenı tek körsetpei, kelesı esepteulerde qoldan.

#### Bağdarlama derekterı

Skills: 3

[index.ts](../../../content/informatics/data/skills/programming/programData/index.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (kk):** Jūmys ıstep tūrğan bağdarlamadağy mändermen jäne özgeretın küimen jūmys ıste.

##### Bağdarlama küiın jañartu

[updateProgramState.ts](../../../content/informatics/data/skills/programming/programData/updateProgramState.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (kk):** Būryn bolğan oqiğalarğa qarai bağdarlamanyñ saqtalğan küiın özgert.

##### Ainymalyny paidalanu

[useAVariable.ts](../../../content/informatics/data/skills/programming/programData/useAVariable.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (kk):** Mändı ainymaly atauymen saqtap, qajet kezde oqy.

##### Kırıs derekterdı paidalanu

[useInputData.ts](../../../content/informatics/data/skills/programming/programData/useInputData.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (kk):** Bağdarlamağa syrttan engızılgen aqparatty onyñ äreketın anyqtau üşın qoldan.

#### Bağdarlama qūrylymy men sintaksisı

Skills: 4

[index.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/index.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (kk):** Bağdarlamalau tılderı tüiındı sözder, örnekter men bloktardy qalai ūiymdastyratynyn üiren.

##### Tüiındı sözderdı identifikatorlardan ajyratu

[distinguishKeywordsFromIdentifiers.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/distinguishKeywordsFromIdentifiers.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (kk):** Tıldıñ rezervtelgen sözderın bağdarlamaşylar tañdağan ataulardan ajyrat.

##### Operatorlardy, örnekterdı jäne nūsqaulardy ajyratu

[distinguishOperatorsExpressionsAndStatements.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/distinguishOperatorsExpressionsAndStatements.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (kk):** Operator, örnek jäne nūsqau arasyndağy aiyrmaşylyqty tany.

##### Nūsqaular blogynyñ şekarasyn tüsındıru

[explainStatementBlockBoundaries.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/explainStatementBlockBoundaries.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (kk):** Qai komandalar siklge, funksiağa nemese şart blogyna jatatynyn anyqta.

##### Sintaksistı tüspen erekşeleudı tüsındıru

[explainSyntaxHighlighting.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/explainSyntaxHighlighting.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (kk):** Kodtyñ tüspen belgılenuı nenı körsetetının jäne nenı däleldemeitının tüsın.

#### Bağdarlamalau konstruksialary

Skills: 7

[index.ts](../../../content/informatics/data/skills/programming/programmingConstructs/index.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (kk):** Bağdarlamany tızbekter, şarttar, siklder jäne oqiğalar arqyly basqarudy üiren.

##### Şeksız sikldı anyqtau

[detectAnInfiniteLoop.ts](../../../content/informatics/data/skills/programming/programmingConstructs/detectAnInfiniteLoop.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (kk):** Şarty eşqaşan jalğan bolmaityndyqtan toqtamaityn sikldı tap.

##### Oqiğany öñdeu

[handleAnEvent.ts](../../../content/informatics/data/skills/programming/programmingConstructs/handleAnEvent.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (kk):** Tüime basylğanda, habarlama kelgende nemese basqa oqiğa bolğanda bağdarlama äreket etsın.

##### Sikldı ıske asyru

[implementALoop.ts](../../../content/informatics/data/skills/programming/programmingConstructs/implementALoop.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (kk):** Tiıstı toqtau şarty oryndalğanşa komandalardy qaitalau üşın sikldı qoldan.

##### Şartqa täueldı ärekettı ıske asyru

[implementConditionalBehavior.ts](../../../content/informatics/data/skills/programming/programmingConstructs/implementConditionalBehavior.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (kk):** Şarttar özgergende bağdarlamanyñ ärtürlı äreket tañdauyn qamtamasyz et.

##### Siklde özgermeitın esepteulerdı sikl syrtyna şyğaru

[moveLoopInvariantComputationsOutsideALoop.ts](../../../content/informatics/data/skills/programming/programmingConstructs/moveLoopInvariantComputationsOutsideALoop.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (kk):** Qaitalau kezınde özgermeitın esepteulerdı sikl syrtyna şyğar.

##### Qabattasatyn şart tekserulerın retteu

[orderOverlappingConditionalChecks.ts](../../../content/informatics/data/skills/programming/programmingConstructs/orderOverlappingConditionalChecks.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (kk):** Erekşe jağdailar da tekserıletındei şarttardy dūrys retpen ornalastyr.

##### Komandalar tızbegın jazu

[writeASequenceOfCommands.ts](../../../content/informatics/data/skills/programming/programmingConstructs/writeASequenceOfCommands.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (kk):** Äreketterdı qajettı retpen oryndaityn dūrys komandalardy jaz.

#### Bağdarlamalau paradigmalary

Skills: 4

[index.ts](../../../content/informatics/data/skills/programming/programmingParadigms/index.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (kk):** Bağdarlama logikasy men äreketın ūiymdastyrudyñ ärtürlı täsılderın zertte.

##### İmperativtık jäne deklarativtık täsılderdı ajyratu

[distinguishImperativeAndDeclarativeApproaches.ts](../../../content/informatics/data/skills/programming/programmingParadigms/distinguishImperativeAndDeclarativeApproaches.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (kk):** Naqty nūsqaular berudı jäne qajettı nätijenı sipattaudy salystyr.

##### Funksionaldyq bağdarlamalaudy tüsındıru

[explainFunctionalProgramming.ts](../../../content/informatics/data/skills/programming/programmingParadigms/explainFunctionalProgramming.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (kk):** Funksialardy bırıktırıp, mänderdı türlendıretın bağdarlamalardy tüsın.

##### Obektıge bağyttalğan bağdarlamalaudy tüsındıru

[explainObjectOrientedProgramming.ts](../../../content/informatics/data/skills/programming/programmingParadigms/explainObjectOrientedProgramming.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (kk):** Küiı men äreketı bar özara ärekettesetın nysandardan qūrylğan bağdarlamalardy zertte.

##### Proseduralyq bağdarlamalaudy tüsındıru

[explainProceduralProgramming.ts](../../../content/informatics/data/skills/programming/programmingParadigms/explainProceduralProgramming.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (kk):** Qadam-qadammen oryndalatyn proseduralar negızındegı bağdarlamalardy zertte.

#### Bağdarlamalardy oqu

Skills: 4

[index.ts](../../../content/informatics/data/skills/programming/readingPrograms/index.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (kk):** Bağdarlamany oqyp, onyñ ne ısteitının baqylaudy üiren.

##### Komandanyñ maqsatyn tüsındıru

[explainACommandsPurpose.ts](../../../content/informatics/data/skills/programming/readingPrograms/explainACommandsPurpose.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (kk):** Bır bağdarlamalau komandasy bağdarlama küiın qalai özgertetının tüsındır.

##### Oryndalu retınıñ saldaryn boljau

[predictConsequencesOfExecutionOrder.ts](../../../content/informatics/data/skills/programming/readingPrograms/predictConsequencesOfExecutionOrder.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (kk):** Komandalar retın özgertu nätijenı nege özgertuı mümkın ekenın tüsındır.

##### Bağdarlama şyğysyn boljau

[predictProgramOutput.ts](../../../content/informatics/data/skills/programming/readingPrograms/predictProgramOutput.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (kk):** Berılgen kırıs derekter üşın bağdarlama qandai körınetın nätije beretının anyqta.

##### Bağdarlama küiın qadağalau

[traceProgramState.ts](../../../content/informatics/data/skills/programming/readingPrograms/traceProgramState.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (kk):** Bağdarlama oryndalğanda ainymalylar men basqa mänderdıñ özgerısın baqyla.

#### Testıleu jäne qatelerdı tüzetu

Skills: 4

[index.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/index.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (kk):** Bağdarlamalardağy qatelerdı tabudy, tüsındırudı jäne tüzetudı üiren.

##### Bağdarlamanyñ qate äreketın anyqtau

[detectIncorrectProgramBehavior.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/detectIncorrectProgramBehavior.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (kk):** Bağdarlama äreketı talaptarğa sai kelmeitının tany.

##### Bağdarlama aqauyn tüzetu

[fixAProgramDefect.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/fixAProgramDefect.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (kk):** Naqty aqaudy tüzetıp, qajettı äreket älı dūrys oryndalatynyn tekser.

##### Qatenıñ sebebın tabu

[locateTheCauseOfAnError.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/locateTheCauseOfAnError.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (kk):** Bağdarlamalau qatesın tudyrğan komandağa nemese şartqa deiın qadağala.

##### Bağdarlamany ärtürlı kırıs derektermen tekseru

[testAProgramWithDifferentInputs.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/testAProgramWithDifferentInputs.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (kk):** Bağdarlamany ärtürlı kırıstermen, onyñ ışınde şektık jağdailarmen syna.

### Robototehnika jäne avtomattandyru

Groups: 2 · Skills: 8

[index.ts](../../../content/informatics/data/skills/roboticsAndAutomation/index.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (kk):** Sezgışter, bağdarlamalau jäne atqaruşy mehanizmder robotqa ortağa qalai jauap beruge kömektesetının zertte.

#### Robotty basqaru

Skills: 4

[index.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/index.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (kk):** Robottyñ qozğalysy men reaksialaryna arnalğan nūsqaulardy qūrastyryp, jetıldır.

##### Robottyñ qaitalanatyn äreketın baptau

[configureARepeatedRobotAction.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/configureARepeatedRobotAction.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (kk):** Robot ärekettı neşe ret qaitalaitynyn nemese qaşan toqtaitynyn belgıle.

##### Robot qozğalystarynyñ retın jasau

[createARobotMovementSequence.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/createARobotMovementSequence.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (kk):** Robotty mejege jetkızetın qozğalys komandalaryn retımen josparla.

##### Robot äreketındegı qatenı tüzetu

[debugRobotBehavior.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/debugRobotBehavior.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (kk):** Kütpegen äreket sezgışten, basqaru logikasynan nemese oryndaudan tuyndağanyn anyqta.

##### Robottyñ kedergıge reaksiasyn ıske asyru

[implementRobotObstacleResponse.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/implementRobotObstacleResponse.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (kk):** Sezgış kedergını anyqtasa, robotty toqtat, būr nemese ainalyp ötkız.

#### Robot jüiesınıñ komponentterı

Skills: 4

[index.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/index.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (kk):** Robot jağdaidy qalai anyqtap, şeşım qabyldap, äreket etetının bıl.

##### Robot kontrollerın anyqtau

[identifyARobotController.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/identifyARobotController.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (kk):** Sezgış derekterın bağdarlamalanğan äreketterge ainaldyratyn kontrollerdı tany.

##### Sezgıştıñ maqsatyn anyqtau

[identifyASensorsPurpose.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/identifyASensorsPurpose.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (kk):** Jaryqty, qaşyqtyqty, temperaturany jäne basqa jağdailardy ölşeitın sezgışterdı tany.

##### Atqaruşy mehanizmnıñ maqsatyn anyqtau

[identifyAnActuatorsPurpose.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/identifyAnActuatorsPurpose.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (kk):** Qozğaltqyş, şam jäne basqa atqaruşy mehanizmder komandalardy qalai oryndaitynyn tüsındır.

##### Sezgışten äreketke deiıngı bailanysty modeldeu

[modelTheSensorToActionRelationship.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/modelTheSensorToActionRelationship.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (kk):** Sezgış ölşemın, şeşım erejesın jäne atqaruşy mehanizm reaksiasyn bailanystyr.

### Bağdarlamalyq jasaqtama arhitekturasy

Groups: 2 · Skills: 21

[index.ts](../../../content/informatics/data/skills/softwareArchitecture/index.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (kk):** Obektıler, jauapkerşılıkter men täueldılıkter senımdı bağdarlamany qalai ūiymdastyratynyn zertte.

#### Jobalau qağidalary

Skills: 8

[index.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/index.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (kk):** Bağdarlamany tüsınıktı ärı özgerıske beiım saqtaityn qağidalardy üiren.

##### Qajetsız mümkındıkterdı keiınge qaldyru (YAGNI)

[deferUnnecessaryFeaturesYAGNI.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/deferUnnecessaryFeaturesYAGNI.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (kk):** Tek oidağy bolaşaq qajettılıkter üşın funksia qospa.

##### Täueldılıkterdı kelısımge süienıp jobalau (DIP)

[designDependenciesOnContractsDIP.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/designDependenciesOnContractsDIP.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (kk):** Naqty servisterge emes, kelısımderge süienıp biznes-logikany böl.

##### Negızdı özgertpei ärekettı keñeitu (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/extendBehaviorWithoutModifyingTheCoreOCP.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (kk):** Tūraqty negızgı logikany qaita jazbai jaña äreketke keñeitu nüktelerın jasa.

##### Artyq qaitalaudy anyqtau (DRY)

[identifyUnnecessaryDuplicationDRY.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/identifyUnnecessaryDuplicationDRY.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (kk):** Keiın bırızsız özgerısterge äkeluı mümkın qaitalanğan erejelerdı tap.

##### Bır jauapkerşılıktı oqşaulau (SRP)

[isolateASingleResponsibilitySRP.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/isolateASingleResponsibilitySRP.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (kk):** Moduldı özgertuge bır tūtas sebep bolatyndai ūiymdastyr.

##### Artyq kürdelılıktı azaitu (KISS)

[reduceUnnecessaryComplexityKISS.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/reduceUnnecessaryComplexityKISS.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (kk):** Talaptar negızdemeitın tetıkterdı alyp, bağdarlamany jeñıldet.

##### Tar interfeisterdı bölu (ISP)

[separateNarrowInterfacesISP.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/separateNarrowInterfacesISP.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (kk):** Klientke tek paidalanatyn operasialary kerek bolatyndai interfeisterdı şağyn ūsta.

##### Almastyrymdylyqty tekseru (LSP)

[verifySubstitutabilityLSP.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/verifySubstitutabilityLSP.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (kk):** Iske asyru ortaq kelısımnıñ talaptaryn saqtai ma, tekser.

#### Obekt modelı

Skills: 13

[index.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/index.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (kk):** Bağdarlamalyq obektıler küiı men äreketın qalai bırıktıretının bıl.

##### Obekt abstraksiasyn qoldanu

[applyObjectAbstraction.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/applyObjectAbstraction.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (kk):** Komponent qoldanuşylarğa ūsynuy tiıs negızgı äreketterdı tañda.

##### Klass pen obektını ajyratu

[distinguishAClassFromAnObject.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/distinguishAClassFromAnObject.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (kk):** Klass ülgısın ärqaisysynyñ öz ağymdağy mänderı bar obektılerden ajyrat.

##### Naqty zat pen onyñ abstraktılı modelın ajyratu

[distinguishARealObjectFromItsAbstractModel.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/distinguishARealObjectFromItsAbstractModel.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (kk):** Bağdarlamalyq model zattyñ tek tañdalğan belgılerın körsetetının tüsın.

##### Obekt ädısın tüsındıru

[explainAnObjectMethod.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/explainAnObjectMethod.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (kk):** Ädıstı şaqyru obekt küiın qalai oqi ne özgerte alatynyn tüsındır.

##### Obekt qasietın tüsındıru

[explainAnObjectProperty.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/explainAnObjectProperty.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (kk):** Saqtalğan qasiettı obekt oryndai alatyn äreketterden ajyrat.

##### İnkapsuliasiany tüsındıru

[explainEncapsulation.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/explainEncapsulation.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (kk):** Obektıler ışkı küiın basqarylatyn ädıster arqyly qalai qorğaitynyn tüsın.

##### Mūragerlıktı tüsındıru

[explainInheritance.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/explainInheritance.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (kk):** Mamandanğan klass jalpy klastyñ äreketın qalai mūralaitynyn tüsındır.

##### Polimorfizmdı tüsındıru

[explainPolymorphism.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/explainPolymorphism.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (kk):** Ärtürlı obektıler bır operasiany ärtürlı jolmen oryndai alatynyn bıl.

##### Klass ūğymyn tüsındıru

[explainTheConceptOfAClass.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/explainTheConceptOfAClass.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (kk):** Klassty jeke obektıler jasalatyn anyqtama retınde tüsın.

##### Bağdarlamalyq obekt qūrylymyn tüsındıru

[explainTheStructureOfASoftwareObject.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/explainTheStructureOfASoftwareObject.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (kk):** Bar obektınıñ säikestıgın, qasietterı men ädısterın anyqta.

##### Obektınıñ küiı men äreketın anyqtau

[identifyAnObjectsStateAndBehavior.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/identifyAnObjectsStateAndBehavior.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (kk):** Obektınıñ qasietterın jäne oryndai alatyn äreketterın sipatta.

##### Pändık aimaq nysanyn bağdarlamalyq obekt retınde modeldeu

[modelADomainEntityAsASoftwareObject.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/modelADomainEntityAsASoftwareObject.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (kk):** Tiıstı qasietter men äreketterdı tañdap, paidaly obekt jasa.

##### Obekt kompozisiasyn modeldeu

[modelObjectComposition.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/modelObjectComposition.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (kk):** Bölek jauapkerşılıgı bar şağyn bölıkterden ülken bağdarlamalyq obektıler qūr.

