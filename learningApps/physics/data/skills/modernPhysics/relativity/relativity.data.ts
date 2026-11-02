import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainGravityAsSpacetimeCurvature_Skill_Data, explainHowThePassageOfTimeDependsOnObserversRelativeMotion_Skill_Data, explainTheEffectOfGravityOnThePassageOfTime_Skill_Data, explainTheGravitationalDeflectionOfLight_Skill_Data, recognizeTheConstancyOfTheSpeedOfLightInVacuumAsAPrincipleOfSpecialRelativity_Skill_Data } from './skills';

export const relativity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "relativity",
  id: "98116782-7e48-4474-b437-26dab39ea837",
  name: {
    en: "Relativity",
  },
  skills: {
    explainGravityAsSpacetimeCurvature: explainGravityAsSpacetimeCurvature_Skill_Data,
    explainHowThePassageOfTimeDependsOnObserversRelativeMotion: explainHowThePassageOfTimeDependsOnObserversRelativeMotion_Skill_Data,
    explainTheEffectOfGravityOnThePassageOfTime: explainTheEffectOfGravityOnThePassageOfTime_Skill_Data,
    explainTheGravitationalDeflectionOfLight: explainTheGravitationalDeflectionOfLight_Skill_Data,
    recognizeTheConstancyOfTheSpeedOfLightInVacuumAsAPrincipleOfSpecialRelativity: recognizeTheConstancyOfTheSpeedOfLightInVacuumAsAPrincipleOfSpecialRelativity_Skill_Data,
  },
  description: {
    methodological: "Special relativity describes how measurements of space and time relate to motion, while general relativity describes gravity as spacetime geometry. They should not be confused with the history of astronomy or require formulas in an introductory curriculum.",
    frontend: {
      en: "Discover how motion and gravity affect measurements of space and time.",
    },
  },
});
