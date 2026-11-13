import type {
  ChildSupporting,
  ChildrenSupporting,
  ConfigWithLanguages,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
  RequireLanguages,
} from './index';

type Assert<Condition extends true> = Condition;
type Equal<Left, Right> = (<T>() => T extends Left ? 1 : 2) extends <T>() => T extends Right ? 1 : 2 ? true : false;

type Authored = {
  title: { en: string; uk: string };
  nested: { label: { en: string; uk: string } };
};

const required: RequireLanguages<Authored, ['en', 'uk']> = {
  title: { en: 'Title', uk: 'Назва' },
  nested: { label: { en: 'Label', uk: 'Мітка' } },
};

// @ts-expect-error Authored locale dictionaries must include every required language.
const missingRequiredLanguage: RequireLanguages<Authored, ['en', 'uk']> = {
  title: { en: 'Title' },
  nested: { label: { en: 'Label', uk: 'Мітка' } },
};

type Config = ConfigWithLanguages<{ params: { count: number }; locale: Authored }, ['en', 'uk']>;
const completeConfig: Config = {
  params: { count: 1 },
  locale: required,
};

// @ts-expect-error A Config requires the params field as well as locale data.
const incompleteConfig: Config = { locale: required };

const options: PublicationLanguageOptions<['en', 'uk']> = { languages: ['uk'] };
// @ts-expect-error A typed publication scope cannot request an unauthored language.
const forbiddenOptions: PublicationLanguageOptions<['en', 'uk']> = { languages: ['fr'] };
const unscopedOptions: PublicationLanguageOptions<[]> = { languages: ['fr'] };

type English = LanguageScope<['en']>;
type Bilingual = LanguageScope<['en', 'uk']>;
type LanguageCompatibilityChecks = [
  Assert<Equal<ChildSupporting<['en'], Bilingual>, Bilingual>>,
  Assert<Equal<ChildSupporting<['en', 'uk'], English>, never>>,
  Assert<
    Equal<ChildrenSupporting<['en'], { first: Bilingual; second: English }>, { first: Bilingual; second: English }>
  >,
  Assert<Equal<ChildrenSupporting<['en', 'uk'], { first: Bilingual; second: English }>['second'], never>>,
];

type PartialConfig = DeepPartial<{
  nested: { label: string; enabled: boolean };
  callback: (value: number) => boolean;
}>;
const partial: PartialConfig = {
  nested: { enabled: false },
  callback: (value: number) => value > 0,
};

// @ts-expect-error DeepPartial does not relax nested field value types.
const invalidPartial: PartialConfig = { nested: { enabled: 'false' } };

// Suppress unused-value warnings while preserving compile-time assertions.
void required;
void missingRequiredLanguage;
void completeConfig;
void incompleteConfig;
void options;
void forbiddenOptions;
void unscopedOptions;
void partial;
void invalidPartial;

export type { LanguageCompatibilityChecks };
