import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { test } from 'node:test';

import ts from 'typescript';

import type { ContentBlock_Text_Config } from '../../../configurators/contentBlocks/primitive/defineText/defineText.schemas';
import { materializeCheckpointAnswer } from '../checkpointAnswer/materializeCheckpointAnswer';
import { materializeCheckpointItem } from '../checkpointItem/materializeCheckpointItem';
import { materializeScene } from '../scene/materializeScene';
import { materializeCheckpoint } from './materializeCheckpoint';

/**
 * Full semantic compilation fixture, not just a TypeScript syntax parse.
 *
 * Resolve @svitlo/engine/build to the actual Engine source entrypoint, so the
 * emitted define* calls are checked against real Configurator generics and
 * nested child language constraints. The fixture intentionally remains in this
 * materializer's own folder; no shared dispatcher or writer is introduced.
 */
const id = (n: number): string => '50000000-0000-4000-8000-' + String(n).padStart(12, '0');

function engineRoot(): string {
  for (let candidate = process.cwd(); ; candidate = path.dirname(candidate)) {
    if (fs.existsSync(path.join(candidate, 'build.ts')) && fs.existsSync(path.join(candidate, 'tsconfig.json')))
      return candidate;
    if (candidate === path.dirname(candidate)) break;
  }
  for (let candidate = __dirname; ; candidate = path.dirname(candidate)) {
    if (fs.existsSync(path.join(candidate, 'build.ts')) && fs.existsSync(path.join(candidate, 'tsconfig.json')))
      return candidate;
    if (candidate === path.dirname(candidate)) break;
  }
  throw new Error('Could not locate the actual @svitlo/engine source root');
}

const languageImport = (dir: string): string => {
  const specifier = path.posix.relative(dir || '.', 'languages');
  return specifier.startsWith('.') ? specifier : './' + specifier;
};

function renderText(config: ContentBlock_Text_Config, directory: string) {
  const code = [
    "import { defineText } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(languageImport(directory)) + ';',
    'export const ' +
      config.slug +
      ' = defineText<' +
      JSON.stringify(config.slug) +
      ', typeof languages>(' +
      JSON.stringify(config, null, 2) +
      ');',
    '',
  ].join('\n');
  return {
    exportName: config.slug,
    files: [{ path: directory + '/index.ts', content: code, kind: 'typescript' as const }],
    diagnostics: [],
  };
}

test('emitted Checkpoint → Item → Answer → Scene modules typecheck against the real Engine build API', () => {
  const scene = {
    id: id(6),
    slug: 'interactive',
    type: 'scene' as const,
    params: {},
    locale: { value: { uk: 'Reviewed interactive prompt' } },
  };
  const question = {
    id: id(3),
    slug: 'question',
    type: 'text' as const,
    params: {},
    locale: { value: { uk: 'Перевірте відповідь' } },
  };
  const explanation = {
    id: id(7),
    slug: 'explanation',
    type: 'text' as const,
    params: {},
    locale: { value: { uk: 'Пояснення' } },
  };
  const answer = {
    id: id(4),
    slug: 'answer',
    type: 'checkpointAnswer' as const,
    content: { items: { interactive: scene, explanation }, order: ['interactive', 'explanation'] },
  };
  const item = {
    id: id(2),
    slug: 'first',
    type: 'checkpointItem' as const,
    check: true as const,
    question,
    answer,
  };
  const checkpoint = {
    id: id(1),
    slug: 'review',
    type: 'checkpoint' as const,
    params: {},
    locale: { title: { uk: 'Підсумок' } },
    content: { items: { first: item }, order: ['first'] },
  };

  const result = materializeCheckpoint(checkpoint, {
    directory: 'sections/review',
    documentLanguage: 'uk',
    languagesImport: languageImport('sections/review'),
    renderItem: (part, dir) =>
      materializeCheckpointItem(part, {
        directory: dir,
        documentLanguage: 'uk',
        languagesImport: languageImport(dir),
        renderQuestion: renderText,
        renderAnswer: (answerConfig, answerDir) =>
          materializeCheckpointAnswer(answerConfig, {
            directory: answerDir,
            documentLanguage: 'uk',
            languagesImport: languageImport(answerDir),
            renderChild: (block, blockDir) => {
              if (block.type === 'text') return renderText(block, blockDir);
              if (block.type !== 'scene') throw new Error('Unexpected answer child kind: ' + block.type);
              return materializeScene(block, {
                directory: blockDir,
                documentLanguage: 'uk',
                languagesImport: languageImport(blockDir),
                registered: true,
                production: { specification: '# Reviewed interactive specification\n' },
              });
            },
          }),
      }),
  });

  const generated = result.files.filter(file => file.kind === 'typescript');
  assert.equal(generated.length, 6, 'each nested Configurator has its own source module');
  assert.deepEqual(
    result.diagnostics.map(diagnostic => diagnostic.code),
    ['pending-temporary-specification'],
    'registered Scene needs only its temporary specification cleanup',
  );
  assert.ok(!result.files.some(file => file.path.endsWith('specification.md')));
  const sceneSource = result.files.find(file => file.path.endsWith('/interactive/index.ts'));
  assert.ok(sceneSource, 'nested Scene source must exist');
  assert.match(sceneSource.content, /# Reviewed interactive specification/);
  assert.match(sceneSource.content, /TODO \(BLOCKER\): Remove the temporary Scene specification/);
  assert.equal(new Set(result.files.map(file => file.path)).size, result.files.length);

  const engine = engineRoot();
  const tempRoot = fs.mkdtempSync(path.join(engine, '.composite-source-typecheck-'));
  try {
    const files = [
      ...generated,
      {
        path: 'languages.ts',
        content: "export const languages = ['uk'] as const;\n",
      },
    ];
    for (const file of files) {
      const dest = path.join(tempRoot, file.path);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, file.content);
    }

    const configPath = path.join(engine, 'tsconfig.json');
    const read = ts.readConfigFile(configPath, ts.sys.readFile);
    if (read.error) throw new Error(ts.flattenDiagnosticMessageText(read.error.messageText, '\\n'));
    const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, engine);
    assert.equal(parsed.errors.length, 0, 'Engine tsconfig must be parseable');
    const options: ts.CompilerOptions = {
      ...parsed.options,
      noEmit: true,
      baseUrl: engine,
      paths: { ...parsed.options.paths, '@svitlo/engine/build': ['build.ts'] },
    };
    const entrypoints = files.map(file => path.join(tempRoot, file.path));
    const program = ts.createProgram(entrypoints, options);
    const diagnostics = ts.getPreEmitDiagnostics(program).filter(d => d.category === ts.DiagnosticCategory.Error);
    const errors = diagnostics.map(
      d =>
        (d.file
          ? path.relative(engine, d.file.fileName) +
            ':' +
            (d.start === undefined ? '?' : d.file.getLineAndCharacterOfPosition(d.start).line + 1) +
            ': '
          : '') + ts.flattenDiagnosticMessageText(d.messageText, '\n'),
    );
    assert.deepEqual(errors, [], 'generated Configurator modules must typecheck against real @svitlo/engine/build');
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
