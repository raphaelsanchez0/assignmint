import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SketchPicker } from "react-color";
import useCourseForm from "./useCourseForm";

interface EditCourseDialogProps {
  course: Course;
  closeDialog: () => void;
}

export default function EditCourseDialog({
  course,
  closeDialog,
}: EditCourseDialogProps) {
  const {
    form,
    selectedColor,
    colorPickerOpen,
    colorPickerRef,
    setColorPickerOpen,
    handleColorChange,
    handleInputChange,
    onSubmit,
  } = useCourseForm({
    initialValues: {
      title: course.title,
      color: course.color,
    },
    onSubmitCallback: closeDialog,
    courseID: course.id,
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Course</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="basis-3/5">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="basis-2/5">
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        placeholder="Color"
                        {...field}
                        value={selectedColor}
                        onChange={handleInputChange}
                        onFocus={() => setColorPickerOpen(true)}
                        autoComplete="off"
                      />
                      {colorPickerOpen && (
                        <Card
                          className="absolute z-10 mt-2 w-full 
                                     group-focus:w-full p-2 md:p-2 flex items-center justify-center"
                          ref={colorPickerRef}
                        >
                          <SketchPicker
                            color={selectedColor}
                            onChangeComplete={handleColorChange}
                          />
                        </Card>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button type="submit" className="btn">
              Edit
            </button>
            <button className="btn-alert">Delete</button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
