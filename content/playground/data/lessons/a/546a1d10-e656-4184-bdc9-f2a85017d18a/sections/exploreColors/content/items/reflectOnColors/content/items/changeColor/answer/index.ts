import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../../languages";
import { changeExplanation as answer_changeExplanation } from "./content/items/changeExplanation";
import { answerExplore as answer_answerExplore } from "./content/items/answerExplore";
import { answerVideo as answer_answerVideo } from "./content/items/answerVideo";
import { answerCaptions as answer_answerCaptions } from "./content/items/answerCaptions";
import { answerCode as answer_answerCode } from "./content/items/answerCode";
import { answerExternal as answer_answerExternal } from "./content/items/answerExternal";

const content = {
  items: {
    "changeExplanation": answer_changeExplanation,
    "answerExplore": answer_answerExplore,
    "answerVideo": answer_answerVideo,
    "answerCaptions": answer_answerCaptions,
    "answerCode": answer_answerCode,
    "answerExternal": answer_answerExternal,
  },
  order: ["changeExplanation", "answerExplore", "answerVideo", "answerCaptions", "answerCode", "answerExternal"],
};

export const changeAnswer = defineCheckpointAnswer<"changeAnswer", typeof content.items, typeof languages>({
  id: "bca3cae3-886b-4bb5-b01a-f976ec42ffd8",
  slug: "changeAnswer",
  type: 'checkpointAnswer',
  content,
});
