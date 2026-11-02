import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishLocalAndRemoteRepositories_Skill_Data, explainABranch_Skill_Data, explainACommit_Skill_Data, explainAPullRequest_Skill_Data, explainARepository_Skill_Data, explainBranchMerging_Skill_Data } from './skills';

export const gitVersionControl_SkillGroup_Data = buildSkillGroupConfig({
  slug: "gitVersionControl",
  id: "1a71deba-af48-4da5-b376-75b0172e1570",
  name: {
    en: "Git Version Control",
  },
  skills: {
    distinguishLocalAndRemoteRepositories: distinguishLocalAndRemoteRepositories_Skill_Data,
    explainABranch: explainABranch_Skill_Data,
    explainACommit: explainACommit_Skill_Data,
    explainAPullRequest: explainAPullRequest_Skill_Data,
    explainARepository: explainARepository_Skill_Data,
    explainBranchMerging: explainBranchMerging_Skill_Data,
  },
  description: {
    methodological: "Git provides a history of commits and branches, while change-review processes help combine the work of multiple contributors.",
    frontend: {
      en: "Learn how Git records versions and helps teams combine changes.",
    },
  },
});
