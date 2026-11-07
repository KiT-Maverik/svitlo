import type { ContentBlock, Entity_Creator, Locale_Languages } from '@svitlo/contracts/content';
import { splitLessonValue, type SparseLessonValue } from './splitLessonValue';

export type BlockLocalizationContext<L extends Locale_Languages> = { languages: L };

export type ContentBlockCreator<
  L extends Locale_Languages,
  Data extends ContentBlock<'data', L> = ContentBlock<'data', L>,
> = Entity_Creator<Data, BlockLocalizationContext<L>, SparseLessonValue>;

/** Preserve the exact authored block; the shared splitter prepares its sparse resource. */
export function createContentBlock<const L extends Locale_Languages>(): <
  const Data extends ContentBlock<'data', L>,
>(
  data: Data,
) => ContentBlockCreator<L, Data>;
export function createContentBlock<const L extends Locale_Languages>(
  data: ContentBlock<'data', L>,
): ContentBlockCreator<L>;
export function createContentBlock<L extends Locale_Languages>(data?: ContentBlock<'data', L>) {
  const build = <const Data extends ContentBlock<'data', L>>(block: Data): ContentBlockCreator<L, Data> => ({
    getData: () => block,
    toResource: context => splitLessonValue(block, context.languages),
  });
  return data === undefined ? build : build(data);
}
