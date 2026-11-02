import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assessLimitationsOfGeographicDataSources_Skill_Data, collectAndRecordGeographicallyReferencedObservations_Skill_Data, formulateAQuestionAboutASpatialPattern_Skill_Data } from './skills';

export const evidenceAndInvestigation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "evidenceAndInvestigation",
  id: "9de41af8-a44a-409d-acee-238532f70e33",
  name: {
    en: "Evidence and Investigation",
  },
  skills: {
    assessLimitationsOfGeographicDataSources: assessLimitationsOfGeographicDataSources_Skill_Data,
    collectAndRecordGeographicallyReferencedObservations: collectAndRecordGeographicallyReferencedObservations_Skill_Data,
    formulateAQuestionAboutASpatialPattern: formulateAQuestionAboutASpatialPattern_Skill_Data,
  },
  description: {
    methodological: "Geographic claims are supported by observations located in space and time. Evidence may come from fieldwork, maps, images, measurements, or datasets and must be evaluated for limitations.",
    frontend: {
      en: "Discover how to investigate spatial patterns using reliable, located observations.",
    },
  },
});
