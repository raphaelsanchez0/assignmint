import AddAssignmentDialog from "../AddAssignmentDialog";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("AddAssignment", () => {
    let mockCourses: CourseType[];

    beforeEach(() => {
        // This code will be run before each test
        mockCourses = [
            { value: "Test Course 1", label: "Test Course 1" },
            { value: "Test Course 2", label: "Test Course 1" },
        ];
    });

    it("Renders the text 'Add Assignment'", () => {
        const text = "Add Assignment";
        render(<AddAssignmentDialog courses={mockCourses} />);

        const myElement = screen.getByText(text);
        expect(myElement).toBeInTheDocument();
    });
});
