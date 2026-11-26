import { defineSubtitles } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

export const shadowSubtitles = defineSubtitles<"shadowSubtitles", typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94719",
  "slug": "shadowSubtitles",
  "type": "subtitles",
  "params": {},
  "locale": {
  "fileName": // TODO (BLOCKER): Supply verified fileName asset (reserved Nil UUID is not an asset) for subtitles e6073d92-4b8c-4c6f-8920-6ab25ca94719.
"00000000-0000-0000-0000-000000000000.vtt"
}
});
/*
 * TODO (BLOCKER): Remove the temporary Subtitles specification after this content item is implemented and verified.
 *
 * # specification
 *
 * Author WebVTT captions aligned to the finished video or audio.
 */
