/** Repository-owned synthetic Stage inputs for real isolated worker regression.
 * No authored textbook or #806/#813 source is used or changed by these tests.
 * These are source objects: all generated plans come from the real Engine.
 */
export const courseId = '663572e7-bd85-4516-86e2-3de07d209e03';
export const reusedLessonId = '1368c1c9-2fd8-4007-b2c8-6bbfd98d5111';
export const overriddenLessonId = '1368c1c9-2fd8-4007-b2c8-6bbfd98d5112';
export const lessonId = '12345678-1234-4234-8234-123456789001';
export const bankOwnerId = 'b775647f-203d-481a-a1c7-4d331c000200';
export const skillId = '663572e7-bd85-4516-86e2-3de07d209e04';
const id = n => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const sha = c => c.repeat(40);
export const assessment = {
  questionBankRequired: false,
  flashcardBankRequired: false,
  quizSectionRequired: false,
  flashcardsSectionRequired: false,
};
export function independentLessonConfig(sourceId = reusedLessonId, slug = 'independentLesson') {
  return {
    id: sourceId,
    type: 'lesson',
    slug,
    skills: [skillId],
    params: {
      languages: ['uk'],
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { uk: 'Незалежний урок' } },
    children: [],
  };
}
export function lessonStage2() {
  return {
    config: {
      id: lessonId,
      type: 'lesson',
      slug: 'basics',
      skills: [skillId],
      params: {
        quizRequiredForCompletion: false,
        sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
      },
      locale: { title: { uk: 'Основи' } },
      children: ['intro'],
      intro: {
        config: {
          id: '12345678-1234-4234-8234-123456789002',
          slug: 'intro',
          type: 'content',
          params: {},
          locale: { title: { uk: 'Вступ' }, navigationLabel: '1' },
          children: ['prompt'],
          prompt: {
            config: {
              id: '12345678-1234-4234-8234-123456789003',
              slug: 'prompt',
              type: 'text',
              params: {},
              locale: { value: { uk: 'Прочитай цей текст' } },
            },
          },
        },
        production: { purpose: 'Introduce the concept', specification: 'Text-only source' },
      },
    },
    production: {
      languages: { document: 'uk', planned: ['uk'] },
      methodology: 'Introduce the first idea',
      objective: 'Recall the idea',
      depth: 'Introductory',
      sequenceReason: 'Start from a concrete observation',
      assessmentEvidence: 'Explain the idea',
      assessment: { ...assessment },
    },
  };
}
export function courseStage3() {
  const matching = sourceId => ({
    sourceSha: sha('a'),
    methodologySourcePath: 'content/math/data/lessons/' + sourceId.at(-1) + '/' + sourceId + '/methodology.md',
    matchingRationale: 'Reviewed Skill and age match',
    languageEvidence: 'Ukrainian source available',
  });
  const baseExisting = (sourceId, sourceExportName) => ({
    kind: 'existing',
    existing: { id: sourceId },
    matching: matching(sourceId),
    assessment: { ...assessment },
    sourceExportName,
  });
  const patch = { params: { sections: { allowSkipping: false } } };
  const newLesson = {
    config: {
      type: 'lesson',
      slug: 'newLesson',
      skills: [skillId],
      params: { quizRequiredForCompletion: false },
      locale: { title: { uk: 'Новий урок' } },
    },
    production: {
      kind: 'new',
      methodology: 'Prepare a later standalone Lesson',
      objective: 'Identify an observable pattern',
      depth: 'Introductory',
      sequenceReason: 'First learn to observe',
      assessmentEvidence: 'Describe the pattern',
      assessment: { ...assessment },
    },
  };
  return {
    config: {
      id: courseId,
      type: 'course',
      slug: 'skyBasics',
      params: { age: { min: 6, max: 10 } },
      locale: { title: { uk: 'Небо' }, description: { uk: 'Спостереження' } },
      children: ['newLesson', 'reused', 'overridden', 'episodeOne'],
      newLesson,
      reused: {
        config: { type: 'lesson', slug: 'reused', skills: [skillId] },
        production: { ...baseExisting(reusedLessonId, 'independentLesson') },
      },
      overridden: {
        config: { type: 'lesson', slug: 'overridden', skills: [skillId] },
        production: {
          ...baseExisting(overriddenLessonId, 'overriddenLesson'),
          sourcePatch: patch,
          overrideRationale: 'Adjust Course-local navigation without modifying the Lesson',
        },
      },
      episodeOne: {
        config: { type: 'episode' },
        production: { focus: 'Observation and reflection', purpose: 'Narrative transition to practice' },
      },
    },
    production: {
      languages: { document: 'uk', planned: ['uk'] },
      methodology: {
        purpose: 'Observe the sky',
        audience: 'Primary learners',
        approach: 'Observe and explain',
        depth: 'Introductory',
        accessibility: 'Keyboard and spoken alternatives',
        scope: 'Daytime observation',
        entryConditions: 'No astronomy experience required',
        sourceNotes: 'Reviewed classroom evidence',
      },
      outcomes: { explanation: 'Recognize patterns' },
      prerequisites: { explanation: 'None' },
      standardsAlignment: [],
      openDecisions: {},
    },
  };
}
export function episodeStage2(episodeId) {
  return {
    config: {
      id: episodeId,
      type: 'episode',
      slug: 'episodeOne',
      locale: { title: { uk: 'Зміна сцени' } },
      children: ['intro'],
      intro: {
        config: {
          id: '663572e7-bd85-4516-86e2-3de07d209e05',
          type: 'content',
          slug: 'intro',
          params: {},
          locale: { title: { uk: 'Початок' }, navigationLabel: '1' },
          children: ['prompt'],
          prompt: {
            config: {
              id: '663572e7-bd85-4516-86e2-3de07d209e06',
              type: 'text',
              slug: 'prompt',
              params: {},
              locale: { value: { uk: 'Подивіться навколо' } },
            },
          },
        },
      },
    },
    production: {
      focus: 'Narrative change',
      purpose: 'Review the sequence',
      placement: {
        courseId,
        path: 'content/episodeOne',
        orderPath: [3],
        reviewedCourseSourceBlobSha: sha('a'),
      },
      languages: { document: 'uk', planned: ['uk'] },
      scenario: {
        audience: 'Learners',
        entrySituation: 'Before',
        exitSituation: 'After',
        continuity: 'Next',
        sceneIntent: 'Illustrate',
        interactionIntent: 'Explore',
        accessibility: 'Text',
        narrativeConstraints: 'No Quiz',
      },
      specification: 'Completed narrative episode',
    },
  };
}
function questionBlock(slug, n) {
  return {
    config: {
      id: id(n),
      type: 'text',
      slug,
      params: {},
      locale: { value: { uk: 'Перевірене формулювання' } },
    },
  };
}
const collection = items => ({ children: Object.keys(items), ...items });
export function questionStage3() {
  const question = {
    config: {
      id: id(10),
      slug: 'promptOne',
      type: 'selectOneAnswer',
      params: { assessmentMethod: 'retrieval', restrictions: [] },
      locale: {},
      content: {
        question: collection({ prompt: questionBlock('prompt', 11) }),
        answers: {
          correct: collection({ correct: questionBlock('correct', 12) }),
          incorrect: collection({ wrong: questionBlock('wrong', 13) }),
          distractors: collection({}),
        },
      },
    },
  };
  return {
    config: {
      ownerLessonId: bankOwnerId,
      questions: { selectOneAnswer: { promptOne: question } },
    },
    production: {
      languages: { document: 'uk', planned: ['uk'] },
      quiz: { kind: 'none', rationale: 'No local Quiz' },
    },
  };
}
export function flashcardStage3() {
  const text = (slug, n) => ({
    id: id(n),
    type: 'text',
    slug,
    params: {},
    locale: { value: { uk: 'Коротке формулювання' } },
  });
  const side = (slug, n) => ({ children: [slug], [slug]: text(slug, n) });
  const card = (slug, n) => ({
    config: {
      id: id(n),
      slug,
      parameters: { tags: ['math'], flags: [] },
      content: { front: side('frontText', n * 10 + 1), back: side('backText', n * 10 + 2) },
    },
    production: {
      recallObjective: 'Recall meaning',
      grounding: 'Verified Lesson',
      directionRationale: 'An independent direction',
      accessibilityRationale: 'Text only',
    },
  });
  return {
    config: {
      flashcards: { items: { alpha: card('alpha', 10), beta: card('beta', 11) }, order: ['alpha', 'beta'] },
      relationships: { items: {}, order: [] },
    },
    production: {
      lesson: {
        id: bankOwnerId,
        sourceSha: sha('a'),
        reference: { path: 'references/flashcards.md', sourceSha: sha('b') },
        languages: { document: 'uk', planned: ['uk'] },
        assessment: { ...assessment },
      },
      analysis: {
        recallObjectives: ['Recall a concept'],
        sourceFactsAndConcepts: ['Addition'],
        misconceptionsAndContrasts: [],
        exclusions: [],
        cardCountRationale: 'Two directions',
        sourceGrounding: 'Reviewed source',
      },
      design: {
        atomicityAudit: 'One objective',
        directionAndDuplicationAudit: 'Distinct retrieval',
        acronymAndListAudit: 'None',
        mediaAndAccessibilityAudit: 'Text alternatives',
        relationshipAudit: 'No relationships required',
      },
      section: { kind: 'notApplicable', rationale: 'Independent bank' },
    },
  };
}
