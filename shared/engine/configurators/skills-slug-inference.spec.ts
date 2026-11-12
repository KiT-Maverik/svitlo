import assert from 'node:assert/strict';
import test from 'node:test';

import { allLanguageCodes, type LanguageCodes } from '../schemas/languages.schemas';
import { defineSkill } from './skills/defineSkill/defineSkill';
import { defineSkillGroup } from './skills/defineSkillGroup/defineSkillGroup';
import { defineSkillDomain } from './skills/defineSkillDomain/defineSkillDomain';

const localized = Object.fromEntries(allLanguageCodes.map(code => [code, 'Localized text'])) as Record<
  LanguageCodes,
  string
>;

const description = { methodological: 'Methodological notes', frontend: localized };
const fields = {
  id: 'dbe68255-2f03-4ac9-b1e7-277dca1cd160',
  name: localized,
  description,
};

test('SkillGroup and SkillDomain index actual child configurators by their slug', () => {
  const reading = defineSkill({ ...fields, slug: 'reading' });
  const writing = defineSkill({ ...fields, slug: 'writing' });
  const numeracy = defineSkill({ ...fields, slug: 'numeracy' });
  const group = defineSkillGroup({ ...fields, slug: 'literacy', skills: { items: { reading, writing }, order: ['reading','writing'] } });
  const domain = defineSkillDomain({
    id: fields.id,
    slug: 'language',
    title: localized,
    description,
    groups: { items: { literacy: group }, order: ['literacy'] },
    skills: { items: { numeracy }, order: ['numeracy'] },
  });

  assert.equal(reading.config.base.slug, 'reading');
  assert.equal(group.config.base.slug, 'literacy');
  assert.equal(domain.config.base.slug, 'language');
  assert.deepEqual(Object.keys(group.skill), ['reading', 'writing']);
  assert.equal(group.skill.reading, reading);
  assert.equal(group.skill.writing, writing);
  assert.deepEqual(Object.keys(domain.group), ['literacy']);
  assert.equal(domain.group.literacy, group);
  assert.equal(domain.group.literacy.skill.reading, reading);
  assert.deepEqual(Object.keys(domain.skill), ['numeracy']);
  assert.equal(domain.skill.numeracy, numeracy);
});

test('missing optional SkillDomain children produce empty maps', () => {
  const domain = defineSkillDomain({
    id: fields.id,
    slug: 'empty',
    title: localized,
    description,
  });
  assert.deepEqual(domain.group, {});
  assert.deepEqual(domain.skill, {});
});

test('nested Skill and SkillGroup collections still reject duplicate slugs', () => {
  const reading = defineSkill({ ...fields, slug: 'reading' });
  const group = defineSkillGroup({ ...fields, slug: 'literacy', skills: { items: { reading }, order: ['reading'] } });
  assert.throws(
    () => defineSkillGroup({ ...fields, slug: 'duplicateGroup', skills: { items: { reading }, order: ['reading','reading'] } }),
    /duplicate|appears|order/i,
  );
  assert.throws(
    () =>
      defineSkillDomain({ id: fields.id, slug: 'duplicates', title: localized, description, groups: { items: { literacy: group }, order: ['literacy','literacy'] } }),
    /duplicate|appears|order/i,
  );
  assert.throws(
    () =>
      defineSkillDomain({
        id: fields.id,
        slug: 'duplicates',
        title: localized,
        description,
        skills: { items: { reading }, order: ['reading','reading'] },
      }),
    /duplicate|appears|order/i,
  );
});
