<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (ko)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### 알고리즘

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../content/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (ko):** 반복 실행할 수 있는 문제 해결 방법을 설계하고 적용하며 비교해 보세요.

#### 분석

Skills: 3

[analysis.data.ts](../../../content/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (ko):** 입력에 따라 알고리즘의 시간 및 메모리 요구량이 어떻게 변하는지 알아보세요.

##### 선형 성장과 로그 성장 구별하기

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (ko):** 입력 크기에 비례하는 증가와 반복해서 반으로 줄일 때의 증가를 비교하세요.

##### 알고리즘 최악의 경우 추정하기

[estimateAnAlgorithmsWorstCase.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (ko):** 최악의 경우 알고리즘에 필요한 최대 검사 횟수를 추정해 보세요.

##### 시간과 메모리의 절충 관계 설명하기

[explainTimeMemoryTradeOffs.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (ko):** 더 빠른 알고리즘에 임시 메모리가 더 많이 필요할 수 있는 이유를 알아보세요.

#### 컬렉션 처리

Skills: 4

[collectionProcessing.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (ko):** 데이터를 순회하며 개수와 합계, 최댓값과 최솟값을 구하는 법을 알아보세요.

##### 요소 개수 세기 적용하기

[applyElementCounting.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (ko):** 주어진 조건을 만족하는 컬렉션의 모든 요소를 세어 보세요.

##### 최댓값 찾기 적용하기

[applyMaximumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (ko):** 컬렉션을 순회하며 지금까지 본 가장 큰 값을 기록해 보세요.

##### 최솟값 찾기 적용하기

[applyMinimumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (ko):** 컬렉션을 순회하며 지금까지 본 가장 작은 값을 기록해 보세요.

##### 합계 누적하기

[applySumAccumulation.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (ko):** 컬렉션의 값을 하나씩 누적 합계에 더해 보세요.

#### 구성

Skills: 6

[construction.data.ts](../../../content/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (ko):** 알고리즘의 동작, 조건, 종료 규칙을 정의하는 방법을 알아보세요.

##### 요구 사항에 따라 알고리즘 비교하기

[compareAlgorithmsAgainstRequirements.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (ko):** 알고리즘의 전제 조건과 제한 사항에 따라 가능한 방법을 비교해 보세요.

##### 순차 알고리즘 구성하기

[constructASequentialAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (ko):** 올바른 순서로 실행하는 유한한 단계들을 설명해 보세요.

##### 알고리즘 목표 정의하기

[defineAnAlgorithmsGoal.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (ko):** 알고리즘이 달성할 결과와 허용하는 입력을 명확히 해 보세요.

##### 조건부 분기 설계하기

[designConditionalBranching.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (ko):** 명확히 검사할 수 있는 조건에 따라 알고리즘의 실행 경로를 계획해 보세요.

##### 반복 설계하기

[designRepetition.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (ko):** 올바른 상태 갱신과 종료 조건이 있는 반복 절차를 설계해 보세요.

##### 재귀 알고리즘 구현하기

[implementARecursiveAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (ko):** 더 작은 하위 문제와 종료하는 기본 조건을 갖춘 재귀 알고리즘을 만들어 보세요.

#### 탐색

Skills: 6

[search.data.ts](../../../content/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (ko):** 여러 탐색 방법이 컬렉션에서 항목을 찾는 방식을 알아보세요.

##### 이진 탐색 적용하기

[applyBinarySearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (ko):** 정렬된 데이터에서 범위를 반복해 반으로 줄이며 값을 찾아보세요.

##### 이진 탐색 트리에서 검색하기

[applyBinaryTreeSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (ko):** 이진 탐색 트리의 정렬 규칙에 따라 가지를 따라가며 키를 찾아보세요.

##### 선형 탐색 적용하기

[applyLinearSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (ko):** 요소를 하나씩 확인하며 찾는 값을 찾아보세요.

##### 검사 횟수로 탐색 방법 비교하기

[compareSearchMethodsByCheckCount.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (ko):** 선형 탐색과 이진 탐색의 검사 횟수를 비교해 보세요.

##### 이진 탐색의 전제 조건 파악하기

[identifyBinarySearchPrerequisites.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (ko):** 데이터가 이진 탐색에 필요한 정렬 조건을 만족하는지 확인해 보세요.

##### 탐색 규모 변화 예측하기

[predictSearchScaling.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (ko):** 데이터가 두 배가 되어도 이진 탐색에 필요한 검사는 약 한 번만 늘어나는 이유를 알아보세요.

#### 정렬

Skills: 4

[sorting.data.ts](../../../content/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (ko):** 정렬 방법으로 값을 지정한 순서대로 배열하는 법을 알아보세요.

##### 버블 정렬 적용하기

[applyBubbleSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (ko):** 순서가 잘못된 이웃 값을 서로 바꿔 정렬해 보세요.

##### 삽입 정렬 적용하기

[applyInsertionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (ko):** 각 새 요소를 이미 정렬된 구간에 삽입해 정렬하세요.

##### 선택 정렬 적용하기

[applySelectionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (ko):** 남은 요소 중 최솟값을 반복해서 선택해 정렬해 보세요.

##### 정렬 기준 설명하기

[explainASortingCriterion.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (ko):** 컬렉션을 정렬할 값이나 속성을 선택해 보세요.

### 인공지능

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../content/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (ko):** 인공지능 시스템이 학습하고 예측하며 콘텐츠를 생성하다가 때때로 오류를 내는 이유를 알아보세요.

#### 인공지능의 기초

Skills: 6

[aIFundamentals.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (ko):** 프로그래밍된 규칙, 학습된 모델, AI 작업의 차이를 알아보세요.

##### AI 작업 분류하기

[classifyAITasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (ko):** AI 작업이 분류, 예측, 콘텐츠 생성 중 무엇을 목표로 하는지 알아보세요.

##### 규칙과 학습된 모델 구별하기

[distinguishRulesFromTrainedModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (ko):** 명시적으로 프로그래밍한 판단 규칙과 데이터로 학습한 시스템을 구별해 보세요.

##### 생성형 AI 설명하기

[explainGenerativeAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (ko):** 생성 모델이 텍스트, 이미지 등의 콘텐츠를 만드는 방식을 이해해 보세요.

##### 예시를 통해 학습하는 원리 설명하기

[explainLearningFromExamples.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (ko):** 예시가 모델의 새로운 입력 처리 성능을 높이는 데 어떻게 도움이 되는지 설명해 보세요.

##### 예측형 AI 설명하기

[explainPredictiveAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (ko):** 예측 시스템이 값, 범주, 사건이 일어날 가능성을 어떻게 추정하는지 알아보세요.

##### AI의 잠재적 오류 알아보기

[identifyAPotentialAIError.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (ko):** AI 답변을 독립적으로 확인해야 할 수 있는 경고 신호를 찾아보세요.

#### 모방과 이해

Skills: 2

[imitationAndUnderstanding.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (ko):** 그럴듯한 모방과 진정한 이해의 차이를 살펴보세요.

##### 설의 중국어 방 설명하기

[explainSearlesChineseRoom.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (ko):** 중국어 방 사고 실험과 그로 인해 제기되는 논쟁을 알아보세요.

##### 튜링 테스트 설명하기

[explainTheTuringTest.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (ko):** 튜링 테스트가 무엇을 평가하며 무엇을 증명할 수 없는지 이해해 보세요.

#### 언어 모델의 토큰과 문맥

Skills: 6

[languageModelTokensAndContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (ko):** 언어 모델이 텍스트를 토큰으로 나누고 문맥을 활용하는 방법을 알아보세요.

##### 샘플링과 가장 가능성 높은 토큰 선택 구별하기

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (ko):** 확률이 가장 높은 토큰만 고르는 방법과 다른 후보에서 샘플링하는 방법을 비교해 보세요.

##### 토큰, 문자와 단어 구별하기

[distinguishTokensCharactersAndWords.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (ko):** 문자, 단어, 토큰이 서로 다른 단위인 이유를 알아보세요.

##### 언어 모델의 컨텍스트 창 설명하기

[explainALanguageModelsContextWindow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (ko):** 언어 모델이 한 번에 제한된 문맥만 사용할 수 있는 이유를 이해해 보세요.

##### 컨텍스트 창 한도 초과 설명하기

[explainContextWindowOverflow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (ko):** 요청이 모델의 문맥 한도를 넘으면 어떤 일이 생길 수 있는지 알아보세요.

##### 다음 토큰 선택 설명하기

[explainNextTokenSelection.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (ko):** 언어 모델이 문맥을 바탕으로 다음 토큰 후보를 선택하는 원리를 설명해 보세요.

##### 토큰 설명하기

[explainTokens.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (ko):** 토큰을 모델마다 정의된 텍스트 표현 단위로 이해해 보세요.

#### 모델 구조와 자원

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (ko):** 다양한 AI 모델 구조가 성능과 자원 요구량에 어떤 영향을 미치는지 알아보세요.

##### 작업에 맞는 모델 선택하기

[chooseAModelForATask.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (ko):** 작업 품질, 속도, 비용, 개인정보 보호와 메모리 여유를 고려해 모델을 고르세요.

##### 밀집 모델과 전문가 혼합 모델 비교하기

[compareDenseAndMoEModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (ko):** 많은 매개변수를 활성화하는 모델과 선택된 전문가만 쓰는 모델을 비교해 보세요.

##### 모델의 메모리 요구량 비교하기

[compareModelMemoryRequirements.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (ko):** 파일 저장 공간만이 아니라 모델 실행에 필요한 메모리 양을 추정해 보세요.

##### 응답 지연 시간 비교하기

[compareResponseLatency.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (ko):** AI가 답변을 시작하기까지의 대기 시간과 이후 생성 속도를 따로 비교해 보세요.

##### 양자화 설명하기

[explainQuantization.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (ko):** 수치 정밀도를 낮추면 메모리를 절약하지만 품질이 달라질 수 있음을 알아보세요.

#### 프롬프트 작성

Skills: 7

[prompting.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (ko):** AI 시스템에 더 명확한 지시, 배경 정보와 제약을 제공하는 방법을 알아보세요.

##### 복잡한 프롬프트를 하위 작업으로 나누기

[breakAComplexPromptIntoSubtasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (ko):** 복잡한 요청을 결과를 확인할 수 있는 작은 단계로 나누어 보세요.

##### 프롬프트에 문맥 제공하기

[providePromptContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (ko):** AI가 요청을 이해하도록 관련 배경 정보를 제공해 보세요.

##### 결과를 보고 프롬프트 개선하기

[refineAPromptBasedOnResults.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (ko):** 이전 답변에서 빠진 점을 확인한 뒤 AI 요청을 개선해 보세요.

##### 프롬프트 목표 정하기

[specifyAPromptObjective.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (ko):** AI 도우미가 수행하기를 원하는 정확한 작업을 명시해 보세요.

##### 프롬프트에서 역할 지정하기

[specifyARoleInAPrompt.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (ko):** 유용한 관점이나 문체를 정하되 실제 전문성의 증거로 착각하지 마세요.

##### 출력 형식 지정하기

[specifyAnOutputFormat.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (ko):** 표나 지정된 필드처럼 명확한 답변 구조를 요청해 보세요.

##### 프롬프트 제약 조건 지정하기

[specifyPromptConstraints.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (ko):** 분량, 출처, 지어내면 안 되는 정보 등의 제한을 설정해 보세요.

#### AI의 신뢰성과 책임 있는 사용

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (ko):** AI 출력의 정확성을 확인하고 사람들에게 미치는 영향을 살펴보세요.

##### AI 지원 의사 결정에서 인간의 책임 설명하기

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (ko):** AI의 도움을 받아 내린 결정도 사람이 책임져야 하는 이유를 이해해 보세요.

##### 프롬프트에서 개인정보 보호하기

[protectPersonalDataInPrompts.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (ko):** AI에 요청하기 전에 불필요한 개인정보를 제거해 보세요.

##### AI 편향 위험 알아보기

[recognizeAIBiasRisks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (ko):** AI 시스템이 개인이나 집단을 불공정하게 대할 수 있는 경우를 알아보세요.

##### AI 답변의 사실 확인하기

[verifyFactsInAnAIResponse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (ko):** AI 답변의 사실 주장을 믿을 만한 독립적인 출처로 검증해 보세요.

#### AI와 안전하게 상호 작용하기

Skills: 4

[safeInteractionWithAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (ko):** AI의 조언이 오해를 부르거나 과도한 의존을 초래할 수 있는 상호 작용을 알아보세요.

##### AI에 과도하게 의존할 위험 설명하기

[explainRisksOfOverrelianceOnAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (ko):** AI가 독립적인 사고나 사람의 도움을 대신해서는 안 되는 이유를 알아보세요.

##### AI 입력에서 신뢰할 수 없는 지시 찾기

[identifyUntrustedInstructionsInAIInput.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (ko):** 외부 자료에 숨겨져 있지만 도우미를 제어해서는 안 되는 지시를 알아보세요.

##### AI 사용 시 비밀 정보 보호하기

[protectSecretsWhenUsingAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (ko):** AI를 사용할 때 비밀번호, 접근 키와 기밀 정보를 보호하세요.

##### AI의 과도한 동조 알아보기

[recognizeAISycophancy.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (ko):** 증거 없이 사용자의 의견에 동의하거나 칭찬하는 AI 응답을 알아보세요.

### 컴퓨팅 사고

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../content/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (ko):** 복잡한 문제를 명확한 단계, 패턴, 규칙으로 나누는 방법을 알아보세요.

#### 분해와 추상화

Skills: 4

[decompositionAndAbstraction.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (ko):** 문제의 핵심 부분과 관계를 찾아 문제를 단순하게 만드는 방법을 배워 보세요.

##### 추상적인 시스템 모델 만들기

[buildAnAbstractSystemModel.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (ko):** 복잡한 상황이나 시스템을 단순화한 표현을 만들어 보세요.

##### 문제 분해하기

[decomposeAProblem.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (ko):** 큰 문제를 따로 해결할 수 있는 작은 과제로 나누어 보세요.

##### 반복되는 방법 일반화하기

[generalizeARepeatedMethod.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (ko):** 여러 구체적인 문제에 공통으로 적용할 수 있는 재사용 가능한 방법을 찾아보세요.

##### 객체의 핵심 속성 찾아보기

[identifyEssentialObjectProperties.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (ko):** 과제에 중요한 세부 사항을 고르고 관련 없는 것은 제외해 보세요.

#### 논리와 패턴

Skills: 8

[logicAndPatterns.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (ko):** 규칙, 패턴, 논리적 조건이 문제 해결에 어떻게 도움이 되는지 알아보세요.

##### 논리 AND 적용하기

[applyLogicalAND.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (ko):** AND를 사용해 두 조건이 모두 충족되는지 확인해 보세요.

##### 논리 NOT 적용하기

[applyLogicalNOT.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (ko):** NOT을 사용해 조건의 참·거짓 값을 반대로 바꿔 보세요.

##### 논리 OR 적용하기

[applyLogicalOR.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (ko):** OR를 사용해 두 조건 중 하나 이상이 충족되는지 확인해 보세요.

##### 서로 모순되는 규칙 찾기

[detectContradictoryRules.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (ko):** 두 요구 사항이 동시에 참일 수 없는 경우를 알아보세요.

##### 단순 조건 평가하기

[evaluateASimpleCondition.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (ko):** 하나의 조건이 참인지 거짓인지, 아직 판단할 수 없는지 알아보세요.

##### 복합 논리식 평가하기

[evaluateCompoundLogicalExpressions.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (ko):** 여러 연산자가 있는 논리식을 올바른 순서로 계산해 보세요.

##### 규칙에서 결과 예측하기

[predictAnOutcomeFromARule.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (ko):** 규칙과 시작 상태를 알 때 다음에 무슨 일이 일어나는지 알아보세요.

##### 패턴 인식하기

[recognizeAPattern.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (ko):** 순서에서 패턴을 찾고 제안된 규칙이 맞는지 확인해 보세요.

### 자료 구조

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../content/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (ko):** 컬렉션, 키, 트리와 네트워크가 다양한 작업에 맞게 데이터를 어떻게 구성하는지 알아보세요.

#### 딕셔너리

Skills: 3

[dictionaries.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (ko):** 딕셔너리가 고유한 키와 저장된 값을 어떻게 연결하는지 알아보세요.

##### 딕셔너리 구조 설명하기

[explainDictionaryStructure.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (ko):** 딕셔너리가 위치가 아닌 키로 정보를 검색하는 방식을 이해해 보세요.

##### 키로 딕셔너리 값 가져오기

[retrieveADictionaryValueByKey.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (ko):** 키로 딕셔너리 값을 찾고 키가 없을 때도 처리해 보세요.

##### 딕셔너리 값 갱신하기

[updateADictionaryValue.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (ko):** 딕셔너리에 이미 있는 키에 저장된 값을 변경해 보세요.

#### 그래프

Skills: 6

[graphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (ko):** 그래프가 장소와 사물, 그리고 그 사이의 연결을 어떻게 나타내는지 알아보세요.

##### 방향 그래프와 무방향 그래프 구별하기

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (ko):** 연결이 한 방향인지 양방향인지 구별해 보세요.

##### 트리와 순환이 있는 그래프 구별하기

[distinguishTreesFromGraphsWithCycles.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (ko):** 그래프에는 순환이 있을 수 있지만 트리에는 없는 이유를 이해해 보세요.

##### 가중 그래프와 비가중 그래프 구별하기

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (ko):** 그래프의 연결에 거리나 비용 같은 숫자가 붙는 경우를 알아보세요.

##### 그래프 구조 설명하기

[explainGraphStructure.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (ko):** 그래프의 정점과 정점을 연결하는 간선을 알아보세요.

##### 그래프에서 경로 찾기

[findAPathInAGraph.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (ko):** 간선의 방향을 지키며 정점 사이의 올바른 경로를 따라가 보세요.

##### 인접한 정점 식별하기

[identifyAdjacentVertices.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (ko):** 다른 정점과 직접 연결된 정점을 찾아보세요.

#### 큐

Skills: 3

[queue.data.ts](../../../content/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (ko):** 큐가 항목을 들어온 순서대로 처리하는 방법을 알아보세요.

##### 큐에서 요소 꺼내기

[dequeueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (ko):** 다른 항목의 순서를 바꾸지 않고 큐의 맨 앞 항목을 꺼내 보세요.

##### 큐에 요소 추가하기

[enqueueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (ko):** 큐의 맨 뒤에 새 항목을 추가해 보세요.

##### FIFO 원리 설명하기

[explainFIFO.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (ko):** 큐에 가장 먼저 들어온 요소가 가장 먼저 나가는 이유를 설명해 보세요.

#### 시퀀스

Skills: 7

[sequences.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (ko):** 순서가 있는 모음에서 요소를 조회하고 추가하고 삭제하는 방법을 살펴보세요.

##### 인덱스로 시퀀스 요소에 접근하기

[accessASequenceElementByIndex.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (ko):** 유효한 위치를 벗어나지 않고 인덱스로 요소를 가져오세요.

##### 배열과 연결 리스트 구별하기

[distinguishArraysFromLinkedLists.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (ko):** 인덱스 배열과 연결된 노드의 사슬을 비교해 보세요.

##### 배열 구조 설명하기

[explainArrayStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (ko):** 배열이 인덱스로 지정된 위치에 요소를 저장하는 방식을 이해해 보세요.

##### 리스트 구조 설명하기

[explainListStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (ko):** 리스트는 여러 방식으로 표현할 수 있는 순서 있는 모음임을 알아보세요.

##### 시퀀스에 요소 삽입하기

[insertAnElementIntoASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (ko):** 정렬된 시퀀스의 알맞은 위치에 요소를 삽입해 보세요.

##### 시퀀스에서 요소 삭제하기

[removeAnElementFromASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (ko):** 나머지 요소의 순서를 유지하면서 요소 하나를 제거해 보세요.

##### 시퀀스 순회하기

[traverseASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (ko):** 시퀀스의 모든 요소를 순서대로 방문해 보세요.

#### 집합

Skills: 4

[sets.data.ts](../../../content/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (ko):** 중복 없는 값의 집합과 원소의 포함 여부를 확인하는 연산을 알아보세요.

##### 집합의 교집합 구하기

[computeSetIntersection.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (ko):** 두 집합에 모두 속하는 원소만 찾아보세요.

##### 집합의 합집합 구하기

[computeSetUnion.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (ko):** 두 집합의 서로 다른 원소를 중복 없이 모두 합쳐 보세요.

##### 집합 구조 설명하기

[explainSetStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (ko):** 집합이 서로 다른 원소를 하나씩만 저장하는 이유를 알아보세요.

##### 집합의 원소 포함 여부 검사하기

[testSetMembership.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (ko):** 특정 값이 집합에 속하는지 확인해 보세요.

#### 스택

Skills: 3

[stack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (ko):** 스택이 가장 나중에 추가된 요소에 먼저 접근하는 방식을 알아보세요.

##### LIFO 원리 설명하기

[explainLIFO.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (ko):** 스택에서 가장 나중에 추가한 요소가 먼저 나오는 이유를 이해해 보세요.

##### 스택에서 요소 꺼내기

[popAnElementFromAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (ko):** 스택이 비어 있는지 확인하면서 가장 나중에 추가한 요소를 꺼내세요.

##### 스택에 요소 넣기

[pushAnElementOntoAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (ko):** 스택 맨 위에 새 요소를 올려 보세요.

#### 자료 구조 선택

Skills: 4

[structureSelection.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (ko):** 프로그램이 데이터를 사용하는 방식에 맞춰 자료 구조를 선택해 보세요.

##### 필요한 작업에 맞는 자료 구조 선택하기

[chooseAStructureForRequiredOperations.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (ko):** 인덱스, 포함 여부, 큐 또는 관계 표현에 적합한 모음을 선택하세요.

##### 컬렉션 삽입 비용 비교하기

[compareCollectionInsertionCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (ko):** 삽입할 때 배열 요소를 이동하거나 연결을 변경해야 하는 이유를 알아보세요.

##### 요소 접근 비용 비교하기

[compareElementAccessCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (ko):** 배열과 연결 리스트가 특정 요소에 도달하는 속도를 비교해 보세요.

##### 자료 구조와 알고리즘 구별하기

[distinguishDataStructuresFromAlgorithms.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (ko):** 구조로 데이터를 정리하는 것과 알고리즘으로 처리하는 것을 구별해 보세요.

#### 트리

Skills: 4

[trees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (ko):** 트리가 부모와 자식 노드의 관계로 정보를 구성하는 방식을 알아보세요.

##### 리프 노드와 내부 노드 구별하기

[distinguishLeafAndInternalTreeNodes.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (ko):** 자식 노드가 있는 노드와 없는 리프 노드를 구별해 보세요.

##### 이진 탐색 트리 설명하기

[explainBinarySearchTrees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (ko):** 이진 탐색 트리에서 검색을 가능하게 하는 키의 순서 규칙을 알아보세요.

##### 트리 구조 설명하기

[explainTreeStructure.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (ko):** 트리의 루트, 가지, 노드와 연결을 알아보세요.

##### 트리에서 경로 찾기

[findAPathInATree.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (ko):** 트리의 두 노드 사이에 실제로 연결된 경로를 따라가 보세요.

### 디자인 패턴

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../content/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (ko):** 소프트웨어 객체를 생성하고 결합하고 조정하는 재사용 가능한 방법을 알아보세요.

#### 행동 패턴

Skills: 11

[behavioral.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (ko):** 객체가 요청을 조정하고 동작을 바꾸는 방법을 알아보세요.

##### 책임 연쇄

[chainOfResponsibility.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (ko):** 요청을 처리할 수 있는 처리자가 나올 때까지 차례로 전달해 보세요.

##### 커맨드

[command.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (ko):** 작업을 저장하거나 실행을 예약할 수 있는 객체로 표현해 보세요.

##### 인터프리터

[interpreter.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (ko):** 표현식 형태의 규칙으로 작은 언어를 해석해 보세요.

##### 이터레이터

[iterator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (ko):** 저장 방식을 공개하지 않고 컬렉션의 요소를 방문해 보세요.

##### 중재자

[mediator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (ko):** 중앙 중재자를 통해 구성 요소의 상호 작용을 조정해 보세요.

##### 메멘토

[memento.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (ko):** 나중에 복원할 수 있도록 객체의 상태를 저장해 보세요.

##### 옵서버

[observer.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (ko):** 관찰 대상 객체가 바뀌면 관심 있는 구독자에게 알려 보세요.

##### 상태

[state.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (ko):** 객체의 현재 상태에 따라 반응 방식을 바꿔 보세요.

##### 전략

[strategy.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (ko):** 같은 공통 인터페이스를 따르는 알고리즘들을 교체해 보세요.

##### 템플릿 메서드

[templateMethod.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (ko):** 알고리즘의 주요 단계는 고정하고 일부 단계만 바꿀 수 있게 해 보세요.

##### 방문자

[visitor.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (ko):** 객체 구조와 그 구조를 대상으로 하는 작업을 분리해 보세요.

#### 생성 패턴

Skills: 5

[creational.data.ts](../../../content/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (ko):** 사용자가 구체적인 타입에 묶이지 않고 객체를 만들 수 있는 패턴을 배우세요.

##### 추상 팩토리

[abstractFactory.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (ko):** 서로 어울리는 관련 객체 묶음을 만드는 팩토리를 사용해 보세요.

##### 빌더

[builder.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (ko):** 빌더로 복잡한 객체를 단계별로 조립해 보세요.

##### 팩토리 메서드

[factoryMethod.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (ko):** 어떤 구체적인 객체를 만들지 하위 클래스가 선택하도록 해 보세요.

##### 프로토타입

[prototype.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (ko):** 미리 설정한 예시를 복사해 새 객체를 만들어 보세요.

##### 싱글턴

[singleton.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (ko):** 전역 상태의 위험을 고려하며 하나의 공유 인스턴스에 대한 접근을 관리해 보세요.

#### 구조 패턴

Skills: 7

[structural.data.ts](../../../content/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (ko):** 소프트웨어 구성 요소를 연결하고 감싸고 공유하는 패턴을 알아보세요.

##### 어댑터

[adapter.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (ko):** 서로 맞지 않는 인터페이스 사이의 변환을 통해 연결해 보세요.

##### 브리지

[bridge.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (ko):** 구성 요소의 추상화와 사용하는 구현을 분리해 보세요.

##### 컴포지트

[composite.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (ko):** 하나의 공통 인터페이스로 개별 객체와 객체 묶음을 다뤄 보세요.

##### 데코레이터

[decorator.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (ko):** 하위 클래스를 계속 늘리는 대신 객체를 감싸 동작을 추가해 보세요.

##### 퍼사드

[facade.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (ko):** 복잡한 구성 요소 묶음에 간단한 진입점을 제공해 보세요.

##### 플라이웨이트

[flyweight.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (ko):** 재사용 가능한 객체 데이터를 공유해 불필요한 메모리 사용을 줄여 보세요.

##### 프록시

[proxy.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (ko):** 같은 인터페이스를 가진 다른 객체를 통해 접근을 관리해 보세요.

### 디지털 창작과 게임

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (ko):** 디지털 미디어를 만들고 플레이 가능한 게임 규칙을 설계하며 절차적 생성을 탐구해 보세요.

#### 디지털 자료

Skills: 3

[digitalMaterials.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (ko):** 목적에 맞는 디지털 콘텐츠를 만들고 수정하며 적절한 도구를 선택하는 법을 배워 보세요.

##### 디지털 창작 도구 선택하기

[chooseADigitalCreativeTool.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (ko):** 만들고 싶은 결과물에 맞는 창작 소프트웨어를 선택하세요.

##### 간단한 디지털 작품 만들기

[createASimpleDigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (ko):** 특정 대상을 위한 일관된 디지털 카드, 이미지 또는 다른 작품을 만들어 보세요.

##### 디지털 작품 편집하기

[editADigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (ko):** 의도한 의미를 유지하면서 기존 디지털 파일을 개선하세요.

#### 게임 디자인

Skills: 3

[gameDesign.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (ko):** 규칙과 플레이어의 행동이 게임 경험을 어떻게 바꾸는지 알아보세요.

##### 게임 메커니즘 설계하기

[designAGameMechanic.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (ko):** 플레이어의 행동을 게임 상태의 변화 및 피드백과 연결하세요.

##### 게임 규칙 만들기

[formulateAGameRule.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (ko):** 플레이어가 허용된 행동을 알 수 있도록 게임 규칙을 명확히 작성하세요.

##### 간단한 게임의 균형 테스트하기

[testTheBalanceOfASimpleGame.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (ko):** 게임 규칙이 공정하고 도전적이며 끝낼 수 있는 게임을 만드는지 확인하세요.

#### 절차적 생성

Skills: 4

[proceduralGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (ko):** 간단한 규칙으로 알고리즘이 다양한 콘텐츠를 만드는 방법을 알아보세요.

##### 리소스 저장과 생성 비교하기

[compareResourceStorageAndGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (ko):** 절차적 생성으로 절약하는 저장 공간과 필요한 계산량을 비교하세요.

##### 생성기 매개변수 설정하기

[configureGeneratorParameters.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (ko):** 출력물의 모양이나 수량을 제어하도록 생성기 설정을 변경하세요.

##### 절차적 리소스 생성 설명하기

[explainProceduralResourceGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (ko):** 모든 완성 버전을 저장하는 대신 생성기가 리소스를 만드는 방식을 설명하세요.

##### 생성 시드로 결과 재현하기

[reproduceResultsUsingAGenerationSeed.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (ko):** 고정된 시드와 변하지 않는 규칙으로 같은 결과를 재현하는 방법을 이해하세요.

### 디지털 제품 사용자 경험

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (ko):** 누구나 이해하고 탐색하며 접근할 수 있는 디지털 경험을 설계해 보세요.

#### 접근성

Skills: 2

[accessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (ko):** 다양한 능력과 입력 방식이 디지털 접근에 어떤 영향을 주는지 알아보세요.

##### 다양한 능력을 가진 사용자의 요구 파악하기

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (ko):** 키보드, 확대된 글자 또는 보조 기술을 사용하는 사람들의 요구를 파악하세요.

##### 디지털 상호작용의 접근성 테스트하기

[testDigitalInteractionAccessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (ko):** 마우스나 소리 없이 인터페이스를 테스트하고 장애 요소를 기록하세요.

#### 디지털 상호 작용 설계

Skills: 4

[digitalInteractionDesign.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (ko):** 디지털 인터페이스에서 직관적인 동작과 유용한 반응을 설계해 보세요.

##### 디지털 인터페이스 피드백 설계하기

[designDigitalInterfaceFeedback.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (ko):** 버튼, 로딩 상태, 오류가 이해하기 쉬운 피드백을 제공하도록 만드세요.

##### 디지털 인터페이스 탐색 설계하기

[designDigitalInterfaceNavigation.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (ko):** 사용자가 필요한 동작을 찾을 수 있도록 화면과 탐색을 구성하세요.

##### 디지털 제품 사용자의 목표 파악하기

[identifyADigitalProductUsersGoal.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (ko):** 사용자가 앱이나 디지털 기기로 이루려는 목표를 파악하세요.

##### 흔한 디지털 상호작용 오류 예방하기

[preventCommonDigitalInteractionErrors.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (ko):** 레이블, 유효성 검사, 확인 절차로 피할 수 있는 실수를 예방하세요.

#### 경험 평가와 윤리

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (ko):** 사용자 테스트와 정직한 설계가 디지털 제품을 개선하는 방법을 알아보세요.

##### 조작적인 인터페이스 패턴 식별하기

[identifyManipulativeInterfacePatterns.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (ko):** 비용을 숨기거나 선택을 강요하고 취소를 방해하는 인터페이스 속임수를 알아보세요.

##### 디지털 인터페이스 사용성 테스트하기

[testDigitalInterfaceUsability.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (ko):** 추가 힌트 없이 실제 작업을 완료할 수 있는지 관찰하세요.

### 디지털 안전과 책임

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (ko):** 정보를 보호하고 타인을 존중하며 디지털 기술의 영향을 이해해 보세요.

#### 계정 보호

Skills: 9

[accountProtection.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (ko):** 계정을 보호하고 의심스러운 메시지에 대응하는 방법을 알아보세요.

##### 이메일 발신자의 신뢰성 평가하기

[assessAnEmailSendersAuthenticity.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (ko):** 표시된 이름이나 사진뿐 아니라 실제 발신자 신원을 확인해 보세요.

##### 링크를 여는 위험 평가하기

[assessTheRiskOfFollowingALink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (ko):** 의심스러운 링크를 열면 어떤 일이 생길 수 있는지 판단해 보세요.

##### 다중 인증 설정하기

[configureMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (ko):** 추가 로그인 인증 요소를 설정하고 안전한 계정 복구 방법을 계획해 보세요.

##### 강력한 암호 문구 만들기

[createAStrongPassphrase.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (ko):** 계정마다 다르고 길며 예측하기 어려운 암호 문구를 만들어 보세요.

##### 다중 인증 설명하기

[explainMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (ko):** 두 번째 독립적인 인증 요소가 계정을 보호하는 원리를 알아보세요.

##### 소프트웨어 업데이트의 중요성 설명하기

[explainWhySoftwareUpdatesMatter.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (ko):** 공식 업데이트가 보안 취약점을 수정하는 데 도움이 되는 이유를 알아보세요.

##### 피싱 메시지 알아보기

[recognizeAPhishingMessage.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (ko):** 다른 사람이나 기관을 사칭해 비밀번호나 인증 코드를 훔치려는 메시지를 구별해 보세요.

##### 의심스러운 디지털 연락에 대응하기

[respondToSuspiciousDigitalContact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (ko):** 의심스러운 연락에는 안전하게 대처하고 다른 경로로 요청을 확인하세요.

##### 웹사이트 도메인 확인하기

[verifyAWebsitesDomain.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (ko):** 웹 주소의 실제 도메인을 확인하고 비슷하게 꾸민 가짜 주소를 알아보세요.

#### 디지털 상호 작용의 윤리

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (ko):** 존중하며 소통하고 창작자의 이용 허락을 지키는 방법을 알아보세요.

##### 디지털 자료의 출처 표시하기

[attributeDigitalMaterials.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (ko):** 사용하는 디지털 콘텐츠의 원래 제작자를 밝혀 보세요.

##### 문제를 안전하게 신고하는 방법 선택하기

[chooseASafeWayToReportAProblem.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (ko):** 온라인 문제를 믿을 만한 사람이나 공식 창구에 알릴 방법을 선택해 보세요.

##### 디지털 콘텐츠 라이선스 구별하기

[distinguishDigitalContentLicenses.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (ko):** 저작권 제한, 공개 라이선스와 퍼블릭 도메인 콘텐츠를 구분해 보세요.

##### 올바른 온라인 행동 알아보기

[identifyAppropriateOnlineBehavior.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (ko):** 디지털 소통에서 위협, 괴롭힘, 따돌림을 알아보세요.

#### 개인정보 보호

Skills: 5

[privacy.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (ko):** 온라인 정보 공유가 사생활에 미치는 영향을 알아보세요.

##### 안전한 데이터 공유 방법 선택하기

[chooseSafeDataSharingMethods.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (ko):** 민감한 정보를 누구에게 어떤 방법으로 안전하게 전달할지 선택해 보세요.

##### 비공개 채팅과 공개 링크 구별하기

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (ko):** 공유된 채팅이나 문서를 누가 열 수 있는지 확인하고 링크가 비공개라고 가정하지 마세요.

##### 데이터 재식별 설명하기

[explainDataReIdentification.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (ko):** 따로 수집한 정보들을 결합해 사람을 다시 알아볼 수 있는 원리를 설명해 보세요.

##### 개인정보 알아보기

[identifyPersonalData.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (ko):** 다른 정보와 결합해 개인을 알아볼 수 있는 자료까지 식별해 보세요.

##### 디지털 발자국 알아보기

[recognizeADigitalFootprint.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (ko):** 온라인 게시물과 활동이 오래 남는 기록을 만들 수 있다는 점을 이해해 보세요.

#### 컴퓨팅의 사회·환경적 영향

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (ko):** 컴퓨팅이 공정성, 자원 이용과 환경에 미치는 영향을 알아보세요.

##### 사용자 집단에 대한 알고리즘 영향 평가하기

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (ko):** 알고리즘 결과가 사용자 집단마다 불공정하게 다르지 않은지 살펴보세요.

##### 컴퓨팅의 환경 영향 평가하기

[assessComputingsEnvironmentalImpact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (ko):** 컴퓨팅에 필요한 에너지, 재료 및 전자 폐기물의 영향을 비교해 보세요.

### 디지털 시스템과 네트워크

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (ko):** 컴퓨팅 기기, 디지털 정보, 네트워크가 어떻게 함께 작동하는지 알아보세요.

#### 디지털 기기 구성 요소

Skills: 3

[digitalDeviceComponents.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (ko):** 하드웨어 부품과 소프트웨어가 서로 다른 컴퓨팅 작업을 어떻게 수행하는지 알아보세요.

##### 하드웨어와 소프트웨어 구별하기

[distinguishHardwareFromSoftware.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (ko):** 컴퓨터의 물리적인 부품과 이를 제어하는 소프트웨어를 구별해 보세요.

##### 프로세서의 기능 설명하기

[explainAProcessorsFunction.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (ko):** 프로세서가 파일을 영구 저장하는 대신 명령을 실행한다는 점을 설명해 보세요.

##### 디지털 기기 식별하기

[identifyDigitalDevices.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (ko):** 프로그램에 따라 디지털 정보를 처리하는 기기를 알아보세요.

#### 메모리와 저장 장치

Skills: 4

[memoryAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (ko):** 임시 메모리, 펌웨어 메모리, 파일 저장 공간이 각각 무슨 일을 하는지 알아보세요.

##### RAM, ROM, 저장 장치 구별하기

[distinguishRAMROMAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (ko):** RAM, ROM, 영구 저장 장치가 각각 어떤 정보를 보관하도록 설계되었는지 비교해 보세요.

##### 영구 저장 설명하기

[explainPersistentStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (ko):** 전원이 꺼진 뒤에도 저장 장치에 파일이 남는 이유를 이해해 보세요.

##### RAM 설명하기

[explainRAM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (ko):** 컴퓨터가 실행되는 동안 RAM이 작업 중인 정보를 어떻게 보관하는지 알아보세요.

##### ROM의 목적 설명하기

[explainThePurposeOfROM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (ko):** 전원을 꺼도 내용이 유지되는 펌웨어 메모리가 기기 시작을 어떻게 돕는지 알아보세요.

#### 네트워크 모델과 프로토콜

Skills: 11

[networkModelsAndProtocols.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (ko):** 네트워크 프로토콜이 정보 전송의 규칙을 어떻게 정하는지 알아보세요.

##### 네트워크 접근 방식 비교하기

[compareNetworkAccessMethods.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (ko):** 충돌 감지, 충돌 회피, 토큰 전달을 각각의 사용 환경에서 비교해 보세요.

##### HTTP와 HTTPS 구별하기

[distinguishHTTPFromHTTPS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (ko):** HTTPS가 무엇을 보호하며 웹사이트의 신뢰성을 보장하지는 않는 이유를 알아보세요.

##### OSI와 TCP/IP 구별하기

[distinguishOSIFromTCPIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (ko):** 개념적인 OSI 계층과 인터넷의 TCP/IP 프로토콜 스택을 비교해 보세요.

##### TCP와 UDP 구별하기

[distinguishTCPFromUDP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (ko):** 신뢰성 있는 TCP 데이터 스트림과 같은 보장이 없는 UDP 메시지를 비교해 보세요.

##### 네트워크 프로토콜 설명하기

[explainANetworkProtocol.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (ko):** 기기들이 메시지를 주고받으려면 합의된 규칙이 필요한 이유를 설명해 보세요.

##### CSMA/CA 설명하기

[explainCSMACA.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (ko):** 무선 기기가 사용 중인 채널에서 전송하지 않으려고 어떻게 노력하는지 설명해 보세요.

##### CSMA/CD 설명하기

[explainCSMACD.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (ko):** 과거의 공유형 이더넷에서 충돌 감지가 필요했던 이유를 알아보세요.

##### DNS 설명하기

[explainDNS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (ko):** DNS가 도메인 이름으로 네트워크 주소를 찾는 데 어떻게 도움을 주는지 설명해 보세요.

##### OSI 계층 설명하기

[explainTheOSILayers.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (ko):** 7계층 OSI 모델을 사용해 네트워크 기능을 정리해 보세요.

##### IP의 목적 설명하기

[explainThePurposeOfIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (ko):** IP가 네트워크 간에 패킷 주소를 지정하고 전달하는 방법을 이해해 보세요.

##### 토큰 링 설명하기

[explainTokenRing.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (ko):** 토큰을 전달해 어느 기기가 데이터를 보낼 수 있는지 제어하는 방법을 알아보세요.

#### 네트워크

Skills: 4

[networks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (ko):** 연결된 기기들이 메시지를 보내고 자원을 공유하는 방법을 알아보세요.

##### 인터넷과 웹 구별하기

[distinguishTheInternetFromTheWeb.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (ko):** 인터넷의 네트워크 기반 시설과 웹의 사이트를 구별해 보세요.

##### 네트워크 메시지 전달 설명하기

[explainNetworkMessageDelivery.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (ko):** 메시지가 네트워크 기기를 거쳐 목적지까지 가는 경로를 따라가 보세요.

##### 컴퓨터 네트워크의 목적 설명하기

[explainThePurposeOfAComputerNetwork.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (ko):** 정보를 주고받기 위해 네트워크가 서로 다른 기기를 연결하는 이유를 설명해 보세요.

##### 무선 통신 설명하기

[explainWirelessCommunication.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (ko):** 무선 기기가 직접 케이블로 연결하지 않고 신호로 통신하는 방법을 알아보세요.

#### 진법

Skills: 4

[numeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (ko):** 밑이 다른 진법에서 숫자가 수를 어떻게 나타내는지 배워 보세요.

##### 이진수와 십진수 변환하기

[convertBetweenBinaryAndDecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (ko):** 작은 수를 이진수와 십진수 사이에서 변환해 보세요.

##### 이진수와 십육진수 구별하기

[distinguishBinaryAndHexadecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (ko):** 십육진수가 비트 묶음을 더 짧게 나타낼 수 있는 이유를 이해해 보세요.

##### 컴퓨터의 이진 논리 설명하기

[explainComputerBinaryLogic.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (ko):** 이진수 0과 1을 구별 가능한 전자 신호 상태와 연결해 보세요.

##### 위치 기수법 설명하기

[explainPositionalNumeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (ko):** 숫자의 위치가 바뀌면 수에서 나타내는 값이 달라지는 이유를 이해해 보세요.

#### 운영체제

Skills: 4

[operatingSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (ko):** 운영체제가 프로그램, 파일, 기기를 어떻게 관리하는지 알아보세요.

##### 운영체제 계열 구별하기

[distinguishOperatingSystemFamilies.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (ko):** 대표적인 운영체제 계열과 그 차이점을 알아보세요.

##### 운영체제 프로세스 설명하기

[explainAnOSProcess.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (ko):** 실행 중인 프로세스와 디스크에 저장된 프로그램 파일을 구별해 보세요.

##### 운영체제의 목적 설명하기

[explainAnOperatingSystemsPurpose.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (ko):** 운영체제가 소프트웨어와 하드웨어를 어떻게 조정하는지 이해해 보세요.

##### 리눅스에서 리누스 토르발스의 역할 설명하기

[explainLinusTorvaldsRoleInLinux.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (ko):** 리눅스 커널이 어떻게 시작되었고 많은 기여자가 운영체제를 함께 만드는지 알아보세요.

#### 정보 표현과 저장

Skills: 4

[representationAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (ko):** 기기가 정보를 어떻게 표현하고 저장된 파일을 어떻게 정리하는지 알아보세요.

##### 디지털 파일 크기 비교하기

[compareDigitalFileSizes.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (ko):** 파일 크기를 비교하고 형식과 압축이 크기에 영향을 주는 이유를 설명해 보세요.

##### 디지털 형식 구별하기

[distinguishDigitalFormats.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (ko):** 파일 형식이 저장된 비트를 어떻게 해석할지 결정한다는 점을 알아보세요.

##### 이진 표현 설명하기

[explainBinaryRepresentation.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (ko):** 0과 1의 나열이 여러 종류의 데이터를 어떻게 부호화하는지 이해해 보세요.

##### 디렉터리에서 파일 정리하기

[organizeFilesInDirectories.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (ko):** 경로로 파일을 찾기 쉽도록 알맞은 폴더에 정리해 보세요.

#### 작업 실행

Skills: 3

[taskExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (ko):** 작업들이 번갈아 진행되는 것과 실제로 동시에 실행되는 것의 차이를 알아보세요.

##### 독립 작업을 여러 실행 장치에 분배하기

[distributeIndependentTasksAcrossExecutors.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (ko):** 어떤 작업을 함께 실행할 수 있고 어떤 작업은 다른 결과를 기다려야 하는지 계획해 보세요.

##### 동시성 실행 설명하기

[explainConcurrentExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (ko):** 여러 작업이 정확히 같은 순간에 실행되지 않아도 진행할 수 있는 방법을 이해해 보세요.

##### 병렬 실행 설명하기

[explainParallelExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (ko):** 여러 프로세서가 실제로 동시에 작업을 수행하는 경우를 알아보세요.

### Git과 오픈 소스

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (ko):** 개발자가 변경 사항을 추적하고 협력하며 명확한 허가에 따라 소프트웨어를 공유하는 방법을 알아보세요.

#### 디지털 제품 공동 개발

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (ko):** 팀이 기여, 검토 및 프로젝트 버전을 관리하는 방식을 알아보세요.

##### 공유 디지털 프로젝트의 변경 조율하기

[coordinateChangesInASharedDigitalProject.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (ko):** 누가 무엇을 변경하고 공동 편집 내용을 어떻게 병합할지 계획하세요.

##### 기여 지침 설명하기

[explainContributionGuidelines.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (ko):** 기여 규칙이 같은 코드베이스에서 함께 작업하는 데 도움이 되는 이유를 알아보세요.

##### 디지털 제품 버전 추적하기

[trackDigitalProductVersions.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (ko):** 버전 기록을 사용해 변경 시점을 찾거나 이전 작업을 복원해 보세요.

#### Git 버전 관리

Skills: 6

[gitVersionControl.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (ko):** Git이 버전을 기록하고 팀의 변경 사항을 병합하는 데 도움을 주는 방식을 알아보세요.

##### 로컬 저장소와 원격 저장소 구별하기

[distinguishLocalAndRemoteRepositories.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (ko):** 내 컴퓨터의 작업과 원격 저장소를 통해 공유하는 복사본을 구별해 보세요.

##### 브랜치 설명하기

[explainABranch.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (ko):** 브랜치로 변경 작업을 별도 흐름에서 진행하는 방법을 알아보세요.

##### 커밋 설명하기

[explainACommit.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (ko):** 커밋이 이전 작업 기록과 연결된 식별 가능한 스냅샷임을 알아보세요.

##### 풀 리퀘스트 설명하기

[explainAPullRequest.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (ko):** 풀 리퀘스트가 제안된 변경 사항을 검토용으로 정리하는 방식을 알아보세요.

##### 저장소 설명하기

[explainARepository.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (ko):** 저장소가 프로젝트와 변경 기록을 함께 보관한다는 것을 알아보세요.

##### 브랜치 병합 설명하기

[explainBranchMerging.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (ko):** 브랜치를 병합하는 방법과 충돌 해결이 필요한 이유를 알아보세요.

#### 오픈 소스

Skills: 2

[openSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (ko):** 소프트웨어가 진정한 오픈 소스가 되려면 어떤 권한이 필요한지 알아보세요.

##### 오픈 소스와 공개된 코드 구별하기

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (ko):** 소스 코드가 보인다고 해서 자동으로 오픈 소스가 되는 것은 아님을 알아보세요.

##### 오픈 소스 설명하기

[explainOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (ko):** 오픈 소스 라이선스가 소프트웨어의 사용, 수정 및 재배포를 어떻게 허용하는지 알아보세요.

### 프로그래밍의 역사

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (ko):** 프로그래밍 아이디어와 컴퓨팅 기계가 역사 속에서 어떻게 발전했는지 알아보세요.

#### 주요 기여

Skills: 6

[keyContributions.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (ko):** 프로그래밍, 소프트웨어 신뢰성, 컴퓨터 네트워크의 주요 기여를 알아보세요.

##### 계산 가능성 이론 설명하기

[explainComputabilityTheory.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (ko):** 형식 모델로 컴퓨터가 계산할 수 있는 것과 없는 것을 알아보세요.

##### 초기 전자식 프로그래밍 설명하기

[explainEarlyElectronicProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (ko):** 초기 전자식 컴퓨터 팀이 프로그램을 만들고 시험한 방법을 알아보세요.

##### 컴파일러 발전 설명하기

[explainTheDevelopmentOfCompilers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (ko):** 컴파일러 덕분에 읽기 쉬운 언어로 프로그램을 작성하기 편해진 과정을 알아보세요.

##### 소프트웨어 신뢰성 발전 설명하기

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (ko):** 아폴로 임무에서 오류 처리와 안정적인 소프트웨어가 왜 중요했는지 알아보세요.

##### 네트워크 루프 제거 설명하기

[explainTheEliminationOfNetworkLoops.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (ko):** 스패닝 트리 프로토콜이 로컬 네트워크의 루프를 막는 원리를 알아보세요.

##### 프로그래밍의 기원 설명하기

[explainTheOriginsOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (ko):** 초기 기계 설계와 에이다 러브레이스의 업적이 프로그래밍을 어떻게 예고했는지 알아보세요.

#### 기계와 암호 분석

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (ko):** 기계와 수학적 방법이 역사적으로 암호 해독을 어떻게 도왔는지 알아보세요.

##### 역사적 암호 분석 방법 설명하기

[explainHistoricalCryptanalysisMethods.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (ko):** 암호 분석가들이 패턴과 체계적 검사를 활용해 암호를 풀었던 방법을 알아보세요.

##### 프로그래밍 가능한 컴퓨터 발전 설명하기

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (ko):** 기계식 계산 개념에서 프로그래밍 가능한 전자 기계까지의 발전을 살펴보세요.

##### 봄브의 목적 설명하기

[explainThePurposeOfTheBombe.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (ko):** 봄브가 에니그마 설정 후보를 검사하는 데 어떻게 사용됐는지 알아보세요.

### 정보와 데이터

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../content/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (ko):** 믿을 만한 정보를 찾고 데이터를 정리하며 불확실성을 생각하는 방법을 알아보세요.

#### 데이터 수집과 정리

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (ko):** 관련 정보를 모으고 비교 가능한 기록을 정리하는 방법을 배우세요.

##### 일관되게 데이터 수집하기

[collectDataConsistently.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (ko):** 같은 규칙과 단위를 사용해 측정값을 모아 보세요.

##### 속성별로 데이터 묶기

[groupDataByAttribute.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (ko):** 하나의 분명한 특징에 따라 기록을 묶어 보세요.

##### 과제에 필요한 데이터 찾기

[identifyDataNeededForATask.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (ko):** 질문에 실제로 필요한 필드와 관찰값을 정해 보세요.

##### 데이터를 표로 나타내기

[presentDataInATable.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (ko):** 행과 열에 이름을 붙이고 값의 형식을 맞춘 표를 만들어 보세요.

#### 데이터베이스

Skills: 5

[databases.data.ts](../../../content/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (ko):** 데이터베이스가 기록을 구조화하고 관련 정보를 연결하는 방법을 알아보세요.

##### 간단한 데이터베이스 스키마 설계하기

[designASimpleDatabaseSchema.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (ko):** 알맞은 엔터티, 필드, 연결이 있는 간단한 데이터베이스를 계획해 보세요.

##### 레코드와 필드 구별하기

[distinguishRecordsAndFields.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (ko):** 레코드와 그것을 설명하는 필드를 구별해 보세요.

##### 데이터베이스 테이블 설명하기

[explainADatabaseTable.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (ko):** 테이블이 같은 종류의 레코드를 저장하는 방법을 이해해 보세요.

##### 기본 키 설명하기

[explainPrimaryKeys.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (ko):** 레코드마다 안정적인 고유 키가 필요한 이유를 설명해 보세요.

##### 테이블 간 관계 모델링하기

[modelRelationshipsBetweenTables.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (ko):** 식별자를 사용해 다른 테이블의 정보를 연결해 보세요.

#### 정보 검색과 검증

Skills: 4

[informationSearchAndVerification.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (ko):** 근거를 찾고 주장이 뒷받침되는지 확인하는 방법을 배우세요.

##### 정보 출처 비교하기

[compareInformationSources.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (ko):** 여러 출처를 비교하고 설명이 서로 다른 부분을 찾아보세요.

##### 메시지와 데이터 구별하기

[distinguishMessagesFromData.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (ko):** 기록된 값과 메시지가 부여하는 의미를 구별해 보세요.

##### 정보 검색어 만들기

[formulateAnInformationQuery.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (ko):** 찾아야 할 정보에 맞는 구체적인 검색어를 선택해 보세요.

##### 출처를 통해 주장 검증하기

[verifyAClaimAgainstASource.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (ko):** 반복되는 주장보다 적절한 근거를 이용해 주장을 확인해 보세요.

#### 확률과 불확실성

Skills: 7

[probabilityAndUncertainty.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (ko):** 가능한 사건과 그 확률, 예측의 한계를 알아보세요.

##### 간단한 사건의 확률 비교하기

[compareProbabilitiesOfSimpleEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (ko):** 같은 가정 아래 두 결과의 일어날 확률을 비교해 보세요.

##### 가능성과 확률 구별하기

[distinguishPossibilityFromProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (ko):** 일어날 수 있는 사건이라고 해서 일어날 확률이 높지는 않음을 이해해 보세요.

##### 무작위 사건과 결정적 사건 구별하기

[distinguishRandomAndDeterministicEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (ko):** 규칙으로 정해진 결과와 무작위로 선택된 결과를 구별해 보세요.

##### 사건의 가능성 설명하기

[explainEventPossibility.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (ko):** 주어진 조건에서 결과가 나올 수 있는지 판단해 보세요.

##### 사건의 확률 설명하기

[explainEventProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (ko):** 명시된 확률 모형으로 사건이 일어날 확률을 추정해 보세요.

##### 예측의 한계 설명하기

[explainLimitsOfPrediction.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (ko):** 확률을 알아도 한 번의 시행 결과를 예측할 수 없는 이유를 설명해 보세요.

##### 모형에 무작위성 사용하기

[useRandomnessInAModel.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (ko):** 가능한 결과를 정하면서 모형에 무작위 선택을 추가해 보세요.

#### 통계적 조사

Skills: 4

[statisticalInvestigation.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (ko):** 그래프, 빈도, 비교를 통해 데이터를 탐색하는 방법을 배우세요.

##### 관측값 집합 비교하기

[compareSetsOfObservations.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (ko):** 같은 측정 기준이나 범주로 두 데이터 집합을 비교해 보세요.

##### 간단한 그래프 만들기

[constructASimpleChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (ko):** 데이터의 비율을 정확히 나타내는 명확한 그래프를 만들어 보세요.

##### 가장 자주 나타나는 값 찾기

[findTheMostFrequentValue.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (ko):** 집합에서 가장 많이 등장하는 값을 찾아보세요.

##### 그래프 읽기

[readAChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (ko):** 표현 방식에 속지 않고 눈금, 라벨, 값을 정확히 읽어 보세요.

### 프로그래밍

Groups: 8 · Skills: 37

[programming.data.ts](../../../content/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (ko):** 컴퓨터가 실행하는 명령을 이해하고 작성하고 테스트하는 방법을 배워 보세요.

#### 데이터 형식과 참조

Skills: 6

[dataTypesAndReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (ko):** 자료형과 참조가 프로그램에서 사용할 수 있는 값에 어떤 영향을 주는지 알아보세요.

##### 값 복사와 공유 참조 구별하기

[distinguishValueCopyingFromSharedReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (ko):** 두 변수가 같은 객체를 공유하는 경우와 각각 독립적인 값을 갖는 경우를 설명해 보세요.

##### 값의 자료형 구별하기

[distinguishValueTypes.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (ko):** 값이 숫자, 텍스트, 불리언 중 무엇인지와 어떤 작업이 가능한지 알아보세요.

##### 데이터 형식 계약 설명하기

[explainADataTypeContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (ko):** 프로그램 함수가 어떤 종류의 값을 받기를 기대하는지 이해해 보세요.

##### 복합 자료구조 설명하기

[explainCompositeDataStructures.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (ko):** 여러 값을 정리하는 리스트, 배열, 레코드를 알아보세요.

##### 프로그래밍 언어의 원시 값 설명하기

[explainPrimitiveValuesInALanguage.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (ko):** 선택한 프로그래밍 언어에서 정의한 단순한 값의 자료형을 알아보세요.

##### 계약에 따라 데이터 검증하기

[validateDataAgainstAContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (ko):** 입력을 사용하기 전에 필요한 자료형이나 구조에 맞는지 확인해 보세요.

#### 함수와 재사용

Skills: 5

[functionsAndReuse.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (ko):** 반복해서 쓸 수 있는 동작을 함수로 구성하는 방법을 알아보세요.

##### 인수를 전달해 함수 호출하기

[callAFunctionWithArguments.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (ko):** 인수를 넣어 함수를 호출하고 인수가 어떻게 쓰이는지 따라가 보세요.

##### 매개변수가 있는 함수 정의하기

[defineAFunctionWithParameters.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (ko):** 고정된 예시 값 대신 매개변수를 받는 함수를 작성해 보세요.

##### 재귀 설명하기

[explainRecursion.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (ko):** 재귀 함수가 더 작은 문제를 해결하며 결국 끝나는 원리를 이해해 보세요.

##### 함수의 목적 설명하기

[explainThePurposeOfAFunction.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (ko):** 이름이 있는 함수가 호출될 때 어떤 동작을 수행하는지 설명해 보세요.

##### 함수 반환값 사용하기

[useAFunctionsReturnValue.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (ko):** 반환된 결과를 보여 주는 데 그치지 않고 추가 계산에 사용해 보세요.

#### 프로그램 데이터

Skills: 3

[programData.data.ts](../../../content/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (ko):** 실행 중인 프로그램이 사용하는 값과 변화하는 상태를 다뤄 보세요.

##### 프로그램 상태 갱신하기

[updateProgramState.data.ts](../../../content/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (ko):** 이전에 일어난 일에 따라 프로그램에 저장된 상태를 바꿔 보세요.

##### 변수 사용하기

[useAVariable.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (ko):** 변수 이름에 값을 저장하고 필요할 때 읽어 보세요.

##### 입력 데이터 사용하기

[useInputData.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (ko):** 프로그램 외부에서 입력한 정보를 이용해 프로그램의 동작을 정해 보세요.

#### 프로그램 구조와 문법

Skills: 4

[programStructureAndSyntax.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (ko):** 프로그래밍 언어가 키워드, 표현식, 블록을 어떻게 구성하는지 알아보세요.

##### 키워드와 식별자 구별하기

[distinguishKeywordsFromIdentifiers.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (ko):** 언어에 예약된 키워드와 프로그래머가 정한 이름을 구별해 보세요.

##### 연산자, 표현식, 문 구별하기

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (ko):** 연산자와 표현식, 명령문의 차이를 알아보세요.

##### 명령문 블록 경계 설명하기

[explainStatementBlockBoundaries.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (ko):** 어떤 명령이 반복문, 함수 또는 조건 블록 안에 속하는지 찾아보세요.

##### 구문 강조 설명하기

[explainSyntaxHighlighting.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (ko):** 코드의 색상이 무엇을 보여 주고 무엇을 보장하지는 않는지 이해해 보세요.

#### 프로그래밍 구문

Skills: 7

[programmingConstructs.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (ko):** 순서, 조건, 반복문, 이벤트를 사용해 프로그램을 제어하는 방법을 배워 보세요.

##### 무한 반복문 찾아내기

[detectAnInfiniteLoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (ko):** 조건이 결코 거짓이 되지 않아 끝나지 않는 반복문을 찾아보세요.

##### 이벤트 처리하기

[handleAnEvent.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (ko):** 버튼, 메시지 또는 다른 이벤트가 발생할 때 프로그램이 반응하도록 만들어 보세요.

##### 반복문 구현하기

[implementALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (ko):** 올바른 종료 조건에 도달할 때까지 명령을 반복하는 반복문을 사용해 보세요.

##### 조건에 따른 동작 구현하기

[implementConditionalBehavior.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (ko):** 조건이 달라질 때 프로그램이 다른 동작을 선택하도록 만들어 보세요.

##### 반복 중 바뀌지 않는 계산을 반복문 밖으로 옮기기

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (ko):** 반복할 때 값이 달라지지 않는 계산은 반복문 밖으로 옮겨 보세요.

##### 겹치는 조건 검사 순서 정하기

[orderOverlappingConditionalChecks.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (ko):** 특정한 경우도 처리될 수 있도록 조건 검사의 순서를 정해 보세요.

##### 명령의 순서 작성하기

[writeASequenceOfCommands.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (ko):** 동작을 의도한 순서대로 실행하는 올바른 명령을 작성해 보세요.

#### 프로그래밍 패러다임

Skills: 4

[programmingParadigms.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (ko):** 프로그램의 논리와 동작을 구성하는 다양한 방법을 알아보세요.

##### 명령형과 선언형 접근법 구별하기

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (ko):** 구체적인 지시를 내리는 방식과 원하는 결과를 설명하는 방식을 비교해 보세요.

##### 함수형 프로그래밍 설명하기

[explainFunctionalProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (ko):** 함수를 조합해 값을 변환하는 프로그램을 이해해 보세요.

##### 객체 지향 프로그래밍 설명하기

[explainObjectOrientedProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (ko):** 상태와 동작을 가진 객체들이 서로 상호작용하는 프로그램을 알아보세요.

##### 절차적 프로그래밍 설명하기

[explainProceduralProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (ko):** 단계별 절차를 중심으로 구성된 프로그램을 알아보세요.

#### 프로그램 읽기

Skills: 4

[readingPrograms.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (ko):** 프로그램을 읽고 어떤 일을 하는지 따라가는 방법을 알아보세요.

##### 명령의 목적 설명하기

[explainACommandsPurpose.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (ko):** 하나의 프로그래밍 명령이 프로그램 상태에 어떤 영향을 주는지 설명해 보세요.

##### 실행 순서의 결과 예측하기

[predictConsequencesOfExecutionOrder.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (ko):** 명령의 순서를 바꾸면 결과가 달라질 수 있는 이유를 설명해 보세요.

##### 프로그램 출력 예측하기

[predictProgramOutput.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (ko):** 주어진 입력에 대해 프로그램이 어떤 결과를 보여 줄지 알아보세요.

##### 프로그램 상태 추적하기

[traceProgramState.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (ko):** 프로그램이 실행되는 동안 변수와 다른 값들이 어떻게 변하는지 따라가 보세요.

#### 테스트와 디버깅

Skills: 4

[testingAndDebugging.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (ko):** 프로그램에서 오류를 찾고 설명하고 수정하는 방법을 알아보세요.

##### 잘못된 프로그램 동작 찾아내기

[detectIncorrectProgramBehavior.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (ko):** 프로그램의 동작이 요구 사항과 다를 때를 알아보세요.

##### 프로그램 결함 수정하기

[fixAProgramDefect.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (ko):** 특정 결함을 고치고 필요한 동작이 여전히 제대로 작동하는지 확인해 보세요.

##### 오류 원인 찾기

[locateTheCauseOfAnError.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (ko):** 프로그래밍 오류를 일으킨 명령이나 조건까지 추적해 보세요.

##### 다양한 입력으로 프로그램 테스트하기

[testAProgramWithDifferentInputs.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (ko):** 경계 사례를 포함한 다양한 입력으로 프로그램을 시험해 보세요.

### 로봇 공학과 자동화

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (ko):** 센서, 프로그래밍, 구동기가 로봇이 주변 환경에 반응하도록 하는 방법을 알아보세요.

#### 로봇 제어

Skills: 4

[robotControl.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (ko):** 로봇의 움직임과 반응을 위한 지시를 만들고 개선해 보세요.

##### 로봇의 반복 동작 설정하기

[configureARepeatedRobotAction.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (ko):** 로봇이 동작을 몇 번 반복하거나 언제 멈출지 정해 보세요.

##### 로봇 이동 순서 만들기

[createARobotMovementSequence.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (ko):** 로봇이 목적지에 도달하도록 움직임 명령을 순서대로 계획해 보세요.

##### 로봇 동작의 오류 찾아 수정하기

[debugRobotBehavior.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (ko):** 예상치 못한 동작이 센서, 제어 논리, 실제 작동 중 어디에서 비롯됐는지 찾아보세요.

##### 로봇의 장애물 반응 구현하기

[implementRobotObstacleResponse.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (ko):** 센서가 장애물을 감지하면 로봇이 멈추거나 방향을 바꾸거나 피하도록 해 보세요.

#### 로봇 시스템의 구성 요소

Skills: 4

[roboticSystemComponents.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (ko):** 로봇이 상황을 감지하고 행동을 결정해 실행하는 과정을 알아보세요.

##### 로봇 제어기 알아보기

[identifyARobotController.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (ko):** 센서 입력을 프로그래밍된 동작으로 바꾸는 제어기를 알아보세요.

##### 센서의 역할 알아보기

[identifyASensorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (ko):** 빛, 거리, 온도 등 상태를 측정하는 센서를 알아보세요.

##### 구동기의 역할 알아보기

[identifyAnActuatorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (ko):** 모터, 조명 등의 구동기가 명령을 수행하는 방식을 설명해 보세요.

##### 센서와 동작의 관계 모델링하기

[modelTheSensorToActionRelationship.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (ko):** 센서 측정값, 판단 규칙과 구동기의 반응을 연결해 보세요.

### 소프트웨어 아키텍처

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../content/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (ko):** 객체, 책임, 의존 관계가 안정적인 소프트웨어를 어떻게 구성하는지 알아보세요.

#### 설계 원칙

Skills: 8

[designPrinciples.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (ko):** 소프트웨어를 이해하기 쉽고 변경에 유연하게 유지하는 원칙을 배워 보세요.

##### 불필요한 기능 미루기 (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (ko):** 상상만 하는 미래의 가능성을 위해 기능을 미리 구현하지 마세요.

##### 계약에 의존하도록 설계하기 (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (ko):** 구체적인 서비스가 아닌 계약에 의존해 비즈니스 로직을 분리해 보세요.

##### 핵심을 수정하지 않고 동작 확장하기 (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (ko):** 안정적인 핵심 로직을 다시 쓰지 않고 새 동작을 추가할 확장 지점을 설계해 보세요.

##### 불필요한 중복 찾기 (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (ko):** 나중에 일관되지 않은 수정을 일으킬 중복 규칙을 찾아보세요.

##### 단일 책임 분리하기 (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (ko):** 하나의 일관된 변경 이유를 중심으로 모듈을 구성해 보세요.

##### 불필요한 복잡성 줄이기 (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (ko):** 요구 사항에 필요하지 않은 장치를 제거하여 소프트웨어를 단순화해 보세요.

##### 작은 인터페이스로 분리하기 (ISP)

[separateNarrowInterfacesISP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (ko):** 사용자가 필요한 동작에만 의존하도록 인터페이스를 작게 나눠 보세요.

##### 대체 가능성 확인하기 (LSP)

[verifySubstitutabilityLSP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (ko):** 구현이 공통 계약의 약속을 지키는지 확인해 보세요.

#### 객체 모델

Skills: 13

[objectModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (ko):** 소프트웨어 객체가 상태와 동작을 어떻게 결합하는지 알아보세요.

##### 객체 추상화 적용하기

[applyObjectAbstraction.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (ko):** 구성 요소가 사용자에게 보여야 할 핵심 작업을 선택해 보세요.

##### 클래스와 객체 구별하기

[distinguishAClassFromAnObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (ko):** 클래스라는 설계도와 각각 현재 값이 있는 객체를 구별해 보세요.

##### 실제 사물과 추상 모델 구별하기

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (ko):** 소프트웨어 모델은 대상의 선택된 특징만 나타냄을 알아보세요.

##### 객체 메서드 설명하기

[explainAnObjectMethod.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (ko):** 메서드를 호출해 객체의 상태를 읽거나 변경하는 방법을 설명해 보세요.

##### 객체 속성 설명하기

[explainAnObjectProperty.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (ko):** 저장된 속성과 객체가 수행할 수 있는 동작을 구별해 보세요.

##### 캡슐화 설명하기

[explainEncapsulation.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (ko):** 객체가 제한된 메서드를 통해 내부 상태를 보호하는 방법을 이해해 보세요.

##### 상속 설명하기

[explainInheritance.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (ko):** 특화된 클래스가 더 일반적인 클래스의 동작을 물려받는 방법을 설명해 보세요.

##### 다형성 설명하기

[explainPolymorphism.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (ko):** 서로 다른 객체가 같은 작업을 서로 다른 방식으로 수행할 수 있음을 알아보세요.

##### 클래스 개념 설명하기

[explainTheConceptOfAClass.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (ko):** 클래스를 개별 객체를 생성하기 위한 정의로 이해해 보세요.

##### 소프트웨어 객체의 구조 설명하기

[explainTheStructureOfASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (ko):** 기존 소프트웨어 객체의 식별 정보, 속성, 메서드를 찾아보세요.

##### 객체의 상태와 동작 식별하기

[identifyAnObjectsStateAndBehavior.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (ko):** 객체의 특징과 수행할 수 있는 동작을 설명해 보세요.

##### 도메인 엔터티를 소프트웨어 객체로 모델링하기

[modelADomainEntityAsASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (ko):** 관련 속성과 동작을 선택해 유용한 객체를 설계해 보세요.

##### 객체 합성 모델링하기

[modelObjectComposition.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (ko):** 서로 다른 책임을 가진 작은 부분으로 큰 소프트웨어 객체를 구성해 보세요.

