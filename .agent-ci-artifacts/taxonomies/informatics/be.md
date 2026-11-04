<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (be)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### Альгарытмы

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../learningApps/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (be):** Дасьледуй, як ствараць, ужываць і параўноўваць паўтаральныя мэтады вырашэньня задачаў.

#### Аналіз

Skills: 3

[analysis.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (be):** Дасьледуй, як патрэбы альгарытму ў часе і памяці мяняюцца ад уваходных зьвестак.

##### Адрозьніваць лінейны і лягарытмічны рост

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (be):** Параўнай рост прапарцыйна памеру ўваходу з ростам пры паўторным дзяленьні напалову.

##### Ацэньваць найгоршы выпадак альгарытму

[estimateAnAlgorithmsWorstCase.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (be):** Ацані найбольшую колькасьць праверак, патрэбных альгарытму ў найгоршым выпадку.

##### Тлумачыць кампрамісы паміж часам і памяцьцю

[explainTimeMemoryTradeOffs.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (be):** Зразумей, чаму хутчэйшыя альгарытмы могуць патрабаваць болей часовай памяці.

#### Апрацоўка калекцыяў

Skills: 4

[collectionProcessing.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (be):** Навучыся лічыць, сумаваць і знаходзіць найбольшыя і найменшыя значэньні пры абыходзе зьвестак.

##### Ужываць падлік элемэнтаў

[applyElementCounting.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (be):** Палічы ўсе элемэнты калекцыі, што адпавядаюць зададзенай умове.

##### Знаходзіць найбольшае значэньне

[applyMaximumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (be):** Адсочвай найбольшае знойдзенае значэньне пры абыходзе калекцыі.

##### Знаходзіць найменшае значэньне

[applyMinimumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (be):** Адсочвай найменшае знойдзенае значэньне пры абыходзе калекцыі.

##### Назапашваць суму

[applySumAccumulation.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (be):** Дадавай значэньні калекцыі адно за адным да назапашанай сумы.

#### Пабудова

Skills: 6

[construction.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (be):** Навучыся вызначаць дзеяньні, умовы і правілы спыненьня альгарытму.

##### Параўноўваць альгарытмы паводле патрабаваньняў

[compareAlgorithmsAgainstRequirements.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (be):** Параўнай магчымыя альгарытмы паводле іх патрабаваньняў і абмежаваньняў.

##### Будаваць пасьлядоўны альгарытм

[constructASequentialAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (be):** Апішы канечную пасьлядоўнасьць крокаў у правільным парадку.

##### Вызначаць мэту альгарытму

[defineAnAlgorithmsGoal.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (be):** Пакажы, чаго мусіць дасягнуць альгарытм і якія ўваходныя зьвесткі ён прымае.

##### Праектаваць умоўныя разгалінаваньні

[designConditionalBranching.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (be):** Сплянуй розныя шляхі альгарытму паводле выразных умоваў.

##### Праектаваць паўтарэньне

[designRepetition.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (be):** Спраектуй паўтаральную працэдуру з правільнымі зьменамі і ўмовай спыненьня.

##### Рэалізоўваць рэкурсіўны альгарытм

[implementARecursiveAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (be):** Пабудуй рэкурсіўны альгарытм зь меншымі падзадачамі і базавым выпадкам, які спыняе рэкурсію.

#### Пошук

Skills: 6

[search.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (be):** Даведайся, як розныя мэтады пошуку знаходзяць элемэнт у калекцыі.

##### Ужываць бінарны пошук

[applyBinarySearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (be):** Знайдзі значэньне ў адсартаваных зьвестках, кожны раз адкідваючы палову дыяпазону.

##### Ужываць пошук у бінарным дрэве

[applyBinaryTreeSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (be):** Ідзі ўпарадкаванымі галінамі бінарнага дрэва пошуку, каб знайсьці ключ.

##### Ужываць лінейны пошук

[applyLinearSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (be):** Знайдзі патрэбнае значэньне, правяраючы элемэнты адзін за адным.

##### Параўноўваць мэтады пошуку паводле колькасьці праверак

[compareSearchMethodsByCheckCount.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (be):** Параўнай колькасьць праверак у лінейным і бінарным пошуку.

##### Вызначаць перадумовы бінарнага пошуку

[identifyBinarySearchPrerequisites.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (be):** Правер, ці зьвесткі ўпарадкаваныя адпаведна патрабаваньням бінарнага пошуку.

##### Прагназаваць маштабаваньне пошуку

[predictSearchScaling.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (be):** Зразумей, чаму падваеньне зьвестак дадае да бінарнага пошуку толькі прыблізна адну праверку.

#### Сартаваньне

Skills: 4

[sorting.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (be):** Даведайся, як мэтады сартаваньня разьмяшчаюць значэньні ў абраным парадку.

##### Ужываць бурбалкавае сартаваньне

[applyBubbleSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (be):** Сартуй, мяняючы месцамі суседнія значэньні ў няправільным парадку.

##### Ужываць сартаваньне ўстаўкай

[applyInsertionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (be):** Сартуй, устаўляючы кожны новы элемэнт ва ўжо ўпарадкаваную частку.

##### Ужываць сартаваньне выбарам

[applySelectionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (be):** Сартуй, кожны раз выбіраючы найменшы з астатніх элемэнтаў.

##### Тлумачыць крытэр сартаваньня

[explainASortingCriterion.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (be):** Абяры значэньне або ўласьцівасьць, паводле якіх будзеш сартаваць калекцыю.

### Штучны інтэлект

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (be):** Дасьледуй, як сыстэмы штучнага інтэлекту навучаюцца, прагназуюць, ствараюць зьмест і часам памыляюцца.

#### Асновы штучнага інтэлекту

Skills: 6

[aIFundamentals.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (be):** Дасьледуй адрозьненьні паміж запраграмаванымі правіламі, навучанымі мадэлямі й задачамі ШІ.

##### Клясыфікаваць задачы ШІ

[classifyAITasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (be):** Распазнавай, ці задача ШІ клясыфікуе, прагназуе або стварае зьмест.

##### Адрозьніваць правілы ад навучаных мадэляў

[distinguishRulesFromTrainedModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (be):** Адрозьнівай яўна запраграмаваныя правілы прыняцьця рашэньняў ад сыстэмаў, навучаных на зьвестках.

##### Тлумачыць генэратыўны ШІ

[explainGenerativeAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (be):** Зразумей, як генэратыўныя мадэлі ствараюць тэксты, выявы ды іншы зьмест.

##### Тлумачыць навучаньне на прыкладах

[explainLearningFromExamples.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (be):** Патлумач, як прыклады дапамагаюць мадэлі лепш працаваць з новымі ўваходнымі зьвесткамі.

##### Тлумачыць прагнастычны ШІ

[explainPredictiveAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (be):** Дасьледуй, як сыстэмы прагназаваньня ацэньваюць значэньні, катэгорыі й імавернасьці падзеяў.

##### Выяўляць магчымую памылку ШІ

[identifyAPotentialAIError.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (be):** Заўважай прыкметы, што адказ ШІ можа патрабаваць незалежнай праверкі.

#### Імітацыя і разуменьне

Skills: 2

[imitationAndUnderstanding.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (be):** Дасьледуй розьніцу паміж пераканаўчым перайманьнем і сапраўдным разуменьнем.

##### Тлумачыць «Кітайскі пакой» Сэрла

[explainSearlesChineseRoom.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (be):** Дасьледуй мысленны экспэрымэнт «Кітайскі пакой» і выкліканую ім дыскусію.

##### Тлумачыць тэст Т'юрынга

[explainTheTuringTest.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (be):** Зразумей, што правярае тэст Т'юрынга і чаго ён ня можа даказаць.

#### Маркеры і кантэкст моўных мадэляў

Skills: 6

[languageModelTokensAndContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (be):** Даведайся, як моўныя мадэлі падзяляюць тэкст на токены й выкарыстоўваюць кантэкст.

##### Адрозьніваць сэмпліраваньне ад выбару найімавернейшага токена

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (be):** Параўноўвай выбар найімавернейшага токена з выпадковай выбаркай іншых магчымых працягаў.

##### Адрозьніваць токены, сымбалі й словы

[distinguishTokensCharactersAndWords.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (be):** Зразумей, чаму сымбалі, словы і токены не адно і тое ж.

##### Тлумачыць кантэкстнае акно моўнай мадэлі

[explainALanguageModelsContextWindow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (be):** Зразумей, чаму моўная мадэль можа выкарыстоўваць толькі абмежаваны аб’ём кантэксту.

##### Тлумачыць перапаўненьне кантэкстнага акна

[explainContextWindowOverflow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (be):** Дасьледуй, што можа здарыцца, калі запыт перавышае ліміт кантэксту мадэлі.

##### Тлумачыць выбар наступнага токена

[explainNextTokenSelection.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (be):** Патлумач, як моўныя мадэлі выбіраюць магчымы наступны токен паводле кантэксту.

##### Тлумачыць токены

[explainTokens.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (be):** Зразумей токены як адзінкі прадстаўленьня тэксту, што залежаць ад мадэлі.

#### Архітэктуры мадэляў і рэсурсы

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (be):** Дасьледуй, як розныя архітэктуры мадэляў ШІ ўплываюць на прадукцыйнасьць і патрэбу ў рэсурсах.

##### Выбіраць мадэль для задачы

[chooseAModelForATask.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (be):** Абірай мадэль паводле якасьці выкананьня задачы, хуткасьці, кошту, прыватнасьці й даступнай памяці.

##### Параўноўваць шчыльныя мадэлі й сумесі экспэртаў

[compareDenseAndMoEModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (be):** Параўноўвай мадэлі, што актывуюць шмат парамэтраў, з тымі, якія выкарыстоўваюць выбраныя экспэртныя блёкі.

##### Параўноўваць патрабаваньні мадэляў да памяці

[compareModelMemoryRequirements.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (be):** Ацэньвай памяць, патрэбную для працы мадэлі, а ня толькі месца для яе файлаў.

##### Параўноўваць затрымку адказу

[compareResponseLatency.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (be):** Асобна параўноўвай час да пачатку адказу ШІ й хуткасьць далейшага стварэньня тэксту.

##### Тлумачыць квантаваньне

[explainQuantization.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (be):** Зразумей, як зьмяншэньне лікавай дакладнасьці ашчаджае памяць, але можа паўплываць на якасьць.

#### Стварэньне запытаў да ШІ

Skills: 7

[prompting.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (be):** Навучыся даваць сыстэмам ШІ больш зразумелыя інструкцыі, кантэкст і абмежаваньні.

##### Разьбіваць складаны запыт на падзадачы

[breakAComplexPromptIntoSubtasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (be):** Дзялі складаны запыт на меншыя крокі з вынікамі, якія можна праверыць.

##### Дадаваць кантэкст да запыту

[providePromptContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (be):** Давай дарэчную даведачную інфармацыю, каб ШІ зразумеў твой запыт.

##### Удакладняць запыт па выніках

[refineAPromptBasedOnResults.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (be):** Палепшы запыт да ШІ, праверыўшы, чаго бракавала папярэдняму адказу.

##### Вызначаць мэту запыту да ШІ

[specifyAPromptObjective.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (be):** Дакладна фармулюй задачу, якую мусіць выканаць памочнік ШІ.

##### Вызначаць ролю ў запыце

[specifyARoleInAPrompt.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (be):** Задавай карысны погляд ці стыль, але не прымай іх за сапраўдную экспэртнасьць.

##### Вызначаць фармат адказу

[specifyAnOutputFormat.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (be):** Прасі пэўную структуру адказу, напрыклад табліцу або зададзеныя палі.

##### Вызначаць абмежаваньні запыту

[specifyPromptConstraints.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (be):** Вызначай межы аб’ёму, крыніцаў і зьвестак, якія нельга выдумляць.

#### Надзейнасьць і адказнае выкарыстаньне ШІ

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (be):** Навучыся правяраць вынікі ШІ й улічваць іхны ўплыў на людзей.

##### Тлумачыць адказнасьць чалавека за рашэньні з дапамогай ШІ

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (be):** Зразумей, чаму людзі застаюцца адказнымі за рашэньні, прынятыя з дапамогай ШІ.

##### Абараняць асабістыя зьвесткі ў запытах

[protectPersonalDataInPrompts.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (be):** Прыбірай непатрэбныя асабістыя зьвесткі перад адпраўкай запыту да ШІ.

##### Распазнаваць рызыкі прадузятасьці ШІ

[recognizeAIBiasRisks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (be):** Вызначай, калі сыстэмы ШІ могуць несправядліва абыходзіцца з групамі ці асобнымі людзьмі.

##### Правяраць факты ў адказе ШІ

[verifyFactsInAnAIResponse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (be):** Зьвярай фактычныя сьцьверджаньні ШІ з надзейнымі незалежнымі крыніцамі.

#### Бясьпечнае ўзаемадзеяньне са ШІ

Skills: 4

[safeInteractionWithAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (be):** Распазнавай спосабы ўзаемадзеяньня, празь якія парады ШІ могуць уводзіць у зман або выклікаць нездаровую залежнасьць.

##### Тлумачыць рызыкі празьмернай залежнасьці ад ШІ

[explainRisksOfOverrelianceOnAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (be):** Зразумей, чаму ШІ ня мусіць замяняць самастойнае мысьленьне або падтрымку людзей.

##### Выяўляць ненадзейныя інструкцыі ва ўваходзе ШІ

[identifyUntrustedInstructionsInAIInput.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (be):** Распазнавай схаваныя інструкцыі ў зьнешнім матэрыяле, якія ня мусяць кіраваць памочнікам.

##### Абараняць сакрэты пры выкарыстаньні ШІ

[protectSecretsWhenUsingAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (be):** Беражы паролі, ключы доступу й канфідэнцыйныя зьвесткі, працуючы са ШІ.

##### Распазнаваць падлізьніцтва ШІ

[recognizeAISycophancy.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (be):** Заўважай згоду ці пахвалу ад ШІ, якія не падмацаваныя доказамі.

### Вылічальнае мысьленьне

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (be):** Дасьледуй, як падзяляць складаныя задачы на зразумелыя крокі, заканамернасьці і правілы.

#### Дэкампазыцыя і абстрагаваньне

Skills: 4

[decompositionAndAbstraction.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (be):** Навучыся спрашчаць задачы, вызначаючы іхныя істотныя часткі й сувязі.

##### Будаваць абстрактную мадэль сыстэмы

[buildAnAbstractSystemModel.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (be):** Ствары спрошчанае прадстаўленьне складанай сытуацыі або сыстэмы.

##### Падзяляць задачу на часткі

[decomposeAProblem.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (be):** Падзялі вялікую задачу на меншыя, якія можна разьвязаць паасобку.

##### Абагульняць паўторны спосаб

[generalizeARepeatedMethod.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (be):** Знайдзі спосаб, які можна паўторна ўжываць да некалькіх розных задачаў.

##### Вызначаць істотныя ўласьцівасьці аб'екта

[identifyEssentialObjectProperties.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (be):** Абірай зьвесткі, важныя для задачы, і адкідай неістотныя.

#### Лёгіка й заканамернасьці

Skills: 8

[logicAndPatterns.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (be):** Даведайся, як правілы, заканамернасьці й лягічныя ўмовы дапамагаюць разьвязваць задачы.

##### Ужываць лягічнае І

[applyLogicalAND.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (be):** Выкарыстоўвай І, каб праверыць, ці выконваюцца абедзьве ўмовы.

##### Ужываць лягічнае НЕ

[applyLogicalNOT.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (be):** Выкарыстоўвай НЕ, каб зьмяніць праўдзівасьць умовы на супрацьлеглую.

##### Ужываць лягічнае АБО

[applyLogicalOR.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (be):** Выкарыстоўвай АБО, каб праверыць, ці выконваецца хоць адна з дзьвюх умоваў.

##### Выяўляць супярэчлівыя правілы

[detectContradictoryRules.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (be):** Распазнавай выпадкі, калі два патрабаваньні ня могуць быць праўдзівымі адначасова.

##### Ацэньваць простую ўмову

[evaluateASimpleCondition.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (be):** Вызначай, ці адна ўмова праўдзівая, хібная або яе праўдзівасьць пакуль немагчыма высьветліць.

##### Вылічваць складаныя лягічныя выразы

[evaluateCompoundLogicalExpressions.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (be):** Вылічвай лягічныя выразы зь некалькімі апэратарамі ў правільным парадку.

##### Прагназаваць вынік паводле правіла

[predictAnOutcomeFromARule.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (be):** Вызнач, што адбудзецца далей, калі вядомыя правіла і пачатковы стан.

##### Распазнаваць заканамернасьць

[recognizeAPattern.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (be):** Знаходзь заканамернасьці ў пасьлядоўнасьцях і правярай, ці пасуе прапанаванае правіла.

### Структуры зьвестак

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (be):** Даведайся, як калекцыі, ключы, дрэвы і сеткі ўпарадкоўваюць зьвесткі для розных апэрацыяў.

#### Слоўнікі

Skills: 3

[dictionaries.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (be):** Даведайся, як слоўнікі зьвязваюць унікальныя ключы з захаванымі значэньнямі.

##### Тлумачыць структуру слоўніка

[explainDictionaryStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (be):** Зразумей, як слоўнік знаходзіць інфармацыю паводле ключа, а не пазыцыі.

##### Атрымліваць значэньне са слоўніка паводле ключа

[retrieveADictionaryValueByKey.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (be):** Знайдзі значэньне ў слоўніку паводле ключа і апрацуй выпадак, калі ключ адсутнічае.

##### Абнаўляць значэньне ў слоўніку

[updateADictionaryValue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (be):** Зьмяні значэньне, захаванае пад ужо наяўным ключом слоўніка.

#### Графы

Skills: 6

[graphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (be):** Даведайся, як графы паказваюць месцы, аб’екты і сувязі паміж імі.

##### Адрозьніваць арыентаваныя і неарыентаваныя графы

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (be):** Вызначай, ці сувязі аднанакіраваныя, ці двухнакіраваныя.

##### Адрозьніваць дрэвы і графы з цыклямі

[distinguishTreesFromGraphsWithCycles.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (be):** Зразумей, чаму графы могуць мець цыклі, а дрэвы — не.

##### Адрозьніваць узважаныя і няўзважаныя графы

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (be):** Распазнавай, калі рэбрам графа нададзены лікі, напрыклад адлегласьць або кошт.

##### Тлумачыць структуру графа

[explainGraphStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (be):** Распазнавай вяршыні графа і рэбры, якія іх злучаюць.

##### Знаходзіць шлях у графе

[findAPathInAGraph.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (be):** Ідзі дапушчальным шляхам паміж вяршынямі з улікам кірункаў рэбраў.

##### Вызначаць сумежныя вяршыні

[identifyAdjacentVertices.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (be):** Вызначай вяршыні, непасрэдна злучаныя зь іншай вяршыняй.

#### Чарга

Skills: 3

[queue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (be):** Даведайся, як чарга апрацоўвае элемэнты ў парадку іх паступленьня.

##### Выдаляць элемэнт з чаргі

[dequeueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (be):** Выдалі першы элемэнт чаргі, не парушаючы парадку астатніх.

##### Дадаваць элемэнт у чаргу

[enqueueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (be):** Дадай новы элемэнт у канец чаргі.

##### Тлумачыць прынцып FIFO

[explainFIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (be):** Патлумач, чаму элемэнт, які трапіў у чаргу найраней, выходзіць першым.

#### Пасьлядоўнасьці

Skills: 7

[sequences.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (be):** Дасьледуй упарадкаваныя калекцыі і спосабы доступу, даданьня і выдаленьня іх элемэнтаў.

##### Зьвяртацца да элемэнту пасьлядоўнасьці паводле індэксу

[accessASequenceElementByIndex.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (be):** Атрымай элемэнт паводле індэксу, не выходзячы за межы дапушчальных пазыцыяў.

##### Адрозьніваць масівы і зьвязаныя сьпісы

[distinguishArraysFromLinkedLists.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (be):** Параўнай індэксаваныя масівы зь ланцужкамі зьвязаных вузлоў.

##### Тлумачыць структуру масіву

[explainArrayStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (be):** Зразумей, як масівы захоўваюць элемэнты ў пазыцыях, вызначаных індэксамі.

##### Тлумачыць структуру сьпісу

[explainListStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (be):** Распазнавай сьпісы як упарадкаваныя калекцыі, якія можна паказваць рознымі спосабамі.

##### Устаўляць элемэнт у пасьлядоўнасьць

[insertAnElementIntoASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (be):** Устаў элемэнт у адпаведнае месца ўпарадкаванай пасьлядоўнасьці.

##### Выдаляць элемэнт з пасьлядоўнасьці

[removeAnElementFromASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (be):** Выдалі элемэнт, захаваўшы парадак астатняй пасьлядоўнасьці.

##### Абыходзіць пасьлядоўнасьць

[traverseASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (be):** Наведай кожны элемэнт пасьлядоўнасьці па чарзе.

#### Мноствы

Skills: 4

[sets.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (be):** Дасьледуй мноствы ўнікальных значэньняў і праверку належнасьці да іх.

##### Вылічваць перасячэньне мностваў

[computeSetIntersection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (be):** Знайдзі толькі элемэнты, супольныя для двух мностваў.

##### Вылічваць аб’яднаньне мностваў

[computeSetUnion.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (be):** Аб’яднай усе розныя элемэнты двух мностваў без паўтораў.

##### Тлумачыць структуру мноства

[explainSetStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (be):** Зразумей, чаму мноства захоўвае кожны розны элемэнт толькі адзін раз.

##### Правяраць належнасьць да мноства

[testSetMembership.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (be):** Правер, ці належыць пэўнае значэньне мноству.

#### Стэк

Skills: 3

[stack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (be):** Даведайся, як стэк дае доступ найперш да апошняга дададзенага элемэнту.

##### Тлумачыць прынцып LIFO

[explainLIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (be):** Зразумей, чаму стэк найперш вяртае апошні дададзены элемэнт.

##### Здымаць элемэнт са стэку

[popAnElementFromAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (be):** Выдалі апошні дададзены элемэнт, праверыўшы, ці стэк не пусты.

##### Класьці элемэнт на стэк

[pushAnElementOntoAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (be):** Пакладзі новы элемэнт на вяршыню стэку.

#### Выбар структуры зьвестак

Skills: 4

[structureSelection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (be):** Выбірай структуры зьвестак паводле таго, як праграма выкарыстоўвае зьвесткі.

##### Выбіраць структуру для патрэбных апэрацыяў

[chooseAStructureForRequiredOperations.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (be):** Абяры калекцыю для індэксаваньня, праверкі належнасьці, чаргі або сувязяў.

##### Параўноўваць выдаткі ўстаўкі ў калекцыі

[compareCollectionInsertionCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (be):** Дасьледуй, чаму ўстаўка можа вымагаць зруху элемэнтаў масіву або зьмены сувязяў.

##### Параўноўваць выдаткі доступу да элемэнтаў

[compareElementAccessCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (be):** Параўнай хуткасьць доступу да пэўнага элемэнту ў масівах і зьвязаных сьпісах.

##### Адрозьніваць структуры зьвестак і альгарытмы

[distinguishDataStructuresFromAlgorithms.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (be):** Адрозьнівай арганізацыю зьвестак у структуры ад іх апрацоўкі альгарытмам.

#### Дрэвы

Skills: 4

[trees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (be):** Дасьледуй, як дрэвы ўпарадкоўваюць інфармацыю праз сувязі бацькоўскіх і даччыных вузлоў.

##### Адрозьніваць ліставыя і ўнутраныя вузлы дрэва

[distinguishLeafAndInternalTreeNodes.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (be):** Адрозьнівай вузлы з даччынымі вузламі ад лісьця безь іх.

##### Тлумачыць бінарныя дрэвы пошуку

[explainBinarySearchTrees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (be):** Зразумей правіла ўпарадкаваньня ключоў, якое дазваляе шукаць у бінарным дрэве.

##### Тлумачыць структуру дрэва

[explainTreeStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (be):** Распазнавай корань, галіны, вузлы і сувязі ў дрэве.

##### Знаходзіць шлях у дрэве

[findAPathInATree.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (be):** Ідзі наяўнымі сувязямі паміж двума вузламі дрэва.

### Шаблёны праектаваньня

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../learningApps/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (be):** Дасьледуй паўторна прыдатныя спосабы ствараць, спалучаць і ўзгадняць праграмныя аб’екты.

#### Паводзінныя шаблёны

Skills: 11

[behavioral.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (be):** Вывучай, як аб’екты ўзгадняюць запыты й мяняюць паводзіны.

##### Ланцужок адказнасьці

[chainOfResponsibility.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (be):** Перадавай запыт паміж апрацоўнікамі, пакуль нехта зь іх ня зможа яго апрацаваць.

##### Каманда

[command.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (be):** Прадстаўляй апэрацыю як аб’ект, які можна захаваць ці заплянаваць.

##### Інтэрпрэтатар

[interpreter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (be):** Інтэрпрэтуй невялікую мову паводле правілаў у выглядзе выразаў.

##### Ітэратар

[iterator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (be):** Перабірай элемэнты калекцыі, не адкрываючы спосабу іх захоўваньня.

##### Пасярэднік

[mediator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (be):** Узгадняй узаемадзеяньні кампанэнтаў праз цэнтральнага пасярэдніка.

##### Здымак стану

[memento.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (be):** Захоўвай стан аб’екта, каб потым яго аднавіць.

##### Назіральнік

[observer.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (be):** Паведамляй зацікаўленым падпісчыкам, калі назіраны аб’ект зьмяняецца.

##### Стан

[state.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (be):** Зьмяняй рэакцыю аб’екта адпаведна яго бягучаму стану.

##### Стратэгія

[strategy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (be):** Пераключайся паміж альгарытмамі, што прытрымліваюцца супольнага інтэрфэйсу.

##### Шаблённы мэтад

[templateMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (be):** Захоўвай асноўныя крокі альгарытму нязьменнымі, дазваляючы мяняць выбраныя.

##### Наведнік

[visitor.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (be):** Аддзяляй апэрацыі ад структураў аб’ектаў, на якіх яны працуюць.

#### Спараджальныя шаблёны

Skills: 5

[creational.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (be):** Вывучай шаблёны стварэньня аб’ектаў без залежнасьці кліентаў ад канкрэтных тыпаў.

##### Абстрактная фабрыка

[abstractFactory.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (be):** Выкарыстоўвай фабрыку, якая стварае сумяшчальныя сем’і зьвязаных аб’ектаў.

##### Будаўнік

[builder.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (be):** Стварай складаны аб’ект крок за крокам з дапамогай будаўніка.

##### Фабрычны мэтад

[factoryMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (be):** Дазволь падклясам выбіраць, які канкрэтны аб’ект створыць фабрычны мэтад.

##### Прататып

[prototype.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (be):** Стварай новыя аб’екты, капіюючы загадзя наладжаны ўзор.

##### Адзінкавы экзэмпляр

[singleton.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (be):** Кіруй доступам да аднаго супольнага экзэмпляра, улічваючы рызыкі глябальнага стану.

#### Структурныя шаблёны

Skills: 7

[structural.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (be):** Вывучай шаблёны злучэньня, абгортваньня й супольнага карыстаньня кампанэнтамі.

##### Адаптэр

[adapter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (be):** Злучай несумяшчальныя інтэрфэйсы, ператвараючы выклікі паміж імі.

##### Мост

[bridge.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (be):** Аддзяляй абстракцыю кампанэнта ад рэалізацыі, якую ён выкарыстоўвае.

##### Кампазытар

[composite.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (be):** Працуй з асобнымі аб’ектамі й іхнымі групамі праз супольны інтэрфэйс.

##### Дэкаратар

[decorator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (be):** Дадавай паводзіны, абгортваючы аб’ект, замест памнажаць падклясы.

##### Фасад

[facade.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (be):** Прапануй просты пункт уваходу ў складаны набор кампанэнтаў.

##### Лёгкавагавік

[flyweight.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (be):** Сумесна выкарыстоўвай прыдатныя для паўторнага ўжытку зьвесткі аб’ектаў, каб зьменшыць расход памяці.

##### Намесьнік

[proxy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (be):** Кіруй доступам да аб’екта праз іншы аб’ект з такім самым інтэрфэйсам.

### Лічбавая творчасьць і гульні

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (be):** Стварай лічбавыя матэрыялы, праектуй правілы гульняў і дасьледуй працэдурную генэрацыю.

#### Лічбавыя матэрыялы

Skills: 3

[digitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (be):** Вучыся ствараць і рэдагаваць лічбавы зьмест ды выбіраць прылады згодна з мэтай.

##### Выбіраць лічбавы інструмэнт для творчасьці

[chooseADigitalCreativeTool.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (be):** Выбірай творчую праграму паводле таго, што хочаш стварыць.

##### Ствараць просты лічбавы твор

[createASimpleDigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (be):** Ствары зьвязны лічбавы паштовы ліст, выяву ці іншы твор для пэўнай аўдыторыі.

##### Рэдагаваць лічбавы твор

[editADigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (be):** Паляпшай існы лічбавы файл, захоўваючы яго задуманы сэнс.

#### Дызайн гульняў

Skills: 3

[gameDesign.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (be):** Дасьледуй, як правілы й дзеяньні гульцоў фармуюць гульнявы досьвед.

##### Праектаваць гульнявую мэханіку

[designAGameMechanic.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (be):** Зьвязвай дзеяньне гульца са зьменамі стану гульні ды зваротнай сувязьзю.

##### Фармуляваць правіла гульні

[formulateAGameRule.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (be):** Запішы правіла гульні так ясна, каб гульцы ведалі, што дазволена.

##### Правяраць балянс простай гульні

[testTheBalanceOfASimpleGame.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (be):** Правярай, ці робяць правілы гульню справядлівай, складанай і праходнай.

#### Працэдурная генэрацыя

Skills: 4

[proceduralGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (be):** Даведайся, як альгарытмы ствараюць шмат варыянтаў зьместу на аснове кароткіх правілаў.

##### Параўноўваць захоўваньне й генэраваньне рэсурсаў

[compareResourceStorageAndGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (be):** Параўноўвай памяць, якую ашчаджае працэдурная генэрацыя, зь неабходнымі вылічэньнямі.

##### Наладжваць парамэтры генэратара

[configureGeneratorParameters.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (be):** Зьмяняй налады генэратара, каб кіраваць выглядам або колькасьцю вынікаў.

##### Тлумачыць працэдурную генэрацыю рэсурсаў

[explainProceduralResourceGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (be):** Растлумач, як генэратар стварае рэсурсы замест захоўваньня кожнага гатовага варыянту.

##### Паўтараць вынікі з дапамогай зерня генэрацыі

[reproduceResultsUsingAGenerationSeed.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (be):** Зразумей, як сталае зерне генэрацыі й нязьменныя правілы даюць той самы вынік.

### Карыстальніцкі досьвед лічбавага прадукту

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (be):** Праектуй зразумелыя, зручныя для навігацыі й даступныя лічбавыя інтэрфэйсы.

#### Даступнасьць

Skills: 2

[accessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (be):** Дасьледуй, як розныя магчымасьці людзей і спосабы ўводу ўплываюць на лічбавую даступнасьць.

##### Вызначаць патрэбы карыстальнікаў з рознымі магчымасьцямі

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (be):** Распазнавай патрэбы людзей, якія карыстаюцца клявіятурай, павялічаным тэкстам ці дапаможнымі тэхналёгіямі.

##### Правяраць даступнасьць лічбавага ўзаемадзеяньня

[testDigitalInteractionAccessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (be):** Правер інтэрфэйс бяз мышы ці гуку й запішы перашкоды.

#### Дызайн лічбавага ўзаемадзеяньня

Skills: 4

[digitalInteractionDesign.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (be):** Дасьледуй, як праектаваць зразумелыя дзеяньні й карысны зваротны водгук у інтэрфэйсах.

##### Праектаваць зваротную сувязь лічбавага інтэрфэйсу

[designDigitalInterfaceFeedback.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (be):** Зрабі так, каб кнопкі, станы загрузкі й памылкі давалі зразумелую зваротную сувязь.

##### Праектаваць навігацыю лічбавага інтэрфэйсу

[designDigitalInterfaceNavigation.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (be):** Арганізуй экраны й навігацыю так, каб людзі знаходзілі патрэбныя дзеяньні.

##### Вызначаць мэту карыстальніка лічбавага прадукту

[identifyADigitalProductUsersGoal.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (be):** Вызначай, чаго чалавек хоча дасягнуць у праграме ці на лічбавай прыладзе.

##### Прадухіляць тыповыя памылкі лічбавага ўзаемадзеяньня

[preventCommonDigitalInteractionErrors.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (be):** Выкарыстоўвай подпісы, праверку й пацьверджаньне, каб прадухіляць пазьбежныя памылкі.

#### Ацэнка досьведу й этыка

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (be):** Дасьледуй, як тэставаньне з карыстальнікамі й сумленны дызайн паляпшаюць лічбавыя прадукты.

##### Распазнаваць маніпулятыўныя шаблёны інтэрфэйсаў

[identifyManipulativeInterfacePatterns.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (be):** Распазнавай хітрыкі інтэрфэйсу, якія хаваюць выдаткі, навязваюць выбар або ўскладняюць скасаваньне.

##### Правяраць зручнасьць карыстаньня лічбавым інтэрфэйсам

[testDigitalInterfaceUsability.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (be):** Назірай, ці можа чалавек выканаць сапраўдную задачу без дадатковых падказак.

### Лічбавая бясьпека і адказнасьць

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (be):** Навучыся абараняць інфармацыю, паважаць іншых і разумець уплыў лічбавых тэхналёгіяў.

#### Абарона ўліковых запісаў

Skills: 9

[accountProtection.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (be):** Даведайся, як абараняць уліковыя запісы й рэагаваць на падазроныя паведамленьні.

##### Правяраць сапраўднасьць адпраўніка ліста

[assessAnEmailSendersAuthenticity.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (be):** Правярай асобу адпраўніка ня толькі паводле паказанага імя або фота.

##### Ацэньваць рызыку пераходу па спасылцы

[assessTheRiskOfFollowingALink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (be):** Прадбач магчымыя наступствы адкрыцьця падазронай спасылкі.

##### Наладжваць шматфактарную аўтэнтыфікацыю

[configureMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (be):** Уключы дадатковы фактар уваходу і сплянуй бясьпечнае аднаўленьне доступу.

##### Ствараць надзейную парольную фразу

[createAStrongPassphrase.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (be):** Стварай доўгія, непрадказальныя й розныя для кожнага ўліковага запісу парольныя фразы.

##### Тлумачыць шматфактарную аўтэнтыфікацыю

[explainMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (be):** Зразумей, як другі незалежны фактар праверкі асобы абараняе ўліковы запіс.

##### Тлумачыць важнасьць абнаўленьняў праграм

[explainWhySoftwareUpdatesMatter.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (be):** Даведайся, як афіцыйныя абнаўленьні дапамагаюць ліквідаваць уразьлівасьці бясьпекі.

##### Распазнаваць фішынгавае паведамленьне

[recognizeAPhishingMessage.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (be):** Выяўляй паведамленьні, што выдаюць сябе за іншых дзеля крадзяжу пароляў ці кодаў.

##### Рэагаваць на падазроны лічбавы кантакт

[respondToSuspiciousDigitalContact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (be):** Дзейнічай бясьпечна пры падазроным кантакце й правярай просьбу іншым каналам.

##### Правяраць дамэн сайта

[verifyAWebsitesDomain.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (be):** Вызначай сапраўдны дамэн у вэб-адрасе й выяўляй падманліва падобныя адрасы.

#### Этыка лічбавых узаемадзеяньняў

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (be):** Навучыся размаўляць з павагай і выконваць дазволы аўтараў.

##### Пазначаць аўтарства лічбавых матэрыялаў

[attributeDigitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (be):** Указвай сапраўдных аўтараў лічбавага зьместу, які выкарыстоўваеш.

##### Абіраць бясьпечны спосаб паведаміць пра праблему

[chooseASafeWayToReportAProblem.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (be):** Выбірай давераных людзей ці афіцыйныя каналы для паведамленьня аб праблемах у сеціве.

##### Адрозьніваць ліцэнзіі лічбавага зьместу

[distinguishDigitalContentLicenses.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (be):** Адрозьнівай абмежаваньні аўтарскага права, адкрытыя ліцэнзіі й грамадзкі набытак.

##### Распазнаваць належныя паводзіны ў інтэрнэце

[identifyAppropriateOnlineBehavior.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (be):** Выяўляй пагрозы, перасьлед і цкаваньне ў лічбавых зносінах.

#### Прыватнасьць

Skills: 5

[privacy.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (be):** Даведайся, як распаўсюд інфармацыі ў сеціве можа ўплываць на прыватнасьць.

##### Абіраць бясьпечныя спосабы перадачы зьвестак

[chooseSafeDataSharingMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (be):** Вызначай, каму можна перадаць адчувальную інфармацыю і як зрабіць гэта бясьпечна.

##### Адрозьніваць прыватны чат ад публічнай спасылкі

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (be):** Правярай, хто можа адкрыць агульны чат або дакумэнт; ня лічы спасылку аўтаматычна прыватнай.

##### Тлумачыць паўторную ідэнтыфікацыю па зьвестках

[explainDataReIdentification.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (be):** Патлумач, як зьвесткі, сабраныя асобна, могуць разам зноў выявіць асобу.

##### Распазнаваць асабістыя зьвесткі

[identifyPersonalData.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (be):** Вызначай інфармацыю, па якой можна пазнаць чалавека нават у спалучэньні зь іншымі дэталямі.

##### Распазнаваць лічбавы сьлед

[recognizeADigitalFootprint.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (be):** Зразумей, як допісы й дзеяньні ў сеціве могуць надоўга пакінуць запісы.

#### Сацыяльны й экалягічны ўплыў вылічальных тэхналёгіяў

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (be):** Дасьледуй, як вылічальныя тэхналёгіі ўплываюць на справядлівасьць, рэсурсы й асяродзьдзе.

##### Ацэньваць уплыў альгарытму на групы карыстальнікаў

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (be):** Вызначай, ці вынікі альгарытму несправядліва адрозьніваюцца для розных груп людзей.

##### Ацэньваць экалягічны ўплыў вылічальных тэхналёгіяў

[assessComputingsEnvironmentalImpact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (be):** Параўноўвай энэргазатраты, матэрыялы й электронныя адкіды ад вылічэньняў.

### Лічбавыя сыстэмы і сеткі

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (be):** Даведайся, як вылічальныя прылады, лічбавая інфармацыя й сеткі працуюць разам.

#### Кампанэнты лічбавых прыладаў

Skills: 3

[digitalDeviceComponents.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (be):** Дасьледуй, як апаратныя часткі й праграмнае забесьпячэньне выконваюць розныя вылічальныя задачы.

##### Адрозьніваць апаратнае й праграмнае забесьпячэньне

[distinguishHardwareFromSoftware.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (be):** Адрозьнівай фізычныя часткі кампутара ад праграмнага забесьпячэньня, якое імі кіруе.

##### Тлумачыць функцыю працэсара

[explainAProcessorsFunction.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (be):** Растлумач, як працэсар выконвае інструкцыі, а не захоўвае файлы ўвесь час.

##### Распазнаваць лічбавыя прылады

[identifyDigitalDevices.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (be):** Распазнавай прылады, якія апрацоўваюць праграмаваную лічбавую інфармацыю.

#### Памяць і захоўваньне зьвестак

Skills: 4

[memoryAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (be):** Даведайся пра асобныя функцыі часовай памяці, памяці прашыўкі й сховішча файлаў.

##### Адрозьніваць RAM, ROM і назапашвальнікі

[distinguishRAMROMAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (be):** Параўноўвай, якія зьвесткі прызначаныя захоўваць RAM, ROM і пастаянныя сховішчы.

##### Тлумачыць пастаяннае захоўваньне зьвестак

[explainPersistentStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (be):** Зразумей, чаму назапашвальнікі захоўваюць файлы нават пасьля выключэньня сілкаваньня.

##### Тлумачыць апэратыўную памяць (RAM)

[explainRAM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (be):** Дасьледуй, як апэратыўная памяць утрымлівае рабочыя зьвесткі падчас працы кампутара.

##### Тлумачыць прызначэньне ROM

[explainThePurposeOfROM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (be):** Распазнавай, як энэрганезалежная памяць прашыўкі дапамагае прыладам запускацца.

#### Сеткавыя мадэлі й пратаколы

Skills: 11

[networkModelsAndProtocols.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (be):** Даведайся, як сеткавыя пратаколы вызначаюць правілы перадачы інфармацыі.

##### Параўноўваць мэтады доступу да сеткі

[compareNetworkAccessMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (be):** Параўноўвай выяўленьне калізіяў, іх пазьбяганьне і перадачу маркера ў адпаведных асяродзьдзях.

##### Адрозьніваць HTTP ад HTTPS

[distinguishHTTPFromHTTPS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (be):** Даведайся, што абараняе HTTPS і чаму ён не гарантуе надзейнасьці самога сайту.

##### Адрозьніваць OSI ад TCP/IP

[distinguishOSIFromTCPIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (be):** Параўноўвай канцэптуальныя ўзроўні OSI са стэкам пратаколаў TCP/IP Інтэрнэту.

##### Адрозьніваць TCP ад UDP

[distinguishTCPFromUDP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (be):** Параўноўвай надзейныя патокі TCP з паведамленьнямі UDP, якія ня маюць такіх самых гарантыяў дастаўкі.

##### Тлумачыць сеткавы пратакол

[explainANetworkProtocol.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (be):** Растлумач, навошта прыладам узгодненыя правілы для абмену паведамленьнямі.

##### Тлумачыць CSMA/CA

[explainCSMACA.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (be):** Растлумач, як бяздротавыя прылады спрабуюць пазьбягаць перадачы праз заняты канал.

##### Тлумачыць CSMA/CD

[explainCSMACD.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (be):** Даведайся, чаму старым супольным сеткам Ethernet было патрэбнае выяўленьне калізіяў.

##### Тлумачыць DNS

[explainDNS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (be):** Растлумач, як DNS дапамагае знаходзіць сеткавыя адрасы паводле дамэнных імёнаў.

##### Тлумачыць узроўні OSI

[explainTheOSILayers.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (be):** Выкарыстоўвай сяміўзроўневую мадэль OSI, каб упарадкаваць сеткавыя функцыі.

##### Тлумачыць прызначэньне IP

[explainThePurposeOfIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (be):** Зразумей, як IP забясьпечвае адрасаваньне і перасыланьне пакетаў паміж сеткамі.

##### Тлумачыць Token Ring

[explainTokenRing.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (be):** Дасьледуй, як перадача маркера вызначае, якой прыладзе дазволена адпраўляць дадзеныя.

#### Сеткі

Skills: 4

[networks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (be):** Дасьледуй, як злучаныя прылады дасылаюць паведамленьні й супольна выкарыстоўваюць рэсурсы.

##### Адрозьніваць Інтэрнэт ад Сусьветнага павуціньня

[distinguishTheInternetFromTheWeb.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (be):** Адрозьнівай сеткавую інфраструктуру Інтэрнэту ад вэб-сайтаў Сусьветнага павуціньня.

##### Тлумачыць дастаўку паведамленьняў празь сетку

[explainNetworkMessageDelivery.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (be):** Прасачы, як паведамленьні праходзяць праз сеткавыя прылады да адрасата.

##### Тлумачыць прызначэньне кампутарнай сеткі

[explainThePurposeOfAComputerNetwork.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (be):** Растлумач, навошта сеткі злучаюць асобныя прылады дзеля абмену інфармацыяй.

##### Тлумачыць бяздротавую сувязь

[explainWirelessCommunication.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (be):** Дасьледуй, як бяздротавыя прылады абменьваюцца сыгналамі без наўпроставага кабэлю.

#### Сыстэмы зьлічэньня

Skills: 4

[numeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (be):** Даведайся, як лічбы запісваюцца лічбамі ў сыстэмах з рознымі асновамі.

##### Пераўтвараць паміж двайковай і дзесятковай сыстэмамі

[convertBetweenBinaryAndDecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (be):** Пераводзь невялікія лікі з двайковага запісу ў дзесятковы й наадварот.

##### Адрозьніваць двайковую і шаснаццатковую сыстэмы

[distinguishBinaryAndHexadecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (be):** Зразумей, чаму групы бітаў можна карацей запісаць у шаснаццатковай сыстэме.

##### Тлумачыць двайковую лёгіку кампутара

[explainComputerBinaryLogic.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (be):** Зьвязвай двайковыя нулі й адзінкі з рознымі распазнавальнымі станамі электронных сыгналаў.

##### Тлумачыць пазыцыйныя сыстэмы зьлічэньня

[explainPositionalNumeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (be):** Зразумей, чаму месца лічбы ў ліку зьмяняе яе значэньне.

#### Апэрацыйныя сыстэмы

Skills: 4

[operatingSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (be):** Дасьледуй, як апэрацыйныя сыстэмы кіруюць праграмамі, файламі й прыладамі.

##### Адрозьніваць сямействы апэрацыйных сыстэмаў

[distinguishOperatingSystemFamilies.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (be):** Распазнавай пашыраныя сямействы апэрацыйных сыстэмаў і іхныя адрозьненьні.

##### Тлумачыць працэс апэрацыйнай сыстэмы

[explainAnOSProcess.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (be):** Адрозьнівай запушчаны працэс ад файлу праграмы, які захоўваецца на дыску.

##### Тлумачыць прызначэньне апэрацыйнай сыстэмы

[explainAnOperatingSystemsPurpose.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (be):** Зразумей, як апэрацыйная сыстэма ўзгадняе працу праграмнага й апаратнага забесьпячэньня.

##### Тлумачыць ролю Лінуса Торвальдса ў Linux

[explainLinusTorvaldsRoleInLinux.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (be):** Даведайся, як узьнікла ядро Linux і чаму шмат распрацоўнікаў разам ствараюць апэрацыйныя сыстэмы.

#### Прадстаўленьне й захоўваньне

Skills: 4

[representationAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (be):** Даведайся, як прылады прадстаўляюць інфармацыю й упарадкоўваюць захаваныя файлы.

##### Параўноўваць памеры лічбавых файлаў

[compareDigitalFileSizes.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (be):** Параўноўвай памеры файлаў і тлумач уплыў фармату й сьцісканьня.

##### Адрозьніваць лічбавыя фарматы

[distinguishDigitalFormats.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (be):** Распазнавай, што фармат файлу вызначае, як тлумачыць захаваныя біты.

##### Тлумачыць двайковае прадстаўленьне

[explainBinaryRepresentation.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (be):** Зразумей, як пасьлядоўнасьці нулёў і адзінак кадуюць розныя віды зьвестак.

##### Упарадкоўваць файлы ў каталёгах

[organizeFilesInDirectories.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (be):** Разьмяшчай файлы ў зручных тэчках, каб знаходзіць іх паводле шляхоў.

#### Выкананьне задачаў

Skills: 3

[taskExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (be):** Дасьледуй розьніцу паміж задачамі, што прасоўваюцца па чарзе, і сапраўды адначасовай працай.

##### Разьмяркоўваць незалежныя задачы паміж выканаўцамі

[distributeIndependentTasksAcrossExecutors.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (be):** Плянуй, якія задачы могуць выконвацца адначасова, а якім трэба дачакацца іншых вынікаў.

##### Тлумачыць канкурэнтнае выкананьне

[explainConcurrentExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (be):** Зразумей, як некалькі задачаў могуць прасоўвацца наперад, не выконваючыся дакладна ў той самы момант.

##### Тлумачыць паралельнае выкананьне

[explainParallelExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (be):** Распазнавай, калі некалькі працэсараў сапраўды выконваюць працу адначасова.

### Git і адкрыты код

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (be):** Даведайся, як распрацоўнікі адсочваюць зьмены, супрацоўнічаюць і дзеляцца праграмамі з выразнымі дазволамі.

#### Супольная распрацоўка лічбавых прадуктаў

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (be):** Дасьледуй, як каманды арганізуюць унёскі, праверкі і вэрсіі праекту.

##### Каардынаваць зьмены ў супольным лічбавым праекце

[coordinateChangesInASharedDigitalProject.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (be):** Сплянуй, хто што зьмяняе і як будуць аб’ядноўвацца супольныя праўкі.

##### Тлумачыць правілы ўнёску

[explainContributionGuidelines.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (be):** Зразумей, чаму правілы ўнёску дапамагаюць людзям працаваць над агульным кодам.

##### Адсочваць вэрсіі лічбавага прадукту

[trackDigitalProductVersions.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (be):** Выкарыстоўвай гісторыю вэрсіяў, каб знайсьці час зьменаў або аднавіць ранейшую працу.

#### Кіраваньне вэрсіямі праз Git

Skills: 6

[gitVersionControl.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (be):** Даведайся, як Git запісвае вэрсіі і дапамагае камандам аб’ядноўваць зьмены.

##### Адрозьніваць лякальныя і аддаленыя рэпазыторыі

[distinguishLocalAndRemoteRepositories.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (be):** Адрозьнівай працу на сваім кампутары ад копіяў, пашыраных праз аддаленыя рэпазыторыі.

##### Тлумачыць галіну

[explainABranch.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (be):** Зразумей, як галіны дазваляюць распрацоўнікам працаваць над асобнымі кірункамі зьменаў.

##### Тлумачыць каміт

[explainACommit.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (be):** Распазнавай каміт як здымак стану з ідэнтыфікатарам, зьвязаны з папярэдняй гісторыяй.

##### Тлумачыць пул-рэквэст

[explainAPullRequest.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (be):** Даведайся, як пул-рэквэсты арганізуюць прапанаваныя зьмены для праверкі.

##### Тлумачыць рэпазыторый

[explainARepository.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (be):** Зразумей, што рэпазыторый зьмяшчае праект і гісторыю яго зьменаў.

##### Тлумачыць зьліцьцё галінаў

[explainBranchMerging.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (be):** Даведайся, як зьліваюць галіны і чаму часам даводзіцца вырашаць канфлікты.

#### Адкрыты код

Skills: 2

[openSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (be):** Даведайся, якія дазволы робяць праграму сапраўды адкрытай.

##### Адрозьніваць адкрыты код ад проста публічна бачнага коду

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (be):** Зразумей, што бачнасць зыходнага коду не робіць яго аўтаматычна адкрытым.

##### Тлумачыць адкрыты код

[explainOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (be):** Зразумей, як адкрытыя ліцэнзіі дазваляюць карыстацца праграмамі, зьмяняць і распаўсюджваць іх наноў.

### Гісторыя праграмаваньня

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (be):** Даведайся, як цягам гісторыі разьвіваліся ідэі праграмаваньня і вылічальныя машыны.

#### Ключавыя ўнёскі

Skills: 6

[keyContributions.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (be):** Дасьледуй важныя ўнёскі ў праграмаваньне, надзейнасьць праграмаў і кампутарныя сеткі.

##### Тлумачыць тэорыю вылічальнасьці

[explainComputabilityTheory.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (be):** Даведайся, як фармальныя мадэлі паказваюць, што кампутары могуць і ня могуць вылічыць.

##### Тлумачыць раньняе электроннае праграмаваньне

[explainEarlyElectronicProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (be):** Даведайся, як каманды першых электронных кампутараў стваралі й правяралі праграмы.

##### Тлумачыць разьвіцьцё кампілятараў

[explainTheDevelopmentOfCompilers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (be):** Даведайся, як кампілятары спрасьцілі напісаньне праграмаў зразумелымі мовамі.

##### Тлумачыць разьвіцьцё надзейнасьці праграмаў

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (be):** Зразумей, чаму апрацоўка памылак і надзейныя праграмы былі важныя для місіяў «Апалён».

##### Тлумачыць ліквідацыю сеткавых цыкляў

[explainTheEliminationOfNetworkLoops.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (be):** Даведайся, як пратакол Spanning Tree прадухіляе цыклі ў лякальных сетках.

##### Тлумачыць вытокі праграмаваньня

[explainTheOriginsOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (be):** Даведайся, як раньнія праекты машынаў і працы Ады Лаўлейс прадвызначылі праграмаваньне.

#### Машыны і крыптааналіз

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (be):** Даведайся, як машыны і матэматычныя мэтады дапамагалі гістарычнаму крыптааналізу.

##### Тлумачыць гістарычныя мэтады крыптааналізу

[explainHistoricalCryptanalysisMethods.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (be):** Даведайся, як крыптааналітыкі выкарыстоўвалі заканамернасьці і сыстэматычныя праверкі для ўзлому шыфраў.

##### Тлумачыць разьвіцьцё праграмаваных кампутараў

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (be):** Прасачы разьвіцьцё ад мэханічных вылічальных ідэяў да праграмаваных электронных машынаў.

##### Тлумачыць прызначэньне машыны Bombe

[explainThePurposeOfTheBombe.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (be):** Зразумей, як машына Bombe дапамагала правяраць магчымыя налады Enigma.

### Інфармацыя й зьвесткі

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (be):** Дасьледуй, як знаходзіць надзейную інфармацыю, упарадкоўваць зьвесткі й разважаць пра нявызначанасьць.

#### Збор і ўпарадкаваньне зьвестак

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (be):** Навучыся зьбіраць патрэбную інфармацыю й упарадкоўваць запісы, прыдатныя для параўнаньня.

##### Пасьлядоўна зьбіраць зьвесткі

[collectDataConsistently.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (be):** Зьбірай вымярэньні паводле аднолькавых правілаў і ў аднолькавых адзінках.

##### Групаваць зьвесткі паводле прыкметы

[groupDataByAttribute.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (be):** Групуй запісы паводле адной выразнай прыкметы.

##### Вызначаць патрэбныя для заданьня зьвесткі

[identifyDataNeededForATask.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (be):** Вырашай, якія палі й назіраньні сапраўды патрэбныя для пытаньня.

##### Падаваць зьвесткі ў табліцы

[presentDataInATable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (be):** Стварай табліцу з падпісанымі радкамі, слупкамі й узгодненымі значэньнямі.

#### Базы зьвестак

Skills: 5

[databases.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (be):** Даведайся, як базы зьвестак упарадкоўваюць запісы й зьвязваюць адпаведную інфармацыю.

##### Праектаваць простую схему базы зьвестак

[designASimpleDatabaseSchema.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (be):** Сплянуй простую базу зьвестак з адпаведнымі сутнасьцямі, палямі й сувязямі.

##### Адрозьніваць запісы ад палёў

[distinguishRecordsAndFields.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (be):** Адрозьнівай запіс ад палёў, што яго апісваюць.

##### Тлумачыць табліцу базы зьвестак

[explainADatabaseTable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (be):** Зразумей, як табліца захоўвае аднатыпныя запісы.

##### Тлумачыць першасныя ключы

[explainPrimaryKeys.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (be):** Растлумач, чаму кожны запіс патрабуе сталага ўнікальнага ключа.

##### Мадэляваць сувязі паміж табліцамі

[modelRelationshipsBetweenTables.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (be):** Зьвязвай інфармацыю з розных табліцаў праз ідэнтыфікатары.

#### Пошук і праверка інфармацыі

Skills: 4

[informationSearchAndVerification.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (be):** Навучыся шукаць доказы й правяраць, ці пацьвярджаюць яны цьверджаньне.

##### Параўноўваць крыніцы інфармацыі

[compareInformationSources.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (be):** Параўноўвай некалькі крыніц і вызначай, у чым іхныя паведамленьні разыходзяцца.

##### Адрозьніваць паведамленьні ад зьвестак

[distinguishMessagesFromData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (be):** Адрозьнівай запісанае значэньне ад сэнсу, які яму надае паведамленьне.

##### Сфармуляваць інфармацыйны запыт

[formulateAnInformationQuery.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (be):** Выбірай дакладныя пошукавыя словы паводле таго, што трэба знайсьці.

##### Правяраць цьверджаньне паводле крыніцы

[verifyAClaimAgainstASource.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (be):** Правярай цьверджаньні належнымі доказамі, а не паўторнымі запэўніваньнямі.

#### Імавернасьць і нявызначанасьць

Skills: 7

[probabilityAndUncertainty.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (be):** Дасьледуй магчымыя падзеі, іхныя шанцы й межы прадказаньня.

##### Параўноўваць імавернасьці простых падзеяў

[compareProbabilitiesOfSimpleEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (be):** Параўноўвай шанцы двух вынікаў пры аднолькавых дапушчэньнях.

##### Адрозьніваць магчымасьць ад імавернасьці

[distinguishPossibilityFromProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (be):** Зразумей, што падзея можа быць магчымай, але малаверагоднай.

##### Адрозьніваць выпадковыя й дэтэрмінаваныя падзеі

[distinguishRandomAndDeterministicEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (be):** Адрозьнівай вынікі, вызначаныя правілам, ад выпадкова абраных.

##### Тлумачыць магчымасьць падзеі

[explainEventPossibility.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (be):** Вызначай, ці можа вынік адбыцца пры зададзеных умовах.

##### Тлумачыць імавернасьць падзеі

[explainEventProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (be):** Ацэньвай шанец падзеі паводле вызначанай імавернаснай мадэлі.

##### Тлумачыць межы прадказаньня

[explainLimitsOfPrediction.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (be):** Растлумач, чаму веданьне імавернасьцяў не прадказвае выніку адной спробы.

##### Выкарыстоўваць выпадковасьць у мадэлі

[useRandomnessInAModel.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (be):** Дадавай у мадэль выпадковы выбар і вызначай магчымыя вынікі.

#### Статыстычнае дасьледаваньне

Skills: 4

[statisticalInvestigation.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (be):** Навучыся вывучаць зьвесткі з дапамогай дыяграмаў, частасьцяў і параўнаньняў.

##### Параўноўваць наборы назіраньняў

[compareSetsOfObservations.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (be):** Параўноўвай два наборы зьвестак за аднолькавымі паказьнікамі або катэгорыямі.

##### Будаваць простую дыяграму

[constructASimpleChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (be):** Стварай зразумелую дыяграму, што дакладна паказвае прапорцыі зьвестак.

##### Знаходзіць найбольш частае значэньне

[findTheMostFrequentValue.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (be):** Вызначай значэньне, якое сустракаецца ў наборы найчасьцей.

##### Чытаць дыяграму

[readAChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (be):** Чытай шкалы, подпісы й значэньні, не паддаючыся падманліваму паказу.

### Праграмаваньне

Groups: 8 · Skills: 37

[programming.data.ts](../../../learningApps/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (be):** Навучыся разумець, пісаць і тэставаць інструкцыі, якія выконвае кампутар.

#### Тыпы зьвестак і спасылкі

Skills: 6

[dataTypesAndReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (be):** Дасьледуй, як тыпы й спасылкі ўплываюць на значэньні, якія можа ўжываць праграма.

##### Адрозьніваць капіяваньне значэньняў ад супольных спасылак

[distinguishValueCopyingFromSharedReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (be):** Растлумач, калі дзьве зьменныя спасылаюцца на той самы аб'ект, а калі маюць незалежныя значэньні.

##### Адрозьніваць тыпы значэньняў

[distinguishValueTypes.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (be):** Вызначай, ці значэньне лікавае, тэкставае або лягічнае і якія дзеяньні зь ім магчымыя.

##### Тлумачыць кантракт тыпу зьвестак

[explainADataTypeContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (be):** Зразумей, значэньне якога тыпу чакае атрымаць функцыя праграмы.

##### Тлумачыць складаныя структуры зьвестак

[explainCompositeDataStructures.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (be):** Распазнавай сьпісы, масівы й запісы, якія ўпарадкоўваюць некалькі значэньняў.

##### Тлумачыць прымітыўныя значэньні ў мове

[explainPrimitiveValuesInALanguage.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (be):** Распазнавай простыя тыпы значэньняў, вызначаныя абранай мовай праграмаваньня.

##### Правяраць зьвесткі паводле кантракту

[validateDataAgainstAContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (be):** Перад выкарыстаньнем уваходных зьвестак правер, ці адпавядаюць яны патрэбнаму тыпу або структуры.

#### Функцыі і паўторнае выкарыстаньне

Skills: 5

[functionsAndReuse.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (be):** Навучыся аб'ядноўваць паўторна выкарыстоўваныя дзеяньні ў функцыі.

##### Выклікаць функцыю з аргумэнтамі

[callAFunctionWithArguments.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (be):** Выклікай функцыю з аргумэнтамі й прасочвай, як яны выкарыстоўваюцца.

##### Вызначаць функцыю з парамэтрамі

[defineAFunctionWithParameters.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (be):** Напішы функцыю, якая прымае парамэтры замест фіксаваных значэньняў прыкладу.

##### Тлумачыць рэкурсію

[explainRecursion.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (be):** Зразумей, як рэкурсіўная функцыя разьвязвае меншыя выпадкі й урэшце завяршаецца.

##### Тлумачыць прызначэньне функцыі

[explainThePurposeOfAFunction.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (be):** Растлумач, як названая функцыя выконвае дзеяньне падчас выкліку.

##### Выкарыстоўваць значэньне, якое вяртае функцыя

[useAFunctionsReturnValue.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (be):** Ужывай вернуты вынік у далейшых вылічэньнях, а ня толькі выводзь яго.

#### Зьвесткі праграмы

Skills: 3

[programData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (be):** Працуй са значэньнямі й станам, што зьмяняецца падчас выкананьня праграмы.

##### Абнаўляць стан праграмы

[updateProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (be):** Зьмяняй захаваны стан праграмы адпаведна таму, што адбылося раней.

##### Выкарыстоўваць зьменную

[useAVariable.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (be):** Захоўвай значэньне пад назвай зьменнай і счытвай яго пры патрэбе.

##### Выкарыстоўваць уваходныя зьвесткі

[useInputData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (be):** Выкарыстоўвай інфармацыю звонку праграмы, каб вызначаць яе паводзіны.

#### Структура й сынтаксіс праграмы

Skills: 4

[programStructureAndSyntax.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (be):** Даведайся, як мовы праграмаваньня арганізоўваюць ключавыя словы, выразы і блёкі.

##### Адрозьніваць ключавыя словы ад ідэнтыфікатараў

[distinguishKeywordsFromIdentifiers.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (be):** Адрозьнівай зарэзэрваваныя словы мовы ад назваў, абраных праграмістамі.

##### Адрозьніваць апэратары, выразы і інструкцыі

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (be):** Распазнавай розьніцу паміж апэратарамі, выразамі й інструкцыямі.

##### Тлумачыць межы блёку інструкцыяў

[explainStatementBlockBoundaries.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (be):** Вызначай, якія каманды належаць да цыклю, функцыі або ўмоўнага блёку.

##### Тлумачыць падсьветку сынтаксісу

[explainSyntaxHighlighting.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (be):** Зразумей, што дапамагае заўважыць падсьветка коду й чаго яна не даказвае.

#### Праграмныя канструкцыі

Skills: 7

[programmingConstructs.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (be):** Навучыся кіраваць праграмай з дапамогай пасьлядоўнасьцяў, умоваў, цыкляў і падзеяў.

##### Выяўляць бясконцы цыкль

[detectAnInfiniteLoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (be):** Знайдзі цыкль, які не завяршаецца, бо яго ўмова ніколі ня робіцца хібнай.

##### Апрацоўваць падзею

[handleAnEvent.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (be):** Зрабі так, каб праграма рэагавала на націск кнопкі, паведамленьне ці іншую падзею.

##### Рэалізоўваць цыкль

[implementALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (be):** Выкарыстоўвай цыклі, каб паўтараць каманды да выкананьня правільнай умовы спыненьня.

##### Рэалізоўваць умоўныя дзеяньні

[implementConditionalBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (be):** Зрабі так, каб праграма абірала розныя дзеяньні залежна ад умоваў.

##### Выносіць нязьменныя вылічэньні за межы цыклю

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (be):** Перамяшчай за межы цыклю вылічэньні, вынікі якіх не зьмяняюцца пры паўторах.

##### Упарадкоўваць праверкі ўмоваў, што перакрываюцца

[orderOverlappingConditionalChecks.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (be):** Разьмяшчай праверкі ўмоваў так, каб адмысловыя выпадкі заставаліся дасяжнымі.

##### Запісваць пасьлядоўнасьць камандаў

[writeASequenceOfCommands.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (be):** Пішы карэктныя каманды, якія выконваюць дзеяньні ў патрэбным парадку.

#### Парадыгмы праграмаваньня

Skills: 4

[programmingParadigms.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (be):** Даведайся пра розныя спосабы арганізацыі лёгікі й паводзінаў праграмы.

##### Адрозьніваць імпэратыўны і дэкляратыўны падыходы

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (be):** Параўноўвай канкрэтныя каманды з апісаньнем жаданага выніку.

##### Тлумачыць функцыянальнае праграмаваньне

[explainFunctionalProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (be):** Зразумей праграмы, што ператвараюць значэньні праз спалучэньне функцыяў.

##### Тлумачыць аб'ектна-арыентаванае праграмаваньне

[explainObjectOrientedProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (be):** Дасьледуй праграмы, складзеныя з узаемадзейных аб'ектаў са станам і паводзінамі.

##### Тлумачыць працэдурнае праграмаваньне

[explainProceduralProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (be):** Дасьледуй праграмы, пабудаваныя вакол пасьлядоўных пакрокавых працэдураў.

#### Чытаньне праграмаў

Skills: 4

[readingPrograms.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (be):** Даведайся, як чытаць праграму й прасочваць яе працу.

##### Тлумачыць прызначэньне каманды

[explainACommandsPurpose.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (be):** Растлумач, як асобная каманда праграмаваньня зьмяняе стан праграмы.

##### Прагназаваць наступствы парадку выкананьня

[predictConsequencesOfExecutionOrder.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (be):** Растлумач, чаму зьмена парадку камандаў можа зьмяніць вынік.

##### Прагназаваць вывад праграмы

[predictProgramOutput.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (be):** Вызнач, які бачны вынік выдасьць праграма для зададзеных уваходных зьвестак.

##### Адсочваць стан праграмы

[traceProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (be):** Сачы за зьменамі зьменных і іншых значэньняў падчас выкананьня праграмы.

#### Тэставаньне й адладка

Skills: 4

[testingAndDebugging.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (be):** Даведайся, як знаходзіць, тлумачыць і выпраўляць памылкі ў праграмах.

##### Выяўляць няправільныя паводзіны праграмы

[detectIncorrectProgramBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (be):** Распазнавай, калі праца праграмы не адпавядае патрабаваньням.

##### Выпраўляць дэфэкт праграмы

[fixAProgramDefect.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (be):** Выпраў канкрэтны дэфэкт і правер, ці захавалася патрэбная праца праграмы.

##### Знаходзіць прычыну памылкі

[locateTheCauseOfAnError.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (be):** Прасачы памылку да каманды ці ўмовы, якая яе выклікае.

##### Тэставаць праграму з рознымі ўваходнымі зьвесткамі

[testAProgramWithDifferentInputs.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (be):** Правярай праграму на розных уваходных зьвестках, у тым ліку на межавых выпадках.

### Робататэхніка і аўтаматызацыя

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (be):** Дасьледуй, як датчыкі, праграмаваньне й выканаўчыя мэханізмы дапамагаюць робатам рэагаваць на асяродзьдзе.

#### Кіраваньне робатам

Skills: 4

[robotControl.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (be):** Стварай і ўдасканальвай каманды для рухаў і рэакцыяў робата.

##### Наладжваць паўторнае дзеяньне робата

[configureARepeatedRobotAction.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (be):** Вызначай, колькі разоў робат паўторыць дзеяньне або калі спыніцца.

##### Ствараць пасьлядоўнасьць рухаў робата

[createARobotMovementSequence.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (be):** Плянуй упарадкаваныя каманды, што прывядуць робата да мэты.

##### Адладжваць паводзіны робата

[debugRobotBehavior.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (be):** Знаходзь прычыну нечаканых паводзінаў у датчыку, лёгіцы кіраваньня або дзеяньні.

##### Рэалізоўваць рэакцыю робата на перашкоду

[implementRobotObstacleResponse.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (be):** Наладжвай спыненьне, паварот або абыход, калі датчык выяўляе перашкоду.

#### Кампанэнты робататэхнічнай сыстэмы

Skills: 4

[roboticSystemComponents.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (be):** Даведайся, як робат выяўляе ўмовы, выбірае дзеяньні й дзейнічае.

##### Вызначаць кантролер робата

[identifyARobotController.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (be):** Распазнавай кантролер, які ператварае сыгналы датчыкаў у запраграмаваныя дзеяньні.

##### Вызначаць прызначэньне датчыка

[identifyASensorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (be):** Распазнавай датчыкі, што вымяраюць асьветленасьць, адлегласьць, тэмпэратуру ды іншыя велічыні.

##### Вызначаць прызначэньне выканаўчага мэханізму

[identifyAnActuatorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (be):** Патлумач, як рухавікі, лямпы й іншыя выканаўчыя прылады выконваюць каманды.

##### Мадэляваць сувязь паміж датчыкам і дзеяньнем

[modelTheSensorToActionRelationship.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (be):** Зьвязвай вымярэньне датчыка, правіла прыняцьця рашэньня й рэакцыю выканаўчага мэханізму.

### Архітэктура праграмнага забесьпячэньня

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (be):** Дасьледуй, як аб’екты, адказнасьці й залежнасьці дапамагаюць ствараць надзейныя праграмы.

#### Прынцыпы праектаваньня

Skills: 8

[designPrinciples.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (be):** Вывучай прынцыпы, што робяць праграмы зразумелымі й прыстасавальнымі.

##### Адкладаць непатрэбныя функцыі (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (be):** Не стварай функцыі толькі дзеля ўяўных будучых патрэбаў.

##### Праектаваць залежнасьці ад кантрактаў (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (be):** Аддзяляй бізнэс-лёгіку ад канкрэтных сэрвісаў, абапіраючыся на кантракты.

##### Пашыраць паводзіны безь зьмены ядра (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (be):** Праектуй пункты пашырэньня для новых паводзінаў без перапісваньня стабільнай асноўнай лёгікі.

##### Выяўляць залішняе дубляваньне (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (be):** Знаходзь паўторныя правілы, якія могуць спрычыніць няўзгодненыя будучыя зьмены.

##### Аддзяляць адзіную адказнасьць (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (be):** Арганізуй модуль вакол адной узгодненай прычыны для зьменаў.

##### Зьмяншаць залішнюю складанасьць (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (be):** Спрашчай праграму, прыбіраючы мэханізмы, не апраўданыя патрабаваньнямі.

##### Аддзяляць вузкія інтэрфэйсы (ISP)

[separateNarrowInterfacesISP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (be):** Рабі інтэрфэйсы дастаткова вузкімі, каб кліентам былі патрэбныя толькі выкарыстаныя апэрацыі.

##### Правяраць узаемазамяняльнасьць (LSP)

[verifySubstitutabilityLSP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (be):** Правярай, ці рэалізацыя выконвае абяцаньні супольнага кантракту.

#### Аб’ектная мадэль

Skills: 13

[objectModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (be):** Даведайся, як праграмныя аб’екты спалучаюць свой стан і паводзіны.

##### Ужываць абстракцыю аб’ектаў

[applyObjectAbstraction.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (be):** Выбірай істотныя апэрацыі, якія кампанэнт павінен адкрываць карыстальнікам.

##### Адрозьніваць клясу ад аб’екта

[distinguishAClassFromAnObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (be):** Адрозьнівай шаблён клясы ад аб’ектаў, кожны зь якіх мае ўласныя бягучыя значэньні.

##### Адрозьніваць сапраўдны аб’ект ад яго абстрактнай мадэлі

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (be):** Зразумей, што праграмная мадэль адлюстроўвае толькі абраныя рысы рэчы.

##### Тлумачыць мэтад аб’екта

[explainAnObjectMethod.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (be):** Растлумач, як выклік мэтаду можа прачытаць або зьмяніць стан аб’екта.

##### Тлумачыць уласьцівасьць аб’екта

[explainAnObjectProperty.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (be):** Адрозьнівай захаваную ўласьцівасьць ад апэрацый, якія аб’ект можа выконваць.

##### Тлумачыць інкапсуляцыю

[explainEncapsulation.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (be):** Зразумей, як аб’екты абараняюць унутраны стан з дапамогай кантраляваных мэтадаў.

##### Тлумачыць успадкаваньне

[explainInheritance.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (be):** Растлумач, як спэцыялізаваная кляса можа ўспадкоўваць паводзіны агульнейшай клясы.

##### Тлумачыць палімарфізм

[explainPolymorphism.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (be):** Даведайся, як розныя аб’екты могуць выконваць адну апэрацыю рознымі спосабамі.

##### Тлумачыць паняцьце клясы

[explainTheConceptOfAClass.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (be):** Разумей клясу як вызначэньне, паводле якога ствараюць асобныя аб’екты.

##### Тлумачыць будову праграмнага аб’екта

[explainTheStructureOfASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (be):** Вызначай ідэнтычнасьць, уласьцівасьці й мэтады наяўнага праграмнага аб’екта.

##### Вызначаць стан і паводзіны аб’екта

[identifyAnObjectsStateAndBehavior.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (be):** Апісвай характарыстыкі аб’екта й дзеяньні, якія ён можа выконваць.

##### Мадэляваць сутнасьць прадметнай вобласьці як праграмны аб’ект

[modelADomainEntityAsASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (be):** Спраектуй карысны аб’ект, выбіраючы істотныя ўласьцівасьці й апэрацыі.

##### Мадэляваць кампазыцыю аб’ектаў

[modelObjectComposition.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (be):** Стварай большыя праграмныя аб’екты з меншых частак з рознымі адказнасьцямі.

