# Temporary bootstrap: typed Question and Flashcard Bank source orchestration

**DELETE this bootstrap file as part of the implementation.** It exists solely
to open a distinct Draft child PR targeting integration PR #775.

Implement four separate, directly named Engine build-time entrypoints:
- materializeQuestionBankDraft()
- materializeQuestionBank()
- materializeFlashcardBankDraft()
- materializeFlashcardBank()

Use only the canonical QuestionBankWorkflowStage1/MaterializerInput and
FlashcardBankWorkflowStage1/MaterializerInput types being integrated under
PR #786, without inventing replacement authoring shapes.

Stage 1 draft handoffs remain bank-owned, Lesson-UUID-addressed editable
TypeScript, not completed Question/Flashcard Configurators or resources.
Final bank materializers compose the existing concrete Question-kind and
Flashcard/FlashcardSide source materializers, preserving the full bank,
selections, relationships, identities and safe SHA-pinned staged index.ts
transition without blindly overwriting authored source.

Do not edit #787's Course-to-Lesson Stage1 materializeLessonDraft() boundary,
or rewrite existing materializeLesson(), materializeFlashcard() per Card, or
concrete per-Question materializers.

Read current repository instructions, PR body, source contracts and tests.
This bootstrap does NOT implement any functions or claim verified test results.
