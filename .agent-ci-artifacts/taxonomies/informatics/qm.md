<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (qm)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### Algoritmler

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../learningApps/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (qm):** Meselelerni çezmek içün tekrarlana bilgen usullarnı qurmaqnı, qullanmaqnı ve teñeştirmekni ögren.

#### Talil

Skills: 3

[analysis.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (qm):** Algoritmniñ vaqıt ve hafiza ihtiyacı kirgen malümatqa köre nasıl deñişkenini ögren.

##### Doğrusal ve logarifmik artışnı ayırmaq

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (qm):** Kirgen malümat ölçüsüne nisbeten artışnı tekrardan ekige bölüv artışınen teñeştir.

##### Algoritmniñ eñ yaman alını esaplamaq

[estimateAnAlgorithmsWorstCase.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (qm):** Eñ yaman alda algoritmge eñ çoq qaç teşkerüv kerek olacağını esapla.

##### Vaqıt ve hafiza arasında muvazene añlatmaq

[explainTimeMemoryTradeOffs.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (qm):** Tez algoritmlerge niçün daa çoq muvaqqat hafiza kerek ola bilgenini añla.

#### Toplamlarnı işlemek

Skills: 4

[collectionProcessing.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (qm):** Malümatnı közden keçirgende saymaqnı, toplamaqni ve eñ büyük ya da kiçik qıymetni tapmaqnı ögren.

##### Unsurlarnı saymaqnı qullanmaq

[applyElementCounting.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (qm):** Belgilengen şartqa uyğun kelgen toplam unsurlarını say.

##### Eñ büyük qıymetni tapmaq

[applyMaximumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (qm):** Toplamnı közden keçirgende şimdigece tapılğan eñ büyük qıymetni saqla.

##### Eñ kiçik qıymetni tapmaq

[applyMinimumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (qm):** Toplamnı közden keçirgende şimdigece tapılğan eñ kiçik qıymetni saqla.

##### Cemni biriktirmek

[applySumAccumulation.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (qm):** Toplam qıymetlerini nevbetinen birikgen cemge qoş.

#### Quruv

Skills: 6

[construction.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (qm):** Algoritmniñ amellerini, şartlarını ve toqtav qaidesini belgilemekni ögren.

##### Algoritmlerni taleplerge köre teñeştirmek

[compareAlgorithmsAgainstRequirements.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (qm):** Mümkün algoritmlerni şartları ve sıñırları boyunca teñeştir.

##### Sıralı algoritm qurmaq

[constructASequentialAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (qm):** Doğru tertipte yapılğan sıñırlı adımlar sırasını añlat.

##### Algoritmniñ maqsadını belgilemek

[defineAnAlgorithmsGoal.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (qm):** Algoritm nege irişmeli ve qanday kirgen malümatnı qabul etkenini ayt.

##### Şartlı tarmaqlanmanı tasarlamaq

[designConditionalBranching.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (qm):** Algoritmniñ çeşit yollarını açık şartlarğa köre planlaştır.

##### Tekrarlavnı tasarlamaq

[designRepetition.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (qm):** Doğru deñişiklikler ve toqtav şartı olğan tekrarlav usulını qur.

##### Rekursiv algoritmni qullanmaq

[implementARecursiveAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (qm):** Kiçilegen alt meseleler ve tamamlayıcı esas al olğan rekursiv algoritm qur.

#### Qıdıruv

Skills: 6

[search.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (qm):** Çeşit qıdıruv usulları toplamda unsurnı nasıl tapqanını ögren.

##### Ekilik qıdıruvnı qullanmaq

[applyBinarySearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (qm):** Sıralanğan malümatta er sefer yarısını çıqarıp qıymetni tap.

##### Ekilik qıdıruv tereğinde qıdırmaq

[applyBinaryTreeSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (qm):** Anahtarnı tapmaq içün ekilik qıdıruv tereğiniñ tertipli dallarından bar.

##### Doğrusal qıdıruvnı qullanmaq

[applyLinearSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (qm):** Unsurlarnı bir-bir teşkerip maqsadnı tap.

##### Qıdıruv usullarını teşkerüv sayısına köre teñeştirmek

[compareSearchMethodsByCheckCount.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (qm):** Doğrusal ve ekilik qıdıruv içün kerek teşkerüv sayısını teñeştir.

##### Ekilik qıdıruvnıñ şartlarını belgilemek

[identifyBinarySearchPrerequisites.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (qm):** Malümatnıñ ekilik qıdıruv içün kerek tertipte olğanını teşker.

##### Qıdıruv miqyasınıñ artışını tahmin etmek

[predictSearchScaling.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (qm):** Malümat eki qat artqanda ekilik qıdıruvğa niçün taqriben bir teşkerüv qoşulğanını añla.

#### Sıralav

Skills: 4

[sorting.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (qm):** Sıralav usulları qıymetlerni saylanğan tertipte nasıl yerleştiregenini ögren.

##### Pufakçıqlı sıralavnı qullanmaq

[applyBubbleSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (qm):** Yañlış tertipte olğan qomşu qıymetlerni yer deñiştirip sırala.

##### Qoşuvnen sıralavnı qullanmaq

[applyInsertionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (qm):** Er yañı unsurnı evelden sıralanğan bölükke qoyıp sırala.

##### Saylavnen sıralavnı qullanmaq

[applySelectionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (qm):** Qalğanlar arasından eñ kiçik unsurnı saylap sırala.

##### Sıralav ölçüsini añlatmaq

[explainASortingCriterion.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (qm):** Toplamnı sıralamaq içün qıymetni ya da hususiyetni sayla.

### Suniy intellekt

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (qm):** Suniy intellekt sistemaları nasıl ögrenip, evelden aytıp, yañı malümat yaratqanını ve bazan neden yañlışqanını araştır.

#### Suniy intellekt esasları

Skills: 6

[aIFundamentals.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (qm):** Programmalanğan qaide, ögretilgen model ve suniy intellekt vazifeleriniñ farqını araştır.

##### Suniy intellekt vazifelerini tasnif etmek

[classifyAITasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (qm):** Suniy intellekt vazifesi sınıflağanını, evelden aytqanını ya da yañı içerik yaratqanını tanı.

##### Qaidelerni ögretilgen modellerden ayırmaq

[distinguishRulesFromTrainedModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (qm):** Açıqça programmalanğan qarar qaidelerini malümatnen ögretilgen sistemalardan ayır.

##### Yaratıcı suniy intellektni añlatmaq

[explainGenerativeAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (qm):** Yaratıcı modeller metin, resim ya da başqa içerikni nasıl yarata bilgenini añla.

##### Misallerden ögrenüvni añlatmaq

[explainLearningFromExamples.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (qm):** Misaller modelge yañı kirgen malümatnen daa yahşı çalışmağa nasıl yardım etkenini añlat.

##### Evelden aytqan suniy intellektni añlatmaq

[explainPredictiveAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (qm):** Tahmin etici sistemalar qıymetlerni, sınıflarnı ve adiselerniñ olma ihtimalını nasıl esaplağanını araştır.

##### Suniy intellektniñ mümkün olğan hatasını tanımaq

[identifyAPotentialAIError.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (qm):** Suniy intellekt cevabını başqa menbadan teşkermek kerek olğanını köstergen işaretlerni tanı.

#### Taqlit ve añlav

Skills: 2

[imitationAndUnderstanding.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (qm):** İnandırıcı taqlit etüv ile aqiqiy añlav arasındaki farqnı araştır.

##### Searle'niñ «Çin odası»nı añlatmaq

[explainSearlesChineseRoom.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (qm):** «Çin odası» fikir tecribesini ve onıñ doğurğan münakaşasını araştır.

##### Turing sınavını añlatmaq

[explainTheTuringTest.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (qm):** Turing sınavı neni teşkerip, neni isbatlayamağanını añla.

#### Til modelleriniñ tokenleri ve konteksti

Skills: 6

[languageModelTokensAndContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (qm):** Til modelleri metinni tokenlerge nasıl bölgenini ve kontekstten nasıl faydalanğanını ögren.

##### Eñ ihtimallı token saylavını tasadufiy saylavdan ayırmaq

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (qm):** Eñ ihtimallı tokenni saylavnen başga mümkün devamlar arasından ihtimalğa köre saylavnı qıyasla.

##### Tokenlerni, ariflerni ve sözlerni ayırmaq

[distinguishTokensCharactersAndWords.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (qm):** Arifler, sözler ve tokenler bir şey olmağanını añla.

##### Til modeliniñ kontekst penceresini añlatmaq

[explainALanguageModelsContextWindow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (qm):** Til modeli neden faqat sıñırlı miqdarda kontekst qullana bilgenini añla.

##### Kontekst penceresiniñ sıñırından aşılmasını añlatmaq

[explainContextWindowOverflow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (qm):** Sorav modelniñ kontekst sıñırından aşqanda ne ola bilgenini araştır.

##### Nevbetteki token saylavını añlatmaq

[explainNextTokenSelection.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (qm):** Til modelleri kontekstke köre nevbetteki mümkün tokenni nasıl saylağanını añlat.

##### Tokenlerni añlatmaq

[explainTokens.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (qm):** Tokenni modelge köre belgilengän metin parçası olaraq añla.

#### Model arhitekturaları ve resurslar

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (qm):** Suniy intellekt modelleriniñ çeşit türlü qurulışı neticelerge ve resurs ihtiyacına nasıl tesir etkenini araştır.

##### Vazife içün model saylamaq

[chooseAModelForATask.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (qm):** Modelni vazifeniñ keyfiyetine, süratine, fiyatına, mahremiyetine ve bar olğan hafizağa köre sayla.

##### Tığız ve ekspertler qarışımı modellerini qıyaslamaq

[compareDenseAndMoEModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (qm):** Çoq parameterni faalleştirilgen modellernen saylanğan ekspertlerni qullanğan modellerni qıyasla.

##### Modellerniñ hafiza ihtiyacını qıyaslamaq

[compareModelMemoryRequirements.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (qm):** Model fayllarını saqlamaq içün degil, modelni işletmek içün ne qadar hafiza kerek olğanını esapla.

##### Cevap gecikmesini qıyaslamaq

[compareResponseLatency.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (qm):** Suniy intellekt cevabınıñ başlanuvına qadar beklevni soñraki yaratuv süratinden ayrı qıyasla.

##### Kvantizatsiyanı añlatmaq

[explainQuantization.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (qm):** Sayılar anıqlığını azlaştırmaq hafizanı nasıl iqtisat etkenini, amma netice keyfiyetini deñiştire bilgenini añla.

#### Suniy intellektke sorav yazuv

Skills: 7

[prompting.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (qm):** Suniy intellekt sistemalarına daa açıq talimat, kontekst ve sıñırlavlar bermege ögren.

##### Mürekkep soravnı kiçik vazifelerge bölmek

[breakAComplexPromptIntoSubtasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (qm):** Mürekkep istekni neticesi teşkerile bilgen kiçik adımlarğa böl.

##### Soravğa kontekst qoşmaq

[providePromptContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (qm):** Suniy intellekt senden ne istenilgenini añlasın dep kerekli malümatnı ber.

##### Neticelerge köre soravnı yahşılaştırmaq

[refineAPromptBasedOnResults.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (qm):** Evvelki cevapta ne eksik olğanını teşkerip, suniy intellektke soravnı yahşılaştır.

##### Suniy intellekt soravınıñ maqsadını belgilemek

[specifyAPromptObjective.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (qm):** Suniy intellekt yardımcısı qaysı vazifeni yerine ketirmesi kerekligini anıq ayt.

##### Soravda rolni belgilemek

[specifyARoleInAPrompt.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (qm):** Faydalı baqış ya da uslûp belgile, amma bunı aqiqiy mütehassıslıqnen qarıştırma.

##### Cevap formatını belgilemek

[specifyAnOutputFormat.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (qm):** Cevapnı cedvel ya da belli sahalar şeklinde açıkça isteme.

##### Soravnıñ sıñırlarını belgilemek

[specifyPromptConstraints.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (qm):** Cevapnıñ uzunlığını, menbalarnı ve uydurmağa olmaz olğan malümatnı belgile.

#### Suniy intellektniñ işançlılığı ve mesuliyetli qullanıluvı

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (qm):** Suniy intellektniñ neticelerini nasıl teşkermege ve insanlarğa tesirini esapqa almağa ögren.

##### Suniy intellekt yardımınen alınğan qararlarda insan mesuliyetini añlatmaq

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (qm):** Suniy intellekt yardım etse bile, qararlar içün insanlar neden mesul qalğanını añla.

##### Soravlarda şahsiy malümatnı qorumaq

[protectPersonalDataInPrompts.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (qm):** Suniy intellektke sorav yollamaazdan evvel kerek olmağan şahsiy malümatnı çıqar.

##### Suniy intellektniñ tarafkârlıq havflarını tanımaq

[recognizeAIBiasRisks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (qm):** Suniy intellekt sistemaları insanlarğa ya da gruppalarğa adaletsiz yanaşa bilgen vaziyetlerni tanı.

##### Suniy intellekt cevabındaki faktlarnı teşkermek

[verifyFactsInAnAIResponse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (qm):** Suniy intellekt cevabındaki iddialarnı işançlı ve müstakil menbalarnen teşker.

#### Suniy intellektnen havfsız muamele

Skills: 4

[safeInteractionWithAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (qm):** Suniy intellekt tavsiyelerini yañlış köstere bilgen ya da aşırı bağlılıq peyda ete bilgen sohbet yollarını tanı.

##### Suniy intellektke aşırı bağlanmanıñ havflarını añlatmaq

[explainRisksOfOverrelianceOnAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (qm):** Suniy intellekt müstakil fikirleşüvni ya da insan yardımını neden almaştırmaması kerekligini añla.

##### Suniy intellektke kirgen işançsız talimatlarnı tanımaq

[identifyUntrustedInstructionsInAIInput.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (qm):** Tışqı malümatta gizlengen ve yardımcını idare etmemesi kerek talimatlarnı tanı.

##### Suniy intellektni qullanğanda sırlarnı qorumaq

[protectSecretsWhenUsingAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (qm):** Suniy intellektnen çalışqanda parol, irişüv anahtarları ve mahfiy malümatnı qorı.

##### Suniy intellektniñ yaranmasını tanımaq

[recognizeAISycophancy.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (qm):** Suniy intellektniñ delilsiz tasdiq etkenini ya da maqtavlarını tanı.

### Esaplav fikirlemesi

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (qm):** Mürekkep meselelerni añlayışlı adımlarğa, qanunlıqlıqlarğa ve qaidelerge nasıl bölmek mümkün olğanını ögren.

#### Parçalarğa bölüv ve soyutlav

Skills: 4

[decompositionAndAbstraction.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (qm):** Meseleniñ esas parçalarını ve bağlarını tapıp onı nasıl qolaylaştırmaq mümkün olğanını ögren.

##### Sistemanıñ soyut modelini qurmaq

[buildAnAbstractSystemModel.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (qm):** Mürekkep vaziyetni ya da sistemanı añlatqan sadeleştirilgen modelni qur.

##### Meseleni parçalarğa bölmek

[decomposeAProblem.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (qm):** Büyük meseleni ayrı-ayrı çözülebilgen kiçik vazifelerge böl.

##### Tekrarlanağan usulnı umumileştirmek

[generalizeARepeatedMethod.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (qm):** Bir qaç ayrı meselede qaytadan qullanılğan ortaq usulnı tap.

##### Obyektniñ esas hususiyetlerini belgilemek

[identifyEssentialObjectProperties.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (qm):** Vazife içün müim tafsilâtnı sayla, alâqasız şeylerni bir yaqqa qoy.

#### Mantıq ve qanunlıqlıqlar

Skills: 8

[logicAndPatterns.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (qm):** Qaideler, qanunlıqlıqlar ve mantıqiy şartlar meselelerni çözmege nasıl yardım etkenini ögren.

##### Mantıqiy VE amelini qullanmaq

[applyLogicalAND.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (qm):** Eki şartnıñ da yerine ketirilgenini VE yardımınen teşker.

##### Mantıqiy DEGİL amelini qullanmaq

[applyLogicalNOT.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (qm):** Bir şartnıñ aqiqat qıymetini tersine çevirüv içün DEGİL qullan.

##### Mantıqiy YA DA amelini qullanmaq

[applyLogicalOR.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (qm):** Eki şarttan eñ az biriniñ yerine ketirilgenini YA DA yardımınen teşker.

##### Bir-birine zid qaidelerni tapmaq

[detectContradictoryRules.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (qm):** Eki talapnıñ bir vaqıtta doğru ola almağan vaziyetini tanı.

##### Sade şartnı baalamaq

[evaluateASimpleCondition.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (qm):** Bir şartnıñ doğru, yañlış ya da şimdilik belgilenip olmağanını qararlaştır.

##### Qarmaşıq mantıqiy ifadelerge qıymet biçmek

[evaluateCompoundLogicalExpressions.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (qm):** Bir qaç amel işareti olğan mantıqiy ifadelerni doğru sıra ile esapla.

##### Qaidege köre neticeni aldından aytmaq

[predictAnOutcomeFromARule.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (qm):** Qaide ve başlangıç alı belli olğanda soñra ne olacağını tap.

##### Qanunlıqlıqqa añlap yetmek

[recognizeAPattern.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (qm):** Sıralarda qanunlıqlıqlarnı tanı ve teklif etilgen qaideniñ uyğunnı teşker.

### Malümat yapıları

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (qm):** Toplamlar, anahtarlar, terekler ve şebekeler çeşit ameller içün malümatnı nasıl tertip etkenini ögren.

#### Lüğatlar

Skills: 3

[dictionaries.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (qm):** Lüğatlar tekralanmaz anahtarlarnı saqlanğan qıymetlernen nasıl bağlağanını ögren.

##### Lüğatnıñ quruluşını añlatmaq

[explainDictionaryStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (qm):** Lüğatnıñ malümatnı yerine köre degil, anahtarına köre nasıl tapqanını añla.

##### Lüğattan qıymetni anahtarğa köre almaq

[retrieveADictionaryValueByKey.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (qm):** Lüğatta qıymetni anahtarğa köre tap ve anahtar olmağan alda ne yapmaq kerekligini bil.

##### Lüğatta qıymetni yañartmaq

[updateADictionaryValue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (qm):** Lüğatta evelden olğan anahtar astında saqlanğan qıymetni deñiştir.

#### Graflar

Skills: 6

[graphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (qm):** Graflarnıñ yerlerni, şeylerni ve olarnıñ arasındaki bağlarnı nasıl köstergenini ögren.

##### Yöneltilgen ve yöneltilmegen graflarnı ayırmaq

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (qm):** Bağlarnıñ bir yönlü yaki eki yönlü olğanını belgile.

##### Tereklerni döngüli graflardan ayırmaq

[distinguishTreesFromGraphsWithCycles.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (qm):** Graflarda döngüler ola bile, amma tereklerde niçün olmağanını añla.

##### Ağırlıqlı ve ağırlıqsız graflarnı ayırmaq

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (qm):** Grafnıñ qıralarında mesafe yaki masraf kibi sayılar olğanını tanı.

##### Grafnıñ quruluşını añlatmaq

[explainGraphStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (qm):** Grafnıñ töpelerini ve olarnı birleştirgen qıralarnı tanı.

##### Grafta yol tapmaq

[findAPathInAGraph.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (qm):** Bağlarnıñ yönüni köz ögünde tutıp, töpeler arasında doğru yoldan bar.

##### Qomşu töpelerni belgilemek

[identifyAdjacentVertices.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (qm):** Başqa bir töpege doğrudan bağlanğan töpelerni belgile.

#### Nevbet

Skills: 3

[queue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (qm):** Nevbetniñ unsurlarnı kelgen tertibinen nasıl işlegenini ögren.

##### Nevbetten unsur çıqarmaq

[dequeueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (qm):** Qalğanlarınıñ tertibini bozmadan nevbetniñ başındaki unsurnı çıqar.

##### Nevbetke unsur qoşmaq

[enqueueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (qm):** Nevbetniñ soñuna yañı unsur qoş.

##### FIFO printsipini añlatmaq

[explainFIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (qm):** Nevbetke birinci kirgen unsur niçün birinci çıqqanını añlat.

#### Sıralamalar

Skills: 7

[sequences.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (qm):** Tertipli toplamlarğa erişmekni, unsur qoşmaqnı ve çıqarmaqnı ögren.

##### Sıralama unsurına indeks ile erişmek

[accessASequenceElementByIndex.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (qm):** Unsurı indeksine köre, doğru yerlerniñ sıñırından çıqmay al.

##### Massivlerni bağlı cedvellerden ayırmaq

[distinguishArraysFromLinkedLists.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (qm):** İndeksli massivlerni bağlı dügümler zıncırınen teñeştir.

##### Massiv quruluşını añlatmaq

[explainArrayStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (qm):** Massivlerniñ unsurlarnı indekslernen belgilengen yerlerde nasıl saqlağanını añla.

##### Cedvel quruluşını añlatmaq

[explainListStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (qm):** Cedvellerniñ çeşit usullernen kösterile bilgen tertipli toplamlar olğanını añla.

##### Sıralamağa unsur yerleştirmek

[insertAnElementIntoASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (qm):** Unsurnı tertipli sıralamada doğru yerine yerleştir.

##### Sıralamadan unsur çıqarmaq

[removeAnElementFromASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (qm):** Bir unsurnı çıqarıp, qalğanlarınıñ tertibini saqla.

##### Sıralamanı baştan soñuna baqmaq

[traverseASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (qm):** Sıralamadaki er unsurnı nevbetinen kör.

#### Kümeler

Skills: 4

[sets.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (qm):** Tekrarsız qıymetler kümelerini ve azalıqnı teşkerüv amellerini ögren.

##### Kümelerniñ kesişmesini esaplamaq

[computeSetIntersection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (qm):** Eki kümede de olğan unsurlarnı tap.

##### Kümelerni birleştirmek

[computeSetUnion.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (qm):** Eki kümedeki çeşit unsurlarnı tekrarlamadan birleştir.

##### Kümeniñ quruluşını añlatmaq

[explainSetStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (qm):** Kümeniñ er çeşit unsurnı tek bir kere saqlağanını añla.

##### Kümege azalıqnı teşkermek

[testSetMembership.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (qm):** Belli bir qıymetniñ kümege ait olğanını teşker.

#### Stek

Skills: 3

[stack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (qm):** Stekte soñ qoşulğan unsurğa birinci erişmekni ögren.

##### LIFO printsipini añlatmaq

[explainLIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (qm):** Stekniñ soñ qoşulğan unsurnı niçün birinci çıqarğanını añla.

##### Stekten unsur çıqarmaq

[popAnElementFromAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (qm):** Stek boş olğanını teşkerip, soñ qoşulğan unsurnı çıqar.

##### Stekke unsur qoşmaq

[pushAnElementOntoAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (qm):** Stekniñ üstüne yañı unsur qoy.

#### Malümat yapısını saylamaq

Skills: 4

[structureSelection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (qm):** Programmanıñ malümatnı qullanğanına köre yapı sayla.

##### Kerekli ameller içün yapı saylamaq

[chooseAStructureForRequiredOperations.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (qm):** İndeks, azalıq, nevbet yaki bağlar içün uyğun toplam sayla.

##### Toplamğa qoşuv masraflarını teñeştirmek

[compareCollectionInsertionCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (qm):** Qoşuv vaqtında massiv unsurlarını köçürmek yaki bağlarnı deñiştirmek niçün kerek olğanını ögren.

##### Unsurğa erişüv masraflarını teñeştirmek

[compareElementAccessCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (qm):** Massiv ve bağlı cedvelniñ belli unsurğa erişüv tezligini teñeştir.

##### Malümat yapılarınen algoritmlerni ayırmaq

[distinguishDataStructuresFromAlgorithms.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (qm):** Malümatnı yapıda tertip etmeknen algoritm ile işlemekni ayır.

#### Terekler

Skills: 4

[trees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (qm):** Tereklerniñ malümatnı ana-bala dügümleri bağlarınen nasıl tertip etkenini ögren.

##### Terekniñ yapraq ve içki dügümlerini ayırmaq

[distinguishLeafAndInternalTreeNodes.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (qm):** Bala dügümleri olğan dügümlernen balası olmağan yapraqlarnı ayır.

##### Ekilik qıdıruv tereklerini añlatmaq

[explainBinarySearchTrees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (qm):** Ekilik qıdıruv tereğinde anahtarlarnıñ tertibi qıdıruvnı nasıl mümkün etkenini añla.

##### Terekniñ quruluşını añlatmaq

[explainTreeStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (qm):** Terekniñ tamırını, dallarını, dügümlerini ve bağlarını tanı.

##### Terekte yol tapmaq

[findAPathInATree.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (qm):** Terekte eki dügüm arasında bar olğan bağlar boyunca bar.

### Tasarlav şablonları

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../learningApps/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (qm):** Programma obyektlerini yaratmaq, birleştirmek ve bağlamaqnıñ tekrar qullanıla bilgen usullarını ögren.

#### Areket şablonları

Skills: 11

[behavioral.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (qm):** Obyektler talaplarnı nasıl bağlay ve areketlerini nasıl deñiştire, ögren.

##### Mesuliyet zinciri

[chainOfResponsibility.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (qm):** Talapnı bir işleyiciden başqasına, biri onı işlep olğance, geçir.

##### Emir

[command.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (qm):** İşni saqlamaq ya da planlamaq mümkün olğan obyekt olaraq köster.

##### Tercimacı

[interpreter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (qm):** İfadeler şeklinde kösterilgen qaydalarnen ufak tilni añlat.

##### İterator

[iterator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (qm):** Toplamnıñ saqlanuv usulını açmay onıñ elementlerini dolaş.

##### Aracı

[mediator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (qm):** Komponentler arasında bağlılıqnı merkezdeki aracı vastasınen uyğunlaştır.

##### Hatıra

[memento.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (qm):** Obyektniñ alını soñra keri qaytarmaq içün saqla.

##### Közetici

[observer.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (qm):** Közetilgen obyekt deñişkende maraqlanğan abunecilerge haber ber.

##### Al

[state.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (qm):** Obyektniñ cevabını onıñ şimdiki alına köre deñiştir.

##### Strategiya

[strategy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (qm):** Bir ortaq interfeysni qullanğan algoritmler arasında deñiştir.

##### Şablon metodı

[templateMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (qm):** Algoritmniñ esas adımlarını deñiştirmey, saylanğan adımlarını deñiştirüvge ruhset ber.

##### Ziyaretçi

[visitor.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (qm):** İşlemlerni olarnıñ tesir etken obyekt quruluşlarından ayır.

#### Yaratıcı şablonlar

Skills: 5

[creational.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (qm):** Müşterilerni konkret çeşitlerge bağlamay obyekt yapmaq şablonlarını ögren.

##### Soyut fabrika

[abstractFactory.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (qm):** Bir-birine uyğun bağlı obyekt ailelerini yarata bilgen fabrikanı qullan.

##### Qurucu

[builder.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (qm):** Qıyın obyektni qurucu vastasınen adım-adım qur.

##### Fabrika metodı

[factoryMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (qm):** Fabrika metodı qaysı konkret obyektni yaratacağını ast sınıflar saysın.

##### Prototip

[prototype.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (qm):** Evvelden sazlanğan numuneni köçürip yañı obyektler yarat.

##### Tek ekzemplar

[singleton.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (qm):** Umumiy alnıñ havflarını esapqa alıp, bir ortaq ekzemplarğa irişüvni idare et.

#### Quruluş şablonları

Skills: 7

[structural.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (qm):** Programma komponentlerini bağlamaq, sarmaq ve paylaşmaq şablonlarını ögren.

##### Uyğunlaştırıcı

[adapter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (qm):** Uyğun kelmegen interfeysler arasında çevirmeler yapıp olarnı bağla.

##### Köprü

[bridge.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (qm):** Komponentniñ soyutlamasını onıñ qullanğan işlevinden ayır.

##### Kompozit

[composite.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (qm):** Ayrı obyektlerni ve obyekt gruppalarını ortaq interfeys vastasınen işle.

##### Bezendirici

[decorator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (qm):** Ast sınıflarnı çoqlatmay, obyektni sarıp yañı areket qoş.

##### Fasad

[facade.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (qm):** Qıyın komponentler toplamına sade kiriş yolunı ber.

##### Yengil obyekt

[flyweight.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (qm):** Kereksiz hafiza sarfını azaytmaq içün tekrar qullanılğan obyekt verilgenlerini paylaş.

##### Vekil

[proxy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (qm):** Aynı interfeysi olğan başqa obyekt vastasınen obyektke irişüvni idare et.

### Raqamlı yaratıcılıq ve oyunlar

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (qm):** Raqamlı materiallar yarat, oynalacaq oyun qaidelerini tasarla ve protsedural yaratılışnı araştır.

#### Raqamlı materiallar

Skills: 3

[digitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (qm):** Maqsatqa uygun raqamlı içerik yaratmağa, onı deñiştirmege ve uyğun aletlerni saylamağa ögren.

##### Raqamlı yaratıcılıq aletini saylamaq

[chooseADigitalCreativeTool.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (qm):** Yaratmaq istegen neticeñe uyğun yaratıcılıq programmasını sayla.

##### Sade raqamlı eser yaratmaq

[createASimpleDigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (qm):** Belli bir seyirci içün manalı raqamlı kart, resim ya da başqa eser yarat.

##### Raqamlı eserni deñiştirmek

[editADigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (qm):** Bar olğan raqamlı faylnı asıl manasını saqlap yahşılaştır.

#### Oyun tasarımı

Skills: 3

[gameDesign.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (qm):** Qaideler ve oyuncılarnıñ areketleri oyun tecribesini nasıl şekillendirgenini araştır.

##### Oyun mehanizmini tasarlamaq

[designAGameMechanic.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (qm):** Oyuncınıñ areketini oyun vaziyetiniñ deñişüvi ve keri haber ile bağla.

##### Oyun qaidesini ifade etmek

[formulateAGameRule.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (qm):** Oyuncılar ne mümkün olğanını añlasın diye oyun qaidesini açıq yaz.

##### Sade oyunnıñ balansını sınamaq

[testTheBalanceOfASimpleGame.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (qm):** Qaideler oyunnı adaletli, qıyın ve soñuna qadar oynalıp bitirilecek etkenini sınap baq.

#### Protsedural yaratılış

Skills: 4

[proceduralGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (qm):** Algoritmler qısqa qaidelerden içerikniñ çoq çeşitini nasıl yarata bilgenini ögren.

##### Resurslarnı saqlav ve yaratılışını qıyaslamaq

[compareResourceStorageAndGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (qm):** Protsedural yaratılışnıñ saqlağan hafiza yerini onıñ içün kerek olğan esaplavnen qıyasla.

##### Generator parametrlerini ayarlamaq

[configureGeneratorParameters.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (qm):** Netice körünişini ya da miqdarını idare etmek içün generator ayarlarını deñiştir.

##### Resurslarnıñ protsedural yaratılışını añlatmaq

[explainProceduralResourceGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (qm):** Generator er bitken variantnı saqlamaq yerine resurslarnı nasıl yaratqanını añlat.

##### Yaratılış tohumınen neticelerni tekrar elde etmek

[reproduceResultsUsingAGenerationSeed.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (qm):** Sabit tohum ve deñişmegen qaideler aynı neticeni nasıl tekrar bergenini añla.

### Raqamlı mahsulatnıñ qullanıcı tecribesi

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (qm):** İnsanlar añlay, yol taba ve erkes irişe bilgen raqamlı tecribeni tasarla.

#### İrişimlilik

Skills: 2

[accessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (qm):** Farklı qabiliyetler ve kirsetüv usulları raqamlı irişimge nasıl tesir etkenini ögren.

##### Farklı qabiliyetleri olğan qullanıcılarnıñ ihtiyaclarını belgilemek

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (qm):** Klaviatura, büyütülgen metin ya da yardımcı tehnologiya qullanğan insanlarnıñ ihtiyaclarını tanı.

##### Raqamlı tesirleşüvniñ irişimliligini sınamaq

[testDigitalInteractionAccessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (qm):** İnterfeysni sıçansız ya da sessiz sınap, manialarnı qayd et.

#### Raqamlı tesirleşüv dizaynı

Skills: 4

[digitalInteractionDesign.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (qm):** Raqamlı interfeyslerde añlaşılır areketlerni ve faydalı cevapnı nasıl tasarlamaq mümkün olğanını araştır.

##### Raqamlı interfeysniñ keri haberini tasarlamaq

[designDigitalInterfaceFeedback.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (qm):** Dögmeler, yüklenüv vaziyetleri ve hatalar añlaşılır keri haber bersin.

##### Raqamlı interfeys navigatsiyasını tasarlamaq

[designDigitalInterfaceNavigation.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (qm):** Ekranlarnı ve navigatsiyanı insanlar kerek areketlerni taba bilgeni kibi tertiple.

##### Raqamlı mahsulat qullanıcısınıñ maqsadını belgilemek

[identifyADigitalProductUsersGoal.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (qm):** Bir insan programma ya da raqamlı cihaznen ne yapmaq istegenini belgile.

##### Yayğın raqamlı tesirleşüv hatalarınıñ ögüni almaq

[preventCommonDigitalInteractionErrors.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (qm):** Qaçınıla bilgen hatalarnıñ ögüni almaq içün yazılar, teşkerüv ve tasdiq qullan.

#### Tecribeni baalav ve etika

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (qm):** Qullanıcı sınavları ve dürüst tasarım raqamlı mahsulatlarnı nasıl yahşılaştırğanını araştır.

##### Aldatıcı interfeys usullarını tanımaq

[identifyManipulativeInterfacePatterns.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (qm):** Masraflarnı gizlegen, seçimge mecbur etken ya da vazgeçüvni qıyınlaştırğan interfeys aylarını tanı.

##### Raqamlı interfeysniñ qullanış qolaylığını sınamaq

[testDigitalInterfaceUsability.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (qm):** İnsan kerçek vazifeni artıq işaretsiz bitire bilgenini közet.

### Raqamlı havfsızlıq ve mesuliyet

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (qm):** Malümatnı qorumaqnı, başqalarğa ürmet etmege ve raqamlı tehnologiyalarnıñ tesirini añlamağa ögren.

#### Esapnı qoruv

Skills: 9

[accountProtection.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (qm):** Esaplarnı nasıl qorumağa ve şübheli haberlere nasıl cevap bermege ögren.

##### Elektron mektüp yollağan şahsnıñ aqiqiyligini teşkermek

[assessAnEmailSendersAuthenticity.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (qm):** Yollağan şahsnıñ kimligini faqat körüngen ad ya da suretke inanmayıp teşker.

##### Siltege keçüvniñ havfını qıymetlemek

[assessTheRiskOfFollowingALink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (qm):** Şübheli silteni açqanda ne ola bilgenini qıymetle.

##### Çoq faktorlı autentifikatsiyanı sazlamaq

[configureMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (qm):** Kiriş içün ilâve faktor faalleştir ve esapqa irişüvni havfsız tiklemege plan yap.

##### Küçlü parol ibaresini yaratmaq

[createAStrongPassphrase.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (qm):** Er esap içün ayrı, uzun ve tahmin etmesi qıyın olğan parol ibaresini yarat.

##### Çoq faktorlı autentifikatsiyanı añlatmaq

[explainMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (qm):** Ekinci müstakil teşkerüv faktorı esapnı nasıl qorğağanını añla.

##### Programma yañılamaları neden müim olğanını añlatmaq

[explainWhySoftwareUpdatesMatter.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (qm):** Resmiy programma yañılamaları havfsızlıq zaifliklerini nasıl tüzetmege yardım etkenini ögren.

##### Fişing haberini tanımaq

[recognizeAPhishingMessage.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (qm):** Parol ya da kod oğurlamaq içün başqasınıñ adından kelgen haberni tanı.

##### Şübheli raqamlı haberleşüvge cevap bermek

[respondToSuspiciousDigitalContact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (qm):** Şübheli muracaatta havfsız davran ve isteknı başqa işançlı yoldan teşker.

##### Veb-saytnıñ domenini teşkermek

[verifyAWebsitesDomain.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (qm):** Veb-adreste aqiqiy domenni tap ve aldatıcı oşağan adreslerni tanı.

#### Raqamlı munasebetler etikası

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (qm):** Ürmetnen haberleşmege ve eser saipleriniñ izinlerine riayet etmege ögren.

##### Raqamlı materiallarnıñ müellifini köstermek

[attributeDigitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (qm):** Qullanğan raqamlı içerikniñ asl yaratıcısını köster.

##### Meseleni havfsız bildirmek yolunı saylamaq

[chooseASafeWayToReportAProblem.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (qm):** İnternetteki meseleni bildirmek içün işançlı insan ya da resmiy yolnı sayla.

##### Raqamlı içerik litsenziyalarını ayırmaq

[distinguishDigitalContentLicenses.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (qm):** Müelliflik aqqı sıñırlavlarını, açıq litsenziyalarnı ve umumiy qullanımğa açıq eserlerni ayır.

##### İnternette doğru davranışnı tanımaq

[identifyAppropriateOnlineBehavior.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (qm):** Raqamlı haberleşüvde qorqutuv, taqip etüv ve eziyetni tanı.

#### Mahremiyet

Skills: 5

[privacy.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (qm):** İnternette malümat paylaşuv mahremiyetke nasıl tesir etkenini ögren.

##### Malümat paylaşuvnıñ havfsız usulını saylamaq

[chooseSafeDataSharingMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (qm):** Hassas malümatnı kimge ve nasıl havfsız paylaşmaq mümkün olğanını sayla.

##### Şahsiy sohbetni aleniy siltemeden ayırmaq

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (qm):** Paylaşılğan sohbet ya da vesiqanı kim aça bilgenini teşker; silte mahfiy diye düşünme.

##### Malümatnen şahsnı yañıdan tanımanı añlatmaq

[explainDataReIdentification.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (qm):** Ayrı toplanğan tafsilâtlarnı birleştirip bir insan kimligini yañıdan nasıl açmağa mümkün olğanını añlat.

##### Şahsiy malümatnı tanımaq

[identifyPersonalData.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (qm):** Bir insan kimligini tek başına ya da başqa malümatnen birleştirip belli etken bilgini tanı.

##### Raqamlı izni tanımaq

[recognizeADigitalFootprint.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (qm):** İnternetteki yazılar ve areketler uzun vaqıt saqlanğan izler qaldıra bilgenini añla.

#### Esaplavnıñ ictimaiy ve tabiatqa tesiri

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (qm):** Kompyuter tehnologiyaları adaletke, resurslarğa ve tabiatqa nasıl tesir etkenini araştır.

##### Algoritmniñ qullanıcı gruppalarğa tesirini qıymetlemek

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (qm):** Algoritm neticeleri çeşit qullanıcı gruppalarına adaletsiz farqnen tesir etkenini qıymetle.

##### Esaplavnıñ tabiatqa tesirini qıymetlemek

[assessComputingsEnvironmentalImpact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (qm):** Kompyuter işlerindeki energiya, malzeme ve elektron çöp tesirlerini qıyasla.

### Raqamlı sistemalar ve ağlar

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (qm):** Esaplav cihazları, raqamlı malümat ve ağlar bir yerde nasıl çalışqanını ögren.

#### Raqamlı cihazlarnıñ parçaları

Skills: 3

[digitalDeviceComponents.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (qm):** Cihaznıñ fizikiy parçaları ve programmalar farqlı esaplav işlerini nasıl icra etkenini ögren.

##### Cihaz parçalarını programmalardan ayırmaq

[distinguishHardwareFromSoftware.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (qm):** Kompyuterniñ fizikiy parçalarını olarnı idare etken programmalardan ayır.

##### Protsessornıñ vazifesini añlatmaq

[explainAProcessorsFunction.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (qm):** Protsessor fayllarnı daimiy saqlamaq yerine buyruqlarnı nasıl icra etkenini añlat.

##### Raqamlı cihazlarnı tanımaq

[identifyDigitalDevices.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (qm):** Programmalanabilgen raqamlı malümatnı işlegen cihazlarnı tanı.

#### Hatır ve saqlav

Skills: 4

[memoryAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (qm):** Mu vaqtlıq hatır, qurulma programması hatırı ve fayl saqlavınıñ ayrı vazifelerini ögren.

##### RAM, ROM ve saqlavnı ayırmaq

[distinguishRAMROMAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (qm):** RAM, ROM ve daimiy saqlav qaysı malümatnı tutmaq içün qullanılğanını qıyasla.

##### Daimiy saqlavnı añlatmaq

[explainPersistentStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (qm):** Elektrik söndürilgenden soñ da saqlav cihazları fayllarnı ne içün saqlağanını añla.

##### RAM hatırını añlatmaq

[explainRAM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (qm):** Kompyuter çalışqanda RAM iş malümatını nasıl tutqanını ögren.

##### ROM hatırınıñ maqsadını añlatmaq

[explainThePurposeOfROM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (qm):** Elektrik olmağanda da malümat saqlağan qurulma programması hatırı cihazlarnıñ başlatılmasına nasıl yardım etkenini ögren.

#### Ağ modelleri ve protokolları

Skills: 11

[networkModelsAndProtocols.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (qm):** Ağ protokolları malümat yollama qaidelerini nasıl belgilegenini ögren.

##### Şebekeden faydalanma usullarını qıyaslamaq

[compareNetworkAccessMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (qm):** Çarpışmanı belgilev, ondan qaçınuv ve tokenni berüv usullarını olarğa uyğun şebeke şartlarında qıyasla.

##### HTTP ve HTTPS-ni ayırmaq

[distinguishHTTPFromHTTPS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (qm):** HTTPS neni qorçalğanını ve ne içün saytqa işanmağa kefil olmağanını ögren.

##### OSI ve TCP/IP-ni ayırmaq

[distinguishOSIFromTCPIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (qm):** OSI-niñ nazariy qatlarını İnternetniñ TCP/IP protokollar sistemasına qıyasla.

##### TCP ve UDP-ni ayırmaq

[distinguishTCPFromUDP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (qm):** İşançlı TCP malümat aqımlarını, aynı kefillikleri olmağan UDP haberlerinen qıyasla.

##### Şebeke protokolını añlatmaq

[explainANetworkProtocol.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (qm):** Cihazlarğa haberlerni alışıp-bermek içün nege kelisilgen qaideler kerek olğanını añlat.

##### CSMA/CA-nı añlatmaq

[explainCSMACA.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (qm):** Telsiz cihazlar meşğul kanalda malümat yollamamaq içün nasıl areket etkenlerini añlat.

##### CSMA/CD-ni añlatmaq

[explainCSMACD.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (qm):** Eskiy umumiy Ethernet şebekelerinde çarpışmalarnı ne içün belgilemek kerek olğanını ögren.

##### DNS-ni añlatmaq

[explainDNS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (qm):** DNS domen adlarına köre şebeke adreslerini tapmağa nasıl yardım etkenini añlat.

##### OSI qatlarını añlatmaq

[explainTheOSILayers.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (qm):** Şebeke vazifelerini tertiplemek içün yedi qatlı OSI modelini qullan.

##### IP-niñ maqsadını añlatmaq

[explainThePurposeOfIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (qm):** IP şebekeler arasında paketlerge adres berip olarnı nasıl ilerletkenini añla.

##### Token Ring-ni añlatmaq

[explainTokenRing.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (qm):** Tokenni berüv qaysı cihaznıñ malümat yollay alğanını nasıl idare etkenini ögren.

#### Ağlar

Skills: 4

[networks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (qm):** Bağlanğan cihazlar nasıl haberler yollap, vastalarnı birge qullanğanını ögren.

##### İnternetni Webden ayırmaq

[distinguishTheInternetFromTheWeb.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (qm):** İnternetniñ ağ altyapısını Webdeki saytlardan ayır.

##### Ağ haberniñ yetkizilüvini añlatmaq

[explainNetworkMessageDelivery.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (qm):** Haberler ağ cihazlarından keçip adresatqa nasıl yetkenini izle.

##### Kompyuter ağınıñ maqsadını añlatmaq

[explainThePurposeOfAComputerNetwork.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (qm):** Ağlar malümat alış-verişi içün ayrı cihazlarnı ne içün bağlağanını añlat.

##### Telsiz alâqanı añlatmaq

[explainWirelessCommunication.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (qm):** Telsiz cihazlar doğrudan kabeller yerine signallar yardımınen nasıl haberleşkenini ögren.

#### Sayı sistemaları

Skills: 4

[numeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (qm):** Farqlı esaslı sistemalarda raqamlar sayılarnı nasıl ifade etkenini ögren.

##### Eki esaslı ve on esaslı sistemalar arasında çevirmek

[convertBetweenBinaryAndDecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (qm):** Kiçik sayılarnı eki esaslı ve on esaslı yazuvğa bir-birinden çevir.

##### Eki esaslı ve on altı esaslı sistemalarnı ayırmaq

[distinguishBinaryAndHexadecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (qm):** Bit toplarını on altı esaslı yazuvnen ne içün qısqaraq yazıp olğanını añla.

##### Kompyuterniñ eki esaslı mantığını añlatmaq

[explainComputerBinaryLogic.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (qm):** Eki esaslı sıfır ve birlerni farqlap olğan elektron signal allarına bağla.

##### Yerine bağlı sayı sistemalarını añlatmaq

[explainPositionalNumeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (qm):** Raqamnıñ sayı içindeki yeri onıñ qıymetini ne içün deñiştirgenini añla.

#### Operatsion sistemalar

Skills: 4

[operatingSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (qm):** Operatsion sistemalar programmalarnı, fayllarnı ve cihazlarnı nasıl idare etkenini ögren.

##### Operatsion sistema ailelerini ayırmaq

[distinguishOperatingSystemFamilies.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (qm):** Keniş qullanılğan operatsion sistema ailelerini ve farqlarını tanı.

##### Operatsion sistemanıñ protsessini añlatmaq

[explainAnOSProcess.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (qm):** Çalışqan protsessni diskte saqlanğan programma faylından ayır.

##### Operatsion sistemanıñ maqsadını añlatmaq

[explainAnOperatingSystemsPurpose.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (qm):** Operatsion sistema programmalarnı ve cihaz parçalarınıñ işini nasıl uyğunlaştırğanını añla.

##### Linus Torvaldsnıñ Linuxteki rolüni añlatmaq

[explainLinusTorvaldsRoleInLinux.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (qm):** Linux çekirdegi nasıl başlanğanını ve ne içün çoq iştirakçi operatsion sistemalarnı beraber inkişaf ettirgenini ögren.

#### Tasvirlev ve saqlav

Skills: 4

[representationAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (qm):** Cihazlar malümatnı nasıl tasvirlegenini ve saqlanğan fayllarnı nasıl tertiplegenini ögren.

##### Raqamlı fayllarnıñ ölçülerini qıyaslamaq

[compareDigitalFileSizes.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (qm):** Fayl ölçülerini qıyasla, format ve sıqıştıruv ne içün farq yarattığını añlat.

##### Raqamlı formatlarnı ayırmaq

[distinguishDigitalFormats.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (qm):** Fayl formatı saqlanğan bitlerni nasıl añlamaq kerekligini belgilegenini tanı.

##### Eki esaslı tasvirlevni añlatmaq

[explainBinaryRepresentation.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (qm):** Sıfır ve birler sırası farqlı malümat çeşitlerini nasıl kodlağanını añla.

##### Fayllarnı kataloglarda tertiplemek

[organizeFilesInDirectories.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (qm):** Fayllarnı yollarınen tapmaq içün uyğun papkalarğa yerleştir.

#### Vazifelerni icra etmek

Skills: 3

[taskExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (qm):** Nevbetnen ilerlegen vazifeler ile aqiqatten aynı vaqıtta yerine ketirilgen işler arasındaki farqnı ögren.

##### Mustaqil vazifelerni icracılar arasında bölmek

[distributeIndependentTasksAcrossExecutors.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (qm):** Qaysı vazifeler bir vaqıtta yapılğanını ve qaysıları başqa neticelerni beklemek kerekligini planlaştır.

##### Vazifelerni nevbetleşip beraber yürsetüvni añlatmaq

[explainConcurrentExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (qm):** Bir qaç vazife tam aynı anda çalışmasa bile nasıl ilerilegenini añla.

##### Paralel icranı añlatmaq

[explainParallelExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (qm):** Bir qaç protsessor ne vaqıt aqiqaten aynı anda çalışqanını tanı.

### Git ve açıq menba

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (qm):** Programmacılar deñişikliklerni nasıl közettiklerini, beraber işlegenlerini ve açıq izinlernen yazılımnı paylaşqanlarını ögren.

#### Raqamlı mahsulatnı beraber işlep çıqarmaq

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (qm):** Takımlar qatqılarnı, közetüvlerni ve leyha versiyalarını nasıl tertip etkenlerini ögren.

##### Ortaq raqamlı leyhada deñişikliklerni uyğunlaştırmaq

[coordinateChangesInASharedDigitalProject.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (qm):** Kim neyi deñiştirecegini ve ortaqlıq tüzetmeler nasıl birleştirilgenini planlaştır.

##### Qatqı qa idelerini añlatmaq

[explainContributionGuidelines.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (qm):** Qatqı qa ideleri niçün insanlarğa bir kod temeli üstünde işlemekke yardım etkenini añla.

##### Raqamlı mahsulnıñ versiyalarını közetmek

[trackDigitalProductVersions.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (qm):** Deñişikliklerniñ vaqtını tapmaq yaki evelki işni qaytarmaq içün versiyalar tarihını qullan.

#### Git versiya kontrolü

Skills: 6

[gitVersionControl.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (qm):** Git versiyalarnı nasıl qayd etkenini ve takımlarğa deñişikliklerni birleştirmekke nasıl yardım etkenini ögren.

##### Yerli ve uzaqtaki repozitoriylerni ayırmaq

[distinguishLocalAndRemoteRepositories.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (qm):** Bilgisayarıñdaki işnen uzaqtaki repozitoriylerde paylaşılğan kopiyalarnı ayır.

##### Tarmaqnı añlatmaq

[explainABranch.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (qm):** Tarmaqlarnıñ programmacılarğa ayrı deñişiklik yollarında işlemekke nasıl imkân bergenini añla.

##### Komitni añlatmaq

[explainACommit.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (qm):** Komit evelki tarihnıñ devamı olğan, belgisi bar vaziyet sureti olğanını añla.

##### Pull requestni añlatmaq

[explainAPullRequest.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (qm):** Pull requestler teklif etilgen deñişikliklerni közetüv içün nasıl tertip etkenini ögren.

##### Repozitoriyni añlatmaq

[explainARepository.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (qm):** Repozitoriyde leyha ve onıñ deñişiklikler tarihi saqlanğanını añla.

##### Tarmaqlarnı birleştirüvni añlatmaq

[explainBranchMerging.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (qm):** Tarmaqlar nasıl birleştirilgenini ve bazıda çatışmalarnı niçün çezmek kerekligini ögren.

#### Açıq menba

Skills: 2

[openSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (qm):** Yazılımnı aqiqaten açıq menbalı etken izinlerni ögren.

##### Açıq menbanen faqat alenen körüngen kodnı ayırmaq

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (qm):** Menba kodunı körmek onı öz-özünden açıq menbalı etmegenini añla.

##### Açıq menbanı añlatmaq

[explainOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (qm):** Açıq menba litsenziyaları yazılımnı qullanmağa, deñiştirmege ve yañıdan tarqatmağa nasıl izin bergenini añla.

### Programmalav tarihi

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (qm):** Programmalav fikirleri ve esaplayıcı maşinalar tarih boyunca nasıl inkişaf etkenini ögren.

#### Mühim qatqılar

Skills: 6

[keyContributions.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (qm):** Programmalav, yazılım işançlılığı ve bilgisayar şebekelerine mühim qatqılarnı ögren.

##### Esaplanabilüv nazariyesini añlatmaq

[explainComputabilityTheory.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (qm):** Resmiy modeller bilgisayarlarnıñ neni esaplay bilgenini ve neni esaplay almağanını nasıl köstergenini ögren.

##### İlk elektron programmalavnı añlatmaq

[explainEarlyElectronicProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (qm):** İlk elektron bilgisayar takımları programmalarnı nasıl yaratıp teşkergenini ögren.

##### Kompilyatorlarnıñ inkişafını añlatmaq

[explainTheDevelopmentOfCompilers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (qm):** Kompilyatorlar oqulışı qolay tillerde programma yazmaqnı nasıl qolaylaştırğanını ögren.

##### Yazılımnıñ işançlılığınıñ inkişafını añlatmaq

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (qm):** Apollo vazifelerinde hatalarnı idare etmek ve işançlı yazılım niçün mühim olğanını añla.

##### Şebeke döngülerini yoq etüvni añlatmaq

[explainTheEliminationOfNetworkLoops.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (qm):** Spanning Tree protokolı yerli şebekelerde döngülerni nasıl toqtatqanını ögren.

##### Programmalavnıñ menbasını añlatmaq

[explainTheOriginsOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (qm):** İlk maşina leyhaları ve Ada Lovelace işi programmalavnı nasıl öñden köstergenini ögren.

#### Maşinalar ve şifre talili

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (qm):** Maşinalar ve matematika usulları tarihiy şifre taliline nasıl yardım etkenini ögren.

##### Tarihiy şifre talili usullarını añlatmaq

[explainHistoricalCryptanalysisMethods.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (qm):** Şifre talilcileri şifrelerni açmaq içün nağışlar ve muntazam teşkerüvlerni nasıl qullanğanını ögren.

##### Programmalana bilgen bilgisayarlarnıñ inkişafını añlatmaq

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (qm):** Mehanik esaplav fikirlerinden programmalana bilgen elektron maşinalarğa qadarki inkişafnı izle.

##### Bombe maşinasınıñ maqsadını añlatmaq

[explainThePurposeOfTheBombe.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (qm):** Bombe maşinası Enigma içün mümkün ayarlarnı teşkermekke nasıl yardım etkenini añla.

### Malümat ve verilgenler

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (qm):** İşançlı malümat tapmaqnı, verilgenlerni tertiplemekni ve belli olmağan şeyler aqqında fikir yürsetmekni ögren.

#### Verilgenlerni toplav ve tertiplemek

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (qm):** Kerekli malümatnı toplamaq ve qıyaslana bilgen qaydlarnı tertiplemekni ögren.

##### Verilgenlerni bir usulnen toplamaq

[collectDataConsistently.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (qm):** Ölçüvlerni aynı qaydalar ve birliklernen topla.

##### Verilgenlerni hususiyetine köre toplamaq

[groupDataByAttribute.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (qm):** Qaydlarnı bir anıq hususiyetke köre gruppala.

##### Vazife içün kerekli verilgenlerni belgilemek

[identifyDataNeededForATask.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (qm):** Sualğa aqiqaten qaysı saalar ve közetüvler kerek olğanını belgile.

##### Verilgenlerni cedvelde köstermek

[presentDataInATable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (qm):** Satırları ve sütunları adlandırılğan, qiymetleri uyğun cedvel qur.

#### Verilgenler bazaları

Skills: 5

[databases.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (qm):** Verilgenler bazaları qaydlarnı nasıl tertiplep, bağlı malümatnı nasıl birleştire, ögren.

##### Sade verilgenler bazasınıñ şemasını qurmaq

[designASimpleDatabaseSchema.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (qm):** Uygun varlıqlar, saalar ve bağlardan ibaret sade verilgenler bazasını planla.

##### Qaydlarnı ve saalarnı ayırmaq

[distinguishRecordsAndFields.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (qm):** Qaydnı onı tasvir etken saalardan ayır.

##### Verilgenler bazası cedvelini añlatmaq

[explainADatabaseTable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (qm):** Cedvel aynı çeşit qaydlarnı nasıl saqlay, añla.

##### Baş anahtarlarnı añlatmaq

[explainPrimaryKeys.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (qm):** Er qayd içün sabit, tek anahtar niçün kerek olğanını añlat.

##### Cedveller arasında bağlarnı modellemek

[modelRelationshipsBetweenTables.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (qm):** İdentifikatorlar vastasınen ayrı cedvellerdeki malümatnı bağla.

#### Malümat qıdıruv ve teşkerüv

Skills: 4

[informationSearchAndVerification.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (qm):** Delillerni qıdırıp, iddianıñ esaslı olğanını teşkerüvni ögren.

##### Malümat menbalarını qıyaslamaq

[compareInformationSources.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (qm):** Bir qaç menbanı qıyaslap, olarnıñ haberleri qayda farqlı olğanını tap.

##### Haberlerni verilgenlerden ayırmaq

[distinguishMessagesFromData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (qm):** Qayd etilgen qiymetni haber oña bergen manadan ayır.

##### Malümat qıdıruv sualini qurmaq

[formulateAnInformationQuery.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (qm):** Tapmaq istegeniñge yaraşqan anıq qıdıruv sözlerini sayla.

##### İddianı menbağa baqıp teşkermek

[verifyAClaimAgainstASource.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (qm):** Tekrarlanğan iddialarğa degil, uygun delillerge esaslanıp iddianı teşker.

#### İhtimallıq ve belgisizlik

Skills: 7

[probabilityAndUncertainty.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (qm):** Mümkün adiseler, olarnıñ şansları ve qabaqtan aytuvnıñ sıñırlarını araştır.

##### Sade adiselerniñ ihtimallıqlarını qıyaslamaq

[compareProbabilitiesOfSimpleEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (qm):** Aynı farazlarnen eki neticeniñ şansını qıyasla.

##### Mümkünlükni ihtimallıqtan ayırmaq

[distinguishPossibilityFromProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (qm):** Bir adise mümkün olsa da, onıñ oluv şansı yüksek olmaq mecburiy degil, añla.

##### Tesadüfiy ve qatiy belgilenmiş adiselerni ayırmaq

[distinguishRandomAndDeterministicEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (qm):** Qaydağa köre belgilenmiş neticelerni tesadüfen saylanğan neticelerden ayır.

##### Adiseniñ mümkünlügini añlatmaq

[explainEventPossibility.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (qm):** Berilgen şaraitte bir netice olıp olamaycağını belgile.

##### Adiseniñ ihtimallığını añlatmaq

[explainEventProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (qm):** Belgilenmiş ihtimal modeli yardımnen adiseniñ oluv şansını baala.

##### Qabaqtan aytuvnıñ sıñırlarını añlatmaq

[explainLimitsOfPrediction.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (qm):** İhtimallıqlarnı bilmek tek bir tecribeniñ neticesini niçün qabaqtan aytmay, añlat.

##### Modelde tesadüfiylikni qullanmaq

[useRandomnessInAModel.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (qm):** Modelge tesadüfiy saylavlar qoşıp, qaysı neticeler mümkün olğanını belgile.

#### Statistik araştırma

Skills: 4

[statisticalInvestigation.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (qm):** Verilgenlerni diagrammalar, tekrarlanma sıqlığı ve qıyaslavlar yardımınen araştırmaqnı ögren.

##### Közetüv toplamlarını qıyaslamaq

[compareSetsOfObservations.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (qm):** Eki verilgenler toplamını aynı ölçüvler ya da kategoriyalarnen qıyasla.

##### Sade diagramma qurmaq

[constructASimpleChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (qm):** Verilgenler nisbetlerini doğru köstergen anıq diagramma qur.

##### Eñ sıq rastkelgen qiymetni tapmaq

[findTheMostFrequentValue.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (qm):** Toplamda eñ çoq kereler rastkelgen qiymetni belgile.

##### Diagrammanı oqumaq

[readAChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (qm):** Köstermek usulı seni aldatmağan alda ölçeklerni, yazılarnı ve qiymetlerni oqu.

### Programmalav

Groups: 8 · Skills: 37

[programming.data.ts](../../../learningApps/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (qm):** Kompyuter icra etken talimatlarnı añlamağa, yazmağa ve sınamağa ögren.

#### Malümat çeşitleri ve işaretler

Skills: 6

[dataTypesAndReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (qm):** Çeşitler ve işaretler programmalarnıñ qullana bilgen qıymetlerine nasıl tesir etkenini ögren.

##### Qıymetni köçürmekni ortaq işaretten ayırmaq

[distinguishValueCopyingFromSharedReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (qm):** Eki deñişken ne vaqıt aynı obyektke işaret etkenini ve ne vaqıt qıymetler müstaqil olğanını añlat.

##### Qıymet çeşitlerini ayırmaq

[distinguishValueTypes.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (qm):** Qıymetniñ sayı, metin ya da mantıqiy olğanını ve onen ne yapmağa mümkün olğanını belgile.

##### Malümat çeşiti şartlarını añlatmaq

[explainADataTypeContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (qm):** Programma funktsiyası qaysı çeşit qıymetni alacaq dep beklegenini añla.

##### Birleşken malümat qurulışlarını añlatmaq

[explainCompositeDataStructures.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (qm):** Bir qaç qıymetni tertiplegen cedveller, massivler ve qaydlarnı tanı.

##### Programmalav tilindeki esas qıymetlerni añlatmaq

[explainPrimitiveValuesInALanguage.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (qm):** Saylanğan programmalav tili belgilegen sade qıymet çeşitlerini tanı.

##### Malümatnı şartlarğa köre teşkermek

[validateDataAgainstAContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (qm):** Kirsetüvni qullanmadan evel onıñ kerekli çeşitke ya da qurulışqa uyğun olğanını teşker.

#### Funktsiyalar ve yañıdan qullanuv

Skills: 5

[functionsAndReuse.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (qm):** Qaytadan qullanılacaq amellerni funktsiyalarğa nasıl birleştirmekni ögren.

##### Funktsiyanı argumentlernen çağırmaq

[callAFunctionWithArguments.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (qm):** Funktsiyanı argumentlernen çağır ve olarnıñ nasıl qullanılğanını izle.

##### Parametrli funktsiyanı belgilemek

[defineAFunctionWithParameters.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (qm):** Sabit misal qıymetleri yerine parametrler qabul etken funktsiyanı yaz.

##### Rekursiyanı añlatmaq

[explainRecursion.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (qm):** Rekursiv funktsiya kiçik vaziyetlerni çözerek soñunda nasıl toqtağanını añla.

##### Funktsiyanıñ maqsadını añlatmaq

[explainThePurposeOfAFunction.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (qm):** Adı olğan funktsiya çağırlğanda bir amelni nasıl icra etkenini añlat.

##### Funktsiyanıñ qaytarğan qıymetini qullanmaq

[useAFunctionsReturnValue.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (qm):** Qaytarılğan neticeni tek köstermek yerine soñraki esaplavlarda qullan.

#### Programma malümatları

Skills: 3

[programData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (qm):** Çalışqan programma qullanğan qıymetler ve deñişken alnen çalış.

##### Programmanıñ alını yañartmaq

[updateProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (qm):** Evvelki vaqialarğa köre programmanıñ saqlanğan alını deñiştir.

##### Deñişkenni qullanmaq

[useAVariable.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (qm):** Qıymetni deñişken adınen saqla ve kerekte onı oqu.

##### Kirsetilgen malümatlarnı qullanmaq

[useInputData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (qm):** Programmağa tışarıdan kirsetilgen malümat yardımınen onıñ nasıl çalışacağını belgile.

#### Programma qurulışı ve sintaksis

Skills: 4

[programStructureAndSyntax.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (qm):** Programmalav tilleri anahtar sözler, ifadeler ve bloklarnı nasıl tertiplegenini ögren.

##### Anahtar sözlerni belgileyicilerden ayırmaq

[distinguishKeywordsFromIdentifiers.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (qm):** Tilniñ ayırılğan sözlerini programmacılar saylağan adlardan ayır.

##### Amel işaretleri, ifadeler ve buyruqlarnı ayırmaq

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (qm):** Amel işareti, ifade ve buyruq arasındaki farqnı tanı.

##### Buyruq blokunıñ sıñırlarını añlatmaq

[explainStatementBlockBoundaries.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (qm):** Qaysı buyruqlar devirge, funktsiyağa ya da şart blokuna ait olğanını tap.

##### Sintaksisni renknen belgilemekni añlatmaq

[explainSyntaxHighlighting.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (qm):** Kodnıñ renkleri neni köstergenini ve neni isbat etmegenini añla.

#### Programmalav qurulışları

Skills: 7

[programmingConstructs.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (qm):** Sıralama, şart, devir ve vaqialar yardımınen programmalarnı idare etmege ögren.

##### Sonsuz devirni tapmaq

[detectAnInfiniteLoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (qm):** Şartı iç bir vaqıt yañlış olmağanı içün toqtamağan devirni tap.

##### Vaqianı işlemek

[handleAnEvent.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (qm):** Dögme basılğanda, haber kelgende ya da başqa vaqia olğanda programmanıñ cevap bergenini temin et.

##### Devirni amelge aşırmaq

[implementALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (qm):** Doğru toqtav şartı yerine ketirilgence buyruqlarnı tekrarlamaq içün devirni qullan.

##### Şartqa bağlı areketni amelge aşırmaq

[implementConditionalBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (qm):** Şartlar deñişkende programma farqlı işlerni saylağanını temin et.

##### Devirde deñişmegen esaplavlarnı tışarı çıqarmaq

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (qm):** Tekrarlavda deñişmegen esaplavlarnı devirniñ tışına çıqar.

##### Bir-birine örtüşken şart teşkerüvlerini sıralaştırmaq

[orderOverlappingConditionalChecks.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (qm):** Mahsus vaziyetlerge de yetmek içün şart teşkerüvlerini doğru sıraya qoy.

##### Buyruqlar sırasını yazmaq

[writeASequenceOfCommands.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (qm):** İşlerni kerekli sıra ile icra etken doğru buyruqlarnı yaz.

#### Programmalav paradigmaları

Skills: 4

[programmingParadigms.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (qm):** Programma mantığı ve davranışını tertiplemekniñ çeşit usullarını ögren.

##### Emirli ve beyanlı usullarnı ayırmaq

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (qm):** Açıq buyruqlar bermekni istenilgen neticeni tarif etmeknen qıyasla.

##### Funktsional programmalavnı añlatmaq

[explainFunctionalProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (qm):** Funktsiyalarnı birleştirip qıymetlerni deñiştirgen programmalarnı añla.

##### Obyektke yönelgen programmalavnı añlatmaq

[explainObjectOrientedProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (qm):** Alı ve davranışı olğan, bir-birinen tesirleşken obyektlerden qurulğan programmalarnı ögren.

##### Protsedural programmalavnı añlatmaq

[explainProceduralProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (qm):** Adım-adım yerine ketirilgen usullar esasında qurulğan programmalarnı ögren.

#### Programmalarnı oqumaq

Skills: 4

[readingPrograms.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (qm):** Programmanı nasıl oqumaq ve onıñ ne işlegenini adım-adım körmek mümkün olğanını ögren.

##### Buyruqnıñ maqsadını añlatmaq

[explainACommandsPurpose.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (qm):** Bir programmalav buyruğı programmanıñ alını nasıl deñiştirgenini añlat.

##### İcra sırasınıñ neticelerini aldından aytmaq

[predictConsequencesOfExecutionOrder.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (qm):** Buyruqlarnıñ sırası deñişse netice ne içün deñişmege mümkün olğanını añlat.

##### Programma çıqışını aldından aytmaq

[predictProgramOutput.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (qm):** Berilgen kirsetüvlerge köre programma qaysı körüngen neticeni beririni tap.

##### Programmanıñ alını izlemek

[traceProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (qm):** Programma çalışqan vaqıtta deñişkenler ve diger qıymetler nasıl deñişkenini izle.

#### Sınav ve hatalarnı tüzetüv

Skills: 4

[testingAndDebugging.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (qm):** Programmalardaki hatalarnı tapmaqnı, añlatmaqnı ve tüzetmekni ögren.

##### Programmanıñ yañlış çalışmasını tapmaq

[detectIncorrectProgramBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (qm):** Programmanıñ işlevi talaplarğa uygun olmağanını tanı.

##### Programma qusurını tüzetmek

[fixAProgramDefect.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (qm):** Belgili qusurnı tüzet ve talap etilgen işlev daa doğru çalışqanını teşker.

##### Hatanıñ sebebini tapmaq

[locateTheCauseOfAnError.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (qm):** Programmalav hatasını onı peyda etken buyruq ya da şartqa qadar izle.

##### Programmanı farqlı kirsetüvlernen sınamaq

[testAProgramWithDifferentInputs.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (qm):** Programmanı çeşit kirsetüvlernen, olardan da sıñır vaziyetlernen sına.

### Robototehnika ve avtomatlaştırma

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (qm):** Sensorlar, programmalav ve areket etici qurulışlar robotlarğa etrafqa nasıl cevap bermege yardım etkenini araştır.

#### Robotnı idare etüv

Skills: 4

[robotControl.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (qm):** Robotnıñ areketi ve cevabı içün talimatlar yarat ve olarnı yahşılaştır.

##### Robotnıñ tekrar etken areketini sazlamaq

[configureARepeatedRobotAction.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (qm):** Robot bir areketni qaç kere tekrarlaycağını ya da ne vaqıt toqtaycağını belgile.

##### Robotnıñ areketler sırasını yaratmaq

[createARobotMovementSequence.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (qm):** Robotnı maqsatına alıp barğan areket buyrıqlarınıñ sırasını planla.

##### Robotnıñ areketindeki hatanı tapıp tüzetmek

[debugRobotBehavior.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (qm):** Robotnıñ beklenmegen areketi sensor, idare qaidesi ya da icra etici qurulıştan kelgenini belgile.

##### Robotnıñ maniağa cevabını işletmek

[implementRobotObstacleResponse.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (qm):** Sensor mania tapqanda robotnı toqtat, döndür ya da manianı aylanıp keçmesini teşkil et.

#### Robot sistemasınıñ qisımları

Skills: 4

[roboticSystemComponents.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (qm):** Robot vaziyetni nasıl sezgenini, ne yapmaq kerekligini saylağanını ve areket etkenini ögren.

##### Robotnıñ kontrol qurulışını tanımaq

[identifyARobotController.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (qm):** Sensorlardan kelgen işaretlerni programmalanğan areketlerge çevirgen qurulışnı tanı.

##### Sensornıñ vazifesini tanımaq

[identifyASensorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (qm):** Yarıq, mesafe, temperatura ve başqa şartlarnı ölçken sensorlarnı tanı.

##### Areket etici qurulışnıñ vazifesini tanımaq

[identifyAnActuatorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (qm):** Motor, lampa ve başqa areket etici qurulışlar buyrıqlarnı nasıl yerine ketirgenini añlat.

##### Sensordan areketke bağnı modellemek

[modelTheSensorToActionRelationship.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (qm):** Sensornıñ ölçüvini, qarar qaidesini ve areket etici qurulışnıñ cevabını bağla.

### Programma teminatınıñ arhitekturası

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (qm):** Obyektler, mesuliyetler ve bağlılıqlar işançlı programmalarnı nasıl tertiplegenini ögren.

#### Tasarlav printsipleri

Skills: 8

[designPrinciples.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (qm):** Programmalarnı añlaşılır ve deñişüvge uyğun saqlaycaq printsiplerni ögren.

##### Kereksiz hususiyetlerni soñrağa qaldırmaq (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (qm):** Tek hayal etilgen kelecek içün hususiyetler yapmaqnı terk et.

##### Bağlılıqlarnı şartnamelerge esaslanıp tasarlamaq (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (qm):** İş mantığını konkret hızmetlerden ayırıp şartnamelerge tayana.

##### Esasnı deñiştirmey areketni keñletmek (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (qm):** Sabit esas mantığını yeniden yazmay, yañı areket içün keñletüv noqtalarını tasarla.

##### Kereksiz tekrarlanmanı tapmaq (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (qm):** İleride uyğun kelmegen deñişüvlerge sebep ola bilgen tekrarlanğan qaydalarnı tap.

##### Bir mesuliyetni ayırmaq (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (qm):** Modulni deñiştirüv içün bir uyğun sebep çevresinde tertiple.

##### Kereksiz qıyınlıqnı azaytmaq (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (qm):** Talaplar talap etmegen mehanizmlerni çıqarıp programmanı sadeleştir.

##### Tar interfeyslerni ayırmaq (ISP)

[separateNarrowInterfacesISP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (qm):** İnterfeyslerni müşteri tek qullanğan işlemlerge muhtac olaçaq qadar tar tut.

##### Almaştıruvğa uygunlıqnı teşkermek (LSP)

[verifySubstitutabilityLSP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (qm):** Bir işlev ortaq şartnamenıñ vadelerine uyğun kelgenini teşker.

#### Obyekt modeli

Skills: 13

[objectModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (qm):** Programma obyektleri öz alları ve areketlerini nasıl birleştirgenini ögren.

##### Obyekt soyutlamasını qullanmaq

[applyObjectAbstraction.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (qm):** Komponent qullanıcılarğa köstermesi kerek esas işlerini sayla.

##### Sınıfnı obyektden ayırmaq

[distinguishAClassFromAnObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (qm):** Sınıfnıñ şablonını özüne mahsus şimdiki qiymetleri olğan obyektlerden ayır.

##### Aqiqiy şeyni soyut modelinden ayırmaq

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (qm):** Programma modeli bir şeyniñ tek saylanğan hususiyetlerini köstergenini añla.

##### Obyekt metodını añlatmaq

[explainAnObjectMethod.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (qm):** Metodnı çağırmaq obyektniñ alını nasıl oquya ya da deñiştire bile, añlat.

##### Obyekt hususiyetini añlatmaq

[explainAnObjectProperty.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (qm):** Obyektniñ saqlanğan hususiyetini onıñ yapabilgen işlemlerinden ayır.

##### İnkapsulyatsiyanı añlatmaq

[explainEncapsulation.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (qm):** Obyektler öz içki alını idare etilgen metodlarnen nasıl qoruy, añla.

##### Miraslıqnı añlatmaq

[explainInheritance.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (qm):** İhtisaslaşqan sınıf daa umumiy sınıfnıñ areketini nasıl miras ala bile, añlat.

##### Polimorfizmnı añlatmaq

[explainPolymorphism.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (qm):** Ayrı obyektler aynı işlemi türlü usullarnen nasıl yapabildiğini ögren.

##### Sınıf mefhumını añlatmaq

[explainTheConceptOfAClass.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (qm):** Sınıfnı ayrı obyektler yapılğan tarif olaraq añla.

##### Programma obyektiniñ quruluşını añlatmaq

[explainTheStructureOfASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (qm):** Mevcut obyektniñ kimligini, hususiyetlerini ve metodlarını belgile.

##### Obyektniñ alını ve areketini belgilemek

[identifyAnObjectsStateAndBehavior.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (qm):** Obyektniñ hususiyetlerini ve yapabilgen işlerini tasvir et.

##### Saa varlığını programma obyekti olaraq modellemek

[modelADomainEntityAsASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (qm):** Uygun hususiyetler ve işlemlerni saylap faydalı obyekt tasarla.

##### Obyekt kompozitsiyasını modellemek

[modelObjectComposition.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (qm):** Ayrı mesuliyetleri olğan ufak qısımlardan daa büyük programma obyektleri qur.

