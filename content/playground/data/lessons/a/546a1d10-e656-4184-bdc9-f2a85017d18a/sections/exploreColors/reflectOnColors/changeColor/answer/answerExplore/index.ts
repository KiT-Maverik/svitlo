import { defineScene } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";

// TODO (BLOCKER): Implement and register Scene 4a773a25-f569-4429-9fd7-0e2ac6441db4 before production; Draft Preview may use SceneStub.
export const answerExplore = defineScene<"answerExplore", typeof languages>(
  {
  "id": "4a773a25-f569-4429-9fd7-0e2ac6441db4",
  "slug": "answerExplore",
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
