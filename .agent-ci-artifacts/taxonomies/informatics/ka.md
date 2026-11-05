<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (ka)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### ალგორითმები

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../content/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (ka):** შეისწავლე პრობლემების გადაჭრის განმეორებადი მეთოდების შექმნა, გამოყენება და შედარება.

#### ანალიზი

Skills: 3

[analysis.data.ts](../../../content/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (ka):** გაიგე, როგორ იცვლება ალგორითმის დროისა და მეხსიერების საჭიროება შეყვანის მიხედვით.

##### წრფივი და ლოგარითმული ზრდის გარჩევა

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (ka):** შეადარე შეყვანის ზომის პროპორციული ზრდა განმეორებითი განახევრებისას ზრდას.

##### ალგორითმის უარესი შემთხვევის შეფასება

[estimateAnAlgorithmsWorstCase.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (ka):** შეაფასე შემოწმებების მაქსიმალური რაოდენობა, რაც ალგორითმს უარეს შემთხვევაში დასჭირდება.

##### დროისა და მეხსიერების კომპრომისების ახსნა

[explainTimeMemoryTradeOffs.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (ka):** გაიგე, რატომ შეიძლება უფრო სწრაფ ალგორითმებს მეტი დროებითი მეხსიერება დასჭირდეთ.

#### კოლექციების დამუშავება

Skills: 4

[collectionProcessing.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (ka):** ისწავლე მონაცემების დათვალიერებისას დათვლა, შეჯამება და უდიდესი თუ უმცირესი მნიშვნელობის პოვნა.

##### ელემენტების დათვლის გამოყენება

[applyElementCounting.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (ka):** დათვალე კოლექციის ყველა ელემენტი, რომელიც მოცემულ პირობას აკმაყოფილებს.

##### მაქსიმალური მნიშვნელობის პოვნა

[applyMaximumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (ka):** კოლექციის გავლისას დაიმახსოვრე აქამდე ნაპოვნი უდიდესი მნიშვნელობა.

##### მინიმალური მნიშვნელობის პოვნა

[applyMinimumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (ka):** კოლექციის გავლისას დაიმახსოვრე აქამდე ნაპოვნი უმცირესი მნიშვნელობა.

##### ჯამის დაგროვების გამოყენება

[applySumAccumulation.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (ka):** დაამატე კოლექციის მნიშვნელობები სათითაოდ დაგროვილ ჯამს.

#### კონსტრუირება

Skills: 6

[construction.data.ts](../../../content/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (ka):** ისწავლე ალგორითმის მოქმედებების, პირობებისა და გაჩერების წესების განსაზღვრა.

##### ალგორითმების შედარება მოთხოვნების მიხედვით

[compareAlgorithmsAgainstRequirements.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (ka):** შეადარე შესაძლო ალგორითმები მათი წინაპირობებისა და შეზღუდვების მიხედვით.

##### თანმიმდევრული ალგორითმის აგება

[constructASequentialAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (ka):** აღწერე სწორ თანმიმდევრობაში შესრულებული სასრული ნაბიჯების სერია.

##### ალგორითმის მიზნის განსაზღვრა

[defineAnAlgorithmsGoal.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (ka):** მიუთითე, რას უნდა მიაღწიოს ალგორითმმა და რა შეყვანას იღებს.

##### პირობითი განშტოებების დაგეგმვა

[designConditionalBranching.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (ka):** დაგეგმე ალგორითმის განსხვავებული გზები ნათელი, შემოწმებადი პირობებით.

##### გამეორების დაგეგმვა

[designRepetition.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (ka):** დაგეგმე განმეორებადი პროცესი სწორი განახლებებითა და გაჩერების პირობით.

##### რეკურსიული ალგორითმის განხორციელება

[implementARecursiveAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (ka):** ააგე რეკურსიული ალგორითმი მცირე ქვემოცანებით და საბაზისო შემთხვევით, რომელიც ამთავრებს შესრულებას.

#### ძიება

Skills: 6

[search.data.ts](../../../content/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (ka):** გაიგე, როგორ პოულობს ძიების სხვადასხვა მეთოდი ელემენტს კოლექციაში.

##### ორობითი ძიების გამოყენება

[applyBinarySearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (ka):** იპოვე მნიშვნელობა დალაგებულ მონაცემებში დიაპაზონის განმეორებით განახევრებით.

##### ორობით საძიებო ხეში ძიება

[applyBinaryTreeSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (ka):** მიჰყევი ორობითი საძიებო ხის დალაგებულ ტოტებს გასაღების საპოვნელად.

##### წრფივი ძიების გამოყენება

[applyLinearSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (ka):** იპოვე სამიზნე ელემენტი თითოეული ელემენტის რიგრიგობით შემოწმებით.

##### ძიების მეთოდების შედარება შემოწმებების რაოდენობით

[compareSearchMethodsByCheckCount.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (ka):** შეადარე წრფივი და ორობითი ძიებისთვის საჭირო შემოწმებების რაოდენობა.

##### ორობითი ძიების წინაპირობების ამოცნობა

[identifyBinarySearchPrerequisites.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (ka):** შეამოწმე, დალაგებულია თუ არა მონაცემები ორობითი ძიებისთვის საჭირო წესით.

##### ძიების მასშტაბის ზრდის პროგნოზირება

[predictSearchScaling.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (ka):** გაიგე, რატომ ამატებს მონაცემების გაორმაგება ორობით ძიებას დაახლოებით ერთ შემოწმებას.

#### დახარისხება

Skills: 4

[sorting.data.ts](../../../content/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (ka):** გაიგე, როგორ ალაგებს დახარისხების მეთოდები მნიშვნელობებს არჩეული წესით.

##### ბუშტულოვანი დახარისხების გამოყენება

[applyBubbleSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (ka):** დაახარისხე არასწორი თანმიმდევრობით მდგომი მეზობელი მნიშვნელობების გაცვლით.

##### ჩასმით დახარისხების გამოყენება

[applyInsertionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (ka):** დაახარისხე ყოველი ახალი ელემენტის უკვე დალაგებულ ნაწილში ჩასმით.

##### შერჩევით დახარისხების გამოყენება

[applySelectionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (ka):** დაახარისხე დარჩენილი ელემენტებიდან უმცირესის განმეორებით არჩევით.

##### დახარისხების კრიტერიუმის ახსნა

[explainASortingCriterion.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (ka):** აირჩიე მნიშვნელობა ან თვისება, რომლის მიხედვითაც კოლექციას დაახარისხებ.

### ხელოვნური ინტელექტი

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../content/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (ka):** გამოიკვლიე, როგორ სწავლობენ ხელოვნური ინტელექტის სისტემები, აკეთებენ პროგნოზებს, ქმნიან შიგთავსს და ზოგჯერ ცდებიან.

#### ხელოვნური ინტელექტის საფუძვლები

Skills: 6

[aIFundamentals.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (ka):** გამოიკვლიე განსხვავებები დაპროგრამებულ წესებს, გაწვრთნილ მოდელებსა და AI ამოცანებს შორის.

##### AI ამოცანების კლასიფიკაცია

[classifyAITasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (ka):** ამოიცანი, AI ამოცანა კლასიფიკაციას, პროგნოზირებას თუ შიგთავსის შექმნას ემსახურება.

##### წესებისა და გაწვრთნილი მოდელების გარჩევა

[distinguishRulesFromTrainedModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (ka):** განასხვავე პირდაპირ დაპროგრამებული გადაწყვეტილების წესები და მონაცემებზე გაწვრთნილი სისტემები.

##### გენერაციული AI-ის ახსნა

[explainGenerativeAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (ka):** გაიგე, როგორ ქმნიან გენერაციული მოდელები ტექსტს, სურათებსა და სხვა შიგთავსს.

##### მაგალითებზე სწავლის ახსნა

[explainLearningFromExamples.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (ka):** ახსენი, როგორ ეხმარება მაგალითები მოდელს ახალ შეყვანაზე უკეთ მუშაობაში.

##### პროგნოზირებადი AI-ის ახსნა

[explainPredictiveAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (ka):** გამოიკვლიე, როგორ აფასებენ პროგნოზის სისტემები მნიშვნელობებს, კატეგორიებსა და მოვლენათა ალბათობას.

##### AI-ის შესაძლო შეცდომის ამოცნობა

[identifyAPotentialAIError.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (ka):** შეამჩნიე ნიშნები, რომ AI-ს პასუხს დამოუკიდებელი გადამოწმება შეიძლება სჭირდებოდეს.

#### მიბაძვა და გაგება

Skills: 2

[imitationAndUnderstanding.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (ka):** გამოიკვლიე განსხვავება დამაჯერებელ მიბაძვასა და ნამდვილ გაგებას შორის.

##### სერლის ჩინური ოთახის ახსნა

[explainSearlesChineseRoom.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (ka):** გამოიკვლიე ჩინური ოთახის სააზროვნო ექსპერიმენტი და მის მიერ წამოჭრილი კამათი.

##### ტიურინგის ტესტის ახსნა

[explainTheTuringTest.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (ka):** გაიგე, რას ამოწმებს ტიურინგის ტესტი და რის დამტკიცება არ შეუძლია.

#### ენის მოდელების ტოკენები და კონტექსტი

Skills: 6

[languageModelTokensAndContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (ka):** გაიგე, როგორ ყოფენ ენის მოდელები ტექსტს ტოკენებად და იყენებენ კონტექსტს.

##### შერჩევისა და ყველაზე სავარაუდო ტოკენის არჩევის გარჩევა

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (ka):** შეადარე ყველაზე სავარაუდო ტოკენის არჩევა სხვა შესაძლო გაგრძელებებიდან ალბათობით შერჩევას.

##### ტოკენების, სიმბოლოებისა და სიტყვების გარჩევა

[distinguishTokensCharactersAndWords.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (ka):** გაიგე, რატომ არ არის სიმბოლო, სიტყვა და ტოკენი ერთი და იგივე.

##### ენის მოდელის კონტექსტის ფანჯრის ახსნა

[explainALanguageModelsContextWindow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (ka):** გაიგე, რატომ შეუძლია ენის მოდელს მხოლოდ შეზღუდული კონტექსტის გამოყენება.

##### კონტექსტის ფანჯრის გადაჭარბების ახსნა

[explainContextWindowOverflow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (ka):** გამოიკვლიე, რა შეიძლება მოხდეს, თუ მოთხოვნა მოდელის კონტექსტის ზღვარს სცდება.

##### შემდეგი ტოკენის არჩევის ახსნა

[explainNextTokenSelection.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (ka):** ახსენი, როგორ ირჩევენ ენის მოდელები შესაძლო შემდეგ ტოკენს კონტექსტის მიხედვით.

##### ტოკენების ახსნა

[explainTokens.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (ka):** გაიგე, რომ ტოკენი მოდელზე დამოკიდებული ტექსტის წარმოდგენის ერთეულია.

#### მოდელების არქიტექტურები და რესურსები

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (ka):** გამოიკვლიე, როგორ მოქმედებს AI მოდელების სხვადასხვა არქიტექტურა წარმადობასა და რესურსების საჭიროებაზე.

##### ამოცანისთვის მოდელის შერჩევა

[chooseAModelForATask.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (ka):** შეარჩიე მოდელი ხარისხის, სიჩქარის, ღირებულების, კონფიდენციალურობისა და ხელმისაწვდომი მეხსიერების მიხედვით.

##### მკვრივი და ექსპერტების ნარევის მოდელების შედარება

[compareDenseAndMoEModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (ka):** შეადარე მოდელები, რომლებიც ბევრ პარამეტრს ააქტიურებენ, მოდელებს, რომლებიც მხოლოდ შერჩეულ ექსპერტებს იყენებენ.

##### მოდელების მეხსიერების მოთხოვნების შედარება

[compareModelMemoryRequirements.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (ka):** შეაფასე მეხსიერება, რომელიც მოდელის გაშვებას სჭირდება და არა მხოლოდ ფაილების შესანახად.

##### პასუხის დაყოვნების შედარება

[compareResponseLatency.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (ka):** ცალკე შეადარე AI-ს პასუხის დაწყებამდე დრო და შემდგომი გენერირების სიჩქარე.

##### კვანტიზაციის ახსნა

[explainQuantization.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (ka):** გაიგე, როგორ ზოგავს მეხსიერებას რიცხვითი სიზუსტის შემცირება, თუმცა შეიძლება ხარისხი შეცვალოს.

#### პრომპტების შედგენა

Skills: 7

[prompting.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (ka):** ისწავლე AI სისტემებისთვის უფრო მკაფიო მითითებების, კონტექსტისა და შეზღუდვების მიწოდება.

##### რთული პრომპტის დაყოფა ქვეამოცანებად

[breakAComplexPromptIntoSubtasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (ka):** დაყავი რთული მოთხოვნა მცირე ეტაპებად, რომელთა შედეგების გადამოწმებაც შეიძლება.

##### პრომპტისთვის კონტექსტის მიწოდება

[providePromptContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (ka):** მიაწოდე შესაბამისი ინფორმაცია, რომელიც AI-ს შენი მოთხოვნის გაგებაში დაეხმარება.

##### შედეგების მიხედვით პრომპტის გაუმჯობესება

[refineAPromptBasedOnResults.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (ka):** წინა პასუხის ნაკლოვანებების შემოწმების შემდეგ გააუმჯობესე AI მოთხოვნა.

##### პრომპტის მიზნის განსაზღვრა

[specifyAPromptObjective.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (ka):** ზუსტად ჩამოაყალიბე დავალება, რომელიც AI ასისტენტმა უნდა შეასრულოს.

##### პრომპტში როლის მითითება

[specifyARoleInAPrompt.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (ka):** განსაზღვრე სასარგებლო ხედვა ან სტილი, მაგრამ ეს ნამდვილ ექსპერტიზად არ მიიჩნიო.

##### გამოტანის ფორმატის განსაზღვრა

[specifyAnOutputFormat.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (ka):** მოითხოვე მკაფიო პასუხის სტრუქტურა, მაგალითად ცხრილი ან განსაზღვრული ველები.

##### პრომპტის შეზღუდვების განსაზღვრა

[specifyPromptConstraints.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (ka):** მიუთითე შეზღუდვები: სიგრძე, წყაროები და ინფორმაცია, რომლის გამოგონებაც არ შეიძლება.

#### AI-ის სანდოობა და პასუხისმგებლიანი გამოყენება

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (ka):** ისწავლე AI-ს შედეგების შემოწმება და მათი გავლენის გათვალისწინება ადამიანებზე.

##### AI-ის დახმარებით მიღებულ გადაწყვეტილებებზე ადამიანის პასუხისმგებლობის ახსნა

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (ka):** გაიგე, რატომ რჩება ადამიანზე პასუხისმგებლობა AI-ს დახმარებით მიღებულ გადაწყვეტილებებზეც.

##### პერსონალური მონაცემების დაცვა პრომპტებში

[protectPersonalDataInPrompts.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (ka):** AI-სთვის მოთხოვნის გაგზავნამდე წაშალე არასაჭირო პირადი ინფორმაცია.

##### AI-ის მიკერძოების რისკების ამოცნობა

[recognizeAIBiasRisks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (ka):** ამოიცანი, როდის შეიძლება AI სისტემები ჯგუფებს ან ადამიანებს უსამართლოდ მოექცნენ.

##### AI-ის პასუხში ფაქტების გადამოწმება

[verifyFactsInAnAIResponse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (ka):** გადაამოწმე AI-ს ფაქტობრივი მტკიცებები სანდო დამოუკიდებელი წყაროებით.

#### უსაფრთხო ურთიერთქმედება AI-სთან

Skills: 4

[safeInteractionWithAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (ka):** ამოიცანი ურთიერთქმედების ფორმები, რომლებიც AI-ს რჩევას შეცდომაში შემყვანს ხდის ან არაჯანსაღ დამოკიდებულებას იწვევს.

##### AI-ზე ზედმეტი დამოკიდებულების რისკების ახსნა

[explainRisksOfOverrelianceOnAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (ka):** გაიგე, რატომ არ უნდა ჩაანაცვლოს AI-მ დამოუკიდებელი აზროვნება ან ადამიანების დახმარება.

##### AI-ს შეყვანაში არასანდო მითითებების ამოცნობა

[identifyUntrustedInstructionsInAIInput.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (ka):** ამოიცანი გარე მასალაში დამალული ინსტრუქციები, რომლებმაც ასისტენტი არ უნდა მართონ.

##### AI-ს გამოყენებისას საიდუმლოებების დაცვა

[protectSecretsWhenUsingAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (ka):** AI-სთან მუშაობისას დაიცავი პაროლები, წვდომის გასაღებები და კონფიდენციალური ინფორმაცია.

##### AI-ის პირფერობის ამოცნობა

[recognizeAISycophancy.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (ka):** ამოიცანი AI-ს თანხმობა ან ქება, რომელსაც მტკიცებულება არ ამყარებს.

### გამოთვლითი აზროვნება

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../content/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (ka):** გაიგე, როგორ დაყო რთული ამოცანები მკაფიო ნაბიჯებად, კანონზომიერებებად და წესებად.

#### დეკომპოზიცია და აბსტრაქცია

Skills: 4

[decompositionAndAbstraction.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (ka):** ისწავლე ამოცანების გამარტივება მათი მთავარი ნაწილებისა და კავშირების გამოვლენით.

##### სისტემის აბსტრაქტული მოდელის შექმნა

[buildAnAbstractSystemModel.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (ka):** შექმენი რთული სიტუაციის ან სისტემის გამარტივებული წარმოდგენა.

##### ამოცანის ნაწილებად დაშლა

[decomposeAProblem.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (ka):** დაყავი დიდი ამოცანა პატარა დავალებებად, რომელთა ცალკე გადაჭრაც შეიძლება.

##### განმეორებადი მეთოდის განზოგადება

[generalizeARepeatedMethod.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (ka):** იპოვე ხელახლა გამოსაყენებელი მეთოდი, რომელიც რამდენიმე კონკრეტულ ამოცანას აერთიანებს.

##### ობიექტის არსებითი თვისებების გამოვლენა

[identifyEssentialObjectProperties.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (ka):** შეარჩიე ამოცანისთვის მნიშვნელოვანი დეტალები და გამოტოვე უმნიშვნელო.

#### ლოგიკა და კანონზომიერებები

Skills: 8

[logicAndPatterns.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (ka):** გაიგე, როგორ ეხმარება წესები, კანონზომიერებები და ლოგიკური პირობები ამოცანების ამოხსნას.

##### ლოგიკური და ოპერაციის გამოყენება

[applyLogicalAND.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (ka):** გამოიყენე ლოგიკური „და“ შესამოწმებლად, სრულდება თუ არა ორივე პირობა.

##### ლოგიკური არა ოპერაციის გამოყენება

[applyLogicalNOT.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (ka):** გამოიყენე ლოგიკური „არა“ პირობის ჭეშმარიტების მნიშვნელობის შესაბრუნებლად.

##### ლოგიკური ან ოპერაციის გამოყენება

[applyLogicalOR.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (ka):** გამოიყენე ლოგიკური „ან“ იმის შესამოწმებლად, სრულდება თუ არა ორი პირობიდან ერთ-ერთი მაინც.

##### ურთიერთსაწინააღმდეგო წესების აღმოჩენა

[detectContradictoryRules.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (ka):** ამოიცანი, როდის ვერ იქნება ორი მოთხოვნა ერთდროულად ჭეშმარიტი.

##### მარტივი პირობის შეფასება

[evaluateASimpleCondition.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (ka):** განსაზღვრე, ერთი პირობა ჭეშმარიტია, მცდარია თუ ჯერ ვერ დგინდება.

##### შედგენილი ლოგიკური გამოსახულებების შეფასება

[evaluateCompoundLogicalExpressions.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (ka):** გამოთვალე რამდენიმე ოპერატორიანი ლოგიკური გამოსახულებები სწორი თანმიმდევრობით.

##### წესის საფუძველზე შედეგის პროგნოზირება

[predictAnOutcomeFromARule.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (ka):** დაადგინე, რა მოხდება შემდეგ, როცა წესი და საწყისი მდგომარეობა ცნობილია.

##### კანონზომიერების ამოცნობა

[recognizeAPattern.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (ka):** იპოვე კანონზომიერებები მიმდევრობებში და შეამოწმე, შეესაბამება თუ არა მათ შემოთავაზებული წესი.

### მონაცემთა სტრუქტურები

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../content/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (ka):** გაიგე, როგორ აწყობენ კოლექციები, გასაღებები, ხეები და ქსელები მონაცემებს სხვადასხვა ოპერაციისთვის.

#### ლექსიკონები

Skills: 3

[dictionaries.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (ka):** გაიგე, როგორ აკავშირებენ ლექსიკონები უნიკალურ გასაღებებს შენახულ მნიშვნელობებთან.

##### ლექსიკონის სტრუქტურის ახსნა

[explainDictionaryStructure.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (ka):** გაიგე, როგორ პოულობს ლექსიკონი ინფორმაციას გასაღებით და არა პოზიციით.

##### ლექსიკონიდან მნიშვნელობის მიღება გასაღებით

[retrieveADictionaryValueByKey.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (ka):** იპოვე ლექსიკონში მნიშვნელობა გასაღებით და დაამუშავე შემთხვევა, როცა გასაღები არ არსებობს.

##### ლექსიკონში მნიშვნელობის განახლება

[updateADictionaryValue.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (ka):** შეცვალე ლექსიკონში უკვე არსებული გასაღების ქვეშ შენახული მნიშვნელობა.

#### გრაფები

Skills: 6

[graphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (ka):** გაიგე, როგორ წარმოადგენენ გრაფები ადგილებს, ობიექტებსა და მათ კავშირებს.

##### მიმართული და არამიმართული გრაფების გარჩევა

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (ka):** დაადგინე, კავშირები ცალმხრივია თუ ორმხრივი.

##### ხეებისა და ციკლების შემცველი გრაფების გარჩევა

[distinguishTreesFromGraphsWithCycles.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (ka):** გაიგე, რატომ შეიძლება გრაფში იყოს ციკლი, ხეში კი — არა.

##### წონიანი და უწონო გრაფების გარჩევა

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (ka):** ამოიცანი, როდის აღნიშნავს გრაფის წიბოების რიცხვები მანძილს ან ღირებულებას.

##### გრაფის სტრუქტურის ახსნა

[explainGraphStructure.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (ka):** ამოიცანი გრაფის წვეროები და მათი დამაკავშირებელი წიბოები.

##### გრაფში გზის პოვნა

[findAPathInAGraph.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (ka):** გაჰყევი წვეროებს შორის დასაშვებ გზას, კავშირების მიმართულებების გათვალისწინებით.

##### მეზობელი წვეროების ამოცნობა

[identifyAdjacentVertices.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (ka):** ამოიცანი წვეროები, რომლებიც უშუალოდ უკავშირდება სხვა წვეროს.

#### რიგი

Skills: 3

[queue.data.ts](../../../content/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (ka):** გაიგე, როგორ ამუშავებს რიგი ელემენტებს მათი შემოსვლის თანმიმდევრობით.

##### რიგიდან ელემენტის ამოღება

[dequeueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (ka):** ამოიღე რიგის პირველი ელემენტი დანარჩენების თანმიმდევრობის შეცვლის გარეშე.

##### რიგში ელემენტის დამატება

[enqueueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (ka):** დაამატე ახალი ელემენტი რიგის ბოლოში.

##### FIFO პრინციპის ახსნა

[explainFIFO.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (ka):** ახსენით, რატომ გამოდის რიგიდან პირველად ის ელემენტი, რომელიც პირველი შევიდა.

#### მიმდევრობები

Skills: 7

[sequences.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (ka):** შეისწავლე დალაგებული კოლექციები და მათში ელემენტების მოძიება, დამატება და წაშლა.

##### მიმდევრობის ელემენტზე ინდექსით წვდომა

[accessASequenceElementByIndex.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (ka):** მიიღე ელემენტი ინდექსით დასაშვები პოზიციების ფარგლების დაცვით.

##### მასივებისა და ბმული სიების გარჩევა

[distinguishArraysFromLinkedLists.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (ka):** შეადარე ინდექსირებული მასივები დაკავშირებული კვანძების ჯაჭვებს.

##### მასივის სტრუქტურის ახსნა

[explainArrayStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (ka):** გაიგე, როგორ ინახავს მასივი ელემენტებს ინდექსებით განსაზღვრულ პოზიციებზე.

##### სიის სტრუქტურის ახსნა

[explainListStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (ka):** გაიგე, რომ სიები დალაგებული კოლექციებია და მათი წარმოდგენა სხვადასხვაგვარად შეიძლება.

##### მიმდევრობაში ელემენტის ჩასმა

[insertAnElementIntoASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (ka):** ჩასვი ელემენტი დალაგებული მიმდევრობის შესაბამის ადგილას.

##### მიმდევრობიდან ელემენტის ამოღება

[removeAnElementFromASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (ka):** ამოიღე ელემენტი და შეინარჩუნე დანარჩენების თანმიმდევრობა.

##### მიმდევრობის გავლა

[traverseASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (ka):** თანმიმდევრობით გადაუარე მიმდევრობის თითოეულ ელემენტს.

#### სიმრავლეები

Skills: 4

[sets.data.ts](../../../content/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (ka):** შეისწავლე უნიკალური მნიშვნელობების სიმრავლეები და მათში წევრობის შემოწმება.

##### სიმრავლეთა თანაკვეთის გამოთვლა

[computeSetIntersection.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (ka):** იპოვე მხოლოდ ორივე სიმრავლეში არსებული ელემენტები.

##### სიმრავლეთა გაერთიანების გამოთვლა

[computeSetUnion.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (ka):** გააერთიანე ორი სიმრავლის ყველა განსხვავებული ელემენტი გამეორების გარეშე.

##### სიმრავლის სტრუქტურის ახსნა

[explainSetStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (ka):** გაიგე, რატომ ინახავს სიმრავლე თითოეულ განსხვავებულ ელემენტს მხოლოდ ერთხელ.

##### სიმრავლისადმი კუთვნილების შემოწმება

[testSetMembership.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (ka):** შეამოწმე, ეკუთვნის თუ არა კონკრეტული მნიშვნელობა სიმრავლეს.

#### სტეკი

Skills: 3

[stack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (ka):** გაიგე, როგორ იძლევა სტეკი ბოლოს დამატებულ ელემენტზე პირველ რიგში წვდომას.

##### LIFO პრინციპის ახსნა

[explainLIFO.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (ka):** გაიგე, რატომ აბრუნებს სტეკი პირველად ბოლოს დამატებულ ელემენტს.

##### სტეკიდან ელემენტის ამოღება

[popAnElementFromAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (ka):** ამოიღე ბოლოს დამატებული ელემენტი და შეამოწმე, ხომ არ არის სტეკი ცარიელი.

##### სტეკზე ელემენტის დამატება

[pushAnElementOntoAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (ka):** დადე ახალი ელემენტი სტეკის თავზე.

#### მონაცემთა სტრუქტურის შერჩევა

Skills: 4

[structureSelection.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (ka):** აირჩიე მონაცემთა სტრუქტურა იმის მიხედვით, როგორ გამოიყენებს პროგრამა მონაცემებს.

##### საჭირო ოპერაციებისთვის სტრუქტურის არჩევა

[chooseAStructureForRequiredOperations.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (ka):** აირჩიე კოლექცია, რომელიც გამოდგება ინდექსირებისთვის, წევრობის შემოწმებისთვის, რიგებისთვის ან კავშირებისთვის.

##### კოლექციაში ჩასმის ხარჯების შედარება

[compareCollectionInsertionCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (ka):** გაიგე, რატომ შეიძლება ჩასმისას მასივის ელემენტების გადაწევა ან ბმულების შეცვლა დაგჭირდეს.

##### ელემენტებზე წვდომის ხარჯების შედარება

[compareElementAccessCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (ka):** შეადარე, რამდენად სწრაფად აღწევს მასივი და ბმული სია კონკრეტულ ელემენტამდე.

##### მონაცემთა სტრუქტურებისა და ალგორითმების გარჩევა

[distinguishDataStructuresFromAlgorithms.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (ka):** განასხვავე მონაცემების სტრუქტურაში ორგანიზება და მათი ალგორითმით დამუშავება.

#### ხეები

Skills: 4

[trees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (ka):** გაიგე, როგორ აწყობს ხე ინფორმაციას მშობელ და შვილობილ კვანძებს შორის კავშირებით.

##### ხის ფოთლოვანი და შიდა კვანძების გარჩევა

[distinguishLeafAndInternalTreeNodes.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (ka):** განასხვავე შვილობილი კვანძების მქონე კვანძები და უშვილო ფოთლები.

##### ორობითი საძიებო ხეების ახსნა

[explainBinarySearchTrees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (ka):** გაიგე გასაღებების დალაგების წესი, რომელიც ორობით ხეში ძებნას შესაძლებელს ხდის.

##### ხის სტრუქტურის ახსნა

[explainTreeStructure.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (ka):** ამოიცანი ხის ფესვი, ტოტები, კვანძები და კავშირები.

##### ხეში გზის პოვნა

[findAPathInATree.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (ka):** გაჰყევი რეალურად არსებულ კავშირებს ხის ორ კვანძს შორის.

### დიზაინის შაბლონები

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../content/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (ka):** შეისწავლე პროგრამული ობიექტების შექმნის, გაერთიანებისა და კოორდინაციის მრავალჯერადი გამოყენების გზები.

#### ქცევითი შაბლონები

Skills: 11

[behavioral.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (ka):** შეისწავლე, როგორ კოორდინირებენ ობიექტები მოთხოვნებს და ცვლიან ქცევას.

##### პასუხისმგებლობის ჯაჭვი

[chainOfResponsibility.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (ka):** გადაეცი მოთხოვნა დამმუშავებლებს რიგრიგობით, სანამ ერთ-ერთი მათგანი არ დაამუშავებს მას.

##### ბრძანება

[command.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (ka):** წარმოადგინე ოპერაცია ობიექტად, რომლის შენახვა ან დაგეგმვა შეიძლება.

##### ინტერპრეტატორი

[interpreter.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (ka):** მცირე ენა განმარტე გამოსახულებებად წარმოდგენილი წესებით.

##### იტერატორი

[iterator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (ka):** გაიარე კოლექციის ელემენტები მისი შენახვის წესის გაუმჟღავნებლად.

##### შუამავალი

[mediator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (ka):** კომპონენტების ურთიერთქმედება ცენტრალური შუამავლით შეათანხმე.

##### მემენტო

[memento.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (ka):** შეინახე ობიექტის მდგომარეობა, რათა შემდეგ აღადგინო.

##### დამკვირვებელი

[observer.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (ka):** შეატყობინე დაინტერესებულ გამომწერებს, როცა დაკვირვებული ობიექტი იცვლება.

##### მდგომარეობა

[state.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (ka):** შეცვალე ობიექტის რეაქცია მისი მიმდინარე მდგომარეობის მიხედვით.

##### სტრატეგია

[strategy.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (ka):** გადართე ალგორითმებს შორის, რომლებიც ერთ საერთო ინტერფეისს იცავენ.

##### შაბლონური მეთოდი

[templateMethod.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (ka):** შეინარჩუნე ალგორითმის ძირითადი ნაბიჯები, ხოლო შერჩეული ნაბიჯების შეცვლა დაუშვი.

##### ვიზიტორი

[visitor.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (ka):** განაცალკევე ოპერაციები იმ ობიექტური სტრუქტურებისგან, რომლებზეც ისინი მოქმედებენ.

#### შემქმნელი შაბლონები

Skills: 5

[creational.data.ts](../../../content/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (ka):** ისწავლე ობიექტების შექმნა კლიენტების კონკრეტულ ტიპებზე მიბმის გარეშე.

##### აბსტრაქტული ფაბრიკა

[abstractFactory.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (ka):** გამოიყენე ფაბრიკა, რომელიც დაკავშირებული ობიექტების თავსებად ოჯახებს ქმნის.

##### მშენებელი

[builder.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (ka):** შექმენი რთული ობიექტი ნაბიჯ-ნაბიჯ მშენებლის დახმარებით.

##### ფაბრიკის მეთოდი

[factoryMethod.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (ka):** მიეცი ქვეკლასებს არჩევანი, რომელი კონკრეტული ობიექტი შექმნას ფაბრიკის მეთოდმა.

##### პროტოტიპი

[prototype.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (ka):** შექმენი ახალი ობიექტები წინასწარ გამართული ნიმუშის ასლის საფუძველზე.

##### სინგლტონი

[singleton.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (ka):** მართე ერთ საერთო ეგზემპლარზე წვდომა გლობალური მდგომარეობის რისკების გათვალისწინებით.

#### სტრუქტურული შაბლონები

Skills: 7

[structural.data.ts](../../../content/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (ka):** შეისწავლე კომპონენტების დაკავშირების, შეფუთვისა და გაზიარების შაბლონები.

##### ადაპტერი

[adapter.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (ka):** დააკავშირე შეუთავსებელი ინტერფეისები მათ შორის გარდაქმნით.

##### ხიდი

[bridge.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (ka):** გამიჯნე კომპონენტის აბსტრაქცია მისი გამოყენებული რეალიზაციისგან.

##### კომპოზიტი

[composite.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (ka):** მართე ცალკეული ობიექტები და მათი ჯგუფები საერთო ინტერფეისით.

##### დეკორატორი

[decorator.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (ka):** ახალი ქცევა დაამატე ობიექტის შეფუთვით და არა ქვეკლასების გამრავლებით.

##### ფასადი

[facade.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (ka):** შექმენი მარტივი შესასვლელი კომპონენტების რთული ნაკრებისთვის.

##### მსუბუქი ობიექტი

[flyweight.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (ka):** გააზიარე მრავალჯერადი გამოყენების ობიექტის მონაცემები ზედმეტი მეხსიერების ხარჯის შესამცირებლად.

##### პროქსი

[proxy.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (ka):** მართე ობიექტზე წვდომა სხვა ობიექტით, რომელსაც იგივე ინტერფეისი აქვს.

### ციფრული შემოქმედება და თამაშები

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (ka):** შექმენი ციფრული მასალები, შეიმუშავე თამაშის წესები და გამოიკვლიე პროცედურული გენერაცია.

#### ციფრული მასალები

Skills: 3

[digitalMaterials.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (ka):** ისწავლე ციფრული შიგთავსის შექმნა, რედაქტირება და მიზნის შესაბამისი ხელსაწყოების არჩევა.

##### ციფრული შემოქმედებითი ხელსაწყოს არჩევა

[chooseADigitalCreativeTool.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (ka):** აირჩიე შემოქმედებითი პროგრამა იმის მიხედვით, რისი შექმნაც გსურს.

##### მარტივი ციფრული ნამუშევრის შექმნა

[createASimpleDigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (ka):** შექმენი კონკრეტული აუდიტორიისთვის გამართული ციფრული ბარათი, სურათი ან სხვა ნამუშევარი.

##### ციფრული ნამუშევრის რედაქტირება

[editADigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (ka):** გააუმჯობესე არსებული ციფრული ფაილი მისი თავდაპირველი აზრის შენარჩუნებით.

#### თამაშების დიზაინი

Skills: 3

[gameDesign.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (ka):** გამოიკვლიე, როგორ აყალიბებს წესები და მოთამაშეთა მოქმედებები თამაშის გამოცდილებას.

##### თამაშის მექანიკის შემუშავება

[designAGameMechanic.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (ka):** დააკავშირე მოთამაშის მოქმედება თამაშის მდგომარეობის ცვლილებასა და უკუკავშირთან.

##### თამაშის წესის ჩამოყალიბება

[formulateAGameRule.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (ka):** დაწერე თამაშის წესი ისე გასაგებად, რომ მოთამაშეებმა იცოდნენ, რა არის ნებადართული.

##### მარტივი თამაშის ბალანსის შემოწმება

[testTheBalanceOfASimpleGame.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (ka):** შეამოწმე, ხდის თუ არა წესები თამაშს სამართლიანს, რთულსა და დასრულებადს.

#### პროცედურული გენერაცია

Skills: 4

[proceduralGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (ka):** გაიგე, როგორ ქმნიან ალგორითმები მოკლე წესებიდან შიგთავსის მრავალ ვარიანტს.

##### რესურსების შენახვისა და გენერაციის შედარება

[compareResourceStorageAndGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (ka):** შეადარე პროცედურული გენერაციით დაზოგილი საცავი და საჭირო გამოთვლები.

##### გენერატორის პარამეტრების დაყენება

[configureGeneratorParameters.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (ka):** შეცვალე გენერატორის პარამეტრები შედეგის გარეგნობის ან რაოდენობის სამართავად.

##### რესურსების პროცედურული გენერაციის ახსნა

[explainProceduralResourceGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (ka):** ახსენი, როგორ ქმნის გენერატორი რესურსებს ყველა მზა ვარიანტის შენახვის ნაცვლად.

##### გენერაციის საწყისი მნიშვნელობით შედეგების გამეორება

[reproduceResultsUsingAGenerationSeed.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (ka):** გაიგე, როგორ იძლევა ფიქსირებული საწყისი მნიშვნელობა და უცვლელი წესები იმავე შედეგს.

### ციფრული პროდუქტის მომხმარებლის გამოცდილება

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (ka):** შექმენი ციფრული გამოცდილება, რომელიც ადვილი გასაგები, სანავიგაციო და ხელმისაწვდომია.

#### ხელმისაწვდომობა

Skills: 2

[accessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (ka):** გამოიკვლიე, როგორ მოქმედებს განსხვავებული შესაძლებლობები და შეყვანის მეთოდები ციფრულ ხელმისაწვდომობაზე.

##### განსხვავებული შესაძლებლობების მქონე მომხმარებელთა საჭიროებების გამოვლენა

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (ka):** ამოიცანი იმ ადამიანების საჭიროებები, რომლებიც კლავიატურას, გადიდებულ ტექსტს ან დამხმარე ტექნოლოგიას იყენებენ.

##### ციფრული ინტერაქციის ხელმისაწვდომობის შემოწმება

[testDigitalInteractionAccessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (ka):** შეამოწმე ინტერფეისი მაუსისა და ხმის გარეშე და ჩაიწერე დაბრკოლებები.

#### ციფრული ინტერაქციის დიზაინი

Skills: 4

[digitalInteractionDesign.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (ka):** გამოიკვლიე, როგორ დაგეგმო ინტუიციური მოქმედებები და სასარგებლო უკუკავშირი ინტერფეისებში.

##### ციფრული ინტერფეისის უკუკავშირის დიზაინი

[designDigitalInterfaceFeedback.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (ka):** უზრუნველყავი, რომ ღილაკებმა, ჩატვირთვის მდგომარეობებმა და შეცდომებმა გასაგები უკუკავშირი მისცეს.

##### ციფრული ინტერფეისის ნავიგაციის დიზაინი

[designDigitalInterfaceNavigation.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (ka):** მოაწყვე ეკრანები და ნავიგაცია ისე, რომ ადამიანებმა საჭირო მოქმედებები იპოვონ.

##### ციფრული პროდუქტის მომხმარებლის მიზნის გამოვლენა

[identifyADigitalProductUsersGoal.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (ka):** გაარკვიე, რისი მიღწევა სურს ადამიანს აპში ან ციფრულ მოწყობილობაზე.

##### ციფრული ინტერაქციის გავრცელებული შეცდომების თავიდან აცილება

[preventCommonDigitalInteractionErrors.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (ka):** გამოიყენე წარწერები, შემოწმება და დადასტურება თავიდან აცილებადი შეცდომების შესამცირებლად.

#### გამოცდილების შეფასება და ეთიკა

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (ka):** გამოიკვლიე, როგორ აუმჯობესებს მომხმარებელთა ტესტირება და კეთილსინდისიერი დიზაინი ციფრულ პროდუქტებს.

##### მანიპულაციური ინტერფეისის შაბლონების ამოცნობა

[identifyManipulativeInterfacePatterns.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (ka):** ამოიცანი ინტერფეისის ხრიკები, რომლებიც მალავს ხარჯებს, აიძულებს არჩევანს ან ართულებს გაუქმებას.

##### ციფრული ინტერფეისის გამოყენებადობის შემოწმება

[testDigitalInterfaceUsability.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (ka):** დააკვირდი, შეუძლია თუ არა ადამიანს რეალური ამოცანის შესრულება დამატებითი მინიშნებების გარეშე.

### ციფრული უსაფრთხოება და პასუხისმგებლობა

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (ka):** ისწავლე ინფორმაციის დაცვა, სხვების პატივისცემა და ციფრული ტექნოლოგიის გავლენის გაგება.

#### ანგარიშების დაცვა

Skills: 9

[accountProtection.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (ka):** გაიგე, როგორ დაიცვა ანგარიშები და უპასუხო საეჭვო შეტყობინებებს.

##### ელფოსტის გამგზავნის ნამდვილობის შეფასება

[assessAnEmailSendersAuthenticity.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (ka):** შეამოწმე გამგზავნის ვინაობა და მხოლოდ ნაჩვენებ სახელს ან სურათს ნუ დაეყრდნობი.

##### ბმულის გახსნის რისკის შეფასება

[assessTheRiskOfFollowingALink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (ka):** შეაფასე, რა შეიძლება მოხდეს საეჭვო ბმულის გახსნისას.

##### მრავალფაქტორიანი ავთენტიფიკაციის გამართვა

[configureMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (ka):** ჩართე დამატებითი შესვლის ფაქტორი და დაგეგმე უსაფრთხო წვდომის აღდგენა.

##### ძლიერი პაროლური ფრაზის შექმნა

[createAStrongPassphrase.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (ka):** შექმენი გრძელი, რთულად გამოსაცნობი და თითოეული ანგარიშისთვის განსხვავებული პაროლური ფრაზა.

##### მრავალფაქტორიანი ავთენტიფიკაციის ახსნა

[explainMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (ka):** გაიგე, როგორ იცავს ანგარიშს მეორე დამოუკიდებელი შემოწმების ფაქტორი.

##### პროგრამული განახლებების მნიშვნელობის ახსნა

[explainWhySoftwareUpdatesMatter.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (ka):** გაიგე, როგორ ასწორებს ოფიციალური განახლებები უსაფრთხოების სისუსტეებს.

##### ფიშინგ შეტყობინების ამოცნობა

[recognizeAPhishingMessage.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (ka):** ამოიცანი შეტყობინებები, რომლებიც სხვებს ასაღებენ თავს პაროლებისა და კოდების მოსაპარად.

##### საეჭვო ციფრულ კონტაქტზე რეაგირება

[respondToSuspiciousDigitalContact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (ka):** უსაფრთხოდ უპასუხე საეჭვო კონტაქტს და მოთხოვნა დამოუკიდებელი არხით გადაამოწმე.

##### ვებსაიტის დომენის გადამოწმება

[verifyAWebsitesDomain.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (ka):** წაიკითხე ნამდვილი დომენი ვებმისამართში და ამოიცანი შეცდომაში შემყვანი მიმსგავსებები.

#### ციფრული ურთიერთქმედების ეთიკა

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (ka):** ისწავლე პატივისცემით ურთიერთობა და ავტორების ნებართვების გათვალისწინება.

##### ციფრული მასალის ავტორობის მითითება

[attributeDigitalMaterials.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (ka):** მიუთითე ციფრული შიგთავსის თავდაპირველი შემქმნელი, როცა მას იყენებ.

##### პრობლემის უსაფრთხოდ შეტყობინების გზის არჩევა

[chooseASafeWayToReportAProblem.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (ka):** აირჩიე სანდო ადამიანი ან ოფიციალური არხი ინტერნეტში პრობლემის შესატყობინებლად.

##### ციფრული შიგთავსის ლიცენზიების გარჩევა

[distinguishDigitalContentLicenses.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (ka):** განასხვავე საავტორო უფლებების შეზღუდვები, ღია ლიცენზიები და საზოგადოებრივი საკუთრება.

##### ინტერნეტში შესაფერისი ქცევის ამოცნობა

[identifyAppropriateOnlineBehavior.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (ka):** ამოიცანი მუქარა, შევიწროება და ბულინგი ციფრულ კომუნიკაციაში.

#### კონფიდენციალურობა

Skills: 5

[privacy.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (ka):** გაიგე, როგორ მოქმედებს ინტერნეტში ინფორმაციის გაზიარება პირადულობაზე.

##### მონაცემების უსაფრთხო გაზიარების გზების არჩევა

[chooseSafeDataSharingMethods.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (ka):** აირჩიე, ვის შეიძლება გადაეცეს მგრძნობიარე ინფორმაცია და როგორ გააზიარო იგი უსაფრთხოდ.

##### პირადი ჩატის და საჯარო ბმულის გარჩევა

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (ka):** შეამოწმე, ვის შეუძლია გაზიარებული ჩატის ან დოკუმენტის გახსნა; ბმული ავტომატურად პირადი არ არის.

##### მონაცემებით ხელახალი იდენტიფიცირების ახსნა

[explainDataReIdentification.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (ka):** ახსენი, როგორ შეიძლება ცალ-ცალკე შეგროვებული დეტალების გაერთიანებით ადამიანის ხელახლა ამოცნობა.

##### პერსონალური მონაცემების ამოცნობა

[identifyPersonalData.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (ka):** ამოიცანი ინფორმაცია, რომლითაც ადამიანის იდენტიფიცირება სხვა დეტალებთან ერთადაც შეიძლება.

##### ციფრული კვალის ამოცნობა

[recognizeADigitalFootprint.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (ka):** გაიგე, როგორ ტოვებს ინტერნეტში პოსტები და ქმედებები ხანგრძლივ კვალს.

#### გამოთვლითი ტექნოლოგიების სოციალური და ეკოლოგიური გავლენა

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (ka):** გამოიკვლიე კომპიუტერული ტექნოლოგიების გავლენა სამართლიანობაზე, რესურსებსა და გარემოზე.

##### ალგორითმის გავლენის შეფასება მომხმარებელთა ჯგუფებზე

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (ka):** შეაფასე, ხომ არ განსხვავდება ალგორითმის შედეგები სხვადასხვა ჯგუფისთვის უსამართლოდ.

##### გამოთვლების გარემოზე გავლენის შეფასება

[assessComputingsEnvironmentalImpact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (ka):** შეადარე გამოთვლების ენერგიის, მასალებისა და ელექტრონული ნარჩენების გავლენა.

### ციფრული სისტემები და ქსელები

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (ka):** გაიგე, როგორ მუშაობენ ერთად გამოთვლითი მოწყობილობები, ციფრული ინფორმაცია და ქსელები.

#### ციფრული მოწყობილობების კომპონენტები

Skills: 3

[digitalDeviceComponents.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (ka):** გაიგე, როგორ ასრულებენ აპარატურის ნაწილები და პროგრამული უზრუნველყოფა სხვადასხვა გამოთვლით ამოცანას.

##### აპარატურისა და პროგრამული უზრუნველყოფის განსხვავება

[distinguishHardwareFromSoftware.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (ka):** განასხვავე კომპიუტერის ფიზიკური ნაწილები იმ პროგრამული უზრუნველყოფისგან, რომელიც მათ მართავს.

##### პროცესორის ფუნქციის ახსნა

[explainAProcessorsFunction.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (ka):** ახსენი, როგორ ასრულებს პროცესორი ინსტრუქციებს, ნაცვლად ფაილების მუდმივად შენახვისა.

##### ციფრული მოწყობილობების ამოცნობა

[identifyDigitalDevices.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (ka):** ამოიცანი მოწყობილობები, რომლებიც პროგრამირებად ციფრულ ინფორმაციას ამუშავებენ.

#### მეხსიერება და მონაცემთა შენახვა

Skills: 4

[memoryAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (ka):** გაიგე დროებითი მეხსიერების, მიკროპროგრამის მეხსიერებისა და ფაილების საცავის განსხვავებული დანიშნულება.

##### RAM-ის, ROM-ისა და საცავის განსხვავება

[distinguishRAMROMAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (ka):** შეადარე, რომელი ინფორმაციის შენახვა ევალება RAM-ს, ROM-სა და მუდმივ საცავს.

##### მუდმივი შენახვის ახსნა

[explainPersistentStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (ka):** გაიგე, რატომ ინარჩუნებენ საცავი მოწყობილობები ფაილებს კვების გამორთვის შემდეგაც.

##### RAM-ის ახსნა

[explainRAM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (ka):** გაიგე, როგორ ინახავს ოპერატიული მეხსიერება სამუშაო ინფორმაციას კომპიუტერის მუშაობისას.

##### ROM-ის დანიშნულების ახსნა

[explainThePurposeOfROM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (ka):** ამოიცანი, როგორ ეხმარება არავოლატილური მიკროპროგრამული მეხსიერება მოწყობილობებს ჩართვაში.

#### ქსელის მოდელები და პროტოკოლები

Skills: 11

[networkModelsAndProtocols.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (ka):** გაიგე, როგორ ადგენენ ქსელური პროტოკოლები ინფორმაციის გაგზავნის წესებს.

##### ქსელზე წვდომის მეთოდების შედარება

[compareNetworkAccessMethods.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (ka):** შეადარე შეჯახების აღმოჩენა, შეჯახების თავიდან აცილება და ტოკენის გადაცემა შესაბამის გარემოში.

##### HTTP-ისა და HTTPS-ის განსხვავება

[distinguishHTTPFromHTTPS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (ka):** გაიგე, რას იცავს HTTPS და რატომ არ იძლევა ის საიტის სანდოობის გარანტიას.

##### OSI-ისა და TCP/IP-ის განსხვავება

[distinguishOSIFromTCPIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (ka):** შეადარე OSI-ის კონცეპტუალური დონეები ინტერნეტის TCP/IP პროტოკოლების სტეკს.

##### TCP-ისა და UDP-ის განსხვავება

[distinguishTCPFromUDP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (ka):** შეადარე საიმედო TCP მონაცემთა ნაკადები UDP შეტყობინებებს, რომლებსაც იგივე გარანტიები არ აქვთ.

##### ქსელური პროტოკოლის ახსნა

[explainANetworkProtocol.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (ka):** ახსენი, რატომ სჭირდებათ მოწყობილობებს შეთანხმებული წესები შეტყობინებების გასაცვლელად.

##### CSMA/CA-ის ახსნა

[explainCSMACA.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (ka):** ახსენი, როგორ ცდილობენ უსადენო მოწყობილობები დაკავებულ არხზე გადაცემის თავიდან აცილებას.

##### CSMA/CD-ის ახსნა

[explainCSMACD.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (ka):** გაიგე, რატომ სჭირდებოდა ძველ საერთო Ethernet ქსელებს შეჯახებების აღმოჩენა.

##### DNS-ის ახსნა

[explainDNS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (ka):** ახსენი, როგორ ეხმარება DNS დომენის სახელებით ქსელური მისამართების მოძებნაში.

##### OSI-ის ფენების ახსნა

[explainTheOSILayers.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (ka):** გამოიყენე შვიდფენიანი OSI მოდელი ქსელის ფუნქციების დასაჯგუფებლად.

##### IP-ის დანიშნულების ახსნა

[explainThePurposeOfIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (ka):** გაიგე, როგორ უზრუნველყოფს IP პაკეტების მისამართებასა და გადაგზავნას ქსელებს შორის.

##### Token Ring-ის ახსნა

[explainTokenRing.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (ka):** გაიგე, როგორ განსაზღვრავს ტოკენის გადაცემა, რომელ მოწყობილობას შეუძლია მონაცემების გაგზავნა.

#### ქსელები

Skills: 4

[networks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (ka):** გაიგე, როგორ აგზავნიან დაკავშირებული მოწყობილობები შეტყობინებებს და იზიარებენ რესურსებს.

##### ინტერნეტისა და ვების განსხვავება

[distinguishTheInternetFromTheWeb.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (ka):** განასხვავე ინტერნეტის ქსელური ინფრასტრუქტურა ვებში არსებული ვებსაიტებისგან.

##### ქსელში შეტყობინების მიწოდების ახსნა

[explainNetworkMessageDelivery.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (ka):** გაჰყევი შეტყობინების გზას ქსელური მოწყობილობების გავლით დანიშნულების ადგილამდე.

##### კომპიუტერული ქსელის დანიშნულების ახსნა

[explainThePurposeOfAComputerNetwork.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (ka):** ახსენი, რატომ აკავშირებენ ქსელები ცალკეულ მოწყობილობებს ინფორმაციის გასაცვლელად.

##### უსადენო კავშირის ახსნა

[explainWirelessCommunication.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (ka):** გაიგე, როგორ უკავშირდებიან უსადენო მოწყობილობები ერთმანეთს სიგნალებით და არა პირდაპირი კაბელებით.

#### თვლის სისტემები

Skills: 4

[numeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (ka):** ისწავლე, როგორ გამოსახავენ ციფრები რიცხვებს სხვადასხვა ფუძის მქონე სისტემებში.

##### ორობითსა და ათობითს შორის გადაყვანა

[convertBetweenBinaryAndDecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (ka):** გადაიყვანე მცირე რიცხვები ორობით და ათობით ჩანაწერებს შორის.

##### ორობითი და თექვსმეტობითი სისტემების განსხვავება

[distinguishBinaryAndHexadecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (ka):** გაიგე, რატომ შეიძლება ბიტების ჯგუფების მოკლედ ჩაწერა თექვსმეტობით სისტემაში.

##### კომპიუტერის ორობითი ლოგიკის ახსნა

[explainComputerBinaryLogic.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (ka):** დააკავშირე ორობითი ნულები და ერთიანები ელექტრონული სიგნალების განსხვავებად მდგომარეობებთან.

##### პოზიციური თვლის სისტემების ახსნა

[explainPositionalNumeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (ka):** გაიგე, რატომ ცვლის ციფრის მდებარეობა რიცხვში მის მნიშვნელობას.

#### ოპერაციული სისტემები

Skills: 4

[operatingSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (ka):** გაიგე, როგორ მართავენ ოპერაციული სისტემები პროგრამებს, ფაილებსა და მოწყობილობებს.

##### ოპერაციული სისტემების ოჯახების განსხვავება

[distinguishOperatingSystemFamilies.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (ka):** ამოიცანი ოპერაციული სისტემების გავრცელებული ოჯახები და მათი განსხვავებები.

##### ოპერაციული სისტემის პროცესის ახსნა

[explainAnOSProcess.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (ka):** განასხვავე გაშვებული პროცესი დისკზე შენახული პროგრამის ფაილისგან.

##### ოპერაციული სისტემის დანიშნულების ახსნა

[explainAnOperatingSystemsPurpose.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (ka):** გაიგე, როგორ ათანხმებს ოპერაციული სისტემა პროგრამულ უზრუნველყოფასა და აპარატურას.

##### ლინუს ტორვალდსის როლის ახსნა Linux-ში

[explainLinusTorvaldsRoleInLinux.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (ka):** გაიგე, როგორ დაიწყო Linux-ის ბირთვის შექმნა და რატომ მონაწილეობს ოპერაციული სისტემების განვითარებაში მრავალი ადამიანი.

#### წარმოდგენა და შენახვა

Skills: 4

[representationAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (ka):** გაიგე, როგორ წარმოადგენენ მოწყობილობები ინფორმაციას და აწყობენ შენახულ ფაილებს.

##### ციფრული ფაილების ზომების შედარება

[compareDigitalFileSizes.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (ka):** შეადარე ფაილების ზომები და ახსენი ფორმატისა და შეკუმშვის გავლენა.

##### ციფრული ფორმატების განსხვავება

[distinguishDigitalFormats.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (ka):** ამოიცანი, რომ ფაილის ფორმატი განსაზღვრავს შენახული ბიტების ინტერპრეტაციას.

##### ორობითი წარმოდგენის ახსნა

[explainBinaryRepresentation.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (ka):** გაიგე, როგორ კოდირებენ ნულებისა და ერთიანების მიმდევრობები სხვადასხვა ტიპის მონაცემებს.

##### ფაილების საქაღალდეებში ორგანიზება

[organizeFilesInDirectories.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (ka):** დაალაგე ფაილები მოსახერხებელ საქაღალდეებში, რათა მათი პოვნა ბილიკებით შეძლო.

#### ამოცანების შესრულება

Skills: 3

[taskExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (ka):** გაიგე განსხვავება მონაცვლეობით მიმდინარე ამოცანებსა და მართლაც ერთდროულ მუშაობას შორის.

##### დამოუკიდებელი ამოცანების განაწილება შემსრულებლებს შორის

[distributeIndependentTasksAcrossExecutors.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (ka):** დაგეგმე, რომელი ამოცანები შეიძლება შესრულდეს ერთად და რომელმა უნდა დაელოდოს სხვა შედეგებს.

##### კონკურენტული შესრულების ახსნა

[explainConcurrentExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (ka):** გაიგე, როგორ შეიძლება რამდენიმე ამოცანა წინ მიიწევდეს მაშინაც, როცა ზუსტად ერთდროულად არ სრულდება.

##### პარალელური შესრულების ახსნა

[explainParallelExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (ka):** ამოიცანი, როდის ასრულებს რამდენიმე პროცესორი სამუშაოს რეალურად ერთდროულად.

### Git და ღია წყარო

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (ka):** გაიგე, როგორ აკონტროლებენ დეველოპერები ცვლილებებს, თანამშრომლობენ და აზიარებენ პროგრამებს მკაფიო ნებართვებით.

#### ციფრული პროდუქტების ერთობლივი განვითარება

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (ka):** გაიგე, როგორ აწყობენ გუნდები წვლილს, მიმოხილვებსა და პროექტის ვერსიებს.

##### საერთო ციფრულ პროექტში ცვლილებების კოორდინაცია

[coordinateChangesInASharedDigitalProject.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (ka):** დაგეგმე, ვინ რას შეცვლის და როგორ გაერთიანდება ერთობლივი შესწორებები.

##### წვლილის შეტანის წესების ახსნა

[explainContributionGuidelines.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (ka):** გაიგე, რატომ ეხმარება წვლილის წესები ადამიანებს საერთო კოდის ბაზაზე მუშაობაში.

##### ციფრული პროდუქტის ვერსიების თვალყურის დევნება

[trackDigitalProductVersions.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (ka):** გამოიყენე ვერსიების ისტორია ცვლილებების დროის გასაგებად ან ძველი სამუშაოს აღსადგენად.

#### Git ვერსიების კონტროლი

Skills: 6

[gitVersionControl.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (ka):** გაიგე, როგორ ინახავს Git ვერსიებს და ეხმარება გუნდებს ცვლილებების გაერთიანებაში.

##### ლოკალური და დისტანციური რეპოზიტორიების გარჩევა

[distinguishLocalAndRemoteRepositories.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (ka):** განასხვავე შენს კომპიუტერში შენახული სამუშაო და დისტანციურ რეპოზიტორიაში გაზიარებული ასლები.

##### განშტოების ახსნა

[explainABranch.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (ka):** გაიგე, როგორ აძლევს განშტოებები დეველოპერებს ცალკე ცვლილებებზე მუშაობის საშუალებას.

##### კომიტის ახსნა

[explainACommit.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (ka):** გაიგე, რომ კომიტი იდენტიფიცირებადი მდგომარეობის სურათია, რომელიც წინა ისტორიას უკავშირდება.

##### პულ-რექვესთის ახსნა

[explainAPullRequest.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (ka):** გაიგე, როგორ აწყობს პულ-რექვესთი შეთავაზებულ ცვლილებებს განხილვისთვის.

##### რეპოზიტორიის ახსნა

[explainARepository.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (ka):** გაიგე, რომ რეპოზიტორია პროექტსა და მისი ცვლილებების ისტორიას ინახავს.

##### განშტოებების შერწყმის ახსნა

[explainBranchMerging.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (ka):** გაიგე, როგორ ერთიანდება განშტოებები და რატომ სჭირდება ზოგჯერ კონფლიქტების მოგვარება.

#### ღია წყარო

Skills: 2

[openSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (ka):** გაიგე, რომელი ნებართვები აქცევს პროგრამას ნამდვილად ღია წყაროდ.

##### ღია კოდისა და მხოლოდ საჯაროდ ხილული კოდის გარჩევა

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (ka):** გაიგე, რომ საწყისი კოდის დანახვა მას ავტომატურად ღია წყაროდ არ აქცევს.

##### ღია კოდის ახსნა

[explainOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (ka):** გაიგე, როგორ იძლევა ღია კოდის ლიცენზია პროგრამის გამოყენების, შეცვლისა და ხელახლა გავრცელების უფლებას.

### პროგრამირების ისტორია

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (ka):** გაიგე, როგორ ვითარდებოდა პროგრამირების იდეები და გამომთვლელი მანქანები ისტორიის განმავლობაში.

#### მნიშვნელოვანი წვლილი

Skills: 6

[keyContributions.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (ka):** გაიგე მნიშვნელოვანი წვლილი პროგრამირებაში, პროგრამული უზრუნველყოფის საიმედოობასა და ქსელებში.

##### გამოთვლადობის თეორიის ახსნა

[explainComputabilityTheory.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (ka):** გაიგე, როგორ აჩვენებს ფორმალური მოდელები, რისი გამოთვლა შეუძლიათ კომპიუტერებს და რისი არა.

##### ადრეული ელექტრონული პროგრამირების ახსნა

[explainEarlyElectronicProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (ka):** გაიგე, როგორ ქმნიდნენ და ამოწმებდნენ პროგრამებს პირველი ელექტრონული კომპიუტერების გუნდები.

##### კომპილატორების განვითარების ახსნა

[explainTheDevelopmentOfCompilers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (ka):** გაიგე, როგორ გაამარტივა კომპილატორებმა პროგრამების წერა წაკითხვად ენებზე.

##### პროგრამული უზრუნველყოფის საიმედოობის განვითარების ახსნა

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (ka):** გაიგე, რატომ იყო შეცდომების მართვა და საიმედო პროგრამები მნიშვნელოვანი „აპოლონის“ მისიებში.

##### ქსელური მარყუჟების აღმოფხვრის ახსნა

[explainTheEliminationOfNetworkLoops.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (ka):** გაიგე, როგორ ეხმარება Spanning Tree პროტოკოლი ლოკალურ ქსელებში მარყუჟების თავიდან აცილებას.

##### პროგრამირების წარმოშობის ახსნა

[explainTheOriginsOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (ka):** გაიგე, როგორ მოასწავებდა პროგრამირებას ადრეული მანქანების პროექტები და ადა ლავლეისის შრომა.

#### მანქანები და კრიპტოანალიზი

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (ka):** გაიგე, როგორ ეხმარებოდა მანქანები და მათემატიკური მეთოდები ისტორიულ კრიპტოანალიზს.

##### ისტორიული კრიპტოანალიზის მეთოდების ახსნა

[explainHistoricalCryptanalysisMethods.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (ka):** გაიგე, როგორ იყენებდნენ კრიპტოანალიტიკოსები ნიმუშებსა და სისტემურ შემოწმებებს შიფრების გასატეხად.

##### პროგრამირებადი კომპიუტერების განვითარების ახსნა

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (ka):** გაჰყევი განვითარებას მექანიკური გამოთვლის იდეებიდან პროგრამირებად ელექტრონულ მანქანებამდე.

##### Bombe მანქანის დანიშნულების ახსნა

[explainThePurposeOfTheBombe.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (ka):** გაიგე, როგორ ეხმარებოდა Bombe მანქანა Enigma-ს შესაძლო პარამეტრების შემოწმებას.

### ინფორმაცია და მონაცემები

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../content/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (ka):** ისწავლე სანდო ინფორმაციის პოვნა, მონაცემების დალაგება და გაურკვევლობაზე მსჯელობა.

#### მონაცემთა შეგროვება და ორგანიზება

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (ka):** ისწავლე საჭირო ინფორმაციის შეგროვება და შესადარებელი ჩანაწერების დალაგება.

##### მონაცემების თანმიმდევრული შეგროვება

[collectDataConsistently.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (ka):** შეაგროვე გაზომვები ერთიანი წესებითა და ერთეულებით.

##### მონაცემების დაჯგუფება ნიშნის მიხედვით

[groupDataByAttribute.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (ka):** დააჯგუფე ჩანაწერები ერთი მკაფიო ნიშნის მიხედვით.

##### ამოცანისთვის საჭირო მონაცემების განსაზღვრა

[identifyDataNeededForATask.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (ka):** გადაწყვიტე, რომელი ველები და დაკვირვებებია ნამდვილად საჭირო კითხვაზე პასუხისთვის.

##### მონაცემების ცხრილში წარმოდგენა

[presentDataInATable.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (ka):** შექმენი ცხრილი დასახელებული სტრიქონებით, სვეტებითა და თანმიმდევრული მნიშვნელობებით.

#### მონაცემთა ბაზები

Skills: 5

[databases.data.ts](../../../content/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (ka):** გაიგე, როგორ აწყობს მონაცემთა ბაზა ჩანაწერებს და აკავშირებს დაკავშირებულ ინფორმაციას.

##### მარტივი მონაცემთა ბაზის სქემის შექმნა

[designASimpleDatabaseSchema.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (ka):** დაგეგმე მარტივი მონაცემთა ბაზა შესაბამისი ობიექტებით, ველებითა და კავშირებით.

##### ჩანაწერებისა და ველების გარჩევა

[distinguishRecordsAndFields.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (ka):** განასხვავე ჩანაწერი და ველები, რომლებიც მას აღწერს.

##### მონაცემთა ბაზის ცხრილის ახსნა

[explainADatabaseTable.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (ka):** გაიგე, როგორ ინახავს ცხრილი ერთი ტიპის ჩანაწერებს.

##### პირველადი გასაღებების ახსნა

[explainPrimaryKeys.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (ka):** ახსენი, რატომ სჭირდება ყოველ ჩანაწერს მუდმივი უნიკალური გასაღები.

##### ცხრილებს შორის კავშირების მოდელირება

[modelRelationshipsBetweenTables.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (ka):** დააკავშირე ინფორმაცია სხვადასხვა ცხრილში იდენტიფიკატორების გამოყენებით.

#### ინფორმაციის ძიება და გადამოწმება

Skills: 4

[informationSearchAndVerification.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (ka):** ისწავლე მტკიცებულებების ძიება და შემოწმება, დასტურდება თუ არა მტკიცება.

##### ინფორმაციის წყაროების შედარება

[compareInformationSources.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (ka):** შეადარე რამდენიმე წყარო და იპოვე განსხვავებები მათ აღწერებში.

##### შეტყობინებებისა და მონაცემების გარჩევა

[distinguishMessagesFromData.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (ka):** განასხვავე ჩაწერილი მნიშვნელობა და ის აზრი, რომელსაც შეტყობინება ანიჭებს.

##### საინფორმაციო საძიებო მოთხოვნის ფორმულირება

[formulateAnInformationQuery.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (ka):** აირჩიე ზუსტი საძიებო სიტყვები იმის მიხედვით, რისი პოვნაც გჭირდება.

##### მტკიცების გადამოწმება წყაროს მიხედვით

[verifyAClaimAgainstASource.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (ka):** გადაამოწმე მტკიცება სათანადო მტკიცებულებით და არა გამეორებული განცხადებებით.

#### ალბათობა და გაურკვევლობა

Skills: 7

[probabilityAndUncertainty.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (ka):** შეისწავლე შესაძლო მოვლენები, მათი ალბათობა და წინასწარმეტყველების საზღვრები.

##### მარტივი მოვლენების ალბათობების შედარება

[compareProbabilitiesOfSimpleEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (ka):** შეადარე ორი შედეგის ალბათობა ერთნაირი დაშვებებით.

##### შესაძლებლობისა და ალბათობის გარჩევა

[distinguishPossibilityFromProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (ka):** გაიგე, რომ შესაძლო მოვლენა აუცილებლად მაღალი ალბათობის არ არის.

##### შემთხვევითი და დეტერმინისტული მოვლენების გარჩევა

[distinguishRandomAndDeterministicEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (ka):** განასხვავე წესით განსაზღვრული შედეგები შემთხვევით შერჩეულებისგან.

##### მოვლენის შესაძლებლობის ახსნა

[explainEventPossibility.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (ka):** განსაზღვრე, შეიძლება თუ არა მოცემულ პირობებში შედეგის დადგომა.

##### მოვლენის ალბათობის ახსნა

[explainEventProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (ka):** შეაფასე მოვლენის შანსი მითითებული ალბათური მოდელით.

##### პროგნოზირების საზღვრების ახსნა

[explainLimitsOfPrediction.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (ka):** ახსენი, რატომ ვერ გვაძლევს ალბათობის ცოდნა ერთი ცდის შედეგის წინასწარ ცოდნას.

##### მოდელში შემთხვევითობის გამოყენება

[useRandomnessInAModel.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (ka):** მოდელს შემთხვევითი არჩევანი დაუმატე და შესაძლო შედეგები განსაზღვრე.

#### სტატისტიკური კვლევა

Skills: 4

[statisticalInvestigation.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (ka):** ისწავლე მონაცემების გამოკვლევა დიაგრამებით, სიხშირეებითა და შედარებით.

##### დაკვირვებების ნაკრებების შედარება

[compareSetsOfObservations.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (ka):** შეადარე ორი მონაცემთა ნაკრები ერთნაირი საზომებით ან კატეგორიებით.

##### მარტივი დიაგრამის შექმნა

[constructASimpleChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (ka):** შექმენი მკაფიო დიაგრამა, რომელიც სწორად ასახავს მონაცემთა პროპორციებს.

##### ყველაზე ხშირი მნიშვნელობის პოვნა

[findTheMostFrequentValue.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (ka):** გამოავლინე მნიშვნელობა, რომელიც ნაკრებში ყველაზე ხშირად გვხვდება.

##### დიაგრამის წაკითხვა

[readAChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (ka):** წაიკითხე მასშტაბები, წარწერები და მნიშვნელობები ისე, რომ წარმოდგენამ შეცდომაში არ შეგიყვანოს.

### პროგრამირება

Groups: 8 · Skills: 37

[programming.data.ts](../../../content/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (ka):** ისწავლე იმ ინსტრუქციების გაგება, წერა და შემოწმება, რომლებსაც კომპიუტერი ასრულებს.

#### მონაცემთა ტიპები და მითითებები

Skills: 6

[dataTypesAndReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (ka):** გაიგე, როგორ მოქმედებს ტიპები და ბმულები იმ მნიშვნელობებზე, რომელთა გამოყენებაც პროგრამას შეუძლია.

##### მნიშვნელობის კოპირებისა და საერთო მითითებების განსხვავება

[distinguishValueCopyingFromSharedReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (ka):** ახსენი, როდის მიუთითებს ორი ცვლადი ერთ ობიექტზე და როდის არის მათი მნიშვნელობები დამოუკიდებელი.

##### მნიშვნელობების ტიპების განსხვავება

[distinguishValueTypes.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (ka):** დაადგინე, მნიშვნელობა რიცხვითია, ტექსტური თუ ლოგიკური და რა მოქმედებებია მასზე შესაძლებელი.

##### მონაცემთა ტიპის კონტრაქტის ახსნა

[explainADataTypeContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (ka):** გაიგე, რა ტიპის მნიშვნელობას ელის პროგრამის ფუნქცია.

##### შედგენილი მონაცემთა სტრუქტურების ახსნა

[explainCompositeDataStructures.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (ka):** ამოიცანი სიები, მასივები და ჩანაწერები, რომლებიც რამდენიმე მნიშვნელობას აწყობენ.

##### პროგრამირების ენის პრიმიტიული მნიშვნელობების ახსნა

[explainPrimitiveValuesInALanguage.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (ka):** ამოიცანი შერჩეული პროგრამირების ენით განსაზღვრული მარტივი მნიშვნელობების ტიპები.

##### მონაცემების კონტრაქტთან შესაბამისობის შემოწმება

[validateDataAgainstAContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (ka):** გამოყენებამდე შეამოწმე, შეესაბამება თუ არა შეყვანილი მონაცემები საჭირო ტიპს ან სტრუქტურას.

#### ფუნქციები და ხელახალი გამოყენება

Skills: 5

[functionsAndReuse.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (ka):** ისწავლე მრავალჯერ გამოსაყენებელი მოქმედებების ფუნქციებად ორგანიზება.

##### ფუნქციის არგუმენტებით გამოძახება

[callAFunctionWithArguments.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (ka):** გამოიძახე ფუნქცია არგუმენტებით და დააკვირდი, როგორ გამოიყენება ისინი.

##### პარამეტრებიანი ფუნქციის განსაზღვრა

[defineAFunctionWithParameters.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (ka):** დაწერე ფუნქცია, რომელიც ფიქსირებული მაგალითის მნიშვნელობების ნაცვლად პარამეტრებს იღებს.

##### რეკურსიის ახსნა

[explainRecursion.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (ka):** გაიგე, როგორ წყვეტს რეკურსიული ფუნქცია უფრო მცირე შემთხვევებს და ბოლოს ჩერდება.

##### ფუნქციის დანიშნულების ახსნა

[explainThePurposeOfAFunction.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (ka):** ახსენი, როგორ ასრულებს სახელდებული ფუნქცია მოქმედებას გამოძახებისას.

##### ფუნქციის დაბრუნებული მნიშვნელობის გამოყენება

[useAFunctionsReturnValue.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (ka):** გამოიყენე დაბრუნებული შედეგი შემდგომ გამოთვლებში და არა მხოლოდ გამოსაჩენად.

#### პროგრამის მონაცემები

Skills: 3

[programData.data.ts](../../../content/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (ka):** იმუშავე მნიშვნელობებთან და ცვალებად მდგომარეობასთან, რომელსაც გაშვებული პროგრამა იყენებს.

##### პროგრამის მდგომარეობის განახლება

[updateProgramState.data.ts](../../../content/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (ka):** შეცვალე პროგრამის შენახული მდგომარეობა წინა მოვლენების მიხედვით.

##### ცვლადის გამოყენება

[useAVariable.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (ka):** შეინახე მნიშვნელობა ცვლადის სახელით და საჭიროებისას წაიკითხე.

##### შემავალი მონაცემების გამოყენება

[useInputData.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (ka):** გამოიყენე პროგრამის გარედან შეყვანილი ინფორმაცია მისი ქცევის დასადგენად.

#### პროგრამის სტრუქტურა და სინტაქსი

Skills: 4

[programStructureAndSyntax.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (ka):** გაიგე, როგორ აწყობენ პროგრამირების ენები საკვანძო სიტყვებს, გამოსახულებებსა და ბლოკებს.

##### საკვანძო სიტყვებისა და იდენტიფიკატორების განსხვავება

[distinguishKeywordsFromIdentifiers.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (ka):** განასხვავე ენის რეზერვირებული სიტყვები პროგრამისტის არჩეული სახელებისგან.

##### ოპერატორების, გამოსახულებებისა და დებულებების განსხვავება

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (ka):** ამოიცანი განსხვავება ოპერატორებს, გამოსახულებებსა და პროგრამულ დებულებებს შორის.

##### ინსტრუქციების ბლოკის საზღვრების ახსნა

[explainStatementBlockBoundaries.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (ka):** იპოვე, რომელი ბრძანებები ეკუთვნის ციკლს, ფუნქციას ან პირობით ბლოკს.

##### სინტაქსის გამოკვეთის ახსნა

[explainSyntaxHighlighting.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (ka):** გაიგე, რას გვაჩვენებს კოდის ფერებით გამოკვეთა და რას ვერ ამტკიცებს.

#### პროგრამირების კონსტრუქციები

Skills: 7

[programmingConstructs.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (ka):** ისწავლე პროგრამის მართვა მიმდევრობებით, პირობებით, ციკლებითა და მოვლენებით.

##### უსასრულო ციკლის აღმოჩენა

[detectAnInfiniteLoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (ka):** იპოვე ციკლი, რომელიც ვერ ჩერდება, რადგან მისი პირობა არასდროს ხდება მცდარი.

##### მოვლენის დამუშავება

[handleAnEvent.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (ka):** გააკეთე ისე, რომ პროგრამა რეაგირებდეს ღილაკზე დაჭერაზე, შეტყობინებასა თუ სხვა მოვლენაზე.

##### ციკლის განხორციელება

[implementALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (ka):** გამოიყენე ციკლი ბრძანებების გასამეორებლად, სანამ სწორი გაჩერების პირობა შესრულდება.

##### პირობითი ქცევის განხორციელება

[implementConditionalBehavior.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (ka):** გააკეთე ისე, რომ პირობების ცვლილებისას პროგრამამ სხვადასხვა მოქმედება აირჩიოს.

##### ციკლის უცვლელი გამოთვლების ციკლის გარეთ გატანა

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (ka):** ციკლის გარეთ გადაიტანე გამოთვლები, რომლებიც გამეორებისას არ იცვლება.

##### ურთიერთგადამკვეთი პირობების შემოწმებების დალაგება

[orderOverlappingConditionalChecks.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (ka):** დაალაგე პირობების შემოწმებები ისე, რომ კონკრეტული შემთხვევებიც დამუშავდეს.

##### ბრძანებების მიმდევრობის დაწერა

[writeASequenceOfCommands.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (ka):** დაწერე სწორი ბრძანებები, რომლებიც მოქმედებებს სასურველი რიგით ასრულებს.

#### პროგრამირების პარადიგმები

Skills: 4

[programmingParadigms.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (ka):** გაიგე პროგრამის ლოგიკისა და ქცევის ორგანიზების სხვადასხვა გზა.

##### იმპერატიული და დეკლარაციული მიდგომების განსხვავება

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (ka):** შეადარე კონკრეტული ინსტრუქციების მიცემა სასურველი შედეგის აღწერას.

##### ფუნქციური პროგრამირების ახსნა

[explainFunctionalProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (ka):** გაიგე პროგრამები, რომლებიც ფუნქციების გაერთიანებით მნიშვნელობებს გარდაქმნიან.

##### ობიექტზე ორიენტირებული პროგრამირების ახსნა

[explainObjectOrientedProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (ka):** გაიგე პროგრამების შესახებ, რომლებიც მდგომარეობისა და ქცევის მქონე ურთიერთმოქმედი ობიექტებისგან შედგება.

##### პროცედურული პროგრამირების ახსნა

[explainProceduralProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (ka):** გაიგე ეტაპობრივ პროცედურებზე აგებული პროგრამების შესახებ.

#### პროგრამების წაკითხვა

Skills: 4

[readingPrograms.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (ka):** გაიგე, როგორ წაიკითხო პროგრამა და თვალი ადევნო მის მოქმედებას.

##### ბრძანების დანიშნულების ახსნა

[explainACommandsPurpose.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (ka):** ახსენი, რას ცვლის პროგრამის მდგომარეობაში ერთი პროგრამული ბრძანება.

##### შესრულების რიგის შედეგების პროგნოზირება

[predictConsequencesOfExecutionOrder.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (ka):** ახსენი, რატომ შეიძლება ბრძანებების რიგის შეცვლამ შედეგი შეცვალოს.

##### პროგრამის გამოტანის პროგნოზირება

[predictProgramOutput.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (ka):** გამოიცანი, რა ხილულ შედეგს მიიღებს პროგრამა მოცემული შემავალი მონაცემებით.

##### პროგრამის მდგომარეობის თვალყურის დევნება

[traceProgramState.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (ka):** დააკვირდი, როგორ იცვლება ცვლადები და სხვა მნიშვნელობები პროგრამის შესრულებისას.

#### ტესტირება და გამართვა

Skills: 4

[testingAndDebugging.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (ka):** გაიგე, როგორ იპოვო, ახსნა და გამოასწორო პროგრამების შეცდომები.

##### პროგრამის არასწორი ქცევის აღმოჩენა

[detectIncorrectProgramBehavior.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (ka):** ამოიცანი, როცა პროგრამის მუშაობა მოთხოვნებს არ შეესაბამება.

##### პროგრამის ხარვეზის გამოსწორება

[fixAProgramDefect.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (ka):** გამოასწორე კონკრეტული ხარვეზი და შეამოწმე, საჭირო ქცევა ისევ მუშაობს თუ არა.

##### შეცდომის მიზეზის პოვნა

[locateTheCauseOfAnError.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (ka):** მიაკვლიე პროგრამირების შეცდომას მის გამომწვევ ბრძანებამდე ან პირობამდე.

##### პროგრამის ტესტირება სხვადასხვა შემავალი მონაცემებით

[testAProgramWithDifferentInputs.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (ka):** გამოსცადე პროგრამა სხვადასხვა მონაცემით, მათ შორის ზღვრული შემთხვევებით.

### რობოტიკა და ავტომატიზაცია

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (ka):** გამოიკვლიე, როგორ აძლევს სენსორები, პროგრამირება და ამძრავები რობოტებს გარემოზე რეაგირების საშუალებას.

#### რობოტის მართვა

Skills: 4

[robotControl.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (ka):** შექმენი და გააუმჯობესე ბრძანებები რობოტის მოძრაობისა და რეაგირებისთვის.

##### რობოტის განმეორებითი მოქმედების დაყენება

[configureARepeatedRobotAction.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (ka):** განსაზღვრე, რამდენჯერ უნდა გაიმეოროს რობოტმა მოქმედება ან როდის გაჩერდეს.

##### რობოტის მოძრაობათა მიმდევრობის შექმნა

[createARobotMovementSequence.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (ka):** დაგეგმე თანმიმდევრული ბრძანებები, რომლებიც რობოტს დანიშნულების ადგილამდე მიიყვანს.

##### რობოტის ქცევაში შეცდომების გამოსწორება

[debugRobotBehavior.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (ka):** გაარკვიე, მოულოდნელი მოქმედება სენსორით, მართვის ლოგიკით თუ ამძრავით არის გამოწვეული.

##### რობოტის რეაქციის განხორციელება დაბრკოლებაზე

[implementRobotObstacleResponse.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (ka):** გააჩერე, მოაბრუნე ან გადაატარე რობოტი დაბრკოლებას, როცა სენსორი მას აღმოაჩენს.

#### რობოტული სისტემის კომპონენტები

Skills: 4

[roboticSystemComponents.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (ka):** გაიგე, როგორ აღიქვამს რობოტი პირობებს, იღებს გადაწყვეტილებას და მოქმედებს.

##### რობოტის კონტროლერის ამოცნობა

[identifyARobotController.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (ka):** ამოიცანი კონტროლერი, რომელიც სენსორის მონაცემებს დაპროგრამებულ მოქმედებად გარდაქმნის.

##### სენსორის დანიშნულების ამოცნობა

[identifyASensorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (ka):** ამოიცანი სენსორები, რომლებიც სინათლეს, მანძილს, ტემპერატურას ან სხვა პირობებს ზომავენ.

##### ამძრავის დანიშნულების ამოცნობა

[identifyAnActuatorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (ka):** ახსენი, როგორ ასრულებენ ძრავები, ნათურები და სხვა ამძრავები ბრძანებებს.

##### სენსორიდან მოქმედებამდე კავშირის მოდელირება

[modelTheSensorToActionRelationship.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (ka):** დააკავშირე სენსორის გაზომვა, გადაწყვეტილების წესი და ამძრავის პასუხი.

### პროგრამული უზრუნველყოფის არქიტექტურა

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../content/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (ka):** შეისწავლე, როგორ აწყობს ობიექტები, პასუხისმგებლობები და დამოკიდებულებები საიმედო პროგრამულ უზრუნველყოფას.

#### დიზაინის პრინციპები

Skills: 8

[designPrinciples.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (ka):** ისწავლე პრინციპები, რომლებიც პროგრამებს გასაგებსა და ადაპტირებადს ხდის.

##### არასაჭირო ფუნქციების გადადება (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (ka):** ნუ დაამატებ ფუნქციებს მხოლოდ წარმოსახვითი სამომავლო საჭიროებებისთვის.

##### კონტრაქტებზე დამოკიდებულების დაპროექტება (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (ka):** გამიჯნე ბიზნესლოგიკა კონკრეტული სერვისებისგან კონტრაქტებზე დამოკიდებულებით.

##### ბირთვის ცვლილების გარეშე ქცევის გაფართოება (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (ka):** შექმენი გაფართოების წერტილები ახალი ქცევისთვის მდგრადი ძირითადი ლოგიკის გადაწერის გარეშე.

##### ზედმეტი გამეორების აღმოჩენა (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (ka):** იპოვე გამეორებული წესები, რომლებმაც მომავალში არათანმიმდევრული ცვლილებები შეიძლება გამოიწვიოს.

##### ერთი პასუხისმგებლობის გამოყოფა (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (ka):** დაალაგე მოდული ერთი თანმიმდევრული ცვლილების მიზეზის ირგვლივ.

##### ზედმეტი სირთულის შემცირება (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (ka):** გაამარტივე პროგრამა მოთხოვნებით გაუმართლებელი მექანიზმების მოცილებით.

##### ვიწრო ინტერფეისების გამოყოფა (ISP)

[separateNarrowInterfacesISP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (ka):** შექმენი იმდენად მცირე ინტერფეისები, რომ კლიენტებს მხოლოდ საჭირო ოპერაციები მოეთხოვებოდეთ.

##### ჩანაცვლებადობის შემოწმება (LSP)

[verifySubstitutabilityLSP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (ka):** შეამოწმე, იცავს თუ არა რეალიზაცია საერთო კონტრაქტის დაპირებებს.

#### ობიექტის მოდელი

Skills: 13

[objectModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (ka):** გაიგე, როგორ აერთიანებენ პროგრამული ობიექტები მდგომარეობასა და ქცევას.

##### ობიექტების აბსტრაქციის გამოყენება

[applyObjectAbstraction.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (ka):** აირჩიე აუცილებელი ოპერაციები, რომლებიც კომპონენტმა მომხმარებლებს უნდა აჩვენოს.

##### კლასისა და ობიექტის გარჩევა

[distinguishAClassFromAnObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (ka):** განასხვავე კლასის შაბლონი და ობიექტები, რომლებსაც საკუთარი მიმდინარე მნიშვნელობები აქვთ.

##### რეალური საგნისა და აბსტრაქტული მოდელის გარჩევა

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (ka):** გაიგე, რომ პროგრამული მოდელი მხოლოდ შერჩეულ თვისებებს ასახავს.

##### ობიექტის მეთოდის ახსნა

[explainAnObjectMethod.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (ka):** ახსენი, როგორ შეუძლია მეთოდის გამოძახებას ობიექტის მდგომარეობის წაკითხვა ან შეცვლა.

##### ობიექტის თვისების ახსნა

[explainAnObjectProperty.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (ka):** განასხვავე შენახული თვისება და ოპერაციები, რომელთა შესრულებაც ობიექტს შეუძლია.

##### ინკაფსულაციის ახსნა

[explainEncapsulation.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (ka):** გაიგე, როგორ იცავენ ობიექტები შინაგან მდგომარეობას კონტროლირებადი მეთოდებით.

##### მემკვიდრეობის ახსნა

[explainInheritance.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (ka):** ახსენი, როგორ შეიძლება სპეციალიზებულმა კლასმა ზოგადი კლასის ქცევა მემკვიდრეობით მიიღოს.

##### პოლიმორფიზმის ახსნა

[explainPolymorphism.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (ka):** გაიგე, როგორ ასრულებენ განსხვავებული ობიექტები ერთსა და იმავე ოპერაციას სხვადასხვა გზით.

##### კლასის ცნების ახსნა

[explainTheConceptOfAClass.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (ka):** გაიგე კლასი როგორც განსაზღვრება, რომლის მიხედვით ცალკეული ობიექტები იქმნება.

##### პროგრამული ობიექტის აგებულების ახსნა

[explainTheStructureOfASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (ka):** ამოიცანი არსებული ობიექტის იდენტობა, თვისებები და მეთოდები.

##### ობიექტის მდგომარეობისა და ქცევის განსაზღვრა

[identifyAnObjectsStateAndBehavior.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (ka):** აღწერე ობიექტის მახასიათებლები და მოქმედებები, რომელთა შესრულებაც შეუძლია.

##### საგნობრივი არეალის არსების პროგრამულ ობიექტად მოდელირება

[modelADomainEntityAsASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (ka):** შექმენი სასარგებლო ობიექტი შესაბამისი თვისებებისა და ოპერაციების შერჩევით.

##### ობიექტების კომპოზიციის მოდელირება

[modelObjectComposition.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (ka):** შექმენი დიდი პროგრამული ობიექტები მცირე ნაწილებისგან, განსხვავებული პასუხისმგებლობებით.

