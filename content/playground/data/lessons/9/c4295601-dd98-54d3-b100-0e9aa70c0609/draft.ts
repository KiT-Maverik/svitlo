// TODO (BLOCKER): Complete the separately authorized Lesson Stage 1 from this Course seed, obtain its required review, and replace this seed with approved Lesson authoring before removing the marker.
import type { CourseWorkflowLessonSeed } from '@svitlo/engine/build';

// prettier-ignore
export const lessonSeed = {
  "config": {
    "type": "lesson",
    "slug": "combinedPractice",
    "skills": [
      "00000000-0000-4000-8000-000000000015",
      "00000000-0000-4000-8000-000000000008"
    ],
    "locale": {
      "title": "Light and shape observations"
    },
    "params": {
      "age": {
        "min": 12,
        "max": 16
      },
      "quizRequiredForCompletion": true
    },
    "id": "c4295601-dd98-54d3-b100-0e9aa70c0609"
  },
  "proposal": {
    "objective": "Predict a shadow in a simple light path and recognize a circle in an independent unfamiliar example.",
    "depth": "Qualitative application of both target Skills, independently assessed; no numerical optics or proofs.",
    "sequenceReason": "Finish the sequence with transfer after the light and circle activities.",
    "assessmentEvidence": "Own a small independent Question Bank with separate prediction/explanation and circle-classification evidence; an enabled Quiz checks both independently. Own a Flashcard Bank for retrieval of light-path and circle-defining features; a short Flashcards Section precedes the Quiz. No borrowed or invented Question IDs.",
    "assessment": {
      "questionBankRequired": true,
      "flashcardBankRequired": true,
      "quizSectionRequired": true,
      "flashcardsSectionRequired": true
    },
    "methodology": "Ages 12–16; prerequisite concepts are straight-line propagation in a uniform medium and recognition of circles. Provide a short recall prompt, a light source and opaque obstacle with a screen, and independent circle-versus-oval examples. Explain that opaque objects block direct light and can cast a shadow; distinguish the shape of an object from a shadow projection and do not claim shadows are always the same shape. Ask learners to predict which region is shadowed and justify the prediction, then separately identify a circle among contrasting outlines. Give error-directed feedback on bent-ray and round-looking-oval misconceptions. Use verbal geometric descriptions, keyboard navigation and equivalent nonvisual evidence without revealing answers; no external network. Keep the Lesson Course-neutral and suitable for standalone practice after the stated prerequisites. Independently own both banks and select real reviewed members later; use Flashcards for retrieval and Quiz for independent evidence of each Skill. English source and planned Ukrainian localization; verify the two Playground Skill definitions. No quantitative refraction or proof."
  },
  "languageContext": {
    "document": "en",
    "planned": [
      "en",
      "uk"
    ]
  }
} as const satisfies CourseWorkflowLessonSeed;
