export function areAssignmentsValid(assignments: { [key: string]: CanvasImportAssignment }): boolean {
  let hasSelectedAssignments = false;

  for (const assignment of Object.values(assignments)) {
    if (assignment.importToPlanner) {
      hasSelectedAssignments = true; // Mark that at least one assignment is selected for import
      if (!assignment.selectedCourseID) {
        return false; // Invalid if `selectedCourseID` is not defined
      }
    }
  }

  // If no assignments are selected for import, return true
  return !hasSelectedAssignments || true;
}