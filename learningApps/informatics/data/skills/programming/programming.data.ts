import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { dataTypesAndReferences_SkillGroup_Data } from './dataTypesAndReferences/dataTypesAndReferences.data';
import { functionsAndReuse_SkillGroup_Data } from './functionsAndReuse/functionsAndReuse.data';
import { programData_SkillGroup_Data } from './programData/programData.data';
import { programmingConstructs_SkillGroup_Data } from './programmingConstructs/programmingConstructs.data';
import { programmingParadigms_SkillGroup_Data } from './programmingParadigms/programmingParadigms.data';
import { programStructureAndSyntax_SkillGroup_Data } from './programStructureAndSyntax/programStructureAndSyntax.data';
import { readingPrograms_SkillGroup_Data } from './readingPrograms/readingPrograms.data';
import { testingAndDebugging_SkillGroup_Data } from './testingAndDebugging/testingAndDebugging.data';

export const programming_SkillDomain_Data = buildSkillDomainConfig({
  slug: "programming",
  id: "620ddff3-1b68-4866-9549-ec60a22209d2",
  name: {
    en: "Programming",
  },
  groups: {
    dataTypesAndReferences: dataTypesAndReferences_SkillGroup_Data,
    functionsAndReuse: functionsAndReuse_SkillGroup_Data,
    programData: programData_SkillGroup_Data,
    programmingConstructs: programmingConstructs_SkillGroup_Data,
    programmingParadigms: programmingParadigms_SkillGroup_Data,
    programStructureAndSyntax: programStructureAndSyntax_SkillGroup_Data,
    readingPrograms: readingPrograms_SkillGroup_Data,
    testingAndDebugging: testingAndDebugging_SkillGroup_Data,
  },
  description: {
    methodological: "Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.",
    frontend: {
      en: "Learn to understand, write and test instructions that a computer executes.",
    },
  },
});
