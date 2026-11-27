import assert from 'node:assert/strict';
import { posix } from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

import ts from 'typescript';

import { defineLesson } from '../../../configurators/lessons/defineLesson/defineLesson';
import { defineQuizSection } from '../../../configurators/sections/defineQuizSection/defineQuizSection';
import { materializeQuizSection } from '../quizSection/quizSection';
import { assertLessonSourceReleaseReady, materializeLesson, type Result } from './lesson';

const id = (suffix: string) => '12345678-1234-4234-8234-1234567890' + suffix;
const reserved = 'feedc0de-1234-4234-8234-123456789022';

function emitQuizLesson(questionId: string): Result {
  const quiz = {
    type: 'quiz' as const,
    id: id('02'),
    slug: 'requiredQuiz',
    params: {
      selection: { mode: 'all' as const, questionIds: [questionId] },
      layout: { mode: 'stack' as const },
      feedbackMode: 'immediate' as const,
      interaction: {
        retries: 0,
        showErrors: true,
        showCorrectAnswers: true,
        allowExplanations: false,
        allowDeferring: false,
        allowQuestionNavigation: false,
        skippable: false,
      },
      results: { visibility: 'immediate' as const, showScore: true },
    },
    locale: { title: 'Quiz', navigationLabel: 'Q' },
    children: [] as string[],
  };
  const input = {
    type: 'lesson' as const,
    id: id('01'),
    slug: 'requiredLesson',
    skills: [] as string[],
    params: {
      languages: ['en'] as const,
      quizRequiredForCompletion: true,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: 'Lesson' },
    children: ['requiredQuiz'],
    requiredQuiz: quiz,
  };
  return materializeLesson(input as unknown as Parameters<typeof materializeLesson>[0], {
    documentLanguage: 'en',
    renderSection: (config, options) =>
      materializeQuizSection(config as Parameters<typeof materializeQuizSection>[0], {
        ...options,
        renderContentBlock: () => {
          throw new Error('No Quiz blocks in this fixture');
        },
      }),
  });
}

/** Execute generated TS modules with the real Engine factories, not fake Build methods. */
function executeGeneratedLesson(result: Result) {
  const sources = new Map(result.files.filter(f => f.kind === 'typescript').map(f => [f.path, f.content]));
  const loaded = new Map<string, Record<string, unknown>>();
  function load(file: string): Record<string, unknown> {
    const key = posix.normalize(file);
    const existing = loaded.get(key);
    if (existing) return existing;
    const code = sources.get(key);
    if (code === undefined) throw new Error('Emitted module is missing: ' + key);
    const exported: Record<string, unknown> = {};
    loaded.set(key, exported);
    const compiled = ts.transpileModule(code, {
      fileName: key,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const run = vm.compileFunction(compiled, ['require', 'exports']);
    run((specifier: string): Record<string, unknown> => {
      if (specifier === '@svitlo/engine/build') return { defineLesson, defineQuizSection };
      if (specifier.startsWith('#lessonsData/') && specifier.endsWith('/constants')) return load('constants.ts');
      if (!specifier.startsWith('.')) throw new Error('Unexpected emitted import: ' + specifier);
      const target = posix.join(posix.dirname(key), specifier);
      return load(sources.has(target + '.ts') ? target + '.ts' : target + '/index.ts');
    }, exported);
    return exported;
  }
  return load('index.ts').requiredLesson as {
    build: {
      data: (options: { languages: string[] }) => {
        base: {
          params: { quizRequiredForCompletion: boolean };
          children: string[];
          requiredQuiz: { type: string; params: { disabled?: boolean } };
        };
      };
    };
  };
}

test('emitted defineLesson with an enabled Quiz satisfies the real Build.data invariant', () => {
  const source = emitQuizLesson(id('22'));
  assert.deepEqual(source.diagnostics, []);
  const built = executeGeneratedLesson(source).build.data({ languages: ['en'] });
  assert.equal(built.base.params.quizRequiredForCompletion, true);
  assert.equal(built.base.children.length, 1);
  assert.equal(built.base.requiredQuiz.type, 'quiz');
  assert.notEqual(built.base.requiredQuiz.params.disabled, true);
  assert.doesNotThrow(() => assertLessonSourceReleaseReady(source));
});

test('real Build-valid pending Quiz stays blocked from source release without TODO comments', () => {
  const source = emitQuizLesson(reserved);
  const built = executeGeneratedLesson(source).build.data({ languages: ['en'] });
  assert.equal(built.base.requiredQuiz.type, 'quiz');
  assert.ok(source.diagnostics.some(d => d.code === 'pending-quiz'));
  assert.throws(() => assertLessonSourceReleaseReady(source), /reserved provisional assessment UUID/);
  const withoutComments = {
    ...source,
    diagnostics: [],
    files: source.files.map(f => ({
      ...f,
      content: f.content.replace(/^.*TODO \(BLOCKER\).*$/gm, ''),
    })),
  };
  assert.throws(() => assertLessonSourceReleaseReady(withoutComments), /reserved provisional assessment UUID/);
});

test('disabled Quiz is rejected by the real Lesson Build API', () => {
  const disabledQuiz = defineQuizSection<'requiredQuiz', {}, ['en']>({
    type: 'quiz',
    id: id('02'),
    slug: 'requiredQuiz',
    params: {
      disabled: true,
      selection: { mode: 'all', questionIds: [id('22')] },
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
    children: [],
  });
  // Infer the concrete required Quiz placement rather than the empty generic map.
  const lesson = defineLesson<'requiredLesson', ['en'], { requiredQuiz: typeof disabledQuiz }>({
    type: 'lesson',
    id: id('01'),
    slug: 'requiredLesson',
    skills: [],
    params: {
      languages: ['en'] as const,
      quizRequiredForCompletion: true,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: 'Lesson' },
    children: ['requiredQuiz'],
    requiredQuiz: disabledQuiz,
  });
  assert.throws(() => lesson.build.data({ languages: ['en'] }), /Lesson requires at least one enabled Quiz section/);
});
