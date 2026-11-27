/** Representative already-localized props received by browser components. */
import type { SkillNode } from './skillsMindMap.utils';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');

export const TEST_SKILL_NODES_UK: readonly SkillNode[] = [
  {
    id: uuid(1),
    slug: 'testColors',
    kind: 'skillDomain',
    name: 'Кольори',
    children: [
      {
        id: uuid(2),
        slug: 'testWarmColors',
        kind: 'skillGroup',
        name: 'Теплі кольори',
        children: [
          {
            id: uuid(3),
            slug: 'testRed',
            kind: 'skill',
            name: 'Червоний',
            description: 'Розпізнавати червоний.',
            children: [],
          },
        ],
      },
    ],
  },
];
