import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishRelativeFromNumericalGeologicalAges_Skill_Data, interpretAGeologicalTimeScale_Skill_Data, orderUndisturbedRockLayersByRelativeAge_Skill_Data, useFossilsAsEvidenceOfPastEnvironments_Skill_Data } from './skills';

export const geologicalTimeAndEvidence_SkillGroup_Data = buildSkillGroupConfig({
  slug: "geologicalTimeAndEvidence",
  id: "5b4ae165-952a-4f4f-b233-7aefb73c247c",
  name: {
    en: "Geological Time and Evidence",
  },
  skills: {
    distinguishRelativeFromNumericalGeologicalAges: distinguishRelativeFromNumericalGeologicalAges_Skill_Data,
    interpretAGeologicalTimeScale: interpretAGeologicalTimeScale_Skill_Data,
    orderUndisturbedRockLayersByRelativeAge: orderUndisturbedRockLayersByRelativeAge_Skill_Data,
    useFossilsAsEvidenceOfPastEnvironments: useFossilsAsEvidenceOfPastEnvironments_Skill_Data,
  },
  description: {
    methodological: "Rock sequences, fossils and dated materials provide evidence of Earth's long history. Geologists reconstruct events using relative ordering as well as numerical measurements, and a geologic time scale communicates durations far larger than human history.",
    frontend: {
      en: "Explore how rocks and fossils provide evidence of Earth's long past.",
    },
  },
});
