import { describe, expect, it } from 'vitest';
import {
  assemblePublishedSkillNode,
  expandableSkillIds,
  fitMindMapZoom,
  fitVisibleSkillNodes,
  flattenSkillNodes,
  layoutSkillMindMap,
  mockSkillMastery,
  skillLearningHref,
  parsePublishedSkillMeta,
  parsePublishedSkillCopy,
} from './skillsMindMap.utils';
import type { SkillNode, SkillNodeKind } from './skillsMindMap.utils';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');

function node(n: number, slug: string, kind: SkillNodeKind, children: SkillNode[] = []): SkillNode {
  const groups = children.filter(child => child.kind === 'skillGroup').map(child => child.slug);
  const skills = children.filter(child => child.kind === 'skill').map(child => child.slug);
  const rawMeta = {
    id: uuid(n),
    collection: kind,
    ...(kind === 'skillDomain' && groups.length ? { groups } : {}),
    ...(kind !== 'skill' && skills.length ? { skills } : {}),
  };
  const meta = parsePublishedSkillMeta(rawMeta, kind);
  const copy = parsePublishedSkillCopy(
    { name: slug, ...(kind === 'skill' ? { description: 'About ' + slug } : {}) },
    kind,
  );
  return assemblePublishedSkillNode(meta, copy, slug, children);
}

const sample = (): SkillNode =>
  node(1, 'testColors', 'skillDomain', [
    node(2, 'warm', 'skillGroup', [node(3, 'red', 'skill'), node(4, 'orange', 'skill')]),
    node(5, 'cool', 'skillGroup', [node(6, 'blue', 'skill'), node(7, 'green', 'skill')]),
  ]);

describe('Skills split published data contract', () => {
  it('reconstructs a Domain-Group-Skill tree without a manifest or nested entity copies', () => {
    const domain = sample();
    expect(domain.children).toHaveLength(2);
    expect(domain.children[0].children).toHaveLength(2);
    expect(flattenSkillNodes([domain])).toHaveLength(7);
    expect(expandableSkillIds([domain])).toEqual([uuid(1), uuid(2), uuid(5)]);
  });

  it('separates identity and collection from localized name and description', () => {
    const metadata = parsePublishedSkillMeta({ id: uuid(3), collection: 'skill' }, 'skill');
    const localized = parsePublishedSkillCopy({ name: 'Red', description: 'Recognize red.' }, 'skill');
    expect(assemblePublishedSkillNode(metadata, localized, 'red', [])).toEqual({
      id: uuid(3),
      slug: 'red',
      kind: 'skill',
      name: 'Red',
      description: 'Recognize red.',
      children: [],
    });
  });

  it('rejects metadata/localization duplication, missing data and wrong entity types', () => {
    expect(() => parsePublishedSkillMeta({ id: uuid(1), collection: 'skill', slug: 'red' }, 'skill')).toThrow(
      /Зайві поля/,
    );
    expect(() => parsePublishedSkillMeta({ id: uuid(1), collection: 'skill' }, 'skillDomain')).toThrow(/Collection/);
    expect(() => parsePublishedSkillMeta({ id: uuid(1), collection: 'skillGroup', skills: [] }, 'skillGroup')).toThrow(
      /Порожня група/,
    );
    expect(() => parsePublishedSkillCopy({ name: 'Red', language: 'en', description: 'red' }, 'skill')).toThrow(
      /Зайві поля/,
    );
    expect(() => parsePublishedSkillCopy({ name: 'Red' }, 'skill')).toThrow(/фронтенд-опису/);
    expect(() => parsePublishedSkillCopy({ name: { en: 'Red' }, description: 'red' }, 'skill')).toThrow(
      /Некоректне поле/,
    );
  });

  it('supports direct Skills alongside grouped Skills in one Domain', () => {
    const groups = sample().children;
    const mixed = node(8, 'mixed', 'skillDomain', [...groups, node(9, 'violet', 'skill')]);
    expect(mixed.children.map(child => child.kind)).toEqual(['skillGroup', 'skillGroup', 'skill']);
    expect(flattenSkillNodes([mixed])).toHaveLength(8);
  });

  it('rejects child slug mismatches rather than inferring content from incorrect paths', () => {
    const meta = parsePublishedSkillMeta(
      {
        id: uuid(1),
        collection: 'skillDomain',
        groups: ['warm'],
      },
      'skillDomain',
    );
    expect(() => assemblePublishedSkillNode(meta, { name: 'Colors' }, 'colors', [])).toThrow(/структура/);
    expect(() => assemblePublishedSkillNode(meta, { name: 'Colors' }, 'colors', [node(3, 'wrong', 'skill')])).toThrow(
      /структура/,
    );
  });
});

describe('Radial Skills layout', () => {
  it('places every visible node and a connector on concentric rings', () => {
    const layout = layoutSkillMindMap([sample()], new Set());
    expect(layout.nodes).toHaveLength(7);
    expect(layout.edges).toHaveLength(7);
    expect(layout.nodes.every(node => Number.isFinite(node.x) && Number.isFinite(node.y))).toBe(true);
    const radii = layout.nodes.map(node => Math.hypot(node.x, node.y));
    expect(radii[0]).toBeLessThan(radii[1]);
    expect(radii[1]).toBeLessThan(radii[2]);
    expect(layout.worldSize).toBeGreaterThan(0);
    expect(fitMindMapZoom(layout, 1100, 660)).toBeGreaterThan(0);
  });

  it('hides descendants of one collapsed Group without hiding siblings', () => {
    const domain = sample();
    const layout = layoutSkillMindMap([domain], new Set([uuid(2)]));
    expect(layout.nodes.map(node => node.slug)).toEqual(['testColors', 'warm', 'cool', 'blue', 'green']);
    expect(layout.nodes.find(node => node.slug === 'warm')?.expanded).toBe(false);
    expect(layout.nodes.find(node => node.slug === 'cool')?.expanded).toBe(true);
  });

  it('preserves Domain nodes when the entire tree is collapsed', () => {
    const domain = sample();
    const layout = layoutSkillMindMap([domain], new Set(expandableSkillIds([domain])));
    expect(layout.nodes).toHaveLength(1);
    expect(layout.nodes[0].kind).toBe('skillDomain');
  });

  it('rejects duplicate entity IDs rather than merging unrelated nodes', () => {
    expect(() => flattenSkillNodes([sample(), sample()])).toThrow(/UUID/);
  });
});

describe('Preview Skill mastery and learning CTA', () => {
  it('returns a stable integer from 0 to 100 for each UUID, independent of language', () => {
    const ids = Array.from({ length: 14 }, (_, index) => uuid(index + 1));
    const values = ids.map(mockSkillMastery);
    expect(values.every(score => Number.isInteger(score) && score >= 0 && score <= 100)).toBe(true);
    expect(new Set(values).size).toBeGreaterThan(5);
    expect(ids.map(mockSkillMastery)).toEqual(values);
    expect(mockSkillMastery(uuid(3))).toBe(mockSkillMastery(uuid(3)));
    expect(() => mockSkillMastery('not-a-uuid')).toThrow(/UUID/);
  });

  it('builds a language-specific destination for a stable Skill ID', () => {
    expect(skillLearningHref(uuid(3), 'uk')).toBe('/skills/' + uuid(3) + '/learn?lang=uk');
    expect(skillLearningHref(uuid(3), 'en')).toBe('/skills/' + uuid(3) + '/learn?lang=en');
    expect(() => skillLearningHref(uuid(3), '../en')).toThrow(/мова/);
  });
});

describe('Fit visible Skills in the viewport', () => {
  it('fits the whole map including card dimensions and respects expanded Skill height', () => {
    const graph = layoutSkillMindMap([sample()], new Set());
    const viewport = { width: 900, height: 540 };
    const compact = fitVisibleSkillNodes(graph, new Set(), viewport.width, viewport.height);
    const expanded = fitVisibleSkillNodes(
      graph,
      new Set([uuid(3), uuid(4), uuid(6), uuid(7)]),
      viewport.width,
      viewport.height,
    );
    expect(expanded.zoom).toBeLessThanOrEqual(compact.zoom);
    for (const state of [compact, expanded]) {
      expect(state.zoom).toBeGreaterThan(0);
      expect(state.zoom).toBeLessThanOrEqual(2.5);
      expect(Number.isFinite(state.pan.x)).toBe(true);
      expect(Number.isFinite(state.pan.y)).toBe(true);
    }
    for (const node of graph.nodes) {
      const halfWidth = node.kind === 'skill' ? 139 : node.kind === 'skillGroup' ? 99 : 107;
      const halfHeight = node.kind === 'skill' ? 167 : node.kind === 'skillGroup' ? 54 : 57;
      const px = expanded.pan.x + node.x * expanded.zoom + viewport.width / 2;
      const py = expanded.pan.y + node.y * expanded.zoom + viewport.height / 2;
      expect(px - halfWidth * expanded.zoom).toBeGreaterThanOrEqual(0);
      expect(px + halfWidth * expanded.zoom).toBeLessThanOrEqual(viewport.width);
      expect(py - halfHeight * expanded.zoom).toBeGreaterThanOrEqual(0);
      expect(py + halfHeight * expanded.zoom).toBeLessThanOrEqual(viewport.height);
    }
  });

  it('fits the avatar when all descendants are hidden and handles unavailable sizes', () => {
    const rootOnly = layoutSkillMindMap([], new Set());
    const result = fitVisibleSkillNodes(rootOnly, new Set(), 900, 700);
    expect(result.pan).toEqual({ x: 0, y: 0 });
    expect(result.zoom).toBe(2.5);
    expect(fitVisibleSkillNodes(rootOnly, new Set(), 0, 0)).toEqual({ zoom: 0.65, pan: { x: 0, y: 0 } });
  });
});
