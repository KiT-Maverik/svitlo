import { defineContentSection, defineScene, defineText } from '@svitlo/engine/build';

export const predictWhetherTwoAmountsMatch = defineContentSection({
  id: "708bc8c7-044c-4eba-8c99-7bdb285e9da6",
  slug: "predictWhetherTwoAmountsMatch",
  type: "content",
  params: {},
  locale: {
    title: {
      en: "Predict whether two amounts match"
    },
    navigationLabel: {
      en: "Predict whether two amounts match"
    }
  },
  content: {
    items: {
      section1Text1: defineText({
        id: "b32df671-84cb-4c85-8139-8bb716dfc143",
        slug: "section1Text1",
        type: "text",
        params: {},
        locale: {
          value: {
            en: "On the first tray, three red counters and two blue counters. On the second, five plain counters. Are the amounts the same?"
          }
        }
      }),
      section1Scene2: defineScene({
        id: "860bbab1-0e09-46d3-876d-5a20df6fd642",
        slug: "section1Scene2",
        type: "scene",
        params: {},
        locale: {
          value: {
            en: {
              instruction: "On the first tray, three red counters and two blue counters. On the second, five plain counters. Are the amounts the same?"
            }
          }
        }
      }),
      section1Text3: defineText({
        id: "8b436724-2a86-479e-856f-f96094aa39da",
        slug: "section1Text3",
        type: "text",
        params: {},
        locale: {
          value: {
            en: "Both show five. The symbol = means both sides have the same value."
          }
        }
      })
    },
    order: [
      "section1Text1",
      "section1Scene2",
      "section1Text3"
    ]
  }
});
