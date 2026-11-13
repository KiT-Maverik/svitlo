import type {
  ChildSupporting,
  ChildrenSupporting,
  ConfigWithLanguages,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
  RequireLanguages,
} from './index';
import type { AllLanguageCodes } from '../schemas/languages.schemas';

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

const missingRequiredLanguage: RequireLanguages<Authored, ['en', 'uk']> = {
  // @ts-expect-error Authored locale dictionaries must include every required language.
  title: { en: 'Title' },
  nested: { label: { en: 'Label', uk: 'Мітка' } },
};

type AllLanguagesConfig = ConfigWithLanguages<{ locale: { title: { en: string } } }, AllLanguageCodes>;
const completeAllLanguages: AllLanguagesConfig = { locale: { title: 'Invariant text' } };
const missingAllLanguages: AllLanguagesConfig = {
  locale: {
    // @ts-expect-error Default full language set requires every language in a localized dictionary.
    title: { en: 'Only English' },
  },
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
const allOptions: PublicationLanguageOptions<AllLanguageCodes> = { languages: ['fr'] };
// @ts-expect-error An empty tuple advertises no languages.
const emptyOptions: PublicationLanguageOptions<[]> = { languages: ['fr'] };

type English = LanguageScope<['en']>;
type Bilingual = LanguageScope<['en', 'uk']>;
type FullScope = LanguageScope<AllLanguageCodes>;
type EmptyScope = LanguageScope<[]>;
type LanguageCompatibilityChecks = [
  Assert<Equal<ChildSupporting<['en', 'uk'], FullScope>, FullScope>>,
  Assert<Equal<ChildSupporting<['en', 'uk'], EmptyScope>, never>>,
  Assert<Equal<ChildSupporting<['en', 'uk'], English>, never>>,
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
void completeAllLanguages;
void missingAllLanguages;
void incompleteConfig;
void options;
void forbiddenOptions;
void allOptions;
void emptyOptions;
void partial;
void invalidPartial;

export type { LanguageCompatibilityChecks };
