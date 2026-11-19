import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import { allLanguageCodes, DEFAULT_SUPPORTED_LANGUAGES, type LanguageCode } from '#schemas';

import { defineEducationStandard as publicBuildExport } from '../../../build';
import * as runtime from '../../../runtime';
import { defineEducationStandard } from './defineEducationStandard';
import {
  educationStandard_Config_Schema,
  educationStandard_Props_Schema,
  type EducationStandard_Config,
} from './defineEducationStandard.schemas';

/** Synthetic, non-production text; explicit keys make roster expansion a compile-time check. */
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

const validConfig = {
  id: 'b775647f-203d-481a-a1c7-4d331c779d06',
  slug: 'sampleStandard',
  name: 'Зразковий навчальний стандарт',
  description: {
    methodological: 'A synthetic framework used to test the classification of learning goals; it is not an official policy or evidence of course compliance.',
    frontend,
  },
  params: {
    countries: ['UA'],
    age: { min: 6, max: 12 },
    grade: { min: 1, max: 6 },
    version: 'Illustrative test edition',
    sourceUrl: 'https://example.com/standards/example',
    nameLanguage: 'uk',
  },
} satisfies EducationStandard_Config;

const invalidPublication = (edit: (value: EducationStandard_Config) => void) => {
  const config = structuredClone(validConfig) as EducationStandard_Config;
  edit(config);
  return () => defineEducationStandard(config).build.props({ languages: ['uk'] });
};

describe('Configurators', () => {
  describe('EducationStandards', () => {
    describe('defineEducationStandard', () => {
      test('the default locale roster matches all canonical language codes', () => {
        assert.deepEqual(
          [...new Set(DEFAULT_SUPPORTED_LANGUAGES.map(entry => entry.language))].sort(),
          [...allLanguageCodes].sort(),
        );
        assert.deepEqual(Object.keys(frontend).sort(), [...allLanguageCodes].sort());
      });

      test('identity, one public Build method, and Build/Runtime export boundaries', () => {
        const standard = defineEducationStandard(validConfig);
        assert.equal(standard.id, validConfig.id);
        assert.equal(standard.slug, 'sampleStandard');
        assert.equal(standard.type, 'educationStandard');
        assert.deepEqual(Object.keys(standard).sort(), ['build', 'id', 'slug', 'type']);
        assert.deepEqual(Object.keys(standard.build), ['props']);
        assert.equal('overrides' in standard.build, false);
        assert.equal('config' in standard, false);
        assert.equal('validate' in standard, false);
        assert.equal('disabled' in standard, false);
        assert.equal(publicBuildExport, defineEducationStandard);
        assert.equal('defineEducationStandard' in runtime, false);
        assert.equal(runtime.educationStandard_Config_Schema, educationStandard_Config_Schema);
        assert.equal(runtime.educationStandard_Props_Schema, educationStandard_Props_Schema);
      });

      test('one-language publication retains invariant name, methodology and optional metadata', () => {
        const resource = defineEducationStandard(validConfig).build.props({ languages: ['uk'] });
        assert.deepEqual(resource.base, {
          id: validConfig.id,
          slug: validConfig.slug,
          name: validConfig.name,
          description: { methodological: validConfig.description.methodological },
          params: validConfig.params,
        });
        assert.deepEqual(resource.locale, {
          uk: { description: { frontend: frontend.uk } },
        });
        assert.equal(JSON.stringify(resource).includes('build'), false);

        const merged = {
          ...resource.base,
          description: { ...resource.base.description, ...resource.locale.uk!.description },
        };
        assert.deepEqual(educationStandard_Props_Schema.parse(merged), merged);
      });

      test('an arbitrary canonical language has only its own Props-shaped fragment', () => {
        const resource = defineEducationStandard(validConfig).build.props({ languages: ['qm'] });
        assert.deepEqual(Object.keys(resource.locale), ['qm']);
        assert.deepEqual(resource.locale.qm, { description: { frontend: frontend.qm } });
        assert.equal(resource.base.description.methodological, validConfig.description.methodological);
        assert.equal(resource.base.name, validConfig.name);
        assert.doesNotThrow(() => JSON.stringify(resource));
      });

      test('authoring input and earlier results are independent across Build calls', () => {
        const input = structuredClone(validConfig);
        const standard = defineEducationStandard(input);
        const first = standard.build.props({ languages: ['uk', 'en'] });
        input.description.frontend.uk = 'Mutated source';
        input.name = 'Mutated name';
        first.base.name = 'Mutated publication';
        first.locale.uk!.description.frontend = 'Mutated translation';
        const next = standard.build.props({ languages: ['uk'] });
        assert.equal(next.base.name, validConfig.name);
        assert.equal(next.locale.uk?.description.frontend, frontend.uk);
        assert.deepEqual(Object.keys(next.locale), ['uk']);
      });

      test('all canonical locales are required even for a one-language publication', () => {
        assert.throws(invalidPublication(value => {
          value.description.frontend = { uk: 'Опис' } as never;
        }));
        assert.throws(invalidPublication(value => {
          value.description.frontend.en = '   ';
        }));
        assert.throws(invalidPublication(value => {
          value.description.frontend.zh = '';
        }));
      });

      test('invalid identity, invariant text, and unexpected configuration fields fail', () => {
        assert.throws(invalidPublication(value => { value.id = 'not-a-uuid'; }));
        assert.throws(invalidPublication(value => { value.slug = 'Invalid-Slug'; }));
        assert.throws(invalidPublication(value => { value.name = ' '; }));
        assert.throws(invalidPublication(value => { value.name = { en: 'Name' } as never; }));
        assert.throws(invalidPublication(value => { value.description.methodological = '  '; }));
        assert.throws(invalidPublication(value => {
          value.description.methodological = { en: 'Translated methodology' } as never;
        }));
        assert.throws(invalidPublication(value => {
          (value as EducationStandard_Config & { disabled: true }).disabled = true;
        }));
        assert.throws(invalidPublication(value => {
          value.params = { ...value.params, disabled: true } as never;
        }));
      });

      test('country lists, age/grade ranges and optional source metadata are validated', () => {
        assert.throws(invalidPublication(value => { value.params = { countries: ['ua'] }; }));
        assert.throws(invalidPublication(value => { value.params = { countries: ['UA', 'UA'] }; }));
        assert.throws(invalidPublication(value => { value.params = { age: { min: 13, max: 6 } }; }));
        assert.throws(invalidPublication(value => { value.params = { age: { min: -1, max: 10 } }; }));
        assert.throws(invalidPublication(value => { value.params = { grade: { min: 6, max: 2 } }; }));
        assert.throws(invalidPublication(value => { value.params = { grade: { min: 1.5, max: 3 } }; }));
        assert.throws(invalidPublication(value => { value.params = { sourceUrl: 'not-a-url' }; }));
        assert.throws(invalidPublication(value => { value.params = { sourceUrl: 'javascript:alert(1)' }; }));
        assert.throws(invalidPublication(value => { value.params = { nameLanguage: 'not a tag' }; }));
        assert.doesNotThrow(() => defineEducationStandard({
          ...validConfig,
          params: undefined,
        }).build.props({ languages: ['en'] }));
      });

      test('publication request rejects unknown, duplicated and empty language scopes', () => {
        const standard = defineEducationStandard(validConfig);
        assert.throws(() => standard.build.props({ languages: [] }));
        assert.throws(() => standard.build.props({ languages: ['uk', 'uk'] }));
        assert.throws(() => standard.build.props({ languages: ['xx'] } as never));
        assert.throws(() => standard.build.props({} as never));
      });
    });
  });
});
