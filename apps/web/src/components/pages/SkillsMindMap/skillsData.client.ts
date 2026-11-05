import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import {
  flattenSkillNodes,
  languagePattern,
  slugPattern,
  type SkillNode,
  type SkillNodeKind,
} from './skillsMindMap.utils';

/** Page-specific data transport. Static subject taxonomy; no learner mastery. */
export function resolveSkillLanguage(value: string): string {
  const item = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === value || entry.language === value);
  if (!item) throw new Error('Непідтримувана мова Skills: ' + value);
  return item.language;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
type SourceRecord = Record<string, unknown>;
function record(value: unknown, path: string): SourceRecord {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Некоректна сутність skillAnalytics: ' + path);
  }
  return value as SourceRecord;
}
function string(value: unknown, path: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error('Некоректне поле: ' + path);
  return value;
}

/** The same typed graph may be consumed by a Mind Map or future analytical charts. */
export function parseSkillAnalyticsPage(value: unknown): SkillNode[] {
  const page = record(value, 'page');
  if (Object.keys(page).some(key => key !== 'domains') || !Array.isArray(page.domains) || !page.domains.length)
    throw new Error('Некоректний список доменів skillAnalytics');
  const ids = new Set<string>();
  function node(source: unknown, parent: SkillNodeKind | null, path: string): SkillNode {
    const data = record(source, path);
    const allowed = ['id', 'slug', 'collection', 'name', 'description', 'children'];
    if (Object.keys(data).some(key => !allowed.includes(key))) {
      throw new Error('Зайві поля skillAnalytics: ' + path);
    }
    const id = string(data.id, path + '.id');
    const slug = string(data.slug, path + '.slug');
    const name = string(data.name, path + '.name');
    if (!uuidPattern.test(id) || ids.has(id)) throw new Error('Некоректний або повторюваний UUID: ' + path);
    ids.add(id);
    if (!slugPattern.test(slug)) throw new Error('Некоректний slug: ' + path);
    const collection = data.collection;
    if (collection !== 'skillDomain' && collection !== 'skillGroup' && collection !== 'skill') {
      throw new Error('Некоректний Collection: ' + path);
    }
    const kind: SkillNodeKind = collection;
    if (
      (parent === null && kind !== 'skillDomain') ||
      (parent === 'skillGroup' && kind !== 'skill') ||
      parent === 'skill' ||
      (parent === 'skillDomain' && kind === 'skillDomain')
    ) {
      throw new Error('Некоректний порядок сутностей: ' + path);
    }
    if (kind === 'skill' && data.description === undefined) {
      throw new Error('Скіл без фронтенд-опису: ' + path);
    }
    const description = data.description === undefined ? undefined : string(data.description, path + '.description');
    if (data.children !== undefined && !Array.isArray(data.children)) {
      throw new Error('Некоректні дочірні сутності: ' + path);
    }
    const rawChildren = (data.children ?? []) as unknown[];
    if ((kind === 'skill' && rawChildren.length) || (kind !== 'skill' && !rawChildren.length)) {
      throw new Error('Некоректне дерево Skills: ' + path);
    }
    const children = rawChildren.map((entry, index) => node(entry, kind, path + '.children.' + index));
    if (new Set(children.map(child => child.slug)).size !== children.length) {
      throw new Error('Повторювані slug дочірніх сутностей: ' + path);
    }
    return { id, slug, kind, name, ...(description === undefined ? {} : { description }), children };
  }
  const domains = page.domains.map((entry, index) => node(entry, null, 'domains.' + index));
  if (new Set(domains.map(domain => domain.slug)).size !== domains.length) {
    throw new Error('Повторювані slug доменів');
  }
  flattenSkillNodes(domains);
  return domains;
}

/** Exactly one locale-specific request. No per-entity meta or locale traversal. */
export async function loadSkillAnalyticsPage(
  language: string,
  signal: AbortSignal,
  domainSlugs?: readonly string[],
): Promise<SkillNode[]> {
  if (!languagePattern.test(language) || resolveSkillLanguage(language) !== language) {
    throw new Error('Непідтримувана мова Skills: ' + language);
  }
  const response = await fetch('/data/pages/skillAnalytics/' + encodeURIComponent(language) + '.json', { signal });
  if (!response.ok) throw new Error('Не вдалося завантажити Skill Analytics (' + response.status + ')');
  const domains = parseSkillAnalyticsPage((await response.json()) as unknown);
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
