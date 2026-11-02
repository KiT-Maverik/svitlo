import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { roadAndTransportSafety_SkillGroup_Data } from './roadAndTransportSafety/roadAndTransportSafety.data';
import { waterSafety_SkillGroup_Data } from './waterSafety/waterSafety.data';
import { weatherAndNatureHazards_SkillGroup_Data } from './weatherAndNatureHazards/weatherAndNatureHazards.data';

export const transportWaterAndOutdoorSafety_SkillDomain_Data = buildSkillDomainConfig({
  slug: "transportWaterAndOutdoorSafety",
  id: "f3c8bf08-9e87-49bb-85e2-bcf4006b6f8f",
  name: {
    en: "Transport, Water and Outdoor Safety",
  },
  groups: {
    roadAndTransportSafety: roadAndTransportSafety_SkillGroup_Data,
    waterSafety: waterSafety_SkillGroup_Data,
    weatherAndNatureHazards: weatherAndNatureHazards_SkillGroup_Data,
  },
  description: {
    methodological: "Movement outside controlled environments combines traffic rules, environmental conditions, and limited opportunities for immediate rescue. This domain addresses safe decisions rather than vehicle engineering.",
    frontend: {
      en: "Explore safe decisions when traveling, swimming and spending time outdoors.",
    },
  },
});
