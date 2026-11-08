/**
 * Minimum public shape returned by every `define*` factory.
 *
 * The contract is structural: a concrete Definition may expose additional
 * entity-specific methods, but cannot omit any member below. The projections
 * are owned by the entity; `null` represents an absent locale/override patch.
 *
 * Validation result types are configurable so implementations can evolve from
 * boolean checks to diagnostic results without changing the common structure.
 */
export type Definition<
  Base,
  Locales,
  Overrides,
  SupportedLanguages,
  ConfigValidationResult = boolean,
  PropsValidationResult = boolean,
> = {
  readonly config: {
    readonly base: Base;
    readonly locales: () => Locales | null;
    readonly overrides: () => Overrides | null;
    readonly test: {
      readonly config: (supportedLanguages: SupportedLanguages) => ConfigValidationResult;
      readonly props: (props: unknown) => PropsValidationResult;
    };
  };
};
