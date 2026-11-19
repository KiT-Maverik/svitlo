import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RecordWorkbench, type RecordWorkbenchLocales } from './RecordWorkbench';

const locales: RecordWorkbenchLocales = {
  heading: 'Збери запис',
  instructions: 'Обери джерело і додай п’ять підказок.',
  modes: { own: 'Моє спостереження', example: 'Фото та підпис NASA — не власне спостереження' },
  example: {
    title: 'Місяць над Монументом Вашингтона — NASA',
    text: '23 червня 2013 року Місяць сходив за Монументом Вашингтона.',
    credit: 'NASA/Bill Ingalls',
  },
  sourceLink: 'https://www.nasa.gov/image-article/supermoon-washington/',
  labels: {
    what: 'Що?', when: 'Коли?', where: 'Де або звідки?', how: 'Як отримано відомості?',
    conditions: 'Які умови відомі?', unknown: 'Не вказано', other: 'Додати свої слова',
    morning: 'Ранок', day: 'День', evening: 'Вечір',
    dateOfSource: '23 червня 2013 року — дата фото NASA',
    timeNotGiven: 'Час доби в підписі не вказано',
    sourceWashington: 'Вашингтон, США; NASA/Bill Ingalls',
    photoCaption: 'Прочитав або прочитала підпис до фотографії NASA',
    moon: 'Місяць', clouds: 'Хмари', clear: 'Ясно', cloudy: 'Хмарно',
    ownEyes: 'Побачив або побачила', read: 'Прочитав або прочитала',
    heard: 'Прослухав або прослухала',
  },
  actions: { review: 'Переглянути', edit: 'Виправити', clear: 'Очистити',
    finish: 'Завершити', readBack: 'Прочитати запис' },
  feedback: {
    complete: 'Перевір свій запис',
    missingWhat: 'Бракує деталі',
    missingWhen: 'Бракує часу',
    missingSource: 'Бракує джерела',
    missingMethod: 'Бракує способу',
    missingConditions: 'Бракує умов',
    wrongSource: 'Перевір джерело NASA',
    guess: 'Це здогад',
    noScore: 'Тут немає оцінок',
  },
};
let root: Root;
let host: HTMLDivElement;
async function render(node: ReactElement) {
  await act(async () => { root.render(node); });
}
async function click(buttonText: string) {
  const button = [...host.querySelectorAll('button')].find(element => element.textContent === buttonText);
  if (!button) throw Error('Missing button: ' + buttonText);
  await act(async () => { button.click(); });
}
async function choose(mode: 'own' | 'example') {
  const radios = [...host.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
  await act(async () => { radios[mode === 'own' ? 0 : 1]?.click(); });
}
beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
});
afterEach(async () => {
  await act(async () => { root.unmount(); });
  host.remove();
  vi.restoreAllMocks();
});

describe('RecordWorkbench Scene', () => {
  it('offers two labeled source modes and correctly attributed offline NASA reading', async () => {
    await render(<RecordWorkbench locales={locales} />);
    expect(host.querySelectorAll('input[type="radio"]')).toHaveLength(2);
    expect(host.textContent).toContain(locales.modes.example);
    await choose('example');
    expect(host.textContent).toContain(locales.example.text);
    expect(host.querySelector('a')?.getAttribute('href')).toBe(locales.sourceLink);
    const values = [...host.querySelectorAll<HTMLInputElement>('input[type="text"]')].map(x => x.value);
    expect(values).toEqual([
      locales.labels.moon, locales.labels.dateOfSource, locales.labels.sourceWashington,
      locales.labels.photoCaption, locales.labels.unknown,
    ]);
    expect(host.textContent).not.toContain('Хмарно');
  });
  it('previews five semantically labeled fields, supports review and text-only readback', async () => {
    await render(<RecordWorkbench locales={locales} />);
    await choose('example');
    expect(host.querySelectorAll('fieldset legend')).toHaveLength(6);
    await click(locales.actions.review);
    expect(host.querySelectorAll('dt')).toHaveLength(5);
    expect(host.querySelector('[role="status"]')?.textContent).toContain(locales.feedback.complete);
    expect(host.querySelector('details summary')?.textContent).toContain(locales.actions.readBack);
    expect(host.querySelector('audio')).toBeNull();
    await click(locales.actions.finish);
    expect(host.querySelector('[role="status"]')?.textContent).toContain(locales.feedback.noScore);
  });
  it('clears only after confirmation and never carries NASA answers into own mode', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    await render(<RecordWorkbench locales={locales} />);
    await choose('example');
    await click(locales.actions.clear);
    expect(host.querySelector('a')).not.toBeNull();
    confirm.mockReturnValue(true);
    await click(locales.actions.clear);
    expect(host.querySelector('a')).toBeNull();
    await choose('example');
    await choose('own');
    expect(host.querySelectorAll<HTMLInputElement>('input[type="text"]')[0]?.value).toBe('');
    expect(host.querySelector('[role="status"]')?.textContent).toContain(locales.feedback.wrongSource);
  });
  it('uses native focusable controls in RTL without mirroring the source record', async () => {
    await render(<div dir="rtl"><RecordWorkbench locales={locales} /></div>);
    await choose('own');
    const field = host.querySelector<HTMLInputElement>('input[type="text"]');
    field?.focus();
    expect(document.activeElement).toBe(field);
    expect(host.querySelector('[dir="rtl"]')).not.toBeNull();
    expect(host.textContent).toContain(locales.labels.what);
  });
});
