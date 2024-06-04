"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { useToast } from "@/components/ui/use-toast";

export default function ChangePasswordForm() {
  const { toast } = useToast();
  const changePasswordSchema = z.object({
    password: z.string().min(5, {
      message: "Password is required.",
    }),
  });

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit() {
    const supabase = await createSupabaseFrontendClient();
    const { data, error } = await supabase.auth.updateUser({
      password: form.getValues().password,
    });

    if (data) {
      toast({ title: "Password Changed" });
    }
    if (error) {
      toast({ title: "Error Changing Password", description: error.message });
    }
  }
  return (
    <Card className="w-full p-4">
      <CardTitle>Change Password</CardTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="btn w-full flex gap">
            Change Password
          </Button>
        </form>
      </Form>
    </Card>
  );
}
