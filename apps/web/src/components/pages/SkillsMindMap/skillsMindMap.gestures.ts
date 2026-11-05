/** Pure coordinates for panning and pinch-to-zoom the Skills canvas. */
export interface Point2D {
  readonly x: number;
  readonly y: number;
}

export interface SkillMapView {
  readonly zoom: number;
  readonly pan: Point2D;
}

export const MIN_SKILL_ZOOM = 0.01;
export const MAX_SKILL_ZOOM = 2.5;

export function clampSkillZoom(value: number): number {
  return Math.min(MAX_SKILL_ZOOM, Math.max(MIN_SKILL_ZOOM, value));
}

export function gesturePair(a: Point2D, b: Point2D): { midpoint: Point2D; distance: number } {
  return {
    midpoint: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    distance: Math.hypot(b.x - a.x, b.y - a.y),
  };
}

/**
 * Keep the same world-space point under a moving gesture midpoint as the map
 * changes scale. Coordinates use the viewport's top-left as the origin.
 * Works for both a stationary pinch midpoint and simultaneous two-finger pan.
 */
export function moveAndScaleSkillMap(
  view: SkillMapView,
  previousMidpoint: Point2D,
  nextMidpoint: Point2D,
  nextZoom: number,
  viewport: { readonly width: number; readonly height: number },
): SkillMapView {
  const zoom = clampSkillZoom(nextZoom);
  const ratio = zoom / view.zoom;
  const centerX = viewport.width / 2;
  const centerY = viewport.height / 2;
  return {
    zoom,
    pan: {
      x: nextMidpoint.x - centerX - ratio * (previousMidpoint.x - centerX - view.pan.x),
      y: nextMidpoint.y - centerY - ratio * (previousMidpoint.y - centerY - view.pan.y),
    },
  };
}

/** One-finger and mouse dragging (no scaling). */
export function panSkillMap(view: SkillMapView, dx: number, dy: number): SkillMapView {
  return { zoom: view.zoom, pan: { x: view.pan.x + dx, y: view.pan.y + dy } };
}
