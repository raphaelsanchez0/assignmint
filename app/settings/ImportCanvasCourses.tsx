import { DialogContent } from "@/components/ui/dialog";
import { getAllCanvasCourses } from "@/server/canvasAPIActions";
import { useQuery } from "@tanstack/react-query";

const ImportCanvasCourses = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["canvas-assignments"],
    queryFn: getAllCanvasCourses,
  });

  if (isLoading) return <DialogContent>Loading...</DialogContent>;

  return <DialogContent>test</DialogContent>;
};

export default ImportCanvasCourses;
