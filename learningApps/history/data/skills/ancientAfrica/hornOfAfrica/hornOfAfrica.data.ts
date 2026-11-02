import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { aksumiteKingdom_Skill_Data, christianizationOfAksum_Skill_Data, earlyEthiopianHighlandStates_Skill_Data } from './skills';

export const hornOfAfrica_SkillGroup_Data = buildSkillGroupConfig({
  slug: "hornOfAfrica",
  id: "dd64dd81-5094-4eb5-9ee0-28d02a5498ec",
  name: {
    en: "Африканський Ріг",
  },
  skills: {
    aksumiteKingdom: aksumiteKingdom_Skill_Data,
    christianizationOfAksum: christianizationOfAksum_Skill_Data,
    earlyEthiopianHighlandStates: earlyEthiopianHighlandStates_Skill_Data,
  },
  description: {
    methodological: "Red Sea connections linked highland farming societies with maritime exchanges between Africa and Arabia.",
    frontend: {
      en: "Explore ancient societies near the Red Sea and Ethiopian highlands.",
    },
  },
});
