import assert from 'node:assert/strict';
import { test } from 'node:test';

import { renderBlockerTodo, renderBlockerSpecification } from './renderBlockerTodo.mjs';

test('blocker todo emits exactly one physical line even with pasted line breaks', () => {
  const todo = renderBlockerTodo('Implement reviewed media\r\n  and test keyboard access.');
  assert.equal(todo, '// TODO (BLOCKER): Implement reviewed media and test keyboard access.');
  assert.equal(todo.split('\n').length, 1);
  assert.equal(
    renderBlockerTodo(todo.slice(19)),
    '// TODO (BLOCKER): Implement reviewed media and test keyboard access.',
  );
});

test('empty or non-string unblock instructions are invalid', () => {
  assert.throws(() => renderBlockerTodo(' \r\n\t '), /instruction must explain/);
  assert.throws(() => renderBlockerTodo(null), /instruction must be a string/);
  assert.throws(() => renderBlockerSpecification('', 'Reviewed brief'), /instruction must explain/);
});

test('multiline brief is one safely escaped comment with one marker and full reviewed text', () => {
  const brief =
    '\r\n    # Specification\r\n      Keyboard then touch */ preserved\r\n\r\n    Accessibility: captions\r\n';
  const result = renderBlockerSpecification('Implement and verify media before removing this brief.', brief);
  assert.equal(
    result,
    [
      '/*',
      ' * TODO (BLOCKER): Implement and verify media before removing this brief.',
      ' *',
      ' * # Specification',
      ' *   Keyboard then touch * / preserved',
      ' *',
      ' * Accessibility: captions',
      ' */',
    ].join('\n'),
  );
  assert.equal(result.match(/TODO \(BLOCKER\):/g)?.length, 1);
  assert.equal(result.match(/\/\*/g)?.length, 1);
  assert.equal(result.match(/\*\//g)?.length, 1);
  assert.equal(renderBlockerSpecification('Implement and verify media before removing this brief.', brief), result);
});

test('unreviewed empty brief and repeated TODO marker are rejected', () => {
  assert.throws(() => renderBlockerSpecification('Implement it', '\n\n '), /reviewed implementation context/);
  assert.throws(() => renderBlockerSpecification('Implement it', '// TODO (BLOCKER): duplicate'), /must not duplicate/);
});
