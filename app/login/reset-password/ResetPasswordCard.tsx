"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import getURL from "@/utils/getURL";

export default function ResetPasswordForm() {
  const resetPasswordSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit() {
    const supabase = createSupabaseFrontendClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      form.getValues().email,
      {
        redirectTo: getURL("login/change-password"),
      },
    );

    if (error) {
      console.error(error);
      return;
    }
  }
  return (
    <Card className="w-full p-4">
      <CardTitle>Reset Password</CardTitle>
      <CardDescription className="pt-2">
        Enter your email to get a link to reset your password
      </CardDescription>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    {...field}
                    type="email"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="btn w-full flex gap">
            Send Email
          </Button>
        </form>
      </Form>
    </Card>
  );
}
