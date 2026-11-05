<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (tr)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### Algoritmalar

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../learningApps/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (tr):** Sorun çözmek için tekrarlanabilir yöntemler tasarlamayı, uygulamayı ve karşılaştırmayı öğren.

#### Analiz

Skills: 3

[analysis.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (tr):** Bir algoritmanın zaman ve bellek gereksinimlerinin girdiye göre nasıl değiştiğini keşfet.

##### Doğrusal ve logaritmik büyümeyi ayırt etmek

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (tr):** Girdi boyutuyla orantılı büyümeyi sürekli yarıya bölmeden doğan büyümeyle karşılaştır.

##### Bir algoritmanın en kötü durumunu tahmin etmek

[estimateAnAlgorithmsWorstCase.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (tr):** En kötü durumda algoritmanın gerekebileceği en fazla kontrol sayısını tahmin et.

##### Zaman ve bellek ödünleşimlerini açıklamak

[explainTimeMemoryTradeOffs.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (tr):** Daha hızlı algoritmaların neden daha fazla geçici belleğe ihtiyaç duyabileceğini anla.

#### Koleksiyon işleme

Skills: 4

[collectionProcessing.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (tr):** Verileri tararken saymayı, toplamayı ve en büyük ya da küçük değeri bulmayı öğren.

##### Öğe sayma yöntemini uygulamak

[applyElementCounting.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (tr):** Koleksiyonda verilen koşulu sağlayan tüm öğeleri say.

##### En büyük değeri bulmak

[applyMaximumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (tr):** Koleksiyonu gezerken şimdiye dek bulunan en büyük değeri izle.

##### En küçük değeri bulmak

[applyMinimumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (tr):** Koleksiyonu gezerken şimdiye dek bulunan en küçük değeri izle.

##### Toplam biriktirmeyi uygulamak

[applySumAccumulation.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (tr):** Koleksiyon değerlerini adım adım biriken toplama ekle.

#### Oluşturma

Skills: 6

[construction.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (tr):** Bir algoritmanın işlemlerini, koşullarını ve durma kurallarını belirlemeyi öğren.

##### Algoritmaları gereksinimlere göre karşılaştırmak

[compareAlgorithmsAgainstRequirements.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (tr):** Olası algoritmaları koşulları ve sınırlamaları açısından karşılaştır.

##### Sıralı bir algoritma oluşturmak

[constructASequentialAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (tr):** Doğru sırayla yapılan sonlu bir dizi adımı açıkla.

##### Algoritmanın amacını belirlemek

[defineAnAlgorithmsGoal.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (tr):** Algoritmanın neyi başarması gerektiğini ve kabul ettiği girdileri belirt.

##### Koşullu dallanma tasarlamak

[designConditionalBranching.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (tr):** Açık koşullara göre algoritmanın farklı yollarını planla.

##### Tekrarlamayı tasarlamak

[designRepetition.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (tr):** Doğru güncellemeler ve durma koşulu içeren tekrar eden süreç tasarla.

##### Özyinelemeli algoritma uygulamak

[implementARecursiveAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (tr):** Küçülen alt problemler ve sonlandıran bir temel durum içeren özyinelemeli algoritma kur.

#### Arama

Skills: 6

[search.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (tr):** Farklı arama yöntemlerinin koleksiyonda bir öğeyi nasıl bulduğunu keşfet.

##### İkili arama uygulamak

[applyBinarySearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (tr):** Sıralı veride aralığın yarısını tekrar tekrar eleyerek değeri bul.

##### İkili arama ağacında arama yapmak

[applyBinaryTreeSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (tr):** Bir anahtarı bulmak için ikili arama ağacının sıralı dallarını izle.

##### Doğrusal arama uygulamak

[applyLinearSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (tr):** Öğeleri tek tek kontrol ederek hedefi bul.

##### Arama yöntemlerini kontrol sayısına göre karşılaştırmak

[compareSearchMethodsByCheckCount.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (tr):** Doğrusal ve ikili aramanın kaç kontrol gerektirdiğini karşılaştır.

##### İkili aramanın ön koşullarını belirlemek

[identifyBinarySearchPrerequisites.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (tr):** Verilerin ikili arama için gereken sıralama şartını sağladığını denetle.

##### Aramanın ölçeklenmesini öngörmek

[predictSearchScaling.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (tr):** Veri iki katına çıktığında ikili aramada neden yaklaşık bir ek kontrol gerektiğini anla.

#### Sıralama

Skills: 4

[sorting.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (tr):** Sıralama yöntemlerinin değerleri seçilen düzene nasıl yerleştirdiğini öğren.

##### Kabarcık sıralamasını uygulamak

[applyBubbleSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (tr):** Yanlış sıradaki komşu değerleri yer değiştirerek sırala.

##### Eklemeli sıralama uygulamak

[applyInsertionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (tr):** Her yeni öğeyi önceden sıralı bölüme yerleştirerek sırala.

##### Seçmeli sıralama uygulamak

[applySelectionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (tr):** Her adımda kalan en küçük öğeyi seçerek sırala.

##### Sıralama ölçütünü açıklamak

[explainASortingCriterion.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (tr):** Koleksiyonu sıralamak için kullanılacak değer veya özelliği seç.

### Yapay zekâ

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (tr):** Yapay zekâ sistemlerinin nasıl öğrendiğini, tahmin ve üretim yaptığını, bazen de hata verdiğini keşfet.

#### Yapay zekânın temelleri

Skills: 6

[aIFundamentals.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (tr):** Programlanmış kurallar, eğitilmiş modeller ve yapay zekâ görevleri arasındaki farkları keşfet.

##### Yapay zekâ görevlerini sınıflandırmak

[classifyAITasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (tr):** Bir yapay zekâ görevinin sınıflandırma mı, tahmin mi, içerik üretimi mi yaptığını belirle.

##### Kuralları eğitilmiş modellerden ayırmak

[distinguishRulesFromTrainedModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (tr):** Açıkça programlanmış karar kuralları ile verilerle eğitilmiş sistemleri ayırt et.

##### Üretken yapay zekâyı açıklamak

[explainGenerativeAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (tr):** Üretken modellerin metin, görsel ve başka içerikleri nasıl oluşturduğunu anla.

##### Örneklerden öğrenmeyi açıklamak

[explainLearningFromExamples.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (tr):** Örneklerin modelin yeni girdilerde daha iyi sonuç vermesine nasıl yardım ettiğini açıkla.

##### Tahmine dayalı yapay zekâyı açıklamak

[explainPredictiveAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (tr):** Tahmin sistemlerinin değerleri, kategorileri veya olay olasılıklarını nasıl kestirdiğini keşfet.

##### Olası bir yapay zekâ hatasını belirlemek

[identifyAPotentialAIError.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (tr):** Bir yapay zekâ yanıtının bağımsız doğrulama gerektirdiğini gösteren uyarıları fark et.

#### Taklit ve anlama

Skills: 2

[imitationAndUnderstanding.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (tr):** İkna edici taklit ile gerçek anlama arasındaki farkı incele.

##### Searle'ün Çin odasını açıklamak

[explainSearlesChineseRoom.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (tr):** Çin odası düşünce deneyini ve ortaya çıkardığı tartışmayı keşfet.

##### Turing testini açıklamak

[explainTheTuringTest.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (tr):** Turing testinin neyi ölçtüğünü ve neyi kanıtlayamayacağını anla.

#### Dil modeli tokenları ve bağlam

Skills: 6

[languageModelTokensAndContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (tr):** Dil modellerinin metni tokenlara nasıl böldüğünü ve bağlamı nasıl kullandığını keşfet.

##### Örneklemeyi en olası tokenı seçmekten ayırmak

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (tr):** En olası tokenı seçmeyle diğer olası devamları örneklemeyi karşılaştır.

##### Tokenları, karakterleri ve sözcükleri ayırmak

[distinguishTokensCharactersAndWords.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (tr):** Karakterlerin, sözcüklerin ve tokenların neden aynı şey olmadığını anla.

##### Dil modelinin bağlam penceresini açıklamak

[explainALanguageModelsContextWindow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (tr):** Bir dil modelinin neden yalnızca sınırlı miktarda bağlam kullanabildiğini anla.

##### Bağlam penceresinin aşılmasını açıklamak

[explainContextWindowOverflow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (tr):** Bir istek modelin bağlam sınırını aşarsa neler olabileceğini keşfet.

##### Sonraki token seçimini açıklamak

[explainNextTokenSelection.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (tr):** Dil modellerinin bağlama göre olası sonraki tokenı nasıl seçtiğini açıkla.

##### Tokenları açıklamak

[explainTokens.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (tr):** Tokenları modele özgü metin temsil birimleri olarak anla.

#### Model mimarileri ve kaynaklar

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (tr):** Farklı yapay zekâ model mimarilerinin performansı ve kaynak ihtiyacını nasıl etkilediğini keşfet.

##### Bir göreve uygun model seçmek

[chooseAModelForATask.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (tr):** Görev kalitesi, hız, maliyet, gizlilik ve kullanılabilir belleğe göre model seç.

##### Yoğun ve uzmanlar karışımı modellerini karşılaştırmak

[compareDenseAndMoEModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (tr):** Çok sayıda parametreyi etkinleştiren modelleri yalnızca seçili uzmanları kullananlarla karşılaştır.

##### Modellerin bellek gereksinimlerini karşılaştırmak

[compareModelMemoryRequirements.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (tr):** Modeli yalnızca depolamak için değil, çalıştırmak için gereken belleği tahmin et.

##### Yanıt gecikmesini karşılaştırmak

[compareResponseLatency.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (tr):** Yapay zekâ yanıtının başlamasına kadar geçen süreyi üretim hızından ayrı karşılaştır.

##### Nicemlemeyi açıklamak

[explainQuantization.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (tr):** Sayısal hassasiyeti azaltmanın bellek kazandırırken kaliteyi değiştirebileceğini anla.

#### Prompt yazma

Skills: 7

[prompting.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (tr):** Yapay zekâ sistemlerine daha açık talimatlar, bağlam ve kısıtlar vermeyi öğren.

##### Karmaşık promptu alt görevlere ayırmak

[breakAComplexPromptIntoSubtasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (tr):** Karmaşık isteği sonuçları doğrulanabilen küçük adımlara böl.

##### Prompta bağlam eklemek

[providePromptContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (tr):** Yapay zekânın isteğini yorumlamasına yardımcı olacak ilgili bilgileri ver.

##### Sonuca göre promptu iyileştirmek

[refineAPromptBasedOnResults.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (tr):** Önceki yanıtın eksiklerini kontrol ederek yapay zekâ isteğini geliştir.

##### Prompt hedefini belirtmek

[specifyAPromptObjective.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (tr):** Yapay zekâ asistanından tam olarak hangi görevi yapmasını istediğini belirt.

##### Promptta rol belirtmek

[specifyARoleInAPrompt.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (tr):** Yararlı bir bakış açısı veya üslup belirle ama bunu gerçek uzmanlıkla karıştırma.

##### Çıktı biçimini belirtmek

[specifyAnOutputFormat.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (tr):** Tablo veya belirli alanlar gibi açık bir yanıt yapısı iste.

##### Prompt kısıtlarını belirtmek

[specifyPromptConstraints.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (tr):** Uzunluk, kaynaklar ve uydurulmaması gereken bilgiler gibi sınırlar koy.

#### Yapay zekânın güvenilirliği ve sorumlu kullanımı

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (tr):** Yapay zekâ çıktılarını doğrulamayı ve insanlar üzerindeki etkilerini düşünmeyi öğren.

##### Yapay zekâ destekli kararlarda insan sorumluluğunu açıklamak

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (tr):** Yapay zekâ yardımıyla alınan kararlardan neden hâlâ insanların sorumlu olduğunu anla.

##### Promptlarda kişisel verileri korumak

[protectPersonalDataInPrompts.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (tr):** Yapay zekâya istek göndermeden önce gereksiz kişisel bilgileri çıkar.

##### Yapay zekâ yanlılığı risklerini tanımak

[recognizeAIBiasRisks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (tr):** Yapay zekâ sistemlerinin kişilere veya gruplara ne zaman adaletsiz davranabileceğini fark et.

##### Yapay zekâ yanıtındaki olguları doğrulamak

[verifyFactsInAnAIResponse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (tr):** Yapay zekânın olgusal iddialarını güvenilir bağımsız kaynaklarla kontrol et.

#### Yapay zekâyla güvenli etkileşim

Skills: 4

[safeInteractionWithAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (tr):** Yapay zekâ tavsiyelerini yanıltıcı kılabilecek veya sağlıksız bağımlılık yaratabilecek etkileşimleri tanı.

##### Yapay zekâya aşırı güvenmenin risklerini açıklamak

[explainRisksOfOverrelianceOnAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (tr):** Yapay zekânın bağımsız düşünme veya insan desteğinin yerini almaması gerektiğini anla.

##### Yapay zekâ girdisinde güvenilmeyen talimatları belirlemek

[identifyUntrustedInstructionsInAIInput.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (tr):** Dış içerikte gizlenmiş, asistanı yönetmemesi gereken talimatları fark et.

##### Yapay zekâ kullanırken gizli bilgileri korumak

[protectSecretsWhenUsingAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (tr):** Yapay zekâyla çalışırken parolaları, erişim anahtarlarını ve gizli bilgileri koru.

##### Yapay zekânın dalkavukluğunu tanımak

[recognizeAISycophancy.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (tr):** Kanıta dayanmayan yapay zekâ onayını veya övgüsünü fark et.

### Bilgi işlemsel düşünme

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (tr):** Karmaşık sorunları açık adımlara, örüntülere ve kurallara ayırmayı keşfet.

#### Ayrıştırma ve soyutlama

Skills: 4

[decompositionAndAbstraction.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (tr):** Sorunların temel parçalarını ve ilişkilerini belirleyerek onları basitleştirmeyi öğren.

##### Soyut bir sistem modeli oluşturmak

[buildAnAbstractSystemModel.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (tr):** Karmaşık bir durumun veya sistemin basitleştirilmiş bir temsilini oluştur.

##### Bir problemi parçalara ayırmak

[decomposeAProblem.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (tr):** Büyük bir problemi ayrı ayrı çözülebilen küçük görevlere böl.

##### Tekrarlanan bir yöntemi genelleştirmek

[generalizeARepeatedMethod.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (tr):** Birden fazla özel problemin ortak kullandığı, yeniden uygulanabilir yöntemi bul.

##### Bir nesnenin temel özelliklerini belirlemek

[identifyEssentialObjectProperties.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (tr):** Bir görev için önemli ayrıntıları seç ve ilgisiz olanları bir kenara bırak.

#### Mantık ve örüntüler

Skills: 8

[logicAndPatterns.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (tr):** Kuralların, örüntülerin ve mantıksal koşulların problem çözmeye nasıl yardım ettiğini keşfet.

##### Mantıksal VE işlemini uygulamak

[applyLogicalAND.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (tr):** İki koşulun da sağlanıp sağlanmadığını VE ile denetle.

##### Mantıksal DEĞİL işlemini uygulamak

[applyLogicalNOT.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (tr):** Bir koşulun doğruluk değerini tersine çevirmek için DEĞİL kullan.

##### Mantıksal VEYA işlemini uygulamak

[applyLogicalOR.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (tr):** İki koşuldan en az birinin sağlanıp sağlanmadığını VEYA ile denetle.

##### Çelişkili kuralları tespit etmek

[detectContradictoryRules.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (tr):** İki gerekliliğin aynı anda doğru olamayacağı durumları tanı.

##### Basit bir koşulu değerlendirmek

[evaluateASimpleCondition.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (tr):** Tek bir koşulun doğru, yanlış veya henüz belirlenemez olduğuna karar ver.

##### Bileşik mantıksal ifadeleri değerlendirmek

[evaluateCompoundLogicalExpressions.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (tr):** Birden fazla işleci olan mantıksal ifadeleri doğru sırayla değerlendir.

##### Bir kurala göre sonucu tahmin etmek

[predictAnOutcomeFromARule.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (tr):** Kural ve başlangıç durumu biliniyorsa bir sonraki sonucu çıkar.

##### Bir örüntüyü tanımak

[recognizeAPattern.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (tr):** Dizilerdeki örüntüleri bul ve önerilen kuralın uyup uymadığını denetle.

### Veri Yapıları

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (tr):** Koleksiyonların, anahtarların, ağaçların ve ağların farklı işlemler için verileri nasıl düzenlediğini öğren.

#### Sözlükler

Skills: 3

[dictionaries.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (tr):** Sözlüklerin benzersiz anahtarları saklanan değerlerle nasıl eşleştirdiğini keşfet.

##### Sözlük yapısını açıklamak

[explainDictionaryStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (tr):** Bir sözlüğün bilgiyi konuma göre değil anahtara göre nasıl bulduğunu anla.

##### Anahtarla sözlük değeri almak

[retrieveADictionaryValueByKey.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (tr):** Sözlükte bir değeri anahtarıyla bul ve anahtar yoksa bu durumu ele al.

##### Sözlük değerini güncellemek

[updateADictionaryValue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (tr):** Sözlükte zaten bulunan bir anahtarın değerini değiştir.

#### Graflar

Skills: 6

[graphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (tr):** Grafların yerleri, nesneleri ve aralarındaki bağlantıları nasıl gösterdiğini keşfet.

##### Yönlü ve yönsüz grafları ayırt etmek

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (tr):** Bağlantıların tek yönlü mü yoksa çift yönlü mü olduğunu belirle.

##### Ağaçları döngü içeren graflardan ayırt etmek

[distinguishTreesFromGraphsWithCycles.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (tr):** Graflarda döngü bulunabilirken ağaçlarda neden bulunmadığını anla.

##### Ağırlıklı ve ağırlıksız grafları ayırt etmek

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (tr):** Graf bağlantılarının mesafe veya maliyet gibi sayılar taşıdığını fark et.

##### Graf yapısını açıklamak

[explainGraphStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (tr):** Bir graftaki düğümleri ve onları bağlayan kenarları tanı.

##### Grafta yol bulmak

[findAPathInAGraph.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (tr):** Bağlantıların yönüne uyarak düğümler arasında geçerli bir yol izle.

##### Komşu düğümleri belirlemek

[identifyAdjacentVertices.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (tr):** Başka bir düğüme doğrudan bağlı düğümleri belirle.

#### Kuyruk

Skills: 3

[queue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (tr):** Bir kuyruğun öğeleri geliş sırasına göre nasıl işlediğini öğren.

##### Kuyruktan öğe çıkarmak

[dequeueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (tr):** Diğer öğelerin sırasını bozmadan kuyruğun başındaki öğeyi çıkar.

##### Kuyruğa öğe eklemek

[enqueueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (tr):** Kuyruğun sonuna yeni bir öğe ekle.

##### FIFO ilkesini açıklamak

[explainFIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (tr):** Kuyruğa ilk giren öğenin neden ilk çıktığını açıkla.

#### Diziler

Skills: 7

[sequences.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (tr):** Sıralı koleksiyonlarda öğelere erişmeyi, eklemeyi ve kaldırmayı keşfet.

##### Dizi öğesine indeksle erişmek

[accessASequenceElementByIndex.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (tr):** Geçerli konumların dışına çıkmadan indeksle bir öğeyi al.

##### Dizileri bağlı listelerden ayırt etmek

[distinguishArraysFromLinkedLists.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (tr):** İndeksli dizileri birbirine bağlı düğüm zincirleriyle karşılaştır.

##### Dizi yapısını açıklamak

[explainArrayStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (tr):** Dizilerin öğeleri indekslerle belirtilen konumlarda nasıl tuttuğunu anla.

##### Liste yapısını açıklamak

[explainListStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (tr):** Listelerin farklı biçimlerde gösterilebilen sıralı koleksiyonlar olduğunu anla.

##### Diziye öğe eklemek

[insertAnElementIntoASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (tr):** Sıralı bir dizide öğeyi uygun konuma yerleştir.

##### Diziden öğe kaldırmak

[removeAnElementFromASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (tr):** Kalan öğelerin sırasını koruyarak bir öğeyi kaldır.

##### Bir diziyi dolaşmak

[traverseASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (tr):** Dizideki her öğeyi sırayla ziyaret et.

#### Kümeler

Skills: 4

[sets.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (tr):** Benzersiz değer kümelerini ve üyelik işlemlerini keşfet.

##### Küme kesişimini hesaplamak

[computeSetIntersection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (tr):** Yalnızca iki kümede de bulunan öğeleri bul.

##### Küme birleşimini hesaplamak

[computeSetUnion.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (tr):** İki kümedeki tüm farklı öğeleri tekrar etmeden birleştir.

##### Küme yapısını açıklamak

[explainSetStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (tr):** Bir kümenin her farklı öğeyi neden yalnızca bir kez tuttuğunu anla.

##### Küme üyeliğini sınamak

[testSetMembership.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (tr):** Belirli bir değerin kümeye ait olup olmadığını denetle.

#### Yığın

Skills: 3

[stack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (tr):** Yığının en son eklenen öğeye önce nasıl eriştiğini keşfet.

##### LIFO ilkesini açıklamak

[explainLIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (tr):** Yığının son eklenen öğeyi neden önce çıkardığını anla.

##### Yığından öğe çıkarmak

[popAnElementFromAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (tr):** Yığının boş olup olmadığını denetleyerek son eklenen öğeyi çıkar.

##### Yığına öğe eklemek

[pushAnElementOntoAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (tr):** Yığının tepesine yeni bir öğe koy.

#### Veri yapısı seçimi

Skills: 4

[structureSelection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (tr):** Programın veriyi kullanma biçimine uygun veri yapısını seç.

##### Gerekli işlemler için yapı seçmek

[chooseAStructureForRequiredOperations.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (tr):** İndeksleme, üyelik, kuyruk veya ilişkiler için uygun koleksiyonu seç.

##### Koleksiyonlara ekleme maliyetlerini karşılaştırmak

[compareCollectionInsertionCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (tr):** Eklemenin neden dizi öğelerini kaydırmayı veya bağlantıları değiştirmeyi gerektirdiğini keşfet.

##### Öğelere erişim maliyetlerini karşılaştırmak

[compareElementAccessCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (tr):** Diziler ve bağlı listelerin belirli bir öğeye ne kadar hızlı ulaştığını karşılaştır.

##### Veri yapılarını algoritmalardan ayırt etmek

[distinguishDataStructuresFromAlgorithms.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (tr):** Veriyi bir yapıda düzenlemekle algoritmayla işlemek arasındaki farkı anla.

#### Ağaçlar

Skills: 4

[trees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (tr):** Ağaçların bilgiyi ebeveyn-çocuk bağlantılarıyla nasıl düzenlediğini keşfet.

##### Yaprak ve iç ağaç düğümlerini ayırt etmek

[distinguishLeafAndInternalTreeNodes.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (tr):** Çocuk düğümü olan düğümlerle çocuğu olmayan yaprakları ayırt et.

##### İkili arama ağaçlarını açıklamak

[explainBinarySearchTrees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (tr):** İkili arama ağacında aramayı sağlayan anahtar sıralama kuralını anla.

##### Ağaç yapısını açıklamak

[explainTreeStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (tr):** Bir ağaçtaki kökü, dalları, düğümleri ve bağlantıları tanı.

##### Ağaçta yol bulmak

[findAPathInATree.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (tr):** Ağaçtaki iki düğüm arasındaki var olan bağlantıları izle.

### Tasarım Kalıpları

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../learningApps/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (tr):** Yazılım nesnelerini oluşturma, birleştirme ve koordine etmenin yeniden kullanılabilir yollarını keşfet.

#### Davranışsal Kalıplar

Skills: 11

[behavioral.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (tr):** Nesnelerin istekleri nasıl koordine ettiğini ve davranış değiştirdiğini keşfet.

##### Sorumluluk Zinciri

[chainOfResponsibility.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (tr):** Bir istek işlenene dek işleyiciler arasında sırayla aktar.

##### Komut

[command.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (tr):** Bir işlemi saklanabilen veya zamanlanabilen bir nesne olarak temsil et.

##### Yorumlayıcı

[interpreter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (tr):** İfadelerle gösterilen kuralları kullanarak küçük bir dili yorumla.

##### Yineleyici

[iterator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (tr):** Koleksiyonun nasıl saklandığını göstermeden öğelerini ziyaret et.

##### Arabulucu

[mediator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (tr):** Bileşenler arasındaki etkileşimi merkezi bir arabulucuyla koordine et.

##### Hatıra

[memento.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (tr):** Nesnenin durumunu daha sonra geri yüklemek için sakla.

##### Gözlemci

[observer.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (tr):** Gözlenen nesne değişince ilgili abonelere haber ver.

##### Durum

[state.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (tr):** Nesnenin tepkisini mevcut durumuna göre değiştir.

##### Strateji

[strategy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (tr):** Aynı ortak arayüzü izleyen algoritmalar arasında geçiş yap.

##### Şablon Metodu

[templateMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (tr):** Algoritmanın ana adımlarını sabit tutarken seçili adımların değişmesine izin ver.

##### Ziyaretçi

[visitor.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (tr):** İşlemleri etkiledikleri nesne yapılarından ayır.

#### Yaratımsal Kalıplar

Skills: 5

[creational.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (tr):** İstemcileri somut türlere bağlamadan nesne oluşturan kalıpları öğren.

##### Soyut Fabrika

[abstractFactory.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (tr):** Birbirine uyumlu ilişkili nesne aileleri oluşturan fabrika kullan.

##### İnşacı

[builder.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (tr):** Karmaşık bir nesneyi inşacı ile adım adım oluştur.

##### Fabrika Metodu

[factoryMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (tr):** Fabrika metodunun hangi somut nesneyi oluşturacağına alt sınıfların karar vermesini sağla.

##### Prototip

[prototype.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (tr):** Önceden yapılandırılmış örneği kopyalayarak yeni nesneler oluştur.

##### Tekil Nesne

[singleton.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (tr):** Genel durumun risklerini düşünerek tek paylaşılan örneğe erişimi denetle.

#### Yapısal Kalıplar

Skills: 7

[structural.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (tr):** Yazılım bileşenlerini bağlama, sarma ve paylaşma kalıplarını keşfet.

##### Uyarlayıcı

[adapter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (tr):** Uyumsuz arayüzleri aralarında dönüştürme yaparak bağla.

##### Köprü

[bridge.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (tr):** Bir bileşenin soyutlamasını kullandığı uygulamadan ayır.

##### Bileşik

[composite.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (tr):** Tekil nesneleri ve nesne gruplarını ortak bir arayüzden yönet.

##### Dekoratör

[decorator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (tr):** Alt sınıfları çoğaltmak yerine nesneyi sararak yeni davranış ekle.

##### Cephe

[facade.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (tr):** Karmaşık bileşen kümesine basit bir giriş noktası sun.

##### Sinek Sıklet

[flyweight.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (tr):** Gereksiz bellek kullanımını azaltmak için yeniden kullanılabilir nesne verilerini paylaş.

##### Vekil

[proxy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (tr):** Aynı arayüze sahip başka bir nesneyle hedef nesneye erişimi denetle.

### Dijital yaratıcılık ve oyunlar

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (tr):** Dijital içerikler oluştur, oynanabilir oyun kuralları tasarla ve prosedürel üretimi keşfet.

#### Dijital materyaller

Skills: 3

[digitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (tr):** Amaca uygun dijital içerik oluşturmayı, düzenlemeyi ve doğru araçları seçmeyi öğren.

##### Dijital yaratıcı araç seçmek

[chooseADigitalCreativeTool.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (tr):** Üretmek istediğin şeye uygun yaratıcı yazılımı seç.

##### Basit bir dijital ürün oluşturmak

[createASimpleDigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (tr):** Belirli bir kitle için tutarlı bir dijital kart, görsel veya başka bir çalışma oluştur.

##### Dijital bir ürünü düzenlemek

[editADigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (tr):** Var olan bir dijital dosyayı amaçlanan anlamını koruyarak geliştir.

#### Oyun tasarımı

Skills: 3

[gameDesign.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (tr):** Kuralların ve oyuncu eylemlerinin oyun deneyimini nasıl şekillendirdiğini keşfet.

##### Oyun mekaniği tasarlamak

[designAGameMechanic.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (tr):** Oyuncunun eylemini oyun durumundaki değişikliklere ve geri bildirime bağla.

##### Oyun kuralı oluşturmak

[formulateAGameRule.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (tr):** Oyuncuların neye izin verildiğini anlayacağı kadar açık bir oyun kuralı yaz.

##### Basit bir oyunun dengesini test etmek

[testTheBalanceOfASimpleGame.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (tr):** Kuralların oyunu adil, zorlayıcı ve bitirilebilir kılıp kılmadığını test et.

#### Prosedürel üretim

Skills: 4

[proceduralGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (tr):** Algoritmaların kısa kurallardan nasıl çok sayıda içerik çeşidi ürettiğini keşfet.

##### Kaynak depolama ve üretimini karşılaştırmak

[compareResourceStorageAndGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (tr):** Prosedürel üretimin kazandırdığı depolama alanını gereken hesaplama ile karşılaştır.

##### Üreteç parametrelerini ayarlamak

[configureGeneratorParameters.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (tr):** Çıktının görünümünü veya miktarını kontrol etmek için üreteç ayarlarını değiştir.

##### Prosedürel kaynak üretimini açıklamak

[explainProceduralResourceGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (tr):** Bir üretecin her bitmiş çeşidi depolamak yerine kaynakları nasıl oluşturduğunu açıkla.

##### Üretim tohumu ile sonuçları yeniden oluşturmak

[reproduceResultsUsingAGenerationSeed.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (tr):** Sabit bir tohumun ve değişmeyen kuralların aynı sonucu nasıl ürettiğini anla.

### Dijital ürün kullanıcı deneyimi

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (tr):** İnsanların anlayıp gezinebileceği ve erişilebilir biçimde kullanabileceği dijital deneyimler tasarla.

#### Erişilebilirlik

Skills: 2

[accessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (tr):** Farklı becerilerin ve giriş yöntemlerinin dijital erişimi nasıl etkilediğini keşfet.

##### Farklı yeteneklere sahip kullanıcıların ihtiyaçlarını belirlemek

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (tr):** Klavye, büyütülmüş metin veya yardımcı teknoloji kullanan kişilerin ihtiyaçlarını tanı.

##### Dijital etkileşimin erişilebilirliğini test etmek

[testDigitalInteractionAccessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (tr):** Fare veya ses kullanmadan arayüzü test et ve engelleri kaydet.

#### Dijital etkileşim tasarımı

Skills: 4

[digitalInteractionDesign.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (tr):** Dijital arayüzlerde sezgisel eylemleri ve yararlı geri bildirimleri planlamayı keşfet.

##### Dijital arayüz geri bildirimi tasarlamak

[designDigitalInterfaceFeedback.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (tr):** Düğmelerin, yükleme durumlarının ve hataların anlaşılır geri bildirim vermesini sağla.

##### Dijital arayüz gezinmesini tasarlamak

[designDigitalInterfaceNavigation.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (tr):** İnsanların doğru işlemleri bulabilmesi için ekranları ve gezinmeyi düzenle.

##### Dijital ürün kullanıcısının hedefini belirlemek

[identifyADigitalProductUsersGoal.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (tr):** Bir kişinin uygulama veya dijital cihazla neyi başarmak istediğini belirle.

##### Yaygın dijital etkileşim hatalarını önlemek

[preventCommonDigitalInteractionErrors.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (tr):** Önlenebilir hataları engellemek için etiket, doğrulama ve onay kullan.

#### Deneyim değerlendirmesi ve etik

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (tr):** Kullanıcı testlerinin ve dürüst tasarımın dijital ürünleri nasıl iyileştirdiğini keşfet.

##### Yönlendirici arayüz kalıplarını belirlemek

[identifyManipulativeInterfacePatterns.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (tr):** Ücretleri gizleyen, seçim dayatan veya iptali zorlaştıran arayüz hilelerini tanı.

##### Dijital arayüz kullanılabilirliğini test etmek

[testDigitalInterfaceUsability.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (tr):** Bir kişinin ek ipucu olmadan gerçek bir görevi tamamlayıp tamamlayamadığını gözlemle.

### Dijital güvenlik ve sorumluluk

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (tr):** Bilgiyi korumayı, başkalarına saygı göstermeyi ve dijital teknolojinin etkilerini anlamayı öğren.

#### Hesap koruma

Skills: 9

[accountProtection.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (tr):** Hesapları nasıl koruyacağını ve şüpheli mesajlara nasıl yanıt vereceğini öğren.

##### E-posta göndericisinin gerçekliğini değerlendirmek

[assessAnEmailSendersAuthenticity.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (tr):** Yalnızca görünen ada veya resme değil, gönderenin kimliğine bak.

##### Bağlantıya tıklamanın riskini değerlendirmek

[assessTheRiskOfFollowingALink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (tr):** Şüpheli bir bağlantı açıldığında neler olabileceğini değerlendir.

##### Çok faktörlü kimlik doğrulamayı kurmak

[configureMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (tr):** Ek bir giriş faktörü etkinleştir ve erişimi güvenle geri alma yolunu planla.

##### Güçlü bir parola ifadesi oluşturmak

[createAStrongPassphrase.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (tr):** Her hesap için farklı, uzun ve tahmin edilmesi zor parola ifadeleri oluştur.

##### Çok faktörlü kimlik doğrulamayı açıklamak

[explainMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (tr):** İkinci bağımsız doğrulama faktörünün hesabı nasıl koruduğunu anla.

##### Yazılım güncellemelerinin önemini açıklamak

[explainWhySoftwareUpdatesMatter.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (tr):** Resmî yazılım güncellemelerinin güvenlik açıklarını nasıl giderebildiğini öğren.

##### Oltalama mesajını tanımak

[recognizeAPhishingMessage.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (tr):** Parola veya kod çalmak için başka biri gibi davranan mesajları fark et.

##### Şüpheli dijital iletişime yanıt vermek

[respondToSuspiciousDigitalContact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (tr):** Şüpheli iletişime güvenle yanıt ver ve talepleri bağımsız bir kanaldan doğrula.

##### Bir web sitesinin alan adını doğrulamak

[verifyAWebsitesDomain.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (tr):** Web adresindeki gerçek alan adını oku ve aldatıcı benzerlerini fark et.

#### Dijital etkileşim etiği

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (tr):** Saygılı iletişimi ve içerik üreticilerinin izinlerine uymayı öğren.

##### Dijital materyallere kaynak belirtmek

[attributeDigitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (tr):** Kullandığın dijital içeriğin asıl üreticisine atıf yap.

##### Bir sorunu güvenle bildirme yolunu seçmek

[chooseASafeWayToReportAProblem.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (tr):** Çevrimiçi sorunları bildirmek için güvendiğin kişileri veya resmî kanalları seç.

##### Dijital içerik lisanslarını ayırt etmek

[distinguishDigitalContentLicenses.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (tr):** Telif hakkı kısıtlarını, açık lisansları ve kamu malı içerikleri ayır.

##### Uygun çevrimiçi davranışı belirlemek

[identifyAppropriateOnlineBehavior.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (tr):** Dijital iletişimde tehditleri, tacizi ve zorbalığı tanı.

#### Gizlilik

Skills: 5

[privacy.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (tr):** Çevrimiçi bilgi paylaşmanın gizliliği nasıl etkileyebileceğini keşfet.

##### Güvenli veri paylaşım yöntemlerini seçmek

[chooseSafeDataSharingMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (tr):** Hassas bilgiyi kimin alabileceğine ve güvenle nasıl paylaşılacağına karar ver.

##### Özel sohbeti herkese açık bağlantıdan ayırmak

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (tr):** Paylaşılan sohbeti veya belgeyi kimin açabileceğini kontrol et; bağlantının özel olduğunu varsayma.

##### Verilerle kimliği yeniden belirlemeyi açıklamak

[explainDataReIdentification.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (tr):** Ayrı toplanmış bilgilerin bir kişiyi yeniden nasıl tanımlayabileceğini açıkla.

##### Kişisel verileri belirlemek

[identifyPersonalData.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (tr):** Başka bilgilerle birleştirildiğinde de kişiyi tanımlayabilen verileri tanı.

##### Dijital ayak izini tanımak

[recognizeADigitalFootprint.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (tr):** Çevrimiçi paylaşımların ve davranışların kalıcı izler bırakabileceğini anla.

#### Bilişimin toplumsal ve çevresel etkileri

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (tr):** Bilişimin adaleti, kaynak kullanımını ve çevreyi nasıl etkilediğini keşfet.

##### Algoritmanın kullanıcı gruplarına etkisini değerlendirmek

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (tr):** Algoritmanın farklı kullanıcı gruplarına adaletsiz sonuçlar üretip üretmediğini değerlendir.

##### Bilişimin çevresel etkisini değerlendirmek

[assessComputingsEnvironmentalImpact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (tr):** Bilişimin enerji, malzeme ve elektronik atık etkilerini karşılaştır.

### Dijital sistemler ve ağlar

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (tr):** Bilgi işlem cihazlarının, dijital bilgilerin ve ağların nasıl birlikte çalıştığını keşfet.

#### Dijital cihaz bileşenleri

Skills: 3

[digitalDeviceComponents.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (tr):** Donanım parçalarının ve yazılımın farklı bilgi işlem görevlerini nasıl yerine getirdiğini keşfet.

##### Donanımı yazılımdan ayırt etmek

[distinguishHardwareFromSoftware.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (tr):** Bilgisayarın fiziksel parçalarını onları yöneten yazılımdan ayırt et.

##### İşlemcinin görevini açıklamak

[explainAProcessorsFunction.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (tr):** İşlemcinin dosyaları kalıcı olarak saklamak yerine komutları nasıl yürüttüğünü açıkla.

##### Dijital cihazları belirlemek

[identifyDigitalDevices.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (tr):** Programlanabilir dijital bilgileri işleyen cihazları tanı.

#### Bellek ve depolama

Skills: 4

[memoryAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (tr):** Geçici bellek, ürün yazılımı belleği ve dosya depolamanın ayrı görevlerini keşfet.

##### RAM, ROM ve depolamayı ayırt etmek

[distinguishRAMROMAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (tr):** RAM, ROM ve kalıcı depolamanın hangi bilgileri tutmak için tasarlandığını karşılaştır.

##### Kalıcı depolamayı açıklamak

[explainPersistentStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (tr):** Depolama cihazlarının güç kapatıldıktan sonra da dosyaları neden koruduğunu anla.

##### RAM'i açıklamak

[explainRAM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (tr):** Bilgisayar çalışırken RAM'in kullanılan bilgileri nasıl tuttuğunu keşfet.

##### ROM'un amacını açıklamak

[explainThePurposeOfROM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (tr):** Kalıcı ürün yazılımı belleğinin cihazların başlatılmasına nasıl yardımcı olduğunu tanı.

#### Ağ modelleri ve protokolleri

Skills: 11

[networkModelsAndProtocols.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (tr):** Ağ protokollerinin bilgi gönderme kurallarını nasıl belirlediğini keşfet.

##### Ağ erişim yöntemlerini karşılaştırmak

[compareNetworkAccessMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (tr):** Çakışma algılama, çakışmadan kaçınma ve belirteç aktarımını uygun kullanım ortamlarında karşılaştır.

##### HTTP ile HTTPS'yi ayırt etmek

[distinguishHTTPFromHTTPS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (tr):** HTTPS'nin neleri koruduğunu ve bir sitenin güvenilirliğini neden garanti etmediğini anla.

##### OSI ile TCP/IP'yi ayırt etmek

[distinguishOSIFromTCPIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (tr):** Kavramsal OSI katmanlarını İnternet'in TCP/IP protokol yığınıyla karşılaştır.

##### TCP ile UDP'yi ayırt etmek

[distinguishTCPFromUDP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (tr):** Güvenilir TCP veri akışlarını aynı güvencelere sahip olmayan UDP iletileriyle karşılaştır.

##### Bir ağ protokolünü açıklamak

[explainANetworkProtocol.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (tr):** Cihazların ileti alışverişi için neden ortak kurallara ihtiyaç duyduğunu açıkla.

##### CSMA/CA'yı açıklamak

[explainCSMACA.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (tr):** Kablosuz cihazların meşgul bir kanalda iletim yapmaktan nasıl kaçınmaya çalıştığını açıkla.

##### CSMA/CD'yi açıklamak

[explainCSMACD.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (tr):** Eski paylaşımlı Ethernet ağlarında çakışma algılamanın neden gerekli olduğunu öğren.

##### DNS'yi açıklamak

[explainDNS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (tr):** DNS'nin alan adlarından ağ adresleri bulmaya nasıl yardımcı olduğunu açıkla.

##### OSI katmanlarını açıklamak

[explainTheOSILayers.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (tr):** Ağ işlevlerini düzenlemek için yedi katmanlı OSI modelini kullan.

##### IP'nin amacını açıklamak

[explainThePurposeOfIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (tr):** IP'nin ağlar arasında paketleri nasıl adreslediğini ve yönlendirdiğini anla.

##### Token Ring'i açıklamak

[explainTokenRing.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (tr):** Bir belirteci devretmenin hangi cihazın veri gönderebileceğini nasıl denetlediğini keşfet.

#### Ağlar

Skills: 4

[networks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (tr):** Bağlı cihazların nasıl mesaj gönderdiğini ve kaynakları paylaştığını keşfet.

##### İnternet ile Web'i ayırt etmek

[distinguishTheInternetFromTheWeb.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (tr):** İnternet'in ağ altyapısını Web üzerindeki sitelerden ayırt et.

##### Ağ mesajlarının iletimini açıklamak

[explainNetworkMessageDelivery.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (tr):** Mesajların ağ cihazlarından geçerek hedeflerine nasıl ulaştığını izle.

##### Bilgisayar ağının amacını açıklamak

[explainThePurposeOfAComputerNetwork.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (tr):** Ağların bilgi alışverişi için ayrı cihazları neden bağladığını açıkla.

##### Kablosuz iletişimi açıklamak

[explainWirelessCommunication.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (tr):** Kablosuz cihazların doğrudan kablolar yerine sinyallerle nasıl haberleştiğini keşfet.

#### Sayı sistemleri

Skills: 4

[numeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (tr):** Farklı tabanlı sistemlerde rakamların sayıları nasıl temsil ettiğini öğren.

##### İkili ve onlu sistemler arasında dönüştürmek

[convertBetweenBinaryAndDecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (tr):** Küçük sayıları ikili ve onlu gösterim arasında dönüştür.

##### İkili ve onaltılı sistemleri ayırt etmek

[distinguishBinaryAndHexadecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (tr):** Onaltılı gösterimin bit gruplarını neden daha kısa yazabildiğini anla.

##### Bilgisayarın ikili mantığını açıklamak

[explainComputerBinaryLogic.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (tr):** İkili sıfır ve birleri ayırt edilebilir elektronik sinyal durumlarıyla ilişkilendir.

##### Konumsal sayı sistemlerini açıklamak

[explainPositionalNumeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (tr):** Bir rakamın konumunun sayı içindeki değerini neden değiştirdiğini anla.

#### İşletim sistemleri

Skills: 4

[operatingSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (tr):** İşletim sistemlerinin programları, dosyaları ve cihazları nasıl yönettiğini keşfet.

##### İşletim sistemi ailelerini ayırt etmek

[distinguishOperatingSystemFamilies.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (tr):** Yaygın işletim sistemi ailelerini ve aralarındaki farkları tanı.

##### İşletim sistemi sürecini açıklamak

[explainAnOSProcess.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (tr):** Çalışan bir süreç ile diskte saklanan program dosyasını ayırt et.

##### İşletim sisteminin amacını açıklamak

[explainAnOperatingSystemsPurpose.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (tr):** İşletim sisteminin yazılım ile donanımı nasıl eşgüdümlediğini anla.

##### Linus Torvalds'ın Linux'taki rolünü açıklamak

[explainLinusTorvaldsRoleInLinux.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (tr):** Linux çekirdeğinin nasıl başladığını ve birçok katkıcının işletim sistemleri geliştirmesini öğren.

#### Gösterim ve depolama

Skills: 4

[representationAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (tr):** Cihazların bilgileri nasıl temsil ettiğini ve kayıtlı dosyaları nasıl düzenlediğini öğren.

##### Dijital dosya boyutlarını karşılaştırmak

[compareDigitalFileSizes.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (tr):** Dosya boyutlarını karşılaştır ve biçim ile sıkıştırmanın neden fark yarattığını açıkla.

##### Dijital biçimleri ayırt etmek

[distinguishDigitalFormats.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (tr):** Dosya biçiminin kaydedilmiş bitlerin nasıl yorumlanacağını belirlediğini tanı.

##### İkili gösterimi açıklamak

[explainBinaryRepresentation.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (tr):** Sıfır ve bir dizilerinin farklı veri türlerini nasıl kodladığını anla.

##### Dosyaları dizinlerde düzenlemek

[organizeFilesInDirectories.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (tr):** Dosyaları yararlı klasörlerde düzenle ki yollarından bulunabilsinler.

#### Görevlerin yürütülmesi

Skills: 3

[taskExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (tr):** Görevlerin sırayla ilerlemesiyle işlerin gerçekten aynı anda yapılması arasındaki farkı keşfet.

##### Bağımsız görevleri yürütücülere dağıtmak

[distributeIndependentTasksAcrossExecutors.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (tr):** Hangi görevlerin birlikte çalışabileceğini ve hangilerinin başka sonuçları beklemesi gerektiğini planla.

##### Eşzamanlı ilerleyen görevleri açıklamak

[explainConcurrentExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (tr):** Birden çok görevin tam olarak aynı anda çalışmadan nasıl ilerleyebildiğini anla.

##### Paralel yürütmeyi açıklamak

[explainParallelExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (tr):** Birden fazla işlemcinin gerçekten aynı anda iş yaptığı durumları tanı.

### Git ve Açık Kaynak

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (tr):** Geliştiricilerin değişiklikleri nasıl izlediğini, işbirliği yaptığını ve yazılımı açık izinlerle paylaştığını keşfet.

#### İşbirlikçi dijital ürün geliştirme

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (tr):** Ekiplerin katkıları, incelemeleri ve proje sürümlerini nasıl düzenlediğini keşfet.

##### Paylaşılan dijital projede değişiklikleri koordine etmek

[coordinateChangesInASharedDigitalProject.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (tr):** Kimin neyi değiştireceğini ve ortak düzenlemelerin nasıl birleşeceğini planla.

##### Katkı kurallarını açıklamak

[explainContributionGuidelines.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (tr):** Katkı kurallarının aynı kod tabanında çalışmayı neden kolaylaştırdığını anla.

##### Dijital ürün sürümlerini izlemek

[trackDigitalProductVersions.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (tr):** Değişikliklerin ne zaman yapıldığını bulmak veya eski çalışmayı geri getirmek için sürüm geçmişini kullan.

#### Git sürüm kontrolü

Skills: 6

[gitVersionControl.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (tr):** Git'in sürümleri nasıl kaydettiğini ve ekiplerin değişiklikleri birleştirmesine nasıl yardım ettiğini öğren.

##### Yerel ve uzak depoları ayırt etmek

[distinguishLocalAndRemoteRepositories.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (tr):** Bilgisayarındaki çalışmayla uzak depolarda paylaşılan kopyaları ayırt et.

##### Bir dalı açıklamak

[explainABranch.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (tr):** Dalların geliştiricilerin farklı değişiklik kollarında çalışmasına nasıl izin verdiğini anla.

##### Bir commit'i açıklamak

[explainACommit.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (tr):** Commit'in önceki çalışmaya bağlı, kimliği olan bir anlık görüntü olduğunu anla.

##### Pull request'i açıklamak

[explainAPullRequest.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (tr):** Pull request'lerin önerilen değişiklikleri inceleme için nasıl düzenlediğini keşfet.

##### Bir depoyu açıklamak

[explainARepository.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (tr):** Bir deponun değişiklik geçmişiyle birlikte projeyi sakladığını anla.

##### Dal birleştirmeyi açıklamak

[explainBranchMerging.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (tr):** Dalların nasıl birleştirildiğini ve bazen çatışmaların neden çözülmesi gerektiğini öğren.

#### Açık kaynak

Skills: 2

[openSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (tr):** Yazılımı gerçekten açık kaynak yapan izinleri öğren.

##### Açık kaynakla yalnızca görünür kodu ayırt etmek

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (tr):** Kaynak kodun görülebilir olmasının onu otomatik olarak açık kaynak yapmadığını anla.

##### Açık kaynağı açıklamak

[explainOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (tr):** Açık kaynak lisanslarının yazılımı kullanma, değiştirme ve yeniden dağıtma iznini nasıl verdiğini öğren.

### Programlamanın tarihi

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (tr):** Programlama fikirlerinin ve hesaplama makinelerinin tarih boyunca nasıl geliştiğini keşfet.

#### Önemli katkılar

Skills: 6

[keyContributions.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (tr):** Programlama, yazılım güvenilirliği ve bilgisayar ağlarına önemli katkıları keşfet.

##### Hesaplanabilirlik kuramını açıklamak

[explainComputabilityTheory.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (tr):** Biçimsel modellerin bilgisayarların neyi hesaplayıp neyi hesaplayamayacağını nasıl gösterdiğini öğren.

##### İlk elektronik programlamayı açıklamak

[explainEarlyElectronicProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (tr):** İlk elektronik bilgisayar ekiplerinin programları nasıl hazırlayıp test ettiğini öğren.

##### Derleyicilerin gelişimini açıklamak

[explainTheDevelopmentOfCompilers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (tr):** Derleyicilerin okunabilir dillerde program yazmayı nasıl kolaylaştırdığını keşfet.

##### Yazılım güvenilirliğinin gelişimini açıklamak

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (tr):** Apollo görevlerinde hata yönetimi ve güvenilir yazılımın neden önemli olduğunu anla.

##### Ağ döngülerinin giderilmesini açıklamak

[explainTheEliminationOfNetworkLoops.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (tr):** Spanning Tree Protokolü'nün yerel ağlarda döngüleri nasıl önlediğini keşfet.

##### Programlamanın kökenlerini açıklamak

[explainTheOriginsOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (tr):** İlk makine tasarımları ve Ada Lovelace'in çalışmalarının programlamanın önünü nasıl açtığını keşfet.

#### Makineler ve kriptanaliz

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (tr):** Makineler ve matematiksel yöntemlerin tarihsel kriptanalize nasıl yardım ettiğini keşfet.

##### Tarihsel kriptanaliz yöntemlerini açıklamak

[explainHistoricalCryptanalysisMethods.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (tr):** Kriptanalistlerin şifreleri çözmek için örüntü ve sistemli testlerden nasıl yararlandığını keşfet.

##### Programlanabilir bilgisayarların gelişimini açıklamak

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (tr):** Mekanik hesaplama fikirlerinden programlanabilir elektronik makinelere gelişimi izle.

##### Bombe makinesinin amacını açıklamak

[explainThePurposeOfTheBombe.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (tr):** Bombe'nin olası Enigma ayarlarını sınamaya nasıl yardım ettiğini öğren.

### Bilgi ve Veriler

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (tr):** Güvenilir bilgi bulmayı, verileri düzenlemeyi ve belirsizliği değerlendirmeyi keşfet.

#### Veri Toplama ve Düzenleme

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (tr):** İlgili bilgileri toplamayı ve karşılaştırılabilir kayıtları düzenlemeyi öğren.

##### Verileri Tutarlı Biçimde Toplamak

[collectDataConsistently.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (tr):** Ölçümleri aynı kurallar ve birimlerle topla.

##### Verileri Niteliğe Göre Gruplamak

[groupDataByAttribute.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (tr):** Kayıtları tek ve açık bir özelliğe göre grupla.

##### Görev İçin Gerekli Verileri Belirlemek

[identifyDataNeededForATask.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (tr):** Bir sorunun gerçekten hangi alan ve gözlemleri gerektirdiğine karar ver.

##### Verileri Tabloda Sunmak

[presentDataInATable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (tr):** Etiketli satır, sütun ve tutarlı değerler içeren bir tablo oluştur.

#### Veritabanları

Skills: 5

[databases.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (tr):** Veritabanlarının kayıtları nasıl yapılandırdığını ve ilgili bilgileri bağladığını öğren.

##### Basit Bir Veritabanı Şeması Tasarlamak

[designASimpleDatabaseSchema.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (tr):** Uygun varlık, alan ve ilişkilerle basit bir veritabanı planla.

##### Kayıtlarla Alanları Ayırt Etmek

[distinguishRecordsAndFields.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (tr):** Bir kaydı onu tanımlayan alanlardan ayır.

##### Veritabanı Tablosunu Açıklamak

[explainADatabaseTable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (tr):** Bir tablonun aynı türden kayıtları nasıl sakladığını anla.

##### Birincil Anahtarları Açıklamak

[explainPrimaryKeys.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (tr):** Her kayıt için sabit ve benzersiz bir anahtarın neden gerektiğini açıkla.

##### Tablolar Arasındaki İlişkileri Modellemek

[modelRelationshipsBetweenTables.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (tr):** Tanımlayıcıları kullanarak farklı tablolardaki bilgileri ilişkilendir.

#### Bilgi Arama ve Doğrulama

Skills: 4

[informationSearchAndVerification.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (tr):** Kanıt aramayı ve bir iddianın desteklenip desteklenmediğini sınamayı öğren.

##### Bilgi Kaynaklarını Karşılaştırmak

[compareInformationSources.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (tr):** Birden fazla kaynağı karşılaştır ve anlatılarının nerede ayrıştığını belirle.

##### Mesajlarla Verileri Ayırt Etmek

[distinguishMessagesFromData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (tr):** Kaydedilmiş bir değeri mesajın ona yüklediği anlamdan ayır.

##### Bilgi Arama Sorgusu Oluşturmak

[formulateAnInformationQuery.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (tr):** Bulman gereken bilgiye uygun, belirli arama terimleri seç.

##### Bir İddiayı Kaynağa Göre Doğrulamak

[verifyAClaimAgainstASource.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (tr):** Tekrarlanan iddialar yerine uygun kanıtlara dayanarak bir iddiayı denetle.

#### Olasılık ve Belirsizlik

Skills: 7

[probabilityAndUncertainty.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (tr):** Olası olayları, gerçekleşme şanslarını ve tahminin sınırlarını keşfet.

##### Basit Olayların Olasılıklarını Karşılaştırmak

[compareProbabilitiesOfSimpleEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (tr):** Aynı varsayımlar altında iki sonucun gerçekleşme şansını karşılaştır.

##### Mümkünlük ile Olasılığı Ayırt Etmek

[distinguishPossibilityFromProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (tr):** Bir olayın mümkün olmasının, olası olduğu anlamına gelmediğini anla.

##### Rastgele ve Belirlenimci Olayları Ayırt Etmek

[distinguishRandomAndDeterministicEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (tr):** Bir kuralla belirlenen sonuçlarla rastgele seçilen sonuçları ayırt et.

##### Bir Olayın Mümkünlüğünü Açıklamak

[explainEventPossibility.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (tr):** Verilen koşullar altında bir sonucun mümkün olup olmadığına karar ver.

##### Bir Olayın Olasılığını Açıklamak

[explainEventProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (tr):** Belirtilmiş bir olasılık modeliyle olayın gerçekleşme şansını tahmin et.

##### Tahminin Sınırlarını Açıklamak

[explainLimitsOfPrediction.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (tr):** Olasılıkları bilmenin tek denemenin sonucunu neden bildirmediğini açıkla.

##### Modelde Rastgelelik Kullanmak

[useRandomnessInAModel.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (tr):** Oluşabilecek sonuçları tanımlayarak modele rastgele seçimler ekle.

#### İstatistiksel Araştırma

Skills: 4

[statisticalInvestigation.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (tr):** Grafikler, sıklıklar ve karşılaştırmalarla verileri incelemeyi öğren.

##### Gözlem Kümelerini Karşılaştırmak

[compareSetsOfObservations.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (tr):** İki veri kümesini aynı ölçüler veya kategorilerle karşılaştır.

##### Basit Grafik Oluşturmak

[constructASimpleChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (tr):** Veri oranlarını doğru gösteren anlaşılır bir grafik oluştur.

##### En Sık Görülen Değeri Bulmak

[findTheMostFrequentValue.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (tr):** Bir kümede en çok tekrar eden değeri belirle.

##### Grafik Okumak

[readAChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (tr):** Sunum biçimine aldanmadan ölçekleri, etiketleri ve değerleri oku.

### Programlama

Groups: 8 · Skills: 37

[programming.data.ts](../../../learningApps/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (tr):** Bilgisayarın çalıştırdığı komutları anlamayı, yazmayı ve test etmeyi öğren.

#### Veri türleri ve başvurular

Skills: 6

[dataTypesAndReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (tr):** Türlerin ve başvuruların programların kullanabileceği değerleri nasıl etkilediğini keşfet.

##### Değer kopyalamayı paylaşılan başvurulardan ayırt etmek

[distinguishValueCopyingFromSharedReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (tr):** İki değişkenin ne zaman aynı nesneyi paylaştığını ve değerlerin ne zaman bağımsız olduğunu açıkla.

##### Değer türlerini ayırt etmek

[distinguishValueTypes.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (tr):** Bir değerin sayı, metin veya Boole değeri olup olmadığını ve neler yapabildiğini belirle.

##### Veri türü sözleşmesini açıklamak

[explainADataTypeContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (tr):** Bir program fonksiyonunun hangi tür değeri almayı beklediğini anla.

##### Bileşik veri yapılarını açıklamak

[explainCompositeDataStructures.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (tr):** Birden çok değeri düzenleyen listeleri, dizileri ve kayıtları tanı.

##### Bir dildeki ilkel değerleri açıklamak

[explainPrimitiveValuesInALanguage.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (tr):** Seçilen programlama dilinin tanımladığı basit değer türlerini belirle.

##### Verileri sözleşmeye göre doğrulamak

[validateDataAgainstAContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (tr):** Kullanmadan önce girdinin gerekli tür veya yapıya uyup uymadığını denetle.

#### Fonksiyonlar ve yeniden kullanım

Skills: 5

[functionsAndReuse.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (tr):** Yeniden kullanılabilir işlemleri fonksiyonlar olarak düzenlemeyi öğren.

##### Bir fonksiyonu bağımsız değişkenlerle çağırmak

[callAFunctionWithArguments.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (tr):** Fonksiyonu argümanlarla çağır ve bunların nasıl kullanıldığını izle.

##### Parametreli bir fonksiyon tanımlamak

[defineAFunctionWithParameters.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (tr):** Sabit örnek değerler yerine parametre alan bir fonksiyon yaz.

##### Özyinelemeyi açıklamak

[explainRecursion.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (tr):** Özyinelemeli bir fonksiyonun küçük durumları çözerek sonunda nasıl durduğunu anla.

##### Bir fonksiyonun amacını açıklamak

[explainThePurposeOfAFunction.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (tr):** Adlandırılmış bir fonksiyonun çağrıldığında nasıl işlem yaptığını açıkla.

##### Bir fonksiyonun dönüş değerini kullanmak

[useAFunctionsReturnValue.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (tr):** Dönen sonucu yalnızca göstermek yerine başka hesaplamalarda kullan.

#### Program verileri

Skills: 3

[programData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (tr):** Çalışan bir programın kullandığı değerlerle ve değişen durumuyla çalış.

##### Program durumunu güncellemek

[updateProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (tr):** Daha önce olanlara göre programın saklanan durumunu değiştir.

##### Değişken kullanmak

[useAVariable.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (tr):** Bir değeri değişken adıyla sakla ve gerektiğinde oku.

##### Girdi verilerini kullanmak

[useInputData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (tr):** Program dışından girilen bilgileri kullanarak davranışını belirle.

#### Program yapısı ve sözdizimi

Skills: 4

[programStructureAndSyntax.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (tr):** Programlama dillerinin anahtar sözcükleri, ifadeleri ve blokları nasıl düzenlediğini öğren.

##### Anahtar sözcükleri tanımlayıcılardan ayırt etmek

[distinguishKeywordsFromIdentifiers.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (tr):** Dilin ayrılmış sözcüklerini programcıların seçtiği adlardan ayırt et.

##### İşleçleri, ifadeleri ve deyimleri ayırt etmek

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (tr):** İşleç, ifade ve deyim arasındaki farkları tanı.

##### Deyim bloğu sınırlarını açıklamak

[explainStatementBlockBoundaries.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (tr):** Hangi komutların döngü, fonksiyon veya koşul bloğuna ait olduğunu bul.

##### Sözdizimi renklendirmesini açıklamak

[explainSyntaxHighlighting.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (tr):** Kod renklendirmenin neyi gösterdiğini ve neyi kanıtlayamayacağını anla.

#### Programlama yapıları

Skills: 7

[programmingConstructs.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (tr):** Sıralamalar, koşullar, döngüler ve olaylarla programları denetlemeyi öğren.

##### Sonsuz döngüyü tespit etmek

[detectAnInfiniteLoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (tr):** Koşulu hiç yanlış olmadığı için duramayan bir döngüyü bul.

##### Bir olayı işlemek

[handleAnEvent.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (tr):** Bir düğmeye basıldığında, mesaj geldiğinde veya başka bir olay gerçekleştiğinde programın tepki vermesini sağla.

##### Döngü uygulamak

[implementALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (tr):** Doğru durma koşuluna ulaşana kadar komutları tekrarlamak için döngü kullan.

##### Koşullu davranış uygulamak

[implementConditionalBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (tr):** Koşullar değiştiğinde programın farklı işlemler seçmesini sağla.

##### Döngü boyunca değişmeyen hesapları dışarı taşımak

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (tr):** Tekrar sırasında değişmeyen hesaplamaları döngü dışına çıkar.

##### Örtüşen koşul denetimlerini sıralamak

[orderOverlappingConditionalChecks.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (tr):** Özel durumlara da ulaşılabilmesi için koşul denetimlerini uygun sıraya koy.

##### Komut dizisi yazmak

[writeASequenceOfCommands.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (tr):** İşlemleri istenen sırayla gerçekleştiren geçerli komutlar yaz.

#### Programlama paradigmaları

Skills: 4

[programmingParadigms.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (tr):** Program mantığını ve davranışını düzenlemenin farklı yollarını keşfet.

##### Emredici ve bildirimsel yaklaşımları ayırt etmek

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (tr):** Açık komutlar vermekle istenen sonucu tanımlamayı karşılaştır.

##### Fonksiyonel programlamayı açıklamak

[explainFunctionalProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (tr):** Fonksiyonları birleştirerek değerleri dönüştüren programları anla.

##### Nesne yönelimli programlamayı açıklamak

[explainObjectOrientedProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (tr):** Durum ve davranışa sahip, etkileşen nesnelerden oluşan programları keşfet.

##### Prosedürel programlamayı açıklamak

[explainProceduralProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (tr):** Adım adım işlemler etrafında düzenlenen programları keşfet.

#### Programları okumak

Skills: 4

[readingPrograms.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (tr):** Bir programı okumayı ve yaptıklarını adım adım izlemeyi keşfet.

##### Bir komutun amacını açıklamak

[explainACommandsPurpose.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (tr):** Tek bir programlama komutunun programın durumunu nasıl etkilediğini açıkla.

##### Çalıştırma sırasının sonuçlarını tahmin etmek

[predictConsequencesOfExecutionOrder.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (tr):** Komutların sırasını değiştirmenin sonucu neden değiştirebileceğini açıkla.

##### Program çıktısını tahmin etmek

[predictProgramOutput.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (tr):** Verilen girdilerle programın hangi görünür sonucu üreteceğini bul.

##### Programın durumunu izlemek

[traceProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (tr):** Program çalışırken değişkenlerin ve diğer değerlerin nasıl değiştiğini izle.

#### Test etme ve hata ayıklama

Skills: 4

[testingAndDebugging.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (tr):** Programlardaki hataları bulmayı, açıklamayı ve düzeltmeyi keşfet.

##### Hatalı program davranışını tespit etmek

[detectIncorrectProgramBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (tr):** Programın davranışının gereksinimlerden farklı olduğu durumları tanı.

##### Bir program kusurunu düzeltmek

[fixAProgramDefect.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (tr):** Belirli bir hatayı düzelt ve gerekli davranışın hâlâ çalıştığını denetle.

##### Bir hatanın nedenini bulmak

[locateTheCauseOfAnError.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (tr):** Programlama hatasını ona yol açan komuta veya koşula kadar izle.

##### Programı farklı girdilerle test etmek

[testAProgramWithDifferentInputs.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (tr):** Sınır durumları da dâhil farklı girdilerle programı dene.

### Robotik ve otomasyon

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (tr):** Sensörlerin, programlamanın ve eyleyicilerin robotların çevreye tepki vermesini nasıl sağladığını keşfet.

#### Robot kontrolü

Skills: 4

[robotControl.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (tr):** Bir robotun hareketleri ve tepkileri için komutlar oluşturup iyileştir.

##### Robotun tekrarlanan eylemini ayarlamak

[configureARepeatedRobotAction.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (tr):** Robotun bir eylemi kaç kez tekrarlayacağını veya ne zaman duracağını belirle.

##### Robot hareket dizisi oluşturmak

[createARobotMovementSequence.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (tr):** Robotu hedefine götüren sıralı hareket komutlarını planla.

##### Robot davranışındaki hataları ayıklamak

[debugRobotBehavior.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (tr):** Beklenmedik davranışın algılama, kontrol mantığı veya eylemden kaynaklanıp kaynaklanmadığını bul.

##### Robotun engele tepkisini uygulamak

[implementRobotObstacleResponse.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (tr):** Sensör engel algıladığında robotun durmasını, dönmesini veya engelden kaçınmasını sağla.

#### Robotik sistem bileşenleri

Skills: 4

[roboticSystemComponents.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (tr):** Bir robotun koşulları nasıl algıladığını, karar verdiğini ve eyleme geçtiğini öğren.

##### Robot denetleyicisini belirlemek

[identifyARobotController.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (tr):** Sensör verilerini programlanmış eylemlere dönüştüren denetleyiciyi tanı.

##### Bir sensörün amacını belirlemek

[identifyASensorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (tr):** Işığı, mesafeyi, sıcaklığı veya başka koşulları ölçen sensörleri tanı.

##### Bir eyleyicinin amacını belirlemek

[identifyAnActuatorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (tr):** Motorların, ışıkların ve diğer eyleyicilerin komutları nasıl yerine getirdiğini açıkla.

##### Sensör ile eylem arasındaki ilişkiyi modellemek

[modelTheSensorToActionRelationship.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (tr):** Sensör ölçümünü, karar kuralını ve eyleyici tepkisini ilişkilendir.

### Yazılım Mimarisi

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (tr):** Nesnelerin, sorumlulukların ve bağımlılıkların güvenilir yazılımı nasıl düzenlediğini keşfet.

#### Tasarım İlkeleri

Skills: 8

[designPrinciples.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (tr):** Yazılımı anlaşılır ve uyarlanabilir tutan ilkeleri öğren.

##### Gereksiz Özellikleri Ertelemek (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (tr):** Yalnızca hayal edilen gelecekteki ihtiyaçlar için özellik geliştirmekten kaçın.

##### Bağımlılıkları Sözleşmelere Göre Tasarlamak (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (tr):** Somut hizmetler yerine sözleşmelere bağımlı olarak iş mantığını ayır.

##### Çekirdeği Değiştirmeden Davranışı Genişletmek (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (tr):** Kararlı temel mantığı yeniden yazmadan yeni davranış için genişleme noktaları tasarla.

##### Gereksiz Tekrarları Belirlemek (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (tr):** Gelecekte tutarsız değişikliklere yol açabilecek yinelenen kuralları bul.

##### Tek Sorumluluğu Ayırmak (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (tr):** Modülü tek ve tutarlı bir değişme nedeni etrafında düzenle.

##### Gereksiz Karmaşıklığı Azaltmak (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (tr):** Gereksinimlerin haklı çıkarmadığı mekanizmaları kaldırarak yazılımı sadeleştir.

##### Dar Arayüzleri Ayırmak (ISP)

[separateNarrowInterfacesISP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (tr):** Arayüzleri istemcilerin sadece kullandığı işlemlere ihtiyaç duyacağı kadar dar tut.

##### Yerine Geçebilirliği Doğrulamak (LSP)

[verifySubstitutabilityLSP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (tr):** Bir uygulamanın ortak sözleşmenin vaatlerine uyup uymadığını denetle.

#### Nesne Modeli

Skills: 13

[objectModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (tr):** Yazılım nesnelerinin durum ve davranışlarını nasıl birleştirdiğini öğren.

##### Nesne Soyutlamasını Uygulamak

[applyObjectAbstraction.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (tr):** Bir bileşenin kullanıcılarına hangi temel işlemleri göstermesi gerektiğini seç.

##### Sınıf ile Nesneyi Ayırt Etmek

[distinguishAClassFromAnObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (tr):** Sınıfın şablonuyla kendine özgü güncel değerler taşıyan nesneleri ayırt et.

##### Gerçek Nesneyi Soyut Modelinden Ayırt Etmek

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (tr):** Yazılım modelinin bir şeyin yalnızca seçilen özelliklerini gösterdiğini fark et.

##### Nesne Metodunu Açıklamak

[explainAnObjectMethod.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (tr):** Metot çağırmanın nesnenin durumunu nasıl okuyabildiğini veya değiştirebildiğini açıkla.

##### Nesne Özelliğini Açıklamak

[explainAnObjectProperty.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (tr):** Nesnenin saklanan özelliğini yapabileceği işlemlerden ayırt et.

##### Kapsüllemeyi Açıklamak

[explainEncapsulation.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (tr):** Nesnelerin iç durumlarını kontrollü metotlarla nasıl koruduklarını anla.

##### Kalıtımı Açıklamak

[explainInheritance.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (tr):** Özelleşmiş sınıfın daha genel sınıfın davranışını nasıl devralabildiğini açıkla.

##### Çok Biçimliliği Açıklamak

[explainPolymorphism.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (tr):** Farklı nesnelerin aynı işlemi farklı yollarla nasıl yerine getirebildiğini öğren.

##### Sınıf Kavramını Açıklamak

[explainTheConceptOfAClass.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (tr):** Sınıfı tek tek nesnelerin oluşturulduğu tanım olarak anla.

##### Yazılım Nesnesinin Yapısını Açıklamak

[explainTheStructureOfASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (tr):** Mevcut nesnenin kimliğini, özelliklerini ve metotlarını belirle.

##### Bir Nesnenin Durumunu ve Davranışını Belirlemek

[identifyAnObjectsStateAndBehavior.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (tr):** Nesnenin özelliklerini ve yapabileceği işlemleri açıkla.

##### Alan Varlığını Yazılım Nesnesi Olarak Modellemek

[modelADomainEntityAsASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (tr):** İlgili özellik ve işlemleri seçerek yararlı bir yazılım nesnesi tasarla.

##### Nesne Bileşimini Modellemek

[modelObjectComposition.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (tr):** Farklı sorumlulukları olan küçük parçalardan daha büyük yazılım nesneleri oluştur.

