import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileMenu from './ProfileMenu';
import { learningLayout } from '../../../../data/locale/learningLayout';

const messages = learningLayout.uk;
const active = { id: 'one', displayName: 'Олена' };
const second = { id: 'two', displayName: 'Богдан' };
const onProfileChange = vi.fn();
const onLogout = vi.fn();

describe('ProfileMenu', () => {
  afterEach(() => vi.clearAllMocks());

  it('has a single enabled profile trigger with a localized name', async () => {
    render(<ProfileMenu messages={messages} />);
    const trigger = screen.getByRole('button', { name: messages.actions.profile });
    expect(trigger).toBeEnabled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: messages.actions.profile })).toBeVisible();
    expect(screen.getByText(messages.actions.profile)).toBeVisible();
    expect(screen.getByRole('menuitem', { name: messages.actions.switchProfile })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('menuitem', { name: messages.actions.logout })).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows the current avatar and display name, then expands and switches profiles', async () => {
    render(
      <ProfileMenu
        messages={messages}
        profile={active}
        profiles={[active, second]}
        onProfileChange={onProfileChange}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    expect(screen.getByText(active.displayName)).toBeVisible();

    const switchItem = screen.getByRole('menuitem', { name: messages.actions.switchProfile });
    expect(switchItem).toBeEnabled();
    await userEvent.click(switchItem);
    expect(switchItem).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: active.displayName })).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(screen.getByRole('menuitem', { name: second.displayName }));
    expect(onProfileChange).toHaveBeenCalledExactlyOnceWith('two');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('links to profile settings without opening quick settings', async () => {
    render(<ProfileMenu messages={messages} />);
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    const settings = screen.getByRole('menuitem', { name: messages.actions.profileSettings });
    expect(settings).toHaveAttribute('href', '#');
    await userEvent.click(settings);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('accepts a host-provided settings URL', async () => {
    render(<ProfileMenu messages={messages} settingsHref="/uk/profile/settings" />);
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    expect(screen.getByRole('menuitem', { name: messages.actions.profileSettings })).toHaveAttribute(
      'href',
      '/uk/profile/settings',
    );
  });

  it('runs the host logout action only when supplied', async () => {
    render(<ProfileMenu messages={messages} onLogout={onLogout} />);
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    await userEvent.click(screen.getByRole('menuitem', { name: messages.actions.logout }));
    expect(onLogout).toHaveBeenCalledOnce();
  });

  it('dismisses on Escape without invoking any account action', async () => {
    render(<ProfileMenu messages={messages} onLogout={onLogout} />);
    await userEvent.click(screen.getByRole('button', { name: messages.actions.profile }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(onLogout).not.toHaveBeenCalled();
  });

  it('uses the supplied RTL localization', async () => {
    const ar = learningLayout.ar;
    render(
      <div dir="rtl" lang="ar-SA">
        <ProfileMenu messages={ar} />
      </div>,
    );
    await userEvent.click(screen.getByRole('button', { name: ar.actions.profile }));
    expect(screen.getByRole('menuitem', { name: ar.actions.switchProfile })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: ar.actions.profileSettings })).toBeInTheDocument();
  });
});
