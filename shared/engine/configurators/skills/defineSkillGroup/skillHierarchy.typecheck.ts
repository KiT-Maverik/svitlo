import type { LanguageScope } from '#types';

import { defineSkill } from '../defineSkill';
import { defineSkillDomain } from '../defineSkillDomain';
import { defineSkillGroup } from './defineSkillGroup';

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

// Every child must cover at least the parent's languages.
const group = defineSkillGroup<'group', { both: typeof both }, ['uk']>({
  id,
  slug: 'group',
  name: { uk: 'Група' },
  description: { methodological: 'Group context' },
  skills: { both },
});
const domain = defineSkillDomain<'domain', { group: typeof group }, {}, ['uk']>({
  id,
  slug: 'domain',
  title: { uk: 'Область' },
  description: { methodological: 'Domain context' },
  groups: { group },
});
defineSkillGroup<'invalidGroup', { englishOnly: typeof englishOnly }, ['en', 'uk']>({
  id,
  slug: 'invalidGroup',
  name: { en: 'Invalid', uk: 'Некоректна' },
  description: { methodological: 'Incompatible Skill language' },
  // @ts-expect-error Ukrainian is absent from the Skill language tuple.
  skills: { englishOnly },
});
defineSkillDomain<'invalidDomain', { group: typeof group }, {}, ['en', 'uk']>({
  id,
  slug: 'invalidDomain',
  title: { en: 'Invalid', uk: 'Некоректна' },
  description: { methodological: 'Incompatible Group language' },
  // @ts-expect-error The Group does not support English.
  groups: { group },
});

const scoped: LanguageScope<['uk']> = domain;
void scoped;
const knownSkill = group.skills.both;
void knownSkill;
// @ts-expect-error Unknown Skill keys cannot be accessed.
void group.skills.unknown;
// @ts-expect-error Only .skills accessor exists.
void group.skill;
// @ts-expect-error Domain has no singular .group accessor.
void domain.group;
// @ts-expect-error Skill overrides are not supported.
both.build.overrides({});
// @ts-expect-error Group overrides are not supported.
group.build.overrides({});
// @ts-expect-error Domain overrides are not supported.
domain.build.overrides({});
both.build.data({ languages: ['en', 'uk'] });
both.build.data({ languages: ['uk'] });
group.build.data({ languages: ['uk'] });
domain.build.data({ languages: ['uk'] });
// @ts-expect-error Skill cannot publish an undeclared language.
both.build.data({ languages: ['de'] });
// @ts-expect-error Group's guaranteed scope is Ukrainian.
group.build.data({ languages: ['en'] });
// @ts-expect-error Domain's guaranteed scope is Ukrainian.
domain.build.data({ languages: ['en'] });
// @ts-expect-error Explicit publication options are required.
both.build.data();
defineSkillGroup<'old', { both: typeof both }, ['uk']>({
  id,
  slug: 'old',
  name: { uk: 'Old' },
  description: { methodological: 'Old' },
  // @ts-expect-error Old ordered collection format is forbidden.
  skills: { items: { both }, order: ['both'] },
});
