import test from 'node:test';
import assert from 'node:assert/strict';
import { createSourceIdentifierRegistry, renderSourceItem } from '../sourceIdentifiers.mjs';

test('canonical import names and explicit map bindings', () => {
  const claim = createSourceIdentifierRegistry('lesson', ['defineLesson', 'languages', 'section']);
  assert.equal(claim('howLightMoves', 'section.items.lightBasics'), 'howLightMoves');
  assert.equal(renderSourceItem('howLightMoves', 'howLightMoves'), 'howLightMoves');
  assert.equal(renderSourceItem('lightBasics', 'howLightMoves'), '"lightBasics": howLightMoves');
});

test('colliding, reserved and invalid import names fail closed with provenance', () => {
  const claim = createSourceIdentifierRegistry('content', ['content', 'languages']);
  claim('lessonIntro', 'first block');
  assert.throws(
    () => claim('lessonIntro', 'second block'),
    /generated identifier collision.*first block.*second block/,
  );
  assert.throws(() => claim('content', 'child'), /generated identifier collision/);
  assert.throws(() => claim('class', 'child'), /reserved generated identifier/);
  assert.throws(() => claim('not-valid', 'child'), /invalid or reserved/);
});
