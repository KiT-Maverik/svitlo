'use client';

import type { ContentBlock_Scene_Props } from '@svitlo/engine/runtime';

/** Draft-only, invariant and accessible replacement for unimplemented Scenes. */
export type SceneStubProps = {
  locales: ContentBlock_Scene_Props['locale']['value'];
};

export function SceneStub({ locales }: SceneStubProps) {
  // Never pretend draft data is learner-ready copy or an implemented interaction.
  void locales;
  return <div role="status" lang="en" dir="ltr">Not implemented</div>;
}
