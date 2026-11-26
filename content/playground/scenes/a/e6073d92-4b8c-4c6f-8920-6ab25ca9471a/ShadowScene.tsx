'use client';

import type { ContentBlock_Scene_Props } from '@svitlo/engine/runtime';
import styles from './ShadowScene.module.css';

export type ShadowSceneProps = {
  locales: ContentBlock_Scene_Props['locale']['value'];
};

/*
 * TODO (BLOCKER): Implement and accessibly test the reviewed Scene e6073d92-4b8c-4c6f-8920-6ab25ca9471a before release; remove this temporary brief only after implementation is verified.
 *
 * Implement a keyboard-operable Scene with textual shadow feedback and reduced motion.
 */
export function ShadowScene({ locales }: ShadowSceneProps) {
  void locales;
  return <section className={styles.root} aria-hidden="true" />;
}
