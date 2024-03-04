import Select from "react-select";

type CoursesInputProps = {
  courses: CourseType[];
  edit?: boolean;
  currentCourse?: CourseType;
};

const CourseInput: React.FC<CoursesInputProps> = ({
  courses,
  edit = false,
  currentCourse,
}) => {
  return (
    <>
      <label className="assignment--input-header" htmlFor="course">
        Course
      </label>
      <Select
        id="course"
        options={courses}
        name="course"
        className="w-full border-slate-400 bg-slate-50 dark:bg-zinc-900"
        required
        defaultValue={edit ? currentCourse : null}
      ></Select>
    </>
  );
};

export default CourseInput;
