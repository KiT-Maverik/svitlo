// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MoonScene } from './MoonScene';
import { fixture } from '../../sceneFixtures';

afterEach(cleanup);

describe('MoonScene learner interactions', () => {
  it('allows independent observation of the illuminated fraction and physical disk shape', async () => {
    const user = userEvent.setup();
    render(<MoonScene locales={fixture('moon')} />);
    expect(screen.getByText('test_firstLabel')).toBeDefined();
    expect(screen.getByText('test_secondLabel')).toBeDefined();
    await user.click(screen.getByRole('button', { name: 'test_secondChoice' }));
    expect(screen.getByText('test_correct')).toBeDefined();
    await user.click(screen.getByRole('button', { name: 'test_sameShape' }));
    expect(screen.getByText('test_sameShapeFeedback')).toBeDefined();
    await user.click(screen.getByRole('button', { name: 'test_showFirst' }));
    expect(screen.queryByText('test_secondLabel')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'test_showBoth' }));
    expect(screen.getByText('test_secondLabel')).toBeDefined();
  });

  it('reveals cloud-only choices after placing a cloud, then clears the transient explanation when hidden', async () => {
    const user = userEvent.setup();
    render(<MoonScene locales={fixture('moon')} />);
    expect(screen.queryByRole('button', { name: 'test_cloudNotPhase' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'test_showCloud' }));
    expect(screen.getByRole('img', { name: 'test_cloudDescription' })).toBeDefined();
    await user.click(screen.getByRole('button', { name: 'test_cloudNotPhase' }));
    expect(screen.getByText('test_cloudNotPhaseFeedback')).toBeDefined();
    await user.click(screen.getByRole('button', { name: 'test_hideCloud' }));
    expect(screen.getByRole('img', { name: 'test_cloudFreeDescription' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'test_cloudNotPhase' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'test_again' }));
    expect(screen.queryByText('test_correct')).toBeNull();
  });
});
