import type { ResolveLocale } from '../index';
import type { ResolveLocale as RuntimeResolveLocale } from '../runtime';
import type { LanguageCodes } from '../schemas/languages.schemas';

type Assert<T extends true> = T;
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

const authoredValue = {
  character: 'hero',
  greeting: { en: 'Hello', uk: 'Привіт' },
  dialog: {
    emotion: 'happy',
    message: { en: 'Ready' },
  },
} as const;

type Expected = {
  readonly character: string;
  readonly greeting: string;
  readonly dialog: {
    readonly emotion: string;
    readonly message: string;
  };
};

type SceneChecks = [
  Assert<Equal<ResolveLocale<typeof authoredValue>, Expected>>,
  Assert<Equal<RuntimeResolveLocale<typeof authoredValue>, Expected>>,
  Assert<Equal<ResolveLocale<Partial<Record<LanguageCodes, string>>>, string>>,
  Assert<Equal<ResolveLocale<{ en: string; nonLocaleKey: string }>, { en: string; nonLocaleKey: string }>>,
  Assert<
    Equal<
      ResolveLocale<{ items: readonly [{ en: string }, { fixed: 'title' }] }>,
      {
        items: readonly [string, { fixed: string }];
      }
    >
  >,
];

// Ensure field-level locale leaves are strings in a component's resolved value.
declare const resolved: ResolveLocale<typeof authoredValue>;
const greeting: string = resolved.greeting;
const message: string = resolved.dialog.message;
// @ts-expect-error A resolved localized field is never a language dictionary.
const untranslated: { en: string } = resolved.greeting;

export type { SceneChecks };
