import type { ContentBlock, Entity_Creator, Locale_Languages, Section } from '@svitlo/contracts/content';
import { splitLessonValue, type SparseLessonValue } from './splitLessonValue';
import type { ContentBlockCreator, BlockLocalizationContext } from './createContentBlock';

type BlockSource<L extends Locale_Languages> =
  | ContentBlock<'data', L>
  | ContentBlockCreator<L>;

type RegularSection<L extends Locale_Languages> = Exclude<Section<'data', L>, { type: 'quiz' }>;
export type SectionSource<L extends Locale_Languages> =
  | Extract<Section<'data', L>, { type: 'quiz' }>
  | (Omit<RegularSection<L>, 'content'> & { content: readonly BlockSource<L>[] });

type Materialized<Value> = Value extends { getData(): infer Data } ? Data : Value;
export type SectionDataOf<Source> = Source extends { content: infer Blocks extends readonly unknown[] }
  ? Omit<Source, 'content'> & { content: { readonly [Index in keyof Blocks]: Materialized<Blocks[Index]> } }
  : Source;

export type SectionCreator<
  L extends Locale_Languages,
  Source extends SectionSource<L> = SectionSource<L>,
> = Entity_Creator<SectionDataOf<Source>, BlockLocalizationContext<L>, SparseLessonValue>;

/** A Quiz is a Section with parameters, never a ContentBlock. */
export function createSection<const L extends Locale_Languages>(): <const Source extends SectionSource<L>>(
  source: Source,
) => SectionCreator<L, Source>;
export function createSection<const L extends Locale_Languages>(
  source: SectionSource<L>,
): SectionCreator<L>;
export function createSection<L extends Locale_Languages>(source?: SectionSource<L>) {
  const build = <const Source extends SectionSource<L>>(input: Source): SectionCreator<L, Source> => {
    const getData = (): SectionDataOf<Source> =>
      (input.type === 'quiz'
        ? input
        : {
            ...input,
            content: input.content.map(block => ('getData' in block ? block.getData() : block)),
          }) as SectionDataOf<Source>;
    return {
      getData,
      toResource: context => splitLessonValue(getData(), context.languages),
    };
  };
  return source === undefined ? build : build(source);
}
