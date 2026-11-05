# Informatics — Skills Taxonomy

Date: 2026-10-29

Subject scope: computational thinking, algorithms and programming, digital systems and networks, information and data, software architecture, design patterns, AI, robotics, digital safety, digital UX, and digital creativity. The scope follows `studio/Subject Proposition.md`, including agreed expansions, with reference to Ukrainian and international subject standards. This audience-independent taxonomy contains no grades, ages, lessons, individual assessments, tasks, scores, or personal learning outcomes. Skills belong to this textbook: related competencies may also exist independently in other textbooks, without requiring shared identifiers or cross-textbook analytics.

## SUMMARY

Domains: 15
Groups: 65
Skills: 311

Code files: 0/15 Domains · 0/65 Groups · 0/311 Skills

## DOMAINS

### Computational Thinking

Slug: computationalThinking
Action: create
Status: implemented

Groups: 2 · Skills: 12

[computationalThinking.data.ts](../../data/skills/computationalThinking/computationalThinking.data.ts)

Methodological description: Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.
User-friendly description: Explore how to break complex problems into clear steps, patterns and rules.

#### Decomposition and Abstraction

Slug: decompositionAndAbstraction
Action: create
Status: implemented

Skills: 4

[decompositionAndAbstraction.data.ts](../../data/skills/computationalThinking/decompositionAndAbstraction/decompositionAndAbstraction.data.ts)

Methodological description: Defining a problem's boundaries by breaking it into subproblems, identifying meaningful characteristics, and constructing a simplified model. These operations precede selecting a specific algorithm or class structure.
User-friendly description: Learn to simplify problems by identifying their essential parts and relationships.

##### Decompose a Problem

Slug: decomposeAProblem
Action: create
Status: implemented

[decomposeAProblem.data.ts](../../data/skills/computationalThinking/decompositionAndAbstraction/skills/decomposeAProblem.data.ts)

Methodological description: Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.
User-friendly description: Break a large problem into smaller tasks that can be solved separately.

##### Identify Essential Object Properties

Slug: identifyEssentialObjectProperties
Action: create
Status: implemented

[identifyEssentialObjectProperties.data.ts](../../data/skills/computationalThinking/decompositionAndAbstraction/skills/identifyEssentialObjectProperties.data.ts)

Methodological description: Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.
User-friendly description: Choose the details that matter for a task and set irrelevant details aside.

##### Build an Abstract System Model

Slug: buildAnAbstractSystemModel
Action: create
Status: implemented

[buildAnAbstractSystemModel.data.ts](../../data/skills/computationalThinking/decompositionAndAbstraction/skills/buildAnAbstractSystemModel.data.ts)

Methodological description: Represent a complex situation with a simplified account of the elements, states, and relationships needed to investigate a question. For example, connections between rooms can be modeled as a graph without recreating each room's interior.
User-friendly description: Create a simplified representation of a complex situation or system.

##### Generalize a Repeated Method

Slug: generalizeARepeatedMethod
Action: create
Status: implemented

[generalizeARepeatedMethod.data.ts](../../data/skills/computationalThinking/decompositionAndAbstraction/skills/generalizeARepeatedMethod.data.ts)

Methodological description: Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.
User-friendly description: Find a reusable method shared by several specific problems.

#### Logic and Patterns

Slug: logicAndPatterns
Action: create
Status: implemented

Skills: 8

[logicAndPatterns.data.ts](../../data/skills/computationalThinking/logicAndPatterns/logicAndPatterns.data.ts)

Methodological description: Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.
User-friendly description: Discover how rules, patterns and logical conditions support problem solving.

##### Recognize a Pattern

Slug: recognizeAPattern
Action: create
Status: implemented

[recognizeAPattern.data.ts](../../data/skills/computationalThinking/logicAndPatterns/skills/recognizeAPattern.data.ts)

Methodological description: Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.
User-friendly description: Recognize patterns in sequences and check whether a proposed rule fits.

##### Predict an Outcome from a Rule

Slug: predictAnOutcomeFromARule
Action: create
Status: implemented

[predictAnOutcomeFromARule.data.ts](../../data/skills/computationalThinking/logicAndPatterns/skills/predictAnOutcomeFromARule.data.ts)

Methodological description: Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.
User-friendly description: Work out what happens next when a rule and starting state are known.

##### Evaluate a Simple Condition

Slug: evaluateASimpleCondition
Action: create
Status: implemented

[evaluateASimpleCondition.data.ts](../../data/skills/computationalThinking/logicAndPatterns/skills/evaluateASimpleCondition.data.ts)

Methodological description: Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.
User-friendly description: Decide whether a single condition is true, false or cannot yet be determined.

##### Apply Logical AND

Slug: applyLogicalAND
Action: create
Status: implemented

[applyLogicalAND.data.ts](../../data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalAND.data.ts)

Methodological description: Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.
User-friendly description: Use AND to check whether two requirements are both satisfied.

##### Apply Logical OR

Slug: applyLogicalOR
Action: create
Status: implemented

[applyLogicalOR.data.ts](../../data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalOR.data.ts)

Methodological description: Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.
User-friendly description: Use OR to check whether at least one of two conditions is satisfied.

##### Apply Logical NOT

Slug: applyLogicalNOT
Action: create
Status: implemented

[applyLogicalNOT.data.ts](../../data/skills/computationalThinking/logicAndPatterns/skills/applyLogicalNOT.data.ts)

Methodological description: Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.
User-friendly description: Use NOT to reverse the truth value of a condition.

##### Evaluate Compound Logical Expressions

Slug: evaluateCompoundLogicalExpressions
Action: create
Status: implemented

[evaluateCompoundLogicalExpressions.data.ts](../../data/skills/computationalThinking/logicAndPatterns/skills/evaluateCompoundLogicalExpressions.data.ts)

Methodological description: Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.
User-friendly description: Evaluate logical expressions with several operators in the right order.

##### Detect Contradictory Rules

Slug: detectContradictoryRules
Action: create
Status: implemented

[detectContradictoryRules.data.ts](../../data/skills/computationalThinking/logicAndPatterns/skills/detectContradictoryRules.data.ts)

Methodological description: Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.
User-friendly description: Recognize when two requirements cannot both be true.

### Programming

Slug: programming
Action: create
Status: implemented

Groups: 8 · Skills: 37

[programming.data.ts](../../data/skills/programming/programming.data.ts)

Methodological description: Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.
User-friendly description: Learn to understand, write and test instructions that a computer executes.

#### Reading Programs

Slug: readingPrograms
Action: create
Status: implemented

Skills: 4

[readingPrograms.data.ts](../../data/skills/programming/readingPrograms/readingPrograms.data.ts)

Methodological description: Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.
User-friendly description: Discover how to read a program and follow what it does.

##### Explain a Command's Purpose

Slug: explainACommandsPurpose
Action: create
Status: implemented

[explainACommandsPurpose.data.ts](../../data/skills/programming/readingPrograms/skills/explainACommandsPurpose.data.ts)

Methodological description: Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.
User-friendly description: Explain what an individual programming command does to a program's state.

##### Trace Program State

Slug: traceProgramState
Action: create
Status: implemented

[traceProgramState.data.ts](../../data/skills/programming/readingPrograms/skills/traceProgramState.data.ts)

Methodological description: Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.
User-friendly description: Follow changes to variables and other values while a program runs.

##### Predict Program Output

Slug: predictProgramOutput
Action: create
Status: implemented

[predictProgramOutput.data.ts](../../data/skills/programming/readingPrograms/skills/predictProgramOutput.data.ts)

Methodological description: Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.
User-friendly description: Work out the visible result a program will produce for given inputs.

##### Predict Consequences of Execution Order

Slug: predictConsequencesOfExecutionOrder
Action: create
Status: implemented

[predictConsequencesOfExecutionOrder.data.ts](../../data/skills/programming/readingPrograms/skills/predictConsequencesOfExecutionOrder.data.ts)

Methodological description: Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.
User-friendly description: Explain why changing the order of commands can change the result.

#### Programming Constructs

Slug: programmingConstructs
Action: create
Status: implemented

Skills: 7

[programmingConstructs.data.ts](../../data/skills/programming/programmingConstructs/programmingConstructs.data.ts)

Methodological description: Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.
User-friendly description: Learn to control programs using sequences, conditions, loops and events.

##### Write a Sequence of Commands

Slug: writeASequenceOfCommands
Action: create
Status: implemented

[writeASequenceOfCommands.data.ts](../../data/skills/programming/programmingConstructs/skills/writeASequenceOfCommands.data.ts)

Methodological description: Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.
User-friendly description: Write valid commands that perform actions in the intended order.

##### Implement Conditional Behavior

Slug: implementConditionalBehavior
Action: create
Status: implemented

[implementConditionalBehavior.data.ts](../../data/skills/programming/programmingConstructs/skills/implementConditionalBehavior.data.ts)

Methodological description: Write a Boolean test and the corresponding executable branches, ensuring that the intended branch runs for each anticipated condition value.
User-friendly description: Make a program choose different actions when conditions change.

##### Implement a Loop

Slug: implementALoop
Action: create
Status: implemented

[implementALoop.data.ts](../../data/skills/programming/programmingConstructs/skills/implementALoop.data.ts)

Methodological description: Express repeated instructions using a counter or termination condition and correctly update state between iterations. An instruction repeats by rule rather than through manual duplication.
User-friendly description: Use loops to repeat instructions until the right stopping point.

##### Handle an Event

Slug: handleAnEvent
Action: create
Status: implemented

[handleAnEvent.data.ts](../../data/skills/programming/programmingConstructs/skills/handleAnEvent.data.ts)

Methodological description: Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.
User-friendly description: Make a program respond when a button, message or another event occurs.

##### Detect an Infinite Loop

Slug: detectAnInfiniteLoop
Action: create
Status: implemented

[detectAnInfiniteLoop.data.ts](../../data/skills/programming/programmingConstructs/skills/detectAnInfiniteLoop.data.ts)

Methodological description: Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.
User-friendly description: Find a loop that cannot stop because its condition never becomes false.

##### Move Loop-Invariant Computations Outside a Loop

Slug: moveLoopInvariantComputationsOutsideALoop
Action: create
Status: implemented

[moveLoopInvariantComputationsOutsideALoop.data.ts](../../data/skills/programming/programmingConstructs/skills/moveLoopInvariantComputationsOutsideALoop.data.ts)

Methodological description: Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.
User-friendly description: Move calculations out of loops when they do not change during repetition.

##### Order Overlapping Conditional Checks

Slug: orderOverlappingConditionalChecks
Action: create
Status: implemented

[orderOverlappingConditionalChecks.data.ts](../../data/skills/programming/programmingConstructs/skills/orderOverlappingConditionalChecks.data.ts)

Methodological description: In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.
User-friendly description: Arrange conditional checks so specific cases can still be reached.

#### Program Data

Slug: programData
Action: create
Status: implemented

Skills: 3

[programData.data.ts](../../data/skills/programming/programData/programData.data.ts)

Methodological description: Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.
User-friendly description: Work with the values and changing state used by a running program.

##### Use a Variable

Slug: useAVariable
Action: create
Status: implemented

[useAVariable.data.ts](../../data/skills/programming/programData/skills/useAVariable.data.ts)

Methodological description: Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.
User-friendly description: Store a value under a variable name and read it when needed.

##### Update Program State

Slug: updateProgramState
Action: create
Status: implemented

[updateProgramState.data.ts](../../data/skills/programming/programData/skills/updateProgramState.data.ts)

Methodological description: Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.
User-friendly description: Change a program's stored state based on what happened before.

##### Use Input Data

Slug: useInputData
Action: create
Status: implemented

[useInputData.data.ts](../../data/skills/programming/programData/skills/useInputData.data.ts)

Methodological description: Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.
User-friendly description: Use information entered from outside the program to determine its behavior.

#### Testing and Debugging

Slug: testingAndDebugging
Action: create
Status: implemented

Skills: 4

[testingAndDebugging.data.ts](../../data/skills/programming/testingAndDebugging/testingAndDebugging.data.ts)

Methodological description: Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.
User-friendly description: Discover how to find, explain and correct mistakes in programs.

##### Detect Incorrect Program Behavior

Slug: detectIncorrectProgramBehavior
Action: create
Status: implemented

[detectIncorrectProgramBehavior.data.ts](../../data/skills/programming/testingAndDebugging/skills/detectIncorrectProgramBehavior.data.ts)

Methodological description: Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.
User-friendly description: Recognize when a program's behavior differs from its requirements.

##### Locate the Cause of an Error

Slug: locateTheCauseOfAnError
Action: create
Status: implemented

[locateTheCauseOfAnError.data.ts](../../data/skills/programming/testingAndDebugging/skills/locateTheCauseOfAnError.data.ts)

Methodological description: Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.
User-friendly description: Trace a programming error to the instruction or condition causing it.

##### Fix a Program Defect

Slug: fixAProgramDefect
Action: create
Status: implemented

[fixAProgramDefect.data.ts](../../data/skills/programming/testingAndDebugging/skills/fixAProgramDefect.data.ts)

Methodological description: Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.
User-friendly description: Correct a specific defect and check that the required behavior still works.

##### Test a Program with Different Inputs

Slug: testAProgramWithDifferentInputs
Action: create
Status: implemented

[testAProgramWithDifferentInputs.data.ts](../../data/skills/programming/testingAndDebugging/skills/testAProgramWithDifferentInputs.data.ts)

Methodological description: Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.
User-friendly description: Test a program using different inputs, including boundary cases.

#### Functions and Reuse

Slug: functionsAndReuse
Action: create
Status: implemented

Skills: 5

[functionsAndReuse.data.ts](../../data/skills/programming/functionsAndReuse/functionsAndReuse.data.ts)

Methodological description: Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.
User-friendly description: Learn to organize reusable operations as functions.

##### Explain the Purpose of a Function

Slug: explainThePurposeOfAFunction
Action: create
Status: implemented

[explainThePurposeOfAFunction.data.ts](../../data/skills/programming/functionsAndReuse/skills/explainThePurposeOfAFunction.data.ts)

Methodological description: Describe a function as a named operation that performs a particular action or returns a value and can be called repeatedly without rewriting its body.
User-friendly description: Explain how a named function performs an operation when called.

##### Define a Function with Parameters

Slug: defineAFunctionWithParameters
Action: create
Status: implemented

[defineAFunctionWithParameters.data.ts](../../data/skills/programming/functionsAndReuse/skills/defineAFunctionWithParameters.data.ts)

Methodological description: Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.
User-friendly description: Write a function that accepts parameters rather than fixed example values.

##### Call a Function with Arguments

Slug: callAFunctionWithArguments
Action: create
Status: implemented

[callAFunctionWithArguments.data.ts](../../data/skills/programming/functionsAndReuse/skills/callAFunctionWithArguments.data.ts)

Methodological description: Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.
User-friendly description: Call a function with arguments and follow how they are used.

##### Use a Function's Return Value

Slug: useAFunctionsReturnValue
Action: create
Status: implemented

[useAFunctionsReturnValue.data.ts](../../data/skills/programming/functionsAndReuse/skills/useAFunctionsReturnValue.data.ts)

Methodological description: Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.
User-friendly description: Use a returned result in further calculations rather than merely displaying it.

##### Explain Recursion

Slug: explainRecursion
Action: create
Status: implemented

[explainRecursion.data.ts](../../data/skills/programming/functionsAndReuse/skills/explainRecursion.data.ts)

Methodological description: Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.
User-friendly description: Understand how a recursive function solves smaller cases and eventually stops.

#### Data Types and References

Slug: dataTypesAndReferences
Action: create
Status: implemented

Skills: 6

[dataTypesAndReferences.data.ts](../../data/skills/programming/dataTypesAndReferences/dataTypesAndReferences.data.ts)

Methodological description: Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.
User-friendly description: Explore how types and references affect the values programs can use.

##### Distinguish Value Types

Slug: distinguishValueTypes
Action: create
Status: implemented

[distinguishValueTypes.data.ts](../../data/skills/programming/dataTypesAndReferences/skills/distinguishValueTypes.data.ts)

Methodological description: Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.
User-friendly description: Tell whether a value is numeric, textual or Boolean and what it can do.

##### Explain Primitive Values in a Language

Slug: explainPrimitiveValuesInALanguage
Action: create
Status: implemented

[explainPrimitiveValuesInALanguage.data.ts](../../data/skills/programming/dataTypesAndReferences/skills/explainPrimitiveValuesInALanguage.data.ts)

Methodological description: Use a selected programming language to describe simple values such as numbers, Boolean values, or text and how that language classifies them; do not assume strings are primitive in every language.
User-friendly description: Identify simple value types as defined by a chosen programming language.

##### Explain Composite Data Structures

Slug: explainCompositeDataStructures
Action: create
Status: implemented

[explainCompositeDataStructures.data.ts](../../data/skills/programming/dataTypesAndReferences/skills/explainCompositeDataStructures.data.ts)

Methodological description: Recognize arrays, lists, records, and dictionaries as organizations of several values and their relationships; separate a structure's form from its current contents.
User-friendly description: Recognize lists, arrays and records that organize multiple values.

##### Distinguish Value Copying from Shared References

Slug: distinguishValueCopyingFromSharedReferences
Action: create
Status: implemented

[distinguishValueCopyingFromSharedReferences.data.ts](../../data/skills/programming/dataTypesAndReferences/skills/distinguishValueCopyingFromSharedReferences.data.ts)

Methodological description: In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.
User-friendly description: Explain when two variables share an object and when values are independent.

##### Explain a Data Type Contract

Slug: explainADataTypeContract
Action: create
Status: implemented

[explainADataTypeContract.data.ts](../../data/skills/programming/dataTypesAndReferences/skills/explainADataTypeContract.data.ts)

Methodological description: Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.
User-friendly description: Understand the kind of value a program function expects to receive.

##### Validate Data Against a Contract

Slug: validateDataAgainstAContract
Action: create
Status: implemented

[validateDataAgainstAContract.data.ts](../../data/skills/programming/dataTypesAndReferences/skills/validateDataAgainstAContract.data.ts)

Methodological description: Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.
User-friendly description: Check whether input matches a required type or structure before using it.

#### Program Structure and Syntax

Slug: programStructureAndSyntax
Action: create
Status: implemented

Skills: 4

[programStructureAndSyntax.data.ts](../../data/skills/programming/programStructureAndSyntax/programStructureAndSyntax.data.ts)

Methodological description: The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.
User-friendly description: Learn how programming languages organize keywords, expressions and blocks.

##### Distinguish Keywords from Identifiers

Slug: distinguishKeywordsFromIdentifiers
Action: create
Status: implemented

[distinguishKeywordsFromIdentifiers.data.ts](../../data/skills/programming/programStructureAndSyntax/skills/distinguishKeywordsFromIdentifiers.data.ts)

Methodological description: Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.
User-friendly description: Distinguish language keywords from names chosen by programmers.

##### Distinguish Operators, Expressions, and Statements

Slug: distinguishOperatorsExpressionsAndStatements
Action: create
Status: implemented

[distinguishOperatorsExpressionsAndStatements.data.ts](../../data/skills/programming/programStructureAndSyntax/skills/distinguishOperatorsExpressionsAndStatements.data.ts)

Methodological description: Explain that an operator acts on operands, an expression produces a value, and a statement directs an action; one line of code may contain several such units.
User-friendly description: Recognize the difference between operators, expressions and statements.

##### Explain Statement Block Boundaries

Slug: explainStatementBlockBoundaries
Action: create
Status: implemented

[explainStatementBlockBoundaries.data.ts](../../data/skills/programming/programStructureAndSyntax/skills/explainStatementBlockBoundaries.data.ts)

Methodological description: Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.
User-friendly description: Find which commands belong inside a loop, function or conditional block.

##### Explain Syntax Highlighting

Slug: explainSyntaxHighlighting
Action: create
Status: implemented

[explainSyntaxHighlighting.data.ts](../../data/skills/programming/programStructureAndSyntax/skills/explainSyntaxHighlighting.data.ts)

Methodological description: Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.
User-friendly description: Understand what syntax coloring helps reveal and what it cannot prove.

#### Programming Paradigms

Slug: programmingParadigms
Action: create
Status: implemented

Skills: 4

[programmingParadigms.data.ts](../../data/skills/programming/programmingParadigms/programmingParadigms.data.ts)

Methodological description: Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.
User-friendly description: Discover different ways of organizing program logic and behavior.

##### Explain Procedural Programming

Slug: explainProceduralProgramming
Action: create
Status: implemented

[explainProceduralProgramming.data.ts](../../data/skills/programming/programmingParadigms/skills/explainProceduralProgramming.data.ts)

Methodological description: Organize tasks into named procedures and sequences of state-changing instructions without requiring a class for each action.
User-friendly description: Explore programs organized around step-by-step procedures.

##### Explain Functional Programming

Slug: explainFunctionalProgramming
Action: create
Status: implemented

[explainFunctionalProgramming.data.ts](../../data/skills/programming/programmingParadigms/skills/explainFunctionalProgramming.data.ts)

Methodological description: Describe computation through function composition and transformations of values; demonstrate that pure functions do not modify external state.
User-friendly description: Understand programs that transform values by combining functions.

##### Explain Object-Oriented Programming

Slug: explainObjectOrientedProgramming
Action: create
Status: implemented

[explainObjectOrientedProgramming.data.ts](../../data/skills/programming/programmingParadigms/skills/explainObjectOrientedProgramming.data.ts)

Methodological description: Organize a program around interacting objects with state and methods, rather than as a list of global procedures.
User-friendly description: Explore programs built from interacting objects with state and behavior.

##### Distinguish Imperative and Declarative Approaches

Slug: distinguishImperativeAndDeclarativeApproaches
Action: create
Status: implemented

[distinguishImperativeAndDeclarativeApproaches.data.ts](../../data/skills/programming/programmingParadigms/skills/distinguishImperativeAndDeclarativeApproaches.data.ts)

Methodological description: Compare specifying concrete state-changing steps with specifying desired results or rules from which the environment chooses an execution strategy.
User-friendly description: Compare giving explicit instructions with describing the desired result.

### Digital Systems and Networks

Slug: digitalSystemsAndNetworks
Action: create
Status: implemented

Groups: 8 · Skills: 37

[digitalSystemsAndNetworks.data.ts](../../data/skills/digitalSystemsAndNetworks/digitalSystemsAndNetworks.data.ts)

Methodological description: Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.
User-friendly description: Discover how computing devices, digital information and networks work together.

#### Digital Device Components

Slug: digitalDeviceComponents
Action: create
Status: implemented

Skills: 3

[digitalDeviceComponents.data.ts](../../data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/digitalDeviceComponents.data.ts)

Methodological description: Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.
User-friendly description: Explore how hardware components and software perform different computing tasks.

##### Identify Digital Devices

Slug: identifyDigitalDevices
Action: create
Status: implemented

[identifyDigitalDevices.data.ts](../../data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/identifyDigitalDevices.data.ts)

Methodological description: Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.
User-friendly description: Recognize devices that process programmable digital information.

##### Explain a Processor's Function

Slug: explainAProcessorsFunction
Action: create
Status: implemented

[explainAProcessorsFunction.data.ts](../../data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/explainAProcessorsFunction.data.ts)

Methodological description: Relate the CPU to fetching, decoding, and executing instructions and coordinating operations on data; distinguish its computing role from permanent file storage.
User-friendly description: Explain how a processor runs instructions rather than permanently storing files.

##### Distinguish Hardware from Software

Slug: distinguishHardwareFromSoftware
Action: create
Status: implemented

[distinguishHardwareFromSoftware.data.ts](../../data/skills/digitalSystemsAndNetworks/digitalDeviceComponents/skills/distinguishHardwareFromSoftware.data.ts)

Methodological description: Differentiate tangible device components from instructions and data governing their behavior; explain their interaction, such as software controlling a camera through a hardware interface.
User-friendly description: Distinguish physical computer parts from the software that controls them.

#### Representation and Storage

Slug: representationAndStorage
Action: create
Status: implemented

Skills: 4

[representationAndStorage.data.ts](../../data/skills/digitalSystemsAndNetworks/representationAndStorage/representationAndStorage.data.ts)

Methodological description: How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.
User-friendly description: Learn how devices represent information and organize stored files.

##### Explain Binary Representation

Slug: explainBinaryRepresentation
Action: create
Status: implemented

[explainBinaryRepresentation.data.ts](../../data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/explainBinaryRepresentation.data.ts)

Methodological description: Show how the symbols 0 and 1 form bits and bit sequences that encode numbers and other data. A bit represents a state, while the meaning of a longer sequence depends on its interpretation.
User-friendly description: Understand how sequences of zeros and ones encode different kinds of data.

##### Distinguish Digital Formats

Slug: distinguishDigitalFormats
Action: create
Status: implemented

[distinguishDigitalFormats.data.ts](../../data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/distinguishDigitalFormats.data.ts)

Methodological description: Explain how formats determine the interpretation of stored bits: text files, raster images, and audio recordings have different structures. A filename extension is a clue, not proof of actual contents.
User-friendly description: Recognize that file formats determine how stored bits should be interpreted.

##### Compare Digital File Sizes

Slug: compareDigitalFileSizes
Action: create
Status: implemented

[compareDigitalFileSizes.data.ts](../../data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/compareDigitalFileSizes.data.ts)

Methodological description: Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.
User-friendly description: Compare file sizes and explain why format and compression make a difference.

##### Organize Files in Directories

Slug: organizeFilesInDirectories
Action: create
Status: implemented

[organizeFilesInDirectories.data.ts](../../data/skills/digitalSystemsAndNetworks/representationAndStorage/skills/organizeFilesInDirectories.data.ts)

Methodological description: Create a clear directory hierarchy for resources and choose names and locations that allow a file to be found by its path. Directory organization does not determine file format.
User-friendly description: Arrange files in useful folders so they can be found by their paths.

#### Networks

Slug: networks
Action: create
Status: implemented

Skills: 4

[networks.data.ts](../../data/skills/digitalSystemsAndNetworks/networks/networks.data.ts)

Methodological description: Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.
User-friendly description: Discover how connected devices send messages and share resources.

##### Explain the Purpose of a Computer Network

Slug: explainThePurposeOfAComputerNetwork
Action: create
Status: implemented

[explainThePurposeOfAComputerNetwork.data.ts](../../data/skills/digitalSystemsAndNetworks/networks/skills/explainThePurposeOfAComputerNetwork.data.ts)

Methodological description: Show how networking separate devices allows them to exchange messages and share resources while each device maintains its own computing functions.
User-friendly description: Explain why networks connect separate devices to exchange information.

##### Distinguish the Internet from the Web

Slug: distinguishTheInternetFromTheWeb
Action: create
Status: implemented

[distinguishTheInternetFromTheWeb.data.ts](../../data/skills/digitalSystemsAndNetworks/networks/skills/distinguishTheInternetFromTheWeb.data.ts)

Methodological description: Explain that the Internet is interconnected network infrastructure, while the Web is a service for accessing resources through browsers and Web protocols. Email or file transfer can use the Internet without a webpage.
User-friendly description: Distinguish the Internet's network infrastructure from websites on the Web.

##### Explain Network Message Delivery

Slug: explainNetworkMessageDelivery
Action: create
Status: implemented

[explainNetworkMessageDelivery.data.ts](../../data/skills/digitalSystemsAndNetworks/networks/skills/explainNetworkMessageDelivery.data.ts)

Methodological description: Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.
User-friendly description: Trace how messages travel through network devices to their destination.

##### Explain Wireless Communication

Slug: explainWirelessCommunication
Action: create
Status: implemented

[explainWirelessCommunication.data.ts](../../data/skills/digitalSystemsAndNetworks/networks/skills/explainWirelessCommunication.data.ts)

Methodological description: Describe how Wi-Fi and other wireless technologies transmit signals without a dedicated cable to each device while still relying on compatible equipment, protocols, and communications infrastructure.
User-friendly description: Explore how wireless devices communicate using signals rather than direct cables.

#### Numeral Systems

Slug: numeralSystems
Action: create
Status: implemented

Skills: 4

[numeralSystems.data.ts](../../data/skills/digitalSystemsAndNetworks/numeralSystems/numeralSystems.data.ts)

Methodological description: Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.
User-friendly description: Learn how digits represent numbers in systems with different bases.

##### Explain Positional Numeral Systems

Slug: explainPositionalNumeralSystems
Action: create
Status: implemented

[explainPositionalNumeralSystems.data.ts](../../data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainPositionalNumeralSystems.data.ts)

Methodological description: Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.
User-friendly description: Understand why the place of a digit changes its value in a number.

##### Convert Between Binary and Decimal

Slug: convertBetweenBinaryAndDecimal
Action: create
Status: implemented

[convertBetweenBinaryAndDecimal.data.ts](../../data/skills/digitalSystemsAndNetworks/numeralSystems/skills/convertBetweenBinaryAndDecimal.data.ts)

Methodological description: Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.
User-friendly description: Convert small numbers between binary and decimal notation.

##### Explain Computer Binary Logic

Slug: explainComputerBinaryLogic
Action: create
Status: implemented

[explainComputerBinaryLogic.data.ts](../../data/skills/digitalSystemsAndNetworks/numeralSystems/skills/explainComputerBinaryLogic.data.ts)

Methodological description: Two reliably distinguishable electronic signal levels allow encoding zeros and ones, even though physical circuits are more complex than two abstract symbols.
User-friendly description: Connect binary zeros and ones to distinguishable electronic signal states.

##### Distinguish Binary and Hexadecimal

Slug: distinguishBinaryAndHexadecimal
Action: create
Status: implemented

[distinguishBinaryAndHexadecimal.data.ts](../../data/skills/digitalSystemsAndNetworks/numeralSystems/skills/distinguishBinaryAndHexadecimal.data.ts)

Methodological description: Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.
User-friendly description: Understand why hexadecimal is a shorter way to write groups of bits.

#### Memory and Storage

Slug: memoryAndStorage
Action: create
Status: implemented

Skills: 4

[memoryAndStorage.data.ts](../../data/skills/digitalSystemsAndNetworks/memoryAndStorage/memoryAndStorage.data.ts)

Methodological description: Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.
User-friendly description: Discover what temporary memory, firmware memory and file storage each do.

##### Explain RAM

Slug: explainRAM
Action: create
Status: implemented

[explainRAM.data.ts](../../data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainRAM.data.ts)

Methodological description: RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.
User-friendly description: Explore how RAM holds working information while a computer runs.

##### Explain Persistent Storage

Slug: explainPersistentStorage
Action: create
Status: implemented

[explainPersistentStorage.data.ts](../../data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainPersistentStorage.data.ts)

Methodological description: An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.
User-friendly description: Understand why storage devices preserve files after power is switched off.

##### Explain the Purpose of ROM

Slug: explainThePurposeOfROM
Action: create
Status: implemented

[explainThePurposeOfROM.data.ts](../../data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/explainThePurposeOfROM.data.ts)

Methodological description: Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.
User-friendly description: Recognize how nonvolatile firmware memory helps devices start up.

##### Distinguish RAM, ROM, and Storage

Slug: distinguishRAMROMAndStorage
Action: create
Status: implemented

[distinguishRAMROMAndStorage.data.ts](../../data/skills/digitalSystemsAndNetworks/memoryAndStorage/skills/distinguishRAMROMAndStorage.data.ts)

Methodological description: Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.
User-friendly description: Compare what RAM, ROM and persistent storage are designed to hold.

#### Operating Systems

Slug: operatingSystems
Action: create
Status: implemented

Skills: 4

[operatingSystems.data.ts](../../data/skills/digitalSystemsAndNetworks/operatingSystems/operatingSystems.data.ts)

Methodological description: An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.
User-friendly description: Explore how operating systems manage programs, files and devices.

##### Explain an Operating System's Purpose

Slug: explainAnOperatingSystemsPurpose
Action: create
Status: implemented

[explainAnOperatingSystemsPurpose.data.ts](../../data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOperatingSystemsPurpose.data.ts)

Methodological description: Describe how an OS coordinates launching programs and accessing files and devices so individual applications need not implement all hardware operations themselves.
User-friendly description: Understand how an operating system coordinates software and hardware.

##### Distinguish Operating System Families

Slug: distinguishOperatingSystemFamilies
Action: create
Status: implemented

[distinguishOperatingSystemFamilies.data.ts](../../data/skills/digitalSystemsAndNetworks/operatingSystems/skills/distinguishOperatingSystemFamilies.data.ts)

Methodological description: Identify Windows, macOS, Linux, Android, and iOS as different operating systems or related platforms rather than names for computers.
User-friendly description: Recognize common operating-system families and how they differ.

##### Explain an OS Process

Slug: explainAnOSProcess
Action: create
Status: implemented

[explainAnOSProcess.data.ts](../../data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainAnOSProcess.data.ts)

Methodological description: A running program has current state and allocated resources; a program file on disk is not itself a process.
User-friendly description: Distinguish a running process from the program file stored on disk.

##### Explain Linus Torvalds' Role in Linux

Slug: explainLinusTorvaldsRoleInLinux
Action: create
Status: implemented

[explainLinusTorvaldsRoleInLinux.data.ts](../../data/skills/digitalSystemsAndNetworks/operatingSystems/skills/explainLinusTorvaldsRoleInLinux.data.ts)

Methodological description: Torvalds initiated the Linux kernel; a complete operating system also includes other components, and collaborative development sustains its evolution.
User-friendly description: Learn how the Linux kernel began and why many contributors build operating systems.

#### Network Models and Protocols

Slug: networkModelsAndProtocols
Action: create
Status: implemented

Skills: 11

[networkModelsAndProtocols.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/networkModelsAndProtocols.data.ts)

Methodological description: Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.
User-friendly description: Discover how networking protocols specify the rules for sending information.

##### Explain a Network Protocol

Slug: explainANetworkProtocol
Action: create
Status: implemented

[explainANetworkProtocol.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainANetworkProtocol.data.ts)

Methodological description: A protocol specifies message formats and rules that enable devices to exchange information correctly.
User-friendly description: Explain why devices need agreed rules for exchanging messages.

##### Explain the OSI Layers

Slug: explainTheOSILayers
Action: create
Status: implemented

[explainTheOSILayers.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTheOSILayers.data.ts)

Methodological description: The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.
User-friendly description: Use the seven-layer OSI model to organize networking functions.

##### Distinguish OSI from TCP/IP

Slug: distinguishOSIFromTCPIP
Action: create
Status: implemented

[distinguishOSIFromTCPIP.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishOSIFromTCPIP.data.ts)

Methodological description: The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.
User-friendly description: Compare the conceptual OSI layers with the Internet's TCP/IP stack.

##### Explain the Purpose of IP

Slug: explainThePurposeOfIP
Action: create
Status: implemented

[explainThePurposeOfIP.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainThePurposeOfIP.data.ts)

Methodological description: IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.
User-friendly description: Understand how IP addresses and forwards packets across networks.

##### Distinguish TCP from UDP

Slug: distinguishTCPFromUDP
Action: create
Status: implemented

[distinguishTCPFromUDP.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishTCPFromUDP.data.ts)

Methodological description: TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.
User-friendly description: Compare reliable TCP streams with UDP messages that lack those guarantees.

##### Explain DNS

Slug: explainDNS
Action: create
Status: implemented

[explainDNS.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainDNS.data.ts)

Methodological description: DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.
User-friendly description: Explain how DNS helps find network addresses from domain names.

##### Distinguish HTTP from HTTPS

Slug: distinguishHTTPFromHTTPS
Action: create
Status: implemented

[distinguishHTTPFromHTTPS.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/distinguishHTTPFromHTTPS.data.ts)

Methodological description: HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.
User-friendly description: Recognize what HTTPS protects and why it does not guarantee a trustworthy site.

##### Explain CSMA/CD

Slug: explainCSMACD
Action: create
Status: implemented

[explainCSMACD.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACD.data.ts)

Methodological description: Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.
User-friendly description: Learn why older shared Ethernet networks needed collision detection.

##### Explain CSMA/CA

Slug: explainCSMACA
Action: create
Status: implemented

[explainCSMACA.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainCSMACA.data.ts)

Methodological description: Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.
User-friendly description: Explain how wireless devices try to avoid transmitting over a busy channel.

##### Explain Token Ring

Slug: explainTokenRing
Action: create
Status: implemented

[explainTokenRing.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/explainTokenRing.data.ts)

Methodological description: Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.
User-friendly description: Explore how passing a token can control which device may send data.

##### Compare Network Access Methods

Slug: compareNetworkAccessMethods
Action: create
Status: implemented

[compareNetworkAccessMethods.data.ts](../../data/skills/digitalSystemsAndNetworks/networkModelsAndProtocols/skills/compareNetworkAccessMethods.data.ts)

Methodological description: Select and justify comparisons among collision detection (CSMA/CD), collision avoidance (CSMA/CA), and token passing (Token Ring) according to how sending rights are obtained. These represent different technological settings, not three interchangeable protocols of modern Ethernet.
User-friendly description: Compare collision detection, avoidance and token passing in their proper settings.

#### Task Execution

Slug: taskExecution
Action: create
Status: implemented

Skills: 3

[taskExecution.data.ts](../../data/skills/digitalSystemsAndNetworks/taskExecution/taskExecution.data.ts)

Methodological description: Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.
User-friendly description: Discover the difference between overlapping tasks and truly simultaneous work.

##### Explain Concurrent Execution

Slug: explainConcurrentExecution
Action: create
Status: implemented

[explainConcurrentExecution.data.ts](../../data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainConcurrentExecution.data.ts)

Methodological description: Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.
User-friendly description: Understand how several tasks can make progress without running at exactly the same moment.

##### Explain Parallel Execution

Slug: explainParallelExecution
Action: create
Status: implemented

[explainParallelExecution.data.ts](../../data/skills/digitalSystemsAndNetworks/taskExecution/skills/explainParallelExecution.data.ts)

Methodological description: Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.
User-friendly description: Recognize when multiple processors actually perform work simultaneously.

##### Distribute Independent Tasks Across Executors

Slug: distributeIndependentTasksAcrossExecutors
Action: create
Status: implemented

[distributeIndependentTasksAcrossExecutors.data.ts](../../data/skills/digitalSystemsAndNetworks/taskExecution/skills/distributeIndependentTasksAcrossExecutors.data.ts)

Methodological description: Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.
User-friendly description: Plan which tasks can run together and which must wait for other results.

### Information and Data

Slug: informationAndData
Action: create
Status: implemented

Groups: 5 · Skills: 24

[informationAndData.data.ts](../../data/skills/informationAndData/informationAndData.data.ts)

Methodological description: Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.
User-friendly description: Explore how to find trustworthy information, organize data and reason about uncertainty.

#### Information Search and Verification

Slug: informationSearchAndVerification
Action: create
Status: implemented

Skills: 4

[informationSearchAndVerification.data.ts](../../data/skills/informationAndData/informationSearchAndVerification/informationSearchAndVerification.data.ts)

Methodological description: Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.
User-friendly description: Learn how to search for evidence and check whether a claim is supported.

##### Formulate an Information Query

Slug: formulateAnInformationQuery
Action: create
Status: implemented

[formulateAnInformationQuery.data.ts](../../data/skills/informationAndData/informationSearchAndVerification/skills/formulateAnInformationQuery.data.ts)

Methodological description: Convert a specific information need into search terms and qualifiers likely to retrieve relevant resources. For example, specify an object's name, location, or period instead of an overly general term.
User-friendly description: Choose specific search terms that match what you need to find.

##### Compare Information Sources

Slug: compareInformationSources
Action: create
Status: implemented

[compareInformationSources.data.ts](../../data/skills/informationAndData/informationSearchAndVerification/skills/compareInformationSources.data.ts)

Methodological description: Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.
User-friendly description: Compare multiple sources and identify where their accounts disagree.

##### Verify a Claim Against a Source

Slug: verifyAClaimAgainstASource
Action: create
Status: implemented

[verifyAClaimAgainstASource.data.ts](../../data/skills/informationAndData/informationSearchAndVerification/skills/verifyAClaimAgainstASource.data.ts)

Methodological description: Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.
User-friendly description: Check a claim against appropriate evidence rather than repeated assertions.

##### Distinguish Messages from Data

Slug: distinguishMessagesFromData
Action: create
Status: implemented

[distinguishMessagesFromData.data.ts](../../data/skills/informationAndData/informationSearchAndVerification/skills/distinguishMessagesFromData.data.ts)

Methodological description: Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.
User-friendly description: Distinguish a recorded value from the meaning a message gives it.

#### Data Collection and Organization

Slug: dataCollectionAndOrganization
Action: create
Status: implemented

Skills: 4

[dataCollectionAndOrganization.data.ts](../../data/skills/informationAndData/dataCollectionAndOrganization/dataCollectionAndOrganization.data.ts)

Methodological description: Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.
User-friendly description: Learn to collect relevant information and organize comparable records.

##### Identify Data Needed for a Task

Slug: identifyDataNeededForATask
Action: create
Status: implemented

[identifyDataNeededForATask.data.ts](../../data/skills/informationAndData/dataCollectionAndOrganization/skills/identifyDataNeededForATask.data.ts)

Methodological description: Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.
User-friendly description: Decide which fields and observations a question actually requires.

##### Collect Data Consistently

Slug: collectDataConsistently
Action: create
Status: implemented

[collectDataConsistently.data.ts](../../data/skills/informationAndData/dataCollectionAndOrganization/skills/collectDataConsistently.data.ts)

Methodological description: Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.
User-friendly description: Collect measurements using consistent rules and units.

##### Group Data by Attribute

Slug: groupDataByAttribute
Action: create
Status: implemented

[groupDataByAttribute.data.ts](../../data/skills/informationAndData/dataCollectionAndOrganization/skills/groupDataByAttribute.data.ts)

Methodological description: Apply one criterion consistently across items to create categories with a clear membership rule. For example, classify messages by file type without mixing this attribute with file size.
User-friendly description: Group records using one clear characteristic.

##### Present Data in a Table

Slug: presentDataInATable
Action: create
Status: implemented

[presentDataInATable.data.ts](../../data/skills/informationAndData/dataCollectionAndOrganization/skills/presentDataInATable.data.ts)

Methodological description: Arrange comparable records in rows and their attributes in columns with stable headings and units. A table preserves the values and relationships rather than substituting a graphical summary.
User-friendly description: Create a table with labeled rows, columns and consistent values.

#### Databases

Slug: databases
Action: create
Status: implemented

Skills: 5

[databases.data.ts](../../data/skills/informationAndData/databases/databases.data.ts)

Methodological description: Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.
User-friendly description: Discover how databases structure records and connect related information.

##### Explain a Database Table

Slug: explainADatabaseTable
Action: create
Status: implemented

[explainADatabaseTable.data.ts](../../data/skills/informationAndData/databases/skills/explainADatabaseTable.data.ts)

Methodological description: Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.
User-friendly description: Understand how a database table stores similar kinds of records.

##### Distinguish Records and Fields

Slug: distinguishRecordsAndFields
Action: create
Status: implemented

[distinguishRecordsAndFields.data.ts](../../data/skills/informationAndData/databases/skills/distinguishRecordsAndFields.data.ts)

Methodological description: Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.
User-friendly description: Distinguish a record from the fields that describe it.

##### Explain Primary Keys

Slug: explainPrimaryKeys
Action: create
Status: implemented

[explainPrimaryKeys.data.ts](../../data/skills/informationAndData/databases/skills/explainPrimaryKeys.data.ts)

Methodological description: Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.
User-friendly description: Explain why a database needs a stable unique key for each record.

##### Model Relationships Between Tables

Slug: modelRelationshipsBetweenTables
Action: create
Status: implemented

[modelRelationshipsBetweenTables.data.ts](../../data/skills/informationAndData/databases/skills/modelRelationshipsBetweenTables.data.ts)

Methodological description: Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.
User-friendly description: Connect information in different tables using identifiers.

##### Design a Simple Database Schema

Slug: designASimpleDatabaseSchema
Action: create
Status: implemented

[designASimpleDatabaseSchema.data.ts](../../data/skills/informationAndData/databases/skills/designASimpleDatabaseSchema.data.ts)

Methodological description: Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.
User-friendly description: Plan a simple database with suitable entities, fields and links.

#### Statistical Investigation

Slug: statisticalInvestigation
Action: create
Status: implemented

Skills: 4

[statisticalInvestigation.data.ts](../../data/skills/informationAndData/statisticalInvestigation/statisticalInvestigation.data.ts)

Methodological description: Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.
User-friendly description: Learn to explore data through charts, frequencies and comparisons.

##### Read a Chart

Slug: readAChart
Action: create
Status: implemented

[readAChart.data.ts](../../data/skills/informationAndData/statisticalInvestigation/skills/readAChart.data.ts)

Methodological description: Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.
User-friendly description: Read chart scales, labels and values without being misled by their presentation.

##### Construct a Simple Chart

Slug: constructASimpleChart
Action: create
Status: implemented

[constructASimpleChart.data.ts](../../data/skills/informationAndData/statisticalInvestigation/skills/constructASimpleChart.data.ts)

Methodological description: Choose a representation suitable for the data type and place numerical or categorical values in labeled elements on an understandable scale. Visual presentation must preserve proportions among source values.
User-friendly description: Create a clear chart that represents data proportions accurately.

##### Find the Most Frequent Value

Slug: findTheMostFrequentValue
Action: create
Status: implemented

[findTheMostFrequentValue.data.ts](../../data/skills/informationAndData/statisticalInvestigation/skills/findTheMostFrequentValue.data.ts)

Methodological description: Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.
User-friendly description: Identify the value that appears most frequently in a set.

##### Compare Sets of Observations

Slug: compareSetsOfObservations
Action: create
Status: implemented

[compareSetsOfObservations.data.ts](../../data/skills/informationAndData/statisticalInvestigation/skills/compareSetsOfObservations.data.ts)

Methodological description: Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.
User-friendly description: Compare two datasets using the same measures or categories.

#### Probability and Uncertainty

Slug: probabilityAndUncertainty
Action: create
Status: implemented

Skills: 7

[probabilityAndUncertainty.data.ts](../../data/skills/informationAndData/probabilityAndUncertainty/probabilityAndUncertainty.data.ts)

Methodological description: Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.
User-friendly description: Explore possible events, their chances and the limits of prediction.

##### Distinguish Random and Deterministic Events

Slug: distinguishRandomAndDeterministicEvents
Action: create
Status: implemented

[distinguishRandomAndDeterministicEvents.data.ts](../../data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishRandomAndDeterministicEvents.data.ts)

Methodological description: Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.
User-friendly description: Distinguish outcomes determined by a rule from those selected randomly.

##### Explain Event Possibility

Slug: explainEventPossibility
Action: create
Status: implemented

[explainEventPossibility.data.ts](../../data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventPossibility.data.ts)

Methodological description: Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.
User-friendly description: Decide whether an outcome is allowed under a given set of conditions.

##### Explain Event Probability

Slug: explainEventProbability
Action: create
Status: implemented

[explainEventProbability.data.ts](../../data/skills/informationAndData/probabilityAndUncertainty/skills/explainEventProbability.data.ts)

Methodological description: Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.
User-friendly description: Estimate the chance of an event using a stated probability model.

##### Distinguish Possibility from Probability

Slug: distinguishPossibilityFromProbability
Action: create
Status: implemented

[distinguishPossibilityFromProbability.data.ts](../../data/skills/informationAndData/probabilityAndUncertainty/skills/distinguishPossibilityFromProbability.data.ts)

Methodological description: Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.
User-friendly description: Understand why an event being possible does not make it likely.

##### Compare Probabilities of Simple Events

Slug: compareProbabilitiesOfSimpleEvents
Action: create
Status: implemented

[compareProbabilitiesOfSimpleEvents.data.ts](../../data/skills/informationAndData/probabilityAndUncertainty/skills/compareProbabilitiesOfSimpleEvents.data.ts)

Methodological description: Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.
User-friendly description: Compare how likely two outcomes are under the same assumptions.

##### Explain Limits of Prediction

Slug: explainLimitsOfPrediction
Action: create
Status: implemented

[explainLimitsOfPrediction.data.ts](../../data/skills/informationAndData/probabilityAndUncertainty/skills/explainLimitsOfPrediction.data.ts)

Methodological description: Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.
User-friendly description: Explain why knowing the odds does not predict the result of a single attempt.

##### Use Randomness in a Model

Slug: useRandomnessInAModel
Action: create
Status: implemented

[useRandomnessInAModel.data.ts](../../data/skills/informationAndData/probabilityAndUncertainty/skills/useRandomnessInAModel.data.ts)

Methodological description: Introduce random selection from an explicitly defined outcome set into a digital simulation and distinguish it from a predetermined scenario. Variable outcomes do not imply equal likelihoods.
User-friendly description: Add random choices to a model while defining which outcomes can occur.

### Software Architecture

Slug: softwareArchitecture
Action: create
Status: implemented

Groups: 2 · Skills: 21

[softwareArchitecture.data.ts](../../data/skills/softwareArchitecture/softwareArchitecture.data.ts)

Methodological description: Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.
User-friendly description: Explore how objects, responsibilities and dependencies organize reliable software.

#### Object Model

Slug: objectModel
Action: create
Status: implemented

Skills: 13

[objectModel.data.ts](../../data/skills/softwareArchitecture/objectModel/objectModel.data.ts)

Methodological description: Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.
User-friendly description: Discover how software objects combine their state and behavior.

##### Identify an Object's State and Behavior

Slug: identifyAnObjectsStateAndBehavior
Action: create
Status: implemented

[identifyAnObjectsStateAndBehavior.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/identifyAnObjectsStateAndBehavior.data.ts)

Methodological description: Form a mental model of a real or imaginary object in terms of state (its characteristics and how they may change) and behavior (what it can do or what actions are possible). For example, a car has speed and fuel level and can accelerate or brake. This conceptual description does not require defining software properties and methods or writing code.
User-friendly description: Describe an object's characteristics and the actions it can perform.

##### Explain the Concept of a Class

Slug: explainTheConceptOfAClass
Action: create
Status: implemented

[explainTheConceptOfAClass.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/explainTheConceptOfAClass.data.ts)

Methodological description: Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.
User-friendly description: Understand a class as a definition from which individual objects are created.

##### Distinguish a Class from an Object

Slug: distinguishAClassFromAnObject
Action: create
Status: implemented

[distinguishAClassFromAnObject.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/distinguishAClassFromAnObject.data.ts)

Methodological description: Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.
User-friendly description: Distinguish the blueprint of a class from objects with their own current values.

##### Apply Object Abstraction

Slug: applyObjectAbstraction
Action: create
Status: implemented

[applyObjectAbstraction.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/applyObjectAbstraction.data.ts)

Methodological description: Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.
User-friendly description: Choose the essential operations a component should reveal to its users.

##### Explain Encapsulation

Slug: explainEncapsulation
Action: create
Status: implemented

[explainEncapsulation.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/explainEncapsulation.data.ts)

Methodological description: Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.
User-friendly description: Understand how objects protect their internal state through controlled methods.

##### Explain Inheritance

Slug: explainInheritance
Action: create
Status: implemented

[explainInheritance.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/explainInheritance.data.ts)

Methodological description: Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.
User-friendly description: Explain how a specialized class can inherit behavior from a broader class.

##### Explain Polymorphism

Slug: explainPolymorphism
Action: create
Status: implemented

[explainPolymorphism.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/explainPolymorphism.data.ts)

Methodological description: Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.
User-friendly description: See how different objects can fulfill the same operation in different ways.

##### Model Object Composition

Slug: modelObjectComposition
Action: create
Status: implemented

[modelObjectComposition.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/modelObjectComposition.data.ts)

Methodological description: Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.
User-friendly description: Build larger software objects from smaller parts with distinct responsibilities.

##### Explain the Structure of a Software Object

Slug: explainTheStructureOfASoftwareObject
Action: create
Status: implemented

[explainTheStructureOfASoftwareObject.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/explainTheStructureOfASoftwareObject.data.ts)

Methodological description: Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.
User-friendly description: Identify the identity, properties and methods of an existing software object.

##### Explain an Object Property

Slug: explainAnObjectProperty
Action: create
Status: implemented

[explainAnObjectProperty.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/explainAnObjectProperty.data.ts)

Methodological description: Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.
User-friendly description: Distinguish an object's stored property from the operations it can perform.

##### Explain an Object Method

Slug: explainAnObjectMethod
Action: create
Status: implemented

[explainAnObjectMethod.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/explainAnObjectMethod.data.ts)

Methodological description: Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.
User-friendly description: Explain how calling a method can read or change an object's state.

##### Model a Domain Entity as a Software Object

Slug: modelADomainEntityAsASoftwareObject
Action: create
Status: implemented

[modelADomainEntityAsASoftwareObject.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/modelADomainEntityAsASoftwareObject.data.ts)

Methodological description: Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.
User-friendly description: Design a useful software object by selecting relevant properties and operations.

##### Distinguish a Real Object from Its Abstract Model

Slug: distinguishARealObjectFromItsAbstractModel
Action: create
Status: implemented

[distinguishARealObjectFromItsAbstractModel.data.ts](../../data/skills/softwareArchitecture/objectModel/skills/distinguishARealObjectFromItsAbstractModel.data.ts)

Methodological description: Explain that a software object represents only selected characteristics of a thing or concept; a fictional entity can also have a useful object model.
User-friendly description: Recognize that a software model represents only selected features of something.

#### Design Principles

Slug: designPrinciples
Action: create
Status: implemented

Skills: 8

[designPrinciples.data.ts](../../data/skills/softwareArchitecture/designPrinciples/designPrinciples.data.ts)

Methodological description: Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.
User-friendly description: Learn principles for keeping software understandable and adaptable.

##### Identify Unnecessary Duplication (DRY)

Slug: identifyUnnecessaryDuplicationDRY
Action: create
Status: implemented

[identifyUnnecessaryDuplicationDRY.data.ts](../../data/skills/softwareArchitecture/designPrinciples/skills/identifyUnnecessaryDuplicationDRY.data.ts)

Methodological description: Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.
User-friendly description: Find duplicated rules that could cause inconsistent future changes.

##### Reduce Unnecessary Complexity (KISS)

Slug: reduceUnnecessaryComplexityKISS
Action: create
Status: implemented

[reduceUnnecessaryComplexityKISS.data.ts](../../data/skills/softwareArchitecture/designPrinciples/skills/reduceUnnecessaryComplexityKISS.data.ts)

Methodological description: Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.
User-friendly description: Simplify software by removing mechanisms the requirements do not justify.

##### Defer Unnecessary Features (YAGNI)

Slug: deferUnnecessaryFeaturesYAGNI
Action: create
Status: implemented

[deferUnnecessaryFeaturesYAGNI.data.ts](../../data/skills/softwareArchitecture/designPrinciples/skills/deferUnnecessaryFeaturesYAGNI.data.ts)

Methodological description: Distinguish functionality needed now from a merely imagined future scenario and avoid building the latter prematurely. Unlike KISS, the question is whether the feature is needed, not how complex its implementation is.
User-friendly description: Avoid implementing features that are only imagined future possibilities.

##### Isolate a Single Responsibility (SRP)

Slug: isolateASingleResponsibilitySRP
Action: create
Status: implemented

[isolateASingleResponsibilitySRP.data.ts](../../data/skills/softwareArchitecture/designPrinciples/skills/isolateASingleResponsibilitySRP.data.ts)

Methodological description: Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.
User-friendly description: Organize a module around one coherent reason to change.

##### Extend Behavior Without Modifying the Core (OCP)

Slug: extendBehaviorWithoutModifyingTheCoreOCP
Action: create
Status: implemented

[extendBehaviorWithoutModifyingTheCoreOCP.data.ts](../../data/skills/softwareArchitecture/designPrinciples/skills/extendBehaviorWithoutModifyingTheCoreOCP.data.ts)

Methodological description: Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.
User-friendly description: Design extension points for new behavior without rewriting stable core logic.

##### Verify Substitutability (LSP)

Slug: verifySubstitutabilityLSP
Action: create
Status: implemented

[verifySubstitutabilityLSP.data.ts](../../data/skills/softwareArchitecture/designPrinciples/skills/verifySubstitutabilityLSP.data.ts)

Methodological description: Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.
User-friendly description: Check whether an implementation respects the promises of a shared contract.

##### Separate Narrow Interfaces (ISP)

Slug: separateNarrowInterfacesISP
Action: create
Status: implemented

[separateNarrowInterfacesISP.data.ts](../../data/skills/softwareArchitecture/designPrinciples/skills/separateNarrowInterfacesISP.data.ts)

Methodological description: Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.
User-friendly description: Make interfaces small enough that clients need only the operations they use.

##### Design Dependencies on Contracts (DIP)

Slug: designDependenciesOnContractsDIP
Action: create
Status: implemented

[designDependenciesOnContractsDIP.data.ts](../../data/skills/softwareArchitecture/designPrinciples/skills/designDependenciesOnContractsDIP.data.ts)

Methodological description: Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.
User-friendly description: Separate business logic from concrete services by depending on contracts.

### Design Patterns

Slug: designPatterns
Action: create
Status: implemented

Groups: 3 · Skills: 23

[designPatterns.data.ts](../../data/skills/designPatterns/designPatterns.data.ts)

Methodological description: The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.
User-friendly description: Explore reusable ways to create, combine and coordinate software objects.

#### Creational

Slug: creational
Action: create
Status: implemented

Skills: 5

[creational.data.ts](../../data/skills/designPatterns/creational/creational.data.ts)

Methodological description: Five approaches to constructing instances and object families that separate creation logic from usage.
User-friendly description: Learn patterns for constructing objects without tying clients to concrete types.

##### Factory Method

Slug: factoryMethod
Action: create
Status: implemented

[factoryMethod.data.ts](../../data/skills/designPatterns/creational/skills/factoryMethod.data.ts)

Methodological description: Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.
User-friendly description: Let subclasses choose which concrete object a factory method creates.

##### Abstract Factory

Slug: abstractFactory
Action: create
Status: implemented

[abstractFactory.data.ts](../../data/skills/designPatterns/creational/skills/abstractFactory.data.ts)

Methodological description: Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.
User-friendly description: Use a factory that builds matching families of related objects.

##### Builder

Slug: builder
Action: create
Status: implemented

[builder.data.ts](../../data/skills/designPatterns/creational/skills/builder.data.ts)

Methodological description: Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.
User-friendly description: Assemble a complex object one step at a time using a builder.

##### Prototype

Slug: prototype
Action: create
Status: implemented

[prototype.data.ts](../../data/skills/designPatterns/creational/skills/prototype.data.ts)

Methodological description: Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.
User-friendly description: Create new objects by copying a configured example.

##### Singleton

Slug: singleton
Action: create
Status: implemented

[singleton.data.ts](../../data/skills/designPatterns/creational/skills/singleton.data.ts)

Methodological description: Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.
User-friendly description: Control access to a single shared instance while considering global-state risks.

#### Structural

Slug: structural
Action: create
Status: implemented

Skills: 7

[structural.data.ts](../../data/skills/designPatterns/structural/structural.data.ts)

Methodological description: Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.
User-friendly description: Discover patterns for connecting, wrapping and sharing software components.

##### Adapter

Slug: adapter
Action: create
Status: implemented

[adapter.data.ts](../../data/skills/designPatterns/structural/skills/adapter.data.ts)

Methodological description: Translate the interface expected by a client into that of an existing component without rewriting that component.
User-friendly description: Connect incompatible interfaces by translating between them.

##### Bridge

Slug: bridge
Action: create
Status: implemented

[bridge.data.ts](../../data/skills/designPatterns/structural/skills/bridge.data.ts)

Methodological description: Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.
User-friendly description: Separate a component's abstraction from the implementation it uses.

##### Composite

Slug: composite
Action: create
Status: implemented

[composite.data.ts](../../data/skills/designPatterns/structural/skills/composite.data.ts)

Methodological description: Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.
User-friendly description: Treat individual objects and groups of objects through a common interface.

##### Decorator

Slug: decorator
Action: create
Status: implemented

[decorator.data.ts](../../data/skills/designPatterns/structural/skills/decorator.data.ts)

Methodological description: Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.
User-friendly description: Add behavior by wrapping an object instead of multiplying subclasses.

##### Facade

Slug: facade
Action: create
Status: implemented

[facade.data.ts](../../data/skills/designPatterns/structural/skills/facade.data.ts)

Methodological description: Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.
User-friendly description: Offer a simple entry point to a complex collection of components.

##### Flyweight

Slug: flyweight
Action: create
Status: implemented

[flyweight.data.ts](../../data/skills/designPatterns/structural/skills/flyweight.data.ts)

Methodological description: Share the immutable portion of state among many similar objects to reduce memory consumption.
User-friendly description: Share reusable object data to reduce unnecessary memory use.

##### Proxy

Slug: proxy
Action: create
Status: implemented

[proxy.data.ts](../../data/skills/designPatterns/structural/skills/proxy.data.ts)

Methodological description: Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.
User-friendly description: Control access to an object using another object with the same interface.

#### Behavioral

Slug: behavioral
Action: create
Status: implemented

Skills: 11

[behavioral.data.ts](../../data/skills/designPatterns/behavioral/behavioral.data.ts)

Methodological description: Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.
User-friendly description: Explore ways objects coordinate requests and change behavior.

##### Chain of Responsibility

Slug: chainOfResponsibility
Action: create
Status: implemented

[chainOfResponsibility.data.ts](../../data/skills/designPatterns/behavioral/skills/chainOfResponsibility.data.ts)

Methodological description: Pass a request through a chain of handlers until one processes it or passes it onward.
User-friendly description: Pass a request through handlers until one can process it.

##### Command

Slug: command
Action: create
Status: implemented

[command.data.ts](../../data/skills/designPatterns/behavioral/skills/command.data.ts)

Methodological description: Represent an action as a request object that can be stored, queued, or executed later.
User-friendly description: Represent an operation as an object that can be stored or scheduled.

##### Interpreter

Slug: interpreter
Action: create
Status: implemented

[interpreter.data.ts](../../data/skills/designPatterns/behavioral/skills/interpreter.data.ts)

Methodological description: Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.
User-friendly description: Interpret a small language using rules represented as expressions.

##### Iterator

Slug: iterator
Action: create
Status: implemented

[iterator.data.ts](../../data/skills/designPatterns/behavioral/skills/iterator.data.ts)

Methodological description: Traverse collection elements through a defined interface without exposing their internal representation.
User-friendly description: Visit collection elements without exposing how the collection is stored.

##### Mediator

Slug: mediator
Action: create
Status: implemented

[mediator.data.ts](../../data/skills/designPatterns/behavioral/skills/mediator.data.ts)

Methodological description: Move interactions between several components into a mediator so each component need not depend directly on every other one.
User-friendly description: Coordinate component interactions through a central mediator.

##### Memento

Slug: memento
Action: create
Status: implemented

[memento.data.ts](../../data/skills/designPatterns/behavioral/skills/memento.data.ts)

Methodological description: Save an external snapshot that allows restoring an object's state without revealing its internal implementation.
User-friendly description: Save an object's state so it can later be restored.

##### Observer

Slug: observer
Action: create
Status: implemented

[observer.data.ts](../../data/skills/designPatterns/behavioral/skills/observer.data.ts)

Methodological description: Notify subscribers when a source changes without knowing which particular action each subscriber will take.
User-friendly description: Notify interested subscribers when an observed object changes.

##### State

Slug: state
Action: create
Status: implemented

[state.data.ts](../../data/skills/designPatterns/behavioral/skills/state.data.ts)

Methodological description: Delegate an object's reaction to a given command to its current state object instead of using an extensive conditional tree.
User-friendly description: Change how an object reacts according to its current state.

##### Strategy

Slug: strategy
Action: create
Status: implemented

[strategy.data.ts](../../data/skills/designPatterns/behavioral/skills/strategy.data.ts)

Methodological description: Interchange algorithms sharing an interface so the solution method can change independently of the client.
User-friendly description: Swap between algorithms that all follow one shared interface.

##### Template Method

Slug: templateMethod
Action: create
Status: implemented

[templateMethod.data.ts](../../data/skills/designPatterns/behavioral/skills/templateMethod.data.ts)

Methodological description: Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.
User-friendly description: Keep an algorithm's main steps fixed while allowing selected steps to vary.

##### Visitor

Slug: visitor
Action: create
Status: implemented

[visitor.data.ts](../../data/skills/designPatterns/behavioral/skills/visitor.data.ts)

Methodological description: Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.
User-friendly description: Separate operations from the object structures on which they act.

### Artificial Intelligence

Slug: artificialIntelligence
Action: create
Status: implemented

Groups: 7 · Skills: 34

[artificialIntelligence.data.ts](../../data/skills/artificialIntelligence/artificialIntelligence.data.ts)

Methodological description: Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.
User-friendly description: Discover how artificial intelligence systems learn, predict, generate and sometimes fail.

#### AI Fundamentals

Slug: aIFundamentals
Action: create
Status: implemented

Skills: 6

[aIFundamentals.data.ts](../../data/skills/artificialIntelligence/aIFundamentals/aIFundamentals.data.ts)

Methodological description: Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.
User-friendly description: Explore the differences between programmed rules, trained models and AI tasks.

##### Distinguish Rules from Trained Models

Slug: distinguishRulesFromTrainedModels
Action: create
Status: implemented

[distinguishRulesFromTrainedModels.data.ts](../../data/skills/artificialIntelligence/aIFundamentals/skills/distinguishRulesFromTrainedModels.data.ts)

Methodological description: Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.
User-friendly description: Distinguish explicitly programmed decision rules from systems trained on data.

##### Explain Learning from Examples

Slug: explainLearningFromExamples
Action: create
Status: implemented

[explainLearningFromExamples.data.ts](../../data/skills/artificialIntelligence/aIFundamentals/skills/explainLearningFromExamples.data.ts)

Methodological description: Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.
User-friendly description: Explain how examples help a model improve its performance on new inputs.

##### Classify AI Tasks

Slug: classifyAITasks
Action: create
Status: implemented

[classifyAITasks.data.ts](../../data/skills/artificialIntelligence/aIFundamentals/skills/classifyAITasks.data.ts)

Methodological description: Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.
User-friendly description: Recognize whether an AI task classifies, predicts or generates content.

##### Identify a Potential AI Error

Slug: identifyAPotentialAIError
Action: create
Status: implemented

[identifyAPotentialAIError.data.ts](../../data/skills/artificialIntelligence/aIFundamentals/skills/identifyAPotentialAIError.data.ts)

Methodological description: Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.
User-friendly description: Spot warning signs that an AI answer may need independent checking.

##### Explain Generative AI

Slug: explainGenerativeAI
Action: create
Status: implemented

[explainGenerativeAI.data.ts](../../data/skills/artificialIntelligence/aIFundamentals/skills/explainGenerativeAI.data.ts)

Methodological description: Describe how models create new text, images, or other content based on input context and patterns learned during training.
User-friendly description: Understand how generative models create text, images or other content.

##### Explain Predictive AI

Slug: explainPredictiveAI
Action: create
Status: implemented

[explainPredictiveAI.data.ts](../../data/skills/artificialIntelligence/aIFundamentals/skills/explainPredictiveAI.data.ts)

Methodological description: Describe estimating a numerical value, category, or event probability from known features, for example forecasting rainfall.
User-friendly description: Explore how predictive systems estimate values, categories or event chances.

#### Imitation and Understanding

Slug: imitationAndUnderstanding
Action: create
Status: implemented

Skills: 2

[imitationAndUnderstanding.data.ts](../../data/skills/artificialIntelligence/imitationAndUnderstanding/imitationAndUnderstanding.data.ts)

Methodological description: Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.
User-friendly description: Examine the difference between convincing imitation and genuine understanding.

##### Explain the Turing Test

Slug: explainTheTuringTest
Action: create
Status: implemented

[explainTheTuringTest.data.ts](../../data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainTheTuringTest.data.ts)

Methodological description: Explain Alan Turing's proposed approach to evaluating whether a machine can produce dialogue that a person cannot distinguish from human responses under test conditions. Successful imitation does not establish consciousness or comprehensive understanding.
User-friendly description: Understand what the Turing Test evaluates and what it cannot establish.

##### Explain Searle's Chinese Room

Slug: explainSearlesChineseRoom
Action: create
Status: implemented

[explainSearlesChineseRoom.data.ts](../../data/skills/artificialIntelligence/imitationAndUnderstanding/skills/explainSearlesChineseRoom.data.ts)

Methodological description: Analyze John Searle's thought experiment about rule-based symbol manipulation without necessarily understanding their meaning. Distinguish a debated philosophical argument from a proven fact about the internal states of all AI systems.
User-friendly description: Explore the Chinese Room thought experiment and the debate it raises.

#### Prompting

Slug: prompting
Action: create
Status: implemented

Skills: 7

[prompting.data.ts](../../data/skills/artificialIntelligence/prompting/prompting.data.ts)

Methodological description: Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.
User-friendly description: Learn to give AI systems clearer instructions, context and constraints.

##### Specify a Prompt Objective

Slug: specifyAPromptObjective
Action: create
Status: implemented

[specifyAPromptObjective.data.ts](../../data/skills/artificialIntelligence/prompting/skills/specifyAPromptObjective.data.ts)

Methodological description: Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.
User-friendly description: State the precise task you want an AI assistant to accomplish.

##### Provide Prompt Context

Slug: providePromptContext
Action: create
Status: implemented

[providePromptContext.data.ts](../../data/skills/artificialIntelligence/prompting/skills/providePromptContext.data.ts)

Methodological description: Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.
User-friendly description: Give relevant background information that helps an AI interpret your request.

##### Specify Prompt Constraints

Slug: specifyPromptConstraints
Action: create
Status: implemented

[specifyPromptConstraints.data.ts](../../data/skills/artificialIntelligence/prompting/skills/specifyPromptConstraints.data.ts)

Methodological description: Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.
User-friendly description: Specify boundaries such as length, sources and information that must not be invented.

##### Specify an Output Format

Slug: specifyAnOutputFormat
Action: create
Status: implemented

[specifyAnOutputFormat.data.ts](../../data/skills/artificialIntelligence/prompting/skills/specifyAnOutputFormat.data.ts)

Methodological description: Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.
User-friendly description: Ask for an explicit output structure such as a table or defined fields.

##### Refine a Prompt Based on Results

Slug: refineAPromptBasedOnResults
Action: create
Status: implemented

[refineAPromptBasedOnResults.data.ts](../../data/skills/artificialIntelligence/prompting/skills/refineAPromptBasedOnResults.data.ts)

Methodological description: Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.
User-friendly description: Improve an AI request after checking what its previous response missed.

##### Specify a Role in a Prompt

Slug: specifyARoleInAPrompt
Action: create
Status: implemented

[specifyARoleInAPrompt.data.ts](../../data/skills/artificialIntelligence/prompting/skills/specifyARoleInAPrompt.data.ts)

Methodological description: State a desired subject-matter role or response style without treating the declared role as evidence of actual professional experience.
User-friendly description: Set a useful perspective or style without mistaking it for real expertise.

##### Break a Complex Prompt into Subtasks

Slug: breakAComplexPromptIntoSubtasks
Action: create
Status: implemented

[breakAComplexPromptIntoSubtasks.data.ts](../../data/skills/artificialIntelligence/prompting/skills/breakAComplexPromptIntoSubtasks.data.ts)

Methodological description: Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.
User-friendly description: Divide a complicated request into smaller steps with results you can verify.

#### Model Architectures and Resources

Slug: modelArchitecturesAndResources
Action: create
Status: implemented

Skills: 5

[modelArchitecturesAndResources.data.ts](../../data/skills/artificialIntelligence/modelArchitecturesAndResources/modelArchitecturesAndResources.data.ts)

Methodological description: Compare AI model characteristics: activation of components, numerical precision, latency, memory requirements, and fit for a task. These depend on the model and execution conditions, not on a universal AI ranking.
User-friendly description: Explore how different AI model architectures affect performance and resource needs.

##### Compare Dense and MoE Models

Slug: compareDenseAndMoEModels
Action: create
Status: implemented

[compareDenseAndMoEModels.data.ts](../../data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareDenseAndMoEModels.data.ts)

Methodological description: Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.
User-friendly description: Compare models that activate many parameters with models using selected experts.

##### Explain Quantization

Slug: explainQuantization
Action: create
Status: implemented

[explainQuantization.data.ts](../../data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/explainQuantization.data.ts)

Methodological description: Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.
User-friendly description: Understand how reduced numerical precision can save memory but change quality.

##### Compare Response Latency

Slug: compareResponseLatency
Action: create
Status: implemented

[compareResponseLatency.data.ts](../../data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareResponseLatency.data.ts)

Methodological description: Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.
User-friendly description: Compare the delay before an AI response begins separately from generation speed.

##### Compare Model Memory Requirements

Slug: compareModelMemoryRequirements
Action: create
Status: implemented

[compareModelMemoryRequirements.data.ts](../../data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/compareModelMemoryRequirements.data.ts)

Methodological description: Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.
User-friendly description: Estimate the memory required to run a model rather than just store its files.

##### Choose a Model for a Task

Slug: chooseAModelForATask
Action: create
Status: implemented

[chooseAModelForATask.data.ts](../../data/skills/artificialIntelligence/modelArchitecturesAndResources/skills/chooseAModelForATask.data.ts)

Methodological description: Weigh independent constraints for a scenario—accuracy, latency, available memory, cost, and privacy—and justify the selection. No single model is best on every criterion simultaneously.
User-friendly description: Choose a model based on task quality, speed, cost, privacy and available memory.

#### Reliability and Responsible AI Use

Slug: reliabilityAndResponsibleAIUse
Action: create
Status: implemented

Skills: 4

[reliabilityAndResponsibleAIUse.data.ts](../../data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data.ts)

Methodological description: Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.
User-friendly description: Learn to check AI outputs and consider their effects on people.

##### Verify Facts in an AI Response

Slug: verifyFactsInAnAIResponse
Action: create
Status: implemented

[verifyFactsInAnAIResponse.data.ts](../../data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/verifyFactsInAnAIResponse.data.ts)

Methodological description: Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.
User-friendly description: Check factual claims from an AI response using reliable independent sources.

##### Recognize AI Bias Risks

Slug: recognizeAIBiasRisks
Action: create
Status: implemented

[recognizeAIBiasRisks.data.ts](../../data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/recognizeAIBiasRisks.data.ts)

Methodological description: Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.
User-friendly description: Recognize when AI systems might treat groups or individuals unfairly.

##### Protect Personal Data in Prompts

Slug: protectPersonalDataInPrompts
Action: create
Status: implemented

[protectPersonalDataInPrompts.data.ts](../../data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/protectPersonalDataInPrompts.data.ts)

Methodological description: Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.
User-friendly description: Remove unnecessary personal information before submitting an AI request.

##### Explain Human Responsibility for AI-Assisted Decisions

Slug: explainHumanResponsibilityForAIAssistedDecisions
Action: create
Status: implemented

[explainHumanResponsibilityForAIAssistedDecisions.data.ts](../../data/skills/artificialIntelligence/reliabilityAndResponsibleAIUse/skills/explainHumanResponsibilityForAIAssistedDecisions.data.ts)

Methodological description: Distinguish an automatically generated recommendation from a decision for which a person or organization is accountable. Verification of grounds, the ability to contest results, and control over final action matter.
User-friendly description: Understand why people remain accountable for decisions assisted by AI.

#### Language Model Tokens and Context

Slug: languageModelTokensAndContext
Action: create
Status: implemented

Skills: 6

[languageModelTokensAndContext.data.ts](../../data/skills/artificialIntelligence/languageModelTokensAndContext/languageModelTokensAndContext.data.ts)

Methodological description: Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.
User-friendly description: Discover how language models divide text into tokens and use context.

##### Explain Tokens

Slug: explainTokens
Action: create
Status: implemented

[explainTokens.data.ts](../../data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainTokens.data.ts)

Methodological description: Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.
User-friendly description: Understand tokens as model-specific units of text representation.

##### Distinguish Tokens, Characters, and Words

Slug: distinguishTokensCharactersAndWords
Action: create
Status: implemented

[distinguishTokensCharactersAndWords.data.ts](../../data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishTokensCharactersAndWords.data.ts)

Methodological description: Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.
User-friendly description: Recognize why characters, words and tokens are not the same thing.

##### Explain Next-Token Selection

Slug: explainNextTokenSelection
Action: create
Status: implemented

[explainNextTokenSelection.data.ts](../../data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainNextTokenSelection.data.ts)

Methodological description: A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.
User-friendly description: Explain how language models choose a possible next token from context.

##### Distinguish Sampling from Choosing the Most Likely Token

Slug: distinguishSamplingFromChoosingTheMostLikelyToken
Action: create
Status: implemented

[distinguishSamplingFromChoosingTheMostLikelyToken.data.ts](../../data/skills/artificialIntelligence/languageModelTokensAndContext/skills/distinguishSamplingFromChoosingTheMostLikelyToken.data.ts)

Methodological description: Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.
User-friendly description: Compare choosing the most likely token with sampling other possible continuations.

##### Explain a Language Model's Context Window

Slug: explainALanguageModelsContextWindow
Action: create
Status: implemented

[explainALanguageModelsContextWindow.data.ts](../../data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainALanguageModelsContextWindow.data.ts)

Methodological description: Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.
User-friendly description: Understand why a language model can use only a limited amount of context.

##### Explain Context Window Overflow

Slug: explainContextWindowOverflow
Action: create
Status: implemented

[explainContextWindowOverflow.data.ts](../../data/skills/artificialIntelligence/languageModelTokensAndContext/skills/explainContextWindowOverflow.data.ts)

Methodological description: Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.
User-friendly description: Explore what can happen when a request exceeds a model's context limit.

#### Safe Interaction with AI

Slug: safeInteractionWithAI
Action: create
Status: implemented

Skills: 4

[safeInteractionWithAI.data.ts](../../data/skills/artificialIntelligence/safeInteractionWithAI/safeInteractionWithAI.data.ts)

Methodological description: Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.
User-friendly description: Recognize interaction patterns that can make AI advice misleading or unhealthy.

##### Recognize AI Sycophancy

Slug: recognizeAISycophancy
Action: create
Status: implemented

[recognizeAISycophancy.data.ts](../../data/skills/artificialIntelligence/safeInteractionWithAI/skills/recognizeAISycophancy.data.ts)

Methodological description: Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.
User-friendly description: Spot AI agreement or praise that is not supported by evidence.

##### Explain Risks of Overreliance on AI

Slug: explainRisksOfOverrelianceOnAI
Action: create
Status: implemented

[explainRisksOfOverrelianceOnAI.data.ts](../../data/skills/artificialIntelligence/safeInteractionWithAI/skills/explainRisksOfOverrelianceOnAI.data.ts)

Methodological description: Explain why extended conversations with chatbots should not replace interactions with people, independent checks, or asking for help.
User-friendly description: Understand why AI should not replace independent thinking or human support.

##### Identify Untrusted Instructions in AI Input

Slug: identifyUntrustedInstructionsInAIInput
Action: create
Status: implemented

[identifyUntrustedInstructionsInAIInput.data.ts](../../data/skills/artificialIntelligence/safeInteractionWithAI/skills/identifyUntrustedInstructionsInAIInput.data.ts)

Methodological description: Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.
User-friendly description: Recognize instructions hidden in external material that should not control an assistant.

##### Protect Secrets When Using AI

Slug: protectSecretsWhenUsingAI
Action: create
Status: implemented

[protectSecretsWhenUsingAI.data.ts](../../data/skills/artificialIntelligence/safeInteractionWithAI/skills/protectSecretsWhenUsingAI.data.ts)

Methodological description: Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.
User-friendly description: Protect passwords, access keys and confidential information when working with AI.

### Robotics and Automation

Slug: roboticsAndAutomation
Action: create
Status: implemented

Groups: 2 · Skills: 8

[roboticsAndAutomation.data.ts](../../data/skills/roboticsAndAutomation/roboticsAndAutomation.data.ts)

Methodological description: Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.
User-friendly description: Explore how sensors, programming and actuators allow robots to respond to their surroundings.

#### Robotic System Components

Slug: roboticSystemComponents
Action: create
Status: implemented

Skills: 4

[roboticSystemComponents.data.ts](../../data/skills/roboticsAndAutomation/roboticSystemComponents/roboticSystemComponents.data.ts)

Methodological description: Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.
User-friendly description: Learn how a robot detects conditions, decides what to do and acts.

##### Identify a Sensor's Purpose

Slug: identifyASensorsPurpose
Action: create
Status: implemented

[identifyASensorsPurpose.data.ts](../../data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyASensorsPurpose.data.ts)

Methodological description: Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.
User-friendly description: Recognize sensors that measure light, distance, temperature or other conditions.

##### Identify an Actuator's Purpose

Slug: identifyAnActuatorsPurpose
Action: create
Status: implemented

[identifyAnActuatorsPurpose.data.ts](../../data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyAnActuatorsPurpose.data.ts)

Methodological description: Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.
User-friendly description: Explain how motors, lights and other actuators carry out commands.

##### Identify a Robot Controller

Slug: identifyARobotController
Action: create
Status: implemented

[identifyARobotController.data.ts](../../data/skills/roboticsAndAutomation/roboticSystemComponents/skills/identifyARobotController.data.ts)

Methodological description: Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.
User-friendly description: Identify the controller that converts sensor inputs into programmed actions.

##### Model the Sensor-to-Action Relationship

Slug: modelTheSensorToActionRelationship
Action: create
Status: implemented

[modelTheSensorToActionRelationship.data.ts](../../data/skills/roboticsAndAutomation/roboticSystemComponents/skills/modelTheSensorToActionRelationship.data.ts)

Methodological description: Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.
User-friendly description: Link a sensor measurement, a decision rule and an actuator response.

#### Robot Control

Slug: robotControl
Action: create
Status: implemented

Skills: 4

[robotControl.data.ts](../../data/skills/roboticsAndAutomation/robotControl/robotControl.data.ts)

Methodological description: Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.
User-friendly description: Create and improve instructions for a robot's movements and responses.

##### Create a Robot Movement Sequence

Slug: createARobotMovementSequence
Action: create
Status: implemented

[createARobotMovementSequence.data.ts](../../data/skills/roboticsAndAutomation/robotControl/skills/createARobotMovementSequence.data.ts)

Methodological description: Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.
User-friendly description: Plan the ordered commands that move a robot to its destination.

##### Implement Robot Obstacle Response

Slug: implementRobotObstacleResponse
Action: create
Status: implemented

[implementRobotObstacleResponse.data.ts](../../data/skills/roboticsAndAutomation/robotControl/skills/implementRobotObstacleResponse.data.ts)

Methodological description: Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.
User-friendly description: Make a robot stop, turn or avoid an obstacle when a sensor detects it.

##### Configure a Repeated Robot Action

Slug: configureARepeatedRobotAction
Action: create
Status: implemented

[configureARepeatedRobotAction.data.ts](../../data/skills/roboticsAndAutomation/robotControl/skills/configureARepeatedRobotAction.data.ts)

Methodological description: Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.
User-friendly description: Set how many times a robot repeats an action or when it should stop.

##### Debug Robot Behavior

Slug: debugRobotBehavior
Action: create
Status: implemented

[debugRobotBehavior.data.ts](../../data/skills/roboticsAndAutomation/robotControl/skills/debugRobotBehavior.data.ts)

Methodological description: Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.
User-friendly description: Find whether a robot's unexpected behavior comes from sensing, logic or action.

### Digital Safety and Responsibility

Slug: digitalSafetyAndResponsibility
Action: create
Status: implemented

Groups: 4 · Skills: 20

[digitalSafetyAndResponsibility.data.ts](../../data/skills/digitalSafetyAndResponsibility/digitalSafetyAndResponsibility.data.ts)

Methodological description: Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.
User-friendly description: Learn to protect information, respect other people and understand digital technology's effects.

#### Privacy

Slug: privacy
Action: create
Status: implemented

Skills: 5

[privacy.data.ts](../../data/skills/digitalSafetyAndResponsibility/privacy/privacy.data.ts)

Methodological description: Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.
User-friendly description: Discover how sharing information online can affect privacy.

##### Identify Personal Data

Slug: identifyPersonalData
Action: create
Status: implemented

[identifyPersonalData.data.ts](../../data/skills/digitalSafetyAndResponsibility/privacy/skills/identifyPersonalData.data.ts)

Methodological description: Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.
User-friendly description: Recognize information that can identify a person, even when combined with other details.

##### Choose Safe Data-Sharing Methods

Slug: chooseSafeDataSharingMethods
Action: create
Status: implemented

[chooseSafeDataSharingMethods.data.ts](../../data/skills/digitalSafetyAndResponsibility/privacy/skills/chooseSafeDataSharingMethods.data.ts)

Methodological description: Select an appropriate audience and channel, considering privacy, permissions, and the risk of forwarding. Public information may remain accessible even after deletion from its original service.
User-friendly description: Choose who may receive sensitive information and how to share it safely.

##### Recognize a Digital Footprint

Slug: recognizeADigitalFootprint
Action: create
Status: implemented

[recognizeADigitalFootprint.data.ts](../../data/skills/digitalSafetyAndResponsibility/privacy/skills/recognizeADigitalFootprint.data.ts)

Methodological description: Connect online actions with records retained by services or other people, such as posts, comments, and access history. Visibility only to friends does not ensure the consequences disappear.
User-friendly description: Understand how posts and online actions can leave records that persist.

##### Distinguish a Private Chat from a Public Link

Slug: distinguishAPrivateChatFromAPublicLink
Action: create
Status: implemented

[distinguishAPrivateChatFromAPublicLink.data.ts](../../data/skills/digitalSafetyAndResponsibility/privacy/skills/distinguishAPrivateChatFromAPublicLink.data.ts)

Methodological description: Check who can access a shared conversation or document; do not automatically assume a link is private.
User-friendly description: Check who can open a shared chat or document rather than assuming its link is private.

##### Explain Data Re-identification

Slug: explainDataReIdentification
Action: create
Status: implemented

[explainDataReIdentification.data.ts](../../data/skills/digitalSafetyAndResponsibility/privacy/skills/explainDataReIdentification.data.ts)

Methodological description: Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.
User-friendly description: Explain how separately collected details can identify a person again.

#### Account Protection

Slug: accountProtection
Action: create
Status: implemented

Skills: 9

[accountProtection.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/accountProtection.data.ts)

Methodological description: Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.
User-friendly description: Explore how to protect accounts and respond to suspicious messages.

##### Create a Strong Passphrase

Slug: createAStrongPassphrase
Action: create
Status: implemented

[createAStrongPassphrase.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/createAStrongPassphrase.data.ts)

Methodological description: Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.
User-friendly description: Create long, unpredictable passphrases that are different for each account.

##### Explain Multi-Factor Authentication

Slug: explainMultiFactorAuthentication
Action: create
Status: implemented

[explainMultiFactorAuthentication.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainMultiFactorAuthentication.data.ts)

Methodological description: Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.
User-friendly description: Understand how a second independent authentication factor protects an account.

##### Configure Multi-Factor Authentication

Slug: configureMultiFactorAuthentication
Action: create
Status: implemented

[configureMultiFactorAuthentication.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/configureMultiFactorAuthentication.data.ts)

Methodological description: In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.
User-friendly description: Set up an additional sign-in factor and plan how to recover access safely.

##### Recognize a Phishing Message

Slug: recognizeAPhishingMessage
Action: create
Status: implemented

[recognizeAPhishingMessage.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/recognizeAPhishingMessage.data.ts)

Methodological description: Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.
User-friendly description: Recognize messages that impersonate others to steal passwords or codes.

##### Respond to Suspicious Digital Contact

Slug: respondToSuspiciousDigitalContact
Action: create
Status: implemented

[respondToSuspiciousDigitalContact.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/respondToSuspiciousDigitalContact.data.ts)

Methodological description: Choose an immediate safe response to an unclear request or online pressure: do not reveal secrets, stop engaging, verify identity through an independent channel, and contact a trusted adult or official support.
User-friendly description: Respond safely to suspicious contacts and verify requests independently.

##### Explain Why Software Updates Matter

Slug: explainWhySoftwareUpdatesMatter
Action: create
Status: implemented

[explainWhySoftwareUpdatesMatter.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/explainWhySoftwareUpdatesMatter.data.ts)

Methodological description: Explain how trusted updates can patch vulnerabilities and defects exploited by attackers; distinguish official updates from fake prompts to install unfamiliar files.
User-friendly description: Learn why official software updates can help fix security weaknesses.

##### Assess the Risk of Following a Link

Slug: assessTheRiskOfFollowingALink
Action: create
Status: implemented

[assessTheRiskOfFollowingALink.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessTheRiskOfFollowingALink.data.ts)

Methodological description: Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.
User-friendly description: Assess what could happen when a suspicious link is opened or followed.

##### Verify a Website's Domain

Slug: verifyAWebsitesDomain
Action: create
Status: implemented

[verifyAWebsitesDomain.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/verifyAWebsitesDomain.data.ts)

Methodological description: Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.
User-friendly description: Read the real domain in a website address and spot misleading lookalikes.

##### Assess an Email Sender's Authenticity

Slug: assessAnEmailSendersAuthenticity
Action: create
Status: implemented

[assessAnEmailSendersAuthenticity.data.ts](../../data/skills/digitalSafetyAndResponsibility/accountProtection/skills/assessAnEmailSendersAuthenticity.data.ts)

Methodological description: Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.
User-friendly description: Check an email sender's identity beyond the displayed name or picture.

#### Ethics of Digital Interaction

Slug: ethicsOfDigitalInteraction
Action: create
Status: implemented

Skills: 4

[ethicsOfDigitalInteraction.data.ts](../../data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data.ts)

Methodological description: Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.
User-friendly description: Learn to communicate respectfully and respect creators' permissions.

##### Identify Appropriate Online Behavior

Slug: identifyAppropriateOnlineBehavior
Action: create
Status: implemented

[identifyAppropriateOnlineBehavior.data.ts](../../data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/identifyAppropriateOnlineBehavior.data.ts)

Methodological description: Distinguish respectful communication from repeated humiliation, threats, and bullying. Disagreement alone is not cyberbullying, and anonymity does not make harmful messages acceptable.
User-friendly description: Recognize threats, harassment and bullying in digital communication.

##### Attribute Digital Materials

Slug: attributeDigitalMaterials
Action: create
Status: implemented

[attributeDigitalMaterials.data.ts](../../data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/attributeDigitalMaterials.data.ts)

Methodological description: When using another person's text, images, sound, or code, credit the creator and original source in an appropriate format. Attribution does not replace permission and does not override licensing terms.
User-friendly description: Credit the original creators of digital content you use.

##### Choose a Safe Way to Report a Problem

Slug: chooseASafeWayToReportAProblem
Action: create
Status: implemented

[chooseASafeWayToReportAProblem.data.ts](../../data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/chooseASafeWayToReportAProblem.data.ts)

Methodological description: Determine when to contact a trusted adult, moderator, or official support and what minimum information to share without exposing other people's data. Selecting a reporting recipient differs from the immediate response to a dangerous message.
User-friendly description: Choose appropriate trusted people or official channels to report online problems.

##### Distinguish Digital Content Licenses

Slug: distinguishDigitalContentLicenses
Action: create
Status: implemented

[distinguishDigitalContentLicenses.data.ts](../../data/skills/digitalSafetyAndResponsibility/ethicsOfDigitalInteraction/skills/distinguishDigitalContentLicenses.data.ts)

Methodological description: Read basic permissions and restrictions for copying, changing, and sharing text, images, sounds, or programs. Free access, the public domain, and open licenses are different legal conditions.
User-friendly description: Distinguish copyright restrictions, open licenses and public-domain content.

#### Social and Environmental Impact of Computing

Slug: socialAndEnvironmentalImpactOfComputing
Action: create
Status: implemented

Skills: 2

[socialAndEnvironmentalImpactOfComputing.data.ts](../../data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data.ts)

Methodological description: Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.
User-friendly description: Explore how computing affects fairness, resource use and the environment.

##### Assess an Algorithm's Impact on User Groups

Slug: assessAnAlgorithmsImpactOnUserGroups
Action: create
Status: implemented

[assessAnAlgorithmsImpactOnUserGroups.data.ts](../../data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessAnAlgorithmsImpactOnUserGroups.data.ts)

Methodological description: Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.
User-friendly description: Consider whether an algorithm's outcomes differ unfairly between user groups.

##### Assess Computing's Environmental Impact

Slug: assessComputingsEnvironmentalImpact
Action: create
Status: implemented

[assessComputingsEnvironmentalImpact.data.ts](../../data/skills/digitalSafetyAndResponsibility/socialAndEnvironmentalImpactOfComputing/skills/assessComputingsEnvironmentalImpact.data.ts)

Methodological description: Connect devices and services with energy consumption, resource extraction, hardware lifespan, and electronic waste. Comparing alternatives requires more than electricity used during one run.
User-friendly description: Compare computing's energy, material and electronic-waste impacts.

### Digital Product UX

Slug: digitalProductUX
Action: create
Status: implemented

Groups: 3 · Skills: 8

[digitalProductUX.data.ts](../../data/skills/digitalProductUX/digitalProductUX.data.ts)

Methodological description: An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.
User-friendly description: Design digital experiences that people can understand, navigate and use accessibly.

#### Digital Interaction Design

Slug: digitalInteractionDesign
Action: create
Status: implemented

Skills: 4

[digitalInteractionDesign.data.ts](../../data/skills/digitalProductUX/digitalInteractionDesign/digitalInteractionDesign.data.ts)

Methodological description: Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.
User-friendly description: Explore how to plan intuitive actions and helpful responses in digital interfaces.

##### Identify a Digital Product User's Goal

Slug: identifyADigitalProductUsersGoal
Action: create
Status: implemented

[identifyADigitalProductUsersGoal.data.ts](../../data/skills/digitalProductUX/digitalInteractionDesign/skills/identifyADigitalProductUsersGoal.data.ts)

Methodological description: Determine the specific action a person intends to perform in a program or on a digital device, distinguishing the user goal from internal technical system operations.
User-friendly description: Identify what someone wants to accomplish in an app or digital device.

##### Design Digital Interface Navigation

Slug: designDigitalInterfaceNavigation
Action: create
Status: implemented

[designDigitalInterfaceNavigation.data.ts](../../data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceNavigation.data.ts)

Methodological description: Organize transitions among screens, sections, or states so users can find desired actions and understand their current position within a digital product.
User-friendly description: Arrange screens and navigation so people can find the right actions.

##### Design Digital Interface Feedback

Slug: designDigitalInterfaceFeedback
Action: create
Status: implemented

[designDigitalInterfaceFeedback.data.ts](../../data/skills/digitalProductUX/digitalInteractionDesign/skills/designDigitalInterfaceFeedback.data.ts)

Methodological description: Provide clear feedback about taps, loading, errors, and completed actions so people need not guess whether the system has responded.
User-friendly description: Make buttons, loading states and errors give understandable feedback.

##### Prevent Common Digital Interaction Errors

Slug: preventCommonDigitalInteractionErrors
Action: create
Status: implemented

[preventCommonDigitalInteractionErrors.data.ts](../../data/skills/digitalProductUX/digitalInteractionDesign/skills/preventCommonDigitalInteractionErrors.data.ts)

Methodological description: Identify actions that are easy to perform incorrectly and choose digital safeguards, such as clear labels, input validation, or confirmation before irreversible operations.
User-friendly description: Use labels, validation and confirmation to prevent avoidable mistakes.

#### Accessibility

Slug: accessibility
Action: create
Status: implemented

Skills: 2

[accessibility.data.ts](../../data/skills/digitalProductUX/accessibility/accessibility.data.ts)

Methodological description: Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.
User-friendly description: Discover how different abilities and input methods affect digital access.

##### Identify Needs of Users with Different Abilities

Slug: identifyNeedsOfUsersWithDifferentAbilities
Action: create
Status: implemented

[identifyNeedsOfUsersWithDifferentAbilities.data.ts](../../data/skills/digitalProductUX/accessibility/skills/identifyNeedsOfUsersWithDifferentAbilities.data.ts)

Methodological description: Determine how people with different vision, hearing, motor abilities, or input methods access information and control a digital product. Mouse-only controls, for example, create barriers for keyboard users.
User-friendly description: Recognize needs of people who use keyboards, enlarged text or assistive technology.

##### Test Digital Interaction Accessibility

Slug: testDigitalInteractionAccessibility
Action: create
Status: implemented

[testDigitalInteractionAccessibility.data.ts](../../data/skills/digitalProductUX/accessibility/skills/testDigitalInteractionAccessibility.data.ts)

Methodological description: Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.
User-friendly description: Test an interface without a mouse or sound and record obstacles.

#### Experience Evaluation and Ethics

Slug: experienceEvaluationAndEthics
Action: create
Status: implemented

Skills: 2

[experienceEvaluationAndEthics.data.ts](../../data/skills/digitalProductUX/experienceEvaluationAndEthics/experienceEvaluationAndEthics.data.ts)

Methodological description: Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.
User-friendly description: Explore how user testing and honest design improve digital products.

##### Test Digital Interface Usability

Slug: testDigitalInterfaceUsability
Action: create
Status: implemented

[testDigitalInterfaceUsability.data.ts](../../data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/testDigitalInterfaceUsability.data.ts)

Methodological description: Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.
User-friendly description: Observe whether a person can complete a real task without extra hints.

##### Identify Manipulative Interface Patterns

Slug: identifyManipulativeInterfacePatterns
Action: create
Status: implemented

[identifyManipulativeInterfacePatterns.data.ts](../../data/skills/digitalProductUX/experienceEvaluationAndEthics/skills/identifyManipulativeInterfacePatterns.data.ts)

Methodological description: Recognize designs that covertly steer people toward unwanted choices, such as confusing cancellation, preselected add-ons, or deceptive button wording. Distinguish persuasive design from hidden restrictions on informed choice.
User-friendly description: Recognize interface tricks that hide costs, force choices or obstruct cancellation.

### Digital Creativity and Games

Slug: digitalCreativityAndGames
Action: create
Status: implemented

Groups: 3 · Skills: 10

[digitalCreativityAndGames.data.ts](../../data/skills/digitalCreativityAndGames/digitalCreativityAndGames.data.ts)

Methodological description: Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.
User-friendly description: Create digital media, design playable rules and explore procedural generation.

#### Digital Materials

Slug: digitalMaterials
Action: create
Status: implemented

Skills: 3

[digitalMaterials.data.ts](../../data/skills/digitalCreativityAndGames/digitalMaterials/digitalMaterials.data.ts)

Methodological description: Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.
User-friendly description: Learn to create, edit and choose tools for purposeful digital content.

##### Create a Simple Digital Artifact

Slug: createASimpleDigitalArtifact
Action: create
Status: implemented

[createASimpleDigitalArtifact.data.ts](../../data/skills/digitalCreativityAndGames/digitalMaterials/skills/createASimpleDigitalArtifact.data.ts)

Methodological description: Combine text, images, or other elements into a finished artifact with a defined message and audience, such as an explanatory card. Meaningful coherence matters more than a particular editor.
User-friendly description: Make a coherent digital card, image or other artifact for a particular audience.

##### Edit a Digital Artifact

Slug: editADigitalArtifact
Action: create
Status: implemented

[editADigitalArtifact.data.ts](../../data/skills/digitalCreativityAndGames/digitalMaterials/skills/editADigitalArtifact.data.ts)

Methodological description: Make purposeful changes to an existing file while preserving intended meaning: correct a caption, reorder elements, or resize an image. This is distinct from creating a new artifact.
User-friendly description: Improve an existing digital file without losing its intended meaning.

##### Choose a Digital Creative Tool

Slug: chooseADigitalCreativeTool
Action: create
Status: implemented

[chooseADigitalCreativeTool.data.ts](../../data/skills/digitalCreativityAndGames/digitalMaterials/skills/chooseADigitalCreativeTool.data.ts)

Methodological description: Match a tool's technical capabilities to desired outcomes, such as distinguishing an image editor from a spreadsheet tool. This competency does not require Informatics to teach the internal structure of tools students happen to use in other subjects.
User-friendly description: Choose creative software that matches what you need to produce.

#### Game Design

Slug: gameDesign
Action: create
Status: implemented

Skills: 3

[gameDesign.data.ts](../../data/skills/digitalCreativityAndGames/gameDesign/gameDesign.data.ts)

Methodological description: Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.
User-friendly description: Explore how rules and player actions shape the experience of a game.

##### Formulate a Game Rule

Slug: formulateAGameRule
Action: create
Status: implemented

[formulateAGameRule.data.ts](../../data/skills/digitalCreativityAndGames/gameDesign/skills/formulateAGameRule.data.ts)

Methodological description: State a condition, permitted action, or consequence clearly enough that players interpret it consistently—for example, when points are awarded and when a round ends.
User-friendly description: Write a game rule clearly enough that players know what is allowed.

##### Design a Game Mechanic

Slug: designAGameMechanic
Action: create
Status: implemented

[designAGameMechanic.data.ts](../../data/skills/digitalCreativityAndGames/gameDesign/skills/designAGameMechanic.data.ts)

Methodological description: Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.
User-friendly description: Connect a player's action to changes in game state and feedback.

##### Test the Balance of a Simple Game

Slug: testTheBalanceOfASimpleGame
Action: create
Status: implemented

[testTheBalanceOfASimpleGame.data.ts](../../data/skills/digitalCreativityAndGames/gameDesign/skills/testTheBalanceOfASimpleGame.data.ts)

Methodological description: Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.
User-friendly description: Test whether a game's rules make it fair, challenging and possible to finish.

#### Procedural Generation

Slug: proceduralGeneration
Action: create
Status: implemented

Skills: 4

[proceduralGeneration.data.ts](../../data/skills/digitalCreativityAndGames/proceduralGeneration/proceduralGeneration.data.ts)

Methodological description: Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.
User-friendly description: Discover how algorithms can create many content variations from compact rules.

##### Explain Procedural Resource Generation

Slug: explainProceduralResourceGeneration
Action: create
Status: implemented

[explainProceduralResourceGeneration.data.ts](../../data/skills/digitalCreativityAndGames/proceduralGeneration/skills/explainProceduralResourceGeneration.data.ts)

Methodological description: Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.
User-friendly description: Explain how a generator creates resources instead of storing every finished variation.

##### Configure Generator Parameters

Slug: configureGeneratorParameters
Action: create
Status: implemented

[configureGeneratorParameters.data.ts](../../data/skills/digitalCreativityAndGames/proceduralGeneration/skills/configureGeneratorParameters.data.ts)

Methodological description: Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.
User-friendly description: Change generator settings to control the appearance or quantity of output.

##### Reproduce Results Using a Generation Seed

Slug: reproduceResultsUsingAGenerationSeed
Action: create
Status: implemented

[reproduceResultsUsingAGenerationSeed.data.ts](../../data/skills/digitalCreativityAndGames/proceduralGeneration/skills/reproduceResultsUsingAGenerationSeed.data.ts)

Methodological description: Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.
User-friendly description: Understand how a fixed seed and unchanged rules reproduce the same result.

##### Compare Resource Storage and Generation

Slug: compareResourceStorageAndGeneration
Action: create
Status: implemented

[compareResourceStorageAndGeneration.data.ts](../../data/skills/digitalCreativityAndGames/proceduralGeneration/skills/compareResourceStorageAndGeneration.data.ts)

Methodological description: Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.
User-friendly description: Compare the storage saved by procedural generation with the computation it requires.

### Data Structures

Slug: dataStructures
Action: create
Status: implemented

Groups: 8 · Skills: 34

[dataStructures.data.ts](../../data/skills/dataStructures/dataStructures.data.ts)

Methodological description: Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.
User-friendly description: Learn how collections, keys, trees and networks organize data for different operations.

#### Sequences

Slug: sequences
Action: create
Status: implemented

Skills: 7

[sequences.data.ts](../../data/skills/dataStructures/sequences/sequences.data.ts)

Methodological description: Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.
User-friendly description: Explore ordered collections and how to access, add and remove their elements.

##### Explain Array Structure

Slug: explainArrayStructure
Action: create
Status: implemented

[explainArrayStructure.data.ts](../../data/skills/dataStructures/sequences/skills/explainArrayStructure.data.ts)

Methodological description: An array holds items at defined positions and supports index-based access; rules for length and element types depend on the language.
User-friendly description: Understand how arrays store items at positions identified by indexes.

##### Explain List Structure

Slug: explainListStructure
Action: create
Status: implemented

[explainListStructure.data.ts](../../data/skills/dataStructures/sequences/skills/explainListStructure.data.ts)

Methodological description: A list represents an ordered collection with element operations, regardless of whether its underlying representation uses an array or linked nodes.
User-friendly description: Recognize lists as ordered collections that can be represented in different ways.

##### Distinguish Arrays from Linked Lists

Slug: distinguishArraysFromLinkedLists
Action: create
Status: implemented

[distinguishArraysFromLinkedLists.data.ts](../../data/skills/dataStructures/sequences/skills/distinguishArraysFromLinkedLists.data.ts)

Methodological description: Indexed arrays and chains of linked nodes offer different access methods and modification costs.
User-friendly description: Compare indexed arrays with chains of linked nodes.

##### Access a Sequence Element by Index

Slug: accessASequenceElementByIndex
Action: create
Status: implemented

[accessASequenceElementByIndex.data.ts](../../data/skills/dataStructures/sequences/skills/accessASequenceElementByIndex.data.ts)

Methodological description: Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.
User-friendly description: Retrieve a sequence item using its index without going outside valid positions.

##### Insert an Element into a Sequence

Slug: insertAnElementIntoASequence
Action: create
Status: implemented

[insertAnElementIntoASequence.data.ts](../../data/skills/dataStructures/sequences/skills/insertAnElementIntoASequence.data.ts)

Methodological description: Add a new item at a specified position and predict how it affects the order of other items or links between nodes.
User-friendly description: Insert an item at the right place in an ordered sequence.

##### Remove an Element from a Sequence

Slug: removeAnElementFromASequence
Action: create
Status: implemented

[removeAnElementFromASequence.data.ts](../../data/skills/dataStructures/sequences/skills/removeAnElementFromASequence.data.ts)

Methodological description: Delete an item at a position while preserving the proper order and accessibility of the remaining elements.
User-friendly description: Remove an item while preserving the remaining sequence.

##### Traverse a Sequence

Slug: traverseASequence
Action: create
Status: implemented

[traverseASequence.data.ts](../../data/skills/dataStructures/sequences/skills/traverseASequence.data.ts)

Methodological description: Visit a collection's elements in order from beginning to end without skipping positions or performing unnecessary repetitions.
User-friendly description: Visit each element in a sequence in order.

#### Stack

Slug: stack
Action: create
Status: implemented

Skills: 3

[stack.data.ts](../../data/skills/dataStructures/stack/stack.data.ts)

Methodological description: A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.
User-friendly description: Discover how a stack gives access to the most recently added item.

##### Explain LIFO

Slug: explainLIFO
Action: create
Status: implemented

[explainLIFO.data.ts](../../data/skills/dataStructures/stack/skills/explainLIFO.data.ts)

Methodological description: In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.
User-friendly description: Understand why a stack returns the latest added item first.

##### Push an Element onto a Stack

Slug: pushAnElementOntoAStack
Action: create
Status: implemented

[pushAnElementOntoAStack.data.ts](../../data/skills/dataStructures/stack/skills/pushAnElementOntoAStack.data.ts)

Methodological description: Use `push` to place a new value on top without changing the order of previously added elements.
User-friendly description: Place a new element on top of a stack.

##### Pop an Element from a Stack

Slug: popAnElementFromAStack
Action: create
Status: implemented

[popAnElementFromAStack.data.ts](../../data/skills/dataStructures/stack/skills/popAnElementFromAStack.data.ts)

Methodological description: Use `pop` to remove the top value while accounting for the special case of an empty stack.
User-friendly description: Remove the most recent element while checking whether a stack is empty.

#### Queue

Slug: queue
Action: create
Status: implemented

Skills: 3

[queue.data.ts](../../data/skills/dataStructures/queue/queue.data.ts)

Methodological description: A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.
User-friendly description: Learn how a queue processes items in the order they arrived.

##### Explain FIFO

Slug: explainFIFO
Action: create
Status: implemented

[explainFIFO.data.ts](../../data/skills/dataStructures/queue/skills/explainFIFO.data.ts)

Methodological description: In a queue, the earliest added element is served first unless separate priority rules apply.
User-friendly description: Explain why the earliest element in a queue leaves first.

##### Enqueue an Element

Slug: enqueueAnElement
Action: create
Status: implemented

[enqueueAnElement.data.ts](../../data/skills/dataStructures/queue/skills/enqueueAnElement.data.ts)

Methodological description: Add a value to the back without rearranging those already waiting.
User-friendly description: Add a new item to the back of a queue.

##### Dequeue an Element

Slug: dequeueAnElement
Action: create
Status: implemented

[dequeueAnElement.data.ts](../../data/skills/dataStructures/queue/skills/dequeueAnElement.data.ts)

Methodological description: Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.
User-friendly description: Remove the front item from a queue without disturbing the others.

#### Sets

Slug: sets
Action: create
Status: implemented

Skills: 4

[sets.data.ts](../../data/skills/dataStructures/sets/sets.data.ts)

Methodological description: Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.
User-friendly description: Explore collections of unique values and operations on their membership.

##### Explain Set Structure

Slug: explainSetStructure
Action: create
Status: implemented

[explainSetStructure.data.ts](../../data/skills/dataStructures/sets/skills/explainSetStructure.data.ts)

Methodological description: A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.
User-friendly description: Understand why a set stores only one copy of each distinct element.

##### Test Set Membership

Slug: testSetMembership
Action: create
Status: implemented

[testSetMembership.data.ts](../../data/skills/dataStructures/sets/skills/testSetMembership.data.ts)

Methodological description: Determine whether a value belongs to a set without requiring its positional index.
User-friendly description: Check whether a particular value belongs to a set.

##### Compute Set Union

Slug: computeSetUnion
Action: create
Status: implemented

[computeSetUnion.data.ts](../../data/skills/dataStructures/sets/skills/computeSetUnion.data.ts)

Methodological description: Create the set of all values that occur in either of two sets, eliminating duplicates.
User-friendly description: Combine all distinct elements found in either of two sets.

##### Compute Set Intersection

Slug: computeSetIntersection
Action: create
Status: implemented

[computeSetIntersection.data.ts](../../data/skills/dataStructures/sets/skills/computeSetIntersection.data.ts)

Methodological description: Find only values shared by two sets, distinguishing intersection from union.
User-friendly description: Find only the elements shared by two sets.

#### Dictionaries

Slug: dictionaries
Action: create
Status: implemented

Skills: 3

[dictionaries.data.ts](../../data/skills/dataStructures/dictionaries/dictionaries.data.ts)

Methodological description: Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.
User-friendly description: Discover how dictionaries connect unique keys with stored values.

##### Explain Dictionary Structure

Slug: explainDictionaryStructure
Action: create
Status: implemented

[explainDictionaryStructure.data.ts](../../data/skills/dataStructures/dictionaries/skills/explainDictionaryStructure.data.ts)

Methodological description: A dictionary maps keys to values; keys need not be numeric or correspond to array positions.
User-friendly description: Understand how a dictionary retrieves information by key rather than position.

##### Retrieve a Dictionary Value by Key

Slug: retrieveADictionaryValueByKey
Action: create
Status: implemented

[retrieveADictionaryValueByKey.data.ts](../../data/skills/dataStructures/dictionaries/skills/retrieveADictionaryValueByKey.data.ts)

Methodological description: Find an entry using its key and handle the case in which the key does not exist.
User-friendly description: Find a dictionary value by key and handle a missing key.

##### Update a Dictionary Value

Slug: updateADictionaryValue
Action: create
Status: implemented

[updateADictionaryValue.data.ts](../../data/skills/dataStructures/dictionaries/skills/updateADictionaryValue.data.ts)

Methodological description: Replace the value associated with an existing key without accidentally duplicating the key.
User-friendly description: Change a value stored under an existing dictionary key.

#### Trees

Slug: trees
Action: create
Status: implemented

Skills: 4

[trees.data.ts](../../data/skills/dataStructures/trees/trees.data.ts)

Methodological description: Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.
User-friendly description: Explore how trees organize information through parent–child connections.

##### Explain Tree Structure

Slug: explainTreeStructure
Action: create
Status: implemented

[explainTreeStructure.data.ts](../../data/skills/dataStructures/trees/skills/explainTreeStructure.data.ts)

Methodological description: Identify roots, nodes, edges, and parent–child relationships within a hierarchy; trees need not be binary.
User-friendly description: Recognize roots, branches, nodes and connections in a tree.

##### Distinguish Leaf and Internal Tree Nodes

Slug: distinguishLeafAndInternalTreeNodes
Action: create
Status: implemented

[distinguishLeafAndInternalTreeNodes.data.ts](../../data/skills/dataStructures/trees/skills/distinguishLeafAndInternalTreeNodes.data.ts)

Methodological description: A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.
User-friendly description: Distinguish nodes with children from leaf nodes without children.

##### Find a Path in a Tree

Slug: findAPathInATree
Action: create
Status: implemented

[findAPathInATree.data.ts](../../data/skills/dataStructures/trees/skills/findAPathInATree.data.ts)

Methodological description: Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.
User-friendly description: Follow the connected route between two nodes in a tree.

##### Explain Binary Search Trees

Slug: explainBinarySearchTrees
Action: create
Status: implemented

[explainBinarySearchTrees.data.ts](../../data/skills/dataStructures/trees/skills/explainBinarySearchTrees.data.ts)

Methodological description: Keys in a binary search tree obey an ordering rule across subtrees that is not required of an arbitrary tree.
User-friendly description: Understand the ordering rule that makes a binary search tree searchable.

#### Graphs

Slug: graphs
Action: create
Status: implemented

Skills: 6

[graphs.data.ts](../../data/skills/dataStructures/graphs/graphs.data.ts)

Methodological description: Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.
User-friendly description: Discover how graphs represent places, objects and their connections.

##### Explain Graph Structure

Slug: explainGraphStructure
Action: create
Status: implemented

[explainGraphStructure.data.ts](../../data/skills/dataStructures/graphs/skills/explainGraphStructure.data.ts)

Methodological description: Represent a road or social network as vertices and edges without assuming every graph is a tree.
User-friendly description: Recognize graph vertices and the edges connecting them.

##### Distinguish Directed and Undirected Graphs

Slug: distinguishDirectedAndUndirectedGraphs
Action: create
Status: implemented

[distinguishDirectedAndUndirectedGraphs.data.ts](../../data/skills/dataStructures/graphs/skills/distinguishDirectedAndUndirectedGraphs.data.ts)

Methodological description: Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.
User-friendly description: Tell whether connections have one-way or two-way direction.

##### Distinguish Weighted and Unweighted Graphs

Slug: distinguishWeightedAndUnweightedGraphs
Action: create
Status: implemented

[distinguishWeightedAndUnweightedGraphs.data.ts](../../data/skills/dataStructures/graphs/skills/distinguishWeightedAndUnweightedGraphs.data.ts)

Methodological description: Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.
User-friendly description: Recognize when graph connections carry numbers such as distance or cost.

##### Identify Adjacent Vertices

Slug: identifyAdjacentVertices
Action: create
Status: implemented

[identifyAdjacentVertices.data.ts](../../data/skills/dataStructures/graphs/skills/identifyAdjacentVertices.data.ts)

Methodological description: Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.
User-friendly description: Identify the nodes directly connected to another node.

##### Find a Path in a Graph

Slug: findAPathInAGraph
Action: create
Status: implemented

[findAPathInAGraph.data.ts](../../data/skills/dataStructures/graphs/skills/findAPathInAGraph.data.ts)

Methodological description: Construct a sequence of connected vertices from start to goal while respecting edge directions.
User-friendly description: Follow a valid path between vertices while respecting connection directions.

##### Distinguish Trees from Graphs with Cycles

Slug: distinguishTreesFromGraphsWithCycles
Action: create
Status: implemented

[distinguishTreesFromGraphsWithCycles.data.ts](../../data/skills/dataStructures/graphs/skills/distinguishTreesFromGraphsWithCycles.data.ts)

Methodological description: A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.
User-friendly description: Understand why graphs may contain cycles but trees do not.

#### Structure Selection

Slug: structureSelection
Action: create
Status: implemented

Skills: 4

[structureSelection.data.ts](../../data/skills/dataStructures/structureSelection/structureSelection.data.ts)

Methodological description: Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.
User-friendly description: Choose data structures according to how a program needs to use its data.

##### Choose a Structure for Required Operations

Slug: chooseAStructureForRequiredOperations
Action: create
Status: implemented

[chooseAStructureForRequiredOperations.data.ts](../../data/skills/dataStructures/structureSelection/skills/chooseAStructureForRequiredOperations.data.ts)

Methodological description: Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.
User-friendly description: Select a collection that suits indexing, membership, queues or relationships.

##### Compare Element Access Costs

Slug: compareElementAccessCosts
Action: create
Status: implemented

[compareElementAccessCosts.data.ts](../../data/skills/dataStructures/structureSelection/skills/compareElementAccessCosts.data.ts)

Methodological description: Compare typical direct access in an indexed array with traversal through a linked list to the desired node.
User-friendly description: Compare how quickly arrays and linked lists reach a particular element.

##### Compare Collection Insertion Costs

Slug: compareCollectionInsertionCosts
Action: create
Status: implemented

[compareCollectionInsertionCosts.data.ts](../../data/skills/dataStructures/structureSelection/skills/compareCollectionInsertionCosts.data.ts)

Methodological description: Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.
User-friendly description: Explore why insertion can require shifting array elements or changing links.

##### Distinguish Data Structures from Algorithms

Slug: distinguishDataStructuresFromAlgorithms
Action: create
Status: implemented

[distinguishDataStructuresFromAlgorithms.data.ts](../../data/skills/dataStructures/structureSelection/skills/distinguishDataStructuresFromAlgorithms.data.ts)

Methodological description: A data structure defines how information is organized and accessed; an algorithm specifies a sequence of operations on that information.
User-friendly description: Distinguish organizing data in a structure from processing it with an algorithm.

### Algorithms

Slug: algorithms
Action: create
Status: implemented

Groups: 5 · Skills: 23

[algorithms.data.ts](../../data/skills/algorithms/algorithms.data.ts)

Methodological description: Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.
User-friendly description: Explore how to design, apply and compare repeatable methods for solving problems.

#### Construction

Slug: construction
Action: create
Status: implemented

Skills: 6

[construction.data.ts](../../data/skills/algorithms/construction/construction.data.ts)

Methodological description: General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.
User-friendly description: Learn to specify the actions, conditions and stopping rules of an algorithm.

##### Define an Algorithm's Goal

Slug: defineAnAlgorithmsGoal
Action: create
Status: implemented

[defineAnAlgorithmsGoal.data.ts](../../data/skills/algorithms/construction/skills/defineAnAlgorithmsGoal.data.ts)

Methodological description: Specify a verifiable outcome and acceptable inputs, such as finding the index of a target number in a sorted array or establishing its absence. Separate the objective from the steps of the solution.
User-friendly description: State what an algorithm must achieve and which inputs it accepts.

##### Construct a Sequential Algorithm

Slug: constructASequentialAlgorithm
Action: create
Status: implemented

[constructASequentialAlgorithm.data.ts](../../data/skills/algorithms/construction/skills/constructASequentialAlgorithm.data.ts)

Methodological description: Specify a finite ordered sequence of actions in which each uses the state left by the preceding step, without branching. This is a logical solution description; coding the steps as executable instructions belongs to Programming.
User-friendly description: Describe a finite series of steps performed in the correct order.

##### Design Conditional Branching

Slug: designConditionalBranching
Action: create
Status: implemented

[designConditionalBranching.data.ts](../../data/skills/algorithms/construction/skills/designConditionalBranching.data.ts)

Methodological description: Specify mutually exclusive or priority-based paths using testable conditions, including the action taken when a condition is false. For example, choose one half of a search range after comparing numbers.
User-friendly description: Plan different paths through an algorithm according to explicit conditions.

##### Design Repetition

Slug: designRepetition
Action: create
Status: implemented

[designRepetition.data.ts](../../data/skills/algorithms/construction/skills/designRepetition.data.ts)

Methodological description: Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.
User-friendly description: Design a repeated procedure with correct updates and a stopping condition.

##### Implement a Recursive Algorithm

Slug: implementARecursiveAlgorithm
Action: create
Status: implemented

[implementARecursiveAlgorithm.data.ts](../../data/skills/algorithms/construction/skills/implementARecursiveAlgorithm.data.ts)

Methodological description: Independently construct a recursive solution with a valid base case and progressively smaller subproblems so calls terminate. Test boundary inputs; being able to explain existing recursion is not equivalent to designing an algorithm.
User-friendly description: Build a recursive algorithm with smaller subproblems and a terminating base case.

##### Compare Algorithms Against Requirements

Slug: compareAlgorithmsAgainstRequirements
Action: create
Status: implemented

[compareAlgorithmsAgainstRequirements.data.ts](../../data/skills/algorithms/construction/skills/compareAlgorithmsAgainstRequirements.data.ts)

Methodological description: Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.
User-friendly description: Compare possible algorithms according to their requirements and limitations.

#### Search

Slug: search
Action: create
Status: implemented

Skills: 6

[search.data.ts](../../data/skills/algorithms/search/search.data.ts)

Methodological description: Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.
User-friendly description: Discover how different search methods find an item in a collection.

##### Apply Linear Search

Slug: applyLinearSearch
Action: create
Status: implemented

[applyLinearSearch.data.ts](../../data/skills/algorithms/search/skills/applyLinearSearch.data.ts)

Methodological description: Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.
User-friendly description: Find a target by inspecting elements one after another.

##### Apply Binary Search

Slug: applyBinarySearch
Action: create
Status: implemented

[applyBinarySearch.data.ts](../../data/skills/algorithms/search/skills/applyBinarySearch.data.ts)

Methodological description: Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.
User-friendly description: Find a value in sorted data by repeatedly discarding half the range.

##### Identify Binary Search Prerequisites

Slug: identifyBinarySearchPrerequisites
Action: create
Status: implemented

[identifyBinarySearchPrerequisites.data.ts](../../data/skills/algorithms/search/skills/identifyBinarySearchPrerequisites.data.ts)

Methodological description: Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.
User-friendly description: Check whether data meets the sorting requirements for binary search.

##### Predict Search Scaling

Slug: predictSearchScaling
Action: create
Status: implemented

[predictSearchScaling.data.ts](../../data/skills/algorithms/search/skills/predictSearchScaling.data.ts)

Methodological description: Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.
User-friendly description: Understand why doubling a dataset adds only about one binary-search check.

##### Apply Binary Tree Search

Slug: applyBinaryTreeSearch
Action: create
Status: implemented

[applyBinaryTreeSearch.data.ts](../../data/skills/algorithms/search/skills/applyBinaryTreeSearch.data.ts)

Methodological description: Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.
User-friendly description: Follow the ordered branches of a binary search tree to find a key.

##### Compare Search Methods by Check Count

Slug: compareSearchMethodsByCheckCount
Action: create
Status: implemented

[compareSearchMethodsByCheckCount.data.ts](../../data/skills/algorithms/search/skills/compareSearchMethodsByCheckCount.data.ts)

Methodological description: Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.
User-friendly description: Compare how many checks linear and binary searches need.

#### Sorting

Slug: sorting
Action: create
Status: implemented

Skills: 4

[sorting.data.ts](../../data/skills/algorithms/sorting/sorting.data.ts)

Methodological description: Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.
User-friendly description: Learn how sorting methods arrange values into a chosen order.

##### Explain a Sorting Criterion

Slug: explainASortingCriterion
Action: create
Status: implemented

[explainASortingCriterion.data.ts](../../data/skills/algorithms/sorting/skills/explainASortingCriterion.data.ts)

Methodological description: Define a key and direction such as ascending numbers or alphabetic names; all comparisons in the algorithm must follow that rule.
User-friendly description: Choose the value or property used to order a collection.

##### Apply Selection Sort

Slug: applySelectionSort
Action: create
Status: implemented

[applySelectionSort.data.ts](../../data/skills/algorithms/sorting/skills/applySelectionSort.data.ts)

Methodological description: On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.
User-friendly description: Sort items by repeatedly selecting the smallest remaining one.

##### Apply Insertion Sort

Slug: applyInsertionSort
Action: create
Status: implemented

[applyInsertionSort.data.ts](../../data/skills/algorithms/sorting/skills/applyInsertionSort.data.ts)

Methodological description: Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.
User-friendly description: Sort by inserting each new item into an already ordered section.

##### Apply Bubble Sort

Slug: applyBubbleSort
Action: create
Status: implemented

[applyBubbleSort.data.ts](../../data/skills/algorithms/sorting/skills/applyBubbleSort.data.ts)

Methodological description: Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.
User-friendly description: Sort by swapping neighboring values that are in the wrong order.

#### Collection Processing

Slug: collectionProcessing
Action: create
Status: implemented

Skills: 4

[collectionProcessing.data.ts](../../data/skills/algorithms/collectionProcessing/collectionProcessing.data.ts)

Methodological description: Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.
User-friendly description: Learn how to count, total and find extreme values while scanning data.

##### Apply Element Counting

Slug: applyElementCounting
Action: create
Status: implemented

[applyElementCounting.data.ts](../../data/skills/algorithms/collectionProcessing/skills/applyElementCounting.data.ts)

Methodological description: Traverse a collection, incrementing a counter for every item that meets the given condition.
User-friendly description: Count all collection elements that meet a stated condition.

##### Apply Sum Accumulation

Slug: applySumAccumulation
Action: create
Status: implemented

[applySumAccumulation.data.ts](../../data/skills/algorithms/collectionProcessing/skills/applySumAccumulation.data.ts)

Methodological description: Traverse a numeric collection, adding each value to an accumulator initialized to zero.
User-friendly description: Add collection values into a running total.

##### Apply Maximum Finding

Slug: applyMaximumFinding
Action: create
Status: implemented

[applyMaximumFinding.data.ts](../../data/skills/algorithms/collectionProcessing/skills/applyMaximumFinding.data.ts)

Methodological description: Maintain the largest value seen so far and update it when a larger number appears.
User-friendly description: Track the largest value seen while traversing a collection.

##### Apply Minimum Finding

Slug: applyMinimumFinding
Action: create
Status: implemented

[applyMinimumFinding.data.ts](../../data/skills/algorithms/collectionProcessing/skills/applyMinimumFinding.data.ts)

Methodological description: Maintain the smallest value seen so far and update it when a smaller number appears.
User-friendly description: Track the smallest value seen while traversing a collection.

#### Analysis

Slug: analysis
Action: create
Status: implemented

Skills: 3

[analysis.data.ts](../../data/skills/algorithms/analysis/analysis.data.ts)

Methodological description: Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.
User-friendly description: Explore how time and memory needs change with an algorithm's input.

##### Estimate an Algorithm's Worst Case

Slug: estimateAnAlgorithmsWorstCase
Action: create
Status: implemented

[estimateAnAlgorithmsWorstCase.data.ts](../../data/skills/algorithms/analysis/skills/estimateAnAlgorithmsWorstCase.data.ts)

Methodological description: Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.
User-friendly description: Estimate the most checks an algorithm could require in its worst case.

##### Distinguish Linear and Logarithmic Growth

Slug: distinguishLinearAndLogarithmicGrowth
Action: create
Status: implemented

[distinguishLinearAndLogarithmicGrowth.data.ts](../../data/skills/algorithms/analysis/skills/distinguishLinearAndLogarithmicGrowth.data.ts)

Methodological description: Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.
User-friendly description: Compare growth proportional to input size with growth from repeated halving.

##### Explain Time–Memory Trade-offs

Slug: explainTimeMemoryTradeOffs
Action: create
Status: implemented

[explainTimeMemoryTradeOffs.data.ts](../../data/skills/algorithms/analysis/skills/explainTimeMemoryTradeOffs.data.ts)

Methodological description: Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.
User-friendly description: Understand why faster algorithms may require more temporary memory.

### Git and Open Source

Slug: gitAndOpenSource
Action: create
Status: implemented

Groups: 3 · Skills: 11

[gitAndOpenSource.data.ts](../../data/skills/gitAndOpenSource/gitAndOpenSource.data.ts)

Methodological description: A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.
User-friendly description: Explore how developers track changes, collaborate and share software with clear permissions.

#### Git Version Control

Slug: gitVersionControl
Action: create
Status: implemented

Skills: 6

[gitVersionControl.data.ts](../../data/skills/gitAndOpenSource/gitVersionControl/gitVersionControl.data.ts)

Methodological description: Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.
User-friendly description: Learn how Git records versions and helps teams combine changes.

##### Explain a Repository

Slug: explainARepository
Action: create
Status: implemented

[explainARepository.data.ts](../../data/skills/gitAndOpenSource/gitVersionControl/skills/explainARepository.data.ts)

Methodological description: A repository holds a project and its history, allowing earlier versions and author contributions to be examined.
User-friendly description: Understand a repository as a project with a record of its changes.

##### Explain a Commit

Slug: explainACommit
Action: create
Status: implemented

[explainACommit.data.ts](../../data/skills/gitAndOpenSource/gitVersionControl/skills/explainACommit.data.ts)

Methodological description: A Git commit captures a coherent state of changes with an identifier and links to preceding history.
User-friendly description: Recognize a commit as an identified snapshot linked to previous work.

##### Explain a Branch

Slug: explainABranch
Action: create
Status: implemented

[explainABranch.data.ts](../../data/skills/gitAndOpenSource/gitVersionControl/skills/explainABranch.data.ts)

Methodological description: A branch represents a line of development on which commits can be created without immediately changing the main history.
User-friendly description: Understand how branches let developers work on separate lines of change.

##### Explain a Pull Request

Slug: explainAPullRequest
Action: create
Status: implemented

[explainAPullRequest.data.ts](../../data/skills/gitAndOpenSource/gitVersionControl/skills/explainAPullRequest.data.ts)

Methodological description: A pull request on a collaborative development platform organizes review of proposed changes before they are merged.
User-friendly description: Explore how pull requests organize proposed changes for review.

##### Explain Branch Merging

Slug: explainBranchMerging
Action: create
Status: implemented

[explainBranchMerging.data.ts](../../data/skills/gitAndOpenSource/gitVersionControl/skills/explainBranchMerging.data.ts)

Methodological description: Merging combines lines of history; incompatible overlapping changes require conflict resolution.
User-friendly description: Learn how branches are merged and why conflicts sometimes need resolving.

##### Distinguish Local and Remote Repositories

Slug: distinguishLocalAndRemoteRepositories
Action: create
Status: implemented

[distinguishLocalAndRemoteRepositories.data.ts](../../data/skills/gitAndOpenSource/gitVersionControl/skills/distinguishLocalAndRemoteRepositories.data.ts)

Methodological description: A local repository supports independent committing, while a remote repository enables sharing between contributors.
User-friendly description: Distinguish work stored on your computer from copies shared through remotes.

#### Open Source

Slug: openSource
Action: create
Status: implemented

Skills: 2

[openSource.data.ts](../../data/skills/gitAndOpenSource/openSource/openSource.data.ts)

Methodological description: Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.
User-friendly description: Discover what permissions make software genuinely open source.

##### Explain Open Source

Slug: explainOpenSource
Action: create
Status: implemented

[explainOpenSource.data.ts](../../data/skills/gitAndOpenSource/openSource/skills/explainOpenSource.data.ts)

Methodological description: An open-source license permits studying, using, modifying, and redistributing code under its defined conditions.
User-friendly description: Understand how open-source licenses allow use, modification and redistribution.

##### Distinguish Open Source from Publicly Visible Code

Slug: distinguishOpenSourceFromPubliclyVisibleCode
Action: create
Status: implemented

[distinguishOpenSourceFromPubliclyVisibleCode.data.ts](../../data/skills/gitAndOpenSource/openSource/skills/distinguishOpenSourceFromPubliclyVisibleCode.data.ts)

Methodological description: Being able to read a program's source does not automatically grant permission to modify or redistribute it.
User-friendly description: Recognize that visible source code is not automatically open source.

#### Collaborative Digital Product Development

Slug: collaborativeDigitalProductDevelopment
Action: create
Status: implemented

Skills: 3

[collaborativeDigitalProductDevelopment.data.ts](../../data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data.ts)

Methodological description: Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.
User-friendly description: Explore how teams organize contributions, reviews and project versions.

##### Explain Contribution Guidelines

Slug: explainContributionGuidelines
Action: create
Status: implemented

[explainContributionGuidelines.data.ts](../../data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/explainContributionGuidelines.data.ts)

Methodological description: Rules for contributions, code review, and discussing changes help teams maintain a shared project.
User-friendly description: Understand why contribution rules help people work on the same codebase.

##### Coordinate Changes in a Shared Digital Project

Slug: coordinateChangesInASharedDigitalProject
Action: create
Status: implemented

[coordinateChangesInASharedDigitalProject.data.ts](../../data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/coordinateChangesInASharedDigitalProject.data.ts)

Methodological description: Agree on ownership of changes, merge order, and resolution when contributors edit the same area. Collaboration is not just placing files in a common folder.
User-friendly description: Plan who changes what and how shared edits will be combined.

##### Track Digital Product Versions

Slug: trackDigitalProductVersions
Action: create
Status: implemented

[trackDigitalProductVersions.data.ts](../../data/skills/gitAndOpenSource/collaborativeDigitalProductDevelopment/skills/trackDigitalProductVersions.data.ts)

Methodological description: Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.
User-friendly description: Use version history to find when changes happened or restore earlier work.

### History of Programming

Slug: historyOfProgramming
Action: create
Status: implemented

Groups: 2 · Skills: 9

[historyOfProgramming.data.ts](../../data/skills/historyOfProgramming/historyOfProgramming.data.ts)

Methodological description: Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.
User-friendly description: Discover how programming ideas and computing machines developed through history.

#### Key Contributions

Slug: keyContributions
Action: create
Status: implemented

Skills: 6

[keyContributions.data.ts](../../data/skills/historyOfProgramming/keyContributions/keyContributions.data.ts)

Methodological description: Historical developments in program descriptions, practical machine programming, compilation, software reliability, network protocols, and computability can be examined by the problems they solved and their lasting importance. Specific people and teams remain required examples in the Subject Proposition.
User-friendly description: Explore major contributions to programming, reliability and computer networking.

##### Explain the Origins of Programming

Slug: explainTheOriginsOfProgramming
Action: create
Status: implemented

[explainTheOriginsOfProgramming.data.ts](../../data/skills/historyOfProgramming/keyContributions/skills/explainTheOriginsOfProgramming.data.ts)

Methodological description: Use descriptions for Charles Babbage's Analytical Engine to show how machine operations could be specified before modern computers existed. Examine Ada Lovelace's work and her vision of computation extending beyond ordinary arithmetic.
User-friendly description: Learn how early machine designs and Ada Lovelace's work anticipated programming.

##### Explain Early Electronic Programming

Slug: explainEarlyElectronicProgramming
Action: create
Status: implemented

[explainEarlyElectronicProgramming.data.ts](../../data/skills/historyOfProgramming/keyContributions/skills/explainEarlyElectronicProgramming.data.ts)

Methodological description: Explain how teams developed and tested programs for the first large electronic computers despite complex methods of entering instructions. The six ENIAC programmers exemplify substantial contributions that went underrecognized for decades.
User-friendly description: Discover how early electronic-computer teams created and tested programs.

##### Explain the Development of Compilers

Slug: explainTheDevelopmentOfCompilers
Action: create
Status: implemented

[explainTheDevelopmentOfCompilers.data.ts](../../data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfCompilers.data.ts)

Methodological description: Explain how translating more human-readable program notation into machine instructions changed programming. Include the contributions of Grace Hopper and other researchers to early compilers and languages without confusing a compiler with the language itself.
User-friendly description: Explore how compilers made it easier to write programs using readable languages.

##### Explain the Development of Software Reliability

Slug: explainTheDevelopmentOfSoftwareReliability
Action: create
Status: implemented

[explainTheDevelopmentOfSoftwareReliability.data.ts](../../data/skills/historyOfProgramming/keyContributions/skills/explainTheDevelopmentOfSoftwareReliability.data.ts)

Methodological description: Use spaceflight software to explain error handling, execution priorities, and recovery from failures. Include Margaret Hamilton's leadership of Apollo software work and the collaborative nature of its development.
User-friendly description: Understand why error handling and reliable software mattered in the Apollo missions.

##### Explain the Elimination of Network Loops

Slug: explainTheEliminationOfNetworkLoops
Action: create
Status: implemented

[explainTheEliminationOfNetworkLoops.data.ts](../../data/skills/historyOfProgramming/keyContributions/skills/explainTheEliminationOfNetworkLoops.data.ts)

Methodological description: Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.
User-friendly description: Explore how the Spanning Tree Protocol helped prevent loops in local networks.

##### Explain Computability Theory

Slug: explainComputabilityTheory
Action: create
Status: implemented

[explainComputabilityTheory.data.ts](../../data/skills/historyOfProgramming/keyContributions/skills/explainComputabilityTheory.data.ts)

Methodological description: Describe the idea of a formal model of universal computation and limits on which problems are algorithmically solvable. Alan Turing's work is a principal historical example; his cryptanalysis and the debate over machine intelligence are separate topics.
User-friendly description: Learn how formal models reveal what computers can and cannot calculate.

#### Machines and Cryptanalysis

Slug: machinesAndCryptanalysis
Action: create
Status: implemented

Skills: 3

[machinesAndCryptanalysis.data.ts](../../data/skills/historyOfProgramming/machinesAndCryptanalysis/machinesAndCryptanalysis.data.ts)

Methodological description: The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.
User-friendly description: Discover how machines and mathematical methods supported historical cryptanalysis.

##### Explain Historical Cryptanalysis Methods

Slug: explainHistoricalCryptanalysisMethods
Action: create
Status: implemented

[explainHistoricalCryptanalysisMethods.data.ts](../../data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainHistoricalCryptanalysisMethods.data.ts)

Methodological description: Explain how mathematical analysis of patterns and systematic elimination of possibilities helped find cipher-machine settings. Historical examples include Polish cryptanalysts, Joan Clarke, Alan Turing, Gordon Welchman, and other specialists at Bletchley Park.
User-friendly description: Explore how cryptanalysts used patterns and systematic testing to break codes.

##### Explain the Purpose of the Bombe

Slug: explainThePurposeOfTheBombe
Action: create
Status: implemented

[explainThePurposeOfTheBombe.data.ts](../../data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainThePurposeOfTheBombe.data.ts)

Methodological description: The Bombe was an electromechanical machine used to test possible Enigma key settings, built upon earlier Polish cryptanalytic work.
User-friendly description: Understand how the Bombe helped test possible Enigma settings.

##### Explain the Development of Programmable Computers

Slug: explainTheDevelopmentOfProgrammableComputers
Action: create
Status: implemented

[explainTheDevelopmentOfProgrammableComputers.data.ts](../../data/skills/historyOfProgramming/machinesAndCryptanalysis/skills/explainTheDevelopmentOfProgrammableComputers.data.ts)

Methodological description: Compare how storage of instructions, selection of operations, and execution control evolved from mechanical concepts to electronic machines. This is the history of devices and their architecture, distinct from early hands-on programming techniques.
User-friendly description: Trace the development from mechanical computing concepts to programmable electronic machines.
