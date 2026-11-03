import { readFileSync } from 'node:fs';
import type { ContentBlock_Map, ContentBlock_Type } from '@svitlo/contracts/content';
import type { LanguageCode } from '../../types/languages';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../types/languages';
import { localizeLessonValue, type LocaleSource } from '../generators/lessons/localizeLessonData.utils';

/**
 * Scenes intentionally have no authoring builder until their contract is refactored.
 * All other blocks are discriminated by the required Data.type property.
 */
export type BuildableContentBlockType = Exclude<ContentBlock_Type, 'scene'>;
export type BuildableContentBlockData = ContentBlock_Map<'data'>[BuildableContentBlockType];

const allowedConfigKeys = {
  text: ['styling', 'wrap'],
  markdown: [],
  checkpoint: [
    'headingLevel', 'showIndices', 'showChevron', 'showIcon',
    'indexPosition', 'iconPosition', 'chevronPosition', 'enableChecks', 'renderAsGroup',
  ],
  code: ['language'],
  audio: [],
  video: [],
  youtube: ['mode'],
  image: ['width', 'height', 'fill', 'aspectRatio', 'objectFit', 'sizes', 'unoptimized'],
  quiz: ['feedbackMode', 'grading', 'interaction', 'maxDuration', 'results'],
} as const satisfies {
  [Type in BuildableContentBlockType]: readonly (keyof ContentBlock_Map<'data'>[Type])[];
};

type OverrideKeys<Type extends BuildableContentBlockType> = (typeof allowedConfigKeys)[Type][number];

type DeepPartial<T> =
  T extends readonly unknown[] ? T :
  T extends object ? { [Key in keyof T]?: DeepPartial<T[Key]> } : T;

/** Only presentation/behavior can be changed; content, identity, and locale maps cannot. */
export type ContentBlockConfigPatch<Type extends BuildableContentBlockType> =
  [OverrideKeys<Type>] extends [never]
    ? never
    : DeepPartial<Pick<ContentBlock_Map<'data'>[Type], Extract<OverrideKeys<Type>, keyof ContentBlock_Map<'data'>[Type]>>>;

export interface ContentBlockBuilder<Type extends BuildableContentBlockType> {
  readonly type: Type;
  readonly slug: string;
  withConfig(patch: ContentBlockConfigPatch<Type>): ContentBlockBuilder<Type>;
  disable(): ContentBlockBuilder<Type>;
  build(language: LanguageCode): ContentBlock_Map<'response'>[Type] | undefined;
}

const languageCodes = DEFAULT_SUPPORTED_LANGUAGES.map(item => item.language);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone<T>(value: T): T {
  if (Array.isArray(value)) return value.map(clone) as T;
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, clone(child)])) as T;
  }
  return value;
}

function merge(original: unknown, patch: unknown): unknown {
  if (!isRecord(original) || !isRecord(patch)) return clone(patch);
  const next: Record<string, unknown> = clone(original);
  for (const [key, value] of Object.entries(patch)) {
    next[key] = merge(original[key], value);
  }
  return next;
}

function locale(
  requested: LanguageCode,
  sources: Record<string, LocaleSource>,
  path: string,
): { code: LanguageCode; isFallback?: true } {
  const fallback = Object.entries(sources).some(([pointer, source]) =>
    (path === '' || pointer.startsWith(path + '/')) && source.isFallback === true,
  );
  return fallback ? { code: requested, isFallback: true } : { code: requested };
}

function convertScreen(
  source: unknown,
  requested: LanguageCode,
  sources: Record<string, LocaleSource>,
  path: string,
): unknown {
  if (!isRecord(source)) return source;
  if (!Array.isArray(source.content)) return source;
  return {
    ...source,
    content: source.content.map((block: unknown, index: number) =>
      convertBlock(block, requested, sources, path + '/content/' + index),
    ),
  };
}

/** Convert already-localized authored Data into the canonical Response shape. */
function convertBlock(
  source: unknown,
  requested: LanguageCode,
  sources: Record<string, LocaleSource>,
  path: string,
): Record<string, unknown> {
  if (!isRecord(source) || typeof source.type !== 'string') {
    throw new Error('Content blocks must declare a type');
  }
  if (source.type === 'scene') {
    throw new Error('Scene content block builds are not supported yet');
  }

  const response: Record<string, unknown> = {
    ...source,
    locale: locale(requested, sources, path),
  };
  delete response.slug;

  switch (source.type) {
    case 'markdown':
      response.text = response.locales;
      delete response.locales;
      break;
    case 'code':
      if (typeof response.fileLocation === 'string') {
        response.code = readFileSync(response.fileLocation, 'utf8');
        delete response.fileLocation;
      }
      break;
    case 'checkpoint':
      if (!Array.isArray(source.items)) throw new Error('Checkpoint requires items');
      response.items = source.items.map((item: unknown, index: number) => {
        if (!isRecord(item) || !Array.isArray(item.answer)) {
          throw new Error('Checkpoint item requires an answer array');
        }
        return {
          ...item,
          answer: item.answer.map((block: unknown, childIndex: number) =>
            convertBlock(block, requested, sources, path + '/items/' + index + '/answer/' + childIndex),
          ),
        };
      });
      break;
    case 'quiz': {
      if (!isRecord(source.questions)) throw new Error('Quiz requires a question catalog');
      response.questionSlugs = Object.values(source.questions).map(question => {
        if (!isRecord(question) || typeof question.slug !== 'string') {
          throw new Error('Quiz questions must have slugs');
        }
        return question.slug;
      });
      delete response.questions;
      const screen = source.screen;
      if (isRecord(screen)) {
        const screens: Record<string, unknown> = { ...screen };
        if (screen.starting !== undefined) {
          screens.starting = convertScreen(screen.starting, requested, sources, path + '/screen/starting');
        }
        if (isRecord(screen.ending)) {
          const ending: Record<string, unknown> = { ...screen.ending };
          for (const name of ['success', 'fail', 'retry'] as const) {
            if (ending[name] !== undefined) {
              ending[name] = convertScreen(ending[name], requested, sources, path + '/screen/ending/' + name);
            }
          }
          screens.ending = ending;
        }
        response.screen = screens;
      }
      break;
    }
  }
  return response;
}

function makeBuilder<Type extends BuildableContentBlockType>(
  authored: ContentBlock_Map<'data'>[Type],
  disabled: boolean,
): ContentBlockBuilder<Type> {
  const data = clone(authored);
  return {
    type: data.type as Type,
    slug: data.slug,
    withConfig(patch) {
      if (!isRecord(patch)) throw new TypeError('Content block config patch must be an object');
      const allowed: readonly string[] = allowedConfigKeys[data.type as BuildableContentBlockType];
      for (const key of Object.keys(patch)) {
        if (!allowed.includes(key)) {
          throw new TypeError('Cannot override content block field: ' + key);
        }
      }
      return makeBuilder(merge(data, patch) as ContentBlock_Map<'data'>[Type], disabled);
    },
    disable() {
      return makeBuilder(data, true);
    },
    build(language) {
      if (disabled) return undefined;
      const { value, sources } = localizeLessonValue(data, language, languageCodes);
      return convertBlock(value, language, sources, '') as ContentBlock_Map<'response'>[Type];
    },
  };
}

/** Create a reusable, immutable, type-discriminated authoring block. */
export function createContentBlock<const Data extends BuildableContentBlockData>(
  data: Data,
): ContentBlockBuilder<Data['type']> {
  return makeBuilder<Data['type']>(data as unknown as ContentBlock_Map<'data'>[Data['type']], false);
}
