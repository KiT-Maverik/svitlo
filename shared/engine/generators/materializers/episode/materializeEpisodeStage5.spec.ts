import assert from 'node:assert/strict';
import test from 'node:test';

import ts from 'typescript';

import type { EpisodeWorkflowStage2 } from '../../../types/workflow/episodeWorkflow.types';
import { materializeEpisodeStage5 } from './materializeEpisodeStage5';

const id = (suffix: string) => 'e1100000-0000-4000-8000-0000000000' + suffix;
const source = {
  sourcePath: 'content/playground/data/courses/1/' + id('01') + '/transition/draft.ts',
  sourceBlobSha: 'a'.repeat(40),
  sourceCommitSha: 'b'.repeat(40),
};
const reviewed = (): EpisodeWorkflowStage2 =>
  ({
    config: {
      type: 'episode',
      id: id('02'),
      slug: 'transition',
      locale: { title: { uk: 'Перехід' } },
      section: {
        items: {
          introduction: {
            config: {
              id: id('03'),
              type: 'content',
              slug: 'introduction',
              params: {},
              locale: { title: { uk: 'Початок' }, navigationLabel: { uk: 'Початок' } },
              content: {
                items: {
                  greeting: {
                    config: {
                      id: id('04'),
                      type: 'text',
                      slug: 'greeting',
                      params: {},
                      locale: { value: { uk: 'Привіт' } },
                    },
                  },
                },
                order: ['greeting'],
              },
            },
          },
        },
        order: ['introduction'],
      },
    },
    production: {
      focus: 'Introduce the story',
      purpose: 'Narrative transition',
      languages: { document: 'uk', planned: ['uk', 'en'] },
      scenario: {
        audience: 'Novices',
        entrySituation: 'Beginning',
        exitSituation: 'Understanding',
        continuity: 'Next episode',
        sceneIntent: 'Present context',
        interactionIntent: 'Read and reflect',
        accessibility: 'Equivalent text',
        narrativeConstraints: 'No assessment',
      },
      specification: 'Reviewed narrative',
    },
  }) as EpisodeWorkflowStage2;

test('Episode Stage 5 owns one typed constants module and nested descendants use its alias', () => {
  const plan = materializeEpisodeStage5(reviewed(), { source });
  const target = 'transition/';
  const file = (path: string) => plan.files.find(item => item.path === target + path)?.content;
  // The owning Course root supplies the *only* language tuple; an Episode must
  // not emit its own constants.ts or languages.ts once restored into that Course.
  assert(!plan.files.some(item => item.path === target + 'constants.ts' || item.path === target + 'languages.ts'));
  const courseLanguageImport = '#coursesData/1/' + id('01') + '/constants';
  const root = file('index.ts') ?? '';
  assert(root.includes('import { languages } from ' + JSON.stringify(courseLanguageImport)));
  assert.doesNotMatch(root, /const languages =/);
  assert.doesNotMatch(root, /SupportedLanguages/);
  assert.match(root, /Episode media generation at Stage 9/);
  assert.match(root, /human QA acceptance for Episode Stage 10/);
  const section = file('sections/introduction/index.ts') ?? '';
  assert.match(section, /#coursesData\/1\/e1100000-0000-4000-8000-000000000001\/constants/);
  assert.equal(plan.publishable, false);
  assert.deepEqual(plan, materializeEpisodeStage5(reviewed(), { source }));
  for (const entry of plan.files.filter(file => file.kind === 'typescript')) {
    const parsed = ts.createSourceFile(entry.path, entry.content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const syntaxDiagnostics = (parsed as ts.SourceFile & { parseDiagnostics?: readonly ts.Diagnostic[] })
      .parseDiagnostics;
    assert.equal(syntaxDiagnostics?.length ?? 0, 0, 'Invalid generated TS: ' + entry.path);
  }
});

test('Episode rejects source-language gaps before it emits a false language module', () => {
  const missing = reviewed();
  missing.production.languages.planned = ['en'];
  assert.throws(() => materializeEpisodeStage5(missing, { source }), /Invalid reviewed Episode input/);
});
