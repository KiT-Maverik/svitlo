import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { dirname, join, posix, resolve, sep } from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

import ts from 'typescript';

import { defineText } from '../../../configurators/contentBlocks/defineText/defineText';
import { defineLesson } from '../../../configurators/lessons/defineLesson/defineLesson';
import { defineContentSection } from '../../../configurators/sections/defineContentSection/defineContentSection';
import { episodeWorkflowStage2_Schema } from '../../../types/workflow/episodeWorkflow.types';
import { lessonWorkflowStage2_Schema, type LessonWorkflowStage2 } from '../../../types/workflow/lessonWorkflow.types';
import { assertLessonStage6ReleaseReady, materializeLessonStage6 } from './materializeStage6';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const folder = 'content/math/data/lessons/1/' + id('01') + '/';
const verifiedMathSkillId = '54f96aba-7db2-48bb-97ae-5ba2f3436095';
const assessment = {
  questionBankRequired: false,
  flashcardBankRequired: false,
  quizSectionRequired: false,
  flashcardsSectionRequired: false,
};
const valid = () => ({
  config: {
    type: 'lesson' as const,
    id: id('01'),
    slug: 'basics',
    skills: [verifiedMathSkillId],
    params: {
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Basics' } },
    section: {
      items: {
        introduction: {
          config: {
            type: 'content' as const,
            id: id('02'),
            slug: 'introduction',
            params: {},
            locale: { title: { en: 'Introduction' }, navigationLabel: '1' },
            content: {
              items: {
                prompt: {
                  config: {
                    id: id('03'),
                    type: 'text' as const,
                    slug: 'prompt',
                    params: {},
                    locale: { value: { en: 'Read and reflect' } },
                  },
                  production: { purpose: 'Introduce the source fact', specification: 'Preserve this guidance' },
                },
              },
              order: ['prompt'],
            },
          },
          production: { purpose: 'First concept', specification: 'Reviewed sequence' },
        },
      },
      order: ['introduction'],
    },
  },
  production: {
    languages: { document: 'en', planned: ['en'] },
    methodology: 'Source lesson methodology',
    objective: 'One observable learning outcome',
    depth: 'introductory',
    sequenceReason: 'Concept before practice',
    assessmentEvidence: 'Learner articulates the idea',
    assessment: { ...assessment },
  },
});
// The archived bytes represent the SAME authoring object as the evaluated
// fixture. The trusted adapter is responsible for independently checking
// this relationship when invoking the orchestrator.
const reviewedSkillLiteral = '"skills": [\n      "' + verifiedMathSkillId + '"\n    ]';
const reviewedStage2 = JSON.stringify(valid(), null, 2).replace(
  reviewedSkillLiteral,
  '"skills": [identify2dShapes.id]',
);
assert.notEqual(
  reviewedStage2,
  JSON.stringify(valid(), null, 2),
  'verified Stage 2 fixture uses a real imported Skill.id',
);
const stage2Source = [
  "import { identify2dShapes } from '#skillsData/geometry/figures/identify2dShapes';",
  "import type { LessonWorkflowStage2 } from '@svitlo/engine/build';",
  'export const lessonStage2 = ' + reviewedStage2 + ' satisfies LessonWorkflowStage2;',
  '',
].join('\n');
const blobSha = (source: string) =>
  createHash('sha1')
    .update('blob ' + Buffer.byteLength(source) + '\0')
    .update(source)
    .digest('hex');
const reviewed = {
  sourcePath: folder + 'draft.ts',
  sourceBlobSha: blobSha(stage2Source),
  sourceCommitSha: '1'.repeat(40),
};
const options = {
  sourceText: stage2Source,
  source: reviewed,
  verifySourceInput: () => true,
};
function produce(value = valid(), config = options) {
  return materializeLessonStage6(value as unknown as LessonWorkflowStage2, config);
}
test('reviewed source yields deterministic ordinary Lesson and nested Section/ContentBlock manifests', () => {
  const input = valid();
  const original = structuredClone(input);
  const result = produce(input);
  assert.deepEqual(input, original, 'pure source planning must not mutate the authored Stage 2 object');
  assert.deepEqual(result, produce(input), 'deterministic generated source');
  assert.equal(result.materializedPath, folder + 'index.ts');
  assert.equal(result.sourceBlobSha, reviewed.sourceBlobSha);
  assert.equal(result.publishable, false, 'generation does not mean publishing');
  const paths = result.files.map(file => file.path);
  assert.deepEqual(
    paths.filter(path => path.endsWith('index.ts')).sort(),
    [
      folder + 'index.ts',
      folder + 'sections/introduction/index.ts',
      folder + 'sections/introduction/prompt/index.ts',
    ].sort(),
  );
  assert(paths.includes(folder + 'methodology.md'));
  assert(!paths.includes(folder + 'specification.md'));
  assert(paths.includes(folder + 'constants.ts'));
  assert(!paths.includes(folder + 'languages.ts'));
  assert(!paths.includes(folder + 'sections/introduction/specification.md'));
  assert(paths.includes(folder + 'sections/introduction/prompt/specification.md'));
  const root = result.files.find(file => file.path === folder + 'index.ts')!.content;
  assert.match(root, /defineLesson<"basics"/);
  assert.match(root, /"order": \["introduction"\]/);
  assert.match(root, /"id": "12345678-1234-4234-8234-123456789001"/);
  assert.doesNotMatch(root, /"methodology":/);
  assert.match(
    result.files.find(file => file.path === folder + 'methodology.md')!.content,
    /Source lesson methodology/,
  );
  const rootMethodology = result.files.find(file => file.path === folder + 'methodology.md')!.content;
  assert.match(rootMethodology, /One observable learning outcome/);
  assert.match(rootMethodology, /Section: introduction/);
  assert.match(rootMethodology, /Reviewed sequence/);
  assert.doesNotThrow(
    () => assertLessonStage6ReleaseReady(result),
    'no unresolved resources in a complete one-locale Lesson',
  );
  for (const file of result.files.filter(file => file.kind === 'typescript')) {
    const parsed = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.ES2022, true);
    assert.equal(
      (parsed as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics.length,
      0,
      'emitted TS parses: ' + file.path,
    );
  }
});

function assertSemanticModules(plan: ReturnType<typeof materializeLessonStage6>): void {
  // Resolve the checkout containing the compiled test, never the caller's cwd.
  let workspace = __dirname;
  while (!existsSync(join(workspace, 'shared/engine/package.json'))) {
    const parent = dirname(workspace);
    assert.notEqual(parent, workspace, 'repository root not found');
    workspace = parent;
  }
  // Validate the Engine-owned Lesson Config source tree against the real
  // Configurator contracts. Executable Scene TSX drafts have separate React
  // and CSS-module compilation boundaries in the textbook's scene workspace.
  // They still must parse as valid TSX here, even while blocked for release.
  const sceneDrafts = plan.files.filter(file => file.kind === 'typescript' && file.path.includes('/scenes/'));
  for (const file of sceneDrafts) {
    const parsed = ts.createSourceFile(
      file.path,
      file.content,
      ts.ScriptTarget.ES2022,
      true,
      file.path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    assert.deepEqual(
      (parsed as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics,
      [],
      'invalid Scene TypeScript syntax: ' + file.path,
    );
  }
  const files = new Map(
    plan.files
      .filter(file => file.kind === 'typescript' && file.path.startsWith(folder))
      .map(file => [resolve(workspace, file.path), file.content]),
  );
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
  };
  const host = ts.createCompilerHost(options);
  const readFile = host.readFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const directoryExists = host.directoryExists?.bind(host);
  host.readFile = filename => files.get(resolve(filename)) ?? readFile(filename);
  host.fileExists = filename => files.has(resolve(filename)) || fileExists(filename);
  host.directoryExists = dirname =>
    [...files.keys()].some(filename => filename.startsWith(resolve(dirname) + sep)) ||
    directoryExists?.(dirname) === true;
  options.paths = {
    '#lessonsData/*': [resolve(workspace, 'content/math/data/lessons/*')],
    '#skillsData/*': [resolve(workspace, 'content/math/data/skills/*')],
  };
  const program = ts.createProgram([...files.keys()], options, host);
  const errors = ts.getPreEmitDiagnostics(program).filter(issue => issue.category === ts.DiagnosticCategory.Error);
  assert.deepEqual(
    errors.map(
      issue => (issue.file?.fileName ?? '<global>') + ':' + ts.flattenDiagnosticMessageText(issue.messageText, '\n'),
    ),
    [],
    'emitted modules must be assignable to actual @svitlo/engine/build contracts',
  );
}
test('Stage 6 imports only Skills from the owning textbook #skillsData alias', () => {
  const result = produce();
  const root = result.files.find(file => file.path === folder + 'index.ts')!.content;
  assert.match(
    root,
    /import \{ identify2dShapes as skill_ref_0 \} from "#skillsData\/geometry\/figures\/identify2dShapes"/,
  );
  assert.match(root, /"skills": \[skill_ref_0\.id\]/);
  assert.doesNotMatch(root, /TODO \(BLOCKER\): Import the actual Skill/);
  const bad = stage2Source.replace(
    '#skillsData/geometry/figures/identify2dShapes',
    '../../content/playground/data/skills/foo',
  );
  const altered = {
    ...options,
    sourceText: bad,
    source: { ...options.source, sourceBlobSha: blobSha(bad) },
  };
  assert.throws(() => produce(valid(), altered), /owning textbook #skillsData taxonomy/);
});

test('generated Lesson source passes the real TypeScript semantic checker', () => {
  assertSemanticModules(produce());
});
test('generated complete Lesson runs actual Config build.props(), not a mocked factory', () => {
  const plan = produce();
  const sources = new Map(
    plan.files.filter(file => file.kind === 'typescript').map(file => [file.path.slice(folder.length), file.content]),
  );
  const modules = new Map<string, Record<string, unknown>>();
  function load(relative: string): Record<string, unknown> {
    const normalized = posix.normalize(relative);
    const cached = modules.get(normalized);
    if (cached) return cached;
    const source = sources.get(normalized);
    assert.notEqual(source, undefined, 'expected module ' + normalized);
    const exports: Record<string, unknown> = {};
    modules.set(normalized, exports);
    const js = ts.transpileModule(source!, {
      fileName: normalized,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.CommonJS,
      },
    }).outputText;
    const execute = vm.compileFunction(js, ['require', 'exports']);
    execute((specifier: string) => {
      if (specifier === '@svitlo/engine/build') return { defineLesson, defineContentSection, defineText };
      if (specifier === '#skillsData/geometry/figures/identify2dShapes')
        return { identify2dShapes: { id: verifiedMathSkillId } };
      if (specifier.startsWith('#lessonsData/') && specifier.endsWith('/constants')) return load('constants.ts');
      assert(specifier.startsWith('.'), 'only exact imported generated modules allowed');
      const next = posix.join(posix.dirname(normalized), specifier);
      return load(sources.has(next + '.ts') ? next + '.ts' : next + '/index.ts');
    }, exports);
    return exports;
  }
  const lesson = load('index.ts').basics as {
    build: {
      props: (opts: { languages: string[] }) => {
        base: { section: { type: string }[]; skills: string[] };
      };
    };
  };
  const props = lesson.build.props({ languages: ['en'] });
  assert.equal(props.base.section.length, 1);
  assert.equal(props.base.section[0].type, 'content');
  assert.deepEqual(props.base.skills, [verifiedMathSkillId]);
});
test('Lesson Stage 1 remains insufficient; completed Stage 2 can materialize regardless of origin', () => {
  const stage1 = valid();
  delete (stage1.config as unknown as { section?: unknown }).section;
  assert.throws(() => produce(stage1), /expected authored \{ items, order \}/);
  assert.equal(produce().lessonId, id('01'));
});
test('standalone and Course-originated Stage 2 inputs use identical source materialization', () => {
  const standalone = valid();
  const courseOrigin = structuredClone(standalone);
  const first = produce(standalone);
  assert.deepEqual(produce(courseOrigin), first);
});
test('trust rejects source SHA drift, invalid path and unverified pinned source', () => {
  assert.throws(() => produce(valid(), { ...options, sourceText: 'tampered' }), /untrusted source/);
  assert.throws(() => produce(valid(), { ...options, verifySourceInput: () => false }), /untrusted source/);
  assert.throws(
    () =>
      produce(valid(), {
        ...options,
        source: {
          ...reviewed,
          sourceBlobSha: '0'.repeat(40),
        },
      }),
    /untrusted source/,
  );
  assert.throws(
    () =>
      produce(valid(), {
        ...options,
        source: {
          ...reviewed,
          sourcePath: 'content/math/data/lessons/1/../../../other/index.ts',
        },
      }),
    /untrusted source/,
  );
});
test('incomplete Lesson params and source-language plan fail closed without fabrication', () => {
  const input = valid();
  delete (input.config.params as { sections?: unknown }).sections;
  const root = produce(input).files.find(file => file.path.endsWith('/index.ts') || file.path === 'index.ts');
  assert.ok(root);
  const output = produce(input)
    .files.map(file => file.content)
    .join('\n');
  for (const key of ['allowNavigation', 'allowSkipping', 'showIndexes'])
    assert.match(output, new RegExp('"' + key + '": true'));
  const partial = valid();
  partial.config.params.sections.allowNavigation = false;
  delete (partial.config.params.sections as { showIndexes?: boolean }).showIndexes;
  const partialOutput = produce(partial)
    .files.map(file => file.content)
    .join('\n');
  assert.match(partialOutput, /"allowNavigation": false/);
  assert.match(partialOutput, /"showIndexes": true/);
  const missingPolicy = valid();
  delete (missingPolicy.config.params as { quizRequiredForCompletion?: boolean }).quizRequiredForCompletion;
  assert.throws(() => produce(missingPolicy), /incomplete or invalid Lesson Config params/);
  const lang = valid();
  lang.production.languages.planned = ['uk'];
  assert.throws(() => produce(lang), /invalid reviewed document\/planned languages/);
});
test('four independent assessment decisions, enabled required Sections and completion policy', () => {
  const bankOnly = valid();
  bankOnly.production.assessment.questionBankRequired = true;
  bankOnly.production.assessment.flashcardBankRequired = true;
  assert.doesNotThrow(() => produce(bankOnly), 'bank ownership does not create Quiz or Cards Sections');
  const quiz = valid();
  quiz.production.assessment.quizSectionRequired = true;
  assert.throws(() => produce(quiz), /enabled Quiz Section/);
  const cards = valid();
  cards.production.assessment.flashcardsSectionRequired = true;
  assert.throws(() => produce(cards), /enabled Flashcards Section/);
  const required = valid();
  required.config.params.quizRequiredForCompletion = true;
  assert.throws(() => produce(required), /enabled Quiz Section/);
  const noPolicy = valid();
  delete (noPolicy.production.assessment as Partial<typeof assessment>).flashcardsSectionRequired;
  assert.throws(() => produce(noPolicy), /four independent assessment decisions/);
});
test('authored enabled Quiz and Flashcards Sections pass separate source materializers', () => {
  const input = structuredClone(valid()) as unknown as LessonWorkflowStage2;
  input.config.section.items.reviewQuiz = {
    config: {
      type: 'quiz',
      id: id('05'),
      slug: 'reviewQuiz',
      params: {
        selection: { mode: 'all', questionIds: [id('07')] },
        layout: { mode: 'stack' },
        feedbackMode: 'immediate',
        interaction: {
          retries: 0,
          showErrors: true,
          showCorrectAnswers: true,
          allowExplanations: false,
          allowDeferring: false,
          allowQuestionNavigation: false,
          skippable: false,
        },
        results: { visibility: 'immediate', showScore: true },
      },
      locale: { title: 'Quiz', navigationLabel: 'Q' },
      content: { items: {}, order: [] },
    },
    production: { purpose: 'Reviewed assessment' },
  } as LessonWorkflowStage2['config']['section']['items'][string];
  input.config.section.items.reviewCards = {
    config: {
      type: 'flashcards',
      id: id('06'),
      slug: 'reviewCards',
      params: { selection: { flashcardIds: [id('08')] } },
      locale: { title: 'Cards', navigationLabel: 'C' },
      content: { items: {}, order: [] },
    },
    production: { purpose: 'Reviewed recall practice' },
  } as LessonWorkflowStage2['config']['section']['items'][string];
  input.config.section.order.push('reviewQuiz', 'reviewCards');
  input.config.params = {
    ...input.config.params,
    quizRequiredForCompletion: true,
  };
  input.production.assessment.quizSectionRequired = true;
  input.production.assessment.flashcardsSectionRequired = true;
  const sourceFor = (value: LessonWorkflowStage2) => {
    // These are executable Configurator imports, not handwritten bank UUIDs.
    const reviewedObject = JSON.stringify(value, null, 2)
      .replace(/"questionIds": \[\s*"[^"]+"\s*\]/, '"questionIds": [reviewQuestion.id]')
      .replace(/"flashcardIds": \[\s*"[^"]+"\s*\]/, '"flashcardIds": [memoryCard.id]');
    const sourceText = [
      "import type { LessonWorkflowStage2 } from '@svitlo/engine/build';",
      "import { reviewQuestion } from './questions/multipleChoice/example';",
      "import { reviewCard as memoryCard } from './flashcards/example';",
      'export const stage2 = ' + reviewedObject + ' satisfies LessonWorkflowStage2;',
      '',
    ].join('\n');
    return {
      ...options,
      sourceText,
      source: { ...reviewed, sourceBlobSha: blobSha(sourceText) },
    };
  };
  const plan = materializeLessonStage6(input, sourceFor(input));
  assert(plan.files.some(file => file.path === folder + 'sections/reviewQuiz/index.ts'));
  assert(plan.files.some(file => file.path === folder + 'sections/reviewCards/index.ts'));
  const quizSource = plan.files.find(file => file.path === folder + 'sections/reviewQuiz/index.ts')!.content;
  const cardsSource = plan.files.find(file => file.path === folder + 'sections/reviewCards/index.ts')!.content;
  assert(
    quizSource.includes('import { reviewQuestion as stage6_ref_0 } from "../../questions/multipleChoice/example";'),
  );
  assert(cardsSource.includes('import { reviewCard as stage6_ref_0 } from "../../flashcards/example";'));
  assert(quizSource.includes('"questionIds": [stage6_ref_0.id]'));
  assert(cardsSource.includes('"flashcardIds": [stage6_ref_0.id]'));
  assert(!quizSource.includes(id('07')), 'bank UUID must not replace Configurator reference');
  assert(!cardsSource.includes(id('08')), 'bank UUID must not replace Configurator reference');
  assert.equal(
    plan.diagnostics.some(diagnostic => diagnostic.code.startsWith('pending-')),
    false,
  );
  assert.doesNotThrow(() => assertLessonStage6ReleaseReady(plan));
  const provisional = structuredClone(input);
  const quiz = provisional.config.section.items.reviewQuiz as unknown as {
    config: { params: { selection: { questionIds: string[] } } };
  };
  quiz.config.params.selection.questionIds = ['feedc0de-1234-4234-8234-123456789007'];
  const blocked = materializeLessonStage6(provisional, sourceFor(provisional));
  assert.throws(() => assertLessonStage6ReleaseReady(blocked), /publication blocked/);

  // Fail closed on handwritten UUIDs or nonimported expressions in a reviewed
  // nonempty selection, rather than silently producing magic UUID literals.
  const literal = [
    "import type { LessonWorkflowStage2 } from '@svitlo/engine/build';",
    'export const stage2 = ' + JSON.stringify(input, null, 2) + ' satisfies LessonWorkflowStage2;',
    '',
  ].join('\n');
  assert.throws(
    () =>
      materializeLessonStage6(input, {
        ...options,
        sourceText: literal,
        source: { ...reviewed, sourceBlobSha: blobSha(literal) },
      }),
    /requires imported Question/,
  );
  const unbound = sourceFor(input).sourceText.replace('reviewQuestion.id', 'notImported.id');
  assert.throws(
    () =>
      materializeLessonStage6(input, {
        ...options,
        sourceText: unbound,
        source: { ...reviewed, sourceBlobSha: blobSha(unbound) },
      }),
    /without an executable Configurator import/,
  );
  const expression = sourceFor(input).sourceText.replace('reviewQuestion.id', 'getQuestion().id');
  assert.throws(
    () =>
      materializeLessonStage6(input, {
        ...options,
        sourceText: expression,
        source: { ...reviewed, sourceBlobSha: blobSha(expression) },
      }),
    /must reference a static member/,
  );

  // References through a named bank map must also remain references.
  const throughBank = sourceFor(input)
    .sourceText.replace(
      "import { reviewQuestion } from './questions/multipleChoice/example';",
      "import { questions } from './questions';",
    )
    .replace('reviewQuestion.id', 'questions.multipleChoice.example.id');
  const bankPlan = materializeLessonStage6(input, {
    ...options,
    sourceText: throughBank,
    source: { ...reviewed, sourceBlobSha: blobSha(throughBank) },
  });
  const bankQuiz = bankPlan.files.find(file => file.path === folder + 'sections/reviewQuiz/index.ts')!.content;
  assert(bankQuiz.includes('import { questions as stage6_ref_0 } from "../../questions";'));
  assert(bankQuiz.includes('"questionIds": [stage6_ref_0.multipleChoice.example.id]'));
});

test('duplicate UUID, wrong slug, invalid order and unsanctioned identity are rejected', () => {
  const duplicate = valid();
  duplicate.config.section.items.introduction.config.id = id('01');
  assert.throws(() => produce(duplicate), /duplicate authored UUID/);
  const invalidSlug = valid();
  invalidSlug.config.section.items.introduction.config.slug = '../escape';
  assert.throws(() => produce(invalidSlug), /invalid authored entity identity/);
  const ordering = valid();
  ordering.config.section.order = ['unknown'];
  assert.throws(() => produce(ordering), /every authored child must be ordered once/);
});
test('planned translations and missing Scene remain explicit nonpublishable blockers', () => {
  const translated = valid();
  translated.production.languages.planned.push('uk');
  const plan = produce(translated);
  assert(plan.diagnostics.some(item => item.code === 'pending-localizations'));
  assert.throws(() => assertLessonStage6ReleaseReady(plan), /publication blocked/);
});

test('typed Stage 2 media placeholders survive nested materialization and fail publication', () => {
  const resource = (purpose: string) => ({
    purpose,
    specification: 'Produce the reviewed learning resource',
    accessibility: 'Provide equivalent accessible content',
    offline: 'Provide an offline learning path',
  });
  const image = (slug: string, number: string, fileName?: string) => ({
    config: {
      id: id(number),
      slug,
      type: 'image' as const,
      params: { width: 640, height: 480 },
      locale: { alt: { en: 'An accessible diagram', uk: 'Український опис' }, ...(fileName ? { fileName } : {}) },
    },
    production: resource('Explain the diagram'),
  });
  const video = (slug: string, number: string, fileName?: string) => ({
    config: {
      id: id(number),
      slug,
      type: 'video' as const,
      params: {},
      locale: { label: { en: 'Watch the explanation' }, ...(fileName ? { fileName } : {}) },
    },
    production: resource('Show the process'),
  });
  const audio = (slug: string, number: string) => ({
    config: { id: id(number), slug, type: 'audio' as const, params: {}, locale: { title: { en: 'Narration' } } },
    production: resource('Narrate the process'),
  });
  const subtitles = (slug: string, number: string) => ({
    config: { id: id(number), slug, type: 'subtitles' as const, params: {}, locale: {} },
    production: resource('Caption the process'),
  });
  const scene = {
    config: {
      id: id('28'),
      slug: 'interaction',
      type: 'scene' as const,
      params: {},
      locale: { value: { title: { en: 'Try it' } } },
    },
    production: resource('Practice the concept'),
  };
  const base = valid();
  const fixture: LessonWorkflowStage2 = {
    config: {
      ...base.config,
      skills: [verifiedMathSkillId],
      section: {
        items: {
          introduction: {
            ...base.config.section.items.introduction,
            config: {
              ...base.config.section.items.introduction.config,
              content: {
                items: {
                  prompt: base.config.section.items.introduction.config.content.items.prompt,
                  image: image('image', '09'),
                  video: video('video', '10'),
                  audio: audio('audio', '11'),
                  subtitles: subtitles('subtitles', '12'),
                  link: {
                    config: {
                      id: id('13'),
                      slug: 'link',
                      type: 'youtube',
                      params: { mode: 'link' },
                      locale: { label: 'Open video' },
                    },
                    production: resource('Offer the source video'),
                  },
                  embed: {
                    config: {
                      id: id('14'),
                      slug: 'embed',
                      type: 'youtube',
                      params: { mode: 'embed' },
                      locale: { label: 'Watch video', href: { uk: 'https://www.youtube.com/watch?v=real' } },
                    },
                    production: resource('Show the source video'),
                  },
                  carousel: {
                    config: {
                      id: id('15'),
                      slug: 'carousel',
                      type: 'carousel',
                      params: {},
                      locale: {},
                      slides: { items: { slide: image('slide', '16', id('29') + '.png') }, order: ['slide'] },
                    },
                  },
                  checkpoint: {
                    config: {
                      id: id('17'),
                      slug: 'checkpoint',
                      type: 'checkpoint',
                      params: { requireCompletion: true },
                      locale: { title: 'Check' },
                      content: {
                        items: {
                          first: {
                            config: {
                              id: id('18'),
                              slug: 'first',
                              type: 'checkpointItem',
                              check: true,
                              question: {
                                config: {
                                  id: id('19'),
                                  slug: 'question',
                                  type: 'text',
                                  params: {},
                                  locale: { value: 'What happened?' },
                                },
                                production: { purpose: 'Ask the learner' },
                              },
                              answer: {
                                config: {
                                  id: id('20'),
                                  slug: 'answer',
                                  type: 'checkpointAnswer',
                                  content: {
                                    items: { answerImage: image('answerImage', '21') },
                                    order: ['answerImage'],
                                  },
                                },
                              },
                            },
                          },
                        },
                        order: ['first'],
                      },
                    },
                  },
                },
                order: ['prompt', 'image', 'video', 'audio', 'subtitles', 'link', 'embed', 'carousel', 'checkpoint'],
              },
            },
          },
          quest: {
            config: {
              id: id('22'),
              slug: 'quest',
              type: 'quest',
              params: {},
              locale: { title: 'Quest', navigationLabel: 'Q' },
              stages: {
                start: {
                  config: {
                    id: id('23'),
                    slug: 'start',
                    type: 'questStage',
                    content: {
                      video: { medium: video('medium', '24'), small: video('small', '25', id('30') + '.mp4') },
                      audio: { dialogue: audio('dialogue', '26'), narration: null, background: null },
                      image: image('questImage', '27'),
                      subtitles: subtitles('questSubtitles', '31'),
                    },
                  },
                },
              },
              tasks: { start: { config: { id: id('32'), slug: 'start', type: 'questTask', scene } } },
            },
            production: { ...resource('Guide practice'), runtimeStatus: 'unimplemented' },
          },
        },
        order: ['introduction', 'quest'],
      },
    },
    production: { ...base.production, languages: { document: 'en', planned: ['en'] } },
  };
  const plan = materializeLessonStage6(fixture, options);
  assert.deepEqual(plan, materializeLessonStage6(fixture, options));
  const lessonRoot = plan.files.find(file => file.path === folder + 'index.ts')?.content ?? '';
  assert.match(lessonRoot, /TODO \(BLOCKER\): Quest is Build-only/);
  assert.doesNotMatch(lessonRoot, /child_section_items_quest|\.\/sections\/quest/);
  assert.match(lessonRoot, /"order": \["introduction"\]/);
  assert(plan.files.some(file => file.path === folder + 'sections/quest/index.ts'));
  assert(plan.diagnostics.some(item => item.code === 'pending-lesson' && item.message.includes('Quest is Build-only')));
  const pending = plan.diagnostics.filter(item => item.code === 'pending-media');
  assert.equal(pending.length, 14);
  assert.deepEqual(
    pending.reduce<Record<string, number>>((counts, item) => {
      counts[item.path] = (counts[item.path] ?? 0) + 1;
      return counts;
    }, {}),
    {
      '$.config.locale.fileName': 9,
      '$.config.locale.posterFileName': 3,
      '$.config.locale.href': 1,
      '$.config.locale.href.en': 1,
    },
  );
  assert(pending.every(item => item.severity === 'warning' && item.message.includes('verified')));
  for (const [path, extension] of [
    ['sections/introduction/image/index.ts', 'webp'],
    ['sections/introduction/video/index.ts', 'mp4'],
    ['sections/introduction/video/index.ts', 'webp'],
    ['sections/introduction/audio/index.ts', 'mp3'],
    ['sections/introduction/subtitles/index.ts', 'vtt'],
  ]) {
    const source = plan.files.find(file => file.path === folder + path)?.content ?? '';
    assert.match(
      source,
      new RegExp('TODO \\(BLOCKER\\):[^\\n]+\\n"00000000-0000-0000-0000-000000000000\\.' + extension + '"'),
    );
  }
  for (const path of ['link', 'embed']) {
    const source =
      plan.files.find(file => file.path === folder + 'sections/introduction/' + path + '/index.ts')?.content ?? '';
    assert.match(
      source,
      /TODO \(BLOCKER\): Supply a verified YouTube URL before publication\.\n"00000000-0000-0000-0000-000000000000"/,
    );
  }
  const carouselSlide = plan.files.find(file => file.path.endsWith('/carousel/slides/slide/index.ts'))?.content ?? '';
  assert.match(carouselSlide, new RegExp(id('29') + '\\.png'));
  assert.match(carouselSlide, /An accessible diagram/);
  assert.doesNotMatch(carouselSlide, /Український опис/);
  // Production briefs are removable comments in their owning media modules,
  // including Carousel Image slides; they are never durable media sidecars.
  for (const [suffix, kind] of [
    ['sections/introduction/image', 'Image'],
    ['sections/introduction/video', 'Video'],
    ['sections/introduction/audio', 'Audio'],
    ['sections/introduction/subtitles', 'Subtitles'],
    ['sections/introduction/carousel/slides/slide', 'Image'],
  ]) {
    const path = folder + suffix;
    const module = plan.files.find(file => file.path === path + '/index.ts')?.content ?? '';
    assert(module.includes('// TODO (BLOCKER): Remove the temporary ' + kind + ' specification'));
    assert(module.includes('/**\\n * # purpose'));
    assert(module.includes(' * # specification'));
    assert(module.indexOf(');') < module.indexOf('Remove the temporary ' + kind + ' specification'));
    assert(!plan.files.some(file => file.path === path + '/specification.md'));
  }

  const resolved = structuredClone(fixture);
  const blocks = resolved.config.section.items.introduction;
  if (blocks.config.type !== 'content') throw new Error('Expected content Section');
  for (const slug of ['link', 'embed']) {
    const block = blocks.config.content.items[slug];
    if (block.config.type !== 'youtube') throw new Error('Expected YouTube block');
    block.config.locale.href =
      slug === 'link'
        ? 'https://www.youtube.com/watch?v=real'
        : { en: 'https://www.youtube.com/watch?v=real', uk: 'https://www.youtube.com/watch?v=other' };
  }
  const resolvedPlan = materializeLessonStage6(resolved, options);
  assert.equal(resolvedPlan.diagnostics.filter(item => item.code === 'pending-media').length, 12);
  for (const slug of ['link', 'embed']) {
    const source = resolvedPlan.files.find(file => file.path.endsWith('/' + slug + '/index.ts'))?.content ?? '';
    assert.match(source, /https:\/\/www\.youtube\.com\/watch\?v=real/);
    assert.doesNotMatch(source, /UNRESOLVED|00000000-0000-0000-0000-000000000000/);
    assert.doesNotMatch(source, /Український|other/);
  }
  assert.throws(() => assertLessonStage6ReleaseReady(plan), /publication blocked/);
  assertSemanticModules(plan);
});

test('final Lesson schema rejects invalid nested input before rendering', () => {
  assert.equal(lessonWorkflowStage2_Schema.safeParse(valid()).success, true);
  const invalid = valid();
  const { config } = invalid.config.section.items.introduction.config.content.items.prompt;
  const broken = { ...config, locale: { value: 123 } };
  Object.assign(config, broken);
  assert.equal(lessonWorkflowStage2_Schema.safeParse(invalid).success, false);
  assert.throws(() => produce(invalid), /Invalid Lesson Stage 2 input/);
});

test('Episode shares ordinary Section contracts without importing Lesson assessment ownership', () => {
  const lesson = valid();
  const episode = {
    config: {
      type: 'episode',
      id: id('33'),
      slug: 'transition',
      locale: lesson.config.locale,
      section: lesson.config.section,
    },
    production: {
      focus: 'Reviewed transition',
      purpose: 'Continue the narrative',
      placement: {
        courseId: id('34'),
        path: 'content/transition',
        orderPath: [0],
        reviewedCourseSourceBlobSha: 'a'.repeat(40),
      },
      languages: lesson.production.languages,
      scenario: {
        audience: 'Beginners',
        entrySituation: 'Arrival',
        exitSituation: 'Observation',
        continuity: 'Next scene',
        sceneIntent: 'Show the setting',
        interactionIntent: 'Read and reflect',
        accessibility: 'Equivalent text',
        narrativeConstraints: 'No new assessment',
      },
      specification: 'Reviewed narrative',
    },
  };
  assert.equal(episodeWorkflowStage2_Schema.safeParse(episode).success, true);
  assert.equal(
    episodeWorkflowStage2_Schema.safeParse({
      ...episode,
      config: { ...episode.config, skills: lesson.config.skills },
    }).success,
    false,
  );
  assert.equal(
    episodeWorkflowStage2_Schema.safeParse({
      ...episode,
      config: { ...episode.config, events: { unsupported: {} } },
    }).success,
    false,
  );
});

test('direct Lesson invocation returns the same source plan using runner-owned metadata', async () => {
  const { executeMaterializerEntrypoint } = await import('../directMaterialization/directMaterialization');
  const input = valid() as unknown as LessonWorkflowStage2;
  const sourceText =
    "import { materializeLessonStage6 } from '@svitlo/engine/build';\n" +
    'materializeLessonStage6(' +
    JSON.stringify(input) +
    ');\n';
  const directOptions = {
    ...options,
    sourceText,
    source: { ...reviewed, sourceBlobSha: blobSha(sourceText) },
  };
  const expected = materializeLessonStage6(input, directOptions);
  const actual = await executeMaterializerEntrypoint('lesson-stage6', directOptions, async () => {
    materializeLessonStage6(input);
  });
  assert.deepEqual(actual, expected);
  assert.throws(() => materializeLessonStage6(input), /isolated execution context/);
});

test('Lesson Stage 6 plans an executable Scene draft alongside its canonical Config in one sealed output', () => {
  const input = valid() as unknown as Record<string, { [key: string]: any }>;
  const sceneId = id('05');
  const collection = input.config.section.items.introduction.config.content;
  collection.items.chooseShape = {
    config: {
      id: sceneId,
      slug: 'chooseShape',
      type: 'scene',
      params: {},
      locale: { value: { instruction: { en: 'Choose a shape' } } },
    },
    production: {
      purpose: 'Review the selected shape',
      specification: 'Review the selected color and shape.\n*/\nexport const injected = true;',
      accessibility: 'Use typed source-locale feedback and keyboard equivalents',
      offline: 'No remote services',
    },
  };
  collection.order.push('chooseShape');
  const sourceText = 'export const stage2 = ' + JSON.stringify(input) + ';';
  const result = produce(input as unknown as ReturnType<typeof valid>, {
    sourceText,
    source: { ...reviewed, sourceBlobSha: blobSha(sourceText) },
    verifySourceInput: () => true,
  });
  const root = 'content/math/scenes/5/' + sceneId + '/';
  const paths = result.files.map(file => file.path);
  const executable = paths.filter(path => path.startsWith(root));
  assert.equal(executable.length, 6);
  assert(paths.includes(folder + 'sections/introduction/chooseShape/index.ts'));
  assert(paths.includes(root + 'ChooseShape.tsx'));
  assert(paths.includes(root + 'ChooseShape.unit.spec.tsx'));
  assert(!paths.some(path => path === root + 'specification.md'));
  const tsx = result.files.find(file => file.path === root + 'ChooseShape.tsx')!.content;
  assert.match(tsx, /\/\/ \*\/\n\/\/ export const injected = true;/);
  assert.match(tsx, /TODO \(BLOCKER\)/);
  assert(result.diagnostics.some(diag => diag.code === 'pending-scene'));
  assert.throws(() => assertLessonStage6ReleaseReady(result), /publication blocked/);
  const withoutSpec = structuredClone(input);
  withoutSpec.config.section.items.introduction.config.content.items.chooseShape.production.specification = '';
  assert.throws(
    () =>
      produce(withoutSpec as ReturnType<typeof valid>, {
        sourceText,
        source: { ...reviewed, sourceBlobSha: blobSha(sourceText) },
        verifySourceInput: () => true,
      }),
    /reviewed production\.specification/,
  );
});

test('four reviewed Scene nodes retain their UUIDs and emit four isolated executable scaffold directories', () => {
  const input = valid() as unknown as Record<string, any>;
  const collection = input.config.section.items.introduction.config.content;
  for (const [suffix, slug] of [
    ['05', 'chooseShape'],
    ['06', 'chooseColor'],
    ['07', 'resetSelection'],
    ['08', 'explorePatterns'],
  ]) {
    collection.items[slug] = {
      config: {
        id: id(suffix),
        slug,
        type: 'scene',
        params: {},
        locale: { value: { status: { en: slug } } },
      },
      production: {
        purpose: 'Verify the reviewed behavior',
        specification: 'Approved interaction for ' + slug,
        accessibility: 'Keyboard and touch parity',
        offline: 'Works offline',
      },
    };
    collection.order.push(slug);
  }
  const sourceText = 'export const stage2 = ' + JSON.stringify(input) + ';';
  const plan = produce(input as unknown as ReturnType<typeof valid>, {
    sourceText,
    source: { ...reviewed, sourceBlobSha: blobSha(sourceText) },
    verifySourceInput: () => true,
  });
  const dirs = new Set(
    plan.files
      .filter(file => file.path.includes('/scenes/') && file.path.endsWith('.tsx'))
      .filter(file => !file.path.endsWith('.stories.tsx') && !file.path.endsWith('.unit.spec.tsx'))
      .map(file => file.path.split('/').slice(0, -1).join('/')),
  );
  assert.deepEqual(
    [...dirs].sort(),
    ['05', '06', '07', '08'].map(suffix => 'content/math/scenes/' + suffix.at(-1) + '/' + id(suffix)).sort(),
  );
  assert.equal(plan.files.filter(file => /^content\/math\/scenes\/[0-9a-f]\//.test(file.path)).length, 24);
  assert.equal(
    plan.files.filter(file => /\/specification\.md$/.test(file.path) && file.path.includes('/scenes/')).length,
    0,
  );
  assert(plan.files.every(file => !file.path.endsWith('/sceneLoader.ts')));
});
