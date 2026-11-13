import assert from 'node:assert/strict';
import test from 'node:test';
import { rewriteEngineEntrypoints } from './migrate-engine-entrypoints.mjs';

test('migrates Skill leaf definitions without changing authored data',()=>{
  const source="import { defineSkill } from '@svitlo/engine';\nexport const data={value:'@svitlo/engine'};";
  assert.equal(rewriteEngineEntrypoints(source,'content/art/data/skills/group/skill.data.ts'),
    "import { defineSkill } from '@svitlo/engine/build';\nexport const data={value:'@svitlo/engine'};");
});
test('migrates Skill domains and groups to build',()=>{
  assert.equal(rewriteEngineEntrypoints("import { defineSkillDomain } from '@svitlo/engine';",'content/art/data/skills/domain.data.ts'),
    "import { defineSkillDomain } from '@svitlo/engine/build';");
});
test('routes runtime modules and type-only imports',()=>{
  assert.equal(rewriteEngineEntrypoints("import type { Lesson_Props } from '@svitlo/engine';",'apps/web/src/lesson.ts'),
    "import type { Lesson_Props } from '@svitlo/engine/runtime';");
});
test('rejects authoring APIs in applications',()=>{
  assert.throws(()=>rewriteEngineEntrypoints("import { defineLesson } from '@svitlo/engine';",'apps/web/src/lesson.ts'),/application imports/);
});
test('does not change comments or strings; migration is idempotent',()=>{
  const original="const note = \"from '@svitlo/engine'\";";
  assert.equal(rewriteEngineEntrypoints(original,'content/art/data/test.ts'),original);
  const first=rewriteEngineEntrypoints("import { defineSkill } from '@svitlo/engine';",'content/art/data/skill.data.ts');
  assert.equal(rewriteEngineEntrypoints(first,'content/art/data/skill.data.ts'),first);
});

test('classifies UI Kit authored assessment method definitions as build-time',()=>{
  const source="import { defineAssessmentMethod } from '@svitlo/engine';";
  assert.equal(rewriteEngineEntrypoints(source,'shared/ui-kit/data/definitions/assessmentMethods/example.ts'),
    "import { defineAssessmentMethod } from '@svitlo/engine/build';");
});
