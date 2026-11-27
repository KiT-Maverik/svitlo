import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { allLanguageCodes, type LanguageCode } from '../schemas/languages.schemas';
import { defineSkill } from './skills/defineSkill/defineSkill';
import { defineSkillDomain } from './skills/defineSkillDomain/defineSkillDomain';
import { defineSkillGroup } from './skills/defineSkillGroup/defineSkillGroup';

describe('Configurators', () => {
  describe('Skills', () => {
    describe('slug inference', () => {
      const localized = Object.fromEntries(allLanguageCodes.map(code => [code, 'Localized text'])) as Record<
        LanguageCode,
        string
      >;
      const description = { methodological: 'Methodological notes', frontend: localized };
      const fields = { id: 'dbe68255-2f03-4ac9-b1e7-277dca1cd160', name: localized, description };

      test('Group and Domain expose only their literal slug-keyed child maps', () => {
        const reading = defineSkill({ ...fields, slug: 'reading' });
        const writing = defineSkill({ ...fields, id: 'dbe68255-2f03-4ac9-b1e7-277dca1cd161', slug: 'writing' });
        const numeracy = defineSkill({ ...fields, id: 'dbe68255-2f03-4ac9-b1e7-277dca1cd162', slug: 'numeracy' });
        const group = defineSkillGroup({
          ...fields,
          id: 'dbe68255-2f03-4ac9-b1e7-277dca1cd163',
          slug: 'literacy',
          skills: { writing, reading },
        });
        const domain = defineSkillDomain({
          id: 'dbe68255-2f03-4ac9-b1e7-277dca1cd164',
          slug: 'language',
          title: localized,
          description,
          groups: { literacy: group },
          skills: { numeracy },
        });
        assert.equal(group.skills.reading, reading);
        assert.equal(group.skills.writing, writing);
        assert.equal(domain.groups?.literacy, group);
        assert.equal(domain.groups?.literacy.skills.reading, reading);
        assert.equal(domain.skills?.numeracy, numeracy);
        assert.equal('skill' in group, false);
        assert.equal('group' in domain, false);
        assert.equal('skill' in domain, false);
        assert.equal('overrides' in group.build, false);
        assert.deepEqual(
          group.build.data({ languages: ['en'] }).base.skills?.map(item => item!.slug),
          ['reading', 'writing'],
        );
      });

      test('empty Domain is an invalid published classification', () => {
        const empty = defineSkillDomain({ id: fields.id, slug: 'empty', title: localized, description });
        assert.equal(empty.groups, undefined);
        assert.equal(empty.skills, undefined);
        assert.throws(() => empty.build.data({ languages: ['en'] }), /At least one Skill or SkillGroup/);
      });

      test('rejects duplicated child identity and mismatched authoring keys', () => {
        const reading = defineSkill({ ...fields, slug: 'reading' });
        const writing = defineSkill({ ...fields, slug: 'writing' }); // Same UUID: invalid.
        const group = defineSkillGroup({ ...fields, slug: 'literacy', skills: { reading, writing } });
        assert.throws(() => group.build.data({ languages: ['en'] }), /Duplicate Skill ID/);

        const invalidKey = defineSkillGroup({ ...fields, slug: 'invalid', skills: { wrong: reading } });
        assert.throws(() => invalidKey.build.data({ languages: ['en'] }), /slug|matching/i);
      });
    });
  });
});
