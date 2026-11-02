import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictSearchScaling_Skill_Data = buildSkillConfig({
  slug: "predictSearchScaling",
  id: "e1e1e2ea-7772-46ba-95f8-8edd0544b5ca",
  name: {
    en: "Predict Search Scaling",
  },
  description: {
    methodological: "Compare 100 and 1,000 possible positions: the binary search bound grows from 7 to 10 checks although the dataset is ten times larger; explain this through repeated approximate halving.",
    frontend: {
      en: "Understand why doubling a dataset adds only about one binary-search check.",
    },
  },
});
