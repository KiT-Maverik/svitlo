import type { Meta, StoryObj } from '@storybook/react';
import UserCabinet from './UserCabinet';
import { userCabinetDemo } from './UserCabinet.demo';

const meta = {
  title: 'Pages/User Cabinet',
  component: UserCabinet,
  args: userCabinetDemo,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof UserCabinet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {};
export const Security: Story = { args: { initialTab: 'security' } };
export const AdditionalAccounts: Story = { args: { initialTab: 'accounts' } };
export const WithoutAdditionalAccounts: Story = {
  args: { initialTab: 'accounts', additionalAccounts: [] },
};
