import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishConcreteFromAbstractEntities_Skill_Data, distinguishPropertiesFromObjects_Skill_Data, evaluateAnExistenceClaim_Skill_Data } from './skills';

export const existenceAndCategories_SkillGroup_Data = buildSkillGroupConfig({
  slug: "existenceAndCategories",
  id: "c80030d6-098c-420f-8894-ca83b7eb8c6a",
  name: {
    en: "Existence and Categories",
  },
  skills: {
    distinguishConcreteFromAbstractEntities: distinguishConcreteFromAbstractEntities_Skill_Data,
    distinguishPropertiesFromObjects: distinguishPropertiesFromObjects_Skill_Data,
    evaluateAnExistenceClaim: evaluateAnExistenceClaim_Skill_Data,
  },
  description: {
    methodological: "Different theories posit concrete objects, properties, events, or abstract entities; their classification determines what kinds of ontological commitments a claim makes.",
    frontend: {
      en: "Examine different kinds of things that philosophers consider real.",
    },
  },
});
