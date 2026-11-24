// TODO (BLOCKER): Course Lesson seed; complete authorized Lesson Stage 1 before continuing.
import type { CourseWorkflowLessonSeed } from '@svitlo/engine/build';

// prettier-ignore
export const lessonSeed = {
  "config": {
    "type": "lesson",
    "slug": "circleRecognition",
    "skills": [
      "00000000-0000-4000-8000-000000000008"
    ],
    "locale": {
      "title": "Recognizing circles"
    },
    "params": {
      "age": {
        "min": 12,
        "max": 16
      },
      "quizRequiredForCompletion": true
    },
    "id": "80da2dce-ec2f-5f56-b624-bb7f2a80894d"
  },
  "proposal": {
    "objective": "Identify a circle among ovals and polygons and explain the distinguishing feature.",
    "depth": "Qualitative recognition only; no formulas or geometric proofs.",
    "sequenceReason": "Introduce the second target Skill before combined practice.",
    "assessmentEvidence": "Own a small independent Question Bank for classification, counterexample recognition and explanation; include an enabled Quiz to check transfer. No Flashcard Bank or Section: discrimination practice is more useful than memorizing a label.",
    "assessment": {
      "questionBankRequired": true,
      "flashcardBankRequired": false,
      "quizSectionRequired": true,
      "flashcardsSectionRequired": false
    },
    "methodology": "Ages 12–16; assume only everyday shape vocabulary. A circle is a closed curve whose points are equally distant from its centre; distinguish the circular outline from an oval and from straight-sided polygons. Model a familiar circular rim, contrast different-sized circles with elongated ovals and polygons, then ask learners to classify new examples and explain why rotation and size do not alter the shape. Address the misconception that every round-looking object or oval is a circle. Provide verbal shape descriptions conveying equivalent geometry, keyboard-accessible actions and feedback, avoiding color-only distinctions. Use varied examples rather than identical repetitions. The Lesson remains independent of the exhibition narrative. Build a short enabled Quiz from the owned independently authored Question Bank; no invented selections. English source, Ukrainian planned. Verify actual Skill definition testRecognizeCircle. Technical fixture; no formal geometry or curriculum certification."
  },
  "languageContext": {
    "document": "en",
    "planned": [
      "en",
      "uk"
    ]
  }
} as const satisfies CourseWorkflowLessonSeed;
