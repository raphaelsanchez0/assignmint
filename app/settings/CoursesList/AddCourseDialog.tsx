"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { courseFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SketchPicker, TwitterPicker } from "react-color";
import useOnClickOutside from "@/app/_hooks/useOnClickOutside";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "@/server/apis/courses";
import useCourseForm from "./useCourseForm";

interface AddCourseDialogProps {
  closeDialog: () => void;
}

export default function AddCourseDialog({ closeDialog }: AddCourseDialogProps) {
  const {
    form,
    selectedColor,
    colorPickerOpen,
    colorPickerRef,
    setColorPickerOpen,
    inputRef,
    handleColorChange,
    handleInputChange,
    onSubmit,
  } = useCourseForm({
    initialValues: {
      title: "",
      color: "#000000",
    },
    onSubmitCallback: closeDialog,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Course</DialogTitle>
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
          <div className="flex justify-center">
            <button type="submit" className="btn mt-4">
              Create Course
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
