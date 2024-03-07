"use client";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { addAssignmentFormSchema as formSchema } from "@/lib/schemas";
const EditAssignmentDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      title: "",
      dueDate: new Date(),
      priority: false,
      notes: "",
    },
  });
  return <DialogContent></DialogContent>;
};

export default EditAssignmentDialog;
