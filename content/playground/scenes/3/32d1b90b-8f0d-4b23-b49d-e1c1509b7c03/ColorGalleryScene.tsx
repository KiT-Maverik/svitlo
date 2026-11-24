'use client';

import type { ContentBlock_Scene_Props } from '@svitlo/engine/runtime';
import styles from './ColorGalleryScene.module.css';

export type ColorGallerySceneProps = {
  locales: ContentBlock_Scene_Props['locale']['value'];
};

// TODO (BLOCKER): Implement and accessibly test the reviewed Scene 32d1b90b-8f0d-4b23-b49d-e1c1509b7c03 before release; remove the specification comment only after implementation.
// BEGIN REVIEWED SCENE SPECIFICATION (remove after implementation)
// Render one large sample, initially a blue circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial blue circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer. Ask learners to predict each change before choosing it; controls must allow any order without a required sequence or score. Use a single swatch and ordinary CSS or lightweight SVG, not a canvas animation. Each color button exposes whether it is selected (aria-pressed); the shape button toggles the shape, and Reset is always available. On entry, including after a Carousel slide remount, restore the declared initial state; do not depend on saved state. Keep feedback visible without moving focus.
// END REVIEWED SCENE SPECIFICATION
export function ColorGalleryScene({ locales }: ColorGallerySceneProps) {
  void locales;
  return <section className={styles.root} aria-hidden="true" />;
}
