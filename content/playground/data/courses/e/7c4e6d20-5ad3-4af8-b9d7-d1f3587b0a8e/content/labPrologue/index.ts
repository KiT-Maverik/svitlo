import { defineEpisode} from '@svitlo/engine/build';

import { languages, type CourseLanguages } from '#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants';

import {welcome} from './welcome';

const section = {
          "items": {
            welcome,
          },
          "order": [
            "welcome",
          ],
        };

export const labPrologue = defineEpisode<"labPrologue", CourseLanguages, typeof section.items>({
  // agent note: no " on keys
  // agent note: fix formatting on generator
  id: "1bccc334-67db-5d9a-8679-4165e5956616",
        "type": "episode",
        "slug": "labPrologue",
        "params": {
          languages,
        },
        "locale": {
          "title": {
            "en": "A laboratory invitation",
          },
        },
        section,
      });
