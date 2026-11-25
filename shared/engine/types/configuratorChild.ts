/**
 * A collection child must preserve its concrete Build API at the authoring site.
 *
 * TypeScript checks function parameters contravariantly: an instance whose
 * build.overrides accepts only its actual slug keys is not assignable to the
 * widened ReturnType<typeof defineX> constraint of a parent collection.
 * Erase only the *input* of overrides on the collection boundary. Parents
 * validate the child and dispatch its overrides through the Build protocol;
 * an individual defineX return value retains its precise override signature.
 *
 * All other properties, including the phantom LanguageScope, stay unchanged.
 * This prevents accidental locale widening and keeps child-kind discrimination.
 */
export type ConfiguratorChild<Child> = Child extends {
  readonly build: { readonly overrides: (patch: infer _Patch, options: infer Options) => infer Result };
}
  ? Omit<Child, 'build'> & {
      readonly build: Omit<Child['build'], 'overrides'> & {
        overrides(patch: never, options: Options): Result;
      };
    }
  : never;
