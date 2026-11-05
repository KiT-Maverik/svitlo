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
        'src/components/pages/Lesson/Lesson.tsx',
        'src/components/pages/QuestionsDemo/QuestionsDemo.tsx',
        'src/components/pages/SkillsMindMap/SkillAnalyticsPage.tsx',
        'src/components/pages/SkillsMindMap/SkillLearningClient.tsx',
        'src/components/pages/SkillsMindMap/SkillsMindMap.tsx',
        'src/components/pages/SkillsMindMap/SkillsPagePreferences.tsx',
        'src/components/pages/SkillsMindMap/SkillsPageSettingsContext.tsx',
        'src/components/pages/SkillsMindMap/skillsData.client.ts',
        'src/components/pages/SkillsMindMap/skillsMindMap.gestures.ts',
        'src/components/pages/SkillsMindMap/skillsMindMap.utils.ts',
        'src/i18n/useLessonLocale.ts',
      ],
    },
  },
});
