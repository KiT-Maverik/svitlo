import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { LanguageScope } from '#types';

import { defineEducationStandard } from './defineEducationStandard';
import type { EducationStandard_Config } from './defineEducationStandard.schemas';

/** Explicit full fixture: adding a canonical language must break the typecheck until translated. */
const frontend = {
  ar: 'يوضح أهداف التعلم.',
  be: 'Тлумачыць мэты навучаньня.',
  bn: 'শেখার লক্ষ্য ব্যাখ্যা করে।',
  de: 'Erläutert die Lernziele.',
  en: 'Explains learning goals.',
  es: 'Explica los objetivos de aprendizaje.',
  et: 'Selgitab õpieesmärke.',
  fr: 'Explique les objectifs d’apprentissage.',
  he: 'מסביר את מטרות הלמידה.',
  hi: 'सीखने के लक्ष्यों की व्याख्या करता है।',
  id: 'Menjelaskan tujuan pembelajaran.',
  it: 'Spiega gli obiettivi di apprendimento.',
  ja: '学習目標を説明します。',
  ka: 'განმარტავს სწავლის მიზნებს.',
  kk: 'Оқу мақсаттарын түсіндіреді.',
  ko: '학습 목표를 설명합니다.',
  lt: 'Paaiškina mokymosi tikslus.',
  lv: 'Skaidro mācību mērķus.',
  mr: 'शिकण्याची उद्दिष्टे स्पष्ट करते.',
  ms: 'Menerangkan matlamat pembelajaran.',
  pl: 'Wyjaśnia cele nauczania.',
  pt: 'Explica os objetivos de aprendizagem.',
  qm: 'Ögrenüv maqsatlarını añlata.',
  ta: 'கற்றல் இலக்குகளை விளக்குகிறது.',
  te: 'అభ్యాస లక్ష్యాలను వివరిస్తుంది.',
  tr: 'Öğrenme hedeflerini açıklar.',
  uk: 'Пояснює навчальні цілі.',
  ur: 'سیکھنے کے اہداف کی وضاحت کرتا ہے۔',
  vi: 'Giải thích mục tiêu học tập.',
  zh: '解释学习目标。',
} satisfies Record<LanguageCode, string>;

const config: EducationStandard_Config = {
  id: 'b775647f-203d-481a-a1c7-4d331c779d06',
  slug: 'sampleStandard',
  name: 'Зразковий навчальний стандарт',
  description: { methodological: 'A substantive English-only explanation of the synthetic test framework.', frontend },
};

const standard = defineEducationStandard({ ...config, slug: 'sampleStandard' });
const literalSlug: 'sampleStandard' = standard.slug;
const type: 'educationStandard' = standard.type;
const scope: LanguageScope<AllLanguageCodes> = standard;
void literalSlug;
void type;
void scope;
standard.build.props({ languages: ['uk', 'en', 'qm'] });

// @ts-expect-error Missing most canonical frontend languages is forbidden.
defineEducationStandard({ ...config, description: { ...config.description, frontend: { uk: 'Короткий опис' } } });
// @ts-expect-error The original official name cannot be a localized dictionary.
defineEducationStandard({ ...config, name: { uk: 'Назва' } });
// @ts-expect-error Methodological description must be a single English-language string.
defineEducationStandard({ ...config, description: { ...config.description, methodological: { en: 'Methodology' } } });
// @ts-expect-error An unknown language cannot be published.
standard.build.props({ languages: ['xx'] });
// @ts-expect-error The publication language options are required.
standard.build.props();
// @ts-expect-error The one-method configurator has no contextual overrides.
standard.build.overrides({}, { languages: ['uk'] });
// @ts-expect-error The configurator exposes no validation facade.
void standard.validate;
// @ts-expect-error The configurator exposes no legacy config API.
void standard.config;
// @ts-expect-error EducationStandards cannot be disabled.
void standard.disabled;
// @ts-expect-error Per-standard supported-language subsets are not accepted.
defineEducationStandard({ ...config, params: { languages: ['uk'] } });
