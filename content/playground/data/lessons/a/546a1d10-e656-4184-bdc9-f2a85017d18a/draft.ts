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
                        "en": "Look at the two circles in the picture, or read their description. One is %_%id: redWord; value: red%_%. The other is %_%id: blueWord; value: blue%_%. Both are circles, but their colors are different."
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
                    "accessibility": "Audio is optional and starts only on learner action. The complete spoken script is visible in the Audio description (figcaption); no listening or speaking is required. Keep player controls and text readable at narrow widths.",
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
                        "en": "**%_%RED_NAME%_%** and **%_%BLUE_NAME%_%** are color names.\n\n- Two circles can have different colors.\n- A circle and a square can have the same color.\n- A toy car can be red or blue. A cup can also be red or blue.\n\nA color may look a little different on another screen. Focus on clearly red and clearly blue examples.\n\nThere are two color names here. $1 + 1 = 2$ is another way to count the names; you do not need to calculate anything or mix the colors."
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
                        "en": "Predict what will stay the same when a red circle becomes a red square. The silent video shows this change, then a blue square becoming a blue circle. In both examples the shape changes, but the color stays the same. You can use this description instead of playing the video. The separate timed-text link describes the changes; it is not a caption switch in the player."
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
                    "specification": "Create a silent, learner-controlled 6-second 640×400 local MP4 and matching WebP poster showing the starting red circle. 0–3 seconds: hold the red circle, make a single non-flashing cut to the red square, and hold the result. 3–6 seconds: hold the blue square, make a single non-flashing cut to the blue circle, and hold the result. Use neutral background, no zoom, blinking, fast camera movement or automatic repeat. Both starting and ending shapes must be clearly visible.",
                    "accessibility": "No speech, flashing or baked text. Adjacent learner-facing prose describes both changes completely; the standalone WebVTT resource provides the same descriptions. Playback is optional, with native pause/play controls. Learners who avoid motion use the still examples and text.",
                    "offline": "Bundle video and poster; retain the textual description.",
                    "readiness": "production-pending",
                    "storyboard": "0–3 seconds: hold the red circle, make a single non-flashing cut to the red square, and hold the result. 3–6 seconds: hold the blue square, make a single non-flashing cut to the blue circle, and hold the result. Use neutral background, no zoom, blinking, fast camera movement or automatic repeat. Both starting and ending shapes must be clearly visible.",
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
                    "accessibility": "Standalone keyboard-accessible WebVTT resource link, not a synchronized video track. The same two descriptions appear in preceding learner-facing prose; reading or downloading the VTT is optional.",
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
                      "allowSwipe": true,
                      "allowFullscreen": false
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
                            "specification": "Render one large sample, initially a blue circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial blue circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer. Ask learners to predict each change before choosing it; controls must allow any order without a required sequence or score. Use a single swatch and ordinary CSS or lightweight SVG, not a canvas animation. Each color button exposes whether it is selected (aria-pressed); the shape button toggles the shape, and Reset is always available. On entry, including after a Carousel slide remount, restore the declared initial state; do not depend on saved state. Keep feedback visible without moving focus.",
                            "accessibility": "Use localized native buttons with visible focus, keyboard activation and comfortably sized touch targets (aim for 44 CSS px). Let controls wrap in logical DOM order at narrow widths, with no horizontal scrolling or overlap. Keep selected color identifiable through text and aria-pressed; expose current color and shape in visible localized status and polite accessible announcements, without color-only feedback or automatic focus moves. No speech, drag gesture, rapid reaction, motion or audio is required. Respect semantic RTL; do not mirror the swatch's scientific meaning. Nonvisual vocabulary practice does not establish visual color discrimination.",
                            "offline": "Bundle and register the Scene locally; use lightweight CSS/SVG with no network or expensive graphics. Adjacent examples describe the same color/shape relations for learners who cannot use visual controls. The textual path teaches vocabulary and does not substitute for visual-recognition evidence.",
                            "readiness": "production-pending",
                            "weakDeviceAlternative": "Static swatch, text status and native controls; no animation, canvas, 3D, external dependency or timer."
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
                    "purpose": "Compare a still example with a simple learner-controlled Scene; arrows/indicators and keyboard navigation provide alternatives to swiping. No autoplay, no looping, no fullscreen requirement. Image-to-Scene and Scene-to-Image transitions use the current renderer's nonanimated path. Scene may reset when revisited; do not rely on state persistence.",
                    "accessibility": "Use the localized Next/Previous and slide controls, keyboard focus and readable labels; swipe is optional and is not available within the interactive Scene. Preserve RTL navigation semantics and make the static description meaningful without the Scene.",
                    "offline": "Local image and registered lightweight Scene; the adjacent explanation is sufficient for nonvisual vocabulary practice."
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
                        "en": "In the gallery, use Next and Previous to move between the blue shapes and the activity. Explore at your own pace; you can reset the activity. The following online video is optional. Look for red and blue on different objects if you watch it. You may see yellow, too, but our focus is red and blue. If the video is unavailable, continue with the local examples."
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
                        "en": "Choose Red or Blue and think of the color name. Predict what will happen before you change the shape. Does the color stay the same? Then predict what will happen before you change the color. Does the shape stay the same? Try Reset if you want to start again. You can also follow the written or spoken examples. For the two reflections below, think of an answer, reveal the explanation, then use the check button below each answer when you are ready. These checks mean you have considered the explanation; they are not a score. You do not need to play every video or activity."
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
                    "specification": "Render one large sample, initially a blue circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial blue circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer. Ask learners to predict each change before choosing it; controls must allow any order without a required sequence or score. Use a single swatch and ordinary CSS or lightweight SVG, not a canvas animation. Each color button exposes whether it is selected (aria-pressed); the shape button toggles the shape, and Reset is always available. On entry, including after a Carousel slide remount, restore the declared initial state; do not depend on saved state. Keep feedback visible without moving focus.",
                    "accessibility": "Use localized native buttons with visible focus, keyboard activation and comfortably sized touch targets (aim for 44 CSS px). Let controls wrap in logical DOM order at narrow widths, with no horizontal scrolling or overlap. Keep selected color identifiable through text and aria-pressed; expose current color and shape in visible localized status and polite accessible announcements, without color-only feedback or automatic focus moves. No speech, drag gesture, rapid reaction, motion or audio is required. Respect semantic RTL; do not mirror the swatch's scientific meaning. Nonvisual vocabulary practice does not establish visual color discrimination.",
                    "offline": "Bundle and register the Scene locally; use lightweight CSS/SVG with no network or expensive graphics. Adjacent examples describe the same color/shape relations for learners who cannot use visual controls. The textual path teaches vocabulary and does not substitute for visual-recognition evidence.",
                    "readiness": "production-pending",
                    "weakDeviceAlternative": "Static swatch, text status and native controls; no animation, canvas, 3D, external dependency or timer."
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
                                            "en": "Yes. A red circle and a red square have the same color, even though their outlines differ. A blue circle and a blue square can also have the same color. Look at color, not just shape. Now try a different example: look at the cup and the toy car below and think of their color names. Use the description to check your ideas. This is guided practice, not a test. In the gallery, use Next or Previous to move between the picture and the activity. Reset lets you try again. Use the check button at the end when you have considered the explanation."
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
                                            "en": "**%_%FIRST_COLOR%_%** and **%_%SECOND_COLOR%_%** are color names. Two squares can have different colors. Different objects can share a color. Shape, size and position alone cannot tell you the color."
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
                                            "en": "A blue cup on the left and a red toy car on the right."
                                          },
                                          "caption": {
                                            "en": "The cup is blue; the toy car is red. Different objects can have either color."
                                          },
                                          "fallback": {
                                            "offline": {
                                              "en": "Imagine a blue cup and a red toy car. A cup could also be red, and a toy car could be blue."
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
                                        "purpose": "Transfer the two learned color names from simple shapes to different everyday objects; counter position and object-identity shortcuts.",
                                        "specification": "Show a clearly blue cup on the left and a clearly red toy car on the right in the English illustration, on a neutral light background. Keep both objects large enough to recognize at mobile widths. Use solid, unambiguous dominant colors without competing decorations or multicolored accents. Reverse the opening image's color positions. The cup and car are examples, not objects that must always have these colors. Keep actual spatial description consistent across localized versions.",
                                        "accessibility": "Provide matching caption and alt, with spoken or written descriptions as supported vocabulary-learning alternatives. The labeled illustration is a guided example, not independent visual assessment. Keep object outlines distinguishable without depending on color alone.",
                                        "offline": "Bundle a local WebP and retain the descriptive example and its counterexamples.",
                                        "readiness": "production-pending",
                                        "prompt": "A solid blue cup beside a solid red toy car, cup on the left, toy car on the right, neutral background, no text or competing colors."
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
                                            "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
                                          },
                                          "fallback": {
                                            "offline": {
                                              "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
                                            },
                                            "unavailable": {
                                              "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
                                            },
                                            "playbackError": {
                                              "en": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
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
                                        "accessibility": "The complete spoken script appears in the visible Audio description; user-controlled playback. The adjacent written and visual examples support the same color vocabulary and conceptual contrast.",
                                        "offline": "Bundle source-language MP3; text remains available.",
                                        "readiness": "production-pending",
                                        "script": "A red circle and a red square have the same color. A blue circle and a blue square have the same color. Here the cup is blue and the toy car is red. A cup can also be red, and a toy car can be blue. Shape, size and position do not tell you the color."
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
                                          "allowSwipe": true,
                                          "allowFullscreen": false
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
                                                "specification": "Render one large sample, initially a red circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial red circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer. Ask learners to predict each change before choosing it; controls must allow any order without a required sequence or score. Use a single swatch and ordinary CSS or lightweight SVG, not a canvas animation. Each color button exposes whether it is selected (aria-pressed); the shape button toggles the shape, and Reset is always available. On entry, including after a Carousel slide remount, restore the declared initial state; do not depend on saved state. Keep feedback visible without moving focus.",
                                                "accessibility": "Use localized native buttons with visible focus, keyboard activation and comfortably sized touch targets (aim for 44 CSS px). Let controls wrap in logical DOM order at narrow widths, with no horizontal scrolling or overlap. Keep selected color identifiable through text and aria-pressed; expose current color and shape in visible localized status and polite accessible announcements, without color-only feedback or automatic focus moves. No speech, drag gesture, rapid reaction, motion or audio is required. Respect semantic RTL; do not mirror the swatch's scientific meaning. Nonvisual vocabulary practice does not establish visual color discrimination.",
                                                "offline": "Bundle and register the Scene locally; use lightweight CSS/SVG with no network or expensive graphics. Adjacent examples describe the same color/shape relations for learners who cannot use visual controls. The textual path teaches vocabulary and does not substitute for visual-recognition evidence.",
                                                "readiness": "production-pending",
                                                "weakDeviceAlternative": "Static swatch, text status and native controls; no animation, canvas, 3D, external dependency or timer."
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
                                        "purpose": "Compare a still example with a simple learner-controlled Scene; arrows/indicators and keyboard navigation provide alternatives to swiping. No autoplay, no looping, no fullscreen requirement. Image-to-Scene and Scene-to-Image transitions use the current renderer's nonanimated path. Scene may reset when revisited; do not rely on state persistence.",
                                        "accessibility": "Use the localized Next/Previous and slide controls, keyboard focus and readable labels; swipe is optional and is not available within the interactive Scene. Preserve RTL navigation semantics and make the static description meaningful without the Scene.",
                                        "offline": "Local image and registered lightweight Scene; the adjacent explanation is sufficient for nonvisual vocabulary practice."
                                      }
                                    }
                                  },
                                  "order": [
                                    "answerWords",
                                    "answerSummary",
                                    "answerPicture",
                                    "answerAudio",
                                    "answerGallery"
                                  ]
                                }
                              },
                              "production": {
                                "purpose": "Compare examples of same-color different shapes; direct explanation first, then optional alternative representations. No media playback is needed to acknowledge reflection."
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
                                            "en": "The color changed from red to blue. The shape did not change: it is still a circle. Now consider a different action: the silent video shows a red circle becoming a red square and a blue square becoming a blue circle. In those examples, the shape changes but the color stays the same. The separate timed-text link repeats those descriptions. In the activity, try both kinds of change. The code example names two colors; you do not need to run it. The online video is optional. Use the check button at the end when you have considered the explanation."
                                          }
                                        }
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
                                        "specification": "Render one large sample, initially a red circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial red circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer. Ask learners to predict each change before choosing it; controls must allow any order without a required sequence or score. Use a single swatch and ordinary CSS or lightweight SVG, not a canvas animation. Each color button exposes whether it is selected (aria-pressed); the shape button toggles the shape, and Reset is always available. On entry, including after a Carousel slide remount, restore the declared initial state; do not depend on saved state. Keep feedback visible without moving focus.",
                                        "accessibility": "Use localized native buttons with visible focus, keyboard activation and comfortably sized touch targets (aim for 44 CSS px). Let controls wrap in logical DOM order at narrow widths, with no horizontal scrolling or overlap. Keep selected color identifiable through text and aria-pressed; expose current color and shape in visible localized status and polite accessible announcements, without color-only feedback or automatic focus moves. No speech, drag gesture, rapid reaction, motion or audio is required. Respect semantic RTL; do not mirror the swatch's scientific meaning. Nonvisual vocabulary practice does not establish visual color discrimination.",
                                        "offline": "Bundle and register the Scene locally; use lightweight CSS/SVG with no network or expensive graphics. Adjacent examples describe the same color/shape relations for learners who cannot use visual controls. The textual path teaches vocabulary and does not substitute for visual-recognition evidence.",
                                        "readiness": "production-pending",
                                        "weakDeviceAlternative": "Static swatch, text status and native controls; no animation, canvas, 3D, external dependency or timer."
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
                                        "specification": "Create a silent, learner-controlled 6-second 640×400 local MP4 and matching WebP poster showing the starting red circle. 0–3 seconds: hold the red circle, make a single non-flashing cut to the red square, and hold the result. 3–6 seconds: hold the blue square, make a single non-flashing cut to the blue circle, and hold the result. Use neutral background, no zoom, blinking, fast camera movement or automatic repeat. Both starting and ending shapes must be clearly visible.",
                                        "accessibility": "No speech, flashing or baked text. Adjacent learner-facing prose describes both changes completely; the standalone WebVTT resource provides the same descriptions. Playback is optional, with native pause/play controls. Learners who avoid motion use the still examples and text.",
                                        "offline": "Bundle video and poster; retain the textual description.",
                                        "readiness": "production-pending",
                                        "storyboard": "0–3 seconds: hold the red circle, make a single non-flashing cut to the red square, and hold the result. 3–6 seconds: hold the blue square, make a single non-flashing cut to the blue circle, and hold the result. Use neutral background, no zoom, blinking, fast camera movement or automatic repeat. Both starting and ending shapes must be clearly visible.",
                                        "script": "A red circle becomes a red square. A blue square becomes a blue circle."
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
                                        "accessibility": "Standalone keyboard-accessible WebVTT resource link, not a synchronized video track. The same two descriptions appear in preceding learner-facing prose; reading or downloading the VTT is optional.",
                                        "offline": "Bundle local VTT and equivalent text.",
                                        "readiness": "production-pending",
                                        "script": "A red circle becomes a red square. A blue square becomes a blue circle."
                                      }
                                    },
                                    "answerCode": {
                                      "config": {
                                        "id": "e6566d06-1284-4cbe-a87f-ca178b05fe26",
                                        "slug": "answerCode",
                                        "type": "code",
                                        "params": {
                                          "language": "javascript",
                                          "codeAsText": "const before = \"red\";\nconst after = \"blue\";"
                                        },
                                        "locale": {
                                          "title": {
                                            "en": "Two color names before and after a change"
                                          }
                                        }
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
                                    }
                                  },
                                  "order": [
                                    "changeExplanation",
                                    "answerExplore",
                                    "answerVideo",
                                    "answerCaptions",
                                    "answerCode",
                                    "answerExternal"
                                  ]
                                }
                              },
                              "production": {
                                "purpose": "Contrast changing color with changing shape; direct explanation first, then optional practice and representations. No scored assessment or mandatory media playback."
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
                    "purpose": "Two self-paced formative reflections. Require acknowledgement of both items to exercise the existing Checkpoint completion path; do not require interaction with each nested resource or interpret acknowledgement as mastery.",
                    "pedagogicalIntent": "Learner predicts, reveals explanation and checks their understanding; the actual Next blocker and recovery are Stage 6 runtime tests."
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
                        "en": "A computer can store a color name as a word. This is a static example: notice the two names in quotation marks. You can think of the names without reading or running the code."
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
                        "en": "The words name two different colors: red and blue. You do not need to write or run code to understand that difference."
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
            "purpose": "Supplementary technical representation of two already learned color names for E2E Code coverage only. No coding, English programming syntax or arithmetic prerequisite or extra Skill; the same conceptual distinction is taught in ordinary localized text."
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
                        "en": "Look at the front of each card and try to remember the color name before revealing the answer. Check your recall and practice at your own pace. You do not have to say the answer aloud."
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
            "purpose": "Required independent Flashcard Bank selection will be integrated in Stage 8.",
            "pedagogicalIntent": "Retrieval (canonical slug retrieval) practice for both approved color terms, using cues that do not give away the answer before reveal. Keep red and blue recall distinct; use Stage 8 reviewed bank members, not invented IDs. Flashcard reveal/completion is supported recall practice, never independently scored recognition or proof of mastery."
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
                        "en": "For each example, focus on its color rather than relying on shape or position. Take your time and try to answer independently. If you cannot distinguish the colors, the written descriptions in the lesson can still help you learn the words."
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
            "purpose": "Required independent Question Bank selection and assessment settings will be integrated in Stage 7; no invented Question IDs or grading.",
            "pedagogicalIntent": "Classification (canonical slug classification): obtain distinct evidence for Skill 00000000-0000-4000-8000-000000000001 (recognize red) and Skill 00000000-0000-4000-8000-000000000004 (recognize blue) using multiple clear visual examples across varied objects, shapes, sizes and positions, including new instances and contrast examples. Supplement with unaided color-name recall (canonical slug retrieval) where justified; do not conflate recognition with recall, assisted practice, a check or mastery. Avoid answer-revealing labels or irrelevant cues in independently scored visual evidence. Preserve accessible navigation and fair accommodations, disclose when nonvisual vocabulary practice cannot provide equivalent perceptual evidence. Assessment Architect owns item formats, restrictions, selection, scoring and grading in Stage 7; no invented ID or grade policy and no assumed time pressure."
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
