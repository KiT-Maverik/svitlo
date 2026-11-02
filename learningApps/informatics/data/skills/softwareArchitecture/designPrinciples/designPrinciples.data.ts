import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { deferUnnecessaryFeaturesYAGNI_Skill_Data, designDependenciesOnContractsDIP_Skill_Data, extendBehaviorWithoutModifyingTheCoreOCP_Skill_Data, identifyUnnecessaryDuplicationDRY_Skill_Data, isolateASingleResponsibilitySRP_Skill_Data, reduceUnnecessaryComplexityKISS_Skill_Data, separateNarrowInterfacesISP_Skill_Data, verifySubstitutabilityLSP_Skill_Data } from './skills';

export const designPrinciples_SkillGroup_Data = buildSkillGroupConfig({
  slug: "designPrinciples",
  id: "6fa9da4d-1357-4877-b577-1f45443b58f6",
  name: {
    en: "Design Principles",
  },
  skills: {
    deferUnnecessaryFeaturesYAGNI: deferUnnecessaryFeaturesYAGNI_Skill_Data,
    designDependenciesOnContractsDIP: designDependenciesOnContractsDIP_Skill_Data,
    extendBehaviorWithoutModifyingTheCoreOCP: extendBehaviorWithoutModifyingTheCoreOCP_Skill_Data,
    identifyUnnecessaryDuplicationDRY: identifyUnnecessaryDuplicationDRY_Skill_Data,
    isolateASingleResponsibilitySRP: isolateASingleResponsibilitySRP_Skill_Data,
    reduceUnnecessaryComplexityKISS: reduceUnnecessaryComplexityKISS_Skill_Data,
    separateNarrowInterfacesISP: separateNarrowInterfacesISP_Skill_Data,
    verifySubstitutabilityLSP: verifySubstitutabilityLSP_Skill_Data,
  },
  description: {
    methodological: "Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.",
    frontend: {
      en: "Learn principles for keeping software understandable and adaptable.",
    },
  },
});
