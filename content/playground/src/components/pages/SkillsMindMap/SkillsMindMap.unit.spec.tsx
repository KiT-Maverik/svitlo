import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { SkillsMindMap } from './SkillsMindMap';
import { SkillsPageSettingsProvider } from './SkillsPageSettingsContext';
import { SkillsPagePreferences } from './SkillsPagePreferences';
import { fixtureJsonForSkillUrl, TEST_SKILLS_DOMAIN_SLUGS } from './skillsData.fixture';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
describe('SkillsMindMap', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    document.documentElement.lang = 'uk';
    window.history.replaceState({}, '', '/skillAnalytics');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        const data: unknown = fixtureJsonForSkillUrl(url);
        return { ok: data !== null, status: data ? 200 : 404, json: async () => data };
      }),
    );
  });

  afterEach(() => {
    vi.stubGlobal('fetch', originalFetch);
    window.history.replaceState({}, '', '/');
  });

  it('loads only the selected language and toggles an individual Group', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
    const node = await screen.findByTestId('skill-node-testWarmColors');
    expect(node).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('skill-node-testRed')).toBeVisible();

    fireEvent.click(node);
    expect(screen.queryByTestId('skill-node-testRed')).not.toBeInTheDocument();
    expect(screen.getByTestId('skill-node-testWarmColors')).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByTestId('skill-node-testWarmColors'));
    expect(screen.getByTestId('skill-node-testRed')).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/data/pages/skillAnalytics/uk.json',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('starts compact with visible mastery, expands the description and Pump action, then collapses again', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
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
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
    await screen.findByTestId('skill-node-testRed');
    fireEvent.click(screen.getByRole('button', { name: 'Список' }));
    const list = screen.getByRole('region', { name: 'Навички за доменами' });
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
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
    const leaf = await screen.findByTestId('skill-node-testRed');
    const group = screen.getByTestId('skill-node-testWarmColors');
    fireEvent.click(within(leaf).getByRole('button', { name: /Інформація про скіл/ }));
    expect(leaf).toHaveAttribute('data-expanded', 'true');
    fireEvent.click(group);
    expect(screen.queryByTestId('skill-node-testRed')).not.toBeInTheDocument();
    fireEvent.click(group);
    expect(screen.getByTestId('skill-node-testRed')).toHaveAttribute('data-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Згорнути все' }));
    expect(screen.queryByTestId('skill-node-testRed')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Розгорнути все' }));
    expect(screen.getByTestId('skill-node-testRed')).toHaveAttribute('data-expanded', 'true');
  });

  it('collapses all branches, expands them, and supports a keyboard-friendly list view', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
    await screen.findByTestId('skill-node-testRed');
    fireEvent.click(screen.getByRole('button', { name: 'Згорнути все' }));
    expect(screen.queryByTestId('skill-node-testRed')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Розгорнути все' }));
    expect(screen.getByTestId('skill-node-testRed')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Список' }));
    expect(screen.getByRole('region', { name: 'Навички за доменами' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Група: Теплі кольори/ })).toBeInTheDocument();
  });

  it('allows collapsing the avatar root to just the learner profile', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
    await screen.findByTestId('skill-node-testColors');
    fireEvent.click(screen.getByTestId('skills-profile'));
    expect(screen.queryByTestId('skill-node-testColors')).not.toBeInTheDocument();
    expect(screen.getByTestId('skills-profile')).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByTestId('skills-profile'));
    expect(screen.getByTestId('skill-node-testColors')).toBeInTheDocument();
  });

  it('switches to the requested language without loading all locale files', async () => {
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
    await screen.findByTestId('skill-node-testRed');
    fireEvent.change(screen.getByRole('combobox', { name: 'Мова даних Skills' }), { target: { value: 'en' } });
    await waitFor(() => expect(screen.getByTestId('skill-node-testRed')).toHaveTextContent('Red'));
    expect(window.location.search).toBe('?lang=en');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/data/pages/skillAnalytics/en.json',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('displays a hard error for an unsupported requested language', async () => {
    window.history.replaceState({}, '', '/skillAnalytics?lang=ru');
    render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
    expect(await screen.findByRole('alert')).toHaveTextContent('відсутня');
    expect(globalThis.fetch).not.toHaveBeenCalledWith('/data/pages/skillAnalytics/ru.json', expect.anything());
  });
});
