/** Inert Episode draft parsing and deterministic restoration of one reserved parent slot. */
import ts from 'typescript';
import { isDeepStrictEqual } from 'node:util';
import { decodeLiteral } from '../courseMaterialization/typed-course-source.mjs';
import { materializeEpisode } from '../../../shared/engine/generators/materializers/episode/materialize.mjs';

const record = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const nonempty = x => typeof x === 'string' && !!x.trim();
const same = (a, b) => isDeepStrictEqual(a, b);
const nameOf = node => ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined;
const safe = x => typeof x === 'string' && slug.test(x) && !['constructor', 'prototype', '__proto__'].includes(x);

export function parseEpisodeDraft(source, type) {
  if (typeof source !== 'string' || source.length > 2 * 1024 * 1024)
    throw Error('Invalid or oversized Episode draft');
  if (!['EpisodeWorkflowStage1Handoff', 'EpisodeWorkflowMaterializerInput'].includes(type))
    throw Error('Unknown Episode draft contract');
  const ast = ts.createSourceFile('draft.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) throw Error('Episode draft has syntax errors');
  const declarations = new Map();
  let selected;
  for (const statement of ast.statements) {
    if (ts.isImportDeclaration(statement) && statement.importClause?.isTypeOnly &&
        ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === '@svitlo/engine/build')
      continue;
    if (!ts.isVariableStatement(statement) || !(statement.declarationList.flags & ts.NodeFlags.Const))
      throw Error('Only inert const declarations and Engine type imports are allowed in Episode draft');
    const exported = statement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
    for (const decl of statement.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer || declarations.has(decl.name.text))
        throw Error('Invalid or duplicate Episode literal declaration');
      declarations.set(decl.name.text, decl.initializer);
      if (exported) {
        const expr = decl.initializer;
        if (selected || !ts.isSatisfiesExpression(expr) || !ts.isTypeReferenceNode(expr.type) ||
            expr.type.typeName.getText(ast) !== type)
          throw Error('Exactly one exported object satisfying ' + type + ' is required');
        selected = expr;
      }
    }
  }
  if (!selected) throw Error('Missing exported reviewed Episode draft');
  for (const expr of declarations.values()) decodeLiteral(expr, declarations);
  const result = decodeLiteral(selected, declarations);
  if (!record(result?.config) || result.config.type !== 'episode' || !record(result.production))
    throw Error('Not an Episode editorial object');
  return result;
}

export function verifyEpisodeHandoff(handoff, reviewed, meta) {
  const a = handoff.config, b = reviewed.config, p = handoff.production, q = reviewed.production;
  if (!safe(a.slug) || !['id','slug','type'].every(key => a[key] === b[key]) ||
      Object.keys(a).some(key => !['id','slug','type'].includes(key)) ||
      p.placement?.courseId !== meta.courseId || p.placement?.path !== meta.placement ||
      p.placement?.path?.split('/').at(-1) !== a.slug ||
      !/^[a-f0-9]{40}$/.test(p.placement?.reviewedCourseSourceBlobSha ?? '') ||
      !Array.isArray(p.placement?.orderPath) || p.placement.orderPath.length !== meta.placement.split('/').length - 1 ||
      p.placement.orderPath.some(n => !Number.isSafeInteger(n) || n < 0) ||
      !nonempty(p.focus) || !nonempty(p.purpose) ||
      !['placement','languages','focus','purpose'].every(key => same(p[key], q[key])))
    throw Error('Reviewed Episode must preserve the exact allocated Course handoff identity, order, intent and locale scope');
  const languages = q.languages;
  if (!Array.isArray(languages?.planned) || !languages.planned.includes(languages.document) ||
      languages.planned.some(l => typeof l !== 'string' || !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(l)) ||
      new Set(languages.planned).size !== languages.planned.length)
    throw Error('Invalid reviewed Episode locale plan');
  if (!record(q.scenario) || !['audience','entrySituation','exitSituation','continuity','sceneIntent','interactionIntent','accessibility','narrativeConstraints']
      .every(key => nonempty(q.scenario[key])) || !nonempty(q.specification))
    throw Error('Complete reviewed Episode scenario and specification required');
  if (Object.keys(b).some(key => !['id','slug','type','params','locale','section','events'].includes(key)) ||
      Object.keys(b.events ?? {}).length || b.params?.languages !== undefined || !record(b.section?.items) ||
      !Array.isArray(b.section.order) || !b.section.order.length)
    throw Error('Complete Episode source Sections required; no Lesson-owned fields or publication language params');
  if (!nonempty(typeof b.locale?.title === 'string' ? b.locale.title : b.locale?.title?.[languages.document]))
    throw Error('Episode source-language title required');
  return true;
}

/** Modify only the trusted generated content map/order and the exact pending Episode marker. */
export function restoreEpisodePlacement(parent, placement, exportName, { rootParent = false } = {}) {
  const { slug: key, path, episodeId, orderIndex } = placement;
  if (!safe(key) || typeof exportName !== 'string' || !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName)) throw Error('Unsafe Episode import identity');
  const blockPattern = /^\/\/ TODO \(BLOCKER\): Episode Stage 1 handoffs are not completed Episode Configurators\. Do not publish\.\r?\n\/\/ Reviewed original content order: (.+)\r?\n\/\/ Pending Episode handoffs: (.+)\r?\n/gm;
  const blocks = [...parent.matchAll(blockPattern)];
  if (blocks.length !== 1) throw Error('Exactly one direct-parent Episode handoff marker required');
  const [block] = blocks;
  const originalOrder = JSON.parse(block[1]), pending = JSON.parse(block[2]);
  if (!Array.isArray(originalOrder) || originalOrder.some(k => !safe(k)) ||
      new Set(originalOrder).size !== originalOrder.length || originalOrder[orderIndex] !== key ||
      !Array.isArray(pending) || pending.filter(row => row.path === path && row.episodeId === episodeId &&
        row.slug === key && row.orderIndex === orderIndex && row.handoffPath === path + '/draft.ts').length !== 1 ||
      pending.filter(row => row.slug === key || row.path === path || row.episodeId === episodeId).length !== 1)
    throw Error('Reserved Episode placement identity/order does not match parent source');
  const ast = ts.createSourceFile('index.ts', parent, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) throw Error('Invalid parent Configurator source');
  const declarations = ast.statements.filter(ts.isVariableStatement)
    .flatMap(s => [...s.declarationList.declarations]).filter(d => nameOf(d.name) === 'content');
  if (declarations.length !== 1 || !declarations[0].initializer || !ts.isObjectLiteralExpression(declarations[0].initializer))
    throw Error('Parent must retain one literal generated content collection');
  const collection = declarations[0].initializer;
  const prop = name => collection.properties.filter(p => ts.isPropertyAssignment(p) && nameOf(p.name) === name);
  const itemProps = prop('items'), orderProps = prop('order');
  if (collection.properties.length !== 2 || itemProps.length !== 1 || orderProps.length !== 1 ||
      !ts.isObjectLiteralExpression(itemProps[0].initializer) || !ts.isArrayLiteralExpression(orderProps[0].initializer))
    throw Error('Unsupported parent content collection shape');
  const items = itemProps[0].initializer, order = orderProps[0].initializer;
  const keys = items.properties.map(p => {
    if (!ts.isPropertyAssignment(p) || !safe(nameOf(p.name)) || !ts.isIdentifier(p.initializer))
      throw Error('Parent content items must retain generated imported references');
    return nameOf(p.name);
  });
  const active = order.elements.map(el => ts.isStringLiteral(el) ? el.text : null);
  if (keys.includes(key) || new Set(keys).size !== keys.length || keys.some(k => !originalOrder.includes(k)) ||
      !same(active, originalOrder.filter(k => keys.includes(k))))
    throw Error('Parent active content no longer matches reviewed order or slot already exists');
  const alias = 'child_' + key;
  const target = rootParent ? './content/' + key : './' + key;
  if (ast.statements.some(s => ts.isImportDeclaration(s) && ts.isStringLiteral(s.moduleSpecifier) &&
      (s.moduleSpecifier.text === target || s.moduleSpecifier.text === target + '/index')))
    throw Error('Episode parent import already exists');
  if (new RegExp('\\b' + alias + '\\b').test(parent)) throw Error('Episode import alias already exists');
  const entries = items.properties.map(p => JSON.stringify(nameOf(p.name)) + ': ' + p.initializer.getText(ast));
  entries.push(JSON.stringify(key) + ': ' + alias);
  const nextOrder = originalOrder.filter(k => k === key || keys.includes(k));
  const remaining = pending.filter(row => row.path !== path);
  const marker = remaining.length ? '// TODO (BLOCKER): Episode Stage 1 handoffs are not completed Episode Configurators. Do not publish.\n' +
    '// Reviewed original content order: ' + JSON.stringify(originalOrder) + '\n// Pending Episode handoffs: ' + JSON.stringify(remaining) + '\n' : '';
  const changes = [
    { start: items.getStart(ast), end: items.end, value: '{ ' + entries.join(', ') + ' }' },
    { start: order.getStart(ast), end: order.end, value: JSON.stringify(nextOrder) },
    { start: block.index, end: block.index + block[0].length, value: marker },
  ].sort((a,b) => b.start - a.start);
  let result = parent;
  for (const edit of changes) result = result.slice(0, edit.start) + edit.value + result.slice(edit.end);
  return 'import { ' + exportName + ' as ' + alias + ' } from ' + JSON.stringify(target) + ';\n' + result;
}

export function planEpisode(handoff, reviewed, meta, parentSource, materializeSection) {
  verifyEpisodeHandoff(handoff, reviewed, meta);
  const production = reviewed.production;
  const { document, planned } = production.languages;
  const placement = meta.placement;
  const languagesImport = '#coursesData/' + meta.courseId.at(-1) + '/' + meta.courseId + '/' + placement + '/languages';
  const result = materializeEpisode({
    config: { ...reviewed.config, params: { ...reviewed.config.params, languages: planned } },
    production: { ...production, plannedLanguages: planned },
  }, {
    directory: placement, sourceLanguage: document, plannedLanguages: planned,
    materializeSection: (node, context) => materializeSection(node, { ...context, documentLanguage: document, languagesImport }),
  });
  const prefix = meta.courseRoot + '/';
  const index = result.files.find(file => file.path === placement + '/index.ts');
  if (!index || result.id !== reviewed.config.id || result.pendingEpisode)
    throw Error('Episode materializer did not produce the reviewed Configurator');
  // One active locale tuple is shared by Episode and its Sections.
  const localLanguages = 'const languages = ' + JSON.stringify([document]) + ' as const satisfies SupportedLanguages;';
  if (!index.content.includes(localLanguages)) throw Error('Expected deterministic Episode language declaration');
  index.content = index.content.replace("import type { SupportedLanguages } from '@svitlo/engine/build';", "import { languages } from './languages';")
    .replace(localLanguages, '');
  index.content = '// TODO (BLOCKER): Human Media Generation Stage 9 requires explicit verified completion or human-confirmed N/A.\n' +
    '// TODO (BLOCKER): Human QA Stage 10 requires actual inspection in Course context and explicit revision-pinned acceptance.\n' +
    '// Reviewed Episode draft blob: ' + meta.sourceBlobSha + '\n' +
    '// Reviewed Episode HEAD: ' + meta.head + '\n' + index.content;
  const files = [...result.files, { path: placement + '/languages.ts', kind: 'typescript',
    content: "import type { SupportedLanguages } from '@svitlo/engine/build';\nexport const languages = " +
      JSON.stringify([document]) + ' as const satisfies SupportedLanguages;\n' }];
  const parent = restoreEpisodePlacement(parentSource, {
    path: placement, slug: reviewed.config.slug, episodeId: result.id,
    orderIndex: production.placement.orderPath.at(-1),
  }, result.exportName, { rootParent: placement.split('/').length === 2 });
  const outputs = files.map(file => ({ ...file, path: prefix + file.path }));
  outputs.push({ path: meta.parentPath, kind: 'typescript', content: parent });
  return { files: outputs, diagnostics: result.diagnostics, episodeId: result.id, publishable: false };
}
