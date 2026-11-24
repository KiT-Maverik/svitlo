import type { CourseWorkflowStage3 } from '@svitlo/engine/build';
import { howLightMoves } from '#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index';

export const courseStage3 = {
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
          config: {
            type: 'lesson',
            slug: 'lightBasics',
            skills: ['00000000-0000-4000-8000-000000000015'],
          },
          production: {
            kind: 'existing',
            existing: { id: howLightMoves.id },
            matching: {
              methodologySourcePath: 'content/playground/data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/index.ts',
              sourceSha: 'af9db146258932eda68bd5f49139b0358f80e71c',
              matchingRationale:
                'Reuse the real light-propagation fixture with theory, practice and its existing Quiz. The source includes ray models, speed comparisons and an opaque-object-shadow Question. Technical E2E reuse is requested; exact age fit, quantitative extension and accessibility need independent review. No canonical methodology.md exists: index.ts is provisional inspected implementation evidence, not an accepted methodology source. Trusted reuse is blocked until separately authorized canonical methodology is integrated.',
              languageEvidence:
                'The inspected Lesson declares all default supported languages; English and Ukrainian titles, introductory Markdown and practice text exist. Full locale/review and asset readiness remain unverified.',
            },
            assessment: {
              questionBankRequired: true,
              flashcardBankRequired: true,
              quizSectionRequired: true,
              flashcardsSectionRequired: false,
            },
          },
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
                  config: {
                    type: 'lesson',
                    slug: 'circleRecognition',
                    skills: ['00000000-0000-4000-8000-000000000008'],
                    locale: {
                      title: 'Recognizing circles',
                    },
                    params: {
                      age: {
                        min: 12,
                        max: 16,
                      },
                      quizRequiredForCompletion: true,
                    },
                  },
                  production: {
                    kind: 'new',
                    objective: 'Identify a circle among ovals and polygons and explain the distinguishing feature.',
                    depth: 'Qualitative recognition only; no formulas or geometric proofs.',
                    sequenceReason: 'Introduce the second target Skill before combined practice.',
                    assessmentEvidence:
                      'Own a small independent Question Bank for classification, counterexample recognition and explanation; include an enabled Quiz to check transfer. No Flashcard Bank or Section: discrimination practice is more useful than memorizing a label.',
                    assessment: {
                      questionBankRequired: true,
                      flashcardBankRequired: false,
                      quizSectionRequired: true,
                      flashcardsSectionRequired: false,
                    },
                    methodology:
                      'Ages 12–16; assume only everyday shape vocabulary. A circle is a closed curve whose points are equally distant from its centre; distinguish the circular outline from an oval and from straight-sided polygons. Model a familiar circular rim, contrast different-sized circles with elongated ovals and polygons, then ask learners to classify new examples and explain why rotation and size do not alter the shape. Address the misconception that every round-looking object or oval is a circle. Provide verbal shape descriptions conveying equivalent geometry, keyboard-accessible actions and feedback, avoiding color-only distinctions. Use varied examples rather than identical repetitions. The Lesson remains independent of the exhibition narrative. Build a short enabled Quiz from the owned independently authored Question Bank; no invented selections. English source, Ukrainian planned. Verify actual Skill definition testRecognizeCircle. Technical fixture; no formal geometry or curriculum certification.',
                  },
                },
              },
              order: ['circleMission', 'circleRecognition'],
            },
          },
          production: {
            methodology:
              'Compare familiar circles with ovals and polygons; use equivalent verbal descriptions and feedback about shape rather than size or orientation.',
            outcomes: { skills: ['00000000-0000-4000-8000-000000000008'] },
            prerequisites: { skills: [] },
            depth: 'Recognize circles in simple examples without measurement or geometric proof.',
            sequenceReason:
              'Introduce the second target Skill after the basic light activity so both are available for later application.',
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
                    focus:
                      'The visitor returns to the exhibition and encounters a different arrangement of light and objects.',
                    purpose:
                      'Introduce the Module as a new narrative situation for applying previously introduced Skills.',
                  },
                },
                shadowPractice: {
                  config: {
                    type: 'lesson',
                    slug: 'shadowPractice',
                    skills: ['00000000-0000-4000-8000-000000000015'],
                  },
                  production: {
                    kind: 'existing',
                    existing: howLightMoves.build.overrides(
                      { params: { sections: { allowSkipping: false } } },
                      { languages: ['en', 'uk'] },
                    ),
                    matching: {
                      methodologySourcePath:
                        'content/playground/data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/index.ts',
                      sourceSha: 'af9db146258932eda68bd5f49139b0358f80e71c',
                      matchingRationale:
                        'Revisit the same light Skill through the existing theory, practice and Quiz while requiring the ordered experience rather than skipping. The source includes ray models, speed comparisons and an opaque-object-shadow Question. Technical E2E reuse is requested; exact age fit, quantitative extension and accessibility need independent review. No canonical methodology.md exists: index.ts is provisional inspected implementation evidence, not an accepted methodology source. Trusted reuse is blocked until separately authorized canonical methodology is integrated.',
                      languageEvidence:
                        'The inspected Lesson declares all default supported languages; English and Ukrainian titles, introductory Markdown and practice text exist. Full locale/review and asset readiness remain unverified.',
                    },
                    assessment: {
                      questionBankRequired: true,
                      flashcardBankRequired: true,
                      quizSectionRequired: true,
                      flashcardsSectionRequired: false,
                    },
                    overrideRationale:
                      'Disable Lesson-wide section skipping for this Course placement only; preserve canonical Lesson identity, Skills, Quiz requirement, banks and all source content. This exercises a real nonempty sparse Build override without modifying the original Lesson.',
                  },
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
                            focus:
                              'The visitor has one remaining exhibition task involving an opaque object and circular signs.',
                            purpose:
                              'Create a Course-specific transition into the final independent practice without embedding instruction in the story.',
                          },
                        },
                        combinedPractice: {
                          config: {
                            type: 'lesson',
                            slug: 'combinedPractice',
                            skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
                            locale: {
                              title: 'Light and shape observations',
                            },
                            params: {
                              age: {
                                min: 12,
                                max: 16,
                              },
                              quizRequiredForCompletion: true,
                            },
                          },
                          production: {
                            kind: 'new',
                            objective:
                              'Predict a shadow in a simple light path and recognize a circle in an independent unfamiliar example.',
                            depth:
                              'Qualitative application of both target Skills, independently assessed; no numerical optics or proofs.',
                            sequenceReason: 'Finish the sequence with transfer after the light and circle activities.',
                            assessmentEvidence:
                              'Own a small independent Question Bank with separate prediction/explanation and circle-classification evidence; an enabled Quiz checks both independently. Own a Flashcard Bank for retrieval of light-path and circle-defining features; a short Flashcards Section precedes the Quiz. No borrowed or invented Question IDs.',
                            assessment: {
                              questionBankRequired: true,
                              flashcardBankRequired: true,
                              quizSectionRequired: true,
                              flashcardsSectionRequired: true,
                            },
                            methodology:
                              'Ages 12–16; prerequisite concepts are straight-line propagation in a uniform medium and recognition of circles. Provide a short recall prompt, a light source and opaque obstacle with a screen, and independent circle-versus-oval examples. Explain that opaque objects block direct light and can cast a shadow; distinguish the shape of an object from a shadow projection and do not claim shadows are always the same shape. Ask learners to predict which region is shadowed and justify the prediction, then separately identify a circle among contrasting outlines. Give error-directed feedback on bent-ray and round-looking-oval misconceptions. Use verbal geometric descriptions, keyboard navigation and equivalent nonvisual evidence without revealing answers; no external network. Keep the Lesson Course-neutral and suitable for standalone practice after the stated prerequisites. Independently own both banks and select real reviewed members later; use Flashcards for retrieval and Quiz for independent evidence of each Skill. English source and planned Ukrainian localization; verify the two Playground Skill definitions. No quantitative refraction or proof.',
                          },
                        },
                      },
                      order: ['finalMission', 'combinedPractice'],
                    },
                  },
                  production: {
                    methodology:
                      'Use a new example to predict a shadow and distinguish a circle; explain each observation separately and provide equivalent nonvisual descriptions.',
                    outcomes: {
                      skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
                    },
                    prerequisites: {
                      skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
                    },
                    depth:
                      'Introductory transfer of two independently learned concepts, without quantitative optics or formal geometry.',
                    sequenceReason:
                      'Conclude practice by combining previously introduced Skills in one unfamiliar situation.',
                  },
                },
              },
              order: ['practiceMission', 'shadowPractice', 'combinedObservations'],
            },
          },
          production: {
            methodology:
              'Revisit the straight-line light model with a new arrangement, then apply light and circle recognition in a combined observation. Use prediction, explanation and corrective feedback.',
            outcomes: {
              skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
            },
            prerequisites: {
              skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],
            },
            depth: 'Qualitative application and reinforcement of the two introductory Skills.',
            sequenceReason:
              'Follow the initial light and circle activities with practice at greater contextual variety, without adding new prerequisite Skills.',
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
} satisfies CourseWorkflowStage3;
