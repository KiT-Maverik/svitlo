/** Standalone Skill Analytics page payload, independent of authoring Data. */
const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');

export const TEST_SKILLS_DOMAIN_SLUGS = ['testColors'] as const;

export function fixtureJsonForSkillUrl(url: string): unknown | null {
  const match = /^\/data\/pages\/skillAnalytics\/(uk|en)\.json$/.exec(url);
  if (!match) return null;
  const uk = match[1] === 'uk';
  return {
    domains: [
      {
        id: uuid(1),
        slug: 'testColors',
        collection: 'skillDomain',
        name: uk ? 'Кольори' : 'Colors',
        children: [
          {
            id: uuid(2),
            slug: 'testWarmColors',
            collection: 'skillGroup',
            name: uk ? 'Теплі кольори' : 'Warm colors',
            children: [
              {
                id: uuid(3),
                slug: 'testRed',
                collection: 'skill',
                name: uk ? 'Червоний' : 'Red',
                description: uk ? 'Розпізнавати червоний.' : 'Recognize red.',
              },
            ],
          },
        ],
      },
    ],
  };
}
