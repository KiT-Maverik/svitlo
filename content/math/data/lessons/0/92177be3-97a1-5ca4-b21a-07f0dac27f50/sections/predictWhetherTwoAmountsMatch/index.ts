import { defineContentSection, defineScene } from '@svitlo/engine/build';
import { text1 } from './texts/text1';
import { text2 } from './texts/text2';

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
      text1,
      scene2: defineScene({
        id: "860bbab1-0e09-46d3-876d-5a20df6fd642",
        slug: "scene2",
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
      text2
    },
    order: [
      "text1",
      "scene2",
      "text3"
    ]
  }
});
