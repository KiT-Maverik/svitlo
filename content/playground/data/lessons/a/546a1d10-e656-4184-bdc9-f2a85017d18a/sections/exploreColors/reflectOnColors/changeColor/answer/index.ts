import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";
import { changeExplanation as answer_changeExplanation } from "./changeExplanation";
import { answerExplore as answer_answerExplore } from "./answerExplore";
import { answerVideo as answer_answerVideo } from "./answerVideo";
import { answerCaptions as answer_answerCaptions } from "./answerCaptions";
import { answerCode as answer_answerCode } from "./answerCode";
import { answerExternal as answer_answerExternal } from "./answerExternal";

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
