// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: d552c695dfb4a8ef0b98d56390c434b5224c76bb762c464ccaa8655f8bcd0472
import { defineContentSection, defineLesson, defineMarkdown, defineScene, defineText } from '@svitlo/engine/build';

export const equalsMeansSameValue_Lesson = defineLesson({
  "id": "92177be3-97a1-5ca4-b21a-07f0dac27f50",
  "slug": "equalsMeansSameValue",
  "type": "lesson",
  "skills": [
    "974af868-5b72-4a5a-a88e-8f7e03e48661"
  ],
  "params": {
    "requireQuiz": false,
    "languages": [
      "en",
      "pl",
      "uk",
      "qm"
    ],
    "sections": {
      "allowNavigation": true,
      "allowSkipping": true,
      "showIndexes": true
    }
  },
  "locale": {
    "title": {
      "en": "The Equals Sign Means Same Value"
    }
  },
  "section": {
    "items": {
      "section1PredictWhetherTwoAmountsMatch": defineContentSection({
        "id": "708bc8c7-044c-4eba-8c99-7bdb285e9da6",
        "slug": "section1PredictWhetherTwoAmountsMatch",
        "type": "content",
        "params": {},
        "locale": {
          "title": {
            "en": "Predict whether two amounts match"
          },
          "navigationLabel": {
            "en": "Predict whether two amounts match"
          }
        },
        "content": {
          "items": {
            "section1Text1": defineText({
              "id": "b32df671-84cb-4c85-8139-8bb716dfc143",
              "slug": "section1Text1",
              "type": "text",
              "params": {},
              "locale": {
                "value": {
                  "en": "On the first tray, three red counters and two blue counters. On the second, five plain counters. Are the amounts the same?"
                }
              }
            }),
            "section1Scene2": defineScene({
              "id": "860bbab1-0e09-46d3-876d-5a20df6fd642",
              "slug": "section1Scene2",
              "type": "scene",
              "params": {},
              "locale": {
                "value": {
                  "en": {
                    "instruction": "On the first tray, three red counters and two blue counters. On the second, five plain counters. Are the amounts the same?"
                  }
                }
              }
            }),
            "section1Text3": defineText({
              "id": "8b436724-2a86-479e-856f-f96094aa39da",
              "slug": "section1Text3",
              "type": "text",
              "params": {},
              "locale": {
                "value": {
                  "en": "Both show five. The symbol = means both sides have the same value."
                }
              }
            })
          },
          "order": [
            "section1Text1",
            "section1Scene2",
            "section1Text3"
          ]
        }
      }),
      "section2EqualityDoesNotJustAnnounceTheAnswer": defineContentSection({
        "id": "7d878524-7eea-41af-853d-c4ad86502026",
        "slug": "section2EqualityDoesNotJustAnnounceTheAnswer",
        "type": "content",
        "params": {},
        "locale": {
          "title": {
            "en": "Equality does not just announce the answer"
          },
          "navigationLabel": {
            "en": "Equality does not just announce the answer"
          }
        },
        "content": {
          "items": {
            "section2Markdown1": defineMarkdown({
              "id": "31d32f0c-d332-4ed8-8be7-d4a59906e571",
              "slug": "section2Markdown1",
              "type": "markdown",
              "params": {},
              "locale": {
                "value": {
                  "en": "3 + 2 = 4 + 1 is true: five on each side. 5 = 2 + 3 is also true: the answer need not be on the right."
                }
              }
            }),
            "section2Scene2": defineScene({
              "id": "7f4e090a-3ab2-48c8-8e2b-b0334bd731f1",
              "slug": "section2Scene2",
              "type": "scene",
              "params": {},
              "locale": {
                "value": {
                  "en": {
                    "instruction": "3 + 2 = 4 + 1 is true: five on each side. 5 = 2 + 3 is also true: the answer need not be on the right."
                  }
                }
              }
            }),
            "section2Text3": defineText({
              "id": "7f87f229-29d2-4d05-8bbc-3ee2bde901ce",
              "slug": "section2Text3",
              "type": "text",
              "params": {},
              "locale": {
                "value": {
                  "en": "What does the sign say?"
                }
              }
            })
          },
          "order": [
            "section2Markdown1",
            "section2Scene2",
            "section2Text3"
          ]
        }
      }),
      "section3RepairAFalseEquality": defineContentSection({
        "id": "8df044b7-521a-4977-88bd-3599a7573859",
        "slug": "section3RepairAFalseEquality",
        "type": "content",
        "params": {},
        "locale": {
          "title": {
            "en": "Repair a false equality"
          },
          "navigationLabel": {
            "en": "Repair a false equality"
          }
        },
        "content": {
          "items": {
            "section3Markdown1": defineMarkdown({
              "id": "58d47fda-23ac-4786-8e3e-24dbd5460c87",
              "slug": "section3Markdown1",
              "type": "markdown",
              "params": {},
              "locale": {
                "value": {
                  "en": "4 + 2 = 4 + 3 is not true: six is not seven."
                }
              }
            }),
            "section3Scene2": defineScene({
              "id": "b9acf9ed-d7d1-4682-85b7-ea235bcae54c",
              "slug": "section3Scene2",
              "type": "scene",
              "params": {},
              "locale": {
                "value": {
                  "en": {
                    "instruction": "4 + 2 = 4 + 3 is not true: six is not seven."
                  }
                }
              }
            }),
            "section3Text3": defineText({
              "id": "cf861e80-9cc0-4203-8cce-af6b2f8803e8",
              "slug": "section3Text3",
              "type": "text",
              "params": {},
              "locale": {
                "value": {
                  "en": "We changed an amount. The equality is true only after both values match."
                }
              }
            })
          },
          "order": [
            "section3Markdown1",
            "section3Scene2",
            "section3Text3"
          ]
        }
      }),
      "section4IndependentTransfer": defineContentSection({
        "id": "2f4afed8-5ba5-42fb-8ee6-9465aa098846",
        "slug": "section4IndependentTransfer",
        "type": "content",
        "params": {},
        "locale": {
          "title": {
            "en": "Independent transfer"
          },
          "navigationLabel": {
            "en": "Independent transfer"
          }
        },
        "content": {
          "items": {
            "section4Text1": defineText({
              "id": "00162145-5c3c-42b1-8d10-dbb6713aa842",
              "slug": "section4Text1",
              "type": "text",
              "params": {},
              "locale": {
                "value": {
                  "en": "Someone says 6 = 1 + 5 is wrong because the answer is on the left. Do you agree? Explain, or choose ‘six on each side’ or ‘the sign needs an answer on the right’."
                }
              }
            }),
            "section4Text2": defineText({
              "id": "1fcd6fe8-28b3-4e50-8fd4-374fc8aa36f7",
              "slug": "section4Text2",
              "type": "text",
              "params": {},
              "locale": {
                "value": {
                  "en": "Six on the left, six on the right. It is true."
                }
              }
            }),
            "section4Markdown3": defineMarkdown({
              "id": "83f7c8f0-c532-4b30-8834-2ce5eef1cf25",
              "slug": "section4Markdown3",
              "type": "markdown",
              "params": {},
              "locale": {
                "value": {
                  "en": "Remember: **= means the values on both sides match.**"
                }
              }
            })
          },
          "order": [
            "section4Text1",
            "section4Text2",
            "section4Markdown3"
          ]
        }
      })
    },
    "order": [
      "section1PredictWhetherTwoAmountsMatch",
      "section2EqualityDoesNotJustAnnounceTheAnswer",
      "section3RepairAFalseEquality",
      "section4IndependentTransfer"
    ]
  },
  "flashcards": {
    "items": {},
    "order": []
  }
});
