import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MoonScene } from './MoonScene';
import { initialMoonState, moonReducer } from './moonModel';
import { fixture } from '../../testing/sceneFixtures';

describe('MoonScene: two dated phases and an independent cloud example', () => {
  it('renders equal disk sizes, dated labels, accessible descriptions and cloud controls', () => {
    const html = renderToStaticMarkup(createElement(MoonScene, { locales: fixture('moon') }));
    expect(html).toContain('test_firstLabel');
    expect(html).toContain('test_secondLabel');
    expect(html).toContain('test_firstDescription');
    expect(html).toContain('test_secondDescription');
    expect(html).toContain('test_cloudFreeDescription');
    expect(html).toContain('test_showCloud');
    expect(html).toContain('test_hideCloud');
    expect(html.match(/viewBox="0 0 240 235"/g)).toHaveLength(3);
  });

  it('cloud removal restores identical disk and clears misleading previous feedback', () => {
    const cloudy = moonReducer(initialMoonState, { type: 'cloud', visible: true });
    expect(cloudy.cloudy).toBe(true);
    const answered = moonReducer(cloudy, { type: 'cloudAnswer', answer: 'cloudIsPhase' });
    const clear = moonReducer(answered, { type: 'cloud', visible: false });
    expect(clear.cloudy).toBe(false);
    expect(clear.cloudAnswer).toBeNull();
    expect(clear.view).toBe('both');
    expect(moonReducer(clear, { type: 'reset' })).toEqual(initialMoonState);
  });

  it('tracks illumination and physical shape as separate observations', () => {
    const lit = moonReducer(initialMoonState, { type: 'lit', answer: 'second' });
    const shape = moonReducer(lit, { type: 'shape', answer: 'same' });
    expect(shape.litAnswer).toBe('second');
    expect(shape.shapeAnswer).toBe('same');
    expect(shape.cloudAnswer).toBeNull();
  });
});
