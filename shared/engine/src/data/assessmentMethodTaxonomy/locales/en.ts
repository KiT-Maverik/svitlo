import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const en_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Retrieval',
    description:
      'Retrieval assesses whether a learner can bring previously learned information to mind without needing to derive it anew. Observable evidence is an accurate recalled fact, term, definition or previously established relationship in response to a cue that does not reveal the answer. For example, ask for the meaning of a learned symbol or an essential vocabulary term. Unlike interpretation, the target is access to stored knowledge rather than constructing or explaining its meaning. Avoid prompts that supply the answer through hints, or treating a lucky recognition response as proof of independent recall.',
  },
  interpretation: {
    title: 'Interpretation',
    description:
      "Interpretation assesses the learner's ability to extract and explain meaning from a statement, model, symbol, text, diagram or representation. Evidence includes a faithful paraphrase, explanation of what the representation implies, or a defensible account of its significance. For example, explain what a slope in a graph communicates in context. Unlike retrieval, this demands sense-making rather than repeating a remembered definition; unlike representation translation, it need not produce an equivalent new format. Avoid crediting verbatim repetition or an explanation inconsistent with the supplied evidence.",
  },
  application: {
    title: 'Application',
    description:
      "Application assesses accurate selection and execution of a learned rule, method or procedure in a relevant, sufficiently familiar problem. Observable evidence is the appropriate procedure applied to the task's conditions and a justified result, not merely naming the rule. For example, choose and perform the correct arithmetic operation in a routine situation. Unlike knowledge transfer, the primary challenge is using an established method rather than adapting it to a substantially unfamiliar domain. Avoid copying near-identical worked examples, ambiguous prerequisites, or judging procedural competence solely by an unsupported final answer.",
  },
  classification: {
    title: 'Classification',
    description:
      'Classification assesses the use of defining features or decision rules to place instances in appropriate categories. Evidence is a defensible grouping or category assignment grounded in discriminating properties, including handling near-misses or counterexamples when appropriate. For example, distinguish types of quadrilaterals using their defining attributes. Unlike relationship mapping, the main task is categorical membership, not explaining how entities influence or depend on one another. Avoid superficial labels, category schemes with overlapping rules left unexplained, or answers that can be guessed from irrelevant visual cues.',
  },
  relationshipMapping: {
    title: 'Relationship mapping',
    description:
      'Relationship mapping assesses whether a learner can recognize and explain meaningful links among concepts, entities, events or processes. Evidence is an accurate description or mapping of connections such as cause and effect, prerequisite, part-whole, sequence or dependency, with direction and meaning when relevant. For example, explain how changes in one ecosystem component affect another. Unlike classification, the task concerns connections rather than category membership; unlike structural analysis, it does not necessarily require decomposing a whole system. Avoid rewarding mere proximity or unexplained associations as evidence of a substantive relationship.',
  },
  representationTranslation: {
    title: 'Representation translation',
    description:
      'Representation translation assesses preservation of meaning while converting information between formats, symbols, modalities or models. Evidence is a new representation that is equivalent to the given information, with key quantities, relationships or constraints intact. For example, convert a word problem into an equation or a data table into a graph. Unlike interpretation, a faithful alternative representation is required; unlike knowledge construction, the learner does not freely invent new content. Avoid transformations that silently change units, conditions, scales or meaning, and avoid scoring formatting choices that are irrelevant to equivalence.',
  },
  missingInformationInference: {
    title: 'Missing-information inference',
    description:
      'Missing-information inference assesses derivation of an unstated but logically supported fact from available evidence, rules and constraints. Observable evidence is a valid conclusion together with a defensible inferential path where the task permits it. For example, infer an unknown quantity from related measurements and a stated conservation rule. Unlike retrieval, the requested information has not been given for memorization; unlike prediction, the conclusion need not concern a future or changed condition. Avoid underdetermined tasks with several equally plausible answers unless uncertainty or multiple solutions are explicitly part of the target.',
  },
  structuralAnalysis: {
    title: 'Structural analysis',
    description:
      "Structural analysis assesses decomposition of a complex entity, system, argument or process into meaningful constituent parts and explanation of their functions or interactions. Evidence identifies relevant components, boundaries, roles and how the arrangement produces the whole's behavior. For example, analyze the parts of a scientific explanation and how evidence supports its claim. Unlike classification, assigning part names alone is insufficient; unlike relationship mapping, the structure of an integrated whole is central. Avoid assessing only memorized labels or imposing one arbitrary decomposition when several defensible structures exist.",
  },
  patternGeneralization: {
    title: 'Pattern generalization',
    description:
      "Pattern generalization assesses the induction or derivation of a rule that explains multiple observations and can be applied beyond the examples provided. Evidence includes a proposed rule, support from representative cases and correct reasoning about new or counterexample cases. For example, infer a numerical sequence's general term and test it against unfamiliar positions. Unlike retrieval, the rule must be inferred rather than repeated; unlike prediction, the focus is on general structure rather than a particular contingent outcome. Avoid patterns supported only by too few examples or assuming one unqualified rule is uniquely determined by finite data.",
  },
  analogicalReasoning: {
    title: 'Analogical reasoning',
    description:
      'Analogical reasoning assesses recognition and justified use of shared relational structure between distinct situations. Evidence is a mapping of corresponding roles or relationships, a warranted inference in the target case, and awareness of where the analogy breaks down. For example, use the structure of an electrical circuit to reason cautiously about another connected-flow system. Unlike routine application, the learner must evaluate similarities rather than simply execute a known formula; unlike knowledge transfer, the explicit relational analogy is the core evidence. Avoid surface resemblance and analogies that obscure decisive differences.',
  },
  knowledgeTransfer: {
    title: 'Knowledge transfer',
    description:
      'Knowledge transfer assesses selecting, adapting and using previously learned knowledge in a genuinely novel or substantially different context. Evidence includes recognizing that a known principle is relevant, adjusting it to new constraints and explaining why the adaptation works. For example, apply proportional reasoning to an unfamiliar scientific or civic problem. Unlike routine application, the new situation should require meaningful abstraction beyond a near-identical exercise; unlike analogical reasoning, an explicit source-target analogy is not required. Avoid relabeling a rehearsed problem as novel or conflating transfer with general intelligence unrelated to taught competencies.',
  },
  prediction: {
    title: 'Prediction',
    description:
      'Prediction assesses use of a conceptual, causal or quantitative model to anticipate the likely outcome of a specified condition or intervention. Evidence is a consequence derived from the model, preferably with the assumptions or causal steps that make it plausible. For example, predict the shadow change when a light source moves, given an understood geometry of rays. Unlike missing-information inference, the focus is an outcome under stated conditions; unlike unsupported guessing, the prediction must follow from relevant principles. Avoid questions with omitted decisive conditions, or treating confidence as evidence of correctness.',
  },
  errorDiagnosis: {
    title: 'Error diagnosis',
    description:
      'Error diagnosis assesses locating and explaining the cause of a flaw in a solution, argument, procedure, interpretation or model. Evidence identifies the consequential step or assumption, the principle it violates and a plausible correction or diagnostic test. For example, find why a multi-step calculation gives a wrong result and explain the mistaken operation. Unlike verification, merely declaring the result false is insufficient; unlike justification, the focus is the mechanism of failure. Avoid distractors that reward recognizing an obvious typo without understanding, or requiring a unique cause when several independent errors exist.',
  },
  verification: {
    title: 'Verification',
    description:
      'Verification assesses independent checking of whether a claim, result, computation or proposed solution meets relevant criteria. Evidence is an appropriate check, comparison, substitution, counterexample search or independent method and a defensible accept/reject judgment. For example, substitute a proposed value into the original equation and interpret whether it satisfies every condition. Unlike justification, the primary aim is testing validity rather than presenting the original argument; unlike error diagnosis, identifying the specific cause of a failure is not always required. Avoid accepting a repeated assertion or identical flawed derivation as independent verification.',
  },
  justification: {
    title: 'Justification',
    description:
      'Justification assesses construction of a coherent explanation showing why a conclusion, choice, model or procedure follows from evidence, definitions or principles. Evidence is an explicit chain of reasons with relevant warrants and assumptions, not merely the conclusion or a confident statement. For example, justify why a geometric property holds for the stated shape. Unlike verification, justification defends the reasoning or claim rather than only testing it independently; unlike interpretation, it must support a specific conclusion. Avoid rewarding persuasive wording without valid evidence, and distinguish a sufficient argument from one that omits a decisive step.',
  },
  knowledgeConstruction: {
    title: 'Knowledge construction',
    description:
      'Knowledge construction assesses independently creating a new, valid example, representation, explanation, model, hypothesis or solution that satisfies stated learning constraints. Evidence is a coherent constructed product and, where appropriate, a demonstration that it meets the required conceptual criteria. For example, design a scientific model explaining observed data or invent an example that satisfies a mathematical definition and explain why. Unlike retrieval or representation translation, the learner must make substantive choices rather than reproduce given content. Avoid treating novelty or aesthetic polish as a substitute for disciplinary correctness, and provide explicit validity criteria.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
