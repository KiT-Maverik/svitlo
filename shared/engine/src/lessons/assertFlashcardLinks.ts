import {
  FLASHCARD_RELATION_TYPES,
  type FlashcardRelationType,
} from '@svitlo/contracts/content';

type LinkEntry = {
  cardId: string;
  relatedFlashcardId: string;
  type: FlashcardRelationType;
  position: 'peer' | 'source' | 'target';
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Validate two-sided, canonical Flashcard adjacency, including manually
 * authored data that did not pass through linkFlashcards().
 */
export function assertFlashcardLinks(flashcards: readonly unknown[]): void {
  const cardIds = new Set<string>();
  for (const card of flashcards) {
    if (!isRecord(card) || typeof card.id !== 'string' || !card.id || cardIds.has(card.id)) {
      throw new Error('Missing or duplicate Flashcard ID');
    }
    cardIds.add(card.id);
  }

  const groups = new Map<string, LinkEntry[]>();
  for (const card of flashcards) {
    if (!isRecord(card)) continue;
    if (card.relationships === undefined) continue; // Legacy card without links.
    if (!Array.isArray(card.relationships)) throw new Error('Flashcard relationships must be an array');
    const localIds = new Set<string>();
    for (const raw of card.relationships as unknown[]) {
      if (!isRecord(raw)) throw new Error('Invalid Flashcard relationship entry');
      const { relationshipId, relatedFlashcardId, type, position } = raw;
      if (
        typeof relationshipId !== 'string' || !relationshipId ||
        localIds.has(relationshipId) ||
        typeof relatedFlashcardId !== 'string' || !relatedFlashcardId ||
        !cardIds.has(relatedFlashcardId) || relatedFlashcardId === card.id ||
        typeof type !== 'string' ||
        !Object.hasOwn(FLASHCARD_RELATION_TYPES, type) ||
        (position !== 'peer' && position !== 'source' && position !== 'target')
      ) throw new Error('Invalid Flashcard relationship on card ' + card.id);
      const semantics = FLASHCARD_RELATION_TYPES[type as FlashcardRelationType];
      if ((semantics === 'symmetric') !== (position === 'peer')) {
        throw new Error('Flashcard relationship direction does not match type: ' + relationshipId);
      }
      localIds.add(relationshipId);
      const list = groups.get(relationshipId) ?? [];
      list.push({
        cardId: card.id as string,
        relatedFlashcardId,
        type: type as FlashcardRelationType,
        position,
      });
      groups.set(relationshipId, list);
    }
  }

  const seenSemanticEdges = new Set<string>();
  const acyclicTypes = ['prerequisite', 'partOf', 'precedes'] as const;
  const directedGraphs = new Map<string, Map<string, string[]>>();
  for (const [id, pair] of groups) {
    if (pair.length !== 2) throw new Error('Flashcard relation must be mirrored on both cards: ' + id);
    const [a, b] = pair;
    if (
      a.type !== b.type ||
      a.cardId !== b.relatedFlashcardId ||
      b.cardId !== a.relatedFlashcardId ||
      (a.position === 'peer' ? b.position !== 'peer' :
        !((a.position === 'source' && b.position === 'target') ||
          (a.position === 'target' && b.position === 'source')))
    ) throw new Error('Inconsistent mirrored Flashcard relation: ' + id);

    const source = a.position === 'target' ? b.cardId : a.cardId;
    const target = a.position === 'target' ? a.cardId : b.cardId;
    const endpoints = a.position === 'peer' ? [a.cardId, b.cardId].sort() : [source, target];
    const semanticKey = JSON.stringify([a.type, ...endpoints]);
    if (seenSemanticEdges.has(semanticKey)) throw new Error('Duplicate Flashcard semantic relation: ' + id);
    seenSemanticEdges.add(semanticKey);

    if ((acyclicTypes as readonly string[]).includes(a.type)) {
      const graph = directedGraphs.get(a.type) ?? new Map<string, string[]>();
      graph.set(source, [...(graph.get(source) ?? []), target]);
      directedGraphs.set(a.type, graph);
    }
  }

  for (const [type, graph] of directedGraphs) {
    const visited = new Set<string>();
    const active = new Set<string>();
    const check = (node: string): void => {
      if (active.has(node)) throw new Error('Cyclic Flashcard ' + type + ' relationships');
      if (visited.has(node)) return;
      active.add(node);
      for (const next of graph.get(node) ?? []) check(next);
      active.delete(node);
      visited.add(node);
    };
    for (const node of graph.keys()) check(node);
  }
}
