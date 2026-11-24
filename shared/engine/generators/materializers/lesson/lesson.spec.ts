import assert from 'node:assert/strict';
import test from 'node:test';

import ts from 'typescript';

import { materializeContentSection, type Source as ContentSource } from '../contentSection/contentSection';
import { assertLessonSourceReleaseReady, materializeLesson } from './lesson';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const section = () => ({
  id: id('02'),
  slug: 'introduction',
  type: 'content',
  params: {},
  locale: { title: { en: 'Introduction', uk: 'Вступ' }, navigationLabel: '1' },
  content: {
    items: {
      prompt: {
        id: id('03'),
        slug: 'prompt',
        type: 'text',
        params: {},
        locale: { value: { en: 'Read', uk: 'Читай' } },
      },
    },
    order: ['prompt'],
  },
});
const lesson = () => ({
  id: id('01'),
  slug: 'basics',
  type: 'lesson',
  skills: [],
  params: {
    languages: ['en', 'uk'],
    quizRequiredForCompletion: false,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  locale: { title: { en: 'Basics', uk: 'Основи' } },
  section: { items: { introduction: section() }, order: ['introduction'] },
});
const renderContentBlock = (child: { slug: string }, o: { directory: string }) => ({
  exportName: child.slug,
  files: [{ path: o.directory + '/index.ts', kind: 'typescript' as const, content: '// Owned ContentBlock\n' }],
  diagnostics: [],
});
const renderSection = (
  child: Parameters<typeof materializeContentSection>[0],
  o: Parameters<typeof materializeContentSection>[1],
) => materializeContentSection(child, { ...o, renderContentBlock });
test('Lesson source retains immutable ID, order and source-only active languages', () => {
  const options = {
    documentLanguage: 'en',
    renderSection: (
      child: Parameters<typeof materializeLesson>[1]['renderSection'] extends (arg: infer C, opts: infer O) => unknown
        ? C
        : never,
      o: Parameters<typeof materializeLesson>[1]['renderSection'] extends (arg: infer C, opts: infer O) => unknown
        ? O
        : never,
    ) => renderSection(child as ContentSource, o as Parameters<typeof materializeContentSection>[1]),
  };
  const first = materializeLesson(lesson() as Parameters<typeof materializeLesson>[0], options);
  assert.deepEqual(materializeLesson(lesson() as Parameters<typeof materializeLesson>[0], options), first);
  const root = first.files.at(-1)?.content ?? '';
  const parsed = ts.transpileModule(root, {
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  assert.equal(
    parsed.diagnostics?.filter(issue => issue.category === ts.DiagnosticCategory.Error).length ?? 0,
    0,
    'generated TS must parse without errors',
  );
  assert.match(root, /defineLesson<"basics", Languages, typeof section.items>/);
  assert.match(root, /"order": \["introduction"\]/);
  assert.match(root, new RegExp(id('01')));
  assert.match(root, /"en": "Basics"/);
  assert.doesNotMatch(root, /"uk": "Основи"/);
  assert.equal(first.files.find(f => f.path === 'sections/introduction/index.ts')?.kind, 'typescript');
  const constants = first.files.find(f => f.path === 'constants.ts')?.content ?? '';
  assert.match(constants, /TODO \(BLOCKER\): Restore reviewed Lesson languages/);
  assert.match(constants, /export type Languages = typeof languages;/);
  assert.match(constants, /\/\/   "en",/);
  assert.match(constants, /\/\/   "uk",/);
  assert.doesNotMatch(constants, /\/\/   "ar",/);
  assert.doesNotMatch(constants, /\/\/   "zh",/);
  assert.match(constants, /export const languages = \["en"\] as const/);
  assert.doesNotMatch(first.files.map(f => f.path).join(' '), /languages\.ts|^specification\.md/);
});
test('Section subtree has parent-owned Lesson and Episode language imports', () => {
  const episodeAlias = '#episodesData/1/exampleEpisode/constants';
  const lessonAlias = '#lessonsData/1/' + id('01') + '/constants';
  const fromEpisode = renderSection(section() as ContentSource, {
    directory: 'sections/introduction',
    documentLanguage: 'en',
    languagesImport: episodeAlias,
    renderContentBlock,
  });
  const fromLesson = materializeLesson(lesson() as Parameters<typeof materializeLesson>[0], {
    documentLanguage: 'en',
    renderSection: (child, opts) => {
      assert.equal(opts.languagesImport, lessonAlias);
      return renderSection(child as ContentSource, { ...opts, renderContentBlock });
    },
  });
  const sub = fromLesson.files.filter(f => f.path.startsWith('sections/introduction/'));
  assert.match(sub.find(f => f.path.endsWith('/index.ts'))?.content ?? '', /#lessonsData/);
  assert.match(fromEpisode.files.find(f => f.path.endsWith('/index.ts'))?.content ?? '', /#episodesData/);
  const normalize = (files: typeof sub) =>
    files.map(file => ({
      ...file,
      content: file.content.replaceAll(lessonAlias, '<owner>/constants').replaceAll(episodeAlias, '<owner>/constants'),
    }));
  assert.deepEqual(normalize(sub), normalize(fromEpisode.files));
});
test('Missing enabled Quiz refuses complete Lesson emission before delegating child files', () => {
  const l = lesson();
  l.params.quizRequiredForCompletion = true;
  let called = 0;
  assert.throws(
    () =>
      materializeLesson(l as Parameters<typeof materializeLesson>[0], {
        documentLanguage: 'en',
        renderSection: () => {
          called++;
          throw Error('not reached');
        },
      }),
    /TODO \(BLOCKER\).*enabled Quiz Section/,
  );
  assert.equal(called, 0, 'fail closed before producing even child source');
});
test('Rejects duplicate order, mismatched Section slug and unsafe paths', () => {
  const l = lesson();
  l.section.order = [];
  assert.throws(
    () =>
      materializeLesson(l as Parameters<typeof materializeLesson>[0], {
        documentLanguage: 'en',
        renderSection: () => {
          throw Error('never');
        },
      }),
    /order/,
  );
  const x = lesson();
  x.section.items.introduction.slug = 'bad';
  assert.throws(
    () =>
      materializeLesson(x as Parameters<typeof materializeLesson>[0], {
        documentLanguage: 'en',
        renderSection: () => {
          throw Error('never');
        },
      }),
    /invalid Section/,
  );
});

test('Lesson audience age/grade ranges remain Config params, without source mutation', () => {
  const original = lesson();
  const config = { ...original, params: { ...original.params, age: { min: 6, max: 10 }, grade: { min: 1, max: 4 } } };
  const result = materializeLesson(config as Parameters<typeof materializeLesson>[0], {
    documentLanguage: 'en',
    renderSection: (child, opts) => renderSection(child as ContentSource, { ...opts, renderContentBlock }),
  });
  const root = result.files.at(-1)?.content ?? '';
  assert.match(root, /"age": \{\s*"min": 6,\s*"max": 10/);
  assert.match(root, /"grade": \{\s*"min": 1,\s*"max": 4/);
  assert.deepEqual(config.params.age, { min: 6, max: 10 });
});

test('Course Stage 3 slots and built override references cannot be materialized as Lesson source', () => {
  const noChild = () => {
    throw new Error('Unexpected child materialization');
  };
  assert.throws(
    () =>
      materializeLesson(
        { type: 'lesson', slug: 'newPlan', skills: [] } as unknown as Parameters<typeof materializeLesson>[0],
        {
          documentLanguage: 'en',
          renderSection: noChild,
        },
      ),
    /complete standalone Lesson Config/,
  );
  assert.throws(
    () =>
      materializeLesson(
        { id: id('01'), base: {}, locale: undefined } as unknown as Parameters<typeof materializeLesson>[0],
        {
          documentLanguage: 'en',
          renderSection: noChild,
        },
      ),
    /complete standalone Lesson Config/,
  );
});

test('Course Stage 5 LessonWorkflowStage1 handoff never becomes full Lesson materialization', () => {
  const assessment = {
    questionBankRequired: true,
    flashcardBankRequired: true,
    quizSectionRequired: true,
    flashcardsSectionRequired: true,
  };
  const handoff = {
    config: { id: id('77'), slug: 'planned', type: 'lesson', skills: [id('88')], locale: { title: 'Planned Lesson' } },
    production: { methodology: 'Approved scope', assessment },
  };
  let delegated = 0;
  const options = {
    documentLanguage: 'en',
    renderSection: () => {
      delegated++;
      throw Error('must not delegate');
    },
  };
  // Stage 5 emits a typed {config, production} authoring object, not a Configurator.
  assert.throws(
    () => materializeLesson(handoff as unknown as Parameters<typeof materializeLesson>[0], options),
    /complete standalone Lesson Config/,
  );
  // Even feeding its inner Config is invalid: it has neither languages nor Sections.
  assert.throws(
    () => materializeLesson(handoff.config as unknown as Parameters<typeof materializeLesson>[0], options),
    /lesson\.params\.languages/,
  );
  // Adding publication languages early does not authorize manufacturing Sections.
  assert.throws(
    () =>
      materializeLesson(
        { ...handoff.config, params: { languages: ['en'], quizRequiredForCompletion: true } } as unknown as Parameters<
          typeof materializeLesson
        >[0],
        options,
      ),
    /lesson\.section/,
  );
  assert.equal(delegated, 0, 'no Content, Quiz or Flashcards source was generated from Stage 1');
});

test('Independent Lesson materialization uses exact editorial Section decisions, not bank flags', () => {
  const cases = [
    {
      name: 'none',
      assessment: {
        questionBankRequired: false,
        flashcardBankRequired: false,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
      quiz: false,
      flashcards: false,
    },
    {
      name: 'question bank only',
      assessment: {
        questionBankRequired: true,
        flashcardBankRequired: false,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
      quiz: false,
      flashcards: false,
    },
    {
      name: 'quiz required by completion',
      assessment: {
        questionBankRequired: false,
        flashcardBankRequired: false,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
      completion: true,
      quiz: true,
      flashcards: false,
    },
    {
      name: 'quiz Section only',
      assessment: {
        questionBankRequired: false,
        flashcardBankRequired: false,
        quizSectionRequired: true,
        flashcardsSectionRequired: false,
      },
      quiz: true,
      flashcards: false,
    },
    {
      name: 'Flashcards Section only',
      assessment: {
        questionBankRequired: false,
        flashcardBankRequired: false,
        quizSectionRequired: false,
        flashcardsSectionRequired: true,
      },
      quiz: false,
      flashcards: true,
    },
    {
      name: 'both Sections',
      assessment: {
        questionBankRequired: true,
        flashcardBankRequired: true,
        quizSectionRequired: true,
        flashcardsSectionRequired: true,
      },
      quiz: true,
      flashcards: true,
    },
    {
      name: 'both banks without Sections',
      assessment: {
        questionBankRequired: true,
        flashcardBankRequired: true,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
      quiz: false,
      flashcards: false,
    },
  ] as const;
  for (const scenario of cases) {
    const config = lesson();
    if ('completion' in scenario && scenario.completion) config.params.quizRequiredForCompletion = true;
    let delegated = 0;
    const options = {
      documentLanguage: 'en',
      production: { assessment: scenario.assessment },
      renderSection: (
        child: Parameters<Parameters<typeof materializeLesson>[1]['renderSection']>[0],
        opts: Parameters<Parameters<typeof materializeLesson>[1]['renderSection']>[1],
      ) => {
        delegated++;
        return renderSection(child as ContentSource, { ...opts, renderContentBlock });
      },
    };
    if (scenario.quiz || scenario.flashcards) {
      const required = scenario.quiz ? /enabled Quiz Section/ : /enabled Flashcards Section/;
      assert.throws(
        () => materializeLesson(config as Parameters<typeof materializeLesson>[0], options),
        required,
        scenario.name + ' must fail closed until its required Section is authored',
      );
      assert.equal(delegated, 0, scenario.name + ' must not emit partial final source');
    } else {
      const produced = materializeLesson(config as Parameters<typeof materializeLesson>[0], options);
      const root = produced.files.find(f => f.path === 'index.ts')?.content ?? '';
      assert.equal(
        produced.files.filter(f => f.path.startsWith('sections/')).length,
        2,
        scenario.name + ' only the authored Content Section and child block were materialized',
      );
      assert.doesNotMatch(
        root,
        /feedc0de-|Not implemented/,
        scenario.name + ' must not invent bank IDs or Section placeholders',
      );
      assert.equal(/"quizRequiredForCompletion": true/.test(root), false);
      assert.doesNotMatch(
        root,
        /"questionBankRequired"|"flashcardBankRequired"|"quizSectionRequired"|"flashcardsSectionRequired"/,
        scenario.name + ' production decisions must not enter Config',
      );
    }
  }
});

test('Disabled Quiz/Flashcards do not satisfy mandatory enabled-Section requirements', () => {
  const l = lesson();
  const disabledQuiz = { id: id('12'), slug: 'pendingQuiz', type: 'quiz', params: { disabled: true } };
  const disabledFlashcards = { id: id('13'), slug: 'pendingCards', type: 'flashcards', params: { disabled: true } };
  const input = {
    ...l,
    section: {
      items: { ...l.section.items, pendingQuiz: disabledQuiz, pendingCards: disabledFlashcards },
      order: ['introduction', 'pendingQuiz', 'pendingCards'],
    },
  };
  const noDelegate = () => {
    throw Error('must not emit incomplete Section');
  };
  input.params.quizRequiredForCompletion = true;
  assert.throws(
    () =>
      materializeLesson(input as unknown as Parameters<typeof materializeLesson>[0], {
        documentLanguage: 'en',
        renderSection: noDelegate,
      }),
    /enabled Quiz Section/,
  );
  input.params.quizRequiredForCompletion = false;
  assert.throws(
    () =>
      materializeLesson(input as unknown as Parameters<typeof materializeLesson>[0], {
        documentLanguage: 'en',
        production: {
          assessment: {
            questionBankRequired: false,
            flashcardBankRequired: false,
            quizSectionRequired: false,
            flashcardsSectionRequired: true,
          },
        },
        renderSection: noDelegate,
      }),
    /enabled Flashcards Section/,
  );
});

test('Lesson emits package-scoped imported Skill Configurators without textbook tables', () => {
  const input = {
    ...lesson(),
    skills: ['00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000004'],
  };
  const result = materializeLesson(input as Parameters<typeof materializeLesson>[0], {
    documentLanguage: 'en',
    skillReferences: [
      {
        id: '00000000-0000-4000-8000-000000000001',
        path: '#skillsData/testColors/testWarmColors/testRecognizeRed',
        exported: 'testRecognizeRed',
      },
      {
        id: '00000000-0000-4000-8000-000000000004',
        path: '#skillsData/testColors/testCoolColors/testRecognizeBlue',
        exported: 'testRecognizeBlue',
      },
    ],
    renderSection: (child, opts) => renderSection(child as ContentSource, { ...opts, renderContentBlock }),
  });
  const root = result.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(
    root,
    /import \{ testRecognizeRed as skill_ref_0 \} from "#skillsData\/testColors\/testWarmColors\/testRecognizeRed"/,
  );
  assert.match(
    root,
    /import \{ testRecognizeBlue as skill_ref_1 \} from "#skillsData\/testColors\/testCoolColors\/testRecognizeBlue"/,
  );
  assert.match(root, /"skills": \[skill_ref_0\.id, skill_ref_1\.id\]/);
  assert.doesNotMatch(root, /"00000000-0000-4000-8000-000000000001"/);
  assert.doesNotMatch(root, /TODO \(BLOCKER\): Verify Skill/);
  const unknown = materializeLesson(
    {
      ...lesson(),
      skills: [id('66')],
    } as Parameters<typeof materializeLesson>[0],
    {
      documentLanguage: 'en',
      renderSection: (child, opts) => renderSection(child as ContentSource, { ...opts, renderContentBlock }),
    },
  );
  assert(
    unknown.diagnostics.some(
      item => item.code === 'pending-lesson' && item.message.includes('Import the actual Skill'),
    ),
  );
  assert.throws(() => assertLessonSourceReleaseReady(unknown), /unresolved materializer diagnostics/);
});

test('Lesson refuses cross-textbook Skill alias or mismatched UUID', () => {
  const input = { ...lesson(), skills: [id('66')] };
  const options: Parameters<typeof materializeLesson>[1] = {
    documentLanguage: 'en',
    renderSection: (child, opts) => renderSection(child as ContentSource, { ...opts, renderContentBlock }),
  };
  assert.throws(
    () =>
      materializeLesson(input as Parameters<typeof materializeLesson>[0], {
        ...options,
        skillReferences: [{ id: id('66'), path: '../../content/math/data/skills/foreign', exported: 'foreign' }],
      }),
    /cross-textbook Skill import/,
  );
  assert.throws(
    () =>
      materializeLesson(input as Parameters<typeof materializeLesson>[0], {
        ...options,
        skillReferences: [{ id: id('67'), path: '#skillsData/geometry/figures/known', exported: 'known' }],
      }),
    /cross-textbook Skill import/,
  );
});

test('Lesson methodology preserves reviewed #813 exploreColors, recallColors and checkColors notes', () => {
  const base = lesson();
  const input = {
    ...base,
    section: {
      items: {
        exploreColors: {
          config: { ...section(), slug: 'exploreColors' },
          production: {
            purpose: 'Guided exploration and formative reflection without graded evidence.',
            pedagogicalIntent: 'Compare without positional cues.',
            specification: 'Use the two reviewed examples.',
          },
        },
        recallColors: {
          config: { ...section(), id: id('55'), slug: 'recallColors' },
          production: {
            purpose: 'Required independent Flashcard Bank selection will be integrated in Stage 8.',
            pedagogicalIntent: 'Retrieval (canonical slug retrieval) practice for both approved color terms.',
          },
        },
        checkColors: {
          config: { ...section(), id: id('56'), slug: 'checkColors' },
          production: {
            purpose:
              'Required independent Question Bank selection and assessment settings will be integrated in Stage 7; no invented Question IDs or grading.',
            pedagogicalIntent:
              'Classification (canonical slug classification): obtain distinct evidence for both Skills.',
          },
        },
      },
      order: ['exploreColors', 'recallColors', 'checkColors'],
    },
  };
  const result = materializeLesson(input as Parameters<typeof materializeLesson>[0], {
    documentLanguage: 'en',
    production: {
      methodology: '# Reviewed methodology\n\nPedagogical plan.',
      objective: 'Distinguish two colors.',
      depth: 'Introductory classification.',
      sequenceReason: 'Learn, retrieve, then assess.',
      assessmentEvidence: 'Identify unlabeled examples.',
      sourceEvidence: 'PRIVATE SOURCE EVIDENCE MUST NOT BE EMITTED',
      assessment: {
        questionBankRequired: true,
        flashcardBankRequired: true,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
    },
    renderSection: (child, opts) => {
      assert.equal(opts.production?.methodologyIntegrated, true, child.slug + ' must be acknowledged after transfer');
      return renderSection(child as ContentSource, { ...opts, renderContentBlock });
    },
  });
  const methodology = result.files.find(f => f.path === 'methodology.md')?.content ?? '';
  for (const phrase of [
    'Pedagogical plan.',
    'Distinguish two colors.',
    'Introductory classification.',
    'Learn, retrieve, then assess.',
    'Identify unlabeled examples.',
    'Section: exploreColors',
    'Section: recallColors',
    'Section: checkColors',
    'Guided exploration and formative reflection',
    'Compare without positional cues.',
    'Required independent Flashcard Bank selection',
    'Required independent Question Bank selection',
    'Retrieval (canonical slug retrieval)',
    'Classification (canonical slug classification)',
    'Question Bank (Stage 7): required',
    'Flashcard Bank (Stage 8): required',
  ])
    assert(methodology.includes(phrase), phrase);
  assert.doesNotMatch(methodology, /PRIVATE SOURCE EVIDENCE/);
  assert(!result.files.some(file => file.path === 'specification.md'));
  const root = result.files.find(f => f.path === 'index.ts')?.content ?? '';
  assert.match(root, /Stage 7.*Question Bank/);
  assert.match(root, /Stage 8.*Flashcard Bank/);
  assert(result.diagnostics.some(item => item.code === 'pending-questions' && item.message.includes('Stage 7')));
  assert(result.diagnostics.some(item => item.code === 'pending-flashcard-bank' && item.message.includes('Stage 8')));
  assert(!result.diagnostics.some(item => item.code === 'pending-lesson' && item.message.includes('Stage 7')));
  assert.doesNotMatch(root, /Resolve pending Quiz\/Flashcards/);
});

test('No required banks or pending Sections means no Stage 7/8 root blockers', () => {
  const result = materializeLesson(lesson() as Parameters<typeof materializeLesson>[0], {
    documentLanguage: 'en',
    production: {
      assessment: {
        questionBankRequired: false,
        flashcardBankRequired: false,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
    },
    renderSection: (child, opts) => renderSection(child as ContentSource, { ...opts, renderContentBlock }),
  });
  const root = result.files.find(f => f.path === 'index.ts')?.content ?? '';
  assert.doesNotMatch(root, /Stage 7|Stage 8/);
  assert(!result.diagnostics.some(item => ['pending-questions', 'pending-flashcard-bank'].includes(item.code)));
});

test('Lesson does not acknowledge Section notes omitted from methodology', () => {
  const l = lesson();
  const input = {
    ...l,
    section: {
      items: {
        introduction: {
          config: section(),
          production: { purpose: 'Source purpose', sourceEvidence: 'Excluded provenance' },
        },
      },
      order: ['introduction'],
    },
  };
  let acknowledged: unknown;
  const output = materializeLesson(input as Parameters<typeof materializeLesson>[0], {
    documentLanguage: 'en',
    renderSection: (child, opts) => {
      acknowledged = opts.production?.methodologyIntegrated;
      return renderSection(child as ContentSource, { ...opts, renderContentBlock });
    },
  });
  assert.equal(acknowledged, undefined);
  assert.equal(
    (input.section.items.introduction.production as Record<string, unknown>).methodologyIntegrated,
    undefined,
  );
  const markdown = output.files.find(f => f.path === 'methodology.md')?.content ?? '';
  assert.match(markdown, /Source purpose/);
  assert.doesNotMatch(markdown, /Excluded provenance/);
});

test('Lesson input Section production is immutable after successful handoff', () => {
  const l = lesson();
  const input = {
    ...l,
    section: {
      items: {
        introduction: {
          config: section(),
          production: { purpose: 'Reviewed purpose', pedagogicalIntent: 'Distinct review intent' },
        },
      },
      order: ['introduction'],
    },
  };
  const original = structuredClone(input);
  let handedOff = false;
  const output = materializeLesson(input as Parameters<typeof materializeLesson>[0], {
    documentLanguage: 'en',
    renderSection: (child, opts) => {
      handedOff = opts.production?.methodologyIntegrated === true;
      return renderSection(child as ContentSource, { ...opts, renderContentBlock });
    },
  });
  assert(handedOff);
  assert.deepEqual(input, original);
  assert.match(output.files.find(f => f.path === 'methodology.md')?.content ?? '', /Distinct review intent/);
});
