<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (te)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### అల్గోరిథంలు

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../learningApps/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (te):** సమస్యలను పరిష్కరించే పునరావృత పద్ధతులను రూపొందించడం, అమలు చేయడం, పోల్చడం నేర్చుకోండి.

#### విశ్లేషణ

Skills: 3

[analysis.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (te):** ఇన్‌పుట్ మారినప్పుడు అల్గోరిథం సమయం, మెమరీ అవసరాలు ఎలా మారతాయో తెలుసుకోండి.

##### రేఖీయ, లఘుగణక వృద్ధిని వేరు చేయడం

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (te):** ఇన్‌పుట్ పరిమాణానికి అనులోమమైన పెరుగుదలను, పదేపదే సగం చేయడం వల్ల పెరుగుదలతో పోల్చండి.

##### అల్గోరిథం అత్యంత ప్రతికూల పరిస్థితిని అంచనా వేయడం

[estimateAnAlgorithmsWorstCase.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (te):** అత్యంత ప్రతికూల పరిస్థితిలో అల్గోరిథానికి గరిష్ఠంగా ఎన్ని తనిఖీలు అవసరమో అంచనా వేయండి.

##### సమయం–మెమరీ మార్పిడిని వివరించడం

[explainTimeMemoryTradeOffs.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (te):** వేగవంతమైన అల్గోరిథంలకు ఎక్కువ తాత్కాలిక మెమరీ ఎందుకు అవసరమవుతుందో అర్థం చేసుకోండి.

#### సేకరణల ప్రాసెసింగ్

Skills: 4

[collectionProcessing.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (te):** డేటాను పరిశీలిస్తూ లెక్కించడం, కూడిక చేయడం, గరిష్ఠ కనిష్ఠ విలువలు కనుగొనడం నేర్చుకోండి.

##### అంశాలను లెక్కించడం

[applyElementCounting.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (te):** నిర్దిష్ట షరతును తీర్చే సేకరణలోని అన్ని అంశాలను లెక్కించండి.

##### గరిష్ఠ విలువను కనుగొనడం

[applyMaximumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (te):** సేకరణను పరిశీలిస్తూ ఇప్పటివరకు కనిపించిన గరిష్ఠ విలువను గుర్తుంచుకోండి.

##### కనిష్ఠ విలువను కనుగొనడం

[applyMinimumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (te):** సేకరణను పరిశీలిస్తూ ఇప్పటివరకు కనిపించిన కనిష్ఠ విలువను గుర్తుంచుకోండి.

##### మొత్తాన్ని కూడబెట్టడం

[applySumAccumulation.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (te):** సేకరణ విలువలను ఒక్కొక్కటిగా పెరుగుతున్న మొత్తానికి కలపండి.

#### రూపకల్పన

Skills: 6

[construction.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (te):** అల్గోరిథం చర్యలు, షరతులు, ఆపే నియమాలను నిర్వచించడం నేర్చుకోండి.

##### అవసరాలకు అనుగుణంగా అల్గోరిథంలను పోల్చడం

[compareAlgorithmsAgainstRequirements.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (te):** వివిధ అల్గోరిథంలను వాటి అవసరాలు, పరిమితుల ఆధారంగా పోల్చండి.

##### క్రమానుగత అల్గోరిథాన్ని నిర్మించడం

[constructASequentialAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (te):** సరైన క్రమంలో అమలు చేసే పరిమిత సంఖ్యలో దశలను వివరించండి.

##### అల్గోరిథం లక్ష్యాన్ని నిర్వచించడం

[defineAnAlgorithmsGoal.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (te):** అల్గోరిథం సాధించాల్సిన ఫలితం, అంగీకరించే ఇన్‌పుట్‌లను పేర్కొనండి.

##### షరతులతో కూడిన శాఖలను రూపొందించడం

[designConditionalBranching.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (te):** స్పష్టమైన షరతుల ప్రకారం అల్గోరిథంలో వేర్వేరు మార్గాలను రూపొందించండి.

##### పునరావృతాన్ని రూపొందించడం

[designRepetition.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (te):** సరైన నవీకరణలు, ఆపే షరతుతో పునరావృత ప్రక్రియను రూపొందించండి.

##### పునరావర్తన అల్గోరిథాన్ని అమలు చేయడం

[implementARecursiveAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (te):** చిన్న ఉపసమస్యలు, ఆపే ప్రాథమిక పరిస్థితి ఉన్న పునరావర్తన అల్గోరిథాన్ని నిర్మించండి.

#### శోధన

Skills: 6

[search.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (te):** వివిధ శోధన పద్ధతులు సేకరణలో అంశాన్ని ఎలా కనుగొంటాయో తెలుసుకోండి.

##### ద్విసంఖ్యాక శోధనను అమలు చేయడం

[applyBinarySearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (te):** క్రమబద్ధమైన డేటాలో పరిధిని పదేపదే సగం చేసి విలువను కనుగొనండి.

##### ద్విసంఖ్యాక శోధన వృక్షంలో వెతకడం

[applyBinaryTreeSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (te):** ద్విసంఖ్యాక శోధన వృక్షంలోని క్రమబద్ధమైన శాఖలను అనుసరించి కీని కనుగొనండి.

##### రేఖీయ శోధనను అమలు చేయడం

[applyLinearSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (te):** అంశాలను ఒక్కొక్కటిగా తనిఖీ చేసి లక్ష్యాన్ని కనుగొనండి.

##### తనిఖీల సంఖ్యతో శోధన పద్ధతులను పోల్చడం

[compareSearchMethodsByCheckCount.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (te):** రేఖీయ, ద్విసంఖ్యాక శోధనలకు అవసరమైన తనిఖీల సంఖ్యను పోల్చండి.

##### ద్విసంఖ్యాక శోధన ముందస్తు అవసరాలను గుర్తించడం

[identifyBinarySearchPrerequisites.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (te):** ద్విసంఖ్యాక శోధనకు కావలసిన క్రమబద్ధీకరణను డేటా పాటిస్తుందో తనిఖీ చేయండి.

##### శోధన వ్యాప్తిని అంచనా వేయడం

[predictSearchScaling.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (te):** డేటా రెట్టింపైనప్పుడు ద్విసంఖ్యాక శోధనలో సుమారు ఒక తనిఖీ మాత్రమే ఎందుకు పెరుగుతుందో అర్థం చేసుకోండి.

#### క్రమబద్ధీకరణ

Skills: 4

[sorting.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (te):** క్రమబద్ధీకరణ పద్ధతులు విలువలను ఎంచుకున్న క్రమంలో ఎలా అమర్చుతాయో తెలుసుకోండి.

##### బబుల్ సార్ట్‌ను అమలు చేయడం

[applyBubbleSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (te):** తప్పు క్రమంలో ఉన్న పక్కపక్క విలువలను మారుస్తూ క్రమబద్ధీకరించండి.

##### ఇన్సర్షన్ సార్ట్‌ను అమలు చేయడం

[applyInsertionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (te):** ప్రతి కొత్త అంశాన్ని ఇప్పటికే క్రమబద్ధమైన భాగంలో చొప్పిస్తూ అమర్చండి.

##### సెలెక్షన్ సార్ట్‌ను అమలు చేయడం

[applySelectionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (te):** మిగిలిన వాటిలో చిన్నదాన్ని పదేపదే ఎంచుకుంటూ క్రమబద్ధీకరించండి.

##### క్రమబద్ధీకరణ ప్రమాణాన్ని వివరించడం

[explainASortingCriterion.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (te):** సేకరణను క్రమబద్ధం చేయడానికి ఉపయోగించే విలువ లేదా లక్షణాన్ని ఎంచుకోండి.

### కృత్రిమ మేధస్సు

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (te):** AI వ్యవస్థలు ఎలా నేర్చుకుని, అంచనా వేసి, కంటెంట్ సృష్టిస్తాయి, కొన్నిసార్లు ఎందుకు తప్పుతాయో తెలుసుకోండి.

#### కృత్రిమ మేధస్సు ప్రాథమిక అంశాలు

Skills: 6

[aIFundamentals.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (te):** ప్రోగ్రామ్ చేసిన నియమాలు, శిక్షణ పొందిన నమూనాలు, AI పనుల మధ్య తేడాలను తెలుసుకోండి.

##### AI పనులను వర్గీకరించడం

[classifyAITasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (te):** AI పని వర్గీకరణ, అంచనా లేదా కంటెంట్ సృష్టిలో ఏది చేస్తుందో గుర్తించండి.

##### నియమాలు, శిక్షణ పొందిన నమూనాలను వేరు చేయడం

[distinguishRulesFromTrainedModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (te):** స్పష్టంగా ప్రోగ్రామ్ చేసిన నిర్ణయ నియమాలను డేటాపై శిక్షణ పొందిన వ్యవస్థల నుంచి వేరు చేయండి.

##### ఉత్పాదక AIని వివరించడం

[explainGenerativeAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (te):** ఉత్పాదక నమూనాలు పాఠ్యం, చిత్రాలు, ఇతర కంటెంట్ ఎలా సృష్టిస్తాయో అర్థం చేసుకోండి.

##### ఉదాహరణల నుంచి నేర్చుకోవడాన్ని వివరించడం

[explainLearningFromExamples.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (te):** ఉదాహరణలు కొత్త ఇన్‌పుట్‌లపై నమూనా పనితీరును మెరుగుపరచడానికి ఎలా సహాయపడతాయో వివరించండి.

##### అంచనా AIని వివరించడం

[explainPredictiveAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (te):** అంచనా వ్యవస్థలు విలువలు, వర్గాలు లేదా సంఘటన అవకాశాలను ఎలా అంచనా వేస్తాయో తెలుసుకోండి.

##### AIలో సంభావ్య తప్పును గుర్తించడం

[identifyAPotentialAIError.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (te):** AI సమాధానాన్ని స్వతంత్రంగా తనిఖీ చేయాల్సిన అవసరాన్ని సూచించే హెచ్చరిక సంకేతాలను గుర్తించండి.

#### అనుకరణ మరియు అవగాహన

Skills: 2

[imitationAndUnderstanding.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (te):** నమ్మదగిన అనుకరణకు, నిజమైన అవగాహనకు మధ్య తేడాను పరిశీలించండి.

##### సెర్ల్ చైనీస్ గదిని వివరించడం

[explainSearlesChineseRoom.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (te):** చైనీస్ గది ఆలోచనా ప్రయోగం, అది లేవనెత్తే చర్చను తెలుసుకోండి.

##### ట్యూరింగ్ పరీక్షను వివరించడం

[explainTheTuringTest.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (te):** ట్యూరింగ్ పరీక్ష ఏమి అంచనా వేస్తుంది, ఏమి నిరూపించలేదో అర్థం చేసుకోండి.

#### భాషా నమూనాల టోకెన్లు, సందర్భం

Skills: 6

[languageModelTokensAndContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (te):** భాషా నమూనాలు పాఠ్యాన్ని టోకెన్లుగా విభజించి సందర్భాన్ని ఎలా ఉపయోగిస్తాయో తెలుసుకోండి.

##### నమూనా ఎంపికను అత్యంత సంభావ్య టోకెన్ ఎంపిక నుంచి వేరు చేయడం

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (te):** అత్యధిక సంభావ్యత గల టోకెన్‌ను ఎంచుకోవడాన్ని ఇతర సాధ్యమైన కొనసాగింపుల నుంచి నమూనా తీసుకోవడంతో పోల్చండి.

##### టోకెన్లు, అక్షరాలు, పదాలను వేరు చేయడం

[distinguishTokensCharactersAndWords.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (te):** అక్షరాలు, పదాలు, టోకెన్లు ఎందుకు ఒకటే కావో గుర్తించండి.

##### భాషా నమూనా సందర్భ విండోను వివరించడం

[explainALanguageModelsContextWindow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (te):** భాషా నమూనా పరిమిత సందర్భాన్ని మాత్రమే ఎందుకు ఉపయోగించగలదో అర్థం చేసుకోండి.

##### సందర్భ విండో పరిమితి మించడాన్ని వివరించడం

[explainContextWindowOverflow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (te):** అభ్యర్థన నమూనా సందర్భ పరిమితిని మించితే ఏమి జరుగవచ్చో తెలుసుకోండి.

##### తదుపరి టోకెన్ ఎంపికను వివరించడం

[explainNextTokenSelection.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (te):** భాషా నమూనాలు సందర్భం ఆధారంగా సంభావ్య తదుపరి టోకెన్‌ను ఎలా ఎంచుకుంటాయో వివరించండి.

##### టోకెన్లను వివరించడం

[explainTokens.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (te):** టోకెన్‌ను నమూనాకు ప్రత్యేకమైన పాఠ్య ప్రాతినిధ్య ప్రమాణంగా అర్థం చేసుకోండి.

#### నమూనా నిర్మాణాలు, వనరులు

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (te):** వేర్వేరు AI నమూనాల నిర్మాణాలు పనితీరు, వనరుల అవసరాలను ఎలా ప్రభావితం చేస్తాయో తెలుసుకోండి.

##### పని కోసం నమూనాను ఎంపిక చేయడం

[chooseAModelForATask.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (te):** పని నాణ్యత, వేగం, ఖర్చు, గోప్యత, అందుబాటు మెమరీ ఆధారంగా నమూనాను ఎంచుకోండి.

##### సాంద్రమైన నమూనాలు, నిపుణుల మిశ్రమ నమూనాలను పోల్చడం

[compareDenseAndMoEModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (te):** అనేక పారామితులు సక్రియమయ్యే నమూనాలను ఎంపిక చేసిన నిపుణ విభాగాలు మాత్రమే పనిచేసే నమూనాలతో పోల్చండి.

##### నమూనాల మెమరీ అవసరాలను పోల్చడం

[compareModelMemoryRequirements.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (te):** నమూనా ఫైళ్లను నిల్వ చేయడానికే కాక నడపడానికి ఎంత మెమరీ అవసరమో అంచనా వేయండి.

##### స్పందన ఆలస్యాన్ని పోల్చడం

[compareResponseLatency.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (te):** AI సమాధానం ప్రారంభమయ్యే ముందు ఆలస్యాన్ని, ఆపై సృష్టించే వేగాన్ని విడిగా పోల్చండి.

##### క్వాంటైజేషన్‌ను వివరించడం

[explainQuantization.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (te):** సంఖ్యా ఖచ్చితత్వాన్ని తగ్గించడం మెమరీని ఆదా చేసినా ఫలిత నాణ్యత మారవచ్చని అర్థం చేసుకోండి.

#### AI కోసం ప్రాంప్ట్ రచన

Skills: 7

[prompting.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (te):** AI వ్యవస్థలకు స్పష్టమైన సూచనలు, సందర్భం, పరిమితులు ఇవ్వడం నేర్చుకోండి.

##### సంక్లిష్ట ప్రాంప్ట్‌ను ఉపపనులుగా విభజించడం

[breakAComplexPromptIntoSubtasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (te):** సంక్లిష్ట అభ్యర్థనను ఫలితాలను తనిఖీ చేయగల చిన్న దశలుగా విభజించండి.

##### ప్రాంప్ట్‌కు సందర్భాన్ని ఇవ్వడం

[providePromptContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (te):** AI మీ అభ్యర్థనను అర్థం చేసుకోవడానికి అవసరమైన సంబంధిత నేపథ్య సమాచారాన్ని ఇవ్వండి.

##### ఫలితాల ఆధారంగా ప్రాంప్ట్‌ను మెరుగుపరచడం

[refineAPromptBasedOnResults.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (te):** మునుపటి సమాధానంలో ఏది తప్పిపోయిందో చూసి AI అభ్యర్థనను మెరుగుపరచండి.

##### ప్రాంప్ట్ లక్ష్యాన్ని పేర్కొనడం

[specifyAPromptObjective.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (te):** AI సహాయకుడు పూర్తి చేయాలని కోరుతున్న ఖచ్చితమైన పనిని తెలపండి.

##### ప్రాంప్ట్‌లో పాత్రను పేర్కొనడం

[specifyARoleInAPrompt.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (te):** ఉపయోగకరమైన దృక్కోణం లేదా శైలిని నిర్దేశించండి; దానిని నిజమైన నైపుణ్యంగా భావించవద్దు.

##### అవుట్‌పుట్ ఆకృతిని పేర్కొనడం

[specifyAnOutputFormat.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (te):** పట్టిక లేదా నిర్వచించిన ఫీల్డ్‌ల వంటి స్పష్టమైన అవుట్‌పుట్ నిర్మాణాన్ని కోరండి.

##### ప్రాంప్ట్ పరిమితులను పేర్కొనడం

[specifyPromptConstraints.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (te):** పొడవు, మూలాలు, కల్పించరాని సమాచారం వంటి పరిమితులను పేర్కొనండి.

#### AI విశ్వసనీయత మరియు బాధ్యతాయుత వినియోగం

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (te):** AI ఫలితాలను తనిఖీ చేసి ప్రజలపై వాటి ప్రభావాలను పరిగణించడం నేర్చుకోండి.

##### AI సహాయ నిర్ణయాల్లో మానవ బాధ్యతను వివరించడం

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (te):** AI సాయంతో తీసుకునే నిర్ణయాలకు కూడా మనుషులే ఎందుకు బాధ్యత వహిస్తారో అర్థం చేసుకోండి.

##### ప్రాంప్ట్‌లలో వ్యక్తిగత డేటాను రక్షించడం

[protectPersonalDataInPrompts.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (te):** AIకి అభ్యర్థన పంపే ముందు అవసరం లేని వ్యక్తిగత సమాచారాన్ని తొలగించండి.

##### AI పక్షపాత ప్రమాదాలను గుర్తించడం

[recognizeAIBiasRisks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (te):** AI వ్యవస్థలు వ్యక్తులు లేదా సమూహాలతో అన్యాయంగా వ్యవహరించగల సందర్భాలను గుర్తించండి.

##### AI సమాధానంలోని వాస్తవాలను తనిఖీ చేయడం

[verifyFactsInAnAIResponse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (te):** AI సమాధానంలోని వాస్తవ వాదనలను నమ్మకమైన స్వతంత్ర మూలాలతో ధృవీకరించండి.

#### AIతో సురక్షిత పరస్పర చర్య

Skills: 4

[safeInteractionWithAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (te):** AI సలహాలు తప్పుదోవ పట్టించగల లేదా అనారోగ్యకర ఆధారపడటాన్ని పెంచగల పరస్పర చర్యలను గుర్తించండి.

##### AIపై అతిగా ఆధారపడటం వల్ల ప్రమాదాలను వివరించడం

[explainRisksOfOverrelianceOnAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (te):** స్వతంత్ర ఆలోచనకు లేదా మనుషుల సహాయానికి AI ఎందుకు ప్రత్యామ్నాయం కాదో అర్థం చేసుకోండి.

##### AI ఇన్‌పుట్‌లో నమ్మలేని సూచనలను గుర్తించడం

[identifyUntrustedInstructionsInAIInput.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (te):** బయటి పదార్థంలో దాగి ఉండి సహాయకుడిని నియంత్రించకూడని సూచనలను గుర్తించండి.

##### AI వాడేటప్పుడు రహస్యాలను రక్షించడం

[protectSecretsWhenUsingAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (te):** AIతో పనిచేసేటప్పుడు పాస్‌వర్డ్‌లు, యాక్సెస్ కీలు, రహస్య సమాచారాన్ని రక్షించండి.

##### AI అతి పొగడ్తను గుర్తించడం

[recognizeAISycophancy.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (te):** ఆధారాలు లేకుండా AI అంగీకరించడం లేదా పొగడడాన్ని గుర్తించండి.

### గణనాత్మక ఆలోచన

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (te):** సంక్లిష్ట సమస్యలను స్పష్టమైన దశలు, నమూనాలు, నియమాలుగా ఎలా విడగొట్టాలో తెలుసుకోండి.

#### విభజన మరియు సంగ్రహణ

Skills: 4

[decompositionAndAbstraction.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (te):** సమస్యలోని ముఖ్య భాగాలు, వాటి సంబంధాలను గుర్తించి సమస్యను సరళీకరించడం నేర్చుకోండి.

##### అమూర్త వ్యవస్థ నమూనాను రూపొందించడం

[buildAnAbstractSystemModel.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (te):** సంక్లిష్ట పరిస్థితి లేదా వ్యవస్థకు సరళీకృత నమూనాను రూపొందించండి.

##### సమస్యను భాగాలుగా విభజించడం

[decomposeAProblem.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (te):** పెద్ద సమస్యను విడిగా పరిష్కరించగల చిన్న పనులుగా విభజించండి.

##### పునరావృత పద్ధతిని సాధారణీకరించడం

[generalizeARepeatedMethod.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (te):** అనేక నిర్దిష్ట సమస్యలకు ఉపయోగపడే ఒకే పద్ధతిని కనుగొనండి.

##### వస్తువు ముఖ్య లక్షణాలను గుర్తించడం

[identifyEssentialObjectProperties.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (te):** పనికి అవసరమైన వివరాలను ఎంచుకుని, సంబంధం లేని వివరాలను పక్కన పెట్టండి.

#### తర్కం మరియు నమూనాలు

Skills: 8

[logicAndPatterns.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (te):** నియమాలు, నమూనాలు, తార్కిక షరతులు సమస్యలను పరిష్కరించడంలో ఎలా సహాయపడతాయో తెలుసుకోండి.

##### తార్కిక AND ను ఉపయోగించడం

[applyLogicalAND.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (te):** రెండు షరతులూ నెరవేరాయా అని చూడటానికి AND ను ఉపయోగించండి.

##### తార్కిక NOT ను ఉపయోగించడం

[applyLogicalNOT.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (te):** షరతు యొక్క సత్య విలువను తిప్పడానికి NOT ను ఉపయోగించండి.

##### తార్కిక OR ను ఉపయోగించడం

[applyLogicalOR.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (te):** రెండు షరతుల్లో కనీసం ఒకటి నెరవేరిందా అని తెలుసుకోవడానికి OR ను ఉపయోగించండి.

##### విరుద్ధమైన నియమాలను గుర్తించడం

[detectContradictoryRules.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (te):** రెండు అవసరాలు ఒకేసారి నిజం కాలేని పరిస్థితులను గుర్తించండి.

##### సరళ షరతును మూల్యాంకనం చేయడం

[evaluateASimpleCondition.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (te):** ఒక షరతు నిజమా, అబద్ధమా లేదా ఇంకా నిర్ణయించలేమా అని నిర్ధారించండి.

##### సమ్మేళిత తార్కిక వ్యక్తీకరణలను మూల్యాంకనం చేయడం

[evaluateCompoundLogicalExpressions.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (te):** అనేక ఆపరేటర్లు ఉన్న తార్కిక వ్యక్తీకరణలను సరైన క్రమంలో లెక్కించండి.

##### నియమం ఆధారంగా ఫలితాన్ని ఊహించడం

[predictAnOutcomeFromARule.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (te):** నియమం, ప్రారంభ స్థితి తెలిసినప్పుడు తర్వాత ఏమవుతుందో కనుగొనండి.

##### నమూనాను గుర్తించడం

[recognizeAPattern.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (te):** క్రమాల్లో నమూనాలను గుర్తించి, సూచించిన నియమం సరిపోతుందా అని తనిఖీ చేయండి.

### డేటా నిర్మాణాలు

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (te):** వివిధ కార్యకలాపాల కోసం సేకరణలు, కీలు, వృక్షాలు, నెట్‌వర్క్‌లు డేటాను ఎలా క్రమబద్ధీకరిస్తాయో తెలుసుకోండి.

#### డిక్షనరీలు

Skills: 3

[dictionaries.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (te):** డిక్షనరీలు ప్రత్యేకమైన కీలను నిల్వ చేసిన విలువలతో ఎలా అనుసంధానిస్తాయో తెలుసుకోండి.

##### డిక్షనరీ నిర్మాణాన్ని వివరించడం

[explainDictionaryStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (te):** డిక్షనరీ స్థానాన్ని కాకుండా కీని ఉపయోగించి సమాచారాన్ని ఎలా పొందుతుందో అర్థం చేసుకోండి.

##### కీ ద్వారా డిక్షనరీ విలువను పొందడం

[retrieveADictionaryValueByKey.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (te):** కీతో డిక్షనరీ విలువను కనుగొని, కీ లేని పరిస్థితిని నిర్వహించండి.

##### డిక్షనరీ విలువను నవీకరించడం

[updateADictionaryValue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (te):** డిక్షనరీలో ఇప్పటికే ఉన్న కీ కింద నిల్వ చేసిన విలువను మార్చండి.

#### గ్రాఫ్‌లు

Skills: 6

[graphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (te):** గ్రాఫ్‌లు ప్రదేశాలు, వస్తువులు, వాటి మధ్య అనుసంధానాలను ఎలా సూచిస్తాయో తెలుసుకోండి.

##### దిశాత్మక, దిశలేని గ్రాఫ్‌లను వేరు చేయడం

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (te):** అనుసంధానాలు ఒక దిశలోనే ఉన్నాయా లేక రెండు దిశల్లోనూ ఉన్నాయా గుర్తించండి.

##### వృక్షాలను చక్రాలు ఉన్న గ్రాఫ్‌ల నుంచి వేరు చేయడం

[distinguishTreesFromGraphsWithCycles.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (te):** గ్రాఫ్‌లలో చక్రాలు ఉండవచ్చు కానీ వృక్షాల్లో ఎందుకు ఉండవో అర్థం చేసుకోండి.

##### బరువులు ఉన్న, లేని గ్రాఫ్‌లను వేరు చేయడం

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (te):** గ్రాఫ్ అనుసంధానాలకు దూరం లేదా ఖర్చు వంటి సంఖ్యలు ఎప్పుడు ఉంటాయో గుర్తించండి.

##### గ్రాఫ్ నిర్మాణాన్ని వివరించడం

[explainGraphStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (te):** గ్రాఫ్‌లోని శీర్షాలను, వాటిని కలిపే అంచులను గుర్తించండి.

##### గ్రాఫ్‌లో మార్గాన్ని కనుగొనడం

[findAPathInAGraph.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (te):** అనుసంధానాల దిశను పాటిస్తూ శీర్షాల మధ్య సరైన మార్గాన్ని అనుసరించండి.

##### పక్కపక్కన అనుసంధానమైన శీర్షాలను గుర్తించడం

[identifyAdjacentVertices.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (te):** మరో శీర్షంతో నేరుగా అనుసంధానమైన శీర్షాలను గుర్తించండి.

#### క్యూ

Skills: 3

[queue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (te):** క్యూలో అంశాలు వచ్చిన క్రమంలోనే ఎలా ప్రాసెస్ అవుతాయో తెలుసుకోండి.

##### క్యూ నుంచి ఒక అంశాన్ని తొలగించడం

[dequeueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (te):** మిగతా అంశాల క్రమాన్ని మార్చకుండా క్యూ ముందున్న అంశాన్ని తొలగించండి.

##### క్యూలో ఒక అంశాన్ని చేర్చడం

[enqueueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (te):** క్యూ చివరలో కొత్త అంశాన్ని చేర్చండి.

##### FIFO సూత్రాన్ని వివరించడం

[explainFIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (te):** క్యూలో ముందుగా చేరిన అంశం ఎందుకు ముందుగా బయటకు వస్తుందో వివరించండి.

#### అనుక్రమాలు

Skills: 7

[sequences.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (te):** క్రమబద్ధమైన సేకరణల్లో అంశాలను పొందడం, జోడించడం, తొలగించడం ఎలాగో తెలుసుకోండి.

##### సూచిక ద్వారా అనుక్రమంలోని అంశాన్ని పొందడం

[accessASequenceElementByIndex.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (te):** చెల్లుబాటు అయ్యే స్థానాల పరిధి దాటకుండా సూచికతో అంశాన్ని పొందండి.

##### అరేలు, అనుసంధాన జాబితాలను వేరు చేయడం

[distinguishArraysFromLinkedLists.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (te):** సూచికలున్న అరేలను అనుసంధానమైన నోడ్ల గొలుసులతో పోల్చండి.

##### అరే నిర్మాణాన్ని వివరించడం

[explainArrayStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (te):** అరేలు సూచికలతో గుర్తించిన స్థానాల్లో అంశాలను ఎలా నిల్వ చేస్తాయో అర్థం చేసుకోండి.

##### జాబితా నిర్మాణాన్ని వివరించడం

[explainListStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (te):** జాబితాలు వివిధ రకాలుగా చూపగలిగే క్రమబద్ధమైన సేకరణలని గుర్తించండి.

##### అనుక్రమంలో ఒక అంశాన్ని చొప్పించడం

[insertAnElementIntoASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (te):** క్రమబద్ధమైన అనుక్రమంలో సరైన స్థానంలో అంశాన్ని చొప్పించండి.

##### అనుక్రమం నుంచి అంశాన్ని తొలగించడం

[removeAnElementFromASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (te):** మిగిలిన అంశాల క్రమాన్ని కాపాడుతూ ఒక అంశాన్ని తొలగించండి.

##### అనుక్రమాన్ని సందర్శించడం

[traverseASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (te):** అనుక్రమంలోని ప్రతి అంశాన్ని క్రమంగా పరిశీలించండి.

#### సమితులు

Skills: 4

[sets.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (te):** ప్రత్యేకమైన విలువల సమితులు, సభ్యత్వ పరీక్షలను తెలుసుకోండి.

##### సమితుల ఖండనను కనుగొనడం

[computeSetIntersection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (te):** రెండు సమితుల్లోనూ ఉన్న అంశాలను మాత్రమే కనుగొనండి.

##### సమితుల సమ్మేళనాన్ని కనుగొనడం

[computeSetUnion.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (te):** రెండు సమితులలోని వేర్వేరు అంశాలన్నింటినీ పునరావృతం లేకుండా కలపండి.

##### సమితి నిర్మాణాన్ని వివరించడం

[explainSetStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (te):** సమితి ప్రతి ప్రత్యేక అంశాన్ని ఒక్కసారి మాత్రమే ఎందుకు ఉంచుతుందో అర్థం చేసుకోండి.

##### సమితిలో సభ్యత్వాన్ని పరీక్షించడం

[testSetMembership.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (te):** ఒక నిర్దిష్ట విలువ సమితిలో ఉందో లేదో తనిఖీ చేయండి.

#### స్టాక్

Skills: 3

[stack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (te):** స్టాక్‌లో చివరిగా చేర్చిన అంశాన్ని ముందుగా ఎలా పొందుతారో తెలుసుకోండి.

##### LIFO సూత్రాన్ని వివరించడం

[explainLIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (te):** స్టాక్ చివరిగా చేర్చిన అంశాన్ని ఎందుకు ముందుగా బయటకు ఇస్తుందో అర్థం చేసుకోండి.

##### స్టాక్ నుంచి అంశాన్ని తీసివేయడం

[popAnElementFromAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (te):** స్టాక్ ఖాళీగా ఉందో లేదో తనిఖీ చేసి చివరిగా చేర్చిన అంశాన్ని తొలగించండి.

##### స్టాక్‌పై ఒక అంశాన్ని ఉంచడం

[pushAnElementOntoAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (te):** స్టాక్ పైభాగంలో కొత్త అంశాన్ని ఉంచండి.

#### డేటా నిర్మాణ ఎంపిక

Skills: 4

[structureSelection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (te):** ప్రోగ్రామ్ డేటాను ఉపయోగించే విధానానికి తగిన నిర్మాణాన్ని ఎంచుకోండి.

##### అవసరమైన చర్యలకు నిర్మాణాన్ని ఎంచుకోవడం

[chooseAStructureForRequiredOperations.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (te):** సూచికలు, సభ్యత్వం, క్యూలు లేదా సంబంధాలకు తగిన సేకరణను ఎంచుకోండి.

##### సేకరణలో చొప్పింపు వ్యయాలను పోల్చడం

[compareCollectionInsertionCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (te):** చొప్పించేటప్పుడు అరే అంశాలను జరపడం లేదా అనుసంధానాలను మార్చడం ఎందుకు అవసరమో తెలుసుకోండి.

##### అంశాలను పొందే వ్యయాలను పోల్చడం

[compareElementAccessCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (te):** అరేలు, అనుసంధాన జాబితాలు ఒక అంశాన్ని ఎంత త్వరగా చేరతాయో పోల్చండి.

##### డేటా నిర్మాణాలు, అల్గోరిథంలను వేరు చేయడం

[distinguishDataStructuresFromAlgorithms.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (te):** నిర్మాణంలో డేటాను క్రమబద్ధం చేయడం, అల్గోరిథంతో ప్రాసెస్ చేయడం మధ్య తేడా గుర్తించండి.

#### వృక్షాలు

Skills: 4

[trees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (te):** వృక్షాలు తల్లిదండ్రి–పిల్ల సంబంధాల ద్వారా సమాచారాన్ని ఎలా క్రమబద్ధం చేస్తాయో తెలుసుకోండి.

##### ఆకు, అంతర్గత వృక్ష నోడ్లను వేరు చేయడం

[distinguishLeafAndInternalTreeNodes.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (te):** పిల్ల నోడ్లు ఉన్న నోడ్లను, పిల్ల నోడ్లు లేని ఆకు నోడ్ల నుంచి వేరు చేయండి.

##### ద్విసంఖ్యాక శోధన వృక్షాలను వివరించడం

[explainBinarySearchTrees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (te):** ద్విసంఖ్యాక శోధన వృక్షంలో వెతకడానికి ఉపయోగపడే కీల క్రమ నియమాన్ని అర్థం చేసుకోండి.

##### వృక్ష నిర్మాణాన్ని వివరించడం

[explainTreeStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (te):** వృక్షంలోని మూలం, శాఖలు, నోడ్లు, అనుసంధానాలను గుర్తించండి.

##### వృక్షంలో మార్గాన్ని కనుగొనడం

[findAPathInATree.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (te):** వృక్షంలోని రెండు నోడ్ల మధ్య నిజంగా ఉన్న అనుసంధాన మార్గాన్ని అనుసరించండి.

### రూపకల్పన నమూనాలు

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../learningApps/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (te):** సాఫ్ట్‌వేర్ ఆబ్జెక్టులను సృష్టించి, కలిపి, సమన్వయం చేసే పునర్వినియోగ మార్గాలను తెలుసుకోండి.

#### ప్రవర్తనా నమూనాలు

Skills: 11

[behavioral.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (te):** ఆబ్జెక్టులు అభ్యర్థనలను ఎలా సమన్వయం చేసి ప్రవర్తన మార్చుతాయో తెలుసుకోండి.

##### బాధ్యతల గొలుసు

[chainOfResponsibility.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (te):** అభ్యర్థనను ఎవరైనా నిర్వహించే వరకు వరుసగా హ్యాండ్లర్లకు పంపండి.

##### కమాండ్

[command.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (te):** చర్యను నిల్వచేయగల లేదా షెడ్యూల్ చేయగల ఆబ్జెక్ట్‌గా చూపండి.

##### ఇంటర్‌ప్రెటర్

[interpreter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (te):** వ్యక్తీకరణలుగా తెలిపిన నియమాలతో చిన్న భాషను అర్థం చేసుకోండి.

##### ఇటరేటర్

[iterator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (te):** సేకరణ ఎలా నిల్వచేయబడిందో చూపకుండా దాని అంశాలను సందర్శించండి.

##### మధ్యవర్తి

[mediator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (te):** కేంద్ర మధ్యవర్తి ద్వారా భాగాల పరస్పర చర్యలను సమన్వయం చేయండి.

##### మెమెంటో

[memento.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (te):** తరువాత పునరుద్ధరించేందుకు ఆబ్జెక్ట్ స్థితిని నిల్వచేయండి.

##### పరిశీలకుడు

[observer.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (te):** గమనిస్తున్న ఆబ్జెక్ట్ మారితే ఆసక్తి ఉన్న చందాదారులకు తెలియజేయండి.

##### స్థితి

[state.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (te):** ఆబ్జెక్ట్ ప్రస్తుత స్థితి ప్రకారం స్పందించే విధానాన్ని మార్చండి.

##### వ్యూహం

[strategy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (te):** ఒకే ఉమ్మడి ఇంటర్‌ఫేస్‌ను పాటించే అల్గోరిథమ్‌ల మధ్య మారండి.

##### టెంప్లేట్ మెథడ్

[templateMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (te):** అల్గోరిథమ్ ముఖ్య దశలను స్థిరంగా ఉంచి కొన్ని దశలను మార్చుకునేలా చేయండి.

##### సందర్శకుడు

[visitor.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (te):** చర్యలను అవి పనిచేసే ఆబ్జెక్ట్ నిర్మాణాల నుంచి వేరు చేయండి.

#### సృష్టి నమూనాలు

Skills: 5

[creational.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (te):** వినియోగదారులను నిర్దిష్ట రకాలపై ఆధారపడనివ్వకుండా ఆబ్జెక్టులను చేసే నమూనాలు నేర్చుకోండి.

##### అబ్స్ట్రాక్ట్ ఫ్యాక్టరీ

[abstractFactory.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (te):** సంబంధిత ఆబ్జెక్టుల సరిపోయే కుటుంబాలను నిర్మించే ఫ్యాక్టరీ వాడండి.

##### బిల్డర్

[builder.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (te):** బిల్డర్‌తో సంక్లిష్ట ఆబ్జెక్ట్‌ను దశలవారీగా అమర్చండి.

##### ఫ్యాక్టరీ మెథడ్

[factoryMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (te):** ఫ్యాక్టరీ మెథడ్ ఏ నిర్దిష్ట ఆబ్జెక్ట్ సృష్టించాలో ఉపక్లాస్ ఎంచుకునేలా చేయండి.

##### ప్రోటోటైప్

[prototype.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (te):** ముందే అమర్చిన ఉదాహరణను కాపీ చేసి కొత్త ఆబ్జెక్టులను సృష్టించండి.

##### సింగిల్టన్

[singleton.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (te):** గ్లోబల్ స్థితి ప్రమాదాలను పరిగణించి ఒకే భాగస్వామ్య ఇన్‌స్టాన్స్‌కు ప్రవేశాన్ని నియంత్రించండి.

#### నిర్మాణ నమూనాలు

Skills: 7

[structural.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (te):** సాఫ్ట్‌వేర్ భాగాలను కలపడం, చుట్టడం, పంచుకోవడం కోసం నమూనాలను తెలుసుకోండి.

##### అడాప్టర్

[adapter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (te):** సరిపోని ఇంటర్‌ఫేస్‌ల మధ్య మార్పిడి ద్వారా వాటిని కలపండి.

##### బ్రిడ్జ్

[bridge.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (te):** భాగం యొక్క అబ్స్ట్రాక్షన్‌ను అది ఉపయోగించే అమలు నుంచి వేరు చేయండి.

##### కాంపోజిట్

[composite.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (te):** ఒకే ఇంటర్‌ఫేస్‌తో ఒక్క ఆబ్జెక్ట్‌, ఆబ్జెక్టుల సమూహాలను నిర్వహించండి.

##### డెకరేటర్

[decorator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (te):** ఉపక్లాస్‌లు పెంచకుండా ఆబ్జెక్ట్‌ను చుట్టి ప్రవర్తనను జోడించండి.

##### ఫసాడ్

[facade.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (te):** సంక్లిష్టమైన భాగాల సమూహానికి సరళమైన ప్రవేశం ఇవ్వండి.

##### ఫ్లైవెయిట్

[flyweight.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (te):** అనవసర మెమరీ వినియోగాన్ని తగ్గించేందుకు పునర్వినియోగ ఆబ్జెక్ట్ డేటాను పంచుకోండి.

##### ప్రాక్సీ

[proxy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (te):** అదే ఇంటర్‌ఫేస్ ఉన్న మరో ఆబ్జెక్ట్ ద్వారా ప్రవేశాన్ని నియంత్రించండి.

### డిజిటల్ సృజనాత్మకత మరియు ఆటలు

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (te):** డిజిటల్ మాధ్యమాలను సృష్టించండి, ఆడగలిగే ఆట నియమాలను రూపొందించండి, విధానపరమైన ఉత్పత్తిని అన్వేషించండి.

#### డిజిటల్ సామగ్రి

Skills: 3

[digitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (te):** నిర్దిష్ట ప్రయోజనానికి డిజిటల్ కంటెంట్‌ను సృష్టించడం, సవరించడం, తగిన సాధనాలను ఎంచుకోవడం నేర్చుకోండి.

##### డిజిటల్ సృజనాత్మక సాధనాన్ని ఎంచుకోవడం

[chooseADigitalCreativeTool.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (te):** మీరు సృష్టించాలనుకునే దానికి తగిన సృజనాత్మక సాఫ్ట్‌వేర్‌ను ఎంచుకోండి.

##### సరళమైన డిజిటల్ సృష్టిని రూపొందించడం

[createASimpleDigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (te):** నిర్దిష్ట ప్రేక్షకుల కోసం సమగ్రంగా ఉండే డిజిటల్ కార్డు, చిత్రం లేదా ఇతర సృష్టిని తయారు చేయండి.

##### డిజిటల్ సృష్టిని సవరించడం

[editADigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (te):** ఇప్పటికే ఉన్న డిజిటల్ ఫైల్ ఉద్దేశించిన అర్థాన్ని కోల్పోకుండా మెరుగుపరచండి.

#### గేమ్ రూపకల్పన

Skills: 3

[gameDesign.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (te):** నియమాలు, ఆటగాళ్ల చర్యలు ఆట అనుభవాన్ని ఎలా ప్రభావితం చేస్తాయో తెలుసుకోండి.

##### ఆట మెకానిక్‌ను రూపొందించడం

[designAGameMechanic.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (te):** ఆటగాడి చర్యను ఆట స్థితిలో మార్పులు, ప్రతిస్పందనతో అనుసంధానించండి.

##### ఆట నియమాన్ని రూపొందించడం

[formulateAGameRule.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (te):** ఆటగాళ్లకు ఏమి అనుమతించబడుతుందో తెలిసేలా ఆట నియమాన్ని స్పష్టంగా రాయండి.

##### సరళమైన ఆట సమతుల్యతను పరీక్షించడం

[testTheBalanceOfASimpleGame.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (te):** నియమాలు ఆటను న్యాయంగా, సవాలుగా, పూర్తి చేయగలిగేలా చేస్తున్నాయో పరీక్షించండి.

#### విధానపరమైన ఉత్పత్తి

Skills: 4

[proceduralGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (te):** సంక్షిప్త నియమాల నుంచి అల్గోరిథమ్‌లు అనేక రకాల కంటెంట్‌ను ఎలా సృష్టిస్తాయో తెలుసుకోండి.

##### వనరుల నిల్వ, ఉత్పత్తిని పోల్చడం

[compareResourceStorageAndGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (te):** విధానపరమైన ఉత్పత్తి ఆదా చేసే నిల్వ స్థలాన్ని దానికి అవసరమైన గణనతో పోల్చండి.

##### జనరేటర్ పరామితులను అమర్చడం

[configureGeneratorParameters.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (te):** ఫలితం రూపాన్ని లేదా పరిమాణాన్ని నియంత్రించేందుకు జనరేటర్ సెట్టింగ్‌లను మార్చండి.

##### విధానపరమైన వనరుల ఉత్పత్తిని వివరించడం

[explainProceduralResourceGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (te):** పూర్తయిన ప్రతి రూపాన్ని నిల్వ చేయకుండా జనరేటర్ వనరులను ఎలా సృష్టిస్తుందో వివరించండి.

##### జనరేషన్ సీడ్‌తో ఫలితాలను తిరిగి ఉత్పత్తి చేయడం

[reproduceResultsUsingAGenerationSeed.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (te):** స్థిరమైన సీడ్, మారని నియమాలు ఒకే ఫలితాన్ని మళ్లీ ఎలా ఉత్పత్తి చేస్తాయో అర్థం చేసుకోండి.

### డిజిటల్ ఉత్పత్తి వినియోగదారు అనుభవం

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (te):** సులభంగా అర్థమయ్యే, నావిగేట్ చేయగల, అందరికీ అందుబాటులో ఉండే డిజిటల్ అనుభవాలను రూపొందించండి.

#### ప్రాప్యత

Skills: 2

[accessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (te):** వేర్వేరు సామర్థ్యాలు, ఇన్‌పుట్ పద్ధతులు డిజిటల్ ప్రాప్యతను ఎలా ప్రభావితం చేస్తాయో తెలుసుకోండి.

##### వివిధ సామర్థ్యాలు ఉన్న వినియోగదారుల అవసరాలను గుర్తించడం

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (te):** కీబోర్డు, పెద్ద అక్షరాలు లేదా సహాయక సాంకేతికతను ఉపయోగించే వారి అవసరాలను గుర్తించండి.

##### డిజిటల్ పరస్పర చర్య ప్రాప్యతను పరీక్షించడం

[testDigitalInteractionAccessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (te):** మౌస్ లేదా శబ్దం లేకుండా ఇంటర్‌ఫేస్‌ను పరీక్షించి అడ్డంకులను నమోదు చేయండి.

#### డిజిటల్ పరస్పర చర్య రూపకల్పన

Skills: 4

[digitalInteractionDesign.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (te):** డిజిటల్ ఇంటర్‌ఫేస్‌లలో సహజమైన చర్యలు, ఉపయోగకరమైన ప్రతిస్పందనలను ప్రణాళిక చేయండి.

##### డిజిటల్ ఇంటర్‌ఫేస్ ప్రతిస్పందనను రూపొందించడం

[designDigitalInterfaceFeedback.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (te):** బటన్‌లు, లోడ్ అవుతున్న స్థితులు, లోపాలు అర్థమయ్యే ప్రతిస్పందన ఇవ్వేలా చేయండి.

##### డిజిటల్ ఇంటర్‌ఫేస్ నావిగేషన్‌ను రూపొందించడం

[designDigitalInterfaceNavigation.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (te):** వ్యక్తులు సరైన చర్యలను కనుగొనేలా తెరలు, నావిగేషన్‌ను అమర్చండి.

##### డిజిటల్ ఉత్పత్తి వినియోగదారి లక్ష్యాన్ని గుర్తించడం

[identifyADigitalProductUsersGoal.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (te):** ఒక వ్యక్తి యాప్ లేదా డిజిటల్ పరికరంతో ఏమి సాధించాలనుకుంటున్నారో గుర్తించండి.

##### సాధారణ డిజిటల్ పరస్పర చర్య లోపాలను నివారించడం

[preventCommonDigitalInteractionErrors.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (te):** నివారించగలిగే తప్పులను అరికట్టేందుకు లేబుళ్లు, ధృవీకరణ, నిర్ధారణను ఉపయోగించండి.

#### అనుభవ మూల్యాంకనం మరియు నైతికత

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (te):** వినియోగదారు పరీక్షలు, నిజాయితీగల రూపకల్పన డిజిటల్ ఉత్పత్తులను ఎలా మెరుగుపరుస్తాయో తెలుసుకోండి.

##### మోసపూరిత ఇంటర్‌ఫేస్ నమూనాలను గుర్తించడం

[identifyManipulativeInterfacePatterns.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (te):** ఖర్చులను దాచే, ఎంపికలను బలవంతం చేసే లేదా రద్దును అడ్డుకునే ఇంటర్‌ఫేస్ చిట్కాలను గుర్తించండి.

##### డిజిటల్ ఇంటర్‌ఫేస్ వినియోగ సౌలభ్యాన్ని పరీక్షించడం

[testDigitalInterfaceUsability.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (te):** అదనపు సూచనలు లేకుండా ఒక వ్యక్తి నిజమైన పనిని పూర్తి చేయగలరా గమనించండి.

### డిజిటల్ భద్రత, బాధ్యత

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (te):** సమాచారాన్ని రక్షించడం, ఇతరులను గౌరవించడం, డిజిటల్ సాంకేతికత ప్రభావాలను అర్థం చేసుకోవడం నేర్చుకోండి.

#### ఖాతా రక్షణ

Skills: 9

[accountProtection.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (te):** ఖాతాలను రక్షించడం, అనుమానాస్పద సందేశాలకు స్పందించడం తెలుసుకోండి.

##### ఈమెయిల్ పంపినవారి నిజస్వరూపాన్ని అంచనా వేయడం

[assessAnEmailSendersAuthenticity.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (te):** కనిపించే పేరు లేదా చిత్రంతోనే ఆగకుండా పంపినవారి గుర్తింపును తనిఖీ చేయండి.

##### లింక్‌ను తెరవడంలో ప్రమాదాన్ని అంచనా వేయడం

[assessTheRiskOfFollowingALink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (te):** అనుమానాస్పద లింక్ తెరిస్తే ఏమి జరగవచ్చో అంచనా వేయండి.

##### బహుళ కారకాల ధృవీకరణను ఏర్పాటు చేయడం

[configureMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (te):** అదనపు లాగిన్ ధృవీకరణ అంశాన్ని ఆన్ చేసి సురక్షిత ఖాతా పునరుద్ధరణకు ప్రణాళిక చేయండి.

##### బలమైన పాస్‌ఫ్రేజ్‌ను సృష్టించడం

[createAStrongPassphrase.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (te):** ప్రతి ఖాతాకు వేర్వేరుగా, పొడవుగా, ఊహించడం కష్టమైన పాస్‌ఫ్రేజ్‌లను తయారు చేయండి.

##### బహుళ కారకాల ధృవీకరణను వివరించడం

[explainMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (te):** రెండవ స్వతంత్ర ధృవీకరణ అంశం ఖాతాను ఎలా రక్షిస్తుందో అర్థం చేసుకోండి.

##### సాఫ్ట్‌వేర్ నవీకరణల ప్రాముఖ్యతను వివరించడం

[explainWhySoftwareUpdatesMatter.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (te):** అధికారిక సాఫ్ట్‌వేర్ నవీకరణలు భద్రతా లోపాలను ఎలా సరిచేస్తాయో తెలుసుకోండి.

##### ఫిషింగ్ సందేశాన్ని గుర్తించడం

[recognizeAPhishingMessage.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (te):** పాస్‌వర్డ్‌లు లేదా కోడ్‌లు దొంగిలించడానికి ఇతరుల్లా నటించే సందేశాలను గుర్తించండి.

##### అనుమానాస్పద డిజిటల్ సంప్రదింపుకు స్పందించడం

[respondToSuspiciousDigitalContact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (te):** అనుమానాస్పద సంప్రదింపులకు సురక్షితంగా స్పందించి వేరొక మార్గంలో అభ్యర్థనను ధృవీకరించండి.

##### వెబ్‌సైట్ డొమైన్‌ను తనిఖీ చేయడం

[verifyAWebsitesDomain.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (te):** వెబ్ చిరునామాలో నిజమైన డొమైన్‌ను చదివి మోసపూరిత పోలికల్ని గుర్తించండి.

#### డిజిటల్ పరస్పర చర్యల నైతికత

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (te):** గౌరవంగా సంభాషించడం, సృష్టికర్తల అనుమతులను పాటించడం నేర్చుకోండి.

##### డిజిటల్ వస్తువుల మూలాన్ని పేర్కొనడం

[attributeDigitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (te):** మీరు ఉపయోగించే డిజిటల్ కంటెంట్ అసలు సృష్టికర్తకు గుర్తింపు ఇవ్వండి.

##### సమస్యను సురక్షితంగా నివేదించే మార్గాన్ని ఎంచుకోవడం

[chooseASafeWayToReportAProblem.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (te):** ఆన్‌లైన్ సమస్యను నివేదించడానికి నమ్మదగిన వ్యక్తిని లేదా అధికారిక మార్గాన్ని ఎంచుకోండి.

##### డిజిటల్ కంటెంట్ లైసెన్సులను వేరు చేయడం

[distinguishDigitalContentLicenses.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (te):** కాపీరైట్ పరిమితులు, ఓపెన్ లైసెన్సులు, పబ్లిక్ డొమైన్ కంటెంట్ మధ్య తేడాలను గుర్తించండి.

##### సరైన ఆన్‌లైన్ ప్రవర్తనను గుర్తించడం

[identifyAppropriateOnlineBehavior.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (te):** డిజిటల్ సంభాషణలో బెదిరింపులు, వేధింపులు, బెదిరించి బాధించడాన్ని గుర్తించండి.

#### గోప్యత

Skills: 5

[privacy.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (te):** ఆన్‌లైన్‌లో సమాచారం పంచుకోవడం గోప్యతను ఎలా ప్రభావితం చేస్తుందో తెలుసుకోండి.

##### సురక్షిత డేటా పంచుకునే మార్గాలను ఎంచుకోవడం

[chooseSafeDataSharingMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (te):** సున్నితమైన సమాచారం ఎవరికి అందించాలి, ఎలా సురక్షితంగా పంచుకోవాలో నిర్ణయించండి.

##### ప్రైవేట్ చాట్‌ను పబ్లిక్ లింక్ నుంచి వేరు చేయడం

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (te):** పంచుకున్న చాట్ లేదా పత్రాన్ని ఎవరు తెరవగలరో తనిఖీ చేయండి; లింక్ ప్రైవేట్ అని అనుకోకండి.

##### డేటా పునర్గుర్తింపును వివరించడం

[explainDataReIdentification.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (te):** వేర్వేరుగా సేకరించిన వివరాలను కలిపి వ్యక్తిని మళ్లీ ఎలా గుర్తించవచ్చో వివరించండి.

##### వ్యక్తిగత డేటాను గుర్తించడం

[identifyPersonalData.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (te):** ఇతర వివరాలతో కలిపినా వ్యక్తిని గుర్తించగల సమాచారాన్ని గుర్తించండి.

##### డిజిటల్ అడుగుజాడను గుర్తించడం

[recognizeADigitalFootprint.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (te):** ఆన్‌లైన్ పోస్టులు, చర్యలు చాలా కాలం నిలిచే రికార్డులను ఎలా వదులుతాయో అర్థం చేసుకోండి.

#### కంప్యూటింగ్ సామాజిక, పర్యావరణ ప్రభావాలు

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (te):** కంప్యూటింగ్ న్యాయం, వనరుల వినియోగం, పర్యావరణాన్ని ఎలా ప్రభావితం చేస్తుందో తెలుసుకోండి.

##### వినియోగదారు సమూహాలపై అల్గోరిథం ప్రభావాన్ని అంచనా వేయడం

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (te):** వేర్వేరు సమూహాలకు అల్గోరిథం అన్యాయమైన ఫలితాలు ఇస్తుందా అని పరిశీలించండి.

##### కంప్యూటింగ్ పర్యావరణ ప్రభావాన్ని అంచనా వేయడం

[assessComputingsEnvironmentalImpact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (te):** కంప్యూటింగ్‌కు సంబంధించిన శక్తి, పదార్థాలు, ఎలక్ట్రానిక్ వ్యర్థాల ప్రభావాలను పోల్చండి.

### డిజిటల్ వ్యవస్థలు మరియు నెట్‌వర్క్‌లు

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (te):** కంప్యూటింగ్ పరికరాలు, డిజిటల్ సమాచారం, నెట్‌వర్క్‌లు కలిసి ఎలా పనిచేస్తాయో తెలుసుకోండి.

#### డిజిటల్ పరికర భాగాలు

Skills: 3

[digitalDeviceComponents.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (te):** హార్డ్‌వేర్ భాగాలు, సాఫ్ట్‌వేర్ వేర్వేరు కంప్యూటింగ్ పనులను ఎలా నిర్వహిస్తాయో తెలుసుకోండి.

##### హార్డ్‌వేర్, సాఫ్ట్‌వేర్‌లను వేరు చేయడం

[distinguishHardwareFromSoftware.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (te):** కంప్యూటర్ భౌతిక భాగాలను వాటిని నియంత్రించే సాఫ్ట్‌వేర్ నుంచి వేరు చేయండి.

##### ప్రాసెసర్ పనితీరును వివరించడం

[explainAProcessorsFunction.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (te):** ఫైళ్లను శాశ్వతంగా నిల్వ చేయడం కాకుండా ప్రాసెసర్ ఆదేశాలను ఎలా అమలు చేస్తుందో వివరించండి.

##### డిజిటల్ పరికరాలను గుర్తించడం

[identifyDigitalDevices.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (te):** ప్రోగ్రామ్ చేయగల డిజిటల్ సమాచారాన్ని ప్రాసెస్ చేసే పరికరాలను గుర్తించండి.

#### మెమరీ మరియు నిల్వ

Skills: 4

[memoryAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (te):** తాత్కాలిక మెమరీ, ఫర్మ్‌వేర్ మెమరీ, ఫైల్ నిల్వ వేర్వేరుగా ఏమి చేస్తాయో తెలుసుకోండి.

##### RAM, ROM, నిల్వను వేరు చేయడం

[distinguishRAMROMAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (te):** RAM, ROM, శాశ్వత నిల్వ ఏ రకమైన సమాచారాన్ని ఉంచేందుకు రూపొందించబడ్డాయో పోల్చండి.

##### శాశ్వత నిల్వను వివరించడం

[explainPersistentStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (te):** విద్యుత్తు ఆపిన తర్వాత కూడా నిల్వ పరికరాలు ఫైళ్లను ఎందుకు కాపాడుతాయో అర్థం చేసుకోండి.

##### RAMను వివరించడం

[explainRAM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (te):** కంప్యూటర్ నడుస్తున్నప్పుడు RAM పని సమాచారాన్ని ఎలా ఉంచుతుందో తెలుసుకోండి.

##### ROM ఉద్దేశాన్ని వివరించడం

[explainThePurposeOfROM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (te):** విద్యుత్తు లేకున్నా సమాచారాన్ని నిలుపుకునే ఫర్మ్‌వేర్ మెమరీ పరికరాల ప్రారంభానికి ఎలా తోడ్పడుతుందో గుర్తించండి.

#### నెట్‌వర్క్ నమూనాలు మరియు ప్రోటోకాల్‌లు

Skills: 11

[networkModelsAndProtocols.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (te):** సమాచారం పంపే నియమాలను నెట్‌వర్క్ ప్రోటోకాల్‌లు ఎలా నిర్ణయిస్తాయో తెలుసుకోండి.

##### నెట్‌వర్క్ ప్రవేశ పద్ధతులను పోల్చడం

[compareNetworkAccessMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (te):** ఢీకొనడాన్ని గుర్తించడం, నివారించడం, టోకెన్ పంపడం వంటి పద్ధతులను వాటి తగిన సందర్భాల్లో పోల్చండి.

##### HTTP, HTTPS మధ్య తేడాను గుర్తించడం

[distinguishHTTPFromHTTPS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (te):** HTTPS దేనిని రక్షిస్తుంది, వెబ్‌సైట్ నమ్మదగినదని ఎందుకు హామీ ఇవ్వదో తెలుసుకోండి.

##### OSI, TCP/IP మధ్య తేడాను గుర్తించడం

[distinguishOSIFromTCPIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (te):** OSI భావనాత్మక పొరలను ఇంటర్నెట్ TCP/IP ప్రోటోకాల్ స్టాక్‌తో పోల్చండి.

##### TCP, UDP మధ్య తేడాను గుర్తించడం

[distinguishTCPFromUDP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (te):** నమ్మకమైన TCP డేటా ప్రవాహాలను అవే హామీలు లేని UDP సందేశాలతో పోల్చండి.

##### నెట్‌వర్క్ ప్రోటోకాల్‌ను వివరించడం

[explainANetworkProtocol.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (te):** సందేశాలను పరస్పరం పంపుకోవడానికి పరికరాలకు అంగీకరించిన నియమాలు ఎందుకు అవసరమో వివరించండి.

##### CSMA/CAను వివరించడం

[explainCSMACA.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (te):** బిజీగా ఉన్న ఛానెల్‌లో ప్రసారం చేయకుండా వైర్‌లెస్ పరికరాలు ఎలా ప్రయత్నిస్తాయో వివరించండి.

##### CSMA/CDను వివరించడం

[explainCSMACD.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (te):** పాత భాగస్వామ్య ఈథర్నెట్ నెట్‌వర్క్‌లకు ఢీకొనడాన్ని గుర్తించడం ఎందుకు అవసరమో తెలుసుకోండి.

##### DNSను వివరించడం

[explainDNS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (te):** డొమైన్ పేర్ల నుంచి నెట్‌వర్క్ చిరునామాలను కనుగొనడంలో DNS ఎలా సహాయపడుతుందో వివరించండి.

##### OSI పొరలను వివరించడం

[explainTheOSILayers.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (te):** నెట్‌వర్క్ విధులను క్రమబద్ధీకరించడానికి ఏడు పొరల OSI నమూనాను ఉపయోగించండి.

##### IP ఉద్దేశాన్ని వివరించడం

[explainThePurposeOfIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (te):** నెట్‌వర్క్‌ల మధ్య ప్యాకెట్లకు IP చిరునామా ఇచ్చి ఎలా ముందుకు పంపుతుందో అర్థం చేసుకోండి.

##### టోకెన్ రింగ్‌ను వివరించడం

[explainTokenRing.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (te):** టోకెన్‌ను ఒకరి నుంచి మరొకరికి పంపి ఏ పరికరం డేటా పంపవచ్చో ఎలా నియంత్రిస్తారో తెలుసుకోండి.

#### నెట్‌వర్క్‌లు

Skills: 4

[networks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (te):** అనుసంధానమైన పరికరాలు సందేశాలను ఎలా పంపుతాయో, వనరులను ఎలా పంచుకుంటాయో తెలుసుకోండి.

##### ఇంటర్నెట్‌ను వెబ్ నుంచి వేరు చేయడం

[distinguishTheInternetFromTheWeb.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (te):** ఇంటర్నెట్ నెట్‌వర్క్ మౌలిక సదుపాయాలను వెబ్‌లోని వెబ్‌సైట్ల నుంచి వేరు చేయండి.

##### నెట్‌వర్క్ సందేశ పంపిణీని వివరించడం

[explainNetworkMessageDelivery.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (te):** సందేశాలు నెట్‌వర్క్ పరికరాల గుండా గమ్యస్థానానికి ఎలా చేరుతాయో గమనించండి.

##### కంప్యూటర్ నెట్‌వర్క్ ఉద్దేశాన్ని వివరించడం

[explainThePurposeOfAComputerNetwork.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (te):** సమాచారం పరస్పరం పంపుకోవడానికి వేర్వేరు పరికరాలను నెట్‌వర్క్ ఎందుకు కలుపుతుందో వివరించండి.

##### వైర్‌లెస్ కమ్యూనికేషన్‌ను వివరించడం

[explainWirelessCommunication.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (te):** నేరుగా కేబుళ్లు లేకుండా సంకేతాల ద్వారా పరికరాలు ఎలా సంభాషిస్తాయో తెలుసుకోండి.

#### సంఖ్యా వ్యవస్థలు

Skills: 4

[numeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (te):** వేర్వేరు ఆధారాలు గల వ్యవస్థల్లో అంకెలు సంఖ్యలను ఎలా సూచిస్తాయో నేర్చుకోండి.

##### బైనరీ, దశాంశాల మధ్య మార్చడం

[convertBetweenBinaryAndDecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (te):** చిన్న సంఖ్యలను బైనరీ, దశాంశ రూపాల మధ్య మార్చండి.

##### బైనరీ, హెక్సాడెసిమల్‌లను వేరు చేయడం

[distinguishBinaryAndHexadecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (te):** హెక్సాడెసిమల్ ద్వారా బిట్‌ల సమూహాలను మరింత సంక్షిప్తంగా ఎందుకు రాయవచ్చో అర్థం చేసుకోండి.

##### కంప్యూటర్ ద్విసంఖ్యా తర్కాన్ని వివరించడం

[explainComputerBinaryLogic.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (te):** బైనరీ సున్నా, ఒకటి విలువలను వేరుగా గుర్తించగల ఎలక్ట్రానిక్ సంకేత స్థితులతో అనుసంధానించండి.

##### స్థాన విలువ సంఖ్యా వ్యవస్థలను వివరించడం

[explainPositionalNumeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (te):** సంఖ్యలో అంకె స్థానం మారితే దాని విలువ ఎందుకు మారుతుందో అర్థం చేసుకోండి.

#### ఆపరేటింగ్ సిస్టమ్‌లు

Skills: 4

[operatingSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (te):** ఆపరేటింగ్ సిస్టమ్‌లు ప్రోగ్రామ్‌లు, ఫైళ్లు, పరికరాలను ఎలా నిర్వహిస్తాయో తెలుసుకోండి.

##### ఆపరేటింగ్ సిస్టమ్ కుటుంబాలను వేరు చేయడం

[distinguishOperatingSystemFamilies.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (te):** సాధారణ ఆపరేటింగ్ సిస్టమ్ కుటుంబాలను, వాటి తేడాలను గుర్తించండి.

##### ఆపరేటింగ్ సిస్టమ్ ప్రాసెస్‌ను వివరించడం

[explainAnOSProcess.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (te):** నడుస్తున్న ప్రాసెస్‌ను డిస్క్‌లో నిల్వ ఉన్న ప్రోగ్రామ్ ఫైల్ నుంచి వేరు చేయండి.

##### ఆపరేటింగ్ సిస్టమ్ ఉద్దేశాన్ని వివరించడం

[explainAnOperatingSystemsPurpose.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (te):** ఆపరేటింగ్ సిస్టమ్ సాఫ్ట్‌వేర్, హార్డ్‌వేర్‌లను ఎలా సమన్వయపరుస్తుందో అర్థం చేసుకోండి.

##### Linuxలో లైనస్ టోర్వాల్డ్స్ పాత్రను వివరించడం

[explainLinusTorvaldsRoleInLinux.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (te):** Linux కెర్నెల్ ఎలా ప్రారంభమైంది, అనేకమంది సహకారులు ఆపరేటింగ్ సిస్టమ్‌లను ఎందుకు అభివృద్ధి చేస్తారో తెలుసుకోండి.

#### ప్రాతినిధ్యం మరియు నిల్వ

Skills: 4

[representationAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (te):** పరికరాలు సమాచారాన్ని ఎలా సూచిస్తాయో, నిల్వ చేసిన ఫైళ్లను ఎలా అమర్చుతాయో నేర్చుకోండి.

##### డిజిటల్ ఫైళ్ల పరిమాణాలను పోల్చడం

[compareDigitalFileSizes.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (te):** ఫైల్ పరిమాణాలను పోల్చి, ఫార్మాట్ మరియు కుదింపు వల్ల తేడా ఎందుకు వస్తుందో వివరించండి.

##### డిజిటల్ ఫార్మాట్‌లను వేరు చేయడం

[distinguishDigitalFormats.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (te):** నిల్వ చేసిన బిట్‌లను ఎలా అర్థం చేసుకోవాలో ఫైల్ ఫార్మాట్ నిర్ణయిస్తుందని గుర్తించండి.

##### ద్విసంఖ్యా ప్రాతినిధ్యాన్ని వివరించడం

[explainBinaryRepresentation.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (te):** సున్నాలు, ఒకట్ల వరుసలు వేర్వేరు రకాల డేటాను ఎలా సంకేతీకరిస్తాయో అర్థం చేసుకోండి.

##### డైరెక్టరీల్లో ఫైళ్లను అమర్చడం

[organizeFilesInDirectories.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (te):** ఫైళ్లను వాటి మార్గాల ద్వారా కనుగొనగలిగేలా తగిన ఫోల్డర్లలో అమర్చండి.

#### పనుల అమలు

Skills: 3

[taskExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (te):** పనులు మారుమారుగా కొనసాగడానికీ నిజంగా ఒకేసారి జరగడానికీ తేడాను తెలుసుకోండి.

##### స్వతంత్ర పనులను నిర్వాహకాలకు పంచడం

[distributeIndependentTasksAcrossExecutors.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (te):** ఏ పనులు కలిసే నడవవచ్చు, ఏవి ఇతర ఫలితాల కోసం వేచి ఉండాలో ప్రణాళిక రూపొందించండి.

##### కన్కరెంట్ అమలును వివరించడం

[explainConcurrentExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (te):** పనులు కచ్చితంగా ఒకే సమయంలో నడవకపోయినా అనేక పనులు ఎలా ముందుకు సాగుతాయో అర్థం చేసుకోండి.

##### సమాంతర అమలును వివరించడం

[explainParallelExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (te):** అనేక ప్రాసెసర్లు నిజంగా ఒకే సమయంలో పని చేస్తున్న సందర్భాలను గుర్తించండి.

### Git మరియు ఓపెన్ సోర్స్

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (te):** డెవలపర్లు మార్పులను గుర్తించడం, కలిసి పనిచేయడం, స్పష్టమైన అనుమతులతో సాఫ్ట్‌వేర్ పంచుకోవడం ఎలాగో తెలుసుకోండి.

#### సహకార డిజిటల్ ఉత్పత్తి అభివృద్ధి

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (te):** బృందాలు సహకారం, సమీక్షలు, ప్రాజెక్టు సంస్కరణలను ఎలా నిర్వహిస్తాయో తెలుసుకోండి.

##### ఉమ్మడి డిజిటల్ ప్రాజెక్టు మార్పులను సమన్వయించడం

[coordinateChangesInASharedDigitalProject.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (te):** ఎవరు ఏది మార్చాలి, ఉమ్మడి మార్పులను ఎలా కలపాలి అనేది ప్రణాళిక చేయండి.

##### సహకార మార్గదర్శకాలను వివరించడం

[explainContributionGuidelines.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (te):** సహకార నియమాలు ఒకే కోడ్‌బేస్‌లో పని చేయడానికి ఎందుకు ఉపయోగపడతాయో అర్థం చేసుకోండి.

##### డిజిటల్ ఉత్పత్తి సంస్కరణలను గుర్తించడం

[trackDigitalProductVersions.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (te):** మార్పులు ఎప్పుడు జరిగాయో తెలుసుకోవడానికి లేదా పాత పనిని పునరుద్ధరించడానికి సంస్కరణ చరిత్రను వాడండి.

#### Git సంస్కరణ నియంత్రణ

Skills: 6

[gitVersionControl.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (te):** Git సంస్కరణలను నమోదు చేయడం, బృందాలు మార్పులను కలపడానికి సహాయపడడం ఎలాగో తెలుసుకోండి.

##### స్థానిక, దూరస్థ రిపోజిటరీలను వేరు చేయడం

[distinguishLocalAndRemoteRepositories.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (te):** నీ కంప్యూటరులోని పని, దూరస్థ రిపోజిటరీలో పంచుకునే ప్రతుల మధ్య తేడా గుర్తించండి.

##### బ్రాంచ్‌ను వివరించడం

[explainABranch.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (te):** బ్రాంచ్‌లు వేర్వేరు మార్పుల మార్గాల్లో పనిచేయడానికి ఎలా వీలు కల్పిస్తాయో అర్థం చేసుకోండి.

##### కమిట్‌ను వివరించడం

[explainACommit.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (te):** కమిట్ అనేది గుర్తింపు ఉన్న, గత పనితో అనుసంధానమైన స్థితి చిత్రం అని గుర్తించండి.

##### పుల్ రిక్వెస్ట్‌ను వివరించడం

[explainAPullRequest.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (te):** పుల్ రిక్వెస్ట్‌లు ప్రతిపాదిత మార్పులను సమీక్ష కోసం ఎలా నిర్వహిస్తాయో తెలుసుకోండి.

##### రిపోజిటరీని వివరించడం

[explainARepository.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (te):** రిపోజిటరీ అనేది మార్పుల చరిత్రతో కూడిన ప్రాజెక్టు అని అర్థం చేసుకోండి.

##### బ్రాంచ్‌ల విలీనాన్ని వివరించడం

[explainBranchMerging.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (te):** బ్రాంచ్‌లు ఎలా కలుస్తాయి, కొన్నిసార్లు సంఘర్షణలు ఎందుకు పరిష్కరించాలో తెలుసుకోండి.

#### ఓపెన్ సోర్స్

Skills: 2

[openSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (te):** సాఫ్ట్‌వేర్ నిజంగా ఓపెన్ సోర్స్ కావడానికి అవసరమైన అనుమతులను తెలుసుకోండి.

##### ఓపెన్ సోర్స్, బహిరంగంగా కనిపించే కోడ్ మధ్య తేడా గుర్తించడం

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (te):** సోర్స్ కోడ్ కనిపిస్తోందని మాత్రమే అది ఓపెన్ సోర్స్ కాదని గుర్తించండి.

##### ఓపెన్ సోర్స్‌ను వివరించడం

[explainOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (te):** ఓపెన్ సోర్స్ లైసెన్సులు సాఫ్ట్‌వేర్ వాడకం, మార్పు, పునర్వితరణను ఎలా అనుమతిస్తాయో అర్థం చేసుకోండి.

### ప్రోగ్రామింగ్ చరిత్ర

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (te):** ప్రోగ్రామింగ్ ఆలోచనలు, కంప్యూటింగ్ యంత్రాలు చరిత్రలో ఎలా అభివృద్ధి చెందాయో తెలుసుకోండి.

#### ముఖ్యమైన కృషులు

Skills: 6

[keyContributions.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (te):** ప్రోగ్రామింగ్, సాఫ్ట్‌వేర్ విశ్వసనీయత, కంప్యూటర్ నెట్‌వర్క్‌లకు కీలక కృషులను తెలుసుకోండి.

##### గణనీయత సిద్ధాంతాన్ని వివరించడం

[explainComputabilityTheory.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (te):** ఆధికారిక నమూనాలు కంప్యూటర్లు ఏవి లెక్కించగలవో, ఏవి చేయలేవో ఎలా చూపుతాయో తెలుసుకోండి.

##### తొలి ఎలక్ట్రానిక్ ప్రోగ్రామింగ్‌ను వివరించడం

[explainEarlyElectronicProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (te):** తొలి ఎలక్ట్రానిక్ కంప్యూటర్ బృందాలు ప్రోగ్రామ్‌లను ఎలా సృష్టించి పరీక్షించాయో తెలుసుకోండి.

##### కంపైలర్ల అభివృద్ధిని వివరించడం

[explainTheDevelopmentOfCompilers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (te):** కంపైలర్లు చదవగలిగే భాషల్లో ప్రోగ్రామ్ రాయడాన్ని ఎలా సులభతరం చేశాయో తెలుసుకోండి.

##### సాఫ్ట్‌వేర్ విశ్వసనీయత అభివృద్ధిని వివరించడం

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (te):** అపోలో మిషన్లలో లోపాల నిర్వహణ, విశ్వసనీయ సాఫ్ట్‌వేర్ ఎందుకు కీలకమో తెలుసుకోండి.

##### నెట్‌వర్క్ లూప్‌ల తొలగింపును వివరించడం

[explainTheEliminationOfNetworkLoops.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (te):** Spanning Tree ప్రోటోకాల్ స్థానిక నెట్‌వర్క్‌లో లూప్‌లను ఎలా నివారిస్తుందో తెలుసుకోండి.

##### ప్రోగ్రామింగ్ మూలాలను వివరించడం

[explainTheOriginsOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (te):** ప్రారంభ యంత్ర రూపకల్పనలు, అడా లవ్‌లేస్ కృషి ప్రోగ్రామింగ్‌కు ఎలా పునాది వేశాయో తెలుసుకోండి.

#### యంత్రాలు, సంకేత విశ్లేషణ

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (te):** చరిత్రలో యంత్రాలు, గణిత పద్ధతులు సంకేత విశ్లేషణకు ఎలా సహాయపడ్డాయో తెలుసుకోండి.

##### చారిత్రక సంకేత విశ్లేషణ పద్ధతులను వివరించడం

[explainHistoricalCryptanalysisMethods.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (te):** సంకేత విశ్లేషకులు నమూనాలు, క్రమబద్ధమైన పరీక్షలతో సంకేతాలను ఎలా ఛేదించారో తెలుసుకోండి.

##### ప్రోగ్రామ్ చేయగల కంప్యూటర్ల అభివృద్ధిని వివరించడం

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (te):** యాంత్రిక గణన ఆలోచనల నుంచి ప్రోగ్రామ్ చేయగల ఎలక్ట్రానిక్ యంత్రాల వరకు అభివృద్ధిని తెలుసుకోండి.

##### బాంబ్ యంత్రం ఉద్దేశాన్ని వివరించడం

[explainThePurposeOfTheBombe.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (te):** బాంబ్ యంత్రం ఎనిగ్మా సాధ్యమైన సెట్టింగ్‌లను పరీక్షించడానికి ఎలా సహాయపడిందో తెలుసుకోండి.

### సమాచారం మరియు డేటా

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (te):** నమ్మదగిన సమాచారం కనుగొనడం, డేటా క్రమబద్ధీకరించడం, అనిశ్చితి గురించి ఆలోచించడం తెలుసుకోండి.

#### డేటా సేకరణ మరియు క్రమబద్ధీకరణ

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (te):** సంబంధిత సమాచారాన్ని సేకరించి పోల్చదగిన రికార్డులను అమర్చడం నేర్చుకోండి.

##### డేటాను స్థిరమైన పద్ధతిలో సేకరించడం

[collectDataConsistently.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (te):** ఒకే నియమాలు, ప్రమాణాలతో కొలతలను సేకరించండి.

##### లక్షణం ప్రకారం డేటాను సమూహాలుగా చేయడం

[groupDataByAttribute.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (te):** ఒక స్పష్టమైన లక్షణంతో రికార్డులను సమూహాలుగా విభజించండి.

##### పనికి అవసరమైన డేటాను గుర్తించడం

[identifyDataNeededForATask.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (te):** ఒక ప్రశ్నకు నిజంగా అవసరమైన ఫీల్డ్‌లు, పరిశీలనలను నిర్ణయించండి.

##### డేటాను పట్టికలో చూపడం

[presentDataInATable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (te):** పేరు పెట్టిన వరుసలు, నిలువు వరుసలు, స్థిరమైన విలువలతో పట్టిక తయారు చేయండి.

#### డేటాబేస్‌లు

Skills: 5

[databases.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (te):** డేటాబేస్‌లు రికార్డులను ఎలా క్రమబద్ధీకరించి సంబంధిత సమాచారాన్ని అనుసంధానిస్తాయో తెలుసుకోండి.

##### సరళమైన డేటాబేస్ స్కీమా రూపొందించడం

[designASimpleDatabaseSchema.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (te):** తగిన ఎంటిటీలు, ఫీల్డ్‌లు, సంబంధాలతో సరళమైన డేటాబేస్ రూపొందించండి.

##### రికార్డులు, ఫీల్డ్‌లను వేరు చేయడం

[distinguishRecordsAndFields.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (te):** ఒక రికార్డును, దానిని వివరించే ఫీల్డ్‌ల నుంచి వేరు చేయండి.

##### డేటాబేస్ పట్టికను వివరించడం

[explainADatabaseTable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (te):** ఒకే రకమైన రికార్డులను పట్టిక ఎలా నిల్వ చేస్తుందో అర్థం చేసుకోండి.

##### ప్రాథమిక కీలను వివరించడం

[explainPrimaryKeys.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (te):** ప్రతి రికార్డుకు స్థిరమైన ప్రత్యేక కీ ఎందుకు అవసరమో వివరించండి.

##### పట్టికల మధ్య సంబంధాలను నమూనా చేయడం

[modelRelationshipsBetweenTables.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (te):** గుర్తింపులను ఉపయోగించి వేర్వేరు పట్టికల సమాచారాన్ని అనుసంధానించండి.

#### సమాచార శోధన మరియు ధృవీకరణ

Skills: 4

[informationSearchAndVerification.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (te):** ఆధారాలు వెతికి ఒక వాదనకు మద్దతు ఉందో లేదో పరీక్షించడం నేర్చుకోండి.

##### సమాచార మూలాలను పోల్చడం

[compareInformationSources.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (te):** పలు మూలాలను పోల్చి వాటి వివరణల్లో భేదాలను గుర్తించండి.

##### సందేశాలను డేటా నుంచి వేరు చేయడం

[distinguishMessagesFromData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (te):** నమోదైన విలువను, సందేశం ఇచ్చే అర్థం నుంచి వేరు చేయండి.

##### సమాచార శోధన ప్రశ్నను రూపొందించడం

[formulateAnInformationQuery.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (te):** కావలసిన సమాచారానికి సరిపోయే నిర్దిష్ట శోధన పదాలను ఎంచుకోండి.

##### మూలంతో వాదనను ధృవీకరించడం

[verifyAClaimAgainstASource.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (te):** పదే పదే చేసిన వాదనలకంటే తగిన ఆధారాలతో ఒక వాదనను పరీక్షించండి.

#### సంభావ్యత మరియు అనిశ్చితి

Skills: 7

[probabilityAndUncertainty.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (te):** జరగగల సంఘటనలు, వాటి అవకాశాలు, అంచనాల పరిమితులను అన్వేషించండి.

##### సరళమైన సంఘటనల సంభావ్యతలను పోల్చడం

[compareProbabilitiesOfSimpleEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (te):** ఒకే ఊహల ఆధారంగా రెండు ఫలితాల అవకాశాలను పోల్చండి.

##### సాధ్యతను సంభావ్యత నుంచి వేరు చేయడం

[distinguishPossibilityFromProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (te):** ఒక సంఘటన జరగగలదంటే అది ఎక్కువగా జరిగే అవకాశం ఉందని కాదని తెలుసుకోండి.

##### యాదృచ్ఛిక మరియు నిర్ణీత సంఘటనలను వేరు చేయడం

[distinguishRandomAndDeterministicEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (te):** నియమంతో నిర్ణయమయ్యే ఫలితాలను యాదృచ్ఛికంగా ఎంచుకున్న వాటి నుంచి వేరు చేయండి.

##### సంఘటన సాధ్యతను వివరించడం

[explainEventPossibility.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (te):** ఇచ్చిన పరిస్థితుల్లో ఒక ఫలితం సాధ్యమా కాదా నిర్ణయించండి.

##### సంఘటన సంభావ్యతను వివరించడం

[explainEventProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (te):** పేర్కొన్న సంభావ్యత నమూనాతో సంఘటన జరిగే అవకాశాన్ని అంచనా వేయండి.

##### అంచనా పరిమితులను వివరించడం

[explainLimitsOfPrediction.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (te):** సంభావ్యత తెలిసినా ఒక్క ప్రయత్నపు ఫలితాన్ని ఎందుకు ముందే చెప్పలేమో వివరించండి.

##### నమూనాలో యాదృచ్ఛికతను ఉపయోగించడం

[useRandomnessInAModel.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (te):** జరగగల ఫలితాలను నిర్ణయిస్తూ నమూనాలో యాదృచ్ఛిక ఎంపికలను చేర్చండి.

#### గణాంక పరిశోధన

Skills: 4

[statisticalInvestigation.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (te):** గ్రాఫ్‌లు, పౌనఃపున్యాలు, పోలికలతో డేటాను పరిశీలించడం నేర్చుకోండి.

##### పరిశీలనల సమూహాలను పోల్చడం

[compareSetsOfObservations.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (te):** ఒకే కొలతలు లేదా వర్గాలతో రెండు డేటా సమూహాలను పోల్చండి.

##### సరళమైన గ్రాఫ్ తయారు చేయడం

[constructASimpleChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (te):** డేటా నిష్పత్తులను ఖచ్చితంగా చూపించే స్పష్టమైన గ్రాఫ్ రూపొందించండి.

##### అత్యంత తరచుగా వచ్చే విలువ కనుగొనడం

[findTheMostFrequentValue.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (te):** ఒక సమూహంలో అత్యధిక సార్లు కనిపించే విలువను గుర్తించండి.

##### గ్రాఫ్ చదవడం

[readAChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (te):** చూపించే విధానంతో తప్పుదోవ పట్టకుండా స్కేళ్లు, లేబుళ్లు, విలువలను చదవండి.

### ప్రోగ్రామింగ్

Groups: 8 · Skills: 37

[programming.data.ts](../../../learningApps/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (te):** కంప్యూటర్ అమలు చేసే ఆదేశాలను అర్థం చేసుకోవడం, రాయడం, పరీక్షించడం నేర్చుకోండి.

#### డేటా రకాలు మరియు రిఫరెన్స్‌లు

Skills: 6

[dataTypesAndReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (te):** రకాలు, రిఫరెన్స్‌లు ప్రోగ్రామ్‌లు ఉపయోగించగల విలువలపై ఎలా ప్రభావం చూపుతాయో తెలుసుకోండి.

##### విలువ కాపీని, పంచుకున్న రిఫరెన్స్‌ను వేరు చేయడం

[distinguishValueCopyingFromSharedReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (te):** రెండు చరరాశులు ఒకే ఆబ్జెక్ట్‌ను ఎప్పుడు పంచుకుంటాయి, విలువలు ఎప్పుడు స్వతంత్రంగా ఉంటాయో వివరించండి.

##### విలువల రకాలను వేరు చేయడం

[distinguishValueTypes.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (te):** విలువ సంఖ్యా, వచన, బూలియన్ రకమా, దానితో ఏం చేయవచ్చో గుర్తించండి.

##### డేటా రకం ఒప్పందాన్ని వివరించడం

[explainADataTypeContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (te):** ఒక ప్రోగ్రామ్ ఫంక్షన్ ఎలాంటి విలువను స్వీకరించాలని ఆశిస్తుందో అర్థం చేసుకోండి.

##### మిశ్రమ డేటా నిర్మాణాలను వివరించడం

[explainCompositeDataStructures.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (te):** అనేక విలువలను అమర్చే జాబితాలు, అర్రేలు, రికార్డులను గుర్తించండి.

##### ప్రోగ్రామింగ్ భాషలో ప్రాథమిక విలువలను వివరించడం

[explainPrimitiveValuesInALanguage.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (te):** ఎంచుకున్న ప్రోగ్రామింగ్ భాష నిర్వచించిన సరళ విలువ రకాలను గుర్తించండి.

##### ఒప్పందానికి అనుగుణంగా డేటాను ధృవీకరించడం

[validateDataAgainstAContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (te):** ఇన్‌పుట్‌ను ఉపయోగించే ముందు అది అవసరమైన రకం లేదా నిర్మాణానికి సరిపోతుందో తనిఖీ చేయండి.

#### ఫంక్షన్‌లు మరియు పునర్వినియోగం

Skills: 5

[functionsAndReuse.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (te):** మళ్లీ ఉపయోగించగల చర్యలను ఫంక్షన్‌లుగా రూపొందించడం నేర్చుకోండి.

##### ఆర్గ్యుమెంట్లతో ఫంక్షన్‌ను పిలవడం

[callAFunctionWithArguments.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (te):** ఆర్గ్యుమెంట్లతో ఫంక్షన్‌ను పిలిచి అవి ఎలా ఉపయోగించబడుతున్నాయో గమనించండి.

##### పారామీటర్లతో ఫంక్షన్‌ను నిర్వచించడం

[defineAFunctionWithParameters.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (te):** స్థిర ఉదాహరణ విలువలకు బదులుగా పారామీటర్లను స్వీకరించే ఫంక్షన్‌ను రాయండి.

##### రికర్షన్‌ను వివరించడం

[explainRecursion.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (te):** రికర్షివ్ ఫంక్షన్ చిన్న సమస్యలను పరిష్కరించి చివరకు ఎలా ఆగుతుందో అర్థం చేసుకోండి.

##### ఫంక్షన్ ఉద్దేశాన్ని వివరించడం

[explainThePurposeOfAFunction.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (te):** పేరు ఉన్న ఫంక్షన్‌ను పిలిచినప్పుడు అది చర్యను ఎలా నిర్వహిస్తుందో వివరించండి.

##### ఫంక్షన్ తిరిగి ఇచ్చే విలువను ఉపయోగించడం

[useAFunctionsReturnValue.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (te):** తిరిగి వచ్చిన ఫలితాన్ని చూపడమే కాకుండా తదుపరి లెక్కింపుల్లో ఉపయోగించండి.

#### ప్రోగ్రామ్ డేటా

Skills: 3

[programData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (te):** నడుస్తున్న ప్రోగ్రామ్‌లో ఉపయోగించే విలువలు, మారుతున్న స్థితితో పనిచేయండి.

##### ప్రోగ్రామ్ స్థితిని నవీకరించడం

[updateProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (te):** ముందు జరిగిన దాని ఆధారంగా ప్రోగ్రామ్‌లో నిల్వ ఉన్న స్థితిని మార్చండి.

##### చరరాశిని ఉపయోగించడం

[useAVariable.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (te):** విలువను ఒక చరరాశి పేరుతో నిల్వ చేసి అవసరమైనప్పుడు చదవండి.

##### ఇన్‌పుట్ డేటాను ఉపయోగించడం

[useInputData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (te):** ప్రోగ్రామ్ బయట నుంచి ఇచ్చిన సమాచారంతో దాని ప్రవర్తనను నిర్ణయించండి.

#### ప్రోగ్రామ్ నిర్మాణం మరియు వాక్యనిర్మాణం

Skills: 4

[programStructureAndSyntax.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (te):** ప్రోగ్రామింగ్ భాషలు కీవర్డులు, వ్యక్తీకరణలు, బ్లాక్‌లను ఎలా అమర్చుతాయో నేర్చుకోండి.

##### కీవర్డ్లు, గుర్తింపుదారులను వేరు చేయడం

[distinguishKeywordsFromIdentifiers.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (te):** భాషలోని ప్రత్యేక పదాలను ప్రోగ్రామర్లు ఎంచుకున్న పేర్ల నుంచి వేరు చేయండి.

##### ఆపరేటర్లు, వ్యక్తీకరణలు, స్టేట్‌మెంట్లను వేరు చేయడం

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (te):** ఆపరేటర్లు, వ్యక్తీకరణలు, స్టేట్‌మెంట్ల మధ్య తేడాను గుర్తించండి.

##### స్టేట్‌మెంట్ బ్లాక్ హద్దులను వివరించడం

[explainStatementBlockBoundaries.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (te):** ఏ ఆదేశాలు లూప్, ఫంక్షన్ లేదా షరతు బ్లాక్‌లో ఉన్నాయో కనుగొనండి.

##### సింటాక్స్ హైలైటింగ్‌ను వివరించడం

[explainSyntaxHighlighting.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (te):** కోడ్ రంగులు ఏం సూచిస్తాయి, ఏం నిరూపించలేవో అర్థం చేసుకోండి.

#### ప్రోగ్రామింగ్ నిర్మాణాలు

Skills: 7

[programmingConstructs.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (te):** క్రమాలు, షరతులు, లూప్‌లు, సంఘటనలతో ప్రోగ్రామ్‌లను నియంత్రించడం నేర్చుకోండి.

##### అంతులేని లూప్‌ను గుర్తించడం

[detectAnInfiniteLoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (te):** షరతు ఎప్పటికీ తప్పు కాకపోవడం వల్ల ఆగని లూప్‌ను కనుగొనండి.

##### ఘటనను నిర్వహించడం

[handleAnEvent.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (te):** బటన్ నొక్కినప్పుడు, సందేశం వచ్చినప్పుడు లేదా ఇతర సంఘటన జరిగినప్పుడు ప్రోగ్రామ్ స్పందించేలా చేయండి.

##### లూప్‌ను అమలు చేయడం

[implementALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (te):** సరైన ఆపే షరతు వచ్చే వరకు ఆదేశాలను పునరావృతం చేయడానికి లూప్‌ను ఉపయోగించండి.

##### షరతులపై ఆధారపడి ప్రవర్తనను అమలు చేయడం

[implementConditionalBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (te):** షరతులు మారినప్పుడు ప్రోగ్రామ్ వేర్వేరు చర్యలను ఎంచుకునేలా చేయండి.

##### లూప్‌లో మారని లెక్కింపులను లూప్ బయటకు మార్చడం

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (te):** పునరావృతంలో మారని లెక్కింపులను లూప్ బయటకు తరలించండి.

##### ఒకదానితో ఒకటి సరిపడే షరతు తనిఖీల క్రమాన్ని నిర్ణయించడం

[orderOverlappingConditionalChecks.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (te):** ప్రత్యేక సందర్భాలను కూడా చేరుకునేలా షరతుల తనిఖీల క్రమాన్ని అమర్చండి.

##### ఆదేశాల వరుసను రాయడం

[writeASequenceOfCommands.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (te):** చర్యలను అనుకున్న క్రమంలో నిర్వహించే సరైన ఆదేశాలను రాయండి.

#### ప్రోగ్రామింగ్ పారడైమ్‌లు

Skills: 4

[programmingParadigms.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (te):** ప్రోగ్రామ్ తర్కం, ప్రవర్తనను నిర్వహించే వేర్వేరు మార్గాలను తెలుసుకోండి.

##### ఇంపెరేటివ్, డిక్లరేటివ్ పద్ధతులను వేరు చేయడం

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (te):** స్పష్టమైన ఆదేశాలు ఇవ్వడాన్ని, కోరుకున్న ఫలితాన్ని వివరించడాన్ని పోల్చండి.

##### ఫంక్షనల్ ప్రోగ్రామింగ్‌ను వివరించడం

[explainFunctionalProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (te):** ఫంక్షన్‌లను కలిపి విలువలను మార్చే ప్రోగ్రామ్‌లను అర్థం చేసుకోండి.

##### ఆబ్జెక్ట్ ఆధారిత ప్రోగ్రామింగ్‌ను వివరించడం

[explainObjectOrientedProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (te):** స్థితి, ప్రవర్తన కలిగి పరస్పరం పనిచేసే ఆబ్జెక్టులతో రూపొందిన ప్రోగ్రామ్‌లను తెలుసుకోండి.

##### ప్రొసీజరల్ ప్రోగ్రామింగ్‌ను వివరించడం

[explainProceduralProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (te):** దశలవారీ విధానాల ఆధారంగా రూపొందిన ప్రోగ్రామ్‌లను తెలుసుకోండి.

#### ప్రోగ్రామ్‌లను చదవడం

Skills: 4

[readingPrograms.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (te):** ప్రోగ్రామ్‌ను చదివి అది ఏం చేస్తుందో అనుసరించడం తెలుసుకోండి.

##### ఒక ఆదేశం ఉద్దేశాన్ని వివరించడం

[explainACommandsPurpose.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (te):** ఒక ప్రోగ్రామింగ్ ఆదేశం ప్రోగ్రామ్ స్థితిని ఎలా మారుస్తుందో వివరించండి.

##### అమలు క్రమం ప్రభావాలను ఊహించడం

[predictConsequencesOfExecutionOrder.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (te):** ఆదేశాల క్రమాన్ని మార్చితే ఫలితం ఎందుకు మారవచ్చో వివరించండి.

##### ప్రోగ్రామ్ అవుట్‌పుట్‌ను ఊహించడం

[predictProgramOutput.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (te):** ఇచ్చిన ఇన్‌పుట్‌లకు ప్రోగ్రామ్ చూపే ఫలితాన్ని కనుగొనండి.

##### ప్రోగ్రామ్ స్థితిని అనుసరించడం

[traceProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (te):** ప్రోగ్రామ్ నడుస్తున్నప్పుడు చరరాశులు, ఇతర విలువలు ఎలా మారుతాయో గమనించండి.

#### పరీక్షించడం మరియు లోపాల సరిదిద్దడం

Skills: 4

[testingAndDebugging.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (te):** ప్రోగ్రామ్‌లలో లోపాలను కనుగొనడం, వివరించడం, సరిచేయడం నేర్చుకోండి.

##### తప్పు ప్రోగ్రామ్ ప్రవర్తనను గుర్తించడం

[detectIncorrectProgramBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (te):** ప్రోగ్రామ్ ప్రవర్తన అవసరాలకు భిన్నంగా ఉన్నప్పుడు గుర్తించండి.

##### ప్రోగ్రామ్ లోపాన్ని సరిచేయడం

[fixAProgramDefect.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (te):** ఒక నిర్దిష్ట లోపాన్ని సరిచేసి అవసరమైన ప్రవర్తన ఇప్పటికీ పనిచేస్తోందో తనిఖీ చేయండి.

##### లోపానికి కారణాన్ని కనుగొనడం

[locateTheCauseOfAnError.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (te):** ప్రోగ్రామింగ్ లోపాన్ని దానికి కారణమైన ఆదేశం లేదా షరతు వరకు గుర్తించండి.

##### వేర్వేరు ఇన్‌పుట్‌లతో ప్రోగ్రామ్‌ను పరీక్షించడం

[testAProgramWithDifferentInputs.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (te):** సరిహద్దు సందర్భాలతో సహా వేర్వేరు ఇన్‌పుట్‌లతో ప్రోగ్రామ్‌ను పరీక్షించండి.

### రోబోటిక్స్, స్వయంచాలకీకరణ

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (te):** సెన్సార్లు, ప్రోగ్రామింగ్, యాక్చ్యుయేటర్లు రోబోలు పరిసరాలకు ఎలా స్పందించేందుకు సహాయపడతాయో తెలుసుకోండి.

#### రోబో నియంత్రణ

Skills: 4

[robotControl.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (te):** రోబో కదలికలు, ప్రతిస్పందనలకు సూచనలను తయారు చేసి మెరుగుపరచండి.

##### రోబో పునరావృత చర్యను అమర్చడం

[configureARepeatedRobotAction.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (te):** రోబో ఒక చర్యను ఎన్నిసార్లు పునరావృతం చేయాలో లేదా ఎప్పుడు ఆగాలో నిర్దేశించండి.

##### రోబో కదలికల క్రమాన్ని రూపొందించడం

[createARobotMovementSequence.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (te):** రోబో గమ్యానికి చేరేందుకు క్రమబద్ధమైన కదలిక ఆదేశాలను ప్రణాళిక చేయండి.

##### రోబో ప్రవర్తన లోపాలను సరిచేయడం

[debugRobotBehavior.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (te):** రోబో ఊహించని ప్రవర్తన సెన్సార్, నియంత్రణ తర్కం లేదా చర్య వల్ల వచ్చిందో గుర్తించండి.

##### అడ్డంకిపై రోబో ప్రతిస్పందనను అమలు చేయడం

[implementRobotObstacleResponse.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (te):** సెన్సార్ అడ్డంకిని గుర్తిస్తే రోబో ఆగేలా, తిరిగేలా లేదా తప్పించుకునేలా చేయండి.

#### రోబో వ్యవస్థ భాగాలు

Skills: 4

[roboticSystemComponents.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (te):** రోబో పరిస్థితులను ఎలా గుర్తించి, నిర్ణయించి, చర్య తీసుకుంటుందో తెలుసుకోండి.

##### రోబో నియంత్రికను గుర్తించడం

[identifyARobotController.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (te):** సెన్సార్ ఇన్‌పుట్‌లను ప్రోగ్రామ్ చేసిన చర్యలుగా మార్చే నియంత్రికను గుర్తించండి.

##### సెన్సార్ పనిని గుర్తించడం

[identifyASensorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (te):** వెలుతురు, దూరం, ఉష్ణోగ్రత లేదా ఇతర పరిస్థితులను కొలిచే సెన్సార్లను గుర్తించండి.

##### యాక్చ్యుయేటర్ పనిని గుర్తించడం

[identifyAnActuatorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (te):** మోటార్లు, దీపాలు, ఇతర యాక్చ్యుయేటర్లు ఆదేశాలను ఎలా అమలు చేస్తాయో వివరించండి.

##### సెన్సార్ నుంచి చర్యకు సంబంధాన్ని నమూనా చేయడం

[modelTheSensorToActionRelationship.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (te):** సెన్సార్ కొలత, నిర్ణయ నియమం, యాక్చ్యుయేటర్ ప్రతిస్పందనలను అనుసంధానించండి.

### సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (te):** ఆబ్జెక్టులు, బాధ్యతలు, ఆధారాలు కలిసి నమ్మదగిన సాఫ్ట్‌వేర్‌ను ఎలా నిర్మిస్తాయో తెలుసుకోండి.

#### రూపకల్పన సూత్రాలు

Skills: 8

[designPrinciples.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (te):** సాఫ్ట్‌వేర్ అర్థమయ్యేలా, మార్పులకు అనుకూలంగా ఉండే సూత్రాలు నేర్చుకోండి.

##### అనవసర లక్షణాలను వాయిదా వేయడం (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (te):** ఊహించిన భవిష్యత్తు కోసమే లక్షణాలను అమలు చేయవద్దు.

##### ఒప్పందాలపై ఆధారాలను రూపొందించడం (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (te):** నిర్దిష్ట సేవలకంటే ఒప్పందాలపై ఆధారపడి వ్యాపార తర్కాన్ని వేరు చేయండి.

##### మూలాన్ని మార్చకుండా ప్రవర్తనను విస్తరించడం (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (te):** స్థిరమైన ప్రధాన లాజిక్‌ను తిరిగి రాయకుండా కొత్త ప్రవర్తనకు విస్తరణ మార్గాలను రూపొందించండి.

##### అనవసర పునరావృతాన్ని గుర్తించడం (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (te):** భవిష్యత్తులో అసమాన మార్పులకు దారితీసే పునరావృత నియమాలను కనుగొనండి.

##### ఒకే బాధ్యతను విడిగా ఉంచడం (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (te):** ఒక సమగ్రమైన మార్పు కారణంపై మాడ్యూల్‌ను అమర్చండి.

##### అనవసర సంక్లిష్టతను తగ్గించడం (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (te):** అవసరాలు కోరని పద్ధతులను తొలగించి సాఫ్ట్‌వేర్‌ను సరళీకరించండి.

##### చిన్న ఇంటర్‌ఫేస్‌లను వేరు చేయడం (ISP)

[separateNarrowInterfacesISP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (te):** వాడేవారు ఉపయోగించే చర్యలపైనే ఆధారపడేలా ఇంటర్‌ఫేస్‌లను చిన్నగా ఉంచండి.

##### ప్రత్యామ్నాయంగా వాడగలగడాన్ని తనిఖీ చేయడం (LSP)

[verifySubstitutabilityLSP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (te):** అమలు భాగం ఉమ్మడి ఒప్పంద హామీలను పాటిస్తుందో పరిశీలించండి.

#### ఆబ్జెక్ట్ నమూనా

Skills: 13

[objectModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (te):** సాఫ్ట్‌వేర్ ఆబ్జెక్టులు స్థితి, ప్రవర్తనలను ఎలా కలుపుతాయో తెలుసుకోండి.

##### ఆబ్జెక్ట్ అబ్స్ట్రాక్షన్ ఉపయోగించడం

[applyObjectAbstraction.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (te):** ఒక భాగం వినియోగదారులకు చూపాల్సిన ముఖ్యమైన చర్యలను ఎంచుకోండి.

##### క్లాస్‌ను ఆబ్జెక్ట్ నుంచి వేరు చేయడం

[distinguishAClassFromAnObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (te):** క్లాస్ అనే రూపరేఖను, తమదైన ప్రస్తుత విలువలున్న ఆబ్జెక్టుల నుంచి వేరు చేయండి.

##### నిజమైన వస్తువును దాని అమూర్త నమూనా నుంచి వేరు చేయడం

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (te):** సాఫ్ట్‌వేర్ నమూనా ఒక వస్తువు ఎంపిక చేసిన లక్షణాలనే చూపుతుందని గుర్తించండి.

##### ఆబ్జెక్ట్ మెథడ్‌ను వివరించడం

[explainAnObjectMethod.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (te):** మెథడ్‌ను పిలవడం ద్వారా ఆబ్జెక్ట్ స్థితిని ఎలా చదవవచ్చో లేదా మార్చవచ్చో వివరించండి.

##### ఆబ్జెక్ట్ ప్రాపర్టీని వివరించడం

[explainAnObjectProperty.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (te):** నిల్వచేసిన లక్షణాన్ని, ఆబ్జెక్ట్ చేయగల చర్యల నుంచి వేరు చేయండి.

##### ఎన్‌క్యాప్సులేషన్ వివరించడం

[explainEncapsulation.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (te):** నియంత్రిత పద్ధతుల ద్వారా ఆబ్జెక్టులు అంతర్గత స్థితిని ఎలా కాపాడుతాయో తెలుసుకోండి.

##### వారసత్వాన్ని వివరించడం

[explainInheritance.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (te):** ప్రత్యేకీకృత క్లాస్ సాధారణ క్లాస్ నుంచి ప్రవర్తనను ఎలా పొందగలదో వివరించండి.

##### పాలీమార్ఫిజం వివరించడం

[explainPolymorphism.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (te):** వేర్వేరు ఆబ్జెక్టులు ఒకే ఆపరేషన్‌ను వేర్వేరు విధాలుగా ఎలా చేయగలవో తెలుసుకోండి.

##### క్లాస్ భావనను వివరించడం

[explainTheConceptOfAClass.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (te):** ప్రత్యేక ఆబ్జెక్టులను సృష్టించే నిర్వచనంగా క్లాస్‌ను అర్థం చేసుకోండి.

##### సాఫ్ట్‌వేర్ ఆబ్జెక్ట్ నిర్మాణాన్ని వివరించడం

[explainTheStructureOfASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (te):** ఇప్పటికే ఉన్న ఆబ్జెక్ట్ గుర్తింపు, లక్షణాలు, పద్ధతులను గుర్తించండి.

##### ఆబ్జెక్ట్ స్థితి, ప్రవర్తనను గుర్తించడం

[identifyAnObjectsStateAndBehavior.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (te):** ఆబ్జెక్ట్ లక్షణాలు, అది చేయగల చర్యలను వివరించండి.

##### డొమైన్ ఎంటిటీని సాఫ్ట్‌వేర్ ఆబ్జెక్ట్‌గా నమూనా చేయడం

[modelADomainEntityAsASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (te):** తగిన లక్షణాలు, చర్యలను ఎంచుకుని ఉపయోగకర ఆబ్జెక్ట్‌ను రూపొందించండి.

##### ఆబ్జెక్ట్ కంపోజిషన్ నమూనా చేయడం

[modelObjectComposition.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (te):** వేర్వేరు బాధ్యతలున్న చిన్న భాగాలతో పెద్ద సాఫ్ట్‌వేర్ ఆబ్జెక్టులను నిర్మించండి.

