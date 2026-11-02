import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { identifyCommonMapTypesByTheirInformationContent_Skill_Data, interpretAThematicLegendAndItsValueClasses_Skill_Data, selectAMapTypeForAGeographicQuestion_Skill_Data } from './skills';

export const mapTypesAndThematicLayers_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mapTypesAndThematicLayers",
  id: "31643ccb-26da-4092-98ba-62ac872f5072",
  name: {
    en: "Map Types and Thematic Layers",
  },
  skills: {
    identifyCommonMapTypesByTheirInformationContent: identifyCommonMapTypesByTheirInformationContent_Skill_Data,
    interpretAThematicLegendAndItsValueClasses: interpretAThematicLegendAndItsValueClasses_Skill_Data,
    selectAMapTypeForAGeographicQuestion: selectAMapTypeForAGeographicQuestion_Skill_Data,
  },
  description: {
    methodological: "Maps may emphasize general reference features, political territories, physical relief, topography or specific themes such as geology, population, climate, weather, transport and resources. Categories overlap: for example, a geological or population map is thematic, and many maps combine layers. Choosing the relevant content is distinct from choosing a globe or map scale.",
    frontend: {
      en: "Discover how different maps show boundaries, landforms, weather, people and more.",
    },
  },
});
