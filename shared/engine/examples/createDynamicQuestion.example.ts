import { createDynamicQuestion } from '../src/generation';
import type {
  DynamicQuestion_Config,
  DynamicQuestion_NumberArgumentConfig,
  DynamicQuestion_Variant,
} from '../src/generation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../src/localization';
import type { TextContentBlock_AllLocales_Config } from '@svitlo/contracts/content';

const girlsApple = {
  selector: 'girlsApple',
  min: 1,
  max: 10,
  type: 'number',
} as const satisfies DynamicQuestion_NumberArgumentConfig;

const boysApple = {
  selector: 'boysApple',
  min: 2,
  max: 11,
  type: 'number',
} as const satisfies DynamicQuestion_NumberArgumentConfig;

const appleArguments = [girlsApple, boysApple] as const;
type AppleArguments = typeof appleArguments;
type AppleVariant = DynamicQuestion_Variant<AppleArguments>;

const appleName: TextContentBlock_AllLocales_Config = {
  id: 'apples-question',
  blockType: 'text',
  allLocales: true,
  value: Object.fromEntries(
    DEFAULT_SUPPORTED_LANGUAGES.map(language => [language.language, 'Apples']),
  ) as TextContentBlock_AllLocales_Config['value'],
};

const createAppleValue = <T extends 'girlsApple' | 'boysApple'>(
  selector: T,
  value: number,
): { selector: T; value: number } => ({ selector, value });

const appleConfig: DynamicQuestion_Config<AppleArguments> = {
  arguments: appleArguments,
  buildVariants: () => {
    const variants: AppleVariant[] = [];
    for (let girls = 1; girls <= 10; girls += 1) {
      for (let boys = 2; boys <= 11; boys += 1) {
        variants.push([createAppleValue('girlsApple', girls), createAppleValue('boysApple', boys)]);
      }
    }
    return variants;
  },
  checkConstraints: ([girls, boys]) => girls.value < boys.value,
  content: {
    question: [[]],
    explanation: [[]],
    answer: [[]],
  },
  name: appleName,
};

export const appleDynamicQuestion = createDynamicQuestion(appleConfig);
