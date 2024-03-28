"use client";
import { useToast } from "@/components/ui/use-toast";
import { canvasAPIFormSchema } from "@/lib/schemas";
import { validateCanvasKey } from "@/server/canvasAPIActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import HowToGetAPIKey from "./info/HowToGetAPIKey";
import InfoDialog from "@/components/info-dialogs/info-dialog";
import { Input } from "@/components/ui/input";

export default function CanvasAPIForm() {
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
    } else {
      toast({
        title: "Error",
        description: validKey?.message,
      });
    }
  }

  return (
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
  );
}
