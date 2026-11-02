import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { approachMotivation_Skill_Data, avoidanceMotivation_Skill_Data, expectancyAndValue_Skill_Data, extrinsicMotivation_Skill_Data, intrinsicMotivation_Skill_Data, motivationalCrowding_Skill_Data, needsAndDrives_Skill_Data } from './skills';

export const motivationalMechanisms_SkillGroup_Data = buildSkillGroupConfig({
  slug: "motivationalMechanisms",
  id: "c27e6e57-c3af-46a3-9735-cc51591db37c",
  name: {
    en: "Motivational Mechanisms",
  },
  skills: {
    approachMotivation: approachMotivation_Skill_Data,
    avoidanceMotivation: avoidanceMotivation_Skill_Data,
    expectancyAndValue: expectancyAndValue_Skill_Data,
    extrinsicMotivation: extrinsicMotivation_Skill_Data,
    intrinsicMotivation: intrinsicMotivation_Skill_Data,
    motivationalCrowding: motivationalCrowding_Skill_Data,
    needsAndDrives: needsAndDrives_Skill_Data,
  },
  description: {
    methodological: "Behavior is influenced by internal states and external incentives, with competing explanations and substantial individual variation.",
    frontend: {
      en: "Discover different sources of motivation behind human action.",
    },
  },
});
