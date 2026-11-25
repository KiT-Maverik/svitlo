type ConfiguratorWithSlug = { readonly slug: string };

type SlugMap<Configurator extends ConfiguratorWithSlug> = {
  [Entry in Configurator as string extends Entry['slug'] ? never : Entry['slug']]: Entry;
} & (string extends Configurator['slug'] ? Partial<Record<string, Configurator>> : {});

/**
 * Turn a list of `define*` configurators into a map keyed by each configurator's
 * top-level `slug`. AI content authors can provide a simple list without manually
 * duplicating slugs as object keys; this helper creates the stable keyed structure
 * used by ordered collections (for example Checkpoint answers).
 *
 * Keeps literal slug keys for editor autocomplete and rejects duplicate slugs.
 */
export function configuratorArrayToSlugMap<const Configurators extends readonly ConfiguratorWithSlug[]>(
  configurators: Configurators,
): SlugMap<Configurators[number]> {
  const seen = new Set<string>();
  const entries: [string, Configurators[number]][] = [];

  for (const configurator of configurators) {
    const { slug } = configurator;
    if (typeof slug !== 'string' || !slug.length) {
      throw new Error('Configurator must have a nonempty slug');
    }
    if (seen.has(slug)) throw new Error(`Duplicate configurator slug: ${slug}`);
    seen.add(slug);
    entries.push([slug, configurator]);
  }

  return Object.fromEntries(entries) as SlugMap<Configurators[number]>;
}
