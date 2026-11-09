import { z } from 'zod';
import { defineStructured, localizedText, uuid, resolvedProps } from './structured';
import type { DefinitionLanguages } from './structured';
import { contentBlockChild_Schema } from './contentBlocks';

const flags = <L extends DefinitionLanguages>(l: L) =>
  z.discriminatedUnion('type', [
    z.strictObject({ type: z.literal('list'), count: z.number().int().nonnegative() }),
    z.strictObject({ type: z.literal('warning') }),
    z.strictObject({ type: z.literal('acronym'), value: localizedText(l) }),
    z.strictObject({
      type: z.literal('custom'),
      value: localizedText(l),
      color: z.enum(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      icon: z.enum(['list', 'warning', 'acronym', 'info', 'star', 'bookmark', 'lightbulb', 'code', 'check']).optional(),
    }),
  ]);
export const flashcardSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    type: z.literal('flashcard'),
    id: uuid,
    isDefault: z.literal(true).optional(),
    front: z.array(contentBlockChild_Schema),
    back: z.array(contentBlockChild_Schema),
    hint: z.array(contentBlockChild_Schema),
    tags: z.array(z.string()),
    flags: z.array(flags(l)),
    relationships: z
      .array(
        z.strictObject({
          relationshipId: z.string(),
          type: z.enum([
            'reverse',
            'equivalent',
            'contrast',
            'complementary',
            'prerequisite',
            'partOf',
            'exampleOf',
            'causes',
            'precedes',
          ]),
          relatedFlashcardId: z.string(),
          position: z.enum(['peer', 'source', 'target']),
        }),
      )
      .optional(),
  });
export function defineFlashcard<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof flashcardSchema<L>>>,
) {
  return defineStructured('flashcard', source, flashcardSchema<L>, resolvedProps('flashcard'), ['flags.*.value']);
}
