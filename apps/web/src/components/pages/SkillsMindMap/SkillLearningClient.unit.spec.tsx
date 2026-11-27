import { render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SkillLearningClient } from './SkillLearningClient';
import { TEST_SKILL_NODES_UK } from './skillsData.fixture';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
describe('Skill learning destination', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    document.documentElement.lang = 'uk';
    window.history.replaceState({}, '', '/skills/' + uuid(3) + '/learn?lang=uk');
    // These components receive resolved props from Next.js server routes.
    // Any client fetch is a regression, not a successful mocked API response.
    vi.stubGlobal('fetch', vi.fn(() => {
      throw new Error('Unexpected client-side Skills fetch');
    }));
  });

  afterEach(() => {
    vi.stubGlobal('fetch', originalFetch);
    window.history.replaceState({}, '', '/');
  });

  it('loads one locale, selects the UUID and does not invent linked content', async () => {
    render(<SkillLearningClient node={TEST_SKILL_NODES_UK[0].children[0].children[0]} language="uk" />);
    expect(await screen.findByRole('heading', { name: 'Червоний' })).toBeInTheDocument();
    expect(screen.getByText('Розпізнавати червоний.')).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: /Демонстраційний рівень/ })).toHaveAttribute('aria-valuenow');
    expect(screen.getByText(/немає пов'язаних матеріалів/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Повернутися до аналітики навичок/ })).toHaveAttribute(
      'href',
      '/skillAnalytics?lang=uk',
    );
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('reports an unknown skill rather than substituting a different lesson', async () => {
    render(<SkillLearningClient node={null} language="uk" />);
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('не знайдено');
    expect(within(alert).getByRole('link', { name: /Повернутися/ })).toHaveAttribute('href', '/skillAnalytics');
  });
});
