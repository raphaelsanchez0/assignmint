export function areAssignmentsValid(assignments: { [key: string]: CanvasImportAssignment }): boolean {
  let hasSelectedAssignments = false;
  debugger
  for (const assignment of Object.values(assignments)) {
    if (assignment.importToPlanner) {
      if (!assignment.selectedCourseID) {
        return false; 
      }
      hasSelectedAssignments = true; 
    }
  }

  

  return hasSelectedAssignments;
}