import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { configuratorArrayToSlugMap, mergeForValidation } from '../../../_shared__configurators';
import { UNRESOLVED_YOUTUBE_HREF } from '../../../../schemas/media.schemas';
import { defineText } from '../../primitive/defineText';
import { defineYoutube } from '../../primitive/defineYoutube';
import { defineCheckpointAnswer } from './defineCheckpointAnswer';
import { defineCheckpointItem } from './defineCheckpointItem';
import { checkpoint_Config_Schema, checkpoint_Data_Schema, defineCheckpoint } from './index';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineCheckpoint', () => {
      const ids = Array.from({ length: 10 }, (_, i) => 'b775647f-203d-481a-a1c7-4d331c779d6' + i);
      const text = <const Slug extends string>(id: string, slug: Slug, value: string | { en: string; uk: string }) =>
        defineText<Slug, ['en', 'uk']>({ id, slug, type: 'text', params: {}, locale: { value } });

      const makeItem = <const Slug extends string>(
        slug: Slug,
        id: string,
        questionId: string,
        answerId: string,
        value: string | { en: string; uk: string },
      ) => {
        const answer = text(answerId, 'answer', 'Invariant answer');
        const question = text(questionId, 'question', value);
        const compositeIdSuffix = { first: 'a', second: 'b', later: 'c' }[slug as 'first' | 'second' | 'later'];
        const answerConfigurator = defineCheckpointAnswer<'answer', { answer: typeof answer }, ['en', 'uk']>({
          id: 'b775647f-203d-481a-a1c7-4d331c779d6' + compositeIdSuffix,
          slug: 'answer',
          type: 'checkpointAnswer',
          content: { items: configuratorArrayToSlugMap([answer]), order: ['answer'] },
        });
        return defineCheckpointItem<Slug, typeof answerConfigurator, typeof question, ['en', 'uk']>({
          id,
          slug,
          type: 'checkpointItem',
          question,
          answer: answerConfigurator,
        });
      };

      const example = () => {
        const first = makeItem('first', ids[1], ids[2], ids[3], { en: 'First?', uk: 'Перше?' });
        const second = makeItem('second', ids[4], ids[5], ids[6], 'Second?');
        const checkpoint = defineCheckpoint<'review', { first: typeof first; second: typeof second }, ['en', 'uk']>({
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
        assert.equal(checkpoint.build.data({ languages: ['en', 'uk'] }).base.content[0].type, 'checkpointItem');
      });

      test('Checkpoint publishes sorted nested Props, not authoring maps', () => {
        const { checkpoint } = example();
        const result = checkpoint.build.data({ languages: ['en', 'uk'] });
        assert.deepEqual(
          result.base.content.map(item => item.slug),
          ['first', 'second'],
        );
        assert.equal(result.base.content[0]?.question.slug, 'question');
        assert.equal(result.base.content[0]?.answer[0]?.slug, 'answer');
        assert.equal('order' in result.base, false);
        assert.equal('items' in result.base.content, false);
        assert.deepEqual(
          result.locale?.uk?.content?.map(item => item.slug),
          ['first', 'second'],
        );
        assert.equal(result.locale?.uk?.content?.[0].question.locale.value, 'Перше?');
        assert.equal(result.locale?.uk?.content?.[1].question.locale.value, 'Second?');
        assert.equal(
          checkpoint_Data_Schema.safeParse({
            ...result.base,
            content: result.locale?.uk?.content,
          }).success,
          true,
        );
        assert.equal(checkpoint_Data_Schema.safeParse({ ...result.base, content: [] }).success, false);
      });

      test('direct Checkpoint Config Zod rejects non-Item child kinds', () => {
        const { checkpoint, first } = example();
        const input = {
          id: checkpoint.id,
          slug: checkpoint.slug,
          type: 'checkpoint',
          params: {},
          locale: { title: 'Review' },
          content: { items: { first }, order: ['first'] },
        };
        assert.equal(checkpoint_Config_Schema.safeParse(input).success, true);
        for (const invalid of [
          { id: ids[5], slug: 'first', type: 'carousel' },
          { id: ids[5], slug: 'first', type: 'text' },
          null,
        ]) {
          assert.equal(
            checkpoint_Config_Schema.safeParse({
              ...input,
              content: { items: { first: invalid }, order: ['first'] },
            }).success,
            false,
            'Reject non-CheckpointItem at the direct Config schema',
          );
        }
      });

      test('Checkpoint publishes only validated, sparse metadata overrides', () => {
        const { checkpoint } = example();
        const before = checkpoint.build.data({ languages: ['en', 'uk'] });
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
        assert.deepEqual(checkpoint.build.data({ languages: ['en', 'uk'] }), before);
      });

      test('Removing a localized item does not generate a redundant locale array', () => {
        const { checkpoint } = example();
        const source = checkpoint.build.data({ languages: ['en', 'uk'] });
        const patch = checkpoint.build.overrides(
          { content: { items: { first: false }, order: ['second'] } },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          patch.base.content?.map(item => item.slug),
          ['second'],
        );
        assert.equal(patch.locale, undefined);
        const resolved = mergeForValidation(
          mergeForValidation(source.base, source.locale?.uk as never),
          patch.base as never,
        );
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
        const original = checkpoint.build.data({ languages: ['en', 'uk'] });
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
        assert.deepEqual(checkpoint.build.data({ languages: ['en', 'uk'] }), original);
        assert.deepEqual(checkpoint.build.overrides(patch, { languages: ['en', 'uk'] }), built);
      });

      test('Draft mode reaches pending media inside Checkpoint Item Answer without weakening publication', () => {
        const pendingVideo = defineYoutube({
          id: 'b775647f-203d-481a-a1c7-4d331c779d70',
          slug: 'pendingVideo',
          type: 'youtube',
          params: { mode: 'link' },
          locale: { href: UNRESOLVED_YOUTUBE_HREF, label: 'Pending video' },
        });
        const answer = defineCheckpointAnswer({
          id: 'b775647f-203d-481a-a1c7-4d331c779d71',
          slug: 'answer',
          type: 'checkpointAnswer',
          content: { items: { pendingVideo }, order: ['pendingVideo'] },
        });
        const question = defineText({
          id: 'b775647f-203d-481a-a1c7-4d331c779d72',
          slug: 'question',
          type: 'text',
          params: {},
          locale: { value: 'Where is the shadow?' },
        });
        const first = defineCheckpointItem({
          id: 'b775647f-203d-481a-a1c7-4d331c779d73',
          slug: 'first',
          type: 'checkpointItem',
          question,
          answer,
        });
        const checkpoint = defineCheckpoint({
          id: 'b775647f-203d-481a-a1c7-4d331c779d74',
          slug: 'review',
          type: 'checkpoint',
          params: {},
          locale: { title: 'Review' },
          content: { items: { first }, order: ['first'] },
        });

        assert.throws(() => checkpoint.build.data({ languages: ['en'] }), /unresolved video reference/);
        const preview = checkpoint.build.data({ languages: ['en'], mode: 'draft' });
        const answerBlock = preview.base.content[0].answer[0];
        assert.equal(answerBlock.type, 'youtube');
        if (answerBlock.type !== 'youtube') throw new Error('Expected a YouTube answer block');
        assert.equal(answerBlock.locale?.href, UNRESOLVED_YOUTUBE_HREF);
        assert.equal(answerBlock.locale?.label, 'Pending video');
        assert.throws(
          () => checkpoint.build.data({ languages: ['en'], mode: 'production' }),
          /unresolved video reference/,
        );
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
            defineCheckpoint<string, { first: typeof first; second: typeof second }, ['en', 'uk']>({
              ...base,
              content: { items: configuratorArrayToSlugMap([first, second]), order: ['first'] },
            }).build.data({ languages: ['en'] }),
          /Missing slug/,
        );
        assert.throws(
          () =>
            defineCheckpoint<string, { first: typeof first }, ['en', 'uk']>({
              ...base,
              content: { items: { first }, order: [] },
            }).build.data({ languages: ['en'] }),
          /At least one active Checkpoint item/,
        );
        const original = checkpoint.build.data({ languages: ['en', 'uk'] });
        checkpoint.content.order.reverse();
        checkpoint.content.items.first = checkpoint.content.items.second as never;
        const modifiedOutput = checkpoint.build.data({ languages: ['en', 'uk'] });
        modifiedOutput.base.content.reverse();
        assert.deepEqual(checkpoint.build.data({ languages: ['en', 'uk'] }), original);
      });
    });
  });
});
