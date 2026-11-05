<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (de)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 15

Groups: 65

Skills: 311

## DOMAINS

### Algorithmen

Groups: 5 · Skills: 23

[algorithms.data.ts](../../../content/informatics/data/skills/algorithms/algorithms.data.ts)

**Methodological description (English):** Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.

**User-friendly description (de):** Erkunde, wie du wiederholbare Lösungsverfahren entwirfst, anwendest und vergleichst.

#### Analyse

Skills: 3

[analysis.data.ts](../../../content/informatics/data/skills/algorithms/analysis/analysis.data.ts)

**Methodological description (English):** Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.

**User-friendly description (de):** Erkunde, wie sich Zeit- und Speicherbedarf eines Algorithmus mit seiner Eingabe ändern.

##### Lineares und logarithmisches Wachstum unterscheiden

[distinguishLinearAndLogarithmicGrowth.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

**Methodological description (English):** Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.

**User-friendly description (de):** Vergleiche Wachstum proportional zur Eingabegröße mit Wachstum durch wiederholtes Halbieren.

##### Den schlechtesten Fall eines Algorithmus abschätzen

[estimateAnAlgorithmsWorstCase.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

**Methodological description (English):** Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.

**User-friendly description (de):** Schätze die maximale Zahl von Prüfungen ab, die ein Algorithmus im ungünstigsten Fall benötigt.

##### Zielkonflikte zwischen Zeit und Speicher erklären

[explainTimeMemoryTradeOffs.data.ts](../../../content/informatics/data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

**Methodological description (English):** Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.

**User-friendly description (de):** Verstehe, warum schnellere Algorithmen mehr temporären Speicher benötigen können.

#### Verarbeitung von Sammlungen

Skills: 4

[collectionProcessing.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

**Methodological description (English):** Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.

**User-friendly description (de):** Lerne beim Durchlaufen von Daten zu zählen, zu summieren und Extremwerte zu finden.

##### Elemente zählen

[applyElementCounting.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

**Methodological description (English):** Traverse a collection, incrementing a counter for every item that meets the given condition.

**User-friendly description (de):** Zähle alle Elemente einer Sammlung, die eine festgelegte Bedingung erfüllen.

##### Den Maximalwert finden

[applyMaximumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

**Methodological description (English):** Maintain the largest value seen so far and update it when a larger number appears.

**User-friendly description (de):** Merke dir beim Durchlaufen einer Sammlung den bisher größten Wert.

##### Den Minimalwert finden

[applyMinimumFinding.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

**Methodological description (English):** Maintain the smallest value seen so far and update it when a smaller number appears.

**User-friendly description (de):** Merke dir beim Durchlaufen einer Sammlung den bisher kleinsten Wert.

##### Eine laufende Summe bilden

[applySumAccumulation.data.ts](../../../content/informatics/data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

**Methodological description (English):** Traverse a numeric collection, adding each value to an accumulator initialized to zero.

**User-friendly description (de):** Addiere die Werte einer Sammlung schrittweise zu einer laufenden Summe.

#### Konstruktion

Skills: 6

[construction.data.ts](../../../content/informatics/data/skills/algorithms/construction/construction.data.ts)

**Methodological description (English):** General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.

**User-friendly description (de):** Lerne Aktionen, Bedingungen und Abbruchregeln eines Algorithmus festzulegen.

##### Algorithmen anhand von Anforderungen vergleichen

[compareAlgorithmsAgainstRequirements.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

**Methodological description (English):** Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.

**User-friendly description (de):** Vergleiche mögliche Algorithmen nach ihren Voraussetzungen und Grenzen.

##### Einen sequenziellen Algorithmus entwerfen

[constructASequentialAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

**Methodological description (English):** Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.

**User-friendly description (de):** Beschreibe eine endliche Folge von Schritten in der richtigen Reihenfolge.

##### Das Ziel eines Algorithmus festlegen

[defineAnAlgorithmsGoal.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

**Methodological description (English):** Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.

**User-friendly description (de):** Gib an, was der Algorithmus erreichen soll und welche Eingaben er akzeptiert.

##### Bedingte Verzweigungen entwerfen

[designConditionalBranching.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

**Methodological description (English):** Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.

**User-friendly description (de):** Plane verschiedene Abläufe anhand eindeutiger, prüfbarer Bedingungen.

##### Wiederholungen entwerfen

[designRepetition.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/designRepetition.data.ts)

**Methodological description (English):** Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.

**User-friendly description (de):** Entwirf einen wiederholten Ablauf mit passenden Aktualisierungen und Abbruchbedingung.

##### Einen rekursiven Algorithmus umsetzen

[implementARecursiveAlgorithm.data.ts](../../../content/informatics/data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

**Methodological description (English):** Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.

**User-friendly description (de):** Entwickle einen rekursiven Algorithmus mit kleineren Teilproblemen und einem beendenden Basisfall.

#### Suche

Skills: 6

[search.data.ts](../../../content/informatics/data/skills/algorithms/search/search.data.ts)

**Methodological description (English):** Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.

**User-friendly description (de):** Entdecke, wie verschiedene Suchverfahren ein Element in einer Sammlung finden.

##### Binäre Suche anwenden

[applyBinarySearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

**Methodological description (English):** Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.

**User-friendly description (de):** Finde einen Wert in sortierten Daten, indem du den Suchbereich wiederholt halbierst.

##### In einem binären Suchbaum suchen

[applyBinaryTreeSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

**Methodological description (English):** Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.

**User-friendly description (de):** Folge den geordneten Zweigen eines binären Suchbaums, um einen Schlüssel zu finden.

##### Lineare Suche anwenden

[applyLinearSearch.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

**Methodological description (English):** Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.

**User-friendly description (de):** Finde ein gesuchtes Element, indem du die Elemente nacheinander prüfst.

##### Suchmethoden anhand der Prüfanzahl vergleichen

[compareSearchMethodsByCheckCount.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

**Methodological description (English):** Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.

**User-friendly description (de):** Vergleiche die Zahl der Prüfungen bei linearer und binärer Suche.

##### Voraussetzungen der binären Suche erkennen

[identifyBinarySearchPrerequisites.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

**Methodological description (English):** Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.

**User-friendly description (de):** Prüfe, ob die Daten die Sortieranforderungen der binären Suche erfüllen.

##### Skalierung der Suche vorhersagen

[predictSearchScaling.data.ts](../../../content/informatics/data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

**Methodological description (English):** Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.

**User-friendly description (de):** Verstehe, warum eine Verdoppelung der Datenmenge bei binärer Suche etwa eine Prüfung mehr erfordert.

#### Sortieren

Skills: 4

[sorting.data.ts](../../../content/informatics/data/skills/algorithms/sorting/sorting.data.ts)

**Methodological description (English):** Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.

**User-friendly description (de):** Lerne, wie Sortierverfahren Werte in eine gewünschte Reihenfolge bringen.

##### Bubble Sort anwenden

[applyBubbleSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

**Methodological description (English):** Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.

**User-friendly description (de):** Sortiere, indem du benachbarte Werte in falscher Reihenfolge vertauschst.

##### Insertion Sort anwenden

[applyInsertionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

**Methodological description (English):** Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.

**User-friendly description (de):** Sortiere, indem du jedes neue Element in den bereits geordneten Teil einfügst.

##### Selection Sort anwenden

[applySelectionSort.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

**Methodological description (English):** On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.

**User-friendly description (de):** Sortiere, indem du wiederholt das kleinste verbleibende Element auswählst.

##### Ein Sortierkriterium erklären

[explainASortingCriterion.data.ts](../../../content/informatics/data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

**Methodological description (English):** Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.

**User-friendly description (de):** Wähle den Wert oder die Eigenschaft, nach der eine Sammlung sortiert wird.

### Künstliche Intelligenz

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../../content/informatics/data/skills/artificialIntelligence/artificialIntelligence.data.ts)

**Methodological description (English):** Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.

**User-friendly description (de):** Erkunde, wie KI-Systeme lernen, Vorhersagen treffen, Inhalte erzeugen und manchmal scheitern.

#### Grundlagen der künstlichen Intelligenz

Skills: 6

[aIFundamentals.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

**Methodological description (English):** Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.

**User-friendly description (de):** Erkunde die Unterschiede zwischen programmierten Regeln, trainierten Modellen und KI-Aufgaben.

##### KI-Aufgaben einordnen

[classifyAITasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

**Methodological description (English):** Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.

**User-friendly description (de):** Erkenne, ob eine KI-Aufgabe etwas klassifiziert, vorhersagt oder Inhalte erzeugt.

##### Regeln und trainierte Modelle unterscheiden

[distinguishRulesFromTrainedModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

**Methodological description (English):** Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.

**User-friendly description (de):** Unterscheide ausdrücklich programmierte Entscheidungsregeln von Systemen, die anhand von Daten trainiert wurden.

##### Generative KI erklären

[explainGenerativeAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

**Methodological description (English):** Describe how models create new text, images, or other content based on input context and patterns learned during training.

**User-friendly description (de):** Verstehe, wie generative Modelle Texte, Bilder und andere Inhalte erzeugen.

##### Lernen anhand von Beispielen erklären

[explainLearningFromExamples.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

**Methodological description (English):** Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.

**User-friendly description (de):** Erkläre, wie Beispiele die Leistung eines Modells bei neuen Eingaben verbessern helfen.

##### Prädiktive KI erklären

[explainPredictiveAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

**Methodological description (English):** Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.

**User-friendly description (de):** Erkunde, wie Vorhersagesysteme Werte, Kategorien und Eintrittswahrscheinlichkeiten schätzen.

##### Mögliche KI-Fehler erkennen

[identifyAPotentialAIError.data.ts](../../../content/informatics/data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

**Methodological description (English):** Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.

**User-friendly description (de):** Erkenne Warnsignale, dass eine KI-Antwort unabhängig überprüft werden muss.

#### Nachahmung und Verstehen

Skills: 2

[imitationAndUnderstanding.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

**Methodological description (English):** Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.

**User-friendly description (de):** Untersuche den Unterschied zwischen überzeugender Nachahmung und echtem Verstehen.

##### Searles chinesisches Zimmer erklären

[explainSearlesChineseRoom.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

**Methodological description (English):** Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.

**User-friendly description (de):** Erkunde das Gedankenexperiment des chinesischen Zimmers und die Debatte darüber.

##### Den Turing-Test erklären

[explainTheTuringTest.data.ts](../../../content/informatics/data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

**Methodological description (English):** Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.

**User-friendly description (de):** Verstehe, was der Turing-Test prüft und was er nicht nachweisen kann.

#### Tokens und Kontext von Sprachmodellen

Skills: 6

[languageModelTokensAndContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

**Methodological description (English):** Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.

**User-friendly description (de):** Entdecke, wie Sprachmodelle Texte in Tokens zerlegen und Kontext nutzen.

##### Sampling von der Wahl des wahrscheinlichsten Tokens unterscheiden

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

**Methodological description (English):** Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.

**User-friendly description (de):** Vergleiche die Wahl des wahrscheinlichsten Tokens mit dem Ziehen anderer möglicher Fortsetzungen.

##### Tokens, Zeichen und Wörter unterscheiden

[distinguishTokensCharactersAndWords.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

**Methodological description (English):** Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.

**User-friendly description (de):** Erkenne, warum Zeichen, Wörter und Tokens nicht dasselbe sind.

##### Das Kontextfenster eines Sprachmodells erklären

[explainALanguageModelsContextWindow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

**Methodological description (English):** Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.

**User-friendly description (de):** Verstehe, warum ein Sprachmodell nur eine begrenzte Menge an Kontext nutzen kann.

##### Das Überschreiten des Kontextfensters erklären

[explainContextWindowOverflow.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

**Methodological description (English):** Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.

**User-friendly description (de):** Erkunde, was passieren kann, wenn eine Anfrage das Kontextlimit eines Modells überschreitet.

##### Die Auswahl des nächsten Tokens erklären

[explainNextTokenSelection.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

**Methodological description (English):** A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.

**User-friendly description (de):** Erkläre, wie Sprachmodelle anhand des Kontexts ein mögliches nächstes Token auswählen.

##### Tokens erklären

[explainTokens.data.ts](../../../content/informatics/data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

**Methodological description (English):** Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.

**User-friendly description (de):** Verstehe Tokens als modellspezifische Einheiten zur Darstellung von Text.

#### Modellarchitekturen und Ressourcen

Skills: 5

[modelArchitecturesAndResources.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

**Methodological description (English):** Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.

**User-friendly description (de):** Erkunde, wie verschiedene KI-Modellarchitekturen die Leistung und den Ressourcenbedarf beeinflussen.

##### Ein Modell für eine Aufgabe auswählen

[chooseAModelForATask.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

**Methodological description (English):** Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.

**User-friendly description (de):** Wähle ein Modell nach Aufgabenqualität, Geschwindigkeit, Kosten, Datenschutz und verfügbarem Speicher.

##### Dichte Modelle und Mixture-of-Experts-Modelle vergleichen

[compareDenseAndMoEModels.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

**Methodological description (English):** Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.

**User-friendly description (de):** Vergleiche Modelle mit vielen aktiven Parametern mit Modellen, die ausgewählte Expertenmodule aktivieren.

##### Speicherbedarf von Modellen vergleichen

[compareModelMemoryRequirements.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

**Methodological description (English):** Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.

**User-friendly description (de):** Schätze den Arbeitsspeicher zum Ausführen eines Modells, nicht nur den Speicherplatz seiner Dateien.

##### Antwortlatenzen vergleichen

[compareResponseLatency.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

**Methodological description (English):** Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.

**User-friendly description (de):** Vergleiche die Wartezeit bis zum Beginn einer KI-Antwort getrennt von der weiteren Ausgabegeschwindigkeit.

##### Quantisierung erklären

[explainQuantization.data.ts](../../../content/informatics/data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

**Methodological description (English):** Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.

**User-friendly description (de):** Verstehe, wie geringere numerische Genauigkeit Speicher spart, aber die Qualität verändern kann.

#### Promptgestaltung

Skills: 7

[prompting.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/prompting.data.ts)

**Methodological description (English):** Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.

**User-friendly description (de):** Lerne, KI-Systemen klarere Anweisungen, Hintergründe und Einschränkungen zu geben.

##### Einen komplexen Prompt in Teilaufgaben zerlegen

[breakAComplexPromptIntoSubtasks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

**Methodological description (English):** Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.

**User-friendly description (de):** Teile eine komplizierte Anfrage in kleinere Schritte mit überprüfbaren Ergebnissen.

##### Kontext für einen Prompt liefern

[providePromptContext.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

**Methodological description (English):** Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.

**User-friendly description (de):** Gib relevante Hintergrundinformationen an, damit die KI deine Anfrage versteht.

##### Einen Prompt anhand der Ergebnisse verbessern

[refineAPromptBasedOnResults.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

**Methodological description (English):** Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.

**User-friendly description (de):** Verbessere deine KI-Anfrage, nachdem du geprüft hast, was in der letzten Antwort fehlte.

##### Das Ziel eines Prompts festlegen

[specifyAPromptObjective.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

**Methodological description (English):** Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.

**User-friendly description (de):** Beschreibe genau, welche Aufgabe ein KI-Assistent erledigen soll.

##### Eine Rolle in einem Prompt festlegen

[specifyARoleInAPrompt.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

**Methodological description (English):** State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.

**User-friendly description (de):** Gib eine hilfreiche Perspektive oder einen Stil vor, ohne dies für echte Fachkenntnis zu halten.

##### Ein Ausgabeformat festlegen

[specifyAnOutputFormat.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

**Methodological description (English):** Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.

**User-friendly description (de):** Fordere eine klare Ausgabeform an, etwa eine Tabelle oder festgelegte Felder.

##### Vorgaben für einen Prompt festlegen

[specifyPromptConstraints.data.ts](../../../content/informatics/data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

**Methodological description (English):** Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.

**User-friendly description (de):** Setze Grenzen etwa für Länge, Quellen und Informationen, die nicht erfunden werden dürfen.

#### Zuverlässigkeit und verantwortungsvoller KI-Einsatz

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

**Methodological description (English):** Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.

**User-friendly description (de):** Lerne, KI-Ergebnisse zu überprüfen und ihre Auswirkungen auf Menschen zu bedenken.

##### Menschliche Verantwortung für KI-gestützte Entscheidungen erklären

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

**Methodological description (English):** Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.

**User-friendly description (de):** Verstehe, warum Menschen auch bei KI-gestützten Entscheidungen verantwortlich bleiben.

##### Personenbezogene Daten in Prompts schützen

[protectPersonalDataInPrompts.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

**Methodological description (English):** Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.

**User-friendly description (de):** Entferne unnötige personenbezogene Daten, bevor du eine Anfrage an die KI sendest.

##### Risiken von KI-Verzerrungen erkennen

[recognizeAIBiasRisks.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

**Methodological description (English):** Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.

**User-friendly description (de):** Erkenne, wann KI-Systeme Gruppen oder Einzelpersonen unfair behandeln könnten.

##### Fakten in einer KI-Antwort überprüfen

[verifyFactsInAnAIResponse.data.ts](../../../content/informatics/data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

**Methodological description (English):** Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.

**User-friendly description (de):** Prüfe Tatsachenbehauptungen einer KI-Antwort anhand zuverlässiger unabhängiger Quellen.

#### Sicher mit KI interagieren

Skills: 4

[safeInteractionWithAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

**Methodological description (English):** Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.

**User-friendly description (de):** Erkenne Interaktionsmuster, die KI-Ratschläge irreführend machen oder ungesunde Abhängigkeit fördern können.

##### Risiken übermäßiger KI-Abhängigkeit erklären

[explainRisksOfOverrelianceOnAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

**Methodological description (English):** Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.

**User-friendly description (de):** Verstehe, warum KI weder eigenständiges Denken noch menschliche Unterstützung ersetzen sollte.

##### Nicht vertrauenswürdige Anweisungen in KI-Eingaben erkennen

[identifyUntrustedInstructionsInAIInput.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

**Methodological description (English):** Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.

**User-friendly description (de):** Erkenne versteckte Anweisungen in fremden Inhalten, die einen Assistenten nicht steuern dürfen.

##### Geheimnisse beim Einsatz von KI schützen

[protectSecretsWhenUsingAI.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

**Methodological description (English):** Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.

**User-friendly description (de):** Schütze Passwörter, Zugangsschlüssel und vertrauliche Informationen beim Umgang mit KI.

##### Übertriebene Zustimmung durch KI erkennen

[recognizeAISycophancy.data.ts](../../../content/informatics/data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

**Methodological description (English):** Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.

**User-friendly description (de):** Erkenne Zustimmung oder Lob durch KI, für die es keine Belege gibt.

### Informatisches Denken

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../../content/informatics/data/skills/computationalThinking/computationalThinking.data.ts)

**Methodological description (English):** Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.

**User-friendly description (de):** Erkunde, wie du komplexe Probleme in klare Schritte, Muster und Regeln zerlegst.

#### Zerlegung und Abstraktion

Skills: 4

[decompositionAndAbstraction.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

**Methodological description (English):** Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.

**User-friendly description (de):** Lerne, Probleme zu vereinfachen, indem du ihre wesentlichen Teile und Beziehungen erkennst.

##### Ein abstraktes Systemmodell erstellen

[buildAnAbstractSystemModel.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

**Methodological description (English):** Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.

**User-friendly description (de):** Erstelle eine vereinfachte Darstellung einer komplexen Situation oder eines Systems.

##### Ein Problem zerlegen

[decomposeAProblem.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

**Methodological description (English):** Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.

**User-friendly description (de):** Teile ein großes Problem in kleinere Aufgaben auf, die sich getrennt lösen lassen.

##### Eine wiederkehrende Methode verallgemeinern

[generalizeARepeatedMethod.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

**Methodological description (English):** Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.

**User-friendly description (de):** Finde eine wiederverwendbare Methode, die mehreren konkreten Problemen gemeinsam ist.

##### Wesentliche Eigenschaften eines Objekts erkennen

[identifyEssentialObjectProperties.data.ts](../../../content/informatics/data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

**Methodological description (English):** Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.

**User-friendly description (de):** Wähle die für eine Aufgabe wichtigen Details aus und lasse Unwichtiges weg.

#### Logik und Muster

Skills: 8

[logicAndPatterns.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

**Methodological description (English):** Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.

**User-friendly description (de):** Entdecke, wie Regeln, Muster und logische Bedingungen beim Lösen von Problemen helfen.

##### Logisches UND anwenden

[applyLogicalAND.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

**Methodological description (English):** Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.

**User-friendly description (de):** Prüfe mit UND, ob beide Anforderungen erfüllt sind.

##### Logisches NICHT anwenden

[applyLogicalNOT.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

**Methodological description (English):** Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.

**User-friendly description (de):** Verwende NICHT, um den Wahrheitswert einer Bedingung umzukehren.

##### Logisches ODER anwenden

[applyLogicalOR.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

**Methodological description (English):** Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.

**User-friendly description (de):** Prüfe mit ODER, ob mindestens eine von zwei Anforderungen erfüllt ist.

##### Widersprüchliche Regeln erkennen

[detectContradictoryRules.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

**Methodological description (English):** Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.

**User-friendly description (de):** Erkenne, wann zwei Anforderungen nicht gleichzeitig wahr sein können.

##### Eine einfache Bedingung auswerten

[evaluateASimpleCondition.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

**Methodological description (English):** Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.

**User-friendly description (de):** Entscheide, ob eine einzelne Bedingung wahr, falsch oder noch nicht bestimmbar ist.

##### Zusammengesetzte logische Ausdrücke auswerten

[evaluateCompoundLogicalExpressions.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

**Methodological description (English):** Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.

**User-friendly description (de):** Werte logische Ausdrücke mit mehreren Operatoren in der richtigen Reihenfolge aus.

##### Ein Ergebnis aus einer Regel vorhersagen

[predictAnOutcomeFromARule.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

**Methodological description (English):** Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.

**User-friendly description (de):** Leite ab, was als Nächstes geschieht, wenn Regel und Anfangszustand bekannt sind.

##### Ein Muster erkennen

[recognizeAPattern.data.ts](../../../content/informatics/data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

**Methodological description (English):** Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.

**User-friendly description (de):** Erkenne Muster in Folgen und prüfe, ob eine vorgeschlagene Regel dazu passt.

### Datenstrukturen

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../../content/informatics/data/skills/dataStructures/dataStructures.data.ts)

**Methodological description (English):** Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.

**User-friendly description (de):** Entdecke, wie Sammlungen, Schlüssel, Bäume und Netzwerke Daten für unterschiedliche Operationen organisieren.

#### Wörterbücher

Skills: 3

[dictionaries.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/dictionaries.data.ts)

**Methodological description (English):** Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.

**User-friendly description (de):** Entdecke, wie Wörterbücher eindeutige Schlüssel mit gespeicherten Werten verknüpfen.

##### Die Struktur eines Wörterbuchs erklären

[explainDictionaryStructure.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

**Methodological description (English):** A dictionary maps keys to values; keys need not be numeric or correspond to array positions.

**User-friendly description (de):** Verstehe, wie ein Wörterbuch Informationen anhand eines Schlüssels statt anhand einer Position abruft.

##### Einen Wörterbuchwert anhand des Schlüssels abrufen

[retrieveADictionaryValueByKey.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

**Methodological description (English):** Find an entry using its key and handle the case in which the key does not exist.

**User-friendly description (de):** Finde einen Wörterbuchwert anhand seines Schlüssels und gehe mit fehlenden Schlüsseln um.

##### Einen Wörterbuchwert aktualisieren

[updateADictionaryValue.data.ts](../../../content/informatics/data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

**Methodological description (English):** Replace the value associated with an existing key without accidentally duplicating the key.

**User-friendly description (de):** Ändere den Wert, der unter einem vorhandenen Wörterbuchschlüssel gespeichert ist.

#### Graphen

Skills: 6

[graphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/graphs.data.ts)

**Methodological description (English):** Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.

**User-friendly description (de):** Entdecke, wie Graphen Orte, Objekte und ihre Verbindungen darstellen.

##### Gerichtete und ungerichtete Graphen unterscheiden

[distinguishDirectedAndUndirectedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

**Methodological description (English):** Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.

**User-friendly description (de):** Erkenne, ob Verbindungen nur in eine oder in beide Richtungen verlaufen.

##### Bäume von Graphen mit Zyklen unterscheiden

[distinguishTreesFromGraphsWithCycles.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

**Methodological description (English):** A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.

**User-friendly description (de):** Verstehe, warum Graphen Zyklen enthalten können, Bäume jedoch nicht.

##### Gewichtete und ungewichtete Graphen unterscheiden

[distinguishWeightedAndUnweightedGraphs.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

**Methodological description (English):** Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.

**User-friendly description (de):** Erkenne, wann Kanten eines Graphen Zahlen wie Entfernungen oder Kosten tragen.

##### Die Struktur eines Graphen erklären

[explainGraphStructure.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

**Methodological description (English):** Represent a road or social network as vertices and edges without assuming every graph is a tree.

**User-friendly description (de):** Erkenne die Knoten eines Graphen und die Kanten, die sie verbinden.

##### Einen Pfad in einem Graphen finden

[findAPathInAGraph.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

**Methodological description (English):** Construct a sequence of connected vertices from start to goal while respecting edge directions.

**User-friendly description (de):** Folge einem gültigen Pfad zwischen Knoten und beachte dabei die Richtung der Kanten.

##### Benachbarte Knoten erkennen

[identifyAdjacentVertices.data.ts](../../../content/informatics/data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

**Methodological description (English):** Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.

**User-friendly description (de):** Bestimme die Knoten, die direkt mit einem anderen Knoten verbunden sind.

#### Warteschlange

Skills: 3

[queue.data.ts](../../../content/informatics/data/skills/dataStructures/queue/queue.data.ts)

**Methodological description (English):** A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.

**User-friendly description (de):** Lerne, wie eine Warteschlange Elemente in der Reihenfolge ihres Eintreffens verarbeitet.

##### Ein Element aus der Warteschlange entnehmen

[dequeueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

**Methodological description (English):** Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.

**User-friendly description (de):** Entnimm das vorderste Element einer Warteschlange, ohne die Reihenfolge der anderen zu verändern.

##### Ein Element in die Warteschlange einfügen

[enqueueAnElement.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

**Methodological description (English):** Add a value to the back without rearranging those already waiting.

**User-friendly description (de):** Füge ein neues Element am Ende einer Warteschlange hinzu.

##### Das FIFO-Prinzip erklären

[explainFIFO.data.ts](../../../content/informatics/data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

**Methodological description (English):** In a queue, the earliest added element is served first unless separate priority rules apply.

**User-friendly description (de):** Erkläre, warum das zuerst eingetroffene Element die Warteschlange zuerst verlässt.

#### Sequenzen

Skills: 7

[sequences.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/sequences.data.ts)

**Methodological description (English):** Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.

**User-friendly description (de):** Entdecke geordnete Sammlungen und wie du Elemente darin abrufst, hinzufügst und entfernst.

##### Ein Sequenzelement über seinen Index abrufen

[accessASequenceElementByIndex.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

**Methodological description (English):** Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.

**User-friendly description (de):** Hole ein Element über seinen Index, ohne auf eine ungültige Position zuzugreifen.

##### Arrays von verketteten Listen unterscheiden

[distinguishArraysFromLinkedLists.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

**Methodological description (English):** Indexed arrays and chains of linked nodes offer different access methods and modification costs.

**User-friendly description (de):** Vergleiche indexierte Arrays mit Ketten verknüpfter Knoten.

##### Die Struktur eines Arrays erklären

[explainArrayStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

**Methodological description (English):** An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.

**User-friendly description (de):** Verstehe, wie Arrays Elemente an durch Indizes bezeichneten Positionen speichern.

##### Die Struktur einer Liste erklären

[explainListStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

**Methodological description (English):** A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.

**User-friendly description (de):** Erkenne Listen als geordnete Sammlungen, die unterschiedlich dargestellt werden können.

##### Ein Element in eine Sequenz einfügen

[insertAnElementIntoASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

**Methodological description (English):** Add a new item at a specified position and predict how it affects the order of other items or links between nodes.

**User-friendly description (de):** Füge ein Element an der passenden Stelle in eine geordnete Sequenz ein.

##### Ein Element aus einer Sequenz entfernen

[removeAnElementFromASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

**Methodological description (English):** Delete an item at a position while preserving the proper order and accessibility of the remaining elements.

**User-friendly description (de):** Entferne ein Element und erhalte die Reihenfolge der übrigen Elemente.

##### Eine Sequenz durchlaufen

[traverseASequence.data.ts](../../../content/informatics/data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

**Methodological description (English):** Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.

**User-friendly description (de):** Besuche alle Elemente einer Sequenz der Reihe nach.

#### Mengen

Skills: 4

[sets.data.ts](../../../content/informatics/data/skills/dataStructures/sets/sets.data.ts)

**Methodological description (English):** Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.

**User-friendly description (de):** Entdecke Mengen eindeutiger Werte und die Prüfung ihrer Zugehörigkeit.

##### Die Schnittmenge berechnen

[computeSetIntersection.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

**Methodological description (English):** Find only values shared by two sets, distinguishing intersection from union.

**User-friendly description (de):** Finde nur die Elemente, die in beiden Mengen vorkommen.

##### Die Vereinigungsmenge berechnen

[computeSetUnion.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

**Methodological description (English):** Create the set of all values that occur in either of two sets, eliminating duplicates.

**User-friendly description (de):** Vereine alle unterschiedlichen Elemente beider Mengen ohne Duplikate.

##### Die Struktur einer Menge erklären

[explainSetStructure.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

**Methodological description (English):** A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.

**User-friendly description (de):** Verstehe, warum eine Menge jedes unterschiedliche Element nur einmal enthält.

##### Die Zugehörigkeit zu einer Menge prüfen

[testSetMembership.data.ts](../../../content/informatics/data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

**Methodological description (English):** Determine whether a value belongs to a set without requiring its positional index.

**User-friendly description (de):** Prüfe, ob ein bestimmter Wert zu einer Menge gehört.

#### Stapel

Skills: 3

[stack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/stack.data.ts)

**Methodological description (English):** A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.

**User-friendly description (de):** Entdecke, wie ein Stapel zuerst auf das zuletzt hinzugefügte Element zugreift.

##### Das LIFO-Prinzip erklären

[explainLIFO.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

**Methodological description (English):** In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.

**User-friendly description (de):** Verstehe, warum ein Stapel das zuletzt hinzugefügte Element zuerst zurückgibt.

##### Ein Element vom Stapel nehmen

[popAnElementFromAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

**Methodological description (English):** Use `pop` to remove the top value while accounting for the special case of an empty stack.

**User-friendly description (de):** Entferne das zuletzt hinzugefügte Element und prüfe, ob der Stapel leer ist.

##### Ein Element auf den Stapel legen

[pushAnElementOntoAStack.data.ts](../../../content/informatics/data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

**Methodological description (English):** Use `push` to place a new value on top without changing the order of previously added elements.

**User-friendly description (de):** Lege ein neues Element oben auf den Stapel.

#### Auswahl von Datenstrukturen

Skills: 4

[structureSelection.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/structureSelection.data.ts)

**Methodological description (English):** Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.

**User-friendly description (de):** Wähle Datenstrukturen danach aus, wie ein Programm die Daten verwenden soll.

##### Struktur für benötigte Operationen auswählen

[chooseAStructureForRequiredOperations.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

**Methodological description (English):** Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.

**User-friendly description (de):** Wähle eine Sammlung, die für Indexzugriff, Mitgliedschaft, Warteschlangen oder Beziehungen passt.

##### Einfügekosten von Sammlungen vergleichen

[compareCollectionInsertionCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

**Methodological description (English):** Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.

**User-friendly description (de):** Erkunde, warum beim Einfügen Arrayelemente verschoben oder Verknüpfungen geändert werden müssen.

##### Zugriffskosten auf Elemente vergleichen

[compareElementAccessCosts.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

**Methodological description (English):** Compare typical direct access in an indexed array with traversal through a linked list to the desired node.

**User-friendly description (de):** Vergleiche, wie schnell Arrays und verkettete Listen ein bestimmtes Element erreichen.

##### Datenstrukturen von Algorithmen unterscheiden

[distinguishDataStructuresFromAlgorithms.data.ts](../../../content/informatics/data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

**Methodological description (English):** A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.

**User-friendly description (de):** Unterscheide das Organisieren von Daten in einer Struktur von ihrer Verarbeitung durch einen Algorithmus.

#### Bäume

Skills: 4

[trees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/trees.data.ts)

**Methodological description (English):** Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.

**User-friendly description (de):** Entdecke, wie Bäume Informationen durch Eltern-Kind-Beziehungen ordnen.

##### Blattknoten und innere Baumknoten unterscheiden

[distinguishLeafAndInternalTreeNodes.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

**Methodological description (English):** A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.

**User-friendly description (de):** Unterscheide Knoten mit Kindern von Blattknoten ohne Kinder.

##### Binäre Suchbäume erklären

[explainBinarySearchTrees.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

**Methodological description (English):** Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.

**User-friendly description (de):** Verstehe die Schlüsselordnung, die das Suchen in einem binären Suchbaum ermöglicht.

##### Die Struktur eines Baumes erklären

[explainTreeStructure.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

**Methodological description (English):** Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.

**User-friendly description (de):** Erkenne Wurzel, Äste, Knoten und Verbindungen in einem Baum.

##### Einen Pfad in einem Baum finden

[findAPathInATree.data.ts](../../../content/informatics/data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

**Methodological description (English):** Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.

**User-friendly description (de):** Folge den tatsächlich vorhandenen Verbindungen zwischen zwei Baumknoten.

### Entwurfsmuster

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../../content/informatics/data/skills/designPatterns/designPatterns.data.ts)

**Methodological description (English):** The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.

**User-friendly description (de):** Erkunde wiederverwendbare Lösungen, um Softwareobjekte zu erzeugen, zu verbinden und zu koordinieren.

#### Verhaltensmuster

Skills: 11

[behavioral.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/behavioral.data.ts)

**Methodological description (English):** Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.

**User-friendly description (de):** Erkunde, wie Objekte Anfragen koordinieren und ihr Verhalten ändern.

##### Verantwortungskette

[chainOfResponsibility.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

**Methodological description (English):** Pass a request through a chain of handlers until one processes it or passes it onward.

**User-friendly description (de):** Reiche eine Anfrage durch Bearbeiter weiter, bis einer sie verarbeiten kann.

##### Befehl

[command.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/command.data.ts)

**Methodological description (English):** Represent an action as a request object that can be stored, queued, or executed later.

**User-friendly description (de):** Stelle eine Operation als speicherbares oder planbares Objekt dar.

##### Interpreter

[interpreter.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

**Methodological description (English):** Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.

**User-friendly description (de):** Interpretiere eine kleine Sprache mithilfe von Regeln als Ausdrücken.

##### Iterator

[iterator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/iterator.data.ts)

**Methodological description (English):** Traverse collection elements through a defined interface without exposing their internal representation.

**User-friendly description (de):** Besuche Elemente einer Sammlung, ohne ihre Speicherstruktur offenzulegen.

##### Vermittler

[mediator.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/mediator.data.ts)

**Methodological description (English):** Move interactions between several components into a mediator so each component need not depend directly on every other one.

**User-friendly description (de):** Koordiniere die Interaktionen zwischen Komponenten durch einen zentralen Vermittler.

##### Memento

[memento.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/memento.data.ts)

**Methodological description (English):** Save an external snapshot that allows restoring an object's state without revealing its internal implementation.

**User-friendly description (de):** Speichere den Zustand eines Objekts, um ihn später wiederherzustellen.

##### Beobachter

[observer.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/observer.data.ts)

**Methodological description (English):** Notify subscribers when a source changes without knowing which particular action each subscriber will take.

**User-friendly description (de):** Benachrichtige interessierte Abonnenten, wenn sich ein beobachtetes Objekt ändert.

##### Zustand

[state.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/state.data.ts)

**Methodological description (English):** Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.

**User-friendly description (de):** Ändere die Reaktion eines Objekts entsprechend seinem aktuellen Zustand.

##### Strategie

[strategy.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/strategy.data.ts)

**Methodological description (English):** Interchange algorithms sharing an interface so the solution method can change independently of the client.

**User-friendly description (de):** Wechsle zwischen Algorithmen, die alle eine gemeinsame Schnittstelle einhalten.

##### Schablonenmethode

[templateMethod.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

**Methodological description (English):** Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.

**User-friendly description (de):** Halte die Hauptschritte eines Algorithmus fest und lasse bestimmte Schritte variieren.

##### Besucher

[visitor.data.ts](../../../content/informatics/data/skills/designPatterns/behavioral/skills/visitor.data.ts)

**Methodological description (English):** Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.

**User-friendly description (de):** Trenne Operationen von den Objektstrukturen, auf denen sie arbeiten.

#### Erzeugungsmuster

Skills: 5

[creational.data.ts](../../../content/informatics/data/skills/designPatterns/creational/creational.data.ts)

**Methodological description (English):** Five approaches to constructing instances and object families that separate creation logic from usage.

**User-friendly description (de):** Lerne Muster kennen, die Objekte erstellen, ohne Nutzer an konkrete Typen zu binden.

##### Abstrakte Fabrik

[abstractFactory.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

**Methodological description (English):** Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.

**User-friendly description (de):** Verwende eine Fabrik, die zusammenpassende Familien verwandter Objekte erstellt.

##### Erbauer

[builder.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/builder.data.ts)

**Methodological description (English):** Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.

**User-friendly description (de):** Setze ein komplexes Objekt mit einem Erbauer Schritt für Schritt zusammen.

##### Fabrikmethode

[factoryMethod.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

**Methodological description (English):** Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.

**User-friendly description (de):** Lass Unterklassen entscheiden, welches konkrete Objekt eine Fabrikmethode erzeugt.

##### Prototyp

[prototype.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/prototype.data.ts)

**Methodological description (English):** Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.

**User-friendly description (de):** Erzeuge neue Objekte durch Kopieren eines vorbereiteten Beispiels.

##### Singleton

[singleton.data.ts](../../../content/informatics/data/skills/designPatterns/creational/skills/singleton.data.ts)

**Methodological description (English):** Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.

**User-friendly description (de):** Kontrolliere den Zugriff auf eine einzige gemeinsame Instanz und beachte die Risiken globalen Zustands.

#### Strukturmuster

Skills: 7

[structural.data.ts](../../../content/informatics/data/skills/designPatterns/structural/structural.data.ts)

**Methodological description (English):** Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.

**User-friendly description (de):** Entdecke Muster zum Verbinden, Umhüllen und Teilen von Softwarekomponenten.

##### Adapter

[adapter.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/adapter.data.ts)

**Methodological description (English):** Translate the interface expected by a client into that of an existing component without rewriting that component.

**User-friendly description (de):** Verbinde inkompatible Schnittstellen durch Übersetzung zwischen ihnen.

##### Brücke

[bridge.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/bridge.data.ts)

**Methodological description (English):** Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.

**User-friendly description (de):** Trenne die Abstraktion einer Komponente von ihrer Implementierung.

##### Kompositum

[composite.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/composite.data.ts)

**Methodological description (English):** Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.

**User-friendly description (de):** Behandle einzelne Objekte und Objektgruppen über eine gemeinsame Schnittstelle.

##### Dekorierer

[decorator.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/decorator.data.ts)

**Methodological description (English):** Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.

**User-friendly description (de):** Füge Verhalten durch Umhüllen eines Objekts hinzu, statt immer mehr Unterklassen einzuführen.

##### Fassade

[facade.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/facade.data.ts)

**Methodological description (English):** Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.

**User-friendly description (de):** Biete einen einfachen Zugang zu einer komplexen Sammlung von Komponenten.

##### Fliegengewicht

[flyweight.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/flyweight.data.ts)

**Methodological description (English):** Share the immutable portion of state among many similar objects to reduce memory consumption.

**User-friendly description (de):** Teile wiederverwendbare Objektdaten, um unnötigen Speicherverbrauch zu senken.

##### Stellvertreter

[proxy.data.ts](../../../content/informatics/data/skills/designPatterns/structural/skills/proxy.data.ts)

**Methodological description (English):** Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.

**User-friendly description (de):** Kontrolliere den Zugriff auf ein Objekt durch ein anderes mit derselben Schnittstelle.

### Digitale Kreativität und Spiele

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

**Methodological description (English):** Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.

**User-friendly description (de):** Erstelle digitale Medien, entwirf spielbare Regeln und erkunde die prozedurale Generierung.

#### Digitale Materialien

Skills: 3

[digitalMaterials.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

**Methodological description (English):** Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.

**User-friendly description (de):** Lerne, digitale Inhalte zielgerichtet zu erstellen und zu bearbeiten sowie passende Werkzeuge auszuwählen.

##### Ein digitales Kreativwerkzeug auswählen

[chooseADigitalCreativeTool.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

**Methodological description (English):** Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.

**User-friendly description (de):** Wähle Kreativsoftware, die zu deinem gewünschten Ergebnis passt.

##### Ein einfaches digitales Werk erstellen

[createASimpleDigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

**Methodological description (English):** Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.

**User-friendly description (de):** Gestalte eine stimmige digitale Karte, ein Bild oder ein anderes Werk für eine bestimmte Zielgruppe.

##### Ein digitales Werk bearbeiten

[editADigitalArtifact.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

**Methodological description (English):** Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.

**User-friendly description (de):** Verbessere eine vorhandene digitale Datei, ohne ihre beabsichtigte Aussage zu verändern.

#### Spieldesign

Skills: 3

[gameDesign.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

**Methodological description (English):** Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.

**User-friendly description (de):** Erkunde, wie Regeln und Handlungen der Spielenden das Spielerlebnis prägen.

##### Eine Spielmechanik entwerfen

[designAGameMechanic.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

**Methodological description (English):** Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.

**User-friendly description (de):** Verknüpfe die Aktion eines Spielers mit Zustandsänderungen im Spiel und Rückmeldungen.

##### Eine Spielregel formulieren

[formulateAGameRule.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

**Methodological description (English):** State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.

**User-friendly description (de):** Formuliere eine Spielregel so klar, dass die Spielenden wissen, was erlaubt ist.

##### Die Balance eines einfachen Spiels testen

[testTheBalanceOfASimpleGame.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

**Methodological description (English):** Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.

**User-friendly description (de):** Prüfe, ob die Regeln das Spiel fair, herausfordernd und abschließbar machen.

#### Prozedurale Generierung

Skills: 4

[proceduralGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

**Methodological description (English):** Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.

**User-friendly description (de):** Entdecke, wie Algorithmen aus kompakten Regeln viele Inhaltsvarianten erzeugen können.

##### Speichern und Erzeugen von Ressourcen vergleichen

[compareResourceStorageAndGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

**Methodological description (English):** Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.

**User-friendly description (de):** Vergleiche den durch prozedurale Generierung gesparten Speicherplatz mit dem nötigen Rechenaufwand.

##### Generatorparameter einstellen

[configureGeneratorParameters.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

**Methodological description (English):** Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.

**User-friendly description (de):** Ändere Generatoreinstellungen, um Aussehen oder Menge der Ausgabe zu steuern.

##### Prozedurale Ressourcenerzeugung erklären

[explainProceduralResourceGeneration.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

**Methodological description (English):** Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.

**User-friendly description (de):** Erkläre, wie ein Generator Ressourcen erzeugt, statt jede fertige Variante zu speichern.

##### Ergebnisse mit einem Generierungs-Seed reproduzieren

[reproduceResultsUsingAGenerationSeed.data.ts](../../../content/informatics/data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

**Methodological description (English):** Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.

**User-friendly description (de):** Verstehe, warum ein fester Seed und unveränderte Regeln dasselbe Ergebnis reproduzieren.

### Nutzererfahrung digitaler Produkte

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalProductUX.data.ts)

**Methodological description (English):** An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.

**User-friendly description (de):** Gestalte digitale Angebote, die Menschen verstehen, navigieren und barrierefrei nutzen können.

#### Barrierefreiheit

Skills: 2

[accessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/accessibility.data.ts)

**Methodological description (English):** Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.

**User-friendly description (de):** Entdecke, wie unterschiedliche Fähigkeiten und Eingabemethoden den digitalen Zugang beeinflussen.

##### Bedürfnisse von Nutzenden mit unterschiedlichen Fähigkeiten erkennen

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

**Methodological description (English):** Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.

**User-friendly description (de):** Erkenne die Bedürfnisse von Menschen, die Tastaturen, vergrößerte Schrift oder assistive Technik nutzen.

##### Die Barrierefreiheit digitaler Interaktionen testen

[testDigitalInteractionAccessibility.data.ts](../../../content/informatics/data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

**Methodological description (English):** Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.

**User-friendly description (de):** Teste eine Oberfläche ohne Maus oder Ton und dokumentiere Hindernisse.

#### Gestaltung digitaler Interaktionen

Skills: 4

[digitalInteractionDesign.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

**Methodological description (English):** Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.

**User-friendly description (de):** Erkunde, wie du intuitive Abläufe und hilfreiche Rückmeldungen in digitalen Oberflächen planst.

##### Rückmeldungen digitaler Oberflächen gestalten

[designDigitalInterfaceFeedback.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

**Methodological description (English):** Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.

**User-friendly description (de):** Sorge dafür, dass Schaltflächen, Ladezustände und Fehler verständliche Rückmeldungen geben.

##### Navigation digitaler Oberflächen gestalten

[designDigitalInterfaceNavigation.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

**Methodological description (English):** Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.

**User-friendly description (de):** Ordne Bildschirme und Navigation so an, dass Menschen die richtigen Aktionen finden.

##### Das Ziel einer Person bei der Nutzung eines digitalen Produkts erkennen

[identifyADigitalProductUsersGoal.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

**Methodological description (English):** Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.

**User-friendly description (de):** Erkenne, was jemand mit einer App oder einem digitalen Gerät erreichen möchte.

##### Häufige Fehler bei digitalen Interaktionen vermeiden

[preventCommonDigitalInteractionErrors.data.ts](../../../content/informatics/data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

**Methodological description (English):** Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.

**User-friendly description (de):** Nutze Beschriftungen, Prüfungen und Bestätigungen, um vermeidbare Fehler zu verhindern.

#### Erlebnisbewertung und Ethik

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

**Methodological description (English):** Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.

**User-friendly description (de):** Erkunde, wie Nutzertests und ehrliche Gestaltung digitale Produkte verbessern.

##### Manipulative Oberflächenmuster erkennen

[identifyManipulativeInterfacePatterns.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

**Methodological description (English):** Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.

**User-friendly description (de):** Erkenne Oberflächentricks, die Kosten verbergen, Entscheidungen erzwingen oder Kündigungen erschweren.

##### Die Gebrauchstauglichkeit digitaler Oberflächen testen

[testDigitalInterfaceUsability.data.ts](../../../content/informatics/data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

**Methodological description (English):** Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.

**User-friendly description (de):** Beobachte, ob eine Person eine echte Aufgabe ohne zusätzliche Hinweise erledigen kann.

### Digitale Sicherheit und Verantwortung

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

**Methodological description (English):** Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.

**User-friendly description (de):** Lerne, Informationen zu schützen, andere zu respektieren und Auswirkungen digitaler Technik zu verstehen.

#### Kontoschutz

Skills: 9

[accountProtection.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

**Methodological description (English):** Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.

**User-friendly description (de):** Erfahre, wie du Konten schützt und auf verdächtige Nachrichten reagierst.

##### Die Echtheit eines E-Mail-Absenders einschätzen

[assessAnEmailSendersAuthenticity.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

**Methodological description (English):** Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.

**User-friendly description (de):** Prüfe die Identität des Absenders über Anzeigenamen und Bild hinaus.

##### Risiken beim Öffnen eines Links einschätzen

[assessTheRiskOfFollowingALink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

**Methodological description (English):** Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.

**User-friendly description (de):** Schätze ab, was passieren könnte, wenn du einen verdächtigen Link öffnest.

##### Mehrfaktor-Authentifizierung einrichten

[configureMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

**Methodological description (English):** In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.

**User-friendly description (de):** Aktiviere einen zusätzlichen Anmeldefaktor und plane eine sichere Kontowiederherstellung.

##### Eine starke Passphrase erstellen

[createAStrongPassphrase.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

**Methodological description (English):** Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.

**User-friendly description (de):** Erstelle lange, schwer vorhersehbare und für jedes Konto unterschiedliche Passphrasen.

##### Mehrfaktor-Authentifizierung erklären

[explainMultiFactorAuthentication.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

**Methodological description (English):** Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.

**User-friendly description (de):** Verstehe, wie ein zweiter unabhängiger Anmeldefaktor ein Konto schützt.

##### Die Bedeutung von Software-Updates erklären

[explainWhySoftwareUpdatesMatter.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

**Methodological description (English):** Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.

**User-friendly description (de):** Lerne, warum offizielle Updates Sicherheitslücken schließen können.

##### Eine Phishing-Nachricht erkennen

[recognizeAPhishingMessage.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

**Methodological description (English):** Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.

**User-friendly description (de):** Erkenne Nachrichten, die sich als jemand anderes ausgeben, um Passwörter oder Codes zu stehlen.

##### Auf verdächtige Online-Kontakte reagieren

[respondToSuspiciousDigitalContact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

**Methodological description (English):** Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.

**User-friendly description (de):** Reagiere sicher auf verdächtige Kontakte und prüfe Anfragen über einen unabhängigen Kanal.

##### Die Domain einer Website überprüfen

[verifyAWebsitesDomain.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

**Methodological description (English):** Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.

**User-friendly description (de):** Lies die tatsächliche Domain einer Webadresse und erkenne täuschende Nachahmungen.

#### Ethik digitaler Interaktionen

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

**Methodological description (English):** Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.

**User-friendly description (de):** Lerne respektvoll zu kommunizieren und die Nutzungsrechte von Urhebern zu beachten.

##### Digitale Inhalte korrekt zuordnen

[attributeDigitalMaterials.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

**Methodological description (English):** When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.

**User-friendly description (de):** Nenne die ursprünglichen Urheber digitaler Inhalte, die du nutzt.

##### Einen sicheren Meldeweg für ein Problem wählen

[chooseASafeWayToReportAProblem.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

**Methodological description (English):** Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.

**User-friendly description (de):** Wähle vertrauenswürdige Personen oder offizielle Stellen, um Online-Probleme zu melden.

##### Lizenzen für digitale Inhalte unterscheiden

[distinguishDigitalContentLicenses.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

**Methodological description (English):** Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.

**User-friendly description (de):** Unterscheide Urheberrechtsbeschränkungen, offene Lizenzen und gemeinfreie Inhalte.

##### Angemessenes Online-Verhalten erkennen

[identifyAppropriateOnlineBehavior.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

**Methodological description (English):** Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.

**User-friendly description (de):** Erkenne Drohungen, Belästigung und Mobbing in digitaler Kommunikation.

#### Privatsphäre

Skills: 5

[privacy.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

**Methodological description (English):** Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.

**User-friendly description (de):** Entdecke, wie das Teilen von Informationen im Internet die Privatsphäre beeinflusst.

##### Sichere Wege zur Datenfreigabe wählen

[chooseSafeDataSharingMethods.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

**Methodological description (English):** Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.

**User-friendly description (de):** Entscheide, wer sensible Informationen erhalten darf und wie du sie sicher teilst.

##### Private Chats und öffentliche Links unterscheiden

[distinguishAPrivateChatFromAPublicLink.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

**Methodological description (English):** Check who can access a shared conversation or document; do not automatically assume a link is private.

**User-friendly description (de):** Prüfe, wer eine geteilte Unterhaltung oder ein Dokument öffnen kann; ein Link ist nicht automatisch privat.

##### Die Reidentifikation von Daten erklären

[explainDataReIdentification.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

**Methodological description (English):** Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.

**User-friendly description (de):** Erkläre, wie getrennt erhobene Angaben zusammen eine Person wieder identifizierbar machen.

##### Personenbezogene Daten erkennen

[identifyPersonalData.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

**Methodological description (English):** Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.

**User-friendly description (de):** Erkenne Informationen, die eine Person auch zusammen mit anderen Angaben identifizieren können.

##### Einen digitalen Fußabdruck erkennen

[recognizeADigitalFootprint.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

**Methodological description (English):** Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.

**User-friendly description (de):** Verstehe, wie Beiträge und Online-Aktivitäten dauerhafte Spuren hinterlassen können.

#### Soziale und ökologische Auswirkungen der Informatik

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

**Methodological description (English):** Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.

**User-friendly description (de):** Erkunde, wie Informatik Fairness, Ressourcenverbrauch und Umwelt beeinflusst.

##### Auswirkungen eines Algorithmus auf Nutzergruppen bewerten

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

**Methodological description (English):** Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.

**User-friendly description (de):** Prüfe, ob Ergebnisse eines Algorithmus Nutzergruppen unfair unterschiedlich behandeln.

##### Umweltauswirkungen der Informatik bewerten

[assessComputingsEnvironmentalImpact.data.ts](../../../content/informatics/data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

**Methodological description (English):** Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.

**User-friendly description (de):** Vergleiche Energie-, Material- und Elektroschrottfolgen der Informatik.

### Digitale Systeme und Netzwerke

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

**Methodological description (English):** Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.

**User-friendly description (de):** Entdecke, wie Computergeräte, digitale Informationen und Netzwerke zusammenarbeiten.

#### Bauteile digitaler Geräte

Skills: 3

[digitalDeviceComponents.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

**Methodological description (English):** Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.

**User-friendly description (de):** Erkunde, wie Hardwarekomponenten und Software verschiedene Rechenaufgaben erfüllen.

##### Hardware von Software unterscheiden

[distinguishHardwareFromSoftware.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

**Methodological description (English):** Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.

**User-friendly description (de):** Unterscheide physische Computerteile von der Software, die sie steuert.

##### Die Aufgabe eines Prozessors erklären

[explainAProcessorsFunction.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

**Methodological description (English):** Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.

**User-friendly description (de):** Erkläre, wie ein Prozessor Anweisungen ausführt, statt Dateien dauerhaft zu speichern.

##### Digitale Geräte erkennen

[identifyDigitalDevices.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

**Methodological description (English):** Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.

**User-friendly description (de):** Erkenne Geräte, die programmierbare digitale Informationen verarbeiten.

#### Arbeitsspeicher und Datenspeicherung

Skills: 4

[memoryAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

**Methodological description (English):** Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.

**User-friendly description (de):** Entdecke die Unterschiede zwischen temporärem Arbeitsspeicher, Firmware-Speicher und Dateispeicher.

##### RAM, ROM und Datenspeicher unterscheiden

[distinguishRAMROMAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

**Methodological description (English):** Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.

**User-friendly description (de):** Vergleiche, welche Informationen RAM, ROM und dauerhafte Speicher jeweils aufnehmen sollen.

##### Dauerhafte Datenspeicherung erklären

[explainPersistentStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

**Methodological description (English):** An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.

**User-friendly description (de):** Verstehe, warum Speichergeräte Dateien auch nach dem Ausschalten behalten.

##### Den Arbeitsspeicher (RAM) erklären

[explainRAM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

**Methodological description (English):** RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.

**User-friendly description (de):** Entdecke, wie RAM Arbeitsdaten bereithält, während ein Computer läuft.

##### Den Zweck von ROM erklären

[explainThePurposeOfROM.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

**Methodological description (English):** Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.

**User-friendly description (de):** Erkenne, wie nichtflüchtiger Firmware-Speicher Geräte beim Starten unterstützt.

#### Netzwerkmodelle und -protokolle

Skills: 11

[networkModelsAndProtocols.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

**Methodological description (English):** Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.

**User-friendly description (de):** Entdecke, wie Netzwerkprotokolle Regeln für den Informationsaustausch festlegen.

##### Netzwerkzugriffsverfahren vergleichen

[compareNetworkAccessMethods.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

**Methodological description (English):** Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.

**User-friendly description (de):** Vergleiche Kollisionserkennung, Kollisionsvermeidung und Tokenweitergabe in ihren jeweiligen Einsatzbereichen.

##### HTTP von HTTPS unterscheiden

[distinguishHTTPFromHTTPS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

**Methodological description (English):** HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.

**User-friendly description (de):** Erkenne, was HTTPS schützt und warum es keine Garantie für eine vertrauenswürdige Website ist.

##### OSI von TCP/IP unterscheiden

[distinguishOSIFromTCPIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

**Methodological description (English):** The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.

**User-friendly description (de):** Vergleiche die konzeptionellen OSI-Schichten mit dem TCP/IP-Protokollstapel des Internets.

##### TCP von UDP unterscheiden

[distinguishTCPFromUDP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

**Methodological description (English):** TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.

**User-friendly description (de):** Vergleiche zuverlässige TCP-Datenströme mit UDP-Nachrichten ohne gleichwertige Garantien.

##### Ein Netzwerkprotokoll erklären

[explainANetworkProtocol.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

**Methodological description (English):** A protocol specifies message formats and rules that enable devices to exchange information correctly.

**User-friendly description (de):** Erkläre, warum Geräte vereinbarte Regeln brauchen, um Nachrichten auszutauschen.

##### CSMA/CA erklären

[explainCSMACA.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

**Methodological description (English):** Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.

**User-friendly description (de):** Erkläre, wie drahtlose Geräte versuchen, das Senden auf einem belegten Kanal zu vermeiden.

##### CSMA/CD erklären

[explainCSMACD.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

**Methodological description (English):** Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.

**User-friendly description (de):** Erfahre, warum ältere gemeinsam genutzte Ethernet-Netze Kollisionen erkennen mussten.

##### DNS erklären

[explainDNS.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

**Methodological description (English):** DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.

**User-friendly description (de):** Erkläre, wie DNS hilft, anhand von Domainnamen Netzwerkadressen zu finden.

##### Die OSI-Schichten erklären

[explainTheOSILayers.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

**Methodological description (English):** The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.

**User-friendly description (de):** Nutze das siebenschichtige OSI-Modell, um Netzwerkfunktionen einzuordnen.

##### Den Zweck von IP erklären

[explainThePurposeOfIP.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

**Methodological description (English):** IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.

**User-friendly description (de):** Verstehe, wie IP Pakete adressiert und zwischen Netzwerken weiterleitet.

##### Token Ring erklären

[explainTokenRing.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

**Methodological description (English):** Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.

**User-friendly description (de):** Entdecke, wie die Weitergabe eines Tokens regelt, welches Gerät Daten senden darf.

#### Netzwerke

Skills: 4

[networks.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

**Methodological description (English):** Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.

**User-friendly description (de):** Entdecke, wie verbundene Geräte Nachrichten senden und Ressourcen gemeinsam nutzen.

##### Das Internet vom Web unterscheiden

[distinguishTheInternetFromTheWeb.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

**Methodological description (English):** Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.

**User-friendly description (de):** Unterscheide die Netzwerkinfrastruktur des Internets von Websites im Web.

##### Die Zustellung von Netzwerknachrichten erklären

[explainNetworkMessageDelivery.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

**Methodological description (English):** Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.

**User-friendly description (de):** Verfolge, wie Nachrichten durch Netzwerkgeräte zu ihrem Ziel gelangen.

##### Den Zweck eines Computernetzwerks erklären

[explainThePurposeOfAComputerNetwork.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

**Methodological description (English):** Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.

**User-friendly description (de):** Erkläre, warum Netzwerke getrennte Geräte zum Informationsaustausch verbinden.

##### Drahtlose Kommunikation erklären

[explainWirelessCommunication.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

**Methodological description (English):** Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.

**User-friendly description (de):** Erkunde, wie drahtlose Geräte mithilfe von Signalen statt direkter Kabelverbindungen kommunizieren.

#### Zahlensysteme

Skills: 4

[numeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

**Methodological description (English):** Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.

**User-friendly description (de):** Lerne, wie Ziffern Zahlen in Systemen mit unterschiedlichen Basen darstellen.

##### Zwischen Binär- und Dezimalsystem umrechnen

[convertBetweenBinaryAndDecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

**Methodological description (English):** Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.

**User-friendly description (de):** Wandle kleine Zahlen zwischen binärer und dezimaler Schreibweise um.

##### Binär- und Hexadezimalsystem unterscheiden

[distinguishBinaryAndHexadecimal.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

**Methodological description (English):** Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.

**User-friendly description (de):** Verstehe, warum sich Bitgruppen im Hexadezimalsystem kürzer darstellen lassen.

##### Die binäre Logik eines Computers erklären

[explainComputerBinaryLogic.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

**Methodological description (English):** Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.

**User-friendly description (de):** Verknüpfe binäre Nullen und Einsen mit unterscheidbaren elektronischen Signalzuständen.

##### Stellenwertsysteme erklären

[explainPositionalNumeralSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

**Methodological description (English):** Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.

**User-friendly description (de):** Verstehe, warum die Position einer Ziffer ihren Wert in einer Zahl verändert.

#### Betriebssysteme

Skills: 4

[operatingSystems.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

**Methodological description (English):** An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.

**User-friendly description (de):** Erkunde, wie Betriebssysteme Programme, Dateien und Geräte verwalten.

##### Betriebssystemfamilien unterscheiden

[distinguishOperatingSystemFamilies.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

**Methodological description (English):** Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.

**User-friendly description (de):** Erkenne gängige Betriebssystemfamilien und ihre Unterschiede.

##### Einen Betriebssystemprozess erklären

[explainAnOSProcess.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

**Methodological description (English):** A running program has current state and allocated resources; a program file on disk is not itself a process.

**User-friendly description (de):** Unterscheide einen laufenden Prozess von der auf einem Datenträger gespeicherten Programmdatei.

##### Den Zweck eines Betriebssystems erklären

[explainAnOperatingSystemsPurpose.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

**Methodological description (English):** Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.

**User-friendly description (de):** Verstehe, wie ein Betriebssystem Software und Hardware aufeinander abstimmt.

##### Die Rolle von Linus Torvalds bei Linux erklären

[explainLinusTorvaldsRoleInLinux.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

**Methodological description (English):** Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.

**User-friendly description (de):** Erfahre, wie der Linux-Kernel entstand und warum viele Mitwirkende Betriebssysteme gemeinsam weiterentwickeln.

#### Darstellung und Speicherung

Skills: 4

[representationAndStorage.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

**Methodological description (English):** How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.

**User-friendly description (de):** Lerne, wie Geräte Informationen darstellen und gespeicherte Dateien organisieren.

##### Digitale Dateigrößen vergleichen

[compareDigitalFileSizes.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

**Methodological description (English):** Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.

**User-friendly description (de):** Vergleiche Dateigrößen und erkläre, warum Format und Komprimierung wichtig sind.

##### Digitale Formate unterscheiden

[distinguishDigitalFormats.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

**Methodological description (English):** Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.

**User-friendly description (de):** Erkenne, dass Dateiformate festlegen, wie gespeicherte Bits interpretiert werden.

##### Die Binärdarstellung erklären

[explainBinaryRepresentation.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

**Methodological description (English):** Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.

**User-friendly description (de):** Verstehe, wie Folgen aus Nullen und Einsen verschiedene Arten von Daten codieren.

##### Dateien in Verzeichnissen organisieren

[organizeFilesInDirectories.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

**Methodological description (English):** Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.

**User-friendly description (de):** Ordne Dateien in sinnvolle Ordner ein, damit man sie über ihre Pfade findet.

#### Ausführung von Aufgaben

Skills: 3

[taskExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

**Methodological description (English):** Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.

**User-friendly description (de):** Entdecke den Unterschied zwischen überlappenden Aufgaben und tatsächlich gleichzeitig ausgeführter Arbeit.

##### Unabhängige Aufgaben auf Ausführungseinheiten verteilen

[distributeIndependentTasksAcrossExecutors.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

**Methodological description (English):** Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.

**User-friendly description (de):** Plane, welche Aufgaben gleichzeitig laufen können und welche auf Ergebnisse anderer warten müssen.

##### Nebenläufige Ausführung erklären

[explainConcurrentExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

**Methodological description (English):** Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.

**User-friendly description (de):** Verstehe, wie mehrere Aufgaben Fortschritte machen können, ohne exakt gleichzeitig zu laufen.

##### Parallele Ausführung erklären

[explainParallelExecution.data.ts](../../../content/informatics/data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

**Methodological description (English):** Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.

**User-friendly description (de):** Erkenne, wann mehrere Prozessoren tatsächlich gleichzeitig arbeiten.

### Git und Open Source

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

**Methodological description (English):** A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.

**User-friendly description (de):** Entdecke, wie Entwickler Änderungen verfolgen, zusammenarbeiten und Software mit klaren Nutzungsrechten teilen.

#### Gemeinsame Entwicklung digitaler Produkte

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

**Methodological description (English):** Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.

**User-friendly description (de):** Entdecke, wie Teams Beiträge, Reviews und Projektversionen organisieren.

##### Änderungen in einem gemeinsamen Digitalprojekt koordinieren

[coordinateChangesInASharedDigitalProject.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

**Methodological description (English):** Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.

**User-friendly description (de):** Plane, wer was ändert und wie gemeinsame Änderungen zusammengeführt werden.

##### Beitragsrichtlinien erklären

[explainContributionGuidelines.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

**Methodological description (English):** Rules for contributions, code review, and discussing changes help teams maintain a shared project.

**User-friendly description (de):** Verstehe, warum Beitragsregeln die gemeinsame Arbeit an einer Codebasis erleichtern.

##### Versionen eines Digitalprodukts verfolgen

[trackDigitalProductVersions.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

**Methodological description (English):** Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.

**User-friendly description (de):** Nutze den Versionsverlauf, um Änderungen zeitlich einzuordnen oder ältere Arbeit wiederherzustellen.

#### Git-Versionsverwaltung

Skills: 6

[gitVersionControl.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

**Methodological description (English):** Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.

**User-friendly description (de):** Lerne, wie Git Versionen erfasst und Teams beim Zusammenführen von Änderungen hilft.

##### Lokale und entfernte Repositories unterscheiden

[distinguishLocalAndRemoteRepositories.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

**Methodological description (English):** A local repository supports independent committing, while a remote repository enables sharing between contributors.

**User-friendly description (de):** Unterscheide Arbeit auf deinem Computer von über Remotes geteilten Kopien.

##### Einen Branch erklären

[explainABranch.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

**Methodological description (English):** A branch represents a line of development on which commits can be created without immediately changing the main history.

**User-friendly description (de):** Verstehe, wie Branches getrennte Entwicklungsstränge ermöglichen.

##### Einen Commit erklären

[explainACommit.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

**Methodological description (English):** A Git commit captures a coherent state of changes with an identifier and links to preceding history.

**User-friendly description (de):** Erkenne einen Commit als gekennzeichneten Schnappschuss mit Verbindung zur bisherigen Historie.

##### Einen Pull Request erklären

[explainAPullRequest.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

**Methodological description (English):** A pull request on a collaborative development platform organizes review of proposed changes before they are merged.

**User-friendly description (de):** Entdecke, wie Pull Requests vorgeschlagene Änderungen zur Prüfung organisieren.

##### Ein Repository erklären

[explainARepository.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

**Methodological description (English):** A repository holds a project and its history, allowing earlier versions and author contributions to be examined.

**User-friendly description (de):** Verstehe ein Repository als Projekt samt seiner Änderungshistorie.

##### Das Zusammenführen von Branches erklären

[explainBranchMerging.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

**Methodological description (English):** Merging combines lines of history; incompatible overlapping changes require conflict resolution.

**User-friendly description (de):** Lerne, wie Branches zusammengeführt werden und warum manchmal Konflikte zu lösen sind.

#### Open Source

Skills: 2

[openSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/openSource.data.ts)

**Methodological description (English):** Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.

**User-friendly description (de):** Entdecke, welche Nutzungsrechte Software tatsächlich zu Open Source machen.

##### Open Source von öffentlich sichtbarem Code unterscheiden

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

**Methodological description (English):** Being able to read a program's source does not automatically grant permission to modify or redistribute it.

**User-friendly description (de):** Erkenne, dass sichtbarer Quellcode nicht automatisch Open Source ist.

##### Open Source erklären

[explainOpenSource.data.ts](../../../content/informatics/data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

**Methodological description (English):** An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.

**User-friendly description (de):** Verstehe, wie Open-Source-Lizenzen Nutzung, Änderung und Weitergabe von Software erlauben.

### Geschichte der Programmierung

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/historyOfProgramming.data.ts)

**Methodological description (English):** Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.

**User-friendly description (de):** Entdecke, wie Programmierideen und Rechenmaschinen sich im Lauf der Geschichte entwickelten.

#### Wichtige Beiträge

Skills: 6

[keyContributions.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

**Methodological description (English):** Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.

**User-friendly description (de):** Entdecke bedeutende Beiträge zur Programmierung, Softwarezuverlässigkeit und Computernetzwerken.

##### Berechenbarkeitstheorie erklären

[explainComputabilityTheory.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

**Methodological description (English):** Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.

**User-friendly description (de):** Erfahre, wie formale Modelle zeigen, was Computer berechnen können und was nicht.

##### Frühe elektronische Programmierung erklären

[explainEarlyElectronicProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

**Methodological description (English):** Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.

**User-friendly description (de):** Entdecke, wie Teams früher elektronischer Computer Programme entwickelten und testeten.

##### Die Entwicklung von Compilern erklären

[explainTheDevelopmentOfCompilers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

**Methodological description (English):** Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.

**User-friendly description (de):** Erkunde, wie Compiler das Programmieren mit lesbaren Sprachen erleichterten.

##### Die Entwicklung der Softwarezuverlässigkeit erklären

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

**Methodological description (English):** Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.

**User-friendly description (de):** Verstehe, warum Fehlerbehandlung und zuverlässige Software für die Apollo-Missionen wichtig waren.

##### Das Verhindern von Netzwerkschleifen erklären

[explainTheEliminationOfNetworkLoops.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

**Methodological description (English):** Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.

**User-friendly description (de):** Entdecke, wie das Spanning-Tree-Protokoll Schleifen in lokalen Netzwerken verhindert.

##### Die Ursprünge des Programmierens erklären

[explainTheOriginsOfProgramming.data.ts](../../../content/informatics/data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

**Methodological description (English):** Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.

**User-friendly description (de):** Entdecke, wie frühe Maschinenentwürfe und Ada Lovelaces Arbeit das Programmieren vorwegnahmen.

#### Maschinen und Kryptoanalyse

Skills: 3

[machinesAndCryptanalysis.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

**Methodological description (English):** The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.

**User-friendly description (de):** Entdecke, wie Maschinen und mathematische Methoden die historische Kryptoanalyse unterstützten.

##### Historische Kryptoanalyseverfahren erklären

[explainHistoricalCryptanalysisMethods.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

**Methodological description (English):** Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.

**User-friendly description (de):** Entdecke, wie Kryptoanalytiker Muster und systematische Tests nutzten, um Codes zu knacken.

##### Die Entwicklung programmierbarer Computer erklären

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

**Methodological description (English):** Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.

**User-friendly description (de):** Verfolge die Entwicklung von mechanischen Rechenideen zu programmierbaren elektronischen Maschinen.

##### Den Zweck der Bombe erklären

[explainThePurposeOfTheBombe.data.ts](../../../content/informatics/data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

**Methodological description (English):** The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.

**User-friendly description (de):** Verstehe, wie die Bombe mögliche Enigma-Einstellungen überprüfte.

### Informationen und Daten

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../../content/informatics/data/skills/informationAndData/informationAndData.data.ts)

**Methodological description (English):** Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.

**User-friendly description (de):** Erkunde, wie du verlässliche Informationen findest, Daten ordnest und über Unsicherheit nachdenkst.

#### Datenerhebung und -organisation

Skills: 4

[dataCollectionAndOrganization.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

**Methodological description (English):** Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.

**User-friendly description (de):** Lerne, relevante Informationen zu sammeln und vergleichbare Datensätze zu ordnen.

##### Daten einheitlich erfassen

[collectDataConsistently.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

**Methodological description (English):** Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.

**User-friendly description (de):** Erfasse Messungen nach einheitlichen Regeln und mit gleichen Einheiten.

##### Daten nach Merkmal gruppieren

[groupDataByAttribute.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

**Methodological description (English):** Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.

**User-friendly description (de):** Gruppiere Datensätze anhand eines klaren Merkmals.

##### Benötigte Daten für eine Aufgabe bestimmen

[identifyDataNeededForATask.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

**Methodological description (English):** Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.

**User-friendly description (de):** Entscheide, welche Felder und Beobachtungen eine Frage tatsächlich verlangt.

##### Daten in einer Tabelle darstellen

[presentDataInATable.data.ts](../../../content/informatics/data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

**Methodological description (English):** Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.

**User-friendly description (de):** Erstelle eine Tabelle mit beschrifteten Zeilen, Spalten und einheitlichen Werten.

#### Datenbanken

Skills: 5

[databases.data.ts](../../../content/informatics/data/skills/informationAndData/databases/databases.data.ts)

**Methodological description (English):** Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.

**User-friendly description (de):** Entdecke, wie Datenbanken Datensätze strukturieren und zusammengehörige Informationen verbinden.

##### Ein einfaches Datenbankschema entwerfen

[designASimpleDatabaseSchema.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

**Methodological description (English):** Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.

**User-friendly description (de):** Plane eine einfache Datenbank mit geeigneten Entitäten, Feldern und Verknüpfungen.

##### Datensätze und Felder unterscheiden

[distinguishRecordsAndFields.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

**Methodological description (English):** Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.

**User-friendly description (de):** Unterscheide einen Datensatz von den Feldern, die ihn beschreiben.

##### Eine Datenbanktabelle erklären

[explainADatabaseTable.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

**Methodological description (English):** Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.

**User-friendly description (de):** Verstehe, wie eine Tabelle gleichartige Datensätze speichert.

##### Primärschlüssel erklären

[explainPrimaryKeys.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

**Methodological description (English):** Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.

**User-friendly description (de):** Erkläre, warum eine Datenbank für jeden Datensatz einen stabilen eindeutigen Schlüssel braucht.

##### Beziehungen zwischen Tabellen modellieren

[modelRelationshipsBetweenTables.data.ts](../../../content/informatics/data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

**Methodological description (English):** Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.

**User-friendly description (de):** Verbinde Informationen aus verschiedenen Tabellen über Kennungen.

#### Informationssuche und Überprüfung

Skills: 4

[informationSearchAndVerification.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

**Methodological description (English):** Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.

**User-friendly description (de):** Lerne, Belege zu suchen und zu prüfen, ob eine Behauptung gestützt wird.

##### Informationsquellen vergleichen

[compareInformationSources.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

**Methodological description (English):** Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.

**User-friendly description (de):** Vergleiche mehrere Quellen und erkenne, wo sich ihre Darstellungen widersprechen.

##### Nachrichten von Daten unterscheiden

[distinguishMessagesFromData.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

**Methodological description (English):** Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.

**User-friendly description (de):** Unterscheide einen erfassten Wert von der Bedeutung, die eine Nachricht ihm gibt.

##### Eine Suchanfrage formulieren

[formulateAnInformationQuery.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

**Methodological description (English):** Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.

**User-friendly description (de):** Wähle genaue Suchbegriffe, die zu deinem Informationsbedarf passen.

##### Eine Behauptung anhand einer Quelle prüfen

[verifyAClaimAgainstASource.data.ts](../../../content/informatics/data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

**Methodological description (English):** Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.

**User-friendly description (de):** Prüfe eine Behauptung mit geeigneten Belegen, statt wiederholten Aussagen zu vertrauen.

#### Wahrscheinlichkeit und Unsicherheit

Skills: 7

[probabilityAndUncertainty.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

**Methodological description (English):** Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.

**User-friendly description (de):** Erkunde mögliche Ereignisse, ihre Chancen und die Grenzen von Vorhersagen.

##### Wahrscheinlichkeiten einfacher Ereignisse vergleichen

[compareProbabilitiesOfSimpleEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

**Methodological description (English):** Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.

**User-friendly description (de):** Vergleiche die Chancen zweier Ergebnisse unter denselben Annahmen.

##### Möglichkeit und Wahrscheinlichkeit unterscheiden

[distinguishPossibilityFromProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

**Methodological description (English):** Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.

**User-friendly description (de):** Verstehe, warum ein mögliches Ereignis nicht unbedingt wahrscheinlich ist.

##### Zufällige und deterministische Ereignisse unterscheiden

[distinguishRandomAndDeterministicEvents.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

**Methodological description (English):** Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.

**User-friendly description (de):** Unterscheide regelbestimmte Ergebnisse von zufällig ausgewählten Ergebnissen.

##### Die Möglichkeit eines Ereignisses erklären

[explainEventPossibility.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

**Methodological description (English):** Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.

**User-friendly description (de):** Entscheide, ob ein Ergebnis unter gegebenen Bedingungen eintreten kann.

##### Die Wahrscheinlichkeit eines Ereignisses erklären

[explainEventProbability.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

**Methodological description (English):** Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.

**User-friendly description (de):** Schätze die Chance eines Ereignisses anhand eines angegebenen Wahrscheinlichkeitsmodells.

##### Grenzen der Vorhersage erklären

[explainLimitsOfPrediction.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

**Methodological description (English):** Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.

**User-friendly description (de):** Erkläre, warum bekannte Wahrscheinlichkeiten das Ergebnis eines einzelnen Versuchs nicht vorhersagen.

##### Zufall in einem Modell einsetzen

[useRandomnessInAModel.data.ts](../../../content/informatics/data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

**Methodological description (English):** Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.

**User-friendly description (de):** Füge einem Modell zufällige Auswahl hinzu und lege fest, welche Ergebnisse auftreten können.

#### Statistische Untersuchung

Skills: 4

[statisticalInvestigation.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

**Methodological description (English):** Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.

**User-friendly description (de):** Lerne, Daten anhand von Diagrammen, Häufigkeiten und Vergleichen zu untersuchen.

##### Beobachtungssätze vergleichen

[compareSetsOfObservations.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

**Methodological description (English):** Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.

**User-friendly description (de):** Vergleiche zwei Datensätze anhand derselben Messgrößen oder Kategorien.

##### Ein einfaches Diagramm erstellen

[constructASimpleChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

**Methodological description (English):** Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.

**User-friendly description (de):** Erstelle ein klares Diagramm, das Datenverhältnisse richtig wiedergibt.

##### Den häufigsten Wert finden

[findTheMostFrequentValue.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

**Methodological description (English):** Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.

**User-friendly description (de):** Bestimme den Wert, der in einer Menge am häufigsten vorkommt.

##### Ein Diagramm lesen

[readAChart.data.ts](../../../content/informatics/data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

**Methodological description (English):** Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.

**User-friendly description (de):** Lies Skalen, Beschriftungen und Werte, ohne dich von der Darstellung täuschen zu lassen.

### Programmierung

Groups: 8 · Skills: 37

[programming.data.ts](../../../content/informatics/data/skills/programming/programming.data.ts)

**Methodological description (English):** Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.

**User-friendly description (de):** Lerne, Anweisungen zu verstehen, zu schreiben und zu testen, die ein Computer ausführt.

#### Datentypen und Referenzen

Skills: 6

[dataTypesAndReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

**Methodological description (English):** Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.

**User-friendly description (de):** Erkunde, wie Typen und Referenzen beeinflussen, welche Werte Programme verwenden können.

##### Wertkopien von gemeinsam genutzten Referenzen unterscheiden

[distinguishValueCopyingFromSharedReferences.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

**Methodological description (English):** In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.

**User-friendly description (de):** Erkläre, wann zwei Variablen dasselbe Objekt referenzieren und wann ihre Werte unabhängig sind.

##### Wertetypen unterscheiden

[distinguishValueTypes.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

**Methodological description (English):** Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.

**User-friendly description (de):** Erkenne, ob ein Wert eine Zahl, Text oder ein boolescher Wert ist und was damit möglich ist.

##### Einen Datentypvertrag erklären

[explainADataTypeContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

**Methodological description (English):** Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.

**User-friendly description (de):** Verstehe, welche Art von Wert eine Programmfunktion als Eingabe erwartet.

##### Zusammengesetzte Datenstrukturen erklären

[explainCompositeDataStructures.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

**Methodological description (English):** Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.

**User-friendly description (de):** Erkenne Listen, Arrays und Datensätze, die mehrere Werte strukturieren.

##### Primitive Werte einer Programmiersprache erklären

[explainPrimitiveValuesInALanguage.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

**Methodological description (English):** Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.

**User-friendly description (de):** Erkenne die einfachen Werttypen, die eine bestimmte Programmiersprache definiert.

##### Daten gegen einen Vertrag prüfen

[validateDataAgainstAContract.data.ts](../../../content/informatics/data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

**Methodological description (English):** Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.

**User-friendly description (de):** Prüfe vor der Verwendung, ob eine Eingabe dem geforderten Typ oder der Struktur entspricht.

#### Funktionen und Wiederverwendung

Skills: 5

[functionsAndReuse.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

**Methodological description (English):** Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.

**User-friendly description (de):** Lerne, wiederverwendbare Abläufe als Funktionen zu organisieren.

##### Eine Funktion mit Argumenten aufrufen

[callAFunctionWithArguments.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

**Methodological description (English):** Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.

**User-friendly description (de):** Rufe eine Funktion mit Argumenten auf und verfolge, wie diese verwendet werden.

##### Eine Funktion mit Parametern definieren

[defineAFunctionWithParameters.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

**Methodological description (English):** Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.

**User-friendly description (de):** Schreibe eine Funktion, die Parameter statt fester Beispielwerte annimmt.

##### Rekursion erklären

[explainRecursion.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

**Methodological description (English):** Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.

**User-friendly description (de):** Verstehe, wie eine rekursive Funktion kleinere Fälle löst und schließlich endet.

##### Den Zweck einer Funktion erklären

[explainThePurposeOfAFunction.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

**Methodological description (English):** Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.

**User-friendly description (de):** Erkläre, wie eine benannte Funktion beim Aufruf eine Aufgabe ausführt.

##### Den Rückgabewert einer Funktion verwenden

[useAFunctionsReturnValue.data.ts](../../../content/informatics/data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

**Methodological description (English):** Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.

**User-friendly description (de):** Nutze das zurückgegebene Ergebnis für weitere Berechnungen, statt es nur anzuzeigen.

#### Programmdaten

Skills: 3

[programData.data.ts](../../../content/informatics/data/skills/programming/programData/programData.data.ts)

**Methodological description (English):** Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.

**User-friendly description (de):** Arbeite mit Werten und Zuständen, die sich während der Programmausführung verändern.

##### Den Programmzustand aktualisieren

[updateProgramState.data.ts](../../../content/informatics/data/skills/programming/programData/skills/updateProgramState.data.ts)

**Methodological description (English):** Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.

**User-friendly description (de):** Ändere den gespeicherten Programmzustand anhand dessen, was zuvor geschehen ist.

##### Eine Variable verwenden

[useAVariable.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useAVariable.data.ts)

**Methodological description (English):** Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.

**User-friendly description (de):** Speichere einen Wert unter einem Variablennamen und lies ihn bei Bedarf aus.

##### Eingabedaten verwenden

[useInputData.data.ts](../../../content/informatics/data/skills/programming/programData/skills/useInputData.data.ts)

**Methodological description (English):** Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.

**User-friendly description (de):** Nutze Informationen von außerhalb des Programms, um sein Verhalten zu bestimmen.

#### Programmstruktur und Syntax

Skills: 4

[programStructureAndSyntax.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

**Methodological description (English):** The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.

**User-friendly description (de):** Lerne, wie Programmiersprachen Schlüsselwörter, Ausdrücke und Blöcke gliedern.

##### Schlüsselwörter von Bezeichnern unterscheiden

[distinguishKeywordsFromIdentifiers.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

**Methodological description (English):** Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.

**User-friendly description (de):** Unterscheide reservierte Schlüsselwörter der Sprache von frei gewählten Namen.

##### Operatoren, Ausdrücke und Anweisungen unterscheiden

[distinguishOperatorsExpressionsAndStatements.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

**Methodological description (English):** Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.

**User-friendly description (de):** Erkenne den Unterschied zwischen Operatoren, Ausdrücken und Anweisungen.

##### Grenzen von Anweisungsblöcken erklären

[explainStatementBlockBoundaries.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

**Methodological description (English):** Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.

**User-friendly description (de):** Finde heraus, welche Befehle zu einer Schleife, Funktion oder Bedingung gehören.

##### Syntaxhervorhebung erklären

[explainSyntaxHighlighting.data.ts](../../../content/informatics/data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

**Methodological description (English):** Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.

**User-friendly description (de):** Verstehe, was die farbliche Hervorhebung von Code zeigt und was sie nicht beweist.

#### Programmierkonstrukte

Skills: 7

[programmingConstructs.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

**Methodological description (English):** Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.

**User-friendly description (de):** Lerne, Programme mit Abläufen, Bedingungen, Schleifen und Ereignissen zu steuern.

##### Eine Endlosschleife erkennen

[detectAnInfiniteLoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

**Methodological description (English):** Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.

**User-friendly description (de):** Finde eine Schleife, die nicht endet, weil ihre Bedingung nie falsch wird.

##### Ein Ereignis behandeln

[handleAnEvent.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

**Methodological description (English):** Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.

**User-friendly description (de):** Lass ein Programm reagieren, wenn eine Schaltfläche, eine Nachricht oder ein anderes Ereignis ausgelöst wird.

##### Eine Schleife implementieren

[implementALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

**Methodological description (English):** Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.

**User-friendly description (de):** Verwende Schleifen, um Anweisungen bis zur passenden Abbruchbedingung zu wiederholen.

##### Bedingtes Verhalten implementieren

[implementConditionalBehavior.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

**Methodological description (English):** Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.

**User-friendly description (de):** Sorge dafür, dass ein Programm bei anderen Bedingungen andere Aktionen auswählt.

##### Schleifeninvariante Berechnungen auslagern

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

**Methodological description (English):** Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.

**User-friendly description (de):** Verschiebe Berechnungen aus Schleifen, wenn sich ihre Ergebnisse beim Wiederholen nicht ändern.

##### Überlappende Bedingungsprüfungen anordnen

[orderOverlappingConditionalChecks.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

**Methodological description (English):** In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.

**User-friendly description (de):** Ordne Bedingungen so, dass auch spezielle Fälle erreicht werden können.

##### Eine Befehlsfolge schreiben

[writeASequenceOfCommands.data.ts](../../../content/informatics/data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

**Methodological description (English):** Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.

**User-friendly description (de):** Schreibe gültige Befehle, die Aktionen in der vorgesehenen Reihenfolge ausführen.

#### Programmierparadigmen

Skills: 4

[programmingParadigms.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

**Methodological description (English):** Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.

**User-friendly description (de):** Entdecke verschiedene Arten, Programmlogik und -verhalten zu organisieren.

##### Imperative und deklarative Ansätze unterscheiden

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

**Methodological description (English):** Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.

**User-friendly description (de):** Vergleiche konkrete Handlungsanweisungen mit der Beschreibung eines gewünschten Ergebnisses.

##### Funktionale Programmierung erklären

[explainFunctionalProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

**Methodological description (English):** Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.

**User-friendly description (de):** Verstehe Programme, die Werte durch die Kombination von Funktionen umwandeln.

##### Objektorientierte Programmierung erklären

[explainObjectOrientedProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

**Methodological description (English):** Organize a program around interacting objects with state and methods, rather than as a list of global procedures.

**User-friendly description (de):** Erkunde Programme aus miteinander interagierenden Objekten mit Zustand und Verhalten.

##### Prozedurale Programmierung erklären

[explainProceduralProgramming.data.ts](../../../content/informatics/data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

**Methodological description (English):** Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.

**User-friendly description (de):** Erkunde Programme, die um schrittweise Abläufe organisiert sind.

#### Programme lesen

Skills: 4

[readingPrograms.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/readingPrograms.data.ts)

**Methodological description (English):** Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.

**User-friendly description (de):** Entdecke, wie du ein Programm liest und nachvollziehst, was es tut.

##### Den Zweck eines Befehls erklären

[explainACommandsPurpose.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

**Methodological description (English):** Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.

**User-friendly description (de):** Erkläre, was ein einzelner Programmierbefehl am Programmzustand verändert.

##### Folgen der Ausführungsreihenfolge vorhersagen

[predictConsequencesOfExecutionOrder.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

**Methodological description (English):** Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.

**User-friendly description (de):** Erkläre, warum eine andere Reihenfolge von Befehlen das Ergebnis verändern kann.

##### Die Programmausgabe vorhersagen

[predictProgramOutput.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

**Methodological description (English):** Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.

**User-friendly description (de):** Finde heraus, welches sichtbare Ergebnis ein Programm für bestimmte Eingaben erzeugt.

##### Den Programmzustand verfolgen

[traceProgramState.data.ts](../../../content/informatics/data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

**Methodological description (English):** Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.

**User-friendly description (de):** Verfolge, wie sich Variablen und andere Werte während der Ausführung verändern.

#### Testen und Debuggen

Skills: 4

[testingAndDebugging.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

**Methodological description (English):** Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.

**User-friendly description (de):** Entdecke, wie du Fehler in Programmen findest, erklärst und behebst.

##### Fehlerhaftes Programmverhalten erkennen

[detectIncorrectProgramBehavior.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

**Methodological description (English):** Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.

**User-friendly description (de):** Erkenne, wann sich ein Programm anders verhält als gefordert.

##### Einen Programmfehler beheben

[fixAProgramDefect.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

**Methodological description (English):** Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.

**User-friendly description (de):** Behebe einen bestimmten Fehler und prüfe, ob das geforderte Verhalten weiter funktioniert.

##### Die Ursache eines Fehlers finden

[locateTheCauseOfAnError.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

**Methodological description (English):** Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.

**User-friendly description (de):** Verfolge einen Programmfehler bis zu der Anweisung oder Bedingung, die ihn auslöst.

##### Ein Programm mit verschiedenen Eingaben testen

[testAProgramWithDifferentInputs.data.ts](../../../content/informatics/data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

**Methodological description (English):** Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.

**User-friendly description (de):** Teste das Programm mit unterschiedlichen Eingaben, einschließlich Grenzfällen.

### Robotik und Automatisierung

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

**Methodological description (English):** Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.

**User-friendly description (de):** Erkunde, wie Sensoren, Programme und Aktoren Roboter auf ihre Umgebung reagieren lassen.

#### Robotersteuerung

Skills: 4

[robotControl.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

**Methodological description (English):** Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.

**User-friendly description (de):** Erstelle und verbessere Anweisungen für Bewegungen und Reaktionen eines Roboters.

##### Eine wiederholte Roboteraktion einstellen

[configureARepeatedRobotAction.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

**Methodological description (English):** Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.

**User-friendly description (de):** Lege fest, wie oft der Roboter eine Aktion wiederholt oder wann er anhalten soll.

##### Eine Bewegungsfolge für einen Roboter erstellen

[createARobotMovementSequence.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

**Methodological description (English):** Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.

**User-friendly description (de):** Plane geordnete Bewegungsbefehle, die einen Roboter ans Ziel führen.

##### Roboterverhalten debuggen

[debugRobotBehavior.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

**Methodological description (English):** Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.

**User-friendly description (de):** Finde heraus, ob unerwartetes Verhalten auf Sensorik, Steuerlogik oder Aktion zurückgeht.

##### Die Hindernisreaktion eines Roboters umsetzen

[implementRobotObstacleResponse.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

**Methodological description (English):** Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.

**User-friendly description (de):** Lass einen Roboter anhalten, abbiegen oder ausweichen, wenn ein Sensor ein Hindernis erkennt.

#### Komponenten von Robotersystemen

Skills: 4

[roboticSystemComponents.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

**Methodological description (English):** Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.

**User-friendly description (de):** Erfahre, wie ein Roboter Zustände erkennt, Entscheidungen trifft und handelt.

##### Eine Robotersteuerung erkennen

[identifyARobotController.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

**Methodological description (English):** Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.

**User-friendly description (de):** Erkenne den Controller, der Sensordaten in programmierte Aktionen umsetzt.

##### Den Zweck eines Sensors erkennen

[identifyASensorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

**Methodological description (English):** Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.

**User-friendly description (de):** Erkenne Sensoren, die Licht, Abstand, Temperatur oder andere Größen messen.

##### Die Aufgabe eines Aktors erkennen

[identifyAnActuatorsPurpose.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

**Methodological description (English):** Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.

**User-friendly description (de):** Erkläre, wie Motoren, Lampen und andere Aktoren Befehle ausführen.

##### Den Zusammenhang zwischen Sensor und Aktion modellieren

[modelTheSensorToActionRelationship.data.ts](../../../content/informatics/data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

**Methodological description (English):** Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.

**User-friendly description (de):** Verbinde eine Sensormessung, eine Entscheidungsregel und die Reaktion eines Aktors.

### Softwarearchitektur

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../../content/informatics/data/skills/softwareArchitecture/softwareArchitecture.data.ts)

**Methodological description (English):** Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.

**User-friendly description (de):** Erkunde, wie Objekte, Verantwortlichkeiten und Abhängigkeiten zuverlässige Software strukturieren.

#### Entwurfsprinzipien

Skills: 8

[designPrinciples.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

**Methodological description (English):** Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.

**User-friendly description (de):** Lerne Prinzipien kennen, die Software verständlich und anpassbar halten.

##### Unnötige Funktionen aufschieben (YAGNI)

[deferUnnecessaryFeaturesYAGNI.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

**Methodological description (English):** Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.

**User-friendly description (de):** Vermeide Funktionen, die nur für erdachte künftige Möglichkeiten gedacht sind.

##### Abhängigkeiten auf Verträge ausrichten (DIP)

[designDependenciesOnContractsDIP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

**Methodological description (English):** Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.

**User-friendly description (de):** Trenne Geschäftslogik von konkreten Diensten durch Abhängigkeit von Verträgen.

##### Verhalten erweitern, ohne den Kern zu ändern (OCP)

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

**Methodological description (English):** Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.

**User-friendly description (de):** Entwirf Erweiterungspunkte für neues Verhalten, ohne stabile Kernlogik umzuschreiben.

##### Unnötige Wiederholungen erkennen (DRY)

[identifyUnnecessaryDuplicationDRY.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

**Methodological description (English):** Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.

**User-friendly description (de):** Finde doppelte Regeln, die später widersprüchliche Änderungen verursachen könnten.

##### Eine einzige Verantwortung isolieren (SRP)

[isolateASingleResponsibilitySRP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

**Methodological description (English):** Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.

**User-friendly description (de):** Organisiere ein Modul um einen einzigen zusammenhängenden Änderungsgrund.

##### Unnötige Komplexität verringern (KISS)

[reduceUnnecessaryComplexityKISS.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

**Methodological description (English):** Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.

**User-friendly description (de):** Vereinfache Software, indem du nicht benötigte Mechanismen entfernst.

##### Schmale Schnittstellen trennen (ISP)

[separateNarrowInterfacesISP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

**Methodological description (English):** Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.

**User-friendly description (de):** Halte Schnittstellen so klein, dass Nutzer nur die benötigten Operationen kennen müssen.

##### Austauschbarkeit prüfen (LSP)

[verifySubstitutabilityLSP.data.ts](../../../content/informatics/data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

**Methodological description (English):** Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.

**User-friendly description (de):** Prüfe, ob eine Implementierung die Zusagen eines gemeinsamen Vertrags erfüllt.

#### Objektmodell

Skills: 13

[objectModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

**Methodological description (English):** Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.

**User-friendly description (de):** Entdecke, wie Softwareobjekte Zustand und Verhalten verbinden.

##### Objektabstraktion anwenden

[applyObjectAbstraction.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

**Methodological description (English):** Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.

**User-friendly description (de):** Wähle die wesentlichen Operationen aus, die eine Komponente ihren Nutzern zeigen sollte.

##### Klasse und Objekt unterscheiden

[distinguishAClassFromAnObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

**Methodological description (English):** Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.

**User-friendly description (de):** Unterscheide die Vorlage einer Klasse von Objekten mit jeweils eigenen aktuellen Werten.

##### Ein reales Objekt vom abstrakten Modell unterscheiden

[distinguishARealObjectFromItsAbstractModel.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

**Methodological description (English):** Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.

**User-friendly description (de):** Erkenne, dass ein Softwaremodell nur ausgewählte Merkmale einer Sache darstellt.

##### Eine Objektmethode erklären

[explainAnObjectMethod.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

**Methodological description (English):** Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.

**User-friendly description (de):** Erkläre, wie der Aufruf einer Methode den Zustand eines Objekts lesen oder ändern kann.

##### Eine Objekteigenschaft erklären

[explainAnObjectProperty.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

**Methodological description (English):** Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.

**User-friendly description (de):** Unterscheide eine gespeicherte Eigenschaft von den Operationen eines Objekts.

##### Kapselung erklären

[explainEncapsulation.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

**Methodological description (English):** Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.

**User-friendly description (de):** Verstehe, wie Objekte ihren internen Zustand durch kontrollierte Methoden schützen.

##### Vererbung erklären

[explainInheritance.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

**Methodological description (English):** Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.

**User-friendly description (de):** Erkläre, wie eine spezialisierte Klasse Verhalten einer allgemeineren Klasse erben kann.

##### Polymorphie erklären

[explainPolymorphism.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

**Methodological description (English):** Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.

**User-friendly description (de):** Erkenne, wie verschiedene Objekte dieselbe Operation unterschiedlich ausführen können.

##### Das Konzept einer Klasse erklären

[explainTheConceptOfAClass.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

**Methodological description (English):** Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.

**User-friendly description (de):** Verstehe eine Klasse als Definition, aus der einzelne Objekte entstehen.

##### Aufbau eines Softwareobjekts erklären

[explainTheStructureOfASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

**Methodological description (English):** Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.

**User-friendly description (de):** Bestimme Identität, Eigenschaften und Methoden eines vorhandenen Softwareobjekts.

##### Zustand und Verhalten eines Objekts erkennen

[identifyAnObjectsStateAndBehavior.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

**Methodological description (English):** Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.

**User-friendly description (de):** Beschreibe die Eigenschaften eines Objekts und was es tun kann.

##### Eine Fachentität als Softwareobjekt modellieren

[modelADomainEntityAsASoftwareObject.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

**Methodological description (English):** Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.

**User-friendly description (de):** Entwirf ein nützliches Objekt mit relevanten Eigenschaften und Operationen.

##### Objektkomposition modellieren

[modelObjectComposition.data.ts](../../../content/informatics/data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

**Methodological description (English):** Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.

**User-friendly description (de):** Baue größere Softwareobjekte aus kleineren Teilen mit unterschiedlichen Aufgaben auf.

