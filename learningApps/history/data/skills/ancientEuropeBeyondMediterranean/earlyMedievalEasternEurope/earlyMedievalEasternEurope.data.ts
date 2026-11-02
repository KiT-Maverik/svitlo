import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { kyivanRus_Skill_Data } from './skills';

export const earlyMedievalEasternEurope_SkillGroup_Data = buildSkillGroupConfig({
  slug: "earlyMedievalEasternEurope",
  id: "f763fd64-839e-4349-a597-e4e980ea588e",
  name: {
    en: "Східна Європа раннього Середньовіччя",
  },
  skills: {
    kyivanRus: kyivanRus_Skill_Data,
  },
  description: {
    methodological: "Study early medieval Eastern European polities and links with the Baltic, Black Sea, and Byzantine worlds as a limited chronological exception to the ancient focus.",
    frontend: {
      en: "Explore early medieval states and trade connections in Eastern Europe.",
    },
  },
});
