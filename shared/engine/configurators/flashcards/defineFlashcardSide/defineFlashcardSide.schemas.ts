import { z } from 'zod';

import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks/contentBlock.types';
import type { FlashcardSide_Configurator } from './defineFlashcardSide';

type Block = ContentBlock_Primitive_Configurator;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** A side has a semantic role in Flashcard, but no standalone identity. */
export const flashcardSide_Config_Schema = z.looseObject({
  children: z.array(z.string()),
});
export type FlashcardSide_Config = z.infer<typeof flashcardSide_Config_Schema>;

export type FlashcardSide_Overrides<Items extends Record<string, Block>, Added extends Record<string, Block> = {}> = {
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false } & Added & {
    [Key in Extract<keyof Added, keyof Items>]?: never;
  };

/** A built Side exposes its exact authored slug-addressable members. */
export const flashcardSideConfigurator_Schema = z.custom<FlashcardSide_Configurator>(
  value =>
    isRecord(value) &&
    value.kind === 'flashcardSide' &&
    Array.isArray(value.children) &&
    typeof value.validate === 'function' &&
    isRecord(value.build) &&
    typeof value.build.data === 'function' &&
    typeof value.build.overrides === 'function',
  { message: 'Expected defineFlashcardSide configurator' },
);
