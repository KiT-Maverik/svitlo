import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import ts from 'typescript';
import { materializeLessonStage6, assertLessonStage6ReleaseReady } from './materializeStage6';
import type { LessonWorkflowMaterializerInput } from '../../../types/workflow/lessonWorkflow.types';
import { defineLesson } from '../../../configurators/lessons/defineLesson/defineLesson';
import { defineContentSection } from '../../../configurators/sections/defineContentSection/defineContentSection';
import { defineText } from '../../../configurators/contentBlocks/defineText/defineText';
import { posix } from 'node:path';
import vm from 'node:vm';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const folder = 'content/math/data/lessons/1/' + id('01') + '/';
const stage2Source = 'export const lesson = { config: {}, production: {} } satisfies LessonWorkflowStage2;\n';
const blobSha = (source: string) => createHash('sha1')
  .update('blob ' + Buffer.byteLength(source) + '\0').update(source).digest('hex');
const reviewed = {
  sourcePath: folder + 'index.ts',
  sourceBlobSha: blobSha(stage2Source),
  reviewCommitSha: '1'.repeat(40),
  reviewEvidenceSha: '2'.repeat(40),
  stage6Authorized: true as const,
};
const assessment = {
  questionBankRequired: false,
  flashcardBankRequired: false,
  quizSectionRequired: false,
  flashcardsSectionRequired: false,
};
const valid = () => ({
  config: {
    type: 'lesson' as const,
    id: id('01'), slug: 'basics', skills: [id('04')],
    params: {
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Basics' } },
    section: {
      items: {
        introduction: {
          config: {
            type: 'content' as const, id: id('02'), slug: 'introduction',
            params: {}, locale: { title: { en: 'Introduction' }, navigationLabel: '1' },
            content: {
              items: {
                prompt: {
                  config: {
                    id: id('03'), type: 'text' as const, slug: 'prompt',
                    params: {}, locale: { value: { en: 'Read and reflect' } },
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
const options = {
  sourceText: stage2Source,
  review: reviewed,
  verifyReviewedInput: () => true,
};
function produce(value = valid(), config = options) {
  return materializeLessonStage6(value as unknown as LessonWorkflowMaterializerInput, config);
}
test('reviewed source yields deterministic ordinary Lesson and nested Section/ContentBlock manifests', () => {
  const input = valid();
  const original = structuredClone(input);
  const result = produce(input);
  assert.deepEqual(input, original, 'pure source planning must not mutate the authored Stage 2 object');
  assert.deepEqual(result, produce(input), 'deterministic generated source');
  assert.equal(result.archivePath, folder + 'workflow.stage2.ts');
  assert.equal(result.sourceBlobSha, reviewed.sourceBlobSha);
  assert.equal(result.publishable, false, 'generation does not mean publishing');
  const paths = result.files.map(file => file.path);
  assert.deepEqual(paths.filter(path => path.endsWith('index.ts')).sort(), [
    folder + 'index.ts',
    folder + 'sections/introduction/index.ts',
    folder + 'sections/introduction/content/items/prompt/index.ts',
  ].sort());
  assert(paths.includes(folder + 'methodology.md'));
  assert(paths.includes(folder + 'specification.md'));
  assert(paths.includes(folder + 'sections/introduction/specification.md'));
  assert(paths.includes(folder + 'sections/introduction/content/items/prompt/specification.md'));
  const root = result.files.find(file => file.path === folder + 'index.ts')!.content;
  assert.match(root, /defineLesson<"basics"/);
  assert.match(root, /"order": \["introduction"\]/);
  assert.match(root, /"id": "12345678-1234-4234-8234-123456789001"/);
  assert.doesNotMatch(root, /"methodology":/);
  assert.match(result.files.find(file => file.path === folder + 'methodology.md')!.content,
    /Source lesson methodology/);
  assert.doesNotThrow(() => assertLessonStage6ReleaseReady(result),
    'no unresolved resources in a complete one-locale Lesson');
  for (const file of result.files.filter(file => file.kind === 'typescript')) {
    const parsed = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.ES2022, true);
    assert.equal(parsed.parseDiagnostics.length, 0, 'emitted TS parses: ' + file.path);
  }
});

test('generated complete Lesson runs actual Config build.props(), not a mocked factory', () => {
  const plan = produce();
  const sources = new Map(plan.files.filter(file => file.kind === 'typescript')
    .map(file => [file.path.slice(folder.length), file.content]));
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
      fileName: normalized, compilerOptions: {
        target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS,
      },
    }).outputText;
    const execute = vm.compileFunction(js, ['require', 'exports']);
    execute((specifier: string) => {
      if (specifier === '@svitlo/engine/build') return { defineLesson, defineContentSection, defineText };
      assert(specifier.startsWith('.'), 'only exact imported generated modules allowed');
      const next = posix.join(posix.dirname(normalized), specifier);
      return load(sources.has(next + '.ts') ? next + '.ts' : next + '/index.ts');
    }, exports);
    return exports;
  }
  const lesson = load('index.ts').basics as {
    build: { props: (opts: { languages: string[] }) => {
      base: { section: { type: string }[]; skills: string[] };
    } };
  };
  const props = lesson.build.props({ languages: ['en'] });
  assert.equal(props.base.section.length, 1);
  assert.equal(props.base.section[0].type, 'content');
  assert.deepEqual(props.base.skills, [id('04')]);
});
test('Course-origin Stage 1 remains insufficient; a completed Stage 2 handoff can materialize', () => {
  const stage1 = valid();
  delete (stage1.config as unknown as { section?: unknown }).section;
  assert.throws(() => produce(stage1), /expected authored \{ items, order \}/);
  assert.equal(produce().lessonId, id('01'));
});
test('trust rejects source SHA drift, missing Stage 6 authorization and unverified independent review', () => {
  assert.throws(() => produce(valid(), { ...options, sourceText: 'tampered' }), /untrusted source/);
  assert.throws(() => produce(valid(), { ...options, verifyReviewedInput: () => false }),
    /untrusted source/);
  assert.throws(() => produce(valid(), { ...options, review: {
    ...reviewed, sourceBlobSha: '0'.repeat(40) },
  }), /untrusted source/);
  assert.throws(() => produce(valid(), { ...options, review: {
    ...reviewed, stage6Authorized: false as never },
  }), /untrusted source/);
  assert.throws(() => produce(valid(), { ...options, review: {
    ...reviewed, sourcePath: 'content/math/data/lessons/1/../../../other/index.ts',
  } }), /untrusted source/);
});
test('incomplete Lesson params and source-language plan fail closed without fabrication', () => {
  const input = valid();
  delete (input.config.params as { sections?: unknown }).sections;
  assert.throws(() => produce(input), /incomplete or invalid Lesson Config params/);
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
  assert(plan.diagnostics.some(item => item.code === 'pending-lesson'));
  assert.throws(() => assertLessonStage6ReleaseReady(plan), /publication blocked/);
});
