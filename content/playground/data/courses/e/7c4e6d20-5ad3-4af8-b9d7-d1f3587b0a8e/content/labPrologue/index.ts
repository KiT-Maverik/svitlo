import { defineContentSection, defineEpisode, defineMarkdown, defineScene } from '@svitlo/engine/build';

import { languages, type CourseLanguages } from '#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants';

const section = {
          "items": {
            "welcome": defineContentSection({
              "id": "8a9f6c0b-7d11-432a-9f8e-9e6ee1a6ac01",
              "slug": "welcome",
              "type": "content",
              "params": {},
              "locale": {
                "title": {
                  "en": "Welcome to the lab",
                },
                "navigationLabel": {
                  "en": "Introduction",
                },
              },
              "content": {
                "items": {
                  "greeting": defineMarkdown({
                    "id": "8a9f6c0b-7d11-432a-9f8e-9e6ee1a6ac02",
                    "slug": "greeting",
                    "type": "markdown",
                    "params": {},
                    "locale": {
                      "value": {
                        "en": "A curious laboratory awaits. Choose a safe way to explore shapes, light, and color.",
                      },
                    },
                  }),
                  "choosePath": defineScene({
                    "id": "8a9f6c0b-7d11-432a-9f8e-9e6ee1a6ac03",
                    "slug": "choosePath",
                    "type": "scene",
                    "params": {},
                    "locale": {
                      "value": {
                        "prompt": {
                          "en": "Explore the tabletop using keyboard, pointer or a spoken description; the story does not gate the Lessons.",
                        },
                      },
                    },
                  }),
                },
                "order": [
                  "greeting",
                  "choosePath",
                ],
              },
            }),
          },
          "order": [
            "welcome",
          ],
        };

export const labPrologue = defineEpisode<"labPrologue", CourseLanguages, typeof section.items>({
        "id": "1bccc334-67db-5d9a-8679-4165e5956616",
        "type": "episode",
        "slug": "labPrologue",
        "params": {
          "languages": languages,
        },
        "locale": {
          "title": {
            "en": "A laboratory invitation",
          },
        },
        section,
      });
