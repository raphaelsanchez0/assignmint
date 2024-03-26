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
import { setCanvasKey } from "@/server/canvasAPIActions";

export default function CanvasImports() {
  const form = useForm<z.infer<typeof canvasAPIFormSchema>>({
    resolver: zodResolver(canvasAPIFormSchema),
    defaultValues: {
      canvasAPIKey: "",
    },
  });

  function onSubmit(values: z.infer<typeof canvasAPIFormSchema>) {
    console.log(values);
    setCanvasKey(values);
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
