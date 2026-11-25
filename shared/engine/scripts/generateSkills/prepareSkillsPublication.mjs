/**
 * Build-time adaptation of a textbook's SkillDomain configurators.
 *
 * This function is the caller of the Engine generator, not the generator itself:
 * it invokes the authoring Build API and combines independent Domain results
 * into the single textbook-wide { base, locale } publication envelope.
 */
const languageCode = /^[a-z]{2,8}$/;
const slugCode = /^[a-z][a-zA-Z0-9]*$/;
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * @param {readonly { id: string, slug: string, type: string, build: { props(options: { languages: readonly string[] }): { base: object, locale?: Record<string, object> } } }[]} domains
 * @param {readonly string[]} languages
 */
export function prepareSkillPublication(domains, languages) {
  if (!Array.isArray(domains) || !domains.length) throw new Error('Expected at least one SkillDomain');
  if (!Array.isArray(languages) || !languages.length) throw new Error('Provide publication languages');
  if (languages.some(code => typeof code !== 'string' || !languageCode.test(code))) {
    throw new Error('Invalid publication language');
  }
  if (new Set(languages).size !== languages.length) throw new Error('Duplicate publication language');
  const base = {};
  const locale = {};
  const seenIds = new Set();
  for (const domain of domains) {
    if (
      !domain ||
      domain.type !== 'skillDomain' ||
      typeof domain.slug !== 'string' ||
      !slugCode.test(domain.slug) ||
      typeof domain.id !== 'string' ||
      typeof domain.build?.props !== 'function'
    ) {
      throw new Error('Expected SkillDomain configurators exposing build.props');
    }
    if (Object.hasOwn(base, domain.slug) || seenIds.has(domain.id)) {
      throw new Error('Duplicate SkillDomain identity: ' + domain.slug);
    }
    seenIds.add(domain.id);
    const publication = domain.build.props({ languages });
    if (
      !isRecord(publication) ||
      !isRecord(publication.base) ||
      publication.base.id !== domain.id ||
      publication.base.slug !== domain.slug ||
      (publication.locale !== undefined && !isRecord(publication.locale))
    ) {
      throw new Error('Invalid SkillDomain Build result: ' + domain.slug);
    }
    base[domain.slug] = publication.base;
    for (const [code, payload] of Object.entries(publication.locale ?? {})) {
      if (!languages.includes(code)) throw new Error('Unrequested Skill language: ' + code);
      if (payload === undefined) continue;
      if (!isRecord(payload)) throw new Error('Invalid Skill locale payload: ' + domain.slug + '.' + code);
      (locale[code] ??= {})[domain.slug] = payload;
    }
  }
  return { base, locale: Object.keys(locale).length ? locale : undefined };
}
