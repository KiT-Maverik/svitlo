const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slugPattern = /^[A-Za-z][A-Za-z0-9]*$/;
const record = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const unwrap = x => (record(x?.config) ? x.config : x);
const production = x => (record(x?.config) ? x.production : undefined);
const ensure = (value, path) => {
  if (typeof value !== 'string' || !slugPattern.test(value) || ['constructor', '__proto__'].includes(value))
    throw Error(path + ': unsafe slug');
  return value;
};
const safeDirectory = dir => {
  if (typeof dir !== 'string') throw Error('unsafe generated directory');
  if (dir && dir.split('/').some(part => !slugPattern.test(part) || ['constructor', '__proto__'].includes(part)))
    throw Error(String(dir) + ': unsafe generated directory');
  return dir;
};
const identity = (config, ctx, dir, kind) => {
  safeDirectory(dir);
  const slug = ensure(config?.slug, dir + '.slug'),
    id = config?.id ?? ctx.deriveId?.(kind, dir || slug);
  if (typeof id !== 'string' || !uuid.test(id))
    throw Error(dir + '.id: immutable UUID or parent deterministic deriveId required');
  return { id, slug };
};
const source = ctx => {
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(ctx.sourceLanguage ?? ''))
    throw Error('sourceLanguage: reviewed locale required');
  return ctx.sourceLanguage;
};
const localized = (value, language, path) => {
  if (typeof value === 'string') return value;
  if (!record(value) || typeof value[language] !== 'string' || !value[language].trim())
    throw Error(path + ': missing reviewed ' + language + ' locale');
  return { [language]: value[language] };
};
const todo = (production, ctx, language) => {
  const langs = production?.plannedLanguages ?? ctx.plannedLanguages ?? [language];
  if (!Array.isArray(langs) || new Set(langs).size !== langs.length || !langs.includes(language))
    throw Error('plannedLanguages: invalid language scope');
  return langs.length > 1 ? '// TODO (BLOCKER): Restore reviewed languages: ' + JSON.stringify(langs) + '\n' : '';
};
const exportName = slug =>
  [
    'class',
    'default',
    'export',
    'import',
    'const',
    'new',
    'return',
    'let',
    'var',
    'await',
    'content',
    'languages',
    'section',
  ].includes(slug)
    ? 'config_' + slug
    : slug;
const sidecars = (meta, dir) => {
  if (meta === undefined) return [];
  if (!record(meta)) throw Error(dir + '.production: object expected');
  const outputs = [];
  if (typeof meta.methodology === 'string' && meta.methodology.trim())
    outputs.push({
      path: [dir, 'methodology.md'].filter(Boolean).join('/'),
      kind: 'markdown',
      content: meta.methodology.trimEnd() + '\n',
    });
  const rest = Object.entries(meta).filter(
    ([key]) => !['documentLanguage', 'methodology', 'plannedLanguages', 'pending'].includes(key),
  );
  if (rest.length)
    outputs.push({
      path: [dir, 'specification.md'].filter(Boolean).join('/'),
      kind: 'specification',
      content:
        rest
          .map(
            ([key, value]) =>
              '# ' + key + '\n\n' + (typeof value === 'string' ? value.trimEnd() : JSON.stringify(value, null, 2)),
          )
          .join('\n\n') + '\n',
    });
  return outputs;
};

/** Emits authored source only, never Props/JSON; parent owns safe creation. */
export function materializeSkill(input, context = {}) {
  const config = unwrap(input),
    meta = production(input),
    dir = context.directory ?? '';
  const { id, slug } = identity(config, context, dir, 'skill'),
    language = source(context);
  const data = {
    id,
    slug,
    name: localized(config.name, language, dir + '.name'),
    description: {
      methodological: config.description?.methodological,
      ...(config.description?.frontend === undefined
        ? {}
        : { frontend: localized(config.description.frontend, language, dir + '.description.frontend') }),
    },
  };
  const pending = todo(meta, context, language),
    name = exportName(slug);
  const text =
    "import { defineSkill } from '@svitlo/engine/build';\n" +
    "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
    '\n' +
    'const languages = ' +
    JSON.stringify([language]) +
    ' as const satisfies SupportedLanguages;\n\n' +
    pending +
    'export const ' +
    name +
    ' = defineSkill' +
    '<' +
    JSON.stringify(slug) +
    ', typeof languages>' +
    '(' +
    JSON.stringify(data, null, 2) +
    ');\n';
  return {
    id,
    exportName: name,
    files: [
      ...sidecars(meta, dir),
      { path: [dir, 'index.ts'].filter(Boolean).join('/'), kind: 'typescript', content: text },
    ],
    diagnostics: pending ? [{ path: dir, code: 'pending-locales', severity: 'warning' }] : [],
  };
}
