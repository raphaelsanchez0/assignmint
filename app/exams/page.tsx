import AddExam from "./AddExam";
import { getExams, getCourses } from "@/server/actions";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import ExamsCard from "@/components/ExamsList/ExamsCard";

export default async function Exams() {
  return (
    <>
      <div className="ml-sidebar-width">
        <div className="flex gap-4 p-4">
          <div className="basis-1/2 ">
            <ExamsCard />
          </div>
          <div className="basis-1/2">
            <AddExam />
          </div>
        </div>
      </div>
    </>
  );
}
