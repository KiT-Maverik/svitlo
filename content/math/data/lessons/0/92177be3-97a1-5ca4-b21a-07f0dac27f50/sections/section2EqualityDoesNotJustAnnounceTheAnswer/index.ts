import { defineContentSection, defineMarkdown, defineScene, defineText } from '@svitlo/engine/build';

export const section2EqualityDoesNotJustAnnounceTheAnswer_Section = defineContentSection({
  id: "7d878524-7eea-41af-853d-c4ad86502026",
  slug: "section2EqualityDoesNotJustAnnounceTheAnswer",
  type: "content",
  params: {},
  locale: {
    title: {
      en: "Equality does not just announce the answer"
    },
    navigationLabel: {
      en: "Equality does not just announce the answer"
    }
  },
  content: {
    items: {
      section2Markdown1: defineMarkdown({
        id: "31d32f0c-d332-4ed8-8be7-d4a59906e571",
        slug: "section2Markdown1",
        type: "markdown",
        params: {},
        locale: {
          value: {
            en: "3 + 2 = 4 + 1 is true: five on each side. 5 = 2 + 3 is also true: the answer need not be on the right."
          }
        }
      }),
      section2Scene2: defineScene({
        id: "7f4e090a-3ab2-48c8-8e2b-b0334bd731f1",
        slug: "section2Scene2",
        type: "scene",
        params: {},
        locale: {
          value: {
            en: {
              instruction: "3 + 2 = 4 + 1 is true: five on each side. 5 = 2 + 3 is also true: the answer need not be on the right."
            }
          }
        }
      }),
      section2Text3: defineText({
        id: "7f87f229-29d2-4d05-8bbc-3ee2bde901ce",
        slug: "section2Text3",
        type: "text",
        params: {},
        locale: {
          value: {
            en: "What does the sign say?"
          }
        }
      })
    },
    order: [
      "section2Markdown1",
      "section2Scene2",
      "section2Text3"
    ]
  }
});
