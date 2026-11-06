import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileMenu from './ProfileMenu';
import { learningLayout } from '../../../../data/locale/learningLayout';

const messages = learningLayout.uk;
const active = { id: 'one', displayName: 'Олена' };
const second = { id: 'two', displayName: 'Богдан' };
const onSettings = vi.fn();
const onProfileChange = vi.fn();
const onLogout = vi.fn();

describe('ProfileMenu', () => {
  afterEach(() => vi.clearAllMocks());

  it('has a single enabled profile trigger with a localized name', async () => {
    render(<ProfileMenu messages={messages} onSettings={onSettings} />);
    const trigger = screen.getByRole('button', { name: messages.actions.profile });
    expect(trigger).toBeEnabled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: messages.actions.profile })).toBeVisible();
    expect(screen.getByText(messages.actions.profile)).toBeVisible();
    expect(screen.getByRole('menuitem', { name: messages.actions.switchProfile })).toBeDisabled();
    expect(screen.getByRole('menuitem', { name: messages.actions.logout })).toBeDisabled();
  });

  it('shows the current avatar and display name, then expands and switches profiles', async () => {
    render(
      <ProfileMenu
        messages={messages}
        profile={active}
        profiles={[active, second]}
        onProfileChange={onProfileChange}
        onSettings={onSettings}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    expect(screen.getByText(active.displayName)).toBeVisible();

    const switchItem = screen.getByRole('menuitem', { name: messages.actions.switchProfile });
    expect(switchItem).toBeEnabled();
    await userEvent.click(switchItem);
    expect(switchItem).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: active.displayName })).toBeDisabled();
    await userEvent.click(screen.getByRole('menuitem', { name: second.displayName }));
    expect(onProfileChange).toHaveBeenCalledExactlyOnceWith('two');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens settings from the menu, without an independent navbar settings button', async () => {
    render(<ProfileMenu messages={messages} onSettings={onSettings} />);
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    await userEvent.click(screen.getByRole('menuitem', { name: messages.settingsTitle }));
    expect(onSettings).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('runs the host logout action only when supplied', async () => {
    render(<ProfileMenu messages={messages} onSettings={onSettings} onLogout={onLogout} />);
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    await userEvent.click(screen.getByRole('menuitem', { name: messages.actions.logout }));
    expect(onLogout).toHaveBeenCalledOnce();
  });

  it('dismisses on Escape without invoking any account action', async () => {
    render(<ProfileMenu messages={messages} onSettings={onSettings} onLogout={onLogout} />);
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(onLogout).not.toHaveBeenCalled();
    expect(onSettings).not.toHaveBeenCalled();
  });

  it('uses the supplied RTL localization', async () => {
    const ar = learningLayout.ar;
    render(
      <div dir="rtl" lang="ar-SA">
        <ProfileMenu messages={ar} onSettings={onSettings} />
      </div>,
    );
    await userEvent.click(screen.getByRole('button', { name: ar.actions.profile }));
    expect(screen.getByRole('menuitem', { name: ar.actions.switchProfile })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: ar.settingsTitle })).toBeInTheDocument();
  });
});
