import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import { configuratorArrayToSlugMap, mergeForValidation } from '../../_shared__configurators';
import { defineText } from '../defineText';
import { defineCheckpoint, checkpoint_Config_Schema, checkpoint_Props_Schema } from './index';
import { defineCheckpointItem } from './defineCheckpointItem';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineCheckpoint', () => {
      const ids = Array.from({ length: 10 }, (_, i) => 'b775647f-203d-481a-a1c7-4d331c779d6' + i);
      const text = <const Slug extends string>(id: string, slug: Slug, value: string | { en: string; uk: string }) =>
        defineText({ id, slug, type: 'text', params: {}, locale: { value } });

      const makeItem = <const Slug extends string>(
        slug: Slug,
        id: string,
        questionId: string,
        answerId: string,
        value: string | { en: string; uk: string },
      ) => {
        const answer = text(answerId, 'answer', 'Invariant answer');
        return defineCheckpointItem({
          id,
          slug,
          type: 'checkpointItem',
          question: text(questionId, 'question', value),
          answer: { items: configuratorArrayToSlugMap([answer]), order: ['answer'] },
        });
      };

      const example = () => {
        const first = makeItem('first', ids[1], ids[2], ids[3], { en: 'First?', uk: 'Перше?' });
        const second = makeItem('second', ids[4], ids[5], ids[6], 'Second?');
        const checkpoint = defineCheckpoint({
          id: ids[0],
          slug: 'review',
          type: 'checkpoint',
          params: {},
          locale: { title: 'Review' },
          content: { items: configuratorArrayToSlugMap([first, second]), order: ['first', 'second'] },
        });
        return { checkpoint, first, second };
      };

      test('Checkpoint accepts valid CheckpointItem configurators without treating them as renderable ContentBlocks', () => {
        const { checkpoint, first } = example();
        assert.equal(
          checkpoint_Config_Schema.safeParse({
            id: ids[0],
            slug: 'review',
            type: 'checkpoint',
            params: {},
            locale: { title: 'Review' },
            content: { items: { first }, order: ['first'] },
          }).success,
          true,
        );
        assert.equal(checkpoint.build.props({ languages: ['en', 'uk'] }).base.content[0].type, 'checkpointItem');
      });

      test('Checkpoint publishes sorted nested Props, not authoring maps', () => {
        const { checkpoint } = example();
        const result = checkpoint.build.props({ languages: ['en', 'uk'] });
        assert.deepEqual(
          result.base.content.map(item => item.slug),
          ['first', 'second'],
        );
        assert.equal('order' in result.base, false);
        assert.equal('items' in result.base.content, false);
        assert.deepEqual(
          result.locale?.uk?.content?.map(item => item.slug),
          ['first', 'second'],
        );
        assert.equal(result.locale?.uk?.content?.[0].question.locale.value, 'Перше?');
        assert.equal(result.locale?.uk?.content?.[1].question.locale.value, 'Second?');
        assert.equal(
          checkpoint_Props_Schema.safeParse({
            ...result.base,
            content: result.locale?.uk?.content,
          }).success,
          true,
        );
        assert.equal(checkpoint_Props_Schema.safeParse({ ...result.base, content: [] }).success, false);
      });

      test('Checkpoint publishes only validated, sparse metadata overrides', () => {
        const { checkpoint } = example();
        const before = checkpoint.build.props({ languages: ['en', 'uk'] });
        assert.deepEqual(checkpoint.build.overrides({}, { languages: ['en', 'uk'] }), { base: {}, locale: undefined });
        assert.deepEqual(
          checkpoint.build.overrides(
            {
              params: { disabled: true },
              locale: { title: { uk: 'Огляд' } },
            },
            { languages: ['en', 'uk'] },
          ),
          {
            base: { params: { disabled: true } },
            locale: { uk: { locale: { title: 'Огляд' } } },
          },
        );
        assert.deepEqual(checkpoint.build.props({ languages: ['en', 'uk'] }), before);
      });

      test('Removing a localized item does not generate a redundant locale array', () => {
        const { checkpoint } = example();
        const source = checkpoint.build.props({ languages: ['en', 'uk'] });
        const patch = checkpoint.build.overrides(
          { content: { items: { first: false }, order: ['second'] } },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          patch.base.content?.map(item => item.slug),
          ['second'],
        );
        assert.equal(patch.locale, undefined);
        const resolved = mergeForValidation(mergeForValidation(source.base, source.locale?.uk as never), patch.base as never);
        assert.deepEqual(
          resolved.content.map(item => item.slug),
          ['second'],
        );
      });

      test('Checkpoint can add, disable, reorder, and deeply override existing items', () => {
        const { checkpoint } = example();
        const later = makeItem('later', ids[7], ids[8], ids[9], { en: 'Later?', uk: 'Потім?' });
        const patch = {
          content: {
            items: { first: false as const, second: { question: { locale: { value: { uk: 'Інакше?' } } } } },
            additionalItems: configuratorArrayToSlugMap([later]),
            order: ['later', 'second'] as ('later' | 'second')[],
          },
        };
        const original = checkpoint.build.props({ languages: ['en', 'uk'] });
        const built = checkpoint.build.overrides(patch, { languages: ['en', 'uk'] });
        assert.deepEqual(
          built.base.content?.map(item => item.slug),
          ['later', 'second'],
        );
        assert.deepEqual(
          built.locale?.uk?.content?.map(item => item.slug),
          ['later', 'second'],
        );
        assert.equal(built.locale?.uk?.content?.[0].question.locale.value, 'Потім?');
        assert.equal(built.locale?.uk?.content?.[1].question.locale.value, 'Інакше?');
        assert.equal(JSON.stringify(built).includes('additionalItems'), false);
        assert.equal(JSON.stringify(built).includes('"order"'), false);
        assert.deepEqual(checkpoint.build.props({ languages: ['en', 'uk'] }), original);
        assert.deepEqual(checkpoint.build.overrides(patch, { languages: ['en', 'uk'] }), built);
      });

      test('Checkpoint requires exactly all active item slugs, once each', () => {
        const { checkpoint, first } = example();
        const invalid: [unknown, RegExp][] = [
          [{ content: { order: ['first'] } }, /Missing slug: second/],
          [{ content: { order: ['first', 'second', 'unknown'] } }, /Unknown slug: unknown/],
          [{ content: { order: ['first', 'first', 'second'] } }, /Duplicate slug: first/],
          [{ content: { items: { first: false }, order: ['first', 'second'] } }, /Unknown slug: first/],
          [{ content: { items: { first: false } } }, /content.order is required/],
          [{ content: { items: { first: false, second: false }, order: [] } }, /At least one active Checkpoint item/],
          [{ content: { items: { other: false }, order: ['first', 'second'] } }, /unknown existing Checkpoint item/],
          [
            { content: { additionalItems: configuratorArrayToSlugMap([first]), order: ['first', 'second'] } },
            /Duplicate Checkpoint item slug/,
          ],
          [{ content: { additionalItems: { other: false }, order: ['first', 'second', 'other'] } }, /Checkpoint item/],
          [{ content: { additionalItems: { later: first }, order: ['first', 'second', 'later'] } }, /slug/],
          [{ content: { unexpected: true } }, /Unknown Checkpoint content override field/],
          [{ id: ids[0] }, /Unknown Checkpoint override field/],
          [{ slug: 'renamed' }, /Unknown Checkpoint override field/],
          [{ type: 'checkpoint' }, /Unknown Checkpoint override field/],
          [{ params: { typo: true } }, /Invalid Checkpoint overrides/],
          [
            { content: { items: { first: { question: { params: { disabled: true } } } } } },
            /Invalid Checkpoint Item overrides/,
          ],
        ];
        for (const [patch, message] of invalid) {
          assert.throws(() => checkpoint.build.overrides(patch as never, { languages: ['en', 'uk'] }), message);
        }
      });

      test('Checkpoint rejects invalid authored collections and preserves authored snapshots', () => {
        const { checkpoint, first, second } = example();
        const base = { id: ids[0], slug: 'bad', type: 'checkpoint' as const, params: {}, locale: { title: 'Review' } };
        assert.throws(
          () =>
            defineCheckpoint({
              ...base,
              content: { items: configuratorArrayToSlugMap([first, second]), order: ['first'] },
            }),
          /Missing slug/,
        );
        assert.throws(
          () =>
            defineCheckpoint({
              ...base,
              content: { items: { first }, order: [] },
            }),
          /At least one active Checkpoint item/,
        );
        const original = checkpoint.build.props({ languages: ['en', 'uk'] });
        checkpoint.content.order.reverse();
        checkpoint.content.items.first = checkpoint.content.items.second as never;
        const modifiedOutput = checkpoint.build.props({ languages: ['en', 'uk'] });
        modifiedOutput.base.content.reverse();
        assert.deepEqual(checkpoint.build.props({ languages: ['en', 'uk'] }), original);
      });
    });
  });
});
