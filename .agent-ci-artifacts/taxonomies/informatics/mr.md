<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (mr)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### अल्गोरिदम

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../content/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (mr):** समस्या सोडवण्याच्या पुनरावृत्तीयोग्य पद्धती तयार करणे, वापरणे आणि तुलना करणे शिक.

#### विश्लेषण

Skills: 3

[analysis.data.ts](../../../content/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (mr):** इनपुटनुसार अल्गोरिदमची वेळ आणि स्मृतीची गरज कशी बदलते ते शिक.

##### रेषीय आणि लघुगणकीय वाढीतील फरक ओळखणे

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (mr):** इनपुटच्या आकाराच्या प्रमाणात वाढ आणि वारंवार निम्मे केल्याने होणारी वाढ तुलना कर.

##### अल्गोरिदमच्या सर्वात वाईट परिस्थितीचा अंदाज

[estimateAnAlgorithmsWorstCase.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (mr):** सर्वात वाईट स्थितीत अल्गोरिदमला जास्तीत जास्त किती तपासण्या लागतील ते मोज.

##### वेळ आणि स्मृतीतील तडजोड समजावणे

[explainTimeMemoryTradeOffs.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (mr):** जलद अल्गोरिदमला अधिक तात्पुरती स्मृती का लागू शकते ते समजून घे.

#### संग्रहांवर प्रक्रिया

Skills: 4

[collectionProcessing.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (mr):** डेटा तपासताना मोजणे, बेरीज करणे आणि कमाल-किमान मूल्ये शोधणे शिक.

##### घटक मोजणी लागू करणे

[applyElementCounting.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (mr):** दिलेली अट पूर्ण करणारे संग्रहातील सर्व घटक मोज.

##### कमाल मूल्य शोधणे

[applyMaximumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (mr):** संग्रह पाहताना आतापर्यंतचे सर्वात मोठे मूल्य लक्षात ठेव.

##### किमान मूल्य शोधणे

[applyMinimumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (mr):** संग्रह पाहताना आतापर्यंतचे सर्वात लहान मूल्य लक्षात ठेव.

##### बेरीज साठवत जाणे

[applySumAccumulation.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (mr):** संग्रहातील मूल्ये एकेक करून चालू बेरजेत जोड.

#### रचना

Skills: 6

[construction.data.ts](../../../content/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (mr):** अल्गोरिदमची कृती, अटी आणि थांबण्याचे नियम ठरवायला शिक.

##### आवश्यकतांनुसार अल्गोरिदमची तुलना करणे

[compareAlgorithmsAgainstRequirements.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (mr):** अल्गोरिदमच्या अटी आणि मर्यादांनुसार पर्यायांची तुलना कर.

##### क्रमिक अल्गोरिदम तयार करणे

[constructASequentialAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (mr):** योग्य क्रमाने होणाऱ्या मर्यादित पायऱ्यांची मालिका सांग.

##### अल्गोरिदमचे उद्दिष्ट ठरवणे

[defineAnAlgorithmsGoal.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (mr):** अल्गोरिदमने काय साध्य करायचे आणि कोणते इनपुट स्वीकारायचे ते स्पष्ट कर.

##### अटींवर आधारित फाटे तयार करणे

[designConditionalBranching.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (mr):** स्पष्ट तपासता येणाऱ्या अटींनुसार अल्गोरिदमचे वेगवेगळे मार्ग आख.

##### पुनरावृत्तीची रचना करणे

[designRepetition.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (mr):** योग्य बदल आणि थांबण्याची अट असलेली पुनरावृत्तीची प्रक्रिया तयार कर.

##### पुनरावर्ती अल्गोरिदम अंमलात आणणे

[implementARecursiveAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (mr):** लहान उपसमस्या आणि थांबवणारी मूलभूत स्थिती असलेला पुनरावर्ती अल्गोरिदम तयार कर.

#### शोध

Skills: 6

[search.data.ts](../../../content/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (mr):** वेगवेगळ्या शोधपद्धती संग्रहात घटक कसा शोधतात ते जाणून घे.

##### द्विमान शोध लागू करणे

[applyBinarySearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (mr):** क्रमबद्ध डेटातील अर्धा भाग वारंवार वगळत मूल्य शोध.

##### द्विमान शोधवृक्षात शोध घेणे

[applyBinaryTreeSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (mr):** द्विमान शोधवृक्षाच्या क्रमबद्ध फांद्यांमधून किल्ली शोध.

##### रेषीय शोध लागू करणे

[applyLinearSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (mr):** घटक एकेक करून तपासून लक्ष्य शोध.

##### तपासण्यांच्या संख्येनुसार शोधपद्धतींची तुलना

[compareSearchMethodsByCheckCount.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (mr):** रेषीय आणि द्विमान शोधात किती तपासण्या लागतात ते तुलना कर.

##### द्विमान शोधाच्या पूर्वअटी ओळखणे

[identifyBinarySearchPrerequisites.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (mr):** डेटा द्विमान शोधासाठी आवश्यक क्रमात आहे का ते तपास.

##### शोधातील वाढीचा अंदाज लावणे

[predictSearchScaling.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (mr):** डेटा दुप्पट झाल्यावर द्विमान शोधात साधारण एकच तपासणी जास्त का लागते ते समजून घे.

#### क्रमवारी लावणे

Skills: 4

[sorting.data.ts](../../../content/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (mr):** क्रमवारी पद्धती मूल्ये निवडलेल्या क्रमाने कशी लावतात ते शिक.

##### बबल सॉर्ट लागू करणे

[applyBubbleSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (mr):** चुकीच्या क्रमातील शेजारी मूल्यांची अदलाबदल करून क्रम लाव.

##### इन्सर्शन सॉर्ट लागू करणे

[applyInsertionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (mr):** प्रत्येक नवीन घटक आधीच क्रमबद्ध भागात योग्य जागी घाल.

##### सिलेक्शन सॉर्ट लागू करणे

[applySelectionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (mr):** उरलेल्या घटकांतील सर्वात लहान घटक वारंवार निवडून क्रम लाव.

##### क्रमवारीचा निकष समजावणे

[explainASortingCriterion.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (mr):** संग्रहाची क्रमवारी ठरवण्यासाठी मूल्य किंवा गुणधर्म निवड.

### कृत्रिम बुद्धिमत्ता

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../content/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (mr):** कृत्रिम बुद्धिमत्ता प्रणाली कशा शिकतात, अंदाज बांधतात, आशय निर्माण करतात आणि कधी चुकतात ते शोधा.

#### कृत्रिम बुद्धिमत्तेची मूलतत्त्वे

Skills: 6

[aIFundamentals.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (mr):** प्रोग्राम केलेले नियम, प्रशिक्षित मॉडेल आणि एआयची कार्ये यांतील फरक शोधा.

##### एआय कार्यांचे वर्गीकरण करणे

[classifyAITasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (mr):** एआयचे कार्य वर्गीकरण, अंदाज की आशयनिर्मिती करते ते ओळखा.

##### नियम आणि प्रशिक्षित मॉडेल वेगळे ओळखणे

[distinguishRulesFromTrainedModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (mr):** स्पष्टपणे प्रोग्राम केलेले निर्णय नियम आणि डेटावर प्रशिक्षित प्रणाली यांत फरक ओळखा.

##### निर्मितिक्षम एआय स्पष्ट करणे

[explainGenerativeAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (mr):** निर्मितिक्षम मॉडेल मजकूर, चित्रे किंवा इतर आशय कसा तयार करतात ते समजून घ्या.

##### उदाहरणांवरून शिकणे स्पष्ट करणे

[explainLearningFromExamples.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (mr):** उदाहरणे मॉडेलला नवीन इनपुटवर चांगली कामगिरी करण्यास कशी मदत करतात ते स्पष्ट करा.

##### भविष्यवाणी करणारे एआय स्पष्ट करणे

[explainPredictiveAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (mr):** अंदाज प्रणाली मूल्ये, वर्ग किंवा घटना घडण्याची शक्यता कशी ठरवतात ते शोधा.

##### एआयची संभाव्य चूक ओळखणे

[identifyAPotentialAIError.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (mr):** एआयचे उत्तर स्वतंत्रपणे पडताळण्याची गरज दाखवणारी चेतावणीची चिन्हे ओळखा.

#### अनुकरण आणि समज

Skills: 2

[imitationAndUnderstanding.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (mr):** विश्वासार्ह अनुकरण आणि खरे आकलन यांतील फरक तपासा.

##### सर्लच्या चिनी खोलीचे स्पष्टीकरण

[explainSearlesChineseRoom.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (mr):** चिनी खोलीचा विचारप्रयोग आणि त्यातून निर्माण होणारा वाद अभ्यासा.

##### ट्युरिंग चाचणी स्पष्ट करणे

[explainTheTuringTest.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (mr):** ट्युरिंग चाचणी काय तपासते आणि काय सिद्ध करू शकत नाही ते समजून घ्या.

#### भाषा मॉडेलची टोकने आणि संदर्भ

Skills: 6

[languageModelTokensAndContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (mr):** भाषा मॉडेल मजकूर टोकनमध्ये कसा विभागतात आणि संदर्भ कसा वापरतात ते जाणून घ्या.

##### नमुना निवड आणि सर्वाधिक संभाव्य टोकनची निवड वेगळी ओळखणे

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (mr):** सर्वाधिक संभाव्य टोकन निवडणे आणि इतर शक्य पुढील पर्यायांतून नमुना घेणे यांची तुलना करा.

##### टोकन, अक्षरे आणि शब्द यांत फरक ओळखणे

[distinguishTokensCharactersAndWords.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (mr):** अक्षरे, शब्द आणि टोकन या वेगळ्या एककांचा फरक ओळखा.

##### भाषा मॉडेलची संदर्भ खिडकी स्पष्ट करणे

[explainALanguageModelsContextWindow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (mr):** भाषा मॉडेल मर्यादित संदर्भच का वापरू शकते ते समजून घ्या.

##### संदर्भ खिडकीची मर्यादा ओलांडणे स्पष्ट करणे

[explainContextWindowOverflow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (mr):** विनंतीने मॉडेलची संदर्भमर्यादा ओलांडल्यावर काय घडू शकते ते शोधा.

##### पुढील टोकनची निवड स्पष्ट करणे

[explainNextTokenSelection.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (mr):** भाषा मॉडेल संदर्भावरून संभाव्य पुढील टोकन कसे निवडतात ते स्पष्ट करा.

##### टोकन स्पष्ट करणे

[explainTokens.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (mr):** टोकन म्हणजे मॉडेलनुसार ठरणारे मजकुराचे प्रतिनिधित्व करणारे एकक हे समजून घ्या.

#### मॉडेल रचना आणि संसाधने

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (mr):** वेगवेगळ्या एआय मॉडेल रचना कार्यक्षमता आणि संसाधनांच्या गरजेवर कसा परिणाम करतात ते शोधा.

##### कामासाठी मॉडेल निवडणे

[chooseAModelForATask.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (mr):** कामाची गुणवत्ता, वेग, खर्च, गोपनीयता आणि उपलब्ध मेमरी पाहून मॉडेल निवडा.

##### घन आणि तज्ज्ञांच्या मिश्रणाचे मॉडेल यांची तुलना करणे

[compareDenseAndMoEModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (mr):** अनेक पॅरामीटर सक्रिय करणाऱ्या मॉडेलची निवडक तज्ज्ञ घटक वापरणाऱ्या मॉडेलशी तुलना करा.

##### मॉडेलच्या मेमरी गरजांची तुलना करणे

[compareModelMemoryRequirements.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (mr):** मॉडेलच्या फाइल साठवणीपुरती नव्हे तर ते चालवण्यासाठी लागणारी मेमरी मोजा.

##### प्रतिसाद विलंबाची तुलना करणे

[compareResponseLatency.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (mr):** एआयचे उत्तर सुरू होण्याचा विलंब आणि पुढील निर्मितीचा वेग यांची स्वतंत्र तुलना करा.

##### परिमाणीकरण स्पष्ट करणे

[explainQuantization.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (mr):** संख्यात्मक अचूकता कमी केल्याने मेमरी वाचते पण गुणवत्ता बदलू शकते हे समजून घ्या.

#### एआयसाठी सूचना लिहिणे

Skills: 7

[prompting.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (mr):** एआय प्रणालींना अधिक स्पष्ट सूचना, संदर्भ आणि निर्बंध देणे शिका.

##### गुंतागुंतीचा प्रॉम्प्ट उपकार्यांत विभागणे

[breakAComplexPromptIntoSubtasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (mr):** गुंतागुंतीची विनंती पडताळता येण्याजोग्या निकालांच्या लहान टप्प्यांत विभागा.

##### प्रॉम्प्टमध्ये संदर्भ देणे

[providePromptContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (mr):** एआयला विनंती समजण्यासाठी उपयुक्त पार्श्वभूमी माहिती द्या.

##### निकालांवरून प्रॉम्प्ट सुधारणे

[refineAPromptBasedOnResults.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (mr):** मागील उत्तरातील उणिवा तपासून एआयला केलेली विनंती सुधारा.

##### प्रॉम्प्टचे उद्दिष्ट स्पष्ट करणे

[specifyAPromptObjective.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (mr):** एआय सहाय्यकाने नेमके कोणते काम करावे हे सांगा.

##### प्रॉम्प्टमध्ये भूमिका ठरवणे

[specifyARoleInAPrompt.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (mr):** उपयुक्त दृष्टिकोन किंवा शैली ठरवा, पण तिला खरी तज्ज्ञता समजू नका.

##### उत्तराचे स्वरूप ठरवणे

[specifyAnOutputFormat.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (mr):** तक्ता किंवा निश्चित फील्ड यांसारखी स्पष्ट उत्तररचना मागा.

##### प्रॉम्प्टसाठी मर्यादा ठरवणे

[specifyPromptConstraints.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (mr):** लांबी, स्रोत आणि बनवून सांगू नये अशी माहिती यांबद्दल मर्यादा ठरवा.

#### एआयची विश्वासार्हता आणि जबाबदार वापर

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (mr):** एआयचे परिणाम तपासणे आणि लोकांवर होणारे परिणाम विचारात घेणे शिका.

##### एआय-सहाय्यित निर्णयांत मानवी जबाबदारी स्पष्ट करणे

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (mr):** एआयच्या मदतीने घेतलेल्या निर्णयांनाही माणसेच जबाबदार का असतात ते समजून घ्या.

##### प्रॉम्प्टमधील वैयक्तिक माहिती जपणे

[protectPersonalDataInPrompts.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (mr):** एआयला विनंती पाठवण्यापूर्वी अनावश्यक वैयक्तिक माहिती काढा.

##### एआयमधील पक्षपाताचे धोके ओळखणे

[recognizeAIBiasRisks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (mr):** एआय प्रणाली गटांशी किंवा व्यक्तींशी अन्यायकारक वागू शकतील अशा परिस्थिती ओळखा.

##### एआयच्या उत्तरातील तथ्ये पडताळणे

[verifyFactsInAnAIResponse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (mr):** एआयच्या उत्तरातील तथ्यात्मक दावे विश्वसनीय स्वतंत्र स्रोतांनी तपासा.

#### एआयशी सुरक्षित संवाद

Skills: 4

[safeInteractionWithAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (mr):** एआयचा सल्ला दिशाभूल करणारा किंवा अयोग्य अवलंबित्व वाढवणारा ठरू शकतो असे संवाद ओळखा.

##### एआयवर अतिअवलंबित्वाचे धोके स्पष्ट करणे

[explainRisksOfOverrelianceOnAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (mr):** एआय स्वतंत्र विचार किंवा मानवी मदतीची जागा का घेऊ नये ते समजून घ्या.

##### एआय इनपुटमधील अविश्वसनीय सूचना ओळखणे

[identifyUntrustedInstructionsInAIInput.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (mr):** बाहेरील सामग्रीत लपलेल्या आणि सहाय्यकाला नियंत्रित न करू द्याव्या अशा सूचना ओळखा.

##### एआय वापरताना गुपिते जपणे

[protectSecretsWhenUsingAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (mr):** एआय वापरताना संकेतशब्द, प्रवेश किल्ल्या आणि गोपनीय माहिती जपा.

##### एआयची खुशामत ओळखणे

[recognizeAISycophancy.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (mr):** पुराव्याविना एआय सहमती दाखवते किंवा स्तुती करते ते ओळखा.

### संगणकीय विचार

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../content/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (mr):** गुंतागुंतीच्या समस्या स्पष्ट पायऱ्या, नमुने आणि नियमांत कशा विभागायच्या ते शिका.

#### विभाजन आणि अमूर्तीकरण

Skills: 4

[decompositionAndAbstraction.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (mr):** समस्येचे आवश्यक भाग व त्यांचे संबंध ओळखून ती सोपी करायला शिका.

##### अमूर्त प्रणाली प्रतिरूप तयार करणे

[buildAnAbstractSystemModel.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (mr):** गुंतागुंतीच्या परिस्थितीचे किंवा प्रणालीचे सोपे प्रतिरूप तयार करा.

##### समस्येचे भाग करणे

[decomposeAProblem.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (mr):** मोठी समस्या स्वतंत्रपणे सोडवता येणाऱ्या लहान कामांत विभागा.

##### पुन्हा वापरली जाणारी पद्धत सामान्य करणे

[generalizeARepeatedMethod.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (mr):** अनेक विशिष्ट समस्यांना लागू पडणारी पुन्हा वापरता येणारी सामायिक पद्धत शोधा.

##### वस्तूचे आवश्यक गुणधर्म ओळखणे

[identifyEssentialObjectProperties.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (mr):** कामासाठी महत्त्वाचे तपशील निवडा आणि असंबंधित तपशील बाजूला ठेवा.

#### तर्क आणि नमुने

Skills: 8

[logicAndPatterns.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (mr):** नियम, नमुने आणि तार्किक अटी समस्या सोडवण्यात कशा मदत करतात ते जाणून घ्या.

##### तार्किक AND लागू करणे

[applyLogicalAND.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (mr):** दोन्ही अटी पूर्ण झाल्या आहेत का हे तपासण्यासाठी AND वापरा.

##### तार्किक NOT लागू करणे

[applyLogicalNOT.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (mr):** एखाद्या अटीचे सत्य मूल्य उलट करण्यासाठी NOT वापरा.

##### तार्किक OR लागू करणे

[applyLogicalOR.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (mr):** दोन अटींपैकी किमान एक पूर्ण झाली आहे का हे तपासण्यासाठी OR वापरा.

##### परस्परविरोधी नियम ओळखणे

[detectContradictoryRules.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (mr):** दोन अटी एकाच वेळी सत्य असू शकत नाहीत अशी परिस्थिती ओळखा.

##### साध्या अटीचे मूल्यमापन करणे

[evaluateASimpleCondition.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (mr):** एखादी अट खरी, खोटी किंवा अजून ठरवता येत नाही का ते ठरवा.

##### संयुक्त तार्किक व्यंजकांचे मूल्यमापन करणे

[evaluateCompoundLogicalExpressions.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (mr):** अनेक ऑपरेटर असलेल्या तार्किक व्यंजकांचे योग्य क्रमाने मूल्यमापन करा.

##### नियमानुसार परिणाम भाकीत करणे

[predictAnOutcomeFromARule.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (mr):** नियम आणि सुरुवातीची स्थिती माहीत असताना पुढे काय घडेल ते ठरवा.

##### नमुना ओळखणे

[recognizeAPattern.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (mr):** क्रमांतील नमुने ओळखा आणि सुचवलेला नियम लागू होतो का ते तपासा.

### डेटा संरचना

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../content/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (mr):** संग्रह, किल्ल्या, वृक्ष आणि जाळी वेगवेगळ्या क्रियांसाठी डेटा कसा मांडतात ते जाणून घे.

#### शब्दकोश

Skills: 3

[dictionaries.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (mr):** शब्दकोश विशिष्ट किल्ल्या साठवलेल्या मूल्यांशी कशा जोडतात ते जाणून घे.

##### शब्दकोशाची रचना समजावून सांगणे

[explainDictionaryStructure.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (mr):** शब्दकोश स्थानाऐवजी किल्ली वापरून माहिती कशी मिळवतो ते समजून घे.

##### किल्ली वापरून शब्दकोशातील मूल्य मिळवणे

[retrieveADictionaryValueByKey.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (mr):** किल्लीने शब्दकोशातील मूल्य शोध आणि किल्ली नसल्यास ती परिस्थिती हाताळ.

##### शब्दकोशातील मूल्य अद्ययावत करणे

[updateADictionaryValue.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (mr):** शब्दकोशात आधीपासून असलेल्या किल्लीखाली साठवलेले मूल्य बदल.

#### आलेख

Skills: 6

[graphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (mr):** आलेख ठिकाणे, वस्तू आणि त्यांच्यातील जोडण्या कशा दाखवतात ते जाणून घे.

##### दिशित आणि अदिशित आलेखांतील फरक ओळखणे

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (mr):** जोडण्या एकदिशी आहेत की द्विदिशी, ते ओळख.

##### वृक्ष आणि चक्रे असलेले आलेख यांतील फरक ओळखणे

[distinguishTreesFromGraphsWithCycles.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (mr):** आलेखात चक्रे असू शकतात, पण वृक्षात का नसतात ते समजून घे.

##### भारित आणि अभारित आलेखांतील फरक ओळखणे

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (mr):** आलेखातील जोडण्यांवर अंतर किंवा खर्च यांसारख्या संख्या केव्हा दिलेल्या असतात ते ओळख.

##### आलेखाची रचना समजावून सांगणे

[explainGraphStructure.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (mr):** आलेखातील शिखरे आणि त्यांना जोडणाऱ्या कडा ओळख.

##### आलेखात मार्ग शोधणे

[findAPathInAGraph.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (mr):** जोडण्यांची दिशा पाळून शिखरांदरम्यान योग्य मार्गाने जा.

##### शेजारील शिखरे ओळखणे

[identifyAdjacentVertices.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (mr):** दुसऱ्या शिखराशी थेट जोडलेली शिखरे ओळख.

#### रांग

Skills: 3

[queue.data.ts](../../../content/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (mr):** रांग घटकांवर ते आलेल्या क्रमाने कशी प्रक्रिया करते ते जाणून घे.

##### रांगेतून घटक काढणे

[dequeueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (mr):** इतर घटकांचा क्रम न बदलता रांगेच्या सुरुवातीचा घटक काढ.

##### रांगेत घटक जोडणे

[enqueueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (mr):** रांगेच्या शेवटी नवीन घटक जोड.

##### FIFO तत्त्व समजावून सांगणे

[explainFIFO.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (mr):** रांगेत सर्वांत आधी आलेला घटक सर्वांत आधी का बाहेर पडतो ते समजावून सांग.

#### अनुक्रम

Skills: 7

[sequences.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (mr):** क्रमबद्ध संग्रहातील घटक मिळवणे, जोडणे आणि काढणे शिक.

##### अनुक्रमातील घटक अनुक्रमांकाने मिळवणे

[accessASequenceElementByIndex.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (mr):** वैध स्थानांच्या मर्यादेत राहून अनुक्रमांकाने घटक मिळव.

##### अ‍ॅरे आणि जोडलेल्या याद्यांतील फरक ओळखणे

[distinguishArraysFromLinkedLists.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (mr):** अनुक्रमांक असलेल्या अ‍ॅरेची जोडलेल्या नोड्सच्या साखळीशी तुलना कर.

##### अ‍ॅरेची रचना समजावणे

[explainArrayStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (mr):** अ‍ॅरे अनुक्रमांकांनी दर्शवलेल्या स्थानांवर घटक कसे साठवतात ते समजून घे.

##### यादीची रचना समजावणे

[explainListStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (mr):** याद्या वेगवेगळ्या प्रकारे मांडता येणारे क्रमबद्ध संग्रह आहेत हे ओळख.

##### अनुक्रमात घटक घालणे

[insertAnElementIntoASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (mr):** क्रमबद्ध अनुक्रमात योग्य जागी घटक घाल.

##### अनुक्रमातून घटक काढणे

[removeAnElementFromASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (mr):** उरलेल्या घटकांचा क्रम न बदलता एक घटक काढ.

##### अनुक्रमातील घटक क्रमाने पाहणे

[traverseASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (mr):** अनुक्रमातील प्रत्येक घटक क्रमाने पाहा.

#### संच

Skills: 4

[sets.data.ts](../../../content/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (mr):** वेगवेगळ्या मूल्यांचे संच आणि सदस्यत्व तपासण्याच्या क्रिया शिक.

##### संचांचा छेद काढणे

[computeSetIntersection.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (mr):** दोन्ही संचांमध्ये असलेले घटकच शोध.

##### संचांचा संघ काढणे

[computeSetUnion.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (mr):** दोन्ही संचांतील वेगवेगळे घटक पुनरावृत्ती न करता एकत्र कर.

##### संचाची रचना समजावणे

[explainSetStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (mr):** संच प्रत्येक वेगळा घटक एकदाच का ठेवतो ते समजून घे.

##### संचातील सदस्यत्व तपासणे

[testSetMembership.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (mr):** एखादे विशिष्ट मूल्य संचात आहे का ते तपास.

#### स्टॅक

Skills: 3

[stack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (mr):** स्टॅकमध्ये शेवटी जोडलेला घटक आधी कसा मिळतो ते जाणून घे.

##### LIFO तत्त्व समजावणे

[explainLIFO.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (mr):** स्टॅकमध्ये शेवटी जोडलेला घटक आधी का बाहेर पडतो ते समजून घे.

##### स्टॅकमधून घटक काढणे

[popAnElementFromAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (mr):** स्टॅक रिकामा आहे का तपासून शेवटचा जोडलेला घटक काढ.

##### स्टॅकवर घटक ठेवणे

[pushAnElementOntoAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (mr):** स्टॅकच्या वर नवीन घटक ठेव.

#### डेटा संरचनेची निवड

Skills: 4

[structureSelection.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (mr):** प्रोग्रामला डेटा जसा वापरायचा आहे त्यानुसार संरचना निवड.

##### आवश्यक क्रियांसाठी संरचना निवडणे

[chooseAStructureForRequiredOperations.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (mr):** अनुक्रमांक, सदस्यत्व, रांग किंवा संबंधांसाठी योग्य संग्रह निवड.

##### संग्रहात घटक घालण्याच्या खर्चांची तुलना

[compareCollectionInsertionCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (mr):** घटक घालताना अ‍ॅरेतील घटक हलवावे किंवा दुवे बदलावे का लागतात ते समजून घे.

##### घटक मिळवण्याच्या खर्चांची तुलना

[compareElementAccessCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (mr):** अ‍ॅरे आणि जोडलेल्या याद्या एखाद्या घटकापर्यंत किती पटकन पोहोचतात ते तुलना कर.

##### डेटा संरचना आणि अल्गोरिदममधील फरक ओळखणे

[distinguishDataStructuresFromAlgorithms.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (mr):** संरचनेत डेटा मांडणे आणि अल्गोरिदमने प्रक्रिया करणे यांतील फरक समजून घे.

#### वृक्ष

Skills: 4

[trees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (mr):** वृक्ष पालक-मूल संबंधांद्वारे माहिती कशी मांडतात ते शिक.

##### पर्णनोड आणि अंतर्गत नोडमधील फरक ओळखणे

[distinguishLeafAndInternalTreeNodes.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (mr):** मूल नोड असलेले अंतर्गत नोड आणि मूल नोड नसलेले पर्णनोड वेगळे ओळख.

##### द्विमान शोधवृक्ष समजावणे

[explainBinarySearchTrees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (mr):** द्विमान शोधवृक्षात शोध घेता येण्यासाठी किल्ल्या कशा क्रमात असतात ते समजून घे.

##### वृक्षाची रचना समजावणे

[explainTreeStructure.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (mr):** वृक्षातील मूळ, फांद्या, नोड आणि जोडण्या ओळख.

##### वृक्षात मार्ग शोधणे

[findAPathInATree.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (mr):** वृक्षातील दोन नोडमधील खऱ्या जोडण्यांनी जाणारा मार्ग शोध.

### डिझाइन नमुने

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../content/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (mr):** सॉफ्टवेअर ऑब्जेक्ट तयार करणे, जोडणे व समन्वयित करणे यांचे पुनर्वापरयोग्य मार्ग जाणून घ्या.

#### वर्तनात्मक नमुने

Skills: 11

[behavioral.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (mr):** ऑब्जेक्ट विनंत्या कशा समन्वयित करतात आणि वर्तन बदलतात ते जाणून घ्या.

##### जबाबदारीची साखळी

[chainOfResponsibility.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (mr):** विनंती हाताळली जाईपर्यंत ती एकामागून एक हाताळणाऱ्याकडे पाठवा.

##### कमांड

[command.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (mr):** क्रिया साठवता किंवा नियोजित करता येणाऱ्या ऑब्जेक्टमध्ये रूपांतरित करा.

##### इंटरप्रेटर

[interpreter.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (mr):** अभिव्यक्तींमधील नियम वापरून लहान भाषेचा अर्थ लावा.

##### इटरेटर

[iterator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (mr):** संग्रह कसा साठवला आहे ते न दाखवता त्यातील घटकांना भेट द्या.

##### मध्यस्थ

[mediator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (mr):** केंद्रीय मध्यस्थाद्वारे घटकांचे परस्परसंवाद समन्वयित करा.

##### मेमेंटो

[memento.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (mr):** ऑब्जेक्टची स्थिती साठवा जेणेकरून नंतर ती पुन्हा मिळवता येईल.

##### निरीक्षक

[observer.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (mr):** निरीक्षणातील ऑब्जेक्ट बदलल्यावर संबंधित सदस्यांना कळवा.

##### स्थिती

[state.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (mr):** ऑब्जेक्टच्या सध्याच्या स्थितीनुसार त्याची प्रतिक्रिया बदला.

##### धोरण

[strategy.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (mr):** एकच सामायिक इंटरफेस पाळणाऱ्या अल्गोरिदमांमध्ये अदलाबदल करा.

##### साचा पद्धत

[templateMethod.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (mr):** अल्गोरिदमचे मुख्य टप्पे कायम ठेवून निवडक टप्पे बदलू द्या.

##### भेट देणारा

[visitor.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (mr):** क्रिया आणि त्या ज्या ऑब्जेक्ट रचनांवर चालतात त्या वेगळ्या ठेवा.

#### निर्मिती नमुने

Skills: 5

[creational.data.ts](../../../content/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (mr):** क्लायंटला ठोस प्रकाराशी बांधून न ठेवता ऑब्जेक्ट बनवण्याचे नमुने शिका.

##### अॅब्स्ट्रॅक्ट फॅक्टरी

[abstractFactory.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (mr):** परस्पर जुळणारे संबंधित ऑब्जेक्ट परिवार तयार करणारी फॅक्टरी वापरा.

##### बिल्डर

[builder.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (mr):** बिल्डर वापरून गुंतागुंतीचा ऑब्जेक्ट टप्प्याटप्प्याने तयार करा.

##### फॅक्टरी मेथड

[factoryMethod.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (mr):** फॅक्टरी मेथड कोणता ठोस ऑब्जेक्ट बनवेल ते उपवर्गांना निवडू द्या.

##### प्रोटोटाइप

[prototype.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (mr):** आधीच मांडलेल्या उदाहरणाची प्रत बनवून नवीन ऑब्जेक्ट तयार करा.

##### सिंगलटन

[singleton.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (mr):** जागतिक स्थितीचे धोके लक्षात घेऊन एकच सामायिक इन्स्टन्स वापरणे नियंत्रित करा.

#### संरचनात्मक नमुने

Skills: 7

[structural.data.ts](../../../content/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (mr):** सॉफ्टवेअर घटक जोडणे, गुंडाळणे व सामायिक करण्याचे नमुने शिका.

##### अॅडॅप्टर

[adapter.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (mr):** असंगत इंटरफेसमधील रूपांतरण करून ते जोडा.

##### ब्रिज

[bridge.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (mr):** घटकाचे अमूर्तीकरण आणि तो वापरत असलेली अंमलबजावणी वेगळी ठेवा.

##### कंपोझिट

[composite.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (mr):** एकच इंटरफेस वापरून स्वतंत्र ऑब्जेक्ट व ऑब्जेक्ट गट हाताळा.

##### डेकोरेटर

[decorator.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (mr):** उपवर्ग वाढवण्याऐवजी ऑब्जेक्ट गुंडाळून नवे वर्तन जोडा.

##### फसाड

[facade.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (mr):** गुंतागुंतीच्या घटक समूहाला सोपे प्रवेशद्वार द्या.

##### फ्लायवेट

[flyweight.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (mr):** अनावश्यक मेमरी वापर कमी करण्यासाठी पुन्हा वापरता येणारा ऑब्जेक्ट डेटा सामायिक करा.

##### प्रॉक्सी

[proxy.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (mr):** समान इंटरफेस असलेल्या दुसऱ्या ऑब्जेक्टने मूळ ऑब्जेक्टचा प्रवेश नियंत्रित करा.

### डिजिटल सर्जनशीलता आणि खेळ

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (mr):** डिजिटल माध्यमे तयार करा, खेळता येतील असे नियम आखा आणि प्रक्रियात्मक निर्मितीचा शोध घ्या.

#### डिजिटल साहित्य

Skills: 3

[digitalMaterials.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (mr):** विशिष्ट उद्देशासाठी डिजिटल आशय तयार करणे, संपादित करणे आणि योग्य साधने निवडणे शिका.

##### डिजिटल सर्जनशील साधन निवडणे

[chooseADigitalCreativeTool.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (mr):** तुम्हाला जे तयार करायचे आहे त्यासाठी योग्य सर्जनशील सॉफ्टवेअर निवडा.

##### साधी डिजिटल कलाकृती तयार करणे

[createASimpleDigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (mr):** विशिष्ट प्रेक्षकांसाठी सुसंगत डिजिटल कार्ड, चित्र किंवा दुसरी कलाकृती तयार करा.

##### डिजिटल कलाकृती संपादित करणे

[editADigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (mr):** आधीच्या डिजिटल फाइलचा अपेक्षित अर्थ न बदलता ती सुधारा.

#### खेळ रचना

Skills: 3

[gameDesign.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (mr):** नियम आणि खेळाडूंच्या कृती खेळाचा अनुभव कसा घडवतात ते शोधा.

##### खेळाची यंत्रणा रचणे

[designAGameMechanic.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (mr):** खेळाडूची कृती, खेळाची बदलणारी स्थिती आणि अभिप्राय यांची सांगड घाला.

##### खेळाचा नियम मांडणे

[formulateAGameRule.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (mr):** खेळाडूंना काय परवानगी आहे हे समजेल असा स्पष्ट खेळाचा नियम लिहा.

##### साध्या खेळाचा समतोल तपासणे

[testTheBalanceOfASimpleGame.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (mr):** नियमांमुळे खेळ न्याय्य, आव्हानात्मक आणि पूर्ण करता येण्याजोगा होतो का ते तपासा.

#### प्रक्रियात्मक निर्मिती

Skills: 4

[proceduralGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (mr):** मोजक्या नियमांमधून अल्गोरिदम आशयाचे अनेक प्रकार कसे तयार करतात ते शोधा.

##### संसाधन साठवण आणि निर्मितीची तुलना करणे

[compareResourceStorageAndGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (mr):** प्रक्रियात्मक निर्मितीमुळे वाचणारी साठवण जागा आणि लागणारी गणना यांची तुलना करा.

##### निर्मिती साधनाचे मापदंड ठरवणे

[configureGeneratorParameters.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (mr):** निर्मितीचा परिणाम कसा दिसतो किंवा किती प्रमाणात मिळतो हे नियंत्रित करण्यासाठी सेटिंग्ज बदला.

##### प्रक्रियात्मक संसाधननिर्मिती स्पष्ट करणे

[explainProceduralResourceGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (mr):** प्रत्येक तयार प्रकार साठवण्याऐवजी जनरेटर संसाधने कशी तयार करतो ते स्पष्ट करा.

##### निर्मिती बीज वापरून परिणाम पुन्हा मिळवणे

[reproduceResultsUsingAGenerationSeed.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (mr):** निश्चित बीज आणि न बदललेले नियम तेच परिणाम पुन्हा कसे देतात ते समजून घ्या.

### डिजिटल उत्पादनाचा वापरकर्ता अनुभव

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (mr):** समजण्यास, वापरण्यास आणि सर्वांना सुलभ असणारे डिजिटल अनुभव तयार करा.

#### सुलभता

Skills: 2

[accessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (mr):** वेगवेगळ्या क्षमता आणि इनपुट पद्धती डिजिटल प्रवेशावर कसा परिणाम करतात ते शोधा.

##### वेगवेगळ्या क्षमता असलेल्या वापरकर्त्यांच्या गरजा ओळखणे

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (mr):** कीबोर्ड, मोठा मजकूर किंवा सहाय्यक तंत्रज्ञान वापरणाऱ्यांच्या गरजा ओळखा.

##### डिजिटल संवादाची सुलभता तपासणे

[testDigitalInteractionAccessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (mr):** माऊस किंवा आवाजाशिवाय इंटरफेस तपासा आणि अडथळे नोंदवा.

#### डिजिटल परस्परसंवाद डिझाइन

Skills: 4

[digitalInteractionDesign.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (mr):** डिजिटल इंटरफेसमध्ये सहज कृती आणि उपयुक्त अभिप्राय कसा आखावा ते शिका.

##### डिजिटल इंटरफेसचा अभिप्राय रचणे

[designDigitalInterfaceFeedback.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (mr):** बटणे, लोडिंगची स्थिती आणि त्रुटी स्पष्ट अभिप्राय देतील याची काळजी घ्या.

##### डिजिटल इंटरफेसमधील नेव्हिगेशन रचणे

[designDigitalInterfaceNavigation.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (mr):** लोकांना योग्य कृती सापडतील अशा प्रकारे पडदे आणि नेव्हिगेशन मांडा.

##### डिजिटल उत्पादन वापरकर्त्याचे उद्दिष्ट ओळखणे

[identifyADigitalProductUsersGoal.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (mr):** एखाद्या व्यक्तीला अॅप किंवा डिजिटल साधनातून काय साध्य करायचे आहे ते ओळखा.

##### डिजिटल संवादातील सामान्य चुका टाळणे

[preventCommonDigitalInteractionErrors.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (mr):** टाळता येणाऱ्या चुका रोखण्यासाठी लेबले, पडताळणी आणि पुष्टी वापरा.

#### अनुभव मूल्यमापन आणि नीतिमत्ता

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (mr):** वापरकर्ता चाचण्या आणि प्रामाणिक रचना डिजिटल उत्पादने कशी सुधारतात ते शोधा.

##### दिशाभूल करणारे इंटरफेस नमुने ओळखणे

[identifyManipulativeInterfacePatterns.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (mr):** खर्च लपवणाऱ्या, निवड लादणाऱ्या किंवा रद्द करणे कठीण करणाऱ्या इंटरफेस युक्त्या ओळखा.

##### डिजिटल इंटरफेसची वापरसुलभता तपासणे

[testDigitalInterfaceUsability.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (mr):** अतिरिक्त सूचना न देता एखादी व्यक्ती प्रत्यक्ष काम पूर्ण करू शकते का ते पाहा.

### डिजिटल सुरक्षितता आणि जबाबदारी

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (mr):** माहिती जपणे, इतरांचा आदर करणे आणि डिजिटल तंत्रज्ञानाचे परिणाम समजणे शिका.

#### खात्यांचे संरक्षण

Skills: 9

[accountProtection.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (mr):** खाती कशी सुरक्षित ठेवावीत आणि संशयास्पद संदेशांना कसा प्रतिसाद द्यावा ते शिका.

##### ईमेल पाठवणाऱ्याची सत्यता तपासणे

[assessAnEmailSendersAuthenticity.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (mr):** दिसणारे नाव किंवा फोटो यापलीकडे पाठवणाऱ्याची ओळख तपासा.

##### दुवा उघडण्याचा धोका तपासणे

[assessTheRiskOfFollowingALink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (mr):** संशयास्पद दुवा उघडल्यास काय होऊ शकते ते तपासा.

##### बहुघटक प्रमाणीकरण सेट करणे

[configureMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (mr):** प्रवेशासाठी आणखी एक घटक सुरू करा आणि खाते सुरक्षितपणे परत मिळवण्याची योजना करा.

##### मजबूत पासफ्रेज तयार करणे

[createAStrongPassphrase.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (mr):** प्रत्येक खात्यासाठी वेगळी, लांब आणि अंदाज लावणे कठीण अशी पासफ्रेज तयार करा.

##### बहुघटक प्रमाणीकरण स्पष्ट करणे

[explainMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (mr):** दुसरा स्वतंत्र प्रमाणीकरण घटक खात्याचे संरक्षण कसा करतो ते समजून घ्या.

##### सॉफ्टवेअर अद्यतनांचे महत्त्व स्पष्ट करणे

[explainWhySoftwareUpdatesMatter.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (mr):** अधिकृत अद्यतने सुरक्षेतील त्रुटी कशा दुरुस्त करतात ते शिका.

##### फिशिंग संदेश ओळखणे

[recognizeAPhishingMessage.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (mr):** संकेतशब्द किंवा कोड चोरण्यासाठी दुसऱ्याची ओळख दाखवणारे संदेश ओळखा.

##### संशयास्पद डिजिटल संपर्काला प्रतिसाद देणे

[respondToSuspiciousDigitalContact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (mr):** संशयास्पद संपर्कात सुरक्षितपणे वागा आणि विनंतीची स्वतंत्र मार्गाने खात्री करा.

##### वेबसाइटचे डोमेन तपासणे

[verifyAWebsitesDomain.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (mr):** वेबपत्त्यातील खरे डोमेन वाचा आणि फसवे साम्य असलेले पत्ते ओळखा.

#### डिजिटल संवादातील नीतिमत्ता

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (mr):** आदरपूर्वक संवाद साधणे आणि निर्मात्यांच्या परवानगीचा मान राखणे शिका.

##### डिजिटल साहित्याला श्रेय देणे

[attributeDigitalMaterials.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (mr):** वापरलेल्या डिजिटल साहित्याच्या मूळ निर्मात्याला योग्य श्रेय द्या.

##### समस्या सुरक्षितपणे कळवण्याचा मार्ग निवडणे

[chooseASafeWayToReportAProblem.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (mr):** ऑनलाइन समस्या कळवण्यासाठी विश्वासू व्यक्ती किंवा अधिकृत माध्यम निवडा.

##### डिजिटल आशयाचे परवाने वेगळे ओळखणे

[distinguishDigitalContentLicenses.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (mr):** कॉपीराइट निर्बंध, खुले परवाने आणि सार्वजनिक मालकीतील आशय यांतील फरक ओळखा.

##### योग्य ऑनलाइन वर्तन ओळखणे

[identifyAppropriateOnlineBehavior.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (mr):** डिजिटल संवादातील धमक्या, छळ आणि दादागिरी ओळखा.

#### गोपनीयता

Skills: 5

[privacy.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (mr):** ऑनलाइन माहिती शेअर केल्याने गोपनीयतेवर काय परिणाम होतो ते जाणून घ्या.

##### माहिती वाटण्याचा सुरक्षित मार्ग निवडणे

[chooseSafeDataSharingMethods.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (mr):** संवेदनशील माहिती कोणाला द्यावी आणि ती सुरक्षितपणे कशी द्यावी ते ठरवा.

##### खाजगी चॅट आणि सार्वजनिक दुवा वेगळा ओळखणे

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (mr):** शेअर केलेला चॅट किंवा दस्तऐवज कोण उघडू शकतो ते तपासा; दुवा खाजगीच असेल असे मानू नका.

##### माहितीतून पुन्हा ओळख पटवणे स्पष्ट करणे

[explainDataReIdentification.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (mr):** वेगळे गोळा केलेले तपशील जोडून व्यक्तीची ओळख पुन्हा कशी पटते ते स्पष्ट करा.

##### वैयक्तिक माहिती ओळखणे

[identifyPersonalData.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (mr):** इतर तपशिलांशी जोडल्यावरही व्यक्तीची ओळख पटवणारी माहिती ओळखा.

##### डिजिटल पाऊलखुणा ओळखणे

[recognizeADigitalFootprint.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (mr):** ऑनलाइन पोस्ट आणि कृती दीर्घकाळ टिकणाऱ्या नोंदी कशा ठेवतात ते समजून घ्या.

#### संगणनाचे सामाजिक आणि पर्यावरणीय परिणाम

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (mr):** संगणनाचा न्याय्यता, संसाधनवापर आणि पर्यावरणावर कसा परिणाम होतो ते शोधा.

##### वापरकर्त्यांच्या गटांवर अल्गोरिदमचा परिणाम तपासणे

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (mr):** विविध गटांना अल्गोरिदमचे निकाल अन्यायकारकरीत्या वेगळे मिळतात का ते तपासा.

##### संगणनाचा पर्यावरणीय परिणाम तपासणे

[assessComputingsEnvironmentalImpact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (mr):** संगणनामुळे होणारा ऊर्जावापर, साहित्यवापर आणि इलेक्ट्रॉनिक कचरा यांची तुलना करा.

### डिजिटल प्रणाली आणि जाळी

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (mr):** संगणकीय उपकरणे, डिजिटल माहिती आणि जाळी एकत्र कसे कार्य करतात ते जाणून घ्या.

#### डिजिटल उपकरणांचे घटक

Skills: 3

[digitalDeviceComponents.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (mr):** हार्डवेअरचे भाग आणि सॉफ्टवेअर वेगवेगळी संगणकीय कामे कशी करतात ते जाणून घ्या.

##### हार्डवेअर आणि सॉफ्टवेअरमधील फरक ओळखणे

[distinguishHardwareFromSoftware.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (mr):** संगणकाचे भौतिक भाग आणि त्यांना नियंत्रित करणारे सॉफ्टवेअर यांत फरक ओळखा.

##### प्रोसेसरचे कार्य स्पष्ट करणे

[explainAProcessorsFunction.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (mr):** प्रोसेसर फाइल्स कायमच्या साठवण्याऐवजी सूचना कशा अंमलात आणतो ते स्पष्ट करा.

##### डिजिटल उपकरणे ओळखणे

[identifyDigitalDevices.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (mr):** प्रोग्रामनुसार डिजिटल माहितीवर प्रक्रिया करणारी उपकरणे ओळखा.

#### स्मृती आणि साठवण

Skills: 4

[memoryAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (mr):** तात्पुरती मेमरी, फर्मवेअर मेमरी आणि फाइल साठवण यांची वेगवेगळी कार्ये जाणून घ्या.

##### RAM, ROM आणि साठवण यांतील फरक ओळखणे

[distinguishRAMROMAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (mr):** RAM, ROM व कायमस्वरूपी साठवण कोणती माहिती ठेवण्यासाठी असतात यांची तुलना करा.

##### कायमस्वरूपी साठवण स्पष्ट करणे

[explainPersistentStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (mr):** वीज बंद झाल्यानंतरही साठवण उपकरणांत फाइल्स का टिकतात ते समजून घ्या.

##### RAM स्पष्ट करणे

[explainRAM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (mr):** संगणक चालू असताना RAM कामासाठीची माहिती कशी साठवते ते जाणून घ्या.

##### ROM चा उद्देश स्पष्ट करणे

[explainThePurposeOfROM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (mr):** वीज नसतानाही माहिती टिकवणारी फर्मवेअर मेमरी उपकरणे सुरू होण्यास कशी मदत करते ते जाणून घ्या.

#### नेटवर्क प्रतिरूपे आणि प्रोटोकॉल

Skills: 11

[networkModelsAndProtocols.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (mr):** माहिती पाठवण्याचे नियम नेटवर्क प्रोटोकॉल कसे निश्चित करतात ते जाणून घ्या.

##### नेटवर्क प्रवेश पद्धतींची तुलना करणे

[compareNetworkAccessMethods.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (mr):** टक्कर ओळखणे, टक्कर टाळणे आणि टोकन फिरवणे यांची योग्य वापराच्या संदर्भात तुलना करा.

##### HTTP आणि HTTPS यांतील फरक ओळखणे

[distinguishHTTPFromHTTPS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (mr):** HTTPS कशाचे संरक्षण करते आणि त्यामुळे वेबसाइट विश्वासार्ह असल्याची हमी का मिळत नाही हे ओळखा.

##### OSI आणि TCP/IP यांतील फरक ओळखणे

[distinguishOSIFromTCPIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (mr):** OSI च्या संकल्पनात्मक स्तरांची इंटरनेटच्या TCP/IP प्रोटोकॉल संचाशी तुलना करा.

##### TCP आणि UDP यांतील फरक ओळखणे

[distinguishTCPFromUDP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (mr):** विश्वासार्ह TCP डेटाप्रवाहांची तशाच हमी नसलेल्या UDP संदेशांशी तुलना करा.

##### नेटवर्क प्रोटोकॉल स्पष्ट करणे

[explainANetworkProtocol.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (mr):** उपकरणांना संदेशांची देवाणघेवाण करण्यासाठी ठरलेल्या नियमांची गरज का असते ते स्पष्ट करा.

##### CSMA/CA स्पष्ट करणे

[explainCSMACA.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (mr):** वायरलेस उपकरणे व्यस्त चॅनेलवर प्रसारण कसे टाळण्याचा प्रयत्न करतात ते स्पष्ट करा.

##### CSMA/CD स्पष्ट करणे

[explainCSMACD.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (mr):** जुन्या सामायिक इथरनेट नेटवर्कमध्ये टक्कर शोधण्याची गरज का होती ते जाणून घ्या.

##### DNS स्पष्ट करणे

[explainDNS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (mr):** डोमेन नावांवरून नेटवर्क पत्ते शोधण्यात DNS कशी मदत करते ते स्पष्ट करा.

##### OSI स्तर स्पष्ट करणे

[explainTheOSILayers.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (mr):** नेटवर्कची कार्ये मांडण्यासाठी सात स्तरांचे OSI मॉडेल वापरा.

##### IP चा उद्देश स्पष्ट करणे

[explainThePurposeOfIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (mr):** IP नेटवर्कदरम्यान पॅकेटांना पत्ते देऊन ती पुढे कशी पाठवते ते समजून घ्या.

##### टोकन रिंग स्पष्ट करणे

[explainTokenRing.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (mr):** टोकन फिरवून कोणत्या उपकरणाला डेटा पाठवता येईल हे कसे नियंत्रित होते ते जाणून घ्या.

#### संगणक जाळी

Skills: 4

[networks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (mr):** जोडलेली उपकरणे संदेश कसे पाठवतात आणि संसाधने कशी सामायिक करतात ते जाणून घ्या.

##### इंटरनेट आणि वेबमधील फरक ओळखणे

[distinguishTheInternetFromTheWeb.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (mr):** इंटरनेटची जाळी पायाभूत रचना आणि वेबवरील संकेतस्थळे यांत फरक ओळखा.

##### जाळ्यात संदेश पोहोचणे स्पष्ट करणे

[explainNetworkMessageDelivery.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (mr):** संदेश जाळ्याच्या उपकरणांतून गंतव्यापर्यंत कसे पोहोचतात ते पाहा.

##### संगणक जाळ्याचा उद्देश स्पष्ट करणे

[explainThePurposeOfAComputerNetwork.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (mr):** माहितीची देवाणघेवाण करण्यासाठी जाळी वेगवेगळी उपकरणे का जोडते ते स्पष्ट करा.

##### बिनतारी संप्रेषण स्पष्ट करणे

[explainWirelessCommunication.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (mr):** थेट केबलऐवजी संकेत वापरून बिनतारी उपकरणे कशी संवाद साधतात ते जाणून घ्या.

#### संख्या पद्धती

Skills: 4

[numeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (mr):** वेगवेगळे पाया असलेल्या पद्धतींत अंक संख्या कशा दर्शवतात ते शिका.

##### द्विमान आणि दशमान यांत रूपांतरण करणे

[convertBetweenBinaryAndDecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (mr):** लहान संख्यांचे द्विमान व दशमान रूपांत रूपांतर करा.

##### द्विमान आणि षोडशमान यांतील फरक ओळखणे

[distinguishBinaryAndHexadecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (mr):** बिट्सचे गट षोडशमान पद्धतीत अधिक थोडक्यात का लिहिता येतात ते समजून घ्या.

##### संगणकाचे द्विमान तर्कशास्त्र स्पष्ट करणे

[explainComputerBinaryLogic.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (mr):** द्विमान शून्य व एक यांना ओळखता येणाऱ्या वेगळ्या इलेक्ट्रॉनिक संकेतस्थितींशी जोडा.

##### स्थानिक संख्या पद्धती स्पष्ट करणे

[explainPositionalNumeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (mr):** संख्येतील अंकाची जागा बदलल्यास त्याचे मूल्य का बदलते ते समजून घ्या.

#### ऑपरेटिंग सिस्टीम

Skills: 4

[operatingSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (mr):** ऑपरेटिंग सिस्टीम प्रोग्राम, फाइल्स आणि उपकरणे कशी सांभाळते ते जाणून घ्या.

##### ऑपरेटिंग सिस्टीमची कुटुंबे ओळखणे

[distinguishOperatingSystemFamilies.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (mr):** प्रचलित ऑपरेटिंग सिस्टीमची कुटुंबे आणि त्यांतील फरक ओळखा.

##### ऑपरेटिंग सिस्टममधील प्रक्रिया स्पष्ट करणे

[explainAnOSProcess.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (mr):** चालू असलेली प्रक्रिया आणि डिस्कवर साठवलेली प्रोग्राम फाइल यांत फरक ओळखा.

##### ऑपरेटिंग सिस्टीमचा उद्देश स्पष्ट करणे

[explainAnOperatingSystemsPurpose.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (mr):** ऑपरेटिंग सिस्टीम सॉफ्टवेअर आणि हार्डवेअर यांचा समन्वय कसा साधते ते समजून घ्या.

##### Linux मधील लिनस टॉर्वाल्ड्सची भूमिका स्पष्ट करणे

[explainLinusTorvaldsRoleInLinux.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (mr):** Linux कर्नलची सुरुवात कशी झाली आणि अनेक योगदानकर्ते ऑपरेटिंग सिस्टम का विकसित करतात ते जाणून घ्या.

#### निरूपण आणि साठवण

Skills: 4

[representationAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (mr):** उपकरणे माहितीचे निरूपण आणि साठवलेल्या फाइल्सची मांडणी कशी करतात ते शिका.

##### डिजिटल फाइल आकारांची तुलना करणे

[compareDigitalFileSizes.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (mr):** फाइल आकारांची तुलना करा आणि स्वरूप व संपीडनामुळे फरक का पडतो ते स्पष्ट करा.

##### डिजिटल स्वरूपांतील फरक ओळखणे

[distinguishDigitalFormats.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (mr):** साठवलेल्या बिट्सचा अर्थ कसा लावायचा हे फाइलचे स्वरूप ठरवते हे ओळखा.

##### द्विमान निरूपण स्पष्ट करणे

[explainBinaryRepresentation.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (mr):** शून्य आणि एक यांच्या क्रमांनी विविध प्रकारचा डेटा कसा सांकेतिक केला जातो ते समजून घ्या.

##### फाइल्स निर्देशिकांत मांडणे

[organizeFilesInDirectories.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (mr):** फाइल्स योग्य फोल्डरमध्ये लावा जेणेकरून त्यांचे मार्ग वापरून त्या सापडतील.

#### कामांची अंमलबजावणी

Skills: 3

[taskExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (mr):** आलटूनपालटून पुढे जाणारी कामे आणि खरोखर एकाच वेळी होणारी कामे यांतील फरक जाणून घ्या.

##### स्वतंत्र कार्ये निष्पादकांमध्ये वाटप करणे

[distributeIndependentTasksAcrossExecutors.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (mr):** कोणती कार्ये एकत्र चालू शकतात आणि कोणती इतर निकालांची वाट पाहतील याची योजना करा.

##### समवर्ती अंमलबजावणी स्पष्ट करणे

[explainConcurrentExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (mr):** अनेक कार्ये नेमकी त्याच क्षणी न चालताही कशी पुढे जाऊ शकतात हे समजून घ्या.

##### समांतर अंमलबजावणी स्पष्ट करणे

[explainParallelExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (mr):** अनेक प्रोसेसर खरोखर एकाच वेळी काम करत आहेत ते कधी हे ओळखा.

### Git आणि मुक्त स्रोत

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (mr):** विकसक बदलांचा मागोवा कसे ठेवतात, सहकार्य करतात आणि परवानगीनुसार सॉफ्टवेअर शेअर करतात ते शिक.

#### सहकार्याने डिजिटल उत्पादन विकास

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (mr):** संघ योगदान, पुनरावलोकने आणि प्रकल्प आवृत्त्या कशा मांडतात ते शिक.

##### सामायिक डिजिटल प्रकल्पातील बदलांचे समन्वयन

[coordinateChangesInASharedDigitalProject.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (mr):** कोण काय बदलेल आणि सामायिक बदल कसे एकत्र होतील ते ठरव.

##### योगदान मार्गदर्शक तत्त्वे समजावणे

[explainContributionGuidelines.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (mr):** एकाच कोडवर काम करणाऱ्यांना योगदान नियम का उपयोगी पडतात ते समजून घे.

##### डिजिटल उत्पादनाच्या आवृत्त्यांचा मागोवा ठेवणे

[trackDigitalProductVersions.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (mr):** बदल कधी झाले किंवा आधीचे काम कसे आणायचे हे आवृत्ती इतिहासातून शोध.

#### Git आवृत्ती नियंत्रण

Skills: 6

[gitVersionControl.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (mr):** Git आवृत्त्या कशा नोंदवतो आणि बदल एकत्र करण्यास कशी मदत करतो ते शिक.

##### स्थानिक आणि दूरस्थ रिपॉझिटरी वेगळे ओळखणे

[distinguishLocalAndRemoteRepositories.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (mr):** संगणकावरील काम आणि रिमोटद्वारे शेअर केलेल्या प्रती यांतील फरक समज.

##### ब्रांच समजावणे

[explainABranch.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (mr):** ब्रांचमुळे बदलांच्या स्वतंत्र मार्गांवर काम कसे करता येते ते समज.

##### कमिट समजावणे

[explainACommit.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (mr):** कमिट म्हणजे आधीच्या कामाशी जोडलेली ओळख असलेली स्थितीची नोंद हे समज.

##### पुल रिक्वेस्ट समजावणे

[explainAPullRequest.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (mr):** पुल रिक्वेस्ट प्रस्तावित बदल पुनरावलोकनासाठी कसे मांडते ते शिक.

##### रिपॉझिटरी समजावणे

[explainARepository.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (mr):** रिपॉझिटरी म्हणजे बदलांच्या इतिहासासह प्रकल्प हे समजून घे.

##### ब्रांच मर्जिंग समजावणे

[explainBranchMerging.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (mr):** ब्रांच कशा मर्ज होतात आणि कधी संघर्ष का सोडवावे लागतात ते शिक.

#### मुक्त स्रोत

Skills: 2

[openSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (mr):** सॉफ्टवेअर खरोखर मुक्त स्रोत ठरण्यासाठी कोणत्या परवानग्या लागतात ते शिक.

##### मुक्त स्रोत आणि सार्वजनिक दिसणारा कोड वेगळा ओळखणे

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (mr):** स्रोत कोड दिसतो म्हणून तो आपोआप मुक्त स्रोत होत नाही हे ओळख.

##### मुक्त स्रोत समजावणे

[explainOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (mr):** मुक्त स्रोत परवाने सॉफ्टवेअर वापरणे, बदलणे आणि पुन्हा वितरित करणे कसे शक्य करतात ते समज.

### प्रोग्रामिंगचा इतिहास

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (mr):** प्रोग्रामिंगच्या कल्पना आणि संगणकीय यंत्रे इतिहासात कशी विकसित झाली ते शिक.

#### महत्त्वाचे योगदान

Skills: 6

[keyContributions.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (mr):** प्रोग्रामिंग, सॉफ्टवेअर विश्वसनीयता आणि नेटवर्कमधील मोठे योगदान जाणून घे.

##### संगणनीयता सिद्धांत समजावणे

[explainComputabilityTheory.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (mr):** औपचारिक मॉडेल संगणक काय मोजू शकतो आणि काय नाही ते कसे दाखवतात ते शिक.

##### सुरुवातीचे इलेक्ट्रॉनिक प्रोग्रामिंग समजावणे

[explainEarlyElectronicProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (mr):** सुरुवातीच्या इलेक्ट्रॉनिक संगणक संघांनी प्रोग्राम कसे तयार करून तपासले ते शिक.

##### कंपायलरचा विकास समजावणे

[explainTheDevelopmentOfCompilers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (mr):** कंपायलरमुळे वाचनीय भाषेत प्रोग्राम लिहिणे कसे सोपे झाले ते शिक.

##### सॉफ्टवेअर विश्वसनीयतेचा विकास समजावणे

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (mr):** अपोलो मोहिमांत त्रुटी हाताळणी आणि विश्वसनीय सॉफ्टवेअर का आवश्यक होते ते समज.

##### नेटवर्क लूप टाळणे समजावणे

[explainTheEliminationOfNetworkLoops.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (mr):** स्पॅनिंग ट्री प्रोटोकॉल स्थानिक नेटवर्कमधील लूप कसे टाळतो ते शिक.

##### प्रोग्रामिंगची सुरुवात समजावणे

[explainTheOriginsOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (mr):** सुरुवातीच्या यंत्ररचना आणि एडा लव्हलेस यांच्या कार्याने प्रोग्रामिंगला कशी वाट दाखवली ते शिक.

#### यंत्रे आणि कूटविश्लेषण

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (mr):** यंत्रे आणि गणिती पद्धतींनी ऐतिहासिक कूटविश्लेषणाला कशी मदत केली ते शिक.

##### ऐतिहासिक कूटविश्लेषण पद्धती समजावणे

[explainHistoricalCryptanalysisMethods.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (mr):** कूटविश्लेषकांनी नमुने आणि पद्धतशीर तपासणीने संकेत कसे उलगडले ते शिक.

##### प्रोग्राम करता येणाऱ्या संगणकांचा विकास समजावणे

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (mr):** यांत्रिक गणनेच्या कल्पनांपासून प्रोग्रामयोग्य इलेक्ट्रॉनिक यंत्रांपर्यंतचा प्रवास पाहा.

##### बॉम्ब यंत्राचा उद्देश समजावणे

[explainThePurposeOfTheBombe.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (mr):** बॉम्ब यंत्राने एनिग्माच्या शक्य सेटिंग्ज तपासण्यात कशी मदत केली ते शिक.

### माहिती आणि डेटा

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../content/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (mr):** विश्वासार्ह माहिती शोधणे, डेटा व्यवस्थित करणे आणि अनिश्चिततेवर विचार करणे शिका.

#### डेटा संकलन आणि संघटन

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (mr):** संबंधित माहिती गोळा करणे आणि तुलना करता येणाऱ्या नोंदी मांडणे शिका.

##### सुसंगत पद्धतीने डेटा गोळा करणे

[collectDataConsistently.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (mr):** समान नियम आणि एकके वापरून मोजमाप गोळा करा.

##### गुणधर्मानुसार डेटाचे गट करणे

[groupDataByAttribute.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (mr):** एका स्पष्ट गुणधर्मानुसार नोंदींचे गट करा.

##### कामासाठी आवश्यक डेटा ओळखणे

[identifyDataNeededForATask.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (mr):** प्रश्नासाठी नेमकी कोणती क्षेत्रे व निरीक्षणे आवश्यक आहेत ते ठरवा.

##### डेटा तक्त्यात सादर करणे

[presentDataInATable.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (mr):** शीर्षक असलेल्या पंक्ती, स्तंभ आणि एकसारखी मूल्ये असलेला तक्ता तयार करा.

#### डेटाबेस

Skills: 5

[databases.data.ts](../../../content/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (mr):** डेटाबेस नोंदी कशा रचतात आणि संबंधित माहिती कशी जोडतात ते जाणून घ्या.

##### साधा डेटाबेस स्कीमा तयार करणे

[designASimpleDatabaseSchema.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (mr):** योग्य घटक, फील्ड आणि जोडण्यांसह डेटाबेसची रचना आखा.

##### रेकॉर्ड आणि फील्ड यांत फरक करणे

[distinguishRecordsAndFields.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (mr):** नोंद आणि तिचे वर्णन करणारी क्षेत्रे वेगळी ओळखा.

##### डेटाबेस तक्ता स्पष्ट करणे

[explainADatabaseTable.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (mr):** तक्त्यात समान प्रकारच्या नोंदी कशा साठतात ते समजून घ्या.

##### प्राथमिक की स्पष्ट करणे

[explainPrimaryKeys.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (mr):** प्रत्येक नोंदीसाठी स्थिर, अद्वितीय की का आवश्यक आहे ते स्पष्ट करा.

##### तक्त्यांतील संबंधांचे मॉडेल करणे

[modelRelationshipsBetweenTables.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (mr):** ओळखचिन्हे वापरून वेगवेगळ्या तक्त्यांतील माहिती जोडा.

#### माहिती शोध व पडताळणी

Skills: 4

[informationSearchAndVerification.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (mr):** पुरावे शोधणे आणि एखादा दावा पुराव्यांनी समर्थित आहे का हे तपासा.

##### माहिती स्रोतांची तुलना करणे

[compareInformationSources.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (mr):** अनेक स्रोतांची तुलना करा आणि त्यांचे वर्णन कुठे वेगळे आहे ते शोधा.

##### संदेश आणि डेटा यांत फरक करणे

[distinguishMessagesFromData.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (mr):** नोंदवलेले मूल्य आणि संदेशाने दिलेला त्याचा अर्थ वेगळा ओळखा.

##### माहिती शोध क्वेरी तयार करणे

[formulateAnInformationQuery.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (mr):** तुम्हाला हवे ते शोधण्यासाठी नेमके शोधशब्द निवडा.

##### स्रोताशी दावा पडताळणे

[verifyAClaimAgainstASource.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (mr):** वारंवार केलेल्या विधानांऐवजी योग्य पुराव्याशी दावा तपासा.

#### संभाव्यता आणि अनिश्चितता

Skills: 7

[probabilityAndUncertainty.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (mr):** घडू शकणाऱ्या घटना, त्यांची शक्यता आणि भाकितांच्या मर्यादा जाणून घ्या.

##### सोप्या घटनांच्या संभाव्यतांची तुलना करणे

[compareProbabilitiesOfSimpleEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (mr):** समान गृहितकांवर दोन परिणामांच्या शक्यतांची तुलना करा.

##### घटना शक्य असणे आणि संभाव्यता यांत फरक करणे

[distinguishPossibilityFromProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (mr):** घटना घडू शकते याचा अर्थ ती घडण्याची शक्यता जास्त असते असे नाही हे समजून घ्या.

##### यादृच्छिक आणि निर्धारक घटनांत फरक करणे

[distinguishRandomAndDeterministicEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (mr):** नियमाने ठरणारे परिणाम आणि यादृच्छिक निवडलेले परिणाम वेगळे ओळखा.

##### घटनेची शक्यता स्पष्ट करणे

[explainEventPossibility.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (mr):** दिलेल्या अटींमध्ये एखादा परिणाम घडू शकतो का ते ठरवा.

##### घटनेची संभाव्यता स्पष्ट करणे

[explainEventProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (mr):** नमूद केलेल्या संभाव्यता नमुन्यावरून घटनेची संधी अंदाज करा.

##### भाकितांच्या मर्यादा स्पष्ट करणे

[explainLimitsOfPrediction.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (mr):** संभाव्यता माहीत असूनही एका प्रयत्नाचा निकाल का सांगता येत नाही ते स्पष्ट करा.

##### मॉडेलमध्ये यादृच्छिकता वापरणे

[useRandomnessInAModel.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (mr):** कोणते परिणाम शक्य आहेत ते ठरवून मॉडेलमध्ये यादृच्छिक निवड समाविष्ट करा.

#### सांख्यिकीय तपासणी

Skills: 4

[statisticalInvestigation.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (mr):** आलेख, वारंवारता आणि तुलनांद्वारे डेटा अभ्यासायला शिका.

##### निरीक्षणांच्या संचांची तुलना करणे

[compareSetsOfObservations.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (mr):** समान मोजमाप किंवा श्रेण्या वापरून दोन डेटा संचांची तुलना करा.

##### साधा आलेख तयार करणे

[constructASimpleChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (mr):** डेटामधील प्रमाण अचूक दाखवणारा स्पष्ट आलेख तयार करा.

##### सर्वाधिक वारंवार येणारे मूल्य शोधणे

[findTheMostFrequentValue.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (mr):** एका संचात सर्वाधिक वेळा येणारे मूल्य ओळखा.

##### आलेख वाचणे

[readAChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (mr):** सादरीकरणामुळे दिशाभूल होऊ न देता आलेखाचे प्रमाण, शीर्षके व मूल्ये वाचा.

### प्रोग्रामिंग

Groups: 8 · Skills: 37

[programming.data.ts](../../../content/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (mr):** संगणक अंमलात आणत असलेल्या सूचना समजणे, लिहिणे आणि तपासणे शिका.

#### डेटा प्रकार आणि संदर्भ

Skills: 6

[dataTypesAndReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (mr):** प्रकार आणि संदर्भ प्रोग्राम कोणती मूल्ये वापरू शकतात यावर कसा परिणाम करतात ते जाणून घ्या.

##### मूल्याची प्रत आणि सामायिक संदर्भ यांत फरक करणे

[distinguishValueCopyingFromSharedReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (mr):** दोन चले कधी एकाच ऑब्जेक्टचा संदर्भ घेतात आणि त्यांची मूल्ये कधी स्वतंत्र असतात ते स्पष्ट करा.

##### मूल्यांचे प्रकार ओळखणे

[distinguishValueTypes.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (mr):** मूल्य संख्या, मजकूर की बुलियन आहे आणि त्यावर काय करता येते ते ठरवा.

##### डेटा प्रकाराचा करार स्पष्ट करणे

[explainADataTypeContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (mr):** प्रोग्राममधील फलन कोणत्या प्रकारचे मूल्य अपेक्षित ठेवते ते समजून घ्या.

##### संयुक्त डेटा रचना स्पष्ट करणे

[explainCompositeDataStructures.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (mr):** अनेक मूल्ये व्यवस्थित मांडणाऱ्या याद्या, अॅरे आणि रेकॉर्ड ओळखा.

##### भाषेतील मूलभूत मूल्ये स्पष्ट करणे

[explainPrimitiveValuesInALanguage.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (mr):** निवडलेल्या प्रोग्रामिंग भाषेने ठरवलेले साधे मूल्यप्रकार ओळखा.

##### करारानुसार डेटा पडताळणे

[validateDataAgainstAContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (mr):** इनपुट वापरण्यापूर्वी त्याचा प्रकार किंवा रचना आवश्यकतेशी जुळते का ते तपासा.

#### फलने आणि पुनर्वापर

Skills: 5

[functionsAndReuse.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (mr):** पुन्हा वापरता येणाऱ्या क्रिया फलनांमध्ये मांडायला शिका.

##### आर्ग्युमेंटसह फलन कॉल करणे

[callAFunctionWithArguments.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (mr):** फलन आर्ग्युमेंटसह कॉल करा आणि त्यांचा वापर कसा होतो ते पाहा.

##### पॅरामीटर असलेले फलन परिभाषित करणे

[defineAFunctionWithParameters.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (mr):** ठराविक उदाहरण-मूल्यांऐवजी पॅरामीटर घेणारे फलन लिहा.

##### पुनरावर्तन स्पष्ट करणे

[explainRecursion.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (mr):** पुनरावर्ती फलन लहान प्रकरणे सोडवून शेवटी कसे थांबते ते समजून घ्या.

##### फलनाचा उद्देश स्पष्ट करणे

[explainThePurposeOfAFunction.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (mr):** नाव दिलेले फलन कॉल केल्यावर काम कसे करते ते स्पष्ट करा.

##### फलनाचे परत आलेले मूल्य वापरणे

[useAFunctionsReturnValue.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (mr):** परत आलेला निकाल फक्त दाखवण्याऐवजी पुढील गणनांत वापरा.

#### प्रोग्राममधील डेटा

Skills: 3

[programData.data.ts](../../../content/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (mr):** चालू प्रोग्राममधील मूल्ये आणि बदलती स्थिती यांच्यासह काम करा.

##### प्रोग्रामची स्थिती अद्ययावत करणे

[updateProgramState.data.ts](../../../content/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (mr):** आधी काय घडले त्यानुसार प्रोग्रामची साठवलेली स्थिती बदला.

##### चल वापरणे

[useAVariable.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (mr):** एखादे मूल्य चलाच्या नावाखाली साठवा आणि गरजेनुसार वाचा.

##### इनपुट डेटा वापरणे

[useInputData.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (mr):** प्रोग्रामच्या बाहेरून दिलेल्या माहितीवरून त्याचे वर्तन ठरवा.

#### प्रोग्रामची रचना आणि वाक्यरचना

Skills: 4

[programStructureAndSyntax.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (mr):** प्रोग्रामिंग भाषा कीवर्ड, व्यंजके आणि ब्लॉक कसे मांडतात ते शिका.

##### कीवर्ड आणि ओळखचिन्हे यांत फरक करणे

[distinguishKeywordsFromIdentifiers.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (mr):** भाषेतील राखीव शब्द आणि प्रोग्रामरने निवडलेली नावे यांत फरक ओळखा.

##### ऑपरेटर, व्यंजके आणि विधाने यांत फरक करणे

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (mr):** ऑपरेटर, व्यंजके व विधाने यांतील फरक ओळखा.

##### विधान ब्लॉकच्या सीमा स्पष्ट करणे

[explainStatementBlockBoundaries.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (mr):** कोणत्या आज्ञा लूप, फलन किंवा अटीच्या ब्लॉकमध्ये येतात ते शोधा.

##### वाक्यरचना हायलाइटिंग स्पष्ट करणे

[explainSyntaxHighlighting.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (mr):** कोडमधील रंग काय दर्शवतात आणि काय सिद्ध करू शकत नाहीत ते समजून घ्या.

#### प्रोग्रामिंग संरचना

Skills: 7

[programmingConstructs.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (mr):** क्रम, अटी, लूप आणि घटनांद्वारे प्रोग्राम नियंत्रित करणे शिका.

##### अनंत लूप ओळखणे

[detectAnInfiniteLoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (mr):** अट कधीच खोटी होत नसल्याने न थांबणारा लूप शोधा.

##### घटना हाताळणे

[handleAnEvent.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (mr):** बटण दाबले, संदेश आला किंवा इतर घटना घडली की प्रोग्राम प्रतिसाद देईल अशी रचना करा.

##### लूप अंमलात आणणे

[implementALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (mr):** योग्य थांबण्याची अट पूर्ण होईपर्यंत सूचना पुन्हा करण्यासाठी लूप वापरा.

##### अटीनुसार वर्तन अंमलात आणणे

[implementConditionalBehavior.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (mr):** अटी बदलल्यावर प्रोग्राम वेगवेगळ्या कृती निवडेल अशी रचना करा.

##### लूपमध्ये न बदलणारी गणिते बाहेर हलवणे

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (mr):** पुनरावृत्तीमध्ये न बदलणारी गणिते लूपच्या बाहेर हलवा.

##### एकमेकांवर येणाऱ्या अटींच्या तपासण्यांचा क्रम लावणे

[orderOverlappingConditionalChecks.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (mr):** विशिष्ट प्रकरणेही तपासली जातील अशा क्रमाने अटींच्या तपासण्या मांडा.

##### आज्ञांचा क्रम लिहिणे

[writeASequenceOfCommands.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (mr):** अपेक्षित क्रमाने कृती करणाऱ्या वैध आज्ञा लिहा.

#### प्रोग्रामिंग प्रतिमाने

Skills: 4

[programmingParadigms.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (mr):** प्रोग्रामचे तर्क आणि वर्तन मांडण्याच्या विविध पद्धती जाणून घ्या.

##### आज्ञात्मक आणि घोषणात्मक पद्धतींतील फरक ओळखणे

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (mr):** स्पष्ट सूचना देणे आणि अपेक्षित निकालाचे वर्णन करणे यांची तुलना करा.

##### फलनात्मक प्रोग्रामिंग स्पष्ट करणे

[explainFunctionalProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (mr):** फलने एकत्र करून मूल्यांचे रूपांतर करणारे प्रोग्राम समजून घ्या.

##### वस्तुनिष्ठ प्रोग्रामिंग स्पष्ट करणे

[explainObjectOrientedProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (mr):** स्थिती आणि वर्तन असलेल्या परस्परक्रिया करणाऱ्या ऑब्जेक्ट्सपासून बनलेले प्रोग्राम जाणून घ्या.

##### प्रक्रियात्मक प्रोग्रामिंग स्पष्ट करणे

[explainProceduralProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (mr):** टप्प्याटप्प्यांच्या प्रक्रियांभोवती रचलेले प्रोग्राम जाणून घ्या.

#### प्रोग्राम वाचणे

Skills: 4

[readingPrograms.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (mr):** प्रोग्राम वाचून तो काय करतो याचा मागोवा घेणे शिका.

##### आज्ञेचा उद्देश स्पष्ट करणे

[explainACommandsPurpose.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (mr):** एका प्रोग्रामिंग आज्ञेमुळे प्रोग्रामच्या स्थितीत काय बदल होतो ते स्पष्ट करा.

##### अंमलबजावणीच्या क्रमाचे परिणाम भाकीत करणे

[predictConsequencesOfExecutionOrder.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (mr):** आज्ञांचा क्रम बदलल्याने निकाल का बदलू शकतो ते स्पष्ट करा.

##### प्रोग्रामचे आउटपुट भाकीत करणे

[predictProgramOutput.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (mr):** दिलेल्या इनपुटवर प्रोग्राम कोणता दिसणारा परिणाम देईल ते ठरवा.

##### प्रोग्रामची स्थिती मागोवा घेणे

[traceProgramState.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (mr):** प्रोग्राम चालू असताना चल आणि इतर मूल्ये कशी बदलतात ते पाहा.

#### चाचणी आणि त्रुटीनिवारण

Skills: 4

[testingAndDebugging.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (mr):** प्रोग्राममधील चुका शोधणे, स्पष्ट करणे व दुरुस्त करणे शिका.

##### प्रोग्रामचे चुकीचे वर्तन ओळखणे

[detectIncorrectProgramBehavior.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (mr):** प्रोग्रामचे वर्तन अपेक्षित अटींपेक्षा वेगळे कधी असते ते ओळखा.

##### प्रोग्राममधील दोष दुरुस्त करणे

[fixAProgramDefect.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (mr):** विशिष्ट दोष दुरुस्त करून अपेक्षित वर्तन अजूनही कार्य करते का ते तपासा.

##### त्रुटीचे कारण शोधणे

[locateTheCauseOfAnError.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (mr):** प्रोग्राममधील चूक निर्माण करणाऱ्या आज्ञेपर्यंत किंवा अटीपर्यंत मागोवा घ्या.

##### वेगवेगळ्या इनपुटने प्रोग्राम तपासणे

[testAProgramWithDifferentInputs.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (mr):** सीमावर्ती प्रकरणांसह विविध इनपुट वापरून प्रोग्रामची चाचणी घ्या.

### रोबोटिक्स आणि स्वयंचलन

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (mr):** संवेदक, प्रोग्रामिंग आणि क्रियाचालक यांमुळे रोबोट परिसराला कसा प्रतिसाद देतो ते शोधा.

#### रोबोट नियंत्रण

Skills: 4

[robotControl.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (mr):** रोबोटच्या हालचाली आणि प्रतिसादांसाठी सूचना तयार करून सुधारा.

##### रोबोटची पुनरावृत्ती होणारी कृती ठरवणे

[configureARepeatedRobotAction.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (mr):** रोबोटने एखादी कृती किती वेळा करावी किंवा केव्हा थांबावे ते ठरवा.

##### रोबोटच्या हालचालींचा क्रम तयार करणे

[createARobotMovementSequence.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (mr):** रोबोटला लक्ष्यापर्यंत नेणाऱ्या क्रमबद्ध हालचालींच्या सूचना आखा.

##### रोबोटच्या वर्तनातील चुका शोधून दुरुस्त करणे

[debugRobotBehavior.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (mr):** रोबोटचे अनपेक्षित वर्तन संवेदक, नियंत्रण तर्क की कृतीमुळे झाले ते शोधा.

##### रोबोटची अडथळ्यावरील प्रतिक्रिया अंमलात आणणे

[implementRobotObstacleResponse.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (mr):** संवेदकाला अडथळा आढळल्यावर रोबोट थांबेल, वळेल किंवा टाळेल असे करा.

#### रोबोट प्रणालीचे घटक

Skills: 4

[roboticSystemComponents.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (mr):** रोबोट परिस्थिती कशी ओळखतो, निर्णय घेतो आणि कृती करतो ते जाणून घ्या.

##### रोबोट नियंत्रक ओळखणे

[identifyARobotController.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (mr):** संवेदकांकडून आलेली माहिती प्रोग्राम केलेल्या कृतीत बदलणारा नियंत्रक ओळखा.

##### संवेदकाचा उद्देश ओळखणे

[identifyASensorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (mr):** प्रकाश, अंतर, तापमान किंवा इतर स्थिती मोजणारे संवेदक ओळखा.

##### क्रियाचालकाचा उद्देश ओळखणे

[identifyAnActuatorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (mr):** मोटर, दिवे आणि इतर क्रियाचालक आदेश कसे पाळतात ते स्पष्ट करा.

##### संवेदक ते कृती संबंधाचे मॉडेल करणे

[modelTheSensorToActionRelationship.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (mr):** संवेदकाचे मापन, निर्णय नियम आणि क्रियाचालकाचा प्रतिसाद यांचा संबंध लावा.

### सॉफ्टवेअर आर्किटेक्चर

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../content/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (mr):** ऑब्जेक्ट, जबाबदाऱ्या आणि अवलंबित्वे विश्वसनीय सॉफ्टवेअर कशी रचतात ते जाणून घ्या.

#### रचना तत्त्वे

Skills: 8

[designPrinciples.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (mr):** सॉफ्टवेअर समजण्यास सोपे व बदलांसाठी अनुकूल ठेवणारी तत्त्वे शिका.

##### अनावश्यक सुविधा पुढे ढकलणे (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (mr):** केवळ कल्पित भविष्यातील शक्यतांसाठी सुविधा तयार करणे टाळा.

##### करारांवर अवलंबित्वे रचणे (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (mr):** ठोस सेवांऐवजी करारांवर अवलंबून राहून व्यावसायिक तर्क वेगळा ठेवा.

##### मूळ भाग न बदलता वर्तन वाढवणे (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (mr):** स्थिर मुख्य तर्क पुन्हा न लिहिता नव्या वर्तनासाठी विस्तारबिंदू तयार करा.

##### अनावश्यक पुनरावृत्ती ओळखणे (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (mr):** भविष्यात विसंगत बदल घडवू शकणारे दुबार नियम शोधा.

##### एकच जबाबदारी वेगळी ठेवणे (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (mr):** एका सुसंगत बदलाच्या कारणाभोवती मॉड्यूलची रचना करा.

##### अनावश्यक गुंतागुंत कमी करणे (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (mr):** गरज नसलेल्या यंत्रणा काढून सॉफ्टवेअर सोपे करा.

##### लहान इंटरफेस वेगळे ठेवणे (ISP)

[separateNarrowInterfacesISP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (mr):** वापरकर्त्यांना फक्त लागणाऱ्या क्रियांवर अवलंबून राहावे लागेल असे छोटे इंटरफेस करा.

##### बदली योग्यता तपासणे (LSP)

[verifySubstitutabilityLSP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (mr):** अंमलबजावणी सामायिक कराराची आश्वासने पाळते का ते तपासा.

#### ऑब्जेक्ट मॉडेल

Skills: 13

[objectModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (mr):** सॉफ्टवेअर ऑब्जेक्ट आपली स्थिती व वर्तन कसे एकत्र करतात ते जाणून घ्या.

##### ऑब्जेक्ट अमूर्तीकरण लागू करणे

[applyObjectAbstraction.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (mr):** घटकाने वापरकर्त्यांना दाखवायच्या आवश्यक क्रिया निवडा.

##### क्लास आणि ऑब्जेक्ट यांत फरक करणे

[distinguishAClassFromAnObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (mr):** क्लासची रूपरेषा आणि स्वतःची सध्याची मूल्ये असलेले ऑब्जेक्ट वेगळे ओळखा.

##### खरी वस्तू आणि तिच्या अमूर्त मॉडेलमध्ये फरक करणे

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (mr):** सॉफ्टवेअर मॉडेल एखाद्या गोष्टीची निवडक वैशिष्ट्येच दर्शवते हे ओळखा.

##### ऑब्जेक्ट मेथड स्पष्ट करणे

[explainAnObjectMethod.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (mr):** मेथड कॉल करून ऑब्जेक्टची स्थिती कशी वाचता किंवा बदलता येते ते स्पष्ट करा.

##### ऑब्जेक्टचा गुणधर्म स्पष्ट करणे

[explainAnObjectProperty.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (mr):** साठवलेल्या गुणधर्माला ऑब्जेक्ट करू शकणाऱ्या कृतींपासून वेगळे ओळखा.

##### एन्कॅप्स्युलेशन स्पष्ट करणे

[explainEncapsulation.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (mr):** ऑब्जेक्ट नियंत्रित पद्धतींनी अंतर्गत स्थिती कशी सुरक्षित ठेवतात ते जाणून घ्या.

##### वारसा स्पष्ट करणे

[explainInheritance.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (mr):** विशेषीकृत क्लास अधिक सामान्य क्लासचे वर्तन कसे वारशाने घेतो ते सांगा.

##### बहुरूपता स्पष्ट करणे

[explainPolymorphism.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (mr):** वेगवेगळे ऑब्जेक्ट तीच क्रिया निरनिराळ्या प्रकारे कशी करू शकतात ते जाणून घ्या.

##### क्लासची संकल्पना स्पष्ट करणे

[explainTheConceptOfAClass.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (mr):** क्लास म्हणजे स्वतंत्र ऑब्जेक्ट तयार होणारी व्याख्या हे समजून घ्या.

##### सॉफ्टवेअर ऑब्जेक्टची रचना स्पष्ट करणे

[explainTheStructureOfASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (mr):** विद्यमान ऑब्जेक्टची ओळख, गुणधर्म व पद्धती ओळखा.

##### ऑब्जेक्टची स्थिती आणि वर्तन ओळखणे

[identifyAnObjectsStateAndBehavior.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (mr):** ऑब्जेक्टची वैशिष्ट्ये व तो करू शकणाऱ्या कृती वर्णन करा.

##### डोमेन घटकाचे सॉफ्टवेअर ऑब्जेक्ट म्हणून मॉडेल करणे

[modelADomainEntityAsASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (mr):** संबंधित गुणधर्म व क्रिया निवडून उपयोगी ऑब्जेक्ट तयार करा.

##### ऑब्जेक्ट रचनेचे मॉडेल करणे

[modelObjectComposition.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (mr):** भिन्न जबाबदाऱ्या असलेल्या लहान भागांतून मोठे सॉफ्टवेअर ऑब्जेक्ट तयार करा.

