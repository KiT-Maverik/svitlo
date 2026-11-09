import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';
import {
  flattenSkillNodes,
  languagePattern,
  slugPattern,
  type SkillNode,
  type SkillNodeKind,
} from './skillsMindMap.utils';

/** Resolve only languages the textbook publisher actually supports. */
export function resolveSkillLanguage(value: string): string {
  const item = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === value || entry.language === value);
  if (!item) throw new Error('Непідтримувана мова Skills: ' + value);
  return item.language;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
type SourceRecord = Record<string, unknown>;

function record(value: unknown, path: string): SourceRecord {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Некоректне дерево Skills: ' + path);
  }
  return value as SourceRecord;
}

function string(value: unknown, path: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error('Некоректне поле Skills: ' + path);
  return value;
}

function onlyFields(value: SourceRecord, permitted: readonly string[], path: string) {
  if (Object.keys(value).some(key => !permitted.includes(key))) {
    throw new Error('Зайві поля Skills: ' + path);
  }
}

/** Merging by slug is deliberately strict: missing, extra or renamed translations are errors. */
function matchedSlugs(base: SourceRecord, translated: SourceRecord, path: string): string[] {
  const slugs = Object.keys(base);
  const other = Object.keys(translated);
  if (
    slugs.length !== other.length ||
    slugs.some(slug => !slugPattern.test(slug) || !Object.hasOwn(translated, slug)) ||
    other.some(slug => !Object.hasOwn(base, slug))
  ) {
    throw new Error('Невідповідність slug локалізації Skills: ' + path);
  }
  return slugs;
}

function children(value: SourceRecord, property: string, path: string): SourceRecord {
  return value[property] === undefined ? {} : record(value[property], path + '.' + property);
}

/**
 * Consume the published textbook-wide sparse taxonomy, without importing
 * authoring code or the separate legacy Skill Analytics page resources.
 * The base tree owns IDs, type and order; one locale tree supplies display copy.
 */
export function parseSkillTaxonomyTrees(baseValue: unknown, localizedValue: unknown): SkillNode[] {
  const base = record(baseValue, 'base');
  const translated = record(localizedValue, 'locale');
  const ids = new Set<string>();

  function node(
    immutable: unknown,
    localized: unknown,
    slug: string,
    expectedKind: SkillNodeKind,
    path: string,
  ): SkillNode {
    const data = record(immutable, path);
    const copy = record(localized, path + '.locale');
    onlyFields(data, ['id', 'collection', 'description', 'groups', 'skills'], path);
    onlyFields(
      copy,
      [expectedKind === 'skillDomain' ? 'title' : 'name', 'description', 'groups', 'skills'],
      path + '.locale',
    );
    if (data.collection !== expectedKind) throw new Error('Некоректний Collection: ' + path);
    const id = string(data.id, path + '.id');
    if (!uuidPattern.test(id) || ids.has(id)) throw new Error('Некоректний або повторюваний UUID: ' + path);
    ids.add(id);
    const name = string(copy[expectedKind === 'skillDomain' ? 'title' : 'name'], path + '.name');

    const methodological = record(data.description, path + '.description');
    onlyFields(methodological, ['methodological'], path + '.description');
    string(methodological.methodological, path + '.description.methodological');

    let description: string | undefined;
    if (copy.description !== undefined) {
      const copyDescription = record(copy.description, path + '.locale.description');
      onlyFields(copyDescription, ['frontend'], path + '.locale.description');
      description = string(copyDescription.frontend, path + '.locale.description.frontend');
    }
    if (expectedKind === 'skill' && description === undefined) {
      throw new Error('Скіл без фронтенд-опису: ' + path);
    }

    if (expectedKind === 'skill' && (data.groups !== undefined || data.skills !== undefined || copy.groups !== undefined || copy.skills !== undefined)) {
      throw new Error('Скіл не може мати дочірні сутності: ' + path);
    }
    if (expectedKind === 'skillGroup' && (data.groups !== undefined || copy.groups !== undefined)) {
      throw new Error('Група не може містити вкладені групи: ' + path);
    }

    const baseGroups = children(data, 'groups', path);
    const localeGroups = children(copy, 'groups', path + '.locale');
    const baseSkills = children(data, 'skills', path);
    const localeSkills = children(copy, 'skills', path + '.locale');
    const groups = matchedSlugs(baseGroups, localeGroups, path + '.groups')
      .map(key => node(baseGroups[key], localeGroups[key], key, 'skillGroup', path + '.groups.' + key));
    const skills = matchedSlugs(baseSkills, localeSkills, path + '.skills')
      .map(key => node(baseSkills[key], localeSkills[key], key, 'skill', path + '.skills.' + key));
    const descendants = [...groups, ...skills];
    if (expectedKind !== 'skill' && !descendants.length) {
      throw new Error('Порожній Domain або Group: ' + path);
    }

    return {
      id,
      slug,
      kind: expectedKind,
      name,
      ...(description === undefined ? {} : { description }),
      children: descendants,
    };
  }

  const slugs = matchedSlugs(base, translated, 'domains');
  if (!slugs.length) throw new Error('Порожнє дерево Skills');
  const domains = slugs.map(slug => node(base[slug], translated[slug], slug, 'skillDomain', 'domains.' + slug));
  flattenSkillNodes(domains);
  return domains;
}

/** Load exactly two resources: one common base tree and the requested locale. */
export async function loadSkillAnalyticsPage(
  language: string,
  signal: AbortSignal,
  domainSlugs?: readonly string[],
): Promise<SkillNode[]> {
  if (!languagePattern.test(language) || resolveSkillLanguage(language) !== language) {
    throw new Error('Непідтримувана мова Skills: ' + language);
  }
  const [baseResponse, localeResponse] = await Promise.all([
    fetch('/data/skills/base.json', { signal }),
    fetch('/data/skills/' + encodeURIComponent(language) + '.json', { signal }),
  ]);
  if (!baseResponse.ok || !localeResponse.ok) {
    throw new Error(
      'Не вдалося завантажити Skills (' +
        (!baseResponse.ok ? baseResponse.status : localeResponse.status) +
        ')',
    );
  }
  const [base, localized] = await Promise.all([baseResponse.json(), localeResponse.json()]);
  const domains = parseSkillTaxonomyTrees(base as unknown, localized as unknown);
  if (
    domainSlugs &&
    (!domainSlugs.length ||
      new Set(domainSlugs).size !== domainSlugs.length ||
      domainSlugs.some(slug => !slugPattern.test(slug) || !domains.some(domain => domain.slug === slug)))
  ) {
    throw new Error('Невідомі або повторювані домени Skill Analytics');
  }
  return domainSlugs ? domainSlugs.map(slug => domains.find(domain => domain.slug === slug)!) : domains;
}
