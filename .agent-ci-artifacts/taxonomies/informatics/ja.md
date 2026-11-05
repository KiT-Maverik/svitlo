<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (ja)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### アルゴリズム

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../content/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (ja):** 繰り返し使える問題解決方法を設計・適用・比較する方法を学びましょう。

#### 解析

Skills: 3

[analysis.data.ts](../../../content/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (ja):** 入力に応じてアルゴリズムの時間とメモリの必要量がどう変わるか学びましょう。

##### 線形増加と対数増加を区別する

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (ja):** 入力サイズに比例する増加と、繰り返し半分にする場合の増加を比較しましょう。

##### アルゴリズムの最悪ケースを見積もる

[estimateAnAlgorithmsWorstCase.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (ja):** 最悪の場合にアルゴリズムが必要とする確認回数を見積もりましょう。

##### 時間とメモリのトレードオフを説明する

[explainTimeMemoryTradeOffs.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (ja):** 高速なアルゴリズムがより多くの一時メモリを使う場合がある理由を理解しましょう。

#### コレクションの処理

Skills: 4

[collectionProcessing.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (ja):** データを順に調べながら個数・合計・最大値・最小値を求めましょう。

##### 要素の個数を数える

[applyElementCounting.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (ja):** 指定した条件を満たすコレクションの要素をすべて数えましょう。

##### 最大値を求める

[applyMaximumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (ja):** コレクションを順に見ながら、それまでの最大値を記録しましょう。

##### 最小値を求める

[applyMinimumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (ja):** コレクションを順に見ながら、それまでの最小値を記録しましょう。

##### 合計を累積する

[applySumAccumulation.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (ja):** コレクションの値を順に加えて合計を更新しましょう。

#### 構成

Skills: 6

[construction.data.ts](../../../content/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (ja):** アルゴリズムの処理、条件、終了規則を明確にする方法を学びましょう。

##### 要件に照らしてアルゴリズムを比較する

[compareAlgorithmsAgainstRequirements.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (ja):** アルゴリズムの前提条件と制約に基づいて比較しましょう。

##### 逐次アルゴリズムを構築する

[constructASequentialAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (ja):** 正しい順序で実行する有限個の手順を説明しましょう。

##### アルゴリズムの目標を定義する

[defineAnAlgorithmsGoal.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (ja):** アルゴリズムが達成すべき結果と受け付ける入力を示しましょう。

##### 条件分岐を設計する

[designConditionalBranching.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (ja):** 明確な条件によってアルゴリズムの実行経路を分けましょう。

##### 繰り返し処理を設計する

[designRepetition.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (ja):** 正しい更新と終了条件を備えた繰り返し手順を設計しましょう。

##### 再帰アルゴリズムを実装する

[implementARecursiveAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (ja):** 問題を小さくし、基本ケースで終了する再帰アルゴリズムを作りましょう。

#### 探索

Skills: 6

[search.data.ts](../../../content/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (ja):** さまざまな探索方法がコレクション内の要素を見つける仕組みを学びましょう。

##### 二分探索を適用する

[applyBinarySearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (ja):** 整列済みのデータで範囲を半分ずつ除外して値を探しましょう。

##### 二分探索木で探索する

[applyBinaryTreeSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (ja):** 二分探索木で順序に従って枝をたどり、キーを探しましょう。

##### 線形探索を適用する

[applyLinearSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (ja):** 要素を一つずつ調べて目的の値を探しましょう。

##### 確認回数で探索方法を比較する

[compareSearchMethodsByCheckCount.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (ja):** 線形探索と二分探索の確認回数を比べましょう。

##### 二分探索の前提条件を確認する

[identifyBinarySearchPrerequisites.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (ja):** データが二分探索に必要な順序で並んでいるか確認しましょう。

##### 探索の規模による変化を予測する

[predictSearchScaling.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (ja):** データ量が倍になっても二分探索では確認が約一回しか増えない理由を学びましょう。

#### 並べ替え

Skills: 4

[sorting.data.ts](../../../content/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (ja):** ソート法で値を指定した順序に並べる方法を学びましょう。

##### バブルソートを適用する

[applyBubbleSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (ja):** 順序が逆の隣接要素を交換して並べ替えましょう。

##### 挿入ソートを適用する

[applyInsertionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (ja):** 新しい要素を整列済みの部分に挿入して並べ替えましょう。

##### 選択ソートを適用する

[applySelectionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (ja):** 未整列部分から最小の要素を繰り返し選んで並べ替えましょう。

##### 並べ替えの基準を説明する

[explainASortingCriterion.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (ja):** コレクションを並べ替える基準となる値や属性を選びましょう。

### 人工知能

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../content/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (ja):** 人工知能の仕組みが学習、予測、生成を行い、ときには間違える理由を探ろう。

#### 人工知能の基礎

Skills: 6

[aIFundamentals.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (ja):** プログラムされた規則、学習済みモデル、AIの作業の違いを学ぼう。

##### AIの作業を分類する

[classifyAITasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (ja):** AIの仕事が分類、予測、生成のどれに当たるか見分けよう。

##### 規則と学習済みモデルを区別する

[distinguishRulesFromTrainedModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (ja):** 明示的にプログラムされた判断規則とデータで学習したシステムを区別しよう。

##### 生成AIを説明する

[explainGenerativeAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (ja):** 生成モデルが文章、画像などのコンテンツを作る仕組みを理解しよう。

##### 例から学習する仕組みを説明する

[explainLearningFromExamples.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (ja):** 例を使うことでモデルが新しい入力によりよく対応できる理由を説明しよう。

##### 予測AIを説明する

[explainPredictiveAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (ja):** 予測システムが数値や分類、出来事が起こる確率を推定する方法を調べよう。

##### AIの誤りの可能性を見つける

[identifyAPotentialAIError.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (ja):** AIの回答を別の情報源で確認したほうがよい兆候を見つけよう。

#### 模倣と理解

Skills: 2

[imitationAndUnderstanding.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (ja):** 本物らしい模倣と実際の理解の違いを考えてみよう。

##### サールの中国語の部屋を説明する

[explainSearlesChineseRoom.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (ja):** 中国語の部屋という思考実験と、そこから生まれる議論を考えよう。

##### チューリングテストを説明する

[explainTheTuringTest.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (ja):** チューリングテストが評価することと、証明できないことを理解しよう。

#### 言語モデルのトークンと文脈

Skills: 6

[languageModelTokensAndContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (ja):** 言語モデルが文章をトークンに分け、文脈を利用する仕組みを学ぼう。

##### サンプリングと最も確率の高いトークンの選択を区別する

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (ja):** 確率が最も高いトークンを選ぶ方法と、ほかの候補を確率に応じて選ぶ方法を比べよう。

##### トークン、文字、単語を区別する

[distinguishTokensCharactersAndWords.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (ja):** 文字、単語、トークンが同じ単位ではない理由を学ぼう。

##### 言語モデルのコンテキストウィンドウを説明する

[explainALanguageModelsContextWindow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (ja):** 言語モデルが使える文脈の量に限りがある理由を理解しよう。

##### コンテキストウィンドウの上限超過を説明する

[explainContextWindowOverflow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (ja):** 依頼がモデルの文脈の上限を超えると何が起こりうるか調べよう。

##### 次のトークンの選択を説明する

[explainNextTokenSelection.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (ja):** 言語モデルが文脈から次の候補トークンを選ぶ仕組みを説明しよう。

##### トークンを説明する

[explainTokens.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (ja):** トークンはモデルごとに決められたテキストの表現単位だと理解しよう。

#### モデルの構造と計算資源

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (ja):** AIモデルの構造の違いが性能や必要な計算資源にどう影響するか調べよう。

##### 作業に適したモデルを選ぶ

[chooseAModelForATask.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (ja):** 作業の品質、速度、費用、プライバシー、利用できるメモリを考えてモデルを選ぼう。

##### 密なモデルと専門家混合モデルを比較する

[compareDenseAndMoEModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (ja):** 多くのパラメータを使うモデルと選ばれた専門モジュールだけを使うモデルを比べよう。

##### モデルのメモリ要件を比較する

[compareModelMemoryRequirements.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (ja):** ファイルの保存容量だけでなく、モデルを実行するためのメモリ量を見積もろう。

##### 応答開始までの遅延を比較する

[compareResponseLatency.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (ja):** AIが回答を始めるまでの待ち時間と、その後の生成速度を別々に比べよう。

##### 量子化を説明する

[explainQuantization.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (ja):** 数値の精度を下げるとメモリを節約できる一方、品質が変わる場合があることを理解しよう。

#### プロンプトの作成

Skills: 7

[prompting.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (ja):** AIシステムに明確な指示、背景情報、条件を伝える方法を学ぼう。

##### 複雑なプロンプトを小さな作業に分ける

[breakAComplexPromptIntoSubtasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (ja):** 難しい依頼を結果を確認できる小さな手順に分けよう。

##### プロンプトに背景情報を添える

[providePromptContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (ja):** AIが依頼を正しく理解できるよう、関係する背景情報を伝えよう。

##### 結果に基づいてプロンプトを改善する

[refineAPromptBasedOnResults.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (ja):** 前の回答に不足していた点を確認してからAIへの依頼を改善しよう。

##### プロンプトの目的を明確にする

[specifyAPromptObjective.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (ja):** AIアシスタントに達成してほしい作業を具体的に伝えよう。

##### プロンプトで役割を指定する

[specifyARoleInAPrompt.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (ja):** 役立つ視点や文体を指定しても、それを実際の専門知識と混同しないようにしよう。

##### 出力形式を指定する

[specifyAnOutputFormat.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (ja):** 表や指定した項目など、回答の構造を明確に求めよう。

##### プロンプトに制約を指定する

[specifyPromptConstraints.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (ja):** 回答の長さ、情報源、作り出してはいけない情報などの条件を決めよう。

#### AIの信頼性と責任ある利用

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (ja):** AIの出力を確かめ、人々への影響を考える方法を学ぼう。

##### AI支援の意思決定における人間の責任を説明する

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (ja):** AIの支援を受けた判断でも人が責任を持つ理由を理解しよう。

##### プロンプトの個人情報を保護する

[protectPersonalDataInPrompts.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (ja):** AIに依頼を送る前に不要な個人情報を取り除こう。

##### AIの偏りによるリスクを見分ける

[recognizeAIBiasRisks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (ja):** AIが人や集団を不公平に扱うおそれがある場面を見分けよう。

##### AIの回答に含まれる事実を確認する

[verifyFactsInAnAIResponse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (ja):** AIの回答の事実に関する主張を信頼できる独立した情報源で確かめよう。

#### AIとの安全なやり取り

Skills: 4

[safeInteractionWithAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (ja):** AIの助言が誤解を招いたり、過度な依存につながったりするやり取りを見分けよう。

##### AIに頼りすぎるリスクを説明する

[explainRisksOfOverrelianceOnAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (ja):** AIが自分で考えることや人からの支援の代わりにならない理由を理解しよう。

##### AI入力に含まれる信頼できない指示を見つける

[identifyUntrustedInstructionsInAIInput.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (ja):** 外部の資料に隠れた、助手の行動を支配させてはいけない指示を見分けよう。

##### AI利用時に秘密情報を守る

[protectSecretsWhenUsingAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (ja):** AIを使うときはパスワード、アクセスキー、機密情報を保護しよう。

##### AIの過度な同調を見分ける

[recognizeAISycophancy.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (ja):** 根拠のないAIの賛同やお世辞を見分けよう。

### 計算論的思考

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../content/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (ja):** 複雑な問題を明確な手順、パターン、規則に分ける方法を学ぼう。

#### 分解と抽象化

Skills: 4

[decompositionAndAbstraction.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (ja):** 重要な部分とその関係を見つけて問題を単純化する方法を学ぼう。

##### 抽象的なシステムモデルを作る

[buildAnAbstractSystemModel.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (ja):** 複雑な状況や仕組みを簡単なモデルで表そう。

##### 問題を分解する

[decomposeAProblem.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (ja):** 大きな問題を別々に解ける小さな課題に分けよう。

##### 繰り返し使う方法を一般化する

[generalizeARepeatedMethod.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (ja):** いくつかの具体的な問題に共通する、再利用できる方法を見つけよう。

##### 対象の本質的な特徴を見つける

[identifyEssentialObjectProperties.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (ja):** 課題に必要な情報を選び、関係のない情報は除こう。

#### 論理とパターン

Skills: 8

[logicAndPatterns.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (ja):** 規則、パターン、論理条件が問題解決にどう役立つか学ぼう。

##### 論理積ANDを使う

[applyLogicalAND.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (ja):** ANDを使って二つの条件が両方とも成り立つか確かめよう。

##### 論理否定NOTを使う

[applyLogicalNOT.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (ja):** NOTを使って条件の真偽を反転させよう。

##### 論理和ORを使う

[applyLogicalOR.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (ja):** ORを使って二つの条件の少なくとも一つが成り立つか確かめよう。

##### 矛盾する規則を見つける

[detectContradictoryRules.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (ja):** 二つの条件が同時には成り立たない場合を見つけよう。

##### 単純な条件を評価する

[evaluateASimpleCondition.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (ja):** 一つの条件が真か偽か、まだ判断できないかを確かめよう。

##### 複合論理式を評価する

[evaluateCompoundLogicalExpressions.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (ja):** 複数の演算子を含む論理式を正しい順序で評価しよう。

##### 規則から次の結果を予測する

[predictAnOutcomeFromARule.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (ja):** 規則と初期状態が分かっているとき、次に何が起きるか考えよう。

##### パターンを見つける

[recognizeAPattern.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (ja):** 並びの中の規則性を見つけ、考えた規則が当てはまるか確かめよう。

### データ構造

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../content/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (ja):** コレクション、キー、木構造、ネットワークが、さまざまな操作のためにデータをどう整理するか学びましょう。

#### 辞書

Skills: 3

[dictionaries.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (ja):** 辞書が一意のキーと保存された値をどのように結び付けるか学びましょう。

##### 辞書の構造を説明する

[explainDictionaryStructure.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (ja):** 辞書が位置ではなくキーを使って情報を取り出す仕組みを理解しましょう。

##### キーを使って辞書の値を取得する

[retrieveADictionaryValueByKey.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (ja):** キーで辞書の値を探し、キーが存在しない場合にも対応しましょう。

##### 辞書の値を更新する

[updateADictionaryValue.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (ja):** 辞書にすでにあるキーに対応する値を変更しましょう。

#### グラフ

Skills: 6

[graphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (ja):** グラフが場所や物とそのつながりをどのように表すか学びましょう。

##### 有向グラフと無向グラフを区別する

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (ja):** つながりが一方向か双方向かを見分けましょう。

##### 木と閉路を持つグラフを区別する

[distinguishTreesFromGraphsWithCycles.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (ja):** 一般のグラフには閉路があり得るのに、木にはない理由を理解しましょう。

##### 重み付きグラフと重みなしグラフを区別する

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (ja):** グラフの辺に距離や費用などの数値が付いている場合を見分けましょう。

##### グラフの構造を説明する

[explainGraphStructure.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (ja):** グラフの頂点と、それらを結ぶ辺を見分けましょう。

##### グラフ内の経路を見つける

[findAPathInAGraph.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (ja):** 接続の向きに従いながら、頂点間の有効な経路をたどりましょう。

##### 隣接する頂点を特定する

[identifyAdjacentVertices.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (ja):** ある頂点と直接つながっている頂点を見つけましょう。

#### キュー

Skills: 3

[queue.data.ts](../../../content/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (ja):** キューが要素を到着順に処理する仕組みを学びましょう。

##### キューから要素を取り出す

[dequeueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (ja):** ほかの要素の順序を変えずに、キューの先頭の要素を取り出しましょう。

##### 要素をキューに追加する

[enqueueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (ja):** キューの末尾に新しい要素を追加しましょう。

##### FIFO方式を説明する

[explainFIFO.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (ja):** キューに最初に入った要素が最初に取り出される理由を説明しましょう。

#### シーケンス

Skills: 7

[sequences.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (ja):** 順序のあるコレクションで要素を参照・追加・削除する方法を学びましょう。

##### インデックスでシーケンスの要素にアクセスする

[accessASequenceElementByIndex.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (ja):** 有効な位置の範囲を超えずに、インデックスで要素を取り出しましょう。

##### 配列と連結リストを区別する

[distinguishArraysFromLinkedLists.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (ja):** インデックス付き配列と、ノードをつないだ連結リストを比較しましょう。

##### 配列の構造を説明する

[explainArrayStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (ja):** 配列がインデックスで示される位置に要素を保存する仕組みを理解しましょう。

##### リストの構造を説明する

[explainListStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (ja):** リストは複数の方法で表現できる順序付きの集合だと理解しましょう。

##### シーケンスに要素を挿入する

[insertAnElementIntoASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (ja):** 順序付きシーケンスの適切な位置に要素を挿入しましょう。

##### シーケンスから要素を削除する

[removeAnElementFromASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (ja):** 残りの要素の順序を保ちながら、一つの要素を削除しましょう。

##### シーケンスを走査する

[traverseASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (ja):** シーケンスの各要素を順番に調べましょう。

#### 集合

Skills: 4

[sets.data.ts](../../../content/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (ja):** 重複しない値の集合と、要素が属するかを調べる操作を学びましょう。

##### 集合の共通部分を求める

[computeSetIntersection.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (ja):** 二つの集合に共通する要素だけを見つけましょう。

##### 集合の和集合を求める

[computeSetUnion.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (ja):** 二つの集合の異なる要素を重複なしでまとめましょう。

##### 集合の構造を説明する

[explainSetStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (ja):** 集合に同じ要素が一つしか存在しない理由を理解しましょう。

##### 集合への所属を確認する

[testSetMembership.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (ja):** 指定した値が集合に含まれるか調べましょう。

#### スタック

Skills: 3

[stack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (ja):** スタックで最後に追加した要素に最初にアクセスする仕組みを学びましょう。

##### LIFO方式を説明する

[explainLIFO.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (ja):** スタックで最後に入れた要素が最初に取り出される理由を理解しましょう。

##### スタックから要素を取り出す

[popAnElementFromAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (ja):** スタックが空か確認してから、最後に追加した要素を取り出しましょう。

##### スタックに要素を積む

[pushAnElementOntoAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (ja):** スタックの一番上に新しい要素を置きましょう。

#### データ構造の選択

Skills: 4

[structureSelection.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (ja):** プログラムでのデータの使い方に合わせてデータ構造を選びましょう。

##### 必要な操作に適したデータ構造を選ぶ

[chooseAStructureForRequiredOperations.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (ja):** インデックス、所属確認、キューや関係の表現に適した集合を選びましょう。

##### コレクションへの挿入コストを比較する

[compareCollectionInsertionCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (ja):** 挿入時に配列の要素を移動したり、リンクを変えたりする理由を学びましょう。

##### 要素へのアクセスコストを比較する

[compareElementAccessCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (ja):** 配列と連結リストで特定の要素に到達する速さを比較しましょう。

##### データ構造とアルゴリズムを区別する

[distinguishDataStructuresFromAlgorithms.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (ja):** 構造でデータを整理することと、アルゴリズムで処理することを区別しましょう。

#### 木構造

Skills: 4

[trees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (ja):** 木構造が親子関係で情報を整理する方法を学びましょう。

##### 葉ノードと内部ノードを区別する

[distinguishLeafAndInternalTreeNodes.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (ja):** 子ノードがある内部ノードと、ない葉ノードを区別しましょう。

##### 二分探索木を説明する

[explainBinarySearchTrees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (ja):** 二分探索木で探索を可能にするキーの順序規則を理解しましょう。

##### 木構造を説明する

[explainTreeStructure.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (ja):** 木の根、枝、ノードとそれらのつながりを見分けましょう。

##### 木の中で経路を見つける

[findAPathInATree.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (ja):** 木の二つのノード間で実際につながっている経路をたどりましょう。

### デザインパターン

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../content/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (ja):** ソフトウェアオブジェクトを作り、組み合わせ、連携させる再利用可能な方法を探ろう。

#### 振る舞いのパターン

Skills: 11

[behavioral.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (ja):** オブジェクトが要求を調整し、振る舞いを変える方法を探ろう。

##### 責任の連鎖

[chainOfResponsibility.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (ja):** 要求を処理できる担当者が見つかるまで順番に渡そう。

##### コマンド

[command.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (ja):** 操作を保存または実行予定にできるオブジェクトとして表そう。

##### インタープリター

[interpreter.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (ja):** 式で表された規則を使って小さな言語を解釈しよう。

##### イテレーター

[iterator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (ja):** 保存方法を明かさずに集合の要素を順に訪れよう。

##### メディエーター

[mediator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (ja):** 中央の仲介者を通じて部品間のやり取りを調整しよう。

##### メメント

[memento.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (ja):** 後で復元できるようにオブジェクトの状態を保存しよう。

##### オブザーバー

[observer.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (ja):** 監視対象のオブジェクトが変わったら関心のある購読者に通知しよう。

##### ステート

[state.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (ja):** オブジェクトの現在の状態によって応答の仕方を変えよう。

##### ストラテジー

[strategy.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (ja):** 共通インターフェースを守る複数のアルゴリズムを切り替えよう。

##### テンプレートメソッド

[templateMethod.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (ja):** アルゴリズムの主要な手順を固定し、一部の手順を変えられるようにしよう。

##### ビジター

[visitor.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (ja):** 操作を、それが対象とするオブジェクト構造から分離しよう。

#### 生成パターン

Skills: 5

[creational.data.ts](../../../content/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (ja):** 利用側を具体的な型に依存させずにオブジェクトを作るパターンを学ぼう。

##### 抽象ファクトリー

[abstractFactory.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (ja):** 関連するオブジェクトの互換性ある一式を作るファクトリーを使おう。

##### ビルダー

[builder.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (ja):** ビルダーを使い複雑なオブジェクトを段階的に組み立てよう。

##### ファクトリーメソッド

[factoryMethod.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (ja):** どの具体的なオブジェクトを生成するかをサブクラスに選ばせよう。

##### プロトタイプ

[prototype.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (ja):** 設定済みの見本をコピーして新しいオブジェクトを作ろう。

##### シングルトン

[singleton.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (ja):** グローバル状態の危険性に注意しながら、単一の共有インスタンスへのアクセスを制御しよう。

#### 構造パターン

Skills: 7

[structural.data.ts](../../../content/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (ja):** ソフトウェア部品を接続し、包み、共有するためのパターンを学ぼう。

##### アダプター

[adapter.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (ja):** 間に変換を挟んで互換性のないインターフェースをつなごう。

##### ブリッジ

[bridge.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (ja):** 部品の抽象的な側面と利用する実装を分離しよう。

##### コンポジット

[composite.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (ja):** 個々のオブジェクトとオブジェクトの集まりを共通のインターフェースで扱おう。

##### デコレーター

[decorator.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (ja):** サブクラスを増やす代わりにオブジェクトを包んで振る舞いを追加しよう。

##### ファサード

[facade.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (ja):** 複雑な部品群に対する簡単な入口を用意しよう。

##### フライウェイト

[flyweight.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (ja):** 再利用できるオブジェクトのデータを共有し、不要なメモリ使用を減らそう。

##### プロキシ

[proxy.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (ja):** 同じインターフェースの別のオブジェクトでアクセスを制御しよう。

### デジタル創作とゲーム

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (ja):** デジタル作品を作り、遊べるゲームのルールを設計し、手続き型生成を探ろう。

#### デジタル素材

Skills: 3

[digitalMaterials.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (ja):** 目的に合ったデジタル作品の作成と編集、適切なツールの選び方を学ぼう。

##### デジタル制作ツールを選ぶ

[chooseADigitalCreativeTool.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (ja):** 作りたいものに合った制作ソフトを選ぼう。

##### 簡単なデジタル作品を作る

[createASimpleDigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (ja):** 特定の相手に向けて、まとまりのあるデジタルカードや画像などを作ろう。

##### デジタル作品を編集する

[editADigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (ja):** 伝えたい意味を保ちながら、既存のデジタルファイルを改善しよう。

#### ゲームデザイン

Skills: 3

[gameDesign.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (ja):** ルールとプレイヤーの行動がゲーム体験をどう形作るか探ろう。

##### ゲームの仕組みを設計する

[designAGameMechanic.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (ja):** プレイヤーの操作をゲーム状態の変化やフィードバックに結び付けよう。

##### ゲームのルールを定める

[formulateAGameRule.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (ja):** 何が許されるかプレイヤーに伝わるよう、ゲームのルールを明確に書こう。

##### 簡単なゲームのバランスを検証する

[testTheBalanceOfASimpleGame.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (ja):** ルールによってゲームが公平で歯ごたえがあり、最後まで遊べるか確かめよう。

#### 手続き型生成

Skills: 4

[proceduralGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (ja):** 少数の規則からアルゴリズムが多様なコンテンツを生み出す仕組みを学ぼう。

##### リソースの保存と生成を比較する

[compareResourceStorageAndGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (ja):** 手続き型生成で節約できる保存容量と必要な計算量を比較しよう。

##### 生成器のパラメータを設定する

[configureGeneratorParameters.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (ja):** 出力の見た目や数を調整できるよう生成器の設定を変えよう。

##### リソースの手続き型生成を説明する

[explainProceduralResourceGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (ja):** 完成したすべての種類を保存せずに生成器がリソースを作る仕組みを説明しよう。

##### 生成シードを使って結果を再現する

[reproduceResultsUsingAGenerationSeed.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (ja):** 同じシードと変わらない規則で同じ結果を再現できる理由を理解しよう。

### デジタル製品のユーザー体験

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (ja):** わかりやすく操作でき、誰もがアクセスしやすいデジタル体験を設計しよう。

#### アクセシビリティ

Skills: 2

[accessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (ja):** さまざまな能力や入力方法がデジタルアクセスにどう影響するか学ぼう。

##### 多様な能力を持つ利用者のニーズを把握する

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (ja):** キーボードや拡大文字、支援技術を使う人のニーズを理解しよう。

##### デジタル操作のアクセシビリティを検証する

[testDigitalInteractionAccessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (ja):** マウスや音声を使わずに画面を操作し、障害を記録しよう。

#### デジタルな操作の設計

Skills: 4

[digitalInteractionDesign.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (ja):** 画面で直感的に操作でき、わかりやすい反応が得られる仕組みを考えよう。

##### デジタル画面のフィードバックを設計する

[designDigitalInterfaceFeedback.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (ja):** ボタンや読み込み状態、エラーからわかりやすい反応が得られるようにしよう。

##### デジタル画面のナビゲーションを設計する

[designDigitalInterfaceNavigation.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (ja):** 利用者が必要な操作を見つけられるよう画面とナビゲーションを整理しよう。

##### デジタル製品の利用者の目的を把握する

[identifyADigitalProductUsersGoal.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (ja):** 利用者がアプリやデジタル機器で何をしたいのかを理解しよう。

##### デジタル操作でよくあるミスを防ぐ

[preventCommonDigitalInteractionErrors.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (ja):** ラベル、入力チェック、確認を使って防げるミスを減らそう。

#### 体験の評価と倫理

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (ja):** ユーザーテストと誠実な設計がデジタル製品をどう改善するか探ろう。

##### 利用者を誘導する画面設計を見抜く

[identifyManipulativeInterfacePatterns.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (ja):** 費用を隠したり、選択を強制したり、解約を妨げたりする画面の仕掛けを見抜こう。

##### デジタル画面の使いやすさを検証する

[testDigitalInterfaceUsability.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (ja):** 追加のヒントなしで実際の作業を完了できるか観察しよう。

### デジタルの安全と責任

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (ja):** 情報を守り、他者を尊重し、デジタル技術の影響を理解しよう。

#### アカウントの保護

Skills: 9

[accountProtection.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (ja):** アカウントを守り、不審なメッセージに対処する方法を学ぼう。

##### メール送信者の正当性を確かめる

[assessAnEmailSendersAuthenticity.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (ja):** 表示名や写真だけで判断せず、送信者の身元を確認しよう。

##### リンクを開くリスクを評価する

[assessTheRiskOfFollowingALink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (ja):** 不審なリンクを開くと何が起こりうるか考えよう。

##### 多要素認証を設定する

[configureMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (ja):** 追加のログイン認証を有効にし、安全にアクセスを回復する方法を決めよう。

##### 強いパスフレーズを作る

[createAStrongPassphrase.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (ja):** アカウントごとに異なる、長くて推測されにくいパスフレーズを作ろう。

##### 多要素認証を説明する

[explainMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (ja):** 独立した二つ目の認証要素がアカウントを守る仕組みを理解しよう。

##### ソフトウェア更新の重要性を説明する

[explainWhySoftwareUpdatesMatter.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (ja):** 正規の更新によってセキュリティ上の弱点を修正できる理由を学ぼう。

##### フィッシングメッセージを見分ける

[recognizeAPhishingMessage.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (ja):** 他人や企業になりすましてパスワードや認証コードを盗もうとする連絡を見分けよう。

##### 不審なオンラインの連絡に対処する

[respondToSuspiciousDigitalContact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (ja):** 不審な連絡には慎重に対応し、別の信頼できる方法で依頼を確認しよう。

##### ウェブサイトのドメインを確認する

[verifyAWebsitesDomain.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (ja):** URLの本当のドメインを読み取り、紛らわしい偽のアドレスを見分けよう。

#### デジタル交流の倫理

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (ja):** 相手を尊重して交流し、作り手の利用許可を守る方法を学ぼう。

##### デジタル素材の出典を示す

[attributeDigitalMaterials.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (ja):** 使ったデジタルコンテンツの元の作者を明記しよう。

##### 問題を安全に報告する方法を選ぶ

[chooseASafeWayToReportAProblem.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (ja):** ネット上の問題は信頼できる人や公式の窓口へ報告しよう。

##### デジタルコンテンツのライセンスを区別する

[distinguishDigitalContentLicenses.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (ja):** 著作権の制限、オープンライセンス、パブリックドメインの違いを理解しよう。

##### 適切なオンラインでの行動を見分ける

[identifyAppropriateOnlineBehavior.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (ja):** デジタル上のやり取りでの脅し、嫌がらせ、いじめを見分けよう。

#### プライバシー

Skills: 5

[privacy.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (ja):** インターネットで情報を共有するとプライバシーにどんな影響があるか学ぼう。

##### データを安全に共有する方法を選ぶ

[chooseSafeDataSharingMethods.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (ja):** 機密性の高い情報を誰に、どう安全に渡すか決めよう。

##### 非公開チャットと公開リンクを区別する

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (ja):** 共有した会話や文書を誰が開けるか確認し、リンクだから非公開とは思わないようにしよう。

##### データの再識別を説明する

[explainDataReIdentification.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (ja):** 別々に集めた情報を組み合わせると個人を特定できる理由を説明しよう。

##### 個人データを見分ける

[identifyPersonalData.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (ja):** ほかの情報と組み合わせると個人を特定できる情報も見つけよう。

##### デジタルの足跡を知る

[recognizeADigitalFootprint.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (ja):** ネット上の投稿や行動が長く残る記録になることを理解しよう。

#### コンピューティングの社会・環境への影響

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (ja):** 計算技術が公平さ、資源の利用、環境に及ぼす影響を調べよう。

##### アルゴリズムが利用者集団に与える影響を評価する

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (ja):** 利用者の集団によってアルゴリズムの結果が不公平に異ならないか考えよう。

##### コンピューティングの環境負荷を評価する

[assessComputingsEnvironmentalImpact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (ja):** 計算技術によるエネルギー使用、資源利用、電子廃棄物を比較しよう。

### デジタルシステムとネットワーク

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (ja):** コンピューター機器、デジタル情報、ネットワークがどう連携するか学ぼう。

#### デジタル機器の構成部品

Skills: 3

[digitalDeviceComponents.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (ja):** ハードウェアの部品とソフトウェアが異なる処理をどう担うか学ぼう。

##### ハードウェアとソフトウェアを区別する

[distinguishHardwareFromSoftware.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (ja):** コンピューターの物理的な部品とそれを制御するソフトウェアを見分けよう。

##### プロセッサの役割を説明する

[explainAProcessorsFunction.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (ja):** プロセッサはファイルを恒久的に保存するのではなく命令を実行することを説明しよう。

##### デジタル機器を見分ける

[identifyDigitalDevices.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (ja):** プログラム可能なデジタル情報を処理する機器を見分けよう。

#### メモリとストレージ

Skills: 4

[memoryAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (ja):** 一時的なメモリ、ファームウェア用メモリ、ファイル保存領域の役割を学ぼう。

##### RAM・ROM・ストレージを区別する

[distinguishRAMROMAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (ja):** RAM、ROM、永続的な記憶装置がそれぞれ何を保存するためのものか比べよう。

##### 永続的な保存を説明する

[explainPersistentStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (ja):** 電源を切っても記憶装置にファイルが残る理由を理解しよう。

##### RAMの役割を説明する

[explainRAM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (ja):** コンピューターが動作中にRAMが作業用の情報をどう保持するか学ぼう。

##### ROMの目的を説明する

[explainThePurposeOfROM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (ja):** 電源が切れても情報を保持するファームウェア用メモリが機器の起動をどう助けるか学ぼう。

#### ネットワークモデルとプロトコル

Skills: 11

[networkModelsAndProtocols.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (ja):** ネットワークのプロトコルが情報を送るための規則をどう定めるか学ぼう。

##### ネットワークへのアクセス方式を比較する

[compareNetworkAccessMethods.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (ja):** 衝突検出、衝突回避、トークン受け渡しを、それぞれの利用環境に即して比較しよう。

##### HTTP と HTTPS を区別する

[distinguishHTTPFromHTTPS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (ja):** HTTPS が何を保護し、なぜウェブサイト自体の信頼性を保証しないのか理解しよう。

##### OSI と TCP/IP を区別する

[distinguishOSIFromTCPIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (ja):** 概念的な OSI の階層とインターネットの TCP/IP プロトコル群を比較しよう。

##### TCP と UDP を区別する

[distinguishTCPFromUDP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (ja):** 信頼性を確保する TCP のデータストリームと、同じ保証を持たない UDP のメッセージを比較しよう。

##### ネットワークプロトコルを説明する

[explainANetworkProtocol.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (ja):** 機器がメッセージをやり取りするために、共通の規則が必要な理由を説明しよう。

##### CSMA/CA を説明する

[explainCSMACA.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (ja):** 無線機器が使用中のチャネルで送信しないようにする仕組みを説明しよう。

##### CSMA/CD を説明する

[explainCSMACD.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (ja):** 昔の共有型イーサネットで衝突検出が必要だった理由を学ぼう。

##### DNS を説明する

[explainDNS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (ja):** DNS がドメイン名からネットワーク上のアドレスを見つける仕組みを説明しよう。

##### OSI の各階層を説明する

[explainTheOSILayers.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (ja):** OSI の七階層モデルを使ってネットワーク機能を整理しよう。

##### IP の役割を説明する

[explainThePurposeOfIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (ja):** IP がネットワークを越えてパケットの宛先を指定し、転送する仕組みを理解しよう。

##### トークンリングを説明する

[explainTokenRing.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (ja):** トークンを渡すことで、どの機器がデータを送信できるかを制御する方法を学ぼう。

#### ネットワーク

Skills: 4

[networks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (ja):** つながった機器がどのようにメッセージを送り、資源を共有するか学ぼう。

##### インターネットとウェブを区別する

[distinguishTheInternetFromTheWeb.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (ja):** インターネットの通信網とその上で利用するウェブサイトを区別しよう。

##### ネットワークでのメッセージ配送を説明する

[explainNetworkMessageDelivery.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (ja):** メッセージがネットワーク機器を経由して宛先に届く流れを追おう。

##### コンピューターネットワークの目的を説明する

[explainThePurposeOfAComputerNetwork.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (ja):** 情報をやり取りするためにネットワークが別々の機器をつなぐ理由を説明しよう。

##### 無線通信を説明する

[explainWirelessCommunication.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (ja):** 無線機器が直接ケーブルでつながずに信号で通信する方法を学ぼう。

#### 記数法

Skills: 4

[numeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (ja):** 底の異なる記数法で数字がどのように数を表すか学ぼう。

##### 二進数と十進数を相互変換する

[convertBetweenBinaryAndDecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (ja):** 小さな数を二進数と十進数の間で変換しよう。

##### 二進数と十六進数を区別する

[distinguishBinaryAndHexadecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (ja):** 十六進数を使うとビットのまとまりを短く書ける理由を理解しよう。

##### コンピューターの二進論理を説明する

[explainComputerBinaryLogic.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (ja):** 二進数の0と1を区別できる電子信号の状態と結びつけよう。

##### 位取り記数法を説明する

[explainPositionalNumeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (ja):** 数字の位置によって数の中での値が変わる理由を理解しよう。

#### オペレーティングシステム

Skills: 4

[operatingSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (ja):** OSがプログラム、ファイル、機器をどう管理するか学ぼう。

##### OSの系統を区別する

[distinguishOperatingSystemFamilies.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (ja):** 一般的なOSの種類とその違いを見分けよう。

##### OS のプロセスを説明する

[explainAnOSProcess.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (ja):** 実行中のプロセスとディスクに保存されたプログラムファイルを区別しよう。

##### OSの目的を説明する

[explainAnOperatingSystemsPurpose.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (ja):** OSがソフトウェアとハードウェアをどう連携させるか理解しよう。

##### Linux におけるリーナス・トーバルズの役割を説明する

[explainLinusTorvaldsRoleInLinux.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (ja):** Linux カーネルの始まりと、多くの貢献者がオペレーティングシステムを作る理由を学ぼう。

#### 情報の表現と保存

Skills: 4

[representationAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (ja):** 機器が情報をどう表し、保存したファイルをどう整理するか学ぼう。

##### デジタルファイルの大きさを比較する

[compareDigitalFileSizes.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (ja):** ファイルサイズを比べ、形式と圧縮方法による違いを説明しよう。

##### デジタル形式を区別する

[distinguishDigitalFormats.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (ja):** ファイル形式によって保存されたビットの解釈が決まることを理解しよう。

##### 二進表現を説明する

[explainBinaryRepresentation.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (ja):** 0と1の並びがさまざまな種類のデータをどう符号化するか理解しよう。

##### ディレクトリにファイルを整理する

[organizeFilesInDirectories.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (ja):** パスから見つけやすいようにファイルをフォルダーに整理しよう。

#### タスクの実行

Skills: 3

[taskExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (ja):** 複数のタスクが交互に進むことと本当に同時に実行されることの違いを学ぼう。

##### 独立したタスクを実行単位に割り当てる

[distributeIndependentTasksAcrossExecutors.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (ja):** 同時に実行できるタスクと、ほかの結果を待つ必要があるタスクを計画しよう。

##### 並行実行を説明する

[explainConcurrentExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (ja):** 複数のタスクが厳密に同時に動かなくても進行できる仕組みを理解しよう。

##### 並列実行を説明する

[explainParallelExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (ja):** 複数のプロセッサが本当に同時に処理を行っている場合を見分けよう。

### Gitとオープンソース

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (ja):** 開発者が変更を記録し、協力し、明確な許可の下でソフトウェアを共有する方法を学びましょう。

#### デジタル製品の共同開発

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (ja):** チームが貢献、レビュー、プロジェクトのバージョンを管理する方法を学びましょう。

##### 共有デジタルプロジェクトの変更を調整する

[coordinateChangesInASharedDigitalProject.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (ja):** 誰が何を変更し、共同編集をどう統合するか計画しましょう。

##### 貢献ガイドラインを説明する

[explainContributionGuidelines.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (ja):** 貢献ルールが同じコードベースでの共同作業に役立つ理由を理解しましょう。

##### デジタル製品のバージョンを追跡する

[trackDigitalProductVersions.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (ja):** バージョン履歴で変更時期を調べたり、以前の状態に戻したりしましょう。

#### Gitによるバージョン管理

Skills: 6

[gitVersionControl.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (ja):** Gitがバージョンを記録し、変更の統合を助ける仕組みを学びましょう。

##### ローカルとリモートのリポジトリを区別する

[distinguishLocalAndRemoteRepositories.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (ja):** 自分のパソコンの作業とリモートで共有するコピーを区別しましょう。

##### ブランチを説明する

[explainABranch.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (ja):** ブランチによって別々の変更を並行して進められる仕組みを理解しましょう。

##### コミットを説明する

[explainACommit.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (ja):** コミットは識別子を持ち、以前の履歴につながるスナップショットだと理解しましょう。

##### プルリクエストを説明する

[explainAPullRequest.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (ja):** プルリクエストが変更案をレビューのためにまとめる仕組みを学びましょう。

##### リポジトリを説明する

[explainARepository.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (ja):** リポジトリは変更履歴を含むプロジェクトだと理解しましょう。

##### ブランチのマージを説明する

[explainBranchMerging.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (ja):** ブランチをマージする方法と競合の解決が必要になる理由を学びましょう。

#### オープンソース

Skills: 2

[openSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (ja):** ソフトウェアを本当のオープンソースにするライセンス上の許可を学びましょう。

##### オープンソースと公開されているだけのコードを区別する

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (ja):** ソースコードを閲覧できても自動的にオープンソースにはならないと理解しましょう。

##### オープンソースを説明する

[explainOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (ja):** オープンソースライセンスが使用・変更・再配布を認める仕組みを理解しましょう。

### プログラミングの歴史

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (ja):** プログラミングの考え方と計算機が歴史の中でどう発展したか学びましょう。

#### 主な貢献

Skills: 6

[keyContributions.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (ja):** プログラミング、ソフトウェアの信頼性、ネットワークへの主な貢献を学びましょう。

##### 計算可能性理論を説明する

[explainComputabilityTheory.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (ja):** 形式モデルからコンピュータで計算できることとできないことを学びましょう。

##### 初期の電子計算機プログラミングを説明する

[explainEarlyElectronicProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (ja):** 初期の電子計算機チームがプログラムを作成・検証した方法を学びましょう。

##### コンパイラの発展を説明する

[explainTheDevelopmentOfCompilers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (ja):** コンパイラによって読みやすい言語でプログラムを書きやすくなった仕組みを学びましょう。

##### ソフトウェアの信頼性向上の歴史を説明する

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (ja):** アポロ計画でエラー処理と信頼性の高いソフトウェアが重要だった理由を学びましょう。

##### ネットワークループの解消を説明する

[explainTheEliminationOfNetworkLoops.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (ja):** スパニングツリープロトコルがLAN内のループを防ぐ仕組みを学びましょう。

##### プログラミングの起源を説明する

[explainTheOriginsOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (ja):** 初期の機械設計とエイダ・ラブレスの仕事がプログラミングを先取りした過程を学びましょう。

#### 計算機と暗号解読

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (ja):** 機械と数学的手法が歴史上の暗号解読をどう支えたか学びましょう。

##### 歴史的な暗号解読法を説明する

[explainHistoricalCryptanalysisMethods.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (ja):** 暗号解読者がパターンと体系的な検証を使って暗号を解読した方法を学びましょう。

##### プログラム可能なコンピュータの発展を説明する

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (ja):** 機械式計算の考え方からプログラム可能な電子計算機への発展をたどりましょう。

##### ボンブの目的を説明する

[explainThePurposeOfTheBombe.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (ja):** ボンブがエニグマの設定候補を検証するのに役立った仕組みを学びましょう。

### 情報とデータ

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../content/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (ja):** 信頼できる情報を探し、データを整理し、不確実性について考えよう。

#### データの収集と整理

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (ja):** 関連する情報を集め、比較できる記録を整理する方法を学ぼう。

##### 一貫した方法でデータを集める

[collectDataConsistently.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (ja):** 同じ規則と単位を使って測定値を集めよう。

##### 属性によってデータをグループ化する

[groupDataByAttribute.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (ja):** 一つの明確な特徴を使って記録を分類しよう。

##### 課題に必要なデータを特定する

[identifyDataNeededForATask.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (ja):** 問いに本当に必要な項目と観察結果を決めよう。

##### データを表で示す

[presentDataInATable.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (ja):** 行と列に見出しを付け、値の形式をそろえた表を作ろう。

#### データベース

Skills: 5

[databases.data.ts](../../../content/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (ja):** データベースが記録を構造化し、関連情報をつなぐ方法を学ぼう。

##### 簡単なデータベーススキーマを設計する

[designASimpleDatabaseSchema.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (ja):** 適切なエンティティ、フィールド、関連を持つデータベースを計画しよう。

##### レコードとフィールドを区別する

[distinguishRecordsAndFields.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (ja):** レコードと、それを記述するフィールドを区別しよう。

##### データベースの表を説明する

[explainADatabaseTable.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (ja):** 表が同じ種類のレコードをどのように保存するか理解しよう。

##### 主キーを説明する

[explainPrimaryKeys.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (ja):** 各レコードに安定した一意のキーが必要な理由を説明しよう。

##### 表どうしの関係をモデル化する

[modelRelationshipsBetweenTables.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (ja):** 識別子を使って別の表の情報を結びつけよう。

#### 情報の検索と検証

Skills: 4

[informationSearchAndVerification.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (ja):** 証拠を探して、主張が裏付けられているか確認する方法を学ぼう。

##### 情報源を比較する

[compareInformationSources.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (ja):** 複数の情報源を比較し、説明が食い違う部分を見つけよう。

##### メッセージとデータを区別する

[distinguishMessagesFromData.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (ja):** 記録された値と、メッセージが与える意味を区別しよう。

##### 情報検索のクエリを作る

[formulateAnInformationQuery.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (ja):** 見つけたい情報に合った具体的な検索語を選ぼう。

##### 情報源で主張を検証する

[verifyAClaimAgainstASource.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (ja):** 繰り返された主張ではなく、適切な証拠に照らして確かめよう。

#### 確率と不確実性

Skills: 7

[probabilityAndUncertainty.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (ja):** 起こりうる出来事、その確率、予測の限界について考えよう。

##### 簡単な出来事の確率を比較する

[compareProbabilitiesOfSimpleEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (ja):** 同じ前提の下で二つの結果の起こりやすさを比べよう。

##### 可能性と確率を区別する

[distinguishPossibilityFromProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (ja):** 出来事が起こりうることと、起こりやすいことは違うと理解しよう。

##### ランダムな出来事と決定論的な出来事を区別する

[distinguishRandomAndDeterministicEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (ja):** 規則で決まる結果と無作為に選ばれる結果を見分けよう。

##### 出来事が起こりうるか説明する

[explainEventPossibility.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (ja):** 与えられた条件でその結果が起こりうるか判断しよう。

##### 出来事の確率を説明する

[explainEventProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (ja):** 明示された確率モデルを使って出来事の起こりやすさを見積もろう。

##### 予測の限界を説明する

[explainLimitsOfPrediction.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (ja):** 確率がわかっても一回の試行結果を予言できない理由を説明しよう。

##### モデルでランダム性を使う

[useRandomnessInAModel.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (ja):** 起こりうる結果を定めたうえで、モデルに無作為な選択を加えよう。

#### 統計的な調査

Skills: 4

[statisticalInvestigation.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (ja):** グラフ、頻度、比較を使ってデータを調べる方法を学ぼう。

##### 観察結果の集合を比較する

[compareSetsOfObservations.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (ja):** 同じ尺度や分類を使って二つのデータ集合を比較しよう。

##### 簡単なグラフを作る

[constructASimpleChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (ja):** データの割合を正確に示すわかりやすいグラフを作ろう。

##### 最頻値を見つける

[findTheMostFrequentValue.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (ja):** 一組の値の中で最も多く現れる値を見つけよう。

##### グラフを読み取る

[readAChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (ja):** 表示方法に惑わされず、目盛り、ラベル、値を正しく読もう。

### プログラミング

Groups: 8 · Skills: 37

[programming.data.ts](../../../content/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (ja):** コンピューターが実行する命令を理解し、書き、テストする方法を学ぼう。

#### データ型と参照

Skills: 6

[dataTypesAndReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (ja):** 型や参照がプログラムで扱える値にどう影響するか学ぼう。

##### 値のコピーと参照の共有を区別する

[distinguishValueCopyingFromSharedReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (ja):** 二つの変数が同じオブジェクトを共有する場合と、値が独立している場合を説明しよう。

##### 値の型を区別する

[distinguishValueTypes.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (ja):** 値が数値、文字列、真偽値のどれかを見分け、できる操作を考えよう。

##### データ型の契約を説明する

[explainADataTypeContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (ja):** プログラムの関数がどんな種類の値を受け取る想定なのか理解しよう。

##### 複合データ構造を説明する

[explainCompositeDataStructures.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (ja):** 複数の値をまとめるリスト、配列、レコードを見分けよう。

##### 言語のプリミティブ値を説明する

[explainPrimitiveValuesInALanguage.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (ja):** 選んだプログラミング言語で定義されている基本的な値の型を見つけよう。

##### 契約に従ってデータを検証する

[validateDataAgainstAContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (ja):** 入力を使う前に、必要な型や構造に合うか確かめよう。

#### 関数と再利用

Skills: 5

[functionsAndReuse.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (ja):** 繰り返し使える処理を関数としてまとめる方法を学ぼう。

##### 引数を指定して関数を呼び出す

[callAFunctionWithArguments.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (ja):** 引数を渡して関数を呼び出し、どう使われるか確認しよう。

##### 引数を受け取る関数を定義する

[defineAFunctionWithParameters.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (ja):** 固定された例の値ではなくパラメーターを受け取る関数を書こう。

##### 再帰を説明する

[explainRecursion.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (ja):** 再帰関数が小さな問題を解きながら最終的に停止する仕組みを理解しよう。

##### 関数の目的を説明する

[explainThePurposeOfAFunction.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (ja):** 名前を持つ関数が呼び出されるとどのように処理を行うか説明しよう。

##### 関数の戻り値を使う

[useAFunctionsReturnValue.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (ja):** 返された結果を表示するだけでなく、次の計算に使おう。

#### プログラムのデータ

Skills: 3

[programData.data.ts](../../../content/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (ja):** 実行中のプログラムが使う値や変化する状態を扱おう。

##### プログラムの状態を更新する

[updateProgramState.data.ts](../../../content/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (ja):** それまでの動作に応じて保存された状態を変えよう。

##### 変数を使う

[useAVariable.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (ja):** 変数名を使って値を保存し、必要なときに読み出そう。

##### 入力データを使う

[useInputData.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (ja):** 外部から入力した情報でプログラムの動作を決めよう。

#### プログラムの構造と構文

Skills: 4

[programStructureAndSyntax.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (ja):** プログラミング言語でキーワード、式、ブロックがどう構成されるか学ぼう。

##### キーワードと識別子を区別する

[distinguishKeywordsFromIdentifiers.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (ja):** 言語で決められた予約語とプログラマーが付ける名前を見分けよう。

##### 演算子、式、文を区別する

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (ja):** 演算子、式、文の違いを見分けよう。

##### 文のブロック境界を説明する

[explainStatementBlockBoundaries.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (ja):** どの命令がループ、関数、条件分岐のブロックに入るか見つけよう。

##### シンタックスハイライトを説明する

[explainSyntaxHighlighting.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (ja):** コードの色分けで何が分かり、何は証明できないか理解しよう。

#### プログラムの制御構造

Skills: 7

[programmingConstructs.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (ja):** 順序、条件分岐、繰り返し、イベントを使ってプログラムを制御しよう。

##### 無限ループを見つける

[detectAnInfiniteLoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (ja):** 条件がいつまでも偽にならず終了しないループを見つけよう。

##### イベントを処理する

[handleAnEvent.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (ja):** ボタン操作やメッセージなどのイベントにプログラムが反応するようにしよう。

##### ループを実装する

[implementALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (ja):** 適切な終了条件になるまで命令を繰り返すループを使おう。

##### 条件に応じた処理を実装する

[implementConditionalBehavior.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (ja):** 条件が変わるとプログラムが別の動作を選ぶようにしよう。

##### ループ中に変わらない計算を外へ移す

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (ja):** 繰り返しても結果が変わらない計算はループの外に移そう。

##### 重なる条件判定の順序を決める

[orderOverlappingConditionalChecks.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (ja):** 特定の場合も正しく判定できるように条件の順番を並べよう。

##### 命令の並びを書く

[writeASequenceOfCommands.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (ja):** 操作が意図した順序で行われるよう正しい命令を書こう。

#### プログラミングパラダイム

Skills: 4

[programmingParadigms.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (ja):** プログラムの論理や動作を整理するさまざまな方法を学ぼう。

##### 命令型と宣言型の方法を区別する

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (ja):** 具体的な手順を指示する方法と目的の結果を述べる方法を比べよう。

##### 関数型プログラミングを説明する

[explainFunctionalProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (ja):** 関数を組み合わせて値を変換するプログラムの仕組みを理解しよう。

##### オブジェクト指向プログラミングを説明する

[explainObjectOrientedProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (ja):** 状態と動作を持つオブジェクト同士が連携するプログラムを学ぼう。

##### 手続き型プログラミングを説明する

[explainProceduralProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (ja):** 段階的な手順を中心に組み立てられたプログラムを学ぼう。

#### プログラムを読む

Skills: 4

[readingPrograms.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (ja):** プログラムを読み、何をしているか追いかける方法を学ぼう。

##### 命令の目的を説明する

[explainACommandsPurpose.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (ja):** 一つのプログラム命令が状態をどう変えるか説明しよう。

##### 実行順序の影響を予測する

[predictConsequencesOfExecutionOrder.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (ja):** 命令の順番を変えると結果が変わる理由を説明しよう。

##### プログラムの出力を予測する

[predictProgramOutput.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (ja):** 与えられた入力でプログラムがどんな結果を表示するか考えよう。

##### プログラムの状態を追跡する

[traceProgramState.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (ja):** 実行中に変数や他の値がどう変わるか追いかけよう。

#### テストとデバッグ

Skills: 4

[testingAndDebugging.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (ja):** プログラムの誤りを見つけ、原因を説明し、修正する方法を学ぼう。

##### プログラムの誤った動作を見つける

[detectIncorrectProgramBehavior.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (ja):** プログラムの動作が要件と違う場合を見分けよう。

##### プログラムの不具合を修正する

[fixAProgramDefect.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (ja):** 特定の不具合を直し、必要な動作が引き続き正しく働くか確かめよう。

##### エラーの原因を見つける

[locateTheCauseOfAnError.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (ja):** エラーの元となる命令や条件をたどって見つけよう。

##### さまざまな入力でプログラムをテストする

[testAProgramWithDifferentInputs.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (ja):** 境界の値も含め、異なる入力でプログラムを試そう。

### ロボット工学と自動化

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (ja):** センサー、プログラム、アクチュエーターによってロボットが周囲に反応する仕組みを探ろう。

#### ロボットの制御

Skills: 4

[robotControl.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (ja):** ロボットの動きや反応を決める指示を作り、改善しよう。

##### ロボットの繰り返し動作を設定する

[configureARepeatedRobotAction.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (ja):** ロボットが動作を何回繰り返すか、またはいつ止まるか決めよう。

##### ロボットの移動手順を作る

[createARobotMovementSequence.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (ja):** ロボットを目的地まで動かす指示を順番に考えよう。

##### ロボットの動作をデバッグする

[debugRobotBehavior.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (ja):** 予想外の動作がセンサー、判断の仕組み、実行部分のどこに原因があるか調べよう。

##### ロボットの障害物への反応を実装する

[implementRobotObstacleResponse.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (ja):** センサーが障害物を見つけたら、ロボットが止まる、曲がる、避けるようにしよう。

#### ロボットシステムの構成要素

Skills: 4

[roboticSystemComponents.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (ja):** ロボットが状況を検知し、判断して動作する仕組みを学ぼう。

##### ロボットの制御装置を見分ける

[identifyARobotController.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (ja):** センサーの入力をプログラムされた動作に変える装置を見つけよう。

##### センサーの役割を見分ける

[identifyASensorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (ja):** 光、距離、温度などを測るセンサーを見分けよう。

##### アクチュエーターの役割を見分ける

[identifyAnActuatorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (ja):** モーターやランプなどの装置が命令を実行する仕組みを説明しよう。

##### センサーと動作の関係をモデル化する

[modelTheSensorToActionRelationship.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (ja):** センサーの測定値、判断規則、アクチュエーターの反応を結びつけよう。

### ソフトウェアアーキテクチャ

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../content/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (ja):** オブジェクト、責務、依存関係が信頼できるソフトウェアをどう構成するか探ろう。

#### 設計原則

Skills: 8

[designPrinciples.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (ja):** 理解しやすく変更に対応できるソフトウェアを保つ原則を学ぼう。

##### 不必要な機能を先送りする（YAGNI）

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (ja):** 想像上の将来のためだけの機能を作らないようにしよう。

##### 契約に依存する設計にする（DIP）

[designDependenciesOnContractsDIP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (ja):** 具体的なサービスではなく契約に依存し、業務ロジックを分離しよう。

##### 中核を変更せずに振る舞いを拡張する（OCP）

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (ja):** 安定した中核ロジックを書き換えずに新しい振る舞いを追加できる拡張点を設計しよう。

##### 不必要な重複を見つける（DRY）

[identifyUnnecessaryDuplicationDRY.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (ja):** 将来の変更で不整合を起こしそうな重複ルールを探そう。

##### 単一責任を分離する（SRP）

[isolateASingleResponsibilitySRP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (ja):** 一つの一貫した変更理由を持つようにモジュールを構成しよう。

##### 不必要な複雑さを減らす（KISS）

[reduceUnnecessaryComplexityKISS.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (ja):** 要件で正当化されない仕組みを取り除き、ソフトウェアを簡単にしよう。

##### 小さなインターフェースに分ける（ISP）

[separateNarrowInterfacesISP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (ja):** 利用側が必要な操作だけに依存するようインターフェースを小さくしよう。

##### 置換可能性を検証する（LSP）

[verifySubstitutabilityLSP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (ja):** 実装が共通契約の約束を守っているか確かめよう。

#### オブジェクトモデル

Skills: 13

[objectModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (ja):** ソフトウェアのオブジェクトが状態と振る舞いをどう組み合わせるか学ぼう。

##### オブジェクトの抽象化を適用する

[applyObjectAbstraction.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (ja):** 部品が利用者に公開すべき必要な操作を選ぼう。

##### クラスとオブジェクトを区別する

[distinguishAClassFromAnObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (ja):** クラスという設計図と、それぞれ固有の現在値を持つオブジェクトを区別しよう。

##### 実物とその抽象モデルを区別する

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (ja):** ソフトウェアモデルは対象の一部の特徴だけを表すと理解しよう。

##### オブジェクトのメソッドを説明する

[explainAnObjectMethod.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (ja):** メソッドの呼び出しがオブジェクトの状態を読み取ったり変更したりできることを説明しよう。

##### オブジェクトのプロパティを説明する

[explainAnObjectProperty.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (ja):** 保存されたプロパティと実行できる操作を区別しよう。

##### カプセル化を説明する

[explainEncapsulation.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (ja):** オブジェクトが制御されたメソッドによって内部状態を守る方法を理解しよう。

##### 継承を説明する

[explainInheritance.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (ja):** 特化したクラスが一般的なクラスの振る舞いを引き継ぐ方法を説明しよう。

##### ポリモーフィズムを説明する

[explainPolymorphism.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (ja):** 異なるオブジェクトが同じ操作を別々の方法で実現できることを理解しよう。

##### クラスの概念を説明する

[explainTheConceptOfAClass.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (ja):** クラスを個別のオブジェクトを生成するための定義として理解しよう。

##### ソフトウェアオブジェクトの構造を説明する

[explainTheStructureOfASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (ja):** 既存のオブジェクトの識別情報、プロパティ、メソッドを見つけよう。

##### オブジェクトの状態と振る舞いを特定する

[identifyAnObjectsStateAndBehavior.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (ja):** オブジェクトの特徴と、実行できる操作を説明しよう。

##### ドメインの実体をソフトウェアオブジェクトとしてモデル化する

[modelADomainEntityAsASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (ja):** 適切なプロパティと操作を選び、役立つオブジェクトを設計しよう。

##### オブジェクトの合成をモデル化する

[modelObjectComposition.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (ja):** 異なる役割を持つ小さな部品を組み合わせて大きなオブジェクトを作ろう。

