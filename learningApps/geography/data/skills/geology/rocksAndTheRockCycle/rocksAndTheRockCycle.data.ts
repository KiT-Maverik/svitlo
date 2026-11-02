import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyRocksByTheirModeOfOrigin_Skill_Data, distinguishARockFromAMineral_Skill_Data, explainTheFormationOfIgneousRocks_Skill_Data, explainTheFormationOfMetamorphicRocks_Skill_Data, explainTheFormationOfSedimentaryRocks_Skill_Data, traceAPathwayThroughTheRockCycle_Skill_Data } from './skills';

export const rocksAndTheRockCycle_SkillGroup_Data = buildSkillGroupConfig({
  slug: "rocksAndTheRockCycle",
  id: "37bb8dfa-e97a-432c-a339-9e3fa46fbee3",
  name: {
    en: "Rocks and the Rock Cycle",
  },
  skills: {
    classifyRocksByTheirModeOfOrigin: classifyRocksByTheirModeOfOrigin_Skill_Data,
    distinguishARockFromAMineral: distinguishARockFromAMineral_Skill_Data,
    explainTheFormationOfIgneousRocks: explainTheFormationOfIgneousRocks_Skill_Data,
    explainTheFormationOfMetamorphicRocks: explainTheFormationOfMetamorphicRocks_Skill_Data,
    explainTheFormationOfSedimentaryRocks: explainTheFormationOfSedimentaryRocks_Skill_Data,
    traceAPathwayThroughTheRockCycle: traceAPathwayThroughTheRockCycle_Skill_Data,
  },
  description: {
    methodological: "Consolidated natural materials record formation through magma cooling, deposition and lithification, or alteration in the solid state. Classifications concern how a rock formed, and the rock cycle describes multiple possible paths between types rather than a mandatory fixed sequence.",
    frontend: {
      en: "Learn how rocks form, change and move through different geological pathways.",
    },
  },
});
