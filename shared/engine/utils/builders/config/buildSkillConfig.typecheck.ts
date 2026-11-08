import type { Skill_Config } from '../../../taxonomy';
import { buildSkillConfig } from '../../../taxonomy';

const names = {} as Skill_Config['name'];
const description = { methodological: 'English conceptual boundaries.', frontend: names };

// @ts-expect-error A semantic slug is not a UUID.
buildSkillConfig({ id: 'math.multiply.by-2', name: names });

const valid = buildSkillConfig({
  slug: 'testSkill',
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  description,
});
const literalId: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb' = valid.id;
void literalId;
const collection: 'skill' = valid.collection;
void collection;

// @ts-expect-error A Skill without a description must not compile.
buildSkillConfig({ id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb', name: names });

// @ts-expect-error A partial name dictionary must not satisfy the required locales.
buildSkillConfig({ id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb', name: { uk: 'Множення на 2' } });

// @ts-expect-error A skill must have a stable identifier.
buildSkillConfig({ name: names });

// @ts-expect-error A skill must have a localized name dictionary.
buildSkillConfig({ id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb' });

buildSkillConfig({
  slug: 'testSkill',
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  description: { methodological: 'English conceptual boundaries.', frontend: names },
});

buildSkillConfig({
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  // @ts-expect-error A Skill description without frontend must not compile.
  description: { methodological: 'English' },
});

// @ts-expect-error description.methodological is required when description exists.
buildSkillConfig({ id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb', name: names, description: { frontend: names } });

buildSkillConfig({
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  description: {
    methodological: 'English',
    // @ts-expect-error A supplied frontend description cannot omit supported language keys.
    frontend: { en: 'English' },
  },
});
