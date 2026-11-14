import { defineContentSection, defineMarkdown, defineScene, defineText } from '@svitlo/engine/build';

export const repairAFalseEquality = defineContentSection({
  id: "8df044b7-521a-4977-88bd-3599a7573859",
  slug: "repairAFalseEquality",
  type: "content",
  params: {},
  locale: {
    title: {
      en: "Repair a false equality"
    },
    navigationLabel: {
      en: "Repair a false equality"
    }
  },
  content: {
    items: {
      section3Markdown1: defineMarkdown({
        id: "58d47fda-23ac-4786-8e3e-24dbd5460c87",
        slug: "section3Markdown1",
        type: "markdown",
        params: {},
        locale: {
          value: {
            en: "4 + 2 = 4 + 3 is not true: six is not seven."
          }
        }
      }),
      section3Scene2: defineScene({
        id: "b9acf9ed-d7d1-4682-85b7-ea235bcae54c",
        slug: "section3Scene2",
        type: "scene",
        params: {},
        locale: {
          value: {
            en: {
              instruction: "4 + 2 = 4 + 3 is not true: six is not seven."
            }
          }
        }
      }),
      section3Text3: defineText({
        id: "cf861e80-9cc0-4203-8cce-af6b2f8803e8",
        slug: "section3Text3",
        type: "text",
        params: {},
        locale: {
          value: {
            en: "We changed an amount. The equality is true only after both values match."
          }
        }
      })
    },
    order: [
      "section3Markdown1",
      "section3Scene2",
      "section3Text3"
    ]
  }
});
