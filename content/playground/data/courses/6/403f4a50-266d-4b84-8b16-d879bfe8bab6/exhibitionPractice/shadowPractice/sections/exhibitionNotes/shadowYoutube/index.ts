import { defineYoutube } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

/*
 * TODO (BLOCKER): Verify external video access, rights, captions and language/offline alternatives for youtube e6073d92-4b8c-4c6f-8920-6ab25ca94717; remove this temporary brief after documented media QA.
 *
 * specification: Verify a genuinely suitable captioned video and supply its URL only after review.
 */
export const shadowYoutube = defineYoutube<"shadowYoutube", typeof languages>({
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94717",
  "slug": "shadowYoutube",
  "type": "youtube",
  "params": {
  "mode": "link"
},
  "locale": {
  "label": {
  "en": "Optional external video about shadows"
},
  "href": // TODO (BLOCKER): Supply and verify the YouTube URL, access and captions before publication.
"00000000-0000-0000-0000-000000000000"
}
});
