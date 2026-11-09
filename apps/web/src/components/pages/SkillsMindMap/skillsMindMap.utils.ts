import type { Collection } from '@svitlo/contracts/content';

/** Reconstructed runtime model; neither source .data.ts nor published JSON is imported. */
export type SkillNodeKind = Extract<Collection, 'skill' | 'skillGroup' | 'skillDomain'>;

export interface SkillNode {
  readonly id: string;
  readonly slug: string;
  readonly kind: SkillNodeKind;
  readonly name: string;
  readonly description?: string;
  readonly children: readonly SkillNode[];
}

export interface MapNode extends SkillNode {
  readonly depth: 1 | 2 | 3;
  readonly x: number;
  readonly y: number;
  readonly expanded: boolean;
  readonly parentId: string;
}

export interface MapEdge {
  readonly from: string;
  readonly to: string;
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly depth: 1 | 2 | 3;
}

export interface MindMapLayout {
  readonly nodes: readonly MapNode[];
  readonly edges: readonly MapEdge[];
  readonly worldSize: number;
  readonly extent: number;
}

export const slugPattern = /^[a-z][a-zA-Z0-9]*$/;
export const languagePattern = /^[a-z]{2,8}$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function flattenSkillNodes(domains: readonly SkillNode[]): SkillNode[] {
  const seen = new Set<string>();
  const nodes: SkillNode[] = [];
  const visit = (node: SkillNode) => {
    if (seen.has(node.id)) throw new Error('Повторюваний UUID Skill: ' + node.id);
    seen.add(node.id);
    nodes.push(node);
    node.children.forEach(visit);
  };
  domains.forEach(visit);
  return nodes;
}

/**
 * Preview-only mastery. Stable per Skill UUID (no Math.random on render), with
 * no claim that this represents a learner's assessed competence.
 * Replace this adapter with per-profile Skill mastery data when available.
 */
export function mockSkillMastery(skillId: string): number {
  if (!uuidPattern.test(skillId)) throw new Error('Некоректний UUID скіла');
  let hash = 2166136261;
  for (const char of skillId) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  // Avalanche the hash so adjacent fixture UUIDs do not get near-identical scores.
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;
  return (hash >>> 0) % 101;
}

export function skillLearningHref(skillId: string, language: string): string {
  if (!uuidPattern.test(skillId)) throw new Error('Некоректний UUID скіла');
  if (!languagePattern.test(language)) throw new Error('Некоректна мова');
  return '/skills/' + encodeURIComponent(skillId) + '/learn?lang=' + encodeURIComponent(language);
}

export function expandableSkillIds(domains: readonly SkillNode[]): string[] {
  return flattenSkillNodes(domains)
    .filter(node => node.children.length > 0)
    .map(node => node.id);
}

/**
 * Radial tree layout without a third-party graph dependency.
 * Hidden descendants consume one angular slot; visible branches share the circle.
 * Ring radii grow with the number of visible nodes to avoid forced overlaps.
 */
export function layoutSkillMindMap(domains: readonly SkillNode[], collapsed: ReadonlySet<string>): MindMapLayout {
  const visibleCount = [0, 0, 0, 0];
  const weight = (node: SkillNode): number => {
    if (!node.children.length || collapsed.has(node.id)) return 1;
    return node.children.reduce((sum, child) => sum + weight(child), 0);
  };
  const countVisible = (node: SkillNode, depth: 1 | 2 | 3) => {
    visibleCount[depth]++;
    if (!collapsed.has(node.id) && node.children.length && depth < 3) {
      for (const child of node.children) countVisible(child, (depth + 1) as 1 | 2 | 3);
    }
  };
  for (const domain of domains) countVisible(domain, 1);
  const size = (count: number, min: number, width: number) => Math.max(min, (count * width) / (Math.PI * 2));
  const rings = [0, size(visibleCount[1], 245, 264), 0, 0];
  rings[2] = Math.max(rings[1] + 270, size(visibleCount[2], 0, 236));
  rings[3] = Math.max(rings[2] + 300, size(visibleCount[3], 0, 340));
  const lastDepth = visibleCount[3] ? 3 : visibleCount[2] ? 2 : 1;
  const extent = rings[lastDepth] + 170;
  const worldSize = Math.ceil(extent * 2);
  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];
  const gap = 0.7;
  const totalSlots = domains.reduce((sum, domain) => sum + weight(domain) + gap, 0);

  const visit = (
    node: SkillNode,
    depth: 1 | 2 | 3,
    start: number,
    parentId: string,
    parentX: number,
    parentY: number,
  ) => {
    const count = weight(node);
    const angle = -Math.PI / 2 + (Math.PI * 2 * (start + count / 2)) / totalSlots;
    const x = Math.cos(angle) * rings[depth];
    const y = Math.sin(angle) * rings[depth];
    const expanded = node.children.length > 0 && !collapsed.has(node.id);
    nodes.push({ ...node, depth, x, y, expanded, parentId });
    edges.push({ from: parentId, to: node.id, x1: parentX, y1: parentY, x2: x, y2: y, depth });
    if (expanded && depth < 3) {
      let cursor = start;
      for (const child of node.children) {
        visit(child, (depth + 1) as 1 | 2 | 3, cursor, node.id, x, y);
        cursor += weight(child);
      }
    }
  };
  let cursor = 0;
  for (const domain of domains) {
    visit(domain, 1, cursor + gap / 2, 'profile', 0, 0);
    cursor += weight(domain) + gap;
  }
  return { nodes, edges, extent, worldSize };
}

export function fitMindMapZoom(layout: MindMapLayout, width: number, height: number): number {
  if (width <= 0 || height <= 0) return 0.7;
  const dimension = Math.max(1, layout.extent * 2);
  return Math.max(0.18, Math.min(1.2, (width - 30) / dimension, (height - 30) / dimension));
}

/** Fit the actually visible cards (compact or expanded), not an estimated ring radius. */
export function fitVisibleSkillNodes(
  layout: MindMapLayout,
  expandedSkills: ReadonlySet<string>,
  viewportWidth: number,
  viewportHeight: number,
): { zoom: number; pan: { x: number; y: number } } {
  if (viewportWidth <= 0 || viewportHeight <= 0) {
    return { zoom: 0.65, pan: { x: 0, y: 0 } };
  }
  // Profile avatar. The background halo is decorative and need not be fitted.
  let left = -99,
    right = 99,
    top = -99,
    bottom = 99;
  for (const node of layout.nodes) {
    const halfWidth =
      node.kind === 'skill' ? (expandedSkills.has(node.id) ? 139 : 109) : node.kind === 'skillDomain' ? 107 : 99;
    const halfHeight =
      node.kind === 'skill' ? (expandedSkills.has(node.id) ? 167 : 75) : node.kind === 'skillDomain' ? 57 : 54;
    left = Math.min(left, node.x - halfWidth);
    right = Math.max(right, node.x + halfWidth);
    top = Math.min(top, node.y - halfHeight);
    bottom = Math.max(bottom, node.y + halfHeight);
  }
  const margin = 56;
  const zoom = Math.max(
    0.01,
    Math.min(2.5, (viewportWidth - margin) / (right - left), (viewportHeight - margin) / (bottom - top)),
  );
  return {
    zoom,
    pan: {
      x: -((right + left) / 2) * zoom || 0,
      y: -((bottom + top) / 2) * zoom || 0,
    },
  };
}
