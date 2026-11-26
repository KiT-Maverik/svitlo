import type { CourseWorkflowStage3, CourseLessonSourcePatch } from '@svitlo/engine/build';
import type { howLightMoves } from '#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index';

export default {
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
            sourceExportName: 'howLightMoves',
            existing: { id: 'd3048d21-8690-5255-b62c-984c69ac272c' },
            matching: {
              methodologySourcePath:
                'content/playground/data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/methodology.md',
              sourceSha: 'a88123a28df5db5c2aa78fdd4af73071a688a901',
              matchingRationale:
                'Reuse the real light-propagation fixture with theory, practice and its existing Quiz. The source includes ray models, speed comparisons and an opaque-object-shadow Question. Technical E2E reuse is explicitly authorized by the owner; educational quality and age-fit certification are outside this fixture test. The canonical retrospective methodology.md integrated via PR #809 documents the unchanged Lesson, Skill, Sections, assessment ownership and locale scope. Trusted materialization remains subject to the actual technical and source verification gates.',
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
                chapterReview: {
                  config: {
                    type: 'assessment',
                    locale: { title: 'Recognizing circles — chapter review' },
                  },
                  production: {
                    purpose:
                      'Check independent transfer of circle recognition after the Chapter Lesson, with genuine reviewed Questions selected only during the Assessment workflow. Keep this Course fixture assessment blocked until its upstream Lesson Bank is available.',
                    lessonDependencies: ['content/familiarCircles/circleRecognition'],
                  },
                },
              },
              order: ['circleMission', 'circleRecognition', 'chapterReview'],
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
                    sourceExportName: 'howLightMoves',
                    existing: { id: 'd3048d21-8690-5255-b62c-984c69ac272c' },
                    sourcePatch: {
                      params: { sections: { allowSkipping: false } },
                      section: {
                        items: {
                          practice: {
                            params: { skippable: false },
                            content: {
                              items: {
                                task: {
                                  locale: {
                                    value: {
                                      en: 'At this exhibition, compare the shadow of an opaque object when the lamp moves.',
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                        additionalItems: {
                          exhibitionNotes: {
                            $create: 'course-section',
                            source: {
                              config: {
                                id: 'e6073d92-4b8c-4c6f-8920-6ab25ca94711',
                                type: 'content',
                                slug: 'exhibitionNotes',
                                params: {},
                                locale: {
                                  title: { en: 'Exhibition shadow observations' },
                                  navigationLabel: 'Exhibition notes',
                                },
                                content: {
                                  items: {
                                    shadowObservation: {
                                      config: {
                                        id: 'e6073d92-4b8c-4c6f-8920-6ab25ca94712',
                                        type: 'text',
                                        slug: 'shadowObservation',
                                        params: {},
                                        locale: {
                                          value: {
                                            en: 'Move the lamp closer to an opaque object. Predict how its shadow changes and explain why.',
                                          },
                                        },
                                      },
                                    },
                                    shadowMarkdown: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94713",
                                        "type": "markdown",
                                        "slug": "shadowMarkdown",
                                        "params": {},
                                        "locale": {
                                          "value": {
                                            "en": "**Observe:** an opaque object blocks light. Describe the change in its shadow."
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise the Markdown ContentBlock."
                                      }
                                    },
                                    shadowCode: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94714",
                                        "type": "code",
                                        "slug": "shadowCode",
                                        "params": {
                                          "language": "typescript",
                                          "codeAsText": "const blocksLight = true;\nconst shadowAppears = blocksLight;"
                                        },
                                        "locale": {
                                          "title": {
                                            "en": "A simple shadow model"
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise Code with authored invariant codeAsText."
                                      }
                                    },
                                    shadowDiagram: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94715",
                                        "type": "image",
                                        "slug": "shadowDiagram",
                                        "params": {
                                          "width": 640,
                                          "height": 360
                                        },
                                        "locale": {
                                          "alt": {
                                            "en": "A lamp casts a shadow from an opaque object."
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise the Image materializer.",
                                        "prompt": "Create an original 640×360 instructional diagram. At left, show a lamp shining straight light rays toward one opaque cube between the lamp and a vertical screen on the right. Show which rays reach the screen around the cube and which are blocked, producing a sharply defined shadow behind it. Keep correct alignment, clear high-contrast shapes, and a plain background without embedded text."
                                      }
                                    },
                                    shadowVideo: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94716",
                                        "type": "video",
                                        "slug": "shadowVideo",
                                        "params": {},
                                        "locale": {
                                          "label": {
                                            "en": "Lamp and shadow demonstration"
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise Video without pretending media exists.",
                                        "specification": "Produce a short captioned video with an equivalent text explanation."
                                      }
                                    },
                                    shadowYoutube: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94717",
                                        "type": "youtube",
                                        "slug": "shadowYoutube",
                                        "params": {
                                          "mode": "link"
                                        },
                                        "locale": {
                                          "label": {
                                            "en": "Optional external video about shadows"
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise YouTube without fabricating a link.",
                                        "specification": "Verify a genuinely suitable captioned video and supply its URL only after review."
                                      }
                                    },
                                    shadowAudio: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94718",
                                        "type": "audio",
                                        "slug": "shadowAudio",
                                        "params": {},
                                        "locale": {
                                          "title": {
                                            "en": "Narrated shadow observation"
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise Audio with pending recording.",
                                        "specification": "Record and transcribe the observed light-object-shadow relationship."
                                      }
                                    },
                                    shadowSubtitles: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94719",
                                        "type": "subtitles",
                                        "slug": "shadowSubtitles",
                                        "params": {},
                                        "locale": {}
                                      },
                                      "production": {
                                        "purpose": "Exercise Subtitles with a pending caption asset.",
                                        "specification": "Author WebVTT captions aligned to the finished video or audio."
                                      }
                                    },
                                    shadowScene: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471a",
                                        "type": "scene",
                                        "slug": "shadowScene",
                                        "params": {},
                                        "locale": {
                                          "value": {
                                            "instruction": {
                                              "en": "Move the lamp or read the equivalent shadow explanation."
                                            }
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise the Scene materializer.",
                                        "specification": "Implement a keyboard-operable Scene with textual shadow feedback and reduced motion."
                                      }
                                    },
                                    shadowCarousel: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471b",
                                        "type": "carousel",
                                        "slug": "shadowCarousel",
                                        "params": {
                                          "showArrows": true,
                                          "showIndicators": true
                                        },
                                        "locale": {
                                          "title": {
                                            "en": "Two views of the shadow"
                                          }
                                        },
                                        "slides": {
                                          "items": {
                                            "lampSlide": {
                                              "config": {
                                                "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471c",
                                                "type": "image",
                                                "slug": "lampSlide",
                                                "params": {
                                                  "width": 640,
                                                  "height": 360
                                                },
                                                "locale": {
                                                  "alt": {
                                                    "en": "A lamp casts a shadow from an opaque object."
                                                  }
                                                }
                                              },
                                              "production": {
                                                "purpose": "Exercise the Image materializer.",
                                                "prompt": "Generate a clear 640×360 first-view illustration for a two-slide shadow comparison. Put a lamp at left, a single opaque object in the middle, and a pale vertical screen at right. Draw several straight rays from the lamp, with the object blocking the middle rays and a dark shadow on the screen. Use an uncluttered side view, consistent perspective and readable contrast; no text or decorative imagery."
                                              }
                                            },
                                            "interactiveSlide": {
                                              "config": {
                                                "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471d",
                                                "type": "scene",
                                                "slug": "interactiveSlide",
                                                "params": {},
                                                "locale": {
                                                  "value": {
                                                    "instruction": {
                                                      "en": "Move the lamp or read the equivalent shadow explanation."
                                                    }
                                                  }
                                                }
                                              },
                                              "production": {
                                                "purpose": "Exercise the Scene materializer.",
                                                "specification": "Implement a keyboard-operable Scene with textual shadow feedback and reduced motion."
                                              }
                                            }
                                          },
                                          "order": [
                                            "lampSlide",
                                            "interactiveSlide"
                                          ]
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise Carousel with Image and Scene slides."
                                      }
                                    },
                                    shadowCheckpoint: {
                                      "config": {
                                        "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471e",
                                        "type": "checkpoint",
                                        "slug": "shadowCheckpoint",
                                        "params": {
                                          "requireCompletion": false,
                                          "showIndices": true
                                        },
                                        "locale": {
                                          "title": {
                                            "en": "Check the shadow observation"
                                          }
                                        },
                                        "content": {
                                          "items": {
                                            "firstObservation": {
                                              "config": {
                                                "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471f",
                                                "type": "checkpointItem",
                                                "slug": "firstObservation",
                                                "check": true,
                                                "question": {
                                                  "config": {
                                                    "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94720",
                                                    "type": "text",
                                                    "slug": "question",
                                                    "params": {},
                                                    "locale": {
                                                      "value": {
                                                        "en": "What changes when a lamp moves closer to an opaque object?"
                                                      }
                                                    }
                                                  },
                                                  "production": {
                                                    "purpose": "Pose a reflective Checkpoint question."
                                                  }
                                                },
                                                "answer": {
                                                  "config": {
                                                    "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94721",
                                                    "type": "checkpointAnswer",
                                                    "slug": "answer",
                                                    "content": {
                                                      "items": {
                                                        "explanation": {
                                                          "config": {
                                                            "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94722",
                                                            "type": "text",
                                                            "slug": "explanation",
                                                            "params": {},
                                                            "locale": {
                                                              "value": {
                                                                "en": "The shadow can change size and position as the lamp, object and surface change relative positions."
                                                              }
                                                            }
                                                          },
                                                          "production": {
                                                            "purpose": "Give readable Checkpoint answer feedback."
                                                          }
                                                        },
                                                        "answerDiagram": {
                                                          "config": {
                                                            "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94724",
                                                            "type": "image",
                                                            "slug": "answerDiagram",
                                                            "params": {
                                                              "width": 640,
                                                              "height": 360
                                                            },
                                                            "locale": {
                                                              "alt": {
                                                                "en": "A lamp casts a shadow from an opaque object."
                                                              }
                                                            }
                                                          },
                                                          "production": {
                                                            "purpose": "Exercise the Image materializer.",
                                                            "prompt": "Draw a 640×360 side-by-side comparison of two lamp positions. Keep the same opaque cube and screen positions in each panel; the first has the lamp farther from the cube and the second has the lamp closer. In both panels depict straight light rays and the cast-shadow boundaries, clearly showing how the shadow changes in size. Keep geometry, scale, perspective and contrast consistent, without baked-in labels."
                                                          }
                                                        }
                                                      },
                                                      "order": [
                                                        "explanation",
                                                        "answerDiagram"
                                                      ]
                                                    }
                                                  }
                                                }
                                              },
                                              "production": {
                                                "purpose": "Check an unscored qualitative understanding of the light-shadow relation."
                                              }
                                            }
                                          },
                                          "order": [
                                            "firstObservation"
                                          ]
                                        }
                                      },
                                      "production": {
                                        "purpose": "Exercise Checkpoint with a Text question and a Text/Image answer."
                                      }
                                    },
                                  },
                                  order: ['shadowObservation', 'shadowMarkdown', 'shadowCode', 'shadowDiagram', 'shadowVideo', 'shadowYoutube', 'shadowAudio', 'shadowSubtitles', 'shadowScene', 'shadowCarousel', 'shadowCheckpoint'],
                                },
                              },
                              production: {
                                purpose:
                                  'Exercise all 11 ContentBlock kinds in one new Course-owned Section, including nested Carousel slides and Checkpoint answer content. All unavailable media/Scenes remain explicit production tasks; the canonical Lesson stays unchanged.',
                              },
                            },
                          },
                        },
                        order: ['content', 'practice', 'quiz', 'exhibitionNotes'],
                      },
                    } satisfies CourseLessonSourcePatch<typeof howLightMoves>,
                    matching: {
                      methodologySourcePath:
                        'content/playground/data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/methodology.md',
                      sourceSha: 'a88123a28df5db5c2aa78fdd4af73071a688a901',
                      matchingRationale:
                        'Revisit the same light Skill through the existing theory, practice and Quiz while requiring the ordered experience rather than skipping. The source includes ray models, speed comparisons and an opaque-object-shadow Question. Technical E2E reuse is explicitly authorized by the owner; educational quality and age-fit certification are outside this fixture test. The canonical retrospective methodology.md integrated via PR #809 documents the unchanged Lesson, Skill, Sections, assessment ownership and locale scope. Trusted materialization remains subject to the actual technical and source verification gates.',
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
                      'Disable section skipping, adapt the existing practice Section and its Text task, and add a Course-owned exhibitionNotes Section covering Text, Markdown, Code, Image, Video, YouTube, Audio, Subtitles, Scene, Carousel and Checkpoint with nested children. The canonical Lesson identity, Skills, Quiz requirement and banks remain unchanged. This fixture tests both existing-item and newly materialized nested override source without editing the standalone Lesson.',
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
                moduleReview: {
                  config: {
                    type: 'assessment',
                    locale: { title: 'Exhibition practice — module review' },
                  },
                  production: {
                    purpose:
                      'Evaluate the two previously practised light and shape Skills in a fresh context, using independently reviewed Lesson-owned Question Banks and a separately authorized Assessment Quiz.',
                    lessonDependencies: [
                      'content/exhibitionPractice/shadowPractice',
                      'content/exhibitionPractice/combinedObservations/combinedPractice',
                    ],
                  },
                },
              },
              order: ['practiceMission', 'shadowPractice', 'combinedObservations', 'moduleReview'],
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
        finalCourseReview: {
          config: {
            type: 'assessment',
            locale: { title: 'Light and shapes — final course review' },
          },
          production: {
            purpose:
              'Independently assess the two Course outcomes through a final cross-Lesson evaluation. Real Questions, Quiz and human review are deferred to the Assessment workflow; do not invent completed resources in Course Stage 5.',
            lessonDependencies: [
              'content/lightBasics',
              'content/familiarCircles/circleRecognition',
              'content/exhibitionPractice/combinedObservations/combinedPractice',
            ],
          },
        },
      },
      order: ['openingMission', 'lightBasics', 'familiarCircles', 'exhibitionPractice', 'finalCourseReview'],
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

