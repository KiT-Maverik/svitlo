import type { ContentBlock, Entity_Creator, Locale_Languages } from '@svitlo/contracts/content';
import { splitLessonValue, type SparseLessonValue } from './splitLessonValue';

export type BlockLocalizationContext<L extends Locale_Languages> = { languages: L };
export type ContentBlockCreator<
  L extends Locale_Languages,
  Data extends ContentBlock<'data', L> = ContentBlock<'data', L>,
> = Entity_Creator<Data> & {
  getBase(context: BlockLocalizationContext<L>): SparseLessonValue['base'];
  getLocale(context: BlockLocalizationContext<L> & { language: L[number] }): unknown;
};

/** Preserve authored data and expose a shared base and sparse language projections. */
export function createContentBlock<const L extends Locale_Languages>(): <const Data extends ContentBlock<'data', L>>(
  data: Data,
) => ContentBlockCreator<L, Data>;
export function createContentBlock<const L extends Locale_Languages>(
  data: ContentBlock<'data', L>,
): ContentBlockCreator<L>;
export function createContentBlock<L extends Locale_Languages>(data?: ContentBlock<'data', L>) {
  const build = <const Data extends ContentBlock<'data', L>>(block: Data): ContentBlockCreator<L, Data> => {
    let previous: { key: string; value: SparseLessonValue } | undefined;
    const split = (languages: L) => {
      const key = languages.join('\u0000');
      if (!previous || previous.key !== key) previous = { key, value: splitLessonValue(block, languages) };
      return previous.value;
    };
    return {
      getData: () => block,
      getBase: ({ languages }) => split(languages).base,
      getLocale: ({ languages, language }) => {
        if (!languages.includes(language)) throw new Error('Unsupported ContentBlock language: ' + language);
        return split(languages).locales[language] ?? {};
      },
    };
  };
  return data === undefined ? build : build(data);
}
