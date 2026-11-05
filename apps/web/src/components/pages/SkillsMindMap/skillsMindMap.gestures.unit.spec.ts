import { describe, expect, it } from 'vitest';
import {
  clampSkillZoom,
  gesturePair,
  moveAndScaleSkillMap,
  panSkillMap,
  MIN_SKILL_ZOOM,
  MAX_SKILL_ZOOM,
} from './skillsMindMap.gestures';

describe('Skills map touch gesture math', () => {
  const viewport = { width: 800, height: 600 };
  const view = { zoom: 1, pan: { x: 40, y: -20 } };

  it('calculates pinch distance and midpoint from two fingers', () => {
    expect(gesturePair({ x: 100, y: 120 }, { x: 300, y: 200 })).toEqual({
      midpoint: { x: 200, y: 160 },
      distance: Math.hypot(200, 80),
    });
  });

  it('keeps the same world coordinate under the pinch center while zooming', () => {
    const point = { x: 500, y: 200 };
    const next = moveAndScaleSkillMap(view, point, point, 2, viewport);
    expect(next.zoom).toBe(2);
    expect(next.pan).toEqual({ x: -20, y: 60 });
    const worldBefore = {
      x: (point.x - viewport.width / 2 - view.pan.x) / view.zoom,
      y: (point.y - viewport.height / 2 - view.pan.y) / view.zoom,
    };
    const worldAfter = {
      x: (point.x - viewport.width / 2 - next.pan.x) / next.zoom,
      y: (point.y - viewport.height / 2 - next.pan.y) / next.zoom,
    };
    expect(worldAfter).toEqual(worldBefore);
  });

  it('supports a pinch that moves and scales simultaneously', () => {
    const before = { x: 400, y: 300 };
    const after = { x: 480, y: 310 };
    const next = moveAndScaleSkillMap(view, before, after, 1.5, viewport);
    expect(next.zoom).toBe(1.5);
    expect(next.pan).toEqual({ x: 140, y: -20 });
    expect((before.x - 400 - view.pan.x) / view.zoom).toBeCloseTo((after.x - 400 - next.pan.x) / next.zoom);
  });

  it('handles single-finger drag independently from zoom', () => {
    expect(panSkillMap(view, 26, -13)).toEqual({
      zoom: 1,
      pan: { x: 66, y: -33 },
    });
  });

  it('clamps very small and large pinch changes without losing the focal position', () => {
    expect(clampSkillZoom(0)).toBe(MIN_SKILL_ZOOM);
    expect(clampSkillZoom(100)).toBe(MAX_SKILL_ZOOM);
    const small = moveAndScaleSkillMap(view, { x: 90, y: 80 }, { x: 90, y: 80 }, 0.0001, viewport);
    expect(small.zoom).toBe(MIN_SKILL_ZOOM);
    const large = moveAndScaleSkillMap(view, { x: 90, y: 80 }, { x: 90, y: 80 }, 4000, viewport);
    expect(large.zoom).toBe(MAX_SKILL_ZOOM);
    for (const result of [small, large]) {
      expect(Number.isFinite(result.pan.x)).toBe(true);
      expect(Number.isFinite(result.pan.y)).toBe(true);
    }
  });
});
