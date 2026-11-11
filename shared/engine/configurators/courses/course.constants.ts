export const courseHierarchyTypes = ['course', 'module', 'chapter'] as const;
export type CourseHierarchy_Type = (typeof courseHierarchyTypes)[number];
