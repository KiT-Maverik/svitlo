import { defineModule } from '@svitlo/engine/build';

import { aiErrorsAndVerification } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/trustAndDigitalSafety/aiErrorsAndVerification/index";
import { privacyAndResponsibleChoices } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/trustAndDigitalSafety/privacyAndResponsibleChoices/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  aiErrorsAndVerification,
  privacyAndResponsibleChoices,
};

export const trustAndDigitalSafety = defineModule<"trustAndDigitalSafety", typeof items, CourseLanguages>({
  type: "module",
  id: "df2ae557-1b31-50d1-a57b-ab60e66dca3f",
  slug: "trustAndDigitalSafety",
  params: {},
  locale: {
    title: {
      uk: "Надійність ШІ та цифрова безпека"
    }
  },
  content: {
    items,
    order: [
      "aiErrorsAndVerification",
      "privacyAndResponsibleChoices"
    ]
  }
});
