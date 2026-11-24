import { defineScene } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

// TODO (BLOCKER): Implement and register Scene 2e95db16-2461-4de2-b97d-feecbfac1166 before production; Draft Preview may use SceneStub.
export const answerGalleryScene = defineScene<"answerGalleryScene", typeof languages>(
  {
  "id": "2e95db16-2461-4de2-b97d-feecbfac1166",
  "slug": "answerGalleryScene",
  "type": "scene",
  "params": {},
  "locale": {
    "value": {
      "heading": {
        "en": "Explore two colors"
      },
      "red": {
        "en": "Red"
      },
      "blue": {
        "en": "Blue"
      },
      "choose": {
        "en": "Choose a color"
      },
      "reset": {
        "en": "Reset"
      },
      "shape": {
        "en": "Change shape"
      },
      "status": {
        "redCircle": {
          "en": "The sample is a red circle."
        },
        "redSquare": {
          "en": "The sample is a red square."
        },
        "blueCircle": {
          "en": "The sample is a blue circle."
        },
        "blueSquare": {
          "en": "The sample is a blue square."
        }
      },
      "sampleLabel": {
        "en": "Color sample"
      }
    }
  }
},
);
