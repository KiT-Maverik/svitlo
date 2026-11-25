import { defineYoutube } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

// TODO (BLOCKER): Verify external video (availability, appropriateness, access, captions, language/offline alternative, link) during Lesson Stage 6 media work for youtube 90115025-1794-47da-b101-cde8d5e8e397.
// Reviewed external-video context (remove with verification TODO): {"purpose":"Optional extension: recognize red and blue on familiar objects.","specification":"External publisher: Khan Academy Kids, Red, Blue, and Yellow (July 10, 2023). Public listing and description identify red, blue and yellow, including a cherry example. Full playback, captions, embedding permission and regional availability remain to be verified during resource production. Yellow is incidental to this Lesson and is not an assessed target. Do not copy the video into assets.","accessibility":"Do not require watching the video to progress; use the equivalent local color examples.","offline":"Skip the external video and use the local explanation; no network dependency for essential learning.","readiness":"production-pending"}
export const externalEmbed = defineYoutube<"externalEmbed", typeof languages>({
  "id": "90115025-1794-47da-b101-cde8d5e8e397",
  "slug": "externalEmbed",
  "type": "youtube",
  "params": {
  "mode": "embed"
},
  "locale": {
  "href": "https://www.youtube.com/watch?v=1qtPcVpkaKU",
  "title": {
  "en": "More color examples"
},
  "label": {
  "en": "Red, Blue, and Yellow — Khan Academy Kids"
},
  "fallback": {
  "offline": {
  "en": "Use the local examples: a red circle and a blue square. Objects may have the same color even when their shapes differ."
},
  "unavailable": {
  "en": "The optional video is unavailable. Continue with the local examples."
},
  "retry": {
  "en": "Try again"
}
}
}
});
