import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TEST_SKILL_NODES_UK } from './skillsData.fixture';
import { SkillsMindMap } from './SkillsMindMap';
import { SkillsPagePreferences } from './SkillsPagePreferences';
import { SkillsPageSettingsProvider } from './SkillsPageSettingsContext';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
describe('SkillsMindMap', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    document.documentElement.lang = 'uk';
    window.history.replaceState({}, '', '/skillAnalytics');
    // These components receive resolved props from Next.js server routes.
    // Any client fetch is a regression, not a successful mocked API response.
    vi.stubGlobal(
      'fetch',
      vi.fn(() => {
        throw new Error('Unexpected client-side Skills fetch');
      }),
    );
  });

  afterEach(() => {
    vi.stubGlobal('fetch', originalFetch);
    window.history.replaceState({}, '', '/');
  });

  it('starts compact with visible mastery, expands the description and Pump action, then collapses again', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domains={TEST_SKILL_NODES_UK} />
      </SkillsPageSettingsProvider>,
    );
    const leaf = await screen.findByTestId('skill-node-testRed');
    expect(leaf).toHaveTextContent('Червоний');
    expect(leaf).toHaveAttribute('data-expanded', 'false');
    expect(leaf).not.toHaveTextContent('Розпізнавати червоний.');
    expect(within(leaf).queryByRole('link', { name: /Прокачати навичку/ })).not.toBeInTheDocument();
    const meter = within(leaf).getByRole('progressbar', { name: /Демонстраційний рівень/ });
    const score = Number(meter.getAttribute('aria-valuenow'));
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
    expect(within(leaf).getByText(score + '%')).toBeInTheDocument();
    expect(meter.parentElement).toHaveAttribute('data-compact', 'true');

    const title = within(leaf).getByRole('button', { name: /Інформація про скіл/ });
    expect(title).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(title);
    expect(leaf).toHaveAttribute('data-expanded', 'true');
    expect(title).toHaveAttribute('aria-expanded', 'true');
    expect(leaf).toHaveTextContent('Розпізнавати червоний.');
    expect(within(leaf).getByRole('link', { name: /Прокачати навичку/ })).toHaveAttribute(
      'href',
      '/skills/' + uuid(3) + '/learn?lang=uk',
    );
    expect(screen.getByRole('region', { name: 'Інформація про вибраний вузол' })).toHaveTextContent(
      'Розпізнавати червоний.',
    );
    expect(screen.getByTestId('skill-node-testWarmColors')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(title);
    expect(leaf).toHaveAttribute('data-expanded', 'false');
    expect(within(leaf).queryByRole('link', { name: /Прокачати навичку/ })).not.toBeInTheDocument();
    expect(within(leaf).getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(score));
  });

  it('preserves compact mastery and expanded CTA in the accessible list view', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domains={TEST_SKILL_NODES_UK} />
      </SkillsPageSettingsProvider>,
    );
    await screen.findByTestId('skill-node-testRed');
    fireEvent.click(screen.getByRole('button', { name: 'Список' }));
    const list = screen.getByRole('region', { name: 'Навички за доменами' });
    expect(within(list).getByRole('button', { name: /Група: Теплі кольори/ })).toBeInTheDocument();
    expect(within(list).getByRole('progressbar')).toHaveAttribute('aria-valuenow');
    expect(within(list).queryByText('Розпізнавати червоний.')).not.toBeInTheDocument();
    expect(within(list).queryByRole('link', { name: /Прокачати навичку/ })).not.toBeInTheDocument();

    const leafControl = within(list).getByRole('button', { name: /Скіл: Червоний/ });
    expect(leafControl).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(leafControl);
    expect(leafControl).toHaveAttribute('aria-expanded', 'true');
    expect(within(list).getByText('Розпізнавати червоний.')).toBeInTheDocument();
    expect(within(list).getByRole('link', { name: /Прокачати навичку/ })).toHaveAttribute(
      'href',
      '/skills/' + uuid(3) + '/learn?lang=uk',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Мапа' }));
    expect(screen.getByTestId('skill-node-testRed')).toHaveAttribute('data-expanded', 'true');
  });

  it('keeps different Skill card sizes independent of the Group collapse state', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domains={TEST_SKILL_NODES_UK} />
      </SkillsPageSettingsProvider>,
    );
    const leaf = await screen.findByTestId('skill-node-testRed');
    const group = screen.getByTestId('skill-node-testWarmColors');
    expect(group).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(within(leaf).getByRole('button', { name: /Інформація про скіл/ }));
    expect(leaf).toHaveAttribute('data-expanded', 'true');
    fireEvent.click(group);
    expect(group).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('skill-node-testRed')).not.toBeInTheDocument();
    fireEvent.click(group);
    expect(group).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('skill-node-testRed')).toHaveAttribute('data-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Згорнути все' }));
    expect(screen.queryByTestId('skill-node-testRed')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Розгорнути все' }));
    expect(screen.getByTestId('skill-node-testRed')).toHaveAttribute('data-expanded', 'true');
  });

  it('allows collapsing the avatar root to just the learner profile', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domains={TEST_SKILL_NODES_UK} />
      </SkillsPageSettingsProvider>,
    );
    await screen.findByTestId('skill-node-testColors');
    fireEvent.click(screen.getByTestId('skills-profile'));
    expect(screen.queryByTestId('skill-node-testColors')).not.toBeInTheDocument();
    expect(screen.getByTestId('skills-profile')).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByTestId('skills-profile'));
    expect(screen.getByTestId('skill-node-testColors')).toBeInTheDocument();
  });

  it('requests server navigation rather than changing Skill labels client-side', async () => {
    const navigate = vi.fn();
    render(
      <SkillsPageSettingsProvider initialLanguage="uk" onLanguageChange={navigate}>
        <SkillsPagePreferences />
        <SkillsMindMap domains={TEST_SKILL_NODES_UK} />
      </SkillsPageSettingsProvider>,
    );
    await screen.findByTestId('skill-node-testRed');
    fireEvent.change(screen.getByRole('combobox', { name: 'Мова даних Skills' }), { target: { value: 'en' } });
    expect(navigate).toHaveBeenCalledWith('en');
    expect(screen.getByTestId('skill-node-testRed')).toHaveTextContent('Червоний');
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('displays a hard error for an unsupported requested language', async () => {
    render(
      <SkillsPageSettingsProvider initialLanguage="ru">
        <SkillsPagePreferences />
        <SkillsMindMap domains={TEST_SKILL_NODES_UK} />
      </SkillsPageSettingsProvider>,
    );
    expect(await screen.findByRole('alert')).toHaveTextContent('відсутня');
    expect(globalThis.fetch).not.toHaveBeenCalledWith('/data/skills/ru.json', expect.anything());
  });
});
