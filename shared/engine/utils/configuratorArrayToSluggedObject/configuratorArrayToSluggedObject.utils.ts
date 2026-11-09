type SluggedConfigurator = { readonly config: { readonly base: { readonly slug: string } } };

/**
 * Retain the relationship between each literal slug and its configurator.
 * Dynamic string slugs are optional because an arbitrary key may not exist.
 */
type SluggedConfiguratorMap<Configurator extends SluggedConfigurator> = {
  [Entry in Configurator as string extends Entry['config']['base']['slug']
    ? never
    : Entry['config']['base']['slug']]: Entry;
} & (string extends Configurator['config']['base']['slug'] ? Partial<Record<string, Configurator>> : {});

export function configuratorArrayToSluggedObject<const Configurators extends readonly SluggedConfigurator[]>(
  configurators: Configurators,
): SluggedConfiguratorMap<Configurators[number]> {
  const seen = new Set<string>();
  const entries: [string, Configurators[number]][] = [];

  for (const configurator of configurators) {
    const slug = configurator.config.base.slug;
    if (seen.has(slug)) throw new Error(`Duplicate configurator slug: ${slug}`);
    seen.add(slug);
    entries.push([slug, configurator]);
  }

  return Object.fromEntries(entries) as SluggedConfiguratorMap<Configurators[number]>;
}
