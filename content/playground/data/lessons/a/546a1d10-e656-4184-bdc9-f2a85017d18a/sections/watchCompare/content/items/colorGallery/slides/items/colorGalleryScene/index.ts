import { defineScene } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../languages";

// TODO (BLOCKER): Implement and register Scene 32d1b90b-8f0d-4b23-b49d-e1c1509b7c03 before production; Draft Preview may use SceneStub.
export const colorGalleryScene = defineScene<"colorGalleryScene", typeof languages>(
  {
  "id": "32d1b90b-8f0d-4b23-b49d-e1c1509b7c03",
  "slug": "colorGalleryScene",
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
