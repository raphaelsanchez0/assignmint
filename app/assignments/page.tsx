import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AssignmentsList from "../../components/AssignmentsList/AssignmentsList";
import AddAssignment from "./_AddAssignment/AddAssignment";
import { getCourses } from "@/server/apis/courses";

export default async function Assignments() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return (
    <div className="mb-sidebar-width md:ml-sidebar-width">
      <div className="flex gap-4 p-4">
        <div className="basis-1/2 hide-when-mobile">
          <AssignmentsList />
        </div>
        <div className="basis-1/2 hide-when-mobile">
          <AddAssignment />
        </div>
        <div className="grow md:hidden">
          <AssignmentsList showAddAssignment />
        </div>
      </div>
    </div>
  );
}
