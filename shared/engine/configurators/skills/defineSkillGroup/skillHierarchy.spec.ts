import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { mergeForValidation } from '../../_shared__configurators';
import { defineSkill, skill_Data_Schema } from '../defineSkill';
import { defineSkillDomain } from '../defineSkillDomain';
import { defineSkillGroup } from './defineSkillGroup';

describe('Configurators', () => {
  describe('Skills', () => {
    const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
    const balance = defineSkill<'balance', ['en', 'uk']>({
      id: id('01'),
      slug: 'balance',
      name: { en: 'Balance', uk: 'Рівновага' },
      description: {
        methodological: 'Explain balance as a relation among forces.',
        frontend: { en: 'Balance forces', uk: 'Урівноваж сили' },
      },
    });
    const motion = defineSkill<'motion', ['en', 'uk']>({
      id: id('02'),
      slug: 'motion',
      name: 'Motion',
      description: {
        methodological: 'Explain changes of position.',
        frontend: { en: 'Describe movement', uk: 'Опиши рух' },
      },
    });
    const group = defineSkillGroup<'mechanics', { balance: typeof balance; motion: typeof motion }, ['uk']>({
      id: id('03'),
      slug: 'mechanics',
      name: { uk: 'Механіка', en: 'Mechanics' },
      description: { methodological: 'Basic mechanics' },
      // Deliberately reverse authoring order: published resources sort by slug.
      skills: { motion, balance },
    });
    const domain = defineSkillDomain<'physics', { mechanics: typeof group }, {}, ['uk']>({
      id: id('04'),
      slug: 'physics',
      title: { en: 'Physics', uk: 'Фізика' },
      description: { methodological: 'Natural science' },
      groups: { mechanics: group },
    });

    test('Skill publishes validated locale files and preserves methodological identity', () => {
      const result = balance.build.data({ languages: ['en', 'uk'] });
      assert.equal(result.base.id, id('01'));
      assert.equal(result.base.slug, 'balance');
      assert.deepEqual(result.base.description, { methodological: 'Explain balance as a relation among forces.' });
      assert.deepEqual(result.locale?.uk, {
        name: 'Рівновага',
        description: { frontend: 'Урівноваж сили' },
      });
      assert.equal(result.locale?.en?.name, 'Balance');
      assert.equal(skill_Data_Schema.safeParse(mergeForValidation(result.base, result.locale?.uk ?? {})).success, true);
      assert.equal('overrides' in balance.build, false);
    });

    test('SkillGroup has one direct map accessor and deterministically publishes child arrays', () => {
      assert.strictEqual(group.skills.balance, balance);
      assert.strictEqual(group.skills.motion, motion);
      assert.equal('skill' in group, false);
      assert.equal('items' in group.skills, false);
      assert.equal('order' in group.skills, false);
      assert.equal('overrides' in group.build, false);
      const resource = group.build.data({ languages: ['uk'] });
      assert.deepEqual(
        resource.base.skills?.map(item => item!.slug),
        ['balance', 'motion'],
      );
      assert.deepEqual(
        resource.locale?.uk?.skills?.map(item => item!.name),
        ['Рівновага', 'Motion'],
      );
      assert.equal(JSON.stringify(resource).includes('"items"'), false);
    });

    test('Group catches duplicate UUIDs and mismatched authoring keys', () => {
      const duplicateId = defineSkill<'duplicate', ['en', 'uk']>({
        id: id('01'),
        slug: 'duplicate',
        name: { en: 'Duplicate', uk: 'Дублікат' },
        description: { methodological: 'Duplicate', frontend: { en: 'Duplicate', uk: 'Дублікат' } },
      });
      const duplicates = defineSkillGroup<
        'duplicates',
        { balance: typeof balance; duplicate: typeof duplicateId },
        ['uk']
      >({
        id: id('05'),
        slug: 'duplicates',
        name: { en: 'Duplicates', uk: 'Дублікати' },
        description: { methodological: 'Cannot duplicate IDs' },
        skills: { balance, duplicate: duplicateId },
      });
      assert.throws(() => duplicates.build.data({ languages: ['uk'] }), /Duplicate Skill ID/);
      const mismatch = defineSkillGroup<'mismatch', { wrongKey: typeof balance }, ['uk']>({
        id: id('06'),
        slug: 'mismatch',
        name: { en: 'Mismatch', uk: 'Невідповідність' },
        description: { methodological: 'Invalid key' },
        skills: { wrongKey: balance },
      });
      assert.throws(() => mismatch.build.data({ languages: ['uk'] }), /slug|identity|match/i);
    });

    test('Domain publishes nested Groups and directly attached Skills without authoring collections', () => {
      const direct = defineSkill<'direct', ['en', 'uk']>({
        id: id('07'),
        slug: 'direct',
        name: { en: 'Direct', uk: 'Прямий' },
        description: { methodological: 'Direct Skill', frontend: { en: 'Direct', uk: 'Прямий' } },
      });
      const mixed = defineSkillDomain<'mixed', { mechanics: typeof group }, { direct: typeof direct }, ['uk']>({
        id: id('08'),
        slug: 'mixed',
        title: { en: 'Mixed', uk: 'Змішана' },
        description: { methodological: 'Mixed hierarchy' },
        groups: { mechanics: group },
        skills: { direct },
      });
      assert.equal('group' in mixed, false);
      assert.equal('skill' in mixed, false);
      assert.equal('overrides' in mixed.build, false);
      assert.strictEqual(mixed.groups?.mechanics, group);
      assert.strictEqual(mixed.skills?.direct, direct);
      const published = mixed.build.data({ languages: ['uk'] });
      assert.deepEqual(
        published.base.skills?.map(x => x!.slug),
        ['direct'],
      );
      assert.deepEqual(
        published.base.groups?.map(x => x!.slug),
        ['mechanics'],
      );
      assert.deepEqual(
        published.locale?.uk?.groups?.[0]?.skills?.map(x => x!.name),
        ['Рівновага', 'Motion'],
      );
      assert.equal(JSON.stringify(published).includes('"order"'), false);
      const standalone = defineSkillDomain<'standalone', {}, { direct: typeof direct }, ['uk']>({
        id: id('09'),
        slug: 'standalone',
        title: { en: 'Standalone', uk: 'Окремий' },
        description: { methodological: 'Standalone hierarchy' },
        skills: { direct },
      });
      assert.deepEqual(
        standalone.build.data({ languages: ['uk'] }).base.skills?.map(x => x!.slug),
        ['direct'],
      );
      assert.equal(standalone.build.data({ languages: ['uk'] }).base.groups, undefined);
    });

    test('Domain rejects child slug collisions across group and direct Skill maps', () => {
      const collidingSkill = defineSkill<'mechanics', ['en', 'uk']>({
        id: id('10'),
        slug: 'mechanics',
        name: { en: 'Mechanics', uk: 'Механіка' },
        description: { methodological: 'Collision', frontend: { en: 'Collision', uk: 'Колізія' } },
      });
      const collisions = defineSkillDomain<
        'collisions',
        { mechanics: typeof group },
        { mechanics: typeof collidingSkill },
        ['uk']
      >({
        id: id('11'),
        slug: 'collisions',
        title: { en: 'Collisions', uk: 'Колізії' },
        description: { methodological: 'Collision domain' },
        skills: { mechanics: collidingSkill },
        groups: { mechanics: group },
      });
      assert.throws(() => collisions.build.data({ languages: ['uk'] }), /Duplicate Domain child slug/);
    });

    test('Explicit language scope propagates through Skill, Group and Domain', () => {
      assert.deepEqual(Object.keys(balance.build.data({ languages: ['uk'] }).locale ?? {}), ['uk']);
      assert.deepEqual(Object.keys(group.build.data({ languages: ['uk'] }).locale ?? {}), ['uk']);
      assert.deepEqual(Object.keys(domain.build.data({ languages: ['uk'] }).locale ?? {}), ['uk']);
      assert.throws(() => balance.build.data({ languages: ['de'] } as never), /Required|expected|Invalid/i);
      assert.throws(() => balance.build.data({ languages: [] }), /nonempty languages/);
      assert.throws(() => balance.build.data({ languages: ['uk', 'uk'] }), /unique/);
      assert.throws(() => balance.build.data({ languages: ['invalid'] } as never), /Invalid/i);
    });
  });
});
