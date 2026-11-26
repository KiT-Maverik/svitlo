import { AsyncLocalStorage } from 'node:async_hooks';
import type { LanguageCode } from '#schemas';
import type { PublicationLanguageOptions } from '#types';

import { resolvePublicationLanguages } from './publicationLanguages.utils';

export type BuildMode = 'production' | 'draft';

export type BuildContext<
  Languages extends readonly LanguageCode[] = readonly LanguageCode[],
> = Readonly<{
  languages: PublicationLanguageOptions<Languages>['languages'];
  mode: BuildMode;
}>;

// Build-only. No authored Configurator, published Props or runtime module owns this store.
const buildScope = new AsyncLocalStorage<BuildContext>();

/** The caller owns a fresh, immutable scope. Omitted mode is always strict production. */
export const runWithBuildContext = <
  Languages extends readonly LanguageCode[],
  Result,
>(
  options: PublicationLanguageOptions<Languages>,
  operation: (context: BuildContext<Languages>) => Result,
): Result => {
  // Internal child calls reuse this exact context rather than opening a new operation.
  if (options === buildScope.getStore()) {
    return operation(options as BuildContext<Languages>);
  }

  const languages = resolvePublicationLanguages(options);
  if (options.mode !== undefined && options.mode !== 'production' && options.mode !== 'draft') {
    throw new Error('Invalid Build mode: ' + String(options.mode));
  }
  const context = Object.freeze({
    languages: Object.freeze([...languages]),
    mode: options.mode ?? 'production',
  }) as BuildContext<Languages>;
  return buildScope.run(context, () => operation(context));
};

/** Internal-only accessor: calling without a public Build operation is an error. */
export const requireBuildContext = (): BuildContext => {
  const context = buildScope.getStore();
  if (!context) throw new Error('No active Build Context; call a public build.props/overrides operation first');
  return context;
};

/**
 * Wrap ONLY the public Build entrypoints. Their existing generic signatures are
 * retained; validation, sparse overrides and entity-specific resolution stay local.
 */
export const scopeBuild = <Build extends object>(build: Build): Build => {
  const wrapped: Record<string, unknown> = { ...build };
  for (const method of ['props', 'overrides'] as const) {
    const original = (build as Record<string, unknown>)[method];
    if (typeof original !== 'function') continue;
    const invoke = original as (...args: unknown[]) => unknown;
    wrapped[method] = (...args: unknown[]) =>
      runWithBuildContext(
        args[method === 'props' ? 0 : 1] as PublicationLanguageOptions,
        () => invoke(...args),
      );
  }
  return wrapped as Build;
};

/** Compose an existing child in the caller's exact scope, without passing fields down. */
export const buildChildProps = <Resource>(
  child: { readonly build: { props: (options: never) => Resource } },
): Resource => child.build.props(requireBuildContext() as never);

/** Compose sparse child changes in the same scope; never mutate the shared child. */
export const buildChildOverrides = <Resource>(
  child: { readonly build: { overrides: (patch: never, options: never) => Resource } },
  patch: never,
): Resource => child.build.overrides(patch, requireBuildContext() as never);
