export function parseAssignments(query: string) {
    const params = new URLSearchParams(query);
    const canvasImportAssignments: CanvasImportAssignment[] = [];
    const dates:Date[] = [];

    for (const [key, value] of params.entries()) {
        const dueDate = key;
        const titles = value.split(','); 

        dates.push(new Date(dueDate))

        titles.forEach(title => {
            canvasImportAssignments.push({
                selectedCourseID: undefined, 
                title: title.trim(), 
                dueDate, 
                importToPlanner: false 
            });
        });
    }

    return {
        canvasImportAssignments,
        dates
    };
}