import type { LanguageCode } from '../schemas/languages.schemas';

/**
 * A parent collection handles a child through an opaque, verified Build
 * boundary. Erase only Build *inputs* (patch and publication options) and the
 * parent-facing language scope. Retain the concrete child Build API at the
 * authoring call site; ChildrenSupporting checks that original scope there.
 *
 * Without input erasure a narrow ['en', 'uk'] Section cannot satisfy a parent
 * union advertising all languages. Without scope erasure, nested collections
 * accidentally prohibit those correctly scoped children before the parent has
 * even checked its own required languages.
 *
 * Outputs and other discriminants remain intact for runtime composition.
 */
export type ConfiguratorChild<Child> = Child extends {
  readonly build: {
    readonly data: (options: infer _DataOptions) => infer DataResult;
    readonly overrides: (patch: infer _Patch, options: infer _OverrideOptions) => infer OverrideResult;
  };
}
  ? Omit<Child, 'build' | '__svitloLanguageScope'> & {
      readonly __svitloLanguageScope: readonly LanguageCode[];
      readonly build: Omit<Child['build'], 'data' | 'overrides'> & {
        data(options: never): DataResult;
        overrides(patch: never, options: never): OverrideResult;
      };
    }
  : never;
