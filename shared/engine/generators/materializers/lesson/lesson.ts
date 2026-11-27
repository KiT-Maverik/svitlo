import type { Lesson_Config } from '../../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { LessonProductionAssessmentRequirements } from '../../../types/workflow/lessonAssessment.types';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';
import { createSourceIdentifierRegistry } from '../sourceIdentifiers.mjs';

/**
 * Standalone Lesson source materializer. Accepts ordinary authored Config data,
 * not a live Configurator or YAML parser. Sections are independently delegated
 * to the same renderer used by the Course Episode materializer.
 */
export type ChildConfig = { id: string; slug: string; type: string; [key: string]: unknown };
export type SourceChild = ChildConfig | { config: ChildConfig; production?: Record<string, unknown> };
/**
 * A complete, standalone Lesson Config, not a Course Stage 3 placement.
 * The Course Stage 5 handoff creates a typed LessonWorkflowStage1 index.ts
 * without Sections, not a completed defineLesson source. This emitter is for
 * the later, independently authorized standalone Lesson materialization only.
 * Stage 3 new Lessons lack identity, publication languages and Sections.
 * Optional audience age/grade ranges remain Config params.
 */
export type Source = Omit<Lesson_Config, 'section'> & {
  section: { items: Record<string, SourceChild>; order: string[] };
};
export type GeneratedFile = {
  path: string;
  content: string;
  kind: 'typescript' | 'specification' | 'markdown' | 'code';
};
export type Diagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type Result = { exportName: string; files: GeneratedFile[]; diagnostics: Diagnostic[] };
export type Options = {
  documentLanguage: string;
  directory?: string;
  /** Review metadata is separate from Lesson Config; Sections are never synthesized here. */
  production?: Record<string, unknown> & {
    assessment?: LessonProductionAssessmentRequirements;
  };
  /** Only references verified against the owning textbook Stage 2 source. */
  skillReferences?: readonly (Readonly<{ id: string; path: string; exported: string }> | null)[];
  renderSection: (
    config: ChildConfig,
    options: {
      directory: string;
      documentLanguage: string;
      languagesImport: string;
      production?: Record<string, unknown>;
    },
  ) => Result;
};
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const localeKey = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const sectionTypes = new Set(['content', 'practice', 'codingTask', 'learningFlow', 'flashcards', 'quiz', 'quest']);
const reserved = new Set([
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
  'let',
  'static',
  'languages',
  'content',
  'section',
  'stages',
  'tasks',
]);
const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
const reference = Symbol('authored import');
type Reference = { [reference]: string };
const imported = (name: string): Reference => ({ [reference]: name });
const exported = (name: string): string => (reserved.has(name) ? 'config_' + name : name);
function part(value: string, location: string): void {
  if (typeof value !== 'string' || !slug.test(value) || value === '__proto__' || value === 'constructor')
    throw new Error(location + ': unsafe or missing camelCase slug');
}
function destination(directory: string, name: string): string {
  if (directory) for (const segment of directory.split('/')) part(segment, 'output path');
  return [directory, name].filter(Boolean).join('/');
}
function render(value: unknown, depth = 0): string {
  if (isObject(value) && reference in value) return String(value[reference]);
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
    return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(item => render(item, depth + 1)).join(', ') + ']';
  if (!isObject(value)) throw new Error('Unsupported non-JSON authoring value');
  const entries = Object.keys(value);
  if (!entries.length) return '{}';
  return (
    '{\n' +
    entries
      .map(key => {
        const child = value[key];
        const name = isObject(child) && reference in child ? String(child[reference]) : undefined;
        return (
          '  '.repeat(depth + 1) + (name === key ? key : JSON.stringify(key) + ': ' + render(child, depth + 1)) + ','
        );
      })
      .join('\n') +
    '\n' +
    '  '.repeat(depth) +
    '}'
  );
}
function filterLocale(value: unknown, source: string): unknown {
  if (Array.isArray(value)) return value.map(child => filterLocale(child, source));
  if (!isObject(value)) return value;
  const keys = Object.keys(value);
  if (keys.length && keys.every(key => localeKey.test(key)))
    return Object.hasOwn(value, source) ? { [source]: filterLocale(value[source], source) } : {};
  return Object.fromEntries(keys.map(key => [key, filterLocale(value[key], source)]));
}
function sourceNode(value: SourceChild): { config: ChildConfig; production?: Record<string, unknown> } {
  if (isObject(value) && isObject(value.config))
    return {
      config: value.config as ChildConfig,
      ...(isObject(value.production) ? { production: value.production } : {}),
    };
  return { config: value as ChildConfig };
}
/** Exact Section order; no implicit sorting or inferred child identities. */
function validateSections(source: Source): void {
  if (!isObject(source.section) || !isObject(source.section.items) || !Array.isArray(source.section.order))
    throw new Error('lesson.section: expected { items, order }');
  const keys = Object.keys(source.section.items);
  if (
    keys.length !== source.section.order.length ||
    new Set(source.section.order).size !== keys.length ||
    source.section.order.some(key => typeof key !== 'string' || !Object.hasOwn(source.section.items, key))
  )
    throw new Error('lesson.section.order: expected every item once');
  const ids = new Set<string>([source.id]);
  for (const key of keys) {
    part(key, 'lesson.section.items.' + key);
    const { config } = sourceNode(source.section.items[key]);
    if (!isObject(config) || !uuid.test(config.id) || config.slug !== key || !sectionTypes.has(config.type))
      throw new Error('lesson.section.items.' + key + ': invalid Section type/UUID/slug');
    if (ids.has(config.id)) throw new Error('lesson.section.items.' + key + ': duplicate UUID ' + config.id);
    ids.add(config.id);
  }
}
export function materializeLesson(config: Source, options: Options): Result {
  const dir = options.directory ?? '';
  destination(dir, 'index.ts');
  if (!isObject(config) || config.type !== 'lesson' || !uuid.test(config.id))
    throw new Error(
      'lesson: a complete standalone Lesson Config with a persisted UUID is required, not a Course Stage 3 placement or built override',
    );
  part(config.slug, 'lesson.slug');
  if (!localeKey.test(options.documentLanguage)) throw new Error('lesson: invalid documentLanguage');
  const planned = config.params?.languages;
  if (
    !Array.isArray(planned) ||
    !planned.length ||
    planned.some(language => typeof language !== 'string' || !localeKey.test(language)) ||
    new Set(planned).size !== planned.length
  )
    throw new Error('lesson.params.languages: invalid planned language set');
  if (!planned.some(language => language === options.documentLanguage))
    throw new Error('lesson.params.languages: source language must be in planned languages');
  validateSections(config);
  // A completed Lesson must not be emitted with a missing required Section.
  // A comment alone cannot satisfy defineLesson.build.data()'s enabled-Quiz
  // invariant. Course-originated Stage 1 handoffs never invoke this materializer.
  const enabled = config.section.order
    .map(key => sourceNode(config.section.items[key]).config)
    .filter(section => !(isObject(section.params) && section.params.disabled === true));
  const hasQuiz = enabled.some(section => section.type === 'quiz');
  const hasFlashcards = enabled.some(section => section.type === 'flashcards');
  if (
    (config.params.quizRequiredForCompletion === true ||
      options.production?.assessment?.quizSectionRequired === true) &&
    !hasQuiz
  )
    throw new Error(
      'TODO (BLOCKER): Cannot emit complete Lesson source: an enabled Quiz Section is required before standalone materialization; author it in the Lesson workflow without changing quizRequiredForCompletion.',
    );
  if (options.production?.assessment?.flashcardsSectionRequired === true && !hasFlashcards)
    throw new Error(
      'TODO (BLOCKER): Cannot emit complete Lesson source: an enabled Flashcards Section is required before standalone materialization; author it in the Lesson workflow.',
    );

  // Derive the complete human-readable methodology *before* delegating
  // Sections. A Section may be told that its reviewed metadata was integrated
  // only when every substantive source note is present in this document.
  const methodology = typeof options.production?.methodology === 'string' ? options.production.methodology.trim() : '';
  const additions: string[] = [];
  const append = (heading: string, value: unknown): void => {
    if (typeof value !== 'string' || !value.trim()) return;
    const normalized = value.trim();
    if (methodology.includes(normalized) || additions.some(item => item.includes(normalized))) return;
    additions.push('## ' + heading + '\n\n' + normalized);
  };
  append('Learning objective', options.production?.objective);
  append('Depth and scope', options.production?.depth);
  append('Learning sequence rationale', options.production?.sequenceReason);
  append('Assessment evidence', options.production?.assessmentEvidence);
  const assessment = options.production?.assessment;
  if (assessment) {
    const decisions = [
      ['Question Bank (Stage 7)', assessment.questionBankRequired],
      ['Flashcard Bank (Stage 8)', assessment.flashcardBankRequired],
      ['Quiz Section', assessment.quizSectionRequired],
      ['Flashcards Section', assessment.flashcardsSectionRequired],
    ].map(([name, required]) => '- ' + name + ': ' + (required ? 'required' : 'not required'));
    const decisionText = decisions.join('\n');
    if (!methodology.includes(decisionText)) additions.push('## Assessment decisions\n\n' + decisionText);
  }
  const integratedSections = new Set<string>();
  const names: Record<string, string> = {
    purpose: 'Purpose',
    pedagogicalIntent: 'Pedagogical intent',
    specification: 'Specification',
    prompt: 'Prompt',
    script: 'Script',
    storyboard: 'Storyboard',
    accessibility: 'Accessibility',
    offline: 'Offline use',
    weakDeviceAlternative: 'Weak-device alternative',
    readiness: 'Production readiness',
  };
  for (const sectionKey of config.section.order) {
    const section = sourceNode(config.section.items[sectionKey]);
    if (!section.production) continue;
    const notes: string[] = [];
    let allTransferred = true;
    let hasReviewedNotes = false;
    for (const [key, value] of Object.entries(section.production)) {
      if (['pending', 'documentLanguage', 'methodologyIntegrated'].includes(key)) continue;
      hasReviewedNotes = true;
      // Source provenance is intentionally not materialized as editorial copy.
      // Leave a guard instead of falsely acknowledging its transfer.
      if (key === 'sourceEvidence' || typeof value !== 'string' || !value.trim()) {
        allTransferred = false;
        continue;
      }
      const normalized = value.trim();
      if (methodology.includes(normalized) || additions.some(item => item.includes(normalized))) continue;
      notes.push('**' + (names[key] ?? key) + ':** ' + normalized);
    }
    if (notes.length)
      additions.push('### Section: ' + sectionKey + ' (' + section.config.type + ')\n\n' + notes.join('\n\n'));
    if (allTransferred && hasReviewedNotes) integratedSections.add(sectionKey);
  }
  const combinedMethodology = [methodology, ...additions].filter(Boolean).join('\n\n').trim();

  const files: GeneratedFile[] = [],
    diagnostics: Diagnostic[] = [];
  const seen = new Set<string>(),
    imports: string[] = [];
  const add = (file: GeneratedFile): void => {
    if (seen.has(file.path)) throw new Error('lesson: duplicate output ' + file.path);
    seen.add(file.path);
    files.push(file);
  };
  const items: Record<string, Reference> = {};
  const claim = createSourceIdentifierRegistry('lesson', [
    'defineLesson',
    'languages',
    'Languages',
    'section',
    exported(config.slug),
  ]);
  let hasQuest = false;
  for (const key of Object.keys(config.section.items).sort()) {
    const node = sourceNode(config.section.items[key]);
    if (node.config.type === 'quest') hasQuest = true;
    const childDir = destination(dir, 'sections/' + key);
    const languagesImport = '#lessonsData/' + config.id.slice(-1).toLowerCase() + '/' + config.id + '/constants';
    const child = options.renderSection(node.config, {
      directory: childDir,
      documentLanguage: options.documentLanguage,
      languagesImport,
      ...(node.production
        ? {
            production: integratedSections.has(key)
              ? { ...node.production, methodologyIntegrated: true }
              : node.production,
          }
        : {}),
    });
    if (child.exportName !== exported(key)) throw new Error('lesson.section.items.' + key + ': incorrect child export');
    for (const file of child.files) {
      if (!file.path.startsWith(childDir + '/'))
        throw new Error('lesson: Section escaped its source ownership ' + file.path);
      add(file);
    }
    diagnostics.push(...child.diagnostics);
    // Quest has a Build source contract but is not a Lesson runtime Section.
    // Keep its own modules and diagnostic without importing it into defineLesson.
    if (node.config.type === 'quest') continue;
    const name = claim(child.exportName, 'section.items.' + key);
    items[key] = imported(name);
    imports.push('import { ' + name + ' } from ' + JSON.stringify('./sections/' + key) + ';');
  }
  const blockers: string[] = [];
  const skillImports: string[] = [];
  if (!Array.isArray(config.skills) || config.skills.some(id => typeof id !== 'string' || !uuid.test(id)))
    throw new Error('lesson.skills: expected valid Skill UUIDs');
  if (options.skillReferences && options.skillReferences.length !== config.skills.length)
    throw new Error('lesson.skills: reviewed Skill reference count mismatch');
  const resolvedSkills = config.skills.map((id, index) => {
    const skill = options.skillReferences?.[index];
    if (!skill) {
      blockers.push(
        renderBlockerTodo(
          'Import the actual Skill Configurator for ' +
            id +
            ' from this textbook taxonomy in the reviewed Lesson draft before publication.',
        ),
      );
      return id;
    }
    if (
      skill.id !== id ||
      !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(skill.exported) ||
      !/^#skillsData\/(?:[A-Za-z][A-Za-z0-9]*\/)*[A-Za-z][A-Za-z0-9]*$/.test(skill.path)
    )
      throw new Error('lesson.skills: unverified or cross-textbook Skill import');
    const name = claim(skill.exported, 'skills.' + index);
    skillImports.push('import { ' + name + ' } from ' + JSON.stringify(skill.path) + ';');
    return imported(name + '.id');
  });

  const sourceLanguages = [
    "import type { SupportedLanguages } from '@svitlo/engine/build';",
    '',
    ...(planned.length > 1
      ? [
          renderBlockerTodo(
            'Restore reviewed Lesson languages after translation approval and verify locale coverage before removing this marker.',
          ),
          '// export const languages = [',
          ...planned.map(language => '//   ' + JSON.stringify(language) + ','),
          '// ] as const satisfies SupportedLanguages;',
          '',
        ]
      : []),
    'export const languages = ' +
      JSON.stringify([options.documentLanguage]) +
      ' as const satisfies SupportedLanguages;',
    'export type Languages = typeof languages;',
    '',
  ].join('\n');
  add({ path: destination(dir, 'constants.ts'), kind: 'typescript', content: sourceLanguages });
  if (planned.length > 1)
    diagnostics.push({
      path: destination(dir, 'constants.ts'),
      code: 'pending-localizations',
      message: 'TODO (BLOCKER): Restore reviewed Lesson languages after translation approval.',
      severity: 'warning',
    });
  const assessmentBlockers: string[] = [];
  if (
    options.production?.assessment?.questionBankRequired === true ||
    diagnostics.some(item => item.code === 'pending-quiz')
  ) {
    const message = renderBlockerTodo(
      'Stage 7: author, review and integrate the required Question Bank and Quiz selections; remove after verifying bank UUIDs.',
    );
    assessmentBlockers.push(message);
    diagnostics.push({ path: destination(dir, 'index.ts'), code: 'pending-questions', message, severity: 'warning' });
  }
  if (
    options.production?.assessment?.flashcardBankRequired === true ||
    diagnostics.some(item => item.code === 'pending-flashcards')
  ) {
    const message = renderBlockerTodo(
      'Stage 8: author, review and integrate the required Flashcard Bank and Flashcards selections; remove after verifying bank UUIDs.',
    );
    assessmentBlockers.push(message);
    diagnostics.push({
      path: destination(dir, 'index.ts'),
      code: 'pending-flashcard-bank',
      message,
      severity: 'warning',
    });
  }
  if (hasQuest)
    blockers.push(
      renderBlockerTodo(
        'Implement and verify Quest runtime support or remove the Quest after methodological review before publishing this Lesson.',
      ),
    );
  if (options.production?.pending === true)
    blockers.push(
      renderBlockerTodo(
        'Complete Lesson methodology, secure independent review evidence, and verify approval before removing this marker.',
      ),
    );
  if (blockers.length)
    diagnostics.push({
      path: destination(dir, 'index.ts'),
      code: 'pending-lesson',
      message: blockers.join(' '),
      severity: 'warning',
    });
  const { section: _ignored, ...metadata } = config;
  const params = { ...metadata.params, languages: imported('languages') };
  const own = {
    ...metadata,
    skills: resolvedSkills,
    params,
    locale: filterLocale(metadata.locale, options.documentLanguage),
    section: imported('section'),
  };
  const source = [
    "import { defineLesson } from '@svitlo/engine/build';",
    'import { languages, type Languages } from "./constants";',
    ...skillImports,
    ...imports,
    '',
    ...blockers,
    ...assessmentBlockers,
    'const section = ' + render({ items, order: config.section.order.filter(key => Object.hasOwn(items, key)) }) + ';',
    'export const ' +
      exported(config.slug) +
      ' = defineLesson<' +
      JSON.stringify(config.slug) +
      ', Languages, typeof section.items>(',
    render(own) + ');',
    '',
  ].join('\n');
  if (combinedMethodology)
    add({
      path: destination(dir, 'methodology.md'),
      kind: 'markdown',
      content: combinedMethodology + '\n',
    });
  add({ path: destination(dir, 'index.ts'), kind: 'typescript', content: source });
  return { exportName: exported(config.slug), files, diagnostics };
}

/**
 * Explicit source-release preflight for callers that publish materialized
 * Lessons. Block pending editorial/media/bank dependencies even if someone
 * removes TODO comments from the emitted source text. Parent #775 must wire
 * this into the actual publish/release path and validate real bank membership.
 */
export function assertLessonSourceReleaseReady(result: Result): void {
  const reserved = /\bfeedc0de-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i;
  if (result.files.some(file => file.kind === 'typescript' && reserved.test(file.content)))
    throw new Error('Lesson source publication blocked: reserved provisional assessment UUID (feedc0de-)');
  if (result.diagnostics.length)
    throw new Error(
      'Lesson source publication blocked: unresolved materializer diagnostics (' +
        result.diagnostics.map(item => item.code).join(', ') +
        ')',
    );
}
