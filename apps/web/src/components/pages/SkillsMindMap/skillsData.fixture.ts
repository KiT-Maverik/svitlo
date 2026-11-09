/** Representative published textbook-wide base and sparse locale Skills fixtures. */
const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');

export const TEST_SKILLS_DOMAIN_SLUGS = ['testColors'] as const;

export function fixtureJsonForSkillUrl(url: string): unknown | null {
  if (url === '/data/skills/base.json') {
    return {
      testColors: {
        id: uuid(1),
        collection: 'skillDomain',
        description: { methodological: 'Learn to recognize colors.' },
        groups: {
          testWarmColors: {
            id: uuid(2),
            collection: 'skillGroup',
            description: { methodological: 'Recognize warm colors.' },
            skills: {
              testRed: {
                id: uuid(3),
                collection: 'skill',
                description: { methodological: 'Recognize red accurately.' },
              },
            },
          },
        },
      },
    };
  }
  const match = /^\/data\/skills\/(uk|en)\.json$/.exec(url);
  if (!match) return null;
  const uk = match[1] === 'uk';
  return {
    testColors: {
      title: uk ? 'Кольори' : 'Colors',
      groups: {
        testWarmColors: {
          name: uk ? 'Теплі кольори' : 'Warm colors',
          skills: {
            testRed: {
              name: uk ? 'Червоний' : 'Red',
              description: { frontend: uk ? 'Розпізнавати червоний.' : 'Recognize red.' },
            },
          },
        },
      },
    },
  };
}

/** Representative already-localized props received by browser components. */
import type { SkillNode } from './skillsMindMap.utils';
export const TEST_SKILL_NODES_UK: readonly SkillNode[] = [
  {
    id: uuid(1),
    slug: 'testColors',
    kind: 'skillDomain',
    name: 'Кольори',
    children: [{
      id: uuid(2),
      slug: 'testWarmColors',
      kind: 'skillGroup',
      name: 'Теплі кольори',
      children: [{
        id: uuid(3), slug: 'testRed', kind: 'skill',
        name: 'Червоний', description: 'Розпізнавати червоний.', children: [],
      }],
    }],
  },
];
