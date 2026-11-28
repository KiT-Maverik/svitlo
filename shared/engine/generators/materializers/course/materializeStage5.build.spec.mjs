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
const lightSkill = '00000000-0000-4000-8000-000000000015';
const circleSkill = '00000000-0000-4000-8000-000000000008';
const skillModules = new Map([
  [lightSkill, 'testLight/testLightPropagation/testExplainLightTravel'],
  [circleSkill, 'testShapes/testRoundShapes/testRecognizeCircle'],
]);
const unit = () => ({
  methodology: 'Reviewed unit scope and methods',
  outcomes: { skills: [lightSkill] },
  prerequisites: { skills: [circleSkill] },
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
    params: {
      outcomes: { skills: [lightSkill, circleSkill] },
      prerequisites: { skills: [circleSkill] },
    },
    locale: { title: { uk: 'Небо' }, description: { uk: 'Природа' } },
    children: ['moduleOne'],
    moduleOne: {
      config: {
        type: 'module',
        slug: 'moduleOne',
        locale: { title: { uk: 'Модуль' } },
        children: ['chapterOne'],
        chapterOne: {
          config: {
            type: 'chapter',
            slug: 'chapterOne',
            locale: { title: { uk: 'Розділ' } },
            children: ['lessonOne', 'episodeOne'],
            lessonOne: pendingLesson,
            episodeOne: pendingEpisode,
          },
          production: unit(),
        },
      },
      production: unit(),
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
function diagnostics(files, additionalPaths = {}) {
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
    paths: {
      ...parsed.options.paths,
      '@svitlo/engine/build': ['build.ts'],
      '#coursesData/*': ['temp/stage5-course-build/content/playground/data/courses/3/' + id + '/constants.ts'],
      '#skillsData/*': ['../../content/playground/data/skills/*.ts'],
      ...additionalPaths,
    },
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
test('canonical Stage3 Course hierarchy and UUID Course Lesson seed typecheck against actual Engine Build', () => {
  const root = 'content/playground/data/courses/3/' + id;
  const source = materializeCourseStage5(input, {
    textbookRoot: 'content/playground',
    source: {
      sourcePath: root + '/draft.ts',
      sourceBlobSha: '1'.repeat(40),
    },
    verifySource: () => true,
    resolveSkill({ id: skillId }) {
      const modulePath = skillModules.get(skillId);
      if (!modulePath) throw Error('Unapproved Playground Skill fixture ' + skillId);
      const slug = modulePath.split('/').at(-1);
      return {
        approved: true,
        id: skillId,
        slug,
        exportName: slug,
        importPath: '#skillsData/' + modulePath,
        sourcePath: 'content/playground/data/skills/' + modulePath + '.ts',
        sourceSha: 'a'.repeat(40),
        configurator: {
          type: 'skill',
          id: skillId,
          slug,
          config: { base: { id: skillId, slug } },
          build: { data() {} },
        },
      };
    },
  });
  assert.equal(source.publishable, false);
  assert.ok(source.diagnostics.some(d => d.code === 'pending-episode-scenario'));
  assert.ok(source.diagnostics.some(d => d.code === 'pending-lesson-stage1'));
  const handoff = source.files.filter(file => file.path.includes('/data/lessons/') && file.kind === 'typescript');
  assert.equal(handoff.length, 1);
  assert.match(handoff[0].content, /satisfies CourseWorkflowLessonSeed/);
  assert.doesNotMatch(handoff[0].content, /defineLesson\s*\(|LessonWorkflowStage1/);
  // Three parent Configurators, one Course constants module, one Lesson handoff,
  // one Episode handoff and two separately owned pending child stub modules.
  assert.equal(source.files.filter(file => file.kind === 'typescript').length, 8);
  assert.equal(source.files.filter(file => file.path.endsWith('/stub.ts')).length, 2);
  for (const pathSuffix of ['/index.ts', '/moduleOne/index.ts', '/moduleOne/chapterOne/index.ts']) {
    const authored = source.files.find(file => file.path === root + pathSuffix).content;
    if (pathSuffix === '/index.ts') {
      assert.match(authored, /#skillsData\/test/);
      assert.match(authored, /test(?:RecognizeCircle|ExplainLightTravel)\.id/);
    } else {
      assert.doesNotMatch(authored, /skillsData|outcomes|prerequisites/);
    }
    assert.match(authored, /#coursesData\/3\//);
  }
  for (const suffix of ['/moduleOne/methodology.md', '/moduleOne/chapterOne/methodology.md']) {
    assert.match(source.files.find(file => file.path === root + suffix).content, /Intended learning outcomes/);
  }
  const rootSource = source.files.find(file => file.path === root + '/index.ts').content;
  assert.equal(
    (rootSource.match(/from "#skillsData\/testShapes\/testRoundShapes\/testRecognizeCircle"/g) ?? []).length,
    1,
  );
  assert.match(rootSource, /"skills": \[testExplainLightTravel\.id, testRecognizeCircle\.id\]/);
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

/**
 * Compile REAL emitted Course-local Lesson patch modules, not only source-text
 * snapshots or transpileModule syntax. The Configurator import is authored
 * against the actual Engine Build API. This is a deliberate cross-workstream
 * integration gate: it must fail if Lesson/Section override inference or
 * A-owned placeLesson becomes incompatible with generated output.
 */
test('generated Course Lesson patch typechecks concrete nested, disabled and added Section placements', () => {
  const build = createRequire(import.meta.url)(path.join(engineRoot, 'dist/build.js'));
  const lessonId = '1368c1c9-2fd8-4007-b2c8-6bbfd98d5111';
  const textConfig = {
    id: '663572e7-bd85-4516-86e2-3de07d209e20',
    slug: 'paragraph',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Прочитай' } },
  };
  const sectionConfig = {
    id: '663572e7-bd85-4516-86e2-3de07d209e21',
    slug: 'intro',
    type: 'content',
    params: {},
    locale: { title: 'Вступ', navigationLabel: '1' },
    children: ['paragraph'],
  };
  const lessonConfig = {
    id: lessonId,
    slug: 'independentLesson',
    type: 'lesson',
    skills: [lightSkill],
    params: {
      languages: ['uk'],
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { uk: 'Окремий урок' } },
    children: ['intro', 'recap'],
  };
  const recapTextConfig = {
    id: '663572e7-bd85-4516-86e2-3de07d209e24',
    slug: 'recapText',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Повторення' } },
  };
  const recapConfig = {
    id: '663572e7-bd85-4516-86e2-3de07d209e25',
    slug: 'recap',
    type: 'content',
    params: {},
    locale: { title: 'Повторення', navigationLabel: '3' },
    children: ['recapText'],
  };
  const extraText = {
    id: '663572e7-bd85-4516-86e2-3de07d209e22',
    slug: 'message',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Практика' } },
  };
  const extraConfig = {
    id: '663572e7-bd85-4516-86e2-3de07d209e23',
    slug: 'practice',
    type: 'content',
    params: {},
    locale: { title: 'Практика', navigationLabel: '2' },
    children: ['message'],
  };
  const paragraph = build.defineText(textConfig);
  const intro = build.defineContentSection({ ...sectionConfig, paragraph });
  const recapText = build.defineText(recapTextConfig);
  const recap = build.defineContentSection({ ...recapConfig, recapText });
  const independentLesson = build.defineLesson({ ...lessonConfig, intro, recap });
  const message = build.defineText(extraText);
  const practice = build.defineContentSection({ ...extraConfig, message });

  const reviewed = structuredClone(input);
  delete reviewed.config.moduleOne;
  reviewed.config.children = ['reused'];
  const sourceSha = 'c'.repeat(40);
  reviewed.config.reused = {
    config: { type: 'lesson', slug: 'reused', skills: [lightSkill] },
    production: {
      kind: 'existing',
      existing: { id: lessonId },
      matching: {
        sourceSha,
        methodologySourcePath: 'content/playground/data/lessons/1/' + lessonId + '/methodology.md',
        matchingRationale: 'Compared objectives and verified the Lesson',
        languageEvidence: 'Verified uk source and text coverage',
      },
      assessment: {
        questionBankRequired: false,
        flashcardBankRequired: false,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
      sourceExportName: 'independentLesson',
      sourcePatch: {
        intro: { paragraph: { locale: { value: { uk: 'Інший текст' } } } },
        recap: false,
        practice: {
          $ref: 'lesson-section',
          lessonId,
          sectionId: practice.id,
          sourceSha,
          exportName: 'practice',
        },
        children: ['intro', 'practice'],
      },
      overrideRationale: 'Reviewed accessibility improvement with additional practice',
    },
  };
  const courseRoot = 'content/playground/data/courses/3/' + id;
  const plan = materializeCourseStage5(reviewed, {
    textbookRoot: 'content/playground',
    source: { sourcePath: courseRoot + '/draft.ts', sourceBlobSha: '1'.repeat(40) },
    verifySource: () => true,
    resolveSkill({ id: skillId }) {
      const modulePath = skillModules.get(skillId);
      assert.ok(modulePath, 'Unexpected Skill');
      const slug = modulePath.split('/').at(-1);
      return {
        approved: true,
        id: skillId,
        slug,
        exportName: slug,
        importPath: '#skillsData/' + modulePath,
        sourcePath: 'content/playground/data/skills/' + modulePath + '.ts',
        sourceSha: 'a'.repeat(40),
        configurator: {
          id: skillId,
          slug,
          type: 'skill',
          config: { base: { id: skillId, slug } },
          build: { data() {} },
        },
      };
    },
    resolveExistingLesson(request) {
      assert.equal(request.id, lessonId);
      return { ...request, approved: true, configurator: independentLesson };
    },
    resolveAddedSection(request) {
      assert.equal(request.id, practice.id);
      return { ...request, approved: true, configurator: practice };
    },
  });
  const emittedPath = courseRoot + '/reused/index.ts';
  const wrapper = plan.files.find(file => file.path === emittedPath);
  assert.ok(wrapper, 'Course Lesson placement must have a generated wrapper');
  assert.match(wrapper.content, /CourseLessonBoundPatch<typeof independentLesson/);
  assert.match(wrapper.content, /"practice": typeof practice/);
  assert.match(wrapper.content, /"recap": false/);
  const blockPath = courseRoot + '/reused/sections/intro/paragraph/index.ts';
  const block = plan.files.find(file => file.path === blockPath);
  assert.ok(block, 'nested existing ContentBlock override must be emitted');
  assert.match(block.content, /independentLesson\.intro\.paragraph\.build\.overrides/);

  const lessonPath = 'content/playground/data/lessons/1/' + lessonId + '/index.ts';
  const practicePath = 'content/playground/data/lessons/1/' + lessonId + '/sections/practice/index.ts';
  const lessonModule = [
    "import { defineText, defineContentSection, defineLesson } from '@svitlo/engine/build';",
    "const paragraph = defineText<'paragraph', ['uk']>(" + JSON.stringify(textConfig) + ');',
    "const intro = defineContentSection<'intro', { paragraph: typeof paragraph }, ['uk']>({",
    '  ...' + JSON.stringify(sectionConfig) + ', paragraph,',
    '});',
    "const recapText = defineText<'recapText', ['uk']>(" + JSON.stringify(recapTextConfig) + ');',
    "const recap = defineContentSection<'recap', { recapText: typeof recapText }, ['uk']>({",
    '  ...' + JSON.stringify(recapConfig) + ', recapText,',
    '});',
    "export const independentLesson = defineLesson<'independentLesson', ['uk'], { intro: typeof intro; recap: typeof recap }>({",
    '  ...' + JSON.stringify(lessonConfig) + ',',
    '  params: { ...' + JSON.stringify(lessonConfig.params) + ', languages: ["uk"] as const },',
    '  intro, recap,',
    '});',
    '',
  ].join('\n');
  const practiceModule = [
    "import { defineText, defineContentSection } from '@svitlo/engine/build';",
    "const message = defineText<'message', ['uk']>(" + JSON.stringify(extraText) + ');',
    "export const practice = defineContentSection<'practice', { message: typeof message }, ['uk']>({",
    '  ...' + JSON.stringify(extraConfig) + ', message,',
    '});',
    '',
  ].join('\n');
  const files = [
    ...plan.files,
    { path: lessonPath, kind: 'typescript', content: lessonModule },
    { path: practicePath, kind: 'typescript', content: practiceModule },
  ];
  const additionalPaths = {
    ['#lessonsData/1/' + lessonId + '/index']: ['temp/stage5-course-build/' + lessonPath],
    ['#lessonsData/1/' + lessonId + '/sections/practice']: ['temp/stage5-course-build/' + practicePath],
  };
  const format = errors =>
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
    });
  assert.deepEqual(format(diagnostics(files, additionalPaths)), []);

  const unknownPlacement = files.map(file =>
    file.path === emittedPath
      ? { ...file, content: file.content.replace('"recap": false', '"unknownSection": false') }
      : file,
  );
  assert.ok(
    diagnostics(unknownPlacement, additionalPaths).some(error => error.file?.fileName.endsWith(emittedPath)),
    'unknown Lesson Section must fail generated placement TypeScript',
  );
  const invalid = files.map(file =>
    file.path === blockPath ? { ...file, content: file.content.replace('"Інший текст"', '23') } : file,
  );
  assert.ok(
    diagnostics(invalid, additionalPaths).some(error => error.file?.fileName.endsWith(blockPath)),
    'incorrect nested localized value must fail generated ContentBlock TypeScript',
  );
});
