import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import { Card } from "@/components/ui/card";

export default function LoadingCoursesList() {
  return (
    <Card>
      <h3 className="card-title">Courses</h3>
      <LoadingListShorter />
    </Card>
  );
}
