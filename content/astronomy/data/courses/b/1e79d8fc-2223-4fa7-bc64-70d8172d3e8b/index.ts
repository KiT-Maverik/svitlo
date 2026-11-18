// Generated Course authoring draft; manual completion and review required.
import { defineCourse } from "@svitlo/engine/build";
import { safeObservation_Chapter } from "./chapters/safeObservation";
import { skyCycles_Module } from "./modules/skyCycles";
import { solarSystem_Module } from "./modules/solarSystem";

// TODO: Resolve standalone Lesson UUID "c042698a-de5b-5055-9e10-ff5621f80ed7" and replace UNRESOLVED_LESSON_0; never define Lesson inside Course.

export const astronomyGradeOne_Course = defineCourse({
  "id": "1e79d8fc-2223-4fa7-bc64-70d8172d3e8b",
  "slug": "astronomyGradeOne",
  "type": "course",
  "params": {
    "languages": [
      "uk",
      "en",
      "pl",
      "qm"
    ],
    "grade": {
      "min": 1,
      "max": 1
    },
    "outcomes": {
      "skills": [
        "b4b9b469-391d-40f8-b11d-6884c76ed106",
        "faa8f11a-cc06-42c9-8864-8151732e690a",
        "05f79f1d-da4d-4c52-a2d1-332cfd48867c",
        "2c404b38-fbad-47f6-a70c-fe12218ac240",
        "53bba831-1f84-4b25-8e05-33f54167cc98"
      ],
      "skillGroups": [
        "6b5700fb-8ba9-4483-9b1b-5c6a28347e12",
        "c8f35ba8-a7b9-4e99-83bc-1f21326aafc7",
        "48079b94-cef6-4aaa-9d94-80c5099520df",
        "abfb0627-a4a5-410e-9881-04d22158a297"
      ]
    }
  },
  "locale": {
    "title": {
      "uk": "Астрономія для першокласників"
    },
    "description": {
      "uk": "Перші спостереження за небом і знайомство із Землею, Місяцем, Сонцем та Сонячною системою."
    },
    "outcomesText": {
      "uk": "Заплановані навчальні цілі охоплюють безпечне спостереження, фіксацію простих спостережень, розуміння зміни дня й ночі та початкове розрізнення складових Сонячної системи. UUID повних таксономічних компетентностей задають напрям, а не твердження про досягнуту першокласниками повну майстерність."
    },
    "prerequisitesText": {
      "uk": "Спеціалізованих попередніх астрономічних компетентностей не вимагається."
    }
  },
  content: {
    items: {
    "firstLookAtSky": UNRESOLVED_LESSON_0,
    "safeObservation": safeObservation_Chapter,
    "skyCycles": skyCycles_Module,
    "solarSystem": solarSystem_Module
    },
    order: [
      "firstLookAtSky",
      "safeObservation",
      "skyCycles",
      "solarSystem"
    ]
  }
});
