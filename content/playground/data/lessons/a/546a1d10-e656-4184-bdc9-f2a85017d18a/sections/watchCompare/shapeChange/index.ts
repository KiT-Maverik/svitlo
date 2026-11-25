import { defineVideo } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const shapeChange = defineVideo<"shapeChange", typeof languages>({
  "id": "3425043b-47e9-4961-a869-4152fcee84a3",
  "slug": "shapeChange",
  "type": "video",
  "params": {},
  "locale": {
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for video 3425043b-47e9-4961-a869-4152fcee84a3.
"00000000-0000-0000-0000-000000000000.mp4",
  "posterFileName": // TODO (BLOCKER): Supply verified posterFileName asset (reserved Nil UUID is not an asset) for video 3425043b-47e9-4961-a869-4152fcee84a3.
"00000000-0000-0000-0000-000000000000.webp",
  "title": {
  "en": "Compare red and blue"
},
  "label": {
  "en": "Short silent color comparison"
},
  "fallback": {
  "offline": {
  "en": "A red circle becomes a red square. A blue square becomes a blue circle."
},
  "unavailable": {
  "en": "A red circle becomes a red square. A blue square becomes a blue circle."
},
  "playbackError": {
  "en": "A red circle becomes a red square. A blue square becomes a blue circle."
},
  "retry": {
  "en": "Try again"
}
}
}
});
// TODO (BLOCKER): Remove the temporary Video specification after this content item is implemented and verified.
/**
 * # purpose
 *
 * Observe color while shapes change.
 *
 * # specification
 *
 * Create a silent, learner-controlled 6-second 640×400 local MP4 and matching WebP poster showing the starting red circle. 0–3 seconds: hold the red circle, make a single non-flashing cut to the red square, and hold the result. 3–6 seconds: hold the blue square, make a single non-flashing cut to the blue circle, and hold the result. Use neutral background, no zoom, blinking, fast camera movement or automatic repeat. Both starting and ending shapes must be clearly visible.
 *
 * # accessibility
 *
 * No speech, flashing or baked text. Adjacent learner-facing prose describes both changes completely; the standalone WebVTT resource provides the same descriptions. Playback is optional, with native pause/play controls. Learners who avoid motion use the still examples and text.
 *
 * # offline
 *
 * Bundle video and poster; retain the textual description.
 *
 * # readiness
 *
 * production-pending
 *
 * # storyboard
 *
 * 0–3 seconds: hold the red circle, make a single non-flashing cut to the red square, and hold the result. 3–6 seconds: hold the blue square, make a single non-flashing cut to the blue circle, and hold the result. Use neutral background, no zoom, blinking, fast camera movement or automatic repeat. Both starting and ending shapes must be clearly visible.
 *
 * # script
 *
 * A red circle becomes a red square. A blue square becomes a blue circle.
 */
