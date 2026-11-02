import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { cyclingAndMicromobilitySafety_Skill_Data, passengerSafety_Skill_Data, pedestrianRoadSafety_Skill_Data, safeDrivingDecisions_Skill_Data } from './skills';

export const roadAndTransportSafety_SkillGroup_Data = buildSkillGroupConfig({
  slug: "roadAndTransportSafety",
  id: "6eb3608b-9d34-41a1-b452-ba8e1cd8a593",
  name: {
    en: "Road and Transport Safety",
  },
  skills: {
    cyclingAndMicromobilitySafety: cyclingAndMicromobilitySafety_Skill_Data,
    passengerSafety: passengerSafety_Skill_Data,
    pedestrianRoadSafety: pedestrianRoadSafety_Skill_Data,
    safeDrivingDecisions: safeDrivingDecisions_Skill_Data,
  },
  description: {
    methodological: "Protection differs for pedestrians, riders, passengers, and drivers; visible signals and protective equipment do not remove every traffic risk.",
    frontend: {
      en: "Learn how road risks differ for pedestrians, passengers and vehicle users.",
    },
  },
});
