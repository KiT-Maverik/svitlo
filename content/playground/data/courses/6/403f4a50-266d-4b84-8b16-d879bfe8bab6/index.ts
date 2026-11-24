import type { CourseWorkflowStage2 } from '@svitlo/engine/build';

export const courseStage2 = {
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
    content: {
      items: {
        openingMission: {
          config: { type: 'episode' },
          production: {
            focus: 'A visitor to a small exhibition needs help interpreting a lamp, an object and its shadow.',
            purpose: 'Introduce the Course-specific mission and connect the subsequent standalone learning activities.',
          },
        },
        lightBasics: {
          config: { type: 'lesson', skills: ['00000000-0000-4000-8000-000000000015'] },
        },
        familiarCircles: {
          config: {
            type: 'chapter',
            slug: 'familiarCircles',
            locale: { title: 'Familiar circles' },
            content: {
              items: {
                circleMission: {
                  config: { type: 'episode' },
                  production: {
                    focus: 'The exhibition visitor needs to identify circular signs among different shapes.',
                    purpose: 'Provide a local narrative reason for the next independent classification activity.',
                  },
                },
                circleRecognition: {
                  config: { type: 'lesson', skills: ['00000000-0000-4000-8000-000000000008'] },
                },
              },
              order: ['circleMission', 'circleRecognition'],
            },
          },
          production: {
            methodology: 'Compare familiar circles with ovals and polygons; use equivalent verbal descriptions and feedback about shape rather than size or orientation.',
            outcomes: { skills: ['00000000-0000-4000-8000-000000000008'] },
            prerequisites: { skills: [] },
            depth: 'Recognize circles in simple examples without measurement or geometric proof.',
            sequenceReason: 'Introduce the second target Skill after the basic light activity so both are available for later application.',
          },
        },
        exhibitionPractice: {
          config: {
            type: 'module',
            slug: 'exhibitionPractice',
            locale: { title: 'Exhibition practice' },
            content: {
              items: {
                practiceMission: {
                  config: { type: 'episode' },
                  production: {
                    focus: 'The visitor returns to the exhibition and encounters a different arrangement of light and objects.',
                    purpose: 'Introduce the Module as a new narrative situation for applying previously introduced Skills.',
                  },
                },
                shadowPractice: {
                  config: { type: 'lesson', skills: ['00000000-0000-4000-8000-000000000015'] },
                },
                combinedObservations: {
                  config: {
                    type: 'chapter',
                    slug: 'combinedObservations',
                    locale: { title: 'Combined observations' },
                    content: {
                      items: {
                        finalMission: {
                          config: { type: 'episode' },
                          production: {
                            focus: 'The visitor has one remaining exhibition task involving an opaque object and circular signs.',
                            purpose: 'Create a Course-specific transition into the final independent practice without embedding instruction in the story.',
                          },
                        },
                        combinedPractice: {
                          config: {
                            type: 'lesson',
                            skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
                          },
                        },
                      },
                      order: ['finalMission', 'combinedPractice'],
                    },
                  },
                  production: {
                    methodology: 'Use a new example to predict a shadow and distinguish a circle; explain each observation separately and provide equivalent nonvisual descriptions.',
                    outcomes: {
                      skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
                    },
                    prerequisites: {
                      skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
                    },
                    depth: 'Introductory transfer of two independently learned concepts, without quantitative optics or formal geometry.',
                    sequenceReason: 'Conclude practice by combining previously introduced Skills in one unfamiliar situation.',
                  },
                },
              },
              order: ['practiceMission', 'shadowPractice', 'combinedObservations'],
            },
          },
          production: {
            methodology: 'Revisit the straight-line light model with a new arrangement, then apply light and circle recognition in a combined observation. Use prediction, explanation and corrective feedback.',
            outcomes: {
              skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
            },
            prerequisites: {
              skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
            },
            depth: 'Qualitative application and reinforcement of the two introductory Skills.',
            sequenceReason: 'Follow the initial light and circle activities with practice at greater contextual variety, without adding new prerequisite Skills.',
          },
        },
      },
      order: ['openingMission', 'lightBasics', 'familiarCircles', 'exhibitionPractice'],
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
} satisfies CourseWorkflowStage2;
