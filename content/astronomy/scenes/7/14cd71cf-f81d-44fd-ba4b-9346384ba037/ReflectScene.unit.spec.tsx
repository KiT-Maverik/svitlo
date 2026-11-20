import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ReflectScene } from './ReflectScene';
import { initialReflectionState, reflectionReducer } from './reflectModel';
import { fixture } from '../../testing/sceneFixtures';

describe('ReflectScene: voluntary independent question acknowledgement', () => {
  it('shows the whole ready-made day question and independent alternatives', () => {
    const html = renderToStaticMarkup(createElement(ReflectScene, { locales: fixture('reflect') }));
    expect(html).toContain('test_dayQuestion');
    expect(html).toContain('test_chooseDay');
    expect(html).toContain('test_ownDayQuestion');
    expect(html).toContain('test_continueToMoon');
    expect(html).toContain('test_skipQuestion');
    expect(html).toContain('test_noGrades');
    expect(html).not.toContain('test_bothQuestionsFeedback');
  });

  it('choosing own route does not acknowledge a question; confirming explicitly does', () => {
    const route = reflectionReducer(initialReflectionState, { type: 'own', topic: 'day' });
    expect(route.routes.day).toBe('own');
    expect(route.acknowledged.day).toBe(false);
    const confirmed = reflectionReducer(route, { type: 'confirmOwn', topic: 'day' });
    expect(confirmed.acknowledged.day).toBe(true);
    expect(confirmed.acknowledged.moon).toBe(false);
    const switched = reflectionReducer(confirmed, { type: 'own', topic: 'day' });
    expect(switched.acknowledged.day).toBe(false);
  });

  it('cannot confirm without choosing own route, and skipping never counts as asking', () => {
    expect(reflectionReducer(initialReflectionState, { type: 'confirmOwn', topic: 'moon' }))
      .toEqual(initialReflectionState);
    const chosen = reflectionReducer(initialReflectionState, { type: 'chooseReady', topic: 'day' });
    const skipped = reflectionReducer(chosen, { type: 'skip', topic: 'day' });
    expect(skipped.acknowledged.day).toBe(false);
    expect(skipped.routes.day).toBeNull();
  });

  it('keeps two distinct acknowledgements and permits review without either', () => {
    const step = reflectionReducer(initialReflectionState, { type: 'step', step: 'moon' });
    expect(step.step).toBe('moon');
    expect(step.acknowledged).toEqual({ day: false, moon: false });
    const day = reflectionReducer(step, { type: 'chooseReady', topic: 'day' });
    expect(day.acknowledged).toEqual({ day: true, moon: false });
    const moon = reflectionReducer(day, { type: 'chooseReady', topic: 'moon' });
    expect(moon.acknowledged).toEqual({ day: true, moon: true });
    expect(reflectionReducer(moon, { type: 'reset' })).toEqual(initialReflectionState);
  });
});
