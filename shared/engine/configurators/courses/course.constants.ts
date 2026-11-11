export const courseHierarchyTypes = ['course', 'module', 'chapter', 'episode'] as const;
export type CourseHierarchy_Type = (typeof courseHierarchyTypes)[number];
