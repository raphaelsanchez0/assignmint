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
      <div className="mb-sidebar-width md:ml-sidebar-width">
        <div className="flex gap-4 p-4">
          <div className="basis-1/2 hide-when-mobile">
            <ExamsCard />
          </div>
          <div className="basis-1/2 hide-when-mobile">
            <AddExam />
          </div>
          <div className="grow md:hidden">
            <ExamsCard showAddExam />
          </div>
        </div>
      </div>
    </>
  );
}
