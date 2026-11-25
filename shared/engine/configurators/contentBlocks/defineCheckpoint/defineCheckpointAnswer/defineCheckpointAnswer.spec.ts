import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { defineText } from '../../defineText';
import { checkpointAnswer_Config_Schema, checkpointAnswer_Props_Schema, defineCheckpointAnswer } from './index';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineCheckpointAnswer', () => {
      const text = <const Slug extends string>(id: string, slug: Slug, value: string | { en: string; uk: string }) =>
        defineText<Slug, ['en', 'uk']>({
          id,
          slug,
          type: 'text',
          params: {},
          locale: { value },
        });
      const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
      const create = () => {
        const first = text(id('71'), 'first', 'Invariant');
        const second = text(id('72'), 'second', { en: 'Second', uk: 'Другий' });
        const answer = defineCheckpointAnswer<'answer', { first: typeof first; second: typeof second }, ['en', 'uk']>({
          id: id('73'),
          slug: 'answer',
          type: 'checkpointAnswer',
          content: { items: { first, second }, order: ['second', 'first'] },
        });
        return { answer, first, second };
      };

      test('validates its own identity and an ordered, nonempty collection', () => {
        const { answer, first } = create();
        assert.equal(
          checkpointAnswer_Config_Schema.safeParse({
            id: answer.id,
            slug: answer.slug,
            type: answer.type,
            content: { items: { first }, order: ['first'] },
          }).success,
          true,
        );
        assert.deepEqual(
          answer.build.props({ languages: ['en', 'uk'] }).base.content.map(x => x.slug),
          ['second', 'first'],
        );
        for (const content of [
          { items: {}, order: [] },
          { items: { first }, order: [] },
          { items: { first }, order: ['first', 'first'] },
          { items: { first }, order: ['unknown'] },
          { items: { first: { type: 'checkpoint', slug: 'first' } }, order: ['first'] },
        ]) {
          assert.throws(() =>
            defineCheckpointAnswer({
              id: id('74'),
              slug: 'bad',
              type: 'checkpointAnswer',
              content,
            } as never).build.props({ languages: ['en'] }),
          );
        }
      });

      test('publishes data-only ordered Props and separate locale fragments', () => {
        const { answer } = create();
        const built = answer.build.props({ languages: ['en', 'uk'] });
        assert.deepEqual(
          built.base.content.map(x => x.slug),
          ['second', 'first'],
        );
        assert.equal(JSON.stringify(built).includes('"items"'), false);
        assert.equal(JSON.stringify(built).includes('"order"'), false);
        assert.deepEqual(
          built.locale?.uk?.content?.map(x => x.locale),
          [{ value: 'Другий' }, { value: 'Invariant' }],
        );
        assert.deepEqual(
          built.locale?.en?.content?.map(x => x.locale),
          [{ value: 'Second' }, { value: 'Invariant' }],
        );
        assert.equal(
          checkpointAnswer_Props_Schema.safeParse({
            ...built.base,
            content: built.locale?.en?.content,
          }).success,
          true,
        );
        assert.equal(
          checkpointAnswer_Props_Schema.safeParse({
            ...built.base,
            content: [],
          }).success,
          false,
        );
      });

      test('overrides reorder, disable and add without mutating source', () => {
        const { answer } = create();
        const third = text(id('75'), 'third', { en: 'Third', uk: 'Третій' });
        const before = answer.build.props({ languages: ['en', 'uk'] });
        const patch = {
          content: {
            items: { first: false as const, second: { locale: { value: { uk: 'Змінено' } } } },
            additionalItems: { third },
            order: ['third', 'second'] as ('third' | 'second')[],
          },
        };
        const changed = answer.build.overrides(patch, { languages: ['en', 'uk'] });
        assert.deepEqual(
          changed.base.content?.map(x => x.slug),
          ['third', 'second'],
        );
        assert.deepEqual(
          changed.locale?.uk?.content?.map(x => x.locale),
          [{ value: 'Третій' }, { value: 'Змінено' }],
        );
        assert.equal(JSON.stringify(changed).includes('additionalItems'), false);
        assert.deepEqual(answer.build.props({ languages: ['en', 'uk'] }), before);
        assert.deepEqual(answer.build.overrides(patch, { languages: ['en', 'uk'] }), changed);
      });

      test('rejects unknown patches, identity mutation and invalid effective answer sets', () => {
        const { answer, first } = create();
        for (const patch of [
          { slug: 'renamed' },
          { id: id('79') },
          { content: { items: { unknown: false } } },
          { content: { items: { first: false }, order: ['second', 'first'] } },
          { content: { items: { first: false, second: false }, order: [] } },
          { content: { additionalItems: { first }, order: ['second', 'first'] } },
          { content: { order: ['second', 'second'] } },
          { content: { items: { first: { type: 'video' } } } },
        ])
          assert.throws(
            () => answer.build.overrides(patch as never, { languages: ['en', 'uk'] }),
            /Invalid Checkpoint Answer overrides/,
          );
        assert.deepEqual(answer.build.overrides({}, { languages: ['en'] }), {
          base: {},
          locale: undefined,
        });
      });
    });
  });
});
