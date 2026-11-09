import 'server-only';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { mergeLessonResources } from '@svitlo/engine';
import { resolveSkillLanguage } from '@/components/pages/SkillsMindMap/skillsData.client';
import { slugPattern, type SkillNode, type SkillNodeKind } from '@/components/pages/SkillsMindMap/skillsMindMap.utils';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
type JsonRecord = Record<string, unknown>;
function record(v: unknown, label: string): JsonRecord {
  if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('Invalid published Skill ' + label);
  return v as JsonRecord;
}
function text(v: unknown, label: string): string {
  if (typeof v !== 'string' || !v.trim()) throw new Error('Missing published Skill ' + label);
  return v;
}

/** This conversion never runs in the browser. It accepts an already deep-merged tree. */
export function parseMergedSkillTree(input: unknown): SkillNode[] {
  const ids = new Set<string>();
  function visit(source: unknown, slug: string, kind: SkillNodeKind): SkillNode {
    if (!slugPattern.test(slug)) throw new Error('Invalid published Skill slug ' + slug);
    const data = record(source, slug);
    if (data.collection !== kind) throw new Error('Invalid published Skill collection ' + slug);
    const id = text(data.id, slug + '.id');
    if (!uuid.test(id) || ids.has(id)) throw new Error('Duplicate or invalid Skill UUID ' + slug);
    ids.add(id);
    const name = text(data[kind === 'skillDomain' ? 'title' : 'name'], slug + '.name');
    const desc = record(data.description, slug + '.description');
    text(desc.methodological, slug + '.description.methodological');
    const description = desc.frontend === undefined ? undefined : text(desc.frontend, slug + '.description.frontend');
    if (kind === 'skill' && !description) throw new Error('Missing frontend Skill description ' + slug);
    if (kind === 'skill' && (data.groups !== undefined || data.skills !== undefined)) {
      throw new Error('Skill cannot have children ' + slug);
    }
    if (kind === 'skillGroup' && data.groups !== undefined) throw new Error('Group cannot nest groups ' + slug);
    const groups = data.groups === undefined ? {} : record(data.groups, slug + '.groups');
    const skills = data.skills === undefined ? {} : record(data.skills, slug + '.skills');
    const children = [
      ...Object.entries(groups).map(([key, child]) => visit(child, key, 'skillGroup')),
      ...Object.entries(skills).map(([key, child]) => visit(child, key, 'skill')),
    ];
    if (kind !== 'skill' && !children.length) throw new Error('Empty Skill parent ' + slug);
    return { id, slug, kind, name, ...(description ? { description } : {}), children };
  }
  const domains = Object.entries(record(input, 'root')).map(([slug, entry]) => visit(entry, slug, 'skillDomain'));
  if (!domains.length) throw new Error('Empty Skill taxonomy');
  return domains;
}

/** Only the Next.js server loads and deep-merges the two published resources. */
export async function loadPublishedSkills(language: string, domainSlugs: readonly string[]): Promise<SkillNode[]> {
  const code = resolveSkillLanguage(language);
  const dir = join(process.cwd(), 'public/data/skills');
  const [base, locale] = await Promise.all([
    readFile(join(dir, 'base.json'), 'utf8').then(JSON.parse),
    readFile(join(dir, code + '.json'), 'utf8').then(JSON.parse),
  ]);
  const merged = mergeLessonResources(base, locale);
  const domains = parseMergedSkillTree(merged);
  if (
    !domainSlugs.length ||
    new Set(domainSlugs).size !== domainSlugs.length ||
    domainSlugs.some(slug => !slugPattern.test(slug) || !domains.some(node => node.slug === slug))
  ) {
    throw new Error('Unknown or duplicate Skill Domain');
  }
  return domainSlugs.map(slug => domains.find(node => node.slug === slug)!);
}
