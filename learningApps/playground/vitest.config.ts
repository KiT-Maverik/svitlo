import { fileURLToPath, URL } from 'node:url';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.unit.spec.ts', 'src/**/*.unit.spec.tsx'],
    exclude: [...configDefaults.exclude, 'src/components/widgets/questions/**'],
    setupFiles: ['./src/testing/setup.ts'],
    restoreMocks: true,
    clearMocks: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: [
        'src/components/layout/LearningLayout/LearningLayout.tsx',
        'src/components/layout/LearningLayout/NavbarPreferences/NavbarPreferences.tsx',
        'src/components/pages/Lesson/LessonSteps/LessonSteps.tsx',
        'src/components/pages/Lesson/LessonProgress/LessonProgress.tsx',
        'src/components/pages/Lesson/QuestionProgress/QuestionProgress.tsx',
        'src/components/pages/Lesson/LessonSectionContent/LessonSectionContent.tsx',
        'src/components/pages/Lesson/Celebration/Celebration.tsx',
        'src/components/pages/Lesson/LessonClient/LessonClient.tsx',
        'src/components/pages/ApiDemo/ApiDemo.tsx',
        'src/components/pages/ApiDemo/FeedbackDemo.tsx',
        'src/components/pages/QuestionsDemo/QuestionsDemo.tsx',
        'src/data/howLightMoves/sections/practice/contentBlocks/scenes/Practice/Practice.tsx',
        'src/data/howLightMoves/sections/theory/contentBlocks/scenes/LightRayDiagram/LightRayDiagram.tsx',
        'src/data/howLightMoves/sections/theory/contentBlocks/scenes/LightPropagationSimulation/LightPropagationSimulation.tsx',
        'src/i18n/LocaleProvider/LocaleProvider.tsx',
      ],
    },
  },
});
