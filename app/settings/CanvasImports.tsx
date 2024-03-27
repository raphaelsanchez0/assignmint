"use client";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Info } from "lucide-react";
import InfoDialog from "@/components/info-dialogs/info-dialog";
import HowToGetAPIKey from "./info/HowToGetAPIKey";
import { canvasAPIFormSchema } from "@/lib/schemas";
import {
  getCanvasCourses,
  getEnrollmentTerms,
  validateCanvasKey,
} from "@/server/canvasAPIActions";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export default function CanvasImports() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof canvasAPIFormSchema>>({
    resolver: zodResolver(canvasAPIFormSchema),
    defaultValues: {
      canvasAPIKey: "",
    },
  });

  async function onSubmit(values: z.infer<typeof canvasAPIFormSchema>) {
    const validKey = await validateCanvasKey(values.canvasAPIKey);
    if (validKey === true) {
      toast({
        title: "Success",
        description: "Canvas API Key saved",
      });
      await getCanvasCourses();
    } else {
      toast({
        title: "Error",
        description: validKey?.message,
      });
    }
  }

  return (
    <Card className="flex flex-col gap-2">
      <h3 className="card-title ">Canvas</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="canvasAPIKey"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Canvas API Key</FormLabel>
                  <InfoDialog
                    title="How to get an API Key"
                    info={HowToGetAPIKey}
                  />
                </div>
                <FormControl>
                  <Input placeholder="Canvas API Key" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <button type="submit" className="btn mt-4">
              Save
            </button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
