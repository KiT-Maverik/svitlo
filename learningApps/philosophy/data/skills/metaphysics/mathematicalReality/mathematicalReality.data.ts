import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeMathematicalStructuralism_Skill_Data, evaluateMathematicalNominalism_Skill_Data, evaluateMathematicalPlatonism_Skill_Data } from './skills';

export const mathematicalReality_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mathematicalReality",
  id: "f54a8748-11ce-4ecf-905c-f63e2ee7d5f6",
  name: {
    en: "Mathematical Reality",
  },
  skills: {
    analyzeMathematicalStructuralism: analyzeMathematicalStructuralism_Skill_Data,
    evaluateMathematicalNominalism: evaluateMathematicalNominalism_Skill_Data,
    evaluateMathematicalPlatonism: evaluateMathematicalPlatonism_Skill_Data,
  },
  description: {
    methodological: "Philosophical accounts of mathematics disagree over whether its objects exist independently, are constructs of formal language, or are positions within structures. These ontological commitments are distinct from learning to perform mathematical operations.",
    frontend: {
      en: "Explore debates about whether mathematical objects exist independently of people.",
    },
  },
});
