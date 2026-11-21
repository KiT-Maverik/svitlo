import { defineCourse } from '@svitlo/engine/build';

import { capstone } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/content/capstone/index";
import { colorLight } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/content/colorLight/index";
import { labPrologue } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/content/labPrologue/index";
import { shapeStudio } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/content/shapeStudio/index";
import { lightDiscovery } from "#lessonsData/1/f760e7b7-9f77-5027-89ce-4e40d9d031a1/lightDiscovery.data";
import { languages, type CourseLanguages } from "#coursesData/e/7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e/constants";

const items = {
  labPrologue,
  shapeStudio,
  lightDiscovery,
  colorLight,
  capstone,
};

export const playgroundE2eLearningLab = defineCourse<"playgroundE2eLearningLab", typeof items, CourseLanguages>({
  id: "7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e",
  slug: "playgroundE2eLearningLab",
  type: "course",
  params: {
    languages,
    age: {
      min: 8,
      max: 11
    },
    grade: {
      min: 3,
      max: 5
    },
    outcomes: {
      skills: [
        "00000000-0000-4000-8000-000000000015",
        "00000000-0000-4000-8000-000000000011",
        "00000000-0000-4000-8000-000000000004"
      ],
      skillGroups: [
        "00000000-0000-4000-8000-000000000013"
      ],
      skillDomains: [
        "00000000-0000-4000-8000-000000000007"
      ]
    },
    prerequisites: {
      skills: [
        "00000000-0000-4000-8000-000000000001",
        "00000000-0000-4000-8000-000000000008"
      ],
      skillGroups: [
        "00000000-0000-4000-8000-000000000003"
      ]
    },
  },
  locale: {
    title: {
      en: "Playground E2E · Light, Shapes and Color"
    },
    description: {
      en: "A synthetic bilingual Course designed to exercise the complete Svitlo authoring, materialization, assessment, translation and publishing pipeline."
    },
    outcomesText: {
      en: "Teach observable light propagation, polygon identification and selected color classification. Group/Domain references define broad scope, not mastery of every nested Skill."
    },
    prerequisitesText: {
      en: "Recognition of familiar color and simple shape before comparison and transfer; the group reference tests group-level prerequisites, not blanket proof of mastery."
    }
  },
  content: {
    items,
    order: [
      "labPrologue",
      "shapeStudio",
      "lightDiscovery",
      "colorLight",
      "capstone"
    ]
  }
});

// agent no. this is no go. overrides stored away from the entities. does current configurator allow us to pass overrides where it is called?
export const authoredCourseOverrides = {
  content: {
    items: {
      colorLight: {
        content: {
          items: {
            illumination: {
              content: {
                items: {
                  lightPath: {
                    params: {
                      sections: {
                        allowSkipping: false,
                      },
                    },
                    locale: {
                      title: {
                        en: "Where light travels",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Parameters<typeof playgroundE2eLearningLab.build.overrides>[0];
