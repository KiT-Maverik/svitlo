import type { ContentBlock_Scene_Config } from '../../../configurators/contentBlocks/primitive/defineScene/defineScene.schemas';
import { renderBlockerSpecification, renderBlockerTodo } from '../renderBlockerTodo.mjs';
import { renderTemporaryMediaSpecification } from '../renderTemporaryMediaSpecification';

/** Stage-5 source handoff. This is not a Props/JSON publisher or a Scene renderer. */
export type SceneSourceFile = { path: string; content: string; kind: 'typescript' };
export type SceneDiagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type SceneProduction = { specification?: string; pending?: boolean };
/** Draft Scene may be awaiting source copy; strict final defineScene schema is unchanged. */
export type SceneSource = Omit<ContentBlock_Scene_Config, 'params' | 'locale'> & {
  params?: ContentBlock_Scene_Config['params'];
  locale?: Partial<ContentBlock_Scene_Config['locale']>;
};
export type SceneSourceContext = {
  /** Relative to the owning entity's source root; '' is the root module. */
  directory: string;
  /** The reviewed original language; never infer from translation dictionaries. */
  documentLanguage: string;
  /** Import specifier for the parent-owned, source-language-only languages tuple. */
  languagesImport: string;
  /** True only if the caller has verified an executable Scene registry entry. */
  registered?: boolean;
  production?: SceneProduction;
};
export type SceneMaterialization = {
  exportName: string;
  files: SceneSourceFile[];
  diagnostics: SceneDiagnostic[];
};

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slug = /^[a-z][a-zA-Z0-9]*$/;
const locale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const reserved = new Set(
  'await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static'.split(
    ' ',
  ),
);
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function safeDirectory(directory: string): string {
  if (directory === '') return directory;
  if (
    typeof directory !== 'string' ||
    directory.startsWith('/') ||
    directory.split('/').some(part => !slug.test(part) || part === 'constructor' || part === '__proto__')
  ) {
    throw new Error('Scene: unsafe destination directory: ' + directory);
  }
  return directory;
}
function sourceCopy(value: unknown, language: string, path: string): unknown {
  if (Array.isArray(value)) throw new Error(path + ': authored Scene locale must not contain arrays');
  if (!record(value)) return value;
  const entries = Object.entries(value);
  if (entries.length > 0 && entries.every(([key]) => locale.test(key))) {
    if (!Object.hasOwn(value, language)) throw new Error(path + ': missing reviewed source language ' + language);
    return { [language]: sourceCopy(value[language], language, path + '.' + language) };
  }
  return Object.fromEntries(entries.map(([key, child]) => [key, sourceCopy(child, language, path + '.' + key)]));
}
function literal(value: unknown, path: string, depth = 0): string {
  if (value === undefined) return 'undefined';
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value))
    return '[' + value.map((part, i) => literal(part, path + '[' + i + ']', depth + 1)).join(', ') + ']';
  if (!record(value) || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) {
    throw new Error(path + ': unsupported executable/non-plain source value');
  }
  const entries = Object.entries(value);
  if (!entries.length) return '{}';
  return (
    '{\n' +
    entries
      .map(
        ([key, part]) =>
          '  '.repeat(depth + 1) + JSON.stringify(key) + ': ' + literal(part, path + '.' + key, depth + 1),
      )
      .join(',\n') +
    '\n' +
    '  '.repeat(depth) +
    '}'
  );
}
/**
 * Emit the Scene Config index.ts with its reviewed temporary specification
 * after the defineScene declaration. This file exists even for consumers that
 * do not generate an executable TSX draft. No specification.md is emitted.
 * No Scene is registered here.
 */
export function materializeScene(config: SceneSource, context: SceneSourceContext): SceneMaterialization {
  if (
    !record(config) ||
    config.type !== 'scene' ||
    typeof config.slug !== 'string' ||
    !slug.test(config.slug) ||
    !uuid.test(config.id)
  )
    throw new Error('Scene requires a canonical type, camelCase slug and immutable UUID');
  if (typeof context.documentLanguage !== 'string' || !locale.test(context.documentLanguage)) {
    throw new Error('Scene: reviewed documentLanguage is required');
  }
  if (!/^(?:\.\.?\/|#|@svitlo\/)/.test(context.languagesImport)) {
    throw new Error('Scene: invalid languages import specifier');
  }
  const directory = safeDirectory(context.directory);
  const source = {
    ...config,
    params: config.params ?? {},
    locale: {
      ...(sourceCopy(config.locale ?? {}, context.documentLanguage, 'scene.locale') as Record<string, unknown>),
    },
  };
  const incompleteSource = config.params === undefined || config.locale?.value === undefined;
  if (incompleteSource && context.production?.pending !== true && context.registered === true) {
    throw new Error('Scene: completed Scene must provide params and locale.value');
  }
  if (source.locale.value === undefined) source.locale.value = {};

  const exportName = reserved.has(config.slug) ? 'config_' + config.slug : config.slug;
  const pending = context.production?.pending === true || context.registered !== true;
  const diagnostics: SceneDiagnostic[] = [];
  const todos: string[] = [];
  if (incompleteSource) {
    todos.push(renderBlockerTodo('Complete Scene params/locale.value with reviewed source before production.'));
    diagnostics.push({
      path: directory || '.',
      code: 'incomplete-scene-source',
      message: 'Source-localized Scene value or params remains incomplete',
      severity: 'warning',
    });
  }
  if (pending) {
    todos.push(
      renderBlockerTodo(
        'Implement and register Scene ' + config.id + ' before production; Draft Preview may use SceneStub.',
      ),
    );
    diagnostics.push({
      path: directory || '.',
      code: 'pending-scene',
      message: 'Scene implementation or UUID registration is not verified',
      severity: 'warning',
    });
  }
  const specification = context.production?.specification;
  if (typeof specification !== 'string' || !specification.trim()) {
    todos.push(renderBlockerTodo('Provide the reviewed Scene specification for ' + config.id + '.'));
    diagnostics.push({
      path: directory || '.',
      code: 'missing-scene-specification',
      message: 'Reviewed Scene specification is missing',
      severity: 'warning',
    });
  }
  const inlineSpecification =
    typeof specification === 'string' && specification.trim()
      ? renderTemporaryMediaSpecification({ specification }, 'Scene')
      : '';
  if (inlineSpecification)
    diagnostics.push({
      path: (directory ? directory + '/' : '') + 'index.ts',
      code: 'pending-temporary-specification',
      message: 'Remove temporary Scene specification after implementation and verification',
      severity: 'warning',
    });
  const code =
    [
      "import { defineScene } from '@svitlo/engine/build';",
      'import { languages } from ' + JSON.stringify(context.languagesImport) + ';',
      '',
      ...todos,
      'export const ' + exportName + ' = defineScene<' + JSON.stringify(config.slug) + ', typeof languages>(',
      '  ' + literal(source, 'scene') + ',',
      ');',
      '',
    ].join('\n') + inlineSpecification;
  return {
    exportName,
    files: [{ path: (directory ? directory + '/' : '') + 'index.ts', content: code, kind: 'typescript' }],
    diagnostics,
  };
}

/** Shared deterministic templates for the trusted Lesson Stage 6.1 plan and
 * the opt-in historical Scene scaffolding script. Never registers a Scene. */
export function sceneComponentName(authoredSlug: string): string {
  if (typeof authoredSlug !== 'string' || !/^[A-Za-z][A-Za-z0-9]*$/.test(authoredSlug))
    throw new Error('Unsafe Scene slug: ' + String(authoredSlug));
  return authoredSlug[0].toUpperCase() + authoredSlug.slice(1);
}

export function sceneSymbols(authoredSlug: string): { component: string; configurator: string } {
  const component = sceneComponentName(authoredSlug);
  return { component, configurator: component + 'Config' };
}

export type ExecutableSceneDraft = {
  id: string;
  slug: string;
  documentLanguage: string;
  specification?: string;
};

export function sceneFileNames(scene: { slug: string }): string[] {
  const name = sceneComponentName(scene.slug);
  return [
    'index.ts',
    name + '.tsx',
    name + '.module.css',
    name + '.constants.ts',
    name + '.stories.tsx',
    name + '.unit.spec.tsx',
  ];
}

/** Each generated module has an explicit release blocker, not a fake Scene.
 * Prefix every reviewed specification line with // to preserve it without
 * enabling injected code or allowing block-comment delimiters to escape. */
export function renderSceneFiles(scene: ExecutableSceneDraft): Map<string, string> {
  const { id, slug: authoredSlug, documentLanguage, specification } = scene;
  if (!uuid.test(id) || id !== id.toLowerCase()) throw new Error('Scene scaffold requires a canonical lowercase UUID');
  if (!locale.test(documentLanguage)) throw new Error('Invalid reviewed Scene document language');
  if (typeof specification !== 'string' || !specification.trim())
    throw new Error('Scene ' + id + ' needs its reviewed production.specification');
  const name = sceneComponentName(authoredSlug);
  const files = new Map<string, string>();
  files.set(
    'index.ts',
    [
      renderBlockerTodo('Register this Scene UUID only after the implementation, tests and review are complete.'),
      'export { ' + name + " as default } from './" + name + "';",
      '',
    ].join('\n'),
  );
  files.set(
    name + '.tsx',
    [
      "'use client';",
      '',
      "import type { ContentBlock_Scene_Props } from '@svitlo/engine/runtime';",
      "import styles from './" + name + ".module.css';",
      '',
      'export type ' + name + 'Props = {',
      "  locales: ContentBlock_Scene_Props['locale']['value'];",
      '};',
      '',
      renderBlockerSpecification(
        'Implement and accessibly test the reviewed Scene ' +
          id +
          ' before release; remove this temporary brief only after implementation is verified.',
        specification,
      ),
      'export function ' + name + '({ locales }: ' + name + 'Props) {',
      '  void locales;',
      '  return <section className={styles.root} aria-hidden="true" />;',
      '}',
      '',
    ].join('\n'),
  );
  files.set(
    name + '.module.css',
    [
      '/* ' +
        renderBlockerTodo(
          'Implement and test accessible, responsive, reduced-motion Scene styling before release; remove this marker after verified keyboard and motion checks.',
        ).slice(3) +
        ' */',
      '.root {',
      '  inline-size: 100%;',
      '  min-inline-size: 0;',
      '}',
      '',
    ].join('\n'),
  );
  files.set(
    name + '.constants.ts',
    [
      renderBlockerTodo('Define verified, implementation-owned test IDs before release.'),
      'export const testIds = {} as const;',
      '',
    ].join('\n'),
  );
  files.set(
    name + '.stories.tsx',
    [
      'import { ' + name + " } from './" + name + "';",
      '',
      renderBlockerTodo('Implement a Storybook scenario with reviewed source-locale values before release.'),
      'export default { title: ' + JSON.stringify('Scenes/' + name) + ', component: ' + name + ' };',
      'export const PendingImplementation = { render: () => null };',
      '',
    ].join('\n'),
  );
  files.set(
    name + '.unit.spec.tsx',
    [
      "import { describe, it } from 'vitest';",
      '',
      renderBlockerTodo(
        'Replace pending checks with rendering, interactions, accessibility and reset tests before release.',
      ),
      'describe(' + JSON.stringify(name) + ', () => {',
      "  it.todo('implements the reviewed Scene interaction and reset behavior');",
      "  it.todo('provides source-locale accessibility and keyboard/touch parity');",
      '});',
      '',
    ].join('\n'),
  );
  return files;
}
