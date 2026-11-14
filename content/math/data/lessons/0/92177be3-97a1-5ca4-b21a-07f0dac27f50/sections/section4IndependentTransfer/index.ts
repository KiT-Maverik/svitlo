import { defineContentSection, defineMarkdown, defineText } from '@svitlo/engine/build';

export const section4IndependentTransfer_Section = defineContentSection({
  id: "2f4afed8-5ba5-42fb-8ee6-9465aa098846",
  slug: "section4IndependentTransfer",
  type: "content",
  params: {},
  locale: {
    title: {
      en: "Independent transfer"
    },
    navigationLabel: {
      en: "Independent transfer"
    }
  },
  content: {
    items: {
      section4Text1: defineText({
        id: "00162145-5c3c-42b1-8d10-dbb6713aa842",
        slug: "section4Text1",
        type: "text",
        params: {},
        locale: {
          value: {
            en: "Someone says 6 = 1 + 5 is wrong because the answer is on the left. Do you agree? Explain, or choose ‘six on each side’ or ‘the sign needs an answer on the right’."
          }
        }
      }),
      section4Text2: defineText({
        id: "1fcd6fe8-28b3-4e50-8fd4-374fc8aa36f7",
        slug: "section4Text2",
        type: "text",
        params: {},
        locale: {
          value: {
            en: "Six on the left, six on the right. It is true."
          }
        }
      }),
      section4Markdown3: defineMarkdown({
        id: "83f7c8f0-c532-4b30-8834-2ce5eef1cf25",
        slug: "section4Markdown3",
        type: "markdown",
        params: {},
        locale: {
          value: {
            en: "Remember: **= means the values on both sides match.**"
          }
        }
      })
    },
    order: [
      "section4Text1",
      "section4Text2",
      "section4Markdown3"
    ]
  }
});
