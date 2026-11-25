import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { languages } from "#lessonsData/a/546a1d10-e656-4184-bdc9-f2a85017d18a/constants";
import { answerWords as answer_answerWords } from "./answerWords";
import { answerSummary as answer_answerSummary } from "./answerSummary";
import { answerPicture as answer_answerPicture } from "./answerPicture";
import { answerAudio as answer_answerAudio } from "./answerAudio";
import { answerGallery as answer_answerGallery } from "./answerGallery";

const content = {
  items: {
    "answerWords": answer_answerWords,
    "answerSummary": answer_answerSummary,
    "answerPicture": answer_answerPicture,
    "answerAudio": answer_answerAudio,
    "answerGallery": answer_answerGallery,
  },
  order: ["answerWords", "answerSummary", "answerPicture", "answerAudio", "answerGallery"],
};

export const compareAnswer = defineCheckpointAnswer<"compareAnswer", typeof content.items, typeof languages>({
  id: "f8c679c3-7351-4954-aad6-1c445b6ef934",
  slug: "compareAnswer",
  type: 'checkpointAnswer',
  content,
});
