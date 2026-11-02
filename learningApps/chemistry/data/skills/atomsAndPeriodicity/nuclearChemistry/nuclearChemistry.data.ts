import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { halfLife_Skill_Data, isotopeTracers_Skill_Data, nuclearTransmutation_Skill_Data, radioactiveDecay_Skill_Data } from './skills';

export const nuclearChemistry_SkillGroup_Data = buildSkillGroupConfig({
  slug: "nuclearChemistry",
  id: "e5b6cc5e-243a-4ec3-98b1-718ffde76688",
  name: {
    en: "Nuclear Chemistry",
  },
  skills: {
    halfLife: halfLife_Skill_Data,
    isotopeTracers: isotopeTracers_Skill_Data,
    nuclearTransmutation: nuclearTransmutation_Skill_Data,
    radioactiveDecay: radioactiveDecay_Skill_Data,
  },
  description: {
    methodological: "Changes within atomic nuclei alter nuclide identities rather than ordinary electron bonding. The chemical emphasis is isotopic substances, decay and analytical applications; general nuclear-force physics belongs to Physics.",
    frontend: {
      en: "Explore how changes to atomic nuclei differ from ordinary chemical reactions.",
    },
  },
});
