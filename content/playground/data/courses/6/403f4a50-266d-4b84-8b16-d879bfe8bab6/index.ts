import type { CourseWorkflowStage1 } from '@svitlo/engine/build';

export const courseStage1 = {
  config: {
    id: '403f4a50-266d-4b84-8b16-d879bfe8bab6',
    type: 'course',
    slug: 'lightAndShapes',
    params: {
      age: { min: 12, max: 16 },
      outcomes: {
        skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
      },
      prerequisites: { skills: [] },
    },
    locale: {
      title: 'Light and Shapes',
      description: 'Explore how light travels and recognize circles in everyday objects.',
    },
  },
  production: {
    languages: { document: 'en', planned: ['en', 'uk'] },
    methodology: {
      purpose:
        'Provide a small, synthetic Playground course for exercising the typed production workflow while practicing simple observations of light and shapes.',
      audience:
        'Learners aged 12–16 who can read short instructions and describe everyday observations; no formal optics or geometry background is assumed.',
      approach:
        'Start with familiar light and shape examples, ask learners to predict or classify, then explain the relevant feature and give corrective feedback. Offer short textual examples and optional repetition.',
      depth:
        'Introductory qualitative explanations of straight-line propagation in a uniform medium and shadow formation, plus recognition of circles independently of size or rotation. No calculations or formal proofs.',
      accessibility:
        'Use short source text and equivalent verbal descriptions of geometric features and light paths; support keyboard and screen-reader interaction, avoid color-only cues and require no network-dependent activity. Plan genuine English and Ukrainian localization.',
      scope:
        'Cover basic light paths, shadows and circle recognition. Exclude quantitative optics, refraction calculations, and advanced geometry. This is a technical fixture, not a complete curriculum.',
      entryConditions:
        'Learners can follow a short written or spoken prompt and distinguish everyday objects; provide an introductory example if these assumptions are not met.',
      sourceNotes:
        'Verified synthetic Playground taxonomy: data/skills/testLight/testLightPropagation/testExplainLightTravel.ts and data/skills/testShapes/testRoundShapes/testRecognizeCircle.ts. The fixture labels are not genuine translations or curriculum standards.',
    },
    outcomes: {
      explanation:
        'Explain why an opaque object can cast a shadow and identify a circle among contrasting shapes; evidence comes from short predictions, classifications and explanations in unfamiliar examples.',
    },
    prerequisites: {
      explanation:
        'No formal prerequisite Skill UUID is required; check basic comprehension with a familiar example and supply support if needed.',
    },
    standardsAlignment: [],
    openDecisions: {},
  },
} satisfies CourseWorkflowStage1;
