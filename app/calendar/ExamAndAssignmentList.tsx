import { useSearchParams } from "next/navigation";
import Assignment from "../_components/AssignmentsList/Assignment";
import SectionDivider from "../_components/AssignmentsList/AssignmentCatagories/SectionDivider";
import { isToday, isTomorrow, isYesterday, format } from "date-fns";

export default function ExamAndAssignmentList() {
  const searchParams = useSearchParams();

  let selectedDateString = searchParams.get("date");
  let selectedDate = selectedDateString
    ? new Date(`${selectedDateString}T00:00`)
    : new Date();
  let formatedDate;
  if (isToday(selectedDate)) {
    formatedDate = "Today";
  } else if (isTomorrow(selectedDate)) {
    formatedDate = "Tomorrow";
  } else if (isYesterday(selectedDate)) {
    formatedDate = "Yesterday";
  } else {
    formatedDate = format(selectedDate, "MMMM d, yyyy");
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="card-title">{formatedDate}</h3>
      </div>
      <ol></ol>
    </div>
  );
}
