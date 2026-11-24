import type { QuestionBankWorkflowStage2 } from '@svitlo/engine/build';

// Synthetic E2E fixture: editorial Lesson inputs are simulated, not reviewed production evidence.
export const questionBankDraft = {
  config: {
    ownerLessonId: 'a7485d31-89f0-4d15-9cb2-b730bc94a8e7',
    questions: {
      selectOneAnswer: {
        singleChoice: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-000000000011',
            slug: 'singleChoice',
            type: 'selectOneAnswer',
            params: {
              assessmentMethod: 'classification',
              restrictions: [],
            },
            locale: {},
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-00000000000a',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Select red.',
                        },
                      },
                    },
                  },
                  image: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-00000000000b',
                      slug: 'image',
                      type: 'image',
                      params: {
                        width: 320,
                        height: 240,
                      },
                      locale: {
                        fileName: '73fd4c6d-228d-47ac-bae5-3f6c13e90ca2.svg',
                        alt: {
                          en: 'Existing Playground image fixture',
                        },
                      },
                    },
                  },
                  markdown: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-00000000000c',
                      slug: 'markdown',
                      type: 'markdown',
                      params: {},
                      locale: {
                        value: {
                          en: '**Red** is the target.',
                        },
                      },
                    },
                  },
                },
                order: ['prompt', 'image', 'markdown'],
              },
              hint: {
                items: {
                  hintText: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000010',
                      slug: 'hintText',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Read the target.',
                        },
                      },
                    },
                  },
                },
                order: ['hintText'],
              },
              explanation: {
                items: {
                  checkpoint: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000004',
                      slug: 'checkpoint',
                      type: 'checkpoint',
                      params: {},
                      locale: {
                        title: {
                          en: 'Fixture checkpoint',
                        },
                      },
                      content: {
                        items: {
                          reviewItem: {
                            config: {
                              id: 'a7485d31-89f0-4d15-9cb2-000000000005',
                              slug: 'reviewItem',
                              type: 'checkpointItem',
                              question: {
                                config: {
                                  id: 'a7485d31-89f0-4d15-9cb2-000000000006',
                                  slug: 'reviewPrompt',
                                  type: 'text',
                                  params: {},
                                  locale: {
                                    value: {
                                      en: 'Review the example.',
                                    },
                                  },
                                },
                              },
                              answer: {
                                config: {
                                  id: 'a7485d31-89f0-4d15-9cb2-000000000007',
                                  slug: 'reviewAnswer',
                                  type: 'checkpointAnswer',
                                  content: {
                                    items: {
                                      reviewText: {
                                        config: {
                                          id: 'a7485d31-89f0-4d15-9cb2-000000000008',
                                          slug: 'reviewText',
                                          type: 'text',
                                          params: {},
                                          locale: {
                                            value: {
                                              en: 'This is a test.',
                                            },
                                          },
                                        },
                                      },
                                      reviewCode: {
                                        config: {
                                          id: 'a7485d31-89f0-4d15-9cb2-000000000009',
                                          slug: 'reviewCode',
                                          type: 'code',
                                          params: {
                                            language: 'javascript',
                                            codeAsText: '2 + 2',
                                          },
                                          locale: {
                                            title: {
                                              en: 'Expression',
                                            },
                                          },
                                        },
                                      },
                                    },
                                    order: ['reviewText', 'reviewCode'],
                                  },
                                },
                              },
                            },
                          },
                        },
                        order: ['reviewItem'],
                      },
                    },
                  },
                },
                order: ['checkpoint'],
              },
              answers: {
                correct: {
                  items: {
                    red: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-00000000000d',
                        slug: 'red',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Red',
                          },
                        },
                      },
                    },
                  },
                  order: ['red'],
                },
                incorrect: {
                  items: {
                    blue: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-00000000000e',
                        slug: 'blue',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Blue',
                          },
                        },
                      },
                    },
                  },
                  order: ['blue'],
                },
                distractors: {
                  items: {
                    green: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-00000000000f',
                        slug: 'green',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Green',
                          },
                        },
                      },
                    },
                  },
                  order: ['green'],
                },
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise selectOneAnswer in a synthetic fixture.',
              assessmentMethod: 'classification',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: singleChoice',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
        mediaCoverage: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-00000000003b',
            slug: 'mediaCoverage',
            type: 'selectOneAnswer',
            params: {
              assessmentMethod: 'classification',
              restrictions: [],
            },
            locale: {},
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000033',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Select the label Fixture.',
                        },
                      },
                    },
                  },
                  audio: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000034',
                      slug: 'audio',
                      type: 'audio',
                      params: {},
                      locale: {
                        fileName: 'c62066ad-c957-41d5-8dd1-3ea524e75b9c.wav',
                        title: {
                          en: 'Audio fixture',
                        },
                      },
                    },
                  },
                  video: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000035',
                      slug: 'video',
                      type: 'video',
                      params: {},
                      locale: {
                        fileName: 'a8d23b46-7dae-46c2-ab6b-dce183c924fe.mp4',
                        posterFileName: '57afc1bb-0a28-4fce-b5a3-e19916f80c71.png',
                        label: {
                          en: 'Video fixture',
                        },
                      },
                    },
                  },
                  subtitles: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000036',
                      slug: 'subtitles',
                      type: 'subtitles',
                      params: {},
                      locale: {
                        fileName: '00000000-0000-0000-0000-000000000000.vtt',
                      },
                    },
                    production: {
                      pending: true,
                      specification: 'Technical fixture resource to be completed and verified before bank materialization.',
                    },
                  },
                  youtube: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000037',
                      slug: 'youtube',
                      type: 'youtube',
                      params: {
                        mode: 'link',
                      },
                      locale: {
                        href: '00000000-0000-0000-0000-000000000000',
                        label: {
                          en: 'YouTube fixture',
                        },
                      },
                    },
                    production: {
                      pending: true,
                      specification: 'Technical fixture resource to be completed and verified before bank materialization.',
                    },
                  },
                  scene: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000038',
                      slug: 'scene',
                      type: 'scene',
                      params: {},
                      locale: {
                        value: {
                          label: {
                            en: 'Scene fixture',
                          },
                        },
                      },
                    },
                    production: {
                      pending: true,
                      specification: 'Technical fixture resource to be completed and verified before bank materialization.',
                    },
                  },
                },
                order: ['prompt', 'audio', 'video', 'subtitles', 'youtube', 'scene'],
              },
              answers: {
                correct: {
                  items: {
                    fixture: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-000000000039',
                        slug: 'fixture',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Fixture',
                          },
                        },
                      },
                    },
                  },
                  order: ['fixture'],
                },
                incorrect: {
                  items: {
                    other: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-00000000003a',
                        slug: 'other',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Other',
                          },
                        },
                      },
                    },
                  },
                  order: ['other'],
                },
                distractors: {
                  items: {},
                  order: [],
                },
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise selectOneAnswer in a synthetic fixture.',
              assessmentMethod: 'classification',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: mediaCoverage',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
      selectMultipleAnswers: {
        multipleChoice: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-000000000017',
            slug: 'multipleChoice',
            type: 'selectMultipleAnswers',
            params: {
              assessmentMethod: 'classification',
              restrictions: [],
            },
            locale: {},
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000012',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Select both named warm colors: red and orange.',
                        },
                      },
                    },
                  },
                },
                order: ['prompt'],
              },
              explanation: {
                items: {
                  carousel: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000001',
                      slug: 'carousel',
                      type: 'carousel',
                      params: {},
                      locale: {
                        title: {
                          en: 'Fixture slides',
                        },
                      },
                      slides: {
                        items: {
                          imageSlide: {
                            config: {
                              id: 'a7485d31-89f0-4d15-9cb2-000000000002',
                              slug: 'imageSlide',
                              type: 'image',
                              params: {
                                width: 320,
                                height: 240,
                              },
                              locale: {
                                fileName: '73fd4c6d-228d-47ac-bae5-3f6c13e90ca2.svg',
                                alt: {
                                  en: 'Existing Playground image fixture',
                                },
                              },
                            },
                          },
                          sceneSlide: {
                            config: {
                              id: 'a7485d31-89f0-4d15-9cb2-000000000003',
                              slug: 'sceneSlide',
                              type: 'scene',
                              params: {},
                              locale: {
                                value: {
                                  label: {
                                    en: 'Scene fixture',
                                  },
                                },
                              },
                            },
                            production: {
                              pending: true,
                              specification: 'Technical fixture resource to be completed and verified before bank materialization.',
                            },
                          },
                        },
                        order: ['imageSlide', 'sceneSlide'],
                      },
                    },
                  },
                },
                order: ['carousel'],
              },
              answers: {
                correct: {
                  items: {
                    red: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-000000000013',
                        slug: 'red',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Red',
                          },
                        },
                      },
                    },
                    orange: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-000000000014',
                        slug: 'orange',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Orange',
                          },
                        },
                      },
                    },
                  },
                  order: ['red', 'orange'],
                },
                incorrect: {
                  items: {
                    blue: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-000000000015',
                        slug: 'blue',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Blue',
                          },
                        },
                      },
                    },
                  },
                  order: ['blue'],
                },
                distractors: {
                  items: {
                    green: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-000000000016',
                        slug: 'green',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Green',
                          },
                        },
                      },
                    },
                  },
                  order: ['green'],
                },
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise selectMultipleAnswers in a synthetic fixture.',
              assessmentMethod: 'classification',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: multipleChoice',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
      matchBlocks: {
        pairMatch: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-00000000001d',
            slug: 'pairMatch',
            type: 'matchBlocks',
            params: {
              assessmentMethod: 'relationshipMapping',
              restrictions: [],
            },
            locale: {},
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000018',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Match each number to its word.',
                        },
                      },
                    },
                  },
                },
                order: ['prompt'],
              },
              pairs: {
                items: {
                  one: {
                    left: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-000000000019',
                        slug: 'oneNumber',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: '1',
                          },
                        },
                      },
                    },
                    right: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-00000000001a',
                        slug: 'oneWord',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'One',
                          },
                        },
                      },
                    },
                  },
                  two: {
                    left: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-00000000001b',
                        slug: 'twoNumber',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: '2',
                          },
                        },
                      },
                    },
                    right: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-00000000001c',
                        slug: 'twoWord',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: 'Two',
                          },
                        },
                      },
                    },
                  },
                },
                order: ['one', 'two'],
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise matchBlocks in a synthetic fixture.',
              assessmentMethod: 'relationshipMapping',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: pairMatch',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
      answerWithText: {
        textAnswer: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-00000000001f',
            slug: 'textAnswer',
            type: 'answerWithText',
            params: {
              assessmentMethod: 'retrieval',
              restrictions: [],
            },
            locale: {
              correctAnswers: {
                red: {
                  en: 'red',
                },
                capitalized: {
                  en: 'Red',
                },
              },
              placeholder: {
                en: 'Color',
              },
            },
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-00000000001e',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Name the color red.',
                        },
                      },
                    },
                  },
                },
                order: ['prompt'],
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise answerWithText in a synthetic fixture.',
              assessmentMethod: 'retrieval',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: textAnswer',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
      answerWithNumber: {
        numberAnswer: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-000000000022',
            slug: 'numberAnswer',
            type: 'answerWithNumber',
            params: {
              assessmentMethod: 'application',
              restrictions: [],
              correctAnswers: [4],
            },
            locale: {
              placeholder: {
                en: 'Number',
              },
            },
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000020',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'What is 2 + 2?',
                        },
                      },
                    },
                  },
                  expression: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000021',
                      slug: 'expression',
                      type: 'code',
                      params: {
                        language: 'javascript',
                        codeAsText: '2 + 2',
                      },
                      locale: {},
                    },
                  },
                },
                order: ['prompt', 'expression'],
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise answerWithNumber in a synthetic fixture.',
              assessmentMethod: 'application',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: numberAnswer',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
      orderSequence: {
        sequenceOrder: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-000000000027',
            slug: 'sequenceOrder',
            type: 'orderSequence',
            params: {
              assessmentMethod: 'structuralAnalysis',
              restrictions: [],
            },
            locale: {},
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000023',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Order the numbers from smallest to largest.',
                        },
                      },
                    },
                  },
                },
                order: ['prompt'],
              },
              sequence: {
                items: {
                  first: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000024',
                      slug: 'first',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: '1',
                        },
                      },
                    },
                  },
                  second: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000025',
                      slug: 'second',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: '2',
                        },
                      },
                    },
                  },
                  third: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000026',
                      slug: 'third',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: '3',
                        },
                      },
                    },
                  },
                },
                order: ['first', 'second', 'third'],
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise orderSequence in a synthetic fixture.',
              assessmentMethod: 'structuralAnalysis',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: sequenceOrder',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
      buildAnswerWithBlocks: {
        blockBuild: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-00000000002c',
            slug: 'blockBuild',
            type: 'buildAnswerWithBlocks',
            params: {
              assessmentMethod: 'knowledgeConstruction',
              restrictions: [],
            },
            locale: {
              placeholder: {
                en: 'Build the phrase',
              },
            },
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000028',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Build the phrase red light.',
                        },
                      },
                    },
                  },
                },
                order: ['prompt'],
              },
              correctSequence: {
                items: {
                  red: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000029',
                      slug: 'red',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Red',
                        },
                      },
                    },
                  },
                  light: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-00000000002a',
                      slug: 'light',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'light',
                        },
                      },
                    },
                  },
                },
                order: ['red', 'light'],
              },
              distractors: {
                items: {
                  blue: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-00000000002b',
                      slug: 'blue',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Blue',
                        },
                      },
                    },
                  },
                },
                order: ['blue'],
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise buildAnswerWithBlocks in a synthetic fixture.',
              assessmentMethod: 'knowledgeConstruction',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: blockBuild',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
      fillBlanksWithBlocks: {
        blockBlank: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-000000000030',
            slug: 'blockBlank',
            type: 'fillBlanksWithBlocks',
            params: {
              assessmentMethod: 'missingInformationInference',
              restrictions: [],
            },
            locale: {
              placeholder: {
                en: 'Choose a number',
              },
            },
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-00000000002d',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Complete the sequence 1, __, 3.',
                        },
                      },
                    },
                  },
                },
                order: ['prompt'],
              },
              slots: {
                items: {
                  middle: {
                    correctAnswer: {
                      config: {
                        id: 'a7485d31-89f0-4d15-9cb2-00000000002e',
                        slug: 'two',
                        type: 'text',
                        params: {},
                        locale: {
                          value: {
                            en: '2',
                          },
                        },
                      },
                    },
                  },
                },
                order: ['middle'],
              },
              distractors: {
                items: {
                  four: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-00000000002f',
                      slug: 'four',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: '4',
                        },
                      },
                    },
                  },
                },
                order: ['four'],
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise fillBlanksWithBlocks in a synthetic fixture.',
              assessmentMethod: 'missingInformationInference',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: blockBlank',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
      fillBlanksWithText: {
        textBlank: {
          config: {
            id: 'a7485d31-89f0-4d15-9cb2-000000000032',
            slug: 'textBlank',
            type: 'fillBlanksWithText',
            params: {
              assessmentMethod: 'missingInformationInference',
              restrictions: [],
            },
            locale: {
              placeholder: {
                en: 'Type a letter',
              },
            },
            content: {
              question: {
                items: {
                  prompt: {
                    config: {
                      id: 'a7485d31-89f0-4d15-9cb2-000000000031',
                      slug: 'prompt',
                      type: 'text',
                      params: {},
                      locale: {
                        value: {
                          en: 'Complete the sequence A, __, C.',
                        },
                      },
                    },
                  },
                },
                order: ['prompt'],
              },
              slots: {
                items: {
                  middle: {
                    correctAnswers: {
                      letter: {
                        en: 'B',
                      },
                    },
                  },
                },
                order: ['middle'],
              },
            },
          },
          production: {
            evidence: {
              skillId: '00000000-0000-4000-8000-000000000001',
              outcome: 'Exercise fillBlanksWithText in a synthetic fixture.',
              assessmentMethod: 'missingInformationInference',
              cognitiveOperation: 'Exercise the response contract.',
              knowledgeAspect: 'Synthetic examples.',
              cognitiveDemand: 'Technical coverage.',
              misconception: 'Incorrect response path.',
              context: 'Playground E2E.',
              expectedEvidence: 'Deterministic response model.',
            },
            distinction: 'Distinct response or block coverage: textBlank',
            intendedUse: 'core',
            rationale: 'Technical fixture, not pedagogical approval.',
          },
        },
      },
    },
  },
  production: {
    languages: { document: 'en', planned: ['en', 'uk', 'he'] },
    lesson: {
      sourcePath: 'content/playground/data/lessons/7/a7485d31-89f0-4d15-9cb2-b730bc94a8e7/index.ts',
      sourceSha: 'not-created-synthetic-fixture',
      referencePath: 'not-generated-synthetic-fixture',
      referenceSha: 'not-generated-synthetic-fixture',
      methodologyPath: 'not-created-synthetic-fixture',
      title: 'Question Bank E2E Fixture',
    },
    assessment: {
      questionBankRequired: true,
      flashcardBankRequired: false,
      quizSectionRequired: true,
      flashcardsSectionRequired: false,
      quizRequiredForCompletion: true,
    },
    ownershipRationale: 'Exercise the independent Question Bank production pipeline in Playground.',
    audience: 'Synthetic technical test; not curricular material.',
    scope: 'Cover all supported Question discriminants, legal nested ContentBlocks, answer models, materialization, publication and localization.',
    prerequisites: 'Existing Playground test Skill; Lesson editorial input is simulated. Real owner source will be needed if the deployed technical gate requires it.',
    evidenceIntent: [
      {
        skillId: '00000000-0000-4000-8000-000000000001',
        outcome: 'Exercise fixture response and scoring paths.',
        assessmentMethod: 'classification',
        cognitiveOperation: 'Classify synthetic examples.',
        knowledgeAspect: 'Fixture color labels and representations.',
        cognitiveDemand: 'Technical coverage rather than pedagogical validity.',
        misconception: 'Synthetic distractor case.',
        context: 'Playground E2E fixture.',
        expectedEvidence: 'Supported answer models produce deterministic results.',
      },
    ],
    misconceptions: 'Synthetic distractors and incorrect-answer paths.',
    mediaNeeds: 'Exercise legal media and composite blocks with actual fixture assets before strict publication.',
    sourcesAndDependencies: 'Synthetic Lesson analysis authorized for E2E only. No real Lesson source, derived Markdown, independent review or publication is claimed.',
  },
} satisfies QuestionBankWorkflowStage2;
