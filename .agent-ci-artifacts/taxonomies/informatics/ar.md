<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (ar)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### الخوارزميات

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../learningApps/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (ar):** استكشف كيفية تصميم طرائق متكررة لحل المشكلات وتطبيقها ومقارنتها.

#### التحليل

Skills: 3

[analysis.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (ar):** استكشف كيف تتغير احتياجات الخوارزمية من الوقت والذاكرة مع حجم المدخلات.

##### التمييز بين النمو الخطي واللوغاريتمي

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (ar):** قارن النمو المتناسب مع حجم المدخلات بالنمو الناتج عن تقسيم المجال إلى النصف مرارًا.

##### تقدير أسوأ حالة للخوارزمية

[estimateAnAlgorithmsWorstCase.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (ar):** قدّر أكبر عدد من الفحوصات التي قد تحتاجها الخوارزمية في أسوأ حالة.

##### شرح المفاضلة بين الوقت والذاكرة

[explainTimeMemoryTradeOffs.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (ar):** افهم لماذا قد تحتاج الخوارزميات الأسرع إلى ذاكرة مؤقتة إضافية.

#### معالجة المجموعات

Skills: 4

[collectionProcessing.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (ar):** تعلّم العد والجمع وإيجاد القيم القصوى أثناء المرور على البيانات.

##### تطبيق عد العناصر

[applyElementCounting.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (ar):** عُدّ كل عناصر المجموعة التي تحقق شرطًا محددًا.

##### تطبيق إيجاد القيمة العظمى

[applyMaximumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (ar):** تتبّع أكبر قيمة عثرت عليها أثناء المرور على المجموعة.

##### تطبيق إيجاد القيمة الصغرى

[applyMinimumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (ar):** تتبّع أصغر قيمة عثرت عليها أثناء المرور على المجموعة.

##### تطبيق تجميع المجموع

[applySumAccumulation.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (ar):** أضف قيم المجموعة تباعًا إلى مجموع يتراكم.

#### البناء

Skills: 6

[construction.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (ar):** تعلّم تحديد إجراءات الخوارزمية وشروطها وقواعد توقفها.

##### مقارنة الخوارزميات وفق المتطلبات

[compareAlgorithmsAgainstRequirements.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (ar):** قارن الخوارزميات الممكنة وفق متطلباتها وحدودها.

##### بناء خوارزمية تسلسلية

[constructASequentialAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (ar):** صِف سلسلة محدودة من الخطوات تُنفّذ بالترتيب الصحيح.

##### تحديد هدف الخوارزمية

[defineAnAlgorithmsGoal.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (ar):** وضّح ما يجب أن تحققه الخوارزمية والمدخلات التي تقبلها.

##### تصميم التفرع الشرطي

[designConditionalBranching.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (ar):** خطط لمسارات مختلفة في الخوارزمية وفق شروط واضحة قابلة للاختبار.

##### تصميم التكرار

[designRepetition.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (ar):** صمّم إجراءً متكررًا يتضمن تحديثات صحيحة وشرطًا للتوقف.

##### تنفيذ خوارزمية عودية

[implementARecursiveAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (ar):** ابنِ خوارزمية عودية تقسم المشكلة إلى مسائل أصغر ولها حالة أساسية تنهي التكرار.

#### البحث

Skills: 6

[search.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (ar):** اكتشف كيف تعثر طرق البحث المختلفة على عنصر في مجموعة.

##### تطبيق البحث الثنائي

[applyBinarySearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (ar):** اعثر على قيمة في بيانات مرتبة باستبعاد نصف المجال في كل خطوة.

##### تطبيق البحث في شجرة ثنائية

[applyBinaryTreeSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (ar):** اتبع فروع شجرة البحث الثنائية المرتبة للعثور على مفتاح.

##### تطبيق البحث الخطي

[applyLinearSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (ar):** ابحث عن الهدف بفحص العناصر واحدًا تلو الآخر.

##### مقارنة طرق البحث بعدد الفحوصات

[compareSearchMethodsByCheckCount.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (ar):** قارن عدد الفحوصات المطلوبة في البحث الخطي والبحث الثنائي.

##### تحديد متطلبات البحث الثنائي

[identifyBinarySearchPrerequisites.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (ar):** تحقق من ترتيب البيانات وفق متطلبات البحث الثنائي.

##### توقّع نمو تكلفة البحث

[predictSearchScaling.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (ar):** افهم لماذا تؤدي مضاعفة حجم البيانات إلى إضافة فحص واحد تقريبًا في البحث الثنائي.

#### الفرز

Skills: 4

[sorting.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (ar):** تعلّم كيف ترتب طرق الفرز القيم وفق ترتيب محدد.

##### تطبيق الفرز الفقاعي

[applyBubbleSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (ar):** رتّب العناصر بتبديل القيم المتجاورة الموضوعة بترتيب خاطئ.

##### تطبيق الفرز بالإدراج

[applyInsertionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (ar):** رتّب العناصر بإدراج كل عنصر جديد في الجزء المرتب مسبقًا.

##### تطبيق الفرز بالاختيار

[applySelectionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (ar):** رتّب العناصر باختيار أصغر عنصر متبقٍ في كل خطوة.

##### شرح معيار الفرز

[explainASortingCriterion.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (ar):** اختر القيمة أو الخاصية التي سيُرتّب بها عناصر المجموعة.

### الذكاء الاصطناعي

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (ar):** اكتشف كيف تتعلم أنظمة الذكاء الاصطناعي وتتنبأ وتولّد المحتوى، ولماذا تخطئ أحيانًا.

#### أساسيات الذكاء الاصطناعي

Skills: 6

[aIFundamentals.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (ar):** اكتشف الفروق بين القواعد المبرمجة والنماذج المدرّبة ومهام الذكاء الاصطناعي.

##### تصنيف مهام الذكاء الاصطناعي

[classifyAITasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (ar):** حدّد ما إذا كانت مهمة الذكاء الاصطناعي تصنّف أو تتنبأ أو تولّد محتوى.

##### التمييز بين القواعد والنماذج المدرّبة

[distinguishRulesFromTrainedModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (ar):** ميّز قواعد اتخاذ القرار المبرمجة صراحةً عن الأنظمة المدرّبة على البيانات.

##### شرح الذكاء الاصطناعي التوليدي

[explainGenerativeAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (ar):** افهم كيف تنشئ النماذج التوليدية نصوصًا وصورًا ومحتويات أخرى.

##### شرح التعلّم من الأمثلة

[explainLearningFromExamples.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (ar):** اشرح كيف تساعد الأمثلة النموذج على تحسين أدائه مع المدخلات الجديدة.

##### شرح الذكاء الاصطناعي التنبؤي

[explainPredictiveAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (ar):** اكتشف كيف تقدّر الأنظمة التنبؤية القيم والفئات واحتمالات وقوع الأحداث.

##### تحديد خطأ محتمل في الذكاء الاصطناعي

[identifyAPotentialAIError.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (ar):** لاحظ علامات التحذير التي تشير إلى ضرورة التحقق المستقل من إجابة الذكاء الاصطناعي.

#### التقليد والفهم

Skills: 2

[imitationAndUnderstanding.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (ar):** تأمّل الفرق بين تقليد يبدو مقنعًا وفهم حقيقي.

##### شرح الغرفة الصينية لسيرل

[explainSearlesChineseRoom.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (ar):** استكشف تجربة الغرفة الصينية الفكرية والنقاش الذي تثيره.

##### شرح اختبار تورنغ

[explainTheTuringTest.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (ar):** افهم ما الذي يقيمه اختبار تورنغ وما الذي لا يستطيع إثباته.

#### الرموز والسياق في نماذج اللغة

Skills: 6

[languageModelTokensAndContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (ar):** اكتشف كيف تقسّم نماذج اللغة النص إلى رموز وتستخدم السياق.

##### التمييز بين أخذ العينات واختيار الرمز الأرجح

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (ar):** قارن اختيار الرمز الأعلى احتمالًا بأخذ عينة من استمرارات محتملة أخرى.

##### التمييز بين الرموز والمحارف والكلمات

[distinguishTokensCharactersAndWords.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (ar):** تعرّف لماذا تختلف المحارف والكلمات والرموز النصية بعضها عن بعض.

##### شرح نافذة السياق لنموذج اللغة

[explainALanguageModelsContextWindow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (ar):** افهم لماذا يستطيع نموذج اللغة استخدام قدر محدود فقط من السياق.

##### شرح تجاوز سعة نافذة السياق

[explainContextWindowOverflow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (ar):** اكتشف ما قد يحدث حين يتجاوز الطلب حد السياق لدى النموذج.

##### شرح اختيار الرمز النصي التالي

[explainNextTokenSelection.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (ar):** اشرح كيف تختار نماذج اللغة رمزًا تالياً محتملًا اعتمادًا على السياق.

##### شرح الرموز النصية

[explainTokens.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (ar):** افهم الرموز بوصفها وحدات تمثيل للنص تختلف باختلاف النموذج.

#### بنى النماذج والموارد

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (ar):** استكشف كيف تؤثر البنى المختلفة لنماذج الذكاء الاصطناعي في الأداء واحتياجات الموارد.

##### اختيار نموذج لمهمة

[chooseAModelForATask.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (ar):** اختر النموذج بحسب جودة أداء المهمة والسرعة والتكلفة والخصوصية والذاكرة المتاحة.

##### مقارنة النماذج الكثيفة ونماذج خليط الخبراء

[compareDenseAndMoEModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (ar):** قارن نماذج تفعّل معاملات كثيرة بنماذج تستخدم خبراء مختارين.

##### مقارنة احتياجات الذاكرة للنماذج

[compareModelMemoryRequirements.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (ar):** قدّر الذاكرة اللازمة لتشغيل نموذج، لا المساحة المطلوبة لتخزين ملفاته فحسب.

##### مقارنة زمن تأخر الاستجابة

[compareResponseLatency.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (ar):** قارن التأخر قبل بدء إجابة الذكاء الاصطناعي بشكل منفصل عن سرعة توليدها بعد ذلك.

##### شرح التكميم

[explainQuantization.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (ar):** افهم كيف يوفر تقليل الدقة العددية الذاكرة، لكنه قد يغيّر جودة النتائج.

#### صياغة الطلبات للذكاء الاصطناعي

Skills: 7

[prompting.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (ar):** تعلّم تقديم تعليمات وسياق وقيود أوضح لأنظمة الذكاء الاصطناعي.

##### تقسيم طلب معقد إلى مهام فرعية

[breakAComplexPromptIntoSubtasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (ar):** قسّم الطلب المعقد إلى خطوات أصغر يمكن التحقق من نتائجها.

##### تقديم سياق للطلب

[providePromptContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (ar):** قدّم معلومات خلفية ذات صلة تساعد الذكاء الاصطناعي على فهم طلبك.

##### تحسين الطلب استنادًا إلى النتائج

[refineAPromptBasedOnResults.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (ar):** حسّن طلبك من الذكاء الاصطناعي بعد التحقق مما أغفلته إجابته السابقة.

##### تحديد هدف الطلب

[specifyAPromptObjective.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (ar):** اذكر بدقة المهمة التي تريد من مساعد الذكاء الاصطناعي إنجازها.

##### تحديد دور في الطلب

[specifyARoleInAPrompt.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (ar):** حدّد منظورًا أو أسلوبًا مفيدًا دون اعتباره دليلًا على خبرة حقيقية.

##### تحديد تنسيق المخرجات

[specifyAnOutputFormat.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (ar):** اطلب بنية واضحة للنتيجة، مثل جدول أو حقول محددة.

##### تحديد قيود الطلب

[specifyPromptConstraints.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (ar):** حدّد قيودًا مثل الطول والمصادر والمعلومات التي يجب عدم اختلاقها.

#### الموثوقية والاستخدام المسؤول للذكاء الاصطناعي

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (ar):** تعلّم التحقق من مخرجات الذكاء الاصطناعي والنظر في آثارها على الناس.

##### شرح مسؤولية الإنسان عن القرارات المدعومة بالذكاء الاصطناعي

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (ar):** افهم لماذا يبقى البشر مسؤولين عن القرارات التي يساعد الذكاء الاصطناعي في اتخاذها.

##### حماية البيانات الشخصية في الطلبات

[protectPersonalDataInPrompts.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (ar):** احذف المعلومات الشخصية غير الضرورية قبل إرسال طلب إلى الذكاء الاصطناعي.

##### التعرّف إلى مخاطر التحيز في الذكاء الاصطناعي

[recognizeAIBiasRisks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (ar):** تعرّف متى يمكن لأنظمة الذكاء الاصطناعي أن تعامل مجموعات أو أفرادًا بغير إنصاف.

##### التحقق من الحقائق في إجابة الذكاء الاصطناعي

[verifyFactsInAnAIResponse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (ar):** تحقق من الادعاءات الواقعية في إجابة الذكاء الاصطناعي باستخدام مصادر مستقلة موثوقة.

#### التفاعل الآمن مع الذكاء الاصطناعي

Skills: 4

[safeInteractionWithAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (ar):** تعرّف إلى أنماط التفاعل التي قد تجعل نصائح الذكاء الاصطناعي مضللة أو تشجع اعتمادًا غير صحي عليه.

##### شرح مخاطر الاعتماد المفرط على الذكاء الاصطناعي

[explainRisksOfOverrelianceOnAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (ar):** افهم لماذا يجب ألا يحل الذكاء الاصطناعي محل التفكير المستقل أو دعم البشر.

##### تحديد التعليمات غير الموثوقة في مدخلات الذكاء الاصطناعي

[identifyUntrustedInstructionsInAIInput.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (ar):** تعرّف إلى تعليمات مخفية في مواد خارجية لا ينبغي لها التحكم في المساعد.

##### حماية الأسرار عند استخدام الذكاء الاصطناعي

[protectSecretsWhenUsingAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (ar):** احمِ كلمات المرور ومفاتيح الوصول والمعلومات السرية عند استخدام الذكاء الاصطناعي.

##### التعرّف إلى مجاملة الذكاء الاصطناعي المفرطة

[recognizeAISycophancy.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (ar):** لاحظ موافقة الذكاء الاصطناعي أو مديحه الذي لا يستند إلى أدلة.

### التفكير الحاسوبي

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (ar):** اكتشف كيفية تقسيم المشكلات المعقدة إلى خطوات وأنماط وقواعد واضحة.

#### التفكيك والتجريد

Skills: 4

[decompositionAndAbstraction.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (ar):** تعلّم تبسيط المشكلات بتحديد أجزائها الأساسية والعلاقات بينها.

##### بناء نموذج تجريدي لنظام

[buildAnAbstractSystemModel.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (ar):** أنشئ تمثيلًا مبسطًا لموقف أو نظام معقد.

##### تفكيك مشكلة

[decomposeAProblem.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (ar):** قسّم المشكلة الكبيرة إلى مهام أصغر يمكن حل كل منها على حدة.

##### تعميم طريقة متكررة

[generalizeARepeatedMethod.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (ar):** ابحث عن طريقة قابلة لإعادة الاستخدام تشترك فيها عدة مشكلات محددة.

##### تحديد الخصائص الأساسية للشيء

[identifyEssentialObjectProperties.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (ar):** اختر التفاصيل المهمة للمهمة واترك التفاصيل غير ذات الصلة.

#### المنطق والأنماط

Skills: 8

[logicAndPatterns.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (ar):** اكتشف كيف تساعد القواعد والأنماط والشروط المنطقية في حل المشكلات.

##### تطبيق العملية المنطقية وَ

[applyLogicalAND.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (ar):** استخدم وَ للتحقق من تحقق الشرطين معًا.

##### تطبيق النفي المنطقي

[applyLogicalNOT.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (ar):** استخدم النفي لعكس القيمة المنطقية لشرط.

##### تطبيق العملية المنطقية أو

[applyLogicalOR.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (ar):** استخدم أو للتحقق من تحقق شرط واحد على الأقل من شرطين.

##### اكتشاف القواعد المتناقضة

[detectContradictoryRules.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (ar):** تعرّف على الحالات التي يستحيل فيها تحقق شرطين معًا.

##### تقييم شرط بسيط

[evaluateASimpleCondition.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (ar):** حدّد ما إذا كان شرط واحد صحيحًا أو خاطئًا أو لم يتضح بعد.

##### تقييم التعبيرات المنطقية المركبة

[evaluateCompoundLogicalExpressions.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (ar):** قيّم التعبيرات المنطقية ذات العمليات المتعددة بالترتيب الصحيح.

##### التنبؤ بنتيجة انطلاقًا من قاعدة

[predictAnOutcomeFromARule.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (ar):** استنتج ما سيحدث بعد ذلك عند معرفة القاعدة والحالة الابتدائية.

##### التعرف على نمط

[recognizeAPattern.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (ar):** تعرّف على الأنماط في المتتاليات وتحقق من ملاءمة قاعدة مقترحة لها.

### هياكل البيانات

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (ar):** تعرّف كيف تنظّم المجموعات والمفاتيح والأشجار والشبكات البيانات لتنفيذ عمليات مختلفة.

#### القواميس

Skills: 3

[dictionaries.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (ar):** اكتشف كيف تربط القواميس المفاتيح الفريدة بالقيم المخزنة.

##### شرح بنية القاموس

[explainDictionaryStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (ar):** افهم كيف يسترجع القاموس المعلومات باستخدام المفتاح بدلاً من الموضع.

##### استرجاع قيمة من القاموس باستخدام المفتاح

[retrieveADictionaryValueByKey.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (ar):** ابحث عن قيمة في القاموس باستخدام مفتاحها وتعامل مع حالة غياب المفتاح.

##### تحديث قيمة في القاموس

[updateADictionaryValue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (ar):** غيّر القيمة المخزنة تحت مفتاح موجود في القاموس.

#### الرسوم البيانية

Skills: 6

[graphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (ar):** اكتشف كيف تمثل الرسوم البيانية الأماكن والأشياء والروابط بينها.

##### التمييز بين الرسوم البيانية الموجّهة وغير الموجّهة

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (ar):** حدّد ما إذا كانت الروابط تسير في اتجاه واحد أم في الاتجاهين.

##### التمييز بين الأشجار والرسوم البيانية التي تحتوي على دورات

[distinguishTreesFromGraphsWithCycles.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (ar):** افهم لماذا قد تحتوي الرسوم البيانية على دورات بينما لا تحتوي الأشجار عليها.

##### التمييز بين الرسوم البيانية الموزونة وغير الموزونة

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (ar):** تعرّف متى تحمل روابط الرسم البياني أرقامًا مثل المسافة أو التكلفة.

##### شرح بنية الرسم البياني

[explainGraphStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (ar):** تعرّف على رؤوس الرسم البياني والحواف التي تصل بينها.

##### إيجاد مسار في رسم بياني

[findAPathInAGraph.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (ar):** اتبع مسارًا صالحًا بين الرؤوس مع مراعاة اتجاه الروابط.

##### تحديد الرؤوس المتجاورة

[identifyAdjacentVertices.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (ar):** حدّد الرؤوس المتصلة مباشرةً برأس آخر.

#### طابور

Skills: 3

[queue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (ar):** تعرّف كيف يعالج الطابور العناصر حسب ترتيب وصولها.

##### إزالة عنصر من الطابور

[dequeueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (ar):** أزل العنصر الموجود في مقدمة الطابور دون تغيير ترتيب العناصر الأخرى.

##### إضافة عنصر إلى الطابور

[enqueueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (ar):** أضف عنصرًا جديدًا إلى نهاية الطابور.

##### شرح مبدأ الوارد أولًا صادر أولًا (FIFO)

[explainFIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (ar):** اشرح لماذا يخرج العنصر الذي دخل الطابور أولًا قبل غيره.

#### التسلسلات

Skills: 7

[sequences.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (ar):** استكشف المجموعات المرتبة وكيفية الوصول إلى عناصرها وإضافتها وإزالتها.

##### الوصول إلى عنصر تسلسل باستخدام الفهرس

[accessASequenceElementByIndex.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (ar):** استرجع عنصرًا باستخدام فهرسه دون تجاوز المواضع الصالحة.

##### التمييز بين المصفوفات والقوائم المرتبطة

[distinguishArraysFromLinkedLists.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (ar):** قارن المصفوفات المفهرسة بسلاسل العقد المرتبطة.

##### شرح بنية المصفوفة

[explainArrayStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (ar):** افهم كيف تخزن المصفوفات عناصرها في مواضع تحددها الفهارس.

##### شرح بنية القائمة

[explainListStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (ar):** تعرّف إلى القوائم بوصفها مجموعات مرتبة يمكن تمثيلها بطرق مختلفة.

##### إدراج عنصر في تسلسل

[insertAnElementIntoASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (ar):** أدرج عنصرًا في موضعه المناسب ضمن تسلسل مرتب.

##### إزالة عنصر من تسلسل

[removeAnElementFromASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (ar):** أزل عنصرًا مع الحفاظ على ترتيب بقية التسلسل.

##### اجتياز تسلسل

[traverseASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (ar):** مرّ على كل عنصر في التسلسل بالترتيب.

#### المجموعات

Skills: 4

[sets.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (ar):** استكشف مجموعات القيم الفريدة وعمليات التحقق من انتمائها.

##### حساب تقاطع المجموعات

[computeSetIntersection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (ar):** اعثر فقط على العناصر المشتركة بين مجموعتين.

##### حساب اتحاد المجموعات

[computeSetUnion.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (ar):** اجمع جميع العناصر المميزة في مجموعتين دون تكرار.

##### شرح بنية المجموعة

[explainSetStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (ar):** افهم لماذا تحتفظ المجموعة بنسخة واحدة فقط من كل عنصر مميز.

##### التحقق من الانتماء إلى مجموعة

[testSetMembership.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (ar):** تحقق مما إذا كانت قيمة محددة تنتمي إلى مجموعة.

#### مكدس

Skills: 3

[stack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (ar):** اكتشف كيف يتيح المكدس الوصول أولًا إلى العنصر الذي أُضيف أخيرًا.

##### شرح مبدأ الداخل أخيرًا يخرج أولًا (LIFO)

[explainLIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (ar):** افهم لماذا يعيد المكدس العنصر المضاف أخيرًا أولًا.

##### إخراج عنصر من المكدس

[popAnElementFromAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (ar):** أزل آخر عنصر مضاف مع التحقق مما إذا كان المكدس فارغًا.

##### إضافة عنصر إلى قمة المكدس

[pushAnElementOntoAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (ar):** ضع عنصرًا جديدًا على قمة المكدس.

#### اختيار بنية البيانات

Skills: 4

[structureSelection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (ar):** اختر بنى البيانات وفق كيفية استخدام البرنامج للبيانات.

##### اختيار بنية للعمليات المطلوبة

[chooseAStructureForRequiredOperations.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (ar):** اختر مجموعة تناسب الفهرسة والتحقق من الانتماء والطوابير أو العلاقات.

##### مقارنة تكاليف الإدراج في المجموعات

[compareCollectionInsertionCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (ar):** استكشف لماذا قد يتطلب الإدراج إزاحة عناصر المصفوفة أو تغيير الروابط.

##### مقارنة تكاليف الوصول إلى العناصر

[compareElementAccessCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (ar):** قارن سرعة الوصول إلى عنصر محدد في المصفوفات والقوائم المرتبطة.

##### التمييز بين هياكل البيانات والخوارزميات

[distinguishDataStructuresFromAlgorithms.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (ar):** ميّز بين تنظيم البيانات في بنية ومعالجتها باستخدام خوارزمية.

#### الأشجار

Skills: 4

[trees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (ar):** استكشف كيف تنظّم الأشجار المعلومات من خلال علاقات الأصل والفروع.

##### التمييز بين العقد الورقية والداخلية في الشجرة

[distinguishLeafAndInternalTreeNodes.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (ar):** ميّز العقد التي لها أبناء من العقد الورقية التي ليس لها أبناء.

##### شرح أشجار البحث الثنائية

[explainBinarySearchTrees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (ar):** افهم قاعدة ترتيب المفاتيح التي تجعل البحث في الشجرة الثنائية ممكنًا.

##### شرح بنية الشجرة

[explainTreeStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (ar):** تعرّف على جذر الشجرة وفروعها وعقدها والروابط بينها.

##### إيجاد مسار في شجرة

[findAPathInATree.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (ar):** اتبع الروابط الموجودة بين عقدتين في الشجرة.

### أنماط التصميم

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../learningApps/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (ar):** استكشف طرقًا قابلة لإعادة الاستخدام لإنشاء كائنات البرمجيات وتركيبها وتنسيقها.

#### الأنماط السلوكية

Skills: 11

[behavioral.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (ar):** استكشف كيف تنسّق الكائنات الطلبات وتغيّر سلوكها.

##### سلسلة المسؤولية

[chainOfResponsibility.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (ar):** مرر الطلب عبر المعالجات حتى يتمكن أحدها من معالجته.

##### الأمر

[command.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (ar):** مثّل عمليةً بكائن يمكن تخزينه أو جدولة تنفيذه.

##### المفسّر

[interpreter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (ar):** فسّر لغة صغيرة باستخدام قواعد ممثلة بتعبيرات.

##### المكرّر

[iterator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (ar):** زر عناصر المجموعة دون كشف كيفية تخزينها.

##### الوسيط

[mediator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (ar):** نسّق تفاعلات المكوّنات من خلال وسيط مركزي.

##### التذكار

[memento.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (ar):** احفظ حالة كائن لاستعادتها لاحقًا.

##### المراقب

[observer.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (ar):** أبلغ المشتركين المهتمين عند تغير الكائن المراقب.

##### الحالة

[state.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (ar):** غيّر طريقة استجابة الكائن وفق حالته الحالية.

##### الاستراتيجية

[strategy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (ar):** بدّل بين خوارزميات تلتزم جميعها بواجهة مشتركة.

##### طريقة القالب

[templateMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (ar):** أبقِ الخطوات الأساسية للخوارزمية ثابتة مع السماح بتغيير خطوات محددة.

##### الزائر

[visitor.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (ar):** افصل العمليات عن هياكل الكائنات التي تعمل عليها.

#### الأنماط الإنشائية

Skills: 5

[creational.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (ar):** تعلّم أنماط بناء الكائنات دون ربط العملاء بالأنواع الملموسة.

##### المصنع المجرد

[abstractFactory.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (ar):** استخدم مصنعًا ينشئ عائلات متوافقة من الكائنات المرتبطة.

##### البنّاء

[builder.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (ar):** ركّب كائنًا معقدًا خطوة بخطوة باستخدام بنّاء.

##### طريقة المصنع

[factoryMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (ar):** دع الأصناف الفرعية تختار الكائن الملموس الذي تنشئه طريقة المصنع.

##### النموذج الأولي

[prototype.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (ar):** أنشئ كائنات جديدة عن طريق نسخ مثال مُعدّ مسبقًا.

##### الكائن المفرد

[singleton.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (ar):** تحكم في الوصول إلى نسخة مشتركة واحدة مع الانتباه لمخاطر الحالة العامة.

#### الأنماط الهيكلية

Skills: 7

[structural.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (ar):** اكتشف أنماط ربط مكونات البرمجيات وتغليفها ومشاركتها.

##### المكيّف

[adapter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (ar):** اربط واجهات غير متوافقة بترجمة التعامل بينها.

##### الجسر

[bridge.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (ar):** افصل تجريد المكوّن عن التنفيذ الذي يستخدمه.

##### المركّب

[composite.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (ar):** تعامل مع الكائنات المفردة ومجموعات الكائنات عبر واجهة مشتركة.

##### المزيّن

[decorator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (ar):** أضف سلوكًا بتغليف كائن بدلًا من تكثير الأصناف الفرعية.

##### الواجهة المبسطة

[facade.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (ar):** قدّم مدخلًا بسيطًا لمجموعة معقدة من المكوّنات.

##### وزن الذبابة

[flyweight.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (ar):** شارك بيانات كائنات قابلة لإعادة الاستخدام لتقليل استهلاك الذاكرة غير الضروري.

##### الوكيل

[proxy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (ar):** تحكم في الوصول إلى كائن عبر كائن آخر يحمل الواجهة نفسها.

### الإبداع الرقمي والألعاب

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (ar):** أنشئ وسائط رقمية وصمّم قواعد ألعاب قابلة للتطبيق واستكشف التوليد الإجرائي.

#### المواد الرقمية

Skills: 3

[digitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (ar):** تعلّم إنشاء المحتوى الرقمي وتحريره واختيار الأدوات المناسبة لغرض محدد.

##### اختيار أداة إبداع رقمية

[chooseADigitalCreativeTool.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (ar):** اختر برنامجًا إبداعيًا يناسب ما تريد إنتاجه.

##### إنشاء منتج رقمي بسيط

[createASimpleDigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (ar):** أنشئ بطاقة أو صورة أو منتجًا رقميًا مترابطًا لجمهور محدد.

##### تحرير منتج رقمي

[editADigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (ar):** حسّن ملفًا رقميًا موجودًا دون فقدان معناه المقصود.

#### تصميم الألعاب

Skills: 3

[gameDesign.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (ar):** اكتشف كيف تشكّل القواعد وتصرفات اللاعبين تجربة اللعب.

##### تصميم آلية للعبة

[designAGameMechanic.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (ar):** اربط فعل اللاعب بتغيّر حالة اللعبة والتغذية الراجعة.

##### صياغة قاعدة للعبة

[formulateAGameRule.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (ar):** اكتب قاعدة للعبة بوضوح ليعرف اللاعبون ما يُسمح به.

##### اختبار توازن لعبة بسيطة

[testTheBalanceOfASimpleGame.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (ar):** اختبر ما إذا كانت قواعد اللعبة تجعلها عادلة ومليئة بالتحدي وقابلة للإنهاء.

#### التوليد الإجرائي

Skills: 4

[proceduralGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (ar):** اكتشف كيف تنشئ الخوارزميات أشكالًا عديدة من المحتوى انطلاقًا من قواعد موجزة.

##### مقارنة تخزين الموارد وتوليدها

[compareResourceStorageAndGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (ar):** قارن مساحة التخزين التي يوفرها التوليد الإجرائي بالحوسبة التي يتطلبها.

##### ضبط معلمات المولّد

[configureGeneratorParameters.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (ar):** غيّر إعدادات المولّد للتحكم في مظهر المخرجات أو كميتها.

##### شرح التوليد الإجرائي للموارد

[explainProceduralResourceGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (ar):** اشرح كيف يُنشئ المولّد الموارد بدلًا من تخزين كل نسخة نهائية.

##### إعادة إنتاج النتائج باستخدام بذرة توليد

[reproduceResultsUsingAGenerationSeed.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (ar):** افهم كيف تؤدي بذرة ثابتة وقواعد غير متغيرة إلى النتيجة نفسها.

### تجربة مستخدم المنتج الرقمي

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (ar):** صمّم تجارب رقمية يسهل فهمها والتنقل فيها واستخدامها بإمكانية وصول مناسبة.

#### إمكانية الوصول

Skills: 2

[accessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (ar):** اكتشف كيف تؤثر القدرات المختلفة وطرق الإدخال في الوصول الرقمي.

##### تحديد احتياجات المستخدمين ذوي القدرات المختلفة

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (ar):** تعرّف على احتياجات من يستخدمون لوحة المفاتيح أو النص المكبّر أو التقنيات المساعدة.

##### اختبار إمكانية الوصول في التفاعل الرقمي

[testDigitalInteractionAccessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (ar):** اختبر واجهة دون فأرة أو صوت وسجّل العوائق.

#### تصميم التفاعل الرقمي

Skills: 4

[digitalInteractionDesign.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (ar):** اكتشف كيفية تخطيط إجراءات بديهية واستجابات مفيدة في الواجهات الرقمية.

##### تصميم التغذية الراجعة للواجهة الرقمية

[designDigitalInterfaceFeedback.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (ar):** اجعل الأزرار وحالات التحميل والأخطاء تقدّم ردودًا مفهومة.

##### تصميم التنقل في الواجهة الرقمية

[designDigitalInterfaceNavigation.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (ar):** رتّب الشاشات والتنقل بحيث يجد الناس الإجراءات المناسبة.

##### تحديد هدف مستخدم المنتج الرقمي

[identifyADigitalProductUsersGoal.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (ar):** حدّد ما يريد الشخص إنجازه باستخدام تطبيق أو جهاز رقمي.

##### منع أخطاء التفاعل الرقمي الشائعة

[preventCommonDigitalInteractionErrors.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (ar):** استخدم التسميات والتحقق والتأكيد لمنع الأخطاء التي يمكن تجنبها.

#### تقييم التجربة والأخلاقيات

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (ar):** اكتشف كيف يُحسّن اختبار المستخدمين والتصميم الصادق المنتجات الرقمية.

##### تحديد أنماط الواجهات المتلاعبة

[identifyManipulativeInterfacePatterns.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (ar):** تعرّف على حيل الواجهات التي تخفي التكاليف أو تفرض خيارات أو تعرقل الإلغاء.

##### اختبار سهولة استخدام الواجهة الرقمية

[testDigitalInterfaceUsability.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (ar):** راقب ما إذا كان الشخص يستطيع إكمال مهمة حقيقية دون تلميحات إضافية.

### السلامة والمسؤولية الرقمية

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (ar):** تعلّم حماية المعلومات واحترام الآخرين وفهم آثار التقنية الرقمية.

#### حماية الحسابات

Skills: 9

[accountProtection.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (ar):** تعلّم كيفية حماية الحسابات والتعامل مع الرسائل المشبوهة.

##### التحقق من هوية مرسل البريد الإلكتروني

[assessAnEmailSendersAuthenticity.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (ar):** تحقق من هوية المرسل بما يتجاوز الاسم أو الصورة الظاهرين.

##### تقييم مخاطر اتباع رابط

[assessTheRiskOfFollowingALink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (ar):** قيّم ما قد يحدث عند فتح رابط مشبوه أو الانتقال عبره.

##### إعداد المصادقة متعددة العوامل

[configureMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (ar):** فعّل عاملًا إضافيًا لتسجيل الدخول وخطّط لاستعادة الوصول بأمان.

##### إنشاء عبارة مرور قوية

[createAStrongPassphrase.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (ar):** أنشئ عبارة مرور طويلة يصعب تخمينها وتختلف من حساب لآخر.

##### شرح المصادقة متعددة العوامل

[explainMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (ar):** افهم كيف يساعد عامل تحقق ثانٍ مستقل في حماية الحساب.

##### شرح أهمية تحديثات البرامج

[explainWhySoftwareUpdatesMatter.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (ar):** تعلّم لماذا تساعد التحديثات الرسمية للبرامج على إصلاح ثغرات الأمان.

##### التعرّف إلى رسالة تصيّد احتيالي

[recognizeAPhishingMessage.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (ar):** اكتشف الرسائل التي تنتحل صفة الآخرين لسرقة كلمات المرور أو الرموز.

##### التعامل مع تواصل رقمي مشبوه

[respondToSuspiciousDigitalContact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (ar):** استجب بأمان للاتصالات المشبوهة وتحقق من الطلبات عبر قناة مستقلة.

##### التحقق من نطاق موقع ويب

[verifyAWebsitesDomain.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (ar):** اقرأ اسم النطاق الحقيقي في عنوان الموقع واكتشف العناوين المشابهة المضللة.

#### أخلاقيات التفاعل الرقمي

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (ar):** تعلّم التواصل باحترام والالتزام بأذونات أصحاب المحتوى.

##### نسب المواد الرقمية لأصحابها

[attributeDigitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (ar):** انسب المحتوى الرقمي الذي تستخدمه إلى مبدعيه الأصليين.

##### اختيار طريقة آمنة للإبلاغ عن مشكلة

[chooseASafeWayToReportAProblem.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (ar):** اختر أشخاصًا موثوقين أو قنوات رسمية للإبلاغ عن مشكلات عبر الإنترنت.

##### التمييز بين تراخيص المحتوى الرقمي

[distinguishDigitalContentLicenses.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (ar):** ميّز بين قيود حقوق النشر والتراخيص المفتوحة ومحتوى الملك العام.

##### تحديد السلوك الملائم عبر الإنترنت

[identifyAppropriateOnlineBehavior.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (ar):** تعرّف إلى التهديدات والمضايقات والتنمر في التواصل الرقمي.

#### الخصوصية

Skills: 5

[privacy.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (ar):** اكتشف كيف يمكن أن تؤثر مشاركة المعلومات عبر الإنترنت في الخصوصية.

##### اختيار طرق آمنة لمشاركة البيانات

[chooseSafeDataSharingMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (ar):** حدّد من يجوز له تلقي المعلومات الحساسة وكيفية مشاركتها بأمان.

##### التمييز بين محادثة خاصة ورابط عام

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (ar):** تحقق ممن يستطيع فتح محادثة أو مستند مشترك، ولا تفترض أن الرابط خاص.

##### شرح إعادة تحديد الهوية من البيانات

[explainDataReIdentification.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (ar):** اشرح كيف يمكن جمع تفاصيل متفرقة لإعادة التعرف إلى شخص.

##### تحديد البيانات الشخصية

[identifyPersonalData.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (ar):** تعرّف إلى معلومات قد تكشف هوية شخص بمفردها أو عند جمعها مع تفاصيل أخرى.

##### التعرّف إلى البصمة الرقمية

[recognizeADigitalFootprint.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (ar):** افهم كيف قد تترك المنشورات والأنشطة عبر الإنترنت سجلات تبقى طويلًا.

#### الأثر الاجتماعي والبيئي للحوسبة

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (ar):** اكتشف كيف تؤثر الحوسبة في الإنصاف واستخدام الموارد والبيئة.

##### تقييم أثر الخوارزمية على مجموعات المستخدمين

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (ar):** فكّر فيما إذا كانت نتائج الخوارزمية تختلف بغير إنصاف بين مجموعات المستخدمين.

##### تقييم الأثر البيئي للحوسبة

[assessComputingsEnvironmentalImpact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (ar):** قارن آثار الحوسبة من حيث الطاقة والمواد والنفايات الإلكترونية.

### الأنظمة الرقمية والشبكات

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (ar):** اكتشف كيف تعمل أجهزة الحوسبة والمعلومات الرقمية والشبكات معًا.

#### مكوّنات الأجهزة الرقمية

Skills: 3

[digitalDeviceComponents.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (ar):** اكتشف كيف تؤدي مكوّنات الأجهزة المادية والبرمجيات مهام حوسبة مختلفة.

##### التمييز بين العتاد والبرمجيات

[distinguishHardwareFromSoftware.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (ar):** ميّز الأجزاء المادية للحاسوب من البرمجيات التي تتحكم فيها.

##### شرح وظيفة المعالج

[explainAProcessorsFunction.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (ar):** اشرح كيف ينفذ المعالج التعليمات بدلًا من تخزين الملفات بصورة دائمة.

##### التعرف على الأجهزة الرقمية

[identifyDigitalDevices.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (ar):** تعرّف على الأجهزة التي تعالج معلومات رقمية قابلة للبرمجة.

#### الذاكرة والتخزين

Skills: 4

[memoryAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (ar):** اكتشف دور الذاكرة المؤقتة وذاكرة البرامج الثابتة وتخزين الملفات.

##### التمييز بين RAM وROM والتخزين

[distinguishRAMROMAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (ar):** قارن أنواع المعلومات المصممة لحفظها في RAM وROM والتخزين الدائم.

##### شرح التخزين الدائم

[explainPersistentStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (ar):** افهم لماذا تحتفظ أجهزة التخزين بالملفات بعد انقطاع الطاقة.

##### شرح ذاكرة RAM

[explainRAM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (ar):** اكتشف كيف تحتفظ ذاكرة RAM بالمعلومات المستخدمة أثناء عمل الحاسوب.

##### شرح وظيفة ذاكرة ROM

[explainThePurposeOfROM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (ar):** تعرّف على كيفية مساعدة ذاكرة البرامج الثابتة غير المتطايرة في بدء تشغيل الأجهزة.

#### نماذج الشبكات وبروتوكولاتها

Skills: 11

[networkModelsAndProtocols.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (ar):** اكتشف كيف تحدد بروتوكولات الشبكات قواعد إرسال المعلومات.

##### مقارنة طرق الوصول إلى الشبكة

[compareNetworkAccessMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (ar):** قارن كشف التصادمات وتجنبها وتمرير الرمز في سياقات استخدامها المناسبة.

##### التمييز بين HTTP وHTTPS

[distinguishHTTPFromHTTPS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (ar):** تعرّف على ما يحميه HTTPS ولماذا لا يضمن أن الموقع جدير بالثقة.

##### التمييز بين OSI وTCP/IP

[distinguishOSIFromTCPIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (ar):** قارن الطبقات المفاهيمية لنموذج OSI بمجموعة بروتوكولات TCP/IP في الإنترنت.

##### التمييز بين TCP وUDP

[distinguishTCPFromUDP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (ar):** قارن تدفقات TCP الموثوقة برسائل UDP التي لا توفر الضمانات نفسها.

##### شرح بروتوكول الشبكة

[explainANetworkProtocol.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (ar):** اشرح لماذا تحتاج الأجهزة إلى قواعد متفق عليها لتبادل الرسائل.

##### شرح CSMA/CA

[explainCSMACA.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (ar):** اشرح كيف تحاول الأجهزة اللاسلكية تجنّب الإرسال عبر قناة مشغولة.

##### شرح CSMA/CD

[explainCSMACD.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (ar):** تعرّف على سبب حاجة شبكات إيثرنت المشتركة القديمة إلى كشف التصادمات.

##### شرح DNS

[explainDNS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (ar):** اشرح كيف يساعد DNS على العثور على عناوين الشبكة باستخدام أسماء النطاقات.

##### شرح طبقات OSI

[explainTheOSILayers.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (ar):** استخدم نموذج OSI المكوّن من سبع طبقات لتنظيم وظائف الشبكات.

##### شرح الغرض من IP

[explainThePurposeOfIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (ar):** افهم كيف يوفّر IP العنونة ويوجّه الحزم بين الشبكات.

##### شرح شبكة Token Ring

[explainTokenRing.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (ar):** اكتشف كيف يحدد تمرير الرمز أي جهاز يُسمح له بإرسال البيانات.

#### الشبكات

Skills: 4

[networks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (ar):** اكتشف كيف ترسل الأجهزة المتصلة الرسائل وتتشارك الموارد.

##### التمييز بين الإنترنت والويب

[distinguishTheInternetFromTheWeb.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (ar):** ميّز بنية شبكة الإنترنت الأساسية من مواقع الويب التي تعمل فوقها.

##### شرح توصيل الرسائل عبر الشبكة

[explainNetworkMessageDelivery.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (ar):** تتبّع مرور الرسائل عبر أجهزة الشبكة حتى تصل إلى وجهتها.

##### شرح الغرض من شبكة الحاسوب

[explainThePurposeOfAComputerNetwork.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (ar):** اشرح لماذا تربط الشبكات أجهزة منفصلة لتبادل المعلومات.

##### شرح الاتصال اللاسلكي

[explainWirelessCommunication.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (ar):** اكتشف كيف تتواصل الأجهزة اللاسلكية عبر الإشارات بدلًا من الكابلات المباشرة.

#### أنظمة العد

Skills: 4

[numeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (ar):** تعلّم كيف تُمثّل الأرقام الأعداد في أنظمة ذات أسس مختلفة.

##### التحويل بين الثنائي والعشري

[convertBetweenBinaryAndDecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (ar):** حوّل الأعداد الصغيرة بين النظامين الثنائي والعشري.

##### التمييز بين الثنائي والسداسي عشر

[distinguishBinaryAndHexadecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (ar):** افهم لماذا يتيح النظام السداسي عشر كتابة مجموعات البتات بصورة أقصر.

##### شرح المنطق الثنائي في الحاسوب

[explainComputerBinaryLogic.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (ar):** اربط الصفر والواحد الثنائيين بحالات إشارات إلكترونية يمكن تمييزها.

##### شرح أنظمة العد الموضعية

[explainPositionalNumeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (ar):** افهم لماذا يغيّر موضع الرقم قيمته في العدد.

#### أنظمة التشغيل

Skills: 4

[operatingSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (ar):** اكتشف كيف تدير أنظمة التشغيل البرامج والملفات والأجهزة.

##### التمييز بين عائلات أنظمة التشغيل

[distinguishOperatingSystemFamilies.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (ar):** تعرّف على عائلات أنظمة التشغيل الشائعة وأوجه اختلافها.

##### شرح عملية في نظام التشغيل

[explainAnOSProcess.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (ar):** ميّز العملية قيد التشغيل من ملف البرنامج المخزن على القرص.

##### شرح الغرض من نظام التشغيل

[explainAnOperatingSystemsPurpose.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (ar):** افهم كيف ينسّق نظام التشغيل بين البرمجيات والعتاد.

##### شرح دور لينوس تورفالدس في لينكس

[explainLinusTorvaldsRoleInLinux.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (ar):** تعرّف على بداية نواة لينكس وكيف يساهم كثير من المطورين في بناء أنظمة التشغيل.

#### التمثيل والتخزين

Skills: 4

[representationAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (ar):** تعلّم كيف تمثّل الأجهزة المعلومات وتنظّم الملفات المخزنة.

##### مقارنة أحجام الملفات الرقمية

[compareDigitalFileSizes.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (ar):** قارن أحجام الملفات واشرح كيف يؤثر التنسيق والضغط فيها.

##### التمييز بين الصيغ الرقمية

[distinguishDigitalFormats.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (ar):** تعرّف كيف يحدد تنسيق الملف طريقة تفسير البتات المخزنة.

##### شرح التمثيل الثنائي

[explainBinaryRepresentation.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (ar):** افهم كيف ترمز سلاسل الأصفار والآحاد إلى أنواع مختلفة من البيانات.

##### تنظيم الملفات في المجلدات

[organizeFilesInDirectories.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (ar):** رتّب الملفات في مجلدات مناسبة بحيث يمكن العثور عليها عبر مساراتها.

#### تنفيذ المهام

Skills: 3

[taskExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (ar):** اكتشف الفرق بين تداخل تقدم المهام وتنفيذ الأعمال بالتزامن الفعلي.

##### توزيع المهام المستقلة على وحدات التنفيذ

[distributeIndependentTasksAcrossExecutors.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (ar):** خطط للمهام التي يمكن تنفيذها معًا وتلك التي يجب أن تنتظر نتائج مهام أخرى.

##### شرح التنفيذ المتزامن بالتداخل

[explainConcurrentExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (ar):** افهم كيف تتقدم عدة مهام دون أن تعمل بالضرورة في اللحظة نفسها تمامًا.

##### شرح التنفيذ المتوازي

[explainParallelExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (ar):** تعرّف على الحالات التي تعمل فيها عدة معالجات فعليًا في الوقت نفسه.

### Git والبرمجيات مفتوحة المصدر

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (ar):** اكتشف كيف يتتبع المطوّرون التغييرات ويتعاونون ويتشاركون البرمجيات بتراخيص واضحة.

#### تطوير المنتجات الرقمية بالتعاون

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (ar):** استكشف كيف تنظم الفرق المساهمات والمراجعات وإصدارات المشروع.

##### تنسيق التغييرات في مشروع رقمي مشترك

[coordinateChangesInASharedDigitalProject.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (ar):** خطط لمن سيغيّر ماذا وكيف ستُدمج التعديلات المشتركة.

##### شرح إرشادات المساهمة

[explainContributionGuidelines.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (ar):** افهم كيف تساعد قواعد المساهمة الناس على العمل في قاعدة شيفرة مشتركة.

##### تتبّع إصدارات المنتج الرقمي

[trackDigitalProductVersions.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (ar):** استخدم سجل الإصدارات لمعرفة وقت التغييرات أو استعادة عمل سابق.

#### التحكم بالإصدارات باستخدام Git

Skills: 6

[gitVersionControl.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (ar):** تعلّم كيف يسجل Git الإصدارات ويساعد الفرق على دمج التغييرات.

##### التمييز بين المستودعات المحلية والبعيدة

[distinguishLocalAndRemoteRepositories.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (ar):** ميّز بين العمل المخزّن على جهازك والنسخ المشتركة عبر المستودعات البعيدة.

##### شرح الفرع

[explainABranch.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (ar):** افهم كيف تتيح الفروع للمطوّرين العمل على مسارات تغيير منفصلة.

##### شرح عملية Commit

[explainACommit.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (ar):** تعرّف إلى عملية Commit بوصفها لقطة محددة بمعرّف ومرتبطة بسجل التغييرات السابق.

##### شرح طلب السحب

[explainAPullRequest.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (ar):** اكتشف كيف تنظّم طلبات السحب التغييرات المقترحة من أجل مراجعتها.

##### شرح المستودع

[explainARepository.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (ar):** افهم أن المستودع مشروع يحتفظ بسجل تغييراته.

##### شرح دمج الفروع

[explainBranchMerging.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (ar):** تعلّم كيف تُدمج الفروع ولماذا تحتاج بعض التعارضات إلى حل.

#### المصدر المفتوح

Skills: 2

[openSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (ar):** اكتشف الأذونات التي تجعل البرمجيات مفتوحة المصدر فعلًا.

##### التمييز بين المصدر المفتوح والشيفرة المرئية للعامة

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (ar):** اعلم أن إتاحة قراءة الشيفرة لا تعني تلقائيًا أنها مفتوحة المصدر.

##### شرح المصدر المفتوح

[explainOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (ar):** افهم كيف تسمح تراخيص المصدر المفتوح باستخدام البرمجيات وتعديلها وإعادة توزيعها.

### تاريخ البرمجة

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (ar):** اكتشف كيف تطورت أفكار البرمجة وآلات الحوسبة عبر التاريخ.

#### إسهامات رئيسية

Skills: 6

[keyContributions.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (ar):** استكشف إسهامات مهمة في البرمجة وموثوقية البرمجيات وشبكات الحاسوب.

##### شرح نظرية قابلية الحوسبة

[explainComputabilityTheory.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (ar):** تعرّف كيف تكشف النماذج الشكلية ما تستطيع الحواسيب حسابه وما لا تستطيع.

##### شرح البرمجة الإلكترونية المبكرة

[explainEarlyElectronicProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (ar):** اكتشف كيف كانت فرق الحواسيب الإلكترونية الأولى تطوّر البرامج وتختبرها.

##### شرح تطور المترجمات البرمجية

[explainTheDevelopmentOfCompilers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (ar):** اكتشف كيف جعلت المترجمات كتابة البرامج بلغات مقروءة أسهل.

##### شرح تطور موثوقية البرمجيات

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (ar):** افهم أهمية معالجة الأخطاء والبرمجيات الموثوقة في مهمات أبولو.

##### شرح إزالة الحلقات في الشبكات

[explainTheEliminationOfNetworkLoops.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (ar):** اكتشف كيف يساعد بروتوكول الشجرة الممتدة على منع الحلقات في الشبكات المحلية.

##### شرح أصول البرمجة

[explainTheOriginsOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (ar):** اكتشف كيف مهّدت التصاميم المبكرة للآلات وأعمال آدا لوفلايس الطريق للبرمجة.

#### الآلات وتحليل الشفرات

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (ar):** اكتشف كيف ساعدت الآلات والأساليب الرياضية في تحليل الشفرات تاريخيًا.

##### شرح أساليب تحليل الشفرات التاريخية

[explainHistoricalCryptanalysisMethods.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (ar):** اكتشف كيف استخدم محللو الشفرات الأنماط والاختبارات المنهجية لكسر الرموز.

##### شرح تطور الحواسيب القابلة للبرمجة

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (ar):** تتبّع التطور من أفكار الحساب الميكانيكي إلى الآلات الإلكترونية القابلة للبرمجة.

##### شرح الغرض من آلة بومب

[explainThePurposeOfTheBombe.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (ar):** افهم كيف ساعدت آلة بومب في اختبار الإعدادات المحتملة لإنِغما.

### المعلومات والبيانات

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (ar):** استكشف كيفية العثور على معلومات موثوقة وتنظيم البيانات والتفكير في عدم اليقين.

#### جمع البيانات وتنظيمها

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (ar):** تعلّم جمع المعلومات ذات الصلة وتنظيم سجلات قابلة للمقارنة.

##### جمع البيانات باتساق

[collectDataConsistently.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (ar):** اجمع القياسات باستخدام قواعد ووحدات موحدة.

##### تجميع البيانات وفق سمة

[groupDataByAttribute.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (ar):** صنّف السجلات حسب خاصية واضحة واحدة.

##### تحديد البيانات اللازمة لمهمة

[identifyDataNeededForATask.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (ar):** حدّد الحقول والملاحظات التي يتطلبها السؤال بالفعل.

##### عرض البيانات في جدول

[presentDataInATable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (ar):** أنشئ جدولًا بصفوف وأعمدة معنونة وقيم متسقة.

#### قواعد البيانات

Skills: 5

[databases.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (ar):** اكتشف كيف تنظم قواعد البيانات السجلات وتربط المعلومات ذات الصلة.

##### تصميم مخطط بسيط لقاعدة بيانات

[designASimpleDatabaseSchema.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (ar):** خطط لقاعدة بيانات بسيطة ذات كيانات وحقول وروابط مناسبة.

##### التمييز بين السجلات والحقول

[distinguishRecordsAndFields.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (ar):** ميّز السجل من الحقول التي تصفه.

##### تفسير جدول قاعدة بيانات

[explainADatabaseTable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (ar):** افهم كيف يخزن الجدول سجلات من النوع نفسه.

##### تفسير المفاتيح الأساسية

[explainPrimaryKeys.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (ar):** فسّر لماذا تحتاج قاعدة البيانات إلى مفتاح فريد وثابت لكل سجل.

##### نمذجة العلاقات بين الجداول

[modelRelationshipsBetweenTables.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (ar):** اربط المعلومات في الجداول المختلفة باستخدام المعرفات.

#### البحث عن المعلومات والتحقق منها

Skills: 4

[informationSearchAndVerification.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (ar):** تعلّم البحث عن الأدلة والتحقق مما إذا كان الادعاء مدعومًا بها.

##### مقارنة مصادر المعلومات

[compareInformationSources.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (ar):** قارن مصادر متعددة وحدد مواضع اختلاف رواياتها.

##### التمييز بين الرسائل والبيانات

[distinguishMessagesFromData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (ar):** ميّز القيمة المسجلة من المعنى الذي تضيفه الرسالة إليها.

##### صياغة استعلام معلومات

[formulateAnInformationQuery.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (ar):** اختر كلمات بحث محددة تناسب ما تحتاج إلى العثور عليه.

##### التحقق من ادعاء بالرجوع إلى مصدر

[verifyAClaimAgainstASource.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (ar):** تحقق من الادعاء بأدلة مناسبة بدلًا من تكرار التأكيدات.

#### الاحتمال وعدم اليقين

Skills: 7

[probabilityAndUncertainty.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (ar):** استكشف الأحداث الممكنة وفرص وقوعها وحدود التنبؤ.

##### مقارنة احتمالات أحداث بسيطة

[compareProbabilitiesOfSimpleEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (ar):** قارن فرص نتيجتين وفق الافتراضات نفسها.

##### التمييز بين الإمكانية والاحتمال

[distinguishPossibilityFromProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (ar):** افهم لماذا لا يعني إمكان وقوع حدث أنه مرجح.

##### التمييز بين الأحداث العشوائية والحتمية

[distinguishRandomAndDeterministicEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (ar):** ميّز النتائج التي تحددها قاعدة من النتائج المختارة عشوائيًا.

##### تفسير إمكانية وقوع حدث

[explainEventPossibility.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (ar):** حدّد ما إذا كانت الشروط المحددة تسمح بحدوث نتيجة معينة.

##### تفسير احتمال وقوع حدث

[explainEventProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (ar):** قدّر فرصة حدوث حدث باستخدام نموذج احتمالي محدد.

##### تفسير حدود التنبؤ

[explainLimitsOfPrediction.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (ar):** فسّر لماذا لا تكفي معرفة الاحتمالات للتنبؤ بنتيجة محاولة واحدة.

##### استخدام العشوائية في نموذج

[useRandomnessInAModel.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (ar):** أضف خيارات عشوائية إلى نموذج مع تحديد النتائج التي يمكن أن تحدث.

#### الاستقصاء الإحصائي

Skills: 4

[statisticalInvestigation.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (ar):** تعلّم استكشاف البيانات باستخدام الرسوم البيانية والتكرارات والمقارنات.

##### مقارنة مجموعات الملاحظات

[compareSetsOfObservations.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (ar):** قارن مجموعتي بيانات باستخدام المقاييس أو الفئات نفسها.

##### إنشاء رسم بياني بسيط

[constructASimpleChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (ar):** أنشئ رسمًا واضحًا يمثل نسب البيانات بدقة.

##### إيجاد القيمة الأكثر تكرارًا

[findTheMostFrequentValue.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (ar):** حدّد القيمة التي تتكرر أكثر في المجموعة.

##### قراءة رسم بياني

[readAChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (ar):** اقرأ المقاييس والتسميات والقيم دون أن يضللك أسلوب العرض.

### البرمجة

Groups: 8 · Skills: 37

[programming.data.ts](../../../learningApps/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (ar):** تعلّم فهم التعليمات التي ينفذها الحاسوب وكتابتها واختبارها.

#### أنواع البيانات والمراجع

Skills: 6

[dataTypesAndReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (ar):** اكتشف كيف تؤثر الأنواع والمراجع في القيم التي يمكن للبرامج استخدامها.

##### التمييز بين نسخ القيم والمراجع المشتركة

[distinguishValueCopyingFromSharedReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (ar):** اشرح متى يشترك متغيران في كائن واحد ومتى تكون قيمهما مستقلة.

##### التمييز بين أنواع القيم

[distinguishValueTypes.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (ar):** حدّد ما إذا كانت القيمة رقمية أو نصية أو منطقية وما العمليات الممكنة عليها.

##### شرح عقد نوع البيانات

[explainADataTypeContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (ar):** افهم نوع القيمة التي تتوقع دالة برمجية استلامها.

##### شرح هياكل البيانات المركبة

[explainCompositeDataStructures.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (ar):** تعرّف على القوائم والمصفوفات والسجلات التي تنظّم قيمًا متعددة.

##### شرح القيم الأولية في لغة برمجة

[explainPrimitiveValuesInALanguage.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (ar):** حدّد أنواع القيم البسيطة كما تعرّفها لغة برمجة محددة.

##### التحقق من البيانات وفق العقد

[validateDataAgainstAContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (ar):** تحقق من توافق المدخلات مع النوع أو البنية المطلوبة قبل استخدامها.

#### الدوال وإعادة الاستخدام

Skills: 5

[functionsAndReuse.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (ar):** تعلّم تنظيم العمليات القابلة لإعادة الاستخدام في دوال.

##### استدعاء دالة بوسيطات

[callAFunctionWithArguments.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (ar):** استدعِ دالة بوسيطات وتتبّع كيفية استخدامها.

##### تعريف دالة ذات معاملات

[defineAFunctionWithParameters.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (ar):** اكتب دالة تستقبل معاملات بدلًا من قيم أمثلة ثابتة.

##### شرح الاستدعاء الذاتي

[explainRecursion.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (ar):** افهم كيف تحل الدالة العودية حالات أصغر وتتوقف في النهاية.

##### شرح الغرض من الدالة

[explainThePurposeOfAFunction.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (ar):** اشرح كيف تنفّذ دالة مسماة عمليةً عند استدعائها.

##### استخدام القيمة المعادة من دالة

[useAFunctionsReturnValue.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (ar):** استخدم النتيجة المعادة في حسابات لاحقة بدل عرضها فقط.

#### بيانات البرنامج

Skills: 3

[programData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (ar):** تعرّف إلى القيم والحالة المتغيرة التي يستخدمها البرنامج أثناء تشغيله.

##### تحديث حالة البرنامج

[updateProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (ar):** غيّر الحالة المخزنة للبرنامج بناءً على ما حدث سابقًا.

##### استخدام متغير

[useAVariable.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (ar):** خزّن قيمة تحت اسم متغير واقرأها عند الحاجة.

##### استخدام بيانات الإدخال

[useInputData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (ar):** استخدم المعلومات الواردة من خارج البرنامج لتحديد سلوكه.

#### بنية البرنامج وبناء الجملة

Skills: 4

[programStructureAndSyntax.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (ar):** تعلّم كيف تنظم لغات البرمجة الكلمات المحجوزة والتعبيرات والكتل البرمجية.

##### التمييز بين الكلمات المحجوزة والمعرّفات

[distinguishKeywordsFromIdentifiers.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (ar):** ميّز الكلمات المحجوزة في اللغة من الأسماء التي يختارها المبرمجون.

##### التمييز بين العوامل والتعبيرات والتعليمات

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (ar):** تعرّف على الفرق بين العوامل والتعبيرات والتعليمات البرمجية.

##### شرح حدود كتل التعليمات

[explainStatementBlockBoundaries.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (ar):** حدّد التعليمات التي تنتمي إلى حلقة أو دالة أو كتلة شرطية.

##### شرح تمييز الصياغة بالألوان

[explainSyntaxHighlighting.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (ar):** افهم ما يساعد تلوين الشيفرة على إظهاره وما لا يستطيع إثباته.

#### بنى البرمجة

Skills: 7

[programmingConstructs.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (ar):** تعلّم التحكم في البرامج باستخدام التسلسل والشروط والحلقات والأحداث.

##### اكتشاف حلقة لا نهائية

[detectAnInfiniteLoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (ar):** اكتشف حلقة لا تنتهي لأن شرطها لا يصبح خاطئًا أبدًا.

##### معالجة حدث

[handleAnEvent.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (ar):** اجعل البرنامج يستجيب عند ضغط زر أو وصول رسالة أو وقوع حدث آخر.

##### تنفيذ حلقة تكرار

[implementALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (ar):** استخدم الحلقات لتكرار التعليمات حتى يتحقق شرط التوقف الصحيح.

##### تنفيذ سلوك مشروط

[implementConditionalBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (ar):** اجعل البرنامج يختار إجراءات مختلفة عندما تتغير الشروط.

##### نقل الحسابات الثابتة إلى خارج الحلقة

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (ar):** انقل الحسابات التي لا تتغير أثناء التكرار إلى خارج الحلقات.

##### ترتيب فحوص الشروط المتداخلة

[orderOverlappingConditionalChecks.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (ar):** رتّب فحوص الشروط بحيث تظل الحالات الخاصة قابلة للوصول.

##### كتابة تسلسل من الأوامر

[writeASequenceOfCommands.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (ar):** اكتب أوامر صحيحة تنفذ الإجراءات بالترتيب المقصود.

#### أنماط البرمجة

Skills: 4

[programmingParadigms.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (ar):** اكتشف طرقًا مختلفة لتنظيم منطق البرامج وسلوكها.

##### التمييز بين الأساليب الأمرية والتصريحية

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (ar):** قارن بين إعطاء تعليمات صريحة ووصف النتيجة المطلوبة.

##### شرح البرمجة الوظيفية

[explainFunctionalProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (ar):** افهم البرامج التي تحوّل القيم عبر تركيب الدوال.

##### شرح البرمجة كائنية التوجّه

[explainObjectOrientedProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (ar):** اكتشف البرامج المبنية من كائنات متفاعلة لها حالة وسلوك.

##### شرح البرمجة الإجرائية

[explainProceduralProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (ar):** اكتشف البرامج المنظّمة حول إجراءات متتابعة خطوة بخطوة.

#### قراءة البرامج

Skills: 4

[readingPrograms.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (ar):** اكتشف كيف تقرأ برنامجًا وتتبع ما يفعله.

##### شرح الغرض من أمر برمجي

[explainACommandsPurpose.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (ar):** اشرح كيف يؤثر أمر برمجي واحد في حالة البرنامج.

##### التنبؤ بنتائج ترتيب التنفيذ

[predictConsequencesOfExecutionOrder.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (ar):** اشرح لماذا قد يؤدي تغيير ترتيب الأوامر إلى تغيير النتيجة.

##### التنبؤ بمخرجات البرنامج

[predictProgramOutput.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (ar):** استنتج النتيجة الظاهرة التي سينتجها البرنامج لمدخلات معينة.

##### تتبّع حالة البرنامج

[traceProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (ar):** تابع التغيرات في المتغيرات والقيم الأخرى أثناء تشغيل البرنامج.

#### الاختبار وتصحيح الأخطاء

Skills: 4

[testingAndDebugging.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (ar):** اكتشف كيفية العثور على أخطاء البرامج وتفسيرها وتصحيحها.

##### اكتشاف سلوك غير صحيح للبرنامج

[detectIncorrectProgramBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (ar):** تعرّف على الحالات التي يختلف فيها سلوك البرنامج عن متطلباته.

##### إصلاح عيب في البرنامج

[fixAProgramDefect.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (ar):** أصلح عيبًا محددًا وتحقق من استمرار عمل السلوك المطلوب.

##### تحديد سبب الخطأ

[locateTheCauseOfAnError.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (ar):** تتبّع الخطأ البرمجي إلى التعليمة أو الشرط الذي يسببه.

##### اختبار برنامج بمدخلات مختلفة

[testAProgramWithDifferentInputs.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (ar):** اختبر البرنامج بمدخلات متنوعة، بما فيها الحالات الحدية.

### الروبوتات والأتمتة

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (ar):** اكتشف كيف تساعد المستشعرات والبرمجة والمشغلات الروبوتات على الاستجابة لمحيطها.

#### التحكم في الروبوتات

Skills: 4

[robotControl.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (ar):** أنشئ تعليمات لحركات الروبوت واستجاباته وحسّنها.

##### ضبط إجراء متكرر للروبوت

[configureARepeatedRobotAction.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (ar):** حدّد عدد مرات تكرار الروبوت لفعل ما أو متى يجب أن يتوقف.

##### إنشاء تسلسل حركات للروبوت

[createARobotMovementSequence.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (ar):** خطّط أوامر الحركة بالترتيب الذي يوصل الروبوت إلى وجهته.

##### تصحيح سلوك الروبوت

[debugRobotBehavior.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (ar):** تحقّق مما إذا كان سلوك الروبوت غير المتوقع ناتجًا عن الاستشعار أو المنطق أو التنفيذ.

##### تنفيذ استجابة الروبوت للعوائق

[implementRobotObstacleResponse.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (ar):** اجعل الروبوت يتوقف أو ينعطف أو يتجنب عائقًا عند اكتشافه بواسطة مستشعر.

#### مكوّنات النظام الروبوتي

Skills: 4

[roboticSystemComponents.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (ar):** تعلّم كيف يستشعر الروبوت الظروف ويقرر ما يفعل ثم يتصرف.

##### تحديد وحدة تحكم الروبوت

[identifyARobotController.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (ar):** حدّد وحدة التحكم التي تحوّل مدخلات المستشعرات إلى أفعال مبرمجة.

##### تحديد وظيفة المستشعر

[identifyASensorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (ar):** تعرّف إلى المستشعرات التي تقيس الضوء والمسافة والحرارة أو غيرها من الظروف.

##### تحديد وظيفة المشغّل

[identifyAnActuatorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (ar):** اشرح كيف تنفّذ المحركات والأضواء والمشغلات الأخرى الأوامر.

##### تمثيل العلاقة بين المستشعر والفعل

[modelTheSensorToActionRelationship.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (ar):** اربط بين قياس المستشعر وقاعدة اتخاذ القرار واستجابة المشغّل.

### معمارية البرمجيات

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (ar):** استكشف كيف تنظم الكائنات والمسؤوليات والتبعيات برمجيات موثوقة.

#### مبادئ التصميم

Skills: 8

[designPrinciples.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (ar):** تعلّم المبادئ التي تجعل البرمجيات مفهومة وقابلة للتكيف.

##### تأجيل الميزات غير الضرورية (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (ar):** تجنب تنفيذ ميزات لا تستند إلا إلى توقعات مستقبلية متخيلة.

##### تصميم التبعيات على العقود (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (ar):** افصل منطق العمل عن الخدمات الملموسة بالاعتماد على العقود.

##### توسيع السلوك دون تعديل النواة (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (ar):** صمّم نقاط توسعة لسلوك جديد دون إعادة كتابة المنطق الأساسي المستقر.

##### تحديد التكرار غير الضروري (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (ar):** اعثر على القواعد المكررة التي قد تسبب تعديلات غير متسقة لاحقًا.

##### عزل مسؤولية واحدة (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (ar):** نظّم الوحدة حول سبب متماسك واحد يدعو إلى تغييرها.

##### تقليل التعقيد غير الضروري (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (ar):** بسّط البرمجيات بإزالة آليات لا تبررها المتطلبات.

##### فصل الواجهات الصغيرة (ISP)

[separateNarrowInterfacesISP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (ar):** اجعل الواجهات محدودة بحيث يحتاج المستهلكون إلى العمليات التي يستخدمونها فقط.

##### التحقق من قابلية الاستبدال (LSP)

[verifySubstitutabilityLSP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (ar):** تحقق مما إذا كان التنفيذ يفي بالتزامات العقد المشترك.

#### نموذج الكائنات

Skills: 13

[objectModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (ar):** اكتشف كيف تجمع كائنات البرمجيات بين حالتها وسلوكها.

##### تطبيق تجريد الكائنات

[applyObjectAbstraction.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (ar):** اختر العمليات الأساسية التي ينبغي أن يكشفها المكوّن لمستخدميه.

##### التمييز بين الصنف والكائن

[distinguishAClassFromAnObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (ar):** ميّز مخطط الصنف من الكائنات التي لها قيمها الحالية الخاصة.

##### التمييز بين شيء حقيقي ونموذجه المجرد

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (ar):** افهم أن النموذج البرمجي يمثل خصائص منتقاة فقط من الشيء.

##### شرح دالة الكائن

[explainAnObjectMethod.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (ar):** اشرح كيف يمكن لاستدعاء دالة الكائن قراءة حالته أو تغييرها.

##### تفسير خاصية الكائن

[explainAnObjectProperty.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (ar):** ميّز خاصية الكائن المخزنة من العمليات التي يمكنه تنفيذها.

##### تفسير التغليف

[explainEncapsulation.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (ar):** افهم كيف تحمي الكائنات حالتها الداخلية من خلال أساليب مضبوطة.

##### تفسير الوراثة

[explainInheritance.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (ar):** فسّر كيف يرث صنف متخصص سلوكًا من صنف أعم.

##### تفسير تعدد الأشكال

[explainPolymorphism.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (ar):** اكتشف كيف تنفذ كائنات مختلفة العملية نفسها بطرق مختلفة.

##### تفسير مفهوم الصنف

[explainTheConceptOfAClass.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (ar):** افهم الصنف بوصفه تعريفًا تُنشأ منه كائنات منفردة.

##### تفسير بنية كائن برمجي

[explainTheStructureOfASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (ar):** حدّد الهوية والخصائص والأساليب لكائن برمجي موجود.

##### تحديد حالة الكائن وسلوكه

[identifyAnObjectsStateAndBehavior.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (ar):** صف خصائص الكائن والأعمال التي يمكنه تنفيذها.

##### نمذجة كيان المجال ككائن برمجي

[modelADomainEntityAsASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (ar):** صمّم كائنًا برمجيًا مفيدًا باختيار خصائص وعمليات ذات صلة.

##### نمذجة تركيب الكائنات

[modelObjectComposition.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (ar):** كوّن كائنات برمجية أكبر من أجزاء أصغر لها مسؤوليات متميزة.

