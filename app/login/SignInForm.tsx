"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { signInWithEmailAndPassword, signInWithOAuth } from "./authActions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import getURL from "@/utils/getURL";
import OAuthForm from "./OAuthForm";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createSupabaseFrontendClient();

  async function onSubmit(credentials: z.infer<typeof formSchema>) {
    const { success, message } = await signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    );
    if (success) {
      router.push("/dashboard");
    } else {
      toast({
        title: message,
      });
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div>
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
          <Link
            href="/login/reset-password"
            className="text-sm text-gray-300 dark:text-gray-300"
          >
            Forgot Password
          </Link>
          <Button type="submit" className="btn w-full flex gap">
            Sign In
          </Button>
        </form>
      </Form>
      {/* Implement Google OAuth when approved by Google Cloud */}
      {/* <OAuthForm /> */}
    </div>
  );
}
