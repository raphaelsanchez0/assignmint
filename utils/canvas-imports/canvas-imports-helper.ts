export function addAttributesToCanvasCourse(
  originalCourses: CanvasCourse[],
): ModifiedCanvasCourse[] {
  return originalCourses.map((originalCourse) => ({
    ...originalCourse,
    import: false,
    assignmintID: null,
  }));
}
