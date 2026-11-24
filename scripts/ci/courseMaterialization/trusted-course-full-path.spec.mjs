import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { gitBlob } from './course-gate.mjs';
import { buildTypedCourseManifest, checkedSource } from './typed-course-source.mjs';
import { checkTypedCourseTargets, oneCommitTree, verifyTypedCourseManifest } from './typed-course-publish.mjs';

const trusted = path.resolve(import.meta.dirname, '../../..');
const courseId = '403f4a50-266d-4b84-8b16-d879bfe8bab6';
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const textbookRoot = 'content/playground';
const lessonRoot = textbookRoot + '/data/lessons/c/' + lessonId;
const sourcePath = textbookRoot + '/data/courses/6/' + courseId + '/draft.ts';

test('clean trusted Course analyze and privileged replay with the actual Playground Lesson graph', async t => {
  // The Ready job invokes the exact live preparation before this test, with
  // neither a pre-existing Engine distribution nor npm lifecycle scripts.
  const engine = path.join(trusted, 'shared/engine');
  for (const entry of ['build', 'runtime']) {
    assert(fs.existsSync(path.join(engine, 'dist', entry + '.js')));
    assert(!fs.existsSync(path.join(engine, 'dist', entry + '.d.ts')), 'Do not mask source-resolution defects');
  }
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-real-course-'));
  t.after(() => fs.rmSync(work, { recursive: true, force: true }));
  const candidate = path.join(work, 'candidate');
  fs.mkdirSync(candidate);
  const git = (...args) =>
    execFileSync('git', args, { cwd: candidate, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }).trim();
  git('init', '-q');
  git('config', 'user.name', 'Trusted Course regression');
  git('config', 'user.email', 'course-regression@example.test');

  // Use the complete actual Lesson, including its authored Markdown,
  // language constants, Sections and other transitive local resources.
  fs.mkdirSync(path.dirname(path.join(candidate, lessonRoot)), { recursive: true });
  fs.cpSync(path.join(trusted, lessonRoot), path.join(candidate, lessonRoot), { recursive: true });
  git('add', lessonRoot);
  git('commit', '-qm', 'Pin real independently authored Lesson');
  const lessonRevision = git('rev-parse', 'HEAD');

  // Exact reviewed #806 source blob; the ONLY substitution is the two
  // provenance SHAs, which point to the real local candidate ancestor.
  const reviewed = fs.readFileSync(new URL('./fixtures/reviewed-playground-course.txt', import.meta.url), 'utf8');
  assert.equal(gitBlob(reviewed), '2ac0568256d965b488731352184845c6c29aab26');
  const previous = 'a25a0a5f9c3f02c6a592800217452b072badae0c';
  assert.equal(reviewed.split(previous).length, 3);
  const body = reviewed.replaceAll(previous, lessonRevision);
  const filename = path.join(candidate, sourcePath);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, body);
  git('add', sourcePath);
  git('commit', '-qm', 'Pin reviewed Course fixture');
  const head = git('rev-parse', 'HEAD');
  const meta = {
    version: 2,
    operation: 'typed-course-stage5',
    number: 806,
    repo: 'KiT-Maverik/svitlo',
    actor: 'trusted',
    reviewVerdict: 'accepted',
    head,
    branch: 'course/full-path-regression',
    textbookRoot,
    courseId,
    sourcePath,
    sourceBlobSha: git('rev-parse', 'HEAD:' + sourcePath),
    reviewCommitSha: head,
  };
  const report = path.join(work, 'manifest.json');
  const analyzerUrl = new URL('./typed-course-source.mjs', import.meta.url);
  const analyzer = fileURLToPath(analyzerUrl);
  const launch = {
    encoding: 'utf8',
    timeout: 180_000,
    env: {
      ...process.env,
      GH_TOKEN: undefined,
      GITHUB_TOKEN: undefined,
      GITHUB_REPOSITORY: meta.repo,
      COURSE_DEFAULT_BRANCH: 'develop',
      COURSE_TYPED_META_B64: Buffer.from(JSON.stringify(meta)).toString('base64'),
      COURSE_HEAD_ROOT: candidate,
      COURSE_TYPED_REPORT: report,
    },
  };

  // Negative control: the #820 analyzer differed by precisely this missing
  // runtime source mapping. Use a child-only Node loader to restore its old
  // compiler resolution, without editing trusted files or executing candidate
  // modules. Everything else (CLI, input, dependencies and preparation) is
  // identical to the positive run below.
  const oldMapping = "      '@svitlo/engine/runtime': ['runtime.ts'],\n";
  const loader = [
    "import { registerHooks } from 'node:module';",
    "import { readFileSync } from 'node:fs';",
    'registerHooks({ load(url, context, nextLoad) {',
    '  const loaded = nextLoad(url, context);',
    '  if (url !== ' + JSON.stringify(analyzerUrl.href) + ') return loaded;',
    '  const source = readFileSync(new URL(url), "utf8");',
    '  const oldMapping = ' + JSON.stringify(oldMapping) + ';',
    '  if (!source.includes(oldMapping)) throw Error("Missing expected runtime resolution control");',
    '  return { ...loaded, source: source.replace(oldMapping, "") };',
    '} });',
  ].join('\n');
  const baseline = spawnSync(
    process.execPath,
    ['--import', 'data:text/javascript;base64,' + Buffer.from(loader).toString('base64'), analyzer, 'analyze'],
    launch,
  );
  assert.equal(baseline.status, 1, baseline.error?.message ?? baseline.stderr);
  assert.match(baseline.stderr, /TS7016.*@svitlo\/engine\/runtime/);
  assert(!fs.existsSync(report));
  console.log('Baseline missing runtime mapping reproduces TS7016 through the actual Course analyze CLI.');

  const result = spawnSync(process.execPath, [analyzer, 'analyze'], launch);
  assert.equal(result.status, 0, result.error?.message ?? result.stderr);
  const { replan } = await import('./typed-course-publish.mjs');
  const manifest = JSON.parse(fs.readFileSync(report, 'utf8'));
  assert.equal(verifyTypedCourseManifest(manifest, meta), manifest.entries.length);
  const { source } = checkedSource(meta, candidate);
  assert.equal(source, body);
  const expected = buildTypedCourseManifest(meta, replan(meta, source, candidate));
  assert.equal(JSON.stringify(manifest), JSON.stringify(expected));
  assert.equal(manifest.publishable, false);
  assert.equal(manifest.pendingPlacements.length, 2);
  assert.equal(manifest.pendingEpisodes.length, 4);
  const lessons = manifest.inventory.lessons;
  assert.deepEqual(
    lessons.map(({ slug, kind, orderPath }) => [slug, kind, orderPath]),
    [
      ['lightBasics', 'reused', [1]],
      ['circleRecognition', 'new', [2, 1]],
      ['shadowPractice', 'overridden', [3, 1]],
      ['combinedPractice', 'new', [3, 2, 1]],
    ],
  );
  assert.equal(lessons[0].id, lessonId);
  assert.equal(lessons[2].id, lessonId);
  assert.equal(lessons[0].sourceSha, lessonRevision);
  assert.equal(lessons[2].sourceSha, lessonRevision);
  assert.equal(new Set(lessons.map(row => row.id)).size, 3);
  assert.deepEqual(
    manifest.inventory.episodes.map(({ slug, orderPath }) => [slug, orderPath]),
    [
      ['openingMission', [0]],
      ['circleMission', [2, 0]],
      ['practiceMission', [3, 0]],
      ['finalMission', [3, 2, 0]],
    ],
  );
  const generated = new Map(manifest.entries.map(entry => [entry.path, Buffer.from(entry.data, 'base64').toString()]));
  const overrides = generated.get(path.posix.dirname(sourcePath) + '/authoredCourseOverrides.ts');
  assert(overrides?.includes('{ params: { sections: { allowSkipping: false } } }'));
  assert.match(overrides, /"exhibitionPractice"/);
  assert.match(overrides, /"shadowPractice"/);
  assert.doesNotMatch(overrides, /lightBasics|circleRecognition|combinedPractice/);
  assert(!generated.has(lessonRoot + '/index.ts'));
  assert(![...generated.keys()].some(file => file.startsWith(lessonRoot + '/')));
  for (const row of lessons.filter(row => row.kind === 'new')) {
    assert.match(generated.get(row.sourcePath), /satisfies CourseWorkflowLessonSeed/);
  }
  for (const row of manifest.inventory.episodes) {
    assert.match(generated.get(row.sourcePath), /satisfies EpisodeWorkflowStage1/);
  }

  assert.equal(checkTypedCourseTargets(meta, candidate, manifest), true);
  const tree = oneCommitTree(manifest);
  assert.equal(tree.length, manifest.entries.length + 1);
  assert.deepEqual(
    tree.filter(entry => entry.sha === null).map(entry => entry.path),
    [sourcePath],
  );
  const collision = path.join(candidate, manifest.materializedPath);
  fs.writeFileSync(collision, 'preserve existing authored target');
  assert.throws(() => checkTypedCourseTargets(meta, candidate, manifest), /would be overwritten/);
  assert.equal(fs.readFileSync(collision, 'utf8'), 'preserve existing authored target');
  fs.unlinkSync(collision);
  assert.equal(git('status', '--porcelain'), '');
  assert.equal(git('rev-parse', 'HEAD'), head);
  assert.equal(fs.readFileSync(filename, 'utf8'), body);
});
