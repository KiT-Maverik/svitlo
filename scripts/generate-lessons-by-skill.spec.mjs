import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { buildIndex, generate, parseArguments, renderSkillIndex } from './generate-lessons-by-skill.mjs';

const SKILL_ONE = '00b48cb0-13c2-4531-84ac-1b8d44f11055';
const SKILL_TWO = '00b48cb0-13c2-4531-84ac-1b8d44f11056';
const LESSON_ONE = 'd3048d21-8690-5255-b62c-984c69ac272c';
const LESSON_TWO = 'f760e7b7-9f77-5027-89ce-4e40d9d031a1';
function withRepository(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-by-skill-'));
  const put = (relative, value) => {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, value, 'utf8');
    return file;
  };
  try {
    put(
      'content/math/data/skills/numbers/addition/skills/one.data.ts',
      "export const one_Skill_Data = buildSkillConfig({ id: '" +
        SKILL_ONE +
        "', name: { en: 'Meaning of addition' } });\n",
    );
    put(
      'content/math/data/skills/numbers/addition/skills/two.data.ts',
      "export const two_Skill_Data = buildSkillConfig({ id: '" +
        SKILL_TWO +
        "', name: { en: 'Addition practice' } });\n",
    );
    const base = 'content/math/data/lessons/c/' + LESSON_ONE + '/';
    put(
      base + 'addition.data.ts',
      `
import { one_Skill_Data, two_Skill_Data } from '../../../skills/numbers/addition/skills';
export const addition_Data = defineLessonData()({
  id: '${LESSON_ONE}',
  slug: 'addition',
  title: { en: 'Addition concepts' },
  skills: [one_Skill_Data.id, two_Skill_Data.id],
});
`,
    );
    put(base + 'methodology.md', '# Addition methodology\n');
    const clone = 'content/math/data/lessons/1/' + LESSON_TWO + '/';
    put(
      clone + 'practice.data.ts',
      `
import { addition_Data } from '../../c/${LESSON_ONE}/addition.data';
export const practice_Data = defineLessonData()({
  ...addition_Data,
  id: '${LESSON_TWO}',
  slug: 'practice',
  title: 'Addition practice',
});
`,
    );
    return run({ root, put });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('indexes multi-skill lessons in flat ID entries and resolves spread-based lesson copies', () => {
  withRepository(({ root }) => {
    const { index, failures, lessonCount } = buildIndex(root);
    assert.equal(lessonCount, 2);
    assert.deepEqual(failures, []);
    assert.deepEqual([...index.keys()].sort(), [SKILL_ONE, SKILL_TWO]);
    assert.deepEqual(
      index.get(SKILL_ONE).lessons.map(l => l.lessonId),
      [LESSON_ONE, LESSON_TWO],
    );
    assert.deepEqual(
      index.get(SKILL_TWO).lessons.map(l => l.lessonId),
      [LESSON_ONE, LESSON_TWO],
    );
    const markdown = renderSkillIndex(SKILL_ONE, index.get(SKILL_ONE));
    assert.match(markdown, /Implemented Lesson candidates: 2/);
    assert.match(markdown, /methodology\.md/);
    assert.match(markdown, /data\/lessons\/c\/d3048d21/);
  });
});

test('filters by textbook, writes one flat Markdown file per selected Skill, and supports no candidates', () => {
  withRepository(({ root }) => {
    const output = path.join(root, '.agent-ci-artifacts/lessons-by-skill');
    const result = generate({ root, packagePath: 'content/math', skillIds: [SKILL_ONE], output });
    assert.equal(result.generated.length, 1);
    assert.deepEqual(result.failures, []);
    assert.ok(fs.existsSync(path.join(output, SKILL_ONE + '.md')));
    assert.ok(!fs.existsSync(path.join(output, SKILL_TWO + '.md')));
    const missing = generate({ root, skillIds: ['22222222-2222-4222-8222-222222222222'] });
    assert.match(missing.generated[0].markdown, /No implemented Lesson/);
  });
});

test('fails closed for unresolved expressions instead of silently dropping a lesson', () => {
  withRepository(({ root, put }) => {
    put(
      'content/math/data/lessons/c/' + LESSON_ONE + '/addition.data.ts',
      `export const addition_Data = defineLessonData()({
        id: '${LESSON_ONE}', slug: 'addition', skills: getSkillsDynamically()
      });`,
    );
    const index = buildIndex(root);
    assert.equal(index.failures.length, 2);
    assert.equal(index.index.size, 0);
    assert.match(index.failures[0].error, /Non-static skills array/);
  });
});

test('validates CLI arguments and prevents unsafe package paths', () => {
  assert.deepEqual(parseArguments(['--skill', SKILL_ONE, '--stdout']).skills, [SKILL_ONE]);
  assert.throws(
    () => parseArguments(['--package', 'content/../private', '--skill', SKILL_ONE, '--stdout']),
    /Invalid textbook/,
  );
  assert.throws(() => parseArguments(['--stdout']), /exactly one --skill/);
  assert.throws(() => parseArguments(['--skill', 'not-a-uuid', '--stdout']), /Invalid Skill UUID/);
});
