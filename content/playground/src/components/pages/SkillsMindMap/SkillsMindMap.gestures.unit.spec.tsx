import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SkillsMindMap } from './SkillsMindMap';
import { SkillsPageSettingsProvider } from './SkillsPageSettingsContext';
import { fixtureJsonForSkillUrl, TEST_SKILLS_DOMAIN_SLUGS } from './skillsData.fixture';

type PointerTest = {
  id: number;
  x: number;
  y: number;
  pointerType?: 'touch' | 'mouse';
};

function pointer(
  target: Element,
  type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel',
  { id, x, y, pointerType = 'touch' }: PointerTest,
) {
  // JSDOM has no full PointerEvent implementation: synthesize the event's
  // standard properties for React's pointer event plugin.
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(event, { pointerId: id, pointerType, clientX: x, clientY: y, button: 0 });
  fireEvent(target, event);
}

describe('Skills mind-map touch gestures', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    document.documentElement.lang = 'uk';
    window.history.replaceState({}, '', '/skillAnalytics');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        const data: unknown = fixtureJsonForSkillUrl(url);
        return { ok: data !== null, status: data !== null ? 200 : 404, json: async () => data };
      }),
    );
  });
  afterEach(() => {
    vi.stubGlobal('fetch', originalFetch);
    window.history.replaceState({}, '', '/');
  });

  async function map() {
    render(
      <SkillsPageSettingsProvider>
        <SkillsMindMap domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} />
      </SkillsPageSettingsProvider>,
    );
    await screen.findByTestId('skill-node-testRed');
    const viewport = screen.getByTestId('skills-map-viewport');
    const captured = new Set<number>();
    Object.defineProperties(viewport, {
      setPointerCapture: {
        configurable: true,
        value: (id: number) => {
          captured.add(id);
        },
      },
      hasPointerCapture: { configurable: true, value: (id: number) => captured.has(id) },
      releasePointerCapture: {
        configurable: true,
        value: (id: number) => {
          captured.delete(id);
        },
      },
      getBoundingClientRect: {
        configurable: true,
        value: () => ({ left: 0, top: 0, right: 800, bottom: 600, width: 800, height: 600 }),
      },
    });
    return { viewport, world: screen.getByTestId('skills-map-world'), captured };
  }

  it('pinches to zoom around the two fingers, then switches to one-finger dragging', async () => {
    const { viewport, world, captured } = await map();
    const initial = Number(world.getAttribute('data-zoom'));
    pointer(viewport, 'pointerdown', { id: 1, x: 300, y: 300 });
    pointer(viewport, 'pointerdown', { id: 2, x: 500, y: 300 });
    expect(captured.has(1)).toBe(true);
    expect(captured.has(2)).toBe(true);
    pointer(viewport, 'pointermove', { id: 2, x: 600, y: 300 });
    expect(Number(world.getAttribute('data-zoom'))).toBeCloseTo(initial * 1.5, 7);
    const afterPinchPan = Number(world.getAttribute('data-pan-x'));
    pointer(viewport, 'pointerup', { id: 2, x: 600, y: 300 });
    expect(captured.has(2)).toBe(false);
    pointer(viewport, 'pointermove', { id: 1, x: 320, y: 300 });
    expect(Number(world.getAttribute('data-pan-x'))).toBeCloseTo(afterPinchPan + 20, 7);
    expect(Number(world.getAttribute('data-zoom'))).toBeCloseTo(initial * 1.5, 7);
    pointer(viewport, 'pointerup', { id: 1, x: 320, y: 300 });
    expect(captured.size).toBe(0);
  });

  it('does not start dragging for an ordinary touch tap on a Skill title', async () => {
    const { viewport } = await map();
    const leaf = screen.getByTestId('skill-node-testRed');
    const title = leaf.querySelector('button')!;
    pointer(title, 'pointerdown', { id: 7, x: 200, y: 200 });
    pointer(title, 'pointerup', { id: 7, x: 200, y: 200 });
    fireEvent.click(title);
    expect(leaf).toHaveAttribute('data-expanded', 'true');

    pointer(title, 'pointerdown', { id: 8, x: 200, y: 200 });
    pointer(viewport, 'pointermove', { id: 8, x: 216, y: 200 });
    pointer(viewport, 'pointerup', { id: 8, x: 216, y: 200 });
    fireEvent.click(title);
    expect(leaf).toHaveAttribute('data-expanded', 'true');
  });

  it('preserves mouse drag and wheel zoom at the pointer position', async () => {
    const { viewport, world } = await map();
    const x0 = Number(world.getAttribute('data-pan-x'));
    pointer(viewport, 'pointerdown', { id: 1, x: 200, y: 200, pointerType: 'mouse' });
    pointer(viewport, 'pointermove', { id: 1, x: 240, y: 230, pointerType: 'mouse' });
    pointer(viewport, 'pointerup', { id: 1, x: 240, y: 230, pointerType: 'mouse' });
    expect(Number(world.getAttribute('data-pan-x'))).toBeCloseTo(x0 + 40);
    const z0 = Number(world.getAttribute('data-zoom'));
    fireEvent.wheel(viewport, { deltaY: -120, clientX: 300, clientY: 200 });
    expect(Number(world.getAttribute('data-zoom'))).toBeGreaterThan(z0);
  });
});
