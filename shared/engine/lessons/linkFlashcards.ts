import {
  FLASHCARD_RELATION_TYPES,
  type Flashcard,
  type FlashcardRelation,
  type FlashcardRelationType,
  type Locale_Languages,
} from '+@svitlo/contracts/content';

/** Canonical authored edge: supplied exactly once, then mirrored onto both Flashcards. */
export type FlashcardLink = {
  relationshipId: string;
  type: FlashcardRelationType;
  sourceFlashcardId: string;
  targetFlashcardId: string;
};

/**
 * Materialize a canonical set of relations into two-sided card adjacency.
 *
 * For a symmetric type both endpoints are peers. For a directed type the source
 * endpoint is "source" and the target endpoint is "target". A card can have
 * multiple links of different types, including multiple links to the same card.
 * Existing relationships are rejected: this function is the single edge owner.
 */
export function linkFlashcards<L extends Locale_Languages>(
  flashcards: readonly Flashcard<'data', L>[],
  links: readonly FlashcardLink[],
): Flashcard<'data', L>[] {
  const byId = new Map<string, Flashcard<'data', L>>();
  for (const card of flashcards) {
    if (!card.id || byId.has(card.id)) throw new Error('Missing or duplicate Flashcard ID: ' + card.id);
    if (card.relationships?.length) throw new Error('Flashcard already has relationships: ' + card.id);
    byId.set(card.id, card);
  }

  const graph = new Map<string, FlashcardRelation[]>(flashcards.map(card => [card.id, []]));
  const seenIds = new Set<string>();
  const seenEdges = new Set<string>();
  for (const link of links) {
    const { relationshipId, type, sourceFlashcardId, targetFlashcardId } = link;
    if (!relationshipId || seenIds.has(relationshipId))
      throw new Error('Missing or duplicate Flashcard relationship ID: ' + relationshipId);
    seenIds.add(relationshipId);
    const semantics = FLASHCARD_RELATION_TYPES[type];
    if (!semantics) throw new Error('Unsupported Flashcard relation type: ' + type);
    if (!byId.has(sourceFlashcardId) || !byId.has(targetFlashcardId))
      throw new Error('Flashcard relationship has an unknown endpoint: ' + relationshipId);
    if (sourceFlashcardId === targetFlashcardId)
      throw new Error('Flashcard cannot be related to itself: ' + relationshipId);

    const endpoints =
      semantics === 'symmetric'
        ? [sourceFlashcardId, targetFlashcardId].sort()
        : [sourceFlashcardId, targetFlashcardId];
    const edgeKey = JSON.stringify([type, ...endpoints]);
    if (seenEdges.has(edgeKey)) throw new Error('Duplicate Flashcard relation: ' + relationshipId);
    seenEdges.add(edgeKey);

    graph.get(sourceFlashcardId)!.push({
      relationshipId,
      type,
      relatedFlashcardId: targetFlashcardId,
      position: semantics === 'symmetric' ? 'peer' : 'source',
    });
    graph.get(targetFlashcardId)!.push({
      relationshipId,
      type,
      relatedFlashcardId: sourceFlashcardId,
      position: semantics === 'symmetric' ? 'peer' : 'target',
    });
  }

  return flashcards.map(card => ({
    ...card,
    relationships: graph.get(card.id)!.sort((a, b) => a.relationshipId.localeCompare(b.relationshipId)),
  }));
}
