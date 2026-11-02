import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { analysis_SkillGroup_Data } from './analysis/analysis.data';
import { collectionProcessing_SkillGroup_Data } from './collectionProcessing/collectionProcessing.data';
import { construction_SkillGroup_Data } from './construction/construction.data';
import { search_SkillGroup_Data } from './search/search.data';
import { sorting_SkillGroup_Data } from './sorting/sorting.data';

export const algorithms_SkillDomain_Data = buildSkillDomainConfig({
  slug: "algorithms",
  id: "da4ddcbb-6fe6-4dff-90ec-8363cfcda35d",
  name: {
    en: "Algorithms",
  },
  groups: {
    analysis: analysis_SkillGroup_Data,
    collectionProcessing: collectionProcessing_SkillGroup_Data,
    construction: construction_SkillGroup_Data,
    search: search_SkillGroup_Data,
    sorting: sorting_SkillGroup_Data,
  },
  description: {
    methodological: "Repeatable procedures for computational problems, organized by purpose: searching, sorting, collection processing, general construction, and analysis. Every named elementary algorithm has its own independent Skill; prerequisites and performance assessments may be separate skills within the same group. Concrete models can explain algorithms without imposing an age limit on the taxonomy.",
    frontend: {
      en: "Explore how to design, apply and compare repeatable methods for solving problems.",
    },
  },
});
