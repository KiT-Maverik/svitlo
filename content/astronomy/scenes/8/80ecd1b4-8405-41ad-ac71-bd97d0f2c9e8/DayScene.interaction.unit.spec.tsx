// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DayScene } from './DayScene';
import { fixture } from '../../sceneFixtures';

afterEach(cleanup);

describe('DayScene real learner interactions', () => {
  it('switches from the day/night comparison to either described sky without changing the lesson place', async () => {
    const user = userEvent.setup();
    render(<DayScene locales={fixture('day')} />);
    expect(screen.getByRole('img', { name: 'test_skyDayDescription' })).toBeDefined();
    expect(screen.getByRole('img', { name: 'test_skyNightDescription' })).toBeDefined();

    await user.click(screen.getByRole('button', { name: 'test_showDay' }));
    expect(screen.getByRole('img', { name: 'test_skyDayDescription' })).toBeDefined();
    expect(screen.queryByRole('img', { name: 'test_skyNightDescription' })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'test_showBoth' }));
    expect(screen.getByRole('img', { name: 'test_skyNightDescription' })).toBeDefined();
  });

  it('supports native keyboard selection, gentle feedback, repeat and an honest disabled evidence step', async () => {
    const user = userEvent.setup();
    render(<DayScene locales={fixture('day')} />);
    const place = screen.getByRole('button', { name: 'test_placeChoice' });
    place.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('status').textContent).toContain('test_placeFeedback');
    expect(screen.getByRole('status').textContent).toContain('test_skyFeedback');
    const evidence = screen.getByRole('button', { name: 'test_evidenceStep' }) as HTMLButtonElement;
    expect(evidence.disabled).toBe(true);
    await user.click(screen.getByRole('button', { name: 'test_again' }));
    expect(screen.queryByRole('status')).toBeNull();
  });
});
