import type { LessonWorkflowStage2 } from '@svitlo/engine/build';

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
    params: { quizRequiredForCompletion: true, sections: { allowNavigation: true, allowSkipping: false, showIndexes: true } },
    section: {
      "items": {
        "meetColors": {
          "config": {
            "id": "6e7b8fc7-bb04-49bf-8a93-1718f5216672",
            "slug": "meetColors",
            "type": "content",
            "params": {},
            "locale": {
              "title": {
                "en": "Meet red and blue"
              },
              "navigationLabel": {
                "en": "Meet colors"
              }
            },
            "content": {
              "items": {
                "introduce": {
                  "config": {
                    "id": "11aec0cb-b6f8-480b-81d4-7c10ea88c857",
                    "slug": "introduce",
                    "type": "text",
                    "params": {
                      "variables": {
                        "redWord": {
                          "applyStyle": [
                            "bold"
                          ],
                          "tone": "neutral"
                        },
                        "blueWord": {
                          "applyStyle": [
                            "bold"
                          ],
                          "tone": "neutral"
                        }
                      }
                    },
                    "locale": {
                      "value": {
                        "en": "Look at the two circles in the picture. One is %_%id: redWord; value: red%_%. The other is %_%id: blueWord; value: blue%_%. Both are circles. Their colors are different."
                      }
                    }
                  }
                },
                "colorPair": {
                  "config": {
                    "id": "02def914-3c64-408c-ba0a-9d127ca9d51d",
                    "slug": "colorPair",
                    "type": "image",
                    "params": {
                      "width": 640,
                      "height": 400,
                      "objectFit": "contain"
                    },
                    "locale": {
                      "fileName": "00000000-0000-0000-0000-000000000000.webp",
                      "alt": {
                        "en": "Two circles of the same size: a red circle on the left and a blue circle on the right."
                      },
                      "caption": {
                        "en": "Red circle and blue circle: same shape, different colors."
                      },
                      "fallback": {
                        "offline": {
                          "en": "Imagine two equally sized circles, one red and one blue. They have the same shape but different colors."
                        },
                        "unavailable": {
                          "en": "The picture is unavailable. Read its description."
                        },
                        "retry": {
                          "en": "Try again"
                        }
                      }
                    }
                  },
                  "production": {
                    "purpose": "Compare color independently of shape.",
                    "specification": "Two equally sized circles side by side on a neutral light background: red on the left and blue on the right in this English illustration. No words in pixels. The placement is an example, not a rule for recognizing a color. If a localized layout changes the order, keep the spoken and written descriptions consistent with the illustration.",
                    "accessibility": "No embedded words; the adjacent caption and alt describe the objects and their colors. These labels teach vocabulary, not scored visual recognition.",
                    "offline": "Bundle a local WebP and retain the written description.",
                    "readiness": "production-pending",
                    "prompt": "Two equally sized circles, red on the left and blue on the right, on a neutral light background. No words in pixels."
                  }
                },
                "colorNames": {
                  "config": {
                    "id": "e1fa6127-8ef0-465a-9ec7-fe3c8c371fa4",
                    "slug": "colorNames",
                    "type": "audio",
                    "params": {},
                    "locale": {
                      "fileName": {
                        "en": "00000000-0000-0000-0000-000000000000.mp3"
                      },
                      "title": {
                        "en": "Listen to the color words"
                      },
                      "description": {
                        "en": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
                      },
                      "fallback": {
                        "offline": {
                          "en": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
                        },
                        "unavailable": {
                          "en": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
                        },
                        "playbackError": {
                          "en": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
                        },
                        "retry": {
                          "en": "Try again"
                        }
                      }
                    }
                  },
                  "production": {
                    "purpose": "Hear the color names.",
                    "specification": "Produce a clear spoken English recording of the script; no music or sound effects; short pause between examples. Keep the descriptions consistent with the actual image in each locale.",
                    "accessibility": "Provide the same script in adjacent text and audio description; user-controlled playback.",
                    "offline": "Bundle source-language MP3; text remains available.",
                    "readiness": "production-pending",
                    "script": "The picture shows a red circle on the left and a blue circle on the right. Both are circles. Red and blue are different color names."
                  }
                },
                "colorNamesSummary": {
                  "config": {
                    "id": "6dde817b-b8e7-465b-936a-9bb6439db130",
                    "slug": "colorNamesSummary",
                    "type": "markdown",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "**%_%RED_NAME%_%** and **%_%BLUE_NAME%_%** are color names.\n\n- Two circles can have different colors.\n- A circle and a square can have the same color.\n- A toy car can be red or blue. A cup can also be red or blue.\n\nWe have learned two color names: $1 + 1 = 2$. This counts the names; it does not mix the colors."
                      },
                      "variables": {
                        "RED_NAME": {
                          "en": "Red"
                        },
                        "BLUE_NAME": {
                          "en": "blue"
                        }
                      }
                    }
                  }
                },
                "shapeSymbols": {
                  "config": {
                    "id": "f19a39f9-f1b3-438d-bd02-d2eb021e49e6",
                    "slug": "shapeSymbols",
                    "type": "markdown",
                    "params": {},
                    "locale": {
                      "value": "●  ■  ●"
                    }
                  }
                },
                "symbolExplanation": {
                  "config": {
                    "id": "58d653e2-d0da-4b1d-8e2f-38cdff5a9d57",
                    "slug": "symbolExplanation",
                    "type": "text",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "The symbols above show circles and a square. Their outlines differ; the symbols alone do not tell you which color they represent."
                      }
                    }
                  }
                }
              },
              "order": [
                "introduce",
                "colorPair",
                "colorNames",
                "colorNamesSummary",
                "shapeSymbols",
                "symbolExplanation"
              ]
            }
          },
          "production": {
            "purpose": "Introduce both color words and distinguish shape from color."
          }
        },
        "watchCompare": {
          "config": {
            "id": "8a16a435-d6f2-4ed8-af43-aca56ca4b165",
            "slug": "watchCompare",
            "type": "learningFlow",
            "params": {},
            "locale": {
              "title": {
                "en": "Watch and compare"
              },
              "navigationLabel": {
                "en": "Compare"
              }
            },
            "content": {
              "items": {
                "videoIntro": {
                  "config": {
                    "id": "7c2ae19d-4f6e-4930-8015-02d017260277",
                    "slug": "videoIntro",
                    "type": "text",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "Watch a red circle become a red square, then a blue square become a blue circle. In each example, the shape changes but the color stays the same."
                      }
                    }
                  }
                },
                "shapeChange": {
                  "config": {
                    "id": "3425043b-47e9-4961-a869-4152fcee84a3",
                    "slug": "shapeChange",
                    "type": "video",
                    "params": {},
                    "locale": {
                      "fileName": "00000000-0000-0000-0000-000000000000.mp4",
                      "posterFileName": "00000000-0000-0000-0000-000000000000.webp",
                      "title": {
                        "en": "Compare red and blue"
                      },
                      "label": {
                        "en": "Short silent color comparison"
                      },
                      "fallback": {
                        "offline": {
                          "en": "A red circle becomes a red square. A blue square becomes a blue circle."
                        },
                        "unavailable": {
                          "en": "A red circle becomes a red square. A blue square becomes a blue circle."
                        },
                        "playbackError": {
                          "en": "A red circle becomes a red square. A blue square becomes a blue circle."
                        },
                        "retry": {
                          "en": "Try again"
                        }
                      }
                    }
                  },
                  "production": {
                    "purpose": "Observe color while shapes change.",
                    "specification": "Create a silent 6-second 640×400 local MP4 and matching WebP poster. First three seconds: red circle changes to red square. Last three seconds: blue square changes to blue circle.",
                    "accessibility": "No flashing or baked text; adjacent text describes all changes. Pause/play remains learner controlled.",
                    "offline": "Bundle video and poster; retain the textual description.",
                    "readiness": "production-pending",
                    "storyboard": "First three seconds: red circle changes to red square. Last three seconds: blue square changes to blue circle.",
                    "script": "A red circle becomes a red square. A blue square becomes a blue circle."
                  }
                },
                "shapeCaptions": {
                  "config": {
                    "id": "3a0286f4-e1a6-45be-ad91-ff6e85e8590e",
                    "slug": "shapeCaptions",
                    "type": "subtitles",
                    "params": {},
                    "locale": {
                      "fileName": {
                        "en": "00000000-0000-0000-0000-000000000000.vtt"
                      }
                    }
                  },
                  "production": {
                    "purpose": "Access the color comparison as timed text.",
                    "specification": "Produce UTF-8 WebVTT: 00:00:00.000 --> 00:00:03.000 first sentence; 00:00:03.000 --> 00:00:06.000 second sentence. A red circle becomes a red square. A blue square becomes a blue circle.",
                    "accessibility": "Standalone keyboard-accessible WebVTT link, not a synchronized track; adjacent text repeats the cues.",
                    "offline": "Bundle local VTT and equivalent text.",
                    "readiness": "production-pending",
                    "script": "A red circle becomes a red square. A blue square becomes a blue circle."
                  }
                },
                "colorGallery": {
                  "config": {
                    "id": "788c38e2-efb0-43eb-8234-8250a5047636",
                    "slug": "colorGallery",
                    "type": "carousel",
                    "params": {
                      "aspectRatio": 1.6,
                      "objectFit": "contain",
                      "loop": false,
                      "autoplay": false,
                      "showArrows": true,
                      "showIndicators": true,
                      "allowSwipe": true
                    },
                    "locale": {
                      "title": {
                        "en": "Same color, different shapes"
                      }
                    },
                    "slides": {
                      "items": {
                        "colorGalleryImage": {
                          "config": {
                            "id": "a5766cfd-6755-46aa-b316-6bb805932c6a",
                            "slug": "colorGalleryImage",
                            "type": "image",
                            "params": {
                              "fill": true,
                              "aspectRatio": 1.6,
                              "objectFit": "contain"
                            },
                            "locale": {
                              "fileName": "00000000-0000-0000-0000-000000000000.webp",
                              "alt": {
                                "en": "A blue circle and a blue square."
                              },
                              "caption": {
                                "en": "A blue circle and a blue square."
                              },
                              "fallback": {
                                "offline": {
                                  "en": "A blue circle and a blue square."
                                },
                                "unavailable": {
                                  "en": "The picture is unavailable. Read its description."
                                },
                                "retry": {
                                  "en": "Try again"
                                }
                              }
                            }
                          },
                          "production": {
                            "purpose": "Compare color independently of shape.",
                            "specification": "Two clearly blue shapes, a circle and a square, side by side.",
                            "accessibility": "No embedded words; the adjacent caption and alt describe the objects and their colors. These labels teach vocabulary, not scored visual recognition.",
                            "offline": "Bundle a local WebP and retain the written description.",
                            "readiness": "production-pending",
                            "prompt": "Two clearly blue shapes, a circle and a square, side by side."
                          }
                        },
                        "colorGalleryScene": {
                          "config": {
                            "id": "32d1b90b-8f0d-4b23-b49d-e1c1509b7c03",
                            "slug": "colorGalleryScene",
                            "type": "scene",
                            "params": {},
                            "locale": {
                              "value": {
                                "heading": {
                                  "en": "Explore two colors"
                                },
                                "red": {
                                  "en": "Red"
                                },
                                "blue": {
                                  "en": "Blue"
                                },
                                "choose": {
                                  "en": "Choose a color"
                                },
                                "reset": {
                                  "en": "Reset"
                                },
                                "shape": {
                                  "en": "Change shape"
                                },
                                "status": {
                                  "redCircle": {
                                    "en": "The sample is a red circle."
                                  },
                                  "redSquare": {
                                    "en": "The sample is a red square."
                                  },
                                  "blueCircle": {
                                    "en": "The sample is a blue circle."
                                  },
                                  "blueSquare": {
                                    "en": "The sample is a blue square."
                                  }
                                },
                                "sampleLabel": {
                                  "en": "Color sample"
                                }
                              }
                            }
                          },
                          "production": {
                            "purpose": "Explore how color and shape vary independently.",
                            "specification": "Render one large sample, initially a blue circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial blue circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer.",
                            "accessibility": "Use labeled native buttons, visible focus and keyboard activation. Present the localized current color and shape as visible text and a polite accessible status update. Do not communicate changes through color alone. Nonvisual vocabulary exploration is not scored as visual recognition.",
                            "offline": "Bundle the registered Scene locally; provide the same two color/shape examples in text and avoid expensive graphics.",
                            "readiness": "production-pending",
                            "weakDeviceAlternative": "Static swatch plus text labels and native controls."
                          }
                        }
                      },
                      "order": [
                        "colorGalleryImage",
                        "colorGalleryScene"
                      ]
                    }
                  },
                  "production": {
                    "purpose": "Compare two representations; navigate at the learner's own pace."
                  }
                },
                "extraVideoIntro": {
                  "config": {
                    "id": "8157504e-1d95-4e7b-915d-320b61e7d07a",
                    "slug": "extraVideoIntro",
                    "type": "text",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "Optional: look for examples of red and blue in the following video. You may see yellow, too; this lesson focuses only on red and blue. You can skip the video and continue with the examples here."
                      }
                    }
                  }
                },
                "externalEmbed": {
                  "config": {
                    "id": "90115025-1794-47da-b101-cde8d5e8e397",
                    "slug": "externalEmbed",
                    "type": "youtube",
                    "params": {
                      "mode": "embed"
                    },
                    "locale": {
                      "href": "https://www.youtube.com/watch?v=1qtPcVpkaKU",
                      "title": {
                        "en": "More color examples"
                      },
                      "label": {
                        "en": "Red, Blue, and Yellow — Khan Academy Kids"
                      },
                      "fallback": {
                        "offline": {
                          "en": "Use the local examples: a red circle and a blue square. Objects may have the same color even when their shapes differ."
                        },
                        "unavailable": {
                          "en": "The optional video is unavailable. Continue with the local examples."
                        },
                        "retry": {
                          "en": "Try again"
                        }
                      }
                    }
                  },
                  "production": {
                    "purpose": "Optional extension: recognize red and blue on familiar objects.",
                    "specification": "External publisher: Khan Academy Kids, Red, Blue, and Yellow (July 10, 2023). Public listing and description identify red, blue and yellow, including a cherry example. Full playback, captions, embedding permission and regional availability remain to be verified during resource production. Yellow is incidental to this Lesson and is not an assessed target. Do not copy the video into assets.",
                    "accessibility": "Do not require watching the video to progress; use the equivalent local color examples.",
                    "offline": "Skip the external video and use the local explanation; no network dependency for essential learning.",
                    "readiness": "production-pending"
                  }
                }
              },
              "order": [
                "videoIntro",
                "shapeChange",
                "shapeCaptions",
                "colorGallery",
                "extraVideoIntro",
                "externalEmbed"
              ]
            }
          },
          "production": {
            "purpose": "Compare varied examples; all essential content available without external video."
          }
        },
        "exploreColors": {
          "config": {
            "id": "c50239cb-4f55-4661-b035-706c0fa0eef5",
            "slug": "exploreColors",
            "type": "practice",
            "params": {},
            "locale": {
              "title": {
                "en": "Try changing colors"
              },
              "navigationLabel": {
                "en": "Practice"
              }
            },
            "content": {
              "items": {
                "explorePrompt": {
                  "config": {
                    "id": "ac24a784-4036-4596-8bc3-f019bf40f754",
                    "slug": "explorePrompt",
                    "type": "text",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "Choose Red or Blue. Say the color name. Then change the shape: does the color stay the same? Change the color next: does the shape stay the same?"
                      }
                    }
                  }
                },
                "colorExplorer": {
                  "config": {
                    "id": "71b307a9-2ba4-48af-b5f9-32aa82bca58d",
                    "slug": "colorExplorer",
                    "type": "scene",
                    "params": {},
                    "locale": {
                      "value": {
                        "heading": {
                          "en": "Explore two colors"
                        },
                        "red": {
                          "en": "Red"
                        },
                        "blue": {
                          "en": "Blue"
                        },
                        "choose": {
                          "en": "Choose a color"
                        },
                        "reset": {
                          "en": "Reset"
                        },
                        "shape": {
                          "en": "Change shape"
                        },
                        "status": {
                          "redCircle": {
                            "en": "The sample is a red circle."
                          },
                          "redSquare": {
                            "en": "The sample is a red square."
                          },
                          "blueCircle": {
                            "en": "The sample is a blue circle."
                          },
                          "blueSquare": {
                            "en": "The sample is a blue square."
                          }
                        },
                        "sampleLabel": {
                          "en": "Color sample"
                        }
                      }
                    }
                  },
                  "production": {
                    "purpose": "Explore how color and shape vary independently.",
                    "specification": "Render one large sample, initially a blue circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial blue circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer.",
                    "accessibility": "Use labeled native buttons, visible focus and keyboard activation. Present the localized current color and shape as visible text and a polite accessible status update. Do not communicate changes through color alone. Nonvisual vocabulary exploration is not scored as visual recognition.",
                    "offline": "Bundle the registered Scene locally; provide the same two color/shape examples in text and avoid expensive graphics.",
                    "readiness": "production-pending",
                    "weakDeviceAlternative": "Static swatch plus text labels and native controls."
                  }
                },
                "reflectOnColors": {
                  "config": {
                    "id": "f6d544da-bc5e-43c6-b79f-40f1cc438750",
                    "slug": "reflectOnColors",
                    "type": "checkpoint",
                    "params": {
                      "headingLevel": 3,
                      "showIndices": true,
                      "showChevron": true,
                      "enableChecks": true,
                      "requireCompletion": true,
                      "renderAsGroup": true
                    },
                    "locale": {
                      "title": {
                        "en": "Think and reveal"
                      }
                    },
                    "content": {
                      "items": {
                        "compareShapes": {
                          "config": {
                            "id": "54d3b6e2-725f-4dcd-842e-b0b379ab4ace",
                            "slug": "compareShapes",
                            "type": "checkpointItem",
                            "check": true,
                            "question": {
                              "config": {
                                "id": "2135bf30-5586-4e4a-b4d8-508ba9697ecd",
                                "slug": "comparePrompt",
                                "type": "text",
                                "params": {},
                                "locale": {
                                  "value": {
                                    "en": "Can two shapes be the same color even if their outlines differ? Think first, then reveal the explanation."
                                  }
                                }
                              }
                            },
                            "answer": {
                              "config": {
                                "id": "f8c679c3-7351-4954-aad6-1c445b6ef934",
                                "slug": "compareAnswer",
                                "type": "checkpointAnswer",
                                "content": {
                                  "items": {
                                    "answerWords": {
                                      "config": {
                                        "id": "989a8c03-6ba9-4b5e-8784-1334aca6ffd7",
                                        "slug": "answerWords",
                                        "type": "text",
                                        "params": {},
                                        "locale": {
                                          "value": {
                                            "en": "Yes. A red circle and a red square have the same color, even though their outlines differ. A blue circle and a blue square can also have the same color. Look at color, not just shape. The following examples let you explore this idea in pictures, words, sounds and a simple activity. Take them at your own pace. The local video changes a red circle into a red square and a blue square into a blue circle; in each case the color stays the same."
                                          }
                                        }
                                      }
                                    },
                                    "answerSummary": {
                                      "config": {
                                        "id": "fda1cca5-fab9-4216-b5a2-19a78806b09e",
                                        "slug": "answerSummary",
                                        "type": "markdown",
                                        "params": {},
                                        "locale": {
                                          "value": {
                                            "en": "**%_%FIRST_COLOR%_%** and **%_%SECOND_COLOR%_%** are color names. Two squares can be different colors. Two different shapes can share a color. Shape alone cannot tell you the color."
                                          },
                                          "variables": {
                                            "FIRST_COLOR": {
                                              "en": "Red"
                                            },
                                            "SECOND_COLOR": {
                                              "en": "blue"
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "answerCode": {
                                      "config": {
                                        "id": "e6566d06-1284-4cbe-a87f-ca178b05fe26",
                                        "slug": "answerCode",
                                        "type": "code",
                                        "params": {
                                          "language": "javascript",
                                          "codeAsText": "const samples = [\"red\", \"blue\", \"red\"];"
                                        },
                                        "locale": {
                                          "title": {
                                            "en": "Three examples, two distinct color names"
                                          }
                                        }
                                      }
                                    },
                                    "answerPicture": {
                                      "config": {
                                        "id": "63c46493-0048-4e01-8040-1fe14eac4a0f",
                                        "slug": "answerPicture",
                                        "type": "image",
                                        "params": {
                                          "width": 640,
                                          "height": 400,
                                          "objectFit": "contain"
                                        },
                                        "locale": {
                                          "fileName": "00000000-0000-0000-0000-000000000000.webp",
                                          "alt": {
                                            "en": "A blue square on the left and a red square on the right."
                                          },
                                          "caption": {
                                            "en": "Same shape, different colors; the colors have changed places."
                                          },
                                          "fallback": {
                                            "offline": {
                                              "en": "A blue square and a red square have the same shape, although they have different colors."
                                            },
                                            "unavailable": {
                                              "en": "The picture is unavailable. Read its description."
                                            },
                                            "retry": {
                                              "en": "Try again"
                                            }
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Compare color independently of shape.",
                                        "specification": "Two equally sized squares on a neutral background, blue on the left and red on the right in the English illustration. Reverse the order used in the opening picture to show that placement does not define color.",
                                        "accessibility": "No embedded words; the adjacent caption and alt describe the objects and their colors. These labels teach vocabulary, not scored visual recognition.",
                                        "offline": "Bundle a local WebP and retain the written description.",
                                        "readiness": "production-pending",
                                        "prompt": "Two same-sized squares side by side, blue on the left and red on the right, on a neutral background."
                                      }
                                    },
                                    "answerAudio": {
                                      "config": {
                                        "id": "36faebf6-d88a-4af9-acc0-fc02059e0747",
                                        "slug": "answerAudio",
                                        "type": "audio",
                                        "params": {},
                                        "locale": {
                                          "fileName": {
                                            "en": "00000000-0000-0000-0000-000000000000.mp3"
                                          },
                                          "title": {
                                            "en": "Listen to the color words"
                                          },
                                          "description": {
                                            "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. A red square and a blue square have different colors."
                                          },
                                          "fallback": {
                                            "offline": {
                                              "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. A red square and a blue square have different colors."
                                            },
                                            "unavailable": {
                                              "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. A red square and a blue square have different colors."
                                            },
                                            "playbackError": {
                                              "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. A red square and a blue square have different colors."
                                            },
                                            "retry": {
                                              "en": "Try again"
                                            }
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Hear the color names.",
                                        "specification": "Produce a clear spoken English recording of the script; no music, no sound effects; short pause between examples.",
                                        "accessibility": "Provide the same script in adjacent text and audio description; user-controlled playback.",
                                        "offline": "Bundle source-language MP3; text remains available.",
                                        "readiness": "production-pending",
                                        "script": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. A red square and a blue square have different colors."
                                      }
                                    },
                                    "answerVideo": {
                                      "config": {
                                        "id": "7446f1f1-6766-4f69-890a-94983db5a537",
                                        "slug": "answerVideo",
                                        "type": "video",
                                        "params": {},
                                        "locale": {
                                          "fileName": "00000000-0000-0000-0000-000000000000.mp4",
                                          "posterFileName": "00000000-0000-0000-0000-000000000000.webp",
                                          "title": {
                                            "en": "Compare red and blue"
                                          },
                                          "label": {
                                            "en": "Short silent color comparison"
                                          },
                                          "fallback": {
                                            "offline": {
                                              "en": "A red circle becomes a red square. A blue square becomes a blue circle."
                                            },
                                            "unavailable": {
                                              "en": "A red circle becomes a red square. A blue square becomes a blue circle."
                                            },
                                            "playbackError": {
                                              "en": "A red circle becomes a red square. A blue square becomes a blue circle."
                                            },
                                            "retry": {
                                              "en": "Try again"
                                            }
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Observe color while shapes change.",
                                        "specification": "Create a silent 6-second 640×400 local MP4 and matching WebP poster. First three seconds: red circle changes to red square. Last three seconds: blue square changes to blue circle.",
                                        "accessibility": "No flashing or baked text; adjacent text describes all changes. Pause/play remains learner controlled.",
                                        "offline": "Bundle video and poster; retain the textual description.",
                                        "readiness": "production-pending",
                                        "storyboard": "First three seconds: red circle changes to red square. Last three seconds: blue square changes to blue circle.",
                                        "script": "A red circle becomes a red square. A blue square becomes a blue circle."
                                      }
                                    },
                                    "answerExternal": {
                                      "config": {
                                        "id": "f97d713e-65eb-4a3f-b6a4-eb35259e200e",
                                        "slug": "answerExternal",
                                        "type": "youtube",
                                        "params": {
                                          "mode": "link"
                                        },
                                        "locale": {
                                          "href": "https://www.youtube.com/watch?v=1qtPcVpkaKU",
                                          "title": {
                                            "en": "More color examples"
                                          },
                                          "label": {
                                            "en": "Red, Blue, and Yellow — Khan Academy Kids"
                                          },
                                          "fallback": {
                                            "offline": {
                                              "en": "Use the local examples: a red circle and a blue square. Objects may have the same color even when their shapes differ."
                                            },
                                            "unavailable": {
                                              "en": "The optional video is unavailable. Continue with the local examples."
                                            },
                                            "retry": {
                                              "en": "Try again"
                                            }
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Optional extension: recognize red and blue on familiar objects.",
                                        "specification": "External publisher: Khan Academy Kids, Red, Blue, and Yellow (July 10, 2023). Public listing and description identify red, blue and yellow, including a cherry example. Full playback, captions, embedding permission and regional availability remain to be verified during resource production. Yellow is incidental to this Lesson and is not an assessed target. Do not copy the video into assets.",
                                        "accessibility": "Do not require watching the video to progress; use the equivalent local color examples.",
                                        "offline": "Skip the external video and use the local explanation; no network dependency for essential learning.",
                                        "readiness": "production-pending"
                                      }
                                    },
                                    "answerCaptions": {
                                      "config": {
                                        "id": "63a311a2-de5d-4cf1-bdda-37c3fcd992c3",
                                        "slug": "answerCaptions",
                                        "type": "subtitles",
                                        "params": {},
                                        "locale": {
                                          "fileName": {
                                            "en": "00000000-0000-0000-0000-000000000000.vtt"
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Access the color comparison as timed text.",
                                        "specification": "Produce UTF-8 WebVTT: 00:00:00.000 --> 00:00:03.000 first sentence; 00:00:03.000 --> 00:00:06.000 second sentence. A red circle becomes a red square. A blue square becomes a blue circle.",
                                        "accessibility": "Standalone keyboard-accessible WebVTT link, not a synchronized track; adjacent text repeats the cues.",
                                        "offline": "Bundle local VTT and equivalent text.",
                                        "readiness": "production-pending",
                                        "script": "A red circle becomes a red square. A blue square becomes a blue circle."
                                      }
                                    },
                                    "answerExplore": {
                                      "config": {
                                        "id": "4a773a25-f569-4429-9fd7-0e2ac6441db4",
                                        "slug": "answerExplore",
                                        "type": "scene",
                                        "params": {},
                                        "locale": {
                                          "value": {
                                            "heading": {
                                              "en": "Explore two colors"
                                            },
                                            "red": {
                                              "en": "Red"
                                            },
                                            "blue": {
                                              "en": "Blue"
                                            },
                                            "choose": {
                                              "en": "Choose a color"
                                            },
                                            "reset": {
                                              "en": "Reset"
                                            },
                                            "shape": {
                                              "en": "Change shape"
                                            },
                                            "status": {
                                              "redCircle": {
                                                "en": "The sample is a red circle."
                                              },
                                              "redSquare": {
                                                "en": "The sample is a red square."
                                              },
                                              "blueCircle": {
                                                "en": "The sample is a blue circle."
                                              },
                                              "blueSquare": {
                                                "en": "The sample is a blue square."
                                              }
                                            },
                                            "sampleLabel": {
                                              "en": "Color sample"
                                            }
                                          }
                                        }
                                      },
                                      "production": {
                                        "purpose": "Explore how color and shape vary independently.",
                                        "specification": "Render one large sample, initially a red circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial red circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer.",
                                        "accessibility": "Use labeled native buttons, visible focus and keyboard activation. Present the localized current color and shape as visible text and a polite accessible status update. Do not communicate changes through color alone. Nonvisual vocabulary exploration is not scored as visual recognition.",
                                        "offline": "Bundle the registered Scene locally; provide the same two color/shape examples in text and avoid expensive graphics.",
                                        "readiness": "production-pending",
                                        "weakDeviceAlternative": "Static swatch plus text labels and native controls."
                                      }
                                    },
                                    "answerGallery": {
                                      "config": {
                                        "id": "9bbb3def-8ca2-4860-a2cd-2961f32e991c",
                                        "slug": "answerGallery",
                                        "type": "carousel",
                                        "params": {
                                          "aspectRatio": 1.6,
                                          "objectFit": "contain",
                                          "loop": false,
                                          "autoplay": false,
                                          "showArrows": true,
                                          "showIndicators": true,
                                          "allowSwipe": true
                                        },
                                        "locale": {
                                          "title": {
                                            "en": "Same color, different shapes"
                                          }
                                        },
                                        "slides": {
                                          "items": {
                                            "answerGalleryImage": {
                                              "config": {
                                                "id": "e3a10c4b-2325-41c0-b0b6-5dc4a4eb4e26",
                                                "slug": "answerGalleryImage",
                                                "type": "image",
                                                "params": {
                                                  "fill": true,
                                                  "aspectRatio": 1.6,
                                                  "objectFit": "contain"
                                                },
                                                "locale": {
                                                  "fileName": "00000000-0000-0000-0000-000000000000.webp",
                                                  "alt": {
                                                    "en": "A red circle beside a red square."
                                                  },
                                                  "caption": {
                                                    "en": "A red circle beside a red square."
                                                  },
                                                  "fallback": {
                                                    "offline": {
                                                      "en": "A red circle beside a red square."
                                                    },
                                                    "unavailable": {
                                                      "en": "The picture is unavailable. Read its description."
                                                    },
                                                    "retry": {
                                                      "en": "Try again"
                                                    }
                                                  }
                                                }
                                              },
                                              "production": {
                                                "purpose": "Compare color independently of shape.",
                                                "specification": "Show a red circle and a red square of equal visual weight on a neutral background.",
                                                "accessibility": "No embedded words; the adjacent caption and alt describe the objects and their colors. These labels teach vocabulary, not scored visual recognition.",
                                                "offline": "Bundle a local WebP and retain the written description.",
                                                "readiness": "production-pending",
                                                "prompt": "Show a red circle and a red square of equal visual weight on a neutral background."
                                              }
                                            },
                                            "answerGalleryScene": {
                                              "config": {
                                                "id": "2e95db16-2461-4de2-b97d-feecbfac1166",
                                                "slug": "answerGalleryScene",
                                                "type": "scene",
                                                "params": {},
                                                "locale": {
                                                  "value": {
                                                    "heading": {
                                                      "en": "Explore two colors"
                                                    },
                                                    "red": {
                                                      "en": "Red"
                                                    },
                                                    "blue": {
                                                      "en": "Blue"
                                                    },
                                                    "choose": {
                                                      "en": "Choose a color"
                                                    },
                                                    "reset": {
                                                      "en": "Reset"
                                                    },
                                                    "shape": {
                                                      "en": "Change shape"
                                                    },
                                                    "status": {
                                                      "redCircle": {
                                                        "en": "The sample is a red circle."
                                                      },
                                                      "redSquare": {
                                                        "en": "The sample is a red square."
                                                      },
                                                      "blueCircle": {
                                                        "en": "The sample is a blue circle."
                                                      },
                                                      "blueSquare": {
                                                        "en": "The sample is a blue square."
                                                      }
                                                    },
                                                    "sampleLabel": {
                                                      "en": "Color sample"
                                                    }
                                                  }
                                                }
                                              },
                                              "production": {
                                                "purpose": "Explore how color and shape vary independently.",
                                                "specification": "Render one large sample, initially a red circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial red circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer.",
                                                "accessibility": "Use labeled native buttons, visible focus and keyboard activation. Present the localized current color and shape as visible text and a polite accessible status update. Do not communicate changes through color alone. Nonvisual vocabulary exploration is not scored as visual recognition.",
                                                "offline": "Bundle the registered Scene locally; provide the same two color/shape examples in text and avoid expensive graphics.",
                                                "readiness": "production-pending",
                                                "weakDeviceAlternative": "Static swatch plus text labels and native controls."
                                              }
                                            }
                                          },
                                          "order": [
                                            "answerGalleryImage",
                                            "answerGalleryScene"
                                          ]
                                        }
                                      },
                                      "production": {
                                        "purpose": "Compare two representations; navigate at the learner's own pace."
                                      }
                                    }
                                  },
                                  "order": [
                                    "answerWords",
                                    "answerSummary",
                                    "answerCode",
                                    "answerPicture",
                                    "answerAudio",
                                    "answerVideo",
                                    "answerExternal",
                                    "answerCaptions",
                                    "answerExplore",
                                    "answerGallery"
                                  ]
                                }
                              },
                              "production": {
                                "purpose": "Reveal a compact collection of alternative explanations; each child exercises a legal recursive generator path."
                              }
                            }
                          },
                          "production": {
                            "purpose": "Formative reflection with reveal, not scored assessment."
                          }
                        },
                        "changeColor": {
                          "config": {
                            "id": "9c851290-3833-4a98-bff6-13f8f9f30c3c",
                            "slug": "changeColor",
                            "type": "checkpointItem",
                            "check": true,
                            "question": {
                              "config": {
                                "id": "d302ea57-8858-46e5-a286-170cf7495529",
                                "slug": "changePrompt",
                                "type": "text",
                                "params": {},
                                "locale": {
                                  "value": {
                                    "en": "Imagine a red circle that becomes blue but stays a circle. What changed? Think first, then reveal the explanation."
                                  }
                                }
                              }
                            },
                            "answer": {
                              "config": {
                                "id": "bca3cae3-886b-4bb5-b01a-f976ec42ffd8",
                                "slug": "changeAnswer",
                                "type": "checkpointAnswer",
                                "content": {
                                  "items": {
                                    "changeExplanation": {
                                      "config": {
                                        "id": "1a093072-bf2f-48ec-aee6-f671f1355ad9",
                                        "slug": "changeExplanation",
                                        "type": "text",
                                        "params": {},
                                        "locale": {
                                          "value": {
                                            "en": "The color changed from red to blue. The shape did not change: it is still a circle. Now imagine changing the circle into a square without changing the blue color."
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "order": [
                                    "changeExplanation"
                                  ]
                                }
                              }
                            }
                          }
                        }
                      },
                      "order": [
                        "compareShapes",
                        "changeColor"
                      ]
                    }
                  },
                  "production": {
                    "purpose": "Learner-controlled reflection and check completion, not a mastery score."
                  }
                }
              },
              "order": [
                "explorePrompt",
                "colorExplorer",
                "reflectOnColors"
              ]
            }
          },
          "production": {
            "purpose": "Guided exploration and formative reflection without graded evidence."
          }
        },
        "colorCode": {
          "config": {
            "id": "acd43a98-4bc2-415f-b4e5-9cd6011dff04",
            "slug": "colorCode",
            "type": "codingTask",
            "params": {
              "skippable": true
            },
            "locale": {
              "title": {
                "en": "Color words in code"
              },
              "navigationLabel": {
                "en": "Code"
              }
            },
            "content": {
              "items": {
                "codeIntro": {
                  "config": {
                    "id": "ef7235ac-59b0-4b57-9c24-64f5694859c1",
                    "slug": "codeIntro",
                    "type": "text",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "A computer can store a color name as a word. The following is a static example, not a programming task. Read the two color words in quotation marks."
                      }
                    }
                  }
                },
                "colorNameCode": {
                  "config": {
                    "id": "fb339121-bc3b-43ea-8fb8-0ce01a7e2f82",
                    "slug": "colorNameCode",
                    "type": "code",
                    "params": {
                      "language": "javascript",
                      "codeAsText": "// %_%COLOR_LABEL%_%\nconst color = \"red\";\nconst other = \"blue\";"
                    },
                    "locale": {
                      "title": {
                        "en": "Color names as words"
                      },
                      "variables": {
                        "COLOR_LABEL": {
                          "en": "A red example and a blue example"
                        }
                      }
                    }
                  }
                },
                "codeReflection": {
                  "config": {
                    "id": "939e00d3-7e6e-4bc4-ab60-dbfe323704d7",
                    "slug": "codeReflection",
                    "type": "text",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "The words in quotation marks are different. They name two colors; the code does not define exactly how either color looks."
                      }
                    }
                  }
                }
              },
              "order": [
                "codeIntro",
                "colorNameCode",
                "codeReflection"
              ]
            }
          },
          "production": {
            "purpose": "Optional technical representation of the two known color names; no coding prerequisite."
          }
        },
        "recallColors": {
          "config": {
            "id": "fdbcf911-4b36-4f11-802e-1a00d6efa7bb",
            "slug": "recallColors",
            "type": "flashcards",
            "params": {},
            "locale": {
              "title": {
                "en": "Remember the color names"
              },
              "navigationLabel": {
                "en": "Flashcards"
              }
            },
            "content": {
              "items": {
                "recallPrompt": {
                  "config": {
                    "id": "d4bc8e45-68f0-4205-8481-670ba73a1304",
                    "slug": "recallPrompt",
                    "type": "text",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "Try to remember each color name before revealing the answer on its card. Check your recall and practice again when you need to."
                      }
                    }
                  }
                }
              },
              "order": [
                "recallPrompt"
              ]
            }
          },
          "production": {
            "purpose": "Required independent Flashcard Bank selection will be integrated in Stage 8."
          }
        },
        "checkColors": {
          "config": {
            "id": "2a46ac8b-d81a-45fe-8042-771c7a61344c",
            "slug": "checkColors",
            "type": "quiz",
            "params": {},
            "locale": {
              "title": {
                "en": "Check your understanding"
              },
              "navigationLabel": {
                "en": "Quiz"
              }
            },
            "content": {
              "items": {
                "quizPrompt": {
                  "config": {
                    "id": "c0ff1ae7-54db-4ee1-bc8f-28076b313a9f",
                    "slug": "quizPrompt",
                    "type": "text",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "Look at each example carefully. Decide on its color rather than relying on its shape or position. Take your time and try to answer independently."
                      }
                    }
                  }
                }
              },
              "order": [
                "quizPrompt"
              ]
            }
          },
          "production": {
            "purpose": "Required independent Question Bank selection and assessment settings will be integrated in Stage 7; no invented Question IDs or grading."
          }
        }
      },
      "order": [
        "meetColors",
        "watchCompare",
        "exploreColors",
        "colorCode",
        "recallColors",
        "checkColors"
      ]
    },
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
} satisfies LessonWorkflowStage2;
