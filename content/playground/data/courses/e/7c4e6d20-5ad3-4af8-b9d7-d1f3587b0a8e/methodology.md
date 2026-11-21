# Playground E2E · Light, Shapes and Color

## Course methodology

### Purpose

A deliberately varied, non-production E2E Course fixture. Validate all Course/Lesson/Question/Flashcard workflows, module/chapter/episode composition, reused and newly planned Lessons, independent Question Bank links, per-Lesson completion policy, real Section/ContentBlock creation, media TODOs and en/uk translation review.

### Audience

Developers and specialist reviewers exercising a simulated curriculum for ages 8–11, grades 3–5. End-user language and accessibility requirements still apply. It is NOT approved teaching material, and synthetic taxonomy entries are not education-standard evidence.

### Teaching approach

Progress from recognition through comparison, guided manipulation and independent assessment: first shapes, then light and colors, finally a cross-topic check. A Course-owned Episode adds optional narrative without changing standalone Lesson meaning. Contrast optional/required quizzes, external bank selection, flashcard-only work and media-rich Scenes. Every Lesson slot specifies exact intended Section types and ContentBlock types; the Lesson Flow, not Course Stage 3, authors their final Configs.

### Depth

Broad synthetic coverage with narrowly defined, observable recognition and explanation. Exercise all currently runtime-supported Section kinds (content, practice, learningFlow, codingTask, flashcards, quiz) across different Lessons; cover the ten ContentBlocks (text, markdown, code, image, audio, video, youtube, carousel, checkpoint, scene). Build-only Quest is explicitly not treated as operational runtime coverage.

### Accessibility

Keyboard and switch-compatible interaction, visual contrast, alt text, audio descriptions or transcripts, captions for videos, a nonvisual equivalent for each Scene, reduced motion, and small-screen responsive layout are required at Lesson implementation. Missing media must be visible unresolved TODO blockers rather than invented finished assets.

### Scope

Exactly two Modules (one with two Chapters and one with one Chapter), one root Chapter, one root Episode, direct root and module Lessons, chapter Lessons, two distinct reused existing Lessons (one unchanged, one Course-only override), eight new Lesson slots with future UUID allocation, distinct Quiz/Flashcards bank decisions, and assessment-only Lessons referencing upstream banks. Educational copy is minimal, but functional block and section coverage is mandatory later.

### Entry conditions

Basic ability to recognize familiar red objects and circles, follow short instructions, and choose accessible input controls. The Course's prerequisite UUIDs represent a test of skill prerequisite propagation; this fixture must not pretend mastery of every taxonomy descendant.

### Source notes

Only English is authored at this point. Ukrainian is planned, not translated or approved. No verified EducationStandard is claimed. Source Skill/Group/Domain UUIDs are from content/playground/data/skills/testColors, testShapes and testLight. Existing Lessons lightDiscovery and howLightMoves are reused by exact UUID; the first is pure reuse and the second has explicit inline Course-only edits that Stage 5 transforms into a stateless Build API override. Future Question/Flashcard IDs must come from approved actual banks; do not insert fake UUIDs here.

## Learning outcomes

- skills: 00000000-0000-4000-8000-000000000015, 00000000-0000-4000-8000-000000000011, 00000000-0000-4000-8000-000000000004
- skillGroups: 00000000-0000-4000-8000-000000000013
- skillDomains: 00000000-0000-4000-8000-000000000007

Teach observable light propagation, polygon identification and selected color classification. Group/Domain references define broad scope, not mastery of every nested Skill.

## Prerequisites

- skills: 00000000-0000-4000-8000-000000000001, 00000000-0000-4000-8000-000000000008
- skillGroups: 00000000-0000-4000-8000-000000000003

Recognition of familiar color and simple shape before comparison and transfer; the group reference tests group-level prerequisites, not blanket proof of mastery.

### Lesson lightDiscovery — Light Lab · Discovery (existing Lesson)

Lesson UUID: f760e7b7-9f77-5027-89ce-4e40d9d031a1

Objective: Reuse a verified standalone teaching Lesson without copying its source; establish a known Lesson reference for matching and localization tests.

Skills: 00000000-0000-4000-8000-000000000015

sequenceReason: Root-level Lesson reuse after Shape Studio and before Color and Light, exercising direct Course placement without a Module wrapper.

matchingRationale: Reuses the authored Playground lightDiscovery Lesson and its verified Light Skill; its supported language tuple includes en and uk. The Course does not modify or re-author its Sections or bank.
