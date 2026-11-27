import { createSourceIdentifierRegistry } from '../sourceIdentifiers.mjs';
import { normalizeWorkflowLocalized } from '../normalizeWorkflowLocalized.mjs';
import { renderPendingChildStub, renderPendingChildImport } from '../course/renderPendingChildStub.mjs';
import { bindVerifiedSkills } from '../course/bindVerifiedSkills.mjs';
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
const exportName = slug => slug;
const sidecars = (meta, dir) => {
  if (meta === undefined) return [];
  if (!record(meta)) throw Error(dir + '.production: typed production object required');
  const files = [];
  if (meta.methodology !== undefined) {
    if (
      typeof meta.methodology !== 'string' ||
      !meta.methodology.trim() ||
      !record(meta.outcomes) ||
      !record(meta.prerequisites) ||
      typeof meta.depth !== 'string' ||
      typeof meta.sequenceReason !== 'string'
    )
      throw Error(dir + '.production: unit methodology, outcomes, prerequisites, depth and rationale required');
    const scope = value =>
      Object.keys(value).length
        ? Object.entries(value)
            .map(
              ([key, ids]) =>
                '- **' +
                key +
                '**: ' +
                (Array.isArray(ids)
                  ? ids.length
                    ? ids.map(id => '\x60' + id + '\x60').join(', ')
                    : 'None'
                  : String(ids)),
            )
            .join('\n')
        : 'None recorded';
    const body = [
      '# Module methodology',
      '## Methodology',
      meta.methodology.trimEnd(),
      '## Intended learning outcomes',
      scope(meta.outcomes),
      '## Entry prerequisites',
      scope(meta.prerequisites),
      '## Depth',
      meta.depth.trimEnd(),
      '## Sequence rationale',
      meta.sequenceReason.trimEnd(),
    ];
    files.push({
      path: [dir, 'methodology.md'].filter(Boolean).join('/'),
      kind: 'markdown',
      content: body.join('\n\n') + '\n',
    });
  }
  const covered = [
    'documentLanguage',
    'methodology',
    'plannedLanguages',
    'languages',
    'pending',
    'outcomes',
    'prerequisites',
    'depth',
    'sequenceReason',
  ];
  const remaining = Object.entries(meta).filter(([key]) => !covered.includes(key));
  if (remaining.length)
    files.push({
      path: [dir, 'specification.md'].filter(Boolean).join('/'),
      kind: 'specification',
      content:
        remaining
          .map(
            ([key, value]) =>
              '# ' + key + '\n\n' + (typeof value === 'string' ? value.trimEnd() : JSON.stringify(value, null, 2)),
          )
          .join('\n\n') + '\n',
    });
  return files;
};

/** Materialize module plain Config as authored TS; child source is delegated, never inlined. */
export function materializeModule(input, context = {}) {
  const config = unwrap(input),
    meta = production(input),
    dir = context.directory ?? '';
  if (dir && dir.split('/').some(part => !slugPattern.test(part))) throw Error(dir + ': unsafe generated directory');
  const { id, slug } = identity(config, context, dir, 'module'),
    lang = source(context);
  if (config.type !== 'module') throw Error(dir + ': expected module Config');
  // Ordered placements are authored directly on the Config root. The legacy
  // content.items/order wrapper is not an accepted alternative representation.
  if (Object.hasOwn(config, 'content')) throw Error(dir + '.content: legacy Course hierarchy wrapper is forbidden');
  const metadata = new Set(['id', 'type', 'slug', 'params', 'locale', 'children']);
  const keys = Object.keys(config).filter(key => !metadata.has(key));
  const order = config.children;
  if (!Array.isArray(order)) throw Error(dir + '.children: expected placement order');
  if (
    keys.some(key => !/^[A-Za-z][A-Za-z0-9]*$/.test(key) || ['__proto__', 'prototype', 'constructor'].includes(key)) ||
    new Set(order).size !== order.length ||
    keys.length !== order.length ||
    order.some(key => typeof key !== 'string' || !Object.hasOwn(config, key))
  )
    throw Error(dir + '.children: each child key must appear exactly once');
  const planned = context.plannedLanguages ?? [lang];
  if (!Array.isArray(planned) || !planned.includes(lang) || new Set(planned).size !== planned.length)
    throw Error(dir + '.params.languages: source language missing or duplicate');
  const claim = createSourceIdentifierRegistry('module', ['defineModule', 'Languages', 'content', exportName(slug)]);
  const imports = [],
    inlineImports = new Set(),
    items = {},
    files = [],
    diagnostics = [],
    placements = [],
    pendingPlacements = [],
    pendingEpisodes = [],
    seenIds = new Set(),
    reusedLessonIds = new Set();
  for (const key of order) {
    ensure(key, dir + '.children.' + key);
    const node = config[key],
      raw = unwrap(node);
    if (!record(raw) || typeof raw.type !== 'string')
      throw Error(dir + '.children.' + key + ': missing child type');
    if (raw.slug !== undefined && raw.slug !== key)
      throw Error(dir + '.children.' + key + ': child slug mismatch');
    const nodeConfig = { ...raw, slug: raw.type === 'lesson' ? (raw.slug ?? key) : key };
    const nested = record(node?.config) ? { ...node, config: nodeConfig } : nodeConfig;
    const childFolder = [dir, key].filter(Boolean).join('/');
    const childContext = {
      ...context,
      sourceLanguage: lang,
      directory: childFolder,
      placement: key,
      orderPath: [...(context.orderPath ?? []), order.indexOf(key)],
      plannedLanguages: planned,
    };
    let child;
    switch (raw.type) {
      case 'chapter':
        if (typeof context.materializeChapter !== 'function')
          throw Error(childFolder + ': Chapter materializer missing');
        child = context.materializeChapter(nested, childContext);
        break;
      case 'episode':
        if (typeof context.materializeEpisode !== 'function')
          throw Error(childFolder + ': Episode materializer missing');
        child = context.materializeEpisode(nested, childContext);
        break;
      case 'assessment':
        if (typeof context.materializeAssessment !== 'function')
          throw Error(childFolder + ': Assessment placeholder materializer required');
        child = context.materializeAssessment(nested, childContext);
        if (!child?.pendingAssessment || typeof child.id !== 'string')
          throw Error(childFolder + ': Assessment must remain a blocked inline placeholder');
        break;
      case 'lesson': {
        const lessonProduction = production(node);
        if (!record(lessonProduction) || !['new', 'existing'].includes(lessonProduction.kind))
          throw Error(childFolder + '.production.kind: completed Stage 3 Lesson requires new or existing');
        if (raw.slug !== key) throw Error(childFolder + '.config.slug: must equal its placement key');
        if (raw.id !== undefined || raw.lessonId !== undefined || raw.overrides !== undefined)
          throw Error(childFolder + '.config: Lesson identity and sparse overrides belong to production');
        if (!Array.isArray(raw.skills) || !raw.skills.length)
          throw Error(childFolder + '.config.skills: nonempty verified Skills required');
        if (
          !record(lessonProduction.assessment) ||
          ['questionBankRequired', 'flashcardBankRequired', 'quizSectionRequired', 'flashcardsSectionRequired'].some(
            field => typeof lessonProduction.assessment[field] !== 'boolean',
          )
        )
          throw Error(childFolder + '.production.assessment: four explicit assessment decisions are required');
        if (typeof context.materializeLessonPlacement !== 'function')
          throw Error(childFolder + ': parent Lesson placement bridge required');
        let existing;
        if (lessonProduction.kind === 'existing') {
          existing = lessonProduction.existing;
          if (!record(existing) || typeof existing.id !== 'string' || !uuid.test(existing.id))
            throw Error(childFolder + '.production.existing.id: verified Lesson UUID required');
          if (
            !record(lessonProduction.matching) ||
            !String(lessonProduction.matching.sourceSha ?? '').trim() ||
            !String(lessonProduction.matching.methodologySourcePath ?? '').trim()
          )
            throw Error(childFolder + '.production.matching: verified methodology and source revision required');
          if (Object.keys(raw).some(field => !['type', 'slug', 'skills'].includes(field)))
            throw Error(childFolder + '.config: reused Lesson cannot duplicate independent Config');
          if (
            Object.keys(existing).some(field => !['id', 'base', 'locale'].includes(field)) ||
            (existing.base !== undefined && !record(existing.base)) ||
            (existing.locale !== undefined && !record(existing.locale)) ||
            (record(existing.base) &&
              ['id', 'slug', 'type', 'skills'].some(field => Object.hasOwn(existing.base, field)))
          )
            throw Error(childFolder + '.production.existing: expected {id,base?,locale?}, not raw patches');
          if (record(existing.locale) && Object.keys(existing.locale).some(code => !planned.includes(code)))
            throw Error(childFolder + '.production.existing.locale: outside reviewed Course languages');
        } else {
          if (
            raw.locale === undefined ||
            typeof lessonProduction.methodology !== 'string' ||
            !lessonProduction.methodology.trim()
          )
            throw Error(childFolder + '.production.methodology: complete new-Lesson methodology and title required');
          if (
            raw.section !== undefined ||
            raw.events !== undefined ||
            raw.params?.languages !== undefined ||
            lessonProduction.existing !== undefined ||
            lessonProduction.lessonId !== undefined ||
            lessonProduction.overrides !== undefined
          )
            throw Error(childFolder + ': new Lesson is a methodology handoff, not a completed Config');
          for (const field of ['objective', 'depth', 'sequenceReason', 'assessmentEvidence'])
            if (typeof lessonProduction[field] !== 'string' || !lessonProduction[field].trim())
              throw Error(childFolder + '.production.' + field + ': Lesson editorial intent missing');
        }
        child = context.materializeLessonPlacement(nested, {
          ...childContext,
          kind: lessonProduction.kind,
          existing,
          lessonId: existing?.id,
          production: lessonProduction,
        });
        const refId = existing?.id ?? child?.lessonId ?? child?.id;
        if (typeof refId !== 'string' || !uuid.test(refId))
          throw Error(childFolder + ': parent must return the permanent new-Lesson UUID');
        if (child?.lessonId !== undefined && child.lessonId !== refId)
          throw Error(childFolder + ': Lesson handoff ID conflicts with verified reuse');
        if (seenIds.has(refId) && (lessonProduction.kind !== 'existing' || !reusedLessonIds.has(refId)))
          throw Error(childFolder + ': duplicate child UUID across independent entities');
        seenIds.add(refId);
        if (lessonProduction.kind === 'existing') reusedLessonIds.add(refId);
        placements.push({
          path: childFolder,
          slug: key,
          kind: lessonProduction.kind,
          lessonId: refId,
          assessment: lessonProduction.assessment,
          ...(existing === undefined ? {} : { existing }),
        });
        if (lessonProduction.kind === 'new') {
          // The parent-owned handoff must write ONLY the independent Lesson Stage 1 authored source.
          // It is not a Lesson Configurator and must never be imported into defineCourse/Module/Chapter.
          if (
            !Array.isArray(child?.files) ||
            child.files.length !== 1 ||
            child.files[0].kind !== 'typescript' ||
            typeof child.files[0].path !== 'string' ||
            typeof child.files[0].content !== 'string' ||
            !child.files[0].path.endsWith('/' + refId.slice(-1) + '/' + refId + '/draft.ts') ||
            !child.files[0].path.includes('/data/lessons/')
          )
            throw Error(childFolder + ': new Lesson bridge must return only the UUID-addressed Stage 1 draft.ts');
          if (/\bdefineLesson\s*[(<]|TODO \(BLOCKER\): Not implemented — Lesson Sections/.test(child.files[0].content))
            throw Error(childFolder + ': Stage 1 handoff cannot contain defineLesson or fabricated Sections');
          pendingPlacements.push({
            path: childFolder,
            slug: key,
            lessonId: refId,
            handoffPath: child.files[0].path,
            orderIndex: order.indexOf(key),
          });
          diagnostics.push({
            path: childFolder,
            code: 'pending-lesson-stage1',
            severity: 'blocker',
            message:
              'Lesson Stage 1 handoff is not a Configurator; parent publisher must wait for an independently authorized Lesson',
          });
        }
        break;
      }
      default:
        throw Error(childFolder + ': disallowed child type ' + raw.type);
    }
    if (!Array.isArray(child?.files)) throw Error(childFolder + ': invalid child materializer result');
    const stage1Lesson = raw.type === 'lesson' && production(node)?.kind === 'new';
    const stage1Episode = raw.type === 'episode' && child.pendingEpisode === true;
    const pendingAssessment = raw.type === 'assessment' && child.pendingAssessment === true;
    if (stage1Episode) {
      const handoffPath = childFolder + '/draft.ts';
      if (child.files.length !== 1 || child.files[0].path !== handoffPath || child.files[0].kind !== 'typescript')
        throw Error(childFolder + ': pending Episode requires exactly one typed draft');
      pendingEpisodes.push({
        path: childFolder,
        slug: key,
        episodeId: child.id,
        handoffPath,
        orderIndex: order.indexOf(key),
      });
    }
    if (!stage1Lesson && !stage1Episode && !pendingAssessment && !child.exportName)
      throw Error(childFolder + ': completed child must export a Configurator');
    if (raw.type !== 'lesson') {
      const resolvedId = raw.id ?? child.id;
      if (typeof resolvedId !== 'string' || !uuid.test(resolvedId))
        throw Error(childFolder + ': child immutable UUID missing');
      if (seenIds.has(resolvedId)) throw Error(childFolder + ': duplicate child UUID');
      seenIds.add(resolvedId);
    }

    if (stage1Lesson || stage1Episode || pendingAssessment) {
      const refId = stage1Lesson ? (child.lessonId ?? child.id) : child.id;
      files.push(renderPendingChildStub({ directory: childFolder, kind: raw.type, id: refId, slug: key }));
      claim(key, 'pending ' + raw.type + ' in children.' + key);
      imports.push(renderPendingChildImport({ kind: raw.type, slug: key, location: './' }));
      items[key] = key;
    } else {
      if (raw.type === 'lesson' && production(node)?.kind === 'existing') {
        if (typeof child.importPath !== 'string' || typeof child.sourceExportName !== 'string')
          throw Error(childFolder + ': verified direct Lesson import missing');
        claim(child.sourceExportName, 'reused Lesson children.' + key);
        imports.push('import { ' + child.sourceExportName + ' } from ' + JSON.stringify(child.importPath) + ';');
        if (child.patchSource !== undefined) {
          if (!inlineImports.has('placeLesson')) claim('placeLesson', 'Build helper for children.' + key);
          inlineImports.add('placeLesson');
          items[key] = 'placeLesson(' + child.sourceExportName + ', ' + child.patchSource + ')';
        } else items[key] = child.sourceExportName;
      } else {
        claim(child.exportName, 'children.' + key);
        imports.push('import { ' + child.exportName + ' } from "./' + key + '";');
        items[key] = child.exportName;
      }
    }
    files.push(...child.files);
    diagnostics.push(...(child.diagnostics ?? []));
    placements.push(...(child.placements ?? []));
    pendingPlacements.push(...(child.pendingPlacements ?? []));
    pendingEpisodes.push(...(child.pendingEpisodes ?? []));
  }
  const fields = { ...config, id, slug };
  for (const key of keys) delete fields[key];
  delete fields.children;
  delete fields.params;
  if (record(fields.locale)) {
    fields.locale = { ...fields.locale };
    for (const field of ['title']) {
      if (fields.locale[field] !== undefined)
        fields.locale[field] = normalizeWorkflowLocalized(
          fields.locale[field],
          lang,
          dir + '.locale.' + field,
          planned,
        );
    }
  }
  const orderSource = JSON.stringify(order);
  const itemsSource =
    '{ ' +
    Object.entries(items)
      .map(([key, name]) => (key === name ? name : JSON.stringify(key) + ': ' + name))
      .join(', ') +
    ' }';
  const attrs = Object.entries(fields)
    .map(([key, value]) => '  ' + JSON.stringify(key) + ': ' + JSON.stringify(value, null, 2) + ',')
    .join('\n');
  const params = config.params ?? {};
  if (!record(params)) throw Error(dir + '.params: Config params object required');
  // Unit Skill targets are editorial methodology, not completed Config/Props.
  for (const field of ['outcomes', 'prerequisites']) {
    if (Object.hasOwn(params, field))
      throw Error(dir + '.config.params.' + field + ': move unit Skill targets to production.' + field);
  }
  // Verify factual IDs against trusted Skill references, but do not generate imports.
  if (meta && (meta.outcomes !== undefined || meta.prerequisites !== undefined)) {
    bindVerifiedSkills(
      { outcomes: meta.outcomes, prerequisites: meta.prerequisites },
      {
        resolveSkill: context.resolveSkill,
        textbookRoot: context.textbookRoot,
        directory: dir,
      },
    );
  }
  const paramsSource = JSON.stringify(params);
  const courseId = context.courseId;
  if (typeof courseId !== 'string' || !uuid.test(courseId))
    throw Error(dir + ': reviewed Course UUID required for canonical languages import');
  const languagesModule = '#coursesData/' + courseId.at(-1).toLowerCase() + '/' + courseId.toLowerCase() + '/constants';
  const result =
    'import { ' +
    ['defineModule', ...inlineImports].join(', ') +
    " } from '@svitlo/engine/build';\n" +
    'import type { Languages } from ' +
    JSON.stringify(languagesModule) +
    ';\n' +
    imports.join('\n') +
    '\n\n' +
    'const __placements = ' + itemsSource + ';\n\n' +
    'export const ' +
    exportName(slug) +
    ' = defineModule<' +
    [JSON.stringify(slug), 'typeof __placements', 'Languages'].join(', ') +
    '>({\n' +
    attrs +
    '\n  params: ' +
    paramsSource +
    ',\n  children: ' + orderSource + ',\n  ...__placements,\n});\n';
  const produced = [
    ...files,
    ...sidecars(meta, dir),
    { path: [dir, 'index.ts'].filter(Boolean).join('/'), kind: 'typescript', content: result },
  ];
  const paths = new Set();
  for (const file of produced) {
    if (paths.has(file.path)) throw Error('duplicate generated file: ' + file.path);
    paths.add(file.path);
  }
  return {
    id,
    exportName: exportName(slug),
    files: produced,
    diagnostics,
    placements,
    pendingPlacements,
    pendingEpisodes,
  };
}
