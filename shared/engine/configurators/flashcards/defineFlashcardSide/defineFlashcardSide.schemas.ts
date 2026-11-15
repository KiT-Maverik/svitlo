import { z } from 'zod';
import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import type { FlashcardSide_Configurator } from './defineFlashcardSide';

type Block = ContentBlock_Configurator;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** A side is a structural ContentBlock collection, not a UUID-bearing entity. */
export const flashcardSide_Config_Schema = z.strictObject({
  items: z.record(z.string(), z.custom<Block>()),
  order: z.array(z.string()),
});
export type FlashcardSide_Config = z.infer<typeof flashcardSide_Config_Schema>;

export type FlashcardSide_Overrides<Items extends Record<string, Block>, Added extends Record<string, Block> = {}> = {
  items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
  additionalItems?: Added & { [Key in keyof Items]?: never };
  order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
};

/** Check a built side without pulling any authoring code into Engine runtime. */
export const flashcardSideConfigurator_Schema = z.custom<FlashcardSide_Configurator>(
  value =>
    isRecord(value) &&
    value.kind === 'flashcardSide' &&
    isRecord(value.items) &&
    Array.isArray(value.order) &&
    typeof value.validate === 'function' &&
    isRecord(value.build) &&
    typeof value.build.props === 'function' &&
    typeof value.build.overrides === 'function',
  { message: 'Expected defineFlashcardSide configurator' },
);
