import { defineLesson } from '@svitlo/engine/build';
import { languages } from "./languages";
import { checkColors as child_section_items_checkColors } from "./sections/checkColors";
import { colorCode as child_section_items_colorCode } from "./sections/colorCode";
import { exploreColors as child_section_items_exploreColors } from "./sections/exploreColors";
import { meetColors as child_section_items_meetColors } from "./sections/meetColors";
import { recallColors as child_section_items_recallColors } from "./sections/recallColors";
import { watchCompare as child_section_items_watchCompare } from "./sections/watchCompare";

// TODO (BLOCKER): Restore reviewed Lesson languages: ["ar","be","bn","de","en","es","et","fr","he","hi","id","it","ja","ka","kk","ko","lt","lv","mr","ms","pl","pt","qm","ta","te","tr","uk","ur","vi","zh"].
// TODO (BLOCKER): Resolve pending Quiz/Flashcards selections in the owned Section modules before publication.
const section = {
  "items": {
    "checkColors": child_section_items_checkColors,
    "colorCode": child_section_items_colorCode,
    "exploreColors": child_section_items_exploreColors,
    "meetColors": child_section_items_meetColors,
    "recallColors": child_section_items_recallColors,
    "watchCompare": child_section_items_watchCompare,
  },
  "order": ["meetColors", "watchCompare", "exploreColors", "colorCode", "recallColors", "checkColors"],
};
export const recognizeRedAndBlue = defineLesson<"recognizeRedAndBlue", typeof languages, typeof section.items>(
{
  "id": "546a1d10-e656-4184-bdc9-f2a85017d18a",
  "type": "lesson",
  "slug": "recognizeRedAndBlue",
  "skills": ["00000000-0000-4000-8000-000000000001", "00000000-0000-4000-8000-000000000004"],
  "locale": {
    "title": {
      "en": "Recognizing Red and Blue",
    },
  },
  "params": {
    "quizRequiredForCompletion": true,
    "languages": languages,
    "sections": {
      "allowNavigation": true,
      "allowSkipping": false,
      "showIndexes": true,
    },
  },
  "section": section,
});
