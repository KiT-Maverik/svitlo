import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveEntityPath } from './resolveEntityPath.utils';

describe('resolveEntityPath', () => {
  it('uses the final hexadecimal digit and preserves the complete UUID', () => {
    assert.equal(
      resolveEntityPath('d3048d21-8690-5255-b62c-984c69ac272c'),
      'c/d3048d21-8690-5255-b62c-984c69ac272c',
    );
    assert.equal(
      resolveEntityPath('3b836ba8-cafa-517e-a34c-d7f341614012'),
      '2/3b836ba8-cafa-517e-a34c-d7f341614012',
    );
  });
  it('normalizes UUID case and rejects unsafe or malformed paths', () => {
    assert.equal(
      resolveEntityPath('D3048D21-8690-5255-B62C-984C69AC272C'),
      'c/d3048d21-8690-5255-b62c-984c69ac272c',
    );
    for (const id of ['', 'howLightMoves', '../etc/passwd', 'd3048d21-8690-5255-b62c-984c69ac272c/x', 'd3048d21-8690-5255-b62c-984c69ac272']) {
      assert.throws(() => resolveEntityPath(id), /canonical UUID/);
    }
  });
});
