import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DayScene } from './DayScene';
import { dayReducer, initialDayState } from './dayModel';
import { fixture } from '../../testing/sceneFixtures';

describe('DayScene: observation without invented photographic proof', () => {
  it('renders two diagram states with the same landscape and described skies', () => {
    const html = renderToStaticMarkup(createElement(DayScene, { locales: fixture('day') }));
    expect(html).toContain('test_skyDayDescription');
    expect(html).toContain('test_skyNightDescription');
    expect(html).toContain('test_first');
    expect(html).toContain('test_second');
    expect(html.match(/viewBox="0 0 440 260"/g)).toHaveLength(2);
    expect(html).toContain('test_evidenceStep');
    expect(html).toMatch(/disabled=""/);
    expect(html).not.toContain('<img');
  });

  it('keeps inspection choices nonblocking and resets feedback', () => {
    const day = dayReducer(initialDayState, { type: 'view', view: 'day' });
    expect(day.view).toBe('day');
    const wrong = dayReducer(day, { type: 'answer', choice: 'place' });
    expect(wrong.choice).toBe('place');
    expect(dayReducer(wrong, { type: 'view', view: 'night' }).choice).toBe('place');
    expect(dayReducer(wrong, { type: 'reset' })).toEqual(initialDayState);
  });
});
