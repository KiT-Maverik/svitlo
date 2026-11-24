import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { materializeCourseStage5 } from './materializeStage5.mjs';

const ts = createRequire(import.meta.url)('typescript');
const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const virtualRoot = path.join(engineRoot, 'temp', 'stage5-course-build');
const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const unit = () => ({
  methodology: 'Reviewed unit scope and methods',
  outcomes: { skills: [] },
  prerequisites: { skills: [] },
  depth: 'Foundation',
  sequenceReason: 'First unit prepares later knowledge',
});
const pendingEpisode = {
  config: { type: 'episode' },
  production: { focus: 'Reviewed story context', purpose: 'Pedagogical transition' },
};
const pendingLesson = {
  config: {
    type: 'lesson',
    slug: 'lessonOne',
    skills: ['663572e7-bd85-4516-86e2-3de07d209e04'],
    params: { quizRequiredForCompletion: true },
    locale: { title: { uk: 'Спостереження' } },
  },
  production: {
    kind: 'new',
    languages: { document: 'uk', planned: ['uk', 'en'] },
    methodology: 'Reviewed complete objective, pedagogy, cognitive depth and misconception handling',
    objective: 'Independently describe and compare observed changes',
    depth: 'Introductory',
    sequenceReason: 'Introduces direct observation before narrative application',
    assessmentEvidence: 'Observable comparison',
    assessment: {
      questionBankRequired: true,
      flashcardBankRequired: false,
      quizSectionRequired: true,
      flashcardsSectionRequired: false,
    },
  },
};
const input = {
  config: {
    id,
    slug: 'skyBasics',
    type: 'course',
    locale: { title: { uk: 'Небо' }, description: { uk: 'Природа' } },
    content: {
      items: {
        moduleOne: {
          config: {
            type: 'module',
            slug: 'moduleOne',
            locale: { title: { uk: 'Модуль' } },
            content: {
              items: {
                chapterOne: {
                  config: {
                    type: 'chapter',
                    slug: 'chapterOne',
                    locale: { title: { uk: 'Розділ' } },
                    content: {
                      items: { lessonOne: pendingLesson, episodeOne: pendingEpisode },
                      order: ['lessonOne', 'episodeOne'],
                    },
                  },
                  production: unit(),
                },
              },
              order: ['chapterOne'],
            },
          },
          production: unit(),
        },
      },
      order: ['moduleOne'],
    },
  },
  production: {
    languages: { document: 'uk', planned: ['uk'] },
    methodology: {
      purpose: 'Teach verified observation',
      audience: 'Beginner learners',
      approach: 'Observe with feedback',
      depth: 'Introductory',
      accessibility: 'Keyboard/AT alternatives',
      scope: 'Foundational astronomy',
      entryConditions: 'None',
      sourceNotes: 'Reviewed educational sources',
    },
    outcomes: { explanation: 'Identify phenomena' },
    prerequisites: { explanation: 'None' },
    standardsAlignment: [],
    openDecisions: {},
  },
};
function diagnostics(files) {
  const read = ts.readConfigFile(path.join(engineRoot, 'tsconfig.json'), ts.sys.readFile);
  if (read.error) throw Error(ts.flattenDiagnosticMessageText(read.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, engineRoot);
  assert.equal(parsed.errors.length, 0);
  const opts = {
    ...parsed.options,
    noEmit: true,
    incremental: false,
    composite: false,
    baseUrl: engineRoot,
    paths: { ...parsed.options.paths, '@svitlo/engine/build': ['build.ts'] },
  };
  const virtual = new Map(
    files.filter(f => f.kind === 'typescript').map(file => [path.resolve(virtualRoot, file.path), file.content]),
  );
  const host = ts.createCompilerHost(opts);
  const oldFile = host.getSourceFile.bind(host);
  const oldExists = host.fileExists.bind(host);
  const oldRead = host.readFile.bind(host);
  const oldDirectory = host.directoryExists?.bind(host);
  const key = file => path.resolve(file);
  host.fileExists = file => virtual.has(key(file)) || oldExists(file);
  host.readFile = file => virtual.get(key(file)) ?? oldRead(file);
  host.directoryExists = dir =>
    [...virtual.keys()].some(file => file.startsWith(key(dir) + path.sep)) || oldDirectory?.(dir) || false;
  host.getSourceFile = (file, language, onError, createNew) =>
    virtual.has(key(file))
      ? ts.createSourceFile(file, virtual.get(key(file)), language, true)
      : oldFile(file, language, onError, createNew);
  // Also compile the actual public declaration/typed entrypoint assertions.
  // Engine package build/test tsconfigs exclude *.typecheck.ts by design.
  const contractFixture = path.join(engineRoot, 'generators/materializers/course/materializeStage5.typecheck.ts');
  return ts.getPreEmitDiagnostics(ts.createProgram([...virtual.keys(), contractFixture], opts, host));
}
test('canonical Stage3 Course hierarchy and UUID Lesson Stage1 handoff typecheck against actual Engine Build', () => {
  const root = 'content/playground/data/courses/3/' + id;
  const source = materializeCourseStage5(input, {
    textbookRoot: 'content/playground',
    review: {
      sourcePath: root + '/draft.ts',
      sourceBlobSha: '1'.repeat(40),
      reviewCommitSha: '2'.repeat(40),
      reviewer: 'Course Methodologist',
      evidenceUrl: 'https://github.com/KiT-Maverik/svitlo/pull/787',
    },
    verifyReviewedSource: () => true,
  });
  assert.equal(source.publishable, false);
  assert.ok(source.diagnostics.some(d => d.code === 'pending-episode-scenario'));
  assert.ok(source.diagnostics.some(d => d.code === 'pending-lesson-stage1'));
  const handoff = source.files.filter(file => file.path.includes('/data/lessons/') && file.kind === 'typescript');
  assert.equal(handoff.length, 1);
  assert.match(handoff[0].content, /satisfies LessonWorkflowStage1/);
  assert.doesNotMatch(handoff[0].content, /defineLesson\s*\(/);
  assert.equal(source.files.filter(file => file.kind === 'typescript').length, 6);
  const errors = diagnostics(source.files);
  assert.deepEqual(
    errors.map(error => {
      const loc = error.file?.getLineAndCharacterOfPosition(error.start ?? 0);
      return (
        (error.file?.fileName ?? '<compiler>') +
        ':' +
        (loc ? loc.line + 1 : 0) +
        ' TS' +
        error.code +
        ': ' +
        ts.flattenDiagnosticMessageText(error.messageText, ' ')
      );
    }),
    [],
  );
});
