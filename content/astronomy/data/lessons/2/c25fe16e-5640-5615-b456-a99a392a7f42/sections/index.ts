import { model } from "./model";
import { opening } from "./opening";
import { recallFeedback } from "./recallFeedback";
import { rotationAndIlluminationQuiz } from "./rotationAndIlluminationQuiz";
import { rotation } from "./rotation";
import { transfer } from "./transfer";
import { transferFeedback } from "./transferFeedback";

export const section = {
  items: {
    opening,
    model,
    rotation,
    transfer,
    transferFeedback,
    recallFeedback,
    rotationAndIlluminationQuiz
  },
  order: [
    "opening",
    "model",
    "rotation",
    "transfer",
    "transferFeedback",
    "recallFeedback",
    "rotationAndIlluminationQuiz"
  ]
};
