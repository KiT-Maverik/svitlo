import { placeLesson } from '@svitlo/engine/build';
import { howLightMoves } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { practice } from "./sections/practice";
import { exhibitionNotes } from "./sections/exhibitionNotes";

export const shadowPractice = placeLesson(howLightMoves, {"params": {"sections": {"allowSkipping": false}}, "section": {"items": {practice}, "additionalItems": {exhibitionNotes}, "order": ["content", "practice", "quiz", "exhibitionNotes"] as ["content", "practice", "quiz", "exhibitionNotes"]}} satisfies Parameters<typeof howLightMoves.build.overrides>[0]);

/*
 * TODO (BLOCKER): Implement, test and verify this entire Course-owned Lesson placement override and its resources; delete this temporary specification only after the whole override is complete.
 *
 * Course Lesson placement override rationale:
 *
 * Disable section skipping, adapt the existing practice Section and its Text task, and add a Course-owned exhibitionNotes Section covering Text, Markdown, Code, Image, Video, YouTube, Audio, Subtitles, Scene, Carousel and Checkpoint with nested children. The canonical Lesson identity, Skills, Quiz requirement and banks remain unchanged. This fixture tests both existing-item and newly materialized nested override source without editing the standalone Lesson.
 *
 * section.additionalItems.exhibitionNotes.source (content e6073d92-4b8c-4c6f-8920-6ab25ca94711) production.purpose:
 * Exercise all 11 ContentBlock kinds in one new Course-owned Section, including nested Carousel slides and Checkpoint answer content. All unavailable media/Scenes remain explicit production tasks; the canonical Lesson stays unchanged.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowAudio (audio e6073d92-4b8c-4c6f-8920-6ab25ca94718) production.purpose:
 * Exercise Audio with pending recording.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCarousel (carousel e6073d92-4b8c-4c6f-8920-6ab25ca9471b) production.purpose:
 * Exercise Carousel with Image and Scene slides.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCarousel.config.slides.items.interactiveSlide (scene e6073d92-4b8c-4c6f-8920-6ab25ca9471d) production.purpose:
 * Exercise the Scene materializer.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCarousel.config.slides.items.lampSlide (image e6073d92-4b8c-4c6f-8920-6ab25ca9471c) production.purpose:
 * Exercise the Image materializer.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCheckpoint (checkpoint e6073d92-4b8c-4c6f-8920-6ab25ca9471e) production.purpose:
 * Exercise Checkpoint with a Text question and a Text/Image answer.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCheckpoint.config.content.items.firstObservation (checkpointItem e6073d92-4b8c-4c6f-8920-6ab25ca9471f) production.purpose:
 * Check an unscored qualitative understanding of the light-shadow relation.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCheckpoint.config.content.items.firstObservation.config.answer.config.content.items.answerDiagram (image e6073d92-4b8c-4c6f-8920-6ab25ca94724) production.purpose:
 * Exercise the Image materializer.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCheckpoint.config.content.items.firstObservation.config.answer.config.content.items.explanation (text e6073d92-4b8c-4c6f-8920-6ab25ca94722) production.purpose:
 * Give readable Checkpoint answer feedback.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCheckpoint.config.content.items.firstObservation.config.question (text e6073d92-4b8c-4c6f-8920-6ab25ca94720) production.purpose:
 * Pose a reflective Checkpoint question.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowCode (code e6073d92-4b8c-4c6f-8920-6ab25ca94714) production.purpose:
 * Exercise Code with authored invariant codeAsText.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowDiagram (image e6073d92-4b8c-4c6f-8920-6ab25ca94715) production.purpose:
 * Exercise the Image materializer.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowMarkdown (markdown e6073d92-4b8c-4c6f-8920-6ab25ca94713) production.purpose:
 * Exercise the Markdown ContentBlock.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowScene (scene e6073d92-4b8c-4c6f-8920-6ab25ca9471a) production.purpose:
 * Exercise the Scene materializer.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowSubtitles (subtitles e6073d92-4b8c-4c6f-8920-6ab25ca94719) production.purpose:
 * Exercise Subtitles with a pending caption asset.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowVideo (video e6073d92-4b8c-4c6f-8920-6ab25ca94716) production.purpose:
 * Exercise Video without pretending media exists.
 *
 * section.additionalItems.exhibitionNotes.source.config.content.items.shadowYoutube (youtube e6073d92-4b8c-4c6f-8920-6ab25ca94717) production.purpose:
 * Exercise YouTube without fabricating a link.
 */
