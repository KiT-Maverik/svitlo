import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fixtureJsonForSkillUrl, TEST_SKILLS_DOMAIN_SLUGS } from './skillsData.fixture';
import { loadSkillAnalyticsPage, parseSkillTaxonomyTrees, resolveSkillLanguage } from './skillsData.client';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
const fixture = (name: 'base' | 'uk') => structuredClone(fixtureJsonForSkillUrl('/data/skills/' + name + '.json')) as Record<string, any>;

describe('textbook-wide sparse Skill resources', () => {
  const originalFetch = globalThis.fetch;
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      const json = fixtureJsonForSkillUrl(url);
      return { ok: json !== null, status: json === null ? 404 : 200, json: async () => json };
    }));
  });
  afterEach(() => vi.stubGlobal('fetch', originalFetch));

  it('resolves supported language codes without fallback', () => {
    expect(resolveSkillLanguage('uk-UA')).toBe('uk');
    expect(resolveSkillLanguage('be-tarask')).toBe('be');
    expect(resolveSkillLanguage('en')).toBe('en');
    expect(() => resolveSkillLanguage('ru')).toThrow(/Непідтримувана/);
  });

  it('loads exactly the common tree and chosen language and preserves the SkillNode UI shape', async () => {
    const domains = await loadSkillAnalyticsPage('uk', new AbortController().signal, TEST_SKILLS_DOMAIN_SLUGS);
    expect(domains).toHaveLength(1);
    expect(domains[0].children[0].children[0]).toMatchObject({
      id: uuid(3), slug: 'testRed', kind: 'skill', name: 'Червоний', description: 'Розпізнавати червоний.',
    });
    expect(vi.mocked(globalThis.fetch).mock.calls.map(([url]) => String(url))).toEqual([
      '/data/skills/base.json', '/data/skills/uk.json',
    ]);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/data/skills/base.json',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('downloads no unrelated locales or legacy Skill Analytics page payload', async () => {
    const domains = await loadSkillAnalyticsPage('en', new AbortController().signal);
    expect(domains[0].children[0].children[0].name).toBe('Red');
    expect(vi.mocked(globalThis.fetch).mock.calls.map(([url]) => String(url))).toEqual([
      '/data/skills/base.json', '/data/skills/en.json',
    ]);
  });

  it('rejects absent localized data, UUID collisions, wrong kinds and extra fields', () => {
    const base = fixture('base');
    const uk = fixture('uk');
    expect(parseSkillTaxonomyTrees(base, uk)[0].children[0].children[0].id).toBe(uuid(3));
    const missingDescription = fixture('uk');
    delete missingDescription.testColors.groups.testWarmColors.skills.testRed.description;
    expect(() => parseSkillTaxonomyTrees(base, missingDescription)).toThrow(/фронтенд-опису/);
    const duplicate = fixture('base');
    duplicate.testColors.groups.testWarmColors.skills.testRed.id = uuid(1);
    expect(() => parseSkillTaxonomyTrees(duplicate, uk)).toThrow(/UUID/);
    const missing = fixture('uk');
    delete missing.testColors.groups.testWarmColors.skills.testRed;
    expect(() => parseSkillTaxonomyTrees(base, missing)).toThrow(/slug/);
    const wrong = fixture('base');
    wrong.testColors.groups.testWarmColors.collection = 'skillDomain';
    expect(() => parseSkillTaxonomyTrees(wrong, uk)).toThrow(/Collection/);
    const extra = fixture('uk');
    extra.testColors.groups.testWarmColors.skills.testRed.id = uuid(33);
    expect(() => parseSkillTaxonomyTrees(base, extra)).toThrow(/Зайві поля/);
  });

  it('supports direct Skills alongside groups while retaining the original order', () => {
    const base = fixture('base');
    const uk = fixture('uk');
    base.testColors.skills = {
      testDirect: { id: uuid(4), collection: 'skill', description: { methodological: 'Direct.' } },
    };
    uk.testColors.skills = {
      testDirect: { name: 'Пряма навичка', description: { frontend: 'Опис.' } },
    };
    expect(parseSkillTaxonomyTrees(base, uk)[0].children.map(node => node.slug))
      .toEqual(['testWarmColors', 'testDirect']);
  });

  it('fails on unknown domains, unsupported language and missing locale response', async () => {
    await expect(loadSkillAnalyticsPage('ru', new AbortController().signal)).rejects.toThrow(/Непідтримувана/);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(loadSkillAnalyticsPage('uk', new AbortController().signal, ['missing'])).rejects.toThrow(/Невідомі/);
    await expect(loadSkillAnalyticsPage('fr', new AbortController().signal)).rejects.toThrow(/завантажити/);
  });
});
