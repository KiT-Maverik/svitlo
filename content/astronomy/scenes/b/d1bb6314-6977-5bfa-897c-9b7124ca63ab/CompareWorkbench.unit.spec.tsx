import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { CompareWorkbench, type CompareWorkbenchLocales } from './CompareWorkbench';

const locales: CompareWorkbenchLocales = {
  heading: 'Знайди відмінність',
  prompt: 'Прочитай А і Б. Назви одну різницю, яку підтверджують слова.',
  source: 'Обидва записи вигадані для вправи.',
  labels: { what: 'Що?', when: 'Коли?', where: 'Де?', how: 'Як?', conditions: 'Умови?' },
  recordA: { title: 'Запис А', what: 'Хмари; Місяць не згадано', when: 'День',
    where: 'Подвір’я', how: 'Без приладів', conditions: 'Інші умови не вказані' },
  recordB: { title: 'Запис Б', what: 'Місяць і хмари', when: 'Вечір',
    where: 'Подвір’я', how: 'Без приладів', conditions: 'Хмарно' },
  choices: { time: 'Час різний', moon: 'Місяць лише в Б', conditions: 'Хмарність уточнено у Б',
    same: 'Місце однакове', incorrect: 'В А Місяця не було', other: 'Інша відмінність' },
  actions: { check: 'Пояснити', retry: 'Спробувати ще', read: 'Прочитати записи' },
  feedback: { valid: 'Назви слова, що це доводять', same: 'Це однакова деталь',
    unknown: 'Не згадано не означає не було', causal: 'Не вигадуй причину',
    retry: 'Самоперевірка без оцінки' },
};
let root: Root;
let host: HTMLDivElement;
async function render(node: ReactElement) {
  await act(async () => { root.render(node); });
}
async function select(key: keyof CompareWorkbenchLocales['choices']) {
  const index = ['time', 'moon', 'conditions', 'same', 'incorrect', 'other'].indexOf(key);
  await act(async () => { host.querySelectorAll<HTMLInputElement>('input[type="radio"]')[index]?.click(); });
}
async function click(text: string) {
  const button = [...host.querySelectorAll('button')].find(x => x.textContent === text);
  if (!button) throw Error('Missing button ' + text);
  await act(async () => { button.click(); });
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
});
describe('CompareWorkbench Scene', () => {
  it('reads two labeled semantic cards and distinguishes mention from absence', async () => {
    await render(<CompareWorkbench locales={locales} />);
    expect(host.querySelectorAll('article')).toHaveLength(2);
    expect(host.querySelectorAll('dt')).toHaveLength(10);
    expect(host.querySelectorAll('fieldset legend')).toHaveLength(1);
    expect(host.textContent).toContain(locales.recordA.what);
    expect(host.textContent).toContain(locales.recordB.what);
    await select('incorrect');
    await click(locales.actions.check);
    expect(host.querySelector('[role="status"]')?.textContent).toBe(locales.feedback.unknown);
  });
  it('gives evidence feedback without grading a chosen or open response', async () => {
    await render(<CompareWorkbench locales={locales} />);
    await select('time');
    await click(locales.actions.check);
    expect(host.querySelector('[role="status"]')?.textContent).toBe(locales.feedback.valid);
    await select('same');
    await click(locales.actions.check);
    expect(host.querySelector('[role="status"]')?.textContent).toBe(locales.feedback.same);
    await select('other');
    expect(host.querySelector('textarea')).not.toBeNull();
    expect(host.textContent).toContain(locales.feedback.causal);
    await click(locales.actions.check);
    expect(host.querySelector('[role="status"]')?.textContent).toBe(locales.feedback.retry);
    await click(locales.actions.retry);
    expect(host.querySelector('[role="status"]')).toBeNull();
  });
  it('retains visible evidence and keyboard-accessible choices under RTL', async () => {
    await render(<div dir="rtl"><CompareWorkbench locales={locales} /></div>);
    const radio = host.querySelector<HTMLInputElement>('input[type="radio"]');
    radio?.focus();
    expect(document.activeElement).toBe(radio);
    expect(host.querySelector('[dir="rtl"]')).not.toBeNull();
    expect(host.querySelector('summary')?.textContent).toBe(locales.actions.read);
    expect(host.textContent).toContain(locales.recordB.conditions);
  });
});
