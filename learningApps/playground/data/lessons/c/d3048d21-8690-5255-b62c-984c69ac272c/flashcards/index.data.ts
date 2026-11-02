import type { Flashcard } from '@svitlo/engine/content';
import { fastestMedium_Question_Data } from '../questions/fastestMedium.data';
import { lightTravelsStraight_Question_Data } from '../questions/lightTravelsStraight.data';
import { opaqueObjectShadow_Question_Data } from '../questions/opaqueObjectShadow.data';

export const howLightMovesFlashcards = [
  {
    id: '860102db-5184-5249-88dd-7acea86ff5b4',
    isDefault: true,
    front: [
      {
        id: '92a594ef-604e-5145-84cd-eb8c027c427b',
        slug: 'front',
        value: lightTravelsStraight_Question_Data.question[0].value,
      },
    ],
    back: [
      {
        id: '0abe9721-e67e-5c7a-97d4-c152bf863286',
        slug: 'back',
        value: lightTravelsStraight_Question_Data.answers.correct.straightLine.value,
      },
    ],
    hint: [],
    tags: ['lightPropagation'],
    flags: [],
  },
  {
    id: 'a7a04904-ed6b-515e-bdd7-040458b53fad',
    isDefault: true,
    front: [
      {
        id: '77e01b3b-7d28-5910-9ba0-2021fa71dc50',
        slug: 'front',
        value: fastestMedium_Question_Data.question[0].value,
      },
    ],
    back: [
      {
        id: 'b790287a-f297-5057-88b1-954e1226ca5f',
        slug: 'back',
        value: fastestMedium_Question_Data.answers.correct.vacuum.value,
      },
    ],
    hint: [],
    tags: ['lightSpeed'],
    flags: [],
  },
  {
    id: '715383c3-ea22-5043-9213-555180837358',
    isDefault: true,
    front: [
      {
        id: '8c3c60f6-3f70-5ab3-aa22-0a99a34888cd',
        slug: 'front',
        value: opaqueObjectShadow_Question_Data.question[0].value,
      },
    ],
    back: [
      {
        id: '2df093ea-4ef3-5935-94e7-06bb5a4b409c',
        slug: 'back',
        value: opaqueObjectShadow_Question_Data.answers.correct.shadow.value,
      },
    ],
    hint: [],
    tags: ['shadow'],
    flags: [],
  },
] satisfies Flashcard<'data'>[];
