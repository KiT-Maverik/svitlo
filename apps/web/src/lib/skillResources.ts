import 'server-only';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  assembleSkills,
  languageCode_Schema,
  mergeLessonResources,
  type SkillDomain_Props,
  type Skill_Props,
  type Skills_Publication,
  type Skills_Props,
} from '@svitlo/engine';
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

/** Host-specific I/O remains separate from the platform-independent assembler. */
async function readPublishedSkillFiles(code: string): Promise<{ base: unknown; locale: unknown }> {
  const dir = join(process.cwd(), 'public/generated/skills');
  const [base, locale] = await Promise.all([
    readFile(join(dir, 'base.json'), 'utf8').then(JSON.parse),
    readFile(join(dir, code + '.json'), 'utf8').then(JSON.parse).catch(error => {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
      throw error;
    }),
  ]);
  return { base, locale };
}

function publishedResource(base: unknown, locale: unknown, code: string): Skills_Publication {
  return { base, locale: { [code]: locale } } as Skills_Publication;
}

/** Reads the two files and returns the new Build API's fully resolved Domain Props. */
export async function loadPublishedSkillProps(language: string): Promise<Skills_Props> {
  const code = languageCode_Schema.parse(resolveSkillLanguage(language));
  const { base, locale } = await readPublishedSkillFiles(code);
  return assembleSkills(publishedResource(base, locale, code), code);
}

function skillPropsToNode(skill: Skill_Props): SkillNode {
  return {
    id: skill.id,
    slug: skill.slug,
    kind: 'skill',
    name: skill.name,
    description: skill.description.frontend,
    children: [],
  };
}

function domainPropsToNode(domain: SkillDomain_Props): SkillNode {
  const children: SkillNode[] = [
    ...(domain.groups ?? []).map(group => ({
      id: group.id,
      slug: group.slug,
      kind: 'skillGroup' as const,
      name: group.name,
      ...(group.description.frontend ? { description: group.description.frontend } : {}),
      children: group.skills.map(skillPropsToNode),
    })),
    ...(domain.skills ?? []).map(skillPropsToNode),
  ];
  if (!children.length) throw new Error('Empty Skill Domain ' + domain.slug);
  return {
    id: domain.id,
    slug: domain.slug,
    kind: 'skillDomain',
    name: domain.title,
    ...(domain.description.frontend ? { description: domain.description.frontend } : {}),
    children,
  };
}

/**
 * Keeps the existing Skills Mind Map functional with the legacy publisher.
 * Once the Skills generator publishes Build Props, the same host loader uses
 * assembleSkills without passing any authored or legacy collection metadata.
 */
export async function loadPublishedSkills(language: string, domainSlugs: readonly string[]): Promise<SkillNode[]> {
  const code = languageCode_Schema.parse(resolveSkillLanguage(language));
  const { base, locale } = await readPublishedSkillFiles(code);
  const domainMap = record(base, 'root');
  const legacy = Object.entries(domainMap).every(([slug, entry]) => record(entry, slug).collection === 'skillDomain');
  const domains = legacy
    ? parseMergedSkillTree(mergeLessonResources(base, locale))
    : Object.values(assembleSkills(publishedResource(base, locale, code), code)).map(domainPropsToNode);
  if (
    !domainSlugs.length ||
    new Set(domainSlugs).size !== domainSlugs.length ||
    domainSlugs.some(slug => !slugPattern.test(slug) || !domains.some(node => node.slug === slug))
  ) {
    throw new Error('Unknown or duplicate Skill Domain');
  }
  return domainSlugs.map(slug => domains.find(node => node.slug === slug)!);
}
