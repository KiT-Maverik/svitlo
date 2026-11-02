import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assessBreathing_Skill_Data, assessResponsiveness_Skill_Data, assessSceneSafetyBeforeHelping_Skill_Data, careForAnUnresponsivePersonWhoIsBreathingNormally_Skill_Data } from './skills';

export const initialAssessmentAndHelp_SkillGroup_Data = buildSkillGroupConfig({
  slug: "initialAssessmentAndHelp",
  id: "d1b9f24a-d464-4349-89f3-d0a657b816ec",
  name: {
    en: "Initial Assessment and Help",
  },
  skills: {
    assessBreathing: assessBreathing_Skill_Data,
    assessResponsiveness: assessResponsiveness_Skill_Data,
    assessSceneSafetyBeforeHelping: assessSceneSafetyBeforeHelping_Skill_Data,
    careForAnUnresponsivePersonWhoIsBreathingNormally: careForAnUnresponsivePersonWhoIsBreathingNormally_Skill_Data,
  },
  description: {
    methodological: "Initial response begins with rescuer safety, recognition of urgent changes in responsiveness or breathing, and continued observation. Calling for help uses the shared competency in Emergencies and Civil Protection rather than a duplicate Skill.",
    frontend: {
      en: "Discover the first steps for assessing someone who might need emergency help.",
    },
  },
});
