import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import Module from 'node:module';
import { buildSync } from 'esbuild';
import YAML from 'yaml';
import { fileURLToPath } from 'node:url';
import { discoverTypedCourseSource, selectStage4Review, parseTypedMetadata } from './typed-course-gate.mjs';
import {
  parseCanonicalCourseSource,
  buildTypedCourseManifest,
  checkedSource,
  checkCourseStage3Types,
  reviewedLessonPatchResolver,
} from './typed-course-source.mjs';
import { verifyTypedCourseManifest, checkTypedCourseTargets, oneCommitTree } from './typed-course-publish.mjs';
import { gitBlob } from './course-gate.mjs';
import { materializeCourseEpisodeSection } from './typed-course-section.mjs';
import { createTrustedCourseLessonResolver } from './typed-course-lesson.mjs';

const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const sourcePath = 'content/playground/data/courses/3/' + id + '/draft.ts';
const materializedPath = sourcePath.replace('draft.ts', 'index.ts');
const head = 'a'.repeat(40);
const sourceBlobSha = gitBlob('reviewed source');
const meta = {
  version: 2,
  operation: 'typed-course-stage5',
  number: 456,
  repo: 'KiT-Maverik/svitlo',
  actor: 'trusted',
  reviewer: 'reviewer',
  head,
  branch: 'course/sky',
  textbookRoot: 'content/playground',
  courseId: id,
  sourcePath,
  sourceBlobSha,
  reviewCommitSha: head,
  evidenceUrl: 'https://github.com/KiT-Maverik/svitlo/pull/456#pullrequestreview-42',
};

const literal =
  "import type { CourseWorkflowMaterializerInput } from '@svitlo/engine/build';\n" +
  'const courseStage3 = { config: { id: "' +
  id +
  '", type: "course", slug: "sky" }, ' +
  'production: { languages: { document: "uk", planned: ["uk"] } } } as const;\n' +
  'export const reviewedInput = courseStage3 satisfies CourseWorkflowMaterializerInput;\n';

test('exactly one changed canonical typed Course root is required', () => {
  const file = { filename: sourcePath, status: 'modified' };
  assert.deepEqual(discoverTypedCourseSource([file]), {
    textbookRoot: 'content/playground',
    sourcePath,
    courseId: id,
  });
  for (const bad of [
    [],
    [file, file],
    [{ ...file, status: 'removed' }],
    [{ ...file, filename: sourcePath.replace('/courses/3/', '/courses/a/') }],
    [{ ...file, filename: sourcePath.replace('/draft.ts', '/index.ts') }],
    [file, { filename: 'content/math/data/courses/3/' + id + '/index.ts', status: 'added' }],
    [file, { filename: '.github/workflows/unsafe.yml', status: 'modified' }],
  ])
    assert.throws(() => discoverTypedCourseSource(bad));
});

test('Stage 4 requires independent actual APPROVED review, exact SHA and write access', () => {
  const review = {
    id: 42,
    user: { login: 'reviewer' },
    state: 'APPROVED',
    commit_id: head,
    html_url: meta.evidenceUrl,
  };
  const pr = { head: { sha: head }, user: { login: 'author' } };
  assert.deepEqual(selectStage4Review([review], pr, { reviewer: 'write' }), review);
  assert.throws(() => selectStage4Review([review], pr, { reviewer: 'read' }), /APPROVED/);
  assert.throws(
    () => selectStage4Review([{ ...review, commit_id: 'b'.repeat(40) }], pr, { reviewer: 'write' }),
    /APPROVED/,
  );
  assert.throws(
    () => selectStage4Review([review], { ...pr, user: { login: 'reviewer' } }, { reviewer: 'write' }),
    /APPROVED/,
  );
  assert.throws(
    () => selectStage4Review([review, { ...review, id: 43, state: 'CHANGES_REQUESTED' }], pr, { reviewer: 'write' }),
    /change request/,
  );
});

test('typed meta binds PR, branch, reviewer, original SHA and canonical source path', () => {
  const original = process.env.GITHUB_REPOSITORY;
  const base = process.env.COURSE_DEFAULT_BRANCH;
  process.env.GITHUB_REPOSITORY = meta.repo;
  process.env.COURSE_DEFAULT_BRANCH = 'develop';
  try {
    const encode = value => Buffer.from(JSON.stringify(value)).toString('base64');
    assert.deepEqual(parseTypedMetadata(encode(meta)), meta);
    for (const bad of [
      { ...meta, head: 'b'.repeat(40) },
      { ...meta, reviewCommitSha: 'b'.repeat(40) },
      { ...meta, sourcePath: '../etc/passwd' },
      { ...meta, actor: 'bad actor' },
      { ...meta, branch: 'develop' },
      { ...meta, evidenceUrl: 'https://invalid.test/approval' },
    ])
      assert.throws(() => parseTypedMetadata(encode(bad)));
  } finally {
    if (original === undefined) delete process.env.GITHUB_REPOSITORY;
    else process.env.GITHUB_REPOSITORY = original;
    if (base === undefined) delete process.env.COURSE_DEFAULT_BRANCH;
    else process.env.COURSE_DEFAULT_BRANCH = base;
  }
});

test('inert TypeScript parser accepts canonical literal, never evaluates imported code', () => {
  const input = parseCanonicalCourseSource(literal);
  assert.equal(input.config.id, id);
  assert.deepEqual(input.production.languages.planned, ['uk']);
  for (const injected of [
    literal + '\nprocess.exit(1);',
    literal.replace('const courseStage3 =', 'const courseStage3 = takeSecrets() ||'),
    literal.replace('const courseStage3 =', 'const courseStage3 = { ...evil } ||'),
    "import { lesson } from './evil';\n" + literal,
    'const dormant = process.env.GITHUB_TOKEN;\n' + literal,
    literal.replace('slug: "sky"', 'slug: sideEffect()'),
    literal.replace('slug: "sky"', '[process.env.HOME]: "sky"'),
    literal.replace('slug: "sky"', 'slug: "sky", slug: "duplicate"'),
    literal.replace('slug: "sky"', '__proto__: "polluted"'),
    literal.replace('satisfies CourseWorkflowMaterializerInput', 'satisfies CourseWorkflowStage3'),
  ])
    assert.throws(() => parseCanonicalCourseSource(injected));
});

function testManifest() {
  const plan = {
    sourcePath,
    materializedPath,
    sourceBlobSha,
    reviewCommitSha: head,
    courseId: id,
    publishable: false,
    files: [
      { path: materializedPath, kind: 'typescript', content: 'export const course = true;\n' },
      { path: sourcePath.replace('draft.ts', 'methodology.md'), kind: 'markdown', content: '# Reviewed methodology\n' },
    ],
    diagnostics: [{ code: 'requires-publication-gates', severity: 'blocker' }],
    pendingPlacements: [],
  };
  return buildTypedCourseManifest(meta, plan);
}

test('manifest hashes all output bytes and includes only the canonical draft deletion', () => {
  const manifest = testManifest();
  assert.equal(verifyTypedCourseManifest(manifest, meta), 2);
  assert(manifest.entries.every(entry => /^[a-f0-9]{64}$/.test(entry.sha256)));
  assert.equal(oneCommitTree(manifest).length, 3);
  assert.deepEqual(oneCommitTree(manifest).at(-1), { path: sourcePath, mode: '100644', type: 'blob', sha: null });
  for (const bad of [
    { ...manifest, sourceBlobSha: 'c'.repeat(40) },
    { ...manifest, publishable: true },
    { ...manifest, materializedPath: sourcePath },
    { ...manifest, entries: manifest.entries.slice(1) },
    { ...manifest, entries: [...manifest.entries, manifest.entries[0]] },
    { ...manifest, entries: [{ ...manifest.entries[0], path: '.github/workflows/evil.yml' }, manifest.entries[1]] },
    { ...manifest, entries: [{ ...manifest.entries[0], path: sourcePath + '/../../escape' }, manifest.entries[1]] },
    { ...manifest, entries: [{ ...manifest.entries[0], data: 'ZGFtYWdlZA==' }, manifest.entries[1]] },
  ])
    assert.throws(() => verifyTypedCourseManifest(bad, meta));
});

test('pinned Git tree refuses stale source, existing targets and symlinks before writes', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-typed-course-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  git('init', '-q');
  git('config', 'user.email', 'typed@example.test');
  git('config', 'user.name', 'Course Stage5');
  const absolute = path.join(root, sourcePath);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, literal);
  git('add', sourcePath);
  git('commit', '-qm', 'Reviewed Stage 3');
  const commit = git('rev-parse', 'HEAD');
  const blob = git('rev-parse', 'HEAD:' + sourcePath);
  const scoped = { ...meta, head: commit, reviewCommitSha: commit, sourceBlobSha: blob };
  const manifest = buildTypedCourseManifest(scoped, {
    sourcePath,
    materializedPath,
    sourceBlobSha: blob,
    reviewCommitSha: commit,
    courseId: id,
    publishable: false,
    diagnostics: [],
    pendingPlacements: [],
    files: [
      { path: materializedPath, kind: 'typescript', content: 'export const course = 1;\n' },
      { path: sourcePath.replace('draft.ts', 'methodology.md'), kind: 'markdown', content: '# Reviewed methodology\n' },
    ],
  });
  assert.equal(checkedSource(scoped, root).source, literal);
  assert.equal(checkTypedCourseTargets(scoped, root, manifest), true);
  const external = path.join(root, sourcePath.replace('draft.ts', 'methodology.md'));
  fs.writeFileSync(external, 'an authored collision');
  assert.throws(() => checkTypedCourseTargets(scoped, root, manifest), /overwritten/);
  fs.unlinkSync(external);
  const dir = path.dirname(absolute);
  fs.symlinkSync(absolute, path.join(dir, 'methodology.md'));
  assert.throws(() => checkTypedCourseTargets(scoped, root, manifest), /overwritten/);
  fs.unlinkSync(path.join(dir, 'methodology.md'));
  fs.symlinkSync(path.join(dir, 'missing-target'), path.join(dir, 'methodology.md'));
  assert.throws(() => checkTypedCourseTargets(scoped, root, manifest), /overwritten/);
  fs.unlinkSync(path.join(dir, 'methodology.md'));
  fs.writeFileSync(path.join(dir, 'index.ts'), literal);
  assert.throws(() => checkTypedCourseTargets(scoped, root, manifest), /overwritten/);
  fs.unlinkSync(path.join(dir, 'index.ts'));
  assert.throws(() => checkedSource({ ...scoped, head: 'b'.repeat(40) }, root), /HEAD/);
  assert.throws(() => checkedSource({ ...scoped, sourceBlobSha: 'b'.repeat(40) }, root), /Git blob/);
});

test('typed Course workflow is manual-only', () => {
  const local = filename => fs.readFileSync(fileURLToPath(new URL(filename, import.meta.url)), 'utf8');
  const workflow = YAML.parse(local('../../../.github/workflows/course-typed-materialization.yml'));
  assert.equal(workflow.permissions && Object.keys(workflow.permissions).length, 0);
  assert(workflow.on.workflow_dispatch);
  assert.equal(workflow.on.issue_comment, undefined);
  assert.equal(workflow.jobs.analyze.permissions.contents, 'read');
  assert.equal(workflow.jobs.publish.permissions.contents, 'write');
  assert(!local('./typed-course-source.mjs').includes('eval('));
  assert(!local('./typed-course-source.mjs').includes('new Function('));
});

const reviewedStage3 = {
  config: {
    id,
    slug: 'skyBasics',
    type: 'course',
    locale: { title: { uk: 'Небо' }, description: { uk: 'Природа' } },
    content: {
      items: {
        observation: {
          config: {
            type: 'lesson',
            slug: 'observation',
            skills: ['663572e7-bd85-4516-86e2-3de07d209e04'],
            params: { quizRequiredForCompletion: false },
            locale: { title: { uk: 'Спостереження' } },
          },
          production: {
            kind: 'new',
            methodology: 'Complete independently reviewed methodology for observing sky changes',
            objective: 'Compare two observed changes in accessible forms',
            depth: 'Foundational',
            sequenceReason: 'First observational comparison builds later understanding',
            assessmentEvidence: 'Observable descriptions and comparison',
            assessment: {
              questionBankRequired: true,
              flashcardBankRequired: false,
              quizSectionRequired: false,
              flashcardsSectionRequired: false,
            },
          },
        },
      },
      order: ['observation'],
    },
  },
  production: {
    languages: { document: 'uk', planned: ['uk'] },
    methodology: {
      purpose: 'Develop accessible observation of the sky',
      audience: 'Early learners with multiple access needs',
      approach: 'Observe and compare with formative evidence',
      depth: 'Introduction',
      accessibility: 'Keyboard, nonvisual and offline equivalents',
      scope: 'Daily sky observations and boundaries',
      entryConditions: 'No previous astronomy knowledge',
      sourceNotes: 'Verified educational science references',
    },
    outcomes: { explanation: 'Describe sky observations' },
    prerequisites: { explanation: 'No special prerequisites' },
    standardsAlignment: [],
    openDecisions: {},
  },
};

test('real reviewed Stage 3 TS typechecks and produces a complete deterministic source handoff in read-only CLI', t => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-cli-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const root = path.join(base, 'candidate');
  fs.mkdirSync(root);
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  git('init', '-q');
  git('config', 'user.email', 'stage5-test@example.test');
  git('config', 'user.name', 'Course typed integration');
  const body =
    "import type { CourseWorkflowMaterializerInput } from '@svitlo/engine/build';\n" +
    'export const reviewedInput = ' +
    JSON.stringify(reviewedStage3, null, 2) +
    ' satisfies CourseWorkflowMaterializerInput;\n';
  fs.mkdirSync(path.dirname(path.join(root, sourcePath)), { recursive: true });
  fs.writeFileSync(path.join(root, sourcePath), body);
  git('add', sourcePath);
  git('commit', '-qm', 'Reviewed and corrected Stage 3');
  const commit = git('rev-parse', 'HEAD');
  const sourceBlob = git('rev-parse', 'HEAD:' + sourcePath);
  checkCourseStage3Types(path.join(root, sourcePath));
  const pinned = { ...meta, head: commit, reviewCommitSha: commit, sourceBlobSha: sourceBlob };
  const reportFile = path.join(base, 'manifest.json');
  const processResult = spawnSync(
    process.execPath,
    [fileURLToPath(new URL('./typed-course-source.mjs', import.meta.url)), 'analyze'],
    {
      encoding: 'utf8',
      env: {
        ...process.env,
        GH_TOKEN: undefined,
        GITHUB_TOKEN: undefined,
        GITHUB_REPOSITORY: meta.repo,
        COURSE_DEFAULT_BRANCH: 'develop',
        COURSE_TYPED_META_B64: Buffer.from(JSON.stringify(pinned)).toString('base64'),
        COURSE_HEAD_ROOT: root,
        COURSE_TYPED_REPORT: reportFile,
      },
    },
  );
  assert.equal(processResult.status, 0, processResult.stderr);
  const manifest = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
  assert.equal(verifyTypedCourseManifest(manifest, pinned), manifest.entries.length);
  assert.equal(checkTypedCourseTargets(pinned, root, manifest), true);
  assert(manifest.entries.some(entry => entry.path === materializedPath));
  assert(manifest.entries.some(entry => entry.path.endsWith('/methodology.md')));
  assert(manifest.entries.some(entry => entry.path.includes('/data/lessons/') && entry.path.endsWith('/draft.ts')));
  assert(manifest.pendingPlacements.length === 1);
  assert.equal(manifest.publishable, false);
  assert.equal(git('status', '--porcelain'), '');
});

test('semantic Stage 3 typecheck rejects incorrect imported Build contract', t => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-typecheck-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const filename = path.join(base, sourcePath);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(
    filename,
    "import type { CourseWorkflowMaterializerInput } from '@svitlo/engine/build';\n" +
      'export const reviewedInput = { config: { type: "wrong" } } satisfies CourseWorkflowMaterializerInput;\n',
  );
  assert.throws(() => checkCourseStage3Types(filename), /does not typecheck/);
});

test('Course Episode invokes the same concrete Section and Text renderers as standalone Lessons', () => {
  const intro = '663572e7-bd85-4516-86e2-3de07d209e05';
  const greeting = '663572e7-bd85-4516-86e2-3de07d209e06';
  const directory = 'content/moduleOne/episodeOne/sections/intro';
  const result = materializeCourseEpisodeSection(
    {
      config: {
        type: 'content',
        slug: 'intro',
        id: intro,
        params: {},
        locale: { title: { uk: 'Вступ' }, navigationLabel: { uk: 'Вступ' } },
        content: {
          items: {
            greeting: {
              config: {
                type: 'text',
                slug: 'greeting',
                id: greeting,
                params: { variables: {} },
                locale: { value: { uk: 'Спостерігай небо' } },
              },
            },
          },
          order: ['greeting'],
        },
      },
    },
    {
      directory,
      documentLanguage: 'uk',
      languagesImport: '#coursesData/3/' + id + '/languages',
    },
  );
  assert.equal(result.exportName, 'intro');
  assert(result.files.some(file => file.path === directory + '/index.ts'));
  assert(result.files.some(file => file.path === directory + '/content/items/greeting/index.ts'));
  assert(
    result.files.some(
      file => file.path.endsWith('/content/items/greeting/index.ts') && file.content.includes('Спостерігай небо'),
    ),
  );
});

test('existing Lesson reuse loads only an immutable genuine trusted exported Configurator', t => {
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-existing-'));
  t.after(() => fs.rmSync(work, { recursive: true, force: true }));
  const trustedRoot = path.join(work, 'trusted');
  const candidateRoot = path.join(work, 'candidate');
  fs.mkdirSync(trustedRoot);
  fs.mkdirSync(candidateRoot);
  const lessonId = '663572e7-bd85-4516-86e2-3de07d209e07';
  const lessonRoot = 'content/playground/data/lessons/7/' + lessonId;
  const source = lessonRoot + '/index.ts';
  const methodology = lessonRoot + '/methodology.md';
  const lessonModule =
    'export const actualLesson = {\n' +
    '  type: "lesson", id: "' +
    lessonId +
    '",\n' +
    '  config: { base: { id: "' +
    lessonId +
    '", type: "lesson",\n' +
    '    skills: ["663572e7-bd85-4516-86e2-3de07d209e04"],\n' +
    '    params: { languages: ["uk"] } } },\n' +
    '  build: { props() { return {}; }, overrides() { return { id: "' +
    lessonId +
    '" }; } },\n' +
    '};\n';
  for (const root of [candidateRoot, trustedRoot]) {
    fs.mkdirSync(path.dirname(path.join(root, source)), { recursive: true });
    fs.writeFileSync(path.join(root, source), lessonModule);
    fs.writeFileSync(path.join(root, methodology), '# Approved Lesson methodology\n');
  }
  const git = (...args) =>
    execFileSync('git', args, {
      cwd: candidateRoot,
      encoding: 'utf8',
    }).trim();
  git('init', '-q');
  git('config', 'user.name', 'Trusted Lesson reference');
  git('config', 'user.email', 'trusted@example.test');
  git('add', source, methodology);
  git('commit', '-qm', 'Reviewed independent Lesson');
  const sourceSha = git('rev-parse', 'HEAD:' + source);
  const matcher = { sourceSha, methodologySourcePath: methodology };
  const resolve = createTrustedCourseLessonResolver({
    trustedRoot,
    candidateRoot,
    textbookRoot: 'content/playground',
  });
  const actual = resolve({ id: lessonId, matching: matcher, languages: ['uk'] });
  assert.equal(actual.id, lessonId);
  assert.equal(actual.importPath, '#lessonsData/7/' + lessonId + '/index');
  assert.equal(actual.exportName, 'actualLesson');
  assert.equal(actual.configurator.id, lessonId);
  assert.strictEqual(resolve({ id: lessonId, matching: matcher, languages: ['uk'] }).configurator, actual.configurator);
  assert.throws(
    () =>
      resolve({
        id: lessonId,
        matching: {
          ...matcher,
          sourceSha: 'f'.repeat(40),
        },
        languages: ['uk'],
      }),
    /pinned|differs|reviewed/,
  );

  const another = createTrustedCourseLessonResolver({
    trustedRoot,
    candidateRoot,
    textbookRoot: 'content/playground',
  });
  fs.writeFileSync(path.join(candidateRoot, source), lessonModule + '\n// unreviewed PR code\n');
  assert.throws(
    () =>
      another({
        id: lessonId,
        matching: matcher,
        languages: ['uk'],
      }),
    /trusted|divergent|dependency differs/,
  );
});

test('literal Stage 3 safely captures the exact raw trusted Lesson Build patch', () => {
  const lessonId = '663572e7-bd85-4516-86e2-3de07d209e07';
  const lessonSpecifier = '#lessonsData/7/' + lessonId + '/index';
  const trusted = {
    type: 'lesson',
    id: lessonId,
    build: {
      overrides(raw, selection) {
        assert.deepEqual({ ...selection }, { languages: ['uk'] });
        assert.deepEqual(JSON.parse(JSON.stringify(raw)), {
          params: { sections: { allowSkipping: true } },
        });
        return { id: lessonId, base: { params: { sections: { allowSkipping: true } } } };
      },
    },
  };
  const existingText = [
    '{',
    '  config: { type: "lesson", slug: "observation", skills: ["663572e7-bd85-4516-86e2-3de07d209e04"] },',
    '  production: {',
    '    kind: "existing",',
    '    assessment: { questionBankRequired: false, flashcardBankRequired: false,',
    '      quizSectionRequired: false, flashcardsSectionRequired: false },',
    '    overrideRationale: "Reviewed local navigation adjustment",',
    '    existing: { ...reviewedLesson.build.overrides(',
    '      { params: { sections: { allowSkipping: true } } }, { languages: ["uk"] }) },',
    '    matching: { sourceSha: "' + 'a'.repeat(40) + '",',
    '      methodologySourcePath: "content/playground/data/lessons/7/' + lessonId + '/methodology.md",',
    '      matchingRationale: "Verified compatible Lesson", languageEvidence: "Original reviewed Ukrainian Lesson" }',
    '  }',
    '}',
  ].join('\n');
  const staged = structuredClone(reviewedStage3);
  staged.config.content.items.observation = '__VERIFIED_LESSON_BUILD_PATCH__';
  const sourceObject = JSON.stringify(staged, null, 2).replace('"__VERIFIED_LESSON_BUILD_PATCH__"', existingText);
  const body =
    "import type { CourseWorkflowMaterializerInput } from '@svitlo/engine/build';\n" +
    'import { lesson as reviewedLesson } from "' +
    lessonSpecifier +
    '";\n' +
    'export const reviewedInput = ' +
    sourceObject +
    ' satisfies CourseWorkflowMaterializerInput;\n';
  const patches = [];
  const input = parseCanonicalCourseSource(body, {
    resolveImport(specifier, name) {
      assert.equal(specifier, lessonSpecifier);
      assert.equal(name, 'lesson');
      return trusted;
    },
    patches,
  });
  const built = input.config.content.items.observation.production.existing;
  assert.equal(built.id, lessonId);
  assert.equal(patches.length, 1);
  const resolver = reviewedLessonPatchResolver(
    input,
    () => ({
      id: lessonId,
      sourceSha: 'a'.repeat(40),
      exportName: 'lesson',
      importPath: lessonSpecifier,
      languages: ['uk'],
      configurator: trusted,
    }),
    patches,
    'b'.repeat(40),
  );
  const reused = resolver({
    id: lessonId,
    placement: 'content/observation',
    matching: {},
    languages: ['uk'],
  });
  assert.equal(reused.rawPatchSource, '{ params: { sections: { allowSkipping: true } } }');
  assert.equal(reused.rawPatchSourceSha, 'b'.repeat(40));
  assert.deepEqual(JSON.parse(JSON.stringify(reused.rawPatch)), {
    params: { sections: { allowSkipping: true } },
  });
  assert.match(reused.rawPatchImports[0], /import \{ lesson as reviewedLesson \}/);
  for (const injected of [
    body.replace('reviewedLesson.build.overrides', 'process.exit'),
    body.replace('reviewedLesson.build.overrides', 'reviewedLesson.build.props'),
    body.replace('reviewedLesson.build.overrides', 'evilFunction'),
    body.replace('...reviewedLesson.build.overrides', '...untrusted'),
  ])
    assert.throws(() =>
      parseCanonicalCourseSource(injected, {
        resolveImport: () => trusted,
        patches: [],
      }),
    );
});

test('trusted real Markdown Lesson preserves transitive module URLs and sparse Course reuse', t => {
  // Keep the trusted fixture under the installed workspace so the real Engine
  // Build package resolves. The candidate is a separate committed Git tree.
  const temp = fileURLToPath(new URL('../../../shared/engine/temp/', import.meta.url));
  fs.mkdirSync(temp, { recursive: true });
  const work = fs.mkdtempSync(path.join(temp, 'trusted-markdown-lesson-'));
  t.after(() => fs.rmSync(work, { recursive: true, force: true }));
  const trustedRoot = path.join(work, 'trusted');
  const candidateRoot = path.join(work, 'candidate');
  const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
  const lessonRoot = 'content/playground/data/lessons/c/' + lessonId;
  const source = lessonRoot + '/index.ts';
  const methodology = lessonRoot + '/methodology.md';
  const intro = lessonRoot + '/sections/intro';
  const first = intro + '/content/first';
  const second = intro + '/content/second';
  const values = {
    first: { en: '# Light travels in a straight line.', uk: '# Світло поширюється прямолінійно.' },
    second: { en: '# A shadow forms behind an obstacle.', uk: '# За перешкодою утворюється тінь.' },
  };
  const fixture = {
    [source]: `
import { defineLesson } from '@svitlo/engine/build';
import { intro } from './sections/intro';
export const howLightMoves = defineLesson({
  id: '${lessonId}', slug: 'howLightMoves', type: 'lesson', skills: [],
  params: { languages: ['en', 'uk'], quizRequiredForCompletion: false,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true } },
  locale: { title: { en: 'How light moves', uk: 'Як поширюється світло' } },
  section: { items: { intro }, order: ['intro'] },
});
`,
    [methodology]: '# Independently reviewed Lesson fixture\n',
    [intro + '/index.ts']: `
import { defineContentSection } from '@svitlo/engine/build';
import { first } from './content/first';
import { second } from './content/second';
export const intro = defineContentSection({
  id: '00000000-0000-4000-8000-000000000020', slug: 'intro', type: 'content', params: {},
  locale: { title: { en: 'Observation', uk: 'Спостереження' },
    navigationLabel: { en: 'Observation', uk: 'Спостереження' } },
  content: { items: { first, second }, order: ['first', 'second'] },
});
`,
  };
  for (const [key, directory, number] of [
    ['first', first, 31],
    ['second', second, 32],
  ]) {
    fixture[directory + '/index.ts'] = `
import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';
export const ${key} = defineMarkdown({
  id: '00000000-0000-4000-8000-0000000000${number}', slug: '${key}', type: 'markdown',
  params: {}, locale: { value: readMarkdown(import.meta.url, ['en', 'uk']) },
});
`;
    for (const language of ['en', 'uk']) fixture[directory + '/' + language + '.md'] = values[key][language];
  }
  const git = (root, ...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  for (const root of [trustedRoot, candidateRoot]) {
    for (const [filename, bytes] of Object.entries(fixture)) {
      const target = path.join(root, filename);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, bytes);
    }
    git(root, 'init', '-q');
    git(root, 'config', 'user.name', 'Trusted Markdown fixture');
    git(root, 'config', 'user.email', 'fixture@example.test');
    git(root, 'add', '.');
    git(root, 'commit', '-qm', 'Independently reviewed source');
  }
  const filename = path.join(trustedRoot, source);
  const previous = buildSync({
    entryPoints: [filename],
    absWorkingDir: path.dirname(filename),
    bundle: true,
    write: false,
    platform: 'node',
    format: 'cjs',
    target: 'node24',
    logLevel: 'silent',
  });
  const legacy = new Module(filename);
  legacy.filename = filename;
  legacy.paths = Module._nodeModulePaths(path.dirname(filename));
  assert.throws(
    () => legacy._compile(previous.outputFiles[0].text, filename),
    /Invalid URL|Missing or invalid Markdown/,
  );

  const args = {
    id: lessonId,
    matching: { sourceSha: git(candidateRoot, 'rev-parse', 'HEAD'), methodologySourcePath: methodology },
    languages: ['en', 'uk'],
    placement: 'content/observation',
  };
  const options = { trustedRoot, candidateRoot, textbookRoot: 'content/playground' };
  const resolve = createTrustedCourseLessonResolver(options);
  const verified = resolve(args);
  assert.equal(verified.exportName, 'howLightMoves');
  const before = verified.configurator.build.props({ languages: args.languages });
  for (const language of args.languages) {
    const locale = JSON.stringify(before.locale[language]);
    for (const key of ['first', 'second']) assert(locale.includes(values[key][language]));
  }
  assert.equal(before.base.params.sections.allowSkipping, true);
  const specifier = '#lessonsData/c/' + lessonId + '/index';
  const raw = '{ params: { sections: { allowSkipping: false } } }';
  for (const expression of [
    '{ id: howLightMoves.id }',
    '{ ...howLightMoves.build.overrides(' + raw + ', { languages: ["en", "uk"] }) }',
  ]) {
    const stage = structuredClone(reviewedStage3);
    stage.config.content.items.observation.production = {
      kind: 'existing',
      existing: '__REUSE__',
      matching: args.matching,
    };
    const body =
      "import type { CourseWorkflowMaterializerInput } from '@svitlo/engine/build';\n" +
      'import { howLightMoves } from ' +
      JSON.stringify(specifier) +
      ';\n' +
      'export const reviewedInput = ' +
      JSON.stringify(stage).replace('"__REUSE__"', expression) +
      ' satisfies CourseWorkflowMaterializerInput;';
    const patches = [];
    const input = parseCanonicalCourseSource(body, { resolveImport: resolve.loadImport, patches });
    const existing = input.config.content.items.observation.production.existing;
    assert.equal(existing.id, lessonId);
    const result = reviewedLessonPatchResolver(input, resolve, patches, 'b'.repeat(40))(args);
    assert.equal(result.configurator, verified.configurator);
    if (expression.includes('overrides')) {
      assert.equal(existing.base.params.sections.allowSkipping, false);
      assert.equal(result.rawPatchSource, raw);
      assert.equal(patches.length, 1);
    } else {
      assert.deepEqual(Object.keys(existing), ['id']);
      assert.equal(result.rawPatchSource, undefined);
      assert.equal(patches.length, 0);
    }
    assert.deepEqual(verified.configurator.build.props({ languages: args.languages }), before);
  }
  assert.equal(git(trustedRoot, 'status', '--porcelain'), '');
  assert.equal(git(candidateRoot, 'status', '--porcelain'), '');
  fs.writeFileSync(path.join(candidateRoot, second + '/en.md'), 'Unreviewed Markdown');
  assert.throws(() => createTrustedCourseLessonResolver(options)(args), /dependency differs|trusted/);
  git(candidateRoot, 'checkout', '--', second + '/en.md');
  fs.writeFileSync(path.join(candidateRoot, first + '/index.ts'), 'throw Error("candidate must never execute");');
  assert.throws(() => createTrustedCourseLessonResolver(options)(args), /dependency differs|trusted/);
  git(candidateRoot, 'checkout', '--', first + '/index.ts');
  for (const root of [trustedRoot, candidateRoot]) {
    fs.writeFileSync(path.join(root, lessonRoot, 'draft.ts'), 'throw Error("draft must never execute");');
    git(root, 'add', lessonRoot + '/draft.ts');
  }
  assert.throws(() => createTrustedCourseLessonResolver(options)(args), /Unmaterialized editorial draft/);
});
