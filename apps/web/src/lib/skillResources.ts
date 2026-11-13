import 'server-only';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  assembleSkills,
  languageCode_Schema,
  type SkillDomain_Props,
  type Skill_Props,
  type Skills_Publication,
  type Skills_Props,
} from '@svitlo/engine/runtime';
import { resolveSkillLanguage } from '@/components/pages/SkillsMindMap/skillsData.client';
import { slugPattern, type SkillNode } from '@/components/pages/SkillsMindMap/skillsMindMap.utils';

/** Host I/O is separate from the Engine's pure Skills Props assembler. */
async function readPublishedSkillFiles(code: string): Promise<Skills_Publication> {
  const dir = join(process.cwd(), 'public/data/skills');
  const [base, locale] = await Promise.all([
    readFile(join(dir, 'base.json'), 'utf8').then(JSON.parse),
    readFile(join(dir, code + '.json'), 'utf8')
      .then(JSON.parse)
      .catch(error => {
        // Invariant-only domains produce no locale file.
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
        throw error;
      }),
  ]);
  return { base, locale: { [code]: locale } } as Skills_Publication;
}

export async function loadPublishedSkillProps(language: string): Promise<Skills_Props> {
  const code = languageCode_Schema.parse(resolveSkillLanguage(language));
  return assembleSkills(await readPublishedSkillFiles(code), code);
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

/** Published Domain order comes from the generated tree; UI filters by selected slugs. */
export async function loadPublishedSkills(language: string, domainSlugs: readonly string[]): Promise<SkillNode[]> {
  const domains = Object.values(await loadPublishedSkillProps(language)).map(domainPropsToNode);
  if (
    !domainSlugs.length ||
    new Set(domainSlugs).size !== domainSlugs.length ||
    domainSlugs.some(slug => !slugPattern.test(slug) || !domains.some(node => node.slug === slug))
  ) {
    throw new Error('Unknown or duplicate Skill Domain');
  }
  return domainSlugs.map(slug => domains.find(node => node.slug === slug)!);
}
