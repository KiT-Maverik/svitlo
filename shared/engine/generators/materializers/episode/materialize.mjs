import { createSourceIdentifierRegistry, renderSourceItem } from '../sourceIdentifiers.mjs';
import { normalizeWorkflowLocalized } from '../normalizeWorkflowLocalized.mjs';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';
import { materializeEpisodeDraft } from './materializeDraft.mjs';

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
const todo = (production, ctx, language) => {
  const langs = production?.plannedLanguages ?? ctx.plannedLanguages ?? [language];
  if (!Array.isArray(langs) || new Set(langs).size !== langs.length || !langs.includes(language))
    throw Error('plannedLanguages: invalid language scope');
  return langs.length > 1
    ? renderBlockerTodo(
        'Restore reviewed languages: ' +
          JSON.stringify(langs) +
          ' after verified translations and independent review; remove this marker once complete.',
      ) + '\n'
    : '';
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
const sidecars = (meta, dir, sectionNotes = []) => {
  if (meta === undefined && !sectionNotes.length) return [];
  if (meta !== undefined && !record(meta)) throw Error(dir + '.production: object expected');
  meta ??= {};
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
  if (rest.length || sectionNotes.length)
    outputs.push({
      path: [dir, 'specification.md'].filter(Boolean).join('/'),
      kind: 'specification',
      content:
        rest
          .map(
            ([key, value]) =>
              '# ' + key + '\n\n' + (typeof value === 'string' ? value.trimEnd() : JSON.stringify(value, null, 2)),
          )
          .concat(sectionNotes)
          .join('\n\n') + '\n',
    });
  return outputs;
};

/** An Episode owns narrative Sections and delegates their concrete rendering to Agent B. */
export function materializeEpisode(input, context = {}) {
  const authored = unwrap(input),
    meta = production(input),
    dir = context.directory ?? '';
  if (dir && dir.split('/').some(part => !slugPattern.test(part))) throw Error(dir + ': unsafe generated directory');
  const lang = source(context);
  if (authored?.type !== 'episode') throw Error(dir + ': expected episode Config');
  const provisional =
    !record(authored.section) && record(meta) && meta.focus !== undefined && meta.purpose !== undefined;
  if (provisional) return materializeEpisodeDraft(input, context);
  const config = authored;
  if (!record(config.section) || !record(config.section.items) || !Array.isArray(config.section.order))
    throw Error(dir + '.section: missing complete Episode Sections');
  const { id, slug } = identity(config, context, dir, 'episode');
  const collection = config.section;
  if (!record(collection) || !record(collection.items) || !Array.isArray(collection.order))
    throw Error(dir + '.section: expected {items,order}');
  const keys = Object.keys(collection.items),
    order = collection.order;
  if (
    keys.length !== order.length ||
    new Set(order).size !== order.length ||
    order.some(key => typeof key !== 'string' || !Object.hasOwn(collection.items, key))
  )
    throw Error(dir + '.section.order: each Section key required exactly once');
  const planned = config.params?.languages ?? meta?.plannedLanguages ?? context.plannedLanguages ?? [lang];
  if (!Array.isArray(planned) || !planned.includes(lang) || new Set(planned).size !== planned.length)
    throw Error(dir + '.params.languages: invalid source scope');
  const claim = createSourceIdentifierRegistry('episode', ['defineEpisode', 'languages', 'section', exportName(slug)]);
  const imports = [],
    items = {},
    files = [],
    diagnostics = [],
    seenIds = new Set(),
    sectionNotes = [];
  for (const key of order) {
    ensure(key, dir + '.section.items.' + key);
    const raw = unwrap(collection.items[key]);
    if (!['content', 'practice', 'codingTask', 'learningFlow'].includes(raw?.type))
      throw Error(dir + ': unsupported Episode production Section: ' + raw?.type);
    if (raw?.slug !== undefined && raw.slug !== key)
      throw Error(dir + '.section.items.' + key + ': Section slug mismatch');
    if (typeof context.materializeSection !== 'function')
      throw Error(dir + '.sections.' + key + ': concrete Section renderer required (Agent B)');
    const reviewed = production(collection.items[key]);
    // Section sidecars were retired: preserve reviewed Section intent in the
    // Episode-owned narrative specification before enabling the handoff.
    const notes = [];
    let integrated = false;
    if (reviewed) {
      const entries = Object.entries(reviewed).filter(
        ([field]) => !['pending', 'documentLanguage', 'methodologyIntegrated'].includes(field),
      );
      integrated =
        entries.length > 0 &&
        entries.every(([field, value]) => field !== 'sourceEvidence' && typeof value === 'string' && !!value.trim());
      if (integrated) {
        for (const [field, value] of entries) {
          const text = value.trim();
          if (typeof meta?.specification === 'string' && meta.specification.includes(text)) continue;
          notes.push('**' + field + ':** ' + text);
        }
        if (notes.length) sectionNotes.push('## Section: ' + key + ' (' + raw.type + ')\n\n' + notes.join('\n\n'));
      }
    }
    const node = record(collection.items[key]?.config)
      ? {
          ...collection.items[key],
          config: { ...raw, slug: key },
          ...(integrated ? { production: { ...reviewed, methodologyIntegrated: true } } : {}),
        }
      : { ...raw, slug: key };
    const location = [dir, 'sections', key].filter(Boolean).join('/');
    const child = context.materializeSection(node, { ...context, directory: location, plannedLanguages: planned });
    if (!Array.isArray(child?.files) || !child.exportName) throw Error(location + ': invalid Section renderer result');
    const childId = raw.id ?? child.id;
    if (typeof childId !== 'string' || !uuid.test(childId)) throw Error(location + ': Section UUID missing');
    if (seenIds.has(childId)) throw Error(location + ': duplicate Section UUID');
    seenIds.add(childId);
    const name = claim(child.exportName, 'section.items.' + key);
    imports.push('import { ' + name + ' } from "./sections/' + key + '";');
    items[key] = name;
    files.push(...child.files);
    diagnostics.push(...(child.diagnostics ?? []));
  }
  const fields = { ...config, id, slug };
  delete fields.section;
  delete fields.params;
  if (record(fields.locale)) {
    fields.locale = { ...fields.locale };
    if (fields.locale.title !== undefined)
      fields.locale.title = normalizeWorkflowLocalized(fields.locale.title, lang, dir + '.locale.title', planned);
  }
  if (!record(config.params)) throw Error(dir + '.params: Config params object required');
  const attrs = Object.entries(fields)
    .map(([key, value]) => '  ' + JSON.stringify(key) + ': ' + JSON.stringify(value, null, 2) + ',')
    .join('\n');
  const paramFields = Object.entries(config.params)
    .filter(([key]) => key !== 'languages')
    .map(([key, value]) => JSON.stringify(key) + ': ' + JSON.stringify(value) + ',')
    .join(' ');
  const warning = todo({ plannedLanguages: planned }, context, lang);
  if (warning) diagnostics.push({ path: dir, code: 'pending-locales', severity: 'warning' });
  const sectionMap =
    '{ ' +
    Object.entries(items)
      .map(([key, name]) => renderSourceItem(key, name))
      .join(', ') +
    ' }';
  const result =
    "import { defineEpisode } from '@svitlo/engine/build';\n" +
    "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
    imports.join('\n') +
    '\n\n' +
    'const languages = ' +
    JSON.stringify([lang]) +
    ' as const satisfies SupportedLanguages;\n' +
    'const section = { items: ' +
    sectionMap +
    ', order: ' +
    JSON.stringify(order) +
    ' };\n\n' +
    warning +
    'export const ' +
    exportName(slug) +
    ' = defineEpisode<' +
    [JSON.stringify(slug), 'typeof languages', 'typeof section.items'].join(', ') +
    '>({\n' +
    attrs +
    '\n  params: { ' +
    paramFields +
    ' languages },\n  section,\n});\n';
  const produced = [
    ...files,
    ...sidecars(meta, dir, sectionNotes),
    { path: [dir, 'index.ts'].filter(Boolean).join('/'), kind: 'typescript', content: result },
  ];
  const paths = new Set();
  for (const file of produced) {
    if (paths.has(file.path)) throw Error('duplicate generated file: ' + file.path);
    paths.add(file.path);
  }
  return { id, exportName: exportName(slug), files: produced, diagnostics };
}
