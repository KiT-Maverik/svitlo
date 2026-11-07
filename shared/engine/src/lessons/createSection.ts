import type { ContentBlock, Entity_Creator, Locale_Languages, Section } from '@svitlo/contracts/content';
import { splitLessonValue, type SparseLessonValue } from './splitLessonValue';
import type { ContentBlockCreator, BlockLocalizationContext } from './createContentBlock';

type BlockSource<L extends Locale_Languages> = ContentBlock<'data', L> | ContentBlockCreator<L>;
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
> = Entity_Creator<SectionDataOf<Source>> & {
  getBase(context: BlockLocalizationContext<L>): SparseLessonValue['base'];
  getLocale(context: BlockLocalizationContext<L> & { language: L[number] }): unknown;
};

/** A Quiz is a Section with parameters, never a ContentBlock. */
export function createSection<const L extends Locale_Languages>(): <const Source extends SectionSource<L>>(
  source: Source,
) => SectionCreator<L, Source>;
export function createSection<const L extends Locale_Languages>(source: SectionSource<L>): SectionCreator<L>;
export function createSection<L extends Locale_Languages>(source?: SectionSource<L>) {
  const build = <const Source extends SectionSource<L>>(input: Source): SectionCreator<L, Source> => {
    const getData = (): SectionDataOf<Source> =>
      (input.type === 'quiz'
        ? input
        : {
            ...input,
            content: input.content.map(block => ('getData' in block ? block.getData() : block)),
          }) as SectionDataOf<Source>;
    let previous: { key: string; value: SparseLessonValue } | undefined;
    const split = (languages: L) => {
      const key = languages.join('\u0000');
      if (!previous || previous.key !== key) previous = { key, value: splitLessonValue(getData(), languages) };
      return previous.value;
    };
    return {
      getData,
      getBase: ({ languages }) => split(languages).base,
      getLocale: ({ languages, language }) => {
        if (!languages.includes(language)) throw new Error('Unsupported Section language: ' + language);
        return split(languages).locales[language] ?? {};
      },
    };
  };
  return source === undefined ? build : build(source);
}
