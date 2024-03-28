import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ImportCanvasCoursesDialog from "./canvas-import-dialog/ImportCanvasCoursesDialog";
import CanvasAPIForm from "./CanvasAPIForm";

export default function CanvasAPICard() {
  return (
    <Card className="flex flex-col gap-2">
      <h3 className="card-title">Canvas</h3>
      <CanvasAPIForm />
      <Dialog>
        <DialogTrigger asChild>
          <button className="btn mt-4 ml-4">Import Courses</button>
        </DialogTrigger>
        <ImportCanvasCoursesDialog />
      </Dialog>
    </Card>
  );
}
