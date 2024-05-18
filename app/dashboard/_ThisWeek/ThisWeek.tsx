import { format } from "date-fns";
import Day from "./Day";
import add from "date-fns/add";
import { Card } from "@/components/ui/card";
export default function ThisWeek() {
  const daysThisWeek = getNextSevenDays();

  return (
    <Card className="hide-when-mobile">
      <h3 className="card-title ">This Week</h3>
      <div className="mt-4">
        {daysThisWeek.map((day) => (
          <Day key={day.toString()} date={day} />
        ))}
      </div>
    </Card>
  );
}

function getNextSevenDays(): Date[] {
  const days: Date[] = [];
  const currentDay = new Date();
  const DAYS_IN_WEEK = 7;

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const newDate = add(currentDay, { days: i });
    days.push(newDate);
  }
  return days;
}
