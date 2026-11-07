import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { FLASHCARD_RELATION_TYPES, type Flashcard, type Locale_Languages } from '@svitlo/contracts/content';
import { linkFlashcards, type FlashcardLink } from './linkFlashcards';

const card = (id: string): Flashcard<'data', Locale_Languages> => ({
  id,
  front: [],
  back: [],
  hint: [],
  tags: [],
  flags: [],
});

const cards = [card('alpha'), card('beta'), card('gamma')];
const edge = (
  relationshipId: string,
  type: FlashcardLink['type'],
  sourceFlashcardId = 'alpha',
  targetFlashcardId = 'beta',
): FlashcardLink => ({ relationshipId, type, sourceFlashcardId, targetFlashcardId });

describe('linkFlashcards', () => {
  it('materializes the same symmetric relationship on both endpoint IDs', () => {
    const result = linkFlashcards(cards, [edge('opposite', 'reverse')]);
    assert.deepEqual(result[0].relationships, [
      {
        relationshipId: 'opposite',
        type: 'reverse',
        relatedFlashcardId: 'beta',
        position: 'peer',
      },
    ]);
    assert.deepEqual(result[1].relationships, [
      {
        relationshipId: 'opposite',
        type: 'reverse',
        relatedFlashcardId: 'alpha',
        position: 'peer',
      },
    ]);
    assert.deepEqual(result[2].relationships, []);
    assert.equal(cards[0].relationships, undefined);
  });

  it('generates source and target roles for directed types', () => {
    const result = linkFlashcards(cards, [edge('depends-on', 'prerequisite', 'gamma', 'alpha')]);
    assert.equal(result[2].relationships?.[0].position, 'source');
    assert.equal(result[2].relationships?.[0].relatedFlashcardId, 'alpha');
    assert.equal(result[0].relationships?.[0].position, 'target');
    assert.equal(result[0].relationships?.[0].relatedFlashcardId, 'gamma');
  });

  it('allows many relations per card and different types for the same endpoints', () => {
    const result = linkFlashcards(cards, [
      edge('relation-3', 'contrast', 'alpha', 'gamma'),
      edge('relation-2', 'reverse'),
      edge('relation-1', 'equivalent'),
    ]);
    assert.deepEqual(
      result[0].relationships?.map(item => [item.relationshipId, item.type]),
      [
        ['relation-1', 'equivalent'],
        ['relation-2', 'reverse'],
        ['relation-3', 'contrast'],
      ],
    );
    assert.equal(result[1].relationships?.length, 2);
    assert.equal(result[2].relationships?.length, 1);
  });

  it('enforces canonical directionality for all nine types', () => {
    assert.equal(Object.keys(FLASHCARD_RELATION_TYPES).length, 9);
    for (const [type, semantics] of Object.entries(FLASHCARD_RELATION_TYPES)) {
      const result = linkFlashcards(cards, [edge('relation', type as FlashcardLink['type'])]);
      const expected = semantics === 'symmetric' ? 'peer' : 'source';
      assert.equal(result[0].relationships?.[0].position, expected, type);
      assert.equal(result[1].relationships?.[0].position, semantics === 'symmetric' ? 'peer' : 'target', type);
    }
  });

  it('rejects self links, unknown endpoints and duplicate identities', () => {
    assert.throws(() => linkFlashcards(cards, [edge('self', 'reverse', 'alpha', 'alpha')]), /itself/);
    assert.throws(() => linkFlashcards(cards, [edge('unknown', 'reverse', 'alpha', 'absent')]), /unknown endpoint/);
    assert.throws(() => linkFlashcards([card('alpha'), card('alpha')], []), /duplicate Flashcard ID/);
    assert.throws(
      () => linkFlashcards(cards, [edge('repeat', 'reverse'), edge('repeat', 'contrast')]),
      /duplicate Flashcard relationship ID/,
    );
  });

  it('rejects duplicate mirrored symmetric relations and duplicate directed edges', () => {
    assert.throws(
      () => linkFlashcards(cards, [edge('r1', 'reverse', 'alpha', 'beta'), edge('r2', 'reverse', 'beta', 'alpha')]),
      /Duplicate Flashcard relation/,
    );
    assert.throws(
      () =>
        linkFlashcards(cards, [
          edge('r1', 'prerequisite', 'alpha', 'beta'),
          edge('r2', 'prerequisite', 'alpha', 'beta'),
        ]),
      /Duplicate Flashcard relation/,
    );
    const result = linkFlashcards(cards, [
      edge('r1', 'prerequisite', 'alpha', 'beta'),
      edge('r2', 'prerequisite', 'beta', 'alpha'),
    ]);
    assert.equal(result[0].relationships?.length, 2);
  });

  it('rejects cards with pre-authored adjacency to preserve one canonical edge source', () => {
    const decorated = {
      ...card('alpha'),
      relationships: [
        { relationshipId: 'old', type: 'reverse' as const, relatedFlashcardId: 'beta', position: 'peer' as const },
      ],
    };
    assert.throws(() => linkFlashcards([decorated, card('beta')], []), /already has relationships/);
  });
});
