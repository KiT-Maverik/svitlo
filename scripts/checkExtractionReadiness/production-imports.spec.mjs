import assert from 'node:assert/strict';
import { test } from 'node:test';
import { importedModules } from './production-imports.mjs';

test('ignore quoted prose and comments that resemble imports', () => {
  const source = `
    const description = "Separate 'which position?' from 'how many?' without confusion.";
    const another = 'the word from \\'fake-package\\' is not a module';
    // import('comment-only-package')
    /* export { x } from 'comment-only-export'; */
    const escaped = "require('quoted-only')";
    export const x = 1;
  `;
  assert.deepEqual(importedModules(source, 'ordinal.data.ts'), []);
});

test('detect real imports and re-exports, including multiline and type-only forms', () => {
  const source = `
    import {
      skill
    } from '@svitlo/engine/build';
    import './side-effect';
    import type { Skill_Props } from '@svitlo/engine/runtime';
    export { helper } from './helper';
    import local = require('legacy-module');
    type Lazy = import('type-only-module').Something;
    const promise = import('./dynamic-module');
    const required = require('required-package');
    const nonstatic = import(variableName);
  `;
  assert.deepEqual(
    importedModules(source, 'example.ts').sort(),
    [
      '@svitlo/engine/build',
      './side-effect',
      '@svitlo/engine/runtime',
      './helper',
      'legacy-module',
      'type-only-module',
      './dynamic-module',
      'required-package',
    ].sort(),
  );
});

test('parse TSX without mistaking JSX content for module declarations', () => {
  const code = `
    import React from 'react';
    const view = <div>Which option is from 'how many?'</div>;
    export default view;
  `;
  assert.deepEqual(importedModules(code, 'component.tsx'), ['react']);
});
