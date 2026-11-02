import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { designDigitalInterfaceFeedback_Skill_Data, designDigitalInterfaceNavigation_Skill_Data, identifyADigitalProductUsersGoal_Skill_Data, preventCommonDigitalInteractionErrors_Skill_Data } from './skills';

export const digitalInteractionDesign_SkillGroup_Data = buildSkillGroupConfig({
  slug: "digitalInteractionDesign",
  id: "74767923-3b47-4431-94cc-3168ccd2e73c",
  name: {
    en: "Digital Interaction Design",
  },
  skills: {
    designDigitalInterfaceFeedback: designDigitalInterfaceFeedback_Skill_Data,
    designDigitalInterfaceNavigation: designDigitalInterfaceNavigation_Skill_Data,
    identifyADigitalProductUsersGoal: identifyADigitalProductUsersGoal_Skill_Data,
    preventCommonDigitalInteractionErrors: preventCommonDigitalInteractionErrors_Skill_Data,
  },
  description: {
    methodological: "Designing user action flows in applications and digital devices, understandable transitions, status feedback, and safeguards against common errors.",
    frontend: {
      en: "Explore how to plan intuitive actions and helpful responses in digital interfaces.",
    },
  },
});
