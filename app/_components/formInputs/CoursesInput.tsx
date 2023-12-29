import Select from "react-select";

interface CoursesInputProps {
    courses: CourseType[];
}

const CourseInput: React.FC<CoursesInputProps> = ({ courses }) => {
    return (
        <>
            <label className="assignment--input-header" htmlFor="course">
                Course
            </label>
            <Select
                id="course"
                options={courses}
                name="course"
                className="w-1/2 border-slate-400 bg-slate-50"
                required
            ></Select>
        </>
    );
};

export default CourseInput;
