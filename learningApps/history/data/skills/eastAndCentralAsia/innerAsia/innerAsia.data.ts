import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { centralAsianOasisCenters_Skill_Data, sakaAndRelatedSteppeCultures_Skill_Data, steppePastoralism_Skill_Data, xiongnu_Skill_Data } from './skills';

export const innerAsia_SkillGroup_Data = buildSkillGroupConfig({
  slug: "innerAsia",
  id: "7aa11b7a-047f-4c39-968d-9f18b9e16e5e",
  name: {
    en: "Внутрішня Азія",
  },
  skills: {
    centralAsianOasisCenters: centralAsianOasisCenters_Skill_Data,
    sakaAndRelatedSteppeCultures: sakaAndRelatedSteppeCultures_Skill_Data,
    steppePastoralism: steppePastoralism_Skill_Data,
    xiongnu: xiongnu_Skill_Data,
  },
  description: {
    methodological: "Steppe and oasis societies created polities and connections among large agricultural states.",
    frontend: {
      en: "Explore the mobile and settled societies of Inner Asia.",
    },
  },
});
