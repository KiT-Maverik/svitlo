import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { geneEnvironmentInteraction_Skill_Data, heritabilityInterpretation_Skill_Data, hormonalInfluences_Skill_Data, physiologicalStressResponses_Skill_Data } from './skills';

export const biologicalDifferencesAndContext_SkillGroup_Data = buildSkillGroupConfig({
  slug: "biologicalDifferencesAndContext",
  id: "c1836515-2a83-44a7-921e-66c09ba893c4",
  name: {
    en: "Biological Differences and Context",
  },
  skills: {
    geneEnvironmentInteraction: geneEnvironmentInteraction_Skill_Data,
    heritabilityInterpretation: heritabilityInterpretation_Skill_Data,
    hormonalInfluences: hormonalInfluences_Skill_Data,
    physiologicalStressResponses: physiologicalStressResponses_Skill_Data,
  },
  description: {
    methodological: "Inherited characteristics, hormones, and environmental exposures jointly shape outcomes, without fixing a person's future.",
    frontend: {
      en: "Discover how inherited factors, hormones and environments jointly shape behavior.",
    },
  },
});
