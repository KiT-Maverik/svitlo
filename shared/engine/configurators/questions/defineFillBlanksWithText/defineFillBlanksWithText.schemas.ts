import { z } from 'zod';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import { contentBlockLocalizationSwitch as localizationSwitch } from '../../contentBlocks';
import { createQuestionBaseSchema, type QuestionContent } from '../question.schemas';

const questionBase = createQuestionBaseSchema('fillBlanksWithText');
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  slots: z.array(z.object({ selector: z.string(), correctAnswers: z.array(localizationSwitch[mode]) })),
  placeholder: localizationSwitch[mode],
});

/** The schema validates Question metadata; child blocks own their validation. */
export const fillBlanksWithText_Config_Schema = questionBase.extend(addUnifiedLocale(locale('config')));
export type Question_FillBlanksWithText_Config = z.infer<typeof fillBlanksWithText_Config_Schema> & {
  content: QuestionContent<ContentBlock_Configurator>;
};

export const fillBlanksWithText_Props_Schema = questionBase.extend(addUnifiedLocale(locale('props')));
export type Question_FillBlanksWithText_Props = z.infer<typeof fillBlanksWithText_Props_Schema> & {
  content: QuestionContent<ContentBlock_Props>;
};
