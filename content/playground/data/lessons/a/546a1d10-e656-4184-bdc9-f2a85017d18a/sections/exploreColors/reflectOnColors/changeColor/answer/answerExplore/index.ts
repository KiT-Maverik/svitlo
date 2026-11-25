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
// TODO (BLOCKER): Remove the temporary Scene specification after this content item is implemented and verified.
/**
 * # specification
 *
 * Render one large sample, initially a red circle. Red and Blue buttons select the color while preserving shape. Change shape toggles circle/square while preserving color. Reset restores the initial red circle. Use clearly distinct red and blue fills on a neutral background. For each of the four color/shape combinations, display and announce the corresponding localized status (redCircle, redSquare, blueCircle, blueSquare). Repeated selection of the same color is idempotent; Reset works from any state. Keyboard and touch actions give the same result. No scoring, network, animation or timer. Ask learners to predict each change before choosing it; controls must allow any order without a required sequence or score. Use a single swatch and ordinary CSS or lightweight SVG, not a canvas animation. Each color button exposes whether it is selected (aria-pressed); the shape button toggles the shape, and Reset is always available. On entry, including after a Carousel slide remount, restore the declared initial state; do not depend on saved state. Keep feedback visible without moving focus.
 */
