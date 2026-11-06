import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCabinet from './UserCabinet';
import { userCabinetDemo } from './UserCabinet.demo';

const messages = userCabinetDemo.messages;

describe('UserCabinet mockup', () => {
  it('renders a complete account cabinet without claiming backend functionality', () => {
    render(<UserCabinet {...userCabinetDemo} />);
    expect(screen.getByRole('heading', { name: messages.title })).toBeVisible();
    expect(screen.getByText(messages.demoDescription)).toBeVisible();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tab', { name: messages.tabs.profile })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(messages.tabs.profile);
    expect(screen.getByRole('textbox', { name: messages.displayName })).toHaveValue(userCabinetDemo.profile.displayName);
  });

  it('previews the avatar and updated display name only after saving the mock form', async () => {
    const user = userEvent.setup();
    render(<UserCabinet {...userCabinetDemo} />);
    const avatar = screen.getByRole('button', { name: `${messages.chooseAvatar}: Лисеня` });
    await user.click(avatar);
    expect(avatar).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: `${messages.chooseAvatar}: Сонях` })).toHaveAttribute('aria-pressed', 'false');

    const displayName = screen.getByRole('textbox', { name: messages.displayName });
    await user.clear(displayName);
    await user.type(displayName, 'Нове ім’я');
    expect(screen.queryByRole('heading', { name: 'Нове ім’я' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: messages.saveProfile }));
    expect(screen.getByRole('heading', { name: 'Нове ім’я' })).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent(messages.profilePreviewNotice);
  });

  it('keeps password fields local and clearly reports a demo instead of changing credentials', async () => {
    const user = userEvent.setup();
    render(<UserCabinet {...userCabinetDemo} />);
    await user.click(screen.getByRole('tab', { name: messages.tabs.security }));
    const current = screen.getByLabelText(new RegExp(messages.currentPassword));
    const password = screen.getByLabelText(new RegExp(messages.newPassword));
    const confirm = screen.getByLabelText(new RegExp(messages.confirmPassword));
    expect(current).toHaveAttribute('type', 'password');
    expect(password).toHaveAttribute('type', 'password');

    await user.type(current, 'old-demo-password');
    await user.type(password, 'new-demo-password');
    await user.type(confirm, 'does-not-match');
    await user.click(screen.getByRole('button', { name: messages.changePassword }));
    expect(screen.getByRole('alert')).toHaveTextContent(messages.passwordMismatch);

    await user.clear(confirm);
    await user.type(confirm, 'new-demo-password');
    await user.click(screen.getByRole('button', { name: messages.changePassword }));
    expect(screen.getByRole('status')).toHaveTextContent(messages.passwordDemoNotice);
    expect(current).toHaveValue('');
    expect(password).toHaveValue('');
    expect(confirm).toHaveValue('');
  });

  it('discards password inputs when switching pages', async () => {
    const user = userEvent.setup();
    render(<UserCabinet {...userCabinetDemo} initialTab="security" />);
    await user.type(screen.getByLabelText(new RegExp(messages.currentPassword)), 'temporary');
    await user.click(screen.getByRole('tab', { name: messages.tabs.accounts }));
    await user.click(screen.getByRole('tab', { name: messages.tabs.security }));
    expect(screen.getByLabelText(new RegExp(messages.currentPassword))).toHaveValue('');
  });

  it('shows linked accounts as read-only profiles distinct from the current account', async () => {
    const user = userEvent.setup();
    render(<UserCabinet {...userCabinetDemo} initialTab="accounts" />);
    const panel = screen.getByRole('tabpanel', { name: messages.tabs.accounts });
    expect(within(panel).getByText(messages.currentAccount)).toBeInTheDocument();
    expect(within(panel).getByText('Анна')).toBeVisible();
    expect(within(panel).getByText('Максим')).toBeVisible();
    expect(within(panel).queryByRole('button')).not.toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: messages.tabs.profile }));
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(messages.tabs.profile);
  });

  it('offers a useful empty state for accounts and supports RTL container direction', () => {
    render(
      <div dir="rtl" lang="ar">
        <UserCabinet {...userCabinetDemo} additionalAccounts={[]} initialTab="accounts" />
      </div>,
    );
    expect(screen.getByText(messages.noAdditionalAccounts)).toBeVisible();
    expect(screen.getByRole('tablist', { name: messages.navigationLabel })).toBeVisible();
    expect(screen.getByRole('tab', { name: messages.tabs.accounts })).toHaveAttribute('aria-selected', 'true');
  });
});
