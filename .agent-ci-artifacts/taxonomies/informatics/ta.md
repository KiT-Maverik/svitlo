<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (ta)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### படிமுறைகள்

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../learningApps/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (ta):** சிக்கல்களைத் தீர்க்க மீண்டும் பயன்படுத்தக்கூடிய முறைகளை வடிவமைக்கவும் பயன்படுத்தவும் ஒப்பிடவும் கற்றுக்கொள்.

#### பகுப்பாய்வு

Skills: 3

[analysis.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (ta):** உள்ளீடு மாறும்போது படிமுறையின் நேர மற்றும் நினைவகத் தேவை எவ்வாறு மாறுகிறது என்பதை அறிந்துகொள்.

##### நேரியல் மற்றும் மடக்கை வளர்ச்சியை வேறுபடுத்துதல்

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (ta):** உள்ளீட்டு அளவுக்கு ஏற்ப அதிகரிப்பதையும் மீண்டும் மீண்டும் பாதியாக்குவதால் ஏற்படும் வளர்ச்சியையும் ஒப்பிடு.

##### படிமுறையின் மிக மோசமான நிலையை மதிப்பிடுதல்

[estimateAnAlgorithmsWorstCase.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (ta):** மிக மோசமான நிலையில் படிமுறைக்கு எத்தனை சோதனைகள் தேவைப்படும் என மதிப்பிடு.

##### நேரம்–நினைவக மாற்றீடுகளை விளக்குதல்

[explainTimeMemoryTradeOffs.data.ts](../../../learningApps/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (ta):** வேகமான படிமுறைக்கு ஏன் அதிக தற்காலிக நினைவகம் தேவைப்படலாம் என்பதைப் புரிந்துகொள்.

#### தொகுப்புகளைச் செயலாக்குதல்

Skills: 4

[collectionProcessing.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (ta):** தரவைப் பார்வையிடும்போது எண்ணவும் கூட்டவும் மிகப்பெரிய, மிகச்சிறிய மதிப்புகளைக் கண்டுபிடிக்கவும் கற்றுக்கொள்.

##### உறுப்புகளை எண்ணுதல்

[applyElementCounting.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (ta):** குறிப்பிட்ட நிபந்தனையைப் பூர்த்தி செய்யும் எல்லா உறுப்புகளையும் எண்ணு.

##### அதிகபட்ச மதிப்பைக் கண்டுபிடித்தல்

[applyMaximumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (ta):** தொகுப்பைச் சுற்றும்போது இதுவரை பார்த்த மிகப்பெரிய மதிப்பைப் பதிவு செய்.

##### குறைந்தபட்ச மதிப்பைக் கண்டுபிடித்தல்

[applyMinimumFinding.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (ta):** தொகுப்பைச் சுற்றும்போது இதுவரை பார்த்த மிகச்சிறிய மதிப்பைப் பதிவு செய்.

##### கூட்டுத்தொகையைத் திரட்டுதல்

[applySumAccumulation.data.ts](../../../learningApps/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (ta):** தொகுப்பிலுள்ள மதிப்புகளை ஒவ்வொன்றாக ஓடும் கூட்டுத்தொகையில் சேர்.

#### உருவாக்கம்

Skills: 6

[construction.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (ta):** படிமுறையின் செயல்கள், நிபந்தனைகள் மற்றும் நிறுத்த விதிகளை வரையறுக்கக் கற்றுக்கொள்.

##### தேவைகளின் அடிப்படையில் படிமுறைகளை ஒப்பிடுதல்

[compareAlgorithmsAgainstRequirements.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (ta):** படிமுறைகளின் முன்தேவைகள் மற்றும் வரம்புகளை வைத்து அவற்றை ஒப்பிடு.

##### தொடர்நிலைப் படிமுறையை உருவாக்குதல்

[constructASequentialAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (ta):** சரியான வரிசையில் செய்யப்படும் வரையறுக்கப்பட்ட படிகளை விவரி.

##### படிமுறையின் இலக்கை வரையறுத்தல்

[defineAnAlgorithmsGoal.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (ta):** படிமுறை அடைய வேண்டிய விளைவையும் ஏற்கும் உள்ளீடுகளையும் கூறு.

##### நிபந்தனை கிளைகளை வடிவமைத்தல்

[designConditionalBranching.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (ta):** தெளிவான நிபந்தனைகளின் அடிப்படையில் படிமுறையின் பல்வேறு பாதைகளைத் திட்டமிடு.

##### மீள்செயல்பாட்டை வடிவமைத்தல்

[designRepetition.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (ta):** சரியான புதுப்பிப்புகளும் நிறுத்த நிபந்தனையும் உள்ள மீள்செயல்முறையை வடிவமை.

##### மீளுருவாக்கப் படிமுறையைச் செயல்படுத்துதல்

[implementARecursiveAlgorithm.data.ts](../../../learningApps/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (ta):** சிறிய துணைச் சிக்கல்களும் நிறுத்தும் அடிப்படை நிலையும் உள்ள மீளுருவாக்கப் படிமுறையை உருவாக்கு.

#### தேடல்

Skills: 6

[search.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (ta):** வெவ்வேறு தேடல் முறைகள் தொகுப்பில் ஓர் உறுப்பைக் கண்டுபிடிப்பதை அறிந்துகொள்.

##### இருமத் தேடலைப் பயன்படுத்துதல்

[applyBinarySearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (ta):** வரிசைப்படுத்திய தரவில் தேடல் வரம்பைப் பாதியாகக் குறைத்துக்கொண்டே மதிப்பைக் கண்டுபிடி.

##### இருமத் தேடல் மரத்தில் தேடுதல்

[applyBinaryTreeSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (ta):** இருமத் தேடல் மரத்தின் ஒழுங்கமைந்த கிளைகளைப் பின்தொடர்ந்து விசையைக் கண்டுபிடி.

##### நேரியல் தேடலைப் பயன்படுத்துதல்

[applyLinearSearch.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (ta):** உறுப்புகளை ஒன்றன்பின் ஒன்றாகச் சோதித்து இலக்கைக் கண்டுபிடி.

##### சோதனை எண்ணிக்கையால் தேடல் முறைகளை ஒப்பிடுதல்

[compareSearchMethodsByCheckCount.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (ta):** நேரியல் மற்றும் இருமத் தேடல்களுக்கு வேண்டிய சோதனைகளின் எண்ணிக்கையை ஒப்பிடு.

##### இருமத் தேடலின் முன்தேவைகளை அடையாளம் காணுதல்

[identifyBinarySearchPrerequisites.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (ta):** இருமத் தேடலுக்குத் தேவையான வரிசை நிபந்தனையைத் தரவு பூர்த்தி செய்கிறதா எனச் சோதி.

##### தேடல் அளவளாவலைக் கணித்தல்

[predictSearchScaling.data.ts](../../../learningApps/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (ta):** தரவு இரட்டிப்பானாலும் இருமத் தேடலில் ஏன் சுமார் ஒரு சோதனை மட்டுமே கூடுகிறது என்பதைப் புரிந்துகொள்.

#### வரிசைப்படுத்துதல்

Skills: 4

[sorting.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (ta):** வரிசைப்படுத்தும் முறைகள் மதிப்புகளைத் தேர்ந்தெடுத்த வரிசையில் அமைப்பதை அறிந்துகொள்.

##### குமிழி வரிசையாக்கத்தைப் பயன்படுத்துதல்

[applyBubbleSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (ta):** தவறான வரிசையிலுள்ள அருகிலுள்ள மதிப்புகளை இடமாற்றிச் சீரமை.

##### செருகல் வரிசையாக்கத்தைப் பயன்படுத்துதல்

[applyInsertionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (ta):** ஒவ்வொரு புதிய உறுப்பையும் ஏற்கெனவே சீரமைத்த பகுதியில் செருகி வரிசைப்படுத்து.

##### தேர்வு வரிசையாக்கத்தைப் பயன்படுத்துதல்

[applySelectionSort.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (ta):** மீதமுள்ளவற்றில் மிகச்சிறிய உறுப்பை மீண்டும் மீண்டும் தேர்ந்தெடுத்து வரிசைப்படுத்து.

##### வரிசையாக்க அளவுகோலை விளக்குதல்

[explainASortingCriterion.data.ts](../../../learningApps/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (ta):** தொகுப்பை வரிசைப்படுத்தப் பயன்படுத்தும் மதிப்பு அல்லது பண்பைத் தேர்ந்தெடு.

### செயற்கை நுண்ணறிவு

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (ta):** செயற்கை நுண்ணறிவு அமைப்புகள் எவ்வாறு கற்கின்றன, கணிக்கின்றன, உள்ளடக்கம் உருவாக்குகின்றன, சில நேரம் தவறுகின்றன என்பதை ஆராயுங்கள்.

#### செயற்கை நுண்ணறிவின் அடிப்படைகள்

Skills: 6

[aIFundamentals.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (ta):** நிரலிடப்பட்ட விதிகள், பயிற்சியளிக்கப்பட்ட மாதிரிகள், AI பணிகள் ஆகியவற்றின் வேறுபாடுகளை ஆராயுங்கள்.

##### AI பணிகளை வகைப்படுத்துதல்

[classifyAITasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (ta):** ஒரு AI பணி வகைப்படுத்துகிறதா, கணிக்கிறதா, உள்ளடக்கம் உருவாக்குகிறதா என்பதை அறியுங்கள்.

##### விதிகளையும் பயிற்சியளிக்கப்பட்ட மாதிரிகளையும் வேறுபடுத்துதல்

[distinguishRulesFromTrainedModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (ta):** வெளிப்படையாக நிரலிடப்பட்ட முடிவெடுப்பு விதிகளையும் தரவிலிருந்து பயிற்சிபெற்ற அமைப்புகளையும் வேறுபடுத்துங்கள்.

##### உருவாக்கும் AI-யை விளக்குதல்

[explainGenerativeAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (ta):** உருவாக்கும் மாதிரிகள் உரை, படம் மற்றும் பிற உள்ளடக்கங்களை எவ்வாறு உருவாக்குகின்றன என்பதைப் புரிந்துகொள்ளுங்கள்.

##### எடுத்துக்காட்டுகளிலிருந்து கற்றலை விளக்குதல்

[explainLearningFromExamples.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (ta):** எடுத்துக்காட்டுகள் புதிய உள்ளீடுகளில் மாதிரியின் செயல்திறனை எவ்வாறு மேம்படுத்த உதவுகின்றன என்பதை விளக்குங்கள்.

##### முன்கணிப்பு AI-யை விளக்குதல்

[explainPredictiveAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (ta):** முன்கணிப்பு அமைப்புகள் மதிப்புகள், வகைகள் அல்லது நிகழ்வு நிகழ்தகவுகளை எவ்வாறு மதிப்பிடுகின்றன என்பதை ஆராயுங்கள்.

##### AI-யின் சாத்தியமான பிழையை அடையாளம் காணுதல்

[identifyAPotentialAIError.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (ta):** AI பதிலைத் தனியாகச் சரிபார்க்க வேண்டியிருக்கலாம் என்பதைக் காட்டும் எச்சரிக்கை அறிகுறிகளை அறியுங்கள்.

#### பின்பற்றுதலும் புரிதலும்

Skills: 2

[imitationAndUnderstanding.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (ta):** நம்பத்தகுந்த பின்பற்றுதலுக்கும் உண்மையான புரிதலுக்கும் இடையேயான வேறுபாட்டை ஆராயுங்கள்.

##### சியர்லின் சீன அறையை விளக்குதல்

[explainSearlesChineseRoom.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (ta):** சீன அறை சிந்தனைச் சோதனையையும் அது எழுப்பும் விவாதத்தையும் ஆராயுங்கள்.

##### டூரிங் சோதனையை விளக்குதல்

[explainTheTuringTest.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (ta):** டூரிங் சோதனை எதை மதிப்பிடுகிறது, எதை நிரூபிக்க முடியாது என்பதைப் புரிந்துகொள்ளுங்கள்.

#### மொழி மாதிரிகளின் டோக்கன்களும் சூழலும்

Skills: 6

[languageModelTokensAndContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (ta):** மொழி மாதிரிகள் உரையை டோக்கன்களாகப் பிரித்து சூழலை எவ்வாறு பயன்படுத்துகின்றன என்பதை அறியுங்கள்.

##### மாதிரியெடுத்தலையும் மிகச் சாத்தியமான டோக்கனைத் தேர்வதையும் வேறுபடுத்துதல்

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (ta):** மிக அதிக நிகழ்தகவு உள்ள டோக்கனைத் தேர்வதையும் பிற சாத்தியத் தொடர்ச்சிகளிலிருந்து மாதிரியெடுப்பதையும் ஒப்பிடுங்கள்.

##### டோக்கன், எழுத்துரு, சொல்லை வேறுபடுத்துதல்

[distinguishTokensCharactersAndWords.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (ta):** எழுத்துரு, சொல், டோக்கன் ஆகியவை ஏன் ஒரே அலகு அல்ல என்பதை அறியுங்கள்.

##### மொழி மாதிரியின் சூழல் சாளரத்தை விளக்குதல்

[explainALanguageModelsContextWindow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (ta):** மொழி மாதிரி ஏன் குறிப்பிட்ட அளவு சூழலை மட்டுமே பயன்படுத்த முடியும் என்பதைப் புரிந்துகொள்ளுங்கள்.

##### சூழல் சாளர வரம்பு மீறலை விளக்குதல்

[explainContextWindowOverflow.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (ta):** கோரிக்கை மாதிரியின் சூழல் வரம்பை மீறும்போது என்ன நிகழலாம் என்பதை ஆராயுங்கள்.

##### அடுத்த டோக்கனைத் தேர்ந்தெடுப்பதை விளக்குதல்

[explainNextTokenSelection.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (ta):** மொழி மாதிரிகள் சூழலைப் பயன்படுத்தி சாத்தியமான அடுத்த டோக்கனை எவ்வாறு தேர்ந்தெடுக்கின்றன என்பதை விளக்குங்கள்.

##### டோக்கன்களை விளக்குதல்

[explainTokens.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (ta):** டோக்கன் என்பது மாதிரிக்கேற்ப வரையறுக்கப்படும் உரைப் பிரதிநிதித்துவ அலகு என்பதைப் புரிந்துகொள்ளுங்கள்.

#### மாதிரி கட்டமைப்புகளும் வளங்களும்

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (ta):** பல்வேறு AI மாதிரி கட்டமைப்புகள் செயல்திறனையும் வளத் தேவைகளையும் எவ்வாறு பாதிக்கின்றன என்பதை ஆராயுங்கள்.

##### ஒரு பணிக்கான மாதிரியைத் தேர்ந்தெடுத்தல்

[chooseAModelForATask.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (ta):** பணி தரம், வேகம், செலவு, தனியுரிமை, கிடைக்கும் நினைவகம் ஆகியவற்றைப் பொறுத்து மாதிரியைத் தேர்ந்தெடுங்கள்.

##### அடர்த்தியான மாதிரிகளையும் நிபுணர் கலவை மாதிரிகளையும் ஒப்பிடுதல்

[compareDenseAndMoEModels.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (ta):** பல அளவுருக்களை இயக்கும் மாதிரிகளையும் தேர்ந்தெடுக்கப்பட்ட நிபுணர் தொகுதிகளை மட்டும் பயன்படுத்தும் மாதிரிகளையும் ஒப்பிடுங்கள்.

##### மாதிரிகளின் நினைவகத் தேவைகளை ஒப்பிடுதல்

[compareModelMemoryRequirements.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (ta):** மாதிரி கோப்புகளைச் சேமிக்க மட்டும் அல்லாமல், அதை இயக்க எவ்வளவு நினைவகம் தேவை என்பதை மதிப்பிடுங்கள்.

##### பதில் தொடங்கும் தாமதத்தை ஒப்பிடுதல்

[compareResponseLatency.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (ta):** AI பதில் தொடங்கும் முன் தாமதத்தையும் தொடர்ந்து உருவாக்கும் வேகத்தையும் தனித்தனியாக ஒப்பிடுங்கள்.

##### அளவாக்கத்தை விளக்குதல்

[explainQuantization.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (ta):** எண் துல்லியத்தைக் குறைப்பதால் நினைவகம் சேமிக்கலாம், ஆனால் தரம் மாறலாம் என்பதைப் புரிந்துகொள்ளுங்கள்.

#### AI-க்கான வழிமுறைகளை எழுதுதல்

Skills: 7

[prompting.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (ta):** AI அமைப்புகளுக்குத் தெளிவான அறிவுறுத்தல்கள், சூழல் மற்றும் கட்டுப்பாடுகளை வழங்கக் கற்றுக்கொள்ளுங்கள்.

##### சிக்கலான பிராம்ப்டைத் துணைப் பணிகளாகப் பிரித்தல்

[breakAComplexPromptIntoSubtasks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (ta):** சிக்கலான கோரிக்கையை முடிவுகளைச் சரிபார்க்கக் கூடிய சிறிய படிகளாகப் பிரியுங்கள்.

##### பிராம்ப்டில் சூழலை வழங்குதல்

[providePromptContext.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (ta):** AI உங்கள் கோரிக்கையைப் புரிந்துகொள்ள உதவும் தொடர்புடைய பின்னணித் தகவலை வழங்குங்கள்.

##### முடிவுகளைப் பொறுத்து பிராம்ப்டை மேம்படுத்துதல்

[refineAPromptBasedOnResults.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (ta):** முந்தைய பதிலில் விடுபட்டவற்றைச் சரிபார்த்த பிறகு AI கோரிக்கையை மேம்படுத்துங்கள்.

##### பிராம்ப்டின் நோக்கத்தைக் குறிப்பிடுதல்

[specifyAPromptObjective.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (ta):** AI உதவியாளர் செய்ய வேண்டிய குறிப்பிட்ட பணியைத் தெளிவாகக் கூறுங்கள்.

##### பிராம்ப்டில் ஒரு பங்கைக் குறிப்பிடுதல்

[specifyARoleInAPrompt.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (ta):** பயனுள்ள பார்வை அல்லது நடையை வகுத்தாலும் அதை உண்மையான நிபுணத்துவமாக எண்ணாதீர்கள்.

##### வெளியீட்டு வடிவத்தைக் குறிப்பிடுதல்

[specifyAnOutputFormat.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (ta):** அட்டவணை அல்லது குறிப்பிட்ட புலங்கள் போன்ற தெளிவான பதில் அமைப்பைக் கேளுங்கள்.

##### பிராம்ப்டுக்கான கட்டுப்பாடுகளைக் குறிப்பிடுதல்

[specifyPromptConstraints.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (ta):** நீளம், தகவல் மூலங்கள், கற்பித்துக் கூறக்கூடாத விவரங்கள் போன்ற வரம்புகளை வகையறுக்குங்கள்.

#### AI-யின் நம்பகத்தன்மையும் பொறுப்பான பயன்பாடும்

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (ta):** AI வெளியீடுகளைச் சரிபார்த்து அவை மக்களை எவ்வாறு பாதிக்கலாம் என்பதை மதிப்பிடக் கற்றுக்கொள்ளுங்கள்.

##### AI உதவியுடனான முடிவுகளில் மனிதப் பொறுப்பை விளக்குதல்

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (ta):** AI உதவியுடன் எடுக்கப்படும் முடிவுகளுக்கும் மனிதர்களே ஏன் பொறுப்பேற்க வேண்டும் என்பதைப் புரிந்துகொள்ளுங்கள்.

##### பிராம்ப்டில் தனிப்பட்ட தரவைப் பாதுகாத்தல்

[protectPersonalDataInPrompts.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (ta):** AI-க்கு கோரிக்கை அனுப்பும் முன் தேவையற்ற தனிப்பட்ட தகவலை நீக்குங்கள்.

##### AI பாகுபாட்டு அபாயங்களை அறிதல்

[recognizeAIBiasRisks.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (ta):** AI அமைப்புகள் தனிநபர்கள் அல்லது குழுக்களை அநியாயமாக நடத்தக்கூடிய சூழல்களை அறியுங்கள்.

##### AI பதிலில் உள்ள உண்மைகளைச் சரிபார்த்தல்

[verifyFactsInAnAIResponse.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (ta):** AI பதிலில் உள்ள உண்மைச் செய்திகளை நம்பகமான தனித்த ஆதாரங்களுடன் சரிபாருங்கள்.

#### AI-உடன் பாதுகாப்பான தொடர்பு

Skills: 4

[safeInteractionWithAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (ta):** AI அறிவுரை தவறாக வழிநடத்தவோ ஆரோக்கியமற்ற சார்பை ஏற்படுத்தவோ செய்யும் தொடர்பு முறைகளை அறியுங்கள்.

##### AI-யை அதிகம் சார்ந்திருப்பதன் அபாயங்களை விளக்குதல்

[explainRisksOfOverrelianceOnAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (ta):** சுய சிந்தனைக்கும் மனித ஆதரவுக்கும் AI மாற்றாக இருக்கக்கூடாது என்பதைப் புரிந்துகொள்ளுங்கள்.

##### AI உள்ளீட்டில் நம்ப முடியாத அறிவுறுத்தல்களை அறிதல்

[identifyUntrustedInstructionsInAIInput.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (ta):** வெளிப்புறப் பொருளில் மறைக்கப்பட்டு உதவியாளரைக் கட்டுப்படுத்தக் கூடாத அறிவுறுத்தல்களை அறியுங்கள்.

##### AI பயன்படுத்தும்போது ரகசியங்களைப் பாதுகாத்தல்

[protectSecretsWhenUsingAI.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (ta):** AI-ஐப் பயன்படுத்தும்போது கடவுச்சொற்கள், அணுகல் விசைகள், ரகசியத் தகவல்களைப் பாதுகாத்திடுங்கள்.

##### AI-யின் தேவையற்ற புகழ்ச்சியை அடையாளம் காணுதல்

[recognizeAISycophancy.data.ts](../../../learningApps/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (ta):** ஆதாரம் இல்லாமல் AI ஒப்புக்கொள்வதையோ புகழ்வதையோ அறியுங்கள்.

### கணினிசார் சிந்தனை

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (ta):** சிக்கலான பிரச்சினைகளைத் தெளிவான படிகள், வடிவங்கள், விதிகள் எனப் பிரிப்பது எப்படி என்பதை அறிந்துகொள்.

#### சிதைத்தலும் அருவமாக்கலும்

Skills: 4

[decompositionAndAbstraction.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (ta):** பிரச்சினையின் முக்கிய பகுதிகளையும் தொடர்புகளையும் கண்டறிந்து அதை எளிமைப்படுத்தக் கற்றுக்கொள்.

##### அருவ அமைப்பு மாதிரியை உருவாக்குதல்

[buildAnAbstractSystemModel.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (ta):** சிக்கலான சூழ்நிலை அல்லது அமைப்பை எளிமையாகக் காட்டும் மாதிரியை உருவாக்கு.

##### பிரச்சினையைப் பகுதிகளாகப் பிரித்தல்

[decomposeAProblem.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (ta):** பெரிய பிரச்சினையைத் தனித்தனியாகத் தீர்க்கக்கூடிய சிறிய பணிகளாகப் பிரி.

##### மீண்டும் பயன்படுத்தும் முறையைப் பொதுமைப்படுத்துதல்

[generalizeARepeatedMethod.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (ta):** பல குறிப்பிட்ட பிரச்சினைகளுக்கும் பொருந்தும், மீண்டும் பயன்படுத்தக்கூடிய முறையைக் கண்டறி.

##### பொருளின் அத்தியாவசிய பண்புகளைக் கண்டறிதல்

[identifyEssentialObjectProperties.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (ta):** பணிக்குத் தேவையான விவரங்களைத் தேர்ந்தெடுத்து, தேவையற்றவற்றை ஒதுக்கிவை.

#### தர்க்கமும் முறைகளும்

Skills: 8

[logicAndPatterns.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (ta):** விதிகள், வடிவங்கள், தர்க்க நிபந்தனைகள் பிரச்சினைகளைத் தீர்க்க எவ்வாறு உதவுகின்றன என்பதை அறிந்துகொள்.

##### தர்க்க AND செயலியைப் பயன்படுத்துதல்

[applyLogicalAND.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (ta):** இரண்டு நிபந்தனைகளும் நிறைவேறியுள்ளனவா என்பதைச் சரிபார்க்க AND பயன்படுத்துக.

##### தர்க்க NOT செயலியைப் பயன்படுத்துதல்

[applyLogicalNOT.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (ta):** ஒரு நிபந்தனையின் உண்மை மதிப்பைத் தலைகீழாக்க NOT பயன்படுத்துக.

##### தர்க்க OR செயலியைப் பயன்படுத்துதல்

[applyLogicalOR.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (ta):** இரண்டு நிபந்தனைகளில் குறைந்தது ஒன்றாவது நிறைவேறியுள்ளதா என்பதை OR மூலம் சரிபார்.

##### முரண்படும் விதிகளைக் கண்டறிதல்

[detectContradictoryRules.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (ta):** இரண்டு நிபந்தனைகளும் ஒரே நேரத்தில் உண்மையாக இருக்க முடியாத சூழலை அறி.

##### எளிய நிபந்தனையை மதிப்பிடுதல்

[evaluateASimpleCondition.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (ta):** ஒரு நிபந்தனை உண்மையா, பொய்யா அல்லது இன்னும் தீர்மானிக்க முடியாததா என முடிவு செய்.

##### கூட்டு தர்க்கக் கோவைகளை மதிப்பிடுதல்

[evaluateCompoundLogicalExpressions.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (ta):** பல செயலிகளைக் கொண்ட தர்க்கக் கோவைகளைச் சரியான வரிசையில் மதிப்பிடு.

##### விதியிலிருந்து விளைவை முன்கணித்தல்

[predictAnOutcomeFromARule.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (ta):** ஒரு விதியும் தொடக்க நிலையும் தெரிந்திருக்கும்போது அடுத்து என்ன நடக்கும் எனக் கண்டறி.

##### ஒரு வடிவத்தை அறிதல்

[recognizeAPattern.data.ts](../../../learningApps/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (ta):** தொடர்களில் முறைகளைக் கண்டறிந்து முன்மொழியப்பட்ட விதி பொருந்துகிறதா என்பதைச் சரிபார்.

### தரவுக் கட்டமைப்புகள்

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (ta):** தொகுப்புகள், திறவுகோல்கள், மரங்கள், வலைப்பின்னல்கள் ஆகியவை வெவ்வேறு செயல்களுக்காகத் தரவை எவ்வாறு ஒழுங்கமைக்கின்றன என்பதை அறிந்துகொள்.

#### அகராதிகள்

Skills: 3

[dictionaries.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (ta):** அகராதிகள் தனித்துவமான விசைகளைச் சேமிக்கப்பட்ட மதிப்புகளுடன் எவ்வாறு இணைக்கின்றன என்பதை அறிந்துகொள்.

##### அகராதியின் கட்டமைப்பை விளக்குதல்

[explainDictionaryStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (ta):** அகராதி இடத்தை வைத்து அல்லாமல் விசையை வைத்து தகவலை எவ்வாறு மீட்டெடுக்கிறது என்பதைப் புரிந்துகொள்.

##### விசையைப் பயன்படுத்தி அகராதி மதிப்பைப் பெறுதல்

[retrieveADictionaryValueByKey.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (ta):** விசையைக் கொண்டு அகராதி மதிப்பைக் கண்டறிந்து, விசை இல்லாத நிலையைச் சமாளி.

##### அகராதி மதிப்பைப் புதுப்பித்தல்

[updateADictionaryValue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (ta):** அகராதியில் ஏற்கெனவே உள்ள விசையின் கீழ் சேமிக்கப்பட்ட மதிப்பை மாற்று.

#### வரைபடக் கோட்பாட்டு அமைப்புகள்

Skills: 6

[graphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (ta):** கிராஃப்கள் இடங்கள், பொருள்கள் மற்றும் அவற்றின் இணைப்புகளை எவ்வாறு காட்டுகின்றன என்பதை அறிந்துகொள்.

##### திசையுள்ள மற்றும் திசையற்ற கிராஃப்களை வேறுபடுத்துதல்

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (ta):** இணைப்புகள் ஒருதிசையிலா இருதிசையிலா உள்ளன என்பதை அறிந்துகொள்.

##### மரங்களையும் சுழற்சிகள் உள்ள கிராஃப்களையும் வேறுபடுத்துதல்

[distinguishTreesFromGraphsWithCycles.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (ta):** கிராஃப்களில் சுழற்சிகள் இருக்கலாம்; ஆனால் மரங்களில் ஏன் இல்லை என்பதைப் புரிந்துகொள்.

##### எடையுள்ள மற்றும் எடையற்ற கிராஃப்களை வேறுபடுத்துதல்

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (ta):** கிராஃபின் இணைப்புகளில் தூரம் அல்லது செலவு போன்ற எண்கள் எப்போது குறிக்கப்படுகின்றன என்பதை அறிந்துகொள்.

##### கிராஃப் கட்டமைப்பை விளக்குதல்

[explainGraphStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (ta):** கிராஃபின் முனைகளையும் அவற்றை இணைக்கும் விளிம்புகளையும் அடையாளம் காண்.

##### கிராஃபில் ஒரு பாதையைக் கண்டறிதல்

[findAPathInAGraph.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (ta):** இணைப்புகளின் திசையை மதித்து முனைகளுக்கு இடையிலான செல்லுபடியான பாதையைப் பின்பற்று.

##### அடுத்தடுத்த முனைகளை அடையாளம் காணுதல்

[identifyAdjacentVertices.data.ts](../../../learningApps/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (ta):** மற்றொரு முனையுடன் நேரடியாக இணைக்கப்பட்ட முனைகளை அடையாளம் காண்.

#### வரிசை

Skills: 3

[queue.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (ta):** ஒரு வரிசை உருப்படிகளை அவை வந்த வரிசைப்படி எவ்வாறு செயலாக்குகிறது என்பதை அறிந்துகொள்.

##### வரிசையிலிருந்து ஓர் உருப்படியை நீக்குதல்

[dequeueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (ta):** மற்ற உருப்படிகளின் வரிசையை மாற்றாமல் வரிசையின் முதல் உருப்படியை நீக்கு.

##### வரிசையில் ஓர் உருப்படியைச் சேர்த்தல்

[enqueueAnElement.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (ta):** வரிசையின் கடைசியில் புதிய உருப்படியைச் சேர்.

##### FIFO கொள்கையை விளக்குதல்

[explainFIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (ta):** வரிசையில் முதலில் வந்த உருப்படி ஏன் முதலில் வெளியேறுகிறது என்பதை விளக்கு.

#### வரிசைத்தொடர்கள்

Skills: 7

[sequences.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (ta):** வரிசைப்படுத்தப்பட்ட தொகுப்புகளில் உறுப்புகளை அணுகவும் சேர்க்கவும் நீக்கவும் கற்றுக்கொள்.

##### சுட்டெண் மூலம் வரிசைத்தொடரின் உறுப்பை அணுகுதல்

[accessASequenceElementByIndex.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (ta):** செல்லுபடியாகும் இட வரம்பை மீறாமல் சுட்டெண்ணால் உறுப்பைப் பெறு.

##### அணிகளையும் இணைப்புப் பட்டியல்களையும் வேறுபடுத்துதல்

[distinguishArraysFromLinkedLists.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (ta):** சுட்டெண் கொண்ட அணிகளையும் இணைக்கப்பட்ட கணுக்களின் சங்கிலிகளையும் ஒப்பிடு.

##### அணியின் கட்டமைப்பை விளக்குதல்

[explainArrayStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (ta):** அணிகள் சுட்டெண்களால் குறிக்கப்படும் இடங்களில் உறுப்புகளை எவ்வாறு சேமிக்கின்றன என்பதைப் புரிந்துகொள்.

##### பட்டியலின் கட்டமைப்பை விளக்குதல்

[explainListStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (ta):** பட்டியல்கள் பல வழிகளில் காட்டக்கூடிய வரிசைப்படுத்தப்பட்ட தொகுப்புகள் என்பதை அறிந்துகொள்.

##### வரிசைத்தொடரில் ஓர் உறுப்பைச் செருகுதல்

[insertAnElementIntoASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (ta):** வரிசைப்படுத்தப்பட்ட தொடரில் சரியான இடத்தில் உறுப்பைச் செருகு.

##### வரிசைத்தொடரிலிருந்து ஓர் உறுப்பை நீக்குதல்

[removeAnElementFromASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (ta):** மற்ற உறுப்புகளின் வரிசையைப் பாதுகாத்து ஓர் உறுப்பை நீக்கு.

##### வரிசைத்தொடரை முழுவதும் கடத்தல்

[traverseASequence.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (ta):** வரிசைத்தொடரின் ஒவ்வொரு உறுப்பையும் முறையாகப் பார்.

#### கணங்கள்

Skills: 4

[sets.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (ta):** தனித்துவமான மதிப்புகளின் கணங்களையும் உறுப்பினர் சோதனைகளையும் ஆராய்.

##### கணங்களின் வெட்டைக் கணக்கிடுதல்

[computeSetIntersection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (ta):** இரண்டு கணங்களிலும் உள்ள உறுப்புகளை மட்டும் கண்டுபிடி.

##### கணங்களின் ஒன்றிப்பைக் கணக்கிடுதல்

[computeSetUnion.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (ta):** இரண்டு கணங்களின் தனித்துவமான உறுப்புகளை நகலில்லாமல் ஒன்றுசேர்.

##### கணத்தின் கட்டமைப்பை விளக்குதல்

[explainSetStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (ta):** ஒரு கணம் ஒவ்வொரு தனித்துவமான உறுப்பையும் ஒருமுறை மட்டுமே வைத்திருப்பதற்கான காரணத்தைப் புரிந்துகொள்.

##### கண உறுப்பினர்தன்மையைச் சோதித்தல்

[testSetMembership.data.ts](../../../learningApps/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (ta):** குறிப்பிட்ட மதிப்பு ஒரு கணத்தில் உள்ளதா என்பதைச் சோதி.

#### அடுக்கு

Skills: 3

[stack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (ta):** அடுக்கில் கடைசியாகச் சேர்க்கப்பட்ட உறுப்பை முதலில் அணுகுவது எப்படி என்பதை அறிந்துகொள்.

##### LIFO கொள்கையை விளக்குதல்

[explainLIFO.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (ta):** அடுக்கில் கடைசியாகச் சேர்த்த உருப்படி ஏன் முதலில் வெளியேறுகிறது என்பதைப் புரிந்துகொள்.

##### அடுக்கிலிருந்து ஓர் உறுப்பை எடுப்பது

[popAnElementFromAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (ta):** அடுக்கு காலியாக உள்ளதா எனச் சரிபார்த்து கடைசியாகச் சேர்த்த உறுப்பை நீக்கு.

##### அடுக்கில் ஓர் உறுப்பைச் சேர்த்தல்

[pushAnElementOntoAStack.data.ts](../../../learningApps/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (ta):** அடுக்கின் மேலே புதிய உறுப்பை வை.

#### தரவுக் கட்டமைப்பைத் தேர்ந்தெடுத்தல்

Skills: 4

[structureSelection.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (ta):** நிரல் தரவைப் பயன்படுத்தும் முறைக்கு ஏற்ற கட்டமைப்பைத் தேர்ந்தெடு.

##### தேவையான செயல்களுக்கு ஏற்ற கட்டமைப்பைத் தேர்ந்தெடுத்தல்

[chooseAStructureForRequiredOperations.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (ta):** சுட்டெண், உறுப்பினர் சோதனை, வரிசை அல்லது தொடர்புகளுக்குப் பொருத்தமான தொகுப்பைத் தேர்ந்தெடு.

##### தொகுப்பில் செருகும் செலவுகளை ஒப்பிடுதல்

[compareCollectionInsertionCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (ta):** செருகும்போது அணி உறுப்புகளை நகர்த்தவோ இணைப்புகளை மாற்றவோ ஏன் வேண்டியுள்ளது என்பதை அறிந்துகொள்.

##### உறுப்பை அணுகும் செலவுகளை ஒப்பிடுதல்

[compareElementAccessCosts.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (ta):** அணிகளும் இணைப்புப் பட்டியல்களும் ஓர் உறுப்பை எவ்வளவு விரைவில் அணுகுகின்றன என்பதை ஒப்பிடு.

##### தரவுக் கட்டமைப்புகளையும் படிமுறைகளையும் வேறுபடுத்துதல்

[distinguishDataStructuresFromAlgorithms.data.ts](../../../learningApps/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (ta):** கட்டமைப்பில் தரவை ஒழுங்குபடுத்துவதையும் படிமுறையால் செயலாக்குவதையும் வேறுபடுத்து.

#### மரங்கள்

Skills: 4

[trees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (ta):** மரங்கள் பெற்றோர்–குழந்தை இணைப்புகள் மூலம் தகவலை எவ்வாறு ஒழுங்கமைக்கின்றன என்பதை அறிந்துகொள்.

##### இலைக் கணுக்களையும் உள் கணுக்களையும் வேறுபடுத்துதல்

[distinguishLeafAndInternalTreeNodes.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (ta):** குழந்தைக் கணுக்கள் உள்ள கணுக்களையும் இல்லாத இலைக் கணுக்களையும் வேறுபடுத்து.

##### இருமத் தேடல் மரங்களை விளக்குதல்

[explainBinarySearchTrees.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (ta):** இருமத் தேடல் மரத்தில் தேடலைச் சாத்தியப்படுத்தும் விசை வரிசை விதியைப் புரிந்துகொள்.

##### மரத்தின் கட்டமைப்பை விளக்குதல்

[explainTreeStructure.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (ta):** மரத்தின் வேர், கிளைகள், கணுக்கள் மற்றும் இணைப்புகளை அறிந்துகொள்.

##### மரத்தில் ஒரு பாதையைக் கண்டறிதல்

[findAPathInATree.data.ts](../../../learningApps/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (ta):** மரத்தின் இரண்டு கணுக்களுக்கிடையிலுள்ள உண்மையான இணைப்புகளைப் பின்தொடர்.

### வடிவமைப்பு மாதிரிகள்

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../learningApps/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (ta):** மென்பொருள் பொருள்களை உருவாக்கவும் இணைக்கவும் ஒருங்கிணைக்கவும் மறுபயன்படும் வழிகளை ஆராய்.

#### நடத்தை மாதிரிகள்

Skills: 11

[behavioral.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (ta):** பொருள்கள் கோரிக்கைகளை எவ்வாறு ஒருங்கிணைத்து நடத்தை மாற்றுகின்றன என்பதை அறி.

##### பொறுப்புச் சங்கிலி

[chainOfResponsibility.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (ta):** கோரிக்கையை யாராவது கையாளும் வரை அடுத்தடுத்த கையாளுபவர்களிடம் அனுப்பு.

##### கட்டளை

[command.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (ta):** சேமிக்கவோ திட்டமிடவோ கூடிய பொருளாக ஒரு செயலைக் குறி.

##### மொழிபெயர்ப்பான்

[interpreter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (ta):** வெளிப்பாடுகளாக உள்ள விதிகளால் சிறிய மொழியைப் பொருள்படுத்து.

##### மீள்பயணி

[iterator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (ta):** சேமிப்புமுறையை வெளிப்படுத்தாமல் தொகுப்பின் உறுப்புகளைப் பார்வையிடு.

##### மத்தியஸ்தர்

[mediator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (ta):** மைய மத்தியஸ்தர் மூலம் கூறுகளுக்கிடையேயான தொடர்புகளை ஒருங்கிணை.

##### நினைவுக் குறிப்பு

[memento.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (ta):** பொருளின் நிலையைச் சேமித்து பின்னர் மீட்டமைக்க வழி அமை.

##### கவனிப்பாளர்

[observer.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (ta):** கவனிக்கப்படும் பொருள் மாறும்போது ஆர்வமுள்ள சந்தாதாரர்களுக்கு அறிவி.

##### நிலை

[state.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (ta):** பொருளின் தற்போதைய நிலைக்கு ஏற்ப அதன் பதிலை மாற்று.

##### உத்தி

[strategy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (ta):** ஒரே பகிர்ந்த இடைமுகத்தைப் பின்பற்றும் அல்கோரிதம்களை மாற்றிப் பயன்படுத்து.

##### வார்ப்புரு முறை

[templateMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (ta):** அல்கோரிதத்தின் முக்கிய படிகளை நிலையாக வைத்து சில படிகளை மட்டும் மாற அனுமதி.

##### பார்வையாளர்

[visitor.data.ts](../../../learningApps/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (ta):** செயல்களை அவை இயங்கும் பொருள் கட்டமைப்புகளிலிருந்து தனியாக்கு.

#### உருவாக்க மாதிரிகள்

Skills: 5

[creational.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (ta):** பயனர்களை குறிப்பிட்ட வகைகளுடன் பிணைக்காமல் பொருள்களை உருவாக்கும் மாதிரிகளை அறி.

##### சுருக்கத் தொழிற்சாலை

[abstractFactory.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (ta):** ஒத்திசையும் தொடர்புடைய பொருள் குடும்பங்களை உருவாக்கும் தொழிற்சாலையைப் பயன்படுத்து.

##### கட்டுபவர்

[builder.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (ta):** கட்டுபவர் மூலம் சிக்கலான பொருளைப் படிப்படியாக உருவாக்கு.

##### தொழிற்சாலை முறை

[factoryMethod.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (ta):** எந்தக் குறிப்பிட்ட பொருள் உருவாக வேண்டும் என்பதை துணைவகுப்புகள் தேர்ந்தெடுக்கட்டும்.

##### முன்மாதிரி

[prototype.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (ta):** ஏற்கெனவே அமைக்கப்பட்ட மாதிரியை நகலெடுத்து புதிய பொருள்களை உருவாக்கு.

##### ஒற்றை நிகழ்வு

[singleton.data.ts](../../../learningApps/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (ta):** உலகளாவிய நிலையின் அபாயங்களைக் கருத்தில் கொண்டு ஒரே பகிரப்பட்ட நிகழ்வுக்கான அணுகலைக் கட்டுப்படுத்து.

#### கட்டமைப்பு மாதிரிகள்

Skills: 7

[structural.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (ta):** மென்பொருள் கூறுகளை இணைக்கவும் சுற்றவும் பகிரவும் பயன்படும் மாதிரிகளை அறி.

##### தழுவி

[adapter.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (ta):** பொருந்தாத இடைமுகங்களுக்கு இடையே மாற்றம் செய்து அவற்றை இணை.

##### பாலம்

[bridge.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (ta):** கூறின் சுருக்கத்தையும் அது பயன்படுத்தும் செயலாக்கத்தையும் பிரி.

##### கூட்டமைப்பு

[composite.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (ta):** தனிப் பொருள்களையும் பொருள் குழுக்களையும் ஒரே இடைமுகத்தின் மூலம் கையாளு.

##### அலங்கரிப்பான்

[decorator.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (ta):** துணைவகுப்புகளைப் பெருக்காமல் பொருளைச் சுற்றி புதிய நடத்தை சேர்.

##### முகப்பு

[facade.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (ta):** சிக்கலான கூறுகளின் தொகுப்புக்கு எளிய நுழைவாயில் வழங்கு.

##### இலகு பொருள்

[flyweight.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (ta):** மீண்டும் பயன்படும் பொருள் தரவைப் பகிர்ந்து தேவையற்ற நினைவகப் பயன்பாட்டைக் குறை.

##### பதிலாள்

[proxy.data.ts](../../../learningApps/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (ta):** அதே இடைமுகம் கொண்ட மற்றொரு பொருளின் மூலம் அணுகலைக் கட்டுப்படுத்து.

### எண்ணிமப் படைப்பாற்றலும் விளையாட்டுகளும்

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (ta):** எண்ணிம ஊடகங்களை உருவாக்கி, விளையாடக்கூடிய விதிகளை வடிவமைத்து, செயல்முறை வழி உருவாக்கத்தை ஆராயுங்கள்.

#### எண்ணிமப் பொருட்கள்

Skills: 3

[digitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (ta):** குறிப்பிட்ட நோக்கத்திற்காக எண்ணிம உள்ளடக்கத்தை உருவாக்கவும் திருத்தவும் பொருத்தமான கருவிகளைத் தேர்ந்தெடுக்கவும் கற்றுக்கொள்ளுங்கள்.

##### எண்ணிமப் படைப்புக் கருவியைத் தேர்ந்தெடுத்தல்

[chooseADigitalCreativeTool.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (ta):** நீங்கள் உருவாக்க விரும்பும் படைப்புக்கு ஏற்ற மென்பொருளைத் தேர்ந்தெடுங்கள்.

##### எளிய எண்ணிமப் படைப்பை உருவாக்குதல்

[createASimpleDigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (ta):** குறிப்பிட்ட பார்வையாளர்களுக்குப் பொருத்தமான ஒழுங்கான எண்ணிம அட்டை, படம் அல்லது வேறு படைப்பை உருவாக்குங்கள்.

##### எண்ணிமப் படைப்பைத் திருத்துதல்

[editADigitalArtifact.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (ta):** ஏற்கெனவே உள்ள எண்ணிமக் கோப்பின் நோக்கத்தை மாற்றாமல் அதை மேம்படுத்துங்கள்.

#### விளையாட்டு வடிவமைப்பு

Skills: 3

[gameDesign.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (ta):** விதிகளும் வீரர்களின் செயல்களும் விளையாட்டு அனுபவத்தை எவ்வாறு வடிவமைக்கின்றன என்பதை ஆராயுங்கள்.

##### விளையாட்டு இயக்கமுறையை வடிவமைத்தல்

[designAGameMechanic.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (ta):** வீரரின் செயலை விளையாட்டு நிலை மாற்றங்களுடனும் பின்னூட்டத்துடனும் இணைக்குங்கள்.

##### விளையாட்டு விதியை உருவாக்குதல்

[formulateAGameRule.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (ta):** வீரர்கள் எதைச் செய்ய அனுமதி உள்ளது என்பதை அறியும் வகையில் தெளிவான விதியை எழுதுங்கள்.

##### எளிய விளையாட்டின் சமநிலையைச் சோதித்தல்

[testTheBalanceOfASimpleGame.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (ta):** விதிகள் விளையாட்டை நியாயமானதாகவும் சவாலானதாகவும் முடிக்கக்கூடியதாகவும் ஆக்குகின்றனவா எனச் சோதியுங்கள்.

#### செயல்முறை வழி உருவாக்கம்

Skills: 4

[proceduralGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (ta):** எளிய விதிகளிலிருந்து அல்காரிதங்கள் பல்வேறு உள்ளடக்க வடிவங்களை எவ்வாறு உருவாக்குகின்றன என்பதை அறியுங்கள்.

##### வளங்களைச் சேமித்தலையும் உருவாக்குதலையும் ஒப்பிடுதல்

[compareResourceStorageAndGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (ta):** செயல்முறை வழி உருவாக்கம் சேமிக்கும் இடத்தையும் அதற்குத் தேவைப்படும் கணக்கீட்டையும் ஒப்பிடுங்கள்.

##### உருவாக்கியின் அளவுருக்களை அமைத்தல்

[configureGeneratorParameters.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (ta):** வெளியீட்டின் தோற்றம் அல்லது அளவைக் கட்டுப்படுத்த உருவாக்கியின் அமைப்புகளை மாற்றுங்கள்.

##### செயல்முறை வழி வள உருவாக்கத்தை விளக்குதல்

[explainProceduralResourceGeneration.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (ta):** முடிந்த ஒவ்வொரு வடிவத்தையும் சேமிக்காமல் உருவாக்கி வளங்களை எவ்வாறு உருவாக்குகிறது என்பதை விளக்குங்கள்.

##### உருவாக்க விதை கொண்டு முடிவை மீண்டும் உருவாக்குதல்

[reproduceResultsUsingAGenerationSeed.data.ts](../../../learningApps/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (ta):** நிலையான விதையும் மாறாத விதிகளும் ஏன் அதே முடிவை மீண்டும் தருகின்றன என்பதைப் புரிந்துகொள்ளுங்கள்.

### எண்ணிமப் பொருள் பயனர் அனுபவம்

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (ta):** மக்கள் புரிந்துகொண்டு வழிசென்று அணுகக்கூடிய எண்ணிம அனுபவங்களை வடிவமைக்குங்கள்.

#### அணுகல்தன்மை

Skills: 2

[accessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (ta):** பல்வேறு திறன்களும் உள்ளீட்டு முறைகளும் எண்ணிம அணுகலை எவ்வாறு பாதிக்கின்றன என்பதை அறியுங்கள்.

##### பல்வேறு திறன்களைக் கொண்ட பயனர்களின் தேவைகளைக் கண்டறிதல்

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (ta):** விசைப்பலகை, பெரிதாக்கிய உரை அல்லது உதவித் தொழில்நுட்பம் பயன்படுத்துபவர்களின் தேவைகளை அறியுங்கள்.

##### எண்ணிமத் தொடர்பின் அணுகல்தன்மையைச் சோதித்தல்

[testDigitalInteractionAccessibility.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (ta):** சுட்டி அல்லது ஒலி இல்லாமல் இடைமுகத்தைச் சோதித்து தடைகளைப் பதிவு செய்யுங்கள்.

#### எண்ணிமத் தொடர்பு வடிவமைப்பு

Skills: 4

[digitalInteractionDesign.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (ta):** எண்ணிம இடைமுகங்களில் இயல்பான செயல்களையும் பயனுள்ள பதில்களையும் திட்டமிடுங்கள்.

##### எண்ணிம இடைமுகப் பின்னூட்டத்தை வடிவமைத்தல்

[designDigitalInterfaceFeedback.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (ta):** பொத்தான்கள், ஏற்ற நிலைகள் மற்றும் பிழைகள் புரிந்துகொள்ளக்கூடிய பின்னூட்டம் தருமாறு அமைக்குங்கள்.

##### எண்ணிம இடைமுக வழிசெலுத்தலை வடிவமைத்தல்

[designDigitalInterfaceNavigation.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (ta):** மக்கள் சரியான செயல்களைக் கண்டறியுமாறு திரைகளையும் வழிசெலுத்தலையும் ஒழுங்குபடுத்துங்கள்.

##### எண்ணிமப் பொருள் பயனரின் இலக்கைக் கண்டறிதல்

[identifyADigitalProductUsersGoal.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (ta):** ஒருவர் செயலி அல்லது எண்ணிமச் சாதனத்தில் எதைச் சாதிக்க விரும்புகிறார் எனக் கண்டறியுங்கள்.

##### பொதுவான எண்ணிமத் தொடர்புப் பிழைகளைத் தடுத்தல்

[preventCommonDigitalInteractionErrors.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (ta):** தவிர்க்கக்கூடிய பிழைகளைத் தடுக்க குறிச்சொற்கள், சரிபார்ப்பு மற்றும் உறுதிப்படுத்தலைப் பயன்படுத்துங்கள்.

#### அனுபவ மதிப்பீடும் நெறிமுறைகளும்

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (ta):** பயனர் சோதனையும் நேர்மையான வடிவமைப்பும் எண்ணிமப் பொருட்களை எவ்வாறு மேம்படுத்துகின்றன என்பதை ஆராயுங்கள்.

##### பயனர்களைத் தவறாக வழிநடத்தும் இடைமுக வடிவங்களைக் கண்டறிதல்

[identifyManipulativeInterfacePatterns.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (ta):** செலவுகளை மறைத்து, தேர்வுகளைத் திணித்து அல்லது ரத்துசெய்வதைத் தடுக்கும் இடைமுக உத்திகளை அறியுங்கள்.

##### எண்ணிம இடைமுகப் பயன்பாட்டுத் திறனைச் சோதித்தல்

[testDigitalInterfaceUsability.data.ts](../../../learningApps/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (ta):** கூடுதல் குறிப்புகள் இன்றி ஒருவர் உண்மையான பணியை முடிக்க முடிகிறதா என்று கவனியுங்கள்.

### எண்ணிமப் பாதுகாப்பும் பொறுப்பும்

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (ta):** தகவலைப் பாதுகாப்பது, மற்றவர்களை மதிப்பது, எண்ணிமத் தொழில்நுட்பத்தின் விளைவுகளைப் புரிவது ஆகியவற்றைக் கற்றுக்கொள்ளுங்கள்.

#### கணக்குப் பாதுகாப்பு

Skills: 9

[accountProtection.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (ta):** கணக்குகளைப் பாதுகாப்பதையும் சந்தேகத்திற்குரிய செய்திகளுக்குப் பாதுகாப்பாகப் பதிலளிப்பதையும் கற்றுக்கொள்ளுங்கள்.

##### மின்னஞ்சல் அனுப்புநரின் உண்மைத்தன்மையை மதிப்பிடுதல்

[assessAnEmailSendersAuthenticity.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (ta):** காட்டப்படும் பெயர் அல்லது படம் மட்டுமல்லாமல் அனுப்புநரின் அடையாளத்தையும் சரிபாருங்கள்.

##### இணைப்பைத் திறப்பதன் அபாயத்தை மதிப்பிடுதல்

[assessTheRiskOfFollowingALink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (ta):** சந்தேகமான இணைப்பைத் திறக்கும்போது என்ன நிகழலாம் என்பதை மதிப்பிடுங்கள்.

##### பல காரணி அங்கீகாரத்தை அமைத்தல்

[configureMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (ta):** கூடுதல் உள்நுழைவு காரணியை இயக்கி கணக்கு அணுகலைப் பாதுகாப்பாக மீட்பதற்குத் திட்டமிடுங்கள்.

##### வலுவான கடவுச்சொல் சொற்றொடரை உருவாக்குதல்

[createAStrongPassphrase.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (ta):** ஒவ்வொரு கணக்கிற்கும் வேறுபட்ட, நீளமான, கணிக்க முடியாத கடவுச்சொல் சொற்றொடர்களை உருவாக்குங்கள்.

##### பல காரணி அங்கீகாரத்தை விளக்குதல்

[explainMultiFactorAuthentication.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (ta):** சுயாதீனமான இரண்டாவது சரிபார்ப்புக் காரணி கணக்கை எவ்வாறு பாதுகாக்கிறது என்பதைப் புரிந்துகொள்ளுங்கள்.

##### மென்பொருள் புதுப்பிப்புகள் ஏன் முக்கியம் என்பதை விளக்குதல்

[explainWhySoftwareUpdatesMatter.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (ta):** அதிகாரப்பூர்வப் புதுப்பிப்புகள் பாதுகாப்புக் குறைகளைச் சரிசெய்ய உதவுவதன் காரணத்தை அறியுங்கள்.

##### ஃபிஷிங் செய்தியை அடையாளம் காணுதல்

[recognizeAPhishingMessage.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (ta):** கடவுச்சொற்கள் அல்லது குறியீடுகளைத் திருட பிறரைப் போல நடிக்கும் செய்திகளை அறியுங்கள்.

##### சந்தேகத்திற்குரிய எண்ணிமத் தொடர்புக்குப் பதிலளித்தல்

[respondToSuspiciousDigitalContact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (ta):** சந்தேகமான தொடர்புகளுக்குப் பாதுகாப்பாகச் செயல்பட்டு தனி வழியாகக் கோரிக்கைகளைச் சரிபாருங்கள்.

##### இணையதளத்தின் டொமைனைச் சரிபார்த்தல்

[verifyAWebsitesDomain.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (ta):** இணைய முகவரியில் உண்மையான டொமைனைப் படித்து ஏமாற்றும் போலி முகவரிகளை அறியுங்கள்.

#### எண்ணிமத் தொடர்பின் நெறிமுறை

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (ta):** மரியாதையுடன் தொடர்புகொள்ளவும் படைப்பாளர்களின் அனுமதிகளை மதிக்கவும் கற்றுக்கொள்ளுங்கள்.

##### எண்ணிமப் பொருட்களுக்கு படைப்பாளர் பெயரை வழங்குதல்

[attributeDigitalMaterials.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (ta):** பயன்படுத்தும் எண்ணிம உள்ளடக்கத்தின் அசல் படைப்பாளருக்கு உரிய அங்கீகாரம் வழங்குங்கள்.

##### சிக்கலைப் பாதுகாப்பாகப் புகாரளிக்கும் வழியைத் தேர்ந்தெடுத்தல்

[chooseASafeWayToReportAProblem.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (ta):** இணையச் சிக்கலைப் புகாரளிக்க நம்பகமான நபரையோ அதிகாரப்பூர்வ வழியையோ தேர்ந்தெடுங்கள்.

##### எண்ணிம உள்ளடக்க உரிமங்களை வேறுபடுத்துதல்

[distinguishDigitalContentLicenses.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (ta):** பதிப்புரிமைக் கட்டுப்பாடுகள், திறந்த உரிமங்கள், பொது உரிமைப் பொருட்கள் ஆகியவற்றை வேறுபடுத்துங்கள்.

##### இணையத்தில் பொருத்தமான நடத்தையை அறிதல்

[identifyAppropriateOnlineBehavior.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (ta):** எண்ணிமத் தொடர்பில் அச்சுறுத்தல், தொல்லை, கொடுமைப்படுத்தல் ஆகியவற்றை அறியுங்கள்.

#### தனியுரிமை

Skills: 5

[privacy.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (ta):** இணையத்தில் தகவல் பகிர்வது தனியுரிமையை எவ்வாறு பாதிக்கலாம் என்பதை அறியுங்கள்.

##### பாதுகாப்பான தரவுப் பகிர்வு முறைகளைத் தேர்ந்தெடுத்தல்

[chooseSafeDataSharingMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (ta):** உணர்வுபூர்வமான தகவலை யாருக்குக் கொடுக்கலாம், எப்படிப் பாதுகாப்பாகப் பகிரலாம் என்பதைத் தேர்ந்தெடுங்கள்.

##### தனிப்பட்ட உரையாடலையும் பொது இணைப்பையும் வேறுபடுத்துதல்

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (ta):** பகிரப்பட்ட உரையாடல் அல்லது ஆவணத்தை யார் திறக்க முடியும் என்பதைச் சரிபாருங்கள்; இணைப்பு தனிப்பட்டது என்று கருதாதீர்கள்.

##### தரவின் மறுஅடையாளம் காணுதலை விளக்குதல்

[explainDataReIdentification.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (ta):** தனித்தனியாகச் சேகரிக்கப்பட்ட விவரங்களால் ஒருவரை மீண்டும் எவ்வாறு அடையாளம் காண முடியும் என்பதை விளக்குங்கள்.

##### தனிப்பட்ட தரவை அடையாளம் காணுதல்

[identifyPersonalData.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (ta):** மற்ற விவரங்களுடன் இணைக்கும்போதும் ஒருவரை அடையாளம் காட்டக்கூடிய தகவலை அறியுங்கள்.

##### எண்ணிமத் தடயத்தை அறிதல்

[recognizeADigitalFootprint.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (ta):** இணையப் பதிவுகளும் செயல்களும் நீண்டகாலம் நிலைக்கும் தடயங்களை விடலாம் என்பதைப் புரிந்துகொள்ளுங்கள்.

#### கணினியியலின் சமூக மற்றும் சுற்றுச்சூழல் தாக்கம்

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (ta):** கணினித் தொழில்நுட்பம் நியாயம், வளப் பயன்பாடு, சுற்றுச்சூழல் ஆகியவற்றை எவ்வாறு பாதிக்கிறது என்பதை ஆராயுங்கள்.

##### பயனர் குழுக்களில் அல்காரிதத்தின் தாக்கத்தை மதிப்பிடுதல்

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (ta):** பல்வேறு பயனர் குழுக்களுக்கான முடிவுகள் நியாயமற்ற வகையில் வேறுபடுகிறதா என்று மதிப்பிடுங்கள்.

##### கணினித் தொழில்நுட்பத்தின் சுற்றுச்சூழல் தாக்கத்தை மதிப்பிடுதல்

[assessComputingsEnvironmentalImpact.data.ts](../../../learningApps/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (ta):** கணினித் தொழில்நுட்பத்தின் ஆற்றல், பொருள், மின்னணுக் கழிவு தாக்கங்களை ஒப்பிடுங்கள்.

### எண்ம அமைப்புகளும் வலையமைப்புகளும்

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (ta):** கணினி சாதனங்கள், எண்மத் தகவல், வலையமைப்புகள் எவ்வாறு இணைந்து செயல்படுகின்றன என்பதை அறிந்துகொள்.

#### எண்ம சாதனக் கூறுகள்

Skills: 3

[digitalDeviceComponents.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (ta):** வன்பொருள் பகுதிகளும் மென்பொருளும் வேறுபட்ட கணினிப் பணிகளை எவ்வாறு செய்கின்றன என்பதை அறிந்துகொள்.

##### வன்பொருளையும் மென்பொருளையும் வேறுபடுத்துதல்

[distinguishHardwareFromSoftware.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (ta):** கணினியின் பொருண்மையான பகுதிகளையும் அவற்றைக் கட்டுப்படுத்தும் மென்பொருளையும் வேறுபடுத்து.

##### செயலியின் பணியை விளக்குதல்

[explainAProcessorsFunction.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (ta):** கோப்புகளை நிரந்தரமாகச் சேமிப்பதற்குப் பதிலாகச் செயலி கட்டளைகளை எவ்வாறு நிறைவேற்றுகிறது என்பதை விளக்கு.

##### எண்ம சாதனங்களை அடையாளம் காணுதல்

[identifyDigitalDevices.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (ta):** நிரலாக்கக்கூடிய எண்மத் தகவலைச் செயலாக்கும் சாதனங்களை அறிந்துகொள்.

#### நினைவகமும் சேமிப்பகமும்

Skills: 4

[memoryAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (ta):** தற்காலிக நினைவகம், நிலைநிரல் நினைவகம், கோப்புச் சேமிப்பகம் ஆகியவற்றின் தனித்த பணிகளை அறிந்துகொள்.

##### RAM, ROM மற்றும் சேமிப்பை வேறுபடுத்துதல்

[distinguishRAMROMAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (ta):** RAM, ROM, நிலையான சேமிப்பு ஆகியவை எவ்வகைத் தகவலை வைத்திருக்க வடிவமைக்கப்பட்டுள்ளன என்பதை ஒப்பிடு.

##### நிலையான சேமிப்பை விளக்குதல்

[explainPersistentStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (ta):** மின்சாரம் அணைந்த பிறகும் சேமிப்புச் சாதனங்கள் கோப்புகளை ஏன் பாதுகாக்கின்றன என்பதைப் புரிந்துகொள்.

##### RAM-ஐ விளக்குதல்

[explainRAM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (ta):** கணினி இயங்கும்போது RAM பணிக்கான தகவலை எவ்வாறு வைத்திருக்கிறது என்பதை அறிந்துகொள்.

##### ROM-இன் நோக்கத்தை விளக்குதல்

[explainThePurposeOfROM.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (ta):** மின்சாரம் இல்லாதபோதும் தகவலைக் காக்கும் நிலைநிரல் நினைவகம் சாதனங்களைத் தொடங்க எவ்வாறு உதவுகிறது என்பதை அறி.

#### வலையமைப்பு மாதிரிகளும் நெறிமுறைகளும்

Skills: 11

[networkModelsAndProtocols.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (ta):** தகவலை அனுப்புவதற்கான விதிகளை வலையமைப்பு நெறிமுறைகள் எவ்வாறு வகுக்கின்றன என்பதை அறிந்துகொள்.

##### வலையமைப்பு அணுகல் முறைகளை ஒப்பிடுதல்

[compareNetworkAccessMethods.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (ta):** மோதல் கண்டறிதல், மோதல் தவிர்த்தல், குறி பரிமாற்றம் ஆகியவற்றை அவற்றின் பொருத்தமான சூழல்களில் ஒப்பிடு.

##### HTTP மற்றும் HTTPS ஐ வேறுபடுத்துதல்

[distinguishHTTPFromHTTPS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (ta):** HTTPS எதைப் பாதுகாக்கிறது, அது ஏன் இணையதளத்தின் நம்பகத்தன்மைக்கு உத்தரவாதமல்ல என்பதை அறிந்துகொள்.

##### OSI மற்றும் TCP/IP ஐ வேறுபடுத்துதல்

[distinguishOSIFromTCPIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (ta):** OSI இன் கருத்தியல் அடுக்குகளையும் இணையத்தின் TCP/IP நெறிமுறை அடுக்கமைப்பையும் ஒப்பிடு.

##### TCP மற்றும் UDP ஐ வேறுபடுத்துதல்

[distinguishTCPFromUDP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (ta):** நம்பகமான TCP தரவோட்டத்தையும் அதே உத்தரவாதங்கள் இல்லாத UDP செய்திகளையும் ஒப்பிடு.

##### வலையமைப்பு நெறிமுறையை விளக்குதல்

[explainANetworkProtocol.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (ta):** சாதனங்கள் செய்திகளைப் பரிமாறிக்கொள்ள ஒப்புக்கொள்ளப்பட்ட விதிகள் ஏன் தேவை என்பதை விளக்கு.

##### CSMA/CA ஐ விளக்குதல்

[explainCSMACA.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (ta):** பயன்பாட்டில் உள்ள தடத்தில் தரவு அனுப்புவதை கம்பியில்லாச் சாதனங்கள் எவ்வாறு தவிர்க்க முயல்கின்றன என்பதை விளக்கு.

##### CSMA/CD ஐ விளக்குதல்

[explainCSMACD.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (ta):** பழைய பகிரப்பட்ட ஈதர்நெட் வலையமைப்புகளுக்கு மோதல் கண்டறிதல் ஏன் தேவைப்பட்டது என்பதை அறிந்துகொள்.

##### DNS ஐ விளக்குதல்

[explainDNS.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (ta):** களப்பெயர்களிலிருந்து வலையமைப்பு முகவரிகளைக் கண்டறிய DNS எவ்வாறு உதவுகிறது என்பதை விளக்கு.

##### OSI அடுக்குகளை விளக்குதல்

[explainTheOSILayers.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (ta):** வலையமைப்புச் செயல்பாடுகளை ஒழுங்குபடுத்த ஏழு அடுக்கு OSI மாதிரியைப் பயன்படுத்து.

##### IP இன் நோக்கத்தை விளக்குதல்

[explainThePurposeOfIP.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (ta):** வலையமைப்புகளுக்கு இடையே தரவுத்தொகுப்புகளுக்கு முகவரி வழங்கி அவற்றை IP எவ்வாறு அனுப்புகிறது என்பதைப் புரிந்துகொள்.

##### டோக்கன் ரிங் முறையை விளக்குதல்

[explainTokenRing.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (ta):** குறியைப் பரிமாறுவதன் மூலம் எந்தச் சாதனம் தரவு அனுப்பலாம் என்பதை எவ்வாறு கட்டுப்படுத்தலாம் என்பதை அறிந்துகொள்.

#### வலையமைப்புகள்

Skills: 4

[networks.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (ta):** இணைக்கப்பட்ட சாதனங்கள் எவ்வாறு செய்திகளை அனுப்பி வளங்களைப் பகிர்கின்றன என்பதை அறிந்துகொள்.

##### இணையத்தையும் உலகளாவிய வலையையும் வேறுபடுத்துதல்

[distinguishTheInternetFromTheWeb.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (ta):** இணையத்தின் வலையமைப்பு உள்கட்டமைப்பையும் வலைத்தளங்களைக் கொண்ட Web-ஐயும் வேறுபடுத்து.

##### வலையமைப்பில் செய்தி சென்றடைவதை விளக்குதல்

[explainNetworkMessageDelivery.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (ta):** செய்திகள் வலையமைப்புச் சாதனங்கள் வழியாக இலக்கை எவ்வாறு அடைகின்றன என்பதைப் பின்தொடர்.

##### கணினி வலையமைப்பின் நோக்கத்தை விளக்குதல்

[explainThePurposeOfAComputerNetwork.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (ta):** தகவல் பரிமாற்றத்திற்காக தனித்த சாதனங்களை வலையமைப்பு ஏன் இணைக்கிறது என்பதை விளக்கு.

##### கம்பியில்லாத தொடர்பை விளக்குதல்

[explainWirelessCommunication.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (ta):** நேரடிக் கம்பிகளுக்குப் பதிலாகச் சமிக்ஞைகள் மூலம் சாதனங்கள் எவ்வாறு தொடர்புகொள்கின்றன என்பதை அறிந்துகொள்.

#### எண் முறைமைகள்

Skills: 4

[numeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (ta):** வெவ்வேறு அடிமானங்களைக் கொண்ட முறைமைகளில் இலக்கங்கள் எண்களை எவ்வாறு குறிக்கின்றன என்பதைக் கற்றுக்கொள்.

##### இருமம் மற்றும் பதின்மம் இடையே மாற்றுதல்

[convertBetweenBinaryAndDecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (ta):** சிறிய எண்களை இரும, பதின்ம வடிவங்களுக்கு இடையே மாற்று.

##### இருமத்தையும் பதினாறுமத்தையும் வேறுபடுத்துதல்

[distinguishBinaryAndHexadecimal.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (ta):** பிட்களின் தொகுதிகளைப் பதினாறும முறையில் ஏன் சுருக்கமாக எழுதலாம் என்பதைப் புரிந்துகொள்.

##### கணினியின் இருமத் தர்க்கத்தை விளக்குதல்

[explainComputerBinaryLogic.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (ta):** இருமப் பூஜ்ஜியம், ஒன்று ஆகியவற்றை வேறுபடுத்தக்கூடிய மின்னணுச் சமிக்ஞை நிலைகளுடன் தொடர்புபடுத்து.

##### இடமதிப்பு எண் முறைமைகளை விளக்குதல்

[explainPositionalNumeralSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (ta):** ஒரு எண்ணில் இலக்கம் இருக்கும் இடம் அதன் மதிப்பை ஏன் மாற்றுகிறது என்பதைப் புரிந்துகொள்.

#### இயக்க முறைமைகள்

Skills: 4

[operatingSystems.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (ta):** இயக்க முறைமைகள் நிரல்கள், கோப்புகள், சாதனங்களை எவ்வாறு நிர்வகிக்கின்றன என்பதை அறிந்துகொள்.

##### இயக்க முறைமைக் குடும்பங்களை வேறுபடுத்துதல்

[distinguishOperatingSystemFamilies.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (ta):** பொதுவான இயக்க முறைமைக் குடும்பங்களையும் அவற்றின் வேறுபாடுகளையும் அறிந்துகொள்.

##### இயக்க முறைமையின் செயல்நிலையை விளக்குதல்

[explainAnOSProcess.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (ta):** இயங்கிக் கொண்டிருக்கும் செயல்முறையையும் வட்டில் சேமித்த நிரல் கோப்பையும் வேறுபடுத்து.

##### இயக்க முறைமையின் நோக்கத்தை விளக்குதல்

[explainAnOperatingSystemsPurpose.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (ta):** இயக்க முறைமை மென்பொருளையும் வன்பொருளையும் எவ்வாறு ஒருங்கிணைக்கிறது என்பதைப் புரிந்துகொள்.

##### Linux இல் லினஸ் டோர்வால்ட்ஸின் பங்கை விளக்குதல்

[explainLinusTorvaldsRoleInLinux.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (ta):** Linux கரு எவ்வாறு தொடங்கியது, பல பங்களிப்பாளர்கள் ஏன் இயக்க முறைமைகளை உருவாக்குகின்றனர் என்பதை அறிந்துகொள்.

#### பிரதிநிதித்துவமும் சேமிப்பும்

Skills: 4

[representationAndStorage.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (ta):** சாதனங்கள் தகவலை எவ்வாறு குறியாகக் காட்டி சேமித்த கோப்புகளை ஒழுங்கமைக்கின்றன என்பதைக் கற்றுக்கொள்.

##### எண்மக் கோப்புகளின் அளவுகளை ஒப்பிடுதல்

[compareDigitalFileSizes.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (ta):** கோப்புகளின் அளவை ஒப்பிட்டு, வடிவமும் சுருக்கமும் ஏன் மாற்றத்தை ஏற்படுத்துகின்றன என்பதை விளக்கு.

##### எண்மக் கோப்பு வடிவங்களை வேறுபடுத்துதல்

[distinguishDigitalFormats.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (ta):** சேமித்த பிட்களை எவ்வாறு புரிந்துகொள்வது என்பதை கோப்பு வடிவம் தீர்மானிக்கிறது என அறிந்துகொள்.

##### இருமக் குறியீட்டு முறையை விளக்குதல்

[explainBinaryRepresentation.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (ta):** பூஜ்ஜியம், ஒன்று ஆகியவற்றின் தொடர்கள் வெவ்வேறு தரவு வகைகளை எவ்வாறு குறியாக்குகின்றன என்பதைப் புரிந்துகொள்.

##### அடைவுகளில் கோப்புகளை ஒழுங்கமைத்தல்

[organizeFilesInDirectories.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (ta):** பாதை வழியாக எளிதில் கண்டுபிடிக்கும்படி கோப்புகளைப் பொருத்தமான கோப்புறைகளில் அமை.

#### பணிகளைச் செயல்படுத்துதல்

Skills: 3

[taskExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (ta):** பணிகள் மாறிமாறி முன்னேறுவதற்கும் உண்மையில் ஒரே நேரத்தில் இயங்குவதற்கும் உள்ள வேறுபாட்டை அறிந்துகொள்.

##### சுயாதீனப் பணிகளைச் செயலாக்கிகளிடையே பகிர்ந்தளித்தல்

[distributeIndependentTasksAcrossExecutors.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (ta):** எந்தப் பணிகள் ஒன்றாக இயங்கலாம், எவை மற்ற முடிவுகளுக்காகக் காத்திருக்க வேண்டும் என்பதைத் திட்டமிடு.

##### ஒன்றியக்கச் செயல்பாட்டை விளக்குதல்

[explainConcurrentExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (ta):** ஒரே கணத்தில் செயல்படாமல் இருந்தாலும் பல பணிகள் எவ்வாறு முன்னேறலாம் என்பதைப் புரிந்துகொள்.

##### இணைச் செயலாக்கத்தை விளக்குதல்

[explainParallelExecution.data.ts](../../../learningApps/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (ta):** பல செயலிகள் உண்மையில் ஒரே நேரத்தில் வேலை செய்வதை அறிந்துகொள்.

### Git மற்றும் திறந்த மூலம்

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (ta):** உருவாக்குநர்கள் மாற்றங்களைக் கண்காணித்து, இணைந்து பணியாற்றி, உரிமைகளுடன் மென்பொருளைப் பகிர்வதை அறிந்துகொள்.

#### கூட்டு டிஜிட்டல் தயாரிப்பு உருவாக்கம்

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (ta):** குழுக்கள் பங்களிப்புகள், மதிப்பாய்வுகள் மற்றும் திட்டப் பதிப்புகளை எவ்வாறு ஒழுங்கமைக்கின்றன என்பதை அறிந்துகொள்.

##### பகிரப்பட்ட டிஜிட்டல் திட்ட மாற்றங்களை ஒருங்கிணைத்தல்

[coordinateChangesInASharedDigitalProject.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (ta):** யார் எதை மாற்றுவர், பகிர்ந்த மாற்றங்களை எவ்வாறு இணைப்பது எனத் திட்டமிடு.

##### பங்களிப்பு வழிகாட்டுதல்களை விளக்குதல்

[explainContributionGuidelines.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (ta):** பங்களிப்பு விதிகள் ஒரே குறியீட்டுத் தொகுப்பில் பலர் பணியாற்ற ஏன் உதவுகின்றன என்பதைப் புரிந்துகொள்.

##### டிஜிட்டல் தயாரிப்பின் பதிப்புகளைக் கண்காணித்தல்

[trackDigitalProductVersions.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (ta):** மாற்றங்கள் எப்போது நிகழ்ந்தன என்பதைக் கண்டறியவும் பழைய பணியை மீட்டெடுக்கவும் பதிப்பு வரலாற்றைப் பயன்படுத்து.

#### Git பதிப்புக் கட்டுப்பாடு

Skills: 6

[gitVersionControl.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (ta):** Git பதிப்புகளைப் பதிவுசெய்து மாற்றங்களை ஒன்றிணைக்க எவ்வாறு உதவுகிறது என்பதை அறிந்துகொள்.

##### உள்ளூர் மற்றும் தொலைநிலை களஞ்சியங்களை வேறுபடுத்துதல்

[distinguishLocalAndRemoteRepositories.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (ta):** உன் கணினியில் உள்ள பணியையும் தொலைக் களஞ்சியங்களில் பகிரப்படும் நகல்களையும் வேறுபடுத்து.

##### கிளையை விளக்குதல்

[explainABranch.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (ta):** கிளைகள் மூலம் தனித்த மாற்றத் தொடர்களில் பணியாற்றுவது எப்படி எனப் புரிந்துகொள்.

##### கமிட்டை விளக்குதல்

[explainACommit.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (ta):** கமிட் என்பது அடையாளம் கொண்ட, முந்தைய வரலாற்றுடன் இணைந்த நிலைப் படம் என்பதை அறிந்துகொள்.

##### புல் ரிக்வெஸ்டை விளக்குதல்

[explainAPullRequest.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (ta):** புல் ரிக்வெஸ்ட்கள் முன்மொழியப்பட்ட மாற்றங்களை மதிப்பாய்வுக்காக எவ்வாறு ஒழுங்கமைக்கின்றன என்பதை அறிந்துகொள்.

##### களஞ்சியத்தை விளக்குதல்

[explainARepository.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (ta):** களஞ்சியம் என்பது மாற்ற வரலாறுடன் கூடிய திட்டம் என்பதைப் புரிந்துகொள்.

##### கிளைகளை ஒன்றிணைப்பதை விளக்குதல்

[explainBranchMerging.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (ta):** கிளைகள் எவ்வாறு இணைக்கப்படுகின்றன, சில சமயம் முரண்பாடுகளை ஏன் தீர்க்க வேண்டும் என்பதை அறிந்துகொள்.

#### திறந்த மூலம்

Skills: 2

[openSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (ta):** மென்பொருளை உண்மையில் திறந்த மூலமாக்கும் அனுமதிகளை அறிந்துகொள்.

##### திறந்த மூலத்தையும் பொதுவாகக் காணக்கூடிய குறியீட்டையும் வேறுபடுத்துதல்

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (ta):** மூலக் குறியீடு காணப்படுவது மட்டும் அதனைத் திறந்த மூலமாக மாற்றாது என்பதை அறிந்துகொள்.

##### திறந்த மூலத்தை விளக்குதல்

[explainOpenSource.data.ts](../../../learningApps/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (ta):** திறந்த மூல உரிமங்கள் மென்பொருளைப் பயன்படுத்த, மாற்ற, மறுவிநியோகிக்க எப்படி அனுமதிக்கின்றன என்பதைப் புரிந்துகொள்.

### நிரலாக்க வரலாறு

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (ta):** நிரலாக்கக் கருத்துகளும் கணிப்பொறி இயந்திரங்களும் வரலாற்றில் எவ்வாறு வளர்ந்தன என்பதை அறிந்துகொள்.

#### முக்கிய பங்களிப்புகள்

Skills: 6

[keyContributions.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (ta):** நிரலாக்கம், மென்பொருள் நம்பகத்தன்மை மற்றும் கணினி வலைகளுக்கான முக்கிய பங்களிப்புகளை அறிந்துகொள்.

##### கணிக்கத்தன்மைக் கோட்பாட்டை விளக்குதல்

[explainComputabilityTheory.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (ta):** முறையான மாதிரிகள் கணினியால் கணிக்கக்கூடியவற்றையும் முடியாதவற்றையும் எவ்வாறு காட்டுகின்றன என்பதை அறிந்துகொள்.

##### ஆரம்பகால மின்னணு நிரலாக்கத்தை விளக்குதல்

[explainEarlyElectronicProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (ta):** ஆரம்பகால மின்னணுக் கணினிக் குழுக்கள் நிரல்களை உருவாக்கிச் சோதித்ததை அறிந்துகொள்.

##### நிரல்மொழிமாற்றிகளின் வளர்ச்சியை விளக்குதல்

[explainTheDevelopmentOfCompilers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (ta):** நிரல்மொழிமாற்றிகள் வாசிக்க எளிய மொழிகளில் நிரல் எழுதுவதை எவ்வாறு எளிதாக்கின என்பதை அறிந்துகொள்.

##### மென்பொருள் நம்பகத்தன்மையின் வளர்ச்சியை விளக்குதல்

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (ta):** அப்பல்லோ பயணங்களில் பிழை கையாளுதலும் நம்பகமான மென்பொருளும் ஏன் முக்கியமானவை என்பதைப் புரிந்துகொள்.

##### பிணையச் சுழற்சிகளை நீக்குவதை விளக்குதல்

[explainTheEliminationOfNetworkLoops.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (ta):** ஸ்பானிங் ட்ரீ நெறிமுறை உள்ளூர் வலைச் சுழற்சிகளை எவ்வாறு தடுக்கிறது என்பதை அறிந்துகொள்.

##### நிரலாக்கத்தின் தொடக்கத்தை விளக்குதல்

[explainTheOriginsOfProgramming.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (ta):** ஆரம்ப இயந்திர வடிவமைப்புகளும் ஏடா லவ்லேஸின் பணியும் நிரலாக்கத்திற்கு எவ்வாறு முன்னோடியாக இருந்தன என்பதை அறிந்துகொள்.

#### இயந்திரங்களும் மறையீட்டுப் பகுப்பாய்வும்

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (ta):** இயந்திரங்களும் கணித முறைகளும் வரலாற்று மறையீட்டுப் பகுப்பாய்வுக்கு எப்படி உதவின என்பதை அறிந்துகொள்.

##### வரலாற்று மறையீட்டுப் பகுப்பாய்வு முறைகளை விளக்குதல்

[explainHistoricalCryptanalysisMethods.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (ta):** மறையீட்டுப் பகுப்பாய்வாளர்கள் வடிவங்களையும் முறையான சோதனைகளையும் பயன்படுத்தி குறியீடுகளை உடைத்ததை அறிந்துகொள்.

##### நிரலாக்கத்தக்க கணினிகளின் வளர்ச்சியை விளக்குதல்

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (ta):** இயந்திரக் கணக்கீட்டுக் கருத்துகளிலிருந்து நிரலாக்கத்தக்க மின்னணு இயந்திரங்கள் வரை வளர்ச்சியைப் பின்தொடர்.

##### பொம்பே இயந்திரத்தின் நோக்கத்தை விளக்குதல்

[explainThePurposeOfTheBombe.data.ts](../../../learningApps/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (ta):** பொம்பே இயந்திரம் சாத்தியமான எனிக்மா அமைப்புகளைச் சோதிக்க எவ்வாறு உதவியது என்பதைப் புரிந்துகொள்.

### தகவலும் தரவும்

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (ta):** நம்பகமான தகவலைக் கண்டுபிடித்து தரவை ஒழுங்குபடுத்தி நிச்சயமின்மையைப் பற்றி ஆராய்.

#### தரவு சேகரிப்பும் ஒழுங்கமைப்பும்

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (ta):** தொடர்புடைய தகவலைச் சேகரித்து ஒப்பிடக்கூடிய பதிவுகளை ஒழுங்கமைக்கக் கற்றுக்கொள்.

##### சீராகத் தரவு சேகரித்தல்

[collectDataConsistently.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (ta):** ஒரே விதிகளையும் அலகுகளையும் பயன்படுத்தி அளவீடுகளைச் சேகரி.

##### பண்பின்படி தரவைத் தொகுத்தல்

[groupDataByAttribute.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (ta):** ஒரு தெளிவான பண்பின் அடிப்படையில் பதிவுகளைத் தொகுத்து அமை.

##### பணிக்குத் தேவையான தரவை அடையாளம் காணுதல்

[identifyDataNeededForATask.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (ta):** ஒரு கேள்விக்கு உண்மையில் எந்தப் புலங்களும் கவனிப்புகளும் தேவை எனத் தீர்மானி.

##### அட்டவணையில் தரவை வழங்குதல்

[presentDataInATable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (ta):** தலைப்பிடப்பட்ட வரிசைகள், நெடுவரிசைகள் மற்றும் ஒரே மாதிரியான மதிப்புகளுடன் அட்டவணை அமை.

#### தரவுத்தளங்கள்

Skills: 5

[databases.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (ta):** தரவுத்தளங்கள் பதிவுகளை எவ்வாறு கட்டமைத்து தொடர்புடைய தகவல்களை இணைக்கின்றன என்பதை அறி.

##### எளிய தரவுத்தளத் திட்டத்தை வடிவமைத்தல்

[designASimpleDatabaseSchema.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (ta):** பொருத்தமான உறுப்புகள், புலங்கள் மற்றும் தொடர்புகளைக் கொண்ட எளிய தரவுத்தளத்தைத் திட்டமிடு.

##### பதிவுகளையும் புலங்களையும் வேறுபடுத்துதல்

[distinguishRecordsAndFields.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (ta):** ஒரு பதிவையும் அதை விவரிக்கும் புலங்களையும் வேறுபடுத்து.

##### தரவுத்தள அட்டவணையை விளக்குதல்

[explainADatabaseTable.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (ta):** ஒரே வகை பதிவுகளை அட்டவணை எவ்வாறு சேமிக்கிறது என்பதைப் புரிந்துகொள்.

##### முதன்மைச் சாவிகளை விளக்குதல்

[explainPrimaryKeys.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (ta):** ஒவ்வொரு பதிவுக்கும் நிலையான தனித்துவச் சாவி ஏன் தேவை என்பதை விளக்கு.

##### அட்டவணைகளுக்கிடையேயான உறவுகளை மாதிரியாக்குதல்

[modelRelationshipsBetweenTables.data.ts](../../../learningApps/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (ta):** அடையாளங்களைப் பயன்படுத்தி வெவ்வேறு அட்டவணைத் தகவல்களை இணை.

#### தகவல் தேடலும் சரிபார்ப்பும்

Skills: 4

[informationSearchAndVerification.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (ta):** ஆதாரங்களைத் தேடி ஒரு கூற்று ஆதரிக்கப்படுகிறதா எனப் பார்க்கக் கற்றுக்கொள்.

##### தகவல் மூலங்களை ஒப்பிடுதல்

[compareInformationSources.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (ta):** பல மூலங்களை ஒப்பிட்டு அவற்றின் விளக்கங்களில் வேறுபாடுகளைக் கண்டறி.

##### செய்திகளையும் தரவையும் வேறுபடுத்துதல்

[distinguishMessagesFromData.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (ta):** பதிவான மதிப்பையும் அதற்குச் செய்தி தரும் பொருளையும் வேறுபடுத்து.

##### தகவல் தேடல் வினவலை உருவாக்குதல்

[formulateAnInformationQuery.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (ta):** தேவையான தகவலுக்குப் பொருத்தமான குறிப்பிட்ட தேடல் சொற்களைத் தேர்ந்தெடு.

##### மூலத்துடன் ஒப்பிட்டு கூற்றைச் சரிபார்த்தல்

[verifyAClaimAgainstASource.data.ts](../../../learningApps/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (ta):** மீண்டும் மீண்டும் கூறுவதற்குப் பதிலாக பொருத்தமான ஆதாரத்துடன் கூற்றைச் சரிபார்.

#### நிகழ்தகவும் நிச்சயமின்மையும்

Skills: 7

[probabilityAndUncertainty.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (ta):** நிகழக்கூடிய நிகழ்வுகள், அவற்றின் நிகழ்தகவு மற்றும் முன்னறிவிப்பின் எல்லைகளை ஆராய்.

##### எளிய நிகழ்வுகளின் நிகழ்தகவுகளை ஒப்பிடுதல்

[compareProbabilitiesOfSimpleEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (ta):** ஒரே ஊகங்களின் கீழ் இரண்டு விளைவுகளின் வாய்ப்புகளை ஒப்பிடு.

##### நிகழக்கூடிய தன்மையையும் நிகழ்தகவையும் வேறுபடுத்துதல்

[distinguishPossibilityFromProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (ta):** ஒரு நிகழ்வு நிகழக்கூடியது என்பதால் அது அதிக வாய்ப்புடையது ஆகாது என்பதை அறி.

##### சீரற்ற மற்றும் நிர்ணயிக்கப்பட்ட நிகழ்வுகளை வேறுபடுத்துதல்

[distinguishRandomAndDeterministicEvents.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (ta):** விதியால் நிர்ணயிக்கப்படும் விளைவுகளையும் தற்செயலாகத் தேர்ந்தெடுக்கப்படுபவற்றையும் வேறுபடுத்து.

##### நிகழ்வு நிகழக்கூடிய தன்மையை விளக்குதல்

[explainEventPossibility.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (ta):** கொடுக்கப்பட்ட நிபந்தனைகளில் ஒரு விளைவு நிகழ முடியுமா என முடிவுசெய்.

##### நிகழ்வின் நிகழ்தகவை விளக்குதல்

[explainEventProbability.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (ta):** குறிப்பிட்ட நிகழ்தகவு மாதிரியால் நிகழ்வு நடைபெறும் வாய்ப்பை மதிப்பிடு.

##### முன்னறிவிப்பின் வரம்புகளை விளக்குதல்

[explainLimitsOfPrediction.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (ta):** நிகழ்தகவு தெரிந்தாலும் ஒரு முயற்சியின் விளைவை ஏன் உறுதியாகக் கூற முடியாது என்பதை விளக்கு.

##### மாதிரியில் தற்செயல்தன்மையைப் பயன்படுத்துதல்

[useRandomnessInAModel.data.ts](../../../learningApps/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (ta):** நிகழக்கூடிய விளைவுகளை வரையறுத்தபடி மாதிரியில் தற்செயல் தேர்வுகளைச் சேர்.

#### புள்ளியியல் ஆய்வு

Skills: 4

[statisticalInvestigation.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (ta):** விளக்கப்படங்கள், நிகழ்வெண்கள், ஒப்பீடுகள் மூலம் தரவை ஆராயக் கற்றுக்கொள்.

##### கவனிப்புத் தொகுப்புகளை ஒப்பிடுதல்

[compareSetsOfObservations.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (ta):** ஒரே அளவீடுகள் அல்லது வகைகளைப் பயன்படுத்தி இரண்டு தரவுத் தொகுப்புகளை ஒப்பிடு.

##### எளிய விளக்கப்படம் உருவாக்குதல்

[constructASimpleChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (ta):** தரவு விகிதங்களைத் துல்லியமாகக் காட்டும் தெளிவான விளக்கப்படம் உருவாக்கு.

##### மிக அதிகம் வரும் மதிப்பைக் கண்டறிதல்

[findTheMostFrequentValue.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (ta):** ஒரு தொகுப்பில் மிக அதிக முறை தோன்றும் மதிப்பைக் கண்டறி.

##### விளக்கப்படத்தை வாசித்தல்

[readAChart.data.ts](../../../learningApps/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (ta):** அளவுகோல், குறிச்சொல், மதிப்புகளைச் சரியாக வாசித்து காட்சியால் தவறாக வழிநடத்தப்படாதே.

### நிரலாக்கம்

Groups: 8 · Skills: 37

[programming.data.ts](../../../learningApps/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (ta):** கணினி செயல்படுத்தும் வழிமுறைகளைப் புரிந்துகொள்ளவும் எழுதவும் சோதிக்கவும் கற்றுக்கொள்.

#### தரவு வகைகளும் மேற்கோள்களும்

Skills: 6

[dataTypesAndReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (ta):** வகைகளும் குறிப்புகளும் நிரல்கள் பயன்படுத்தக்கூடிய மதிப்புகளை எவ்வாறு பாதிக்கின்றன என்பதை அறிந்துகொள்.

##### மதிப்பு நகலெடுப்பையும் பகிர்ந்த குறிப்புகளையும் வேறுபடுத்துதல்

[distinguishValueCopyingFromSharedReferences.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (ta):** இரு மாறிகள் எப்போது ஒரே பொருளைப் பகிர்கின்றன, எப்போது தனித்த மதிப்புகளைக் கொண்டுள்ளன என்பதை விளக்கு.

##### மதிப்பு வகைகளை வேறுபடுத்துதல்

[distinguishValueTypes.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (ta):** மதிப்பு எண், உரை அல்லது பூலியன் வகையா, அதை வைத்து என்ன செய்யலாம் எனக் கண்டறி.

##### தரவு வகை ஒப்பந்தத்தை விளக்குதல்

[explainADataTypeContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (ta):** ஒரு நிரல் செயற்கூறு எந்த வகை மதிப்பைப் பெற எதிர்பார்க்கிறது என்பதைப் புரிந்துகொள்.

##### கூட்டு தரவுக் கட்டமைப்புகளை விளக்குதல்

[explainCompositeDataStructures.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (ta):** பல மதிப்புகளை ஒழுங்கமைக்கும் பட்டியல்கள், அணிகள், பதிவுகளை அறிந்துகொள்.

##### ஒரு மொழியின் அடிப்படை மதிப்புகளை விளக்குதல்

[explainPrimitiveValuesInALanguage.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (ta):** தேர்ந்தெடுத்த நிரலாக்க மொழி வரையறுக்கும் எளிய மதிப்பு வகைகளை அறிந்துகொள்.

##### ஒப்பந்தத்தின்படி தரவைச் சரிபார்த்தல்

[validateDataAgainstAContract.data.ts](../../../learningApps/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (ta):** உள்ளீட்டைப் பயன்படுத்தும்முன் அது தேவையான வகை அல்லது அமைப்புடன் பொருந்துகிறதா எனச் சரிபார்.

#### செயற்கூறுகளும் மீள்பயன்பாடும்

Skills: 5

[functionsAndReuse.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (ta):** மீண்டும் பயன்படுத்தக்கூடிய செயல்களைச் செயற்கூறுகளாக ஒழுங்கமைக்கக் கற்றுக்கொள்.

##### மாறிலி மதிப்புகளுடன் செயற்கூறை அழைத்தல்

[callAFunctionWithArguments.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (ta):** செயற்கூறை உள்ளீட்டு மதிப்புகளுடன் அழைத்து அவை எவ்வாறு பயன்படுகின்றன என்பதைப் பின்தொடர்.

##### அளபுருக்களுடன் செயற்கூறை வரையறுத்தல்

[defineAFunctionWithParameters.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (ta):** நிலையான எடுத்துக்காட்டு மதிப்புகளுக்குப் பதிலாக அளபுருக்களை ஏற்கும் செயற்கூறை எழுது.

##### தற்சுழற்சியை விளக்குதல்

[explainRecursion.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (ta):** மீளழைப்பு செயற்கூறு சிறிய நிலைகளைத் தீர்த்து இறுதியில் எவ்வாறு நிற்கிறது என்பதைப் புரிந்துகொள்.

##### செயற்கூறின் நோக்கத்தை விளக்குதல்

[explainThePurposeOfAFunction.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (ta):** பெயரிடப்பட்ட செயற்கூறு அழைக்கப்படும்போது ஒரு செயலை எவ்வாறு செய்கிறது என்பதை விளக்கு.

##### செயற்கூறின் திருப்புமதிப்பைப் பயன்படுத்துதல்

[useAFunctionsReturnValue.data.ts](../../../learningApps/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (ta):** திரும்பக் கிடைத்த மதிப்பைக் காட்டுவதோடு நிற்காமல் மேலும் கணக்கீடுகளில் பயன்படுத்து.

#### நிரல் தரவு

Skills: 3

[programData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (ta):** இயங்கும் நிரல் பயன்படுத்தும் மதிப்புகளையும் மாறும் நிலையையும் கையாளக் கற்றுக்கொள்.

##### நிரல் நிலையைப் புதுப்பித்தல்

[updateProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (ta):** முன்பு நடந்ததைப் பொறுத்து நிரலில் சேமித்த நிலையை மாற்று.

##### மாறியைப் பயன்படுத்துதல்

[useAVariable.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (ta):** ஒரு மதிப்பை மாறிப் பெயரில் சேமித்து தேவைப்படும்போது வாசி.

##### உள்ளீட்டுத் தரவைப் பயன்படுத்துதல்

[useInputData.data.ts](../../../learningApps/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (ta):** நிரலுக்கு வெளியிலிருந்து வந்த தகவலைப் பயன்படுத்தி அதன் நடத்தையை நிர்ணயி.

#### நிரல் அமைப்பும் தொடரியலும்

Skills: 4

[programStructureAndSyntax.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (ta):** நிரலாக்க மொழிகள் முக்கியச் சொற்கள், கோவைகள், தொகுதிகளை எவ்வாறு ஒழுங்கமைக்கின்றன என்பதைக் கற்றுக்கொள்.

##### முக்கியச் சொற்களையும் அடையாளங்காட்டிகளையும் வேறுபடுத்துதல்

[distinguishKeywordsFromIdentifiers.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (ta):** மொழியின் ஒதுக்கப்பட்ட சொற்களையும் நிரலாளர்கள் தேர்ந்தெடுக்கும் பெயர்களையும் வேறுபடுத்து.

##### செயலிகள், கோவைகள், கூற்றுகளை வேறுபடுத்துதல்

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (ta):** செயலிகள், கோவைகள், கூற்றுகளின் வேறுபாடுகளை அறிந்துகொள்.

##### கூற்றுத் தொகுதிகளின் எல்லைகளை விளக்குதல்

[explainStatementBlockBoundaries.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (ta):** எந்தக் கட்டளைகள் மடக்கு, செயற்கூறு அல்லது நிபந்தனைத் தொகுதிக்குள் உள்ளன என்பதை அறி.

##### தொடரியல் வண்ணமிடுதலை விளக்குதல்

[explainSyntaxHighlighting.data.ts](../../../learningApps/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (ta):** குறியீட்டின் நிறங்கள் எதை வெளிப்படுத்துகின்றன, எதை உறுதிசெய்ய முடியாது என்பதைப் புரிந்துகொள்.

#### நிரலாக்கக் கட்டமைப்புகள்

Skills: 7

[programmingConstructs.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (ta):** வரிசைகள், நிபந்தனைகள், மடக்குகள், நிகழ்வுகள் மூலம் நிரல்களைக் கட்டுப்படுத்தக் கற்றுக்கொள்.

##### முடிவில்லா மடக்கைக் கண்டறிதல்

[detectAnInfiniteLoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (ta):** நிபந்தனை ஒருபோதும் பொய்யாகாததால் நிற்காத மடக்கைக் கண்டுபிடி.

##### நிகழ்வைக் கையாளுதல்

[handleAnEvent.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (ta):** பொத்தான் அழுத்தம், செய்தி அல்லது வேறு நிகழ்வின்போது நிரல் பதிலளிக்குமாறு அமை.

##### மடக்கைச் செயல்படுத்துதல்

[implementALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (ta):** சரியான நிறுத்த நிபந்தனை வரும்வரை கட்டளைகளை மீண்டும் செய்ய மடக்கைப் பயன்படுத்து.

##### நிபந்தனை சார்ந்த நடத்தையைச் செயல்படுத்துதல்

[implementConditionalBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (ta):** நிபந்தனைகள் மாறும்போது நிரல் வேறு செயல்களைத் தேர்வுசெய்யுமாறு அமை.

##### மடக்கில் மாறாத கணக்கீடுகளை வெளியே நகர்த்துதல்

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (ta):** மீளும் போது மாறாத கணக்கீடுகளை மடக்கிற்கு வெளியே நகர்த்து.

##### ஒன்றுடன் ஒன்று பொருந்தும் நிபந்தனைச் சோதனைகளை வரிசைப்படுத்துதல்

[orderOverlappingConditionalChecks.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (ta):** சிறப்புச் சூழல்களும் பரிசோதிக்கப்படும் வகையில் நிபந்தனைகளை வரிசைப்படுத்து.

##### கட்டளைகளின் தொடரை எழுதுதல்

[writeASequenceOfCommands.data.ts](../../../learningApps/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (ta):** திட்டமிட்ட வரிசையில் செயல்களைச் செய்யும் சரியான கட்டளைகளை எழுது.

#### நிரலாக்க முன்னுதாரணங்கள்

Skills: 4

[programmingParadigms.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (ta):** நிரலின் தர்க்கத்தையும் நடத்தையையும் ஒழுங்கமைக்கும் பல்வேறு முறைகளை அறிந்துகொள்.

##### கட்டளைமுறை மற்றும் அறிவிப்புமுறை அணுகுமுறைகளை வேறுபடுத்துதல்

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (ta):** தெளிவான கட்டளைகள் வழங்குவதையும் வேண்டிய முடிவை விவரிப்பதையும் ஒப்பிடு.

##### செயற்கூறு நிரலாக்கத்தை விளக்குதல்

[explainFunctionalProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (ta):** செயற்கூறுகளை இணைத்து மதிப்புகளை மாற்றும் நிரல்களைப் புரிந்துகொள்.

##### பொருள்நோக்கு நிரலாக்கத்தை விளக்குதல்

[explainObjectOrientedProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (ta):** நிலையும் நடத்தையும் கொண்ட, ஒன்றுடன் ஒன்று தொடர்புகொள்ளும் பொருள்களால் உருவான நிரல்களை அறிந்துகொள்.

##### செயல்முறை நிரலாக்கத்தை விளக்குதல்

[explainProceduralProgramming.data.ts](../../../learningApps/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (ta):** படிப்படியான செயல்முறைகளின் அடிப்படையில் அமைக்கப்பட்ட நிரல்களை அறிந்துகொள்.

#### நிரல்களை வாசித்தல்

Skills: 4

[readingPrograms.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (ta):** நிரலை வாசித்து அது என்ன செய்கிறது என்பதைக் கண்டறியும் முறையை அறிந்துகொள்.

##### ஒரு கட்டளையின் நோக்கத்தை விளக்குதல்

[explainACommandsPurpose.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (ta):** ஒரு நிரலாக்கக் கட்டளை நிரலின் நிலையை எவ்வாறு மாற்றுகிறது என்பதை விளக்கு.

##### செயல்படுத்தும் வரிசையின் விளைவுகளை முன்கணித்தல்

[predictConsequencesOfExecutionOrder.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (ta):** கட்டளைகளின் வரிசையை மாற்றினால் முடிவு ஏன் மாறக்கூடும் என்பதை விளக்கு.

##### நிரல் வெளியீட்டை முன்கணித்தல்

[predictProgramOutput.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (ta):** கொடுக்கப்பட்ட உள்ளீடுகளுக்கு நிரல் காட்டும் முடிவு என்னவென்று கண்டறி.

##### நிரலின் நிலையைப் பின்தொடர்தல்

[traceProgramState.data.ts](../../../learningApps/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (ta):** நிரல் இயங்கும்போது மாறிகளும் மற்ற மதிப்புகளும் எவ்வாறு மாறுகின்றன என்பதைப் பின்தொடர்.

#### சோதனையும் பிழைத்திருத்தமும்

Skills: 4

[testingAndDebugging.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (ta):** நிரல்களில் பிழைகளைக் கண்டுபிடித்து விளக்கி சரிசெய்வது எப்படி என்பதை அறிந்துகொள்.

##### தவறான நிரல் நடத்தையைக் கண்டறிதல்

[detectIncorrectProgramBehavior.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (ta):** நிரலின் செயல்பாடு தேவைகளுடன் பொருந்தாதபோது அதை அறிந்துகொள்.

##### நிரல் குறைபாட்டைச் சரிசெய்தல்

[fixAProgramDefect.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (ta):** ஒரு குறிப்பிட்ட குறையைச் சரிசெய்து தேவையான செயல்பாடு இன்னும் இயங்குகிறதா எனச் சரிபார்.

##### பிழையின் காரணத்தைக் கண்டுபிடித்தல்

[locateTheCauseOfAnError.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (ta):** நிரலாக்கப் பிழையை ஏற்படுத்தும் கட்டளை அல்லது நிபந்தனை வரை பின்தொடர்.

##### பல்வேறு உள்ளீடுகளால் நிரலைச் சோதித்தல்

[testAProgramWithDifferentInputs.data.ts](../../../learningApps/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (ta):** எல்லை நிலைகள் உட்பட பல உள்ளீடுகளுடன் நிரலைச் சோதித்துப் பார்.

### ரோபோவியலும் தானியக்கமும்

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (ta):** உணரிகள், நிரலாக்கம், இயக்கிகள் ஆகியவை ரோபோக்களைச் சூழலுக்கு ஏற்ப எவ்வாறு செயல்படச் செய்கின்றன என்பதை ஆராயுங்கள்.

#### ரோபோ கட்டுப்பாடு

Skills: 4

[robotControl.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (ta):** ரோபோவின் இயக்கங்களுக்கும் பதில்களுக்கும் அறிவுறுத்தல்களை உருவாக்கி மேம்படுத்துங்கள்.

##### ரோபோவின் மீளும் செயலை அமைத்தல்

[configureARepeatedRobotAction.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (ta):** ரோபோ ஒரு செயலை எத்தனை முறை மீண்டும் செய்ய வேண்டும் அல்லது எப்போது நிற்க வேண்டும் என்பதை அமைக்குங்கள்.

##### ரோபோ இயக்கத் தொடரை உருவாக்குதல்

[createARobotMovementSequence.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (ta):** ரோபோ இலக்கை அடைய வேண்டிய இயக்கக் கட்டளைகளை வரிசைப்படுத்தித் திட்டமிடுங்கள்.

##### ரோபோ நடத்தையில் பிழைகளைத் திருத்துதல்

[debugRobotBehavior.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (ta):** ரோபோவின் எதிர்பாராத நடத்தை உணர்தல், கட்டுப்பாட்டு விதி அல்லது செயல் எதனால் வருகிறது என்று கண்டறியுங்கள்.

##### தடைகளுக்கு ரோபோ பதிலளிப்பதைச் செயல்படுத்துதல்

[implementRobotObstacleResponse.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (ta):** உணரி தடையைக் கண்டால் ரோபோ நிற்க, திரும்ப அல்லது தவிர்க்கும் விதமாகச் செயல்படுத்துங்கள்.

#### ரோபோ அமைப்பின் கூறுகள்

Skills: 4

[roboticSystemComponents.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (ta):** ரோபோ சூழலை எவ்வாறு உணர்ந்து, என்ன செய்வது என முடிவெடுத்து, செயல்படுகிறது என்பதை அறியுங்கள்.

##### ரோபோ கட்டுப்படுத்தியை அடையாளம் காணுதல்

[identifyARobotController.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (ta):** உணரி உள்ளீடுகளை நிரலிடப்பட்ட செயல்களாக மாற்றும் கட்டுப்படுத்தியை அறியுங்கள்.

##### உணரியின் நோக்கத்தை அடையாளம் காணுதல்

[identifyASensorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (ta):** ஒளி, தூரம், வெப்பநிலை அல்லது பிற நிலைகளை அளக்கும் உணரிகளை அறியுங்கள்.

##### இயக்கியின் நோக்கத்தை அடையாளம் காணுதல்

[identifyAnActuatorsPurpose.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (ta):** மோட்டார்கள், விளக்குகள் மற்றும் பிற இயக்கிகள் கட்டளைகளை எவ்வாறு நிறைவேற்றுகின்றன என்பதை விளக்குங்கள்.

##### உணரியிலிருந்து செயலுக்கு உள்ள தொடர்பை மாதிரியாக்குதல்

[modelTheSensorToActionRelationship.data.ts](../../../learningApps/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (ta):** உணரி அளவீடு, முடிவெடுக்கும் விதி, இயக்கியின் பதில் ஆகியவற்றைத் தொடர்புபடுத்துங்கள்.

### மென்பொருள் கட்டமைப்பு

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (ta):** பொருள்கள், பொறுப்புகள், சார்புகள் இணைந்து நம்பகமான மென்பொருளை எவ்வாறு ஒழுங்கமைக்கின்றன என்பதை ஆராய்.

#### வடிவமைப்புக் கோட்பாடுகள்

Skills: 8

[designPrinciples.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (ta):** மென்பொருள் புரிந்துகொள்ள எளிதாகவும் மாற்றத்திற்குத் தகுந்ததாகவும் இருப்பதற்கான கோட்பாடுகளை அறி.

##### தேவையற்ற அம்சங்களை ஒத்திவைத்தல் (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (ta):** கற்பனையான எதிர்காலத் தேவைக்காக மட்டுமே அம்சங்களை உருவாக்காதே.

##### ஒப்பந்தங்களைச் சார்ந்து வடிவமைத்தல் (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (ta):** குறிப்பிட்ட சேவைகளுக்குப் பதிலாக ஒப்பந்தங்களைச் சார்ந்து வணிகத் தருக்கத்தைப் பிரி.

##### மையத்தை மாற்றாமல் நடத்தையை விரிவாக்குதல் (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (ta):** நிலையான மையத் தருக்கத்தை மாற்றாமல் புதிய நடத்தைக்கு விரிவாக்கப் புள்ளிகளை வடிவமை.

##### தேவையற்ற மீளுருவாக்கத்தைக் கண்டறிதல் (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (ta):** பின்னர் முரண்பட்ட மாற்றங்களை ஏற்படுத்தக்கூடிய மீண்டும் எழுதப்பட்ட விதிகளைக் கண்டறி.

##### ஒரே பொறுப்பைத் தனியாக்குதல் (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (ta):** ஒரு ஒன்றுபட்ட மாற்றக் காரணத்தைக் கொண்டு தொகுதியை அமை.

##### தேவையற்ற சிக்கலைக் குறைத்தல் (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (ta):** தேவைகளால் நியாயப்படுத்தப்படாத அமைப்புகளை நீக்கி மென்பொருளை எளிதாக்கு.

##### சிறிய இடைமுகங்களைப் பிரித்தல் (ISP)

[separateNarrowInterfacesISP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (ta):** பயனர்கள் பயன்படுத்தும் செயல்கள் மட்டுமே தேவையாகும் அளவு இடைமுகங்களைச் சிறியதாக வைத்திரு.

##### மாற்றீட்டுத் தகுதியைச் சரிபார்த்தல் (LSP)

[verifySubstitutabilityLSP.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (ta):** செயலாக்கம் பகிரப்பட்ட ஒப்பந்தத்தின் உறுதிகளைப் பின்பற்றுகிறதா எனச் சரிபார்.

#### பொருள் மாதிரி

Skills: 13

[objectModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (ta):** மென்பொருள் பொருள்கள் நிலையும் நடத்தையும் எவ்வாறு இணைக்கின்றன என்பதை அறி.

##### பொருள் சுருக்கத்தைப் பயன்படுத்துதல்

[applyObjectAbstraction.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (ta):** ஒரு கூறு பயனர்களுக்கு வெளிப்படுத்த வேண்டிய அத்தியாவசிய செயல்களைத் தேர்ந்தெடு.

##### வகுப்பையும் பொருளையும் வேறுபடுத்துதல்

[distinguishAClassFromAnObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (ta):** வகுப்பின் வடிவமைப்பையும் தனித்த தற்போதைய மதிப்புகளைக் கொண்ட பொருள்களையும் வேறுபடுத்து.

##### உண்மைப் பொருளையும் அதன் சுருக்க மாதிரியையும் வேறுபடுத்துதல்

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (ta):** ஒரு மென்பொருள் மாதிரி ஏதோ ஒன்றின் தேர்ந்த சில பண்புகளையே காட்டுகிறது என்பதை அறி.

##### பொருளின் முறையை விளக்குதல்

[explainAnObjectMethod.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (ta):** ஒரு முறையை அழைப்பதால் பொருளின் நிலையை எவ்வாறு வாசிக்கவோ மாற்றவோ முடியும் என்பதை விளக்கு.

##### பொருளின் பண்பை விளக்குதல்

[explainAnObjectProperty.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (ta):** சேமிக்கப்பட்ட பண்பையும் பொருள் செய்யக்கூடிய செயல்களையும் வேறுபடுத்து.

##### உள்ளடக்கப் பாதுகாப்பை விளக்குதல்

[explainEncapsulation.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (ta):** கட்டுப்படுத்தப்பட்ட முறைகள் மூலம் பொருள்கள் தங்கள் உள் நிலையை எவ்வாறு பாதுகாக்கின்றன என்பதை அறி.

##### மரபுரிமையை விளக்குதல்

[explainInheritance.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (ta):** சிறப்புப் வகுப்பு பொதுவான வகுப்பின் நடத்தையை எவ்வாறு பெற்றுக்கொள்கிறது என்பதை விளக்கு.

##### பலவடிவத் தன்மையை விளக்குதல்

[explainPolymorphism.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (ta):** வெவ்வேறு பொருள்கள் ஒரே செயல்பாட்டை வெவ்வேறு முறைகளில் எவ்வாறு நிறைவேற்றுகின்றன என்பதை அறி.

##### வகுப்பின் கருத்தை விளக்குதல்

[explainTheConceptOfAClass.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (ta):** தனித்தனி பொருள்கள் உருவாக்கப்படும் வரையறையாக வகுப்பைப் புரிந்துகொள்.

##### மென்பொருள் பொருளின் அமைப்பை விளக்குதல்

[explainTheStructureOfASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (ta):** ஒரு மென்பொருள் பொருளின் அடையாளம், பண்புகள், முறைகளை அறி.

##### பொருளின் நிலையையும் நடத்தையையும் கண்டறிதல்

[identifyAnObjectsStateAndBehavior.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (ta):** பொருளின் பண்புகளையும் அது செய்யக்கூடிய செயல்களையும் விவரி.

##### கள உருப்படியை மென்பொருள் பொருளாக மாதிரியாக்குதல்

[modelADomainEntityAsASoftwareObject.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (ta):** பொருத்தமான பண்புகளையும் செயல்களையும் தேர்ந்தெடுத்து பயனுள்ள பொருளை வடிவமை.

##### பொருள் சேர்க்கையை மாதிரியாக்குதல்

[modelObjectComposition.data.ts](../../../learningApps/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (ta):** தனித்த பொறுப்புகள் கொண்ட சிறு பகுதிகளால் பெரிய மென்பொருள் பொருள்களை உருவாக்கு.

