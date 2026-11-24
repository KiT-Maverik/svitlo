import type { LessonWorkflowStage1 } from '@svitlo/engine/build';

export const lessonStage1 = {
  config: {
    id: '546a1d10-e656-4184-bdc9-f2a85017d18a',
    type: 'lesson',
    slug: 'recognizeRedAndBlue',
    skills: [
      '00000000-0000-4000-8000-000000000001',
      '00000000-0000-4000-8000-000000000004',
    ],
    locale: { title: { en: 'Recognizing Red and Blue' } },
    params: { quizRequiredForCompletion: true },
  },
  production: {
    languages: {
      document: 'en',
      planned: [
        'ar', 'be', 'bn', 'de', 'en', 'es', 'et', 'fr', 'he', 'hi',
        'id', 'it', 'ja', 'ka', 'kk', 'ko', 'lt', 'lv', 'mr', 'ms',
        'pl', 'pt', 'qm', 'ta', 'te', 'tr', 'uk', 'ur', 'vi', 'zh',
      ],
    },
    objective:
      'Recognize red and blue independently in simple, clearly colored visual examples, including unfamiliar objects and shapes.',
    depth:
      'Introductory recognition and naming only; exclude color mixing, optics, exact RGB values, and color-category boundary cases.',
    sequenceReason:
      'Introduce each color with a clear example, contrast the two, then practice recognition with new examples and retrieve the names independently. No Course prerequisite.',
    assessmentEvidence:
      'Obtain separate classification evidence for each target Skill with varied examples; use retrieval of learned color names as supplementary evidence. Do not equate assisted practice or Lesson completion with mastery.',
    assessment: {
      questionBankRequired: true,
      flashcardBankRequired: true,
      quizSectionRequired: true,
      flashcardsSectionRequired: true,
    },
    methodology: `# Methodology

## Audience and entry knowledge
A novice learner who can understand short instructions and distinguish the presented visual samples. No age-specific curriculum, prior Course, coding knowledge or reading fluency is required. This is a compact technical Playground fixture, not a curricular or diagnostic instrument.

## Target Skills and outcomes
- [testRecognizeRed.ts](../../../skills/testColors/testWarmColors/testRecognizeRed.ts): identify clearly red examples across different shapes or objects, without relying on position or object identity.
- [testRecognizeBlue.ts](../../../skills/testColors/testCoolColors/testRecognizeBlue.ts): identify clearly blue examples independently under the same conditions.
- Recognize that objects with the same shape may have different colors and different objects may share a color. Color is the relevant attribute, not size or position.

## Scope and conceptual progression
Use unambiguous red and blue samples with readable contrast and neutral surroundings. Establish the name-to-color association for each, contrast them, then vary object, shape and position while preserving the color. Distinguish the everyday labels from precise physical or digital color definitions. Real objects and displays can vary in appearance; do not claim exact hue thresholds, teach color mixing, or infer visual ability from responses. Correct the misconception that a particular shape or position determines a color. Keep copy concise and use examples without requiring subject-specific background knowledge.

## Assessment and recall
Require an independent Question Bank to cover both Skills with distinct, balanced evidence. Require one Quiz for independently demonstrated recognition, using the canonical classification method for assigning clearly colored examples to categories and retrieval for unaided recall of color names when appropriate. Vary irrelevant features and avoid answer-revealing labels in the scored recognition task. Require a Flashcard Bank and one Flashcards Section for retrieval practice of the two color terms. Practice and flashcard completion are not evidence of mastery. The runtime Quiz completion requirement is enabled for technical E2E coverage; actual question formats, grading, scoring and selections belong to the Assessment Architect. Do not invent bank members or identifiers at this stage.

## Access and localization
Use readable text, keyboard-accessible interactions, visible focus, and localized labels, captions and transcripts. Do not make navigation or feedback depend on color alone. Supply a nonvisual route to learn the color vocabulary and conceptual contrast; it cannot establish visual color discrimination, so do not score it as equivalent evidence of that perceptual Skill. Do not infer disability or diagnostic outcomes. Keep essential explanations available offline with bundled resources or textual alternatives to external media. Maintain semantic LTR/RTL layouts. English is the actual source language; the canonical planned locale roster remains intact, with English, Ukrainian and Hebrew prioritized for later runtime smoke testing. No target translations are authored at Stage 1.

## Boundaries and handoff
Keep the standalone Lesson independent of Course storylines and external services. The Screenwriter owns the instructional presentation and concrete resource specifications. The technical E2E scope seeks broad supported Section, ContentBlock, media, Scene, checkpoint and assessment coverage without inflating the educational content or treating unsupported Quest runtime as implemented. No claim of standards alignment is made.
`,
    sourceEvidence:
      'Verified Playground Skill definitions: content/playground/data/skills/testColors/testWarmColors/testRecognizeRed.ts and content/playground/data/skills/testColors/testCoolColors/testRecognizeBlue.ts; canonical assessment methods: shared/ui-kit/data/definitions/assessmentMethods/classification.ts and retrieval.ts. Baseline develop 1f6bbba5461bd092894d54804368aaeaa0e10060. No external scientific claims or standards alignment.',
  },
} satisfies LessonWorkflowStage1;
