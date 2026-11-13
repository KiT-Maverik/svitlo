import type { LanguageScope } from '#types';
import { defineSkill } from '../defineSkill';
import { defineSkillGroup } from './defineSkillGroup';
import { defineSkillDomain } from '../defineSkillDomain';

const id = 'b775647f-203d-481a-a1c7-4d331c779d01';
const both = defineSkill<'both', ['en', 'uk']>({
  id,
  slug: 'both',
  name: { en: 'Both', uk: 'Обидві' },
  description: { methodological: 'Compare both cases', frontend: { en: 'Both', uk: 'Обидві' } },
});
const englishOnly = defineSkill<'englishOnly', ['en']>({
  id,
  slug: 'englishOnly',
  name: { en: 'English only' },
  description: { methodological: 'English coverage', frontend: { en: 'English copy' } },
});

// Every child must cover at least all parent languages; extra child languages are valid.
const group = defineSkillGroup<'group', { both: typeof both }, ['uk']>({
  id,
  slug: 'group',
  name: { uk: 'Група' },
  description: { methodological: 'Group context' },
  skills: { items: { both }, order: ['both'] },
});
const domain = defineSkillDomain<'domain', { group: typeof group }, {}, ['uk']>({
  id,
  slug: 'domain',
  title: { uk: 'Область' },
  description: { methodological: 'Domain context' },
  groups: { items: { group }, order: ['group'] },
});

// Compile-time lower-level coverage must not widen through either Group or Domain.
defineSkillGroup<'invalidGroup', { englishOnly: typeof englishOnly }, ['en', 'uk']>({
  id,
  slug: 'invalidGroup',
  name: { en: 'Invalid', uk: 'Некоректна' },
  description: { methodological: 'Incompatible Skill language' },
  // @ts-expect-error Ukrainian is absent from the Skill language tuple.
  skills: { items: { englishOnly }, order: ['englishOnly'] },
});
defineSkillDomain<'invalidDomain', { group: typeof group }, {}, ['en', 'uk']>({
  id,
  slug: 'invalidDomain',
  title: { en: 'Invalid', uk: 'Некоректна' },
  description: { methodological: 'Incompatible Group language' },
  // @ts-expect-error The Group only supports Ukrainian, not English.
  groups: { items: { group }, order: ['group'] },
});

// Existing child patches are keyed strictly by the author's literal slug.
group.build.overrides({ skills: { items: { both: { name: { uk: 'Двоє' } } } } }, { languages: ['uk'] });
// @ts-expect-error Identity fields are not overridable.
both.build.overrides({ slug: 'altered' }, { languages: ['en', 'uk'] });
group.build.overrides(
  {
    skills: {
      items: {
        // @ts-expect-error Unknown Skill child key must be rejected at the type boundary.
        missing: { name: 'Unknown' },
      },
    },
  },
  { languages: ['uk'] },
);
defineSkill<'incomplete', ['en', 'uk']>({
  id,
  slug: 'incomplete',
  // @ts-expect-error Unsupported language cannot be omitted from a complete authored dictionary.
  name: { en: 'Incomplete' },
  description: { methodological: 'Incomplete', frontend: { en: 'Only English', uk: 'Англійська' } },
});

const scoped: LanguageScope<['uk']> = domain;
void scoped;

/** Build publication scopes are statically limited to guaranteed authoring languages. */
both.build.props({ languages: ['en', 'uk'] });
both.build.props({ languages: ['uk'] });
group.build.props({ languages: ['uk'] });
domain.build.props({ languages: ['uk'] });
both.build.overrides({ name: { en: 'Updated' } }, { languages: ['uk'] });
// @ts-expect-error Skill cannot publish an undeclared language.
both.build.props({ languages: ['de'] });
// @ts-expect-error Group's guaranteed scope is Ukrainian, despite its child's English.
group.build.props({ languages: ['en'] });
// @ts-expect-error Domain's guaranteed scope is Ukrainian.
domain.build.props({ languages: ['en'] });
// @ts-expect-error Override publication must obey the same language scope.
group.build.overrides({}, { languages: ['en'] });
// @ts-expect-error Explicit publication options are required.
both.build.props();
// @ts-expect-error Overrides require publication options as well.
both.build.overrides({});
