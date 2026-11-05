import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { SkillsMindMap } from './SkillsMindMap';
import { SkillsPagePreferences } from './SkillsPagePreferences';
import { SkillsPageSettingsProvider } from './SkillsPageSettingsContext';
import { fixtureJsonForSkillUrl, TEST_SKILLS_DOMAIN_SLUGS } from './skillsData.fixture';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
describe('Skills page-scoped settings', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    document.documentElement.lang = 'uk';
    window.history.replaceState({}, '', '/skillAnalytics');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        const result: unknown = fixtureJsonForSkillUrl(url);
        return { ok: result !== null, status: result === null ? 404 : 200, json: async () => result };
      }),
    );
  });

  afterEach(() => {
    vi.stubGlobal('fetch', originalFetch);
    window.history.replaceState({}, '', '/');
  });

  function renderPage() {
    return render(
      <SkillsPageSettingsProvider>
        <SkillsPagePreferences />
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
  }

  it('shows all three switches and enables mastery, color and Pump by default', async () => {
    renderPage();
    const card = await screen.findByTestId('skill-node-testRed');
    const settings = screen.getByRole('region', { name: 'Налаштування сторінки Skills' });
    const mastery = within(settings).getByRole('checkbox', { name: 'Показувати володіння навичкою' });
    const tint = within(settings).getByRole('checkbox', { name: 'Підсвічувати рівень кольором' });
    const pump = within(settings).getByRole('checkbox', { name: 'Показувати «Прокачати»' });
    expect(mastery).toBeChecked();
    expect(tint).toBeChecked();
    expect(pump).toBeChecked();
    expect(card).toHaveAttribute('data-tier');
    expect(within(card).getByRole('progressbar')).toBeInTheDocument();

    fireEvent.click(within(card).getByRole('button', { name: /Інформація про скіл/ }));
    expect(within(card).getByRole('link', { name: /Прокачати/ })).toBeInTheDocument();
  });

  it('hides mastery metrics, disables tint and keeps the card interactive', async () => {
    renderPage();
    const card = await screen.findByTestId('skill-node-testRed');
    const mastery = screen.getByRole('checkbox', { name: 'Показувати володіння навичкою' });
    const tint = screen.getByRole('checkbox', { name: 'Підсвічувати рівень кольором' });
    fireEvent.click(mastery);
    expect(within(card).queryByRole('progressbar')).not.toBeInTheDocument();
    expect(card).not.toHaveAttribute('data-tier');
    expect(tint).toBeDisabled();
    fireEvent.click(within(card).getByRole('button', { name: /Інформація про скіл/ }));
    expect(card).toHaveAttribute('data-expanded', 'true');
    expect(within(card).getByRole('link', { name: /Прокачати/ })).toBeInTheDocument();
    fireEvent.click(mastery);
    expect(within(card).getByRole('progressbar')).toBeInTheDocument();
    expect(tint).toBeEnabled();
  });

  it('keeps numeric mastery but removes tier colors when highlighting is disabled', async () => {
    renderPage();
    const card = await screen.findByTestId('skill-node-testRed');
    fireEvent.click(screen.getByRole('checkbox', { name: 'Підсвічувати рівень кольором' }));
    expect(card).not.toHaveAttribute('data-tier');
    expect(within(card).getByRole('progressbar')).toBeInTheDocument();
    expect(within(card).getByTestId('mastery-' + uuid(3))).toHaveAttribute('data-tier', 'neutral');
  });

  it('removes Pump links across both compact outline and expanded cards', async () => {
    renderPage();
    const card = await screen.findByTestId('skill-node-testRed');
    fireEvent.click(within(card).getByRole('button', { name: /Інформація про скіл/ }));
    expect(within(card).getByRole('link', { name: /Прокачати/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Показувати «Прокачати»' }));
    expect(within(card).queryByRole('link', { name: /Прокачати/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Список' }));
    const list = screen.getByRole('region', { name: 'Навички за доменами' });
    expect(within(list).queryByRole('link', { name: /Прокачати/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Показувати «Прокачати»' }));
    expect(within(list).getByRole('link', { name: /Прокачати/ })).toBeInTheDocument();
  });

  it('collapses and expands the whole graph through the page settings controls', async () => {
    renderPage();
    const leaf = await screen.findByTestId('skill-node-testRed');
    const controls = screen.getByRole('region', { name: 'Керування мапою Skills' });
    expect(within(controls).getByRole('button', { name: 'Згорнути все' })).toBeEnabled();
    expect(leaf).toHaveAttribute('data-expanded', 'false');

    fireEvent.click(within(controls).getByRole('button', { name: 'Згорнути все' }));
    expect(screen.queryByTestId('skill-node-testRed')).not.toBeInTheDocument();
    expect(screen.getByTestId('skills-profile')).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(within(controls).getByRole('button', { name: 'Розгорнути все' }));
    expect(screen.getByTestId('skill-node-testRed')).toHaveAttribute('data-expanded', 'true');
    expect(screen.getByTestId('skills-profile')).toHaveAttribute('aria-expanded', 'true');
  });

  it('fits map after zooming and can return from list mode to a fitted map', async () => {
    renderPage();
    await screen.findByTestId('skill-node-testRed');
    const controls = screen.getByRole('region', { name: 'Керування мапою Skills' });
    const world = screen.getByTestId('skills-map-world');
    const fitted = Number(world.getAttribute('data-zoom'));
    fireEvent.click(screen.getByRole('button', { name: 'Збільшити масштаб' }));
    expect(Number(world.getAttribute('data-zoom'))).toBeGreaterThan(fitted);

    fireEvent.click(within(controls).getByRole('button', { name: 'Вмістити в екран' }));
    expect(Number(world.getAttribute('data-zoom'))).toBeCloseTo(fitted, 8);
    expect(world).toHaveAttribute('data-pan-x');
    expect(world).toHaveAttribute('data-pan-y');

    fireEvent.click(screen.getByRole('button', { name: 'Список' }));
    expect(screen.queryByTestId('skills-map-world')).not.toBeInTheDocument();
    fireEvent.click(within(controls).getByRole('button', { name: 'Вмістити в екран' }));
    expect(screen.getByTestId('skills-map-world')).toBeInTheDocument();
  });

  it('resets page preferences when a new page provider is mounted', async () => {
    const first = renderPage();
    await screen.findByTestId('skill-node-testRed');
    fireEvent.click(screen.getByRole('checkbox', { name: 'Показувати володіння навичкою' }));
    expect(screen.getByRole('checkbox', { name: 'Показувати володіння навичкою' })).not.toBeChecked();
    first.unmount();
    renderPage();
    expect(screen.getByRole('checkbox', { name: 'Показувати володіння навичкою' })).toBeChecked();
  });
});
