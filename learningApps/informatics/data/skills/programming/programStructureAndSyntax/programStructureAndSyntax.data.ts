import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishKeywordsFromIdentifiers_Skill_Data, distinguishOperatorsExpressionsAndStatements_Skill_Data, explainStatementBlockBoundaries_Skill_Data, explainSyntaxHighlighting_Skill_Data } from './skills';

export const programStructureAndSyntax_SkillGroup_Data = buildSkillGroupConfig({
  slug: "programStructureAndSyntax",
  id: "30fcb41c-3ae7-4294-870b-ac9b2507a304",
  name: {
    en: "Program Structure and Syntax",
  },
  skills: {
    distinguishKeywordsFromIdentifiers: distinguishKeywordsFromIdentifiers_Skill_Data,
    distinguishOperatorsExpressionsAndStatements: distinguishOperatorsExpressionsAndStatements_Skill_Data,
    explainStatementBlockBoundaries: explainStatementBlockBoundaries_Skill_Data,
    explainSyntaxHighlighting: explainSyntaxHighlighting_Skill_Data,
  },
  description: {
    methodological: "The language units of executable code include keywords, operators, identifiers, expressions, statements, and blocks. Editor highlighting helps identify them but does not prove a program correct.",
    frontend: {
      en: "Learn how programming languages organize keywords, expressions and blocks.",
    },
  },
});
