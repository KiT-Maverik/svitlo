import type { LanguageCode } from '#schemas';

import { mergeForValidation } from '../_shared__configurators';
import type { Lesson_Configurator } from '../lessons/defineLesson';

type LessonPatch<Lesson extends Lesson_Configurator> = Parameters<Lesson['build']['overrides']>[0];

/**
 * One Course/Module/Chapter placement of an independently authored Lesson.
 * The patch remains plain authoring Config, never a built Props fragment.
 */
export type PlacedLesson<Lesson extends Lesson_Configurator> = Lesson & {
  readonly placement: {
    readonly source: Lesson;
    readonly patch: LessonPatch<Lesson>;
  };
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Reject functions, Configurators, prototype keys, cycles and non-JSON authored patches. */
const assertPlain = (value: unknown, trail = 'patch', seen = new Set<object>()): void => {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value)) return;
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    throw new Error('Lesson placement requires a plain JSON Config patch at ' + trail);
  }
  if (
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) !== Object.prototype &&
    Object.getPrototypeOf(value) !== null
  ) {
    throw new Error('Lesson placement requires a plain JSON Config patch at ' + trail);
  }
  seen.add(value);
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (!Object.hasOwn(value, i)) throw new Error('Sparse Lesson placement array at ' + trail);
      assertPlain(value[i], trail + '[' + i + ']', seen);
    }
  } else {
    if (Object.getOwnPropertySymbols(value).length) throw new Error('Symbol in Lesson placement patch at ' + trail);
    for (const [key, child] of Object.entries(value)) {
      if (['__proto__', 'prototype', 'constructor'].includes(key)) {
        throw new Error('Unsafe Lesson placement patch key at ' + trail + '.' + key);
      }
      assertPlain(child, trail + '.' + key, seen);
    }
  }
  seen.delete(value);
};

const merge = (base: Record<string, unknown>, patch: Record<string, unknown>) =>
  mergeForValidation<Record<string, unknown>>(base, patch);

/**
 * Attach a validated-on-Build, placement-local patch to a real imported Lesson.
 *
 * Example:
 *   shadowPractice: placeLesson(howLightMoves, {
 *     params: { sections: { allowSkipping: false } },
 *     locale: { title: { uk: 'Практика з тінями' } },
 *   })
 *
 * `build.props` resolves this placement without changing its source Lesson.
 * `build.overrides` composes an additional plain Config patch against the same
 * source and preserves the normal stateless Build validation lifecycle.
 */
export function placeLesson<const Lesson extends Lesson_Configurator>(
  source: Lesson,
  patch: LessonPatch<Lesson>,
): PlacedLesson<Lesson> {
  if (
    source?.type !== 'lesson' ||
    typeof source.build?.props !== 'function' ||
    typeof source.build?.overrides !== 'function' ||
    (isObject(source) && Object.hasOwn(source, 'placement'))
  ) {
    throw new Error('placeLesson requires an original defineLesson Configurator');
  }
  if (!isObject(patch)) throw new Error('Lesson placement patch must be a plain Config object');
  assertPlain(patch);
  const authored = structuredClone(patch);

  const composed = (additional: unknown) => {
    if (!isObject(additional)) throw new Error('Lesson placement override must be a plain Config object');
    assertPlain(additional);
    return merge(authored as Record<string, unknown>, additional);
  };

  const build = {
    props(options: Parameters<Lesson['build']['props']>[0]) {
      const original = source.build.props(options as never);
      // Delegate the *authored* patch to the original Lesson's full validation API.
      const changed = source.build.overrides(authored as never, options as never);
      const base = merge(original.base as Record<string, unknown>, changed.base as Record<string, unknown>);
      const files: Record<string, Record<string, unknown>> = {};
      for (const code of options.languages as readonly LanguageCode[]) {
        if (original.locale?.[code] === undefined && changed.locale?.[code] === undefined) continue;
        const before = merge(
          original.base as Record<string, unknown>,
          (original.locale?.[code] ?? {}) as Record<string, unknown>,
        );
        files[code] = merge(
          merge(before, changed.base as Record<string, unknown>),
          (changed.locale?.[code] ?? {}) as Record<string, unknown>,
        );
      }
      return {
        base,
        locale: Object.keys(files).length ? files : undefined,
      } as ReturnType<Lesson['build']['props']>;
    },
    overrides(additional: LessonPatch<Lesson>, options: Parameters<Lesson['build']['overrides']>[1]) {
      return source.build.overrides(composed(additional) as never, options as never);
    },
  };

  return {
    ...source,
    // Expose a separate inspection snapshot so external mutations cannot change
    // this placement's closed-over authored patch between Build calls.
    placement: { source, patch: structuredClone(authored) },
    build,
  } as PlacedLesson<Lesson>;
}
