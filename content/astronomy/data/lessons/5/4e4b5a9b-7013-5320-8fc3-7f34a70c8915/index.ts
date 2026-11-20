import { defineLesson } from '@svitlo/engine/build';

import { section } from "./sections";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { dayAndNight } from "../../../skills/earthMoonAndSun/terrestrialSkyCycles/dayAndNight";
import { lunarPhases } from "../../../skills/earthMoonAndSun/lunarAppearance/lunarPhases";

export const skyChangesOverview = defineLesson<"skyChangesOverview", LessonLanguages, typeof section.items>({
  id: "4e4b5a9b-7013-5320-8fc3-7f34a70c8915",
  slug: "skyChangesOverview",
  type: "lesson",
  skills: [dayAndNight.id, lunarPhases.id],
  params: {
    languages,
    quizRequiredForCompletion: false,
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true
    }
  },
  locale: {
    title: {
      uk: "Як помітити зміни на небі"
    }
  },
  section
});
