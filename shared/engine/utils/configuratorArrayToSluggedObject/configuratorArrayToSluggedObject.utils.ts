type SluggedConfigurator = { config: { base: { slug: string } } };

export function configuratorArrayToSluggedObject<Configurator extends SluggedConfigurator>(
  configurators: readonly Configurator[],
): Record<Configurator['config']['base']['slug'], Configurator> {
  const seen = new Set<string>();
  const entries: [string, Configurator][] = [];

  for (const configurator of configurators) {
    const slug = configurator.config.base.slug;
    if (seen.has(slug)) throw new Error(`Duplicate configurator slug: ${slug}`);
    seen.add(slug);
    entries.push([slug, configurator]);
  }

  return Object.fromEntries(entries) as Record<Configurator['config']['base']['slug'], Configurator>;
}
