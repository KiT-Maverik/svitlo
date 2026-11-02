import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { carthage_Skill_Data, garamantes_Skill_Data, northAfricanCulturalInteractions_Skill_Data, numidianKingdoms_Skill_Data } from './skills';

export const northAfricaBeyondTheNile_SkillGroup_Data = buildSkillGroupConfig({
  slug: "northAfricaBeyondTheNile",
  id: "1a0ba7c6-d424-4499-8f24-f4e1138fc594",
  name: {
    en: "Північна Африка поза долиною Нілу",
  },
  skills: {
    carthage: carthage_Skill_Data,
    garamantes: garamantes_Skill_Data,
    northAfricanCulturalInteractions: northAfricanCulturalInteractions_Skill_Data,
    numidianKingdoms: numidianKingdoms_Skill_Data,
  },
  description: {
    methodological: "Carthaginian, Numidian, and Saharan societies maintained their own political traditions amid Mediterranean and inland contacts.",
    frontend: {
      en: "Discover ancient North African societies beyond Egypt.",
    },
  },
});
