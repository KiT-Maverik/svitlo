import { defineScene } from '@svitlo/engine/build';
import { languages } from "../../../../../languages";

// TODO (BLOCKER): Implement and register Scene 71b307a9-2ba4-48af-b5f9-32aa82bca58d before production; Draft Preview may use SceneStub.
export const colorExplorer = defineScene<"colorExplorer", typeof languages>(
  {
  "id": "71b307a9-2ba4-48af-b5f9-32aa82bca58d",
  "slug": "colorExplorer",
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
