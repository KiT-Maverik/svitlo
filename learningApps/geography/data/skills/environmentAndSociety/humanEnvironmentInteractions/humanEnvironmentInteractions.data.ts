import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHowEnvironmentalConditionsInfluenceHumanActivities_Skill_Data, explainHowPeopleAdaptToGeographicEnvironments_Skill_Data, identifyGeographicConsequencesOfLandUseChange_Skill_Data, traceAnEnvironmentalImpactBeyondItsSource_Skill_Data } from './skills';

export const humanEnvironmentInteractions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "humanEnvironmentInteractions",
  id: "45d148d1-2a1b-4213-b0d1-7abd6bf19c5d",
  name: {
    en: "Human–Environment Interactions",
  },
  skills: {
    explainHowEnvironmentalConditionsInfluenceHumanActivities: explainHowEnvironmentalConditionsInfluenceHumanActivities_Skill_Data,
    explainHowPeopleAdaptToGeographicEnvironments: explainHowPeopleAdaptToGeographicEnvironments_Skill_Data,
    identifyGeographicConsequencesOfLandUseChange: identifyGeographicConsequencesOfLandUseChange_Skill_Data,
    traceAnEnvironmentalImpactBeyondItsSource: traceAnEnvironmentalImpactBeyondItsSource_Skill_Data,
  },
  description: {
    methodological: "People use and alter environmental conditions, while climate, terrain, water and hazards shape the possibilities and constraints for human activities. These influences are reciprocal but not necessarily symmetric; different choices can reduce or intensify impacts.",
    frontend: {
      en: "Discover how people adapt to, use and change their environments.",
    },
  },
});
