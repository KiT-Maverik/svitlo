import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { materializeCourse } from './materialize.mjs';
import { materializeModule } from '../module/materialize.mjs';
import { materializeChapter } from '../chapter/materialize.mjs';
import { materializeEpisode } from '../episode/materialize.mjs';

const ts = createRequire(import.meta.url)('typescript');
const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const root = path.join(engineRoot, 'temp', 'course-materializer-semantic-check');
const id = suffix => '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0');
const reviewed = {
  purpose: 'Introduce observation',
  audience: 'Beginning learners',
  approach: 'Observe',
  depth: 'Introductory',
  accessibility: 'Accessible representations',
  scope: 'First observations',
  entryConditions: 'None assumed',
  sourceNotes: 'Verified educational references',
};
const production = {
  languages: { document: 'uk', planned: ['uk'] },
  methodology: reviewed,
  outcomes: { explanation: 'Explain observable changes' },
  prerequisites: { explanation: 'None assumed' },
  standardsAlignment: [],
  openDecisions: {},
};
const episode = {
  config: {
    type: 'episode',
    slug: 'story',
    params: { languages: ['uk'] },
    locale: { title: { uk: 'Історія' } },
    children: [],
  },
  production: { focus: 'Apply observations', purpose: 'Motivate next concept' },
};
const chapter = {
  config: {
    type: 'chapter',
    slug: 'chapter',
    locale: { title: { uk: 'Розділ' } },
    children: ['story'],
    story: episode,
  },
  production: {
    methodology: 'Explain the sequencing choice',
    outcomes: { skills: [] },
    prerequisites: { skills: [] },
    depth: 'Introductory',
    sequenceReason: 'Observe before explaining',
  },
};
const module = {
  config: {
    type: 'module',
    slug: 'module',
    locale: { title: { uk: 'Модуль' } },
    children: ['chapter'],
    chapter,
  },
  production: {
    methodology: 'Introduce the domain',
    outcomes: { skills: [] },
    prerequisites: { skills: [] },
    depth: 'Introductory',
    sequenceReason: 'Foundation first',
  },
};
const course = {
  config: {
    type: 'course',
    id: id(1),
    slug: 'skyBasics',
    params: {},
    locale: { title: { uk: 'Основи' }, description: { uk: 'Опис курсу' } },
    children: ['module'],
    module,
  },
  production,
};

const compilerDiagnostics = files => {
  const read = ts.readConfigFile(path.join(engineRoot, 'tsconfig.json'), ts.sys.readFile);
  if (read.error) throw Error(ts.flattenDiagnosticMessageText(read.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, engineRoot);
  assert.equal(parsed.errors.length, 0, 'Engine tsconfig must parse');
  const opts = {
    ...parsed.options,
    noEmit: true,
    incremental: false,
    composite: false,
    baseUrl: engineRoot,
    paths: {
      ...parsed.options.paths,
      '@svitlo/engine/build': ['build.ts'],
      '#coursesData/*': ['temp/course-materializer-semantic-check/constants.ts'],
    },
  };
  const generated = new Map(
    files.filter(file => file.kind === 'typescript').map(file => [path.resolve(root, file.path), file.content]),
  );
  const host = ts.createCompilerHost(opts);
  const originalGetSourceFile = host.getSourceFile.bind(host);
  const originalFileExists = host.fileExists.bind(host);
  const originalReadFile = host.readFile.bind(host);
  const originalDirectoryExists = host.directoryExists?.bind(host);
  const key = value => path.resolve(value);
  host.fileExists = file => generated.has(key(file)) || originalFileExists(file);
  host.readFile = file => generated.get(key(file)) ?? originalReadFile(file);
  host.directoryExists = dir =>
    [...generated.keys()].some(file => file.startsWith(key(dir) + path.sep)) || originalDirectoryExists?.(dir) || false;
  host.getSourceFile = (file, version, onError, newFile) =>
    generated.has(key(file))
      ? ts.createSourceFile(file, generated.get(key(file)), version, true)
      : originalGetSourceFile(file, version, onError, newFile);
  const program = ts.createProgram([...generated.keys()], opts, host);
  return ts.getPreEmitDiagnostics(program);
};

test('complete Course -> Module -> Chapter -> Episode emitted sources typecheck against the real Engine Build API', () => {
  const context = {
    sourceLanguage: 'uk',
    courseId: id(1),
    textbookRoot: 'content/playground',
    deriveId: (kind, location) => (kind === 'module' ? id(2) : kind === 'chapter' ? id(3) : id(4)),
    materializeModule,
    materializeChapter,
    materializeEpisode,
  };
  const result = materializeCourse(course, context);
  assert.equal(
    result.diagnostics.some(value => value.severity === 'blocker'),
    false,
  );
  assert.equal(result.files.filter(file => file.kind === 'typescript').length, 4);
  // The full Stage 5 orchestration owns the single Course-root constants.ts.
  // This lower-level composition fixture must supply that real Stage 5 contract
  // while validating the separately generated parent/child Configurators.
  const files = [
    ...result.files,
    {
      path: 'constants.ts',
      kind: 'typescript',
      content: "export const languages = ['uk'] as const;\nexport type Languages = typeof languages;\n",
    },
  ];
  const errors = compilerDiagnostics(files);
  assert.deepEqual(
    errors.map(error => {
      const place = error.file?.getLineAndCharacterOfPosition(error.start ?? 0);
      return (
        (error.file?.fileName ?? '<compiler>') +
        ':' +
        (place ? place.line + 1 : 0) +
        ' TS' +
        error.code +
        ': ' +
        ts.flattenDiagnosticMessageText(error.messageText, ' ')
      );
    }),
    [],
  );
});
