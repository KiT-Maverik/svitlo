// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReflectScene } from './ReflectScene';
import { fixture } from '../../sceneFixtures';

afterEach(cleanup);

describe('ReflectScene voluntary question paths', () => {
  it('keeps a proposed own question unacknowledged until explicit self-confirmation', async () => {
    const user = userEvent.setup();
    render(<ReflectScene locales={fixture('reflect')} />);
    expect(screen.queryByText('test_bothQuestionsFeedback')).toBeNull();

    await user.click(screen.getByRole('button', { name: 'test_ownDayQuestion' }));
    expect(screen.getByText('test_ownQuestionRouteFeedback')).toBeDefined();
    const own = screen.getByRole('textbox', { name: 'test_writeQuestion' });
    await user.type(own, 'A question that is never submitted');
    expect((own as HTMLTextAreaElement).value).toBe('A question that is never submitted');
    expect(screen.queryByText('test_ownQuestionFeedback')).toBeNull();

    await user.click(screen.getByRole('button', { name: 'test_confirmOwnDayQuestion' }));
    expect(screen.getByText('test_ownQuestionFeedback')).toBeDefined();
    await user.click(screen.getByRole('button', { name: 'test_continueToMoon' }));
    expect(screen.getByRole('heading', { name: 'test_moonPrompt' })).toBeDefined();

    await user.click(screen.getByRole('button', { name: 'test_chooseMoon' }));
    await user.click(screen.getByRole('button', { name: 'test_reviewBoth' }));
    expect(screen.getByText('test_bothQuestionsFeedback')).toBeDefined();
  });

  it('permits skipping both topics and never claims two completed questions', async () => {
    const user = userEvent.setup();
    render(<ReflectScene locales={fixture('reflect')} />);
    await user.click(screen.getByRole('button', { name: 'test_skipQuestion' }));
    expect(screen.getByText('test_skippedFeedback')).toBeDefined();
    await user.click(screen.getByRole('button', { name: 'test_continueToMoon' }));
    await user.click(screen.getByRole('button', { name: 'test_skipQuestion' }));
    await user.click(screen.getByRole('button', { name: 'test_reviewBoth' }));
    expect(screen.getAllByText('test_incompleteFeedback').length).toBeGreaterThan(0);
    expect(screen.queryByText('test_bothQuestionsFeedback')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'test_again' }));
    expect(screen.getByRole('heading', { name: 'test_dayPrompt' })).toBeDefined();
  });
});
