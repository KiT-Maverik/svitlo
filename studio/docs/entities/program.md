# Program (historical terminology)

**Current term: [Course](./course.md).** "Program" was the earlier name for the learning-journey container; the educational Curriculum remains a distinct editorial concept. The Course contract and builder API are now documented in the Course entity. The historical discussion below is retained as context.


**Entity category:** learning-journey orchestration and contextual narrative around independent Lessons.

A **Program** selects, sequences and provides context to reusable [Lessons](./lesson.md). It can define progression, optional story or characters, missions, rewards, contextual transitions and other learner-journey mechanics. These are **Program responsibilities**, not content that must be hard-coded into a Lesson or its [Lesson Content](./lesson-content.md).

## SEMANTIC BOUNDARY

- A Lesson **teaches independently**; a Program **organizes and contextualizes** multiple Lessons or learning activities. A Lesson may be used in different Programs, in a Curriculum, or outside all Programs.
- The Program may add its own narrative to an existing Lesson experience without changing the Lesson's factual content, approved Skill targets or learning outcomes. It does not become the canonical source of the Lesson's explanations or assessments.
- Teaching order _within_ a Lesson remains its instructional design. Larger-scale journey order, plot, missions and program progression belong here.
- A Curriculum is an editorial learning plan; do not equate it automatically with a Program runtime or assume that every Lesson must belong to either.

## IMPLEMENTATION STATUS

This describes the **intended architecture**, not evidence that Program runtime, injections, event APIs, missions or rewards have been implemented. Verify each capability before use; avoid inventing program hooks, fields or platform integrations. Product ideas appear in [System Boundaries](../architecture/system-boundaries.md) and the Program backlog.

Related: [Lesson](./lesson.md), [Lesson Content](./lesson-content.md), [Section](./section.md).
