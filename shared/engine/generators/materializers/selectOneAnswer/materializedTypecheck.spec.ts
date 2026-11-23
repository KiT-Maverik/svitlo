import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

import { materializeSelectOneAnswer } from './materializeSelectOneAnswer';
import { materializeFlashcard } from '../flashcard/materializeFlashcard';

const uuid = (number: number): string => 'b775647f-203d-481a-a1c7-4d331c' + String(number).padStart(6, '0');

const textBlock = (slug: string, number: number) => ({
  config: {
    id: uuid(number),
    slug,
    type: 'text',
    params: {},
    locale: { value: { uk: 'Reviewed text' } },
  },
});

const collection = <T>(items: Record<string, T>) => ({
  items,
  order: Object.keys(items),
});

/** Use actual defineText imports: dummy objects cannot demonstrate generic compatibility. */
function materializeRealText(node: { config: { id: string; slug: string } }, options: { directory: string }) {
  const { id, slug } = node.config;
  return {
    exportName: slug,
    files: [
      {
        kind: 'typescript' as const,
        path: options.directory + '/index.ts',
        content: [
          "import { defineText } from '@svitlo/engine/build';",
          'export const ' + slug + ' = defineText<' + JSON.stringify(slug) + ', ["uk"]>({',
          '  id: ' + JSON.stringify(id) + ',',
          '  slug: ' + JSON.stringify(slug) + ',',
          '  type: "text",',
          '  params: {},',
          '  locale: { value: { uk: "Reviewed text" } },',
          '});',
          '',
        ].join('\n'),
      },
    ],
  };
}

const languages = { document: 'uk' as const, planned: ['uk'] as const };

test('materialized Question + Flashcard + Side modules typecheck against real Engine contracts', () => {
  const question = materializeSelectOneAnswer(
    {
      config: {
        id: uuid(1),
        slug: 'sampleQuestion',
        type: 'selectOneAnswer',
        params: { assessmentMethod: 'retrieval', restrictions: [] },
        locale: {},
        content: {
          question: collection({ prompt: textBlock('prompt', 2) }),
          answers: {
            correct: collection({ yes: textBlock('yes', 3) }),
            incorrect: collection({ no: textBlock('no', 4) }),
            distractors: collection({}),
          },
        },
      },
    } as never,
    {
      directory: 'questions/selectOneAnswer',
      languages,
      materializeBlock: materializeRealText,
    },
  );

  const flashcard = materializeFlashcard(
    {
      config: {
        id: uuid(10),
        slug: 'sampleCard',
        parameters: {
          tags: ['mathematics'],
          flags: [{ type: 'acronym', value: { uk: 'ABC' } }],
          relationships: {
            items: {
              reverse: {
                relationshipId: 'reverseConnection',
                type: 'reverse',
                position: 'peer',
                relatedFlashcardId: uuid(11),
              },
            },
            order: ['reverse'],
          },
        },
        content: {
          front: collection({ frontText: textBlock('frontText', 5) }),
          back: collection({ backText: textBlock('backText', 6) }),
          hint: collection({ hintText: textBlock('hintText', 7) }),
        },
      },
    } as never,
    {
      directory: 'flashcards',
      languages,
      materializeBlock: materializeRealText,
    },
  );

  const generated = [...question.files, ...flashcard.files];
  const engineRoot = process.cwd();
  const tempParent = path.join(engineRoot, 'temp');
  mkdirSync(tempParent, { recursive: true });
  const tempRoot = mkdtempSync(path.join(tempParent, 'assessment-source-typecheck-'));

  try {
    for (const file of generated) {
      const absolutePath = path.join(tempRoot, file.path);
      mkdirSync(path.dirname(absolutePath), { recursive: true });
      writeFileSync(absolutePath, file.content, 'utf8');
    }

    const configPath = path.join(engineRoot, 'tsconfig.json');
    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    assert.equal(config.error, undefined, 'Engine tsconfig must be readable');
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, engineRoot);
    assert.deepEqual(parsed.errors, [], 'Engine tsconfig must parse');

    const options: ts.CompilerOptions = {
      ...parsed.options,
      noEmit: true,
      paths: {
        ...parsed.options.paths,
        '@svitlo/engine/build': ['build.ts'],
      },
    };
    const roots = generated.filter(file => file.kind === 'typescript').map(file => path.join(tempRoot, file.path));
    const program = ts.createProgram(roots, options);
    const diagnostics = ts
      .getPreEmitDiagnostics(program)
      .filter(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error);
    const report = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: value => value,
      getCurrentDirectory: () => engineRoot,
      getNewLine: () => '\n',
    });
    assert.equal(diagnostics.length, 0, report);
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});
