import { describe, expect, it } from 'vitest';
import { initialRecord, recordFieldKeys, recordIssue, recordSuggestions, textualRecord, type RecordLabels } from './recordModel';

const labels: RecordLabels = {
  what: 'Що?', when: 'Коли?', where: 'Де?', how: 'Як?', conditions: 'Умови?',
  unknown: 'Не вказано', other: 'Додати свої слова', morning: 'Ранок', day: 'День',
  evening: 'Вечір', dateOfSource: '23 червня 2013 року — дата фото NASA',
  timeNotGiven: 'Час доби в підписі не вказано',
  sourceWashington: 'Вашингтон, США; NASA/Bill Ingalls',
  photoCaption: 'Прочитав або прочитала підпис до фотографії NASA',
  moon: 'Місяць', clouds: 'Хмари', clear: 'Ясно', cloudy: 'Хмарно',
  ownEyes: 'Побачив або побачила', read: 'Прочитав або прочитала', heard: 'Прослухав або прослухала',
};
describe('observation record model', () => {
  it('keeps all five fields and does not invent weather or time for NASA', () => {
    const record = initialRecord('example', labels);
    expect(recordFieldKeys).toEqual(['what', 'when', 'where', 'how', 'conditions']);
    expect(record).toMatchObject({ what: labels.moon, when: labels.dateOfSource, where: labels.sourceWashington,
      how: labels.photoCaption, conditions: labels.unknown });
    expect(recordIssue('example', record, labels)).toBeNull();
    expect(recordSuggestions('example', 'what', labels)).toEqual([labels.moon]);
    expect(recordSuggestions('example', 'when', labels)).toEqual([labels.dateOfSource]);
    expect(recordSuggestions('example', 'conditions', labels)).toEqual([labels.unknown]);
    expect(JSON.stringify(recordSuggestions('example', 'conditions', labels))).not.toContain('Хмарно');
  });
  it('never claims incomplete records are complete or fills unknown evidence', () => {
    const own = initialRecord('own', labels);
    expect(recordIssue('own', own, labels)).toBe('missingWhat');
    expect(recordIssue('own', { ...own, what: labels.unknown }, labels)).toBe('missingWhat');
    expect(recordIssue('own', { ...own, what: 'Хмари' }, labels)).toBe('missingWhen');
    expect(recordIssue('own', { ...own, what: 'Хмари', when: labels.unknown }, labels)).toBe('missingSource');
    expect(recordIssue('own', { ...own, what: 'Хмари', when: labels.unknown, where: 'З вікна' }, labels)).toBe('missingMethod');
  });
  it('flags a NASA reading falsely marked as direct observation without scoring free text', () => {
    const nasa = initialRecord('example', labels);
    expect(recordIssue('example', { ...nasa, how: labels.ownEyes }, labels)).toBe('wrongSource');
    expect(recordIssue('example', { ...nasa, what: 'Власні слова дитини' }, labels)).toBeNull();
    expect(textualRecord(nasa, labels)).toContain('23 червня 2013');
  });
});
