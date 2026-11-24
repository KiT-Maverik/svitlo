import { defineSubtitles } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

export const answerCaptions = defineSubtitles<"answerCaptions", typeof languages>({
  "id": "63a311a2-de5d-4cf1-bdda-37c3fcd992c3",
  "slug": "answerCaptions",
  "type": "subtitles",
  "params": {},
  "locale": {
  "fileName": {
  "en": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for subtitles 63a311a2-de5d-4cf1-bdda-37c3fcd992c3.
"00000000-0000-0000-0000-000000000000.vtt"
}
}
});
// TODO (BLOCKER): Remove the temporary Subtitles specification after this content item is implemented and verified.
/**
 * # purpose
 *
 * Access the color comparison as timed text.
 *
 * # specification
 *
 * Produce UTF-8 WebVTT: 00:00:00.000 --> 00:00:03.000 first sentence; 00:00:03.000 --> 00:00:06.000 second sentence. A red circle becomes a red square. A blue square becomes a blue circle.
 *
 * # accessibility
 *
 * Standalone keyboard-accessible WebVTT resource link, not a synchronized video track. The same two descriptions appear in preceding learner-facing prose; reading or downloading the VTT is optional.
 *
 * # offline
 *
 * Bundle local VTT and equivalent text.
 *
 * # readiness
 *
 * production-pending
 *
 * # script
 *
 * A red circle becomes a red square. A blue square becomes a blue circle.
 */
