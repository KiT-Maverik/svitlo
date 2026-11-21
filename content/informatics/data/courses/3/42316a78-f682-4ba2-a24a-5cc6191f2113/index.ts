import { defineCourse } from '@svitlo/engine/build';

import { digitalWorldAndInstructions } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/digitalWorldAndInstructions/index";
import { rulesAndAI } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/rulesAndAI/index";
import { trustAndDigitalSafety } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/content/trustAndDigitalSafety/index";
import { languages, type CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  digitalWorldAndInstructions,
  rulesAndAI,
  trustAndDigitalSafety,
};

export const littleITInventors = defineCourse<"littleITInventors", typeof items, CourseLanguages>({
  id: "42316a78-f682-4ba2-a24a-5cc6191f2113",
  slug: "littleITInventors",
  type: "course",
  params: {
    languages,
    age: {
      min: 6,
      max: 6
    },
    outcomes: {
      skills: [
        "0000b5e9-fa19-45d0-8b8d-1367d82dc123",
        "46aeedfa-5976-449d-89c3-97901d99b779",
        "1ab60caa-36e7-4cc8-9e2e-64f13352717c",
        "19dbf903-354a-41cb-90a1-07633df5f480",
        "52ae07ef-6103-48d2-a568-8a2ad38f480c",
        "014446e9-1ee1-4797-85ce-869b67208166",
        "799b85b6-30c0-489b-8e8a-b821a3332a75",
        "573cc148-e6f3-4f3f-871c-a5b1f733f2b0",
        "f93aa878-a1ad-4820-82a3-30f4b182f147",
        "4f039591-11ed-4341-90ab-7389f7ce8efe",
        "cadaea6e-bd81-441e-82f3-73389d1373bf",
        "42bbcb35-f4d0-496b-b90c-495b08683e32"
      ],
      skillGroups: [
        "0313947e-0474-4685-a697-515adc14eada",
        "34b0bd60-2c4f-483a-abab-e2cccd6892ec",
        "1b282e43-c07f-4307-aa1a-0e2c01bcadef",
        "c598e274-63e6-4795-b822-66e0ef76e73b",
        "d423d3ee-86b0-4df8-9541-fe6dd83cb0ba"
      ],
      skillDomains: [
        "fe626b09-cb42-4cc5-9694-7c31fa3e55b3",
        "da4ddcbb-6fe6-4dff-90ec-8363cfcda35d",
        "a6147899-9aae-4981-988a-8f3562a72a47",
        "c57456de-291c-4b19-bd67-bccbcf9bbaa7",
        "7ca59646-251b-4009-b150-7533da7eb92c",
        "dc767f18-884a-4ab2-94ba-78444383a3fd"
      ]
    },
  },
  locale: {
    title: {
      uk: "Маленькі ІТ-винахідники"
    },
    description: {
      uk: "Разом із дорослим досліджуємо цифрові пристрої, складаємо прості інструкції, знайомимося зі штучним інтелектом, перевіряємо відповіді та вчимося берегти особисті дані."
    },
    outcomesText: {
      uk: "Дитина після практики пояснює й відтворює короткий алгоритм,\nрозпізнає закономірність та одне просте правило, визначає приклад\nособистої інформації, не передає його в цифровий сервіс без дорослого.\nЗа підтримки дорослого наводить приклад навчання ШІ на даних, відрізняє\nйого від жорсткого правила, називає можливу помилку та пропонує\nнезалежну перевірку. Окремі Domain/Group UUID відображають тематичні\nмежі, а не обіцянку опанування всіх дочірніх Skills."
    },
    prerequisitesText: {
      uk: "Вступний курс без обов'язкової попередньої предметної підготовки:\nнеобхідні поняття вводяться в самому курсі з допомогою дорослого."
    }
  },
  content: {
    items,
    order: [
      "digitalWorldAndInstructions",
      "rulesAndAI",
      "trustAndDigitalSafety"
    ]
  }
});
