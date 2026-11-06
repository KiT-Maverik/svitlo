import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CourseLanguages, sortCourseLanguages } from './CourseLanguages';

describe('CourseLanguages', () => {
  it('places the interface language first, then English, Ukrainian and Crimean Tatar', () => {
    expect(sortCourseLanguages(['uk', 'de', 'en', 'qm', 'pl', 'pl'], 'pl')).toEqual(['pl', 'en', 'uk', 'qm', 'de']);
  });

  it('uses available fallback priorities when the interface language is not supported', () => {
    expect(sortCourseLanguages(['de', 'uk', 'qm', 'en'], 'fr')).toEqual(['en', 'uk', 'qm', 'de']);
    expect(sortCourseLanguages(['de', 'qm'], 'fr')).toEqual(['qm', 'de']);
    expect(sortCourseLanguages([], 'fr')).toEqual([]);
  });

  it('renders native names and flags in the preferred order without losing hidden languages', () => {
    render(
      <CourseLanguages
        languages={['de', 'uk', 'en', 'qm', 'pl']}
        interfaceLanguage="pl"
        label="Course languages"
        compact
      />,
    );
    const group = screen.getByRole('group', { name: 'Course languages' });
    expect(Array.from(group.querySelectorAll('[lang]')).map(element => element.getAttribute('lang'))).toEqual([
      'pl-PL',
      'en-US',
      'uk-UA',
      'crh-Latn-UA',
    ]);
    expect(group).toHaveTextContent('+1');
    expect(screen.getByTitle('Deutsch')).toBeInTheDocument();
  });

  it('does not render an empty language list', () => {
    const { container } = render(<CourseLanguages languages={[]} label="Course languages" />);
    expect(container).toBeEmptyDOMElement();
  });
});
