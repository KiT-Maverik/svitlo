import { defineCheckpointAnswer } from '@svitlo/engine/build';
import { languages } from "../../../../../../../../../languages";
import { answerWords as answer_answerWords } from "./content/items/answerWords";
import { answerSummary as answer_answerSummary } from "./content/items/answerSummary";
import { answerPicture as answer_answerPicture } from "./content/items/answerPicture";
import { answerAudio as answer_answerAudio } from "./content/items/answerAudio";
import { answerGallery as answer_answerGallery } from "./content/items/answerGallery";

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
