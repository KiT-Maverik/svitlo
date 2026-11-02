import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { applyObjectAbstraction_Skill_Data, distinguishAClassFromAnObject_Skill_Data, distinguishARealObjectFromItsAbstractModel_Skill_Data, explainAnObjectMethod_Skill_Data, explainAnObjectProperty_Skill_Data, explainEncapsulation_Skill_Data, explainInheritance_Skill_Data, explainPolymorphism_Skill_Data, explainTheConceptOfAClass_Skill_Data, explainTheStructureOfASoftwareObject_Skill_Data, identifyAnObjectsStateAndBehavior_Skill_Data, modelADomainEntityAsASoftwareObject_Skill_Data, modelObjectComposition_Skill_Data } from './skills';

export const objectModel_SkillGroup_Data = buildSkillGroupConfig({
  slug: "objectModel",
  id: "f1ebe259-99e3-4187-930d-1f6a4077ad22",
  name: {
    en: "Object Model",
  },
  skills: {
    applyObjectAbstraction: applyObjectAbstraction_Skill_Data,
    distinguishAClassFromAnObject: distinguishAClassFromAnObject_Skill_Data,
    distinguishARealObjectFromItsAbstractModel: distinguishARealObjectFromItsAbstractModel_Skill_Data,
    explainAnObjectMethod: explainAnObjectMethod_Skill_Data,
    explainAnObjectProperty: explainAnObjectProperty_Skill_Data,
    explainEncapsulation: explainEncapsulation_Skill_Data,
    explainInheritance: explainInheritance_Skill_Data,
    explainPolymorphism: explainPolymorphism_Skill_Data,
    explainTheConceptOfAClass: explainTheConceptOfAClass_Skill_Data,
    explainTheStructureOfASoftwareObject: explainTheStructureOfASoftwareObject_Skill_Data,
    identifyAnObjectsStateAndBehavior: identifyAnObjectsStateAndBehavior_Skill_Data,
    modelADomainEntityAsASoftwareObject: modelADomainEntityAsASoftwareObject_Skill_Data,
    modelObjectComposition: modelObjectComposition_Skill_Data,
  },
  description: {
    methodological: "Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.",
    frontend: {
      en: "Discover how software objects combine their state and behavior.",
    },
  },
});
